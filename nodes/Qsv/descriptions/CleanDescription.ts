import type { INodeProperties } from 'n8n-workflow';

export const CleanDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['clean'],
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
        operation: ['clean'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv clean',
    displayOptions: {
      show: {
        operation: ['clean'],
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
        operation: ['clean'],
      },
    },
    options: [
    {
      displayName: 'Quiet',
      name: 'quiet',
      type: 'string',
      default: '',
      description: 'o not print the per-file / summary report.',
      displayOptions: {
        show: {
          operation: ['clean'],
        },
      },
    },
    ],
  },
];
