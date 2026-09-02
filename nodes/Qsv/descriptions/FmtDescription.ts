import type { INodeProperties } from 'n8n-workflow';

export const FmtDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['fmt'],
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
        operation: ['fmt'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv fmt (Docs: https://github.com/dathere/qsv/blob/master/docs/help/fmt.md)',
    displayOptions: {
      show: {
        operation: ['fmt'],
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
        operation: ['fmt'],
      },
    },
    options: [
    {
      displayName: 'Ascii',
      name: 'ascii',
      type: 'boolean',
      default: false,
      description: 'Use ASCII field/record separators: Unit Separator (U+001F) for fields and Record Separator (U+001E) for records. Substitute (U+001A) is used as the quote character.',
    },
    {
      displayName: 'Crlf',
      name: 'crlf',
      type: 'boolean',
      default: false,
      description: 'Use \'\\r\\n\' line endings in the output.',
    },
    {
      displayName: 'Delimiter',
      name: 'delimiter',
      type: 'string',
      default: '',
      description: 'The field delimiter for reading CSV data. Must be a single character. (default: ,)',
    },
    {
      displayName: 'Escape',
      name: 'escape',
      type: 'string',
      default: '',
      description: 'The escape character to use. When not specified, quotes are escaped by doubling them.',
    },
    {
      displayName: 'No Final Newline',
      name: 'noFinalNewline',
      type: 'boolean',
      default: false,
      description: 'Do not write a newline at the end of the output. This makes it easier to paste the output into Excel.',
    },
    {
      displayName: 'Out Delimiter',
      name: 'outDelimiter',
      type: 'string',
      default: '',
      description: 'The field delimiter for writing CSV data. Must be a single character. "T" or "\\t" can be used as shortcuts for tab. [default: ,]',
    },
    {
      displayName: 'Quote',
      name: 'quote',
      type: 'string',
      default: '',
      description: 'The quote character to use. Must be a single character. [default: "]',
    },
    {
      displayName: 'Quote Always',
      name: 'quoteAlways',
      type: 'boolean',
      default: false,
      description: 'Put quotes around every value.',
    },
    {
      displayName: 'Quote Never',
      name: 'quoteNever',
      type: 'boolean',
      default: false,
      description: 'Never put quotes around any value.',
    },
    ],
  },
];
