import type { INodeProperties } from 'n8n-workflow';

export const TransposeDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['transpose'],
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
        operation: ['transpose'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv transpose (Docs: https://github.com/dathere/qsv/blob/master/docs/help/transpose.md)',
    displayOptions: {
      show: {
        operation: ['transpose'],
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
        operation: ['transpose'],
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
      displayName: 'Long',
      name: 'long',
      type: 'string',
      default: '',
      description: 'Convert wide-format CSV to "long" format. Output format is three columns: field, attribute, value. Empty values are skipped. Mutually exclusive with --multipass. The <selection> argument is REQUIRED when using --long, it specifies which column(s) to use as the "field" identifier. It uses the same selection syntax as \'qsv select\': * Column names: --long varname or --long "column name" * Column indices (1-based): --long 5 or --long 2,3 * Ranges: --long 1-4 or --long 3- * Regex patterns: --long /^prefix/ * Comma-separated: --long var1,var2 or --long 1,3,5 Multiple field columns are concatenated with | separator.',
    },
    {
      displayName: 'Memcheck',
      name: 'memcheck',
      type: 'boolean',
      default: false,
      description: 'Check if there is enough memory to load the entire CSV into memory using CONSERVATIVE heuristics. Ignored when --multipass or --long option is enabled.',
    },
    {
      displayName: 'Multipass',
      name: 'multipass',
      type: 'boolean',
      default: false,
      description: 'Process the transpose by making multiple passes over the dataset. Consumes memory relative to the number of rows. Note that in general it is faster to process the transpose in memory. Useful for really big datasets as the default is to read the entire dataset into memory.',
    },
    {
      displayName: 'Select',
      name: 'select',
      type: 'string',
      default: '',
      description: 'Select a subset of columns to transpose. When used with --long, this filters which columns become attribute rows (the field columns are unaffected). See \'qsv select --help\' for the full selection syntax.',
    },
    ],
  },
];
