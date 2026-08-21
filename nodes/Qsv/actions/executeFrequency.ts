import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { execa } from 'execa';

/**
 * Action runner for 'qsv frequency'
 */
export async function executeFrequency(
  this: IExecuteFunctions,
  itemIndex: number,
): Promise<INodeExecutionData[]> {
  const inputPath = this.getNodeParameter('inputPath', itemIndex, '') as string;
  if (!inputPath) {
    throw new NodeOperationError(this.getNode(), 'Input CSV file path is required.', { itemIndex });
  }

  const args: string[] = ['frequency'];

  // Collect flags and parameters
  try {
    const outputPath = this.getNodeParameter('outputPath', itemIndex, '') as string;
    if (outputPath) {
      args.push('-o', outputPath);
    }
  } catch {
    // outputPath not applicable for this command
  }

  args.push(inputPath);

  try {
    const { stdout, stderr } = await execa('qsv', args);
    let resultJson: any;

    try {
      resultJson = JSON.parse(stdout);
    } catch {
      resultJson = {
        command: 'qsv frequency',
        inputPath,
        rawOutput: stdout,
      };
    }

    return [
      {
        json: {
          success: true,
          command: 'frequency',
          inputPath,
          result: resultJson,
        },
      },
    ];
  } catch (error: any) {
    throw new NodeOperationError(
      this.getNode(),
      `Failed executing 'qsv frequency': ${error.stderr || error.message}`,
      { itemIndex },
    );
  }
}
