import type { INodeProperties } from "n8n-workflow";

export const LuauDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["luau"],
      },
    },
  },
  {
    displayName: "Output File Path",
    name: "outputPath",
    type: "string",
    default: "",
    description:
      "Optional path to write output file directly to disk (if omitted, results are returned in node output)",
    displayOptions: {
      show: {
        operation: ["luau"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv luau",
    displayOptions: {
      show: {
        operation: ["luau"],
      },
    },
  },
  {
    displayName: "Options",
    name: "options",
    type: "collection",
    placeholder: "Add Option",
    default: {},
    displayOptions: {
      show: {
        operation: ["luau"],
      },
    },
    options: [
      {
        displayName: "No Globals",
        name: "noGlobals",
        type: "boolean",
        default: false,
        description: "Don't create Luau global variables for each column,",
      },
      {
        displayName: "Colindex",
        name: "colindex",
        type: "boolean",
        default: false,
        description:
          "Create a 1-based column index. Useful when some column names",
      },
      {
        displayName: "Remap",
        name: "remap",
        type: "boolean",
        default: false,
        description:
          "Only the listed new columns are written to the output CSV.",
      },
      {
        displayName: "Begin",
        name: "begin",
        type: "string",
        default: "",
        description: "Luau script/file to execute in the BEGINning, before",
      },
      {
        displayName: "End",
        name: "end",
        type: "string",
        default: "",
        description:
          "Luau script/file to execute at the END, after processing the",
      },
      {
        displayName: "Max Errors",
        name: "maxErrors",
        type: "string",
        default: "",
        description:
          "The maximum number of errors to tolerate before aborting.",
      },
      {
        displayName: "Timeout",
        name: "timeout",
        type: "string",
        default: "",
        description: "Timeout for downloading lookup_tables using",
      },
      {
        displayName: "Ckan Api",
        name: "ckanApi",
        type: "string",
        default: "",
        description:
          "The URL of the CKAN API to use for downloading lookup_table",
      },
      {
        displayName: "Ckan Token",
        name: "ckanToken",
        type: "string",
        default: "",
        description: "The CKAN API token to use. Only required if downloading",
      },
      {
        displayName: "Cache Dir",
        name: "cacheDir",
        type: "string",
        default: "",
        description: "The directory to use for caching downloaded lookup_table",
      },
      {
        displayName: "No Headers",
        name: "noHeaders",
        type: "boolean",
        default: false,
        description: "When set, the first row will not be interpreted",
      },
      {
        displayName: "Delimiter",
        name: "delimiter",
        type: "string",
        default: "",
        description: "The field delimiter for reading CSV data.",
      },
      {
        displayName: "Progressbar",
        name: "progressbar",
        type: "boolean",
        default: false,
        description: "Show progress bars. Not valid for stdin.",
      },
    ],
  },
];
