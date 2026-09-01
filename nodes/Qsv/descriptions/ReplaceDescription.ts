import type { INodeProperties } from "n8n-workflow";

export const ReplaceDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["replace"],
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
        operation: ["replace"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv replace",
    displayOptions: {
      show: {
        operation: ["replace"],
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
        operation: ["replace"],
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
        description:
          "Treat the regex pattern as a literal string. This allows you",
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
        displayName: "Unicode",
        name: "unicode",
        type: "boolean",
        default: false,
        description: "Enable unicode support. When enabled, character classes",
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
        displayName: "Not One",
        name: "notOne",
        type: "boolean",
        default: false,
        description: "Use exit code 0 instead of 1 for no replacement found.",
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
        description: "Do not print number of replacements to stderr.",
      },
    ],
  },
];
