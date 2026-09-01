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
   - Invokes `child_process.execFile` (promisified) with configurable `maxBuffer`.
3. **Output Emission**:
   - Returns `{ json: { success: true, command, inputPath, outputPath?, result, warnings? } }`.
   - When `outputPath` is specified, writes to disk and passes `outputPath` in the returned JSON object for zero-copy chaining in downstream nodes (`{{ $json.outputPath }}`).
   - If stdout returns JSON, parses and emits structured data objects in `result`. If warnings occurred, passes them in `warnings`.

---

## 🤖 Automated Node Generation (`generate:qsv`)

QSV has over 77 commands and hundreds of flags. The code generator script (`scripts/generate-qsv-nodes.ts`):

1. Executes `qsv --list` dynamically to discover all installed subcommands in the active binary.
2. Runs `qsv <command> --help` for each command.
3. Parses CLI flags, arguments, descriptions, and default values.
4. Generates:
   - `nodes/Qsv/descriptions/<Command>Description.ts` (Typed n8n UI properties)
   - `nodes/Qsv/actions/execute<Command>.ts` (Subprocess execution logic and dynamic CLI flag compiler)
5. Automatically rewires and updates `nodes/Qsv/Qsv.node.ts` with all discovered operations and handlers.

Run the generator whenever updating QSV CLI versions:

```bash
pnpm run generate:qsv
pnpm run format
pnpm run build
```
