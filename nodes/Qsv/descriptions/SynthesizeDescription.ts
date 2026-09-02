import type { INodeProperties } from 'n8n-workflow';

export const SynthesizeDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['synthesize'],
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
        operation: ['synthesize'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv synthesize (Docs: https://github.com/dathere/qsv/blob/master/docs/help/synthesize.md)',
    displayOptions: {
      show: {
        operation: ['synthesize'],
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
        operation: ['synthesize'],
      },
    },
    options: [
    {
      displayName: 'Consistent Fakes',
      name: 'consistentFakes',
      type: 'boolean',
      default: false,
      description: 'For structured-faker columns with bounded cardinality (cardinality fully captured by `frequency`), build a stable source-value -> fake-value mapping so the same source value always produces the same fake in the output. Preserves the source frequency distribution and overrides the default "emit real values when frequency-enumerated" behavior for structured fakers (names, emails, addresses, etc.). Has no effect on unstructured columns (lorem_*, free_text, unknown), all-unique columns, or non-faker columns. Useful for deidentified synthesis where you want stable joins on the faked columns.',
    },
    {
      displayName: 'Correlation Threshold',
      name: 'correlationThreshold',
      type: 'string',
      default: '',
      description: 'Minimum absolute Spearman correlation for a pair of columns to stay in a `correlated` relationship. Weakly-correlated members are dropped. [default: 0.3]',
    },
    {
      displayName: 'Delimiter',
      name: 'delimiter',
      type: 'string',
      default: '',
      description: 'The field delimiter for reading the input CSV. Must be a single character. (default: ,)',
    },
    {
      displayName: 'Dictionary',
      name: 'dictionary',
      type: 'string',
      default: '',
      description: 'Data Dictionary JSON file produced by `describegpt --dictionary --infer-content-type --format JSON`. Layers semantic Content Types onto generation. If omitted, generation is purely type/frequency-based.',
    },
    {
      displayName: 'Freq Limit',
      name: 'freqLimit',
      type: 'string',
      default: '',
      description: 'Frequency pool depth passed to the internal `frequency` run as --limit. A column is reproduced via exact frequency-weighted sampling only when its cardinality is fully captured within this limit; higher values reproduce more columns verbatim. 0 means unlimited. [default: 100]',
    },
    {
      displayName: 'Infer Content Type',
      name: 'inferContentType',
      type: 'boolean',
      default: false,
      description: 'Generate the Data Dictionary on the fly by invoking `describegpt --dictionary --infer-content-type` on <input>. Requires an LLM API key (QSV_LLM_APIKEY). Ignored if --dictionary is given.',
    },
    {
      displayName: 'Jobs',
      name: 'jobs',
      type: 'string',
      default: '',
      description: 'Number of jobs to use for the internal `stats` and `frequency` runs.',
    },
    {
      displayName: 'Joint Cardinality Cap',
      name: 'jointCardinalityCap',
      type: 'string',
      default: '',
      description: 'Maximum number of distinct value-tuples a `joint` relationship may have. A joint group above this cap falls back to independent generation (or aborts under --strict-relationships). 0 means unlimited. [default: 100000]',
    },
    {
      displayName: 'Locale',
      name: 'locale',
      type: 'string',
      default: '',
      description: 'Locale for faker-backed columns. Case-insensitive. Supported: en, fr_fr, de_de, it_it, pt_br, pt_pt, ja_jp, zh_cn, zh_tw, ar_sa, cy_gb, fa_ir, nl_nl, tr_tr. Sparse locales (those without per-category data in fake-rs) silently fall back to en data for the missing categories — e.g. lorem text under a non-en locale is still English, since only zh_cn has localized lorem data. [default: en]',
    },
    {
      displayName: 'No Relationships',
      name: 'noRelationships',
      type: 'boolean',
      default: false,
      description: 'Disable inter-column relationship modeling. Every column is generated independently even when the dictionary declares a `relationships` array.',
    },
    {
      displayName: 'Rows',
      name: 'rows',
      type: 'number',
      default: 100,
      description: 'Number of synthetic rows to generate. [default: 100]',
    },
    {
      displayName: 'Seed',
      name: 'seed',
      type: 'string',
      default: '',
      description: 'RNG seed for fully reproducible output.',
    },
    {
      displayName: 'Stats Options',
      name: 'statsOptions',
      type: 'string',
      default: '',
      description: 'Extra options appended to the internal `stats` run. Note: cardinality, quartiles and date inference are always enabled — do not re-specify them here.',
    },
    {
      displayName: 'Strict Relationships',
      name: 'strictRelationships',
      type: 'boolean',
      default: false,
      description: 'Abort instead of warning-and-degrading when a declared relationship fails validation.',
    },
    ],
  },
];
