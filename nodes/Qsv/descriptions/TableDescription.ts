import type { INodeProperties } from "n8n-workflow";

export const TableDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["table"],
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
        operation: ["table"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv table",
    displayOptions: {
      show: {
        operation: ["table"],
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
        operation: ["table"],
      },
    },
    options: [
      {
        displayName: "Width",
        name: "width",
        type: "string",
        default: "",
        description: "The minimum width of each column.",
      },
      {
        displayName: "Pad",
        name: "pad",
        type: "string",
        default: "",
        description: "The minimum number of spaces between each column.",
      },
      {
        displayName: "Align",
        name: "align",
        type: "string",
        default: "",
        description: "How entries should be aligned in a column.",
      },
      {
        displayName: "Condense",
        name: "condense",
        type: "string",
        default: "",
        description: "Limits the length of each field to the value",
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
