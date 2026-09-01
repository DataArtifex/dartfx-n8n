import type { INodeProperties } from "n8n-workflow";

export const TemplateDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["template"],
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
        operation: ["template"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description:
      "Additional raw command line arguments to pass to qsv template",
    displayOptions: {
      show: {
        operation: ["template"],
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
        operation: ["template"],
      },
    },
    options: [
      {
        displayName: "Template",
        name: "template",
        type: "string",
        default: "",
        description:
          "MiniJinja template string to use (alternative to --template-file)",
      },
      {
        displayName: "Template File",
        name: "templateFile",
        type: "string",
        default: "",
        description: "MiniJinja template file to use",
      },
      {
        displayName: "Globals Json",
        name: "globalsJson",
        type: "string",
        default: "",
        description:
          "A JSON file containing global variables to make available in templates.",
      },
      {
        displayName: "Outfilename",
        name: "outfilename",
        type: "string",
        default: "",
        description:
          "MiniJinja template string to use to create the filename of the output",
      },
      {
        displayName: "Outsubdir Size",
        name: "outsubdirSize",
        type: "string",
        default: "",
        description: "The number of files per subdirectory in <outdir>.",
      },
      {
        displayName: "Customfilter Error",
        name: "customfilterError",
        type: "string",
        default: "",
        description:
          "The value to return when a custom filter returns an error.",
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
        type: "number",
        default: 30,
        description: "Timeout for downloading lookups on URLs. [default: 30]",
      },
      {
        displayName: "Cache Dir",
        name: "cacheDir",
        type: "string",
        default: "",
        description:
          "The directory to use for caching downloaded lookup resources.",
      },
      {
        displayName: "Ckan Api",
        name: "ckanApi",
        type: "string",
        default: "",
        description:
          "The URL of the CKAN API to use for downloading lookup resources",
      },
      {
        displayName: "Ckan Token",
        name: "ckanToken",
        type: "string",
        default: "",
        description:
          "The CKAN API token to use. Only required if downloading private resources.",
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
        default: ",",
        description: "Field separator for reading CSV [default: ,]",
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
