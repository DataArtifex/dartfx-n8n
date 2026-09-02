import type { INodeProperties } from 'n8n-workflow';

export const HeadersDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['headers'],
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
        operation: ['headers'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv headers (Docs: https://github.com/dathere/qsv/blob/master/docs/help/headers.md)',
    displayOptions: {
      show: {
        operation: ['headers'],
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
        operation: ['headers'],
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
      displayName: 'Just Count',
      name: 'justCount',
      type: 'boolean',
      default: false,
      description: 'Only show the number of headers.',
    },
    {
      displayName: 'Just Names',
      name: 'justNames',
      type: 'boolean',
      default: false,
      description: 'Only show the header names (hide column index). This is automatically enabled if more than one input is given.',
    },
    {
      displayName: 'Trim',
      name: 'trim',
      type: 'boolean',
      default: false,
      description: 'Trim leading/trailing space, tab, and quote characters from header name.',
    },
    {
      displayName: 'Union',
      name: 'union',
      type: 'boolean',
      default: false,
      description: 'Shows the union of headers across all inputs (deduplicated).',
    },
    ],
  },
];
