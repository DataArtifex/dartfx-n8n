# n8n Community Nodes for Data Artifex (`n8n-nodes-dartfx`)

[![npm version](https://img.shields.io/npm/v/n8n-nodes-dartfx.svg)](https://www.npmjs.com/package/n8n-nodes-dartfx)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> [!WARNING]
> **Experimental / Early-Stage Project**: This project is under active development. Node APIs, parameters, and operation interfaces may change between versions.

A collection of custom [n8n](https://n8n.io/) community nodes to support **data FAIRification** pipelines and high-performance tabular data wrangling using [datHere QSV](https://github.com/dathere/qsv), Data Artifex packages, and other tools.

---

## ⚡ Key Features

- **File Path-First (Zero-Copy Architecture)**: Pass filesystem paths (`inputPath`, `outputPath`) between nodes to stream multi-gigabyte datasets directly through native Rust engines without overwhelming n8n memory.
- **77+ Automated QSV Operations**: Full suite of high-performance tabular operations:
  - **Profiling & Analysis**: `stats`, `frequency`, `schema`, `sniff`, `count`, `moarstats`, `pragmastat`
  - **Transformation & Cleaning**: `apply`, `behead`, `dedup`, `denull`, `fill`, `flatten`, `fmt`, `replace`, `safenames`, `rename`, `pseudo`
  - **Slicing, Search & Sampling**: `index`, `slice`, `search`, `searchset`, `select`, `sample`, `split`, `partition`
  - **High-Speed SQL & Joins**: `sqlp` (Polars SQL engine), `join`, `joinp`, `pivotp`, `diff`, `explode`, `implode`
  - **Format Conversions**: `to` (Parquet, XLSX, SQLite, Postgres), `excel`, `json`, `jsonl`, `tojsonl`, `fixedwidth`, `geoconvert`
  - **AI & Web Services**: `describegpt` (LLM metadata/chat), `fetch`, `fetchpost`, `geocode`
  - **Advanced Scripting & Validation**: `luau` embedded scripting, `validate` (JSON Schema / RFC4180), `blake3` cryptographic hashing, `synthesize`
- **Dynamic CLI Synchronizer**: `pnpm run generate:qsv` automatically queries `qsv --list` and keeps all node definitions and parameter forms synchronized with your installed QSV binary.

---

## 📦 Installation

### In self-hosted n8n instances:

Follow the [n8n Community Nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/):

1. Go to **Settings > Community Nodes**.
2. Select **Install**.
3. Enter `n8n-nodes-dartfx`.
4. Agree to the risks and select **Install**.

---

## 🛠 System Prerequisites

This community node executes the high-performance **[QSV CLI](https://github.com/dathere/qsv)** under the hood. The `qsv` binary **must be installed and accessible in the system `$PATH`** where n8n is running.

### 1. Host Installation
- **macOS (Homebrew)**:
  ```bash
  brew install qsv
  ```
- **Debian / Ubuntu / Linux**:
  Download pre-compiled binaries from [QSV GitHub Releases](https://github.com/dathere/qsv/releases) or build via Cargo:
  ```bash
  cargo install qsv --locked --bin qsv --features all_features
  ```
- **Windows**:
  ```powershell
  scoop install qsv
  # or
  choco install qsv
  ```

### 2. Docker / Self-Hosted n8n Container
If you run n8n using Docker, create a custom image that includes the `qsv` binary:

```dockerfile
FROM docker.n8n.io/n8nio/n8n:latest

USER root
# Install QSV pre-compiled binary for musl/alpine
RUN apk add --no-cache curl tar \
    && ARCH=$(uname -m) \
    && if [ "$ARCH" = "x86_64" ]; then QSV_ARCH="x86_64-unknown-linux-musl"; \
       elif [ "$ARCH" = "aarch64" ]; then QSV_ARCH="aarch64-unknown-linux-musl"; fi \
    && curl -fsSL "https://github.com/dathere/qsv/releases/latest/download/qsv-latest-${QSV_ARCH}.tar.gz" | tar -xz -C /usr/local/bin \
    && chmod +x /usr/local/bin/qsv

USER node
```

- **Node.js**: v20+ (for local development & building)

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

#### Method A: Direct Local Link with `pnpm link <dir>` — _Recommended_

In `pnpm`, you link directly to the local package folder in one step:

```bash
mkdir -p ~/.n8n/custom
cd ~/.n8n/custom
pnpm link /path/to/dartfx-n8n

# Start n8n
n8n start
```

> **🔄 Do changes auto-refresh?**
>
> - **Recompilation**: Running `pnpm run dev` automatically recompiles TypeScript into `dist/` on save.
> - **n8n Process**: **No**, n8n caches loaded node modules in memory on startup. You must **stop and restart `n8n start`** (and reload your browser tab) whenever you update node code for changes to take effect.

#### Method B: Traditional 2-Step `npm link`

```bash
# Step 1: Register package globally
cd /path/to/dartfx-n8n
npm link

# Step 2: Link into n8n custom directory
mkdir -p ~/.n8n/custom
cd ~/.n8n/custom
npm link n8n-nodes-dartfx

# Start n8n
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

### 3. Troubleshooting & Permissions

#### macOS External Drive Permissions (`/Volumes/...` / `os error 2` / `os error 1`)

If you see errors like:

```text
Failed executing 'qsv count': io error: No such file or directory (os error 2)
# or
io error: Operation not permitted (os error 1)
```

when accessing files on external drives (under `/Volumes/<DriveName>/...`):

1. macOS restricts child processes spawned by Node from accessing external drives without user consent.
2. Go to **System Settings** > **Privacy & Security** > **Files and Folders** (or **Full Disk Access**).
3. Locate the application where you run `n8n` (e.g. **Terminal**, **iTerm2**, **VS Code**, or **Ghostty**).
4. Ensure **Removable Volumes** (and/or **Full Disk Access**) is toggled **ON**.
5. Restart your terminal / n8n session.

#### Docker Filesystem Paths

If n8n is running inside Docker, host filesystem paths like `/Volumes/...` or `/Users/...` are **not visible** inside the container by default. You must volume-mount the data directory into the container:

```bash
-v /Volumes/MyExternalDrive/data:/data:ro
```

and then reference the path inside n8n as `/data/myfile.csv`.

---

See [AGENT.md](AGENT.md) for full architecture and development workflows.
