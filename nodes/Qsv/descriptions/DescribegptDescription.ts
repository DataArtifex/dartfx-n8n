import type { INodeProperties } from 'n8n-workflow';

export const DescribegptDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['describegpt'],
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
        operation: ['describegpt'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv describegpt',
    displayOptions: {
      show: {
        operation: ['describegpt'],
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
        operation: ['describegpt'],
      },
    },
    options: [
    {
      displayName: 'Format',
      name: 'format',
      type: 'string',
      default: '',
      description: 'Output format: Markdown, TSV, JSON, TOON, JSONSchema, SemanticMd, or OKF.',
      displayOptions: {
        show: {
          operation: ['describegpt'],
        },
      },
    },
    {
      displayName: 'Allow Extra Cols',
      name: 'allowExtraCols',
      type: 'string',
      default: '',
      description: 'hen the format is JSONSchema, emit additionalProperties as true at the',
      displayOptions: {
        show: {
          operation: ['describegpt'],
        },
      },
    },
    {
      displayName: 'Strict Dates',
      name: 'strictDates',
      type: 'string',
      default: '',
      description: 'hen the format is JSONSchema, emit format date or date-time for',
      displayOptions: {
        show: {
          operation: ['describegpt'],
        },
      },
    },
    {
      displayName: 'Ds Source',
      name: 'dsSource',
      type: 'string',
      default: '',
      description: 'For the SemanticMd & OKF formats only: the dataset source/provenance',
      displayOptions: {
        show: {
          operation: ['describegpt'],
        },
      },
    },
    {
      displayName: 'Ds Updated',
      name: 'dsUpdated',
      type: 'string',
      default: '',
      description: 'For the SemanticMd & OKF formats only: the dataset\'s last-updated date',
      displayOptions: {
        show: {
          operation: ['describegpt'],
        },
      },
    },
    {
      displayName: 'Ds License',
      name: 'dsLicense',
      type: 'string',
      default: '',
      description: 'For the SemanticMd format only: the dataset license recorded in the',
      displayOptions: {
        show: {
          operation: ['describegpt'],
        },
      },
    },
    {
      displayName: 'Okf Type',
      name: 'okfType',
      type: 'string',
      default: '',
      description: 'For the OKF format only: the value of the required `type` frontmatter key',
      displayOptions: {
        show: {
          operation: ['describegpt'],
        },
      },
    },
    {
      displayName: 'Output',
      name: 'output',
      type: 'string',
      default: '',
      description: 'Write output to <file> instead of stdout. If --format is set to TSV,',
      displayOptions: {
        show: {
          operation: ['describegpt'],
        },
      },
    },
    {
      displayName: 'Quiet',
      name: 'quiet',
      type: 'string',
      default: '',
      description: 'o not print status messages to stderr.',
      displayOptions: {
        show: {
          operation: ['describegpt'],
        },
      },
    },
    ],
  },
];
