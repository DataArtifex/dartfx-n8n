# QSV Operations Reference

`n8n-nodes-dartfx` supports **77 high-performance QSV operations** organized across functional domains:

---

## 📊 1. Profiling & Statistical Analysis

| Operation        | Description                                                                                                                            |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| **`stats`**      | Computes column-wise summary statistics, data types, min/max, mean, median, stddev, null checks, and quantiles. Emits structured JSON. |
| **`frequency`**  | Builds frequency distributions, top cardinality values, and value counts per column.                                                   |
| **`schema`**     | Infers a complete JSON Schema from tabular data with strict dates, enums, and regex patterns.                                          |
| **`sniff`**      | Quickly detects CSV delimiter, quote character, header row presence, line terminator, and encoding.                                    |
| **`count`**      | Returns exact record count in sub-seconds with or without an existing index.                                                           |
| **`moarstats`**  | Computes extended statistical metrics (IQR, mode, skewness, kurtosis) on existing stats output.                                        |
| **`pragmastat`** | Pragmatic statistical toolkit for fast confidence intervals and estimations.                                                           |
| **`headers`**    | Returns all column header names and 1-based indices.                                                                                   |

---

## 🧹 2. Data Cleaning & Transformation

| Operation        | Description                                                                                                |
| :--------------- | :--------------------------------------------------------------------------------------------------------- |
| **`apply`**      | Applies complex string transformations, casing changes, currency parsing, or regex operations to a column. |
| **`behead`**     | Removes the header row from a CSV dataset.                                                                 |
| **`clean`**      | Cleans and removes cached QSV metadata and temporary files.                                                |
| **`datefmt`**    | Parses, normalizes, and re-formats date/datetime column values into standardized formats.                  |
| **`dedup`**      | Fast in-memory deduplication of redundant rows.                                                            |
| **`extdedup`**   | External-memory deduplication for arbitrarily large (100GB+) datasets.                                     |
| **`denull`**     | Detects and replaces null sentinels (e.g. `NULL`, `N/A`, `None`, `-`) with empty values.                   |
| **`edit`**       | Replaces specific cell values by row coordinate and column name/index.                                     |
| **`enum`**       | Appends an enumeration/row-counter column to the dataset.                                                  |
| **`fill`**       | Fills empty or missing values forward, backward, or with static text.                                      |
| **`fixlengths`** | Enforces equal record length by padding or trimming uneven CSV rows.                                       |
| **`flatten`**    | Unrolls tabular records into one field per line for inspectability.                                        |
| **`fmt`**        | Formats CSV delimiters, quote styles, and line endings.                                                    |
| **`pseudo`**     | Pseudonymizes column values using cryptographic salts for privacy compliance.                              |
| **`rename`**     | Efficiently renames CSV columns.                                                                           |
| **`replace`**    | Replaces regex patterns in column values with replacement strings.                                         |
| **`reverse`**    | Inverts the row order of CSV data.                                                                         |
| **`safenames`**  | Sanitizes header names into database-friendly snake_case identifiers.                                      |

---

## 🔍 3. Slicing, Search & Sampling

| Operation       | Description                                                                              |
| :-------------- | :--------------------------------------------------------------------------------------- |
| **`index`**     | Builds a `.qsv.idx` index file for sub-second random access across multi-gigabyte files. |
| **`select`**    | Reorders, selects, duplicates, or drops specific columns.                                |
| **`slice`**     | Slices records by row index, offset, or range.                                           |
| **`search`**    | High-speed multi-threaded regex search across columns or entire records.                 |
| **`searchset`** | Simultaneous regex search using a precompiled set of multiple regex patterns.            |
| **`sample`**    | Random or Bernoulli sampling of rows with deterministic random seeding.                  |
| **`sort`**      | Sorts CSV data alphabetically, numerically, in reverse, or randomly.                     |
| **`extsort`**   | External-memory merge sort for datasets exceeding physical RAM.                          |
| **`sortcheck`** | Fast validation check to confirm whether a CSV dataset is already sorted.                |
| **`split`**     | Splits a large CSV into multiple smaller chunk files based on row limits.                |
| **`partition`** | Partitions CSV rows into distinct files dynamically based on unique column values.       |

---

## ⚡ 4. High-Performance SQL, Joins & Polars Engine

