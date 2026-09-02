import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";

interface CliOption {
  flag: string;
  shortFlag?: string;
  hasArg: boolean;
  argName?: string;
  description: string;
  defaultValue?: string;
}

interface PositionalParam {
  name: string;
  displayName: string;
  type: "string" | "number";
  required: boolean;
  default?: any;
  description: string;
}

type AssemblyType =
  | "inputLast"
  | "inputFirst"
  | "sqlLast"
  | "positionalOutput"
  | "dualInput"
  | "diff"
  | "toCustom"
  | "validateCustom"
  | "splitCustom"
  | "partitionCustom";

interface CommandConfig {
  positionals?: PositionalParam[];
  assemblyType: AssemblyType;
  hasOutputOption?: boolean;
}

interface ParsedCommand {
  name: string;
  description: string;
  usage: string;
  options: CliOption[];
  config: CommandConfig;
  feature?: string;
}

const QSV_BIN =
  process.env.DARTFX_QSV_BIN_PATH ||
  process.env.QSV_BIN_PATH ||
  process.env.QSV_PATH ||
  "qsv";

const EXCLUDED_COMMANDS = new Set([
  "color",
  "lens",
  "prompt",
  "clipboard",
  "log",
  "clean",
  "help",
]);

const FEATURE_MAP: Record<string, string> = {
  sqlp: "polars",
  joinp: "polars",
  pivotp: "polars",
  scoresql: "polars",
  luau: "luau",
  to: "to",
  geocode: "geocode",
  geoconvert: "geocode",
  synthesize: "synthesize",
  profile: "profile",
  viz: "viz",
  describegpt: "feature-gated",
};

