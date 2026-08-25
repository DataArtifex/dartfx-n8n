import type { INodeProperties } from 'n8n-workflow';

export const ExtdedupDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['extdedup'],
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
        operation: ['extdedup'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv extdedup',
    displayOptions: {
      show: {
        operation: ['extdedup'],
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
        operation: ['extdedup'],
      },
    },
    options: [
    {
      displayName: 'No Headers',
      name: 'noHeaders',
      type: 'string',
      default: '',
      description: 'hen set, the first row will not be interpreted',
      displayOptions: {
        show: {
          operation: ['extdedup'],
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
          operation: ['extdedup'],
        },
      },
    },
    {
      displayName: 'Quiet',
      name: 'quiet',
      type: 'string',
      default: '',
      description: 'o not print duplicate count to stderr.',
      displayOptions: {
        show: {
          operation: ['extdedup'],
        },
      },
    },
    ],
  },
];
