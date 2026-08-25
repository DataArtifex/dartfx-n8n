# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-08-24

### Added

- **Initial Release** of `n8n-nodes-dartfx` community node package for tabular data FAIRification and wrangling.
- **77 QSV Operations**: Full suite of tabular data profiling, transformation, slicing, joining, format conversion, and validation tools powered by QSV.
- **Zero-Copy File-Path Architecture**: Pass filesystem paths (`inputPath`, `outputPath`) directly to native Rust engines for multi-gigabyte dataset processing without memory overhead.
- **Flexible Binary Resolution**: Support for `DARTFX_QSV_BIN_PATH` and `QSV_BIN_PATH` environment variables for custom installations on Docker and self-hosted environments.
- **Dynamic CLI Synchronizer**: `pnpm run generate:qsv` script to auto-generate and synchronize node definitions directly from the installed QSV CLI binary.
- **Automated Quality Assurance**: Unit tests for node contracts, parameter parsing, error handling (`ENOENT` binary detection), and execution against tabular test fixtures.
