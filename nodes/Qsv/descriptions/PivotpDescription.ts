import type { INodeProperties } from "n8n-workflow";

export const PivotpDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["pivotp"],
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
        operation: ["pivotp"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv pivotp",
    displayOptions: {
      show: {
        operation: ["pivotp"],
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
        operation: ["pivotp"],
      },
    },
    options: [
      {
        displayName: "Index",
        name: "index",
        type: "string",
        default: "",
        description: "The column(s) to use as the index (row labels).",
      },
      {
        displayName: "Values",
        name: "values",
        type: "string",
        default: "",
        description: "The column(s) containing values to aggregate.",
      },
      {
        displayName: "Agg",
        name: "agg",
        type: "string",
        default: "",
        description: "The aggregation function to use:",
      },
      {
        displayName: "Sort Columns",
        name: "sortColumns",
        type: "boolean",
        default: false,
        description: "Sort the transposed columns by name. (pivot mode only)",
      },
      {
        displayName: "Maintain Order",
        name: "maintainOrder",
        type: "boolean",
        default: false,
        description:
          "Maintain output order: preserve input column order in pivot mode,",
      },
      {
        displayName: "Col Separator",
        name: "colSeparator",
        type: "string",
        default: "",
        description:
          "The separator in generated column names in case of multiple --values columns.",
      },
      {
        displayName: "Validate",
        name: "validate",
        type: "boolean",
        default: false,
        description:
          "Validate a pivot by checking the pivot column(s)' cardinality. (pivot mode only)",
      },
      {
        displayName: "Try Parsedates",
        name: "tryParsedates",
        type: "boolean",
        default: false,
        description: "When set, will attempt to parse columns as dates.",
      },
      {
        displayName: "Infer Len",
        name: "inferLen",
        type: "string",
        default: "",
        description: "Number of rows to scan when inferring schema.",
      },
      {
        displayName: "Decimal Comma",
        name: "decimalComma",
        type: "boolean",
        default: false,
        description: "Use comma as decimal separator when READING the input.",
      },
      {
        displayName: "Ignore Errors",
        name: "ignoreErrors",
        type: "boolean",
        default: false,
        description: "Skip rows that can't be parsed.",
      },
      {
        displayName: "Grand Total",
        name: "grandTotal",
        type: "boolean",
        default: false,
        description:
          "Append a grand total row summing all numeric non-index columns.",
      },
      {
        displayName: "Subtotal",
        name: "subtotal",
        type: "boolean",
        default: false,
        description:
          "Insert subtotal rows after each group in the first index column.",
      },
      {
        displayName: "Total Label",
        name: "totalLabel",
        type: "string",
        default: "Total",
        description: "Custom label for total rows. [default: Total]",
      },
      {
        displayName: "Delimiter",
        name: "delimiter",
        type: "string",
        default: "",
        description: "The field delimiter for reading/writing CSV data.",
      },
      {
        displayName: "Quiet",
        name: "quiet",
        type: "boolean",
        default: false,
        description:
          "Do not return smart aggregation chosen nor pivot result shape to stderr.",
      },
    ],
  },
];
