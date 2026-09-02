import type { INodeProperties } from 'n8n-workflow';

export const GetDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['get'],
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
        operation: ['get'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv get (Docs: https://github.com/dathere/qsv/blob/master/docs/help/get.md)',
    displayOptions: {
      show: {
        operation: ['get'],
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
        operation: ['get'],
      },
    },
    options: [
    {
      displayName: 'Cache Dir',
      name: 'cacheDir',
      type: 'string',
      default: '',
      description: 'The qsv cache directory. Overrides the QSV_CACHE_DIR env var. [default: ~/.qsv-cache]',
    },
    {
      displayName: 'Ckan Api',
      name: 'ckanApi',
      type: 'string',
      default: '',
      description: 'CKAN Action API base URL. Overrides the QSV_CKAN_API env var. [default: https://data.dathere.com/api/3/action]',
    },
    {
      displayName: 'Ckan Token',
      name: 'ckanToken',
      type: 'string',
      default: '',
      description: 'CKAN API token. Overrides the QSV_CKAN_TOKEN env var.',
    },
    {
      displayName: 'Cloud Opt',
      name: 'cloudOpt',
      type: 'string',
      default: '',
      description: 'Extra cloud object-store config as a `key=value` pair (repeatable), e.g. region=us-east-1 or skip_signature=true. Overrides the AWS_*/AZURE_*/GOOGLE_* environment. (get_cloud only)',
    },
    {
      displayName: 'Compress',
      name: 'compress',
      type: 'string',
      default: '',
      description: 'Transparent blob compression: zstd or none. [default: zstd]',
    },
    {
      displayName: 'Force',
      name: 'force',
      type: 'boolean',
      default: false,
      description: 'Re-fetch even if a fresh cached copy exists.',
    },
    {
      displayName: 'Json',
      name: 'json',
      type: 'boolean',
      default: false,
      description: 'For cache-list/cache-info: output JSON instead of a table.',
    },
    {
      displayName: 'Name',
      name: 'name',
      type: 'string',
      default: '',
      description: 'Logical cache name (the `dc:` handle) for the fetched entry. Defaults to the source\'s terminal path segment. Ignored when multiple sources are given.',
    },
    {
      displayName: 'Offset',
      name: 'offset',
      type: 'string',
      default: '',
      description: 'PREVIEW: skip ~<mb> megabytes (via an HTTP Range request) before sampling, realigning to the next record boundary. Implies --sample. Requires a Range-capable source.',
    },
    {
      displayName: 'Older Than',
      name: 'olderThan',
      type: 'string',
      default: '',
      description: 'For cache-prune: remove entries older than this age. Accepts seconds, or a value with an s/m/h/d/w suffix (e.g. 3600, 90m, 30d, 2w).',
    },
    {
      displayName: 'Quiet',
      name: 'quiet',
      type: 'boolean',
      default: false,
      description: 'Do not print progress/summary messages to stderr.',
    },
    {
      displayName: 'Random',
      name: 'random',
      type: 'boolean',
      default: false,
      description: 'PREVIEW: random (reservoir) sampling. Streams the full source and parses it from the start, so quoted multi-line records stay intact. Slower than --sample (which only reads the head); use it when you need a uniform sample.',
    },
    {
      displayName: 'Refresh',
      name: 'refresh',
      type: 'string',
      default: '',
      description: 'Revalidation policy for `dc:` use: on-stale, always or never. A `dc:` input re-fetches only past TTL; `always` does not change that - it only makes that fetch unconditional, skipping If-None-Match/If-Modified-Since revalidation. Also the value applied by cache-set-policy. [default: on-stale]',
    },
    {
      displayName: 'Sample',
      name: 'sample',
      type: 'string',
      default: '',
      description: 'PREVIEW: stream the first N data records of <source> to stdout (or the --output file) WITHOUT caching. No `dc:` entry is created. The sniffed header row is re-attached. Single <source> only.',
    },
    {
      displayName: 'Timeout',
      name: 'timeout',
      type: 'string',
      default: '',
      description: 'HTTP timeout in seconds. For cache downloads this is an INACTIVITY timeout: the transfer aborts only if no data is received from the server for this long, so a slow-but-steady download is NOT cut off. Preview mode (--sample / --offset / --random) instead uses it as a total-request timeout. 0 = no timeout. [default: 60]',
    },
    {
      displayName: 'Ttl',
      name: 'ttl',
      type: 'string',
      default: '',
      description: 'Per-entry time-to-live in seconds. -1 = never expire. Also the value applied by cache-set-ttl. [default: 2419200]',
    },
    {
      displayName: 'Verify',
      name: 'verify',
      type: 'boolean',
      default: false,
      description: 'For cache-list: recompute each cached blob\'s BLAKE3 and report OK/FAIL per name (exits non-zero on any failure).',
    },
    ],
  },
];
