import type { INodeProperties } from 'n8n-workflow';

export const ImplodeDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['implode'],
      },
    },
  },
  {
    displayName: 'Separator',
    name: 'separator',
    type: 'string',
    required: true,
    default: '',
    description: 'Delimiter string to join imploded values with',
    displayOptions: {
      show: {
        operation: ['implode'],
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
        operation: ['implode'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv implode (Docs: https://github.com/dathere/qsv/blob/master/docs/help/implode.md)',
    displayOptions: {
      show: {
        operation: ['implode'],
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
        operation: ['implode'],
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
      displayName: 'Keys',
      name: 'keys',
      type: 'string',
      default: '',
      description: 'Key column(s) to group by. Supports the usual selector syntax (e.g. "name", "1", "1-3", "a,c").',
    },
    {
      displayName: 'No Headers',
      name: 'noHeaders',
      type: 'boolean',
      default: false,
      description: 'When set, the first row will not be interpreted as headers.',
    },
    {
      displayName: 'Rename',
      name: 'rename',
      type: 'string',
      default: '',
      description: 'New name for the imploded value column.',
    },
    {
      displayName: 'Skip Empty',
      name: 'skipEmpty',
      type: 'boolean',
      default: false,
      description: 'Skip empty values when joining. By default, empty values are included as empty tokens so that round-tripping with `explode` is lossless.',
    },
    {
      displayName: 'Sorted',
      name: 'sorted',
      type: 'boolean',
      default: false,
      description: 'Assume input is pre-sorted by the key column(s). Streams groups as they are seen; memory is bounded by the size of the largest group.',
    },
    {
      displayName: 'Value',
      name: 'value',
      type: 'string',
      default: '',
      description: 'The column whose values will be joined per group. Must resolve to exactly one column.',
    },
    ],
  },
];
