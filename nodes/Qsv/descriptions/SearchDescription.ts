import type { INodeProperties } from "n8n-workflow";

export const SearchDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["search"],
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
        operation: ["search"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv search",
    displayOptions: {
      show: {
        operation: ["search"],
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
        operation: ["search"],
      },
    },
    options: [
      {
        displayName: "Ignore Case",
        name: "ignoreCase",
        type: "boolean",
        default: false,
        description: "Case insensitive search. This is equivalent to",
      },
      {
        displayName: "Literal",
        name: "literal",
        type: "boolean",
        default: false,
        description: "Treat the regex as a literal string. This allows you to",
      },
      {
        displayName: "Exact",
        name: "exact",
        type: "boolean",
        default: false,
        description: "Match the ENTIRE field exactly. Treats the pattern",
      },
      {
        displayName: "Select",
        name: "select",
        type: "string",
        default: "",
        description: "Select the columns to search. See 'qsv select -h'",
      },
      {
        displayName: "Invert Match",
        name: "invertMatch",
        type: "boolean",
        default: false,
        description: "Select only rows that did not match",
      },
      {
        displayName: "Unicode",
        name: "unicode",
        type: "boolean",
        default: false,
        description: "Enable unicode support. When enabled, character classes",
      },
      {
        displayName: "Flag",
        name: "flag",
        type: "string",
        default: "",
        description: "If given, the command will not filter rows",
      },
      {
        displayName: "Quick",
        name: "quick",
        type: "boolean",
        default: false,
        description: "Return on first match with an exitcode of 0, returning",
      },
      {
        displayName: "Preview Match",
        name: "previewMatch",
        type: "string",
        default: "",
        description: "Preview the first N matches OR all matches found",
      },
      {
        displayName: "Count",
        name: "count",
        type: "boolean",
        default: false,
        description: "Write the number of matches to stderr.",
      },
      {
        displayName: "Size Limit",
        name: "sizeLimit",
        type: "string",
        default: "",
        description: "Set the approximate size limit (MB) of the compiled",
      },
      {
        displayName: "Dfa Size Limit",
        name: "dfaSizeLimit",
        type: "string",
        default: "",
        description:
          "Set the approximate size of the cache (MB) used by the regular",
      },
      {
        displayName: "Json",
        name: "json",
        type: "boolean",
        default: false,
        description: "Output the result as JSON. Fields are written",
      },
      {
        displayName: "Not One",
        name: "notOne",
        type: "boolean",
        default: false,
        description: "Use exit code 0 instead of 1 for no match found.",
      },
      {
        displayName: "Jobs",
        name: "jobs",
        type: "string",
        default: "",
        description:
          "The number of jobs to run in parallel when the given CSV data has",
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
      {
        displayName: "Quiet",
        name: "quiet",
        type: "boolean",
        default: false,
        description: "Do not write the match count (--count) or the",
      },
    ],
  },
];
