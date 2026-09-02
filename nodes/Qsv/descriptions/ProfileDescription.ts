import type { INodeProperties } from 'n8n-workflow';

export const ProfileDescription: INodeProperties[] = [
  {
    displayName: 'Input CSV File Path',
    name: 'inputPath',
    type: 'string',
    required: true,
    default: '',
    description: 'Path to input CSV file on disk or host filesystem',
    displayOptions: {
      show: {
        operation: ['profile'],
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
        operation: ['profile'],
      },
    },
  },
  {
    displayName: 'Additional Flags',
    name: 'additionalArgs',
    type: 'string',
    default: '',
    description: 'Additional raw command line arguments to pass to qsv profile (Docs: https://github.com/dathere/qsv/blob/master/docs/help/profile.md)',
    displayOptions: {
      show: {
        operation: ['profile'],
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
        operation: ['profile'],
      },
    },
    options: [
    {
      displayName: 'Allow External Validator',
      name: 'allowExternalValidator',
      type: 'boolean',
      default: false,
      description: ' Opt in to spawning the validator binary declared by `validation.external` when the profile was loaded from an arbitrary YAML file. Bundled profiles (dcat-us-v3, dcat-ap-v3, croissant, geoconnex) always run their declared external validators because the profile content is vetted at qsv release time. Without this flag, file-loaded profiles emit a Recommended-severity warning instead of running the binary, so an untrusted YAML can\'t silently execute arbitrary commands. Default: off.',
    },
    {
      displayName: 'Catalog',
      name: 'catalog',
      type: 'boolean',
      default: false,
      description: 'Wrap the emitted DCAT-US v3 Dataset inside a dcat:Catalog envelope (Catalog{dataset:[...]}). Useful for federation harvesters (data.gov, CKAN ingest) that expect Catalog-shaped top-level metadata. Default: off (Dataset-only, backwards-compatible).',
    },
    {
      displayName: 'Croissant Frequency',
      name: 'croissantFrequency',
      type: 'boolean',
      default: false,
      description: 'Embed per-column value-frequency distributions in the metadata projection. The croissant profile renders them as inline cr:RecordSets (one `<col>-frequency` RecordSet of {value, count, percentage} rows per column), per the spec\'s "distribution of values is a statistic on the field" guidance. Off by default (keeps the projection compact); the raw counts always remain in the top-level `frequency` block regardless. Other bundled profiles ignore this flag.',
    },
    {
      displayName: 'Dcat Discovery Timeout',
      name: 'dcatDiscoveryTimeout',
      type: 'string',
      default: '',
      description: 'Per-request timeout for DCAT-markup discovery probes. Default: 5.',
    },
    {
      displayName: 'Dcat Legacy License',
      name: 'dcatLegacyLicense',
      type: 'boolean',
      default: false,
      description: 'Transitional: re-emit dct:license on the Dataset alongside the v3-required Distribution-level copy. Default: off (strict v3, license on Distribution only).',
    },
    {
      displayName: 'Delimiter',
      name: 'delimiter',
      type: 'string',
      default: '',
      description: 'The field delimiter for reading CSV data. Must be a single character.',
    },
    {
      displayName: 'Force',
      name: 'force',
      type: 'boolean',
      default: false,
      description: 'Force recomputing cardinality and unique values even if a stats cache file exists.',
    },
    {
      displayName: 'Initial Context',
      name: 'initialContext',
      type: 'string',
      default: '',
      description: 'JSON file providing seed values for the package / resource dicts plus optional JSON-Pointer overrides for the final projection block. Replaces the older --package-meta / --resource-meta flags. Top-level keys: `package`, `resource`, `dataset_info`. Each leaf value may be wrapped as {"value": ..., "force": true} to mark it as overriding any value discovered from URL DCAT markup AND any value qsv inferred. Force is honored across all three subtrees: dataset_info entries override their target path verbatim; package / resource entries route through the active profile\'s `field_mappings:` table (e.g. `package.title force=true` lands at `/projection/dct:title`, beating inference and discovery). Forced values for slots the profile does not surface are silently dropped (no-op). See tests/resources/profile/dcat-init-context.README.md for a fully-populated example.',
    },
    {
      displayName: 'Jobs',
      name: 'jobs',
      type: 'string',
      default: '',
      description: 'The number of jobs to run in parallel for the underlying stats/frequency passes. When not set, the number of jobs is set to the number of CPUs detected.',
    },
    {
      displayName: 'Memcheck',
      name: 'memcheck',
      type: 'boolean',
      default: false,
      description: 'Check if there is enough memory to load the entire CSV into memory using CONSERVATIVE heuristics.',
    },
    {
      displayName: 'No Ckan',
      name: 'noCkan',
      type: 'boolean',
      default: false,
      description: 'Skip the CKAN-shape block.',
    },
    {
      displayName: 'No Dcat Discovery',
      name: 'noDcatDiscovery',
      type: 'boolean',
      default: false,
      description: 'Skip DCAT-markup discovery on URL inputs. Discovery sniffs HTTP Link: rel=describedBy (and, in future, sibling .metadata.json / JSON-LD <script> blocks) to use the publisher\'s stated metadata as a base layer.',
    },
    {
      displayName: 'No Headers',
      name: 'noHeaders',
      type: 'boolean',
      default: false,
      description: 'When set, the first row will not be interpreted as headers. Namely, it will be processed with the rest of the rows. Otherwise, the first row will always appear as the header row in the output.',
    },
    {
      displayName: 'No Projection',
      name: 'noProjection',
      type: 'boolean',
      default: false,
      description: 'Skip the metadata projection block (dcat/croissant/ geoconnex, depending on the active profile).',
    },
    {
      displayName: 'Profile',
      name: 'profile',
      type: 'string',
      default: '',
      description: 'Metadata projection profile to use. Embedded names: dcat-us-v3 (default), dcat-ap-v3, croissant; geoconnex (when built with the `geoconnex` feature — qsv default; qsvdp opt-in via -F datapusher_plus,geoconnex). A path to a custom YAML profile is also accepted; embedded names always win over same-named files. See resources/profiles/README.md for the schema and authoring guide.',
    },
    {
      displayName: 'Spec',
      name: 'spec',
      type: 'string',
      default: '',
      description: 'CKAN scheming YAML spec file. If omitted, only the inferred `dpp` block (lat/lon/date columns, dataset stats) is emitted; no formulas are evaluated.',
    },
    {
      displayName: 'Strict',
      name: 'strict',
      type: 'boolean',
      default: false,
      description: 'With --validate, fail the command on JSON Schema violations or non-Info external- validator findings (Required/Recommended severities) instead of just warning. Note: RFC4180 structural failures from `qsv validate` (emitted when a spec declares `validators`) are always appended as warnings, regardless of this flag.',
    },
    {
      displayName: 'Validate',
      name: 'validate',
      type: 'boolean',
      default: false,
      description: 'Validate the emitted projection block against the active profile\'s declared validators. For dcat-us-v3 that\'s the vendored GSA JSON Schema bundle (see resources/dcat-us-v3/); for dcat-ap-v3 / geoconnex it\'s pyshacl over the bundled SHACL shapes; for croissant it\'s mlcroissant. Catches missing mandatory fields, cardinality issues, and shape violations. Violations append to projection_warnings by default.',
    },
    ],
  },
];
