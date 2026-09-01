import type { IExecuteFunctions, INodeExecutionData } from "n8n-workflow";
import { NodeOperationError } from "n8n-workflow";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export async function executeFrequency(
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

  const args: string[] = ["frequency"];

  if (options.select !== undefined && options.select !== "") {
    args.push("--select", String(options.select));
  }
  if (options.limit !== undefined && options.limit !== "") {
    args.push("--limit", String(options.limit));
  }
  if (options.sketchMethod !== undefined && options.sketchMethod !== "") {
    args.push("--sketch-method", String(options.sketchMethod));
  }
  if (options.sketchMapSize !== undefined && options.sketchMapSize !== "") {
    args.push("--sketch-map-size", String(options.sketchMapSize));
  }
  if (options.unqLimit !== undefined && options.unqLimit !== "") {
    args.push("--unq-limit", String(options.unqLimit));
  }
  if (options.lmtThreshold !== undefined && options.lmtThreshold !== "") {
    args.push("--lmt-threshold", String(options.lmtThreshold));
  }
  if (options.rankStrategy !== undefined && options.rankStrategy !== "") {
    args.push("--rank-strategy", String(options.rankStrategy));
  }
  if (options.pctDecPlaces !== undefined && options.pctDecPlaces !== "") {
    args.push("--pct-dec-places", String(options.pctDecPlaces));
  }
  if (options.otherSorted === true) {
    args.push("--other-sorted");
  }
  if (options.otherText !== undefined && options.otherText !== "") {
    args.push("--other-text", String(options.otherText));
  }
  if (options.noOther === true) {
    args.push("--no-other");
  }
  if (options.nullSorted === true) {
    args.push("--null-sorted");
  }
  if (options.asc === true) {
    args.push("--asc");
  }
  if (options.noTrim === true) {
    args.push("--no-trim");
  }
  if (options.nullText !== undefined && options.nullText !== "") {
    args.push("--null-text", String(options.nullText));
  }
  if (options.noNulls === true) {
    args.push("--no-nulls");
  }
  if (options.pctNulls === true) {
    args.push("--pct-nulls");
  }
  if (options.ignoreCase === true) {
    args.push("--ignore-case");
  }
  if (options.noFloat !== undefined && options.noFloat !== "") {
    args.push("--no-float", String(options.noFloat));
  }
  if (options.statsFilter !== undefined && options.statsFilter !== "") {
    args.push("--stats-filter", String(options.statsFilter));
  }
  if (options.allUniqueText !== undefined && options.allUniqueText !== "") {
    args.push("--all-unique-text", String(options.allUniqueText));
  }
  if (options.visWhitespace === true) {
    args.push("--vis-whitespace");
  }
  if (options.jobs !== undefined && options.jobs !== "") {
    args.push("--jobs", String(options.jobs));
  }
  if (options.frequencyJsonl === true) {
    args.push("--frequency-jsonl");
  }
  if (
    options.highCardThreshold !== undefined &&
    options.highCardThreshold !== ""
  ) {
    args.push("--high-card-threshold", String(options.highCardThreshold));
  }
  if (options.highCardPct !== undefined && options.highCardPct !== "") {
    args.push("--high-card-pct", String(options.highCardPct));
  }
  if (options.force === true) {
    args.push("--force");
  }
  if (options.json === true) {
    args.push("--json");
  }
  if (options.prettyJson === true) {
    args.push("--pretty-json");
  }
  if (options.toon === true) {
    args.push("--toon");
  }
  if (options.noStats === true) {
    args.push("--no-stats");
  }
  if (options.weight !== undefined && options.weight !== "") {
    args.push("--weight", String(options.weight));
  }
  if (options.noHeaders === true) {
    args.push("--no-headers");
  }
  if (options.delimiter !== undefined && options.delimiter !== "") {
    args.push("--delimiter", String(options.delimiter));
  }
  if (options.memcheck === true) {
    args.push("--memcheck");
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
        command: "qsv frequency",
        inputPath,
        rawOutput: stdout,
      };
    }

    const returnJson: Record<string, any> = {
      success: true,
      command: "frequency",
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
          description: `qsv frequency returned more data than could fit into memory. Specify an 'Output File Path' to stream results directly to disk instead.`,
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
        `Operation 'frequency' is not available in the installed QSV binary`,
        {
          itemIndex,
          description: `The installed QSV binary at '${qsvBin}' does not include the 'frequency' feature. This feature may require a full feature build of QSV (e.g. qsv with all_features or a prebuilt binary with feature flags enabled). See https://github.com/dathere/qsv#feature-flags`,
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
          description: `qsv frequency could not find the file at '${inputPath}'. Check for typos, or if n8n is running in Docker, ensure the host directory is mounted into the container.`,
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
          description: `qsv frequency was denied read access to '${inputPath}'. On macOS, check Full Disk Access or Removable Volumes permissions for the application running n8n.`,
        },
      );
    }

    throw new NodeOperationError(
      this.getNode(),
      `Failed executing 'qsv frequency': ${rawError}`,
      { itemIndex },
    );
  }
}
