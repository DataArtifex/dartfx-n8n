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
    description: 'Additional raw command line arguments to pass to qsv blake3 (Docs: https://github.com/dathere/qsv/blob/master/docs/help/blake3.md)',
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
      displayName: 'Check',
      name: 'check',
      type: 'boolean',
      default: false,
      description: 'Read blake3 sums from the input files and check them.',
    },
    {
      displayName: 'Derive Key',
      name: 'deriveKey',
      type: 'string',
      default: '',
      description: 'Use the key derivation mode, with the given context string. Cannot be used with --keyed.',
    },
    {
      displayName: 'Keyed',
      name: 'keyed',
      type: 'boolean',
      default: false,
      description: 'Use the keyed mode, reading the 32-byte key from stdin. When using --keyed, file arguments are required (cannot also read data from stdin).',
    },
    {
      displayName: 'Length',
      name: 'length',
      type: 'number',
      default: 32,
      description: 'The number of output bytes, before hex encoding.',
    },
    {
      displayName: 'No Mmap',
      name: 'noMmap',
      type: 'boolean',
      default: false,
      description: 'Disable memory mapping. Also disables multithreading.',
    },
    {
      displayName: 'No Names',
      name: 'noNames',
      type: 'boolean',
      default: false,
      description: 'Omit filenames in the output.',
    },
    {
      displayName: 'Raw',
      name: 'raw',
      type: 'boolean',
      default: false,
      description: 'Write raw output bytes to stdout, rather than hex. Only a single input is allowed. --no-names is implied.',
    },
    {
      displayName: 'Tag',
      name: 'tag',
      type: 'boolean',
      default: false,
      description: 'Output checksums in tagged format.',
    },
    ],
  },
];