| Operation       | Description                                                                          |
| :-------------- | :----------------------------------------------------------------------------------- |
| **`sqlp`**      | Runs ultra-fast SQL queries against one or more CSVs using the native Polars engine. |
| **`scoresql`**  | Scores and benchmarks SQL queries against CSV caches for performance tuning.         |
| **`join`**      | Standard streaming joins (inner, outer, cross, left, right) between two CSV files.   |
| **`joinp`**     | Polars-accelerated multi-threaded joins with memory-mapped execution.                |
| **`pivotp`**    | Computes pivot tables and aggregations using the Polars engine.                      |
| **`diff`**      | Computes row-level differences and changes between two CSV datasets.                 |
| **`exclude`**   | Excludes matching records found in a second CSV file.                                |
| **`explode`**   | Explodes packed multi-value string columns into separate rows.                       |
| **`implode`**   | Groups records on keys and aggregates/joins values into delimited list cells.        |
| **`transpose`** | Transposes CSV rows into columns and vice-versa.                                     |
| **`cat`**       | Concatenates multiple CSV files either row-wise or column-wise.                      |

---

## 🔄 5. Format Conversions

| Operation        | Description                                                                                                        |
| :--------------- | :----------------------------------------------------------------------------------------------------------------- |
| **`to`**         | Converts CSVs into Apache Parquet, Excel (.xlsx), SQLite database, PostgreSQL dump, or Frictionless Data Packages. |
| **`excel`**      | Extracts and converts sheets from Microsoft Excel workbooks into CSV.                                              |
| **`json`**       | Converts JSON arrays and objects into tabular CSV.                                                                 |
| **`jsonl`**      | Converts newline-delimited JSON (JSON Lines) streams into CSV.                                                     |
| **`tojsonl`**    | Converts CSV datasets into JSON Lines files.                                                                       |
| **`fixedwidth`** | Parses fixed-width text files into delimited CSV columns.                                                          |
| **`geoconvert`** | Converts spatial formats (GeoJSON, Shapefile, CSV coordinates) back and forth.                                     |
| **`snappy`**     | High-speed stream compression/decompression using Google's Snappy algorithm.                                       |

---

## 🌐 6. Web Services & AI Integrations

| Operation         | Description                                                                                                      |
| :---------------- | :--------------------------------------------------------------------------------------------------------------- |
| **`describegpt`** | Interacts with OpenAI / LLMs to generate descriptions, infer dictionary metadata, or query tabular data with AI. |
| **`fetch`**       | Makes concurrent HTTP GET requests per row using column values as URL parameters.                                |
| **`fetchpost`**   | Makes concurrent HTTP POST requests per row with JSON/form payloads.                                             |
| **`geocode`**     | Geocodes city and coordinate locations against local GeoNames databases without external API rate limits.        |
| **`get`**         | Fetches remote tabular data into local disk cache.                                                               |

---

## 💻 7. Scripting, Templates & Advanced Tooling

| Operation        | Description                                                                               |
| :--------------- | :---------------------------------------------------------------------------------------- |
| **`luau`**       | Executes embedded Luau scripts (sandboxed, high-performance Lua) directly on CSV records. |
| **`template`**   | Renders dynamic text templates populated by CSV row data.                                 |
| **`foreach`**    | Loops through CSV rows to execute bash/shell commands.                                    |
| **`blake3`**     | Calculates cryptographic BLAKE3 hashes for file integrity and row fingerprinting.         |
| **`validate`**   | Validates CSV data for RFC4180 compliance or against custom JSON Schema definitions.      |
| **`synthesize`** | Generates statistically faithful synthetic CSV data modeled from a source dataset.        |
| **`table`**      | Aligns CSV records into formatted ASCII terminal tables.                                  |
| **`color`**      | Displays color-coded terminal representations of tabular data.                            |
| **`lens`**       | Configures interactive tabular inspection prompts.                                        |
| **`log`**        | Logs tool and MCP invocations for auditing.                                               |
| **`pro`**        | Integrates with QSV Pro cloud services.                                                   |
| **`profile`**    | Extracts and infers DCAT-3 / Croissant schema metadata specifications.                    |
| **`prompt`**     | Launches native file dialogs.                                                             |
| **`clipboard`**  | Imports from or exports to operating system clipboard.                                    |
| **`viz`**        | Generates interactive HTML charts and Plotly dashboards from CSV data.                    |
