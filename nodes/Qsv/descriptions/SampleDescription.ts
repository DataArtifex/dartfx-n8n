import type { INodeProperties } from 'n8n-workflow';

export const SampleDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['sample'],
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
        operation: ['sample'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv sample',
    displayOptions: {
      show: {
        operation: ['sample'],
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
        operation: ['sample'],
      },
    },
    options: [
    {
      displayName: 'Ts Adaptive',
      name: 'tsAdaptive',
      type: 'string',
      default: '',
      description: 'Adaptive sampling mode for time-series data.',
      displayOptions: {
        show: {
          operation: ['sample'],
        },
      },
    },
    {
      displayName: 'Ts Aggregate',
      name: 'tsAggregate',
      type: 'string',
      default: '',
      description: 'Aggregation function to apply within each time interval.',
      displayOptions: {
        show: {
          operation: ['sample'],
        },
      },
    },
    {
      displayName: 'Ts Input Tz',
      name: 'tsInputTz',
      type: 'string',
      default: '',
      description: 'Timezone for parsing input timestamps. Can be an IANA timezone name or "local" for the local timezone.',
      displayOptions: {
        show: {
          operation: ['sample'],
        },
      },
    },
    {
      displayName: 'Ts Prefer Dmy',
      name: 'tsPreferDmy',
      type: 'string',
      default: '',
      description: 'refer to parse dates in dmy format. Otherwise, use mdy format.',
      displayOptions: {
        show: {
          operation: ['sample'],
        },
      },
    },
    {
      displayName: 'Sketch Out',
      name: 'sketchOut',
      type: 'string',
      default: '',
      description: 'After sampling, also write a binary sketch describing the internal',
      displayOptions: {
        show: {
          operation: ['sample'],
        },
      },
    },
    {
      displayName: 'Sketch In',
      name: 'sketchIn',
      type: 'string',
      default: '',
      description: 'Comma-separated list of sketch files produced by --sketch-out.',
      displayOptions: {
        show: {
          operation: ['sample'],
        },
      },
    },
    {
      displayName: 'User Agent',
      name: 'userAgent',
      type: 'string',
      default: '',
      description: 'Specify custom user agent to use when the input is a URL.',
      displayOptions: {
        show: {
          operation: ['sample'],
        },
      },
    },
    {
      displayName: 'Timeout',
      name: 'timeout',
      type: 'string',
      default: '',
      description: 'Inactivity timeout for downloading URLs in seconds. Aborts only if',
      displayOptions: {
        show: {
          operation: ['sample'],
        },
      },
    },
    {
      displayName: 'Max Size',
      name: 'maxSize',
      type: 'string',
      default: '',
      description: 'Maximum size of the file to download in MB before sampling.',
      displayOptions: {
        show: {
          operation: ['sample'],
        },
      },
    },
    {
      displayName: 'Force',
      name: 'force',
      type: 'string',
      default: '',
      description: 'o not use stats cache, even if its available.',
      displayOptions: {
        show: {
          operation: ['sample'],
        },
      },
    },
    {
      displayName: 'Output',
      name: 'output',
      type: 'string',
      default: '',
      description: 'Write output to <file> instead of stdout.',
      displayOptions: {
        show: {
          operation: ['sample'],
        },
      },
    },
    {
      displayName: 'No Headers',
      name: 'noHeaders',
      type: 'string',
      default: '',
      description: 'hen set, the first row will be considered as part of',
      displayOptions: {
        show: {
          operation: ['sample'],
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
          operation: ['sample'],
        },
      },
    },
    ],
  },
];
