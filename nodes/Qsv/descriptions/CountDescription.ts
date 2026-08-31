import type { INodeProperties } from "n8n-workflow";

export const CountDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["count"],
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
        operation: ["count"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv count",
    displayOptions: {
      show: {
        operation: ["count"],
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
        operation: ["count"],
      },
    },
    options: [
      {
        displayName: "Flexible",
        name: "flexible",
        type: "string",
        default: "",
        description: "o not validate if the CSV has different number of",
      },
      {
        displayName: "No Headers",
        name: "noHeaders",
        type: "string",
        default: "",
        description: "hen set, the first row will be included in",
      },
      {
        displayName: "Delimiter",
        name: "delimiter",
        type: "string",
        default: "",
        description: "The delimiter to use when reading CSV data.",
      },
    ],
  },
];
