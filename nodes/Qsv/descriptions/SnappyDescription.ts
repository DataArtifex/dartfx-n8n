import type { INodeProperties } from 'n8n-workflow';

export const SnappyDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['snappy'],
      },
    },
  },
  {
    displayName: 'Subcommand',
    name: 'subcommand',
    type: 'options',
    required: true,
    default: 'check',
    options: [
        { name: 'check', value: 'check' },
        { name: 'compress', value: 'compress' },
        { name: 'decompress', value: 'decompress' },
        { name: 'validate', value: 'validate' },
    ],
    description: 'Subcommand to execute. Valid values: check, compress, decompress, validate',
    displayOptions: {
      show: {
        operation: ['snappy'],
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
        operation: ['snappy'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv snappy (Docs: https://github.com/dathere/qsv/blob/master/docs/help/snappy.md)',
    displayOptions: {
      show: {
        operation: ['snappy'],
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
        operation: ['snappy'],
      },
    },
    options: [
    {
      displayName: 'Timeout',
      name: 'timeout',
      type: 'number',
      default: 60,
      description: 'Timeout for downloading URLs in seconds.',
    },
    ],
  },
];
