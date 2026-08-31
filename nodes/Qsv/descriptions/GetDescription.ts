import type { INodeProperties } from "n8n-workflow";

export const GetDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["get"],
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
        operation: ["get"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv get",
    displayOptions: {
      show: {
        operation: ["get"],
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
        operation: ["get"],
      },
    },
    options: [
      {
        displayName: "Cache Dir",
        name: "cacheDir",
        type: "string",
        default: "",
        description: "The qsv cache directory. Overrides the QSV_CACHE_DIR",
      },
      {
        displayName: "Output",
        name: "output",
        type: "string",
        default: "",
        description: "For a single <source> (or cache-fetch <name>), write the",
      },
      {
        displayName: "Quiet",
        name: "quiet",
        type: "string",
        default: "",
        description: "o not print progress/summary messages to stderr.",
      },
    ],
  },
];
