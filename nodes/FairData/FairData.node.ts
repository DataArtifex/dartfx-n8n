import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

export class FairData implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'FAIR Data Utilities',
    name: 'fairData',
    icon: 'fa:fingerprint',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description: 'Data FAIRification utilities (UNF fingerprinting, DCAT cataloging, Frictionless schema validation)',
    defaults: {
      name: 'FAIR Data',
    },
    inputs: ['main'],
    outputs: ['main'],
    properties: [
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Compute UNF',
            value: 'unf',
            description: 'Compute Universal Numeric Fingerprint (UNF) for tabular datasets',
            action: 'Compute unf',
          },
          {
            name: 'Validate Frictionless Schema',
            value: 'validateSchema',
            description: 'Validate tabular data against Frictionless Table Schema',
            action: 'Validate frictionless schema',
          },
        ],
        default: 'unf',
      },
      {
        displayName: 'Input File Path',
        name: 'inputPath',
        type: 'string',
        default: '',
        required: true,
        description: 'Path to the dataset file on the filesystem',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      const operation = this.getNodeParameter('operation', itemIndex) as string;
      const inputPath = this.getNodeParameter('inputPath', itemIndex) as string;

      try {
        // Placeholder execution logic for FAIR data operations
        returnData.push({
          json: {
            success: true,
            operation,
            inputPath,
            message: `FAIR operation '${operation}' queued/executed for ${inputPath}`,
          },
          pairedItem: { item: itemIndex },
        });
      } catch (error: any) {
        if (this.continueOnFail()) {
          returnData.push({
            json: { error: error.message },
            pairedItem: { item: itemIndex },
          });
          continue;
        }
        throw new NodeOperationError(this.getNode(), error.message, { itemIndex });
      }
    }

    return [returnData];
  }
}
