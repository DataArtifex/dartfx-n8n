import type { INodeProperties } from 'n8n-workflow';

export const RenameDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['rename'],
      },
    },
  },
  {
    displayName: 'Headers',
    name: 'headers',
    type: 'string',
    required: true,
    default: '',
    description: 'The new headers to use for the CSV. Separate multiple headers with a comma. If "_all_generic" is given, the headers will be renamed to generic column names, where the column name uses the format "_col_N" where N is the 1-based column index. Alternatively, specify pairs of old,new column names to rename only specific columns.',
    displayOptions: {
      show: {
        operation: ['rename'],
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
        operation: ['rename'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv rename (Docs: https://github.com/dathere/qsv/blob/master/docs/help/rename.md)',
    displayOptions: {
      show: {
        operation: ['rename'],
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
        operation: ['rename'],
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
      description: 'When set, the header will be inserted on top.',
    },
    {
      displayName: 'Pairwise',
      name: 'pairwise',
      type: 'boolean',
      default: false,
      description: 'Invoke pairwise renaming.',
    },
    ],
  },
];
