import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

export async function executeSample(
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
  const sampleSize = (this.getNodeParameter('sampleSize', itemIndex, '100') as string) || '';
  if (!sampleSize || !String(sampleSize).trim()) {
    throw new NodeOperationError(
      this.getNode(),
      'Parameter "Sample Size" is required for sample.',
      { itemIndex },
    );
  }
  const outputPath = (this.getNodeParameter('outputPath', itemIndex, '') as string) || '';
  const additionalArgs = (this.getNodeParameter('additionalArgs', itemIndex, '') as string) || '';
  const options = (this.getNodeParameter('options', itemIndex, {}) as any) || {};

  const args: string[] = ['sample'];
  if (options.seed !== undefined && options.seed !== '') {
    args.push('--seed', String(options.seed));
  }
  if (options.rng !== undefined && options.rng !== '') {
    args.push('--rng', String(options.rng));
  }
  if (options.bernoulli === true) {
    args.push('--bernoulli');
  }
  if (options.systematic !== undefined && options.systematic !== '') {
    args.push('--systematic', String(options.systematic));
  }
  if (options.stratified !== undefined && options.stratified !== '') {
    args.push('--stratified', String(options.stratified));
  }
  if (options.weighted !== undefined && options.weighted !== '') {
    args.push('--weighted', String(options.weighted));
  }
  if (options.varopt !== undefined && options.varopt !== '') {
    args.push('--varopt', String(options.varopt));
  }
  if (options.mergeableReservoir === true) {
    args.push('--mergeable-reservoir');
  }
  if (options.cluster !== undefined && options.cluster !== '') {
    args.push('--cluster', String(options.cluster));
  }
  if (options.timeseries !== undefined && options.timeseries !== '') {
    args.push('--timeseries', String(options.timeseries));
  }
  if (options.tsInterval !== undefined && options.tsInterval !== '') {
    args.push('--ts-interval', String(options.tsInterval));
  }
  if (options.tsStart !== undefined && options.tsStart !== '') {
    args.push('--ts-start', String(options.tsStart));
  }
  if (options.tsAdaptive !== undefined && options.tsAdaptive !== '') {
    args.push('--ts-adaptive', String(options.tsAdaptive));
  }
  if (options.tsAggregate !== undefined && options.tsAggregate !== '') {
    args.push('--ts-aggregate', String(options.tsAggregate));
  }
  if (options.tsInputTz !== undefined && options.tsInputTz !== '') {
    args.push('--ts-input-tz', String(options.tsInputTz));
  }
  if (options.tsPreferDmy === true) {
    args.push('--ts-prefer-dmy');
  }
  if (options.sketchOut !== undefined && options.sketchOut !== '') {
    args.push('--sketch-out', String(options.sketchOut));
  }
  if (options.sketchIn !== undefined && options.sketchIn !== '') {
    args.push('--sketch-in', String(options.sketchIn));
  }
  if (options.userAgent !== undefined && options.userAgent !== '') {
    args.push('--user-agent', String(options.userAgent));
  }
  if (options.timeout !== undefined && options.timeout !== '') {
    args.push('--timeout', String(options.timeout));
  }
  if (options.maxSize !== undefined && options.maxSize !== '') {
    args.push('--max-size', String(options.maxSize));
  }
  if (options.force === true) {
    args.push('--force');
  }
  if (options.noHeaders === true) {
    args.push('--no-headers');
  }
  if (options.delimiter !== undefined && options.delimiter !== '') {
    args.push('--delimiter', String(options.delimiter));
  }

  args.push(String(sampleSize));

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
        command: 'qsv sample',
        inputPath,
        rawOutput: stdout,
      };
    }

    const returnJson: Record<string, any> = {
      success: true,
      command: 'sample',
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
          description: `Please ensure 'qsv' is installed and available in the system PATH where n8n is running, or specify its absolute path via the DARTFX_QSV_BIN_PATH environment variable. (Docs: https://github.com/dathere/qsv/blob/master/docs/help/sample.md)`,
        },
      );
    }

    if (error.code === 'ERR_CHILD_PROCESS_STDIO_MAXBUFFER' || (error.message && error.message.includes('maxBuffer'))) {
      throw new NodeOperationError(
        this.getNode(),
        `QSV execution exceeded maximum stdout buffer (50 MB)`,
        {
          itemIndex,
          description: `qsv sample returned more data than could fit into memory. Specify an 'Output File Path' to stream results directly to disk instead.`,
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
        `Operation 'sample' is not available in the installed QSV binary`,
        {
          itemIndex,
          description: `The installed QSV binary at '${qsvBin}' does not include the 'sample' feature. This feature requires a QSV build with the corresponding Cargo feature enabled (or 'all_features'). See https://github.com/dathere/qsv/blob/master/docs/help/sample.md and https://github.com/dathere/qsv#feature-flags`,
        },
      );
    }

    if (rawError.includes('No such file or directory') || rawError.includes('os error 2')) {
      throw new NodeOperationError(
        this.getNode(),
        `Input file not found: '${inputPath}'`,
        {
          itemIndex,
          description: `qsv sample could not find the file at '${inputPath}'. Check for typos, or if n8n is running in Docker, ensure the host directory is mounted into the container.`,
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
          description: `qsv sample was denied read access to '${inputPath}'. On macOS, check Full Disk Access or Removable Volumes permissions for the application running n8n.`,
        },
      );
    }

    throw new NodeOperationError(
      this.getNode(),
      `Failed executing 'qsv sample': ${rawError}`,
      { itemIndex },
    );
  }
}
