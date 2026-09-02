import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import { ApplyDescription } from './descriptions/ApplyDescription';
import { BeheadDescription } from './descriptions/BeheadDescription';
import { Blake3Description } from './descriptions/Blake3Description';
import { CatDescription } from './descriptions/CatDescription';
import { CountDescription } from './descriptions/CountDescription';
import { DatefmtDescription } from './descriptions/DatefmtDescription';
import { DedupDescription } from './descriptions/DedupDescription';
import { DenullDescription } from './descriptions/DenullDescription';
import { DescribegptDescription } from './descriptions/DescribegptDescription';
import { DiffDescription } from './descriptions/DiffDescription';
import { EditDescription } from './descriptions/EditDescription';
import { EnumDescription } from './descriptions/EnumDescription';
import { ExcelDescription } from './descriptions/ExcelDescription';
import { ExcludeDescription } from './descriptions/ExcludeDescription';
import { ExplodeDescription } from './descriptions/ExplodeDescription';
import { ExtdedupDescription } from './descriptions/ExtdedupDescription';
import { ExtsortDescription } from './descriptions/ExtsortDescription';
import { FetchDescription } from './descriptions/FetchDescription';
import { FetchpostDescription } from './descriptions/FetchpostDescription';
import { FillDescription } from './descriptions/FillDescription';
import { FixedwidthDescription } from './descriptions/FixedwidthDescription';
import { FixlengthsDescription } from './descriptions/FixlengthsDescription';
import { FlattenDescription } from './descriptions/FlattenDescription';
import { FmtDescription } from './descriptions/FmtDescription';
import { ForeachDescription } from './descriptions/ForeachDescription';
import { FrequencyDescription } from './descriptions/FrequencyDescription';
import { GetDescription } from './descriptions/GetDescription';
import { GeocodeDescription } from './descriptions/GeocodeDescription';
import { GeoconvertDescription } from './descriptions/GeoconvertDescription';
import { HeadersDescription } from './descriptions/HeadersDescription';
import { ImplodeDescription } from './descriptions/ImplodeDescription';
import { IndexDescription } from './descriptions/IndexDescription';
import { InputDescription } from './descriptions/InputDescription';
import { JoinDescription } from './descriptions/JoinDescription';
import { JoinpDescription } from './descriptions/JoinpDescription';
import { JsonDescription } from './descriptions/JsonDescription';
import { JsonlDescription } from './descriptions/JsonlDescription';
import { LuauDescription } from './descriptions/LuauDescription';
import { MoarstatsDescription } from './descriptions/MoarstatsDescription';
import { PartitionDescription } from './descriptions/PartitionDescription';
import { PivotpDescription } from './descriptions/PivotpDescription';
import { PragmastatDescription } from './descriptions/PragmastatDescription';
import { ProDescription } from './descriptions/ProDescription';
import { ProfileDescription } from './descriptions/ProfileDescription';
import { PseudoDescription } from './descriptions/PseudoDescription';
import { RenameDescription } from './descriptions/RenameDescription';
import { ReplaceDescription } from './descriptions/ReplaceDescription';
import { ReverseDescription } from './descriptions/ReverseDescription';
import { SafenamesDescription } from './descriptions/SafenamesDescription';
import { SampleDescription } from './descriptions/SampleDescription';
import { SchemaDescription } from './descriptions/SchemaDescription';
import { SearchDescription } from './descriptions/SearchDescription';
import { SearchsetDescription } from './descriptions/SearchsetDescription';
import { SelectDescription } from './descriptions/SelectDescription';
import { SliceDescription } from './descriptions/SliceDescription';
import { SnappyDescription } from './descriptions/SnappyDescription';
import { SniffDescription } from './descriptions/SniffDescription';
import { SortDescription } from './descriptions/SortDescription';
import { SortcheckDescription } from './descriptions/SortcheckDescription';
import { SplitDescription } from './descriptions/SplitDescription';
import { ScoresqlDescription } from './descriptions/ScoresqlDescription';
import { SqlpDescription } from './descriptions/SqlpDescription';
import { StatsDescription } from './descriptions/StatsDescription';
import { SynthesizeDescription } from './descriptions/SynthesizeDescription';
import { TableDescription } from './descriptions/TableDescription';
import { TemplateDescription } from './descriptions/TemplateDescription';
import { TojsonlDescription } from './descriptions/TojsonlDescription';
import { ToDescription } from './descriptions/ToDescription';
import { TransposeDescription } from './descriptions/TransposeDescription';
import { ValidateDescription } from './descriptions/ValidateDescription';
import { VizDescription } from './descriptions/VizDescription';

import { executeApply } from './actions/executeApply';
import { executeBehead } from './actions/executeBehead';
import { executeBlake3 } from './actions/executeBlake3';
import { executeCat } from './actions/executeCat';
import { executeCount } from './actions/executeCount';
import { executeDatefmt } from './actions/executeDatefmt';
import { executeDedup } from './actions/executeDedup';
import { executeDenull } from './actions/executeDenull';
import { executeDescribegpt } from './actions/executeDescribegpt';
import { executeDiff } from './actions/executeDiff';
import { executeEdit } from './actions/executeEdit';
import { executeEnum } from './actions/executeEnum';
import { executeExcel } from './actions/executeExcel';
import { executeExclude } from './actions/executeExclude';
import { executeExplode } from './actions/executeExplode';
import { executeExtdedup } from './actions/executeExtdedup';
import { executeExtsort } from './actions/executeExtsort';
import { executeFetch } from './actions/executeFetch';
import { executeFetchpost } from './actions/executeFetchpost';
import { executeFill } from './actions/executeFill';
import { executeFixedwidth } from './actions/executeFixedwidth';
import { executeFixlengths } from './actions/executeFixlengths';
import { executeFlatten } from './actions/executeFlatten';
import { executeFmt } from './actions/executeFmt';
import { executeForeach } from './actions/executeForeach';
import { executeFrequency } from './actions/executeFrequency';
import { executeGet } from './actions/executeGet';
import { executeGeocode } from './actions/executeGeocode';
import { executeGeoconvert } from './actions/executeGeoconvert';
import { executeHeaders } from './actions/executeHeaders';
import { executeImplode } from './actions/executeImplode';
import { executeIndex } from './actions/executeIndex';
import { executeInput } from './actions/executeInput';
import { executeJoin } from './actions/executeJoin';
import { executeJoinp } from './actions/executeJoinp';
import { executeJson } from './actions/executeJson';
import { executeJsonl } from './actions/executeJsonl';
import { executeLuau } from './actions/executeLuau';
import { executeMoarstats } from './actions/executeMoarstats';
import { executePartition } from './actions/executePartition';
import { executePivotp } from './actions/executePivotp';
import { executePragmastat } from './actions/executePragmastat';
import { executePro } from './actions/executePro';
import { executeProfile } from './actions/executeProfile';
import { executePseudo } from './actions/executePseudo';
import { executeRename } from './actions/executeRename';
import { executeReplace } from './actions/executeReplace';
import { executeReverse } from './actions/executeReverse';
import { executeSafenames } from './actions/executeSafenames';
import { executeSample } from './actions/executeSample';
import { executeSchema } from './actions/executeSchema';
import { executeSearch } from './actions/executeSearch';
import { executeSearchset } from './actions/executeSearchset';
import { executeSelect } from './actions/executeSelect';
import { executeSlice } from './actions/executeSlice';
import { executeSnappy } from './actions/executeSnappy';
import { executeSniff } from './actions/executeSniff';
import { executeSort } from './actions/executeSort';
import { executeSortcheck } from './actions/executeSortcheck';
import { executeSplit } from './actions/executeSplit';
import { executeScoresql } from './actions/executeScoresql';
import { executeSqlp } from './actions/executeSqlp';
import { executeStats } from './actions/executeStats';
import { executeSynthesize } from './actions/executeSynthesize';
import { executeTable } from './actions/executeTable';
import { executeTemplate } from './actions/executeTemplate';
import { executeTojsonl } from './actions/executeTojsonl';
import { executeTo } from './actions/executeTo';
import { executeTranspose } from './actions/executeTranspose';
import { executeValidate } from './actions/executeValidate';
import { executeViz } from './actions/executeViz';

