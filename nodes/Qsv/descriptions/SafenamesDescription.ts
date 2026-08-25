import type { INodeProperties } from 'n8n-workflow';

export const SafenamesDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['safenames'],
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
        operation: ['safenames'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv safenames',
    displayOptions: {
      show: {
        operation: ['safenames'],
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
        operation: ['safenames'],
      },
    },
    options: [
    {
      displayName: 'Output',
      name: 'output',
      type: 'string',
      default: '',
      description: 'Write output to <file> instead of stdout.',
      displayOptions: {
        show: {
          operation: ['safenames'],
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
          operation: ['safenames'],
        },
      },
    },
    ],
  },
];
