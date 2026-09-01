import type { INodeProperties } from "n8n-workflow";

export const SynthesizeDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["synthesize"],
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
        operation: ["synthesize"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description:
      "Additional raw command line arguments to pass to qsv synthesize",
    displayOptions: {
      show: {
        operation: ["synthesize"],
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
        operation: ["synthesize"],
      },
    },
    options: [
      {
        displayName: "Dictionary",
        name: "dictionary",
        type: "string",
        default: "",
        description: "Data Dictionary JSON file produced by",
      },
      {
        displayName: "Infer Content Type",
        name: "inferContentType",
        type: "boolean",
        default: false,
        description: "Generate the Data Dictionary on the fly by invoking",
      },
      {
        displayName: "Rows",
        name: "rows",
        type: "number",
        default: 100,
        description: "Number of synthetic rows to generate. [default: 100]",
      },
      {
        displayName: "Seed",
        name: "seed",
        type: "string",
        default: "",
        description: "RNG seed for fully reproducible output.",
      },
      {
        displayName: "Locale",
        name: "locale",
        type: "string",
        default: "",
        description: "Locale for faker-backed columns. Case-insensitive.",
      },
      {
        displayName: "Freq Limit",
        name: "freqLimit",
        type: "string",
        default: "",
        description: "Frequency pool depth passed to the internal `frequency`",
      },
      {
        displayName: "Stats Options",
        name: "statsOptions",
        type: "string",
        default: "",
        description: "Extra options appended to the internal `stats` run.",
      },
      {
        displayName: "Consistent Fakes",
        name: "consistentFakes",
        type: "boolean",
        default: false,
        description: "For structured-faker columns with bounded cardinality",
      },
      {
        displayName: "No Relationships",
        name: "noRelationships",
        type: "boolean",
        default: false,
        description: "Disable inter-column relationship modeling. Every",
      },
      {
        displayName: "Joint Cardinality Cap",
        name: "jointCardinalityCap",
        type: "string",
        default: "",
        description: "Maximum number of distinct value-tuples a",
      },
      {
        displayName: "Correlation Threshold",
        name: "correlationThreshold",
        type: "string",
        default: "",
        description: "Minimum absolute Spearman correlation for a",
      },
      {
        displayName: "Strict Relationships",
        name: "strictRelationships",
        type: "boolean",
        default: false,
        description: "Abort instead of warning-and-degrading when a",
      },
      {
        displayName: "Jobs",
        name: "jobs",
        type: "string",
        default: "",
        description: "Number of jobs to use for the internal `stats` and",
      },
      {
        displayName: "Delimiter",
        name: "delimiter",
        type: "string",
        default: "",
        description: "The field delimiter for reading the input CSV.",
      },
    ],
  },
];
