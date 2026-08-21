# QSV Operations Reference

`n8n-nodes-dartfx` supports 13 high-performance QSV operations:

---

## 📊 Summary & Profiling

### `stats`

Computes column-wise summary statistics, data type inference, min/max, mean, median, standard deviation, and quantiles.

- **Key Options**:
  - `everything`: Compute all available statistics including advanced measures.
  - `typesonly`: Infer data types only (faster).
  - `cardinality`: Calculate exact or approximate unique values per column.
  - `nullcheck`: Explicit null checking.
- **Output**: Structured JSON array containing stats for each column.

### `frequency`

Calculates frequency distributions, top values, and unique counts for columns.

- **Key Options**:
  - `select`: Limit frequency calculation to specific columns (names or 1-based indices).
  - `limit`: Number of top frequent values to return per column (default: `10`).
  - `asc`: Sort ascending instead of descending.

### `schema`

Infers a complete **JSON Schema** from tabular data, including type constraints, min/max, string patterns, and required fields.

- **Key Options**:
  - `pattern-columns`: Enable regex pattern inference for text columns.
  - `enum-threshold`: Threshold under which unique values are converted to enum sets.
  - `strict-dates`: Strict ISO 8601 date parsing.

### `sniff`

Quickly probes and identifies CSV metadata (delimiter, quote character, header row presence, line terminators, encoding, and row count estimate).

### `count`

Returns the exact number of records in the dataset in sub-seconds.

- **Key Options**:
  - `human-readable`: Format large row counts with commas (e.g. `1,245,900`).
  - `width`: Count column width instead of rows.

---

## 🔍 Slicing, Searching & Transformation

### `index`

Builds a `.qsv.idx` index file for the CSV, enabling instantaneous sub-second random access and slicing across multi-gigabyte files.

### `select`

Reorders, selects, or drops specific columns using indices or column names.

- **Key Options**:
  - `selection`: Column selector expression (e.g. `id,name,1-5,status`).

### `slice`

Slices rows from the dataset by index range (start, end, length, or index).

- **Key Options**:
  - `start`: 0-based starting record offset.
  - `end`: Ending record offset.
  - `len`: Total number of records to return.
  - `index`: Single row index to extract.

### `search`

Applies high-speed regex search across specified columns or the entire dataset.

- **Key Options**:
  - `regex`: Regular expression pattern to search.
  - `select`: Limit search to specific column(s).
  - `ignore-case`: Case-insensitive search.
  - `invert-match`: Invert match to select non-matching rows.

### `sample`

Extracts a random or stratified sample of rows from a dataset.

- **Key Options**:
  - `sample-size`: Number of records to extract.
  - `seed`: Random seed for reproducible sampling.

### `sort`

Sorts rows lexicographically or numerically across one or multiple columns.

- **Key Options**:
  - `select`: Column(s) to sort by.
  - `numeric`: Treat column values as numbers during sort.
  - `reverse`: Reverse sort order (descending).

---

## 🛡️ Validation & Conversion

### `validate`

Validates tabular data against a JSON Schema, returning errors and non-compliant row indices.

- **Key Options**:
  - `schema`: Path to JSON Schema file.
  - `fail-fast`: Stop validation upon first error encountered.

### `to`

Converts tabular datasets between formats (`json`, `jsonl`, `parquet`, `xlsx`, etc.).

- **Key Options**:
  - `format`: Target export format.
