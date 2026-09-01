import type { INodeProperties } from "n8n-workflow";

export const GeocodeDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["geocode"],
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
        operation: ["geocode"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv geocode",
    displayOptions: {
      show: {
        operation: ["geocode"],
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
        operation: ["geocode"],
      },
    },
    options: [
      {
        displayName: "New Column",
        name: "newColumn",
        type: "string",
        default: "",
        description:
          "Put the transformed values in a new column instead. Not valid when",
      },
      {
        displayName: "Rename",
        name: "rename",
        type: "string",
        default: "",
        description: "New name for the transformed column.",
      },
      {
        displayName: "Country",
        name: "country",
        type: "string",
        default: "",
        description:
          "The comma-delimited, case-insensitive list of countries to filter for.",
      },
      {
        displayName: "Min Score",
        name: "minScore",
        type: "string",
        default: "",
        description: "The minimum Jaro-Winkler distance score.",
      },
      {
        displayName: "Admin1",
        name: "admin1",
        type: "string",
        default: "",
        description:
          "The comma-delimited, case-insensitive list of admin1s to filter for.",
      },
      {
        displayName: "K_weight",
        name: "k_weight",
        type: "string",
        default: "",
        description: "Use population-weighted distance for reverse subcommand.",
      },
      {
        displayName: "Api Key",
        name: "apiKey",
        type: "string",
        default: "",
        description:
          "The OpenCage API key for the opencage/opencagenow subcommands.",
      },
      {
        displayName: "Rate Limit",
        name: "rateLimit",
        type: "string",
        default: "",
        description: "Maximum number of OpenCage API requests per second.",
      },
      {
        displayName: "Reverse",
        name: "reverse",
        type: "boolean",
        default: false,
        description:
          "Force reverse geocoding for opencage/opencagenow (treat the",
      },
      {
        displayName: "No Annotations",
        name: "noAnnotations",
        type: "boolean",
        default: false,
        description:
          "Omit OpenCage annotations (timezone, currency, etc.) from the",
      },
      {
        displayName: "Cache Ttl",
        name: "cacheTtl",
        type: "string",
        default: "",
        description:
          "Time-to-live for the persistent on-disk OpenCage result cache.",
      },
      {
        displayName: "No Cache",
        name: "noCache",
        type: "boolean",
        default: false,
        description: "Disable the persistent on-disk OpenCage cache. Duplicate",
      },
      {
        displayName: "Language",
        name: "language",
        type: "string",
        default: "",
        description:
          "The language to use when geocoding. The language is specified as a ISO 639-1 code.",
      },
      {
        displayName: "Invalid Result",
        name: "invalidResult",
        type: "string",
        default: "",
        description:
          "The string to return when the geocode result is empty/invalid.",
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
        displayName: "Timeout",
        name: "timeout",
        type: "string",
        default: "",
        description: "Timeout for downloading Geonames cities index.",
      },
      {
        displayName: "Cache Dir",
        name: "cacheDir",
        type: "string",
        default: "",
        description:
          "The directory to use for caching the Geonames cities index",
      },
      {
        displayName: "Older Than",
        name: "olderThan",
        type: "string",
        default: "",
        description: "Delete OpenCage cache entries older than this value.",
      },
      {
        displayName: "Languages",
        name: "languages",
        type: "string",
        default: "",
        description:
          "The comma-delimited, case-insensitive list of languages to use when building",
      },
      {
        displayName: "Cities Url",
        name: "citiesUrl",
        type: "string",
        default: "",
        description:
          "The URL to download the Geonames cities file from. There are several",
      },
      {
        displayName: "Force",
        name: "force",
        type: "boolean",
        default: false,
        description:
          "Force update the Geonames cities index. If not set, qsv will check if there",
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
        description:
          "Show progress bars. Will also show the cache hit rate upon completion.",
      },
    ],
  },
];
