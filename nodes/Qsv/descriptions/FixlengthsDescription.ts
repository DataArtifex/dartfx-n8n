import type { INodeProperties } from "n8n-workflow";

export const FixlengthsDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["fixlengths"],
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
        operation: ["fixlengths"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description:
      "Additional raw command line arguments to pass to qsv fixlengths",
    displayOptions: {
      show: {
        operation: ["fixlengths"],
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
        operation: ["fixlengths"],
      },
    },
    options: [
      {
        displayName: "Length",
        name: "length",
        type: "string",
        default: "",
        description: "Forcefully set the length of each record. If a",
      },
      {
        displayName: "Remove Empty",
        name: "removeEmpty",
        type: "boolean",
        default: false,
        description: "Remove empty columns.",
      },
      {
        displayName: "Insert",
        name: "insert",
        type: "string",
        default: "",
        description: "If empty fields need to be inserted, insert them",
      },
      {
        displayName: "Quote",
        name: "quote",
        type: "string",
        default: '"',
        description: 'The quote character to use. [default: "]',
      },
      {
        displayName: "Escape",
        name: "escape",
        type: "string",
        default: "",
        description: "The escape character to use. When not specified,",
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
        description: "Don't print removed column information.",
      },
    ],
  },
];
