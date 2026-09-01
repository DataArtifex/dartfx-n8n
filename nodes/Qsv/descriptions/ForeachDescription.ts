import type { INodeProperties } from "n8n-workflow";

export const ForeachDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["foreach"],
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
        operation: ["foreach"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv foreach",
    displayOptions: {
      show: {
        operation: ["foreach"],
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
        operation: ["foreach"],
      },
    },
    options: [
      {
        displayName: "Unify",
        name: "unify",
        type: "boolean",
        default: false,
        description: "If the output of the executed command is a CSV,",
      },
      {
        displayName: "New Column",
        name: "newColumn",
        type: "string",
        default: "",
        description: "If unifying, add a new column with given name",
      },
      {
        displayName: "Dry Run",
        name: "dryRun",
        type: "string",
        default: "",
        description:
          "If set to true (the default for safety reasons), the commands are",
      },
      {
        displayName: "No Headers",
        name: "noHeaders",
        type: "boolean",
        default: false,
        description: "When set, the file will be considered to have no",
      },
      {
        displayName: "Delimiter",
        name: "delimiter",
        type: "string",
        default: "",
        description: "The field delimiter for reading CSV data.",
      },
      {
        displayName: "Progressbar",
        name: "progressbar",
        type: "boolean",
        default: false,
        description: "Show progress bars. Not valid for stdin.",
      },
    ],
  },
];
