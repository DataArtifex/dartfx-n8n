import type { INodeProperties } from "n8n-workflow";

export const ColorDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["color"],
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
        operation: ["color"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv color",
    displayOptions: {
      show: {
        operation: ["color"],
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
        operation: ["color"],
      },
    },
    options: [
      {
        displayName: "Color",
        name: "color",
        type: "boolean",
        default: false,
        description: "Force color on, even in situations where colors",
      },
      {
        displayName: "Row Numbers",
        name: "rowNumbers",
        type: "boolean",
        default: false,
        description: "Show row numbers.",
      },
      {
        displayName: "Title",
        name: "title",
        type: "string",
        default: "",
        description: "Add a title row above the headers.",
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
