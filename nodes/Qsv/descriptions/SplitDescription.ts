import type { INodeProperties } from 'n8n-workflow';

export const SplitDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['split'],
      },
    },
  },
  {
    displayName: 'Output Directory',
    name: 'outdir',
    type: 'string',
    required: true,
    default: '',
    description: 'Directory where split chunk CSV files will be written',
    displayOptions: {
      show: {
        operation: ['split'],
      },
    },
  },

  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv split (Docs: https://github.com/dathere/qsv/blob/master/docs/help/split.md)',
    displayOptions: {
      show: {
        operation: ['split'],
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
        operation: ['split'],
      },
    },
    options: [
    {
      displayName: 'Chunks',
      name: 'chunks',
      type: 'string',
      default: '',
      description: 'The number of chunks to split the data into. This option is mutually exclusive with --size. The number of rows in each chunk is determined by the number of records in the CSV data and the number of desired chunks. If the number of records is not evenly divisible by the number of chunks, the last chunk will have fewer records.',
    },
    {
      displayName: 'Delimiter',
      name: 'delimiter',
      type: 'string',
      default: '',
      description: 'The field delimiter for reading CSV data. Must be a single character. (default: ,)',
    },
    {
      displayName: 'Filename',
      name: 'filename',
      type: 'string',
      default: '',
      description: 'A filename template to use when constructing the names of the output files.  The string \'{}\' will be replaced by the zero-based row number of the first row in the chunk. [default: {}.csv]',
    },
    {
      displayName: 'Filter',
      name: 'filter',
      type: 'string',
      default: '',
      description: 'Run the specified command on each chunk after it is written. The command should use the FILE environment variable ($FILE on Linux/macOS, %FILE% on Windows), which is set to the path of the output file for each chunk. The string \'{}\' in the command will be replaced by the zero-based row number of the first row in the chunk.',
    },
    {
      displayName: 'Filter Cleanup',
      name: 'filterCleanup',
      type: 'boolean',
      default: false,
      description: 'Cleanup the original output filename AFTER the filter command is run successfully for EACH chunk. If the filter command is not successful, the original filename is not removed. Only valid when --filter is used.',
    },
    {
      displayName: 'Filter Ignore Errors',
      name: 'filterIgnoreErrors',
      type: 'boolean',
      default: false,
      description: 'Ignore errors when running the filter command. Only valid when --filter is used.',
    },
    {
      displayName: 'Jobs',
      name: 'jobs',
      type: 'string',
      default: '',
      description: 'The number of splitting jobs to run in parallel. This only works when the given CSV data has an index already created. Note that a file handle is opened for each job. When not set, the number of jobs is set to the number of CPUs detected.',
    },
    {
      displayName: 'Kb Size',
      name: 'kbSize',
      type: 'string',
      default: '',
      description: 'The size of each chunk in kilobytes. The number of rows in each chunk may vary, but the size of each chunk will not exceed the desired size. This option is mutually exclusive with --size and --chunks.',
    },
    {
      displayName: 'No Headers',
      name: 'noHeaders',
      type: 'boolean',
      default: false,
      description: 'When set, the first row will NOT be interpreted as column names. Otherwise, the first row will appear in all chunks as the header row.',
    },
    {
      displayName: 'Pad',
      name: 'pad',
      type: 'string',
      default: '',
      description: 'The zero padding width that is used in the generated filename. [default: 0]',
    },
    {
      displayName: 'Quiet',
      name: 'quiet',
      type: 'boolean',
      default: false,
      description: 'Do not display an output summary to stderr.',
    },
    {
      displayName: 'Size',
      name: 'size',
      type: 'string',
      default: '',
      description: 'The number of records to write into each chunk. [default: 500]',
    },
    ],
  },
];
