# Installation & Prerequisites

This page covers prerequisites and installation options for `n8n-nodes-dartfx`.

---

## 🛠 Prerequisites

Before installing the node package, ensure the following requirements are met:

### 1. `qsv` CLI Binary

`n8n-nodes-dartfx` orchestrates the high-performance Rust binary **`qsv`**. The `qsv` executable must be installed on the host running your n8n instance and available in the system `$PATH`.

- **macOS / Linux (via Homebrew)**:
  ```bash
  brew install qsv
  ```
- **Prebuilt Binaries**:
  Download the latest release for your architecture from the [QSV GitHub Releases](https://github.com/dathere/qsv/releases).
- **Cargo (from source)**:
  ```bash
  cargo install qsv --locked --features all_features
  ```

Verify your installation:

```bash
qsv --version
```

### 2. Node.js Environment

- Node.js version **20+** or **22+** (LTS recommended)
- `pnpm` (version 9+)

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
6. Once installation completes, the **QSV** node will appear in your node catalog when building workflows.

---

## 🐳 Docker Deployment

When deploying n8n via Docker, you can install community nodes at startup or use a custom Dockerfile that includes the `qsv` binary:

```dockerfile
FROM docker.n8n.io/n8nio/n8n:latest

USER root

# Install dependencies and download appropriate QSV binary for host architecture (x86_64 or aarch64)
RUN apk add --no-cache curl unzip bash \
    && ARCH=$(uname -m) \
    && if [ "$ARCH" = "x86_64" ]; then \
         QSV_ARCH="x86_64-unknown-linux-musl"; \
       elif [ "$ARCH" = "aarch64" ] || [ "$ARCH" = "arm64" ]; then \
         QSV_ARCH="aarch64-unknown-linux-musl"; \
       else \
         QSV_ARCH="x86_64-unknown-linux-musl"; \
       fi \
    && curl -fsSL "https://github.com/dathere/qsv/releases/latest/download/qsv-${QSV_ARCH}.zip" -o /tmp/qsv.zip \
    && unzip -q -o /tmp/qsv.zip qsv -d /usr/local/bin/ \
    && chmod +x /usr/local/bin/qsv \
    && rm -f /tmp/qsv.zip

USER node
```
