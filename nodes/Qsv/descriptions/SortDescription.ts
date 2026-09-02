import type { INodeProperties } from 'n8n-workflow';

export const SortDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['sort'],
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
        operation: ['sort'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv sort (Docs: https://github.com/dathere/qsv/blob/master/docs/help/sort.md)',
    displayOptions: {
      show: {
        operation: ['sort'],
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
        operation: ['sort'],
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
      displayName: 'Faster',
      name: 'faster',
      type: 'boolean',
      default: false,
      description: 'When set, the sort will be faster. This is done by using a faster sorting algorithm that is not "stable" (i.e. the order of identical values is not guaranteed to be preserved). It has the added side benefit that the sort will also be in-place (i.e. does not allocate), which is useful for sorting large files that will otherwise NOT fit in memory using the default allocating stable sort.',
    },
    {
      displayName: 'Ignore Case',
      name: 'ignoreCase',
      type: 'boolean',
      default: false,
      description: 'Compare strings disregarding case. Has no effect when numeric comparison is selected (i.e. when --numeric is used without --natural).',
    },
    {
      displayName: 'Jobs',
      name: 'jobs',
      type: 'string',
      default: '',
      description: 'The number of jobs to run in parallel. When not set, the number of jobs is set to the number of CPUs detected.',
    },
    {
      displayName: 'Memcheck',
      name: 'memcheck',
      type: 'boolean',
      default: false,
      description: 'Check if there is enough memory to load the entire CSV into memory using CONSERVATIVE heuristics. Ignored if --random or --faster is set.',
    },
    {
      displayName: 'Natural',
      name: 'natural',
      type: 'boolean',
      default: false,
      description: 'Compare strings using natural sort order (treats numbers within strings as actual numbers, e.g. "data1.txt", "data2.txt", "data10.txt", as opposed to "data1.txt", "data10.txt", "data2.txt" when sorting lexicographically) https://en.wikipedia.org/wiki/Natural_sort_order When combined with --numeric, --natural takes precedence.',
    },
    {
      displayName: 'No Headers',
      name: 'noHeaders',
      type: 'boolean',
      default: false,
      description: 'When set, the first row will not be interpreted as headers. Namely, it will be sorted with the rest of the rows. Otherwise, the first row will always appear as the header row in the output.',
    },
    {
      displayName: 'Numeric',
      name: 'numeric',
      type: 'boolean',
      default: false,
      description: 'Compare according to string numerical value',
    },
    {
      displayName: 'Random',
      name: 'random',
      type: 'boolean',
      default: false,
      description: 'Randomize (scramble) the data by row. When set, the numeric, natural, and ignore-case comparison flags still apply to unique-filtering (if --unique is also set). The reverse flag has no effect on unique-filter equality and is ignored for the shuffle itself.',
    },
    {
      displayName: 'Reverse',
      name: 'reverse',
      type: 'boolean',
      default: false,
      description: 'Reverse order',
    },
    {
      displayName: 'Rng',
      name: 'rng',
      type: 'string',
      default: '',
      description: 'The RNG algorithm to use if --random is set. Three RNGs are supported: * standard: Use the standard RNG. 1.5 GB/s throughput. * faster: Use faster RNG using the Xoshiro256Plus algorithm. 8 GB/s throughput. * cryptosecure: Use cryptographically secure HC128 algorithm. Recommended by eSTREAM (https://www.ecrypt.eu.org/stream/). 2.1 GB/s throughput though slow initialization. [default: standard]',
    },
    {
      displayName: 'Seed',
      name: 'seed',
      type: 'string',
      default: '',
      description: 'Random Number Generator (RNG) seed to use if --random is set',
    },
    {
      displayName: 'Select',
      name: 'select',
      type: 'string',
      default: '',
      description: 'Select a subset of columns to sort. See \'qsv select --help\' for the format details.',
    },
    {
      displayName: 'Unique',
      name: 'unique',
      type: 'boolean',
      default: false,
      description: 'When set, identical consecutive lines will be dropped to keep only one line per sorted value. The same comparison mode used to sort the input is also used here, so unique-equality always agrees with the sort.',
    },
    ],
  },
];
