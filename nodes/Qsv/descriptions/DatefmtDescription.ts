import type { INodeProperties } from "n8n-workflow";

export const DatefmtDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["datefmt"],
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
        operation: ["datefmt"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv datefmt",
    displayOptions: {
      show: {
        operation: ["datefmt"],
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
        operation: ["datefmt"],
      },
    },
    options: [
      {
        displayName: "New Column",
        name: "newColumn",
        type: "string",
        default: "",
        description:
          "Put the transformed values in new column(s) instead of replacing",
      },
      {
        displayName: "Rename",
        name: "rename",
        type: "string",
        default: "",
        description: "New name for the transformed column.",
      },
      {
        displayName: "Prefer Dmy",
        name: "preferDmy",
        type: "boolean",
        default: false,
        description:
          "Prefer to parse dates in dmy format. Otherwise, use mdy format.",
      },
      {
        displayName: "Keep Zero Time",
        name: "keepZeroTime",
        type: "boolean",
        default: false,
        description:
          'If a formatted date ends with "T00:00:00+00:00", keep the time',
      },
      {
        displayName: "Input Tz",
        name: "inputTz",
        type: "string",
        default: "",
        description:
          "The timezone to use for the input date if the date does not have",
      },
      {
        displayName: "Output Tz",
        name: "outputTz",
        type: "string",
        default: "",
        description: "The timezone to use for the output date.",
      },
      {
        displayName: "Default Tz",
        name: "defaultTz",
        type: "string",
        default: "",
        description:
          "Fallback timezone consulted only when --input-tz or --output-tz",
      },
      {
        displayName: "Utc",
        name: "utc",
        type: "boolean",
        default: false,
        description: "Shortcut for --input-tz and --output-tz set to UTC.",
      },
      {
        displayName: "Zulu",
        name: "zulu",
        type: "boolean",
        default: false,
        description:
          'Shortcut for --output-tz set to UTC and --formatstr set to "%Y-%m-%dT%H:%M:%SZ".',
      },
      {
        displayName: "Ts Resolution",
        name: "tsResolution",
        type: "string",
        default: "",
        description: "The resolution to use when parsing Unix timestamps.",
      },
      {
        displayName: "Jobs",
        name: "jobs",
        type: "string",
        default: "",
        description: "The number of jobs to run in parallel.",
      },
      {
        displayName: "Batch",
        name: "batch",
        type: "string",
        default: "",
        description:
          "The number of rows per batch to load into memory, before running in parallel.",
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
