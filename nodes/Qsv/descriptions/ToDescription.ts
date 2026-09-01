import type { INodeProperties } from "n8n-workflow";

export const ToDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["to"],
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
        operation: ["to"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv to",
    displayOptions: {
      show: {
        operation: ["to"],
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
        operation: ["to"],
      },
    },
    options: [
      {
        displayName: "Print Package",
        name: "printPackage",
        type: "boolean",
        default: false,
        description:
          "Print statistics as datapackage, by default will print field summary.",
      },
      {
        displayName: "Dump",
        name: "dump",
        type: "boolean",
        default: false,
        description:
          "Create database dump file for use with `psql` or `sqlite3` command line tools",
      },
      {
        displayName: "Stats",
        name: "stats",
        type: "boolean",
        default: false,
        description:
          "Produce extra statistics about the data beyond just type guessing.",
      },
      {
        displayName: "Stats Csv",
        name: "statsCsv",
        type: "string",
        default: "",
        description: "Output stats as CSV to specified file.",
      },
      {
        displayName: "Quiet",
        name: "quiet",
        type: "boolean",
        default: false,
        description: "Do not print out field summary.",
      },
      {
        displayName: "Schema",
        name: "schema",
        type: "string",
        default: "",
        description: "The schema to load the data into. (postgres only).",
      },
      {
        displayName: "Infer Len",
        name: "inferLen",
        type: "string",
        default: "",
        description:
          "The number of rows to use for schema inference (parquet only).",
      },
      {
        displayName: "Try Parse Dates",
        name: "tryParseDates",
        type: "boolean",
        default: false,
        description:
          "Attempt to parse date/datetime columns with polars' date inference logic.",
      },
      {
        displayName: "Drop",
        name: "drop",
        type: "boolean",
        default: false,
        description:
          "Drop tables before loading new data into them (postgres/sqlite only).",
      },
      {
        displayName: "Evolve",
        name: "evolve",
        type: "boolean",
        default: false,
        description:
          "If loading into existing db, alter existing tables so that new data will load.",
      },
      {
        displayName: "Pipe",
        name: "pipe",
        type: "boolean",
        default: false,
        description:
          "Adjust output format for piped data (omits row counts and field format columns).",
      },
      {
        displayName: "Table",
        name: "table",
        type: "string",
        default: "",
        description:
          "Use this as the table/sheet/file name (postgres/sqlite/xlsx/ods/parquet).",
      },
      {
        displayName: "Separator",
        name: "separator",
        type: "string",
        default: "",
        description:
          "For xlsx, use this character to help truncate xlsx sheet names.",
      },
      {
        displayName: "Compression",
        name: "compression",
        type: "string",
        default: "",
        description: "Parquet compression codec (parquet only).",
      },
      {
        displayName: "Compress Level",
        name: "compressLevel",
        type: "string",
        default: "",
        description: "Compression level (parquet only).",
      },
      {
        displayName: "All Strings",
        name: "allStrings",
        type: "boolean",
        default: false,
        description: "Convert all fields to strings.",
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
        description: "The field delimiter for reading CSV data.",
      },
    ],
  },
];
