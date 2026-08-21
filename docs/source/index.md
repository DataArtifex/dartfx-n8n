# `n8n-nodes-dartfx` Documentation

```{warning}
**Experimental / Early-Stage Project**: This project is under active development. Node APIs, parameters, and operation interfaces are subject to change between releases.
```

Welcome to the documentation for **`n8n-nodes-dartfx`**, the official [n8n](https://n8n.io/) community node package from **Data Artifex** for high-performance tabular data wrangling and processing using [datHere QSV](https://github.com/dathere/qsv).

---

## ⚡ Overview & Key Highlights

- **File Path-First (Zero-Copy Architecture)**: Pass filesystem paths (`inputPath`, `outputPath`) between nodes to stream multi-gigabyte datasets directly through native Rust engines without consuming n8n JavaScript heap memory.
- **13+ Native QSV Operations**: Automated high-performance operations including `stats`, `frequency`, `schema`, `index`, `count`, `sniff`, `sample`, `select`, `slice`, `sort`, `search`, `validate`, and `to`.
- **Seamless n8n Integration**: Fully typed parameter forms, dynamic conditional options, and clean error formatting.

---

```{toctree}
:maxdepth: 2
:caption: Getting Started

getting-started/installation
getting-started/local-testing
```

```{toctree}
:maxdepth: 2
:caption: Node Reference

nodes/qsv-overview
nodes/qsv-operations
```

```{toctree}
:maxdepth: 2
:caption: Development & Internals

development/architecture
```

---

## 🚀 Quick Example: Analyzing a 10M Row CSV

1. In n8n, add a **QSV** node.
2. Set **Operation** to `Stats`.
3. Set **Input File Path** to `/data/large_dataset.csv`.
4. Run the node — QSV computes comprehensive column-wise statistics, quantiles, and data type summaries in sub-seconds and emits structured JSON directly into your downstream workflow.
