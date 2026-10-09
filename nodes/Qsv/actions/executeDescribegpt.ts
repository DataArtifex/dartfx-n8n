import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

export async function executeDescribegpt(
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

  const args: string[] = ['describegpt'];
  if (options.addlCols === true) {
    args.push('--addl-cols');
  }
  if (options.addlColsList !== undefined && options.addlColsList !== '') {
    args.push('--addl-cols-list', String(options.addlColsList));
  }
  if (options.all === true) {
    args.push('--all');
  }
  if (options.allowExtraCols === true) {
    args.push('--allow-extra-cols');
  }
  if (options.contextFile !== undefined && options.contextFile !== '') {
    args.push('--context-file', String(options.contextFile));
  }
  if (options.description === true) {
    args.push('--description');
  }
  if (options.dictionary === true) {
    args.push('--dictionary');
  }
  if (options.diskCacheDir !== undefined && options.diskCacheDir !== '') {
    args.push('--disk-cache-dir', String(options.diskCacheDir));
  }
  if (options.dsLicense !== undefined && options.dsLicense !== '') {
    args.push('--ds-license', String(options.dsLicense));
  }
  if (options.dsSource !== undefined && options.dsSource !== '') {
    args.push('--ds-source', String(options.dsSource));
  }
  if (options.dsUpdated !== undefined && options.dsUpdated !== '') {
    args.push('--ds-updated', String(options.dsUpdated));
  }
  if (options.enumThreshold !== undefined && options.enumThreshold !== '') {
    args.push('--enum-threshold', String(options.enumThreshold));
  }
  if (options.flushCache === true) {
    args.push('--flush-cache');
  }
  if (options.forget === true) {
    args.push('--forget');
  }
  if (options.format !== undefined && options.format !== '') {
    args.push('--format', String(options.format));
  }
  if (options.freqOptions !== undefined && options.freqOptions !== '') {
    args.push('--freq-options', String(options.freqOptions));
  }
  if (options.fresh === true) {
    args.push('--fresh');
  }
  if (options.inferContentType === true) {
    args.push('--infer-content-type');
  }
  if (options.inferNullValues === true) {
    args.push('--infer-null-values');
  }
  if (options.language !== undefined && options.language !== '') {
    args.push('--language', String(options.language));
  }
  if (options.markdownTemplate !== undefined && options.markdownTemplate !== '') {
    args.push('--markdown-template', String(options.markdownTemplate));
  }
  if (options.noCache === true) {
    args.push('--no-cache');
  }
  if (options.noScoreSql === true) {
    args.push('--no-score-sql');
  }
  if (options.numExamples !== undefined && options.numExamples !== '') {
    args.push('--num-examples', String(options.numExamples));
  }
  if (options.numTags !== undefined && options.numTags !== '') {
    args.push('--num-tags', String(options.numTags));
  }
  if (options.okfType !== undefined && options.okfType !== '') {
    args.push('--okf-type', String(options.okfType));
  }
  if (options.scoreMaxRetries !== undefined && options.scoreMaxRetries !== '') {
    args.push('--score-max-retries', String(options.scoreMaxRetries));
  }
  if (options.scoreThreshold !== undefined && options.scoreThreshold !== '') {
    args.push('--score-threshold', String(options.scoreThreshold));
  }
  if (options.statsOptions !== undefined && options.statsOptions !== '') {
    args.push('--stats-options', String(options.statsOptions));
  }
  if (options.strictDates === true) {
    args.push('--strict-dates');
  }
  if (options.tagVocab !== undefined && options.tagVocab !== '') {
    args.push('--tag-vocab', String(options.tagVocab));
  }
  if (options.tags === true) {
    args.push('--tags');
  }
  if (options.tourAudience !== undefined && options.tourAudience !== '') {
    args.push('--tour-audience', String(options.tourAudience));
  }
  if (options.truncateStr !== undefined && options.truncateStr !== '') {
    args.push('--truncate-str', String(options.truncateStr));
  }
  if (options.twoPass === true) {
    args.push('--two-pass');
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
        command: 'qsv describegpt',
        inputPath,
        rawOutput: stdout,
      };
    }

    const returnJson: Record<string, any> = {
      success: true,
      command: 'describegpt',
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
          description: `Please ensure 'qsv' is installed and available in the system PATH where n8n is running, or specify its absolute path via the DARTFX_QSV_BIN_PATH environment variable. (Docs: https://github.com/dathere/qsv/blob/master/docs/help/describegpt.md)`,
        },
      );
    }

    if (error.code === 'ERR_CHILD_PROCESS_STDIO_MAXBUFFER' || (error.message && error.message.includes('maxBuffer'))) {
      throw new NodeOperationError(
        this.getNode(),
        `QSV execution exceeded maximum stdout buffer (50 MB)`,
        {
          itemIndex,
          description: `qsv describegpt returned more data than could fit into memory. Specify an 'Output File Path' to stream results directly to disk instead.`,
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
        `Operation 'describegpt' is not available in the installed QSV binary`,
        {
          itemIndex,
          description: `The installed QSV binary at '${qsvBin}' does not include the 'describegpt' feature. This command requires the 'feature-gated' Cargo feature in QSV. This feature requires a QSV build with the corresponding Cargo feature enabled (or 'all_features'). See https://github.com/dathere/qsv/blob/master/docs/help/describegpt.md and https://github.com/dathere/qsv#feature-flags`,
        },
      );
    }

    if (rawError.includes('No such file or directory') || rawError.includes('os error 2')) {
      throw new NodeOperationError(
        this.getNode(),
        `Input file not found: '${inputPath}'`,
        {
          itemIndex,
          description: `qsv describegpt could not find the file at '${inputPath}'. Check for typos, or if n8n is running in Docker, ensure the host directory is mounted into the container.`,
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
          description: `qsv describegpt was denied read access to '${inputPath}'. On macOS, check Full Disk Access or Removable Volumes permissions for the application running n8n.`,
        },
      );
    }

    throw new NodeOperationError(
      this.getNode(),
      `Failed executing 'qsv describegpt': ${rawError}`,
      { itemIndex },
    );
  }
}
