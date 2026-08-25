import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";
import { NodeOperationError } from "n8n-workflow";

import { ApplyDescription } from "./descriptions/ApplyDescription";
import { BeheadDescription } from "./descriptions/BeheadDescription";
import { Blake3Description } from "./descriptions/Blake3Description";
import { CatDescription } from "./descriptions/CatDescription";
import { CleanDescription } from "./descriptions/CleanDescription";
import { ClipboardDescription } from "./descriptions/ClipboardDescription";
import { ColorDescription } from "./descriptions/ColorDescription";
import { CountDescription } from "./descriptions/CountDescription";
import { DatefmtDescription } from "./descriptions/DatefmtDescription";
import { DedupDescription } from "./descriptions/DedupDescription";
import { DenullDescription } from "./descriptions/DenullDescription";
import { DescribegptDescription } from "./descriptions/DescribegptDescription";
import { DiffDescription } from "./descriptions/DiffDescription";
import { EditDescription } from "./descriptions/EditDescription";
import { EnumDescription } from "./descriptions/EnumDescription";
import { ExcelDescription } from "./descriptions/ExcelDescription";
import { ExcludeDescription } from "./descriptions/ExcludeDescription";
import { ExplodeDescription } from "./descriptions/ExplodeDescription";
import { ExtdedupDescription } from "./descriptions/ExtdedupDescription";
import { ExtsortDescription } from "./descriptions/ExtsortDescription";
import { FetchDescription } from "./descriptions/FetchDescription";
import { FetchpostDescription } from "./descriptions/FetchpostDescription";
import { FillDescription } from "./descriptions/FillDescription";
import { FixedwidthDescription } from "./descriptions/FixedwidthDescription";
import { FixlengthsDescription } from "./descriptions/FixlengthsDescription";
import { FlattenDescription } from "./descriptions/FlattenDescription";
import { FmtDescription } from "./descriptions/FmtDescription";
import { ForeachDescription } from "./descriptions/ForeachDescription";
import { FrequencyDescription } from "./descriptions/FrequencyDescription";
import { GetDescription } from "./descriptions/GetDescription";
import { GeocodeDescription } from "./descriptions/GeocodeDescription";
import { GeoconvertDescription } from "./descriptions/GeoconvertDescription";
import { HeadersDescription } from "./descriptions/HeadersDescription";
import { ImplodeDescription } from "./descriptions/ImplodeDescription";
import { IndexDescription } from "./descriptions/IndexDescription";
import { InputDescription } from "./descriptions/InputDescription";
import { JoinDescription } from "./descriptions/JoinDescription";
import { JoinpDescription } from "./descriptions/JoinpDescription";
import { JsonDescription } from "./descriptions/JsonDescription";
import { JsonlDescription } from "./descriptions/JsonlDescription";
import { LensDescription } from "./descriptions/LensDescription";
import { LuauDescription } from "./descriptions/LuauDescription";
import { LogDescription } from "./descriptions/LogDescription";
import { MoarstatsDescription } from "./descriptions/MoarstatsDescription";
import { PartitionDescription } from "./descriptions/PartitionDescription";
import { PivotpDescription } from "./descriptions/PivotpDescription";
import { PragmastatDescription } from "./descriptions/PragmastatDescription";
import { ProDescription } from "./descriptions/ProDescription";
import { ProfileDescription } from "./descriptions/ProfileDescription";
import { PromptDescription } from "./descriptions/PromptDescription";
import { PseudoDescription } from "./descriptions/PseudoDescription";
import { RenameDescription } from "./descriptions/RenameDescription";
import { ReplaceDescription } from "./descriptions/ReplaceDescription";
import { ReverseDescription } from "./descriptions/ReverseDescription";
import { SafenamesDescription } from "./descriptions/SafenamesDescription";
import { SampleDescription } from "./descriptions/SampleDescription";
import { SchemaDescription } from "./descriptions/SchemaDescription";
import { SearchDescription } from "./descriptions/SearchDescription";
import { SearchsetDescription } from "./descriptions/SearchsetDescription";
import { SelectDescription } from "./descriptions/SelectDescription";
import { SliceDescription } from "./descriptions/SliceDescription";
import { SnappyDescription } from "./descriptions/SnappyDescription";
import { SniffDescription } from "./descriptions/SniffDescription";
import { SortDescription } from "./descriptions/SortDescription";
import { SortcheckDescription } from "./descriptions/SortcheckDescription";
import { SplitDescription } from "./descriptions/SplitDescription";
import { ScoresqlDescription } from "./descriptions/ScoresqlDescription";
import { SqlpDescription } from "./descriptions/SqlpDescription";
import { StatsDescription } from "./descriptions/StatsDescription";
import { SynthesizeDescription } from "./descriptions/SynthesizeDescription";
import { TableDescription } from "./descriptions/TableDescription";
import { TemplateDescription } from "./descriptions/TemplateDescription";
import { TojsonlDescription } from "./descriptions/TojsonlDescription";
import { ToDescription } from "./descriptions/ToDescription";
import { TransposeDescription } from "./descriptions/TransposeDescription";
import { ValidateDescription } from "./descriptions/ValidateDescription";
import { VizDescription } from "./descriptions/VizDescription";

