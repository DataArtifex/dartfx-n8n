import type { INodeProperties } from 'n8n-workflow';

export const SliceDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['slice'],
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
        operation: ['slice'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv slice (Docs: https://github.com/dathere/qsv/blob/master/docs/help/slice.md)',
    displayOptions: {
      show: {
        operation: ['slice'],
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
        operation: ['slice'],
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
      displayName: 'End',
      name: 'end',
      type: 'string',
      default: '',
      description: 'The index of the record to slice to.',
    },
    {
      displayName: 'Index',
      name: 'index',
      type: 'string',
      default: '',
      description: 'Slice a single record (shortcut for -s N -l 1). If negative, starts from the last record.',
    },
    {
      displayName: 'Invert',
      name: 'invert',
      type: 'boolean',
      default: false,
      description: 'slice all records EXCEPT those in the specified range.',
    },
    {
      displayName: 'Json',
      name: 'json',
      type: 'boolean',
      default: false,
      description: 'Output the result as JSON. Fields are written as key-value pairs. The key is the column name. The value is the field value. The output is a JSON array. If --no-headers is set, then the keys are the column indices (zero-based).',
    },
    {
      displayName: 'Len',
      name: 'len',
      type: 'string',
      default: '',
      description: 'The length of the slice (can be used instead of --end).',
    },
    {
      displayName: 'No Headers',
      name: 'noHeaders',
      type: 'boolean',
      default: false,
      description: 'When set, the first row will not be interpreted as headers. Otherwise, the first row will always appear in the output as the header row.',
    },
    {
      displayName: 'Start',
      name: 'start',
      type: 'string',
      default: '',
      description: 'The index of the record to slice from. If negative, starts from the last record.',
    },
    ],
  },
];
