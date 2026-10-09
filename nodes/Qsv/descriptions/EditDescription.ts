import type { INodeProperties } from 'n8n-workflow';

export const EditDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['edit'],
      },
    },
  },
  {
    displayName: 'Column',
    name: 'column',
    type: 'string',
    required: true,
    default: '',
    description: 'The cell\'s column name or index. Indices start from the first column as 0. Providing a value of underscore (_) selects the last column.',
    displayOptions: {
      show: {
        operation: ['edit'],
      },
    },
  },
  {
    displayName: 'Row Index',
    name: 'row',
    type: 'number',
    required: true,
    default: 1,
    description: 'The cell\'s row index. Indices start from the first non-header row as 0.',
    displayOptions: {
      show: {
        operation: ['edit'],
      },
    },
  },
  {
    displayName: 'New Value',
    name: 'value',
    type: 'string',
    required: true,
    default: '',
    description: 'The new value to replace the old cell content with.',
    displayOptions: {
      show: {
        operation: ['edit'],
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
        operation: ['edit'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv edit (Docs: https://github.com/dathere/qsv/blob/master/docs/help/edit.md)',
    displayOptions: {
      show: {
        operation: ['edit'],
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
        operation: ['edit'],
      },
    },
    options: [
    {
      displayName: 'In Place',
      name: 'inPlace',
      type: 'boolean',
      default: false,
      description: 'Overwrite the input file data with the output. The input file is renamed to a .bak file in the same directory. If the .bak file already exists, the command errors instead of overwriting it. Symbolic links are rejected; pass the resolved path instead. (Other Windows reparse points such as junction points are not detected.)',
    },
    {
      displayName: 'No Headers',
      name: 'noHeaders',
      type: 'boolean',
      default: false,
      description: 'Start row indices from the header row as 0 (allows editing the header row).',
    },
    ],
  },
];
