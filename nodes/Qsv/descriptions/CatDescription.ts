import type { INodeProperties } from "n8n-workflow";

export const CatDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["cat"],
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
        operation: ["cat"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv cat",
    displayOptions: {
      show: {
        operation: ["cat"],
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
        operation: ["cat"],
      },
    },
    options: [
      {
        displayName: "Pad",
        name: "pad",
        type: "boolean",
        default: false,
        description: "When concatenating columns, this flag will cause",
      },
      {
        displayName: "Flexible",
        name: "flexible",
        type: "boolean",
        default: false,
        description: "When concatenating rows, this flag turns off validation",
      },
      {
        displayName: "Group",
        name: "group",
        type: "string",
        default: "",
        description:
          "When concatenating with rowskey, you can specify a grouping value",
      },
      {
        displayName: "Group Name",
        name: "groupName",
        type: "string",
        default: "",
        description:
          "When concatenating with rowskey, this flag provides the name",
      },
      {
        displayName: "No Headers",
        name: "noHeaders",
        type: "boolean",
        default: false,
        description: "When set, the first row will NOT be interpreted",
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
