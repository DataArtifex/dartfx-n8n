import type { INodeProperties } from 'n8n-workflow';

export const Blake3Description: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['blake3'],
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
        operation: ['blake3'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv blake3',
    displayOptions: {
      show: {
        operation: ['blake3'],
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
        operation: ['blake3'],
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
          operation: ['blake3'],
        },
      },
    },
    {
      displayName: 'Quiet',
      name: 'quiet',
      type: 'string',
      default: '',
      description: 'kip printing OK for each checked file.',
      displayOptions: {
        show: {
          operation: ['blake3'],
        },
      },
    },
    ],
  },
];
