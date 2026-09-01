import type { INodeProperties } from "n8n-workflow";

export const SafenamesDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["safenames"],
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
        operation: ["safenames"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description:
      "Additional raw command line arguments to pass to qsv safenames",
    displayOptions: {
      show: {
        operation: ["safenames"],
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
        operation: ["safenames"],
      },
    },
    options: [
      {
        displayName: "Mode",
        name: "mode",
        type: "string",
        default: "",
        description: 'Rename header names to "safe" names — guaranteed',
      },
      {
        displayName: "Reserved",
        name: "reserved",
        type: "string",
        default: "",
        description:
          "Comma-delimited list of additional case-insensitive reserved names",
      },
      {
        displayName: "Prefix",
        name: "prefix",
        type: "string",
        default: "",
        description:
          'Certain systems do not allow header names to start with "_" (e.g. CKAN Datastore).',
      },
      {
        displayName: "Collapse",
        name: "collapse",
        type: "boolean",
        default: false,
        description:
          "Collapse consecutive runs of non-alphanumeric characters into a",
      },
      {
        displayName: "Unicode",
        name: "unicode",
        type: "boolean",
        default: false,
        description:
          "Preserve unicode letters & numbers instead of stripping to ASCII.",
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
