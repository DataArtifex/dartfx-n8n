import type { INodeProperties } from 'n8n-workflow';

export const PragmastatDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['pragmastat'],
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
        operation: ['pragmastat'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv pragmastat (Docs: https://github.com/dathere/qsv/blob/master/docs/help/pragmastat.md)',
    displayOptions: {
      show: {
        operation: ['pragmastat'],
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
        operation: ['pragmastat'],
      },
    },
    options: [
    {
      displayName: 'Compare1',
      name: 'compare1',
      type: 'string',
      default: '',
      description: 'One-sample confirmatory analysis. Test center/spread against thresholds. Format: metric:value[,metric:value,...]. Mutually exclusive with --twosample and --compare2.',
    },
    {
      displayName: 'Compare2',
      name: 'compare2',
      type: 'string',
      default: '',
      description: 'Two-sample confirmatory analysis. Test shift/ratio/disparity against thresholds. Format: metric:value[,metric:value,...]. Mutually exclusive with --twosample and --compare1.',
    },
    {
      displayName: 'Delimiter',
      name: 'delimiter',
      type: 'string',
      default: '',
      description: 'The field delimiter for reading/writing CSV data. Must be a single character. (default: ,)',
    },
    {
      displayName: 'Force',
      name: 'force',
      type: 'boolean',
      default: false,
      description: 'Force recomputing ps_* columns even if they already exist in the stats cache.',
    },
    {
      displayName: 'Jobs',
      name: 'jobs',
      type: 'string',
      default: '',
      description: 'The number of jobs to run in parallel. When not set, the number of jobs is set to the number of CPUs detected.',
    },
    {
      displayName: 'Memcheck',
      name: 'memcheck',
      type: 'boolean',
      default: false,
      description: 'Check if there is enough memory to load the entire CSV into memory using CONSERVATIVE heuristics. Not valid for stdin.',
    },
    {
      displayName: 'Misrate',
      name: 'misrate',
      type: 'string',
      default: '',
      description: 'Probability that bounds fail to contain the true parameter. Lower values produce wider bounds. Must be achievable for the given sample size. [default: 0.001]',
    },
    {
      displayName: 'No Bounds',
      name: 'noBounds',
      type: 'boolean',
      default: false,
      description: 'Skip confidence bounds computation (~2x faster). Incompatible with --compare1/--compare2.',
    },
    {
      displayName: 'No Headers',
      name: 'noHeaders',
      type: 'boolean',
      default: false,
      description: 'When set, the first row will not be treated as headers.',
    },
    {
      displayName: 'Round',
      name: 'round',
      type: 'string',
      default: '',
      description: 'Round statistics to <n> decimal places. Rounding follows Midpoint Nearest Even (Bankers Rounding) rule. [default: 4]',
    },
    {
      displayName: 'Seed',
      name: 'seed',
      type: 'string',
      default: '',
      description: 'Seed for reproducible subsampling. If not specified, defaults to 42 when --subsample is used.',
    },
    {
      displayName: 'Select',
      name: 'select',
      type: 'string',
      default: '',
      description: 'Select columns for analysis. Uses qsv\'s column selection syntax. Non-numeric columns appear with n=0. In two-sample mode, all pairs of selected columns are computed.',
    },
    {
      displayName: 'Standalone',
      name: 'standalone',
      type: 'boolean',
      default: false,
      description: 'Output one-sample results as standalone CSV instead of appending to the stats cache.',
    },
    {
      displayName: 'Stats Options',
      name: 'statsOptions',
      type: 'string',
      default: '',
      description: 'Options to pass to the stats command if baseline stats need to be generated. The options are passed as a single string that will be split by whitespace. [default: --infer-dates --infer-boolean --mad --quartiles --force --stats-jsonl]',
    },
    {
      displayName: 'Subsample',
      name: 'subsample',
      type: 'string',
      default: '',
      description: 'Randomly subsample N values per column before computing. Speeds up large datasets while maintaining statistical robustness. Recommended: 10000-50000 for exploratory analysis.',
    },
    {
      displayName: 'Twosample',
      name: 'twosample',
      type: 'boolean',
      default: false,
      description: 'Compute two-sample estimators for all column pairs.',
    },
    ],
  },
];
