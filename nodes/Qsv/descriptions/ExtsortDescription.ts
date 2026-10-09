import type { INodeProperties } from 'n8n-workflow';

export const ExtsortDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['extsort'],
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
        operation: ['extsort'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv extsort [⚡ Runs faster when CSV index (.qsv.idx) is present.] (Docs: https://github.com/dathere/qsv/blob/master/docs/help/extsort.md)',
    displayOptions: {
      show: {
        operation: ['extsort'],
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
        operation: ['extsort'],
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
      displayName: 'Memory Limit',
      name: 'memoryLimit',
      type: 'number',
      default: 20,
      description: 'The memory budget for sorting each in-memory chunk. Input that exceeds it is sorted in chunks spilled to the tmp-dir, then merged. The budget is approximate - peak memory use is higher, as it does not count sort scratch space, allocator overhead, or the merge phase\'s read buffer (~1 MB per chunk). If less than 50, this is a percentage of total memory. If more than 50, this is the memory in MB to allocate, capped at 90 percent of total memory.',
    },
    {
      displayName: 'No Headers',
      name: 'noHeaders',
      type: 'boolean',
      default: false,
      description: 'When set, the first row will not be interpreted as headers and will be sorted with the rest of the rows. Otherwise, the first row will always appear as the header row in the output.',
    },
    {
      displayName: 'Reverse',
      name: 'reverse',
      type: 'boolean',
      default: false,
      description: 'Reverse order',
    },
    {
      displayName: 'Select',
      name: 'select',
      type: 'string',
      default: '',
      description: 'Select a subset of columns to sort (CSV MODE). Note that the outputs will remain at the full width of the CSV. If --select is NOT set, extsort will work in LINE MODE, sorting the input as a text file on a line-by-line basis.',
    },
    {
      displayName: 'Tmp Dir',
      name: 'tmpDir',
      type: 'string',
      default: './',
      description: 'The directory to use for externally sorting file segments.',
    },
    ],
  },
];
