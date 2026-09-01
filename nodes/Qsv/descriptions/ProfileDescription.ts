import type { INodeProperties } from "n8n-workflow";

export const ProfileDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["profile"],
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
        operation: ["profile"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description: "Additional raw command line arguments to pass to qsv profile",
    displayOptions: {
      show: {
        operation: ["profile"],
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
        operation: ["profile"],
      },
    },
    options: [
      {
        displayName: "Spec",
        name: "spec",
        type: "string",
        default: "",
        description: "CKAN scheming YAML spec file. If omitted, only the",
      },
      {
        displayName: "Initial Context",
        name: "initialContext",
        type: "string",
        default: "",
        description: "JSON file providing seed values for the package /",
      },
      {
        displayName: "No Projection",
        name: "noProjection",
        type: "boolean",
        default: false,
        description: "Skip the metadata projection block (dcat/croissant/",
      },
      {
        displayName: "No Ckan",
        name: "noCkan",
        type: "boolean",
        default: false,
        description: "Skip the CKAN-shape block.",
      },
      {
        displayName: "Croissant Frequency",
        name: "croissantFrequency",
        type: "boolean",
        default: false,
        description: "Embed per-column value-frequency distributions in",
      },
      {
        displayName: "Dcat Legacy License",
        name: "dcatLegacyLicense",
        type: "boolean",
        default: false,
        description: "Transitional: re-emit dct:license on the",
      },
      {
        displayName: "No Dcat Discovery",
        name: "noDcatDiscovery",
        type: "boolean",
        default: false,
        description: "Skip DCAT-markup discovery on URL inputs.",
      },
      {
        displayName: "Dcat Discovery Timeout",
        name: "dcatDiscoveryTimeout",
        type: "string",
        default: "",
        description: "Per-request timeout for DCAT-markup",
      },
      {
        displayName: "Validate",
        name: "validate",
        type: "boolean",
        default: false,
        description: "Validate the emitted projection block against",
      },
      {
        displayName: "Strict",
        name: "strict",
        type: "boolean",
        default: false,
        description: "With --validate, fail the command on JSON",
      },
      {
        displayName: "Allow External Validator",
        name: "allowExternalValidator",
        type: "boolean",
        default: false,
        description: "",
      },
      {
        displayName: "Catalog",
        name: "catalog",
        type: "boolean",
        default: false,
        description: "Wrap the emitted DCAT-US v3 Dataset inside a",
      },
      {
        displayName: "Profile",
        name: "profile",
        type: "string",
        default: "",
        description: "Metadata projection profile to use. Embedded",
      },
      {
        displayName: "Force",
        name: "force",
        type: "boolean",
        default: false,
        description: "Force recomputing cardinality and unique values",
      },
      {
        displayName: "Jobs",
        name: "jobs",
        type: "string",
        default: "",
        description: "The number of jobs to run in parallel for the",
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
        displayName: "Memcheck",
        name: "memcheck",
        type: "boolean",
        default: false,
        description: "Check if there is enough memory to load the entire",
      },
    ],
  },
];
