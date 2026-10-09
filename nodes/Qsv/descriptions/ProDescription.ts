import type { INodeProperties } from 'n8n-workflow';

export const ProDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['pro'],
      },
    },
  },
  {
    displayName: 'Subcommand',
    name: 'subcommand',
    type: 'options',
    required: true,
    default: 'lens',
    options: [
        { name: 'lens', value: 'lens' },
        { name: 'workflow', value: 'workflow' },
    ],
    description: 'Subcommand to execute. Valid values: lens, workflow',
    displayOptions: {
      show: {
        operation: ['pro'],
      },
    },
  },

  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv pro (Docs: https://github.com/dathere/qsv/blob/master/docs/help/pro.md)',
    displayOptions: {
      show: {
        operation: ['pro'],
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
        operation: ['pro'],
      },
    },
    options: [

    ],
  },
];
