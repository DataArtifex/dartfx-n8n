import type { INodeProperties } from 'n8n-workflow';

export const DedupDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['dedup'],
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
        operation: ['dedup'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv dedup (Docs: https://github.com/dathere/qsv/blob/master/docs/help/dedup.md)',
    displayOptions: {
      show: {
        operation: ['dedup'],
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
        operation: ['dedup'],
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
      displayName: 'Dupes Output',
      name: 'dupesOutput',
      type: 'string',
      default: '',
      description: 'Write duplicates to <file>.',
    },
    {
      displayName: 'Human Readable',
      name: 'humanReadable',
      type: 'boolean',
      default: false,
      description: 'Comma separate duplicate count.',
    },
    {
      displayName: 'Ignore Case',
      name: 'ignoreCase',
      type: 'boolean',
      default: false,
      description: 'Compare strings disregarding case.',
    },
    {
      displayName: 'Jobs',
      name: 'jobs',
      type: 'string',
      default: '',
      description: 'The number of jobs to run in parallel when sorting an unsorted CSV, before deduping. When not set, the number of jobs is set to the number of CPUs detected. Does not work with --sorted option as its not multithreaded.',
    },
    {
      displayName: 'Memcheck',
      name: 'memcheck',
      type: 'boolean',
      default: false,
      description: 'Check if there is enough memory to load the entire CSV into memory using CONSERVATIVE heuristics. Has no effect when --sorted is set, as that path streams the input and never loads it into memory.',
    },
    {
      displayName: 'No Headers',
      name: 'noHeaders',
      type: 'boolean',
      default: false,
      description: 'When set, the first row will not be interpreted as headers. That is, it will be sorted with the rest of the rows. Otherwise, the first row will always appear as the header row in the output.',
    },
    {
      displayName: 'Numeric',
      name: 'numeric',
      type: 'boolean',
      default: false,
      description: 'Compare according to string numerical value',
    },
    {
      displayName: 'Quiet',
      name: 'quiet',
      type: 'boolean',
      default: false,
      description: 'Do not print duplicate count to stderr.',
    },
    {
      displayName: 'Select',
      name: 'select',
      type: 'string',
      default: '',
      description: 'Select a subset of columns to dedup. Note that the outputs will remain at the full width of the CSV. See \'qsv select --help\' for the format details.',
    },
    {
      displayName: 'Sorted',
      name: 'sorted',
      type: 'boolean',
      default: false,
      description: 'The input is already sorted. Do not load the CSV into memory to sort it first. Meant to be used in tandem and after an extsort.',
    },
    ],
  },
];
