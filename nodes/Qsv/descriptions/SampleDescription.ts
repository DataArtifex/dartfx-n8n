import type { INodeProperties } from "n8n-workflow";

export const SampleDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["sample"],
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
        operation: ["sample"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv sample",
    displayOptions: {
      show: {
        operation: ["sample"],
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
        operation: ["sample"],
      },
    },
    options: [
      {
        displayName: "Seed",
        name: "seed",
        type: "string",
        default: "",
        description: "Random Number Generator (RNG) seed.",
      },
      {
        displayName: "Rng",
        name: "rng",
        type: "string",
        default: "",
        description: "The Random Number Generator (RNG) algorithm to use.",
      },
      {
        displayName: "Bernoulli",
        name: "bernoulli",
        type: "boolean",
        default: false,
        description:
          "Use Bernoulli sampling instead of indexed or reservoir sampling.",
      },
      {
        displayName: "Systematic",
        name: "systematic",
        type: "string",
        default: "",
        description:
          "Use systematic sampling (every nth record as specified by <sample-size>).",
      },
      {
        displayName: "Stratified",
        name: "stratified",
        type: "string",
        default: "",
        description:
          "Use stratified sampling. The strata column is specified by <col>.",
      },
      {
        displayName: "Weighted",
        name: "weighted",
        type: "string",
        default: "",
        description:
          "Use weighted sampling. The weight column is specified by <col>.",
      },
      {
        displayName: "Varopt",
        name: "varopt",
        type: "string",
        default: "",
        description: "Use VAROPT weighted reservoir sampling (A-ExpJ keying).",
      },
      {
        displayName: "Mergeable Reservoir",
        name: "mergeableReservoir",
        type: "boolean",
        default: false,
        description:
          "Use a mergeable Algorithm-R reservoir sampler. Distribution is",
      },
      {
        displayName: "Cluster",
        name: "cluster",
        type: "string",
        default: "",
        description:
          "Use cluster sampling. The cluster column is specified by <col>.",
      },
      {
        displayName: "Timeseries",
        name: "timeseries",
        type: "string",
        default: "",
        description:
          "Use time-series sampling. The time column is specified by <col>.",
      },
      {
        displayName: "Ts Interval",
        name: "tsInterval",
        type: "string",
        default: "",
        description:
          "Time interval for grouping records. Format: <number><unit>",
      },
      {
        displayName: "Ts Start",
        name: "tsStart",
        type: "string",
        default: "",
        description: "Starting point for time-series sampling.",
      },
      {
        displayName: "Ts Adaptive",
        name: "tsAdaptive",
        type: "string",
        default: "",
        description: "Adaptive sampling mode for time-series data.",
      },
      {
        displayName: "Ts Aggregate",
        name: "tsAggregate",
        type: "string",
        default: "",
        description: "Aggregation function to apply within each time interval.",
      },
      {
        displayName: "Ts Input Tz",
        name: "tsInputTz",
        type: "string",
        default: "",
        description:
          'Timezone for parsing input timestamps. Can be an IANA timezone name or "local" for the local timezone.',
      },
      {
        displayName: "Ts Prefer Dmy",
        name: "tsPreferDmy",
        type: "boolean",
        default: false,
        description:
          "Prefer to parse dates in dmy format. Otherwise, use mdy format.",
      },
      {
        displayName: "Sketch Out",
        name: "sketchOut",
        type: "string",
        default: "",
        description:
          "After sampling, also write a binary sketch describing the internal",
      },
      {
        displayName: "Sketch In",
        name: "sketchIn",
        type: "string",
        default: "",
        description:
          "Comma-separated list of sketch files produced by --sketch-out.",
      },
      {
        displayName: "User Agent",
        name: "userAgent",
        type: "string",
        default: "",
        description:
          "Specify custom user agent to use when the input is a URL.",
      },
      {
        displayName: "Timeout",
        name: "timeout",
        type: "string",
        default: "",
        description:
          "Inactivity timeout for downloading URLs in seconds. Aborts only if",
      },
      {
        displayName: "Max Size",
        name: "maxSize",
        type: "string",
        default: "",
        description:
          "Maximum size of the file to download in MB before sampling.",
      },
      {
        displayName: "Force",
        name: "force",
        type: "boolean",
        default: false,
        description: "Do not use stats cache, even if its available.",
      },
      {
        displayName: "No Headers",
        name: "noHeaders",
        type: "boolean",
        default: false,
        description: "When set, the first row will be considered as part of",
      },
      {
        displayName: "Delimiter",
        name: "delimiter",
        type: "string",
        default: "",
        description: "The field delimiter for reading/writing CSV data.",
      },
    ],
  },
];
