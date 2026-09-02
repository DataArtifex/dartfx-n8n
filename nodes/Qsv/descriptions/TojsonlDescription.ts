import type { INodeProperties } from 'n8n-workflow';

export const TojsonlDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['tojsonl'],
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
        operation: ['tojsonl'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv tojsonl (Docs: https://github.com/dathere/qsv/blob/master/docs/help/tojsonl.md)',
    displayOptions: {
      show: {
        operation: ['tojsonl'],
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
        operation: ['tojsonl'],
      },
    },
    options: [
    {
      displayName: 'Batch',
      name: 'batch',
      type: 'string',
      default: '',
      description: 'The number of rows per batch to load into memory, before running in parallel. Automatically determined for CSV files with more than 50000 rows. Set to 0 to load all rows in one batch. Set to 1 to force batch optimization even for files with less than 50000 rows. [default: 50000]',
    },
    {
      displayName: 'Delimiter',
      name: 'delimiter',
      type: 'string',
      default: '',
      description: 'The field delimiter for reading CSV data. Must be a single character. (default: ,)',
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
      description: 'Check if there is enough memory to load the entire CSV into memory using CONSERVATIVE heuristics.',
    },
    {
      displayName: 'No Boolean',
      name: 'noBoolean',
      type: 'boolean',
      default: false,
      description: 'Do not infer boolean fields.',
    },
    {
      displayName: 'Quiet',
      name: 'quiet',
      type: 'boolean',
      default: false,
      description: 'Do not display enum/const list inferencing messages.',
    },
    {
      displayName: 'Trim',
      name: 'trim',
      type: 'boolean',
      default: false,
      description: 'Trim leading and trailing whitespace from fields before converting to JSON.',
    },
    ],
  },
];
