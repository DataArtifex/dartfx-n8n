import type { INodeProperties } from "n8n-workflow";

export const JsonDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["json"],
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
        operation: ["json"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv json",
    displayOptions: {
      show: {
        operation: ["json"],
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
        operation: ["json"],
      },
    },
    options: [
      {
        displayName: "Jaq",
        name: "jaq",
        type: "string",
        default: "",
        description:
          "Filter JSON data using jaq syntax (https://github.com/01mf02/jaq),",
      },
      {
        displayName: "Select",
        name: "select",
        type: "string",
        default: "",
        description: "Select, reorder or drop columns for output.",
      },
    ],
  },
];
