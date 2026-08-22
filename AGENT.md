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
- **Runtime**: Node.js 20+ (compiled with TypeScript 5.x)
- **Framework**: `n8n-workflow` (Declarative & Programmatic node APIs)
- **Process Orchestration**: `execa` for async subprocess execution
- **Code Generation**: `tsx scripts/generate-qsv-nodes.ts` to dynamically discover all available commands from `qsv --list` and generate typed node definitions, actions, and `Qsv.node.ts` directly from CLI help
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

### 3. Version Compatibility & Graceful Degradation

- Nodes check for the presence and minimum version of `qsv` upon execution.
- If `qsv` is missing or fails, helpful actionable error messages are returned with installation instructions.

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

To test nodes directly inside a local n8n instance:

1. In `dartfx-n8n`:
   ```bash
   pnpm run build
   pnpm link --global
   ```
2. In your local n8n installation directory (`~/.n8n/custom` or local test project):
   ```bash
   pnpm link --global n8n-nodes-dartfx
   n8n start
   ```

---

## 🧠 Agent Guidelines & Best Practices

1. **Keep Node UI Clean**: Use `displayOptions: { show: { operation: ['stats'] } }` so only relevant parameters appear for each selected operation.
2. **Handle Both Paths and Streams**: Support `inputPath` (preferred) while gracefully allowing an optional `binaryPropertyName` fallback when working with upstream HTTP downloads.
3. **Structured Errors**: Wrap `execa` subprocess invocations and parse stderr to return clean n8n node operational errors ([`NodeOperationError`](https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/)).
4. **Never Block on Large Outputs**: Use `--json` / `--stats-jsonl` where appropriate, streaming directly to disk if the output is tabular or large.
