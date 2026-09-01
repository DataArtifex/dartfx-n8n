import type { INodeProperties } from "n8n-workflow";

export const GetDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["get"],
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
        operation: ["get"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv get",
    displayOptions: {
      show: {
        operation: ["get"],
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
        operation: ["get"],
      },
    },
    options: [
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
        description: "Logical cache name (the `dc:` handle) for the fetched",
      },
      {
        displayName: "Ttl",
        name: "ttl",
        type: "string",
        default: "",
        description: "Per-entry time-to-live in seconds. -1 = never expire.",
      },
      {
        displayName: "Refresh",
        name: "refresh",
        type: "string",
        default: "",
        description:
          "Revalidation policy for `dc:` use: on-stale, always or never.",
      },
      {
        displayName: "Compress",
        name: "compress",
        type: "string",
        default: "",
        description: "Transparent blob compression: zstd or none.",
      },
      {
        displayName: "Force",
        name: "force",
        type: "boolean",
        default: false,
        description: "Re-fetch even if a fresh cached copy exists.",
      },
      {
        displayName: "Sample",
        name: "sample",
        type: "string",
        default: "",
        description: "PREVIEW: stream the first N data records of <source> to",
      },
      {
        displayName: "Offset",
        name: "offset",
        type: "string",
        default: "",
        description:
          "PREVIEW: skip ~<mb> megabytes (via an HTTP Range request)",
      },
      {
        displayName: "Random",
        name: "random",
        type: "boolean",
        default: false,
        description: "PREVIEW: random (reservoir) sampling. Streams the full",
      },
      {
        displayName: "Cloud Opt",
        name: "cloudOpt",
        type: "string",
        default: "",
        description: "Extra cloud object-store config as a `key=value` pair",
      },
      {
        displayName: "Ckan Api",
        name: "ckanApi",
        type: "string",
        default: "",
        description: "CKAN Action API base URL. Overrides the QSV_CKAN_API",
      },
      {
        displayName: "Ckan Token",
        name: "ckanToken",
        type: "string",
        default: "",
        description: "CKAN API token. Overrides the QSV_CKAN_TOKEN env var.",
      },
      {
        displayName: "Timeout",
        name: "timeout",
        type: "string",
        default: "",
        description:
          "HTTP timeout in seconds. For cache downloads this is an INACTIVITY",
      },
      {
        displayName: "Older Than",
        name: "olderThan",
        type: "string",
        default: "",
        description: "For cache-prune: remove entries older than this age.",
      },
      {
        displayName: "Json",
        name: "json",
        type: "boolean",
        default: false,
        description:
          "For cache-list/cache-info: output JSON instead of a table.",
      },
      {
        displayName: "Verify",
        name: "verify",
        type: "boolean",
        default: false,
        description: "For cache-list: recompute each cached blob's BLAKE3 and",
      },
      {
        displayName: "Cache Dir",
        name: "cacheDir",
        type: "string",
        default: "",
        description: "The qsv cache directory. Overrides the QSV_CACHE_DIR",
      },
      {
        displayName: "Quiet",
        name: "quiet",
        type: "boolean",
        default: false,
        description: "Do not print progress/summary messages to stderr.",
      },
    ],
  },
];
