import type { INodeProperties } from 'n8n-workflow';

export const ForeachDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['foreach'],
      },
    },
  },
  {
    displayName: 'Column',
    name: 'column',
    type: 'string',
    required: true,
    default: '',
    description: 'Column whose values will be passed to the command',
    displayOptions: {
      show: {
        operation: ['foreach'],
      },
    },
  },
  {
    displayName: 'Command',
    name: 'command',
    type: 'string',
    required: true,
    default: '',
    description: 'Shell command to execute for each row',
    displayOptions: {
      show: {
        operation: ['foreach'],
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
        operation: ['foreach'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv foreach (Docs: https://github.com/dathere/qsv/blob/master/docs/help/foreach.md)',
    displayOptions: {
      show: {
        operation: ['foreach'],
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
        operation: ['foreach'],
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
      displayName: 'Dry Run',
      name: 'dryRun',
      type: 'string',
      default: '',
      description: 'If set to true (the default for safety reasons), the commands are sent to stdout instead of executing them. If set to a file, the commands will be written to the specified text file instead of executing them. The file is only created after all flag validation succeeds, so a conflicting flag combination will not truncate an existing file. Only if set to false will the commands be actually executed. [default: true]',
    },
    {
      displayName: 'New Column',
      name: 'newColumn',
      type: 'string',
      default: '',
      description: 'If unifying, add a new column with given name and copying the value of the current input file line.',
    },
    {
      displayName: 'No Headers',
      name: 'noHeaders',
      type: 'boolean',
      default: false,
      description: 'When set, the file will be considered to have no headers.',
    },
    {
      displayName: 'Progressbar',
      name: 'progressbar',
      type: 'boolean',
      default: false,
      description: 'Show progress bars. Not valid for stdin.',
    },
    {
      displayName: 'Unify',
      name: 'unify',
      type: 'boolean',
      default: false,
      description: 'If the output of the executed command is a CSV, unify the result by skipping headers on each subsequent command. Does not work when --dry-run is true. The first child\'s CSV header row becomes canonical; later children are expected to produce the same schema.',
    },
    ],
  },
];