const COMMAND_CONFIGS: Record<string, CommandConfig> = {
  select: {
    positionals: [
      {
        name: "selection",
        displayName: "Selection",
        type: "string",
        required: true,
        description:
          "Comma-separated column names, 1-based indices, or ranges (e.g. 1,4, colA,colB, !colC, /^regex/)",
      },
    ],
    assemblyType: "inputLast",
  },
  search: {
    positionals: [
      {
        name: "regex",
        displayName: "Regex",
        type: "string",
        required: true,
        description: "Regular expression pattern to search for",
      },
    ],
    assemblyType: "inputLast",
  },
  searchset: {
    positionals: [
      {
        name: "regexsetFile",
        displayName: "Regex Set File",
        type: "string",
        required: true,
        description: "Path to file containing regex patterns (one per line)",
      },
    ],
    assemblyType: "inputLast",
  },
  sample: {
    positionals: [
      {
        name: "sampleSize",
        displayName: "Sample Size",
        type: "string",
        required: true,
        default: "100",
        description:
          "Number of records (integer >= 1) or fraction of records (0 < decimal < 1) to sample",
      },
    ],
    assemblyType: "inputLast",
  },
  pseudo: {
    positionals: [
      {
        name: "column",
        displayName: "Column",
        type: "string",
        required: true,
        description: "Column name or 1-based index to pseudonymise",
      },
    ],
    assemblyType: "inputLast",
  },
  rename: {
    positionals: [
      {
        name: "headers",
        displayName: "Headers",
        type: "string",
        required: true,
        description: "Comma-separated list of new header names",
      },
    ],
    assemblyType: "inputLast",
  },
  fill: {
    positionals: [
      {
        name: "selection",
        displayName: "Selection",
        type: "string",
        required: true,
        description: "Column selection to fill empty values in",
      },
    ],
    assemblyType: "inputLast",
  },
  replace: {
    positionals: [
      {
        name: "pattern",
        displayName: "Pattern",
        type: "string",
        required: true,
        description: "Regular expression pattern to search for",
      },
      {
        name: "replacement",
        displayName: "Replacement",
        type: "string",
        required: true,
        description:
          "Replacement string (supports regex capture groups like $1)",
      },
    ],
    assemblyType: "inputLast",
  },
  explode: {
    positionals: [
      {
        name: "column",
        displayName: "Column",
        type: "string",
        required: true,
        description: "Column name or index to explode",
      },
      {
        name: "separator",
        displayName: "Separator",
        type: "string",
        required: true,
        description: "Delimiter string to explode rows on",
      },
    ],
    assemblyType: "inputLast",
  },
  implode: {
    positionals: [
      {
        name: "separator",
        displayName: "Separator",
        type: "string",
        required: true,
        description: "Delimiter string to join imploded values with",
      },
    ],
    assemblyType: "inputLast",
  },
  foreach: {
    positionals: [
      {
        name: "column",
        displayName: "Column",
        type: "string",
        required: true,
        description: "Column whose values will be passed to the command",
      },
      {
        name: "command",
        displayName: "Command",
        type: "string",
        required: true,
        description: "Shell command to execute for each row",
      },
    ],
    assemblyType: "inputLast",
  },
  datefmt: {
    positionals: [
      {
        name: "column",
        displayName: "Column",
        type: "string",
        required: true,
        description:
          "Column name or index containing date/datetime strings to format",
      },
    ],
    assemblyType: "inputLast",
  },
  pivotp: {
    positionals: [
      {
        name: "onCols",
        displayName: "On Columns",
        type: "string",
        required: true,
        description: "Columns to aggregate on for pivoting",
      },
    ],
    assemblyType: "inputLast",
  },
  edit: {
    positionals: [
      {
        name: "column",
        displayName: "Column",
        type: "string",
        required: true,
        description: "Column name or 1-based index of cell to edit",
      },
      {
        name: "row",
        displayName: "Row Index",
        type: "number",
        required: true,
        default: 1,
        description: "1-based row index (record number) of cell to edit",
      },
      {
        name: "value",
        displayName: "New Value",
        type: "string",
        required: true,
        description: "New value to write into the cell",
      },
    ],
    assemblyType: "inputFirst",
  },
  geoconvert: {
    positionals: [
      {
        name: "inputFormat",
        displayName: "Input Format",
        type: "string",
        required: true,
        description:
          "Format of input spatial file (e.g. geojson, shp, csv)",
      },
      {
        name: "outputFormat",
        displayName: "Output Format",
        type: "string",
        required: true,
        description:
          "Format of output spatial file (e.g. geojson, shp, csv)",
      },
    ],
    assemblyType: "inputFirst",
  },
  sqlp: {
    positionals: [
      {
        name: "sql",
        displayName: "SQL Query",
        type: "string",
        required: true,
        description:
          "Polars SQL query to execute against the input CSV (e.g. SELECT * FROM _t_1 WHERE ...)",
      },
    ],
    assemblyType: "sqlLast",
  },
  scoresql: {
    positionals: [
      {
        name: "sql",
        displayName: "SQL Query",
        type: "string",
        required: true,
        description: "SQL query to score for execution performance",
      },
    ],
    assemblyType: "sqlLast",
    hasOutputOption: false,
  },
  extsort: {
    assemblyType: "positionalOutput",
    hasOutputOption: false,
  },
  extdedup: {
    assemblyType: "positionalOutput",
    hasOutputOption: false,
  },
  split: {
    positionals: [
      {
        name: "outdir",
        displayName: "Output Directory",
        type: "string",
        required: true,
        description:
          "Directory where split chunk CSV files will be written",
      },
    ],
    assemblyType: "splitCustom",
    hasOutputOption: false,
  },
  partition: {
    positionals: [
      {
        name: "column",
        displayName: "Column",
        type: "string",
        required: true,
        description: "Column to partition CSV data on",
      },
      {
        name: "outdir",
        displayName: "Output Directory",
        type: "string",
        required: true,
        description:
          "Directory where partitioned CSV files will be written",
      },
    ],
    assemblyType: "partitionCustom",
    hasOutputOption: false,
  },
  join: {
    positionals: [
      {
        name: "columns1",
        displayName: "First File Join Columns",
        type: "string",
        required: true,
        description: "Join columns for first input file (e.g. id or 1)",
      },
      {
        name: "columns2",
        displayName: "Second File Join Columns",
        type: "string",
        required: true,
        description: "Join columns for second input file (e.g. id or 1)",
      },
      {
        name: "input2",
        displayName: "Second Input File Path",
        type: "string",
        required: true,
        description: "Path to second input CSV file on disk",
      },
    ],
    assemblyType: "dualInput",
  },
  joinp: {
    positionals: [
      {
        name: "columns1",
        displayName: "First File Join Columns",
        type: "string",
        required: true,
        description: "Join columns for first input file (e.g. id or 1)",
      },
      {
        name: "columns2",
        displayName: "Second File Join Columns",
        type: "string",
        required: true,
        description: "Join columns for second input file (e.g. id or 1)",
      },
      {
        name: "input2",
        displayName: "Second Input File Path",
        type: "string",
        required: true,
        description: "Path to second input CSV file on disk",
      },
    ],
    assemblyType: "dualInput",
  },
  exclude: {
    positionals: [
      {
        name: "columns1",
        displayName: "First File Exclude Columns",
        type: "string",
        required: true,
        description: "Columns in first input file to match on",
      },
      {
        name: "columns2",
        displayName: "Second File Exclude Columns",
        type: "string",
        required: true,
        description: "Columns in second input file to match on",
      },
      {
        name: "input2",
        displayName: "Second Input File Path",
        type: "string",
        required: true,
        description: "Path to second input CSV file on disk",
      },
    ],
    assemblyType: "dualInput",
  },
  diff: {
    positionals: [
      {
        name: "inputRight",
        displayName: "Right CSV File Path",
        type: "string",
        required: true,
        description: "Path to second (right) CSV file to compare against",
      },
    ],
    assemblyType: "diff",
  },
  to: {
    positionals: [
      {
        name: "format",
        displayName: "Target Format",
        type: "string",
        required: true,
        default: "parquet",
        description:
          "Target output format (parquet, postgres, sqlite, xlsx, ods, datapackage)",
      },
      {
        name: "destination",
        displayName: "Destination",
        type: "string",
        required: true,
        description:
          "Destination file path, database URI, or connection string",
      },
    ],
    assemblyType: "toCustom",
    hasOutputOption: false,
  },
  validate: {
    positionals: [
      {
        name: "jsonSchema",
        displayName: "JSON Schema Path / URL",
        type: "string",
        required: false,
        default: "",
        description:
          "Optional path or URL to JSON Schema. If omitted, performs standard RFC 4180 validation.",
      },
    ],
    assemblyType: "validateCustom",
    hasOutputOption: false,
  },
};

