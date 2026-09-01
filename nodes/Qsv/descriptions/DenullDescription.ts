import type { INodeProperties } from "n8n-workflow";

export const DenullDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["denull"],
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
        operation: ["denull"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv denull",
    displayOptions: {
      show: {
        operation: ["denull"],
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
        operation: ["denull"],
      },
    },
    options: [
      {
        displayName: "Select",
        name: "select",
        type: "string",
        default: "",
        description: "Select the columns to scan. See `qsv select --help`",
      },
      {
        displayName: "Vocab",
        name: "vocab",
        type: "string",
        default: "",
        description: "Comma-separated null sentinel vocabulary, REPLACING",
      },
      {
        displayName: "Add Vocab",
        name: "addVocab",
        type: "string",
        default: "",
        description: "Comma-separated tokens to ADD to the built-in list.",
      },
      {
        displayName: "Max Distinct",
        name: "maxDistinct",
        type: "string",
        default: "",
        description: "Abandon a column once it holds this many distinct",
      },
      {
        displayName: "All Columns",
        name: "allColumns",
        type: "boolean",
        default: false,
        description: "Also report columns with nothing to flag. By default",
      },
      {
        displayName: "Apply",
        name: "apply",
        type: "boolean",
        default: false,
        description: "Rewrite the data instead of only reporting it. Blanks",
      },
      {
        displayName: "Json",
        name: "json",
        type: "boolean",
        default: false,
        description: "Emit the report as a JSON array instead of CSV.",
      },
      {
        displayName: "No Headers",
        name: "noHeaders",
        type: "boolean",
        default: false,
        description: "When set, the first row will NOT be interpreted as",
      },
      {
        displayName: "Delimiter",
        name: "delimiter",
        type: "string",
        default: "",
        description: "The field delimiter for reading CSV data.",
      },
    ],
  },
];
