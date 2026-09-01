import type { INodeProperties } from "n8n-workflow";

export const ImplodeDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["implode"],
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
        operation: ["implode"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv implode",
    displayOptions: {
      show: {
        operation: ["implode"],
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
        operation: ["implode"],
      },
    },
    options: [
      {
        displayName: "Keys",
        name: "keys",
        type: "string",
        default: "",
        description: "Key column(s) to group by. Supports the usual",
      },
      {
        displayName: "Value",
        name: "value",
        type: "string",
        default: "",
        description: "The column whose values will be joined per group.",
      },
      {
        displayName: "Rename",
        name: "rename",
        type: "string",
        default: "",
        description: "New name for the imploded value column.",
      },
      {
        displayName: "Sorted",
        name: "sorted",
        type: "boolean",
        default: false,
        description: "Assume input is pre-sorted by the key column(s).",
      },
      {
        displayName: "Skip Empty",
        name: "skipEmpty",
        type: "boolean",
        default: false,
        description: "Skip empty values when joining. By default, empty",
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