/**
 * Extracts target QSV binary version dynamically by running `qsv --version`.
 */
function getQsvVersion(): string {
  try {
    const versionOutput = execSync(`${QSV_BIN} --version`, {
      encoding: "utf8",
    }).trim();
    const match = versionOutput.match(/^qsv\s+([0-9]+\.[0-9]+(?:\.[0-9]+)?)/i);
    if (match) {
      return match[1];
    }
    const firstLine = versionOutput.split("\n")[0];
    return firstLine.replace(/^qsv\s*/i, "").trim() || "unknown";
  } catch (error: any) {
    console.warn(
      `Warning: Could not get QSV version via '${QSV_BIN} --version': ${error.message}`,
    );
    return "unknown";
  }
}

/**
 * Discovers available QSV commands dynamically by running `qsv --list`.
 */
function getAvailableCommands(): string[] {
  try {
    const listOutput = execSync(`${QSV_BIN} --list`, { encoding: "utf8" });
    const lines = listOutput.split("\n");
    const commands: string[] = [];

    for (const line of lines) {
      // Matches lines starting with 4 spaces followed by the command name
      const match = line.match(/^\s{4}([a-z0-9_-]+)\s+(.+)$/);
      if (match) {
        const cmd = match[1].trim();
        // Filter excluded commands
        if (!EXCLUDED_COMMANDS.has(cmd) && !commands.includes(cmd)) {
          commands.push(cmd);
        }
      }
    }

    if (commands.length > 0) {
      console.log(
        `Discovered ${commands.length} QSV commands via '${QSV_BIN} --list' (excluded ${EXCLUDED_COMMANDS.size} terminal/utility commands)`,
      );
      return commands;
    }
  } catch (error: any) {
    console.warn(
      `Warning: Could not get commands via '${QSV_BIN} --list': ${error.message}`,
    );
  }

  // Fallback if 'qsv --list' fails
  return [
    "stats",
    "frequency",
    "schema",
    "index",
    "count",
    "sniff",
    "sample",
    "select",
    "slice",
    "sort",
    "search",
    "validate",
    "to",
  ];
}

function getCommandHelp(cmd: string): string {
  try {
    return execSync(`${QSV_BIN} ${cmd} --help`, { encoding: "utf8" });
  } catch (error: any) {
    console.warn(
      `Warning: Could not get help for '${QSV_BIN} ${cmd}': ${error.message}`,
    );
    return "";
  }
}

function toSafePropName(flag: string): string {
  let camel = flag.replace(/-([a-z0-9])/g, (_, g) => g.toUpperCase());
  if (/^[0-9]/.test(camel)) {
    camel = `_${camel}`;
  }
  return camel;
}

function toCapitalized(cmd: string): string {
  return cmd.charAt(0).toUpperCase() + cmd.slice(1);
}

