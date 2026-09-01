import type { INodeProperties } from "n8n-workflow";

export const EnumDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["enum"],
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
        operation: ["enum"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv enum",
    displayOptions: {
      show: {
        operation: ["enum"],
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
        operation: ["enum"],
      },
    },
    options: [
      {
        displayName: "New Column",
        name: "newColumn",
        type: "string",
        default: "",
        description: "Name of the column to create.",
      },
      {
        displayName: "Start",
        name: "start",
        type: "string",
        default: "",
        description: "The value to start the enumeration from.",
      },
      {
        displayName: "Increment",
        name: "increment",
        type: "string",
        default: "",
        description: "The value to increment the enumeration by.",
      },
      {
        displayName: "Constant",
        name: "constant",
        type: "string",
        default: "",
        description: "Fill a new column with the given value.",
      },
      {
        displayName: "Copy",
        name: "copy",
        type: "string",
        default: "",
        description: "Name of a column to copy.",
      },
      {
        displayName: "Uuid4",
        name: "uuid4",
        type: "boolean",
        default: false,
        description: "When set, the column will be populated with",
      },
      {
        displayName: "Uuid7",
        name: "uuid7",
        type: "boolean",
        default: false,
        description: "When set, the column will be populated with",
      },
      {
        displayName: "Hash",
        name: "hash",
        type: "string",
        default: "",
        description: "Create a new column filled with the hash of the",
      },
      {
        displayName: "No Headers",
        name: "noHeaders",
        type: "boolean",
        default: false,
        description: "When set, the first row will not be interpreted",
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
