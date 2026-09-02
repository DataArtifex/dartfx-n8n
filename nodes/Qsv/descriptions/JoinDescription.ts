import type { INodeProperties } from 'n8n-workflow';

export const JoinDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['join'],
      },
    },
  },
  {
    displayName: 'First File Join Columns',
    name: 'columns1',
    type: 'string',
    required: true,
    default: '',
    description: 'Join columns for first input file (e.g. id or 1)',
    displayOptions: {
      show: {
        operation: ['join'],
      },
    },
  },
  {
    displayName: 'Second File Join Columns',
    name: 'columns2',
    type: 'string',
    required: true,
    default: '',
    description: 'Join columns for second input file (e.g. id or 1)',
    displayOptions: {
      show: {
        operation: ['join'],
      },
    },
  },
  {
    displayName: 'Second Input File Path',
    name: 'input2',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to second input CSV file on disk',
    displayOptions: {
      show: {
        operation: ['join'],
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
        operation: ['join'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv join (Docs: https://github.com/dathere/qsv/blob/master/docs/help/join.md)',
    displayOptions: {
      show: {
        operation: ['join'],
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
        operation: ['join'],
      },
    },
    options: [
    {
      displayName: 'Cross',
      name: 'cross',
      type: 'boolean',
      default: false,
      description: 'USE WITH CAUTION. This returns the cartesian product of the CSV data sets given. The number of rows return is equal to N * M, where N and M correspond to the number of rows in the given data sets, respectively.',
    },
    {
      displayName: 'Delimiter',
      name: 'delimiter',
      type: 'string',
      default: '',
      description: 'The field delimiter for reading CSV data. Must be a single character. (default: ,)',
    },
    {
      displayName: 'Full',
      name: 'full',
      type: 'boolean',
      default: false,
      description: 'Do a \'full outer\' join. This returns all rows in both data sets with matching records joined. If there is no match, the missing side will be padded out with empty fields. (This is the combination of \'outer left\' and \'outer right\'.)',
    },
    {
      displayName: 'Ignore Case',
      name: 'ignoreCase',
      type: 'boolean',
      default: false,
      description: 'When set, joins are done case insensitively.',
    },
    {
      displayName: 'Ignore Leading Zeros',
      name: 'ignoreLeadingZeros',
      type: 'boolean',
      default: false,
      description: 'When set, leading zeros are ignored in join keys.',
    },
    {
      displayName: 'Keys Output',
      name: 'keysOutput',
      type: 'string',
      default: '',
      description: 'Write successfully joined keys to <file>. This means that the keys are written to the output file when a match is found, with the exception of anti joins, where keys are written when NO match is found. Cross joins do not write keys. Note that transformations are applied to TEMPORARY join key columns. The original columns are not modified and the TEMPORARY columns are removed after the join.',
    },
    {
      displayName: 'Left',
      name: 'left',
      type: 'boolean',
      default: false,
      description: 'Do a \'left outer\' join. This returns all rows in first CSV data set, including rows with no corresponding row in the second data set. When no corresponding row exists, it is padded out with empty fields.',
    },
    {
      displayName: 'Left Anti',
      name: 'leftAnti',
      type: 'boolean',
      default: false,
      description: 'Do a \'left anti\' join. This returns all rows in first CSV data set that has no match with the second data set.',
    },
    {
      displayName: 'Left Semi',
      name: 'leftSemi',
      type: 'boolean',
      default: false,
      description: 'Do a \'left semi\' join. This returns all rows in first CSV data set that has a match with the second data set.',
    },
    {
      displayName: 'No Headers',
      name: 'noHeaders',
      type: 'boolean',
      default: false,
      description: 'When set, the first row will not be interpreted as headers. (i.e., They are not searched, analyzed, sliced, etc.)',
    },
    {
      displayName: 'Nulls',
      name: 'nulls',
      type: 'boolean',
      default: false,
      description: 'When set, joins will work on empty fields. Otherwise, empty fields are completely ignored. (In fact, any row that has an empty field in the key specified is ignored.)',
    },
    {
      displayName: 'Right',
      name: 'right',
      type: 'boolean',
      default: false,
      description: 'Do a \'right outer\' join. This returns all rows in second CSV data set, including rows with no corresponding row in the first data set. When no corresponding row exists, it is padded out with empty fields. (This is the reverse of \'outer left\'.)',
    },
    {
      displayName: 'Right Anti',
      name: 'rightAnti',
      type: 'boolean',
      default: false,
      description: 'This returns only the rows in the second CSV data set that do not have a corresponding row in the first data set. The output schema is the same as the second dataset.',
    },
    {
      displayName: 'Right Semi',
      name: 'rightSemi',
      type: 'boolean',
      default: false,
      description: 'This returns only the rows in the second CSV data set that have a corresponding row in the first data set. The output schema is the same as the second data set.',
    },
    ],
  },
];
