import type { INodeProperties } from 'n8n-workflow';

export const SniffDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['sniff'],
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
        operation: ['sniff'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv sniff (Docs: https://github.com/dathere/qsv/blob/master/docs/help/sniff.md)',
    displayOptions: {
      show: {
        operation: ['sniff'],
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
        operation: ['sniff'],
      },
    },
    options: [
    {
      displayName: 'Delimiter',
      name: 'delimiter',
      type: 'string',
      default: '',
      description: 'The delimiter for reading CSV data. Specify this when the delimiter is known beforehand, as the delimiter inferencing algorithm can sometimes fail. Must be a single ascii character.',
    },
    {
      displayName: 'Harvest Mode',
      name: 'harvestMode',
      type: 'boolean',
      default: false,
      description: 'This is a convenience flag when using sniff in CKAN harvesters. It is equivalent to --quick --timeout 10 --stats-types --json and --user-agent "CKAN-harvest/$QSV_VERSION ($QSV_TARGET; $QSV_BIN_NAME)"',
    },
    {
      displayName: 'Json',
      name: 'json',
      type: 'boolean',
      default: false,
      description: 'Return results in JSON format.',
    },
    {
      displayName: 'Just Mime',
      name: 'justMime',
      type: 'boolean',
      default: false,
      description: 'Only return the file\'s mime type. Use this to use sniff as a general mime type detector. Synonym for --no-infer.',
    },
    {
      displayName: 'No Infer',
      name: 'noInfer',
      type: 'boolean',
      default: false,
      description: 'Do not infer the schema. Only return the file\'s mime type, size and last modified date. Use this to use sniff as a general mime type detector. Note that CSV and TSV files will only be detected as mime type plain/text in this mode.',
    },
    {
      displayName: 'Prefer Dmy',
      name: 'preferDmy',
      type: 'boolean',
      default: false,
      description: 'Prefer to parse dates in dmy format. Otherwise, use mdy format. Ignored when --no-infer is enabled.',
    },
    {
      displayName: 'Pretty Json',
      name: 'prettyJson',
      type: 'boolean',
      default: false,
      description: 'Return results in pretty JSON format.',
    },
    {
      displayName: 'Progressbar',
      name: 'progressbar',
      type: 'boolean',
      default: false,
      description: 'Show progress bars. Only valid for URL input.',
    },
    {
      displayName: 'Quick',
      name: 'quick',
      type: 'boolean',
      default: false,
      description: 'When sniffing a non-CSV remote file, only download the first chunk of the file before attempting to detect the mime type. This is faster but less accurate as some mime types cannot be detected with just the first downloaded chunk.',
    },
    {
      displayName: 'Quote',
      name: 'quote',
      type: 'string',
      default: '',
      description: 'The quote character for reading CSV data. Specify this when the quote character is known beforehand, as the quote char inferencing algorithm can sometimes fail. Must be a single ascii character - typically, double quote ("), single quote (\'), or backtick (`).',
    },
    {
      displayName: 'Sample',
      name: 'sample',
      type: 'string',
      default: '',
      description: 'First n rows to sample to sniff out the metadata. When sample size is between 0 and 1 exclusive, it is treated as a percentage of the CSV to sample (e.g. 0.20 is 20 percent). When it is zero, the entire file will be sampled. When the input is a URL, the sample size dictates how many lines to sample without having to download the entire file. Ignored when --no-infer is enabled. When sniffing a local file that has a CSV index, the sample budget is instead drawn as a DISTRIBUTED sample (the first & last 5 rows, 5 rows each around the 25th, 50th & 75th percentiles, and the rest random across the whole file) rather than just the first n rows. This improves type/date inference for values that only appear late in the file. Run `qsv index` to create an index. [default: 1000]',
    },
    {
      displayName: 'Save Urlsample',
      name: 'saveUrlsample',
      type: 'string',
      default: '',
      description: 'Save the URL sample to a file. Valid only when input is a URL.',
    },
    {
      displayName: 'Stats Types',
      name: 'statsTypes',
      type: 'boolean',
      default: false,
      description: 'Use the same data type names as `stats`. (Unsigned, Signed => Integer, Text => String, everything else the same)',
    },
    {
      displayName: 'Timeout',
      name: 'timeout',
      type: 'string',
      default: '',
      description: 'Timeout when sniffing URLs in seconds. If 0, no timeout is used. [default: 30]',
    },
    {
      displayName: 'User Agent',
      name: 'userAgent',
      type: 'string',
      default: '',
      description: 'Specify custom user agent to use when sniffing a CSV on a URL. It supports the following variables - $QSV_VERSION, $QSV_TARGET, $QSV_BIN_NAME, $QSV_KIND and $QSV_COMMAND. Try to follow the syntax here - https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent',
    },
    ],
  },
];
