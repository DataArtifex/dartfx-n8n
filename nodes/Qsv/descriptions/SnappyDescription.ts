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
      displayName: 'Jobs',
      name: 'jobs',
      type: 'string',
      default: '',
      description: 'The number of jobs to run in parallel when compressing. When not set, its set to the number of CPUs - 1',
    },
    {
      displayName: 'Progressbar',
      name: 'progressbar',
      type: 'boolean',
      default: false,
      description: 'Show download progress bars. Only valid for URL input.',
    },
    {
      displayName: 'Quiet',
      name: 'quiet',
      type: 'boolean',
      default: false,
      description: 'Suppress status messages to stderr.',
    },
    {
      displayName: 'Timeout',
      name: 'timeout',
      type: 'string',
      default: '',
      description: 'Timeout for downloading URLs in seconds. [default: 60]',
    },
    {
      displayName: 'User Agent',
      name: 'userAgent',
      type: 'string',
      default: '',
      description: 'Specify custom user agent to use when the input is a URL. It supports the following variables - $QSV_VERSION, $QSV_TARGET, $QSV_BIN_NAME, $QSV_KIND and $QSV_COMMAND. Try to follow the syntax here - https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent',
    },
    ],
  },
];
