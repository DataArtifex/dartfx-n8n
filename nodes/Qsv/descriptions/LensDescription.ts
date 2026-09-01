import type { INodeProperties } from "n8n-workflow";

export const LensDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["lens"],
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
        operation: ["lens"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv lens",
    displayOptions: {
      show: {
        operation: ["lens"],
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
        operation: ["lens"],
      },
    },
    options: [
      {
        displayName: "Delimiter",
        name: "delimiter",
        type: "string",
        default: "",
        description: "Delimiter character (comma by default)",
      },
      {
        displayName: "Tab Separated",
        name: "tabSeparated",
        type: "boolean",
        default: false,
        description: "Use tab separation. Shortcut for -d '\t'",
      },
      {
        displayName: "No Headers",
        name: "noHeaders",
        type: "boolean",
        default: false,
        description: "Do not interpret the first row as headers",
      },
      {
        displayName: "Columns",
        name: "columns",
        type: "string",
        default: "",
        description: "Use this regex to select columns to display by default.",
      },
      {
        displayName: "Filter",
        name: "filter",
        type: "string",
        default: "",
        description: "Use this regex to filter rows to display by default.",
      },
      {
        displayName: "Find",
        name: "find",
        type: "string",
        default: "",
        description: "Use this regex to find and highlight matches by default.",
      },
      {
        displayName: "Ignore Case",
        name: "ignoreCase",
        type: "boolean",
        default: false,
        description: "Searches ignore case. Ignored if any uppercase letters",
      },
      {
        displayName: "Freeze Columns",
        name: "freezeColumns",
        type: "string",
        default: "",
        description: "Freeze the first N columns",
      },
      {
        displayName: "Monochrome",
        name: "monochrome",
        type: "boolean",
        default: false,
        description: "Disable color output",
      },
      {
        displayName: "Wrap Mode",
        name: "wrapMode",
        type: "string",
        default: "",
        description: "Set the wrap mode for the output.",
      },
      {
        displayName: "Auto Reload",
        name: "autoReload",
        type: "boolean",
        default: false,
        description: "Automatically reload the data when the file changes.",
      },
      {
        displayName: "Streaming Stdin",
        name: "streamingStdin",
        type: "boolean",
        default: false,
        description:
          "Enable streaming stdin (load input as it's being piped in)",
      },
      {
        displayName: "Prompt",
        name: "prompt",
        type: "string",
        default: "",
        description:
          "Set a custom prompt in the status bar. Normally paired w/ --echo-column:",
      },
      {
        displayName: "Echo Column",
        name: "echoColumn",
        type: "string",
        default: "",
        description:
          "Print the value of this column to stdout for the selected row",
      },
      {
        displayName: "Debug",
        name: "debug",
        type: "boolean",
        default: false,
        description: "Show stats for debugging",
      },
    ],
  },
];
