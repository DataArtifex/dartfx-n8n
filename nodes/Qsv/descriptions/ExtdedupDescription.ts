import type { INodeProperties } from "n8n-workflow";

export const ExtdedupDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["extdedup"],
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
        operation: ["extdedup"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description:
      "Additional raw command line arguments to pass to qsv extdedup",
    displayOptions: {
      show: {
        operation: ["extdedup"],
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
        operation: ["extdedup"],
      },
    },
    options: [
      {
        displayName: "Select",
        name: "select",
        type: "string",
        default: "",
        description: "Select a subset of columns to dedup.",
      },
      {
        displayName: "No Output",
        name: "noOutput",
        type: "boolean",
        default: false,
        description: "Do not write deduplicated output to <output>.",
      },
      {
        displayName: "Dupes Output",
        name: "dupesOutput",
        type: "string",
        default: "",
        description: "Write duplicates to <file>.",
      },
      {
        displayName: "Human Readable",
        name: "humanReadable",
        type: "boolean",
        default: false,
        description: "Comma separate duplicate count.",
      },
      {
        displayName: "Memory Limit",
        name: "memoryLimit",
        type: "string",
        default: "",
        description: "How much memory to use before deduping switches to a",
      },
      {
        displayName: "Temp Dir",
        name: "tempDir",
        type: "string",
        default: "",
        description: "Directory to store temporary hash table file.",
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
        displayName: "Quiet",
        name: "quiet",
        type: "boolean",
        default: false,
        description: "Do not print duplicate count to stderr.",
      },
    ],
  },
];
