import type { INodeProperties } from "n8n-workflow";

export const ApplyDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["apply"],
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
        operation: ["apply"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv apply",
    displayOptions: {
      show: {
        operation: ["apply"],
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
        operation: ["apply"],
      },
    },
    options: [
      {
        displayName: "New Column",
        name: "newColumn",
        type: "string",
        default: "",
        description: "Put the transformed values in a new column instead.",
      },
      {
        displayName: "Rename",
        name: "rename",
        type: "string",
        default: "",
        description: "New name for the transformed column.",
      },
      {
        displayName: "Comparand",
        name: "comparand",
        type: "string",
        default: "",
        description:
          "The string to compare against for replace & similarity operations.",
      },
      {
        displayName: "Replacement",
        name: "replacement",
        type: "string",
        default: "",
        description:
          "The string to use for the replace & emptyreplace operations.",
      },
      {
        displayName: "Formatstr",
        name: "formatstr",
        type: "string",
        default: "",
        description: "This option is used by several subcommands:",
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
        displayName: "Base Url",
        name: "baseUrl",
        type: "string",
        default: "",
        description: "Base URL of the OpenAI API-compatible endpoint.",
      },
      {
        displayName: "Model",
        name: "model",
        type: "string",
        default: "",
        description: "Model name compatible with the OpenAI API spec.",
      },
      {
        displayName: "Api Key",
        name: "apiKey",
        type: "string",
        default: "",
        description: "API key for Bearer token authentication.",
      },
      {
        displayName: "Max Tokens",
        name: "maxTokens",
        type: "string",
        default: "",
        description:
          "Maximum number of tokens in the LLM output. Set to 0 to not send a",
      },
      {
        displayName: "Timeout",
        name: "timeout",
        type: "string",
        default: "",
        description:
          "Timeout for each LLM request in seconds (0 = no timeout).",
      },
      {
        displayName: "Addl Props",
        name: "addlProps",
        type: "string",
        default: "",
        description: "Additional model properties as a JSON object, e.g.",
      },
      {
        displayName: "Prompt",
        name: "prompt",
        type: "string",
        default: "",
        description:
          "MiniJinja prompt template rendered per record. Overrides the",
      },
      {
        displayName: "Prompt File",
        name: "promptFile",
        type: "string",
        default: "",
        description:
          "Read the prompt template from a file. Ignored if --prompt is set.",
      },
      {
        displayName: "Rate Limit",
        name: "rateLimit",
        type: "string",
        default: "",
        description:
          "Seconds to sleep between LLM requests to avoid provider rate limits.",
      },
      {
        displayName: "On Error",
        name: "onError",
        type: "string",
        default: "",
        description:
          'What to do when an LLM request fails: "fail" aborts; "skip" writes',
      },
      {
        displayName: "User Agent",
        name: "userAgent",
        type: "string",
        default: "",
        description:
          "Custom user agent for LLM requests. Supports variables like $QSV_VERSION.",
      },
      {
        displayName: "Cache Dir",
        name: "cacheDir",
        type: "string",
        default: "~/.qsv-cache/apply-summarize",
        description:
          "Directory for the disk cache. [default: ~/.qsv-cache/apply-summarize]",
      },
      {
        displayName: "No Cache",
        name: "noCache",
        type: "boolean",
        default: false,
        description: "Disable the disk cache (one LLM call per row, always).",
      },
      {
        displayName: "Fresh",
        name: "fresh",
        type: "boolean",
        default: false,
        description: "Force fresh LLM calls, refreshing any cached values.",
      },
      {
        displayName: "Stats",
        name: "stats",
        type: "boolean",
        default: false,
        description: "Append two extra columns per row alongside --new-column:",
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
    ],
  },
];
