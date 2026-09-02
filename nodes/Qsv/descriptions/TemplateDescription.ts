import type { INodeProperties } from 'n8n-workflow';

export const TemplateDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['template'],
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
        operation: ['template'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv template (Docs: https://github.com/dathere/qsv/blob/master/docs/help/template.md)',
    displayOptions: {
      show: {
        operation: ['template'],
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
        operation: ['template'],
      },
    },
    options: [
    {
      displayName: 'Batch',
      name: 'batch',
      type: 'string',
      default: '',
      description: 'The number of rows per batch to load into memory, before running in parallel. Set to 0 to load all rows in one batch. [default: 50000]',
    },
    {
      displayName: 'Cache Dir',
      name: 'cacheDir',
      type: 'string',
      default: '',
      description: 'The directory to use for caching downloaded lookup resources. If the directory does not exist, qsv will attempt to create it. If the QSV_CACHE_DIR envvar is set, it will be used instead. [default: ~/.qsv-cache]',
    },
    {
      displayName: 'Ckan Api',
      name: 'ckanApi',
      type: 'string',
      default: '',
      description: 'The URL of the CKAN API to use for downloading lookup resources with the "ckan://" scheme. If the QSV_CKAN_API envvar is set, it will be used instead. [default: https://data.dathere.com/api/3/action]',
    },
    {
      displayName: 'Ckan Token',
      name: 'ckanToken',
      type: 'string',
      default: '',
      description: 'The CKAN API token to use. Only required if downloading private resources. If the QSV_CKAN_TOKEN envvar is set, it will be used instead.',
    },
    {
      displayName: 'Customfilter Error',
      name: 'customfilterError',
      type: 'string',
      default: '',
      description: 'The value to return when a custom filter returns an error. Use "<empty string>" to return an empty string. [default: <FILTER_ERROR>]',
    },
    {
      displayName: 'Delimiter',
      name: 'delimiter',
      type: 'string',
      default: ',',
      description: 'Field separator for reading CSV [default: ,]',
    },
    {
      displayName: 'Globals Json',
      name: 'globalsJson',
      type: 'string',
      default: '',
      description: 'A JSON file containing global variables to make available in templates. The JSON properties can be accessed in templates using the "qsv_g" namespace (e.g. {{qsv_g.school_name}}, {{qsv_g.year}}). This allows sharing common values across all template renders.',
    },
    {
      displayName: 'Jobs',
      name: 'jobs',
      type: 'string',
      default: '',
      description: 'The number of jobs to run in parallel. When not set, the number of jobs is set to the number of CPUs detected.',
    },
    {
      displayName: 'No Headers',
      name: 'noHeaders',
      type: 'boolean',
      default: false,
      description: 'When set, the first row will not be interpreted as headers. Templates must use numeric 1-based indices with the "_c" prefix. (e.g. col1: {{_c1}} col2: {{_c2}})',
    },
    {
      displayName: 'Outfilename',
      name: 'outfilename',
      type: 'string',
      default: '',
      description: 'MiniJinja template string to use to create the filename of the output files to write to <outdir>. If set to just QSV_ROWNO, the filestem is set to the current rowno of the record, padded with leading zeroes, with the ".txt" extension (e.g. 001.txt, 002.txt, etc.) Note that all the fields, including QSV_ROWNO, are available when defining the filename template. [default: QSV_ROWNO]',
    },
    {
      displayName: 'Outsubdir Size',
      name: 'outsubdirSize',
      type: 'string',
      default: '',
      description: 'The number of files per subdirectory in <outdir>. [default: 1000]',
    },
    {
      displayName: 'Progressbar',
      name: 'progressbar',
      type: 'boolean',
      default: false,
      description: 'Show progress bars. Not valid for stdin.',
    },
    {
      displayName: 'Template',
      name: 'template',
      type: 'string',
      default: '',
      description: 'MiniJinja template string to use (alternative to --template-file)',
    },
    {
      displayName: 'Template File',
      name: 'templateFile',
      type: 'string',
      default: '',
      description: 'MiniJinja template file to use',
    },
    {
      displayName: 'Timeout',
      name: 'timeout',
      type: 'number',
      default: 30,
      description: 'Timeout for downloading lookups on URLs. [default: 30]',
    },
    ],
  },
];
