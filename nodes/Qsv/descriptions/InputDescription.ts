import type { INodeProperties } from 'n8n-workflow';

export const InputDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['input'],
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
        operation: ['input'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv input (Docs: https://github.com/dathere/qsv/blob/master/docs/help/input.md)',
    displayOptions: {
      show: {
        operation: ['input'],
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
        operation: ['input'],
      },
    },
    options: [
    {
      displayName: 'Auto Skip',
      name: 'autoSkip',
      type: 'boolean',
      default: false,
      description: 'Sniffs a CSV for preamble records and automatically skips them. Takes precedence over --skip-lines option. Does not work with <stdin>.',
    },
    {
      displayName: 'Comment',
      name: 'comment',
      type: 'string',
      default: '',
      description: 'The comment character to use (single-byte; only the first byte of the UTF-8 encoding is matched). When set, lines starting with this byte will be skipped.',
    },
    {
      displayName: 'Delimiter',
      name: 'delimiter',
      type: 'string',
      default: '',
      description: 'The field delimiter for reading CSV data. Must be a single character. (default: ,)',
    },
    {
      displayName: 'Encoding Errors',
      name: 'encodingErrors',
      type: 'string',
      default: '',
      description: 'How to handle UTF-8 encoding errors. Possible values: replace, skip, strict. replace: Replace invalid UTF-8 sequences with �. skip: Fields with encoding errors are "<SKIPPED>". strict: Fail on any encoding errors. [default: replace]',
    },
    {
      displayName: 'Escape',
      name: 'escape',
      type: 'string',
      default: '',
      description: 'The escape character to use. When not specified, quotes are escaped by doubling them.',
    },
    {
      displayName: 'No Quoting',
      name: 'noQuoting',
      type: 'boolean',
      default: false,
      description: 'Disable quoting completely when reading CSV data.',
    },
    {
      displayName: 'Quote',
      name: 'quote',
      type: 'string',
      default: '"',
      description: 'The quote character to use. [default: "]',
    },
    {
      displayName: 'Quote Style',
      name: 'quoteStyle',
      type: 'string',
      default: '',
      description: 'The quoting style to use when writing CSV data. Possible values: all, necessary, nonnumeric and never. All: Quotes all fields. Necessary: Quotes fields only when necessary - when fields contain a quote, delimiter or record terminator. Quotes are also necessary when writing an empty record (which is indistinguishable from a record with one empty field). NonNumeric: Quotes all fields that are non-numeric. Never: Never write quotes. Even if it produces invalid CSV. [default: necessary]',
    },
    {
      displayName: 'Skip Lastlines',
      name: 'skipLastlines',
      type: 'string',
      default: '',
      description: 'The number of epilogue CSV records to skip.',
    },
    {
      displayName: 'Skip Lines',
      name: 'skipLines',
      type: 'string',
      default: '',
      description: 'The number of preamble CSV records to skip.',
    },
    {
      displayName: 'Trim Fields',
      name: 'trimFields',
      type: 'boolean',
      default: false,
      description: 'Trim leading & trailing whitespace from field values.',
    },
    {
      displayName: 'Trim Headers',
      name: 'trimHeaders',
      type: 'boolean',
      default: false,
      description: 'Trim leading & trailing whitespace & quotes from header values.',
    },
    ],
  },
];
