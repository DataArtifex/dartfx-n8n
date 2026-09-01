import type { INodeProperties } from "n8n-workflow";

export const PartitionDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["partition"],
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
        operation: ["partition"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description:
      "Additional raw command line arguments to pass to qsv partition",
    displayOptions: {
      show: {
        operation: ["partition"],
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
        operation: ["partition"],
      },
    },
    options: [
      {
        displayName: "Filename",
        name: "filename",
        type: "string",
        default: "",
        description: "A filename template to use when constructing the",
      },
      {
        displayName: "Prefix Length",
        name: "prefixLength",
        type: "string",
        default: "",
        description: "Truncate the partition column after the",
      },
      {
        displayName: "Drop",
        name: "drop",
        type: "boolean",
        default: false,
        description: "Drop the partition column from results.",
      },
      {
        displayName: "Limit",
        name: "limit",
        type: "string",
        default: "",
        description: "Limit the number of simultaneously open files.",
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
    ],
  },
];
