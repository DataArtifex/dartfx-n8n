import type { INodeProperties } from "n8n-workflow";

export const SortDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["sort"],
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
        operation: ["sort"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv sort",
    displayOptions: {
      show: {
        operation: ["sort"],
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
        operation: ["sort"],
      },
    },
    options: [
      {
        displayName: "Select",
        name: "select",
        type: "string",
        default: "",
        description: "Select a subset of columns to sort.",
      },
      {
        displayName: "Numeric",
        name: "numeric",
        type: "boolean",
        default: false,
        description: "Compare according to string numerical value",
      },
      {
        displayName: "Natural",
        name: "natural",
        type: "boolean",
        default: false,
        description: "Compare strings using natural sort order",
      },
      {
        displayName: "Reverse",
        name: "reverse",
        type: "boolean",
        default: false,
        description: "Reverse order",
      },
      {
        displayName: "Ignore Case",
        name: "ignoreCase",
        type: "boolean",
        default: false,
        description: "Compare strings disregarding case.",
      },
      {
        displayName: "Unique",
        name: "unique",
        type: "boolean",
        default: false,
        description: "When set, identical consecutive lines will be dropped",
      },
      {
        displayName: "Random",
        name: "random",
        type: "boolean",
        default: false,
        description: "Randomize (scramble) the data by row.",
      },
      {
        displayName: "Seed",
        name: "seed",
        type: "string",
        default: "",
        description:
          "Random Number Generator (RNG) seed to use if --random is set",
      },
      {
        displayName: "Rng",
        name: "rng",
        type: "string",
        default: "",
        description: "The RNG algorithm to use if --random is set.",
      },
      {
        displayName: "Jobs",
        name: "jobs",
        type: "string",
        default: "",
        description: "The number of jobs to run in parallel.",
      },
      {
        displayName: "Faster",
        name: "faster",
        type: "boolean",
        default: false,
        description: "When set, the sort will be faster. This is done by",
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
        description: "Check if there is enough memory to load the entire",
      },
    ],
  },
];
