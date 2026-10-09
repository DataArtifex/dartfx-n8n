import type { INodeProperties } from 'n8n-workflow';

export const LuauDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['luau'],
      },
    },
  },
  {
    displayName: 'Subcommand',
    name: 'subcommand',
    type: 'options',
    required: true,
    default: 'filter',
    options: [
        { name: 'filter', value: 'filter' },
        { name: 'map', value: 'map' },
    ],
    description: 'Subcommand to execute. Valid values: filter, map',
    displayOptions: {
      show: {
        operation: ['luau'],
      },
    },
  },
  {
    displayName: 'New Columns',
    name: 'newColumns',
    type: 'string',
    required: false,
    default: '',
    description: 'is a comma-separated list of new computed columns to add to the CSV when using "luau map". The new columns are added to the CSV after the existing columns, unless the --remap option is used.',
    displayOptions: {
      show: {
        operation: ['luau'],
      },
    },
  },
  {
    displayName: 'Main Script',
    name: 'mainScript',
    type: 'string',
    required: true,
    default: '',
    description: 'The MAIN Luau script, executed for EACH ROW: the Luau code itself or, if it starts with "file:" or ends with ".luau"/".lua", the file to load it from. In map mode it returns the new column value/s; in filter mode, a boolean saying whether to keep the row.',
    displayOptions: {
      show: {
        operation: ['luau'],
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
        operation: ['luau'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv luau [⚡ Runs faster when CSV index (.qsv.idx) is present.] (Docs: https://github.com/dathere/qsv/blob/master/docs/help/luau.md)',
    displayOptions: {
      show: {
        operation: ['luau'],
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
        operation: ['luau'],
      },
    },
    options: [
    {
      displayName: 'Begin',
      name: 'begin',
      type: 'string',
      default: '',
      description: 'Luau script/file to execute in the BEGINning, before processing the CSV with the main-script. Typically used to initialize global variables. Takes precedence over an embedded BEGIN script. If <script> begins with "file:" or ends with ".luau/.lua", it\'s interpreted as a filepath from which to load the script.',
    },
    {
      displayName: 'Cache Dir',
      name: 'cacheDir',
      type: 'string',
      default: '~/.qsv-cache',
      description: 'The directory to use for caching downloaded lookup_table resources using the qsv_register_lookup() helper function. If the directory does not exist, qsv will attempt to create it. If the QSV_CACHE_DIR envvar is set, it will be used instead.',
    },
    {
      displayName: 'Ckan Api',
      name: 'ckanApi',
      type: 'string',
      default: 'https://data.dathere.com/api/3/action',
      description: 'The URL of the CKAN API to use for downloading lookup_table resources using the qsv_register_lookup() helper function with the "ckan://" scheme. If the QSV_CKAN_API envvar is set, it will be used instead.',
    },
    {
      displayName: 'Colindex',
      name: 'colindex',
      type: 'boolean',
      default: false,
      description: 'Create a 1-based column index. Useful when some column names mask standard Luau globals. Automatically enabled with --no-headers.',
    },
    {
      displayName: 'Delimiter',
      name: 'delimiter',
      type: 'string',
      default: '',
      description: 'The field delimiter for reading CSV data. Must be a single character. (default: ,)',
    },
    {
      displayName: 'End',
      name: 'end',
      type: 'string',
      default: '',
      description: 'Luau script/file to execute at the END, after processing the CSV with the main-script. Typically used for aggregations. The output of the END script is sent to stderr. Takes precedence over an embedded END script. If <script> begins with "file:" or ends with ".luau/.lua", it\'s interpreted as a filepath from which to load the script.',
    },
    {
      displayName: 'Max Errors',
      name: 'maxErrors',
      type: 'number',
      default: 10,
      description: 'The maximum number of errors to tolerate before aborting. Set to zero to disable error limit.',
    },
    {
      displayName: 'No Globals',
      name: 'noGlobals',
      type: 'boolean',
      default: false,
      description: 'Don\'t create Luau global variables for each column, only `col`. Useful when some column names mask standard Luau globals and to increase PERFORMANCE. Note: access to Luau globals thru _G remains even with -g.',
    },
    {
      displayName: 'No Headers',
      name: 'noHeaders',
      type: 'boolean',
      default: false,
      description: 'When set, the first row will not be interpreted as headers. Automatically enables --colindex option.',
    },
    {
      displayName: 'Remap',
      name: 'remap',
      type: 'boolean',
      default: false,
      description: 'Only the listed new columns are written to the output CSV. Only applies to "map" subcommand.',
    },
    {
      displayName: 'Timeout',
      name: 'timeout',
      type: 'number',
      default: 60,
      description: 'Timeout for downloading lookup_tables using the qsv_register_lookup() helper function.',
    },
    ],
  },
];
