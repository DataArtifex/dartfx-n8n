# Installation & Prerequisites

This page covers prerequisites, platform architecture compatibility, and installation options for `n8n-nodes-dartfx`.

---

## 🛠 Prerequisites

Before installing the node package, ensure the following requirements are met:

### 1. `qsv` CLI Binary

`n8n-nodes-dartfx` orchestrates the high-performance Rust binary **`qsv`**. The `qsv` executable must be installed on the host running your n8n instance and available in the system `$PATH` (or specified via `DARTFX_QSV_BIN_PATH`).

- **macOS / Linux (via Homebrew)**:
  ```bash
  brew install qsv
  ```
- **Prebuilt Binaries**:
  Download pre-compiled release packages for your platform from the [QSV GitHub Releases](https://github.com/dathere/qsv/releases).
- **Cargo (from source with all features)**:
  ```bash
  cargo install qsv --locked --bin qsv --features all_features
  ```

Verify your installation:

```bash
qsv --version
```

### 2. Node.js Environment

- Node.js version **20+** or **22+** (LTS recommended)
- `pnpm` (version 9+)

---

## 📊 QSV Platform & Feature Availability Matrix

QSV uses Rust Cargo feature flags to modularly compile high-performance sub-engines. Depending on how QSV is packaged for your OS/architecture:

| Feature / Category | Commands Included | Availability in Prebuilt Releases | Cargo Feature Flag |
| :--- | :--- | :--- | :--- |
| **Core Operations** | `stats`, `frequency`, `schema`, `count`, `sniff`, `sample`, `select`, `slice`, `sort`, `search`, `replace`, `rename`, `dedup`, `flatten`, `join`, `split`, `partition`, `pseudo`, `edit`, `validate` (and ~40 more) | **All Platforms** (x86_64 Linux, aarch64 Linux, macOS, Windows) | _(Default)_ |
| **Polars SQL & Joins** | `sqlp`, `joinp`, `pivotp`, `scoresql` | x86_64 Linux GNU, macOS Darwin, Windows | `polars` |
| **Format Conversions** | `to` (Parquet, XLSX, SQLite, Postgres, ODS, DataPackage) | x86_64 Linux GNU, macOS Darwin, Windows | `to` |
| **Embedded Scripting** | `luau` | x86_64 Linux GNU, macOS Darwin, Windows | `luau` |
| **Synthetic Data Generation** | `synthesize` | macOS Darwin, `all_features` builds | `synthesize` |
| **Spatial Geocoding** | `geocode`, `geoconvert` | x86_64 Linux GNU, macOS Darwin, Windows | `geocode` |
| **Data Visualization** | `viz` | x86_64 Linux GNU, macOS Darwin, Windows | `viz` |
| **Metadata Profiling** | `profile` | macOS Darwin, `all_features` builds | `profile` |

> [!NOTE]
> If a workflow executes an operation not compiled into your host's QSV binary, `n8n-nodes-dartfx` raises an actionable `NodeOperationError` explaining which Cargo feature is required.

---

## 📦 Installing in Self-Hosted n8n

You can install `n8n-nodes-dartfx` directly through the n8n web interface:

1. Open your n8n dashboard.
2. Navigate to **Settings** > **Community Nodes**.
3. Click **Install**.
4. Enter the package name:
   ```text
   n8n-nodes-dartfx
   ```
5. Check the risk agreement checkbox and click **Install**.
6. Once installation completes, the **QSV Data Wrangler** node will appear in your node catalog when building workflows.

---

## 🐳 Docker Deployment

When deploying n8n via Docker, use a multi-stage Dockerfile that fetches the versioned QSV release binary:

```dockerfile
# Stage 1: Fetch and unpack the QSV binary
FROM alpine:latest AS qsv-fetcher

ARG QSV_VERSION=22.0.1
RUN apk add --no-cache curl unzip \
    && ARCH=$(uname -m) \
    && if [ "$ARCH" = "x86_64" ]; then \
         QSV_ARCH="x86_64-unknown-linux-musl"; \
       elif [ "$ARCH" = "aarch64" ] || [ "$ARCH" = "arm64" ]; then \
         QSV_ARCH="aarch64-unknown-linux-gnu"; \
       else \
         QSV_ARCH="x86_64-unknown-linux-musl"; \
       fi \
    && curl -fsSL "https://github.com/dathere/qsv/releases/download/${QSV_VERSION}/qsv-${QSV_VERSION}-${QSV_ARCH}.zip" -o /tmp/qsv.zip \
    && unzip -q -o /tmp/qsv.zip qsv -d /usr/local/bin/ \
    && chmod +x /usr/local/bin/qsv

# Stage 2: n8n runtime image
FROM docker.n8n.io/n8nio/n8n:latest

USER root
COPY --from=qsv-fetcher /usr/local/bin/qsv /usr/local/bin/qsv
USER node
```

### Docker Compose Example

```yaml
services:
  n8n:
    build:
      context: .
      dockerfile: Dockerfile
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      - N8N_COMMUNITY_PACKAGES_ENABLED=true
      - DARTFX_QSV_BIN_PATH=/usr/local/bin/qsv
    volumes:
      - n8n_data:/home/node/.n8n
      - ./data:/data

volumes:
  n8n_data:
```
