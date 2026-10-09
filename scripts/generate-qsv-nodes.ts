import { execSync } from "child_process";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

export interface QsvArg {
  name: string;
  type: "string" | "number" | "file" | "regex";
  required: boolean;
  description: string;
  enum?: string[];
  default?: any;
}

export interface QsvOption {
  flag: string;
  shortFlag?: string;
  type: "flag" | "string" | "number";
  description: string;
  default?: any;
}

export interface QsvHints {
  memory?: "constant" | "proportional" | "full" | string;
  indexed?: boolean;
}

export interface QsvExample {
  description: string;
  command: string;
}

export interface QsvToolDefinition {
  name: string;
  version: string;
  description: string;
  category: string;
  command: {
    subcommand: string;
    args?: QsvArg[];
    options?: QsvOption[];
  };
  hints?: QsvHints;
  examples?: QsvExample[];
}

export interface ParsedCommand {
  name: string;
  subcommand: string;
  description: string;
  category: string;
  version: string;
  args: QsvArg[];
  options: QsvOption[];
  hasOutputOption: boolean;
  hints?: QsvHints;
  examples?: QsvExample[];
  feature?: string;
  helpDocUrl: string;
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
 * Converts flag or argument name to safe TypeScript camelCase identifier.
 */
function toSafePropName(flagOrArg: string): string {
  const clean = flagOrArg.replace(/^--?/, "");
  let camel = clean.replace(/-([a-z0-9])/g, (_, g) => g.toUpperCase());
  if (/^[0-9]/.test(camel)) {
    camel = `_${camel}`;
  }
  return camel;
}

function toCapitalized(cmd: string): string {
  return cmd.charAt(0).toUpperCase() + cmd.slice(1);
}

function toDisplayName(raw: string): string {
  const specialNames: Record<string, string> = {
    selection: "Selection",
    regex: "Regex",
    regexsetFile: "Regex Set File",
    sampleSize: "Sample Size",
    sql: "SQL Query",
    column: "Column",
    row: "Row Index",
    value: "New Value",
    headers: "Headers",
    pattern: "Pattern",
    replacement: "Replacement",
    separator: "Separator",
    columns1: "First File Join Columns",
    columns2: "Second File Join Columns",
    input2: "Second Input File Path",
    inputRight: "Right CSV File Path",
    destination: "Destination",
    jsonSchema: "JSON Schema Path / URL",
    outdir: "Output Directory",
    format: "Target Format",
    inputFormat: "Input Format",
    outputFormat: "Output Format",
    urlColumn: "URL Column",
    columnList: "Column List",
    mainScript: "Main Script",
    newColumns: "New Columns",
    indexFile: "Index File Path",
    onCols: "On Columns",
  };

  if (specialNames[raw]) {
    return specialNames[raw];
  }

  return raw
    .replace(/([A-Z])/g, " $1")
    .replace(/[-_]/g, " ")
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/**
 * Loads tool definitions by exporting from QSV v24 `--export-tool-definitions`
 * with fallback to `qsv <cmd> --help --format json` or legacy help text.
 */
function loadAllToolDefinitions(exportDir: string): Map<string, QsvToolDefinition> {
  const definitions = new Map<string, QsvToolDefinition>();

  try {
    fs.mkdirSync(exportDir, { recursive: true });
    console.log(`Exporting tool definitions via '${QSV_BIN} --export-tool-definitions ${exportDir}'...`);
    execSync(`${QSV_BIN} --export-tool-definitions ${exportDir}`, {
      encoding: "utf8",
      stdio: "pipe",
    });

    const toolDefsDir = path.join(exportDir, "tool-definitions");
    if (fs.existsSync(toolDefsDir)) {
      const files = fs.readdirSync(toolDefsDir).filter((f) => f.endsWith(".json"));
      for (const f of files) {
        try {
          const raw = fs.readFileSync(path.join(toolDefsDir, f), "utf8");
          const data: QsvToolDefinition = JSON.parse(raw);
          const cmd = data.command?.subcommand || data.name.replace(/^qsv-/, "");
          definitions.set(cmd, data);
        } catch (e: any) {
          console.warn(`Warning: Failed parsing ${f}: ${e.message}`);
        }
      }
      console.log(`✓ Loaded ${definitions.size} tool definitions from QSV export.`);
      return definitions;
    }
  } catch (err: any) {
    console.warn(
      `Warning: QSV '--export-tool-definitions' failed (${err.message}). Attempting per-command JSON fallback.`,
    );
  }

  return definitions;
}

/**
 * Fallback to fetch single command definition via `qsv <cmd> --help --format json`
 */
function getSingleCommandJson(cmd: string): QsvToolDefinition | null {
  try {
    const raw = execSync(`${QSV_BIN} ${cmd} --help --format json`, {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "ignore"],
    });
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Discovers available QSV commands.
 */
function getAvailableCommands(toolDefs: Map<string, QsvToolDefinition>): string[] {
  const commands: string[] = [];

  if (toolDefs.size > 0) {
    for (const cmd of toolDefs.keys()) {
      if (!EXCLUDED_COMMANDS.has(cmd) && !commands.includes(cmd)) {
        commands.push(cmd);
      }
    }
    return commands.sort();
  }

  try {
    const listOutput = execSync(`${QSV_BIN} --list`, { encoding: "utf8" });
    const lines = listOutput.split("\n");

    for (const line of lines) {
      const match = line.match(/^\s{4}([a-z0-9_-]+)\s+(.+)$/);
      if (match) {
        const cmd = match[1].trim();
        if (!EXCLUDED_COMMANDS.has(cmd) && !commands.includes(cmd)) {
          commands.push(cmd);
        }
      }
    }

    if (commands.length > 0) {
      return commands.sort();
    }
  } catch (error: any) {
    console.warn(`Warning: Could not get commands via '${QSV_BIN} --list': ${error.message}`);
  }

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

/**
 * Parses command metadata from JSON Tool Definition (or fallback text).
 */
function parseCommand(
  cmdName: string,
  toolDef?: QsvToolDefinition | null,
  qsvVersion: string = "24.0.0",
): ParsedCommand {
  if (toolDef) {
    const subcommand = toolDef.command?.subcommand || cmdName;
    const args: QsvArg[] = toolDef.command?.args || [];
    const rawOptions: QsvOption[] = toolDef.command?.options || [];

    const hasOutputOption = rawOptions.some(
      (opt) => opt.flag === "--output" || opt.flag === "-o",
    );

    // Filter out help, version, and output options from collection
    const options = rawOptions.filter(
      (opt) => !["--help", "-h", "--version", "--output", "-o"].includes(opt.flag),
    );

    return {
      name: cmdName,
      subcommand,
      description: toolDef.description || `Execute qsv ${cmdName}`,
      category: toolDef.category || "utility",
      version: toolDef.version || qsvVersion,
      args,
      options,
      hasOutputOption,
      hints: toolDef.hints,
      examples: toolDef.examples,
      feature: FEATURE_MAP[cmdName],
      helpDocUrl: `https://github.com/dathere/qsv/blob/master/docs/help/${cmdName}.md`,
    };
  }

  // Fallback for older / legacy text help
  return {
    name: cmdName,
    subcommand: cmdName,
    description: `Execute qsv ${cmdName}`,
    category: "utility",
    version: qsvVersion,
    args: [{ name: "input", type: "file", required: false, description: "Input CSV file" }],
    options: [],
    hasOutputOption: true,
    feature: FEATURE_MAP[cmdName],
    helpDocUrl: `https://github.com/dathere/qsv/blob/master/docs/help/${cmdName}.md`,
  };
}

/**
 * Normalizes argument names to match existing n8n property conventions.
 */
function normalizeArgPropName(argName: string, cmdName: string): string {
  if (argName === "input" || argName === "input1" || argName === "input-left") {
    return "inputPath";
  }
  if (argName === "input-right") {
    return "inputRight";
  }
  if (cmdName === "to" && argName === "subcommand") {
    return "format";
  }
  if (argName === "sample-size") {
    return "sampleSize";
  }
  if (argName === "json-schema") {
    return "jsonSchema";
  }
  if (argName === "regexset-file") {
    return "regexsetFile";
  }
  if (argName === "url-column") {
    return "urlColumn";
  }
  if (argName === "column-list") {
    return "columnList";
  }
  if (argName === "input-format") {
    return "inputFormat";
  }
  if (argName === "output-format") {
    return "outputFormat";
  }
  if (argName === "main-script") {
    return "mainScript";
  }
  if (argName === "new-columns") {
    return "newColumns";
  }
  if (argName === "index-file") {
    return "indexFile";
  }
  if (argName === "on-cols") {
    return "onCols";
  }
  return toSafePropName(argName);
}

/**
 * Generates the TypeScript Description file for a command.
 */
function generateDescriptionFile(cmd: ParsedCommand): string {
  const capitalized = toCapitalized(cmd.name);
  const properties: string[] = [];

  // Sort CLI options alphabetically by display name for clear UX
  const sortedOptions = [...cmd.options].sort((a, b) => {
    const flagA = a.flag.replace(/^--?/, "");
    const flagB = b.flag.replace(/^--?/, "");
    return flagA.localeCompare(flagB);
  });

  for (const opt of sortedOptions) {
    const propName = toSafePropName(opt.flag);
    const displayName = opt.flag
      .replace(/^--?/, "")
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    const cleanDesc = (opt.description || "")
      .replace(/\\/g, "\\\\")
      .replace(/'/g, "\\'")
      .replace(/\n/g, " ");

    if (opt.type === "flag") {
      properties.push(`    {
      displayName: '${displayName}',
      name: '${propName}',
      type: 'boolean',
      default: false,
      description: '${cleanDesc}',
    },`);
    } else if (opt.type === "number") {
      const defaultNum = typeof opt.default === "number" ? opt.default : 0;
      properties.push(`    {
      displayName: '${displayName}',
      name: '${propName}',
      type: 'number',
      default: ${defaultNum},
      description: '${cleanDesc}',
    },`);
    } else {
      const defaultStr = opt.default !== undefined ? `'${String(opt.default).replace(/'/g, "\\'")}'` : "''";
      properties.push(`    {
      displayName: '${displayName}',
      name: '${propName}',
      type: 'string',
      default: ${defaultStr},
      description: '${cleanDesc}',
    },`);
    }
  }

  // Generate Positional parameters
  const positionalProps: string[] = [];
  for (const arg of cmd.args) {
    const propName = normalizeArgPropName(arg.name, cmd.name);

    // Skip inputPath here as it is emitted at the top of the description
    if (propName === "inputPath") {
      continue;
    }
    // Skip positional output as it is handled by outputPath
    if (arg.name === "output") {
      continue;
    }

    const displayName = toDisplayName(propName);
    const cleanArgDesc = (arg.description || "")
      .replace(/\\/g, "\\\\")
      .replace(/'/g, "\\'")
      .replace(/\n/g, " ");

    if (arg.enum && arg.enum.length > 0) {
      const enumOptions = arg.enum
        .map((val) => `        { name: '${val}', value: '${val}' },`)
        .join("\n");
      const defaultVal = arg.default ? `'${arg.default}'` : `'${arg.enum[0]}'`;

      positionalProps.push(`  {
    displayName: '${displayName}',
    name: '${propName}',
    type: 'options',
    required: ${arg.required},
    default: ${defaultVal},
    options: [
${enumOptions}
    ],
    description: '${cleanArgDesc}',
    displayOptions: {
      show: {
        operation: ['${cmd.name}'],
      },
    },
  },`);
    } else if (arg.type === "number") {
      const defaultVal = typeof arg.default === "number" ? arg.default : (cmd.name === "sample" ? 100 : (cmd.name === "edit" ? 1 : 0));
      positionalProps.push(`  {
    displayName: '${displayName}',
    name: '${propName}',
    type: 'number',
    required: ${arg.required},
    default: ${defaultVal},
    description: '${cleanArgDesc}',
    displayOptions: {
      show: {
        operation: ['${cmd.name}'],
      },
    },
  },`);
    } else {
      let defaultVal = "''";
      if (cmd.name === "sample" && propName === "sampleSize") {
        defaultVal = "'100'";
      } else if (arg.default !== undefined) {
        defaultVal = `'${String(arg.default).replace(/'/g, "\\'")}'`;
      }

      positionalProps.push(`  {
    displayName: '${displayName}',
    name: '${propName}',
    type: 'string',
    required: ${arg.required},
    default: ${defaultVal},
    description: '${cleanArgDesc}',
    displayOptions: {
      show: {
        operation: ['${cmd.name}'],
      },
    },
  },`);
    }
  }

  // Determine if command supports outputPath
  const hasOutputOpt = cmd.hasOutputOption || cmd.args.some((a) => a.name === "output");

  const outputProps: string[] = [];
  if (hasOutputOpt) {
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

  // Add hint/example info to additionalArgs description
  const hintParts: string[] = [];
  if (cmd.hints?.memory === "full") {
    hintParts.push("⚠️ High memory operation.");
  }
  if (cmd.hints?.indexed) {
    hintParts.push("⚡ Runs faster when CSV index (.qsv.idx) is present.");
  }
  const hintText = hintParts.length > 0 ? ` [${hintParts.join(" ")}]` : "";

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
    description: 'Additional raw command line arguments to pass to qsv ${cmd.name}${hintText} (Docs: ${cmd.helpDocUrl})',
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

/**
 * Generates the TypeScript action execution file for a command.
 */
function generateActionFile(cmd: ParsedCommand): string {
  const capitalized = toCapitalized(cmd.name);
  const opName = cmd.name;

  const flagProcessors: string[] = [];
  for (const opt of cmd.options) {
    const propName = toSafePropName(opt.flag);
    const flagName = opt.flag.replace(/^--?/, "");

    if (opt.type === "flag") {
      flagProcessors.push(`  if (options.${propName} === true) {
    args.push('--${flagName}');
  }`);
    } else {
      flagProcessors.push(`  if (options.${propName} !== undefined && options.${propName} !== '') {
    args.push('--${flagName}', String(options.${propName}));
  }`);
    }
  }

  // Build positional retrievals and required checks
  const posRetrievals: string[] = [];
  const requiredChecks: string[] = [];

  for (const arg of cmd.args) {
    const propName = normalizeArgPropName(arg.name, cmd.name);
    if (propName === "inputPath" || arg.name === "output") {
      continue;
    }

    const displayName = toDisplayName(propName);
    if (arg.type === "number") {
      const defaultNum = typeof arg.default === "number" ? arg.default : (cmd.name === "sample" ? 100 : (cmd.name === "edit" ? 1 : 0));
      posRetrievals.push(
        `  const ${propName} = (this.getNodeParameter('${propName}', itemIndex, ${defaultNum}) as number) || 0;`,
      );
    } else {
      const defaultStr = arg.default !== undefined ? `'${arg.default}'` : "''";
      posRetrievals.push(
        `  const ${propName} = (this.getNodeParameter('${propName}', itemIndex, ${defaultStr}) as string) || '';`,
      );
      if (arg.required) {
        requiredChecks.push(`  if (!${propName} || !String(${propName}).trim()) {
    throw new NodeOperationError(
      this.getNode(),
      'Parameter "${displayName}" is required for ${opName}.',
      { itemIndex },
    );
  }`);
      }
    }
  }

  const hasOutputOpt = cmd.hasOutputOption;
  const hasPositionalOutput = cmd.args.some((a) => a.name === "output");

  // Build CLI arguments sequence
  const cliAssemblyLines: string[] = [];

  // Check if first arg is a subcommand
  const firstArg = cmd.args[0];
  const isFirstArgSubcommand = firstArg && (firstArg.name === "subcommand" || (cmd.name === "to" && firstArg.name === "subcommand"));

  if (isFirstArgSubcommand) {
    const subProp = normalizeArgPropName(firstArg.name, cmd.name);
    cliAssemblyLines.push(`  if (${subProp} && String(${subProp}).trim()) {`);
    cliAssemblyLines.push(`    args.push(String(${subProp}).trim());`);
    cliAssemblyLines.push(`  }`);
  }

  // Add options
  if (flagProcessors.length > 0) {
    cliAssemblyLines.push(flagProcessors.join("\n"));
  }

  // Add additionalArgs parser
  cliAssemblyLines.push(`  if (additionalArgs.trim()) {
    const rawMatches = additionalArgs.match(/[^\\s"']+|"[^"]*"|'[^']*'/g) || [];
    const parsedArgs = rawMatches.map((arg) => {
      if ((arg.startsWith('"') && arg.endsWith('"')) || (arg.startsWith("'") && arg.endsWith("'"))) {
        return arg.slice(1, -1);
      }
      return arg;
    });
    args.push(...parsedArgs);
  }`);

  // Handle output option flag if supported
  if (hasOutputOpt) {
    cliAssemblyLines.push(`  if (outputPath.trim()) {
    args.push('--output', outputPath.trim());
  }`);
  }

  // Assemble remaining positional arguments in exact sequence
  for (let i = 0; i < cmd.args.length; i++) {
    const arg = cmd.args[i];
    if (i === 0 && isFirstArgSubcommand) {
      continue;
    }

    if (arg.name === "input" || arg.name === "input1" || arg.name === "input-left") {
      cliAssemblyLines.push(`  args.push(inputPath);`);
    } else if (arg.name === "output") {
      if (hasPositionalOutput) {
        cliAssemblyLines.push(`  if (outputPath.trim()) {
    args.push(outputPath.trim());
  }`);
      }
    } else {
      const propName = normalizeArgPropName(arg.name, cmd.name);
      if (arg.required) {
        cliAssemblyLines.push(`  args.push(String(${propName}).trim());`);
      } else {
        cliAssemblyLines.push(`  if (${propName} !== undefined && String(${propName}).trim()) {
    args.push(String(${propName}).trim());
  }`);
      }
    }
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
${cliAssemblyLines.join("\n")}

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
          description: \`Please ensure 'qsv' is installed and available in the system PATH where n8n is running, or specify its absolute path via the DARTFX_QSV_BIN_PATH environment variable. (Docs: ${cmd.helpDocUrl})\`,
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
          description: \`The installed QSV binary at '\${qsvBin}' does not include the '${opName}' feature.${featureHint} This feature requires a QSV build with the corresponding Cargo feature enabled (or 'all_features'). See ${cmd.helpDocUrl} and https://github.com/dathere/qsv#feature-flags\`,
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

/**
 * Generates the main Qsv.node.ts file registering all operations.
 */
function generateMainNodeFile(commands: ParsedCommand[], qsvVersion: string): string {
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

      return `          {
            name: '${label}',
            value: '${c.name}',
            description: '${cleanDesc} (Category: ${c.category} | Docs: ${c.helpDocUrl})',
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
  console.log("Discovering QSV commands and generating node definitions using JSON Tool Definitions...");
  const descriptionsDir = path.join(__dirname, "../nodes/Qsv/descriptions");
  const actionsDir = path.join(__dirname, "../nodes/Qsv/actions");
  const mainNodePath = path.join(__dirname, "../nodes/Qsv/Qsv.node.ts");
  const tempExportDir = path.join(os.tmpdir(), `qsv_export_${Date.now()}`);

  fs.mkdirSync(descriptionsDir, { recursive: true });
  fs.mkdirSync(actionsDir, { recursive: true });

  // Clean existing generated files
  for (const f of fs.readdirSync(descriptionsDir)) {
    if (f.endsWith(".ts")) fs.unlinkSync(path.join(descriptionsDir, f));
  }
  for (const f of fs.readdirSync(actionsDir)) {
    if (f.endsWith(".ts")) fs.unlinkSync(path.join(actionsDir, f));
  }

  const qsvVersion = getQsvVersion();
  console.log(`Detected target QSV version: ${qsvVersion}`);

  // Ingest tool definitions via QSV v24 export
  const toolDefs = loadAllToolDefinitions(tempExportDir);

  const commands = getAvailableCommands(toolDefs);
  const generatedCommands: ParsedCommand[] = [];

  for (const cmd of commands) {
    let toolDef = toolDefs.get(cmd);
    if (!toolDef) {
      toolDef = getSingleCommandJson(cmd);
    }

    const parsed = parseCommand(cmd, toolDef, qsvVersion);
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
    console.log(`✓ Generated definitions for 'qsv ${cmd}' [Category: ${parsed.category}]`);
  }

  // Generate main Qsv.node.ts
  const mainNodeContent = generateMainNodeFile(generatedCommands, qsvVersion);
  fs.writeFileSync(mainNodePath, mainNodeContent);
  console.log(
    `✓ Updated main Qsv.node.ts with ${generatedCommands.length} operations (target QSV: ${qsvVersion})`,
  );

  // Cleanup temp export dir
  try {
    if (fs.existsSync(tempExportDir)) {
      fs.rmSync(tempExportDir, { recursive: true, force: true });
    }
  } catch {}

  console.log(
    `\nSuccessfully generated ${generatedCommands.length} command nodes with QSV JSON Tool Definitions!`,
  );
}

main().catch((err) => {
  console.error("Generation failed:", err);
  process.exit(1);
});
