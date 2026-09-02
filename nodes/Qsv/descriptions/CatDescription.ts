import type { INodeProperties } from 'n8n-workflow';

export const CatDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['cat'],
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
        operation: ['cat'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv cat (Docs: https://github.com/dathere/qsv/blob/master/docs/help/cat.md)',
    displayOptions: {
      show: {
        operation: ['cat'],
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
        operation: ['cat'],
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
      displayName: 'Flexible',
      name: 'flexible',
      type: 'boolean',
      default: false,
      description: 'When concatenating rows, this flag turns off validation that the input and output CSVs have the same number of columns. This is faster, but may result in invalid CSV data.',
    },
    {
      displayName: 'Group',
      name: 'group',
      type: 'string',
      default: '',
      description: 'When concatenating with rowskey, you can specify a grouping value which will be used as the first column in the output. This is useful when you want to know which file a row came from. Valid values are \'fullpath\', \'parentdirfname\', \'parentdirfstem\', \'fname\', \'fstem\' and \'none\'. A new column will be added to the beginning of each row using --group-name. If \'none\' is specified, no grouping column will be added. [default: none]',
    },
    {
      displayName: 'Group Name',
      name: 'groupName',
      type: 'string',
      default: '',
      description: 'When concatenating with rowskey, this flag provides the name for the new grouping column. [default: file]',
    },
    {
      displayName: 'No Headers',
      name: 'noHeaders',
      type: 'boolean',
      default: false,
      description: 'When set, the first row will NOT be interpreted as column names. Note that this has no effect when concatenating columns.',
    },
    {
      displayName: 'Pad',
      name: 'pad',
      type: 'boolean',
      default: false,
      description: 'When concatenating columns, this flag will cause all records to appear. It will pad each row if other CSV data isn\'t long enough. ROWS OPTION:',
    },
    ],
  },
];
