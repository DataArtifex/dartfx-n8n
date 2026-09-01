import type { INodeProperties } from "n8n-workflow";

export const TransposeDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["transpose"],
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
        operation: ["transpose"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description:
      "Additional raw command line arguments to pass to qsv transpose",
    displayOptions: {
      show: {
        operation: ["transpose"],
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
        operation: ["transpose"],
      },
    },
    options: [
      {
        displayName: "Multipass",
        name: "multipass",
        type: "boolean",
        default: false,
        description: "Process the transpose by making multiple passes",
      },
      {
        displayName: "Select",
        name: "select",
        type: "string",
        default: "",
        description: "Select a subset of columns to transpose.",
      },
      {
        displayName: "Long",
        name: "long",
        type: "string",
        default: "",
        description: 'Convert wide-format CSV to "long" format.',
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
