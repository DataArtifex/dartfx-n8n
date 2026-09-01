import type { INodeProperties } from "n8n-workflow";

export const FetchDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["fetch"],
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
        operation: ["fetch"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv fetch",
    displayOptions: {
      show: {
        operation: ["fetch"],
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
        operation: ["fetch"],
      },
    },
    options: [
      {
        displayName: "Url Template",
        name: "urlTemplate",
        type: "string",
        default: "",
        description: "URL template to use. Use column names enclosed with",
      },
      {
        displayName: "New Column",
        name: "newColumn",
        type: "string",
        default: "",
        description:
          "Put the fetched values in a new column. Specifying this option",
      },
      {
        displayName: "Jaq",
        name: "jaq",
        type: "string",
        default: "",
        description: "Apply jaq selector to API returned JSON value.",
      },
      {
        displayName: "Jaqfile",
        name: "jaqfile",
        type: "string",
        default: "",
        description: "Load jaq selector from file instead.",
      },
      {
        displayName: "Pretty",
        name: "pretty",
        type: "boolean",
        default: false,
        description: "Prettify JSON responses. Otherwise, they're minified.",
      },
      {
        displayName: "Rate Limit",
        name: "rateLimit",
        type: "string",
        default: "",
        description:
          "Rate Limit in Queries Per Second (max: 1000). Note that fetch",
      },
      {
        displayName: "Timeout",
        name: "timeout",
        type: "string",
        default: "",
        description: "Timeout for each URL request.",
      },
      {
        displayName: "Http Header",
        name: "httpHeader",
        type: "string",
        default: "",
        description:
          "Append custom header(s) to the HTTP header. Pass multiple key-value pairs",
      },
      {
        displayName: "Max Retries",
        name: "maxRetries",
        type: "string",
        default: "",
        description:
          "Maximum number of retries per record before an error is raised.",
      },
      {
        displayName: "Max Errors",
        name: "maxErrors",
        type: "string",
        default: "",
        description: "Maximum number of errors before aborting.",
      },
      {
        displayName: "Store Error",
        name: "storeError",
        type: "boolean",
        default: false,
        description:
          "On error, store error code/message instead of blank value.",
      },
      {
        displayName: "Cookies",
        name: "cookies",
        type: "boolean",
        default: false,
        description: "Allow cookies.",
      },
      {
        displayName: "User Agent",
        name: "userAgent",
        type: "string",
        default: "",
        description:
          "Specify custom user agent. It supports the following variables -",
      },
      {
        displayName: "Report",
        name: "report",
        type: "string",
        default: "",
        description:
          "Creates a report of the fetch job. The report has the same name as the input file",
      },
      {
        displayName: "No Cache",
        name: "noCache",
        type: "boolean",
        default: false,
        description: "Do not cache responses.",
      },
      {
        displayName: "Mem Cache Size",
        name: "memCacheSize",
        type: "string",
        default: "",
        description: "Maximum number of entries in the in-memory LRU cache.",
      },
      {
        displayName: "Disk Cache",
        name: "diskCache",
        type: "boolean",
        default: false,
        description:
          "Use a persistent disk cache for responses. The cache is stored in the directory",
      },
      {
        displayName: "Disk Cache Dir",
        name: "diskCacheDir",
        type: "string",
        default: "",
        description:
          "The directory <dir> to store the disk cache. Note that if the directory",
      },
      {
        displayName: "Redis Cache",
        name: "redisCache",
        type: "boolean",
        default: false,
        description:
          'Use Redis to cache responses. It connects to "redis://127.0.0.1:6379/1"',
      },
      {
        displayName: "Cache Error",
        name: "cacheError",
        type: "boolean",
        default: false,
        description:
          "Cache error responses even if a request fails. If an identical URL is requested,",
      },
      {
        displayName: "Flush Cache",
        name: "flushCache",
        type: "boolean",
        default: false,
        description:
          "Flush all the keys in the current cache on startup. This only applies to",
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
        description:
          "Show progress bars. Will also show the cache hit rate upon completion.",
      },
    ],
  },
];
