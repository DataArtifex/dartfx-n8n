import type { INodeProperties } from "n8n-workflow";

export const JoinDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["join"],
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
        operation: ["join"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv join",
    displayOptions: {
      show: {
        operation: ["join"],
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
        operation: ["join"],
      },
    },
    options: [
      {
        displayName: "Left",
        name: "left",
        type: "boolean",
        default: false,
        description: "Do a 'left outer' join. This returns all rows in",
      },
      {
        displayName: "Left Anti",
        name: "leftAnti",
        type: "boolean",
        default: false,
        description: "Do a 'left anti' join. This returns all rows in",
      },
      {
        displayName: "Left Semi",
        name: "leftSemi",
        type: "boolean",
        default: false,
        description: "Do a 'left semi' join. This returns all rows in",
      },
      {
        displayName: "Right",
        name: "right",
        type: "boolean",
        default: false,
        description: "Do a 'right outer' join. This returns all rows in",
      },
      {
        displayName: "Right Anti",
        name: "rightAnti",
        type: "boolean",
        default: false,
        description: "This returns only the rows in the second CSV data set",
      },
      {
        displayName: "Right Semi",
        name: "rightSemi",
        type: "boolean",
        default: false,
        description: "This returns only the rows in the second CSV data set",
      },
      {
        displayName: "Full",
        name: "full",
        type: "boolean",
        default: false,
        description: "Do a 'full outer' join. This returns all rows in",
      },
      {
        displayName: "Cross",
        name: "cross",
        type: "boolean",
        default: false,
        description: "USE WITH CAUTION.",
      },
      {
        displayName: "Nulls",
        name: "nulls",
        type: "boolean",
        default: false,
        description: "When set, joins will work on empty fields.",
      },
      {
        displayName: "Keys Output",
        name: "keysOutput",
        type: "string",
        default: "",
        description: "Write successfully joined keys to <file>.",
      },
      {
        displayName: "Ignore Case",
        name: "ignoreCase",
        type: "boolean",
        default: false,
        description: "When set, joins are done case insensitively.",
      },
      {
        displayName: "Ignore Leading Zeros",
        name: "ignoreLeadingZeros",
        type: "boolean",
        default: false,
        description: "When set, leading zeros are ignored in join keys.",
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
