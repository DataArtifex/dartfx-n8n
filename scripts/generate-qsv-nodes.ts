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

interface ParsedCommand {
  name: string;
  description: string;
  usage: string;
  options: CliOption[];
}

const QSV_BIN =
  process.env.DARTFX_QSV_BIN_PATH ||
  process.env.QSV_BIN_PATH ||
  process.env.QSV_PATH ||
  "qsv";

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
        // Skip 'help' command itself
        if (cmd !== "help" && !commands.includes(cmd)) {
          commands.push(cmd);
        }
      }
    }

    if (commands.length > 0) {
      console.log(
        `Discovered ${commands.length} QSV commands via '${QSV_BIN} --list'`,
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
  let description = "";
  let usage = "";

  // Extract usage
  const usageIdx = lines.findIndex((l) => l.toLowerCase().startsWith("usage:"));
  if (usageIdx !== -1) {
    usage = lines[usageIdx].replace(/^usage:\s*/i, "").trim();
    if (lines[usageIdx + 1] && lines[usageIdx + 1].startsWith("  ")) {
      usage += " " + lines[usageIdx + 1].trim();
    }
  }

  // Extract description (first non-empty lines before usage or options)
  for (const line of lines) {
    if (
      line.trim().startsWith("Usage:") ||
      line.trim().startsWith("Common options:") ||
      line.trim().startsWith("options:") ||
      line.trim().endsWith("options:")
    ) {
      break;
    }
    if (line.trim().length > 0 && !line.toLowerCase().startsWith("qsv")) {
      description += (description ? " " : "") + line.trim();
    }
  }

  // Extract options
  let inOptions = false;
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
        const shortFlag = optMatch[1];
        const flag = optMatch[2];
        const argType = optMatch[3];
        let desc = optMatch[4] ? optMatch[4].trim() : "";

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

        options.push({
          flag,
          shortFlag,
          hasArg: !!argType,
          argName: argType ? argType.replace(/[<>\[\]]/g, "") : undefined,
          description: desc,
          defaultValue,
        });
      }
    }
  }

  return {
    name: cmdName,
    description: description || `Execute qsv ${cmdName}`,
    usage,
    options,
  };
}

function generateDescriptionFile(cmd: ParsedCommand): string {
  const capitalized = toCapitalized(cmd.name);
  const properties: string[] = [];

  for (const opt of cmd.options) {
    const propName = toSafePropName(opt.flag);
    const displayName = opt.flag
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    const cleanDesc = (opt.description || "")
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

      // Infer numbers if defaultValue is numeric
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
  {
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
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv ${cmd.name}',
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
  const outputPath = (this.getNodeParameter('outputPath', itemIndex, '') as string) || '';
  const additionalArgs = (this.getNodeParameter('additionalArgs', itemIndex, '') as string) || '';
  const options = (this.getNodeParameter('options', itemIndex, {}) as any) || {};

  const args: string[] = ['${opName}'];

${flagProcessors.join("\n")}

  if (additionalArgs.trim()) {
    const rawMatches = additionalArgs.match(/[^\\s"']+|"[^"]*"|'[^']*'/g) || [];
    const parsedArgs = rawMatches.map((arg) => {
      if (
        (arg.startsWith('"') && arg.endsWith('"')) ||
        (arg.startsWith("'") && arg.endsWith("'"))
      ) {
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
          description: \`Please ensure 'qsv' is installed and available in the system PATH where n8n is running, or specify its absolute path via the DARTFX_QSV_BIN_PATH environment variable. (https://github.com/dathere/qsv)\`,
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
      rawError.includes('is not a qsv command') ||
      rawError.includes('unrecognized subcommand') ||
      rawError.includes('not available in this')
    ) {
      throw new NodeOperationError(
        this.getNode(),
        \`Operation '${opName}' is not available in the installed QSV binary\`,
        {
          itemIndex,
          description: \`The installed QSV binary at '\${qsvBin}' does not include the '${opName}' feature. This feature may require a full feature build of QSV (e.g. qsv with all_features or a prebuilt binary with feature flags enabled). See https://github.com/dathere/qsv#feature-flags\`,
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
      const cleanDesc = (c.description || `Execute qsv ${c.name}`)
        .replace(/'/g, "\\'")
        .replace(/\n/g, " ")
        .slice(0, 120);
      return `          {
            name: '${capitalized} (${c.name})',
            value: '${c.name}',
            description: '${cleanDesc}',
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
