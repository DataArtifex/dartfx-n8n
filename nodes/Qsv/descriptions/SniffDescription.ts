import type { INodeProperties } from "n8n-workflow";

export const SniffDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["sniff"],
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
        operation: ["sniff"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv sniff",
    displayOptions: {
      show: {
        operation: ["sniff"],
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
        operation: ["sniff"],
      },
    },
    options: [
      {
        displayName: "Sample",
        name: "sample",
        type: "string",
        default: "",
        description: "First n rows to sample to sniff out the metadata.",
      },
      {
        displayName: "Prefer Dmy",
        name: "preferDmy",
        type: "boolean",
        default: false,
        description:
          "Prefer to parse dates in dmy format. Otherwise, use mdy format.",
      },
      {
        displayName: "Delimiter",
        name: "delimiter",
        type: "string",
        default: "",
        description: "The delimiter for reading CSV data.",
      },
      {
        displayName: "Quote",
        name: "quote",
        type: "string",
        default: "",
        description: "The quote character for reading CSV data.",
      },
      {
        displayName: "Json",
        name: "json",
        type: "boolean",
        default: false,
        description: "Return results in JSON format.",
      },
      {
        displayName: "Pretty Json",
        name: "prettyJson",
        type: "boolean",
        default: false,
        description: "Return results in pretty JSON format.",
      },
      {
        displayName: "Save Urlsample",
        name: "saveUrlsample",
        type: "string",
        default: "",
        description: "Save the URL sample to a file.",
      },
      {
        displayName: "Timeout",
        name: "timeout",
        type: "string",
        default: "",
        description:
          "Timeout when sniffing URLs in seconds. If 0, no timeout is used.",
      },
      {
        displayName: "User Agent",
        name: "userAgent",
        type: "string",
        default: "",
        description:
          "Specify custom user agent to use when sniffing a CSV on a URL.",
      },
      {
        displayName: "Stats Types",
        name: "statsTypes",
        type: "boolean",
        default: false,
        description: "Use the same data type names as `stats`.",
      },
      {
        displayName: "No Infer",
        name: "noInfer",
        type: "boolean",
        default: false,
        description:
          "Do not infer the schema. Only return the file's mime type, size and",
      },
      {
        displayName: "Just Mime",
        name: "justMime",
        type: "boolean",
        default: false,
        description:
          "Only return the file's mime type. Use this to use sniff as a general",
      },
      {
        displayName: "Quick",
        name: "quick",
        type: "boolean",
        default: false,
        description:
          "When sniffing a non-CSV remote file, only download the first chunk of the file",
      },
      {
        displayName: "Harvest Mode",
        name: "harvestMode",
        type: "boolean",
        default: false,
        description:
          "This is a convenience flag when using sniff in CKAN harvesters.",
      },
      {
        displayName: "Progressbar",
        name: "progressbar",
        type: "boolean",
        default: false,
        description: "Show progress bars. Only valid for URL input.",
      },
    ],
  },
];
