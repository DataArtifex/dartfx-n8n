import type { INodeProperties } from 'n8n-workflow';

export const IndexDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['index'],
      },
    },
  },


  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv index (Docs: https://github.com/dathere/qsv/blob/master/docs/help/index.md)',
    displayOptions: {
      show: {
        operation: ['index'],
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
        operation: ['index'],
      },
    },
    options: [

    ],
  },
];
