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

/**
 * Discovers available QSV commands dynamically by running `qsv --list`.
 */
function getAvailableCommands(): string[] {
  try {
    const listOutput = execSync("qsv --list", { encoding: "utf8" });
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
        `Discovered ${commands.length} QSV commands via 'qsv --list'`,
      );
      return commands;
    }
  } catch (error: any) {
    console.warn(
      `Warning: Could not get commands via 'qsv --list': ${error.message}`,
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
    return execSync(`qsv ${cmd} --help`, { encoding: "utf8" });
  } catch (error: any) {
    console.warn(
      `Warning: Could not get help for 'qsv ${cmd}': ${error.message}`,
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
      line.trim().startsWith("Options:")
    ) {
      break;
    }
    if (
      line.trim().length > 0 &&
      !line.startsWith(" ") &&
      !line.startsWith("\t")
    ) {
      description += (description ? " " : "") + line.trim();
    }
  }

  if (!description) {
    description = `Executes the qsv ${cmdName} command.`;
  }

  // Parse flags/options
  const optionRegex =
    /^\s*(?:-([a-zA-Z0-9]),\s+)?--([a-zA-Z0-9_-]+)(?:\s+<([^>]+)>|\s+\[([^\]]+)\])?\s*(.*)$/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(optionRegex);
    if (match) {
      const shortFlag = match[1];
      const flag = match[2];
      const argName = match[3] || match[4];
      const descPart = match[5] || "";

      // Skip generic help
      if (flag === "help") continue;

      let fullDesc = descPart.trim();
      let j = i + 1;

      while (j < lines.length) {
        const nextLine = lines[j];
        const trimmed = nextLine.trim();

        // Empty line ends continuation block
        if (trimmed.length === 0) {
          break;
        }

        // If next line is a new option, stop
        if (nextLine.match(optionRegex)) {
          break;
        }

        // If next line is a section header (e.g. "Common options:", "WIDTH OPTIONS:", etc.)
        if (
          trimmed.endsWith(":") ||
          trimmed.toLowerCase().startsWith("usage:") ||
          /^[A-Z0-9\s_-]+:$/.test(trimmed)
        ) {
          break;
        }

        // Must be indented (at least 4 spaces or tab) to be part of description
        if (nextLine.startsWith("    ") || nextLine.startsWith("\t")) {
          fullDesc += (fullDesc ? " " : "") + trimmed;
          j++;
        } else {
          break;
        }
      }

      // Check default value
      const defaultMatch = fullDesc.match(/\[default:\s*([^\]]+)\]/i);
      const defaultValue = defaultMatch ? defaultMatch[1].trim() : undefined;

      // Avoid duplicates
      if (!options.some((o) => o.flag === flag)) {
        options.push({
          flag,
          shortFlag,
          hasArg: Boolean(argName),
          argName,
          description: fullDesc,
          defaultValue,
        });
      }
    }
  }

  return {
    name: cmdName,
    description,
    usage,
    options,
  };
}

function escapeJsString(str: string): string {
  return str.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\r?\n/g, " ");
}

function generateDescriptionFile(parsed: ParsedCommand): string {
  const opName = parsed.name;
  const capitalized = toCapitalized(opName);

  let propertiesCode = "";

  // Input path parameter (primary)
  propertiesCode += `
    {
      displayName: 'Input CSV File Path',
      name: 'inputPath',
      type: 'string',
      default: '',
      required: true,
      displayOptions: {
        show: {
          operation: ['${opName}'],
        },
      },
      description: 'The absolute or relative file path to the input CSV file',
    },`;

  // Output path parameter (optional if command supports output or redirection)
  propertiesCode += `
    {
      displayName: 'Output File Path',
      name: 'outputPath',
      type: 'string',
      default: '',
      displayOptions: {
        show: {
          operation: ['${opName}'],
        },
      },
      description: 'Path where the output will be saved. If empty, result may be returned in stdout/JSON.',
    },`;

  // Parse options into INodeProperties
  for (const opt of parsed.options) {
    if (opt.flag === "output") continue; // Handled by outputPath above

    const propName = toSafePropName(opt.flag);
    const displayName = opt.flag
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    const cleanDesc = escapeJsString(opt.description);
    const cleanDefault = opt.defaultValue
      ? escapeJsString(opt.defaultValue)
      : "";

    if (!opt.hasArg) {
      // Boolean flag
      propertiesCode += `
    {
      displayName: '${displayName}',
      name: '${propName}',
      type: 'boolean',
      default: false,
      displayOptions: {
        show: {
          operation: ['${opName}'],
        },
      },
      description: '${cleanDesc}',
    },`;
    } else {
      // String option
      propertiesCode += `
    {
      displayName: '${displayName}',
      name: '${propName}',
      type: 'string',
      default: '${cleanDefault}',
      displayOptions: {
        show: {
          operation: ['${opName}'],
        },
      },
      description: '${cleanDesc}',
    },`;
    }
  }

  return `import type { INodeProperties } from 'n8n-workflow';

/**
 * Property definitions for 'qsv ${opName}' operation.
 * Auto-generated by scripts/generate-qsv-nodes.ts
 */
export const ${capitalized}Description: INodeProperties[] = [${propertiesCode}
];
`;
}