function parseHelpText(cmdName: string, helpText: string): ParsedCommand {
  const lines = helpText.split("\n");
  const options: CliOption[] = [];
  let usage = "";

  // Extract usage
  const usageIdx = lines.findIndex((l) => l.toLowerCase().startsWith("usage:"));
  if (usageIdx !== -1) {
    usage = lines[usageIdx].replace(/^usage:\s*/i, "").trim();
    if (lines[usageIdx + 1] && lines[usageIdx + 1].startsWith("  ")) {
      usage += " " + lines[usageIdx + 1].trim();
    }
  }

  // Extract clean full description
  const descLines: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (
      trimmed.toLowerCase().startsWith("usage:") ||
      trimmed.toLowerCase().startsWith("common options:") ||
      trimmed.toLowerCase().endsWith("options:") ||
      trimmed.toLowerCase() === "options:" ||
      trimmed.toLowerCase().startsWith("examples:") ||
      trimmed.toLowerCase().startsWith("example:") ||
      trimmed.startsWith("===") ||
      trimmed.startsWith("---") ||
      /^[A-Z\s]{4,}$/.test(trimmed)
    ) {
      break;
    }
    if (
      trimmed.length > 0 &&
      !trimmed.toLowerCase().startsWith("qsv ") &&
      !trimmed.toLowerCase().startsWith("installed commands")
    ) {
      descLines.push(trimmed);
    }
  }
  const description = descLines.join(" ") || `Execute qsv ${cmdName}`;

  // Extract options with full multi-line continuation support
  let inOptions = false;
  let currentOpt: CliOption | null = null;
  const linePattern =
    /^\s*(?:-([a-zA-Z0-9]),\s+)?--([a-zA-Z0-9_-]+)(?:(?:=|\s+)(<[^>]+>|\[[^\]]+\]|[A-Z][A-Z0-9_-]*))?(?:\s{2,}(.*)|$)/;

  for (const line of lines) {
    if (line.trim().toLowerCase().includes("options:")) {
      inOptions = true;
      continue;
    }

    if (inOptions) {
      const optMatch = line.match(linePattern);
      if (optMatch) {
        if (currentOpt) {
          options.push(currentOpt);
          currentOpt = null;
        }

        const shortFlag = optMatch[1];
        const flag = optMatch[2];
        const argType = optMatch[3];
        const desc = optMatch[4] ? optMatch[4].trim() : "";

        // Filter out options handled top-level (output) or irrelevant (help, version)
        if (["help", "version", "output"].includes(flag)) {
          continue;
        }

        // Try to detect default value if mentioned in desc: "[default: 10]"
        let defaultValue: string | undefined;
        const defaultMatch = desc.match(/\[default:\s*([^\]]+)\]/i);
        if (defaultMatch) {
          defaultValue = defaultMatch[1].trim();
        }

        currentOpt = {
          flag,
          shortFlag,
          hasArg: !!argType,
          argName: argType ? argType.replace(/[<>\[\]]/g, "") : undefined,
          description: desc,
          defaultValue,
        };
      } else if (
        currentOpt &&
        line.startsWith("    ") &&
        line.trim().length > 0 &&
        !line.trim().startsWith("-")
      ) {
        currentOpt.description += " " + line.trim();
      }
    }
  }

  if (currentOpt) {
    options.push(currentOpt);
  }

  const config = COMMAND_CONFIGS[cmdName] || {
    assemblyType: "inputLast",
  };

  const feature = FEATURE_MAP[cmdName];

  return {
    name: cmdName,
    description,
    usage,
    options,
    config,
    feature,
  };
}

