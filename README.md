# n8n Community Nodes for Data Artifex (`n8n-nodes-dartfx`)

[![npm version](https://img.shields.io/npm/v/n8n-nodes-dartfx.svg)](https://www.npmjs.com/package/n8n-nodes-dartfx)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A collection of custom [n8n](https://n8n.io/) community nodes to support **data FAIRification** pipelines and high-performance tabular data wrangling using [datHere QSV](https://github.com/dathere/qsv).

---

## ⚡ Key Features

- **File Path-First (Zero-Copy Architecture)**: Pass filesystem paths (`inputPath`, `outputPath`) between nodes to stream multi-gigabyte datasets directly through native Rust/Python engines without overwhelming n8n memory.
- **Automated QSV Wrappers**: High-speed wrappers for:
  - `stats`: Column-wise statistics, quantiles, and data type detection.
  - `frequency`: Frequency distributions and cardinality calculations.
  - `schema`: Automated JSON Schema inference.
  - `index`: Rapid multi-threaded indexing for sub-second slicing and search.
  - `count`: Instant record counting.
- **FAIRification Utilities**: Universal Numeric Fingerprints (UNF), Frictionless Table Schema validation, and metadata crosswalks.

---

## 📦 Installation

### In self-hosted n8n instances:
Follow the [n8n Community Nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/):

1. Go to **Settings > Community Nodes**.
2. Select **Install**.
3. Enter `n8n-nodes-dartfx`.
4. Agree to the risks and select **Install**.

---

## 🛠 Prerequisites

- **[QSV CLI](https://github.com/dathere/qsv)**: The `qsv` binary must be installed and accessible in the system `$PATH` where n8n is running.
- **Node.js**: v20+

---

## 💻 Development

```bash
# Clone repository
git clone https://github.com/DataArtifex/dartfx-n8n.git
cd dartfx-n8n

# Install dependencies
npm install

# Regenerate QSV node definitions from latest CLI help
npm run generate:qsv

# Build package
npm run build
```

See [AGENT.md](AGENT.md) for full architecture and development workflows.
