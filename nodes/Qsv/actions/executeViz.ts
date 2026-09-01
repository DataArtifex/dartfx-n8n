import type { IExecuteFunctions, INodeExecutionData } from "n8n-workflow";
import { NodeOperationError } from "n8n-workflow";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export async function executeViz(
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

  const args: string[] = ["viz"];

  if (options.x !== undefined && options.x !== "") {
    args.push("--x", String(options.x));
  }
  if (options.y !== undefined && options.y !== "") {
    args.push("--y", String(options.y));
  }
  if (options.z !== undefined && options.z !== "") {
    args.push("--z", String(options.z));
  }
  if (options.cols !== undefined && options.cols !== "") {
    args.push("--cols", String(options.cols));
  }
  if (options.series !== undefined && options.series !== "") {
    args.push("--series", String(options.series));
  }
  if (options.color !== undefined && options.color !== "") {
    args.push("--color", String(options.color));
  }
  if (options.size !== undefined && options.size !== "") {
    args.push("--size", String(options.size));
  }
  if (options.donut === true) {
    args.push("--donut");
  }
  if (options.ohlcOpen !== undefined && options.ohlcOpen !== "") {
    args.push("--ohlc-open", String(options.ohlcOpen));
  }
  if (options.high !== undefined && options.high !== "") {
    args.push("--high", String(options.high));
  }
  if (options.low !== undefined && options.low !== "") {
    args.push("--low", String(options.low));
  }
  if (options.close !== undefined && options.close !== "") {
    args.push("--close", String(options.close));
  }
  if (options.source !== undefined && options.source !== "") {
    args.push("--source", String(options.source));
  }
  if (options.target !== undefined && options.target !== "") {
    args.push("--target", String(options.target));
  }
  if (options.value !== undefined && options.value !== "") {
    args.push("--value", String(options.value));
  }
  if (options.sankeyValueOrder === true) {
    args.push("--sankey-value-order");
  }
  if (options.bins !== undefined && options.bins !== "") {
    args.push("--bins", String(options.bins));
  }
  if (options.agg !== undefined && options.agg !== "") {
    args.push("--agg", String(options.agg));
  }
  if (options.boxPoints !== undefined && options.boxPoints !== "") {
    args.push("--box-points", String(options.boxPoints));
  }
  if (options.lat !== undefined && options.lat !== "") {
    args.push("--lat", String(options.lat));
  }
  if (options.lon !== undefined && options.lon !== "") {
    args.push("--lon", String(options.lon));
  }
  if (options.text !== undefined && options.text !== "") {
    args.push("--text", String(options.text));
  }
  if (options.density === true) {
    args.push("--density");
  }
  if (options.style !== undefined && options.style !== "") {
    args.push("--style", String(options.style));
  }
  if (options.projection !== undefined && options.projection !== "") {
    args.push("--projection", String(options.projection));
  }
  if (options.locations !== undefined && options.locations !== "") {
    args.push("--locations", String(options.locations));
  }
  if (options.locationMode !== undefined && options.locationMode !== "") {
    args.push("--location-mode", String(options.locationMode));
  }
  if (options.colorScale !== undefined && options.colorScale !== "") {
    args.push("--color-scale", String(options.colorScale));
  }
  if (options.map === true) {
    args.push("--map");
  }
  if (options.geojson !== undefined && options.geojson !== "") {
    args.push("--geojson", String(options.geojson));
  }
  if (options.featureIdKey !== undefined && options.featureIdKey !== "") {
    args.push("--feature-id-key", String(options.featureIdKey));
  }
  if (options.featureNameKey !== undefined && options.featureNameKey !== "") {
    args.push("--feature-name-key", String(options.featureNameKey));
  }
  if (options.denominatorKey !== undefined && options.denominatorKey !== "") {
    args.push("--denominator-key", String(options.denominatorKey));
  }
  if (options.denominatorUnit !== undefined && options.denominatorUnit !== "") {
    args.push("--denominator-unit", String(options.denominatorUnit));
  }
  if (options.denominator !== undefined && options.denominator !== "") {
    args.push("--denominator", String(options.denominator));
  }
  if (options.geocode === true) {
    args.push("--geocode");
  }
  if (options.geocodeCountry !== undefined && options.geocodeCountry !== "") {
    args.push("--geocode-country", String(options.geocodeCountry));
  }
  if (options.geocodeAdmin1 !== undefined && options.geocodeAdmin1 !== "") {
    args.push("--geocode-admin1", String(options.geocodeAdmin1));
  }
  if (options.noSnap === true) {
    args.push("--no-snap");
  }
  if (options.snapMaxDist !== undefined && options.snapMaxDist !== "") {
    args.push("--snap-max-dist", String(options.snapMaxDist));
  }
  if (options.maxCharts !== undefined && options.maxCharts !== "") {
    args.push("--max-charts", String(options.maxCharts));
  }
  if (options.gridCols !== undefined && options.gridCols !== "") {
    args.push("--grid-cols", String(options.gridCols));
  }
  if (
    options.previewThreshold !== undefined &&
    options.previewThreshold !== ""
  ) {
    args.push("--preview-threshold", String(options.previewThreshold));
  }
  if (options.heatmapDensity !== undefined && options.heatmapDensity !== "") {
    args.push("--heatmap-density", String(options.heatmapDensity));
  }
  if (options.cluster !== undefined && options.cluster !== "") {
    args.push("--cluster", String(options.cluster));
  }
  if (options.photos === true) {
    args.push("--photos");
  }
  if (options.limit !== undefined && options.limit !== "") {
    args.push("--limit", String(options.limit));
  }
  if (options.noNulls === true) {
    args.push("--no-nulls");
  }
  if (options.noOther === true) {
    args.push("--no-other");
  }
  if (options.smarter === true) {
    args.push("--smarter");
  }
  if (options.hierarchyStyle !== undefined && options.hierarchyStyle !== "") {
    args.push("--hierarchy-style", String(options.hierarchyStyle));
  }
  if (options.dictionary !== undefined && options.dictionary !== "") {
    args.push("--dictionary", String(options.dictionary));
  }
  if (
    options.dictionaryContext !== undefined &&
    options.dictionaryContext !== ""
  ) {
    args.push("--dictionary-context", String(options.dictionaryContext));
  }
  if (options.dictInfo === true) {
    args.push("--dict-info");
  }
  if (options.datasetPid !== undefined && options.datasetPid !== "") {
    args.push("--dataset-pid", String(options.datasetPid));
  }
  if (options.bivariate === true) {
    args.push("--bivariate");
  }
  if (options.logScale !== undefined && options.logScale !== "") {
    args.push("--log-scale", String(options.logScale));
  }
  if (options.violin !== undefined && options.violin !== "") {
    args.push("--violin", String(options.violin));
  }
  if (options.title !== undefined && options.title !== "") {
    args.push("--title", String(options.title));
  }
  if (options.xTitle !== undefined && options.xTitle !== "") {
    args.push("--x-title", String(options.xTitle));
  }
  if (options.yTitle !== undefined && options.yTitle !== "") {
    args.push("--y-title", String(options.yTitle));
  }
  if (options.yRange !== undefined && options.yRange !== "") {
    args.push("--y-range", String(options.yRange));
  }
  if (options.rangeslider === true) {
    args.push("--rangeslider");
  }
  if (options.slider !== undefined && options.slider !== "") {
    args.push("--slider", String(options.slider));
  }
  if (options.sliderSpeed !== undefined && options.sliderSpeed !== "") {
    args.push("--slider-speed", String(options.sliderSpeed));
  }
  if (options.sliderCumulative === true) {
    args.push("--slider-cumulative");
  }
  if (options.annotation !== undefined && options.annotation !== "") {
    args.push("--annotation", String(options.annotation));
  }
  if (options.theme !== undefined && options.theme !== "") {
    args.push("--theme", String(options.theme));
  }
  if (options.language !== undefined && options.language !== "") {
    args.push("--language", String(options.language));
  }
  if (options.width !== undefined && options.width !== "") {
    args.push("--width", String(options.width));
  }
  if (options.height !== undefined && options.height !== "") {
    args.push("--height", String(options.height));
  }
  if (options.scale !== undefined && options.scale !== "") {
    args.push("--scale", String(options.scale));
  }
  if (options.open === true) {
    args.push("--open");
  }
  if (options.delimiter !== undefined && options.delimiter !== "") {
    args.push("--delimiter", String(options.delimiter));
  }
  if (options.noHeaders === true) {
    args.push("--no-headers");
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
        command: "qsv viz",
        inputPath,
        rawOutput: stdout,
      };
    }

    const returnJson: Record<string, any> = {
      success: true,
      command: "viz",
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
          description: `qsv viz returned more data than could fit into memory. Specify an 'Output File Path' to stream results directly to disk instead.`,
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
        `Operation 'viz' is not available in the installed QSV binary`,
        {
          itemIndex,
          description: `The installed QSV binary at '${qsvBin}' does not include the 'viz' feature. This feature may require a full feature build of QSV (e.g. qsv with all_features or a prebuilt binary with feature flags enabled). See https://github.com/dathere/qsv#feature-flags`,
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
          description: `qsv viz could not find the file at '${inputPath}'. Check for typos, or if n8n is running in Docker, ensure the host directory is mounted into the container.`,
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
          description: `qsv viz was denied read access to '${inputPath}'. On macOS, check Full Disk Access or Removable Volumes permissions for the application running n8n.`,
        },
      );
    }

    throw new NodeOperationError(
      this.getNode(),
      `Failed executing 'qsv viz': ${rawError}`,
      { itemIndex },
    );
  }
}