import { executeApply } from "./actions/executeApply";
import { executeBehead } from "./actions/executeBehead";
import { executeBlake3 } from "./actions/executeBlake3";
import { executeCat } from "./actions/executeCat";
import { executeClean } from "./actions/executeClean";
import { executeClipboard } from "./actions/executeClipboard";
import { executeColor } from "./actions/executeColor";
import { executeCount } from "./actions/executeCount";
import { executeDatefmt } from "./actions/executeDatefmt";
import { executeDedup } from "./actions/executeDedup";
import { executeDenull } from "./actions/executeDenull";
import { executeDescribegpt } from "./actions/executeDescribegpt";
import { executeDiff } from "./actions/executeDiff";
import { executeEdit } from "./actions/executeEdit";
import { executeEnum } from "./actions/executeEnum";
import { executeExcel } from "./actions/executeExcel";
import { executeExclude } from "./actions/executeExclude";
import { executeExplode } from "./actions/executeExplode";
import { executeExtdedup } from "./actions/executeExtdedup";
import { executeExtsort } from "./actions/executeExtsort";
import { executeFetch } from "./actions/executeFetch";
import { executeFetchpost } from "./actions/executeFetchpost";
import { executeFill } from "./actions/executeFill";
import { executeFixedwidth } from "./actions/executeFixedwidth";
import { executeFixlengths } from "./actions/executeFixlengths";
import { executeFlatten } from "./actions/executeFlatten";
import { executeFmt } from "./actions/executeFmt";
import { executeForeach } from "./actions/executeForeach";
import { executeFrequency } from "./actions/executeFrequency";
import { executeGet } from "./actions/executeGet";
import { executeGeocode } from "./actions/executeGeocode";
import { executeGeoconvert } from "./actions/executeGeoconvert";
import { executeHeaders } from "./actions/executeHeaders";
import { executeImplode } from "./actions/executeImplode";
import { executeIndex } from "./actions/executeIndex";
import { executeInput } from "./actions/executeInput";
import { executeJoin } from "./actions/executeJoin";
import { executeJoinp } from "./actions/executeJoinp";
import { executeJson } from "./actions/executeJson";
import { executeJsonl } from "./actions/executeJsonl";
import { executeLens } from "./actions/executeLens";
import { executeLuau } from "./actions/executeLuau";
import { executeLog } from "./actions/executeLog";
import { executeMoarstats } from "./actions/executeMoarstats";
import { executePartition } from "./actions/executePartition";
import { executePivotp } from "./actions/executePivotp";
import { executePragmastat } from "./actions/executePragmastat";
import { executePro } from "./actions/executePro";
import { executeProfile } from "./actions/executeProfile";
import { executePrompt } from "./actions/executePrompt";
import { executePseudo } from "./actions/executePseudo";
import { executeRename } from "./actions/executeRename";
import { executeReplace } from "./actions/executeReplace";
import { executeReverse } from "./actions/executeReverse";
import { executeSafenames } from "./actions/executeSafenames";
import { executeSample } from "./actions/executeSample";
import { executeSchema } from "./actions/executeSchema";
import { executeSearch } from "./actions/executeSearch";
import { executeSearchset } from "./actions/executeSearchset";
import { executeSelect } from "./actions/executeSelect";
import { executeSlice } from "./actions/executeSlice";
import { executeSnappy } from "./actions/executeSnappy";
import { executeSniff } from "./actions/executeSniff";
import { executeSort } from "./actions/executeSort";
import { executeSortcheck } from "./actions/executeSortcheck";
import { executeSplit } from "./actions/executeSplit";
import { executeScoresql } from "./actions/executeScoresql";
import { executeSqlp } from "./actions/executeSqlp";
import { executeStats } from "./actions/executeStats";
import { executeSynthesize } from "./actions/executeSynthesize";
import { executeTable } from "./actions/executeTable";
import { executeTemplate } from "./actions/executeTemplate";
import { executeTojsonl } from "./actions/executeTojsonl";
import { executeTo } from "./actions/executeTo";
import { executeTranspose } from "./actions/executeTranspose";
import { executeValidate } from "./actions/executeValidate";
import { executeViz } from "./actions/executeViz";

