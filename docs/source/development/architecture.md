# Architecture & Developer Guide

This document details the internal architecture and development patterns of `n8n-nodes-dartfx`.

---

## 📂 Source Code Layout

```text
dartfx-n8n/
├── nodes/
│   └── Qsv/
│       ├── Qsv.node.ts           # Main INodeType class definition
│       ├── Qsv.node.json         # Node metadata & catalog categorization
│       ├── qsv.svg               # Node icon
│       ├── descriptions/         # UI property definitions per command
│       │   ├── CountDescription.ts
│       │   ├── FrequencyDescription.ts
│       │   ├── StatsDescription.ts
│       │   └── ...
│       └── actions/              # Subprocess execution handlers
│           ├── executeCount.ts
│           ├── executeFrequency.ts
│           ├── executeStats.ts
│           └── ...
├── scripts/
│   └── generate-qsv-nodes.ts     # CLI-to-node automated generator
└── docs/                         # Sphinx documentation
```

---

## ⚙️ Execution Flow

When an n8n workflow triggers the QSV node:

1. **`execute()` in `Qsv.node.ts`**:
   - Loops over incoming items.
   - Reads the chosen `operation` (`stats`, `count`, `schema`, etc.).
   - Dispatches to the corresponding handler in `nodes/Qsv/actions/execute<Operation>.ts`.
2. **Action Handlers (`actions/execute*.ts`)**:
   - Extracts node parameters.
   - Constructs argument array for `qsv` (e.g. `['stats', '--everything', '--json', inputPath]`).
   - Invokes `execa('qsv', args)`.
3. **Output Emission**:
   - If `outputPath` is specified, writes to disk and returns `{ json: { outputPath, success: true } }`.
   - If stdout returns JSON, parses and emits structured data objects into the n8n execution pipeline.

---

## 🤖 Automated Node Generation (`generate:qsv`)

QSV has numerous commands and options. The code generator script (`scripts/generate-qsv-nodes.ts`):

1. Runs `qsv <command> --help`.
2. Parses CLI flags, arguments, descriptions, and default values.
3. Automatically generates:
   - `nodes/Qsv/descriptions/<Command>Description.ts` (n8n UI properties)
   - `nodes/Qsv/actions/execute<Command>.ts` (subprocess execution logic)

Run the generator whenever updating QSV CLI versions:

```bash
pnpm run generate:qsv
pnpm run format
pnpm run build
```
