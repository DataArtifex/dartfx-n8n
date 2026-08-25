import type { INodeProperties } from 'n8n-workflow';

export const ForeachDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['foreach'],
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
        operation: ['foreach'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv foreach',
    displayOptions: {
      show: {
        operation: ['foreach'],
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
        operation: ['foreach'],
      },
    },
    options: [
    {
      displayName: 'No Headers',
      name: 'noHeaders',
      type: 'string',
      default: '',
      description: 'hen set, the file will be considered to have no',
      displayOptions: {
        show: {
          operation: ['foreach'],
        },
      },
    },
    {
      displayName: 'Delimiter',
      name: 'delimiter',
      type: 'string',
      default: '',
      description: 'The field delimiter for reading CSV data.',
      displayOptions: {
        show: {
          operation: ['foreach'],
        },
      },
    },
    {
      displayName: 'Progressbar',
      name: 'progressbar',
      type: 'string',
      default: '',
      description: 'how progress bars. Not valid for stdin.',
      displayOptions: {
        show: {
          operation: ['foreach'],
        },
      },
    },
    ],
  },
];
