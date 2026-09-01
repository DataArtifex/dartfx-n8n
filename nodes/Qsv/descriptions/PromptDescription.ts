import type { INodeProperties } from "n8n-workflow";

export const PromptDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["prompt"],
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
        operation: ["prompt"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv prompt",
    displayOptions: {
      show: {
        operation: ["prompt"],
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
        operation: ["prompt"],
      },
    },
    options: [
      {
        displayName: "Msg",
        name: "msg",
        type: "string",
        default: "",
        description: "The prompt message to display in the file dialog title.",
      },
      {
        displayName: "Filters",
        name: "filters",
        type: "string",
        default: "",
        description:
          'The filter to use for the INPUT file dialog. Set to "None" to',
      },
      {
        displayName: "Workdir",
        name: "workdir",
        type: "string",
        default: "",
        description: "The directory to start the file dialog in.",
      },
      {
        displayName: "Fd Output",
        name: "fdOutput",
        type: "boolean",
        default: false,
        description: "Write output to a file by using a save file dialog.",
      },
      {
        displayName: "Save Fname",
        name: "saveFname",
        type: "string",
        default: "",
        description:
          "The filename to save the output as when using --fd-output.",
      },
      {
        displayName: "Base Delay Ms",
        name: "baseDelayMs",
        type: "string",
        default: "",
        description:
          "The base delay in milliseconds to use when opening INPUT dialog.",
      },
      {
        displayName: "Quiet",
        name: "quiet",
        type: "boolean",
        default: false,
        description: "Do not print --fd-output message to stderr.",
      },
    ],
  },
];
