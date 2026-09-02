import type { INodeProperties } from 'n8n-workflow';

export const DiffDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['diff'],
      },
    },
  },
  {
    displayName: 'Right CSV File Path',
    name: 'inputRight',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to second (right) CSV file to compare against',
    displayOptions: {
      show: {
        operation: ['diff'],
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
        operation: ['diff'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv diff (Docs: https://github.com/dathere/qsv/blob/master/docs/help/diff.md)',
    displayOptions: {
      show: {
        operation: ['diff'],
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
        operation: ['diff'],
      },
    },
    options: [
    {
      displayName: 'Delimiter',
      name: 'delimiter',
      type: 'string',
      default: '',
      description: 'Set ALL delimiters to this character. Overrides --delimiter-right, --delimiter-left and --delimiter-output.',
    },
    {
      displayName: 'Delimiter Left',
      name: 'delimiterLeft',
      type: 'string',
      default: '',
      description: 'The field delimiter for reading CSV data on the left. Must be a single character. (default: ,)',
    },
    {
      displayName: 'Delimiter Output',
      name: 'delimiterOutput',
      type: 'string',
      default: '',
      description: 'The field delimiter for writing the CSV diff result. Must be a single character. (default: ,)',
    },
    {
      displayName: 'Delimiter Right',
      name: 'delimiterRight',
      type: 'string',
      default: '',
      description: 'The field delimiter for reading CSV data on the right. Must be a single character. (default: ,)',
    },
    {
      displayName: 'Drop Equal Columns',
      name: 'dropEqualColumns',
      type: 'boolean',
      default: false,
      description: 'Drop entire columns from the diff result that have no differences anywhere. A column is kept if it is a key column, if it differs in any modified row, or if it has a non-empty value in any added or deleted row. Otherwise it is dropped. Can be combined with --drop-equal-fields.',
    },
    {
      displayName: 'Drop Equal Fields',
      name: 'dropEqualFields',
      type: 'boolean',
      default: false,
      description: 'Drop values of equal fields in modified rows of the CSV diff result (and replace them with the empty string). Key field values will not be dropped.',
    },
    {
      displayName: 'Jobs',
      name: 'jobs',
      type: 'string',
      default: '',
      description: 'The number of jobs to run in parallel. When not set, the number of jobs is set to the number of CPUs detected.',
    },
    {
      displayName: 'Key',
      name: 'key',
      type: 'string',
      default: '',
      description: 'The column indices that uniquely identify a record as a comma separated list of 0-based indices, e.g. 0,1,2 or column names, e.g. name,age. Note that when selecting columns by name, only the left CSV\'s headers are used to match the column names and it is assumed that the right CSV has the same selected column names in the same order as the left CSV. (default: 0)',
    },
    {
      displayName: 'No Headers Left',
      name: 'noHeadersLeft',
      type: 'boolean',
      default: false,
      description: 'When set, the first row will be considered as part of the left CSV to diff. (When not set, the first row is the header row and will be skipped during the diff. It will always appear in the output.)',
    },
    {
      displayName: 'No Headers Output',
      name: 'noHeadersOutput',
      type: 'boolean',
      default: false,
      description: 'When set, the diff result won\'t have a header row in its output. If not set and both CSVs have no headers, headers in the result will be: _col_1,_col_2, etc.',
    },
    {
      displayName: 'No Headers Right',
      name: 'noHeadersRight',
      type: 'boolean',
      default: false,
      description: 'When set, the first row will be considered as part of the right CSV to diff. (When not set, the first row is the header row and will be skipped during the diff. It will always appear in the output.)',
    },
    {
      displayName: 'Sort Columns',
      name: 'sortColumns',
      type: 'string',
      default: '',
      description: 'The column indices by which the diff result should be sorted as a comma separated list of indices, e.g. 0,1,2 or column names, e.g. name,age. Records in the diff result that are marked as "modified" ("delete" and "add" records that have the same key, but have different content) will always be kept together in the sorted diff result and so won\'t be sorted independently from each other. Note that when selecting columns by name, only the left CSV\'s headers are used to match the column names and it is assumed that the right CSV has the same selected column names in the same order as the left CSV.',
    },
    ],
  },
];
