import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

export async function executeApply(
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

  const args: string[] = ['apply'];
  if (options.newColumn !== undefined && options.newColumn !== '') {
    args.push('--new-column', String(options.newColumn));
  }
  if (options.rename !== undefined && options.rename !== '') {
    args.push('--rename', String(options.rename));
  }
  if (options.comparand !== undefined && options.comparand !== '') {
    args.push('--comparand', String(options.comparand));
  }
  if (options.replacement !== undefined && options.replacement !== '') {
    args.push('--replacement', String(options.replacement));
  }
  if (options.formatstr !== undefined && options.formatstr !== '') {
    args.push('--formatstr', String(options.formatstr));
  }
  if (options.jobs !== undefined && options.jobs !== '') {
    args.push('--jobs', String(options.jobs));
  }
  if (options.batch !== undefined && options.batch !== '') {
    args.push('--batch', String(options.batch));
  }
  if (options.baseUrl !== undefined && options.baseUrl !== '') {
    args.push('--base-url', String(options.baseUrl));
  }
  if (options.model !== undefined && options.model !== '') {
    args.push('--model', String(options.model));
  }
  if (options.apiKey !== undefined && options.apiKey !== '') {
    args.push('--api-key', String(options.apiKey));
  }
  if (options.maxTokens !== undefined && options.maxTokens !== '') {
    args.push('--max-tokens', String(options.maxTokens));
  }
  if (options.timeout !== undefined && options.timeout !== '') {
    args.push('--timeout', String(options.timeout));
  }
  if (options.addlProps !== undefined && options.addlProps !== '') {
    args.push('--addl-props', String(options.addlProps));
  }
  if (options.prompt !== undefined && options.prompt !== '') {
    args.push('--prompt', String(options.prompt));
  }
  if (options.promptFile !== undefined && options.promptFile !== '') {
    args.push('--prompt-file', String(options.promptFile));
  }
  if (options.rateLimit !== undefined && options.rateLimit !== '') {
    args.push('--rate-limit', String(options.rateLimit));
  }
  if (options.onError !== undefined && options.onError !== '') {
    args.push('--on-error', String(options.onError));
  }
  if (options.userAgent !== undefined && options.userAgent !== '') {
    args.push('--user-agent', String(options.userAgent));
  }
  if (options.cacheDir !== undefined && options.cacheDir !== '') {
    args.push('--cache-dir', String(options.cacheDir));
  }
  if (options.noCache === true) {
    args.push('--no-cache');
  }
  if (options.fresh === true) {
    args.push('--fresh');
  }
  if (options.stats === true) {
    args.push('--stats');
  }
  if (options.noHeaders === true) {
    args.push('--no-headers');
  }
  if (options.delimiter !== undefined && options.delimiter !== '') {
    args.push('--delimiter', String(options.delimiter));
  }
  if (options.progressbar === true) {
    args.push('--progressbar');
  }


  if (additionalArgs.trim()) {
    const rawMatches = additionalArgs.match(/[^\s"']+|"[^"]*"|'[^']*'/g) || [];
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
        command: 'qsv apply',
        inputPath,
        rawOutput: stdout,
      };
    }

    const returnJson: Record<string, any> = {
      success: true,
      command: 'apply',
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
        `The QSV CLI binary ('${qsvBin}') was not found`,
        {
          itemIndex,
          description: `Please ensure 'qsv' is installed and available in the system PATH where n8n is running, or specify its absolute path via the DARTFX_QSV_BIN_PATH environment variable. (Docs: https://github.com/dathere/qsv/blob/master/docs/help/apply.md)`,
        },
      );
    }

    if (error.code === 'ERR_CHILD_PROCESS_STDIO_MAXBUFFER' || (error.message && error.message.includes('maxBuffer'))) {
      throw new NodeOperationError(
        this.getNode(),
        `QSV execution exceeded maximum stdout buffer (50 MB)`,
        {
          itemIndex,
          description: `qsv apply returned more data than could fit into memory. Specify an 'Output File Path' to stream results directly to disk instead.`,
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
        `Operation 'apply' is not available in the installed QSV binary`,
        {
          itemIndex,
          description: `The installed QSV binary at '${qsvBin}' does not include the 'apply' feature. This feature requires a QSV build with the corresponding Cargo feature enabled (or 'all_features'). See https://github.com/dathere/qsv/blob/master/docs/help/apply.md and https://github.com/dathere/qsv#feature-flags`,
        },
      );
    }

    if (rawError.includes('No such file or directory') || rawError.includes('os error 2')) {
      throw new NodeOperationError(
        this.getNode(),
        `Input file not found: '${inputPath}'`,
        {
          itemIndex,
          description: `qsv apply could not find the file at '${inputPath}'. Check for typos, or if n8n is running in Docker, ensure the host directory is mounted into the container.`,
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
        `Permission denied accessing file: '${inputPath}'`,
        {
          itemIndex,
          description: `qsv apply was denied read access to '${inputPath}'. On macOS, check Full Disk Access or Removable Volumes permissions for the application running n8n.`,
        },
      );
    }

    throw new NodeOperationError(
      this.getNode(),
      `Failed executing 'qsv apply': ${rawError}`,
      { itemIndex },
    );
  }
}
