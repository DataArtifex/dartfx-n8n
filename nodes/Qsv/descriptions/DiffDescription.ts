import type { INodeProperties } from "n8n-workflow";

export const DiffDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["diff"],
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
        operation: ["diff"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv diff",
    displayOptions: {
      show: {
        operation: ["diff"],
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
        operation: ["diff"],
      },
    },
    options: [
      {
        displayName: "No Headers Left",
        name: "noHeadersLeft",
        type: "boolean",
        default: false,
        description: "When set, the first row will be considered as part of",
      },
      {
        displayName: "No Headers Right",
        name: "noHeadersRight",
        type: "boolean",
        default: false,
        description: "When set, the first row will be considered as part of",
      },
      {
        displayName: "No Headers Output",
        name: "noHeadersOutput",
        type: "boolean",
        default: false,
        description: "When set, the diff result won't have a header row in",
      },
      {
        displayName: "Delimiter Left",
        name: "delimiterLeft",
        type: "string",
        default: "",
        description: "The field delimiter for reading CSV data on the left.",
      },
      {
        displayName: "Delimiter Right",
        name: "delimiterRight",
        type: "string",
        default: "",
        description: "The field delimiter for reading CSV data on the right.",
      },
      {
        displayName: "Delimiter Output",
        name: "delimiterOutput",
        type: "string",
        default: "",
        description: "The field delimiter for writing the CSV diff result.",
      },
      {
        displayName: "Key",
        name: "key",
        type: "string",
        default: "",
        description: "The column indices that uniquely identify a record",
      },
      {
        displayName: "Sort Columns",
        name: "sortColumns",
        type: "string",
        default: "",
        description: "The column indices by which the diff result should be",
      },
      {
        displayName: "Drop Equal Fields",
        name: "dropEqualFields",
        type: "boolean",
        default: false,
        description: "Drop values of equal fields in modified rows of the CSV",
      },
      {
        displayName: "Drop Equal Columns",
        name: "dropEqualColumns",
        type: "boolean",
        default: false,
        description: "Drop entire columns from the diff result that have no",
      },
      {
        displayName: "Jobs",
        name: "jobs",
        type: "string",
        default: "",
        description: "The number of jobs to run in parallel.",
      },
      {
        displayName: "Delimiter",
        name: "delimiter",
        type: "string",
        default: "",
        description: "Set ALL delimiters to this character.",
      },
    ],
  },
];
