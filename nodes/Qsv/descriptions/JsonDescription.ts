import type { INodeProperties } from 'n8n-workflow';

export const JsonDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['json'],
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
        operation: ['json'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv json (Docs: https://github.com/dathere/qsv/blob/master/docs/help/json.md)',
    displayOptions: {
      show: {
        operation: ['json'],
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
        operation: ['json'],
      },
    },
    options: [
    {
      displayName: 'Jaq',
      name: 'jaq',
      type: 'string',
      default: '',
      description: 'Filter JSON data using jaq syntax (https://github.com/01mf02/jaq), which is identical to the popular JSON command-line tool - jq. https://jqlang.github.io/jq/ Note that the filter is applied BEFORE converting JSON to CSV',
    },
    {
      displayName: 'Select',
      name: 'select',
      type: 'string',
      default: '',
      description: 'Select, reorder or drop columns for output. Otherwise, all the columns will be output in the same order as the first object\'s keys in the JSON data. See \'qsv select --help\' for the full syntax. Note however that <cols> NEED to be a comma-delimited list of column NAMES and NOT column INDICES. [default: 1- ]',
    },
    ],
  },
];
