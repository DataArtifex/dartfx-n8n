import type { INodeProperties } from "n8n-workflow";

export const GeoconvertDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["geoconvert"],
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
        operation: ["geoconvert"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description:
      "Additional raw command line arguments to pass to qsv geoconvert",
    displayOptions: {
      show: {
        operation: ["geoconvert"],
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
        operation: ["geoconvert"],
      },
    },
    options: [
      {
        displayName: "Geometry",
        name: "geometry",
        type: "string",
        default: "",
        description: "The name of the column that has WKT geometry.",
      },
      {
        displayName: "Latitude",
        name: "latitude",
        type: "string",
        default: "",
        description: "The name of the column with northing values.",
      },
      {
        displayName: "Longitude",
        name: "longitude",
        type: "string",
        default: "",
        description: "The name of the column with easting values.",
      },
      {
        displayName: "Max Length",
        name: "maxLength",
        type: "string",
        default: "",
        description: "The maximum column length when the output format is CSV.",
      },
    ],
  },
];
