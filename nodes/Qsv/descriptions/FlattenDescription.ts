import type { INodeProperties } from "n8n-workflow";

export const FlattenDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["flatten"],
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
        operation: ["flatten"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv flatten",
    displayOptions: {
      show: {
        operation: ["flatten"],
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
        operation: ["flatten"],
      },
    },
    options: [
      {
        displayName: "Condense",
        name: "condense",
        type: "string",
        default: "",
        description: "Limits the length of each field to the value",
      },
      {
        displayName: "Field Separator",
        name: "fieldSeparator",
        type: "string",
        default: "",
        description: "A string of characters to write between a column name",
      },
      {
        displayName: "Separator",
        name: "separator",
        type: "string",
        default: "",
        description: "A string of characters to write after each record.",
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
    ],
  },
];
