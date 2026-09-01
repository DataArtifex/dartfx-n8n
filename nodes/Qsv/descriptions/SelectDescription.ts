import type { INodeProperties } from "n8n-workflow";

export const SelectDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["select"],
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
        operation: ["select"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv select",
    displayOptions: {
      show: {
        operation: ["select"],
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
        operation: ["select"],
      },
    },
    options: [
      {
        displayName: "Random",
        name: "random",
        type: "boolean",
        default: false,
        description: "Randomly shuffle the columns in the selection.",
      },
      {
        displayName: "Seed",
        name: "seed",
        type: "string",
        default: "",
        description: "Seed for the random number generator.",
      },
      {
        displayName: "Sort",
        name: "sort",
        type: "boolean",
        default: false,
        description: "Sort the selected columns lexicographically,",
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
