# Release & Versioning Guide

This repository follows **Semantic Versioning** and uses **Git Tag Triggers** (Strategy A) for releasing to npm. Pushing commits or merging pull requests to `main` **does not** automatically publish to npm. Releases are created only when a dedicated version tag (e.g. `v0.1.1`) is pushed.

---

## 🏷️ Versioning Principles (SemVer)

Follow [Semantic Versioning 2.0.0](https://semver.org/):

| Type      | Format                        | When to use                                                                   |
| :-------- | :---------------------------- | :---------------------------------------------------------------------------- |
| **Patch** | `0.1.0` $\rightarrow$ `0.1.1` | Bug fixes, documentation updates, dependency upgrades, internal refactors.    |
| **Minor** | `0.1.0` $\rightarrow$ `0.2.0` | Backward-compatible features, new node commands or properties.                |
| **Major** | `0.1.0` $\rightarrow$ `1.0.0` | Breaking changes to node properties, schemas, or minimum engine requirements. |

---

## 🚀 Step-by-Step Release Process

### 1. Ensure Local Working Tree is Clean & Tested

Make sure you are on the `main` branch with the latest changes pulled:

```bash
git checkout main
git pull origin main
pnpm install
pnpm run lint
pnpm run test
pnpm run build
```

### 2. Update the Changelog

Document the changes in [CHANGELOG.md](CHANGELOG.md) under a new version heading (e.g. `## [0.1.1] - YYYY-MM-DD`).

### 3. Bump Version & Create Git Tag

Use `npm version` (or `pnpm version`) to atomically update [package.json](package.json) and create a signed/annotated Git tag:

```bash
# For a patch release (e.g., 0.1.0 -> 0.1.1)
npm version patch -m "chore(release): %s"

# For a minor release (e.g., 0.1.0 -> 0.2.0)
npm version minor -m "chore(release): %s"

# For a major release (e.g., 0.1.0 -> 1.0.0)
npm version major -m "chore(release): %s"
```

> [!NOTE]
> This command will:
>
> 1. Update the `"version"` field in `package.json`.
> 2. Create a git commit with the message specified.
> 3. Create a Git tag named `v<version>` (e.g., `v0.1.1`).

### 4. Push Commit and Tag to GitHub

Push both the release commit and the new tag to trigger CI:

```bash
git push origin main --follow-tags
```

---

## ⚙️ Automated CI/CD (GitHub Actions)

When a tag matching `v*` (e.g., `v0.1.1`) is pushed:

1. [.github/workflows/publish.yml](.github/workflows/publish.yml) triggers automatically.
2. It sets up Node 22 and pnpm, installs frozen dependencies, and runs linter & tests.
3. It builds the project (`pnpm run build`).
4. It publishes the package to npm with **provenance attestation** (`--provenance`).

---

## 🔐 NPM Authentication & OIDC Trusted Publishers

### Method 1: Modern Tokenless OIDC via Trusted Publishers (Recommended)

npm now supports **Trusted Publishers** via OpenID Connect (OIDC). This eliminates static long-lived tokens in GitHub Actions:

#### 1. Bootstrap: Initial First-Time Publish
Because `@dartfx/n8n-nodes` is a new package, it must be published **once** manually with a personal access token before the npm package settings become available:

```bash
# In your local shell with DARTFX_NODE_AUTH_TOKEN in .env:
export $(cat .env | xargs)
export NODE_AUTH_TOKEN="${DARTFX_NODE_AUTH_TOKEN:-$NODE_AUTH_TOKEN}"
pnpm publish --tag staging --access public --no-git-checks
```

#### 2. Configure Trusted Publisher on npmjs.com
Once the initial version is on npm:
1. Log in to [npmjs.com](https://www.npmjs.com/) and open the package access page:
   `https://www.npmjs.com/package/@dartfx/n8n-nodes/access`
2. Scroll to **Trusted Publishers** and click **Add Trusted Publisher**.
3. Choose **GitHub Actions** and fill in:
   - **GitHub Organization / Owner**: `DataArtifex`
   - **Repository**: `dartfx-n8n`
   - **Workflow filename**: `publish.yml`
   - **Environment**: *(Leave blank unless using GitHub Environments)*
4. Click **Add Publisher**.

From this point forward, GitHub Actions publishes releases **100% tokenless via OIDC** with verified provenance attestation (`id-token: write`).

---

### Method 2: Traditional Static Token (Local CLI / Fallback)

For local CLI releases or until OIDC Trusted Publishing is configured:

1. Generate an npm **Automation Token** (or granular access token with _Read & Write_ permissions for `@dartfx/n8n-nodes`) on [npmjs.com](https://www.npmjs.com/).
2. In your local `.env` file:
   ```bash
   DARTFX_NODE_AUTH_TOKEN="npm_xxxxxxxxxxxx"
   ```
3. Load it in your terminal when publishing:
   ```bash
   export $(cat .env | xargs)
   export NODE_AUTH_TOKEN="${DARTFX_NODE_AUTH_TOKEN:-$NODE_AUTH_TOKEN}"
   ```
4. In GitHub Actions (as fallback), configure `DARTFX_NODE_AUTH_TOKEN` (or `NODE_AUTH_TOKEN` / `NPM_TOKEN`) under **Settings > Secrets and variables > Actions**.

---

## 🧪 Sandbox & Pre-Release Testing

Before publishing a full production release to npm's `latest` channel, you can test and sandbox using either of these two approaches:

### Method 1: Local Dry-Run Sandbox (Zero Risk, Instant)

Simulate packaging and publishing without sending anything to the npm registry:

```bash
# 1. Inspect the exact file list and package size to be bundled:
pnpm pack --dry-run

# 2. Simulate the full publish lifecycle (runs build, validates package files):
pnpm publish --dry-run --no-git-checks
```

- **What it checks**: Validates that TypeScript compiles into `/dist`, `gulpfile.js` copies icons, and [package.json](package.json) `"files"` captures only the distribution assets.

---

### Method 2: NPM Pre-Release / Beta Dist-Tag Sandbox (Real Registry, Isolated Channel)

If you want to test installing the node in a real live n8n instance from npm **without** affecting standard users or replacing the default `latest` version:

1. **Create a pre-release version tag**:

   ```bash
   # Create a beta tag (e.g. 0.1.1-beta.0)
   npm version prerelease --preid=beta -m "chore(release): %s"
   ```

2. **Publish under the `beta` distribution tag**:

   ```bash
   pnpm publish --tag beta --access public --no-git-checks
   ```

3. **Verify in n8n**:
   - Standard installs (`@dartfx/n8n-nodes` or `npm install @dartfx/n8n-nodes`) will **not** receive this beta version; they continue receiving `latest`.
   - In your test n8n instance, install using the specific tag:
     ```text
     @dartfx/n8n-nodes@beta
     ```

4. **Promote to Production Release**:
   Once validated, proceed with a standard production version bump (`npm version patch|minor|major`) and push the git tag to trigger the production CI workflow.
