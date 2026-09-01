import type { INodeProperties } from "n8n-workflow";

export const FillDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["fill"],
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
        operation: ["fill"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv fill",
    displayOptions: {
      show: {
        operation: ["fill"],
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
        operation: ["fill"],
      },
    },
    options: [
      {
        displayName: "Groupby",
        name: "groupby",
        type: "string",
        default: "",
        description: "Group by specified columns.",
      },
      {
        displayName: "First",
        name: "first",
        type: "boolean",
        default: false,
        description:
          "Fill using the first valid value of a column, instead of the latest.",
      },
      {
        displayName: "Backfill",
        name: "backfill",
        type: "boolean",
        default: false,
        description: "Fill initial empty values with the first valid value.",
      },
      {
        displayName: "Default",
        name: "default",
        type: "string",
        default: "",
        description: "Fill using this default value.",
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
