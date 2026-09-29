# Release & Deployment Guide

This document defines the lifecycle, versioning rules, and workflows for **Staging** (isolated pre-release testing) and **Production** (general availability) deployments of `@dartfx/n8n-nodes`.

---

## 🧭 Staging vs. Production at a Glance

| Feature / Step | 🧪 Staging Deployment | 🚢 Production Deployment |
| :--- | :--- | :--- |
| **Target Channel (dist-tag)** | `--tag staging` (or `beta`) | `latest` (default npm channel) |
| **SemVer Format** | `0.1.0-staging.0` (pre-release) | `0.1.0` (stable release) |
| **Git Tag Created?** | **No** (`--no-git-tag-version`) | **Yes** (`v0.1.0` annotated tag) |
| **Triggers CI/CD?** | No (manual CLI push) | **Yes** (GitHub Actions triggers on `v*` tag) |
| **Who Receives It?** | Only test instances specifying `@staging` | All users installing `@dartfx/n8n-nodes` |
| **Git Hygiene Check** | Bypassed (`--no-git-checks`) | Enforced (clean working tree on `main`) |
| **npm Provenance** | Optional | **Enforced** (`--provenance` via OIDC) |

---

## 🏷️ Versioning Principles (SemVer)

Follow [Semantic Versioning 2.0.0](https://semver.org/):

| Type | Format | When to use |
| :--- | :--- | :--- |
| **Staging / Pre-release** | `0.1.0-staging.0` | Feature validation, sandbox testing, CI smoke tests. |
| **Patch** | `0.1.0` $\rightarrow$ `0.1.1` | Bug fixes, doc updates, dependency upgrades, internal refactors. |
| **Minor** | `0.1.0` $\rightarrow$ `0.2.0` | Backward-compatible features, new node commands or properties. |
| **Major** | `0.1.0` $\rightarrow$ `1.0.0` | Breaking changes to node properties, schemas, or engine requirements. |

---

## 🧪 Staging Deployment Workflow (Pre-Release Testing)

Use staging to test node bundling, npm resolution, and live n8n community node installation without affecting production users:

### 1. Local Dry-Run Verification (Zero Risk)
Simulate packaging to verify TypeScript compilation and icon bundling:
```bash
pnpm pack --dry-run
pnpm publish --dry-run --no-git-checks
```

### 2. Set Pre-Release Version (No Git Commit / Tag)
Update `package.json` without cluttering Git history:
```bash
pnpm version 0.1.0-staging.0 --no-git-tag-version
```

### 3. Publish to npm under the `staging` Tag
```bash
# Load authentication token from .env
export $(cat .env | xargs)
export NODE_AUTH_TOKEN="${DARTFX_NODE_AUTH_TOKEN:-$NODE_AUTH_TOKEN}"

# Publish with staging dist-tag
pnpm publish --tag staging --access public --no-git-checks
```

### 4. Verify in a Live n8n Instance
In n8n (**Settings > Community Nodes > Install**), specify:
```text
@dartfx/n8n-nodes@staging
```
*(or by explicit version `@dartfx/n8n-nodes@0.1.0-staging.0`)*

---

## 🚢 Production Deployment Workflow (General Availability)

### Option A: Automated via Git Tag & GitHub Actions (Recommended)

Production releases are triggered only when an annotated version tag (e.g. `v0.1.0`) is pushed to GitHub:

1. **Ensure Working Tree is Clean & Validated:**
   ```bash
   git checkout main
   git pull origin main
   pnpm install --frozen-lockfile
   pnpm run lint
   pnpm run test
   pnpm run build
   ```

2. **Update [CHANGELOG.md](CHANGELOG.md):**
   Document release notes under `## [0.1.0] - YYYY-MM-DD`.

3. **Bump Production Version & Create Git Tag:**
   ```bash
   # Patch release (e.g., 0.1.0 -> 0.1.1)
   npm version patch -m "chore(release): %s"

   # Minor release (e.g., 0.1.0 -> 0.2.0)
   npm version minor -m "chore(release): %s"

   # Major release (e.g., 0.1.0 -> 1.0.0)
   npm version major -m "chore(release): %s"
   ```

4. **Push Commit and Tag to Trigger GitHub Actions CI/CD:**
   ```bash
   git push origin main --follow-tags
   ```
   *GitHub Actions will automatically build, test, and publish to npm with cryptographic provenance attestation.*

---

### Option B: Promote Existing Staging Release to Production

If you have already thoroughly tested a staging build on npm and want to promote it to `latest` without rebuilding:

```bash
npm dist-tag add @dartfx/n8n-nodes@0.1.0-staging.0 latest
```

---

### Option C: Manual CLI Production Publish (Fallback)

```bash
export $(cat .env | xargs)
export NODE_AUTH_TOKEN="${DARTFX_NODE_AUTH_TOKEN:-$NODE_AUTH_TOKEN}"

pnpm publish --tag latest --access public
```

---

## 🔐 NPM Authentication & OIDC Trusted Publishers

### Modern Tokenless OIDC via Trusted Publishers (Recommended for CI/CD)

npm supports **Trusted Publishers** via OpenID Connect (OIDC), eliminating static tokens from GitHub Actions.

#### 1. Bootstrap: Initial First-Time Publish
Because `@dartfx/n8n-nodes` is a brand new package, it must be published **once** manually with your personal access token before npm exposes package settings:
```bash
export $(cat .env | xargs)
export NODE_AUTH_TOKEN="${DARTFX_NODE_AUTH_TOKEN:-$NODE_AUTH_TOKEN}"
pnpm publish --tag staging --access public --no-git-checks
```

#### 2. Configure Trusted Publisher on npmjs.com
Once the package exists on npm:
1. Log in to [npmjs.com](https://www.npmjs.com/) and open the package access page:
   `https://www.npmjs.com/package/@dartfx/n8n-nodes/access`
2. Under **Trusted Publishers**, click **Add Trusted Publisher**.
3. Choose **GitHub Actions** and fill in:
   - **GitHub Organization / Owner**: `DataArtifex`
   - **Repository**: `dartfx-n8n`
   - **Workflow filename**: `publish.yml`
   - **Environment**: *(Leave blank unless using GitHub Environments)*
4. Click **Add Publisher**.

Subsequent automated releases via [.github/workflows/publish.yml](.github/workflows/publish.yml) will execute **100% tokenless via OIDC** with verified provenance attestation (`id-token: write`).

---

### Traditional Static Token (Local CLI / Fallback)

For local CLI releases:
1. Generate an npm **Automation Token** on [npmjs.com](https://www.npmjs.com/).
2. Add your token to your user's global `~/.npmrc`:
   ```bash
   pnpm config set "//registry.npmjs.org/:_authToken" "$NODE_AUTH_TOKEN" --location=global
   ```
3. In GitHub Actions (as fallback), configure `DARTFX_NODE_AUTH_TOKEN` in **Settings > Secrets and variables > Actions**.
