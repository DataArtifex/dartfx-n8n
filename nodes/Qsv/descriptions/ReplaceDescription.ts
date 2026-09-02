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
    displayName: 'Pattern',
    name: 'pattern',
    type: 'string',
    required: true,
    default: '',
    description: 'Regular expression pattern to search for',
    displayOptions: {
      show: {
        operation: ['replace'],
      },
    },
  },
  {
    displayName: 'Replacement',
    name: 'replacement',
    type: 'string',
    required: true,
    default: '',
    description: 'Replacement string (supports regex capture groups like $1)',
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
    description: 'Additional raw command line arguments to pass to qsv replace (Docs: https://github.com/dathere/qsv/blob/master/docs/help/replace.md)',
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
      displayName: 'Delimiter',
      name: 'delimiter',
      type: 'string',
      default: '',
      description: 'The field delimiter for reading CSV data. Must be a single character. (default: ,)',
    },
    {
      displayName: 'Dfa Size Limit',
      name: 'dfaSizeLimit',
      type: 'string',
      default: '',
      description: 'Set the approximate size of the cache (MB) used by the regular expression engine\'s Discrete Finite Automata. [default: 10]',
    },
    {
      displayName: 'Exact',
      name: 'exact',
      type: 'boolean',
      default: false,
      description: 'Match the ENTIRE field exactly. Treats the pattern as a literal string (like --literal) and automatically anchors it to match the complete field value (^pattern$).',
    },
    {
      displayName: 'Ignore Case',
      name: 'ignoreCase',
      type: 'boolean',
      default: false,
      description: 'Case insensitive search. This is equivalent to prefixing the regex with \'(?i)\'.',
    },
    {
      displayName: 'Jobs',
      name: 'jobs',
      type: 'string',
      default: '',
      description: 'The number of jobs to run in parallel when the given CSV data has an index. Note that a file handle is opened for each job. When not set, defaults to the number of CPUs detected.',
    },
    {
      displayName: 'Literal',
      name: 'literal',
      type: 'boolean',
      default: false,
      description: 'Treat the regex pattern as a literal string. This allows you to search for matches that contain regex special characters.',
    },
    {
      displayName: 'No Headers',
      name: 'noHeaders',
      type: 'boolean',
      default: false,
      description: 'When set, the first row will not be interpreted as headers. (i.e., They are not searched, analyzed, sliced, etc.)',
    },
    {
      displayName: 'Not One',
      name: 'notOne',
      type: 'boolean',
      default: false,
      description: 'Use exit code 0 instead of 1 for no replacement found.',
    },
    {
      displayName: 'Progressbar',
      name: 'progressbar',
      type: 'boolean',
      default: false,
      description: 'Show progress bars. Not valid for stdin.',
    },
    {
      displayName: 'Quiet',
      name: 'quiet',
      type: 'boolean',
      default: false,
      description: 'Do not print number of replacements to stderr.',
    },
    {
      displayName: 'Select',
      name: 'select',
      type: 'string',
      default: '',
      description: 'Select the columns to search. See \'qsv select -h\' for the full syntax.',
    },
    {
      displayName: 'Size Limit',
      name: 'sizeLimit',
      type: 'string',
      default: '',
      description: 'Set the approximate size limit (MB) of the compiled regular expression. If the compiled expression exceeds this number, then a compilation error is returned. [default: 50]',
    },
    {
      displayName: 'Unicode',
      name: 'unicode',
      type: 'boolean',
      default: false,
      description: 'Enable unicode support. When enabled, character classes will match all unicode word characters instead of only ASCII word characters. Decreases performance.',
    },
    ],
  },
];
