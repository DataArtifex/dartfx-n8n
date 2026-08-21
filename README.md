# n8n Community Nodes for Data Artifex (`n8n-nodes-dartfx`)

[![npm version](https://img.shields.io/npm/v/n8n-nodes-dartfx.svg)](https://www.npmjs.com/package/n8n-nodes-dartfx)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> [!WARNING]
> **Experimental / Early-Stage Project**: This project is under active development. Node APIs, parameters, and operation interfaces may change between versions.

A collection of custom [n8n](https://n8n.io/) community nodes to support **data FAIRification** pipelines and high-performance tabular data wrangling using [datHere QSV](https://github.com/dathere/qsv), Data Artifex packages, and other tools.

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

## 💻 Development & Local Testing

### 1. Setup & Build

```bash
# Clone repository
git clone https://github.com/DataArtifex/dartfx-n8n.git
cd dartfx-n8n

# Use supported Node LTS (20/22)
nvm use

# Install dependencies
pnpm install

# Regenerate QSV node definitions from latest CLI help (if updating QSV commands)
pnpm run generate:qsv

# Build package
pnpm run build

# Watch mode for active development
pnpm run dev
```

---

### 2. Testing with a Local n8n Instance

#### Method A: Global Linking (`pnpm link --global`) — _Recommended_

1. Register the local package globally:

   ```bash
   cd /path/to/dartfx-n8n
   pnpm link --global
   ```

2. Link it into your n8n custom nodes directory:

   ```bash
   mkdir -p ~/.n8n/custom
   cd ~/.n8n/custom
   pnpm link --global n8n-nodes-dartfx
   ```

3. Start n8n:
   ```bash
   n8n start
   ```

> **🔄 Do changes auto-refresh?**
>
> - **Recompilation**: Running `pnpm run dev` automatically recompiles TypeScript into `dist/` on save.
> - **n8n Process**: **No**, n8n caches loaded node modules in memory on startup. You must **stop and restart `n8n start`** (and reload your browser tab) whenever you update node code for changes to take effect.

#### Method B: Direct Local Installation (`pnpm add`)

```bash
mkdir -p ~/.n8n/custom
cd ~/.n8n/custom
pnpm add /path/to/dartfx-n8n
n8n start
```

#### Method C: Docker Volume Mount

If running n8n in Docker, mount the built package into the container's custom nodes folder:

```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  -v $(pwd):/home/node/.n8n/custom/node_modules/n8n-nodes-dartfx:ro \
  docker.n8n.io/n8nio/n8n
```

_(Note: `qsv` CLI must be installed and accessible in the Docker container's `$PATH` for QSV nodes to execute)._

---

See [AGENT.md](AGENT.md) for full architecture and development workflows.
