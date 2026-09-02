import type { INodeProperties } from 'n8n-workflow';

export const SafenamesDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['safenames'],
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
        operation: ['safenames'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv safenames (Docs: https://github.com/dathere/qsv/blob/master/docs/help/safenames.md)',
    displayOptions: {
      show: {
        operation: ['safenames'],
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
        operation: ['safenames'],
      },
    },
    options: [
    {
      displayName: 'Collapse',
      name: 'collapse',
      type: 'boolean',
      default: false,
      description: 'Collapse consecutive runs of non-alphanumeric characters into a single _. Composes with ALL modes (including verify & JSON modes). Implied by --mode s and --mode S.',
    },
    {
      displayName: 'Delimiter',
      name: 'delimiter',
      type: 'string',
      default: '',
      description: 'The field delimiter for reading CSV data. Must be a single character. (default: ,)',
    },
    {
      displayName: 'Mode',
      name: 'mode',
      type: 'string',
      default: '',
      description: 'Rename header names to "safe" names — guaranteed "database-ready" names. Mode is selected by the FIRST character: c/C conditional, a/A always, s safer, S Safer (unicode), v verify, V Verbose, j JSON, J pretty JSON (case matters for s vs S, v vs V and j vs J; --mode verbose maps to \'v\', NOT V). Mode details: c, C  - conditional. Check first before renaming; preserves "quoted identifiers" (mixed case with embedded spaces). a, A  - always. Rename every header, even safe ones. s     - safer. Like always, but collapses runs of non-alphanumeric characters into a single _ (ASCII-only). Same as always + collapse. S     - Safer (unicode). Like s, but preserves unicode letters & numbers instead of stripping to ASCII. Same as always + collapse + unicode. v     - verify. Count unsafe headers; result to stderr. V     - Verbose. Like verify, but also lists header count, duplicates, unsafe & safe headers. j     - JSON. Verbose data as minified JSON to stdout. J     - Pretty JSON. Verbose data as pretty-printed JSON. Quoted identifiers are only treated as safe in conditional mode; verify, Verbose, and the JSON modes flag them as unsafe. [default: Always]',
    },
    {
      displayName: 'Prefix',
      name: 'prefix',
      type: 'string',
      default: '',
      description: 'Certain systems do not allow header names to start with "_" (e.g. CKAN Datastore). This option allows the specification of the unsafe prefix to use when a header starts with "_". [default: unsafe_]',
    },
    {
      displayName: 'Reserved',
      name: 'reserved',
      type: 'string',
      default: '',
      description: 'Comma-delimited list of additional case-insensitive reserved names that should be considered "unsafe." If a header name is found in the reserved list, it will be prefixed with "reserved_". [default: _id]',
    },
    {
      displayName: 'Unicode',
      name: 'unicode',
      type: 'boolean',
      default: false,
      description: 'Preserve unicode letters & numbers instead of stripping to ASCII. Composes with ALL modes (including verify & JSON modes). Implied by --mode S.',
    },
    ],
  },
];
