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
  const outputPath = (this.getNodeParameter('outputPath', itemIndex, '') as string) || '';
  const additionalArgs = (this.getNodeParameter('additionalArgs', itemIndex, '') as string) || '';
  const options = (this.getNodeParameter('options', itemIndex, {}) as any) || {};

  const args: string[] = ['sample'];

  if (options.tsAdaptive !== undefined && options.tsAdaptive !== '') {
    args.push('--ts-adaptive', String(options.tsAdaptive));
  }
  if (options.tsAggregate !== undefined && options.tsAggregate !== '') {
    args.push('--ts-aggregate', String(options.tsAggregate));
  }
  if (options.tsInputTz !== undefined && options.tsInputTz !== '') {
    args.push('--ts-input-tz', String(options.tsInputTz));
  }
  if (options.tsPreferDmy !== undefined && options.tsPreferDmy !== '') {
    args.push('--ts-prefer-dmy', String(options.tsPreferDmy));
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
  if (options.force !== undefined && options.force !== '') {
    args.push('--force', String(options.force));
  }
  if (options.output !== undefined && options.output !== '') {
    args.push('--output', String(options.output));
  }
  if (options.noHeaders !== undefined && options.noHeaders !== '') {
    args.push('--no-headers', String(options.noHeaders));
  }
  if (options.delimiter !== undefined && options.delimiter !== '') {
    args.push('--delimiter', String(options.delimiter));
  }

  if (additionalArgs.trim()) {
    args.push(...additionalArgs.trim().split(/\s+/));
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

    return [
      {
        json: {
          success: true,
          command: 'sample',
          inputPath,
          result: resultJson,
        },
      },
    ];
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      throw new NodeOperationError(
        this.getNode(),
        `The QSV CLI binary ('${qsvBin}') was not found`,
        {
          itemIndex,
          description: `Please ensure 'qsv' is installed and available in the system PATH where n8n is running, or specify its absolute path via the DARTFX_QSV_BIN_PATH environment variable. (https://github.com/dathere/qsv)`,
        },
      );
    }

    const rawError = (error.stderr || error.message || '').trim();

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
