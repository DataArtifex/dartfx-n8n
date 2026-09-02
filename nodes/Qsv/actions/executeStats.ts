import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

export async function executeStats(
  this: IExecuteFunctions,
  itemIndex: number,
): Promise<INodeExecutionData[]> {
  const inputPath = this.getNodeParameter('inputPath', itemIndex) as string;
  if (!inputPath || !inputPath.trim()) {
    throw new NodeOperationError(
      this.getNode(),
      'Input CSV file path is required.',
      { itemIndex },
    );
  }
  const outputPath = (this.getNodeParameter('outputPath', itemIndex, '') as string) || '';
  const additionalArgs = (this.getNodeParameter('additionalArgs', itemIndex, '') as string) || '';
  const options = (this.getNodeParameter('options', itemIndex, {}) as any) || {};

  const args: string[] = ['stats'];
  if (options.select !== undefined && options.select !== '') {
    args.push('--select', String(options.select));
  }
  if (options.everything === true) {
    args.push('--everything');
  }
  if (options.typesonly === true) {
    args.push('--typesonly');
  }
  if (options.inferBoolean === true) {
    args.push('--infer-boolean');
  }
  if (options.booleanPatterns !== undefined && options.booleanPatterns !== '') {
    args.push('--boolean-patterns', String(options.booleanPatterns));
  }
  if (options.mode === true) {
    args.push('--mode');
  }
  if (options.cardinality === true) {
    args.push('--cardinality');
  }
  if (options.zeroPaddedNumeric === true) {
    args.push('--zero-padded-numeric');
  }
  if (options.median === true) {
    args.push('--median');
  }
  if (options.mad === true) {
    args.push('--mad');
  }
  if (options.quartiles === true) {
    args.push('--quartiles');
  }
  if (options.percentiles === true) {
    args.push('--percentiles');
  }
  if (options.percentileList !== undefined && options.percentileList !== '') {
    args.push('--percentile-list', String(options.percentileList));
  }
  if (options.quantileMethod !== undefined && options.quantileMethod !== '') {
    args.push('--quantile-method', String(options.quantileMethod));
  }
  if (options.cardinalityMethod !== undefined && options.cardinalityMethod !== '') {
    args.push('--cardinality-method', String(options.cardinalityMethod));
  }
  if (options.modeCardinalityCap !== undefined && options.modeCardinalityCap !== '') {
    args.push('--mode-cardinality-cap', String(options.modeCardinalityCap));
  }
  if (options.round !== undefined && options.round !== '') {
    args.push('--round', String(options.round));
  }
  if (options.nulls === true) {
    args.push('--nulls');
  }
  if (options.weight !== undefined && options.weight !== '') {
    args.push('--weight', String(options.weight));
  }
  if (options.inferDates === true) {
    args.push('--infer-dates');
  }
  if (options.datesWhitelist !== undefined && options.datesWhitelist !== '') {
    args.push('--dates-whitelist', String(options.datesWhitelist));
  }
  if (options.preferDmy === true) {
    args.push('--prefer-dmy');
  }
  if (options.force === true) {
    args.push('--force');
  }
  if (options.jobs !== undefined && options.jobs !== '') {
    args.push('--jobs', String(options.jobs));
  }
  if (options.statsJsonl === true) {
    args.push('--stats-jsonl');
  }
  if (options.jsonl === true) {
    args.push('--jsonl');
  }
  if (options.prettyJson === true) {
    args.push('--pretty-json');
  }
  if (options.cacheThreshold !== undefined && options.cacheThreshold !== '') {
    args.push('--cache-threshold', String(options.cacheThreshold));
  }
  if (options.visWhitespace === true) {
    args.push('--vis-whitespace');
  }
  if (options.noHeaders === true) {
    args.push('--no-headers');
  }
  if (options.delimiter !== undefined && options.delimiter !== '') {
    args.push('--delimiter', String(options.delimiter));
  }
  if (options.memcheck === true) {
    args.push('--memcheck');
  }


  if (additionalArgs.trim()) {
    const rawMatches = additionalArgs.match(/[^\s"']+|"[^"]*"|'[^']*'/g) || [];
    const parsedArgs = rawMatches.map((arg) => {
      if ((arg.startsWith('"') && arg.endsWith('"')) || (arg.startsWith("'") && arg.endsWith("'"))) {
        return arg.slice(1, -1);
      }
      return arg;
    });
    args.push(...parsedArgs);
  }

  if (outputPath.trim()) {
    args.push('--output', outputPath.trim());
  }

  args.push(inputPath);

  const qsvBin =
    process.env.DARTFX_QSV_BIN_PATH ||
    process.env.QSV_BIN_PATH ||
    process.env.QSV_PATH ||
    'qsv';

  try {
    const { stdout, stderr } = await execFileAsync(qsvBin, args, {
      maxBuffer: 50 * 1024 * 1024,
      encoding: 'utf8',
    });
    let resultJson: any;

    try {
      resultJson = JSON.parse(stdout);
    } catch {
      resultJson = {
        command: 'qsv stats',
        inputPath,
        rawOutput: stdout,
      };
    }

    const returnJson: Record<string, any> = {
      success: true,
      command: 'stats',
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
    if (error.code === 'ENOENT') {
      throw new NodeOperationError(
        this.getNode(),
        `The QSV CLI binary ('${qsvBin}') was not found`,
        {
          itemIndex,
          description: `Please ensure 'qsv' is installed and available in the system PATH where n8n is running, or specify its absolute path via the DARTFX_QSV_BIN_PATH environment variable. (Docs: https://github.com/dathere/qsv/blob/master/docs/help/stats.md)`,
        },
      );
    }

    if (error.code === 'ERR_CHILD_PROCESS_STDIO_MAXBUFFER' || (error.message && error.message.includes('maxBuffer'))) {
      throw new NodeOperationError(
        this.getNode(),
        `QSV execution exceeded maximum stdout buffer (50 MB)`,
        {
          itemIndex,
          description: `qsv stats returned more data than could fit into memory. Specify an 'Output File Path' to stream results directly to disk instead.`,
        },
      );
    }

    const rawError = (error.stderr || error.message || '').trim();

    if (
      rawError.includes('with any of the allowed variants') ||
      rawError.includes('Could not match') ||
      rawError.includes('is not a qsv command') ||
      rawError.includes('unrecognized subcommand') ||
      rawError.includes('not available in this')
    ) {
      throw new NodeOperationError(
        this.getNode(),
        `Operation 'stats' is not available in the installed QSV binary`,
        {
          itemIndex,
          description: `The installed QSV binary at '${qsvBin}' does not include the 'stats' feature. This feature requires a QSV build with the corresponding Cargo feature enabled (or 'all_features'). See https://github.com/dathere/qsv/blob/master/docs/help/stats.md and https://github.com/dathere/qsv#feature-flags`,
        },
      );
    }

    if (rawError.includes('No such file or directory') || rawError.includes('os error 2')) {
      throw new NodeOperationError(
        this.getNode(),
        `Input file not found: '${inputPath}'`,
        {
          itemIndex,
          description: `qsv stats could not find the file at '${inputPath}'. Check for typos, or if n8n is running in Docker, ensure the host directory is mounted into the container.`,
        },
      );
    }

    if (
      rawError.includes('Operation not permitted') ||
      rawError.includes('os error 1') ||
      rawError.includes('Permission denied') ||
      rawError.includes('os error 13')
    ) {
      throw new NodeOperationError(
        this.getNode(),
        `Permission denied accessing file: '${inputPath}'`,
        {
          itemIndex,
          description: `qsv stats was denied read access to '${inputPath}'. On macOS, check Full Disk Access or Removable Volumes permissions for the application running n8n.`,
        },
      );
    }

    throw new NodeOperationError(
      this.getNode(),
      `Failed executing 'qsv stats': ${rawError}`,
      { itemIndex },
    );
  }
}
