import type { INodeProperties } from 'n8n-workflow';

export const MoarstatsDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['moarstats'],
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
        operation: ['moarstats'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv moarstats',
    displayOptions: {
      show: {
        operation: ['moarstats'],
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
        operation: ['moarstats'],
      },
    },
    options: [
    {
      displayName: 'Cardinality Threshold',
      name: 'cardinalityThreshold',
      type: 'string',
      default: '',
      description: '',
      displayOptions: {
        show: {
          operation: ['moarstats'],
        },
      },
    },
    {
      displayName: 'Bivariate Batch',
      name: 'bivariateBatch',
      type: 'string',
      default: '',
      description: 'Process at most <n> field pairs per pass over the input,',
      displayOptions: {
        show: {
          operation: ['moarstats'],
        },
      },
    },
    {
      displayName: 'Join Inputs',
      name: 'joinInputs',
      type: 'string',
      default: '',
      description: '',
      displayOptions: {
        show: {
          operation: ['moarstats'],
        },
      },
    },
    {
      displayName: 'Join Keys',
      name: 'joinKeys',
      type: 'string',
      default: '',
      description: '',
      displayOptions: {
        show: {
          operation: ['moarstats'],
        },
      },
    },
    {
      displayName: 'Join Type',
      name: 'joinType',
      type: 'string',
      default: '',
      description: '',
      displayOptions: {
        show: {
          operation: ['moarstats'],
        },
      },
    },
    {
      displayName: 'Progressbar',
      name: 'progressbar',
      type: 'string',
      default: '',
      description: 'how progress bars when computing bivariate statistics.',
      displayOptions: {
        show: {
          operation: ['moarstats'],
        },
      },
    },
    {
      displayName: 'Force',
      name: 'force',
      type: 'string',
      default: '',
      description: 'orce recomputing stats even if valid precomputed stats',
      displayOptions: {
        show: {
          operation: ['moarstats'],
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
          operation: ['moarstats'],
        },
      },
    },
    {
      displayName: 'Output',
      name: 'output',
      type: 'string',
      default: '',
      description: 'Write output to <file> instead of overwriting the stats CSV file.',
      displayOptions: {
        show: {
          operation: ['moarstats'],
        },
      },
    },
    ],
  },
];
