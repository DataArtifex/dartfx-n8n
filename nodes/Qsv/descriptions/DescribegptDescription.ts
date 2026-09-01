import type { INodeProperties } from "n8n-workflow";

export const DescribegptDescription: INodeProperties[] = [
  {
    displayName: "Input CSV File Path",
    name: "inputPath",
    type: "string",
    required: true,
    default: "",
    description: "Path to input CSV file on disk or host filesystem",
    displayOptions: {
      show: {
        operation: ["describegpt"],
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
        operation: ["describegpt"],
      },
    },
  },
  {
    displayName: "Additional Flags",
    name: "additionalArgs",
    type: "string",
    default: "",
    description:
      "Additional raw command line arguments to pass to qsv describegpt",
    displayOptions: {
      show: {
        operation: ["describegpt"],
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
        operation: ["describegpt"],
      },
    },
    options: [
      {
        displayName: "Dictionary",
        name: "dictionary",
        type: "boolean",
        default: false,
        description:
          'Create a Data Dictionary using a hybrid "neuro-symbolic" pipeline - i.e.',
      },
      {
        displayName: "Description",
        name: "description",
        type: "boolean",
        default: false,
        description:
          "Infer a general Description of the dataset based on detailed statistical context.",
      },
      {
        displayName: "Tags",
        name: "tags",
        type: "boolean",
        default: false,
        description:
          "Infer Tags that categorize the dataset based on detailed statistical context.",
      },
      {
        displayName: "All",
        name: "all",
        type: "boolean",
        default: false,
        description: "Shortcut for --dictionary --description --tags.",
      },
      {
        displayName: "Num Examples",
        name: "numExamples",
        type: "string",
        default: "",
        description:
          "The number of Example values to include in the dictionary.",
      },
      {
        displayName: "Truncate Str",
        name: "truncateStr",
        type: "string",
        default: "",
        description:
          "The maximum length of an Example value in the dictionary.",
      },
      {
        displayName: "Infer Content Type",
        name: "inferContentType",
        type: "boolean",
        default: false,
        description:
          'Also have the LLM classify each field\'s semantic "Content Type", mapped to a',
      },
      {
        displayName: "Infer Null Values",
        name: "inferNullValues",
        type: "boolean",
        default: false,
        description:
          "Also have the LLM propose each field's null sentinels - literal values",
      },
      {
        displayName: "Two Pass",
        name: "twoPass",
        type: "boolean",
        default: false,
        description:
          "Run a second LLM call that takes the full first-pass Data Dictionary",
      },
      {
        displayName: "Addl Cols",
        name: "addlCols",
        type: "boolean",
        default: false,
        description:
          "Add additional columns to the dictionary from the Summary Statistics.",
      },
      {
        displayName: "Addl Cols List",
        name: "addlColsList",
        type: "string",
        default: "",
        description:
          "A comma-separated list of additional stats columns to add to the dictionary.",
      },
      {
        displayName: "Num Tags",
        name: "numTags",
        type: "string",
        default: "",
        description:
          "The maximum number of tags to infer when the --tags option is used.",
      },
      {
        displayName: "Tag Vocab",
        name: "tagVocab",
        type: "string",
        default: "",
        description:
          "The CSV file containing the tag vocabulary to use for inferring tags.",
      },
      {
        displayName: "Cache Dir",
        name: "cacheDir",
        type: "string",
        default: "",
        description:
          "The directory to use for caching downloaded tag vocabulary resources.",
      },
      {
        displayName: "Ckan Api",
        name: "ckanApi",
        type: "string",
        default: "",
        description:
          "The URL of the CKAN API to use for downloading tag vocabulary resources",
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
        displayName: "Stats Options",
        name: "statsOptions",
        type: "string",
        default: "",
        description:
          "Options for the stats command used to generate summary statistics.",
      },
      {
        displayName: "Freq Options",
        name: "freqOptions",
        type: "string",
        default: "",
        description:
          "Options for the frequency command used to generate frequency distributions.",
      },
      {
        displayName: "Enum Threshold",
        name: "enumThreshold",
        type: "string",
        default: "",
        description:
          "The threshold for compiling Enumerations with the frequency command",
      },
      {
        displayName: "Prompt",
        name: "prompt",
        type: "string",
        default: "",
        description: "Custom prompt to answer questions about the dataset.",
      },
      {
        displayName: "Sql Results",
        name: "sqlResults",
        type: "string",
        default: "",
        description: "The file to save the SQL query results to.",
      },
      {
        displayName: "Prompt File",
        name: "promptFile",
        type: "string",
        default: "",
        description:
          "The configurable TOML file containing prompts to use for inferencing.",
      },
      {
        displayName: "Context File",
        name: "contextFile",
        type: "string",
        default: "",
        description:
          "Path to a file with additional context about the dataset - e.g.",
      },
      {
        displayName: "Markdown Template",
        name: "markdownTemplate",
        type: "string",
        default: "",
        description:
          "TOML file with MiniJinja templates for Markdown output. The TOML",
      },
      {
        displayName: "Sample Size",
        name: "sampleSize",
        type: "string",
        default: "",
        description:
          "The number of rows to randomly sample from the input file for the sample data.",
      },
      {
        displayName: "Fewshot Examples",
        name: "fewshotExamples",
        type: "boolean",
        default: false,
        description:
          "By default, few-shot examples are NOT included in the LLM prompt when",
      },
      {
        displayName: "Session",
        name: "session",
        type: "string",
        default: "",
        description:
          "Enable stateful session mode for iterative SQL RAG refinement.",
      },
      {
        displayName: "Session Len",
        name: "sessionLen",
        type: "string",
        default: "",
        description:
          "Maximum number of recent messages to keep in session context before",
      },
      {
        displayName: "No Score Sql",
        name: "noScoreSql",
        type: "boolean",
        default: false,
        description:
          "Disable scoresql validation of generated SQL queries before execution.",
      },
      {
        displayName: "Score Threshold",
        name: "scoreThreshold",
        type: "string",
        default: "",
        description: "Minimum scoresql score for a SQL query to be accepted.",
      },
      {
        displayName: "Score Max Retries",
        name: "scoreMaxRetries",
        type: "string",
        default: "",
        description: "Max LLM re-prompts to improve a low-scoring SQL query.",
      },
      {
        displayName: "Base Url",
        name: "baseUrl",
        type: "string",
        default: "",
        description:
          "The LLM API URL. Supports APIs & local LLMs compatible with",
      },
      {
        displayName: "Model",
        name: "model",
        type: "string",
        default: "",
        description:
          "The model to use for inferencing. This model must be compatible with OpenAI API spec.",
      },
      {
        displayName: "Language",
        name: "language",
        type: "string",
        default: "",
        description:
          'The output language/dialect/tone to use for the response. (e.g., "Spanish", "French",',
      },
      {
        displayName: "Addl Props",
        name: "addlProps",
        type: "string",
        default: "",
        description:
          "Additional model properties to pass to the LLM chat/completion API.",
      },
      {
        displayName: "Api Key",
        name: "apiKey",
        type: "string",
        default: "",
        description:
          "The API key to use. If set, takes precedence over the QSV_LLM_APIKEY envvar.",
      },
      {
        displayName: "Max Tokens",
        name: "maxTokens",
        type: "string",
        default: "",
        description: "Limits the number of generated tokens in the output.",
      },
      {
        displayName: "Timeout",
        name: "timeout",
        type: "string",
        default: "",
        description:
          "Timeout for completions in seconds. If 0, no timeout is used.",
      },
      {
        displayName: "User Agent",
        name: "userAgent",
        type: "string",
        default: "",
        description:
          "Specify custom user agent. It supports the following variables -",
      },
      {
        displayName: "Export Prompt",
        name: "exportPrompt",
        type: "string",
        default: "",
        description: "Export the default prompts to the specified file that",
      },
      {
        displayName: "No Cache",
        name: "noCache",
        type: "boolean",
        default: false,
        description: "Disable default disk cache.",
      },
      {
        displayName: "Disk Cache Dir",
        name: "diskCacheDir",
        type: "string",
        default: "",
        description:
          "The directory to store the disk cache. Note that if the directory does not exist,",
      },
      {
        displayName: "Redis Cache",
        name: "redisCache",
        type: "boolean",
        default: false,
        description:
          "Use Redis instead of the default disk cache to cache LLM completions.",
      },
      {
        displayName: "Fresh",
        name: "fresh",
        type: "boolean",
        default: false,
        description:
          "Send a fresh request to the LLM API, refreshing a cached response if it exists.",
      },
      {
        displayName: "Forget",
        name: "forget",
        type: "boolean",
        default: false,
        description: "Remove a cached response if it exists and then exit.",
      },
      {
        displayName: "Flush Cache",
        name: "flushCache",
        type: "boolean",
        default: false,
        description: "Flush the current cache entries on startup.",
      },
      {
        displayName: "Prepare Context",
        name: "prepareContext",
        type: "boolean",
        default: false,
        description:
          "Output the prompt context as JSON to stdout without calling the LLM.",
      },
      {
        displayName: "Process Response",
        name: "processResponse",
        type: "boolean",
        default: false,
        description:
          "Process LLM responses provided as JSON via stdin. Takes the output",
      },
      {
        displayName: "Format",
        name: "format",
        type: "string",
        default: "",
        description:
          "Output format: Markdown, TSV, JSON, TOON, JSONSchema, SemanticMd, or OKF.",
      },
      {
        displayName: "Allow Extra Cols",
        name: "allowExtraCols",
        type: "boolean",
        default: false,
        description:
          "When the format is JSONSchema, emit additionalProperties as true at the",
      },
      {
        displayName: "Strict Dates",
        name: "strictDates",
        type: "boolean",
        default: false,
        description:
          "When the format is JSONSchema, emit format date or date-time for",
      },
      {
        displayName: "Ds Source",
        name: "dsSource",
        type: "string",
        default: "",
        description:
          "For the SemanticMd & OKF formats only: the dataset source/provenance",
      },
      {
        displayName: "Ds Updated",
        name: "dsUpdated",
        type: "string",
        default: "",
        description:
          "For the SemanticMd & OKF formats only: the dataset's last-updated date",
      },
      {
        displayName: "Ds License",
        name: "dsLicense",
        type: "string",
        default: "",
        description:
          "For the SemanticMd format only: the dataset license recorded in the",
      },
      {
        displayName: "Okf Type",
        name: "okfType",
        type: "string",
        default: "",
        description:
          "For the OKF format only: the value of the required `type` frontmatter key",
      },
      {
        displayName: "Quiet",
        name: "quiet",
        type: "boolean",
        default: false,
        description: "Do not print status messages to stderr.",
      },
    ],
  },
];
