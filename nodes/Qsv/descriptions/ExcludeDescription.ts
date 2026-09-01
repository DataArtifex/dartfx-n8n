import type { INodeProperties } from "n8n-workflow";

export const ExcludeDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["exclude"],
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
        operation: ["exclude"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv exclude",
    displayOptions: {
      show: {
        operation: ["exclude"],
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
        operation: ["exclude"],
      },
    },
    options: [
      {
        displayName: "Ignore Case",
        name: "ignoreCase",
        type: "boolean",
        default: false,
        description: "When set, matching is done case insensitively.",
      },
      {
        displayName: "Invert",
        name: "invert",
        type: "boolean",
        default: false,
        description: "When set, matching rows will be the only ones included,",
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
        description: "Check if there is enough memory to load <input2>",
      },
    ],
  },
];
