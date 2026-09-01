import type { INodeProperties } from "n8n-workflow";

export const ValidateDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["validate"],
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
        operation: ["validate"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description:
      "Additional raw command line arguments to pass to qsv validate",
    displayOptions: {
      show: {
        operation: ["validate"],
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
        operation: ["validate"],
      },
    },
    options: [
      {
        displayName: "Trim",
        name: "trim",
        type: "boolean",
        default: false,
        description:
          "Trim leading and trailing whitespace from fields before validating.",
      },
      {
        displayName: "No Format Validation",
        name: "noFormatValidation",
        type: "boolean",
        default: false,
        description:
          "Disable JSON Schema format validation. Ignores all JSON Schema",
      },
      {
        displayName: "Fail Fast",
        name: "failFast",
        type: "boolean",
        default: false,
        description: "Stops on first error.",
      },
      {
        displayName: "Valid",
        name: "valid",
        type: "string",
        default: "valid",
        description: "Valid record output file suffix. [default: valid]",
      },
      {
        displayName: "Invalid",
        name: "invalid",
        type: "string",
        default: "invalid",
        description: "Invalid record output file suffix. [default: invalid]",
      },
      {
        displayName: "Split Ragged",
        name: "splitRagged",
        type: "boolean",
        default: false,
        description:
          "Opt-in mode: instead of aborting on the first row with the wrong",
      },
      {
        displayName: "Json",
        name: "json",
        type: "boolean",
        default: false,
        description:
          "When validating without a JSON Schema, return the RFC 4180 check",
      },
      {
        displayName: "Pretty Json",
        name: "prettyJson",
        type: "boolean",
        default: false,
        description: "Same as --json, but pretty printed.",
      },
      {
        displayName: "Valid Output",
        name: "validOutput",
        type: "string",
        default: "",
        description:
          "Change validation mode behavior so if ALL rows are valid, to pass it to",
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
        description: "The number of rows per batch to load into memory,",
      },
      {
        displayName: "Fancy Regex",
        name: "fancyRegex",
        type: "boolean",
        default: false,
        description:
          "Use the fancy regex engine instead of the default regex engine",
      },
      {
        displayName: "Backtrack Limit",
        name: "backtrackLimit",
        type: "string",
        default: "",
        description:
          "Set the approximate number of backtracking steps allowed.",
      },
      {
        displayName: "Size Limit",
        name: "sizeLimit",
        type: "string",
        default: "",
        description:
          "Set the approximate size limit, in megabytes, of a compiled regex.",
      },
      {
        displayName: "Dfa Size Limit",
        name: "dfaSizeLimit",
        type: "string",
        default: "",
        description:
          "Set the approximate capacity, in megabytes, of the cache of transitions",
      },
      {
        displayName: "Timeout",
        name: "timeout",
        type: "string",
        default: "",
        description: "Timeout for downloading json-schemas on URLs and for",
      },
      {
        displayName: "Cache Dir",
        name: "cacheDir",
        type: "string",
        default: "",
        description:
          "The directory to use for caching downloaded dynamicEnum resources.",
      },
      {
        displayName: "Ckan Api",
        name: "ckanApi",
        type: "string",
        default: "",
        description:
          "The URL of the CKAN API to use for downloading dynamicEnum",
      },
      {
        displayName: "Ckan Token",
        name: "ckanToken",
        type: "string",
        default: "",
        description: "The CKAN API token to use. Only required if downloading",
      },
      {
        displayName: "Email Required Tld",
        name: "emailRequiredTld",
        type: "boolean",
        default: false,
        description: "Require the email to have a valid Top-Level Domain (TLD)",
      },
      {
        displayName: "Email Display Text",
        name: "emailDisplayText",
        type: "boolean",
        default: false,
        description: "Allow display text in emails.",
      },
      {
        displayName: "Email Min Subdomains",
        name: "emailMinSubdomains",
        type: "string",
        default: "",
        description: "Minimum number of subdomains required in the email.",
      },
      {
        displayName: "Email Domain Literal",
        name: "emailDomainLiteral",
        type: "boolean",
        default: false,
        description: "Allow domain literals in emails.",
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
      {
        displayName: "Quiet",
        name: "quiet",
        type: "boolean",
        default: false,
        description: "Do not display validation summary message.",
      },
    ],
  },
];
