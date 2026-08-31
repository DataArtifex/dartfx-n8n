import type { INodeProperties } from "n8n-workflow";

export const ReverseDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["reverse"],
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
        operation: ["reverse"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv reverse",
    displayOptions: {
      show: {
        operation: ["reverse"],
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
        operation: ["reverse"],
      },
    },
    options: [
      {
        displayName: "Output",
        name: "output",
        type: "string",
        default: "",
        description: "Write output to <file> instead of stdout.",
      },
      {
        displayName: "No Headers",
        name: "noHeaders",
        type: "string",
        default: "",
        description: "hen set, the first row will not be interpreted",
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
        type: "string",
        default: "",
        description: "heck if there is enough memory to load the entire",
      },
    ],
  },
];
