import type { INodeProperties } from 'n8n-workflow';

export const WritestatDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['writestat'],
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
        operation: ['writestat'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv writestat [⚠️ High memory operation.] (Docs: https://github.com/dathere/qsv/blob/master/docs/help/writestat.md)',
    displayOptions: {
      show: {
        operation: ['writestat'],
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
        operation: ['writestat'],
      },
    },
    options: [
    {
      displayName: 'Compress',
      name: 'compress',
      type: 'boolean',
      default: false,
      description: 'Compress an SPSS .sav file (bytecode compression, which every SPSS version reads).',
    },
    {
      displayName: 'Delimiter',
      name: 'delimiter',
      type: 'string',
      default: '',
      description: 'The field delimiter for reading the CSV. Must be a single character. (default: ,)',
    },
    {
      displayName: 'Dictionary',
      name: 'dictionary',
      type: 'string',
      default: '',
      description: 'The JSON Schema data dictionary giving the variable metadata & types (see above).',
    },
    {
      displayName: 'Format',
      name: 'format',
      type: 'string',
      default: '',
      description: 'The format to write, if not the one the --output extension names. Valid values: sav, por, dta, xpt, xpt5, xpt8.',
    },
    {
      displayName: 'Lossy',
      name: 'lossy',
      type: 'boolean',
      default: false,
      description: 'Write the file even if metadata the format can\'t hold has to be left out, warning about each.',
    },
    {
      displayName: 'Table Name',
      name: 'tableName',
      type: 'string',
      default: '',
      description: 'The dataset name in a SAS transport file. Defaults to the dictionary\'s, else the --output file name.',
    },
    ],
  },
];
