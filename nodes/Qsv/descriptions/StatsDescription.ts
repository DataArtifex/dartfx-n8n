import type { INodeProperties } from "n8n-workflow";

export const StatsDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["stats"],
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
        operation: ["stats"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv stats",
    displayOptions: {
      show: {
        operation: ["stats"],
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
        operation: ["stats"],
      },
    },
    options: [
      {
        displayName: "Select",
        name: "select",
        type: "string",
        default: "",
        description: "Select a subset of columns to compute stats for.",
      },
      {
        displayName: "Everything",
        name: "everything",
        type: "boolean",
        default: false,
        description: "Compute all statistics available.",
      },
      {
        displayName: "Typesonly",
        name: "typesonly",
        type: "boolean",
        default: false,
        description: "Infer data types only and do not compute statistics.",
      },
      {
        displayName: "Infer Boolean",
        name: "inferBoolean",
        type: "boolean",
        default: false,
        description: "Infer boolean data type. This automatically enables",
      },
      {
        displayName: "Boolean Patterns",
        name: "booleanPatterns",
        type: "string",
        default: "",
        description:
          "Comma-separated list of boolean pattern pairs in the format",
      },
      {
        displayName: "Mode",
        name: "mode",
        type: "boolean",
        default: false,
        description: "Compute the mode/s & antimode/s. Multimodal-aware.",
      },
      {
        displayName: "Cardinality",
        name: "cardinality",
        type: "boolean",
        default: false,
        description: "Compute the cardinality and the uniqueness ratio.",
      },
      {
        displayName: "Zero Padded Numeric",
        name: "zeroPaddedNumeric",
        type: "boolean",
        default: false,
        description:
          'Add a "zero_padded_numeric" column that is "true" when a column\'s',
      },
      {
        displayName: "Median",
        name: "median",
        type: "boolean",
        default: false,
        description: "Compute the median.",
      },
      {
        displayName: "Mad",
        name: "mad",
        type: "boolean",
        default: false,
        description: "Compute the median absolute deviation (MAD).",
      },
      {
        displayName: "Quartiles",
        name: "quartiles",
        type: "boolean",
        default: false,
        description:
          "Compute the quartiles (using method 3), the IQR, the lower/upper,",
      },
      {
        displayName: "Percentiles",
        name: "percentiles",
        type: "boolean",
        default: false,
        description:
          "Compute custom percentiles using the nearest rank method.",
      },
      {
        displayName: "Percentile List",
        name: "percentileList",
        type: "string",
        default: "",
        description: "Comma-separated list of percentiles to compute.",
      },
      {
        displayName: "Quantile Method",
        name: "quantileMethod",
        type: "string",
        default: "",
        description:
          "Algorithm used to compute the median, quartiles and custom",
      },
      {
        displayName: "Cardinality Method",
        name: "cardinalityMethod",
        type: "string",
        default: "",
        description:
          "Algorithm used to compute the --cardinality column. Choices:",
      },
      {
        displayName: "Mode Cardinality Cap",
        name: "modeCardinalityCap",
        type: "string",
        default: "",
        description: "Bound mode-tracking memory on high-cardinality columns.",
      },
      {
        displayName: "Round",
        name: "round",
        type: "string",
        default: "",
        description:
          "Round statistics to <decimal_places>. Rounding is done following",
      },
      {
        displayName: "Nulls",
        name: "nulls",
        type: "boolean",
        default: false,
        description: "Include NULLs in the population size for computing",
      },
      {
        displayName: "Weight",
        name: "weight",
        type: "string",
        default: "",
        description:
          "Compute weighted statistics using the specified column as weights.",
      },
      {
        displayName: "Infer Dates",
        name: "inferDates",
        type: "boolean",
        default: false,
        description: "Infer date/datetime data types. This is an expensive",
      },
      {
        displayName: "Dates Whitelist",
        name: "datesWhitelist",
        type: "string",
        default: "",
        description:
          "The comma-separated, case-insensitive patterns to look for when",
      },
      {
        displayName: "Prefer Dmy",
        name: "preferDmy",
        type: "boolean",
        default: false,
        description: "Parse dates in dmy format. Otherwise, use mdy format.",
      },
      {
        displayName: "Force",
        name: "force",
        type: "boolean",
        default: false,
        description: "Force recomputing stats even if valid precomputed stats",
      },
      {
        displayName: "Jobs",
        name: "jobs",
        type: "string",
        default: "",
        description: "The number of jobs to run in parallel.",
      },
      {
        displayName: "Stats Jsonl",
        name: "statsJsonl",
        type: "boolean",
        default: false,
        description: "Also write the stats in JSONL format.",
      },
      {
        displayName: "Jsonl",
        name: "jsonl",
        type: "boolean",
        default: false,
        description:
          "Emit the stats to stdout as JSON Lines (NDJSON) - one JSON object",
      },
      {
        displayName: "Pretty Json",
        name: "prettyJson",
        type: "boolean",
        default: false,
        description:
          "Like --jsonl, but emit a single pretty-printed JSON array of the",
      },
      {
        displayName: "Cache Threshold",
        name: "cacheThreshold",
        type: "string",
        default: "",
        description: "Controls the creation of stats cache files.",
      },
      {
        displayName: "Vis Whitespace",
        name: "visWhitespace",
        type: "boolean",
        default: false,
        description: "Visualize whitespace characters in the output.",
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
        description: "The field delimiter for READING CSV data.",
      },
      {
        displayName: "Memcheck",
        name: "memcheck",
        type: "boolean",
        default: false,
        description: "Use CONSERVATIVE heuristics for the in-memory load",
      },
    ],
  },
];
