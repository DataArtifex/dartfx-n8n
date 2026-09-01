import type { INodeProperties } from "n8n-workflow";

export const PragmastatDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["pragmastat"],
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
        operation: ["pragmastat"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description:
      "Additional raw command line arguments to pass to qsv pragmastat",
    displayOptions: {
      show: {
        operation: ["pragmastat"],
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
        operation: ["pragmastat"],
      },
    },
    options: [
      {
        displayName: "Twosample",
        name: "twosample",
        type: "boolean",
        default: false,
        description: "Compute two-sample estimators for all column pairs.",
      },
      {
        displayName: "Compare1",
        name: "compare1",
        type: "string",
        default: "",
        description:
          "One-sample confirmatory analysis. Test center/spread against",
      },
      {
        displayName: "Compare2",
        name: "compare2",
        type: "string",
        default: "",
        description:
          "Two-sample confirmatory analysis. Test shift/ratio/disparity",
      },
      {
        displayName: "Select",
        name: "select",
        type: "string",
        default: "",
        description: "Select columns for analysis. Uses qsv's column selection",
      },
      {
        displayName: "Misrate",
        name: "misrate",
        type: "string",
        default: "",
        description:
          "Probability that bounds fail to contain the true parameter.",
      },
      {
        displayName: "Standalone",
        name: "standalone",
        type: "boolean",
        default: false,
        description: "Output one-sample results as standalone CSV instead of",
      },
      {
        displayName: "Stats Options",
        name: "statsOptions",
        type: "string",
        default: "",
        description:
          "Options to pass to the stats command if baseline stats need",
      },
      {
        displayName: "Round",
        name: "round",
        type: "string",
        default: "",
        description: "Round statistics to <n> decimal places. Rounding follows",
      },
      {
        displayName: "Force",
        name: "force",
        type: "boolean",
        default: false,
        description:
          "Force recomputing ps_* columns even if they already exist",
      },
      {
        displayName: "Subsample",
        name: "subsample",
        type: "string",
        default: "",
        description: "Randomly subsample N values per column before computing.",
      },
      {
        displayName: "Seed",
        name: "seed",
        type: "string",
        default: "",
        description: "Seed for reproducible subsampling.",
      },
      {
        displayName: "No Bounds",
        name: "noBounds",
        type: "boolean",
        default: false,
        description: "Skip confidence bounds computation (~2x faster).",
      },
      {
        displayName: "Delimiter",
        name: "delimiter",
        type: "string",
        default: "",
        description: "The field delimiter for reading/writing CSV data.",
      },
      {
        displayName: "No Headers",
        name: "noHeaders",
        type: "boolean",
        default: false,
        description: "When set, the first row will not be treated as headers.",
      },
      {
        displayName: "Jobs",
        name: "jobs",
        type: "string",
        default: "",
        description: "The number of jobs to run in parallel.",
      },
      {
        displayName: "Memcheck",
        name: "memcheck",
        type: "boolean",
        default: false,
        description: "Check if there is enough memory to load the entire",
      },
    ],
  },
];
