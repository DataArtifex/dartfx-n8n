import type { INodeProperties } from "n8n-workflow";

export const ExcelDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["excel"],
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
        operation: ["excel"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv excel",
    displayOptions: {
      show: {
        operation: ["excel"],
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
        operation: ["excel"],
      },
    },
    options: [
      {
        displayName: "Sheet",
        name: "sheet",
        type: "string",
        default: "",
        description:
          "Name (case-insensitive) or zero-based index of sheet to export.",
      },
      {
        displayName: "Header Row",
        name: "headerRow",
        type: "string",
        default: "",
        description:
          "The header row. Set if other than the first non-empty row of the sheet.",
      },
      {
        displayName: "Metadata",
        name: "metadata",
        type: "string",
        default: "",
        description: "Outputs workbook metadata in CSV or JSON format:",
      },
      {
        displayName: "Table",
        name: "table",
        type: "string",
        default: "",
        description: "An Excel table (case-insensitive) to extract to a CSV.",
      },
      {
        displayName: "Range",
        name: "range",
        type: "string",
        default: "",
        description:
          "An Excel format range - like RangeName, C:T, C3:T25 or 'Sheet1!C3:T25' to",
      },
      {
        displayName: "Cell",
        name: "cell",
        type: "string",
        default: "",
        description:
          "A single cell reference - like C3 or 'Sheet1!C3' to extract.",
      },
      {
        displayName: "Error Format",
        name: "errorFormat",
        type: "string",
        default: "",
        description: "The format to use when formatting error cells.",
      },
      {
        displayName: "Flexible",
        name: "flexible",
        type: "boolean",
        default: false,
        description:
          "Continue even if the number of columns is different from row to row.",
      },
      {
        displayName: "Trim",
        name: "trim",
        type: "boolean",
        default: false,
        description:
          "Trim all fields so that leading & trailing whitespaces are removed.",
      },
      {
        displayName: "Date Format",
        name: "dateFormat",
        type: "string",
        default: "",
        description: "Optional date format to use when formatting dates.",
      },
      {
        displayName: "Keep Zero Time",
        name: "keepZeroTime",
        type: "boolean",
        default: false,
        description:
          "Keep the time part of a date-time field if it is 00:00:00.",
      },
      {
        displayName: "Jobs",
        name: "jobs",
        type: "string",
        default: "",
        description: "The number of jobs to run in parallel.",
      },
      {
        displayName: "Delimiter",
        name: "delimiter",
        type: "string",
        default: "",
        description: "The delimiter to use when writing CSV data.",
      },
      {
        displayName: "Quiet",
        name: "quiet",
        type: "boolean",
        default: false,
        description: "Do not display export summary message.",
      },
    ],
  },
];
