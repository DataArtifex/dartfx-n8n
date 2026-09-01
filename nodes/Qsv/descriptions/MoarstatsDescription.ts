import type { INodeProperties } from "n8n-workflow";

export const MoarstatsDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["moarstats"],
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
        operation: ["moarstats"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description:
      "Additional raw command line arguments to pass to qsv moarstats",
    displayOptions: {
      show: {
        operation: ["moarstats"],
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
        operation: ["moarstats"],
      },
    },
    options: [
      {
        displayName: "Advanced",
        name: "advanced",
        type: "boolean",
        default: false,
        description:
          "Compute Kurtosis, Shannon Entropy, Bimodality Coefficient,",
      },
      {
        displayName: "Epsilon",
        name: "epsilon",
        type: "string",
        default: "",
        description: "The Atkinson Index Inequality Aversion parameter.",
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
        displayName: "Use Percentiles",
        name: "usePercentiles",
        type: "boolean",
        default: false,
        description:
          "Use percentiles instead of Q1/Q3 for winsorization/trimming.",
      },
      {
        displayName: "Pct Thresholds",
        name: "pctThresholds",
        type: "string",
        default: "",
        description: 'Comma-separated percentile pair (e.g., "10,90") to use',
      },
      {
        displayName: "Xsd Gdate Scan",
        name: "xsdGdateScan",
        type: "string",
        default: "",
        description: "Gregorian XSD date type detection mode.",
      },
      {
        displayName: "Bivariate",
        name: "bivariate",
        type: "boolean",
        default: false,
        description: "Enable bivariate statistics computation.",
      },
      {
        displayName: "Bivariate Stats",
        name: "bivariateStats",
        type: "string",
        default: "",
        description: "",
      },
      {
        displayName: "Cardinality Threshold",
        name: "cardinalityThreshold",
        type: "string",
        default: "",
        description: "",
      },
      {
        displayName: "Bivariate Batch",
        name: "bivariateBatch",
        type: "string",
        default: "",
        description: "Process at most <n> field pairs per pass over the input,",
      },
      {
        displayName: "Join Inputs",
        name: "joinInputs",
        type: "string",
        default: "",
        description: "",
      },
      {
        displayName: "Join Keys",
        name: "joinKeys",
        type: "string",
        default: "",
        description: "",
      },
      {
        displayName: "Join Type",
        name: "joinType",
        type: "string",
        default: "",
        description: "",
      },
      {
        displayName: "Progressbar",
        name: "progressbar",
        type: "boolean",
        default: false,
        description: "Show progress bars when computing bivariate statistics.",
      },
      {
        displayName: "Force",
        name: "force",
        type: "boolean",
        default: false,
        description: "Force recomputing stats even if valid precomputed stats",
      },
      {
        displayName: "Jobs",
        name: "jobs",
        type: "string",
        default: "",
        description: "The number of jobs to run in parallel.",
      },
    ],
  },
];
