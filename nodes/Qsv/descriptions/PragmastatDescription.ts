import type { INodeProperties } from 'n8n-workflow';

export const PragmastatDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['pragmastat'],
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
        operation: ['pragmastat'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv pragmastat',
    displayOptions: {
      show: {
        operation: ['pragmastat'],
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
        operation: ['pragmastat'],
      },
    },
    options: [
    {
      displayName: 'Output',
      name: 'output',
      type: 'string',
      default: '',
      description: 'Write output to <file> instead of stdout.',
      displayOptions: {
        show: {
          operation: ['pragmastat'],
        },
      },
    },
    {
      displayName: 'Delimiter',
      name: 'delimiter',
      type: 'string',
      default: '',
      description: 'The field delimiter for reading/writing CSV data.',
      displayOptions: {
        show: {
          operation: ['pragmastat'],
        },
      },
    },
    {
      displayName: 'No Headers',
      name: 'noHeaders',
      type: 'string',
      default: '',
      description: 'hen set, the first row will not be treated as headers.',
      displayOptions: {
        show: {
          operation: ['pragmastat'],
        },
      },
    },
    {
      displayName: 'Jobs',
      name: 'jobs',
      type: 'string',
      default: '',
      description: 'The number of jobs to run in parallel.',
      displayOptions: {
        show: {
          operation: ['pragmastat'],
        },
      },
    },
    {
      displayName: 'Memcheck',
      name: 'memcheck',
      type: 'string',
      default: '',
      description: 'heck if there is enough memory to load the entire',
      displayOptions: {
        show: {
          operation: ['pragmastat'],
        },
      },
    },
    ],
  },
];
