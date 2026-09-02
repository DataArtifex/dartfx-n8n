import type { INodeProperties } from 'n8n-workflow';

export const ExtdedupDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['extdedup'],
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
        operation: ['extdedup'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv extdedup (Docs: https://github.com/dathere/qsv/blob/master/docs/help/extdedup.md)',
    displayOptions: {
      show: {
        operation: ['extdedup'],
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
        operation: ['extdedup'],
      },
    },
    options: [
    {
      displayName: 'Delimiter',
      name: 'delimiter',
      type: 'string',
      default: '',
      description: 'The field delimiter for reading CSV data. Must be a single character. (default: ,)',
    },
    {
      displayName: 'Dupes Output',
      name: 'dupesOutput',
      type: 'string',
      default: '',
      description: 'Write duplicates to <file>. In CSV MODE, <file> is a valid CSV with the same columns as the input plus a leading "dupe_rowno" column (1-based data row number). In LINE MODE, <file> is NOT a valid CSV — each duplicate line is prefixed by its 0-based file line index and a tab character.',
    },
    {
      displayName: 'Human Readable',
      name: 'humanReadable',
      type: 'boolean',
      default: false,
      description: 'Comma separate duplicate count.',
    },
    {
      displayName: 'Memory Limit',
      name: 'memoryLimit',
      type: 'string',
      default: '',
      description: 'How much memory to use before deduping switches to a temporary file on disk (see --temp-dir). If less than 50, this is a percentage of total memory. If more than 50, this is the memory in MB to allocate, capped at 90 percent of total memory. Defaults to 100 MB. Raising this mostly just uses more memory, as deduping on disk needs far less memory per row.',
    },
    {
      displayName: 'No Headers',
      name: 'noHeaders',
      type: 'boolean',
      default: false,
      description: 'When set, the first row will not be interpreted as headers. That is, it will be deduped with the rest of the rows. Otherwise, the first row will always appear as the header row in the output.',
    },
    {
      displayName: 'No Output',
      name: 'noOutput',
      type: 'boolean',
      default: false,
      description: 'Do not write deduplicated output to <output>. Use this if you only want to know the duplicate count. Applies to both CSV MODE and LINE MODE.',
    },
    {
      displayName: 'Quiet',
      name: 'quiet',
      type: 'boolean',
      default: false,
      description: 'Do not print duplicate count to stderr.',
    },
    {
      displayName: 'Select',
      name: 'select',
      type: 'string',
      default: '',
      description: 'Select a subset of columns to dedup. Note that the outputs will remain at the full width of the CSV. If --select is NOT set, extdedup will work in LINE MODE, deduping the input as a text file on a line-by-line basis.',
    },
    {
      displayName: 'Temp Dir',
      name: 'tempDir',
      type: 'string',
      default: '',
      description: 'Directory to store temporary hash table file. If not specified, defaults to operating system temp directory. CSV MODE ONLY:',
    },
    ],
  },
];
