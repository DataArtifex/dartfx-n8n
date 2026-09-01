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
        displayName: "Human Readable",
        name: "humanReadable",
        type: "boolean",
        default: false,
        description: "Comma separate counts.",
      },
      {
        displayName: "Width",
        name: "width",
        type: "boolean",
        default: false,
        description: "Also return the estimated widths of each record.",
      },
      {
        displayName: "Width No Delims",
        name: "widthNoDelims",
        type: "boolean",
        default: false,
        description:
          "Same as --width but does not count the delimiters in the width.",
      },
      {
        displayName: "Json",
        name: "json",
        type: "boolean",
        default: false,
        description: "Output the width stats in JSON format.",
      },
      {
        displayName: "No Polars",
        name: "noPolars",
        type: "boolean",
        default: false,
        description:
          'Use the "regular", single-threaded, streaming CSV reader instead',
      },
      {
        displayName: "Low Memory",
        name: "lowMemory",
        type: "boolean",
        default: false,
        description: "Use the Polars CSV Reader's low-memory mode. This mode",
      },
      {
        displayName: "Flexible",
        name: "flexible",
        type: "boolean",
        default: false,
        description: "Do not validate if the CSV has different number of",
      },
      {
        displayName: "No Headers",
        name: "noHeaders",
        type: "boolean",
        default: false,
        description: "When set, the first row will be included in",
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
