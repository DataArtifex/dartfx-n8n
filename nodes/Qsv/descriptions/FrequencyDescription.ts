import type { INodeProperties } from "n8n-workflow";

export const FrequencyDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["frequency"],
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
        operation: ["frequency"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description:
      "Additional raw command line arguments to pass to qsv frequency",
    displayOptions: {
      show: {
        operation: ["frequency"],
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
        operation: ["frequency"],
      },
    },
    options: [
      {
        displayName: "Select",
        name: "select",
        type: "string",
        default: "",
        description: "Select a subset of columns to compute frequencies",
      },
      {
        displayName: "Limit",
        name: "limit",
        type: "string",
        default: "",
        description: "Limit the frequency table to the N most common",
      },
      {
        displayName: "Sketch Method",
        name: "sketchMethod",
        type: "string",
        default: "",
        description: "Algorithm used to compute the frequency table.",
      },
      {
        displayName: "Sketch Map Size",
        name: "sketchMapSize",
        type: "string",
        default: "",
        description: "Maximum map size for the Frequent Items sketch.",
      },
      {
        displayName: "Unq Limit",
        name: "unqLimit",
        type: "string",
        default: "",
        description: "If a column has all unique values, limit the",
      },
      {
        displayName: "Lmt Threshold",
        name: "lmtThreshold",
        type: "string",
        default: "",
        description: "The threshold for which --limit and --unq-limit",
      },
      {
        displayName: "Rank Strategy",
        name: "rankStrategy",
        type: "string",
        default: "",
        description:
          "The strategy to use when there are count-tied values in the frequency table.",
      },
      {
        displayName: "Pct Dec Places",
        name: "pctDecPlaces",
        type: "string",
        default: "",
        description: "The number of decimal places to round the percentage to.",
      },
      {
        displayName: "Other Sorted",
        name: "otherSorted",
        type: "boolean",
        default: false,
        description: 'By default, the "Other" category is placed at the',
      },
      {
        displayName: "Other Text",
        name: "otherText",
        type: "string",
        default: "",
        description: 'The text to use for the "Other" category. If set to the',
      },
      {
        displayName: "No Other",
        name: "noOther",
        type: "boolean",
        default: false,
        description:
          'Don\'t include the "Other" category in the frequency table.',
      },
      {
        displayName: "Null Sorted",
        name: "nullSorted",
        type: "boolean",
        default: false,
        description:
          "By default, the NULL category (controlled by --null-text)",
      },
      {
        displayName: "Asc",
        name: "asc",
        type: "boolean",
        default: false,
        description: "Sort the frequency tables in ascending order by count.",
      },
      {
        displayName: "No Trim",
        name: "noTrim",
        type: "boolean",
        default: false,
        description:
          "Don't trim whitespace from values when computing frequencies.",
      },
      {
        displayName: "Null Text",
        name: "nullText",
        type: "string",
        default: "",
        description: "The text to use for NULL values. If set to the literal",
      },
      {
        displayName: "No Nulls",
        name: "noNulls",
        type: "boolean",
        default: false,
        description: "Don't include NULLs in the frequency table.",
      },
      {
        displayName: "Pct Nulls",
        name: "pctNulls",
        type: "boolean",
        default: false,
        description: "Include NULL values in percentage and rank calculations.",
      },
      {
        displayName: "Ignore Case",
        name: "ignoreCase",
        type: "boolean",
        default: false,
        description: "Ignore case when computing frequencies.",
      },
      {
        displayName: "No Float",
        name: "noFloat",
        type: "string",
        default: "",
        description: "Exclude Float columns from frequency analysis.",
      },
      {
        displayName: "Stats Filter",
        name: "statsFilter",
        type: "string",
        default: "",
        description:
          "Filter columns based on their statistics using a Luau expression.",
      },
      {
        displayName: "All Unique Text",
        name: "allUniqueText",
        type: "string",
        default: "",
        description: 'The text to use for the "<ALL_UNIQUE>" category.',
      },
      {
        displayName: "Vis Whitespace",
        name: "visWhitespace",
        type: "boolean",
        default: false,
        description: "Visualize whitespace characters in the output. See",
      },
      {
        displayName: "Jobs",
        name: "jobs",
        type: "string",
        default: "",
        description:
          "The number of jobs to run in parallel when the given CSV data has",
      },
      {
        displayName: "Frequency Jsonl",
        name: "frequencyJsonl",
        type: "boolean",
        default: false,
        description: "Write the complete frequency distribution as a",
      },
      {
        displayName: "High Card Threshold",
        name: "highCardThreshold",
        type: "string",
        default: "",
        description: "Absolute cardinality threshold for HIGH_CARDINALITY",
      },
      {
        displayName: "High Card Pct",
        name: "highCardPct",
        type: "string",
        default: "",
        description: "Percentage of rowcount threshold for HIGH_CARDINALITY",
      },
      {
        displayName: "Force",
        name: "force",
        type: "boolean",
        default: false,
        description: "Force recomputation even when a valid frequency cache",
      },
      {
        displayName: "Json",
        name: "json",
        type: "boolean",
        default: false,
        description: "Output frequency table as nested JSON instead of CSV.",
      },
      {
        displayName: "Pretty Json",
        name: "prettyJson",
        type: "boolean",
        default: false,
        description: "Same as --json but pretty prints the JSON output.",
      },
      {
        displayName: "Toon",
        name: "toon",
        type: "boolean",
        default: false,
        description:
          "Output frequency table and select stats in TOON format instead of CSV.",
      },
      {
        displayName: "No Stats",
        name: "noStats",
        type: "boolean",
        default: false,
        description:
          "When using the JSON or TOON output mode, do not include the additional stats.",
      },
      {
        displayName: "Weight",
        name: "weight",
        type: "string",
        default: "",
        description:
          "Compute weighted frequencies using the specified column as weights.",
      },
      {
        displayName: "No Headers",
        name: "noHeaders",
        type: "boolean",
        default: false,
        description: "When set, the first row will NOT be included",
      },
      {
        displayName: "Delimiter",
        name: "delimiter",
        type: "string",
        default: "",
        description: "The field delimiter for reading CSV data.",
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
