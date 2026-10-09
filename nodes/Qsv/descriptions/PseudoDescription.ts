import type { INodeProperties } from 'n8n-workflow';

export const PseudoDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['pseudo'],
      },
    },
  },
  {
    displayName: 'Column',
    name: 'column',
    type: 'string',
    required: true,
    default: '',
    description: 'The column to pseudonymise. You can use the `--select` option to select the column by name or index. See `select` command for more details.',
    displayOptions: {
      show: {
        operation: ['pseudo'],
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
        operation: ['pseudo'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv pseudo (Docs: https://github.com/dathere/qsv/blob/master/docs/help/pseudo.md)',
    displayOptions: {
      show: {
        operation: ['pseudo'],
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
        operation: ['pseudo'],
      },
    },
    options: [
    {
      displayName: 'Delimiter',
      name: 'delimiter',
      type: 'string',
      default: '',
      description: 'The field delimiter for reading CSV data. Must be a single character. (default: ,)',
    },
    {
      displayName: 'Formatstr',
      name: 'formatstr',
      type: 'string',
      default: '{}',
      description: 'The format string for the incremental identifier. The format string must contain a single "{}" which will be replaced with the incremental identifier.',
    },
    {
      displayName: 'Increment',
      name: 'increment',
      type: 'number',
      default: 1,
      description: 'The increment for the incremental identifier. Must be greater than 0.',
    },
    {
      displayName: 'No Headers',
      name: 'noHeaders',
      type: 'boolean',
      default: false,
      description: 'When set, the first row will not be interpreted as headers.',
    },
    {
      displayName: 'Start',
      name: 'start',
      type: 'number',
      default: 0,
      description: 'The starting number for the incremental identifier.',
    },
    ],
  },
];