function generateActionFile(parsed: ParsedCommand): string {
  const opName = parsed.name;
  const capitalized = toCapitalized(opName);

  let optionsParsingCode = "";

  for (const opt of parsed.options) {
    if (opt.flag === "output") continue;
    const propName = toSafePropName(opt.flag);

    if (!opt.hasArg) {
      optionsParsingCode += `
    try {
      const val = this.getNodeParameter('${propName}', itemIndex, false) as boolean;
      if (val) {
        args.push('--${opt.flag}');
      }
    } catch {}
`;
    } else {
      optionsParsingCode += `
    try {
      const val = this.getNodeParameter('${propName}', itemIndex, '') as string;
      if (val !== undefined && val !== '') {
        args.push('--${opt.flag}', val);
      }
    } catch {}
`;
    }
  }

  return `import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { execa } from 'execa';

/**
 * Action runner for 'qsv ${opName}'
 * Auto-generated by scripts/generate-qsv-nodes.ts
 */
export async function execute${capitalized}(
  this: IExecuteFunctions,
  itemIndex: number,
): Promise<INodeExecutionData[]> {
  const rawInputPath = this.getNodeParameter('inputPath', itemIndex, '') as string;
  const inputPath = rawInputPath ? rawInputPath.trim().replace(/^['"]|['"]$/g, '') : '';
  if (!inputPath) {
    throw new NodeOperationError(this.getNode(), 'Input CSV file path is required.', { itemIndex });
  }

  const args: string[] = ['${opName}'];

  // Collect options and flags
  ${optionsParsingCode.trim()}

  try {
    const rawOutputPath = this.getNodeParameter('outputPath', itemIndex, '') as string;
    const outputPath = rawOutputPath ? rawOutputPath.trim().replace(/^['"]|['"]$/g, '') : '';
    if (outputPath) {
      args.push('--output', outputPath);
    }
  } catch {}

  args.push(inputPath);

  try {
    const { stdout, stderr } = await execa('qsv', args);
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

    return [
      {
        json: {
          success: true,
          command: '${opName}',
          inputPath,
          result: resultJson,
        },
      },
    ];
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      throw new NodeOperationError(
        this.getNode(),
        "The 'qsv' CLI binary was not found in the system PATH. Please ensure QSV is installed on the host running n8n (e.g. 'brew install qsv' or add to Docker image). See: https://github.com/dathere/qsv",
        { itemIndex },
      );
    }
    throw new NodeOperationError(
      this.getNode(),
      \`Failed executing 'qsv ${opName}': \${error.stderr || error.message}\`,
      { itemIndex },
    );
  }
}
`;
}

function generateMainNodeFile(commands: ParsedCommand[]): string {
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
    description: 'Ultra-fast tabular data wrangling, stats, and transformations via QSV (requires qsv CLI on host)',
    defaults: {
      name: 'QSV',
    },
    inputs: ['main'],
    outputs: ['main'],
    properties: [
      {
        displayName: 'Host Requirement Notice',
        name: 'qsvHostNotice',
        type: 'notice',
        default: 'This node executes the <b>qsv</b> binary directly on the host machine. Ensure <b>qsv</b> is installed and available in the system PATH of your n8n instance.',
      },
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
  const mainNodeContent = generateMainNodeFile(generatedCommands);
  fs.writeFileSync(mainNodePath, mainNodeContent);
  console.log(
    `✓ Updated main Qsv.node.ts with ${generatedCommands.length} operations`,
  );

  console.log(
    `\nSuccessfully generated ${generatedCommands.length} command nodes!`,
  );
}

main().catch((err) => {
  console.error("Generation failed:", err);
  process.exit(1);
});
