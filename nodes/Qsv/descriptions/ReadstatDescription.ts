import type { INodeProperties } from 'n8n-workflow';

export const ReadstatDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['readstat'],
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
        operation: ['readstat'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv readstat (Docs: https://github.com/dathere/qsv/blob/master/docs/help/readstat.md)',
    displayOptions: {
      show: {
        operation: ['readstat'],
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
        operation: ['readstat'],
      },
    },
    options: [
    {
      displayName: 'Batch',
      name: 'batch',
      type: 'string',
      default: '',
      description: 'Number of rows to read into memory at a time. Does not apply to SPSS portable (.por) files - they have no chunked reader upstream, so they are read whole & memory scales with the file. [default: 50000]',
    },
    {
      displayName: 'Delimiter',
      name: 'delimiter',
      type: 'string',
      default: '',
      description: 'The delimiter to use when writing CSV data. Must be a single character. [default: ,]',
    },
    {
      displayName: 'Jobs',
      name: 'jobs',
      type: 'number',
      default: 1,
      description: 'Number of reader threads. [default: 1] Raising it speeds up large uncompressed files at the cost of memory, as out-of-order chunks have to be buffered to keep the rows in source order. Row order is preserved either way.',
    },
    {
      displayName: 'Metadata',
      name: 'metadata',
      type: 'string',
      default: '',
      description: 'Dump variable metadata instead of the data. Valid values: none, csv, json, pretty-json. [default: none]',
    },
    {
      displayName: 'Sentinels As',
      name: 'sentinelsAs',
      type: 'string',
      default: '',
      description: 'Keep sentinels instead of writing them as empty cells. Each eligible variable gets a <name>_null column right after it, holding the sentinel of each row that has one & empty otherwise. Valid values: none, value, label. [default: none] value - the sentinel\'s code (e.g. .A or 99). label - the sentinel\'s value label if it has one, else its code. SAS supports value only - its labels live in a .sas7bcat catalog. SPSS takes its sentinel labels from the value labels, so for SPSS, label requires the --value-labels option & value rules it out. Not supported yet for Stata files, nor for .xpt & .por files. Tracking sentinels makes SAS files read on a single thread, so --jobs has no effect on them.',
    },
    {
      displayName: 'Sentinels Columns',
      name: 'sentinelsColumns',
      type: 'string',
      default: '',
      description: 'Comma-separated variables to keep sentinels for. Requires --sentinels-as. By default, every eligible variable: the numeric ones for SAS, those with declared missing values for SPSS.',
    },
    {
      displayName: 'Sentinels Embedded',
      name: 'sentinelsEmbedded',
      type: 'boolean',
      default: false,
      description: 'Write each sentinel into its variable\'s own column instead of a <name>_null column. Those columns then mix numbers & sentinels. Requires --sentinels-as.',
    },
    {
      displayName: 'Value Labels',
      name: 'valueLabels',
      type: 'boolean',
      default: false,
      description: 'Decode coded values to their label strings (e.g. 1 becomes "Male") instead of writing the underlying codes. Stata & SPSS only - SAS keeps its value labels in a separate .sas7bcat catalog, which this command does not read yet.',
    },
    ],
  },
];
