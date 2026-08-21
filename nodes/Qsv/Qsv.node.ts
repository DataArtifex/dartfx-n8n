import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import { IndexDescription } from './descriptions/IndexDescription';
import { StatsDescription } from './descriptions/StatsDescription';
import { FrequencyDescription } from './descriptions/FrequencyDescription';
import { SchemaDescription } from './descriptions/SchemaDescription';
import { CountDescription } from './descriptions/CountDescription';

import { executeIndex } from './actions/executeIndex';
import { executeStats } from './actions/executeStats';
import { executeFrequency } from './actions/executeFrequency';
import { executeSchema } from './actions/executeSchema';
import { executeCount } from './actions/executeCount';

export class Qsv implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'QSV Data Wrangler',
    name: 'qsv',
    icon: 'file:qsv.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description: 'Ultra-fast CSV data wrangling, indexing, statistics, and schema generation via QSV',
    defaults: {
      name: 'QSV',
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
            name: 'Count Records',
            value: 'count',
            description: 'Count rows in CSV with or without an index',
            action: 'Count records',
          },
          {
            name: 'Compute Statistics',
            value: 'stats',
            description: 'Compute comprehensive summary statistics for each column',
            action: 'Compute statistics',
          },
          {
            name: 'Compute Frequencies',
            value: 'frequency',
            description: 'Compute frequency tables for CSV columns',
            action: 'Compute frequencies',
          },
          {
            name: 'Generate JSON Schema',
            value: 'schema',
            description: 'Infer and generate JSON Schema from CSV data',
            action: 'Generate json schema',
          },
          {
            name: 'Create Index',
            value: 'index',
            description: 'Create an ultra-fast slice/search index (.qsv.idx)',
            action: 'Create index',
          },
        ],
        default: 'stats',
      },
      ...IndexDescription,
      ...StatsDescription,
      ...FrequencyDescription,
      ...SchemaDescription,
      ...CountDescription,
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      const operation = this.getNodeParameter('operation', itemIndex) as string;

      try {
        let result: INodeExecutionData[];

        switch (operation) {
          case 'index':
            result = await executeIndex.call(this, itemIndex);
            break;
          case 'stats':
            result = await executeStats.call(this, itemIndex);
            break;
          case 'frequency':
            result = await executeFrequency.call(this, itemIndex);
            break;
          case 'schema':
            result = await executeSchema.call(this, itemIndex);
            break;
          case 'count':
            result = await executeCount.call(this, itemIndex);
            break;
          default:
            throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`, {
              itemIndex,
            });
        }

        returnData.push(...result);
      } catch (error: any) {
        if (this.continueOnFail()) {
          returnData.push({
            json: {
              error: error.message,
            },
            pairedItem: { item: itemIndex },
          });
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }
}
