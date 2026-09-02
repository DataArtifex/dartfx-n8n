import type { INodeProperties } from 'n8n-workflow';

export const PartitionDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['partition'],
      },
    },
  },
  {
    displayName: 'Column',
    name: 'column',
    type: 'string',
    required: true,
    default: '',
    description: 'Column to partition CSV data on',
    displayOptions: {
      show: {
        operation: ['partition'],
      },
    },
  },
  {
    displayName: 'Output Directory',
    name: 'outdir',
    type: 'string',
    required: true,
    default: '',
    description: 'Directory where partitioned CSV files will be written',
    displayOptions: {
      show: {
        operation: ['partition'],
      },
    },
  },

  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv partition (Docs: https://github.com/dathere/qsv/blob/master/docs/help/partition.md)',
    displayOptions: {
      show: {
        operation: ['partition'],
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
        operation: ['partition'],
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
      displayName: 'Drop',
      name: 'drop',
      type: 'boolean',
      default: false,
      description: 'Drop the partition column from results.',
    },
    {
      displayName: 'Filename',
      name: 'filename',
      type: 'string',
      default: '',
      description: 'A filename template to use when constructing the names of the output files.  The string \'{}\' will be replaced by a value based on the partition column, but sanitized for shell safety. [default: {}.csv]',
    },
    {
      displayName: 'Limit',
      name: 'limit',
      type: 'string',
      default: '',
      description: 'Limit the number of simultaneously open files. Useful for partitioning large datasets with many unique values to avoid "too many open files" errors. Data is processed in batches until all unique values are processed. If not set, it will be automatically set to the system limit with a 10% safety margin. If set to 0, it will process all data at once, regardless of the system\'s open files limit.',
    },
    {
      displayName: 'No Headers',
      name: 'noHeaders',
      type: 'boolean',
      default: false,
      description: 'When set, the first row will NOT be interpreted as column names. Otherwise, the first row will appear in all chunks as the header row.',
    },
    {
      displayName: 'Prefix Length',
      name: 'prefixLength',
      type: 'string',
      default: '',
      description: 'Truncate the partition column after the specified number of bytes when creating the output file.',
    },
    ],
  },
];
