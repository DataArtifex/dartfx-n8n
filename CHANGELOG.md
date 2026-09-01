# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-09-01

### Added

- **Initial Release** of `n8n-nodes-dartfx` community node package for high-performance tabular data FAIRification and wrangling.
- **77 QSV Operations**: Full suite of tabular data profiling, transformation, slicing, joining, SQL querying, format conversion, and validation tools powered by [datHere QSV](https://github.com/dathere/qsv).
- **Zero-Copy File-Path Architecture**: Pass filesystem paths (`inputPath`, `outputPath`) directly to native Rust engines for multi-gigabyte dataset processing without memory overhead.
- **Zero-Copy Downstream Node Chaining**: Action handlers emit `outputPath` in the returned JSON result, enabling downstream n8n nodes to reference `{{ $json.outputPath }}` directly.
- **CLI Warnings in Output Payload**: Captured non-fatal stderr from CLI executions and exposed under `warnings` in the JSON result.
- **Quote-Aware Arguments**: Added quote-aware tokenizer for `additionalArgs` allowing flags containing spaces and quotes (e.g., `--select "col A, col B"`).
- **Dynamic CLI Synchronizer**: `scripts/generate-qsv-nodes.ts` (`pnpm run generate:qsv`) to auto-generate and synchronize typed node definitions, UI property descriptions, and action handlers directly from `qsv --list` and CLI help.
- **Flexible Binary Resolution**: Support for `DARTFX_QSV_BIN_PATH`, `QSV_BIN_PATH`, and `QSV_PATH` environment variables for custom binary locations on Docker and self-hosted environments.
- **Granular Diagnostics & Error Handling**: Actionable `NodeOperationError` guidance for missing host binaries (`ENOENT`), platform permissions / macOS full disk access, missing input files, missing QSV feature-build commands (e.g., `sqlp`, `geocode`, `to`), and `maxBuffer` limit overflows (50 MB) recommending direct file output via `outputPath`.
- **Automated Quality Assurance**: Comprehensive Jest test suite testing node structure, operation metadata, boolean flags, `outputPath` propagation, quote-aware CLI arguments, and error handling against test fixtures.
- **Sphinx Documentation**: Complete MyST documentation suite covering installation, multi-arch Docker deployment, local testing workflows, architecture, and node operation guides.
- **CI & Build Tooling**: GitHub Actions CI workflow for linting, type-checking, building, and automated Jest test execution with QSV binary caching, pinned pnpm `11.15.1`, and Node.js 22 LTS engine support.

### Fixed & Hardened

- **Boolean Flag Execution**: Fixed regex tokenization in CLI help generator so sentence-cased descriptions no longer convert boolean flags to string options; boolean options correctly emit standalone flags (e.g., `--no-headers`) instead of invalid string values (`--no-headers true`).
- **Options Collection Rendering**: Removed redundant child `displayOptions` in generated descriptions that prevented options from rendering in the n8n canvas UI.
- **Duplicate `--output` Prevention**: Excluded `output` from the dynamic options collection to avoid duplicate `--output` arguments alongside top-level `outputPath`.
- **Subprocess Execution**: Standardized all 77 node actions on native Node.js `child_process.execFile` (promisified) with zero external runtime dependencies.
- **Docker Installation Instructions**: Updated Dockerfile documentation to support multi-architecture downloads (`x86_64` and `aarch64` / Apple Silicon) with required dependencies (`curl`, `unzip`, `bash`).
- **Documentation Alignment**: Synchronized `AGENT.md` and `architecture.md` with implementation standards.
