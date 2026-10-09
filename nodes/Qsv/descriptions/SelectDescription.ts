import type { INodeProperties } from 'n8n-workflow';

export const SelectDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['select'],
      },
    },
  },
  {
    displayName: 'Selection',
    name: 'selection',
    type: 'string',
    required: true,
    default: '',
    description: 'The columns to select. You can select columns by index, by name, by range, by regex and any combination of these. If the first character is \'!\', the selection will be inverted. If the selection contains embedded spaces or characters that conflict with selector syntax, it must be quoted. See examples above.',
    displayOptions: {
      show: {
        operation: ['select'],
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
        operation: ['select'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv select (Docs: https://github.com/dathere/qsv/blob/master/docs/help/select.md)',
    displayOptions: {
      show: {
        operation: ['select'],
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
        operation: ['select'],
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
      displayName: 'No Headers',
      name: 'noHeaders',
      type: 'boolean',
      default: false,
      description: 'When set, the first row will not be interpreted as headers. (i.e., They are not searched, analyzed, sliced, etc.)',
    },
    {
      displayName: 'Random',
      name: 'random',
      type: 'boolean',
      default: false,
      description: 'Randomly shuffle the columns in the selection.',
    },
    {
      displayName: 'Seed',
      name: 'seed',
      type: 'number',
      default: 0,
      description: 'Seed for the random number generator.',
    },
    {
      displayName: 'Sort',
      name: 'sort',
      type: 'boolean',
      default: false,
      description: 'Sort the selected columns lexicographically, i.e. by their byte values.',
    },
    ],
  },
];
