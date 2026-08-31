import type { INodeProperties } from "n8n-workflow";

export const ValidateDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["validate"],
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
        operation: ["validate"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description:
      "Additional raw command line arguments to pass to qsv validate",
    displayOptions: {
      show: {
        operation: ["validate"],
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
        operation: ["validate"],
      },
    },
    options: [
      {
        displayName: "No Headers",
        name: "noHeaders",
        type: "string",
        default: "",
        description: "hen set, the first row will not be interpreted",
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
        type: "string",
        default: "",
        description: "how progress bars. Not valid for stdin.",
      },
      {
        displayName: "Quiet",
        name: "quiet",
        type: "string",
        default: "",
        description: "o not display validation summary message.",
      },
    ],
  },
];
