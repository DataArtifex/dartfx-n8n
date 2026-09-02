import type { INodeProperties } from 'n8n-workflow';

export const DatefmtDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['datefmt'],
      },
    },
  },
  {
    displayName: 'Column',
    name: 'column',
    type: 'string',
    required: true,
    default: '',
    description: 'Column name or index containing date/datetime strings to format',
    displayOptions: {
      show: {
        operation: ['datefmt'],
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
        operation: ['datefmt'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv datefmt (Docs: https://github.com/dathere/qsv/blob/master/docs/help/datefmt.md)',
    displayOptions: {
      show: {
        operation: ['datefmt'],
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
        operation: ['datefmt'],
      },
    },
    options: [
    {
      displayName: 'Batch',
      name: 'batch',
      type: 'string',
      default: '',
      description: 'The number of rows per batch to load into memory, before running in parallel. Automatically determined for CSV files with more than 50000 rows. Set to 0 to load all rows in one batch. Set to 1 to force batch optimization even for files with less than 50000 rows. [default: 50000]',
    },
    {
      displayName: 'Default Tz',
      name: 'defaultTz',
      type: 'string',
      default: '',
      description: 'Fallback timezone consulted only when --input-tz or --output-tz is set to "local" but local-timezone detection fails. Defaults to UTC. Does NOT override the --input-tz / --output-tz defaults — use --utc to force both input and output to UTC. The timezone must be a valid IANA timezone name or the string "local".',
    },
    {
      displayName: 'Delimiter',
      name: 'delimiter',
      type: 'string',
      default: '',
      description: 'The field delimiter for reading CSV data. Must be a single character. (default: ,)',
    },
    {
      displayName: 'Input Tz',
      name: 'inputTz',
      type: 'string',
      default: '',
      description: 'The timezone to use for the input date if the date does not have timezone specified. The timezone must be a valid IANA timezone name or the string "local" for the local timezone. See https://en.wikipedia.org/wiki/List_of_tz_database_time_zones for a list of valid timezone names. [default: UTC]',
    },
    {
      displayName: 'Jobs',
      name: 'jobs',
      type: 'string',
      default: '',
      description: 'The number of jobs to run in parallel. When not set, the number of jobs is set to the number of CPUs detected.',
    },
    {
      displayName: 'Keep Zero Time',
      name: 'keepZeroTime',
      type: 'boolean',
      default: false,
      description: 'If a formatted date ends with "T00:00:00+00:00", keep the time instead of removing it.',
    },
    {
      displayName: 'New Column',
      name: 'newColumn',
      type: 'string',
      default: '',
      description: 'Put the transformed values in new column(s) instead of replacing the source column(s). When the selection has multiple columns, pass a comma-separated list of new column names that match the selection count (e.g. --new-column \'open_iso,close_iso\' for \'OpenDate,CloseDate\'). To rename in place instead, use --rename.',
    },
    {
      displayName: 'No Headers',
      name: 'noHeaders',
      type: 'boolean',
      default: false,
      description: 'When set, the first row will not be interpreted as headers.',
    },
    {
      displayName: 'Output Tz',
      name: 'outputTz',
      type: 'string',
      default: '',
      description: 'The timezone to use for the output date. The timezone must be a valid IANA timezone name or the string "local". [default: UTC]',
    },
    {
      displayName: 'Prefer Dmy',
      name: 'preferDmy',
      type: 'boolean',
      default: false,
      description: 'Prefer to parse dates in dmy format. Otherwise, use mdy format.',
    },
    {
      displayName: 'Progressbar',
      name: 'progressbar',
      type: 'boolean',
      default: false,
      description: 'Show progress bars. Not valid for stdin.',
    },
    {
      displayName: 'Rename',
      name: 'rename',
      type: 'string',
      default: '',
      description: 'New name for the transformed column.',
    },
    {
      displayName: 'Ts Resolution',
      name: 'tsResolution',
      type: 'string',
      default: '',
      description: 'The resolution to use when parsing Unix timestamps. Valid values are "sec", "milli", "micro", "nano". [default: sec]',
    },
    {
      displayName: 'Utc',
      name: 'utc',
      type: 'boolean',
      default: false,
      description: 'Shortcut for --input-tz and --output-tz set to UTC.',
    },
    {
      displayName: 'Zulu',
      name: 'zulu',
      type: 'boolean',
      default: false,
      description: 'Shortcut for --output-tz set to UTC and --formatstr set to "%Y-%m-%dT%H:%M:%SZ".',
    },
    ],
  },
];
