import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

export async function executeReplace(
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

  const args: string[] = ['replace'];

  if (options.output !== undefined && options.output !== '') {
    args.push('--output', String(options.output));
  }
  if (options.noHeaders !== undefined && options.noHeaders !== '') {
    args.push('--no-headers', String(options.noHeaders));
  }
  if (options.delimiter !== undefined && options.delimiter !== '') {
    args.push('--delimiter', String(options.delimiter));
  }
  if (options.progressbar !== undefined && options.progressbar !== '') {
    args.push('--progressbar', String(options.progressbar));
  }
  if (options.quiet !== undefined && options.quiet !== '') {
    args.push('--quiet', String(options.quiet));
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
        command: 'qsv replace',
        inputPath,
        rawOutput: stdout,
      };
    }

    return [
      {
        json: {
          success: true,
          command: 'replace',
          inputPath,
          result: resultJson,
        },
      },
    ];
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      throw new NodeOperationError(
        this.getNode(),
        `The QSV CLI binary ('${qsvBin}') was not found. Please ensure QSV is installed and in your PATH, or specify its absolute path via the DARTFX_QSV_BIN_PATH or QSV_BIN_PATH environment variables. See: https://github.com/dathere/qsv`,
        { itemIndex },
      );
    }
    throw new NodeOperationError(
      this.getNode(),
      `Failed executing 'qsv replace': ${error.stderr || error.message}`,
      { itemIndex },
    );
  }
}
