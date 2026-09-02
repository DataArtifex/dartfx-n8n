import type { INodeProperties } from 'n8n-workflow';

export const FlattenDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['flatten'],
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
        operation: ['flatten'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv flatten (Docs: https://github.com/dathere/qsv/blob/master/docs/help/flatten.md)',
    displayOptions: {
      show: {
        operation: ['flatten'],
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
        operation: ['flatten'],
      },
    },
    options: [
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
      displayName: 'Field Separator',
      name: 'fieldSeparator',
      type: 'string',
      default: '',
      description: 'A string of characters to write between a column name and its value.',
    },
    {
      displayName: 'No Headers',
      name: 'noHeaders',
      type: 'boolean',
      default: false,
      description: 'When set, the first row will not be interpreted as headers. When set, the name of each field will be its index.',
    },
    {
      displayName: 'Separator',
      name: 'separator',
      type: 'string',
      default: '',
      description: 'A string of characters to write after each record. When non-empty, a new line is automatically appended to the separator. [default: #]',
    },
    ],
  },
];
