import type { INodeProperties } from 'n8n-workflow';

export const TableDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['table'],
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
        operation: ['table'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv table (Docs: https://github.com/dathere/qsv/blob/master/docs/help/table.md)',
    displayOptions: {
      show: {
        operation: ['table'],
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
        operation: ['table'],
      },
    },
    options: [
    {
      displayName: 'Align',
      name: 'align',
      type: 'string',
      default: '',
      description: 'How entries should be aligned in a column. "leftendtab" is a special alignment that similar to "left" but with whitespace padding ending with a tab character. The resulting output still validates as a valid TSV file, while also being more human-readable (aka "aligned" TSV). "leftfwf" is similar to "left" with Fixed Width Format alignment. The first line is a comment (prefixed with "#") that enumerates the position (1-based, comma-separated) of each column. [default: left]',
    },
    {
      displayName: 'Condense',
      name: 'condense',
      type: 'string',
      default: '',
      description: 'Limits the length of each field to the value specified. If the field is UTF-8 encoded, then <arg> refers to the number of code points. Otherwise, it refers to the number of bytes.',
    },
    {
      displayName: 'Delimiter',
      name: 'delimiter',
      type: 'string',
      default: '',
      description: 'The field delimiter for reading CSV data. Must be a single character. (default: ,)',
    },
    {
      displayName: 'Memcheck',
      name: 'memcheck',
      type: 'boolean',
      default: false,
      description: 'Check if there is enough memory to load the entire CSV into memory using CONSERVATIVE heuristics.',
    },
    {
      displayName: 'Pad',
      name: 'pad',
      type: 'string',
      default: '',
      description: 'The minimum number of spaces between each column. [default: 2]',
    },
    {
      displayName: 'Width',
      name: 'width',
      type: 'string',
      default: '',
      description: 'The minimum width of each column. [default: 2]',
    },
    ],
  },
];
