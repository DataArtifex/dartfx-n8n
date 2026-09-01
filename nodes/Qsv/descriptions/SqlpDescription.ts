import type { INodeProperties } from "n8n-workflow";

export const SqlpDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["sqlp"],
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
        operation: ["sqlp"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv sqlp",
    displayOptions: {
      show: {
        operation: ["sqlp"],
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
        operation: ["sqlp"],
      },
    },
    options: [
      {
        displayName: "Format",
        name: "format",
        type: "string",
        default: "",
        description: "The output format to use. Valid values are:",
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
        description:
          "The number of rows to scan when inferring the schema of the CSV.",
      },
      {
        displayName: "Cache Schema",
        name: "cacheSchema",
        type: "boolean",
        default: false,
        description: "Create and cache Polars schema JSON files.",
      },
      {
        displayName: "Streaming",
        name: "streaming",
        type: "boolean",
        default: false,
        description:
          "Use streaming mode when parsing CSVs. This will use less memory",
      },
      {
        displayName: "Low Memory",
        name: "lowMemory",
        type: "boolean",
        default: false,
        description:
          "Use low memory mode when parsing CSVs. This will use less memory",
      },
      {
        displayName: "No Optimizations",
        name: "noOptimizations",
        type: "boolean",
        default: false,
        description:
          "Disable non-default query optimizations. This will make queries slower.",
      },
      {
        displayName: "Truncate Ragged Lines",
        name: "truncateRaggedLines",
        type: "boolean",
        default: false,
        description:
          "Truncate ragged lines when parsing CSVs. If set, rows with more",
      },
      {
        displayName: "Ignore Errors",
        name: "ignoreErrors",
        type: "boolean",
        default: false,
        description:
          "Ignore errors when parsing CSVs. If set, rows with errors",
      },
      {
        displayName: "Rnull Values",
        name: "rnullValues",
        type: "string",
        default: "",
        description:
          "The comma-delimited list of case-sensitive strings to consider as",
      },
      {
        displayName: "Decimal Comma",
        name: "decimalComma",
        type: "boolean",
        default: false,
        description:
          "Use comma as the decimal separator when parsing & writing CSVs.",
      },
      {
        displayName: "Datetime Format",
        name: "datetimeFormat",
        type: "string",
        default: "",
        description: "The datetime format to use writing datetimes.",
      },
      {
        displayName: "Date Format",
        name: "dateFormat",
        type: "string",
        default: "",
        description: "The date format to use writing dates.",
      },
      {
        displayName: "Time Format",
        name: "timeFormat",
        type: "string",
        default: "",
        description: "The time format to use writing times.",
      },
      {
        displayName: "Float Precision",
        name: "floatPrecision",
        type: "string",
        default: "",
        description:
          "The number of digits of precision to use when writing floats.",
      },
      {
        displayName: "Wnull Value",
        name: "wnullValue",
        type: "string",
        default: "",
        description: "The string to use when WRITING null values.",
      },
      {
        displayName: "Compression",
        name: "compression",
        type: "string",
        default: "",
        description:
          "The compression codec to use when writing arrow, avro or parquet files.",
      },
      {
        displayName: "Compress Level",
        name: "compressLevel",
        type: "string",
        default: "",
        description:
          "The compression level to use when using zstd or gzip compression.",
      },
      {
        displayName: "Statistics",
        name: "statistics",
        type: "boolean",
        default: false,
        description: "Compute column statistics when writing parquet files.",
      },
      {
        displayName: "Delimiter",
        name: "delimiter",
        type: "string",
        default: "",
        description: "The field delimiter for reading and writing CSV data.",
      },
      {
        displayName: "Quiet",
        name: "quiet",
        type: "boolean",
        default: false,
        description: "Do not return result shape to stderr.",
      },
    ],
  },
];
