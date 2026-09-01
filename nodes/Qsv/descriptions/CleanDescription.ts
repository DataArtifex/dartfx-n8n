import type { INodeProperties } from "n8n-workflow";

export const CleanDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["clean"],
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
        operation: ["clean"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv clean",
    displayOptions: {
      show: {
        operation: ["clean"],
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
        operation: ["clean"],
      },
    },
    options: [
      {
        displayName: "Stale",
        name: "stale",
        type: "boolean",
        default: false,
        description: "Only remove STALE or ORPHANED caches: a cache whose",
      },
      {
        displayName: "Recursive",
        name: "recursive",
        type: "boolean",
        default: false,
        description: "Recurse into subdirectories when <input> is a directory.",
      },
      {
        displayName: "Dry Run",
        name: "dryRun",
        type: "boolean",
        default: false,
        description: "Preview only; never delete. Wins over --force if both",
      },
      {
        displayName: "Force",
        name: "force",
        type: "boolean",
        default: false,
        description: "Actually delete the files.",
      },
      {
        displayName: "Index",
        name: "index",
        type: "boolean",
        default: false,
        description: "Index (.idx) caches. [default category]",
      },
      {
        displayName: "Stats",
        name: "stats",
        type: "boolean",
        default: false,
        description: "Stats caches. [default category]",
      },
      {
        displayName: "Frequency",
        name: "frequency",
        type: "boolean",
        default: false,
        description: "Frequency caches. [default category]",
      },
      {
        displayName: "Schema",
        name: "schema",
        type: "boolean",
        default: false,
        description: "schema .schema.json / .pschema.json outputs.",
      },
      {
        displayName: "Validate",
        name: "validate",
        type: "boolean",
        default: false,
        description:
          "validate .valid / .invalid / .validation-errors.tsv outputs.",
      },
      {
        displayName: "Moarstats",
        name: "moarstats",
        type: "boolean",
        default: false,
        description: "moarstats .stats.bivariate[.joined].csv outputs.",
      },
      {
        displayName: "All",
        name: "all",
        type: "boolean",
        default: false,
        description: "Select every category above.",
      },
      {
        displayName: "Quiet",
        name: "quiet",
        type: "boolean",
        default: false,
        description: "Do not print the per-file / summary report.",
      },
    ],
  },
];
