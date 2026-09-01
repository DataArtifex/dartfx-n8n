import type { IExecuteFunctions, INodeExecutionData } from "n8n-workflow";
import { NodeOperationError } from "n8n-workflow";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export async function executeSynthesize(
  this: IExecuteFunctions,
  itemIndex: number,
): Promise<INodeExecutionData[]> {
  const inputPath = this.getNodeParameter("inputPath", itemIndex) as string;
  if (!inputPath || !inputPath.trim()) {
    throw new NodeOperationError(
      this.getNode(),
      "Input CSV file path is required.",
      { itemIndex },
    );
  }
  const outputPath =
    (this.getNodeParameter("outputPath", itemIndex, "") as string) || "";
  const additionalArgs =
    (this.getNodeParameter("additionalArgs", itemIndex, "") as string) || "";
  const options =
    (this.getNodeParameter("options", itemIndex, {}) as any) || {};

  const args: string[] = ["synthesize"];

  if (options.dictionary !== undefined && options.dictionary !== "") {
    args.push("--dictionary", String(options.dictionary));
  }
  if (options.inferContentType === true) {
    args.push("--infer-content-type");
  }
  if (options.rows !== undefined && options.rows !== "") {
    args.push("--rows", String(options.rows));
  }
  if (options.seed !== undefined && options.seed !== "") {
    args.push("--seed", String(options.seed));
  }
  if (options.locale !== undefined && options.locale !== "") {
    args.push("--locale", String(options.locale));
  }
  if (options.freqLimit !== undefined && options.freqLimit !== "") {
    args.push("--freq-limit", String(options.freqLimit));
  }
  if (options.statsOptions !== undefined && options.statsOptions !== "") {
    args.push("--stats-options", String(options.statsOptions));
  }
  if (options.consistentFakes === true) {
    args.push("--consistent-fakes");
  }
  if (options.noRelationships === true) {
    args.push("--no-relationships");
  }
  if (
    options.jointCardinalityCap !== undefined &&
    options.jointCardinalityCap !== ""
  ) {
    args.push("--joint-cardinality-cap", String(options.jointCardinalityCap));
  }
  if (
    options.correlationThreshold !== undefined &&
    options.correlationThreshold !== ""
  ) {
    args.push("--correlation-threshold", String(options.correlationThreshold));
  }
  if (options.strictRelationships === true) {
    args.push("--strict-relationships");
  }
  if (options.jobs !== undefined && options.jobs !== "") {
    args.push("--jobs", String(options.jobs));
  }
  if (options.delimiter !== undefined && options.delimiter !== "") {
    args.push("--delimiter", String(options.delimiter));
  }

  if (additionalArgs.trim()) {
    const rawMatches = additionalArgs.match(/[^\s"']+|"[^"]*"|'[^']*'/g) || [];
    const parsedArgs = rawMatches.map((arg) => {
      if (
        (arg.startsWith('"') && arg.endsWith('"')) ||
        (arg.startsWith("'") && arg.endsWith("'"))
      ) {
        return arg.slice(1, -1);
      }
      return arg;
    });
    args.push(...parsedArgs);
  }

  if (outputPath.trim()) {
    args.push("--output", outputPath.trim());
  }

  args.push(inputPath);

  const qsvBin =
    process.env.DARTFX_QSV_BIN_PATH ||
    process.env.QSV_BIN_PATH ||
    process.env.QSV_PATH ||
    "qsv";

  try {
    const { stdout, stderr } = await execFileAsync(qsvBin, args, {
      maxBuffer: 50 * 1024 * 1024,
      encoding: "utf8",
    });
    let resultJson: any;

    try {
      resultJson = JSON.parse(stdout);
    } catch {
      resultJson = {
        command: "qsv synthesize",
        inputPath,
        rawOutput: stdout,
      };
    }

    const returnJson: Record<string, any> = {
      success: true,
      command: "synthesize",
      inputPath,
      result: resultJson,
    };

    if (outputPath.trim()) {
      returnJson.outputPath = outputPath.trim();
    }

    if (stderr && stderr.trim()) {
      returnJson.warnings = stderr.trim();
    }

    return [
      {
        json: returnJson,
      },
    ];
  } catch (error: any) {
    if (error.code === "ENOENT") {
      throw new NodeOperationError(
        this.getNode(),
        `The QSV CLI binary ('${qsvBin}') was not found`,
        {
          itemIndex,
          description: `Please ensure 'qsv' is installed and available in the system PATH where n8n is running, or specify its absolute path via the DARTFX_QSV_BIN_PATH environment variable. (https://github.com/dathere/qsv)`,
        },
      );
    }

    if (
      error.code === "ERR_CHILD_PROCESS_STDIO_MAXBUFFER" ||
      (error.message && error.message.includes("maxBuffer"))
    ) {
      throw new NodeOperationError(
        this.getNode(),
        `QSV execution exceeded maximum stdout buffer (50 MB)`,
        {
          itemIndex,
          description: `qsv synthesize returned more data than could fit into memory. Specify an 'Output File Path' to stream results directly to disk instead.`,
        },
      );
    }

    const rawError = (error.stderr || error.message || "").trim();

    if (
      rawError.includes("is not a qsv command") ||
      rawError.includes("unrecognized subcommand") ||
      rawError.includes("not available in this")
    ) {
      throw new NodeOperationError(
        this.getNode(),
        `Operation 'synthesize' is not available in the installed QSV binary`,
        {
          itemIndex,
          description: `The installed QSV binary at '${qsvBin}' does not include the 'synthesize' feature. This feature may require a full feature build of QSV (e.g. qsv with all_features or a prebuilt binary with feature flags enabled). See https://github.com/dathere/qsv#feature-flags`,
        },
      );
    }

    if (
      rawError.includes("No such file or directory") ||
      rawError.includes("os error 2")
    ) {
      throw new NodeOperationError(
        this.getNode(),
        `Input file not found: '${inputPath}'`,
        {
          itemIndex,
          description: `qsv synthesize could not find the file at '${inputPath}'. Check for typos, or if n8n is running in Docker, ensure the host directory is mounted into the container.`,
        },
      );
    }

    if (
      rawError.includes("Operation not permitted") ||
      rawError.includes("os error 1") ||
      rawError.includes("Permission denied") ||
      rawError.includes("os error 13")
    ) {
      throw new NodeOperationError(
        this.getNode(),
        `Permission denied accessing file: '${inputPath}'`,
        {
          itemIndex,
          description: `qsv synthesize was denied read access to '${inputPath}'. On macOS, check Full Disk Access or Removable Volumes permissions for the application running n8n.`,
        },
      );
    }

    throw new NodeOperationError(
      this.getNode(),
      `Failed executing 'qsv synthesize': ${rawError}`,
      { itemIndex },
    );
  }
}