export class Qsv implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'QSV Data Wrangler',
    name: 'qsv',
    icon: 'file:qsv.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description: 'Ultra-fast tabular data wrangling, stats, and transformations via QSV (generated for QSV 22.0.1; requires qsv CLI on host)',
    defaults: {
      name: 'QSV',
    },
    inputs: ['main'],
    outputs: ['main'],
    properties: [
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Apply (apply)',
            value: 'apply',
            description: 'Apply a series of transformation functions to given CSV column/s. This can be used to perform typical data-wrangling tasks and/or to harmonize some values, etc. It has five subcommands: 1. operations*   - 40 string, format, currency, regex & NLP operators. 2. emptyreplace* - replace empty cells with <--replacement> string. 3. dynfmt        - Dynamically constructs a new column from other columns using the <--formatstr> template. 4. calcconv      - parse and evaluate math expressions, with support for units and conversions. 5. summarize*    - summarize a column or group of columns using an OpenAI API-compatible LLM (local or commercial), with customizable, MiniJinja-templated per-record prompts. * subcommand is multi-column capable. OPERATIONS (multi-column capable) Multiple operations can be applied, with the comma-delimited operation series applied in order: trim => Trim the cell trim,upper => Trim the cell, then transform to uppercase lower,simdln => Lowercase the cell, then compute the normalized Damerau-Levenshtein similarity to --comparand Operations support multi-column transformations. Just make sure the number of transformed columns with the --rename option is the same. For example, to trim and fold to uppercase the col1,col2 and col3 columns & rename them to newcol1,newcol2 and newcol3: It has 40 supported operations: * len: Return string length * lower: Transform to lowercase * upper: Transform to uppercase * squeeze: Compress consecutive whitespaces * squeeze0: Remove whitespace * trim: Trim (drop whitespace left & right of the string) * ltrim: Left trim whitespace * rtrim: Right trim whitespace * mtrim: Trims --comparand matches left & right of the string (Rust trim_matches) * mltrim: Left trim --comparand matches (Rust trim_start_matches) * mrtrim: Right trim --comparand matches (Rust trim_end_matches) * strip_prefix: Removes specified prefix in --comparand * strip_suffix: Remove specified suffix in --comparand * escape - escape (Rust escape_default) * encode62: base62 encode * decode62: base62 decode * encode64: base64 encode * decode64: base64 decode * crc32: crc32 checksum * replace: Replace all matches of a pattern (using --comparand) with a string (using --replacement) (Rust replace) * regex_replace: Replace all regex matches in --comparand w/ --replacement. Specify <NULL> as --replacement to remove matches. * titlecase - capitalizes English text using Daring Fireball titlecase style https://daringfireball.net/2008/05/title_case * censor: profanity filter. Add additional comma-delimited profanities with --comparand. * censor_check: check if profanity is detected (boolean). Add additional comma-delimited profanities with -comparand. * censor_count: count of profanities detected. Add additional comma-delimited profanities with -comparand. * round: Round numeric values to the specified number of decimal places using Midpoint Nearest Even Rounding Strategy AKA "Bankers Rounding." Specify the number of decimal places with --formatstr (default: 3). * thousands: Add thousands separators to numeric values. Specify the separator policy with --formatstr (default: comma). The valid policies are: comma, dot, space, underscore, hexfour (place a space every four hex digits) and indiancomma (place a comma every two digits, except the last three digits). The decimal separator can be specified with --replacement (default: \'.\') * currencytonum: Gets the numeric value of a currency. Supports currency symbols (e.g. $,¥,£,€,֏,₱,₽,₪,₩,ƒ,฿,₫) and strings (e.g. USD, EUR, RMB, JPY, etc.). Recognizes point, comma and space separators. Is "permissive" by default, meaning it will allow no or non-ISO currency symbols. To enforce strict parsing, which will require a valid ISO currency symbol, set the --formatstr to "strict". * numtocurrency: Convert a numeric value to a currency. Specify the currency symbol with --comparand. Automatically rounds values to two decimal places. Specify "euro" formatting (e.g. 1.000,00 instead of 1,000.00 ) by setting --formatstr to "euro". Specify conversion rate by setting --replacement to a number. * gender_guess: Guess the gender of a name. * copy: Mark a column for copying * simdl: Damerau-Levenshtein similarity to --comparand * simdln: Normalized Damerau-Levenshtein similarity to --comparand (between 0.0 & 1.0) * simjw: Jaro-Winkler similarity to --comparand (between 0.0 & 1.0) * simsd: Sørensen-Dice similarity to --comparand (between 0.0 & 1.0) * simhm: Hamming distance to --comparand. Num of positions characters differ. * simod: Optimal String Alignment (OSA) Distance to --comparand. * eudex: Multi-lingual sounds like --comparand (boolean) Tested on English, Catalan, German, Spanish, Swedish and Italian dictionaries. It supports all C1 letters (e.g. ü, ö, æ, ß, é, etc.) and takes their sound into account. It should work on other European languages that use the Latin alphabet. * sentiment: Normalized VADER sentiment score (English only - between -1.0 to 1.0). * whatlang: Language Detection for 87 supported languages, with default confidence threshold of 0.9, which can be overridden by assigning 0.0 to 1.0 to --comparand. If language detection confidence is below the threshold, it will still show the best language guess, followed by the confidence score, ending with a question mark. If you want to always displays the confidence score, end the --comparand value with a question mark (e.g. 0.9?) https://github.com/greyblake/whatlang-rs/blob/master/SUPPORTED_LANGUAGES.md EMPTYREPLACE (multi-column capable) Replace empty cells with <--replacement> string. Non-empty cells are not modified. See the `fill` command for more complex empty field operations. (Docs: https://github.com/dathere/qsv/blob/master/docs/help/apply.md)',
            action: 'Apply',
          },
          {
            name: 'Behead (behead)',
            value: 'behead',
            description: 'Drop a CSV file\'s header. See also https://github.com/dathere/qsv/wiki/Transform-and-Reshape#behead (Docs: https://github.com/dathere/qsv/blob/master/docs/help/behead.md)',
            action: 'Behead',
          },
          {
            name: 'Blake3 (blake3)',
            value: 'blake3',
            description: 'Compute cryptographic hashes of files using blake3. This command is functionally similar to b3sum, providing fast, parallel blake3 hashing of one or more files. It supports keyed hashing, key derivation, variable-length output, and checksum verification. When no file is given, or when "-" is given, reads stdin. For examples, see https://github.com/dathere/qsv/blob/master/tests/test_blake3.rs. See also https://github.com/dathere/qsv/wiki/Indexing-Compression-Diff#blake3 (Docs: https://github.com/dathere/qsv/blob/master/docs/help/blake3.md)',
            action: 'Blake3',
          },
          {
            name: 'Cat (cat)',
            value: 'cat',
            description: 'Concatenate CSV files by row or by column. When concatenating by column, the columns will be written in the same order as the inputs given. The number of rows in the result is always equivalent to the minimum number of rows across all given CSV data. (This behavior can be reversed with the \'--pad\' flag.) Concatenating by rows can be done in two ways: \'rows\' subcommand: All CSV data must have the same number of columns (unless --flexible is enabled) and in the same order. If you need to rearrange the columns or fix the lengths of records, use the \'select\' or \'fixlengths\' commands. Also, only the headers of the *first* CSV data given are used. Headers in subsequent inputs are ignored. (This behavior can be disabled with --no-headers.) \'rowskey\' subcommand: CSV data can have different numbers of columns and in different orders. All columns are written in insertion order. If a column is missing in a row, an empty field is written. If a column is missing in the header, an empty field is written for all rows. (Docs: https://github.com/dathere/qsv/blob/master/docs/help/cat.md)',
            action: 'Cat',
          },
          {
            name: 'Count (count)',
            value: 'count',
            description: 'Returns a count of the number of records in the CSV data. It has three modes of operation: 1. If a valid index is present, it will use it to lookup the count and return instantaneously. (fastest) If no index is present, it will read the CSV and count the number of records by scanning the file. 2. If the polars feature is enabled, it will use the multithreaded, mem-mapped Polars CSV reader. (faster - not available on qsvlite) 3. If the polars feature is not enabled, it will use the "regular", single-threaded CSV reader. Note that the count will not include the header row (unless --no-headers is given). (Docs: https://github.com/dathere/qsv/blob/master/docs/help/count.md)',
            action: 'Count',
          },
          {
            name: 'Datefmt (datefmt)',
            value: 'datefmt',
            description: 'Formats recognized date fields (19 formats recognized) to a specified date format using strftime date format specifiers. For recognized date formats, see https://github.com/dathere/qsv-dateparser?tab=readme-ov-file#accepted-date-formats See https://docs.rs/chrono/latest/chrono/format/strftime/ for accepted date format specifiers for --formatstr. Defaults to ISO 8601/RFC 3339 format when --formatstr is not specified. ( "%Y-%m-%dT%H:%M:%S%z" - e.g. 2001-07-08T00:34:60.026490+09:30 ) (Docs: https://github.com/dathere/qsv/blob/master/docs/help/datefmt.md)',
            action: 'Datefmt',
          },
          {
            name: 'Dedup (dedup)',
            value: 'dedup',
            description: 'Deduplicates CSV rows. This requires reading all of the CSV data into memory because because the rows need to be sorted first. That is, unless the --sorted option is used to indicate the CSV is already sorted - typically, with the sort cmd for more sorting options or the extsort cmd for larger than memory CSV files. This will make dedup run in streaming mode with constant memory. Either way, the output will not only be deduplicated, it will also be sorted. A duplicate count will also be sent to <stderr>. (Docs: https://github.com/dathere/qsv/blob/master/docs/help/dedup.md)',
            action: 'Dedup',
          },
          {
            name: 'Denull (denull)',
            value: 'denull',
            description: 'Detect null sentinels - literal text like "NULL" or "N/A" standing in for a missing value - that stop a numeric column from being recognized as numeric. A cell holding the text "NULL" is a VALUE, not a null. `qsv stats` therefore types the whole column as String, its nullcount stays 0, and no quartiles are computed. Everything downstream degrades quietly: `viz smart` drops the column, `schema` declares it a string, and `describegpt` describes a category that isn\'t one. denull scans each column ONCE, with bounded memory, and partitions its values into those that parse as a finite number and those that don\'t. A column is CONFIRMED when every non-numeric value it holds is a known null sentinel and at least two distinct numeric values remain. A column is REJECTED - with the reason - when it cannot be promoted anyway: another value is not a sentinel ("OK"), its numbers carry leading zeros and are really codes ("007"), or it buries the sentinel under more than --max-distinct other non-numeric values. Only columns worth acting on are listed: those holding a known sentinel, and those that are predominantly numeric, whose few odd values are candidates for a sentinel denull does not know yet - name them with --add-vocab. An ordinary categorical is not a near miss and is not reported; nor is a free-text column that merely happens to be unpromotable. Use --all-columns to see everything scanned. The scan is exhaustive, not sampled: a column is never confirmed on the strength of the values that happen to sort first. A genuine free-text column disqualifies itself as soon as it accumulates --max-distinct different non-numeric values, so memory stays flat. A 434 MB, 86-column file peaks at ~40 MB - the same as a type-inference pass, and ~19x less than an exhaustive frequency table of every distinct value. By default denull only REPORTS; it never rewrites your data. Pass --apply to rewrite it, blanking sentinels ONLY in the columns denull CONFIRMED. A column it REJECTED is copied through untouched, as is every column it did not scan: $ qsv denull --apply data.csv -o clean.csv $ qsv stats clean.csv --everything Cleaning is per-column, which is what a single `qsv replace` pass cannot do: it takes one regex across all selected columns, so it cannot blank "NULL" in one column and "-" in another while leaving a literal "-" alone in a third. Once blanked, `qsv stats` treats those cells as MISSING: it excludes them from mean, stddev and the quartiles, and counts them in `nullcount` and `sparsity`. Do not reach for the `--nulls` option of `qsv stats` to "restore" them. That option puts the blanks back into the denominator while they contribute nothing to the sum, which is the same as imputing zero. On a column that is 54% sentinel, that pulls the mean from 271 down to 123 and SHRINKS the reported standard error - more confidence in a worse number. A well with no recorded casing depth does not have a casing depth of zero. Note also that `--nulls` reaches only the moment-based statistics - mean, stddev, variance, cv, sem, geometric_mean, harmonic_mean and n_zero. The order statistics (median, quartiles, iqr, mad, skewness) ALWAYS ignore blanks, whether or not the flag is set, so a `--nulls` summary does not agree with itself: on that same column the mean drops to 123 while the median stays at 200. And because one zero annihilates a product, geometric_mean collapses to 0 and harmonic_mean to nothing at all. So `--nulls` is not a general "treat blanks as zero" switch, even for data where an empty cell genuinely MEANS zero (no events, no charge). If that is your data, and you want every statistic to see those zeroes, materialize them first and leave the flag alone: $ qsv fill --default 0 -s events data.csv | qsv stats --everything Statistics over the cleaned column are still complete-case: they describe the rows that HAVE a value. If a value is missing for a reason correlated with the value itself, the estimate is biased. denull does not create that bias - before it ran, the column was a String with no statistics at all - but it does not remove it either. It makes the missingness visible so you can reason about it. Numeric sentinels (-999, -9999, 9999) are deliberately NOT detected. They parse as valid numbers, so no scan can distinguish them from real data - a depth-to-water reading of -140 ft is an artesian well, not a missing value. Only a human or a domain-aware model can propose those, and only a human should apply them. The `sentinels` column lists the sentinel tokens OBSERVED in that column. They are only safe to remove when the verdict is `confirmed`. (Docs: https://github.com/dathere/qsv/blob/master/docs/help/denull.md)',
            action: 'Denull',
          },
          {
            name: 'Describegpt (describegpt) [Feature: feature-gated]',
            value: 'describegpt',
            description: 'Create a "neuro-symbolic" Data Dictionary and/or infer Description & Tags about a Dataset using an OpenAI API-compatible Large Language Model (LLM). It does this by compiling Summary Statistics & a Frequency Distribution of the Dataset, and then prompting the LLM with detailed, configurable, MiniJinja-templated prompts with these extended statistical context. The Data Dictionary is "neuro-symbolic" as it uses a hybrid approach. It\'s primarily populated deterministically using Summary Statistics & Frequency Distribution, and only the human-friendly Label and Description (plus Content Type when --infer-content-type is set) are populated by the "neural network" LLM using the same statistical context. CHAT MODE: You can also use the --prompt option to ask a natural language question about the Dataset. If the question can be answered by solely using the Dataset\'s Summary Statistics and Frequency Distribution data, the LLM will return the answer directly. CHAT SQL RETRIEVAL-AUGMENTED GENERATION (RAG) SUB-MODE: If the question cannot be answered using the Dataset\'s Summary Statistics & Frequency Distribution, it will first create a Data Dictionary and a small random sample (default: 100 rows) of the Dataset and provide it to the LLM as additional context to help it generate a SQL query that DETERMINISTICALLY answers the natural language question. Two SQL dialects are currently supported - DuckDB (highly recommended) & Polars. If the QSV_DUCKDB_PATH environment variable is set to the absolute path of the DuckDB binary, DuckDB will be used to answer the question. Otherwise, if the "polars" feature is enabled, Polars SQL will be used. If neither DuckDB nor Polars is available, the SQL query will be returned in a Markdown code block, along with the reasoning behind the query. Even in "SQL RAG" mode, though the SQL query is guaranteed to be deterministic, the query itself may not be correct. In the event of a SQL query execution failure, run the same --prompt with the --fresh option to request the LLM to generate a new SQL query. When using DuckDB, all loaded DuckDB extensions will be sent as additional context to the LLM to let it know what functions (even UDFs!) it can use in the SQL queries it generates. If you want a specific function or technique to be used in the SQL query, mention it in the prompt. SUPPORTED MODELS & LLM PROVIDERS: OpenAI\'s open-weights gpt-oss model (both 20b and 120b variants) was used during development & is recommended for most use cases. It was also tested with OpenAI, TogetherAI, OpenRouter and Google Gemini cloud providers. For Gemini, use the base URL "https://generativelanguage.googleapis.com/v1beta/openai". Local LLMs tested include Ollama, Jan and LM Studio. NOTE: LLMs are prone to inaccurate information being produced. Verify output results before using them. CACHING: As LLM inferencing takes time and can be expensive, describegpt caches the LLM inferencing results in a either a disk cache (default) or a Redis cache. It does so by calculating the BLAKE3 hash of the input file and using it as the primary cache key along with the prompt type, model and every flag that influences the rendered prompt (including prompt-file, context-file, language, tag-vocab, num-tags, enum-threshold, infer-content-type, sample-size, fewshot-examples, the QSV_DUCKDB_PATH toggle and the generated Data Dictionary), so changing any of them produces a fresh LLM call rather than stale cached output. The default disk cache is stored in the ~/.qsv-cache/describegpt directory with a default TTL of 28 days and cache hits NOT refreshing an existing cached value\'s TTL. Adjust the QSV_DISKCACHE_TTL_SECS & QSV_DISKCACHE_TTL_REFRESH env vars to change disk cache settings. A QSV_DISKCACHE_TTL_SECS of 0 disables time-based expiration (entries are cached indefinitely). Alternatively a Redis cache can be used instead of the disk cache. This is especially useful if you want to share the cache across the network with other users or computers. The Redis cache is stored in database 3 by default with a TTL of 28 days and cache hits NOT refreshing an existing cached value\'s TTL. Adjust the QSV_DG_REDIS_CONNSTR, QSV_REDIS_MAX_POOL_SIZE, QSV_REDIS_TTL_SECS & QSV_REDIS_TTL_REFRESH env vars to change Redis cache settings. A QSV_REDIS_TTL_SECS of 0 disables expiration (entries are cached indefinitely). (Docs: https://github.com/dathere/qsv/blob/master/docs/help/describegpt.md)',
            action: 'Describegpt',
          },
          {
            name: 'Diff (diff)',
            value: 'diff',
            description: 'Find the difference between two CSVs with ludicrous speed. NOTE: diff does not support stdin. A file path is required for both arguments. Further, PRIMARY KEY VALUES MUST BE UNIQUE WITHIN EACH CSV. To check if a CSV has unique primary key values, use `qsv extdedup` with the same key columns using the `--select` option: $ qsv extdedup --select keycol data.csv --no-output The duplicate count will be printed to stderr. (Docs: https://github.com/dathere/qsv/blob/master/docs/help/diff.md)',
            action: 'Diff',
          },
          {
            name: 'Edit (edit)',
            value: 'edit',
            description: 'Replace the value of a cell specified by its row and column. (Docs: https://github.com/dathere/qsv/blob/master/docs/help/edit.md)',
            action: 'Edit',
          },
          {
            name: 'Enum (enum)',
            value: 'enum',
            description: 'Add a new column enumerating the lines of a CSV file. This can be useful to keep track of a specific line order, give a unique identifier to each line or even make a copy of the contents of a column. The enum function has six modes of operation: 1. INCREMENT. Add an incremental identifier to each of the lines: $ qsv enum file.csv 2. UUID4. Add a uuid v4 to each of the lines: $ qsv enum --uuid4 file.csv 3. UUID7. Add a uuid v7 to each of the lines: $ qsv enum --uuid7 file.csv 4. CONSTANT. Create a new column filled with a given value: $ qsv enum --constant 0 5. COPY. Copy the contents of a column to a new one: $ qsv enum --copy names 6. HASH. Create a new column with the deterministic hash of the given column/s. The hash uses the xxHash algorithm and is platform-agnostic. (see https://github.com/DoumanAsh/xxhash-rust for more information): $ qsv enum --hash 1- // hash all columns, auto-ignores existing "hash" column $ qsv enum --hash col2,col3,col4 // hash specific columns $ qsv enum --hash col2 // hash a single column $ qsv enum --hash /record_id|name|address/ // hash columns that match a regex $ qsv enum --hash !/record_id/ // hash all columns except the record_id column Finally, you should also be able to shuffle the lines of a CSV file by sorting on the generated uuid4s: $ qsv enum --uuid4 file.csv | qsv sort -s uuid4 > shuffled.csv This will shuffle the lines of the file.csv file as uuids generated using the v4 specification are random and for practical purposes, are unique (1 in 2^122). See https://en.wikipedia.org/wiki/Universally_unique_identifier#Collisions However, sorting on uuid7 identifiers will not work as they are time-based and monotonically increasing, and will not shuffle the lines. (Docs: https://github.com/dathere/qsv/blob/master/docs/help/enum.md)',
            action: 'Enum',
          },
          {
            name: 'Excel (excel)',
            value: 'excel',
            description: 'Exports a specified Excel/ODS sheet to a CSV file. The first non-empty row of a sheet is assumed to be the header row. (Docs: https://github.com/dathere/qsv/blob/master/docs/help/excel.md)',
            action: 'Excel',
          },
          {
            name: 'Exclude (exclude)',
            value: 'exclude',
            description: 'Removes a set of CSV data from another set based on the specified columns. Also can compute the intersection of two CSV sets with the -v flag. Matching is always done by ignoring leading and trailing whitespace. By default, matching is done case sensitively, but this can be disabled with the --ignore-case flag. The columns arguments specify the columns to match for each input. Columns can be referenced by name or index, starting at 1. Specify multiple columns by separating them with a comma. Specify a range of columns with `-`. Both columns1 and columns2 must specify exactly the same number of columns. (See \'qsv select --help\' for the full syntax.) Either <input1> or <input2> can be set to `-` to read from stdin, but not both. (Docs: https://github.com/dathere/qsv/blob/master/docs/help/exclude.md)',
            action: 'Exclude',
          },
          {
            name: 'Explode (explode)',
            value: 'explode',
            description: 'Explodes a row into multiple ones by splitting a column value based on the given separator. (Docs: https://github.com/dathere/qsv/blob/master/docs/help/explode.md)',
            action: 'Explode',
          },
          {
            name: 'Extdedup (extdedup)',
            value: 'extdedup',
            description: 'Remove duplicate rows from an arbitrarily large CSV/text file using a memory-mapped, on-disk hash table. Unlike the \'dedup\' command, this command does not load the entire file into memory to sort the CSV first before deduping it. This allows it to run in constant memory and the output will retain the input sort order. This command has TWO modes of operation. * CSV MODE when --select is set, it dedupes based on the given column/s. See `qsv select --help` for select syntax details. * LINE MODE when --select is NOT set, it deduplicates any input text file (not just CSVs) on a line-by-line basis. A duplicate count will be sent to <stderr>. See also https://github.com/dathere/qsv/wiki/Aggregation-and-Statistics#extdedup (Docs: https://github.com/dathere/qsv/blob/master/docs/help/extdedup.md)',
            action: 'Extdedup',
          },
          {
            name: 'Extsort (extsort)',
            value: 'extsort',
            description: 'Sort an arbitrarily large CSV/text file using a multithreaded external sort algorithm. This command has TWO modes of operation. * CSV MODE when --select is set, it sorts based on the given column/s. Requires an index. See `qsv select --help` for select syntax details. STATS-CACHE AWARE: in CSV MODE, when a single ASCII column is selected and a valid stats cache exists (see `qsv stats --stats-jsonl`), extsort uses the cached sort order to detect if the column is already in ascending order and, if so, streams the input through unchanged, skipping the external sort entirely. Not applied with --reverse or multi-column selections. Disable with QSV_STATSCACHE_MODE=none. * LINE MODE when --select is NOT set, it sorts any input text file (not just CSVs) on a line-by-line basis. If sorting a non-CSV file, be sure to set --no-headers, otherwise, the first line will not be included in the external sort. See also https://github.com/dathere/qsv/wiki/Aggregation-and-Statistics#extsort (Docs: https://github.com/dathere/qsv/blob/master/docs/help/extsort.md)',
            action: 'Extsort',
          },
          {
            name: 'Fetch (fetch)',
            value: 'fetch',
            description: 'Send/Fetch data to/from web services for every row using HTTP Get. Fetch is integrated with `jaq` (a jq clone) to directly parse out values from an API JSON response. (See https://github.com/01mf02/jaq for more info on how to use the jaq JSON Query Language) (Docs: https://github.com/dathere/qsv/blob/master/docs/help/fetch.md)',
            action: 'Fetch',
          },
          {
            name: 'Fetchpost (fetchpost)',
            value: 'fetchpost',
            description: 'Fetchpost sends/fetches data to/from web services for every row using HTTP Post. As opposed to fetch, which uses HTTP Get. CSV data is posted using two methods: 1. As an HTML Form using using the <column-list> argument The columns are used to construct the HTML form data and posted to the server as a URL-encoded form. (content-type: application/x-www-form-urlencoded) 2. As a payload using a MiniJinja template with the --payload-tpl <file> option The template file is used to construct the payload and posted to the server as JSON by default (content-type: application/json), with automatic checking if the rendered template is valid JSON. The --content-type option can override the expected content type. However, it is the user\'s responsibility to ensure the content-type format is valid. Fetchpost is integrated with `jaq` (a jq clone) to directly parse out values from an API JSON response. (See https://github.com/01mf02/jaq for more info on how to use the jaq JSON Query Language) (Docs: https://github.com/dathere/qsv/blob/master/docs/help/fetchpost.md)',
            action: 'Fetchpost',
          },
          {
            name: 'Fill (fill)',
            value: 'fill',
            description: 'Fill empty fields in selected columns of a CSV. This command fills empty fields in the selected column using the last seen non-empty field in the CSV. This is useful to forward-fill values which may only be included the first time they are encountered. The option `--default <value>` fills all empty values in the selected columns with the provided default value. When `--default` is set, it takes precedence over forward-fill and `--first`, which become no-ops. The option `--first` fills empty values using the first seen non-empty value in that column, instead of the most recent non-empty value in that column. The option `--backfill` fills empty values at the start of the CSV with the first valid value in that column. This requires buffering rows with empty values in the target column which appear before the first valid value. The option `--groupby` groups the rows by the specified columns before filling in the empty values. Using this option, empty values are only filled with values which belong to the same group of rows, as determined by the columns selected in the `--groupby` option. When both `--groupby` and `--backfill` are specified, and the CSV is not sorted by the `--groupby` columns, rows may be re-ordered during output due to the buffering of rows collected before the first valid value. For examples, see https://github.com/dathere/qsv/blob/master/tests/test_fill.rs. See also https://github.com/dathere/qsv/wiki/Transform-and-Reshape#fill (Docs: https://github.com/dathere/qsv/blob/master/docs/help/fill.md)',
            action: 'Fill',
          },
          {
            name: 'Fixedwidth (fixedwidth)',
            value: 'fixedwidth',
            description: 'Converts fixed-width text (fields at fixed byte-column positions, no delimiters) to CSV. By default, this expects the input\'s first line to be a comment enumerating the 1-based starting byte position of each column, comma-separated and prefixed with "#" - the same format `qsv table --align leftfwf` produces (e.g. "#1,10,15"). Every subsequent line is a data record; each field runs from its starting position up to (but not including) the next column\'s starting position, or to the end of the line for the last column. Trailing whitespace in each field is trimmed. If the input doesn\'t have such a header comment - e.g. it comes from an external system - specify the column positions explicitly with --positions, or column widths with --widths. (Docs: https://github.com/dathere/qsv/blob/master/docs/help/fixedwidth.md)',
            action: 'Fixedwidth',
          },
          {
            name: 'Fixlengths (fixlengths)',
            value: 'fixlengths',
            description: 'Transforms CSV data so that all records have the same length. The length is the length of the longest record in the data (not counting trailing empty fields, but at least 1). Records with smaller lengths are padded with empty fields. This requires two complete scans of the CSV data: one for determining the record size and one for the actual transform. Because of this, the input given must be a file and not stdin. Alternatively, if --length is set, then all records are forced to that length. This requires a single pass and can be done with stdin. See also https://github.com/dathere/qsv/wiki/Transform-and-Reshape#fixlengths (Docs: https://github.com/dathere/qsv/blob/master/docs/help/fixlengths.md)',
            action: 'Fixlengths',
          },
          {
            name: 'Flatten (flatten)',
            value: 'flatten',
            description: 'Prints flattened records such that fields are labeled separated by a new line. This mode is particularly useful for viewing one record at a time. Each record is separated by a special \'#\' character (on a line by itself), which can be changed with the --separator flag. There is also a condensed view (-c or --condense) that will shorten the contents of each field to provide a summary view. For examples, see https://github.com/dathere/qsv/blob/master/tests/test_flatten.rs. See also https://github.com/dathere/qsv/wiki/Selection-and-Inspection#flatten (Docs: https://github.com/dathere/qsv/blob/master/docs/help/flatten.md)',
            action: 'Flatten',
          },
          {
            name: 'Fmt (fmt)',
            value: 'fmt',
            description: 'Formats CSV data with a custom delimiter or CRLF line endings. Generally, all commands in qsv output CSV data in a default format, which is the same as the default format for reading CSV data. This makes it easy to pipe multiple qsv commands together. However, you may want the final result to have a specific delimiter or record separator, and this is where \'qsv fmt\' is useful. For examples, see https://github.com/dathere/qsv/blob/master/tests/test_fmt.rs. See also https://github.com/dathere/qsv/wiki/Transform-and-Reshape#fmt (Docs: https://github.com/dathere/qsv/blob/master/docs/help/fmt.md)',
            action: 'Fmt',
          },
          {
            name: 'Foreach (foreach)',
            value: 'foreach',
            description: 'Execute a shell command once per record in a given CSV file. NOTE: Windows users are recommended to use Git Bash as their terminal when running this command. Download it from https://git-scm.com/downloads. When installing, be sure to select "Use Git from the Windows Command Prompt" to ensure that the necessary Unix tools are available in the terminal. WARNING: This command can be dangerous. Be careful when using it with untrusted input. Or per @thadguidry: 😉 Please ensure when using foreach to use trusted arguments, variables, scripts, etc. If you don\'t do due diligence and blindly use untrusted parts... foreach can indeed become a footgun and possibly fry your computer, eat your lunch, and expose an entire datacenter to a cancerous virus in your unvetted batch file you grabbed from some stranger on the internet that runs...FOR EACH LINE in your CSV file. GASP!" (Docs: https://github.com/dathere/qsv/blob/master/docs/help/foreach.md)',
            action: 'Foreach',
          },
          {
            name: 'Frequency (frequency)',
            value: 'frequency',
            description: 'Compute a frequency distribution table on input data. It has CSV and JSON output modes. https://en.wikipedia.org/wiki/Frequency_(statistics)#Frequency_distribution_table In CSV output mode (default), the table is formatted as CSV data with the following columns - field,value,count,percentage,rank. The rank column is 1-based and is calculated based on the count of the values, with the most frequent having a rank of 1. In case of ties, the rank is calculated based on the rank-strategy option - "dense" (default), "min", "max", "ordinal", or "average". Only the top N values (set by the --limit option) are computed, with the rest of the values grouped into an "Other" category with a special rank of 0. The "Other" category includes the count of remaining unique values that are not in the top N values. In JSON output mode, the table is formatted as nested JSON data. In addition to the columns above, the JSON output also includes the row count, field count, rank-strategy, each field\'s data type, cardinality, nullcount, sparsity, uniqueness_ratio and its stats. Since this command computes an exact frequency distribution table, memory proportional to the cardinality of each column would be normally required. However, this is problematic for columns with ALL unique values (e.g. an ID column), as the command will need to allocate memory proportional to the column\'s cardinality. To overcome this, the frequency command uses several mechanisms: STATS CACHE: If the stats cache exists for the input file, it is used to get column cardinality information. This short-circuits frequency compilation for columns with all unique values (i.e. where rowcount == cardinality), eliminating the need to maintain an in-memory hashmap for ID columns. This allows `frequency` to handle larger-than-memory datasets with the added benefit of also making it faster when working with datasets with ID columns. That\'s why for MAXIMUM PERFORMANCE, it\'s HIGHLY RECOMMENDED to create an index (`qsv index data.csv`) and pre-populate the stats cache (`qsv stats data.csv --cardinality --stats-jsonl`) BEFORE running `frequency`. MEMORY-AWARE CHUNKING: When working with large datasets, memory-aware chunking is automatically enabled. Chunk size is dynamically calculated based on available memory and record sampling. You can override this behavior by setting the QSV_FREQ_CHUNK_MEMORY_MB environment variable. (set to 0 for dynamic sizing, or a positive number for a fixed memory limit per chunk, or any non-u64 value (e.g. -1 or "auto") for CPU-based chunking (1 chunk = num records/number of CPUs)), or by setting the --jobs option. "COMPLETE" FREQUENCY TABLES FOR ID COLUMNS: By default, ID columns will have an `<ALL UNIQUE>` value with count equal to rowcount and percentage set to 100 with a rank of 0. This is done by using the stats cache to fetch each column\'s cardinality - allowing qsv to short-circuit frequency compilation and eliminate the need to maintain a hashmap for ID columns. If you wish to compile a "complete" frequency table even for ID columns, set QSV_STATSCACHE_MODE to "none". This will force the frequency command to compute frequencies for all columns regardless of cardinality, even for ID columns. In this case, the unique limit (--unq-limit) option is particularly useful when a column has all unique values  and --limit is set to 0. Without a unique limit, the frequency table for that column will be the same as the number of rows in the data. With a unique limit, the frequency table will be a sample of N unique values, all with a count of 1. The --lmt-threshold option also allows you to apply the --limit and --unq-limit options only when the number of unique items in a column >= threshold. This is useful when you want to apply limits only to columns with a large number of unique items and not to columns with a small number of unique items. For examples, see https://github.com/dathere/qsv/blob/master/tests/test_frequency.rs. See also https://github.com/dathere/qsv/wiki/Aggregation-and-Statistics#frequency (Docs: https://github.com/dathere/qsv/blob/master/docs/help/frequency.md)',
            action: 'Frequency',
          },
          {
            name: 'Get (get)',
            value: 'get',
            description: 'Get tabular data from various sources into a managed, queryable disk cache. `get` fetches a resource once, stores it compressed (zstd) and content-addressed (BLAKE3) in the qsv cache, auto-builds a qsv index for it (for instant random access & exact record counts), and records rich metadata (ETag, Last-Modified, sizes, record count, TTL). Re-fetches send a conditional request (ETag/Last-Modified) so unchanged resources are revalidated, not re-downloaded. Large remote resources stream into the cache as parallel byte-ranges (tune with the QSV_GET_PART_SIZE and QSV_GET_CONCURRENCY env vars). Once cached, a resource can be read by ANY qsv command using the `dc:` prefix, e.g. `qsv stats dc:data.csv`. Stale `dc:` entries are auto-refreshed. A glob (e.g. data/*.csv) or directory source fetches every matching tabular file (.csv/.tsv/.tab/.ssv) — supported for local paths and (with the get_cloud feature) cloud buckets/prefixes. --name is ignored when a source expands to multiple files. Supported sources: local file path, directory, or glob (e.g. /data/*.csv) http:// or https:// URL dathere://<path>          datHere qsv-lookup-tables repo ckan://<id>               a CKAN resource by id ckan://<name>?            a CKAN resource by name (resource_search) s3://<bucket>/<key>       AWS S3 / S3-compatible       (get_cloud feature) gs://<bucket>/<key>       Google Cloud Storage         (get_cloud feature) az://<container>/<key>    Azure Blob Storage           (get_cloud feature) Cloud credentials are read from the standard AWS_*/AZURE_*/GOOGLE_* environment variables (and IAM roles); use --cloud-opt for one-off overrides such as region or endpoint. (sftp:// is planned for a later release.) `--sample` PREVIEW vs the `sample` command: `get --sample N` is a cheap PEEK — it streams just the first N rows from the head (stopping early, so a huge remote file is barely touched) and caches nothing. It is NOT a statistical sample. For a random, representative subset use `qsv sample` instead (which downloads the whole remote file first, except for its streaming --bernoulli method). (Docs: https://github.com/dathere/qsv/blob/master/docs/help/get.md)',
            action: 'Get',
          },
          {
            name: 'Geocode (geocode) [Feature: geocode]',
            value: 'geocode',
            description: 'Geocodes a location in CSV data against an updatable local copy of the Geonames cities index and a local copy of the MaxMind GeoLite2 City database. The Geonames cities index can be retrieved and updated using the `geocode index-*` subcommands. The GeoLite2 City database will need to be MANUALLY downloaded from MaxMind. Though it is free, you will need to create a MaxMind account to download the GeoIP2 Binary database (mmdb) from https://www.maxmind.com/en/accounts/current/geoip/downloads. Copy the GeoLite2-City.mmdb file to the ~/.qsv-cache/ directory or point to it using the QSV_GEOIP2_FILENAME environment variable. When you run the command for the first time, it will download a prebuilt Geonames cities index from the qsv GitHub repo and use it going forward. You can operate on the local index using the `geocode index-*` subcommands. By default, the prebuilt index uses the Geonames Gazeteer cities15000.zip file using English names. It contains cities with populations > 15,000 (about ~26k cities). See https://download.geonames.org/export/dump/ for more information. It has twelve major subcommands: * suggest        - given a partial City name, return the closest City\'s location metadata per the local Geonames cities index (Jaro-Winkler distance) * suggestnow     - same as suggest, but using a partial City name from the command line, instead of CSV data. * reverse        - given a WGS-84 location coordinate, return the closest City\'s location metadata per the local Geonames cities index. (Euclidean distance - shortest distance "as the crow flies") * reversenow     - sames as reverse, but using a coordinate from the command line, instead of CSV data. * countryinfo    - returns the country information for the ISO-3166 2-letter country code (e.g. US, CA, MX, etc.) * countryinfonow - same as countryinfo, but using a country code from the command line, instead of CSV data. * iplookup       - given an IP address or URL, return the closest City\'s location metadata per the local Maxmind GeoLite2 City database. * iplookupnow    - same as iplookup, but using an IP address or URL from the command line, instead of CSV data. * opencage       - ONLINE forward/reverse geocoding using the OpenCage API. Forward-geocodes a free-form address, or reverse-geocodes a "lat, long" coordinate. Requires an OpenCage API key. * opencagenow    - same as opencage, but using an address/coordinate from the command line, instead of CSV data. * index-*        - operations to update the local Geonames cities index. (index-check, index-update, index-load & index-reset) * cache-*        - operations to manage the persistent on-disk OpenCage result cache. (cache-clear, cache-prune & cache-info) (Docs: https://github.com/dathere/qsv/blob/master/docs/help/geocode.md)',
            action: 'Geocode',
          },
          {
            name: 'Geoconvert (geoconvert) [Feature: geocode]',
            value: 'geoconvert',
            description: 'Convert between various spatial formats and CSV/SVG including GeoJSON, SHP, and more. For example to convert a GeoJSON file into CSV data: $ qsv geoconvert file.geojson geojson csv To use stdin as input instead of a file path, use a dash "-": $ qsv prompt -m "Choose a GeoJSON file" -F geojson | qsv geoconvert - geojson csv To convert a CSV file into GeoJSON data, specify the WKT geometry column with the --geometry flag: $ qsv geoconvert file.csv csv geojson --geometry geometry Alternatively specify the latitude and longitude columns with the --latitude and --longitude flags: $ qsv geoconvert file.csv csv geojson --latitude lat --longitude lon See also https://github.com/dathere/qsv/wiki/Geospatial#geoconvert (Docs: https://github.com/dathere/qsv/blob/master/docs/help/geoconvert.md)',
            action: 'Geoconvert',
          },
          {
            name: 'Headers (headers)',
            value: 'headers',
            description: 'Prints the fields of the first row in the CSV data. These names can be used in commands like \'select\' to refer to columns in the CSV data. Note that multiple CSV files may be given to this command. This is useful with the --union flag. For examples, see https://github.com/dathere/qsv/blob/master/tests/test_headers.rs. See also https://github.com/dathere/qsv/wiki/Selection-and-Inspection#headers (Docs: https://github.com/dathere/qsv/blob/master/docs/help/headers.md)',
            action: 'Headers',
          },
          {
            name: 'Implode (implode)',
            value: 'implode',
            description: 'Implodes multiple rows into one by grouping on key column(s) and joining the values of another column with the given separator. The inverse of `explode`. (Docs: https://github.com/dathere/qsv/blob/master/docs/help/implode.md)',
            action: 'Implode',
          },
          {
            name: 'Index (index)',
            value: 'index',
            description: 'Creates an index of the given CSV data, which can make other operations like slicing, splitting and gathering statistics much faster. Note that this does not accept CSV data on stdin. You must give a file path. The index is created at \'path/to/input.csv.idx\'. The index will be automatically used by commands that can benefit from it. If the original CSV data changes after the index is made, commands that try to use it will result in an error (you have to regenerate the index before it can be used again). However, if the environment variable QSV_AUTOINDEX_SIZE is set, qsv will automatically create an index when the input file size >= specified size (bytes). It will also automatically update stale indices as well. See also https://github.com/dathere/qsv/wiki/Indexing-Compression-Diff#index (Docs: https://github.com/dathere/qsv/blob/master/docs/help/index.md)',
            action: 'Index',
          },
          {
            name: 'Input (input)',
            value: 'input',
            description: 'Read CSV data with special commenting, quoting, trimming, line-skipping & non UTF-8 encoding rules and transforms it to a "normalized", UTF-8 encoded CSV. Generally, all qsv commands support basic options like specifying the delimiter used in CSV data. However, this does not cover all possible types of CSV data. For example, some CSV files don\'t use \'"\' for quotes or use different escaping styles. Also, CSVs with preamble lines can have them skipped with the --skip-lines & --auto-skip options. Similarly, --skip-lastlines allows epilogue lines to be skipped. Finally, non UTF-8 encoded files are "lossy" saved to UTF-8 by default, replacing all invalid UTF-8 sequences with �. Note though that this is not true transcoding. If you need to properly transcode non UTF-8 files, you\'ll need to use a tool like `iconv` before processing it with qsv - e.g. to convert an ISO-8859-1 encoded file to UTF-8: `iconv -f ISO-8859-1 -t UTF-8 input.csv -o utf8_output.csv`. You can change this behavior with the --encoding-errors option. See https://github.com/dathere/qsv#utf-8-encoding for more details. This command is typically used at the beginning of a data pipeline (thus the name `input`) to normalize & prepare CSVs for further processing with other qsv commands. For examples, see https://github.com/dathere/qsv/blob/master/tests/test_input.rs. See also https://github.com/dathere/qsv/wiki/Transform-and-Reshape#input (Docs: https://github.com/dathere/qsv/blob/master/docs/help/input.md)',
            action: 'Input',
          },
          {
            name: 'Join (join)',
            value: 'join',
            description: 'Joins two sets of CSV data on the specified columns. The default join operation is an \'inner\' join. This corresponds to the intersection of rows on the keys specified. Joins are always done by ignoring leading and trailing whitespace. By default, joins are done case sensitively, but this can be disabled with the --ignore-case flag. For examples, see https://github.com/dathere/qsv/blob/master/tests/test_join.rs. See also https://github.com/dathere/qsv/wiki/Joins-and-Set-Ops#join (Docs: https://github.com/dathere/qsv/blob/master/docs/help/join.md)',
            action: 'Join',
          },
          {
            name: 'Joinp (joinp) [Feature: polars]',
            value: 'joinp',
            description: 'Joins two sets of CSV data on the specified columns using the Polars engine. The default join operation is an \'inner\' join. This corresponds to the intersection of rows on the keys specified. Unlike the join command, joinp can process files larger than RAM, is multithreaded, has join key validation, a maintain row order option, pre-join filtering, supports non-equi & asof joins and its output columns can be coalesced (no duplicate columns). Returns the shape of the join result (number of rows, number of columns) to stderr. For examples, see https://github.com/dathere/qsv/blob/master/tests/test_joinp.rs. See also https://github.com/dathere/qsv/wiki/Joins-and-Set-Ops#joinp (Docs: https://github.com/dathere/qsv/blob/master/docs/help/joinp.md)',
            action: 'Joinp',
          },
          {
            name: 'Json (json)',
            value: 'json',
            description: 'Convert JSON to CSV. The JSON data is expected to be non-empty and non-nested as either: 1. An array of objects where: A. All objects are non-empty, have non-empty and unique keys, and the same keys are in each object. B. Values are not objects or arrays. 2. An object where values are not objects or arrays and the object is as described above. Objects with duplicate keys are not recommended as only one key and its values may be used. If your JSON data is not in the expected format and/or is nested or complex, try using the --jaq option to pass a jq-like filter before parsing with the above constraints. Learn more about jaqhere: https://github.com/01mf02/jaq As an example, say we have the following JSON data in a file fruits.json: [ { "fruit": "apple", "price": 2.50, "calories": 95 }, { "fruit": "banana", "price": 3.00, "calories": 105 } ] To convert it to CSV format run: $ qsv json fruits.json And the following is printed to the terminal: fruit,price,calories apple,2.5,95 banana,3.0,105 IMPORTANT: The order of the columns in the CSV file will be the same as the order of the keys in the first JSON object. The order of the rows in the CSV file will be the same as the order of the objects in the JSON array. Additional keys not present in the first JSON object will be appended as additional columns in the output CSV in the order they appear. For example, say we have the following JSON data in a file fruits2.json: [ { "fruit": "apple", "cost": 1.75, "price": 2.50, "calories": 95 }, { "fruit": "mangosteen", "price": 5.00, "calories": 56 }, { "fruit": "starapple", "rating": 9, "price": 4.50, "calories": 95, }, { "fruit": "banana", "price": 3.00, "calories": 105 } ] If we run the following command: $ qsv json fruits2.json | qsv table The output CSV will have the following columns: fruit       cost  price  calories  rating apple       1.75  2.5    95 mangosteen        5.0    56 starapple         4.5    95        9 banana            3.0    105 Note that the "rating" column is added as an additional column in the output CSV, though it appears as the 2nd column in the third JSON object for "starapple". If you want to select/reorder/drop columns in the output CSV, use the --select option, for example: $ qsv json fruits.json --select price,fruit The following is printed to the terminal: price,fruit 2.5,apple 3.0,banana Note: Trailing zeroes in decimal numbers from the input data are truncated (2.50 becomes 2.5) because JSON decimals (numbers with a fractional part or exponent) round-trip through f64. Plain integer tokens are preserved exactly (serde_json parses them as i64/u64). With --jaq, integers that don\'t fit i64/u64 are emitted verbatim as strings to avoid silent precision loss, and decimal literals written inside the --jaq filter expression itself are passed through verbatim (2.50 stays 2.50, scientific notation is kept as written). If the JSON data was provided using stdin then either use - or do not provide a file path. For example you may copy the JSON data above to your clipboard then run: $ qsv clipboard | qsv json Again, when JSON data is nested or complex, try using the --jaq option and provide a filter value. For example we have a .json file with a "data" key and the value being the same array as before: { "data": [...] } We may run the following to select the JSON file and convert the nested array to CSV: $ qsv prompt -F json | qsv json --jaq .data For more examples, see https://github.com/dathere/qsv/blob/master/tests/test_json.rs. See also https://github.com/dathere/qsv/wiki/Conversion-and-IO#json (Docs: https://github.com/dathere/qsv/blob/master/docs/help/json.md)',
            action: 'Json',
          },
          {
            name: 'Jsonl (jsonl)',
            value: 'jsonl',
            description: 'Convert newline-delimited JSON (JSONL/NDJSON) to CSV. The command tries to do its best but since it is not possible to straightforwardly convert JSON lines to CSV, the process might lose some complex fields from the input. Also, it will fail if the JSON documents are not consistent with one another, as the first JSON line will be used to infer the headers of the CSV output. For examples, see https://github.com/dathere/qsv/blob/master/tests/test_jsonl.rs. See also https://github.com/dathere/qsv/wiki/Conversion-and-IO#jsonl (Docs: https://github.com/dathere/qsv/blob/master/docs/help/jsonl.md)',
            action: 'Jsonl',
          },
          {
            name: 'Luau (luau) [Feature: luau]',
            value: 'luau',
            description: 'Create multiple new computed columns, filter rows or compute aggregations by executing a Luau 0.728 script for every row (SEQUENTIAL MODE) or for specified rows (RANDOM ACCESS MODE) of a CSV file. Luau is not just another qsv command. It is qsv\'s Domain-Specific Language (DSL) for data-wrangling. 👑 The executed Luau has 3 ways to reference row columns (as strings): 1. Directly by using column name (e.g. Amount), can be disabled with --no-globals 2. Indexing col variable by column name: col.Amount or col["Total Balance"] 3. Indexing col variable by column 1-based index: col[1], col[2], etc. This is only available with the --colindex or --no-headers options. Of course, if your input has no headers, then 3. will be the only available option. It has two subcommands: map     - Create new columns by mapping the result of a Luau script for each row. filter  - Filter rows by executing a Luau script for each row. Rows that return true are kept, the rest are filtered out. Some examples: Sum numeric columns \'a\' and \'b\' and call new column \'c\' $ qsv luau map c "a + b" $ qsv luau map c "col.a + col[\'b\']" $ qsv luau map c --colindex "col[1] + col[2]" There is some magic in the previous example as \'a\' and \'b\' are passed in as strings (not numbers), but Luau still manages to add them up. A more explicit way of doing it, is by using the tonumber() function. See https://luau-lang.org/library for a list of built-in functions. $ qsv luau map c "tonumber(a) + tonumber(b)" Add running total column for Amount $ qsv luau map Total "tot = (tot or 0) + Amount; return tot" Or use the --begin and --end options to compute the running & grand totals $ qsv luau map Total --begin "tot = 0; gtotal = 0" \\ "tot = tot + Amount; gtotal = gtotal + tot; return tot" --end "return gtotal" Add running total column for Amount when previous balance was 900 $ qsv luau map Total "tot = (tot or 900) + Amount; return tot" Use the qsv_cumsum() helper function to compute the running total. See https://github.com/dathere/qsv/wiki/Luau-Helper-Functions-Examples for more examples. $ qsv luau map Total "qsv_cumsum(Amount)" Convert Amount to always-positive AbsAmount and Type (debit/credit) columns $ qsv luau map Type \\ "if tonumber(Amount) < 0 then return \'debit\' else return \'credit\' end" | \\ Map multiple new columns in one pass $ qsv luau map newcol1,newcol2,newcol3 "{cola + 1, colb + 2, colc + 3}" Filter some rows based on numerical filtering $ qsv luau filter "tonumber(a) > 45" $ qsv luau filter "tonumber(a) >= tonumber(b)" PATTERN MATCHING WITH string.find AND OTHER STRING FUNCTIONS: Lua/Luau string functions like string.find, string.match, string.gsub use PATTERN MATCHING by default, where certain characters have special meanings: ( ) . % + - * ? [ ] ^ $ (Docs: https://github.com/dathere/qsv/blob/master/docs/help/luau.md)',
            action: 'Luau',
          },
          {
            name: 'Moarstats (moarstats)',
            value: 'moarstats',
            description: 'Add dozens of additional statistics, including extended outlier, robust & bivariate statistics to an existing stats CSV file. It also maps the field type to the most specific W3C XML Schema Definition (XSD) datatype (https://www.w3.org/TR/xmlschema-2/). IMPORTANT: The `moarstats` command is designed to be run AFTER the `stats` command, as it relies on the baseline statistics computed by `stats` to calculate "moar" statistics. The `moarstats` command extends an existing stats CSV file (created by the `stats` command) by computing "moar" (https://www.dictionary.com/culture/slang/moar) statistics that can be derived from existing stats columns and by scanning the original CSV file. It looks for the `<FILESTEM>.stats.csv` file for a given CSV input. If the stats CSV file does not exist, it will first run the `stats` command with configurable options to establish the baseline stats, to which it will add more stats columns. If the `.stats.csv` file is found, it will skip running stats and just append the additional stats columns. Currently computes the following 25 additional univariate statistics: 1. Pearson\'s Second Skewness Coefficient: 3 * (mean - median) / stddev Measures asymmetry of the distribution. Positive values indicate right skew, negative values indicate left skew. https://en.wikipedia.org/wiki/Skewness 2. Range to Standard Deviation Ratio: range / stddev Normalizes the spread of data. Higher values indicate more extreme outliers relative to the variability. 3. Quartile Coefficient of Dispersion: (Q3 - Q1) / (Q3 + Q1) Measures relative variability using quartiles. Useful for comparing dispersion across different scales. https://en.wikipedia.org/wiki/Quartile_coefficient_of_dispersion 4. Z-Score of Mode: (mode - mean) / stddev Indicates how typical the mode is relative to the distribution. Values near 0 suggest the mode is near the mean. 5. Relative Standard Error: sem / mean Measures precision of the mean estimate relative to its magnitude. Lower values indicate more reliable estimates. 6. Z-Score of Min: (min - mean) / stddev Shows how extreme the minimum value is. Large negative values indicate outliers or heavy left tail. 7. Z-Score of Max: (max - mean) / stddev Shows how extreme the maximum value is. Large positive values indicate outliers or heavy right tail. 8. Median-to-Mean Ratio: median / mean Indicates skewness direction. Ratio < 1 suggests right skew, > 1 suggests left skew, = 1 suggests symmetry. 9. IQR-to-Range Ratio: iqr / range Measures concentration of data. Higher values (closer to 1) indicate more data concentrated in the middle 50%. 10. MAD-to-StdDev Ratio: mad / stddev Compares robust vs non-robust spread measures. Higher values suggest presence of outliers affecting stddev. 11. Trimean: (Q1 + 2*median + Q3) / 4 Tukey\'s trimean - a robust estimator of central tendency combining the median with the midhinge. More robust than mean, more efficient than median alone. https://en.wikipedia.org/wiki/Trimean 12. Midhinge: (Q1 + Q3) / 2 Midpoint of the middle 50% of data. A robust central tendency measure that complements the mean and median. https://en.wikipedia.org/wiki/Midhinge 13. Robust CV: MAD / |median| Robust Coefficient of Variation using MAD and the magnitude of the median. Always non-negative. Resistant to outliers, useful for comparing variability. https://en.wikipedia.org/wiki/Robust_measures_of_scale 14. Kurtosis: Measures the "tailedness" of the distribution (excess kurtosis). Positive values indicate heavy tails, negative values indicate light tails. Values near 0 indicate a normal distribution. Requires --advanced flag. https://en.wikipedia.org/wiki/Kurtosis 15. Bimodality Coefficient: Measures whether a distribution has two modes (peaks) or is unimodal. BC < 0.555 indicates unimodal, BC >= 0.555 indicates bimodal/multimodal. Computed as (skewness² + 1) / (kurtosis + 3). Requires --advanced flag (needs skewness from base stats and kurtosis from --advanced flag). https://en.wikipedia.org/wiki/Bimodality 16. Jarque-Bera Test: (n/6) * (S² + K²/4) Standard test for normality using skewness and kurtosis. Also computes jarque_bera_pvalue (from chi-squared distribution with 2 df). Low p-values (< 0.05) indicate the data is NOT normally distributed. Requires --advanced flag (needs kurtosis). https://en.wikipedia.org/wiki/Jarque%E2%80%93Bera_test 17. Gini Coefficient: Measures inequality/dispersion in the distribution. Values range from 0 (perfect equality) to 1 (maximum inequality). Requires --advanced flag. https://en.wikipedia.org/wiki/Gini_coefficient 18. Atkinson Index: Measures inequality in the distribution with a sensitivity parameter. Values range from 0 (perfect equality) to 1 (maximum inequality). The Atkinson Index is a more general form of the Gini coefficient that allows for different sensitivity to inequality. Sensitivity is configurable via --epsilon. Requires --advanced flag. https://en.wikipedia.org/wiki/Atkinson_index 19. Theil Index: (1/n) * Σ((x_i / mean) * ln(x_i / mean)) Measures inequality/concentration. Unlike Gini, it is decomposable into within-group and between-group components. Only computed for positive values. Requires --advanced flag. https://en.wikipedia.org/wiki/Theil_index 20. Mean Absolute Deviation (from mean): (1/n) * Σ|x_i - mean| Average absolute distance from the mean. Different from MAD (which uses median). Less robust but more statistically efficient than MAD. Requires --advanced flag. 21. Shannon Entropy: Measures the information content/uncertainty in the distribution. Higher values indicate more diversity, lower values indicate more concentration. Values range from 0 (all values identical) to log2(n) where n is the number of unique values. Requires --advanced flag. https://en.wikipedia.org/wiki/Entropy_(information_theory) 22. Normalized Entropy: Normalized version of Shannon Entropy scaled to [0, 1]. Values range from 0 (all values identical) to 1 (all values equally distributed). Computed as shannon_entropy / log2(cardinality). Requires shannon_entropy (from --advanced flag) and cardinality (from base stats). 23. Simpson\'s Diversity Index: 1 - Σ(p_i²) Probability that two randomly chosen values are different. Ranges from 0 (all identical) to 1 (all unique). More intuitive than entropy. Requires --advanced flag (computed alongside entropy from frequency data). https://en.wikipedia.org/wiki/Diversity_index#Simpson_index 24. Winsorized Mean: Replaces values below/above thresholds with threshold values, then computes mean. All values are included in the calculation, but extreme values are capped at thresholds. https://en.wikipedia.org/wiki/Winsorized_mean Also computes (<PCT> is the threshold suffix of the mean column, e.g. 25pct or 5pct): winsorized_stddev_<PCT>, winsorized_variance_<PCT>, winsorized_cv_<PCT>, winsorized_range_<PCT>, and winsorized_<PCT>_stddev_ratio (winsorized stddev / overall stddev). Note the ratio column interpolates <PCT> before _stddev_ratio, unlike the others. 25. Trimmed Mean: Excludes values outside thresholds, then computes mean. Only values within thresholds are included in the calculation. https://en.wikipedia.org/wiki/Truncated_mean Also computes (<PCT> is the threshold suffix of the mean column, e.g. 25pct or 5pct): trimmed_stddev_<PCT>, trimmed_variance_<PCT>, trimmed_cv_<PCT>, trimmed_range_<PCT>, and trimmed_<PCT>_stddev_ratio (trimmed stddev / overall stddev). Note the ratio column interpolates <PCT> before _stddev_ratio, unlike the others. By default, uses Q1 and Q3 as thresholds (25% winsorization/trimming). With --use-percentiles, uses configurable percentiles (e.g., 5th/95th) as thresholds with --pct-thresholds. In addition, it computes the following univariate outlier statistics (24 outlier statistics total). https://en.wikipedia.org/wiki/Outlier (requires --quartiles or --everything in stats): Outlier Counts (7 statistics): - outliers_extreme_lower_cnt: Count of values below the lower outer fence - outliers_mild_lower_cnt: Count of values between lower outer and inner fences - outliers_normal_cnt: Count of values between inner fences (non-outliers) - outliers_mild_upper_cnt: Count of values between upper inner and outer fences - outliers_extreme_upper_cnt: Count of values above the upper outer fence - outliers_total_cnt: Total count of all outliers (sum of extreme and mild outliers) - outliers_percentage: Percentage of values that are outliers Outlier Descriptive Statistics (6 statistics): - outliers_mean: Mean value of outliers - non_outliers_mean: Mean value of non-outliers - outliers_to_normal_mean_ratio: Ratio of outlier mean to non-outlier mean - outliers_min: Minimum value among outliers - outliers_max: Maximum value among outliers - outliers_range: Range of outlier values (max - min) Outlier Variance/Spread Statistics (7 statistics): - outliers_stddev: Standard deviation of outlier values - outliers_variance: Variance of outlier values - non_outliers_stddev: Standard deviation of non-outlier values - non_outliers_variance: Variance of non-outlier values - outliers_cv: Coefficient of variation for outliers (stddev / mean) - non_outliers_cv: Coefficient of variation for non-outliers (stddev / mean) - outliers_normal_stddev_ratio: Ratio of outlier stddev to non-outlier stddev Outlier Impact Statistics (2 statistics): - outlier_impact: Difference between overall mean and non-outlier mean - outlier_impact_ratio: Relative impact (outlier_impact / non_outlier_mean) Outlier Boundary Statistics (2 statistics): - lower_outer_fence_zscore: Z-score of the lower outer fence boundary - upper_outer_fence_zscore: Z-score of the upper outer fence boundary These outlier statistics require reading the original CSV file and comparing each value against the fence thresholds. Fences are computed using the IQR method: inner fences at Q1/Q3 ± 1.5*IQR, outer fences at Q1/Q3 ± 3.0*IQR. These univariate statistics are only computed for numeric and date/datetime columns where the required base univariate statistics (mean, median, stddev, etc.) are available. Univariate outlier statistics additionally require that quartiles (and thus fences) were computed when generating the stats CSV. Winsorized/trimmed means require either Q1/Q3 or percentiles to be available. Kurtosis, Gini & Atkinson Index require reading the original CSV file to collect all values for computation. BIVARIATE STATISTICS: The `moarstats` command also computes the following 7 bivariate statistics: 1. Pearson\'s correlation Measures linear correlation between two numeric/date fields. Values range from -1 (perfect negative correlation) to +1 (perfect positive correlation). 0 indicates no linear correlation. https://en.wikipedia.org/wiki/Pearson_correlation_coefficient 2. Spearman\'s rank correlation Measures monotonic correlation between two numeric/date fields. Values range from -1 (perfect negative correlation) to +1 (perfect positive correlation). 0 indicates no monotonic correlation. https://en.wikipedia.org/wiki/Spearman%27s_rank_correlation_coefficient 3. Kendall\'s tau Measures monotonic correlation between two numeric/date fields. Values range from -1 (perfect negative correlation) to +1 (perfect positive correlation). 0 indicates no monotonic correlation. https://en.wikipedia.org/wiki/Kendall_rank_correlation_coefficient 4. Covariance Measures the linear relationship between two numeric/date fields. Values range from negative infinity to positive infinity. 0 indicates no linear relationship. https://en.wikipedia.org/wiki/Covariance 5. Mutual Information Measures the amount of information obtained about one field by observing another. Values range from 0 (independent) to positive infinity. https://en.wikipedia.org/wiki/Mutual_information 6. Normalized Mutual Information Normalized version of mutual information, scaled by the geometric mean of individual entropies. Values range from 0 (independent) to 1 (perfectly dependent). https://en.wikipedia.org/wiki/Mutual_information#Normalized_variants 7. Theil\'s U (uncertainty coefficient) Directed measure of how much knowing one field reduces uncertainty about the other. Asymmetric, so two columns are emitted: u_field2_given_field1 and u_field1_given_field2. Values range from 0 (no reduction) to 1 (fully determined). Selected with `u` in --bivariate-stats (or via "all"). https://en.wikipedia.org/wiki/Uncertainty_coefficient These bivariate statistics are computed when the `--bivariate` flag is used and require an indexed CSV file (index will be auto-created if missing). Bivariate statistics are output to a separate file: `<FILESTEM>.stats.bivariate.csv`. Bivariate statistics require reading the entire CSV file and are computationally VERY expensive. For large files (>= 10k records), parallel chunked processing is used when an index is available. For smaller files or when no index exists, sequential processing is used. MULTI-DATASET BIVARIATE STATISTICS: When using the `--join-inputs` flag, multiple datasets can be joined internally before computing bivariate statistics. This allows analyzing bivariate statistics across datasets that share common join keys. The joined dataset is saved as a temporary file that is automatically deleted after computing the bivariate statistics. The bivariate statistics are saved to `<FILESTEM>.stats.bivariate.joined.csv`. Non-finite numeric tokens ("NaN", "Infinity", "-Infinity", and their case variants) are excluded from moarstats computations — the parser in moarstats filters them out before they reach correlation, variance and mean calculations, preventing a single bad cell from silently poisoning the results. Note that the baseline `stats` command may still count these tokens as Float observations, so the `type`/`null_count` columns in `<FILESTEM>.stats.csv` are not affected by this filter. (Docs: https://github.com/dathere/qsv/blob/master/docs/help/moarstats.md)',
            action: 'Moarstats',
          },
          {
            name: 'Partition (partition)',
            value: 'partition',
            description: 'Partitions the given CSV data into chunks based on the value of a column. See `split` command to split a CSV data by row count, by number of chunks or by kb-size. The files are written to the output directory with filenames based on the values in the partition column and the `--filename` flag. Note: To account for case-insensitive file system collisions (e.g. macOS APFS and Windows NTFS), the command will add a number suffix to the filename if the value is already in use. (Docs: https://github.com/dathere/qsv/blob/master/docs/help/partition.md)',
            action: 'Partition',
          },
          {
            name: 'Pivotp (pivotp) [Feature: polars]',
            value: 'pivotp',
            description: 'Pivots or groups CSV data using the Polars engine. PIVOT MODE (with <on-cols>): The pivot operation consists of: - One or more index columns (these will be the new rows) - A column that will be pivoted (this will create the new columns) - A values column that will be aggregated - An aggregation function to apply. Features "smart" aggregation auto-selection. GROUP-BY MODE (without <on-cols>): When <on-cols> is omitted, performs a group-by aggregation instead of a pivot. This is useful for simple aggregations like counting rows per group. In group-by mode, --index is required and --agg smart resolves to len (count). The none aggregation is not supported in group-by mode. If --values is omitted, a single "count" column is produced. For examples, see https://github.com/dathere/qsv/blob/master/tests/test_pivotp.rs. See also https://github.com/dathere/qsv/wiki/SQL-and-Polars#pivotp (Docs: https://github.com/dathere/qsv/blob/master/docs/help/pivotp.md)',
            action: 'Pivotp',
          },
          {
            name: 'Pragmastat (pragmastat)',
            value: 'pragmastat',
            description: 'Pragmatic statistical toolkit. Compute robust, median-of-pairwise statistics from the Pragmastat library. Designed for messy, heavy-tailed, or outlier-prone data where mean/stddev can mislead. This is a "smart" command that uses the stats cache to work smarter & faster. When a stats cache is available, non-numeric columns are automatically filtered out (unless --select is explicitly provided) and Date/DateTime columns are supported. By default, one-sample mode appends 7 ps_* columns to the .stats.csv cache file (like moarstats). Use --standalone for the old standalone CSV output. Two-sample, compare1, and compare2 modes always produce standalone output. Input handling * Only finite numeric values are used; non-numeric/NaN/Inf are ignored. * Date/DateTime columns are supported when a stats cache is available (run "qsv stats -E --infer-dates --stats-jsonl" first). Dates are converted to epoch milliseconds for analysis, then center/bounds are formatted as dates and spread/shift as days. * Each column is treated as its own sample (two-sample compares columns, not rows). * Non-numeric columns appear with n=0 and empty estimator cells. * NOTE: This command loads all numeric values into memory. ONE-SAMPLE OUTPUT (default, per selected column) field, n, center, spread, center_lower, center_upper, spread_lower, spread_upper center             Robust location; median of pairwise averages (Hodges-Lehmann). Like the mean but stable with outliers; tolerates up to 29% corrupted data. spread             Robust dispersion; median of pairwise absolute differences (Shamos). Same units as data; also tolerates up to 29% corrupted data. center_lower/upper Bounds for center with error rate = misrate (exact under weak symmetry). Use 1e-3 for everyday analysis or 1e-6 for critical decisions. spread_lower/upper Bounds for spread with error rate = misrate (randomized). TWO-SAMPLE OUTPUT (--twosample, per unordered column pair) field_x, field_y, n_x, n_y, shift, ratio, disparity, shift_lower, shift_upper, ratio_lower, ratio_upper, disparity_lower, disparity_upper shift                 Robust difference in location; median of pairwise differences. Negative => first column tends to be lower. ratio                 Robust multiplicative ratio; exp(shift(log x, log y)). Use for positive-valued quantities (latency, price, concentration). disparity             Robust effect size = shift / (average spread of x and y). shift_lower/upper     Bounds for shift (exact; ties may be conservative). If bounds exclude 0, the shift is reliable. ratio_lower/upper     Bounds for ratio (exact; requires all values > 0). If bounds exclude 1, the ratio is reliable. disparity_lower/upper Bounds for disparity (randomized, Bonferroni combination). If bounds exclude 0, the disparity is reliable. When values are blank * Column has no numeric data (n=0). * Positivity required: ratio, ratio_* need all values > 0. * Date/DateTime pairs: ratio is suppressed for --twosample and --compare2 because it depends on the arbitrary 1970 epoch origin and isn\'t meaningful for dates. shift, disparity, and their bounds remain populated. * Sparity required: spread/spread_*/disparity/disparity_* need real variability (not tie-dominant). * Bounds require enough data for requested misrate; try higher misrate or more data. (Docs: https://github.com/dathere/qsv/blob/master/docs/help/pragmastat.md)',
            action: 'Pragmastat',
          },
          {
            name: 'Pro (pro)',
            value: 'pro',
            description: 'Interact with qsv pro API. Learn more about qsv pro at: https://qsvpro.dathere.com. - qsv pro must be running for this command to work as described. - Some features of this command require a paid plan of qsv pro and may require an Internet connection. The qsv pro command has subcommands: lens:     Run csvlens on a local file in a new Alacritty terminal emulator window (Windows only). workflow: Import a local file into the qsv pro Workflow (Workflow must be open). See also https://github.com/dathere/qsv/wiki/Integrations#qsv-pro-bridge (Docs: https://github.com/dathere/qsv/blob/master/docs/help/pro.md)',
            action: 'Pro',
          },
          {
            name: 'Profile (profile) [Feature: profile]',
            value: 'profile',
            description: 'Profile a CSV (local path or URL) and emit a `.metadata.json` file carrying five top-level blocks: `dpp`        — inferred dataset signals: lat/lon/date columns, file size, row count, encoding, etc. (the legacy datapusher-plus inference block). `stats`      — per-column summary statistics from `qsv stats`. `frequency`  — per-column value counts from `qsv frequency`. `ckan`       — a CKAN-shaped block (package + resources) that datapusher-plus consumes to prepopulate CKAN packages. `projection` — the dataset re-expressed in the active profile\'s metadata vocabulary. Default is DCAT-US v3; bundled alternates are dcat-ap-v3 (EU portals), croissant (ML/AI registries) and geoconnex (water-data federations). Consumable directly by data.gov harvesters, EU DCAT-AP catalogs, mlcommons / Hugging Face / Kaggle, and Internet of Water tooling. Behind the scenes qsv runs the same statistical + frequency analysis datapusher-plus (DP+) runs in CKAN, builds a Jinja2 evaluation context from the results, and — when an optional CKAN scheming YAML spec is supplied — evaluates the spec\'s `formula` / `suggestion_formula` templates against that context. Jinja2 helpers and filters are a native Rust port of DP+\'s `jinja2_helpers.py`, built on `minijinja`. When the input is a URL whose response carries DCAT markup (HTTP `Link: rel=describedBy`), qsv discovers the publisher\'s stated metadata and merges it as a base layer beneath the inferred projection. For an example CKAN scheming YAML spec, see: https://github.com/dathere/datapusher-plus/blob/main/ckanext/datapusher_plus/dataset-druf.yaml For more extensive examples, see https://github.com/dathere/qsv/blob/master/tests/test_profile.rs. See also https://github.com/dathere/qsv/wiki/Metadata-Profiling (Docs: https://github.com/dathere/qsv/blob/master/docs/help/profile.md)',
            action: 'Profile',
          },
          {
            name: 'Pseudo (pseudo)',
            value: 'pseudo',
            description: 'Pseudonymise the value of a given column by replacing it with an incremental identifier. See https://en.wikipedia.org/wiki/Pseudonymization Once a value is pseudonymised, it will always be replaced with the same identifier. This means that the same value will always be replaced with the same identifier, even if it appears in different rows. The incremental identifier is generated by using the given format string and the starting number and increment. (Docs: https://github.com/dathere/qsv/blob/master/docs/help/pseudo.md)',
            action: 'Pseudo',
          },
          {
            name: 'Rename (rename)',
            value: 'rename',
            description: 'Rename the columns of a CSV efficiently. It has two modes of operation: Positional mode (default): The new column names are given as a comma-separated list of names. The number of column names given MUST match the number of columns in the CSV unless "_all_generic" is used. Pairwise mode: The new column names are given as a comma-separated list of pairs of old and new column names. The format is "old1,new1,old2,new2,...". (Docs: https://github.com/dathere/qsv/blob/master/docs/help/rename.md)',
            action: 'Rename',
          },
          {
            name: 'Replace (replace)',
            value: 'replace',
            description: 'Replace occurrences of a pattern across a CSV file. You can of course match groups using parentheses and use those in the replacement string. But don\'t forget to escape your $ in bash by using a backslash or by wrapping the replacement string into single quotes: $ qsv replace \'hel(lo)\' \'hal$1\' file.csv $ qsv replace "hel(lo)" "hal\\$1" file.csv Returns exitcode 0 when replacements are done, returning number of replacements to stderr. Returns exitcode 1 when no replacements are done, unless the \'--not-one\' flag is used. When the CSV is indexed, a faster parallel replace is used. If there were any replacements, the index will be refreshed. (Docs: https://github.com/dathere/qsv/blob/master/docs/help/replace.md)',
            action: 'Replace',
          },
          {
            name: 'Reverse (reverse)',
            value: 'reverse',
            description: 'Reverses rows of CSV data. Useful for cases when there is no column that can be used for sorting in reverse order, or when keys are not unique and order of rows with the same key needs to be preserved. Note that if the CSV is not indexed, this operation will require reading all of the CSV data into memory See also https://github.com/dathere/qsv/wiki/Transform-and-Reshape#reverse (Docs: https://github.com/dathere/qsv/blob/master/docs/help/reverse.md)',
            action: 'Reverse',
          },
          {
            name: 'Safenames (safenames)',
            value: 'safenames',
            description: 'Modify headers of a CSV to only have "safe" names - guaranteed "database-ready" names (optimized specifically for PostgreSQL column identifiers). Fold to lowercase. Trim leading & trailing whitespaces. Replace whitespace/non-alphanumeric characters with _. If name starts with a number & check_first_char is true, prepend the unsafe prefix. If a header with the same name already exists, append a sequence suffix (e.g. col, col_2, col_3). Names are limited to 60 bytes in length (snapped to UTF-8 char boundary, including any duplicate-disambiguation suffix). Empty names are replaced with the unsafe prefix. In addition, specifically because of CKAN Datastore requirements: - Headers with leading underscores are replaced with "unsafe_" prefix. - Headers that are named "_id" are renamed to "reserved__id". These CKAN Datastore options can be configured via the --prefix & --reserved options, respectively. In Always (a) and Conditional (c) mode, returns number of modified headers to stderr, and sends CSV with safe headers output to stdout. In Verify (v) mode, returns number of unsafe headers to stderr. In Verbose (V) mode, returns number of headers; duplicate count and unsafe & safe headers to stderr. No stdout output is generated in Verify and Verbose mode. In JSON (j) mode, returns Verbose mode info in minified JSON to stdout. In Pretty JSON (J) mode, returns Verbose mode info in pretty printed JSON to stdout. Given data.csv: c1,12_col,Col with Embedded Spaces,,Column!@Invalid+Chars,c1 1,a2,a3,a4,a5,a6 $ qsv safenames data.csv c1,unsafe_12_col,col_with_embedded_spaces,unsafe_,column__invalid_chars,c1_2 1,a2,a3,a4,a5,a6 stderr: 5 Conditionally rename headers, allowing "quoted identifiers": $ qsv safenames --mode c data.csv c1,unsafe_12_col,Col with Embedded Spaces,unsafe_,column__invalid_chars,c1_2 1,a2,a3,a4,a5,a6 stderr: 4 Verify how many "unsafe" headers are found: $ qsv safenames --mode v data.csv stderr: 4 Verbose mode: $ qsv safenames --mode V data.csv stderr: 6 header/s 1 duplicate/s: "c1:2" 4 unsafe header/s: ["12_col", "Col with Embedded Spaces", "", "Column!@Invalid+Chars"] 1 safe header/s: ["c1"] "Safer" (s) mode - like always, but collapses runs of non-alphanumeric characters into a single _ (note "column_invalid_chars", not "column__invalid_chars"): $ qsv safenames --mode s data.csv c1,unsafe_12_col,col_with_embedded_spaces,unsafe_,column_invalid_chars,c1_2 1,a2,a3,a4,a5,a6 stderr: 5 "Safer" with unicode (S) mode - same as s, but preserves unicode letters & numbers. Given a header "Café #5", "--mode S" yields "café_5", whereas the ASCII "--mode s" strips the accent, yielding "caf_5": $ qsv safenames --mode S data.csv The --collapse & --unicode flags can be combined with ANY mode, including the verify & JSON modes, so the report reflects the "safer" rewrite: $ qsv safenames --mode j --collapse --unicode data.csv Note that even if "Col with Embedded Spaces" is technically safe, it is generally discouraged. Though it can be created as a "quoted identifier" in PostgreSQL, it is still marked "unsafe" by default, unless mode is set to "conditional." It is discouraged because the embedded spaces can cause problems later on. (see https://lerner.co.il/2013/11/30/quoting-postgresql/ for more info). For more examples, see https://github.com/dathere/qsv/blob/master/tests/test_safenames.rs. See also https://github.com/dathere/qsv/wiki/Transform-and-Reshape#safenames (Docs: https://github.com/dathere/qsv/blob/master/docs/help/safenames.md)',
            action: 'Safenames',
          },
          {
            name: 'Sample (sample)',
            value: 'sample',
            description: 'Randomly samples CSV data. It supports ten sampling methods: * RESERVOIR: the default sampling method when NO INDEX is present and no sampling method is specified. Visits every CSV record exactly once, using MEMORY PROPORTIONAL to the sample size (k) - O(k). https://en.wikipedia.org/wiki/Reservoir_sampling * INDEXED: the default sampling method when an INDEX is present and no sampling method is specified. Uses random I/O to sample efficiently, as it only visits records selected by random indexing, using MEMORY PROPORTIONAL to the sample size (k) - O(k). https://en.wikipedia.org/wiki/Random_access * BERNOULLI: the sampling method when the --bernoulli option is specified. Each record has an independent probability p of being selected, where p is specified by the <sample-size> argument. For example, if p=0.1, then each record has a 10% chance of being selected, regardless of the other records. The final sample size is random and follows a binomial distribution. Uses CONSTANT MEMORY - O(1). When sampling from a remote URL, processes the file in chunks without downloading it entirely, making it especially efficient for sampling large remote files. https://en.wikipedia.org/wiki/Bernoulli_sampling * SYSTEMATIC: the sampling method when the --systematic option is specified. Selects every nth record from the input, where n is the integer part of <sample-size> and the fraction part is the percentage of the population to sample. For example, if <sample-size> is 10.5, it will select every 10th record and 50% of the population. If <sample-size> is a whole number (no fractional part), it will select every nth record for the whole population. Uses CONSTANT memory - O(1). The starting point can be specified as "random" or "first". Useful for time series data or when you want evenly spaced samples. https://en.wikipedia.org/wiki/Systematic_sampling * STRATIFIED: the sampling method when the --stratified option is specified. Stratifies the population by the specified column and then samples from each stratum. Particularly useful when a population has distinct subgroups (strata) that are heterogeneous within but homogeneous between in terms of the variable of interest. For example, if you want to sample 1,000 records from a population of 100,000 across the US, you can stratify the population by US state and then sample 20 records from each stratum. This will ensure that you have a representative sample from each of the 50 states. The sample size must be a whole number. Uses MEMORY PROPORTIONAL to the number of strata (s) and samples per stratum (k) as specified by <sample-size> - O(s*k). https://en.wikipedia.org/wiki/Stratified_sampling * WEIGHTED: the sampling method when the --weighted option is specified. Samples records with probabilities proportional to values in a specified weight column. Records with higher weights are more likely to be selected. For example, if you have sales data and want to sample transactions weighted by revenue, high-value transactions will have a higher chance of being included. Non-numeric weights are treated as zero. The weights are automatically normalized using the maximum weight in the dataset. Specify the desired sample size with <sample-size>. Uses MEMORY PROPORTIONAL to the sample size (k) - O(k). "Weighted random sampling with a reservoir" https://doi.org/10.1016/j.ipl.2005.11.003 * VAROPT: the sampling method when the --varopt option is specified. Variance-bounded weighted reservoir sampling using the A-ExpJ keying scheme of Efraimidis and Spirakis (2006). For each record, computes a key u^(1/w) and retains the <sample-size> items with the largest keys. Unlike the --weighted method, it does NOT require a stats cache, runs in a single pass, and supports merge across partitions through the --sketch-out and --sketch-in options. Suitable for heavy-tailed weight distributions where bounded-variance estimators are needed. Uses MEMORY PROPORTIONAL to the sample size (k) - O(k). This is a native Rust implementation written from the original paper; the analogous VarOpt sketches in the Apache DataSketches library use the same family of algorithms but are NOT used here. Algorithm: "Weighted random sampling with a reservoir" doi 10.1016/j.ipl.2005.11.003 * MERGEABLE-RESERVOIR: the sampling method when the --mergeable-reservoir flag is set. Uniform reservoir sample using Vitter\'s Algorithm R. Same statistical distribution as the default RESERVOIR method, but the sampler state is mergeable: a sketch written by one run can be combined with sketches from other runs via the --sketch-out and --sketch-in options, producing a uniform sample of the combined stream WITHOUT re-reading the input files. Useful for sharded or incremental sampling pipelines. Uses MEMORY PROPORTIONAL to the sample size (k) - O(k). Native Rust implementation; the analogous ReservoirItemsSketch in the Apache DataSketches library implements the same algorithm but is NOT used here. See en.wikipedia.org/wiki/Reservoir_sampling * CLUSTER: the sampling method when the --cluster option is specified. Samples entire groups of records together based on a cluster identifier column. The number of clusters is specified by the <sample-size> argument. Useful when records are naturally grouped (e.g., by household, neighborhood, etc.). For example, if you have records grouped by neighborhood and specify a sample size of 10, it will randomly select 10 neighborhoods and include ALL records from those neighborhoods in the output. This ensures that natural groupings in the data are preserved. Uses MEMORY PROPORTIONAL to the number of clusters (c) - O(c). https://en.wikipedia.org/wiki/Cluster_sampling * TIMESERIES: the sampling method when the --timeseries option is specified. Samples records based on time intervals from a time-series dataset. Groups records by time windows (e.g., hourly, daily, weekly) and selects one record per interval. Supports adaptive sampling (e.g., prefer business hours or weekends) and aggregation (e.g., mean, sum, min, max) within each interval. The starting point can be "first" (earliest), "last" (most recent), or "random". Particularly useful for time-series data where simple row-based sampling would always return the same records due to sorting. Uses MEMORY PROPORTIONAL to the number of records - O(n). Supports sampling from CSVs on remote URLs. Note that the entire file is downloaded first to a temporary file before sampling begins for all sampling methods except Bernoulli, which streams the file as it samples it, stopping when the desired sample size is reached or the end of the file is reached. Sampling from stdin is also supported for all sampling methods, copying stdin to a in-memory buffer first before sampling begins. If a stats cache is available, it will be used to do extra checks on systematic, weighted and cluster sampling, and to speed up sampling in general. This command is intended to provide a means to sample from a CSV data set that is too big to fit into memory (for example, for use with commands like \'qsv stats\' with the \'--everything\' option). (Docs: https://github.com/dathere/qsv/blob/master/docs/help/sample.md)',
            action: 'Sample',
          },
          {
            name: 'Schema (schema)',
            value: 'schema',
            description: 'Generate JSON Schema or Polars Schema (with the `--polars` option) from CSV data. JSON Schema Validation: (Docs: https://github.com/dathere/qsv/blob/master/docs/help/schema.md)',
            action: 'Schema',
          },
          {
            name: 'Search (search)',
            value: 'search',
            description: 'Filters CSV data by whether the given regex matches a row. The regex is applied to selected field in each row, and if any field matches, then the row is written to the output, and the number of matches to stderr. The columns to search can be limited with the \'--select\' flag (but the full row is still written to the output if there is a match). Returns exitcode 0 when matches are found. Returns exitcode 1 when no match is found, unless the \'--not-one\' flag is used. Use --count to also write the number of matches to stderr (suppressed by --quiet and --json). When --quick is enabled, no output is produced and exitcode 0 is returned on the first match. When the CSV is indexed, a faster parallel search is used. (Docs: https://github.com/dathere/qsv/blob/master/docs/help/search.md)',
            action: 'Search',
          },
          {
            name: 'Searchset (searchset)',
            value: 'searchset',
            description: 'Filters CSV data by whether the given regex set matches a row. Unlike the search operation, this allows regex matching of multiple regexes in a single pass. The regexset-file is a plain text file with multiple regexes, with a regex on each line. Lines starting with \'#\' (optionally preceded by whitespace) are treated as comments and ignored. For an example scanning for common Personally Identifiable Information (PII) - SSN, credit cards, email, bank account numbers & phones, see https://github.com/dathere/qsv/blob/master/resources/examples/searchset/pii_regexes.txt The regex set is applied to each field in each row, and if any field matches, then the row is written to the output, and the number of matches to stderr. The columns to search can be limited with the \'--select\' flag (but the full row is still written to the output if there is a match). Returns exitcode 0 when matches are found. Returns exitcode 1 when no match is found, unless the \'--not-one\' flag is used. Use --count to also write the number of matches to stderr (suppressed by --quiet). With --json, a JSON summary is always written to stderr instead. When --quick is enabled, no output is produced and exitcode 0 is returned on the first match. When the CSV is indexed, a faster parallel search is used. For examples, see https://github.com/dathere/qsv/blob/master/tests/test_searchset.rs. See also https://github.com/dathere/qsv/wiki/Selection-and-Inspection#searchset (Docs: https://github.com/dathere/qsv/blob/master/docs/help/searchset.md)',
            action: 'Searchset',
          },
          {
            name: 'Select (select)',
            value: 'select',
            description: 'Select columns from CSV data efficiently. This command lets you manipulate the columns in CSV data. You can re-order, duplicate, reverse or drop them. Columns can be referenced by index or by name if there is a header row (duplicate column names can be disambiguated with more indexing). Column ranges can also be specified. Finally, columns can be selected using regular expressions. (Docs: https://github.com/dathere/qsv/blob/master/docs/help/select.md)',
            action: 'Select',
          },
          {
            name: 'Slice (slice)',
            value: 'slice',
            description: 'Returns the rows in the range specified (starting at 0, half-open interval). The range does not include headers. If the start of the range isn\'t specified, then the slice starts from the first record in the CSV data. If the end of the range isn\'t specified, then the slice continues to the last record in the CSV data. This operation can be made much faster by creating an index with \'qsv index\' first. With an index, the command requires parsing just the rows that are sliced. Without an index, all rows up to the first row in the slice must be parsed. (Docs: https://github.com/dathere/qsv/blob/master/docs/help/slice.md)',
            action: 'Slice',
          },
          {
            name: 'Snappy (snappy)',
            value: 'snappy',
            description: 'Does streaming compression/decompression of the input using the Snappy framing format. https://github.com/google/snappy/blob/main/framing_format.txt It has four subcommands: compress:   Compress the input (multithreaded). decompress: Decompress the input (single-threaded). check:      Quickly check if the input is a Snappy file by inspecting the first 50 bytes of the input is valid Snappy data. Returns exitcode 0 if the first 50 bytes is valid Snappy data, exitcode 1 otherwise. validate:   Validate if the ENTIRE input is a valid Snappy file. Returns exitcode 0 if valid, exitcode 1 otherwise. Note that most qsv commands already automatically decompresses Snappy files if the input file has an ".sz" extension. It will also automatically compress the output file (though only single-threaded) if the --output file has an ".sz" extension. This command\'s multithreaded compression is 5-6x faster than qsv\'s automatic single-threaded compression. Also, this command is not specific to CSV data, it can compress/decompress ANY file. For examples, see https://github.com/dathere/qsv/blob/master/tests/test_snappy.rs. See also https://github.com/dathere/qsv/wiki/Conversion-and-IO#snappy (Docs: https://github.com/dathere/qsv/blob/master/docs/help/snappy.md)',
            action: 'Snappy',
          },
          {
            name: 'Sniff (sniff)',
            value: 'sniff',
            description: 'Quickly sniff the first n rows and infer CSV metadata (delimiter, header row, number of preamble rows, quote character, flexible, is_utf8, average record length, number of records, content length and estimated number of records if sniffing a URL, file size, number of fields, field names & data types). `sniff` is also a mime type detector, returning the detected mime type, file size and last modified date. If --no-infer is enabled, it doesn\'t even bother to infer the CSV\'s schema. This makes it useful for accelerated CKAN harvesting and for checking stale/broken resource URLs. When qsv is compiled with the optional `magika` feature, it uses Magika - Google\'s AI-powered content detection library to identify file types with high accuracy. Magika detects over 200 content types including CSV, parquet, MS Office/Open Document files, JSON, PDF, PNG, JPEG & more. See https://opensource.googleblog.com/2025/11/announcing-magika-10-now-faster-smarter.html. When the `magika` feature is not enabled in a build (e.g., MUSL builds, qsvlite, qsvdp), it falls back to the file-format library which provides basic MIME type detection. NOTE: This command "sniffs" a CSV\'s schema by sampling the first n rows (default: 1000) of a file. Its inferences are sometimes wrong if the the file is too small to infer a pattern or if the CSV has unusual formatting - with atypical delimiters, quotes, etc. In such cases, selectively use the --sample, --delimiter and --quote options to improve the accuracy of the sniffed schema. If you want more robust, guaranteed schemata, use the "schema" or "stats" commands instead as they scan the entire file. However, they only work on local files and well-formed CSVs, unlike `sniff` which can work with remote files, various CSV dialects and is very fast regardless of file size. (Docs: https://github.com/dathere/qsv/blob/master/docs/help/sniff.md)',
            action: 'Sniff',
          },
          {
            name: 'Sort (sort)',
            value: 'sort',
            description: 'Sorts CSV data in lexicographical, natural, numerical, reverse, unique or random order. Note that this requires reading all of the CSV data into memory. If you need to sort a large file that may not fit into memory, use the extsort command instead. For examples, see https://github.com/dathere/qsv/blob/master/tests/test_sort.rs. See also https://github.com/dathere/qsv/wiki/Transform-and-Reshape#sort (Docs: https://github.com/dathere/qsv/blob/master/docs/help/sort.md)',
            action: 'Sort',
          },
          {
            name: 'Sortcheck (sortcheck)',
            value: 'sortcheck',
            description: 'Check if a CSV is sorted. The check is done on a streaming basis (i.e. constant memory). With the --json options, also retrieve record count, sort breaks & duplicate count. This command can be used in tandem with other qsv commands that sort or require sorted data to ensure that they also work on a stream of data - i.e. without loading an entire CSV into memory. For instance, a naive `dedup` requires loading the entire CSV into memory to sort it first before deduping. However, if you know a CSV is sorted beforehand, you can invoke `dedup` with the --sorted option, and it will skip loading entire CSV into memory to sort it first. It will just immediately dedupe on a streaming basis. `sort` also requires loading the entire CSV into memory. For very large CSV files that will not fit in memory, `extsort` - a multi-threaded streaming sort that can work with arbitrarily large files - can be used instead. Use --numeric or --natural to verify the file matches the order produced by `sort --numeric` or `sort --natural` before piping into a downstream command (e.g. `dedup --numeric --sorted`). When multiple comparison flags are set, --natural takes precedence over --numeric, which takes precedence over --ignore-case (matching `sort` and `dedup` semantics). Simply put, sortcheck allows you to make informed choices on how to compose pipelines that require sorted data. STATS-CACHE AWARE: when checking a single column with the default lexicographic or --numeric comparison and a valid stats cache exists (see `qsv stats --stats-jsonl`), sortcheck answers "is it sorted?" instantly from the cached sort order instead of scanning the file. This applies only to the exit-code path; --json/--pretty-json always do a full scan for exact counts. Disable with QSV_STATSCACHE_MODE=none. Returns exit code 0 if a CSV is sorted, and exit code 1 otherwise. (Docs: https://github.com/dathere/qsv/blob/master/docs/help/sortcheck.md)',
            action: 'Sortcheck',
          },
          {
            name: 'Split (split)',
            value: 'split',
            description: 'Splits the given CSV data into chunks. It has three modes: by size (rowcount), by number of chunks and by kb-size. See `partition` command for splitting by a column value. When splitting by size, the CSV data is split into chunks of the given number of rows. The last chunk may have fewer rows if the number of records is not evenly divisible by the given rowcount. When splitting by number of chunks, the CSV data is split into the given number of chunks. The number of rows in each chunk is determined by the number of records in the CSV data and the number of desired chunks. If the number of records is not evenly divisible by the number of chunks, the last chunk will have fewer records. When splitting by kb-size, the CSV data is split into chunks of the given size in kilobytes. The number of rows in each chunk may vary, but the size of each chunk will not exceed the desired size. Uses multithreading to go faster if the CSV has an index when splitting by size or by number of chunks. Splitting by kb-size is always done sequentially with a single thread. The default is to split by size with a chunk size of 500. The files are written to the directory given with the name \'{start}.csv\', where {start} is the index of the first record of the chunk (starting at 0). (Docs: https://github.com/dathere/qsv/blob/master/docs/help/split.md)',
            action: 'Split',
          },
          {
            name: 'Scoresql (scoresql) [Feature: polars]',
            value: 'scoresql',
            description: 'Analyze a SQL query against CSV file caches (stats, moarstats, frequency) to produce a performance score with actionable optimization suggestions BEFORE running the query. Accepts the same input/SQL arguments as sqlp. Outputs a human-readable performance report (default) or JSON (--json). Supports Polars mode (default) and DuckDB mode (--duckdb). Scoring factors include: * Query plan analysis (EXPLAIN output from Polars or DuckDB) * Type optimization (column types vs. usage in query) * Join key cardinality and data distribution * Filter selectivity from frequency cache * Query anti-pattern detection (SELECT *, missing LIMIT, cartesian joins, etc.) * Infrastructure checks (index files, cache freshness) Caches are auto-generated when missing: * stats cache via `qsv stats --everything --stats-jsonl` * frequency cache via `qsv frequency --frequency-jsonl` (Docs: https://github.com/dathere/qsv/blob/master/docs/help/scoresql.md)',
            action: 'Scoresql',
          },
          {
            name: 'Sqlp (sqlp) [Feature: polars]',
            value: 'sqlp',
            description: 'Run blazing-fast Polars SQL queries against several CSVs - replete with joins, aggregations, grouping, table functions, sorting, and more - working on larger than memory CSV files directly, without having to load it first into a database. Polars SQL is a PostgreSQL dialect (https://docs.pola.rs/user-guide/sql/intro/), converting SQL queries to ultra-fast Polars LazyFrame expressions (https://docs.pola.rs/user-guide/lazy/). For a list of SQL functions and keywords supported by Polars SQL, see https://docs.pola.rs/py-polars/html/reference/sql/index.html though be aware that it\'s for the Python version of Polars, so there will be some minor syntax differences. Returns the shape of the query result (number of rows, number of columns) to stderr. (Docs: https://github.com/dathere/qsv/blob/master/docs/help/sqlp.md)',
            action: 'Sqlp',
          },
          {
            name: 'Stats (stats)',
            value: 'stats',
            description: 'Compute summary statistics & infers data types for each column in a CSV. IMPORTANT: `stats` is heavily optimized for speed. It ASSUMES the CSV is well-formed & UTF-8 encoded. This allows it to employ numerous performance optimizations (skip repetitive UTF-8 validation, skip bounds checks, cache results, etc.) that may result in undefined behavior if the CSV is not well-formed. All these optimizations are GUARANTEED to work with well-formed CSVs. If you encounter problems generating stats, use `qsv validate` FIRST to confirm the CSV is valid. NOTE: For MAXIMUM PERFORMANCE, create an index for the CSV first with \'qsv index\' to enable multithreading, or set --cache-threshold option or set the QSV_AUTOINDEX_SIZE environment variable to automatically create an index when the file size is greater than the specified size (in bytes). Summary stats include sum, min/max/range, sort order/sortiness, min/max/sum/avg/stddev/variance/cv length, mean, standard error of the mean (SEM), geometric mean, harmonic mean, stddev, variance, coefficient of variation (CV), nullcount, n_negative, n_zero, n_positive, max_precision, sparsity, Median Absolute Deviation (MAD), quartiles, lower/upper inner/outer fences, skewness, median, cardinality/uniqueness ratio, mode/s & "antimode/s" & percentiles. Note that some stats require loading the entire file into memory, so they must be enabled explicitly. By default, the following "streaming" statistics are reported for *every* column: sum, min/max/range values, sort order/"sortiness", min/max/sum/avg/stddev/variance/cv length, mean, sem, geometric_mean, harmonic_mean,stddev, variance, cv, nullcount, n_negative, n_zero, n_positive, max_precision & sparsity. The default set of statistics corresponds to ones that can be computed efficiently on a stream of data (i.e., constant memory) and works with arbitrarily large CSVs. The following additional "non-streaming, advanced" statistics require loading the entire file into memory: cardinality/uniqueness ratio, modes/antimodes, median, MAD, quartiles and its related measures (q1, q2, q3, IQR, lower/upper fences & skewness) and percentiles. When computing "non-streaming" statistics, a memory-aware chunking algorithm is used to dynamically calculate chunk size based on available memory & record sampling. This SHOULD help process arbitrarily large "real-world" files by creating smaller chunks that fit in available memory. However, there is still a chance that the command will run out of memory if the cardinality of several columns is very high. Chunk size is dynamically calculated based on the number of logical CPUs detected. You can override this behavior by setting the QSV_STATS_CHUNK_MEMORY_MB environment variable (set to 0 for dynamic sizing, or a positive number for a fixed memory limit per chunk, or -1 for CPU-based chunking (1 chunk = records/number of CPUs)). "Antimode" is the least frequently occurring non-zero value and is the opposite of mode. It returns "*ALL" if all the values are unique, and only returns a preview of the first 10 antimodes, truncating after 100 characters (configurable with QSV_ANTIMODES_LEN). If you need all the antimode values of a column, run the `frequency` command with --limit set to zero. The resulting frequency table will have all the "antimode" values. Summary statistics for dates are also computed when --infer-dates is enabled, with DateTime results in rfc3339 format and Date results in "yyyy-mm-dd" format in the UTC timezone. Date range, stddev, variance, MAD & IQR are returned in days, not timestamp milliseconds. Each column\'s data type is also inferred (NULL, Integer, String, Float, Date, DateTime and Boolean with --infer-boolean option). For String data types, it also determines if the column is all ASCII characters. Unlike the sniff command, stats\' data type inferences are GUARANTEED, as the entire file is scanned, and not just sampled. Note that the Date and DateTime data types are only inferred with the --infer-dates option as its an expensive operation to match a date candidate against 19 possible date formats, with each format, having several variants. The date formats recognized and its sub-variants along with examples can be found at https://github.com/dathere/qsv-dateparser?tab=readme-ov-file#accepted-date-formats. Computing statistics on a large file can be made MUCH faster if you create an index for it first with \'qsv index\' to enable multithreading. With an index, the file is split into chunks and each chunk is processed in parallel. As stats is a central command in qsv, and can be expensive to compute, `stats` caches results in <FILESTEM>.stats.csv & if the --stats-jsonl option is used, <FILESTEM>.stats.csv.data.jsonl (e.g., qsv stats nyc311.csv will create nyc311.stats.csv; adding --stats-jsonl also creates nyc311.stats.csv.data.jsonl). The arguments used to generate the cached stats are saved in <FILESTEM>.stats.csv.json. If stats have already been computed for the input file with similar arguments and the file hasn\'t changed, the stats will be loaded from the cache instead of recomputing it. These cached stats are also used by other qsv commands (currently `describegpt`, `frequency`, `joinp`, `pivotp`, `schema`, `sqlp` & `tojsonl`) to work smarter & faster. If the cached stats are not current (i.e., the input file is newer than the cached stats), the cached stats will be ignored and recomputed. (Docs: https://github.com/dathere/qsv/blob/master/docs/help/stats.md)',
            action: 'Stats',
          },
          {
            name: 'Synthesize (synthesize) [Feature: synthesize]',
            value: 'synthesize',
            description: 'Generates a synthetic CSV that is statistically faithful to a source CSV. `synthesize` analyzes <input> with `stats` and `frequency`, then emits N rows of fake data that reproduce the source\'s per-column attributes: * Categorical / low-cardinality columns are reproduced by frequency-weighted sampling of their *real* value set — cardinality, weights and repetition structure are preserved exactly. * Numeric and date/datetime columns are reproduced with quartile buckets, so the shape of the distribution (not just its [min,max] range) is preserved. * Null ratios are reproduced per column. When a Data Dictionary is supplied (via --dictionary, or generated on the fly with --infer-content-type), each column\'s semantic Content Type picks a realistic faker (names, emails, addresses, UUIDs, etc.) for columns that are NOT fully enumerated by `frequency`. For bounded-cardinality faker columns (cardinality < requested rows and below an internal cap of 100,000), a fixed pool of distinct fake values is pre-generated and sampled from, so the column\'s cardinality is preserved. For very high cardinality columns above this cap, a fresh fake value is generated per row instead — distinct count is approximate in that case. When `stats` provides string-length statistics (min_length / max_length / avg_length / stddev_length) AND the column is routed to an unstructured text generator (lorem_*, free_text, or the no-faker fallback), synthesized values are truncated so their character lengths follow Normal(avg_length, stddev_length) clamped to [min_length, max_length]. This applies to unstructured pooled values as well — a low-cardinality free-text column still gets its generated pool entries truncated. Structured semantic fakers (email, name, uuid, phone, address parts, etc.) ignore these stats — truncating them would corrupt their format, so their pools are reproduced verbatim. Frequency- enumerated values are always reproduced verbatim and are never truncated. When the Data Dictionary declares `relationships`, the named columns are generated *jointly* so inter-column structure survives into each output row: * joint      — categorical / functional-dependency groups (e.g. city/state/zip). Whole value-tuples are sampled from the source by frequency, so only real co-occurring combinations are emitted. * ordered    — columns that must keep a monotonic order within a row (e.g. created_date <= closed_date). The anchor column is generated from its own distribution; each later column is the anchor plus a non-negative gap drawn from the gap distribution learned from the source. * correlated — numeric columns whose correlation should be preserved. A Gaussian copula couples the columns while leaving each column\'s own distribution unchanged. Relationships are read from the dictionary\'s `relationships` array — inferred by `describegpt` or hand-authored. Columns not named by any relationship are still generated independently. Pass --no-relationships to disable relationship modeling entirely. With --seed, output is fully reproducible. (Docs: https://github.com/dathere/qsv/blob/master/docs/help/synthesize.md)',
            action: 'Synthesize',
          },
          {
            name: 'Table (table)',
            value: 'table',
            description: 'Outputs CSV data as a table with columns in alignment. Though this command is primarily designed for DISPLAYING CSV data using "elastic tabstops" so its more human-readable, it can also be used to convert CSV data to other special machine-readable formats: -  a more human-readable TSV format with the "leftendtab" alignment option -  Fixed-Width format with the "leftfwf" alignment option - similar to "left", but with the first line being a comment (prefixed with "#") that enumerates the position (1-based, comma-separated) of each column (e.g. "#1,10,15"). This will not work well if the CSV data contains large fields. Note that formatting a table requires buffering all CSV data into memory. Therefore, you should use the \'sample\' or \'slice\' command to trim down large CSV data before formatting it with this command. See also https://github.com/dathere/qsv/wiki/Selection-and-Inspection#table (Docs: https://github.com/dathere/qsv/blob/master/docs/help/table.md)',
            action: 'Table',
          },
          {
            name: 'Template (template)',
            value: 'template',
            description: 'Renders a template using CSV data with the MiniJinja template engine. https://docs.rs/minijinja/latest/minijinja/ This command processes each row of the CSV file, making the column values available as variables. Each row is rendered using the template. Column headers become variable names, with non-alphanumeric characters converted to underscore (_). Templates use Jinja2 syntax (https://jinja.palletsprojects.com/en/stable/templates/) and can access an extensive library of built-in filters/functions, with additional ones from minijinja_contrib https://docs.rs/minijinja-contrib/latest/minijinja_contrib/. Additional qsv custom filters are also documented at the end of this file. If the <outdir> argument is specified, it will create a file for each row in <outdir>, with the filename rendered using --outfilename option. Otherwise, ALL the rendered rows will be sent to STDOUT or the designated --output. (Docs: https://github.com/dathere/qsv/blob/master/docs/help/template.md)',
            action: 'Template',
          },
          {
            name: 'Tojsonl (tojsonl)',
            value: 'tojsonl',
            description: 'Smartly converts CSV to a newline-delimited JSON (JSONL/NDJSON). By computing stats on the CSV first, it "smartly" infers the appropriate JSON data type for each column (string, number, boolean, null). It will infer a column as boolean if its cardinality is 2, and the first character of the values are one of the following case-insensitive combinations: t/f; t/null; 1/0; 1/null; y/n & y/null are treated as true/false. The `tojsonl` command will reuse a `stats.csv.data.jsonl` file if it exists and is current (i.e. stats generated with --cardinality and --infer-dates options) and will skip recomputing stats. For examples, see https://github.com/dathere/qsv/blob/master/tests/test_tojsonl.rs. See also https://github.com/dathere/qsv/wiki/Conversion-and-IO#tojsonl (Docs: https://github.com/dathere/qsv/blob/master/docs/help/tojsonl.md)',
            action: 'Tojsonl',
          },
          {
            name: 'To (to) [Feature: to]',
            value: 'to',
            description: 'Convert CSV files to Parquet, PostgreSQL, SQLite, Excel XLSX, ODS and Data Package. (Docs: https://github.com/dathere/qsv/blob/master/docs/help/to.md)',
            action: 'To',
          },
          {
            name: 'Transpose (transpose)',
            value: 'transpose',
            description: 'Transpose the rows/columns of CSV data. (Docs: https://github.com/dathere/qsv/blob/master/docs/help/transpose.md)',
            action: 'Transpose',
          },
          {
            name: 'Validate (validate)',
            value: 'validate',
            description: 'Validates CSV data using two main modes: JSON SCHEMA VALIDATION MODE: (Docs: https://github.com/dathere/qsv/blob/master/docs/help/validate.md)',
            action: 'Validate',
          },
          {
            name: 'Viz (viz) [Feature: viz]',
            value: 'viz',
            description: 'Generate charts/maps from CSV data using the plotly charting library. Produces a self-contained, interactive HTML chart (the plotly.js runtime is embedded, so charts work offline; map basemaps fetch their tiles over the network at view time unless the `white-bg` style is used). Set the QSV_VIZ_CDN environment variable to load plotly.js from its CDN instead, shrinking the page by ~1.9MB at the cost of needing network access to view it. By default the embedded plotly.js is gzip-compressed (~1.9MB vs ~4.8MB) and inflated in-browser, which requires a browser with DecompressionStream support (Chrome/Edge 80+, Firefox 113+, or Safari 16.4+); set QSV_VIZ_NO_COMPRESS for plain-text, uncompressed HTML that also works on older browsers. Titles and labels are rendered as plain text - LaTeX (e.g. `$\\alpha$`) is not typeset. With a qsv build that includes the `viz_static` feature, charts can also be exported as static PNG/SVG/PDF/JPEG/WebP images (this requires a Chromium/Firefox browser at runtime - a webdriver is auto-managed by plotly). The output format is inferred from the --output file extension (.html is the default). Interactive HTML is written to stdout when --output is not given; image formats always require --output. Use --open to view the result in your default browser/viewer. Progress is shown on stderr by default: a spinner with per-phase status messages (loading statistics, inferring the data dictionary, computing correlations, rendering, etc.). It is auto-hidden when stderr is not a terminal (e.g. piped or redirected). Set the QSV_PROGRESSBAR environment variable to a falsy value (0/false/off) to disable it. Chart types (subcommands): smart       Auto-dashboard (Data Schematic). Picks an appropriate chart per column from the dataset\'s statistics & frequency distribution (no --x/--y needed). bar         Bar chart.        --x = category column, --y = value column. line        Line chart.       --x = x column, --y = y column. scatter     Scatter plot.     --x = x column, --y = y column. scatter3d   3D scatter plot.  --x, --y, --z = three numeric columns. histogram   Distribution.     --x = numeric column to bin. box         Box plot.         --y = value column, optional --x = group column. violin      Violin plot: a box plot plus a KDE density curve revealing the distribution\'s shape (modes, shoulders). Same inputs as box (--y = value column, optional --x = group column). pie         Proportions.      --x = label column, optional --y = value column. funnel      Stage-by-stage drop-off. --x = stage column, optional --y = value column (counts stage occurrences when omitted). Stages keep the order they first appear in the file, so the rows define the pipeline; plotly labels each band with its conversion from the previous stage. heatmap     Color grid. Correlation matrix of numeric columns (default; an optional column subset via --cols), or a category x category pivot with --x/--y/--z. contour     2D density contour of two numeric columns (--x and --y), binned into a grid (--bins controls the grid resolution). candlestick Financial OHLC.   --x = date column, plus --ohlc-open/--high/--low/--close. ohlc        Financial OHLC bars (same inputs as candlestick). sankey      Flow diagram.     --source, --target, optional --value column. radar       Polar/radar chart of numeric --cols, optional --series per trace. treemap     Part-to-whole hierarchy as nested tiles. --cols = 2+ dimension columns (levels), optional --value and --agg. sunburst    Part-to-whole hierarchy as concentric rings (same inputs as treemap). Better for deeper hierarchies. icicle      Part-to-whole hierarchy as stacked bars per level (same inputs as treemap). Level-aligned; good for deep, wide hierarchies. splom       Scatter-plot matrix: every pair of numeric --cols plotted against each other in a grid, with each column\'s distribution on the diagonal. Good for spotting correlations across many numeric columns at once (default: all numeric columns). parcats     Parallel categories: ribbons showing how rows flow across the categorical --cols (best with 3-4). Complements sankey (which takes 2 columns) for higher-dimensional categorical relationships. map         Geographic point map (or --density heatmap) on tile basemaps. Pick the coordinate columns with the lat/lon options below. geo         Geographic point map on a projection basemap (coastlines/land/ countries; no tiles, no token). Uses the same lat/lon options as `map`, plus --projection. Good for global/country-scale data. choropleth  Filled-region map: color whole regions (countries, US states, or custom GeoJSON areas) by a value. --locations names the region-code column, --value/--agg the measure (row counts if omitted). Defaults to a token-free projection basemap; --map switches to MapLibre tiles. `qsv viz smart` builds a DATA SCHEMATIC - a single, self-contained rendering of a dataset\'s schema and statistics in which every claim shown is checkable against the data it describes. The format is defined in docs/DATA_SCHEMATIC.md and is tool-neutral; what `viz smart` produces is a "qsv Schematic". A schematic is the drawing form of a SCHEMA - and `viz smart` already emits a `.schema.json` - so the name is descriptive rather than decorative. Where a data dictionary lists fields one at a time, a schematic shows components AND HOW THEY CONNECT: correlation, process order, hierarchy, temporal pacing, spatial pairing. It alloys two ways of knowing a dataset. The DETERMINISTIC half (statistics, heuristics and algorithms - reproducible, offline, no tokens) picks the panels and scales the axes; the SEMANTIC half (an optional LLM-inferred Data Dictionary, via the --dictionary option) supplies what the fields MEAN - labels, roles and units, all correctable by a human Data Steward. Both halves show their work. The schematic is a one-page grid of subplots, reusing qsv\'s stats and frequency caches (the first run computes & caches stats; later runs are fast). It auto-picks panels, so no --x/--y is needed: Per-column panels (flow in the grid below the overview rows, see --grid-cols): - continuous numeric -> box plot (quartiles from the stats cache; sample points overlaid by a size heuristic, see --box-points) - low-cardinality / boolean -> frequency bar chart - ID-like (near-unique) and all-empty columns are skipped Overview panels (each leads the Data Schematic on its own full-width row): - KPI overview row (leads the Data Schematic when the dataset has headline numeric measures): a strip of "big number" tiles, one per headline measure (summed for extensive quantities, averaged for intensive ones). A measure tile becomes a GAUGE when the dictionary supplies a validated `x-qsv.gauge_range` that contains the value, and gains a "vs target" DELTA when it supplies an `x-qsv.target` (see --dictionary). Omitted for image exports and for datasets with no headline measure. (Overall dataset completeness - the share of non-empty cells - is a quiet "Completeness:" line in the header metadata table, not a KPI tile.) - pipeline panel, when the dictionary DECLARES one (see --dictionary). Which columns are process stages, and in which direction, is semantics rather than a statistic - no column-name vocabulary settles it and no statistic does either - so the panel is drawn ONLY from an explicit declaration, never guessed. Both encodings are supported: stages held in separate measure columns, and stages held as values of one category column. Costs one extra data pass over the declared stages only. The declaration fixes WHICH columns and in WHAT order; the numbers decide the FORM. A funnel\'s band widths are a containment claim, so one is drawn only while the stage totals never grow. If any stage outruns the one before it, the same declaration is drawn as a BRIDGE instead: the signed difference between consecutive totals, each step labelled as the arithmetic difference it is rather than as a flow. A funnel there would render a band wider than the one above it, asserting the opposite of the data. The subtitle says which form was used and why. Stage order is the declared order and is never re-sorted by size. For the column encoding, row-wise containment (does each stage nest inside the one before it?) is MEASURED and disclosed in the subtitle - separately from the form, since rows can overrun while the totals still shrink, or nest while the totals grow. Totals sum over the rows complete across every declared stage, so they do NOT match `stats.sum`; the subtitle always discloses that denominator. See also the standalone `qsv viz funnel` chart type, which takes its stage order from the file and needs no dictionary. - correlation heatmap, when 2+ continuous numeric columns exist (one extra data pass for Pearson correlations). If the strongest pair is at least moderately correlated, a drill-down is added beside it: a scatter (or a 2D density contour for large, overplotting datasets); with 3+ numeric columns, a 3D scatter of the strongest triple is added too. - time-series line, when an auto-detected date/datetime column and a continuous numeric column both exist. - geographic map, when a latitude/longitude pair is detected: - HTML uses a MapLibre tile map for a local extent, or an offline ScatterGeo projection world-overview for continental/global data. - static image export uses an offline ScatterGeo fit to the data extent (US-spanning data uses albers-usa); tile maps and 3D panels stay HTML-only, as tile maps need network tiles. - geographic outliers (points beyond the Tukey far-out fence of distances from the cluster centroid) get a distinct marker and are excluded from the spatial extent; the map zooms to the core, with a dotted no-fill box marking the full extent and (in HTML) Core/Full extent buttons. Outliers within the core\'s jurisdiction don\'t trigger the extent call-out. - with the `geocode` feature, the core extent (4 corners + center) is reverse-geocoded against the local Geonames index and drawn as a labeled bounding box with a location summary (e.g. "New York & New Jersey, United States"); outliers are called out with their count and jurisdiction. HTML points reveal city/state/country on hover (static exports omit it). The first run may download the index (~13MB, cached in ~/.qsv-cache); offline, the map renders without the overlay. - extents spanning the antimeridian (>180 degrees of longitude) are skipped. (Docs: https://github.com/dathere/qsv/blob/master/docs/help/viz.md)',
            action: 'Viz',
          },
        ],
        default: 'stats',
      },
      ...ApplyDescription,
      ...BeheadDescription,
      ...Blake3Description,
      ...CatDescription,
      ...CountDescription,
      ...DatefmtDescription,
      ...DedupDescription,
      ...DenullDescription,
      ...DescribegptDescription,
      ...DiffDescription,
      ...EditDescription,
      ...EnumDescription,
      ...ExcelDescription,
      ...ExcludeDescription,
      ...ExplodeDescription,
      ...ExtdedupDescription,
      ...ExtsortDescription,
      ...FetchDescription,
      ...FetchpostDescription,
      ...FillDescription,
      ...FixedwidthDescription,
      ...FixlengthsDescription,
      ...FlattenDescription,
      ...FmtDescription,
      ...ForeachDescription,
      ...FrequencyDescription,
      ...GetDescription,
      ...GeocodeDescription,
      ...GeoconvertDescription,
      ...HeadersDescription,
      ...ImplodeDescription,
      ...IndexDescription,
      ...InputDescription,
      ...JoinDescription,
      ...JoinpDescription,
      ...JsonDescription,
      ...JsonlDescription,
      ...LuauDescription,
      ...MoarstatsDescription,
      ...PartitionDescription,
      ...PivotpDescription,
      ...PragmastatDescription,
      ...ProDescription,
      ...ProfileDescription,
      ...PseudoDescription,
      ...RenameDescription,
      ...ReplaceDescription,
      ...ReverseDescription,
      ...SafenamesDescription,
      ...SampleDescription,
      ...SchemaDescription,
      ...SearchDescription,
      ...SearchsetDescription,
      ...SelectDescription,
      ...SliceDescription,
      ...SnappyDescription,
      ...SniffDescription,
      ...SortDescription,
      ...SortcheckDescription,
      ...SplitDescription,
      ...ScoresqlDescription,
      ...SqlpDescription,
      ...StatsDescription,
      ...SynthesizeDescription,
      ...TableDescription,
      ...TemplateDescription,
      ...TojsonlDescription,
      ...ToDescription,
      ...TransposeDescription,
      ...ValidateDescription,
      ...VizDescription,
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      const operation = this.getNodeParameter('operation', itemIndex) as string;

      try {
        let result: INodeExecutionData[];

        switch (operation) {
          case 'apply':
            result = await executeApply.call(this, itemIndex);
            break;
          case 'behead':
            result = await executeBehead.call(this, itemIndex);
            break;
          case 'blake3':
            result = await executeBlake3.call(this, itemIndex);
            break;
          case 'cat':
            result = await executeCat.call(this, itemIndex);
            break;
          case 'count':
            result = await executeCount.call(this, itemIndex);
            break;
          case 'datefmt':
            result = await executeDatefmt.call(this, itemIndex);
            break;
          case 'dedup':
            result = await executeDedup.call(this, itemIndex);
            break;
          case 'denull':
            result = await executeDenull.call(this, itemIndex);
            break;
          case 'describegpt':
            result = await executeDescribegpt.call(this, itemIndex);
            break;
          case 'diff':
            result = await executeDiff.call(this, itemIndex);
            break;
          case 'edit':
            result = await executeEdit.call(this, itemIndex);
            break;
          case 'enum':
            result = await executeEnum.call(this, itemIndex);
            break;
          case 'excel':
            result = await executeExcel.call(this, itemIndex);
            break;
          case 'exclude':
            result = await executeExclude.call(this, itemIndex);
            break;
          case 'explode':
            result = await executeExplode.call(this, itemIndex);
            break;
          case 'extdedup':
            result = await executeExtdedup.call(this, itemIndex);
            break;
          case 'extsort':
            result = await executeExtsort.call(this, itemIndex);
            break;
          case 'fetch':
            result = await executeFetch.call(this, itemIndex);
            break;
          case 'fetchpost':
            result = await executeFetchpost.call(this, itemIndex);
            break;
          case 'fill':
            result = await executeFill.call(this, itemIndex);
            break;
          case 'fixedwidth':
            result = await executeFixedwidth.call(this, itemIndex);
            break;
          case 'fixlengths':
            result = await executeFixlengths.call(this, itemIndex);
            break;
          case 'flatten':
            result = await executeFlatten.call(this, itemIndex);
            break;
          case 'fmt':
            result = await executeFmt.call(this, itemIndex);
            break;
          case 'foreach':
            result = await executeForeach.call(this, itemIndex);
            break;
          case 'frequency':
            result = await executeFrequency.call(this, itemIndex);
            break;
          case 'get':
            result = await executeGet.call(this, itemIndex);
            break;
          case 'geocode':
            result = await executeGeocode.call(this, itemIndex);
            break;
          case 'geoconvert':
            result = await executeGeoconvert.call(this, itemIndex);
            break;
          case 'headers':
            result = await executeHeaders.call(this, itemIndex);
            break;
          case 'implode':
            result = await executeImplode.call(this, itemIndex);
            break;
          case 'index':
            result = await executeIndex.call(this, itemIndex);
            break;
          case 'input':
            result = await executeInput.call(this, itemIndex);
            break;
          case 'join':
            result = await executeJoin.call(this, itemIndex);
            break;
          case 'joinp':
            result = await executeJoinp.call(this, itemIndex);
            break;
          case 'json':
            result = await executeJson.call(this, itemIndex);
            break;
          case 'jsonl':
            result = await executeJsonl.call(this, itemIndex);
            break;
          case 'luau':
            result = await executeLuau.call(this, itemIndex);
            break;
          case 'moarstats':
            result = await executeMoarstats.call(this, itemIndex);
            break;
          case 'partition':
            result = await executePartition.call(this, itemIndex);
            break;
          case 'pivotp':
            result = await executePivotp.call(this, itemIndex);
            break;
          case 'pragmastat':
            result = await executePragmastat.call(this, itemIndex);
            break;
          case 'pro':
            result = await executePro.call(this, itemIndex);
            break;
          case 'profile':
            result = await executeProfile.call(this, itemIndex);
            break;
          case 'pseudo':
            result = await executePseudo.call(this, itemIndex);
            break;
          case 'rename':
            result = await executeRename.call(this, itemIndex);
            break;
          case 'replace':
            result = await executeReplace.call(this, itemIndex);
            break;
          case 'reverse':
            result = await executeReverse.call(this, itemIndex);
            break;
          case 'safenames':
            result = await executeSafenames.call(this, itemIndex);
            break;
          case 'sample':
            result = await executeSample.call(this, itemIndex);
            break;
          case 'schema':
            result = await executeSchema.call(this, itemIndex);
            break;
          case 'search':
            result = await executeSearch.call(this, itemIndex);
            break;
          case 'searchset':
            result = await executeSearchset.call(this, itemIndex);
            break;
          case 'select':
            result = await executeSelect.call(this, itemIndex);
            break;
          case 'slice':
            result = await executeSlice.call(this, itemIndex);
            break;
          case 'snappy':
            result = await executeSnappy.call(this, itemIndex);
            break;
          case 'sniff':
            result = await executeSniff.call(this, itemIndex);
            break;
          case 'sort':
            result = await executeSort.call(this, itemIndex);
            break;
          case 'sortcheck':
            result = await executeSortcheck.call(this, itemIndex);
            break;
          case 'split':
            result = await executeSplit.call(this, itemIndex);
            break;
          case 'scoresql':
            result = await executeScoresql.call(this, itemIndex);
            break;
          case 'sqlp':
            result = await executeSqlp.call(this, itemIndex);
            break;
          case 'stats':
            result = await executeStats.call(this, itemIndex);
            break;
          case 'synthesize':
            result = await executeSynthesize.call(this, itemIndex);
            break;
          case 'table':
            result = await executeTable.call(this, itemIndex);
            break;
          case 'template':
            result = await executeTemplate.call(this, itemIndex);
            break;
          case 'tojsonl':
            result = await executeTojsonl.call(this, itemIndex);
            break;
          case 'to':
            result = await executeTo.call(this, itemIndex);
            break;
          case 'transpose':
            result = await executeTranspose.call(this, itemIndex);
            break;
          case 'validate':
            result = await executeValidate.call(this, itemIndex);
            break;
          case 'viz':
            result = await executeViz.call(this, itemIndex);
            break;
          default:
            throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`, {
              itemIndex,
            });
        }

        returnData.push(...result);
      } catch (error: any) {
        if (this.continueOnFail()) {
          returnData.push({
            json: {
              error: error.message,
            },
            pairedItem: { item: itemIndex },
          });
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }
}