export class Qsv implements INodeType {
  description: INodeTypeDescription = {
    displayName: "QSV Data Wrangler",
    name: "qsv",
    icon: "file:qsv.svg",
    group: ["transform"],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description:
      "Ultra-fast tabular data wrangling, stats, and transformations via QSV (requires qsv CLI on host)",
    defaults: {
      name: "QSV",
    },
    inputs: ["main"],
    outputs: ["main"],
    properties: [
      {
        displayName: "Host Requirement Notice",
        name: "qsvHostNotice",
        type: "notice",
        default:
          "This node executes the <b>qsv</b> binary directly on the host machine. Ensure <b>qsv</b> is installed and available in the system PATH of your n8n instance.",
      },
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        options: [
          {
            name: "Apply (apply)",
            value: "apply",
            description:
              "Apply a series of transformation functions to given CSV column/s. This can be used to perform typical data-wrangling tas",
            action: "Apply",
          },
          {
            name: "Behead (behead)",
            value: "behead",
            description:
              "Drop a CSV file's header. See also https://github.com/dathere/qsv/wiki/Transform-and-Reshape#behead",
            action: "Behead",
          },
          {
            name: "Blake3 (blake3)",
            value: "blake3",
            description:
              "Compute cryptographic hashes of files using blake3. This command is functionally similar to b3sum, providing fast, paral",
            action: "Blake3",
          },
          {
            name: "Cat (cat)",
            value: "cat",
            description:
              "Concatenate CSV files by row or by column. When concatenating by column, the columns will be written in the same order a",
            action: "Cat",
          },
          {
            name: "Clean (clean)",
            value: "clean",
            description:
              "Removes qsv-generated cache files to reduce clutter and simplify data packaging. By default, clean removes the three aut",
            action: "Clean",
          },
          {
            name: "Clipboard (clipboard)",
            value: "clipboard",
            description:
              "Provide input from the clipboard or save output to the clipboard. Note when saving to clipboard on Windows, line breaks ",
            action: "Clipboard",
          },
          {
            name: "Color (color)",
            value: "color",
            description:
              "Outputs tabular data as a pretty, colorized table that always fits into the terminal. Tabular data formats include CSV a",
            action: "Color",
          },
          {
            name: "Count (count)",
            value: "count",
            description:
              "Returns a count of the number of records in the CSV data. It has three modes of operation: Note that the count will not ",
            action: "Count",
          },
          {
            name: "Datefmt (datefmt)",
            value: "datefmt",
            description:
              "Formats recognized date fields (19 formats recognized) to a specified date format using strftime date format specifiers.",
            action: "Datefmt",
          },
          {
            name: "Dedup (dedup)",
            value: "dedup",
            description:
              "Deduplicates CSV rows. This requires reading all of the CSV data into memory because because the rows need to be sorted ",
            action: "Dedup",
          },
          {
            name: "Denull (denull)",
            value: "denull",
            description:
              'Detect null sentinels - literal text like "NULL" or "N/A" standing in for a missing value - that stop a numeric column f',
            action: "Denull",
          },
          {
            name: "Describegpt (describegpt)",
            value: "describegpt",
            description:
              'Create a "neuro-symbolic" Data Dictionary and/or infer Description & Tags about a Dataset using an OpenAI API-compatible',
            action: "Describegpt",
          },
          {
            name: "Diff (diff)",
            value: "diff",
            description:
              "Find the difference between two CSVs with ludicrous speed. NOTE: diff does not support stdin. A file path is required fo",
            action: "Diff",
          },
          {
            name: "Edit (edit)",
            value: "edit",
            description:
              "Replace the value of a cell specified by its row and column. Example: items.csv ```csv item,color shoes,blue flashlight,",
            action: "Edit",
          },
          {
            name: "Enum (enum)",
            value: "enum",
            description:
              "Add a new column enumerating the lines of a CSV file. This can be useful to keep track of a specific line order, give a ",
            action: "Enum",
          },
          {
            name: "Excel (excel)",
            value: "excel",
            description:
              "Exports a specified Excel/ODS sheet to a CSV file. The first non-empty row of a sheet is assumed to be the header row. E",
            action: "Excel",
          },
          {
            name: "Exclude (exclude)",
            value: "exclude",
            description:
              "Removes a set of CSV data from another set based on the specified columns. Also can compute the intersection of two CSV ",
            action: "Exclude",
          },
          {
            name: "Explode (explode)",
            value: "explode",
            description:
              "Explodes a row into multiple ones by splitting a column value based on the given separator. Example: ```csv name,colors ",
            action: "Explode",
          },
          {
            name: "Extdedup (extdedup)",
            value: "extdedup",
            description:
              "Remove duplicate rows from an arbitrarily large CSV/text file using a memory-mapped, on-disk hash table. Unlike the 'de",
            action: "Extdedup",
          },
          {
            name: "Extsort (extsort)",
            value: "extsort",
            description:
              "Sort an arbitrarily large CSV/text file using a multithreaded external sort algorithm. This command has TWO modes of ope",
            action: "Extsort",
          },
          {
            name: "Fetch (fetch)",
            value: "fetch",
            description:
              "Send/Fetch data to/from web services for every row using HTTP Get. Fetch is integrated with `jaq` (a jq clone) to direct",
            action: "Fetch",
          },
          {
            name: "Fetchpost (fetchpost)",
            value: "fetchpost",
            description:
              "Fetchpost sends/fetches data to/from web services for every row using HTTP Post. As opposed to fetch, which uses HTTP Ge",
            action: "Fetchpost",
          },
          {
            name: "Fill (fill)",
            value: "fill",
            description:
              "Fill empty fields in selected columns of a CSV. This command fills empty fields in the selected column using the last se",
            action: "Fill",
          },
          {
            name: "Fixedwidth (fixedwidth)",
            value: "fixedwidth",
            description:
              "Converts fixed-width text (fields at fixed byte-column positions, no delimiters) to CSV. By default, this expects the in",
            action: "Fixedwidth",
          },
          {
            name: "Fixlengths (fixlengths)",
            value: "fixlengths",
            description:
              "Transforms CSV data so that all records have the same length. The length is the length of the longest record in the data",
            action: "Fixlengths",
          },
          {
            name: "Flatten (flatten)",
            value: "flatten",
            description:
              "Prints flattened records such that fields are labeled separated by a new line. This mode is particularly useful for view",
            action: "Flatten",
          },
          {
            name: "Fmt (fmt)",
            value: "fmt",
            description:
              "Formats CSV data with a custom delimiter or CRLF line endings. Generally, all commands in qsv output CSV data in a defau",
            action: "Fmt",
          },
          {
            name: "Foreach (foreach)",
            value: "foreach",
            description:
              "Execute a shell command once per record in a given CSV file. NOTE: Windows users are recommended to use Git Bash as thei",
            action: "Foreach",
          },
          {
            name: "Frequency (frequency)",
            value: "frequency",
            description:
              "Compute a frequency distribution table on input data. It has CSV and JSON output modes. https://en.wikipedia.org/wiki/Fr",
            action: "Frequency",
          },
          {
            name: "Get (get)",
            value: "get",
            description:
              "Get tabular data from various sources into a managed, queryable disk cache. `get` fetches a resource once, stores it com",
            action: "Get",
          },
          {
            name: "Geocode (geocode)",
            value: "geocode",
            description:
              "Geocodes a location in CSV data against an updatable local copy of the Geonames cities index and a local copy of the Max",
            action: "Geocode",
          },
          {
            name: "Geoconvert (geoconvert)",
            value: "geoconvert",
            description:
              "Convert between various spatial formats and CSV/SVG including GeoJSON, SHP, and more. For example to convert a GeoJSON f",
            action: "Geoconvert",
          },
          {
            name: "Headers (headers)",
            value: "headers",
            description:
              "Prints the fields of the first row in the CSV data. These names can be used in commands like 'select' to refer to colu",
            action: "Headers",
          },
          {
            name: "Implode (implode)",
            value: "implode",
            description:
              "Implodes multiple rows into one by grouping on key column(s) and joining the values of another column with the given sep",
            action: "Implode",
          },
          {
            name: "Index (index)",
            value: "index",
            description:
              "Creates an index of the given CSV data, which can make other operations like slicing, splitting and gathering statistics",
            action: "Index",
          },
          {
            name: "Input (input)",
            value: "input",
            description:
              "Read CSV data with special commenting, quoting, trimming, line-skipping & non UTF-8 encoding rules and transforms it to ",
            action: "Input",
          },
          {
            name: "Join (join)",
            value: "join",
            description:
              "Joins two sets of CSV data on the specified columns. The default join operation is an 'inner' join. This corresponds t",
            action: "Join",
          },
          {
            name: "Joinp (joinp)",
            value: "joinp",
            description:
              "Joins two sets of CSV data on the specified columns using the Polars engine. The default join operation is an 'inner' ",
            action: "Joinp",
          },
          {
            name: "Json (json)",
            value: "json",
            description:
              "Convert JSON to CSV. The JSON data is expected to be non-empty and non-nested as either: 1. An array of objects where: 2",
            action: "Json",
          },
          {
            name: "Jsonl (jsonl)",
            value: "jsonl",
            description:
              "Convert newline-delimited JSON (JSONL/NDJSON) to CSV. The command tries to do its best but since it is not possible to s",
            action: "Jsonl",
          },
          {
            name: "Lens (lens)",
            value: "lens",
            description:
              "Explore tabular data files interactively using the csvlens (https://github.com/YS-L/csvlens) engine. If the polars featu",
            action: "Lens",
          },
          {
            name: "Luau (luau)",
            value: "luau",
            description:
              "Create multiple new computed columns, filter rows or compute aggregations by executing a Luau 0.728 script for every row",
            action: "Luau",
          },
          {
            name: "Log (log)",
            value: "log",
            description:
              "Logs an MCP tool invocation entry to qsvmcp.log. Only intended for internal use by the qsv MCP server, not for general C",
            action: "Log",
          },
          {
            name: "Moarstats (moarstats)",
            value: "moarstats",
            description:
              "Add dozens of additional statistics, including extended outlier, robust & bivariate statistics to an existing stats CSV ",
            action: "Moarstats",
          },
          {
            name: "Partition (partition)",
            value: "partition",
            description:
              "Partitions the given CSV data into chunks based on the value of a column. See `split` command to split a CSV data by row",
            action: "Partition",
          },
          {
            name: "Pivotp (pivotp)",
            value: "pivotp",
            description:
              "Pivots or groups CSV data using the Polars engine. PIVOT MODE (with <on-cols>): GROUP-BY MODE (without <on-cols>): For e",
            action: "Pivotp",
          },
          {
            name: "Pragmastat (pragmastat)",
            value: "pragmastat",
            description:
              "Pragmatic statistical toolkit. Compute robust, median-of-pairwise statistics from the Pragmastat library. Designed for m",
            action: "Pragmastat",
          },
          {
            name: "Pro (pro)",
            value: "pro",
            description:
              "Interact with qsv pro API. Learn more about qsv pro at: https://qsvpro.dathere.com. - qsv pro must be running for this c",
            action: "Pro",
          },
          {
            name: "Profile (profile)",
            value: "profile",
            description:
              "Profile a CSV (local path or URL) and emit a `.metadata.json` file carrying five top-level blocks: Behind the scenes qsv",
            action: "Profile",
          },
          {
            name: "Prompt (prompt)",
            value: "prompt",
            description:
              "Open a file dialog to pick a file as input or save to an output file. Examples: See also https://github.com/dathere/qsv/",
            action: "Prompt",
          },
          {
            name: "Pseudo (pseudo)",
            value: "pseudo",
            description:
              "Pseudonymise the value of a given column by replacing it with an incremental identifier. See https://en.wikipedia.org/wi",
            action: "Pseudo",
          },
          {
            name: "Rename (rename)",
            value: "rename",
            description:
              "Rename the columns of a CSV efficiently. It has two modes of operation: Positional mode (default): The new column names ",
            action: "Rename",
          },
          {
            name: "Replace (replace)",
            value: "replace",
            description:
              "Replace occurrences of a pattern across a CSV file. You can of course match groups using parentheses and use those in th",
            action: "Replace",
          },
          {
            name: "Reverse (reverse)",
            value: "reverse",
            description:
              "Reverses rows of CSV data. Useful for cases when there is no column that can be used for sorting in reverse order, or wh",
            action: "Reverse",
          },
          {
            name: "Safenames (safenames)",
            value: "safenames",
            description:
              'Modify headers of a CSV to only have "safe" names - guaranteed "database-ready" names (optimized specifically for Postgr',
            action: "Safenames",
          },
          {
            name: "Sample (sample)",
            value: "sample",
            description:
              "Randomly samples CSV data. It supports ten sampling methods: * RESERVOIR: the default sampling method when NO INDEX is p",
            action: "Sample",
          },
          {
            name: "Schema (schema)",
            value: "schema",
            description:
              "Generate JSON Schema or Polars Schema (with the `--polars` option) from CSV data. JSON Schema Validation: ==============",
            action: "Schema",
          },
          {
            name: "Search (search)",
            value: "search",
            description:
              "Filters CSV data by whether the given regex matches a row. The regex is applied to selected field in each row, and if an",
            action: "Search",
          },
          {
            name: "Searchset (searchset)",
            value: "searchset",
            description:
              "Filters CSV data by whether the given regex set matches a row. Unlike the search operation, this allows regex matching o",
            action: "Searchset",
          },
          {
            name: "Select (select)",
            value: "select",
            description:
              "Select columns from CSV data efficiently. This command lets you manipulate the columns in CSV data. You can re-order, du",
            action: "Select",
          },
          {
            name: "Slice (slice)",
            value: "slice",
            description:
              "Returns the rows in the range specified (starting at 0, half-open interval). The range does not include headers. If the ",
            action: "Slice",
          },
          {
            name: "Snappy (snappy)",
            value: "snappy",
            description:
              "Does streaming compression/decompression of the input using the Snappy framing format. https://github.com/google/snappy/",
            action: "Snappy",
          },
          {
            name: "Sniff (sniff)",
            value: "sniff",
            description:
              "Quickly sniff the first n rows and infer CSV metadata (delimiter, header row, number of preamble rows, quote character, ",
            action: "Sniff",
          },
          {
            name: "Sort (sort)",
            value: "sort",
            description:
              "Sorts CSV data in lexicographical, natural, numerical, reverse, unique or random order. Note that this requires reading ",
            action: "Sort",
          },
          {
            name: "Sortcheck (sortcheck)",
            value: "sortcheck",
            description:
              "Check if a CSV is sorted. The check is done on a streaming basis (i.e. constant memory). With the --json options, also r",
            action: "Sortcheck",
          },
          {
            name: "Split (split)",
            value: "split",
            description:
              "Splits the given CSV data into chunks. It has three modes: by size (rowcount), by number of chunks and by kb-size. See `",
            action: "Split",
          },
          {
            name: "Scoresql (scoresql)",
            value: "scoresql",
            description:
              "Analyze a SQL query against CSV file caches (stats, moarstats, frequency) to produce a performance score with actionable",
            action: "Scoresql",
          },
          {
            name: "Sqlp (sqlp)",
            value: "sqlp",
            description:
              "Run blazing-fast Polars SQL queries against several CSVs - replete with joins, aggregations, grouping, table functions, ",
            action: "Sqlp",
          },
          {
            name: "Stats (stats)",
            value: "stats",
            description:
              "Compute summary statistics & infers data types for each column in a CSV. IMPORTANT: `stats` is heavily optimized for spe",
            action: "Stats",
          },
          {
            name: "Synthesize (synthesize)",
            value: "synthesize",
            description:
              "Generates a synthetic CSV that is statistically faithful to a source CSV. `synthesize` analyzes <input> with `stats` and",
            action: "Synthesize",
          },
          {
            name: "Table (table)",
            value: "table",
            description:
              "Outputs CSV data as a table with columns in alignment. Though this command is primarily designed for DISPLAYING CSV data",
            action: "Table",
          },
          {
            name: "Template (template)",
            value: "template",
            description:
              "Renders a template using CSV data with the MiniJinja template engine. https://docs.rs/minijinja/latest/minijinja/ This c",
            action: "Template",
          },
          {
            name: "Tojsonl (tojsonl)",
            value: "tojsonl",
            description:
              'Smartly converts CSV to a newline-delimited JSON (JSONL/NDJSON). By computing stats on the CSV first, it "smartly" infer',
            action: "Tojsonl",
          },
          {
            name: "To (to)",
            value: "to",
            description:
              "Convert CSV files to Parquet, PostgreSQL, SQLite, Excel XLSX, ODS and Data Package. PARQUET ======= Convert CSV files to",
            action: "To",
          },
          {
            name: "Transpose (transpose)",
            value: "transpose",
            description: "Transpose the rows/columns of CSV data.",
            action: "Transpose",
          },
          {
            name: "Validate (validate)",
            value: "validate",
            description:
              "Validates CSV data using two main modes: JSON SCHEMA VALIDATION MODE: =========================== This mode is invoked i",
            action: "Validate",
          },
          {
            name: "Viz (viz)",
            value: "viz",
            description:
              "Generate charts/maps from CSV data using the plotly charting library. Produces a self-contained, interactive HTML chart ",
            action: "Viz",
          },
        ],
        default: "stats",
      },
      ...ApplyDescription,
      ...BeheadDescription,
      ...Blake3Description,
      ...CatDescription,
      ...CleanDescription,
      ...ClipboardDescription,
      ...ColorDescription,
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
      ...LensDescription,
      ...LuauDescription,
      ...LogDescription,
      ...MoarstatsDescription,
      ...PartitionDescription,
      ...PivotpDescription,
      ...PragmastatDescription,
      ...ProDescription,
      ...ProfileDescription,
      ...PromptDescription,
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
      const operation = this.getNodeParameter("operation", itemIndex) as string;

      try {
        let result: INodeExecutionData[];

        switch (operation) {
          case "apply":
            result = await executeApply.call(this, itemIndex);
            break;
          case "behead":
            result = await executeBehead.call(this, itemIndex);
            break;
          case "blake3":
            result = await executeBlake3.call(this, itemIndex);
            break;
          case "cat":
            result = await executeCat.call(this, itemIndex);
            break;
          case "clean":
            result = await executeClean.call(this, itemIndex);
            break;
          case "clipboard":
            result = await executeClipboard.call(this, itemIndex);
            break;
          case "color":
            result = await executeColor.call(this, itemIndex);
            break;
          case "count":
            result = await executeCount.call(this, itemIndex);
            break;
          case "datefmt":
            result = await executeDatefmt.call(this, itemIndex);
            break;
          case "dedup":
            result = await executeDedup.call(this, itemIndex);
            break;
          case "denull":
            result = await executeDenull.call(this, itemIndex);
            break;
          case "describegpt":
            result = await executeDescribegpt.call(this, itemIndex);
            break;
          case "diff":
            result = await executeDiff.call(this, itemIndex);
            break;
          case "edit":
            result = await executeEdit.call(this, itemIndex);
            break;
          case "enum":
            result = await executeEnum.call(this, itemIndex);
            break;
          case "excel":
            result = await executeExcel.call(this, itemIndex);
            break;
          case "exclude":
            result = await executeExclude.call(this, itemIndex);
            break;
          case "explode":
            result = await executeExplode.call(this, itemIndex);
            break;
          case "extdedup":
            result = await executeExtdedup.call(this, itemIndex);
            break;
          case "extsort":
            result = await executeExtsort.call(this, itemIndex);
            break;
          case "fetch":
            result = await executeFetch.call(this, itemIndex);
            break;
          case "fetchpost":
            result = await executeFetchpost.call(this, itemIndex);
            break;
          case "fill":
            result = await executeFill.call(this, itemIndex);
            break;
          case "fixedwidth":
            result = await executeFixedwidth.call(this, itemIndex);
            break;
          case "fixlengths":
            result = await executeFixlengths.call(this, itemIndex);
            break;
          case "flatten":
            result = await executeFlatten.call(this, itemIndex);
            break;
          case "fmt":
            result = await executeFmt.call(this, itemIndex);
            break;
          case "foreach":
            result = await executeForeach.call(this, itemIndex);
            break;
          case "frequency":
            result = await executeFrequency.call(this, itemIndex);
            break;
          case "get":
            result = await executeGet.call(this, itemIndex);
            break;
          case "geocode":
            result = await executeGeocode.call(this, itemIndex);
            break;
          case "geoconvert":
            result = await executeGeoconvert.call(this, itemIndex);
            break;
          case "headers":
            result = await executeHeaders.call(this, itemIndex);
            break;
          case "implode":
            result = await executeImplode.call(this, itemIndex);
            break;
          case "index":
            result = await executeIndex.call(this, itemIndex);
            break;
          case "input":
            result = await executeInput.call(this, itemIndex);
            break;
          case "join":
            result = await executeJoin.call(this, itemIndex);
            break;
          case "joinp":
            result = await executeJoinp.call(this, itemIndex);
            break;
          case "json":
            result = await executeJson.call(this, itemIndex);
            break;
          case "jsonl":
            result = await executeJsonl.call(this, itemIndex);
            break;
          case "lens":
            result = await executeLens.call(this, itemIndex);
            break;
          case "luau":
            result = await executeLuau.call(this, itemIndex);
            break;
          case "log":
            result = await executeLog.call(this, itemIndex);
            break;
          case "moarstats":
            result = await executeMoarstats.call(this, itemIndex);
            break;
          case "partition":
            result = await executePartition.call(this, itemIndex);
            break;
          case "pivotp":
            result = await executePivotp.call(this, itemIndex);
            break;
          case "pragmastat":
            result = await executePragmastat.call(this, itemIndex);
            break;
          case "pro":
            result = await executePro.call(this, itemIndex);
            break;
          case "profile":
            result = await executeProfile.call(this, itemIndex);
            break;
          case "prompt":
            result = await executePrompt.call(this, itemIndex);
            break;
          case "pseudo":
            result = await executePseudo.call(this, itemIndex);
            break;
          case "rename":
            result = await executeRename.call(this, itemIndex);
            break;
          case "replace":
            result = await executeReplace.call(this, itemIndex);
            break;
          case "reverse":
            result = await executeReverse.call(this, itemIndex);
            break;
          case "safenames":
            result = await executeSafenames.call(this, itemIndex);
            break;
          case "sample":
            result = await executeSample.call(this, itemIndex);
            break;
          case "schema":
            result = await executeSchema.call(this, itemIndex);
            break;
          case "search":
            result = await executeSearch.call(this, itemIndex);
            break;
          case "searchset":
            result = await executeSearchset.call(this, itemIndex);
            break;
          case "select":
            result = await executeSelect.call(this, itemIndex);
            break;
          case "slice":
            result = await executeSlice.call(this, itemIndex);
            break;
          case "snappy":
            result = await executeSnappy.call(this, itemIndex);
            break;
          case "sniff":
            result = await executeSniff.call(this, itemIndex);
            break;
          case "sort":
            result = await executeSort.call(this, itemIndex);
            break;
          case "sortcheck":
            result = await executeSortcheck.call(this, itemIndex);
            break;
          case "split":
            result = await executeSplit.call(this, itemIndex);
            break;
          case "scoresql":
            result = await executeScoresql.call(this, itemIndex);
            break;
          case "sqlp":
            result = await executeSqlp.call(this, itemIndex);
            break;
          case "stats":
            result = await executeStats.call(this, itemIndex);
            break;
          case "synthesize":
            result = await executeSynthesize.call(this, itemIndex);
            break;
          case "table":
            result = await executeTable.call(this, itemIndex);
            break;
          case "template":
            result = await executeTemplate.call(this, itemIndex);
            break;
          case "tojsonl":
            result = await executeTojsonl.call(this, itemIndex);
            break;
          case "to":
            result = await executeTo.call(this, itemIndex);
            break;
          case "transpose":
            result = await executeTranspose.call(this, itemIndex);
            break;
          case "validate":
            result = await executeValidate.call(this, itemIndex);
            break;
          case "viz":
            result = await executeViz.call(this, itemIndex);
            break;
          default:
            throw new NodeOperationError(
              this.getNode(),
              `Unknown operation: ${operation}`,
              {
                itemIndex,
              },
            );
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
