import type { INodeProperties } from 'n8n-workflow';

export const BeheadDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['behead'],
      },
    },
  },

  {
    displayName: 'Output File Path',
    name: 'outputPath',
    type: 'string',
    default: '',
    description: 'Optional path to write output file directly to disk (if omitted, results are returned in node output)',
    displayOptions: {
      show: {
        operation: ['behead'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv behead (Docs: https://github.com/dathere/qsv/blob/master/docs/help/behead.md)',
    displayOptions: {
      show: {
        operation: ['behead'],
      },
    },
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        operation: ['behead'],
      },
    },
    options: [
    {
      displayName: 'Flexible',
      name: 'flexible',
      type: 'boolean',
      default: false,
      description: 'Do not validate if the CSV has different number of fields per record, increasing performance.',
    },
    ],
  },
];
