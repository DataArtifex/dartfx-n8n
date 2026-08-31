import type { INodeProperties } from "n8n-workflow";

export const TemplateDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["template"],
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
        operation: ["template"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description:
      "Additional raw command line arguments to pass to qsv template",
    displayOptions: {
      show: {
        operation: ["template"],
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
        operation: ["template"],
      },
    },
    options: [
      {
        displayName: "Output",
        name: "output",
        type: "string",
        default: "",
        description: "Write output to <file> instead of stdout",
      },
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
        default: ",",
        description: "Field separator for reading CSV [default: ,]",
      },
      {
        displayName: "Progressbar",
        name: "progressbar",
        type: "string",
        default: "",
        description: "how progress bars. Not valid for stdin.",
      },
    ],
  },
];
