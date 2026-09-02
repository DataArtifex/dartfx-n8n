import type { INodeProperties } from 'n8n-workflow';

export const FixedwidthDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['fixedwidth'],
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
        operation: ['fixedwidth'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv fixedwidth (Docs: https://github.com/dathere/qsv/blob/master/docs/help/fixedwidth.md)',
    displayOptions: {
      show: {
        operation: ['fixedwidth'],
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
        operation: ['fixedwidth'],
      },
    },
    options: [
    {
      displayName: 'Positions',
      name: 'positions',
      type: 'string',
      default: '',
      description: 'Comma-separated, 1-based starting byte position of each column (e.g. "1,10,15"). Overrides any "#..." header comment in the input.',
    },
    {
      displayName: 'Widths',
      name: 'widths',
      type: 'string',
      default: '',
      description: 'Comma-separated width, in bytes, of each column (e.g. "9,5,20"). An alternative to --positions; the two are mutually exclusive.',
    },
    ],
  },
];
