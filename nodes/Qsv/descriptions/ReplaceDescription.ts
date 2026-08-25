import type { INodeProperties } from 'n8n-workflow';

export const ReplaceDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['replace'],
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
        operation: ['replace'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv replace',
    displayOptions: {
      show: {
        operation: ['replace'],
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
        operation: ['replace'],
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
          operation: ['replace'],
        },
      },
    },
    {
      displayName: 'No Headers',
      name: 'noHeaders',
      type: 'string',
      default: '',
      description: 'hen set, the first row will not be interpreted',
      displayOptions: {
        show: {
          operation: ['replace'],
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
          operation: ['replace'],
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
          operation: ['replace'],
        },
      },
    },
    {
      displayName: 'Quiet',
      name: 'quiet',
      type: 'string',
      default: '',
      description: 'o not print number of replacements to stderr.',
      displayOptions: {
        show: {
          operation: ['replace'],
        },
      },
    },
    ],
  },
];
