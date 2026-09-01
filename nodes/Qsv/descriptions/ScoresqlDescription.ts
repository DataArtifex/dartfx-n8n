import type { INodeProperties } from "n8n-workflow";

export const ScoresqlDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["scoresql"],
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
        operation: ["scoresql"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description:
      "Additional raw command line arguments to pass to qsv scoresql",
    displayOptions: {
      show: {
        operation: ["scoresql"],
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
        operation: ["scoresql"],
      },
    },
    options: [
      {
        displayName: "Json",
        name: "json",
        type: "boolean",
        default: false,
        description: "Output results as JSON instead of human-readable report.",
      },
      {
        displayName: "Duckdb",
        name: "duckdb",
        type: "boolean",
        default: false,
        description: "Use DuckDB for query plan analysis instead of Polars.",
      },
      {
        displayName: "Try Parsedates",
        name: "tryParsedates",
        type: "boolean",
        default: false,
        description: "Automatically try to parse dates/datetimes and time.",
      },
      {
        displayName: "Infer Len",
        name: "inferLen",
        type: "string",
        default: "",
        description: "Number of rows to scan when inferring schema.",
      },
      {
        displayName: "Ignore Errors",
        name: "ignoreErrors",
        type: "boolean",
        default: false,
        description: "Ignore errors when parsing CSVs.",
      },
      {
        displayName: "Truncate Ragged Lines",
        name: "truncateRaggedLines",
        type: "boolean",
        default: false,
        description: "Truncate lines with more fields than the header.",
      },
      {
        displayName: "Delimiter",
        name: "delimiter",
        type: "string",
        default: "",
        description: "The field delimiter for reading CSV data.",
      },
      {
        displayName: "Quiet",
        name: "quiet",
        type: "boolean",
        default: false,
        description: "Do not print informational messages to stderr.",
      },
    ],
  },
];
