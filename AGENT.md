# 🤖 Agent Intelligence & Project Guidance: `dartfx-n8n` (`n8n-nodes-dartfx`)

Welcome, Agent. This document provides essential architectural context, conventions, and instructions for working on the **`dartfx-n8n`** repository (npm package: `n8n-nodes-dartfx`).

---

## 🚀 Project Overview & Mission

`n8n-nodes-dartfx` is a collection of custom **n8n Community Nodes** designed to power end-to-end **data FAIRification** pipelines (Findable, Accessible, Interoperable, Reusable) and high-performance tabular data wrangling.

Primary components:

1. **QSV Node (`nodes/Qsv/Qsv.node.ts`)**: Fast wrappers for [datHere QSV](https://github.com/dathere/qsv) commands (`stats`, `frequency`, `schema`, `index`, `count`, `sniff`, `to`, `sqlp`, etc.).

---

## 🛠 Tech Stack & Environment

- **Language**: TypeScript (ES2022 / CommonJS for n8n node loader)
- **Process Orchestration**: `child_process.execFile` (via Node.js `util.promisify`) for lightweight, async subprocess execution with zero external runtime dependencies
- **External Dependencies**:
  - `qsv` CLI (Rust binary, version >= 22.0.0) available in `$PATH`

---

## 📐 Architecture & Key Design Decisions

### 1. File Path-First (Zero-Copy) Data Flow

- **Default paradigm**: Pass file paths (`inputPath`, `outputPath`) across nodes rather than passing large binary buffers through n8n memory.
- **Rationale**: QSV processes multi-gigabyte datasets in seconds using memory mapping and multi-threaded indexing. Passing full binaries through n8n’s internal execution state causes memory spikes and degrades throughput.
- **Metadata Paths & Inline JSON**:
  - Summaries (like `stats`, `schema`, `frequency`) can emit **inline JSON** to the next node when small enough.
  - Heavy sidecars (like `stats.csv.data.jsonl`, generated schemas, or index files `.qsv.idx`) emit output file paths.

### 2. Dynamic Node Generation from QSV CLI

- QSV evolves rapidly with over 77 subcommands and hundreds of flags.
- **`scripts/generate-qsv-nodes.ts`** dynamically discovers installed commands via `qsv --list` and inspects `qsv <command> --help` to extract:
  - Command descriptions and parameter lists (`--flags`, `--options <arg>`, positional inputs).
  - Type mappings (boolean flags -> `boolean`, strings -> `string`, numbers -> `number`, options with presets -> `options`).
  - Dynamic parameter collection and compilation in action handlers.
  - Full synchronization of `nodes/Qsv/Qsv.node.ts` dropdowns, properties, and execute switch-cases.

### 3. Versioning & External Dependency Decoupling

- **Package SemVer (`n8n-nodes-dartfx`)**: The package adheres strictly to Semantic Versioning starting at `0.1.0`. It is intentionally decoupled from any specific tool's versioning numbers because it contains multiple node collections.
- **Node-level Dependency Binding**: Dynamic wrappers like QSV inspect the installed binary during `pnpm run generate:qsv` to capture the target CLI version (e.g. `22.0.1`) and embed it in node notices and descriptions.
- **Graceful Error Handling**: If a host binary is missing (`ENOENT`), clear actionable guidance pointing to binary installation paths and environment variables (`DARTFX_QSV_BIN_PATH`) is returned.

---

## 📂 Project Structure

```text
dartfx-n8n/
├── AGENT.md                      # This guide
├── README.md                     # User and developer documentation
├── package.json                  # npm manifest for n8n-nodes-dartfx
├── tsconfig.json                 # TypeScript compiler configuration
├── gulpfile.js                   # Build pipeline for static node assets (svg, json)
├── scripts/
│   └── generate-qsv-nodes.ts     # CLI-to-n8n-node generator
├── nodes/
│   └── Qsv/
│       ├── Qsv.node.ts           # Main QSV node implementation
│       ├── Qsv.node.json         # Node metadata & catalog categorization
│       ├── qsv.svg               # Node icon
│       ├── descriptions/         # UI property definitions per command
│       │   ├── IndexDescription.ts
│       │   ├── StatsDescription.ts
│       │   ├── FrequencyDescription.ts
│       │   └── SchemaDescription.ts
│       └── actions/              # Subprocess execution handlers
│           ├── executeIndex.ts
│           ├── executeStats.ts
│           ├── executeFrequency.ts
│           └── executeSchema.ts
└── test/
    └── Qsv.node.test.ts
```

---

## 📖 Development & Testing Workflows

### 📦 Package Management with `pnpm`

Always use `pnpm` for managing Node dependencies and scripts.

- **Install dependencies**: `pnpm install`
- **Build package**: `pnpm run build`
- **Watch mode**: `pnpm run dev`
- **Lint**: `pnpm run lint`
- **Regenerate QSV nodes**: `pnpm run generate:qsv`

### 🧪 Local Testing with n8n

#### Option 1: Docker Volume Mount (Standard & Required for n8n 3.0+)

```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  -v $(pwd):/home/node/.n8n/custom/node_modules/n8n-nodes-dartfx:ro \
  -v /path/to/local/qsv:/usr/local/bin/qsv:ro \
  docker.n8n.io/n8nio/n8n:latest
```

#### Option 2: Bare CLI Linking (n8n v1 / v2 only)

1. In `dartfx-n8n`:
   ```bash
   pnpm run build
   pnpm link --global
   ```
2. In your local n8n installation directory (`~/.n8n/custom`):
   ```bash
   pnpm link --global n8n-nodes-dartfx
   n8n start
   ```

### 🚀 Release & Publishing

Releases to npm are triggered via Git tags. See [RELEASING.md](RELEASING.md) for full step-by-step instructions.

```bash
npm version patch -m "chore(release): %s"
git push origin main --follow-tags
```

---

## 🧠 Agent Guidelines & Best Practices

1. **Keep Node UI Clean**: Use `displayOptions: { show: { operation: ['stats'] } }` so only relevant parameters appear for each selected operation.
2. **Handle Both Paths and Streams**: Support `inputPath` (preferred) while gracefully allowing an optional `binaryPropertyName` fallback when working with upstream HTTP downloads.
3. **Structured Errors**: Wrap `child_process.execFile` subprocess invocations and parse stderr to return clean n8n node operational errors ([`NodeOperationError`](https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/)).
4. **Never Block on Large Outputs**: Use `--json` / `--stats-jsonl` where appropriate, streaming directly to disk if the output is tabular or large.
