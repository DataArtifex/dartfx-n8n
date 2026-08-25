import type { INodeProperties } from 'n8n-workflow';

export const SniffDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['sniff'],
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
        operation: ['sniff'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv sniff',
    displayOptions: {
      show: {
        operation: ['sniff'],
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
        operation: ['sniff'],
      },
    },
    options: [
    {
      displayName: 'Progressbar',
      name: 'progressbar',
      type: 'string',
      default: '',
      description: 'how progress bars. Only valid for URL input.',
      displayOptions: {
        show: {
          operation: ['sniff'],
        },
      },
    },
    ],
  },
];
