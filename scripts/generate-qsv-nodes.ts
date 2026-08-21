import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

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
 * List of target QSV commands to generate wrapper nodes for.
 */
const TARGET_COMMANDS = [
  'index',
  'stats',
  'frequency',
  'schema',
  'count',
  'sniff',
  'sample',
  'select',
  'slice',
  'sort',
  'search',
  'validate',
  'to',
];

function getCommandHelp(cmd: string): string {
  try {
    return execSync(`qsv ${cmd} --help`, { encoding: 'utf8' });
  } catch (error: any) {
    console.warn(`Warning: Could not get help for 'qsv ${cmd}': ${error.message}`);
    return '';
  }
}

function parseHelpText(cmdName: string, helpText: string): ParsedCommand {
  const lines = helpText.split('\n');
  const options: CliOption[] = [];
  let description = '';
  let usage = '';

  // Extract usage
  const usageIdx = lines.findIndex(l => l.toLowerCase().startsWith('usage:'));
  if (usageIdx !== -1) {
    usage = lines[usageIdx].replace(/^usage:\s*/i, '').trim();
    if (lines[usageIdx + 1] && lines[usageIdx + 1].startsWith('  ')) {
      usage += ' ' + lines[usageIdx + 1].trim();
    }
  }

  // Extract description (first non-empty lines before usage or options)
  for (const line of lines) {
    if (line.trim().startsWith('Usage:') || line.trim().startsWith('Common options:')) {
      break;
    }
    if (line.trim().length > 0 && !line.startsWith(' ') && !line.startsWith('\t')) {
      description += (description ? ' ' : '') + line.trim();
    }
  }

  if (!description) {
    description = `Executes the qsv ${cmdName} command.`;
  }

  // Parse flags/options
  // Regex looks for patterns like:
  // -f, --flag <arg>   Description text
  // --long-flag        Description text
  const optionRegex = /^\s*(?:-([a-zA-Z]),\s+)?--([a-zA-Z0-9_-]+)(?:\s+<([^>]+)>)?\s+(.*)$/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(optionRegex);
    if (match) {
      const shortFlag = match[1];
      const flag = match[2];
      const argName = match[3];
      const descPart = match[4] || '';

      // Skip generic help
      if (flag === 'help') continue;

      let fullDesc = descPart.trim();
      // Collect continuation lines
      let j = i + 1;
      while (j < lines.length && lines[j].startsWith('                              ')) {
        fullDesc += ' ' + lines[j].trim();
        j++;
      }

      // Check default value
      const defaultMatch = fullDesc.match(/\[default:\s*([^\]]+)\]/i);
      const defaultValue = defaultMatch ? defaultMatch[1].trim() : undefined;

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

  return {
    name: cmdName,
    description,
    usage,
    options,
  };
}

function generateDescriptionFile(parsed: ParsedCommand): string {
  const opName = parsed.name;
  const capitalized = opName.charAt(0).toUpperCase() + opName.slice(1);

  let propertiesCode = '';

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

  // Output path parameter (optional / command specific)
  if (['stats', 'frequency', 'schema', 'select', 'slice', 'sort', 'sample', 'to'].includes(opName)) {
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
      description: 'Path where the output will be saved. If empty, result may be returned as JSON/stdout.',
    },`;
  }

  // Parse options into INodeProperties
  for (const opt of parsed.options) {
    const propName = opt.flag.replace(/-([a-z])/g, (_, g) => g.toUpperCase());
    const displayName = opt.flag
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    const cleanDesc = opt.description.replace(/'/g, "\\'").replace(/\n/g, ' ');

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
      // String or number option
      propertiesCode += `
    {
      displayName: '${displayName}',
      name: '${propName}',
      type: 'string',
      default: '${opt.defaultValue || ''}',
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
  const capitalized = opName.charAt(0).toUpperCase() + opName.slice(1);

  return `import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { execa } from 'execa';

/**
 * Action runner for 'qsv ${opName}'
 */
export async function execute${capitalized}(
  this: IExecuteFunctions,
  itemIndex: number,
): Promise<INodeExecutionData[]> {
  const inputPath = this.getNodeParameter('inputPath', itemIndex, '') as string;
  if (!inputPath) {
    throw new NodeOperationError(this.getNode(), 'Input CSV file path is required.', { itemIndex });
  }

  const args: string[] = ['${opName}'];

  // Collect flags and parameters
  try {
    const outputPath = this.getNodeParameter('outputPath', itemIndex, '') as string;
    if (outputPath) {
      args.push('-o', outputPath);
    }
  } catch {
    // outputPath not applicable for this command
  }

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
    throw new NodeOperationError(
      this.getNode(),
      \`Failed executing 'qsv ${opName}': \${error.stderr || error.message}\`,
      { itemIndex },
    );
  }
}
`;
}

async function main() {
  console.log('Generating QSV node definitions from CLI help...');
  const descriptionsDir = path.join(__dirname, '../nodes/Qsv/descriptions');
  const actionsDir = path.join(__dirname, '../nodes/Qsv/actions');

  fs.mkdirSync(descriptionsDir, { recursive: true });
  fs.mkdirSync(actionsDir, { recursive: true });

  const generatedCommands: string[] = [];

  for (const cmd of TARGET_COMMANDS) {
    const help = getCommandHelp(cmd);
    if (!help) continue;

    const parsed = parseHelpText(cmd, help);
    const descContent = generateDescriptionFile(parsed);
    const actionContent = generateActionFile(parsed);

    const capitalized = cmd.charAt(0).toUpperCase() + cmd.slice(1);
    fs.writeFileSync(path.join(descriptionsDir, `${capitalized}Description.ts`), descContent);
    fs.writeFileSync(path.join(actionsDir, `execute${capitalized}.ts`), actionContent);

    generatedCommands.push(cmd);
    console.log(`✓ Generated definitions for 'qsv ${cmd}'`);
  }

  console.log(`\nSuccessfully generated ${generatedCommands.length} command nodes!`);
}

main().catch(err => {
  console.error('Generation failed:', err);
  process.exit(1);
});
