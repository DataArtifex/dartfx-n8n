import type { INodeProperties } from "n8n-workflow";

export const SortcheckDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["sortcheck"],
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
        operation: ["sortcheck"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description:
      "Additional raw command line arguments to pass to qsv sortcheck",
    displayOptions: {
      show: {
        operation: ["sortcheck"],
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
        operation: ["sortcheck"],
      },
    },
    options: [
      {
        displayName: "Select",
        name: "select",
        type: "string",
        default: "",
        description: "Select a subset of columns to check for sort.",
      },
      {
        displayName: "Numeric",
        name: "numeric",
        type: "boolean",
        default: false,
        description: "Compare according to string numerical value.",
      },
      {
        displayName: "Natural",
        name: "natural",
        type: "boolean",
        default: false,
        description:
          "Compare using natural sort order (e.g. item1 < item2 < item10).",
      },
      {
        displayName: "Ignore Case",
        name: "ignoreCase",
        type: "boolean",
        default: false,
        description: "Compare strings disregarding case. Ignored under pure",
      },
      {
        displayName: "All",
        name: "all",
        type: "boolean",
        default: false,
        description: "Check all records. Do not stop/short-circuit the check",
      },
      {
        displayName: "Json",
        name: "json",
        type: "boolean",
        default: false,
        description: "Return results in JSON format, scanning --all records.",
      },
      {
        displayName: "Pretty Json",
        name: "prettyJson",
        type: "boolean",
        default: false,
        description: "Same as --json but in pretty JSON format.",
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
