# QSV Node Overview

The **QSV Node** (`n8n-nodes-dartfx.qsv`) provides high-performance tabular data wrangling inside n8n workflows by wrapping the [datHere QSV](https://github.com/dathere/qsv) Rust command-line suite.

---

## ⚡ Zero-Copy (File Path-First) Architecture

A key differentiator of `n8n-nodes-dartfx` is its **zero-copy dataflow model**:

### The Problem with Large Binaries in n8n

Standard n8n nodes often pass full file buffers between nodes in memory (`items[0].binary`). For multi-gigabyte CSV datasets (100MB to 50GB+), storing binary buffers inside the n8n execution state causes JavaScript V8 heap exhaustion and dramatic workflow slowdowns.

### The Solution: Filesystem Paths

`n8n-nodes-dartfx` relies on filesystem paths:

1. Upstream nodes download or prepare data on disk and emit an `inputPath` (e.g. `/data/incoming.csv`).
2. The QSV Node receives `inputPath`, executes multi-threaded Rust routines with SIMD vectorization and memory-mapped IO, and writes directly to disk or stdout.
3. The node outputs either **inline JSON summaries** (for stats/schemas) or an `outputPath` for downstream operations.

```
[ Download / Local File ] ──(inputPath)──► [ QSV Node ] ──(outputPath / JSON)──► [ Downstream Node ]
                                                │
                                       Direct Disk Streaming
                                       (No V8 Memory Overhead)
```

---

## ⚙️ General Node Properties

Every QSV operation shares these core properties:

| Property             | Type               | Description                                                                                             |
| :------------------- | :----------------- | :------------------------------------------------------------------------------------------------------ |
| **Operation**        | Dropdown           | The QSV subcommand to execute (`count`, `stats`, `frequency`, `schema`, etc.)                           |
| **Input File Path**  | String             | Absolute or relative path to the source tabular file (`.csv`, `.tsv`, `.tab`).                          |
| **Output File Path** | String (Optional)  | Where to save command output. If left empty for summary operations, data is emitted as structured JSON. |
| **Delimiter**        | String (Optional)  | Field delimiter character (default: `,`).                                                               |
| **No Headers**       | Boolean (Optional) | When active, the first row is treated as data rather than column headers.                               |
