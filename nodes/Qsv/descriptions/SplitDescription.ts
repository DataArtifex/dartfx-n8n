import type { INodeProperties } from "n8n-workflow";

export const SplitDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["split"],
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
        operation: ["split"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv split",
    displayOptions: {
      show: {
        operation: ["split"],
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
        operation: ["split"],
      },
    },
    options: [
      {
        displayName: "Size",
        name: "size",
        type: "string",
        default: "",
        description: "The number of records to write into each chunk.",
      },
      {
        displayName: "Chunks",
        name: "chunks",
        type: "string",
        default: "",
        description: "The number of chunks to split the data into.",
      },
      {
        displayName: "Kb Size",
        name: "kbSize",
        type: "string",
        default: "",
        description: "The size of each chunk in kilobytes. The number of rows",
      },
      {
        displayName: "Jobs",
        name: "jobs",
        type: "string",
        default: "",
        description: "The number of splitting jobs to run in parallel.",
      },
      {
        displayName: "Filename",
        name: "filename",
        type: "string",
        default: "",
        description: "A filename template to use when constructing",
      },
      {
        displayName: "Pad",
        name: "pad",
        type: "string",
        default: "",
        description: "The zero padding width that is used in the",
      },
      {
        displayName: "Filter",
        name: "filter",
        type: "string",
        default: "",
        description:
          "Run the specified command on each chunk after it is written.",
      },
      {
        displayName: "Filter Cleanup",
        name: "filterCleanup",
        type: "boolean",
        default: false,
        description:
          "Cleanup the original output filename AFTER the filter command",
      },
      {
        displayName: "Filter Ignore Errors",
        name: "filterIgnoreErrors",
        type: "boolean",
        default: false,
        description: "Ignore errors when running the filter command.",
      },
      {
        displayName: "No Headers",
        name: "noHeaders",
        type: "boolean",
        default: false,
        description: "When set, the first row will NOT be interpreted",
      },
      {
        displayName: "Delimiter",
        name: "delimiter",
        type: "string",
        default: "",
        description: "The field delimiter for reading CSV data.",
      },
      {
        displayName: "Quiet",
        name: "quiet",
        type: "boolean",
        default: false,
        description: "Do not display an output summary to stderr.",
      },
    ],
  },
];
