import type { INodeProperties } from 'n8n-workflow';

export const FixlengthsDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['fixlengths'],
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
        operation: ['fixlengths'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv fixlengths (Docs: https://github.com/dathere/qsv/blob/master/docs/help/fixlengths.md)',
    displayOptions: {
      show: {
        operation: ['fixlengths'],
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
        operation: ['fixlengths'],
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
      displayName: 'Escape',
      name: 'escape',
      type: 'string',
      default: '',
      description: 'The escape character to use. When not specified, quotes are escaped by doubling them.',
    },
    {
      displayName: 'Insert',
      name: 'insert',
      type: 'string',
      default: '',
      description: 'If empty fields need to be inserted, insert them at <pos>. If <pos> is zero, then it is inserted at the end of each record. If <pos> is negative, it is inserted from the END of each record going backwards. If <pos> is positive, it is inserted from the BEGINNING of each record going forward. [default: 0]',
    },
    {
      displayName: 'Length',
      name: 'length',
      type: 'string',
      default: '',
      description: 'Forcefully set the length of each record. If a record is not the size given, then it is truncated or expanded as appropriate.',
    },
    {
      displayName: 'Quiet',
      name: 'quiet',
      type: 'boolean',
      default: false,
      description: 'Don\'t print removed column information.',
    },
    {
      displayName: 'Quote',
      name: 'quote',
      type: 'string',
      default: '"',
      description: 'The quote character to use. [default: "]',
    },
    {
      displayName: 'Remove Empty',
      name: 'removeEmpty',
      type: 'boolean',
      default: false,
      description: 'Remove empty columns.',
    },
    ],
  },
];
