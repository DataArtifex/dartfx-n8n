import type { INodeProperties } from "n8n-workflow";

export const InputDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["input"],
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
        operation: ["input"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv input",
    displayOptions: {
      show: {
        operation: ["input"],
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
        operation: ["input"],
      },
    },
    options: [
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
        displayName: "No Quoting",
        name: "noQuoting",
        type: "boolean",
        default: false,
        description: "Disable quoting completely when reading CSV data.",
      },
      {
        displayName: "Quote Style",
        name: "quoteStyle",
        type: "string",
        default: "",
        description: "The quoting style to use when writing CSV data.",
      },
      {
        displayName: "Skip Lines",
        name: "skipLines",
        type: "string",
        default: "",
        description: "The number of preamble CSV records to skip.",
      },
      {
        displayName: "Auto Skip",
        name: "autoSkip",
        type: "boolean",
        default: false,
        description: "Sniffs a CSV for preamble records and automatically",
      },
      {
        displayName: "Skip Lastlines",
        name: "skipLastlines",
        type: "string",
        default: "",
        description: "The number of epilogue CSV records to skip.",
      },
      {
        displayName: "Trim Headers",
        name: "trimHeaders",
        type: "boolean",
        default: false,
        description:
          "Trim leading & trailing whitespace & quotes from header values.",
      },
      {
        displayName: "Trim Fields",
        name: "trimFields",
        type: "boolean",
        default: false,
        description: "Trim leading & trailing whitespace from field values.",
      },
      {
        displayName: "Comment",
        name: "comment",
        type: "string",
        default: "",
        description: "The comment character to use (single-byte; only the",
      },
      {
        displayName: "Encoding Errors",
        name: "encodingErrors",
        type: "string",
        default: "",
        description: "How to handle UTF-8 encoding errors.",
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
