import type { INodeProperties } from 'n8n-workflow';

export const ExcludeDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['exclude'],
      },
    },
  },
  {
    displayName: 'First File Exclude Columns',
    name: 'columns1',
    type: 'string',
    required: true,
    default: '',
    description: 'Columns in first input file to match on',
    displayOptions: {
      show: {
        operation: ['exclude'],
      },
    },
  },
  {
    displayName: 'Second File Exclude Columns',
    name: 'columns2',
    type: 'string',
    required: true,
    default: '',
    description: 'Columns in second input file to match on',
    displayOptions: {
      show: {
        operation: ['exclude'],
      },
    },
  },
  {
    displayName: 'Second Input File Path',
    name: 'input2',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to second input CSV file on disk',
    displayOptions: {
      show: {
        operation: ['exclude'],
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
        operation: ['exclude'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv exclude (Docs: https://github.com/dathere/qsv/blob/master/docs/help/exclude.md)',
    displayOptions: {
      show: {
        operation: ['exclude'],
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
        operation: ['exclude'],
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
      displayName: 'Ignore Case',
      name: 'ignoreCase',
      type: 'boolean',
      default: false,
      description: 'When set, matching is done case insensitively.',
    },
    {
      displayName: 'Invert',
      name: 'invert',
      type: 'boolean',
      default: false,
      description: 'When set, matching rows will be the only ones included, forming set intersection, instead of the ones discarded.',
    },
    {
      displayName: 'Memcheck',
      name: 'memcheck',
      type: 'boolean',
      default: false,
      description: 'Check if there is enough memory to load <input2> into memory using CONSERVATIVE heuristics.',
    },
    {
      displayName: 'No Headers',
      name: 'noHeaders',
      type: 'boolean',
      default: false,
      description: 'When set, the first row will not be interpreted as headers. (i.e., They are not searched, analyzed, sliced, etc.)',
    },
    ],
  },
];
