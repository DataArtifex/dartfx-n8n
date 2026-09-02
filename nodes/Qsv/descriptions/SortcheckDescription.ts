import type { INodeProperties } from 'n8n-workflow';

export const SortcheckDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['sortcheck'],
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
        operation: ['sortcheck'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv sortcheck (Docs: https://github.com/dathere/qsv/blob/master/docs/help/sortcheck.md)',
    displayOptions: {
      show: {
        operation: ['sortcheck'],
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
        operation: ['sortcheck'],
      },
    },
    options: [
    {
      displayName: 'All',
      name: 'all',
      type: 'boolean',
      default: false,
      description: 'Check all records. Do not stop/short-circuit the check on the first unsorted record.',
    },
    {
      displayName: 'Delimiter',
      name: 'delimiter',
      type: 'string',
      default: '',
      description: 'The field delimiter for reading CSV data. Must be a single character. (default: ,)',
    },
    {
      displayName: 'Ignore Case',
      name: 'ignoreCase',
      type: 'boolean',
      default: false,
      description: 'Compare strings disregarding case. Ignored under pure numeric comparison (i.e. --numeric without --natural), since numeric comparison is case-insensitive by definition.',
    },
    {
      displayName: 'Json',
      name: 'json',
      type: 'boolean',
      default: false,
      description: 'Return results in JSON format, scanning --all records. The JSON result has the following properties - sorted (boolean), record_count (number), unsorted_breaks (number) & dupe_count (number). Unsorted breaks count the number of times two consecutive rows are unsorted (i.e. n row > n+1 row). Dupe count is the number of times two consecutive rows are equal. Note that dupe count does not apply if the file is not sorted and is set to -1.',
    },
    {
      displayName: 'Natural',
      name: 'natural',
      type: 'boolean',
      default: false,
      description: 'Compare using natural sort order (e.g. item1 < item2 < item10). Takes precedence over --numeric. Composes with --ignore-case.',
    },
    {
      displayName: 'No Headers',
      name: 'noHeaders',
      type: 'boolean',
      default: false,
      description: 'When set, the first row will not be interpreted as headers. That is, it will be sorted with the rest of the rows. Otherwise, the first row will always appear as the header row in the output.',
    },
    {
      displayName: 'Numeric',
      name: 'numeric',
      type: 'boolean',
      default: false,
      description: 'Compare according to string numerical value.',
    },
    {
      displayName: 'Pretty Json',
      name: 'prettyJson',
      type: 'boolean',
      default: false,
      description: 'Same as --json but in pretty JSON format.',
    },
    {
      displayName: 'Progressbar',
      name: 'progressbar',
      type: 'boolean',
      default: false,
      description: 'Show progress bars. Not valid for stdin.',
    },
    {
      displayName: 'Select',
      name: 'select',
      type: 'string',
      default: '',
      description: 'Select a subset of columns to check for sort. See \'qsv select --help\' for the format details.',
    },
    ],
  },
];