function generateDescriptionFile(cmd: ParsedCommand): string {
  const capitalized = toCapitalized(cmd.name);
  const properties: string[] = [];

  const sortedOptions = [...cmd.options].sort((a, b) => {
    const nameA = a.flag
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    const nameB = b.flag
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return nameA.localeCompare(nameB);
  });

  for (const opt of sortedOptions) {
    const propName = toSafePropName(opt.flag);
    const displayName = opt.flag
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    const cleanDesc = (opt.description || "")
      .replace(/\\/g, "\\\\")
      .replace(/'/g, "\\'")
      .replace(/\n/g, " ");

    if (!opt.hasArg) {
      // Boolean flag
      properties.push(`    {
      displayName: '${displayName}',
      name: '${propName}',
      type: 'boolean',
      default: false,
      description: '${cleanDesc}',
    },`);
    } else {
      // String or Number option
      let defaultVal = opt.defaultValue ? `'${opt.defaultValue}'` : "''";
      let propType = "string";

      if (opt.defaultValue && !isNaN(Number(opt.defaultValue))) {
        propType = "number";
        defaultVal = opt.defaultValue;
      }

      properties.push(`    {
      displayName: '${displayName}',
      name: '${propName}',
      type: '${propType}',
      default: ${defaultVal},
      description: '${cleanDesc}',
    },`);
    }
  }

  // Positional parameters
  const positionalProps: string[] = [];
  if (cmd.config.positionals) {
    for (const pos of cmd.config.positionals) {
      const defaultVal =
        pos.default !== undefined
          ? pos.type === "number"
            ? pos.default
            : `'${pos.default}'`
          : pos.type === "number"
            ? 0
            : "''";
      const cleanPosDesc = pos.description
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'");

      positionalProps.push(`  {
    displayName: '${pos.displayName}',
    name: '${pos.name}',
    type: '${pos.type}',
    required: ${pos.required},
    default: ${defaultVal},
    description: '${cleanPosDesc}',
    displayOptions: {
      show: {
        operation: ['${cmd.name}'],
      },
    },
  },`);
    }
  }

  // Output path property
  const outputProps: string[] = [];
  if (
    cmd.config.hasOutputOption !== false ||
    cmd.config.assemblyType === "positionalOutput"
  ) {
    outputProps.push(`  {
    displayName: 'Output File Path',
    name: 'outputPath',
    type: 'string',
    default: '',
    description: 'Optional path to write output file directly to disk (if omitted, results are returned in node output)',
    displayOptions: {
      show: {
        operation: ['${cmd.name}'],
      },
    },
  },`);
  }

  return `import type { INodeProperties } from 'n8n-workflow';

export const ${capitalized}Description: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['${cmd.name}'],
      },
    },
  },
${positionalProps.join("\n")}
${outputProps.join("\n")}
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv ${cmd.name} (Docs: https://github.com/dathere/qsv/blob/master/docs/help/${cmd.name}.md)',
    displayOptions: {
      show: {
        operation: ['${cmd.name}'],
      },
    },
  },
  {
    displayName: 'Options',
    name: 'options',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        operation: ['${cmd.name}'],
      },
    },
    options: [
${properties.join("\n")}
    ],
  },
];
`;
}

function generateActionFile(cmd: ParsedCommand): string {
  const capitalized = toCapitalized(cmd.name);
  const opName = cmd.name;

  const flagProcessors: string[] = [];
  for (const opt of cmd.options) {
    const propName = toSafePropName(opt.flag);

    if (!opt.hasArg) {
      flagProcessors.push(`  if (options.${propName} === true) {
    args.push('--${opt.flag}');
  }`);
    } else {
      flagProcessors.push(`  if (options.${propName} !== undefined && options.${propName} !== '') {
    args.push('--${opt.flag}', String(options.${propName}));
  }`);
    }
  }

  // Build positional retrievals and arg assembling based on assemblyType
  const posRetrievals: string[] = [];
  const requiredChecks: string[] = [];

  if (cmd.config.positionals) {
    for (const pos of cmd.config.positionals) {
      const getter = `this.getNodeParameter('${pos.name}', itemIndex${pos.default !== undefined ? `, ${typeof pos.default === "number" ? pos.default : `'${pos.default}'`}` : ""})`;
      posRetrievals.push(
        `  const ${pos.name} = (${getter} as ${pos.type === "number" ? "number" : "string"}) || ${pos.type === "number" ? "0" : "''"};`,
      );
      if (pos.required) {
        if (pos.type === "number") {
          // Numbers can be 0 or positive
        } else {
          requiredChecks.push(`  if (!${pos.name} || !String(${pos.name}).trim()) {
    throw new NodeOperationError(
      this.getNode(),
      'Parameter "${pos.displayName}" is required for ${opName}.',
      { itemIndex },
    );
  }`);
        }
      }
    }
  }

  let argvAssemblyCode = "";
  const assemblyType = cmd.config.assemblyType;

  if (assemblyType === "inputLast") {
    const posPushes = (cmd.config.positionals || [])
      .map((p) => `  args.push(String(${p.name}));`)
      .join("\n");
    argvAssemblyCode = `
${posPushes ? posPushes + "\n" : ""}
  if (additionalArgs.trim()) {
    const rawMatches = additionalArgs.match(/[^\\s"']+|"[^"]*"|'[^']*'/g) || [];
    const parsedArgs = rawMatches.map((arg) => {
      if ((arg.startsWith('"') && arg.endsWith('"')) || (arg.startsWith("'") && arg.endsWith("'"))) {
        return arg.slice(1, -1);
      }
      return arg;
    });
    args.push(...parsedArgs);
  }

  if (outputPath.trim()) {
    args.push('--output', outputPath.trim());
  }

  args.push(inputPath);`;
  } else if (assemblyType === "inputFirst") {
    const posPushes = (cmd.config.positionals || [])
      .map((p) => `  args.push(String(${p.name}));`)
      .join("\n");
    argvAssemblyCode = `
  if (additionalArgs.trim()) {
    const rawMatches = additionalArgs.match(/[^\\s"']+|"[^"]*"|'[^']*'/g) || [];
    const parsedArgs = rawMatches.map((arg) => {
      if ((arg.startsWith('"') && arg.endsWith('"')) || (arg.startsWith("'") && arg.endsWith("'"))) {
        return arg.slice(1, -1);
      }
      return arg;
    });
    args.push(...parsedArgs);
  }

  if (outputPath.trim()) {
    args.push('--output', outputPath.trim());
  }

  args.push(inputPath);
${posPushes}`;
  } else if (assemblyType === "sqlLast") {
    const hasOut = cmd.config.hasOutputOption !== false;
    argvAssemblyCode = `
  if (additionalArgs.trim()) {
    const rawMatches = additionalArgs.match(/[^\\s"']+|"[^"]*"|'[^']*'/g) || [];
    const parsedArgs = rawMatches.map((arg) => {
      if ((arg.startsWith('"') && arg.endsWith('"')) || (arg.startsWith("'") && arg.endsWith("'"))) {
        return arg.slice(1, -1);
      }
      return arg;
    });
    args.push(...parsedArgs);
  }

  ${hasOut ? "if (outputPath.trim()) { args.push('--output', outputPath.trim()); }" : ""}

  args.push(inputPath, sql.trim());`;
  } else if (assemblyType === "positionalOutput") {
    argvAssemblyCode = `
  if (additionalArgs.trim()) {
    const rawMatches = additionalArgs.match(/[^\\s"']+|"[^"]*"|'[^']*'/g) || [];
    const parsedArgs = rawMatches.map((arg) => {
      if ((arg.startsWith('"') && arg.endsWith('"')) || (arg.startsWith("'") && arg.endsWith("'"))) {
        return arg.slice(1, -1);
      }
      return arg;
    });
    args.push(...parsedArgs);
  }

  args.push(inputPath);

  if (outputPath.trim()) {
    args.push(outputPath.trim());
  }`;
  } else if (assemblyType === "dualInput") {
    argvAssemblyCode = `
  args.push(columns1.trim(), inputPath, columns2.trim(), input2.trim());

  if (additionalArgs.trim()) {
    const rawMatches = additionalArgs.match(/[^\\s"']+|"[^"]*"|'[^']*'/g) || [];
    const parsedArgs = rawMatches.map((arg) => {
      if ((arg.startsWith('"') && arg.endsWith('"')) || (arg.startsWith("'") && arg.endsWith("'"))) {
        return arg.slice(1, -1);
      }
      return arg;
    });
    args.push(...parsedArgs);
  }

  if (outputPath.trim()) {
    args.push('--output', outputPath.trim());
  }`;
  } else if (assemblyType === "diff") {
    argvAssemblyCode = `
  if (additionalArgs.trim()) {
    const rawMatches = additionalArgs.match(/[^\\s"']+|"[^"]*"|'[^']*'/g) || [];
    const parsedArgs = rawMatches.map((arg) => {
      if ((arg.startsWith('"') && arg.endsWith('"')) || (arg.startsWith("'") && arg.endsWith("'"))) {
        return arg.slice(1, -1);
      }
      return arg;
    });
    args.push(...parsedArgs);
  }

  if (outputPath.trim()) {
    args.push('--output', outputPath.trim());
  }

  args.push(inputPath, inputRight.trim());`;
  } else if (assemblyType === "toCustom") {
    argvAssemblyCode = `
  args.push(format.trim());
${flagProcessors.length ? flagProcessors.join("\n") + "\n" : ""}
  if (additionalArgs.trim()) {
    const rawMatches = additionalArgs.match(/[^\\s"']+|"[^"]*"|'[^']*'/g) || [];
    const parsedArgs = rawMatches.map((arg) => {
      if ((arg.startsWith('"') && arg.endsWith('"')) || (arg.startsWith("'") && arg.endsWith("'"))) {
        return arg.slice(1, -1);
      }
      return arg;
    });
    args.push(...parsedArgs);
  }

  args.push(destination.trim(), inputPath);`;
  } else if (assemblyType === "validateCustom") {
    argvAssemblyCode = `
  if (additionalArgs.trim()) {
    const rawMatches = additionalArgs.match(/[^\\s"']+|"[^"]*"|'[^']*'/g) || [];
    const parsedArgs = rawMatches.map((arg) => {
      if ((arg.startsWith('"') && arg.endsWith('"')) || (arg.startsWith("'") && arg.endsWith("'"))) {
        return arg.slice(1, -1);
      }
      return arg;
    });
    args.push(...parsedArgs);
  }

  args.push(inputPath);

  if (jsonSchema && jsonSchema.trim()) {
    args.push(jsonSchema.trim());
  }`;
  } else if (assemblyType === "splitCustom") {
    argvAssemblyCode = `
  args.push(outdir.trim());

  if (additionalArgs.trim()) {
    const rawMatches = additionalArgs.match(/[^\\s"']+|"[^"]*"|'[^']*'/g) || [];
    const parsedArgs = rawMatches.map((arg) => {
      if ((arg.startsWith('"') && arg.endsWith('"')) || (arg.startsWith("'") && arg.endsWith("'"))) {
        return arg.slice(1, -1);
      }
      return arg;
    });
    args.push(...parsedArgs);
  }

  args.push(inputPath);`;
  } else if (assemblyType === "partitionCustom") {
    argvAssemblyCode = `
  args.push(column.trim(), outdir.trim());

  if (additionalArgs.trim()) {
    const rawMatches = additionalArgs.match(/[^\\s"']+|"[^"]*"|'[^']*'/g) || [];
    const parsedArgs = rawMatches.map((arg) => {
      if ((arg.startsWith('"') && arg.endsWith('"')) || (arg.startsWith("'") && arg.endsWith("'"))) {
        return arg.slice(1, -1);
      }
      return arg;
    });
    args.push(...parsedArgs);
  }

  args.push(inputPath);`;
  }

  const featureHint = cmd.feature
    ? ` This command requires the '${cmd.feature}' Cargo feature in QSV.`
    : "";

  return `import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

export async function execute${capitalized}(
  this: IExecuteFunctions,
  itemIndex: number,
): Promise<INodeExecutionData[]> {
  const inputPath = this.getNodeParameter('inputPath', itemIndex) as string;
  if (!inputPath || !inputPath.trim()) {
    throw new NodeOperationError(
      this.getNode(),
      'Input CSV file path is required.',
      { itemIndex },
    );
  }
${posRetrievals.length ? posRetrievals.join("\n") + "\n" : ""}${requiredChecks.length ? requiredChecks.join("\n") + "\n" : ""}  const outputPath = (this.getNodeParameter('outputPath', itemIndex, '') as string) || '';
  const additionalArgs = (this.getNodeParameter('additionalArgs', itemIndex, '') as string) || '';
  const options = (this.getNodeParameter('options', itemIndex, {}) as any) || {};

  const args: string[] = ['${opName}'];
${assemblyType !== "toCustom" && flagProcessors.length ? flagProcessors.join("\n") + "\n" : ""}${argvAssemblyCode}

  const qsvBin =
    process.env.DARTFX_QSV_BIN_PATH ||
    process.env.QSV_BIN_PATH ||
    process.env.QSV_PATH ||
    'qsv';

  try {
    const { stdout, stderr } = await execFileAsync(qsvBin, args, {
      maxBuffer: 50 * 1024 * 1024,
      encoding: 'utf8',
    });
    let resultJson: any;

    try {
      resultJson = JSON.parse(stdout);
    } catch {
      resultJson = {
        command: 'qsv ${opName}',
        inputPath,
        rawOutput: stdout,
      };
    }

    const returnJson: Record<string, any> = {
      success: true,
      command: '${opName}',
      inputPath,
      result: resultJson,
    };

    if (outputPath.trim()) {
      returnJson.outputPath = outputPath.trim();
    }

    if (stderr && stderr.trim()) {
      returnJson.warnings = stderr.trim();
    }

    return [
      {
        json: returnJson,
      },
    ];
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      throw new NodeOperationError(
        this.getNode(),
        \`The QSV CLI binary ('\${qsvBin}') was not found\`,
        {
          itemIndex,
          description: \`Please ensure 'qsv' is installed and available in the system PATH where n8n is running, or specify its absolute path via the DARTFX_QSV_BIN_PATH environment variable. (Docs: https://github.com/dathere/qsv/blob/master/docs/help/${opName}.md)\`,
        },
      );
    }

    if (error.code === 'ERR_CHILD_PROCESS_STDIO_MAXBUFFER' || (error.message && error.message.includes('maxBuffer'))) {
      throw new NodeOperationError(
        this.getNode(),
        \`QSV execution exceeded maximum stdout buffer (50 MB)\`,
        {
          itemIndex,
          description: \`qsv ${opName} returned more data than could fit into memory. Specify an 'Output File Path' to stream results directly to disk instead.\`,
        },
      );
    }

    const rawError = (error.stderr || error.message || '').trim();

    if (
      rawError.includes('with any of the allowed variants') ||
      rawError.includes('Could not match') ||
      rawError.includes('is not a qsv command') ||
      rawError.includes('unrecognized subcommand') ||
      rawError.includes('not available in this')
    ) {
      throw new NodeOperationError(
        this.getNode(),
        \`Operation '${opName}' is not available in the installed QSV binary\`,
        {
          itemIndex,
          description: \`The installed QSV binary at '\${qsvBin}' does not include the '${opName}' feature.${featureHint} This feature requires a QSV build with the corresponding Cargo feature enabled (or 'all_features'). See https://github.com/dathere/qsv/blob/master/docs/help/${opName}.md and https://github.com/dathere/qsv#feature-flags\`,
        },
      );
    }

    if (rawError.includes('No such file or directory') || rawError.includes('os error 2')) {
      throw new NodeOperationError(
        this.getNode(),
        \`Input file not found: '\${inputPath}'\`,
        {
          itemIndex,
          description: \`qsv ${opName} could not find the file at '\${inputPath}'. Check for typos, or if n8n is running in Docker, ensure the host directory is mounted into the container.\`,
        },
      );
    }

    if (
      rawError.includes('Operation not permitted') ||
      rawError.includes('os error 1') ||
      rawError.includes('Permission denied') ||
      rawError.includes('os error 13')
    ) {
      throw new NodeOperationError(
        this.getNode(),
        \`Permission denied accessing file: '\${inputPath}'\`,
        {
          itemIndex,
          description: \`qsv ${opName} was denied read access to '\${inputPath}'. On macOS, check Full Disk Access or Removable Volumes permissions for the application running n8n.\`,
        },
      );
    }

    throw new NodeOperationError(
      this.getNode(),
      \`Failed executing 'qsv ${opName}': \${rawError}\`,
      { itemIndex },
    );
  }
}
`;
}

function generateMainNodeFile(
  commands: ParsedCommand[],
  qsvVersion: string,
): string {
  const importsDescriptions = commands
    .map(
      (c) =>
        `import { ${toCapitalized(c.name)}Description } from './descriptions/${toCapitalized(c.name)}Description';`,
    )
    .join("\n");

  const importsActions = commands
    .map(
      (c) =>
        `import { execute${toCapitalized(c.name)} } from './actions/execute${toCapitalized(c.name)}';`,
    )
    .join("\n");

  const operationOptions = commands
    .map((c) => {
      const capitalized = toCapitalized(c.name);
      const featureTag = c.feature ? ` [Feature: ${c.feature}]` : "";
      const label = `${capitalized} (${c.name})${featureTag}`;
      const cleanDesc = (c.description || `Execute qsv ${c.name}`)
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'")
        .replace(/\n/g, " ");
      const docUrl = `https://github.com/dathere/qsv/blob/master/docs/help/${c.name}.md`;
      return `          {
            name: '${label}',
            value: '${c.name}',
            description: '${cleanDesc} (Docs: ${docUrl})',
            action: '${capitalized}',
          },`;
    })
    .join("\n");

  const spreadDescriptions = commands
    .map((c) => `      ...${toCapitalized(c.name)}Description,`)
    .join("\n");

  const switchCases = commands
    .map(
      (c) => `          case '${c.name}':
            result = await execute${toCapitalized(c.name)}.call(this, itemIndex);
            break;`,
    )
    .join("\n");

  return `import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

${importsDescriptions}

${importsActions}

export class Qsv implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'QSV Data Wrangler',
    name: 'qsv',
    icon: 'file:qsv.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description: 'Ultra-fast tabular data wrangling, stats, and transformations via QSV (generated for QSV ${qsvVersion}; requires qsv CLI on host)',
    defaults: {
      name: 'QSV',
    },
    inputs: ['main'],
    outputs: ['main'],
    properties: [
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        options: [
${operationOptions}
        ],
        default: 'stats',
      },
${spreadDescriptions}
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      const operation = this.getNodeParameter('operation', itemIndex) as string;

      try {
        let result: INodeExecutionData[];

        switch (operation) {
${switchCases}
          default:
            throw new NodeOperationError(this.getNode(), \`Unknown operation: \${operation}\`, {
              itemIndex,
            });
        }

        returnData.push(...result);
      } catch (error: any) {
        if (this.continueOnFail()) {
          returnData.push({
            json: {
              error: error.message,
            },
            pairedItem: { item: itemIndex },
          });
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }
}
`;
}

async function main() {
  console.log("Discovering QSV commands and generating node definitions...");
  const descriptionsDir = path.join(__dirname, "../nodes/Qsv/descriptions");
  const actionsDir = path.join(__dirname, "../nodes/Qsv/actions");
  const mainNodePath = path.join(__dirname, "../nodes/Qsv/Qsv.node.ts");

  fs.mkdirSync(descriptionsDir, { recursive: true });
  fs.mkdirSync(actionsDir, { recursive: true });

  // Clean existing generated files
  for (const f of fs.readdirSync(descriptionsDir)) {
    if (f.endsWith('.ts')) fs.unlinkSync(path.join(descriptionsDir, f));
  }
  for (const f of fs.readdirSync(actionsDir)) {
    if (f.endsWith('.ts')) fs.unlinkSync(path.join(actionsDir, f));
  }

  const qsvVersion = getQsvVersion();
  console.log(`Detected target QSV version: ${qsvVersion}`);

  const commands = getAvailableCommands();
  const generatedCommands: ParsedCommand[] = [];

  for (const cmd of commands) {
    const help = getCommandHelp(cmd);
    if (!help) {
      console.warn(`⚠️ Skipped 'qsv ${cmd}' (no help output)`);
      continue;
    }

    const parsed = parseHelpText(cmd, help);
    const descContent = generateDescriptionFile(parsed);
    const actionContent = generateActionFile(parsed);

    const capitalized = toCapitalized(cmd);
    fs.writeFileSync(
      path.join(descriptionsDir, `${capitalized}Description.ts`),
      descContent,
    );
    fs.writeFileSync(
      path.join(actionsDir, `execute${capitalized}.ts`),
      actionContent,
    );

    generatedCommands.push(parsed);
    console.log(`✓ Generated definitions for 'qsv ${cmd}'`);
  }

  // Generate main Qsv.node.ts
  const mainNodeContent = generateMainNodeFile(generatedCommands, qsvVersion);
  fs.writeFileSync(mainNodePath, mainNodeContent);
  console.log(
    `✓ Updated main Qsv.node.ts with ${generatedCommands.length} operations (target QSV: ${qsvVersion})`,
  );

  console.log(
    `\nSuccessfully generated ${generatedCommands.length} command nodes!`,
  );
}

main().catch((err) => {
  console.error("Generation failed:", err);
  process.exit(1);
});
