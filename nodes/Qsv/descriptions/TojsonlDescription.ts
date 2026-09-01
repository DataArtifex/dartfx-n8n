import type { INodeProperties } from "n8n-workflow";

export const TojsonlDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["tojsonl"],
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
        operation: ["tojsonl"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv tojsonl",
    displayOptions: {
      show: {
        operation: ["tojsonl"],
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
        operation: ["tojsonl"],
      },
    },
    options: [
      {
        displayName: "Trim",
        name: "trim",
        type: "boolean",
        default: false,
        description: "Trim leading and trailing whitespace from fields",
      },
      {
        displayName: "No Boolean",
        name: "noBoolean",
        type: "boolean",
        default: false,
        description: "Do not infer boolean fields.",
      },
      {
        displayName: "Jobs",
        name: "jobs",
        type: "string",
        default: "",
        description: "The number of jobs to run in parallel.",
      },
      {
        displayName: "Batch",
        name: "batch",
        type: "string",
        default: "",
        description: "The number of rows per batch to load into memory,",
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
      {
        displayName: "Quiet",
        name: "quiet",
        type: "boolean",
        default: false,
        description: "Do not display enum/const list inferencing messages.",
      },
    ],
  },
];
