import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

export async function executeMoarstats(
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

  const args: string[] = ['moarstats'];

  if (options.cardinalityThreshold !== undefined && options.cardinalityThreshold !== '') {
    args.push('--cardinality-threshold', String(options.cardinalityThreshold));
  }
  if (options.bivariateBatch !== undefined && options.bivariateBatch !== '') {
    args.push('--bivariate-batch', String(options.bivariateBatch));
  }
  if (options.joinInputs !== undefined && options.joinInputs !== '') {
    args.push('--join-inputs', String(options.joinInputs));
  }
  if (options.joinKeys !== undefined && options.joinKeys !== '') {
    args.push('--join-keys', String(options.joinKeys));
  }
  if (options.joinType !== undefined && options.joinType !== '') {
    args.push('--join-type', String(options.joinType));
  }
  if (options.progressbar !== undefined && options.progressbar !== '') {
    args.push('--progressbar', String(options.progressbar));
  }
  if (options.force !== undefined && options.force !== '') {
    args.push('--force', String(options.force));
  }
  if (options.jobs !== undefined && options.jobs !== '') {
    args.push('--jobs', String(options.jobs));
  }
  if (options.output !== undefined && options.output !== '') {
    args.push('--output', String(options.output));
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
        command: 'qsv moarstats',
        inputPath,
        rawOutput: stdout,
      };
    }

    return [
      {
        json: {
          success: true,
          command: 'moarstats',
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
      `Failed executing 'qsv moarstats': ${error.stderr || error.message}`,
      { itemIndex },
    );
  }
}
