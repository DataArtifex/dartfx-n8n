import type { INodeProperties } from "n8n-workflow";

export const SchemaDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["schema"],
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
        operation: ["schema"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv schema",
    displayOptions: {
      show: {
        operation: ["schema"],
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
        operation: ["schema"],
      },
    },
    options: [
      {
        displayName: "Enum Threshold",
        name: "enumThreshold",
        type: "string",
        default: "",
        description: "Cardinality threshold for adding enum constraints.",
      },
      {
        displayName: "Ignore Case",
        name: "ignoreCase",
        type: "boolean",
        default: false,
        description:
          "Ignore case when compiling unique values for enum constraints.",
      },
      {
        displayName: "Strict Dates",
        name: "strictDates",
        type: "boolean",
        default: false,
        description: "Enforce Internet Datetime format (RFC-3339) for",
      },
      {
        displayName: "Strict Formats",
        name: "strictFormats",
        type: "boolean",
        default: false,
        description: "Enforce JSON Schema format constraints for",
      },
      {
        displayName: "Pattern Columns",
        name: "patternColumns",
        type: "string",
        default: "",
        description: "Select columns to derive regex pattern constraints.",
      },
      {
        displayName: "Dates Whitelist",
        name: "datesWhitelist",
        type: "string",
        default: "",
        description: "The case-insensitive patterns to look for when",
      },
      {
        displayName: "Prefer Dmy",
        name: "preferDmy",
        type: "boolean",
        default: false,
        description: "Prefer to parse dates in dmy format.",
      },
      {
        displayName: "Force",
        name: "force",
        type: "boolean",
        default: false,
        description: "Force recomputing cardinality and unique values",
      },
      {
        displayName: "Stdout",
        name: "stdout",
        type: "boolean",
        default: false,
        description: "Send generated JSON schema file to stdout instead.",
      },
      {
        displayName: "Jobs",
        name: "jobs",
        type: "string",
        default: "",
        description: "The number of jobs to run in parallel.",
      },
      {
        displayName: "Polars",
        name: "polars",
        type: "boolean",
        default: false,
        description: "Infer a Polars schema instead of a JSON Schema.",
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
        displayName: "Memcheck",
        name: "memcheck",
        type: "boolean",
        default: false,
        description: "Check if there is enough memory to load the entire",
      },
    ],
  },
];
