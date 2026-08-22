# Local Testing & Development

This guide explains how to test `n8n-nodes-dartfx` inside a local n8n instance during development.

---

## 🏗️ 1. Build and Watch

First, clone the repository, install dependencies, and start TypeScript watch mode:

```bash
# Clone repository
git clone https://github.com/DataArtifex/dartfx-n8n.git
cd dartfx-n8n

# Use supported Node LTS
nvm use

# Install dependencies
pnpm install

# Build package
pnpm run build

# Start live TypeScript compilation
pnpm run dev
```

---

## 🔗 2. Linking to Local n8n

### Method A: Direct Local Linking (`pnpm link <dir>`) — Recommended

In `pnpm`, link directly to the package directory in a single step:

```bash
mkdir -p ~/.n8n/custom
cd ~/.n8n/custom
pnpm link /path/to/dartfx-n8n

# Start n8n
n8n start
```

### Method B: Traditional 2-Step `npm link`

```bash
# Step 1: In the dartfx-n8n directory
cd /path/to/dartfx-n8n
npm link

# Step 2: In the n8n custom directory
mkdir -p ~/.n8n/custom
cd ~/.n8n/custom
npm link n8n-nodes-dartfx

# Start n8n
n8n start
```

### Method C: Docker Volume Mount

If running n8n via Docker, mount your local workspace into the container:

```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  -v $(pwd):/home/node/.n8n/custom/node_modules/n8n-nodes-dartfx:ro \
  docker.n8n.io/n8nio/n8n
```

---

## 🔄 Refreshing Changes During Development

- **TypeScript Compilation**: `pnpm run dev` continuously compiles `.ts` files into `dist/`.
- **n8n Reloading**: Because n8n loads custom node modules into Node memory at startup, **you must restart `n8n start`** (`Ctrl + C` then `n8n start`) when node code changes.
- **UI Refresh**: Hard-refresh your browser tab (`Cmd + Shift + R` or `Ctrl + F5`) to fetch the updated node UI schemas.
