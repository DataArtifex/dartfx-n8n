import type { INodeProperties } from 'n8n-workflow';

export const EnumDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['enum'],
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
        operation: ['enum'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv enum (Docs: https://github.com/dathere/qsv/blob/master/docs/help/enum.md)',
    displayOptions: {
      show: {
        operation: ['enum'],
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
        operation: ['enum'],
      },
    },
    options: [
    {
      displayName: 'Constant',
      name: 'constant',
      type: 'string',
      default: '',
      description: 'Fill a new column with the given value. Changes the default column name to "constant" unless overridden by --new-column. To specify a null value, pass the literal "<NULL>".',
    },
    {
      displayName: 'Copy',
      name: 'copy',
      type: 'string',
      default: '',
      description: 'Name of a column to copy. Changes the default column name to "{column}_copy" unless overridden by --new-column.',
    },
    {
      displayName: 'Delimiter',
      name: 'delimiter',
      type: 'string',
      default: '',
      description: 'The field delimiter for reading CSV data. Must be a single character. (default: ,)',
    },
    {
      displayName: 'Hash',
      name: 'hash',
      type: 'string',
      default: '',
      description: 'Create a new column filled with the hash of the given column/s. Use "1-" to hash all columns. Changes the default column name to "hash" unless overridden by --new-column. Will remove an existing "hash" column if it exists. The <columns> argument specify the columns to use in the hash. Columns can be referenced by name or index, starting at 1. Specify multiple columns by separating them with a comma. Specify a range of columns with `-`. (See \'qsv select --help\' for the full syntax.)',
    },
    {
      displayName: 'Increment',
      name: 'increment',
      type: 'string',
      default: '',
      description: 'The value to increment the enumeration by. Only applies in Increment mode. (default: 1)',
    },
    {
      displayName: 'New Column',
      name: 'newColumn',
      type: 'string',
      default: '',
      description: 'Name of the column to create. Will default to "index".',
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
      type: 'string',
      default: '',
      description: 'The value to start the enumeration from. Only applies in Increment mode. (default: 0)',
    },
    {
      displayName: 'Uuid4',
      name: 'uuid4',
      type: 'boolean',
      default: false,
      description: 'When set, the column will be populated with uuids (v4) instead of the incremental identifier. Changes the default column name to "uuid4" unless overridden by --new-column.',
    },
    {
      displayName: 'Uuid7',
      name: 'uuid7',
      type: 'boolean',
      default: false,
      description: 'When set, the column will be populated with uuids (v7) instead of the incremental identifier. uuid v7 is a time-based uuid and is monotonically increasing. See https://buildkite.com/blog/goodbye-integers-hello-uuids Changes the default column name to "uuid7" unless overridden by --new-column.',
    },
    ],
  },
];
