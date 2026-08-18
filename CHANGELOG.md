# Changelog

All notable changes to `alex-act-enterprise` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2026-08-17

### Fixed

- Added explicit emit-only safeguards that prohibit host todo or task creation
  and all settings, plugin, and marketplace writes.

### Added

- Added generated Copilot-compatible and strict portable package outputs from
  one canonical skill and prompt source.
- Added `alex-act-enterprise-portable` as the separately named strict Agent
  Plugins 1.0 package. It must not be installed alongside
  `alex-act-enterprise` because both expose the same setup skill.

## [1.0.3] - 2026-08-15

### Fixed

- Updated the shared installation guide for the managed-source MSFT release
  while Agency Playground registration is pending.

### Changed

- Synchronized the shared installation guide and active Core compatibility
  reference with Core `v3.0.1`, Illustrator `v2.2.1`, and Document Tools
  `v1.1.1`.

## [1.0.2] - 2026-08-15

### Fixed

- Corrected active Core compatibility to `v3.0.0`, current repository guidance,
  and prompt review metadata.

## [1.0.1] - 2026-08-06

### Changed

- Synchronized the reset-free installation matrix and compatibility guidance
  with the constellation's `1.0.1` patch releases.

## [1.0.0] - 2026-08-06

### Stabilized

- Declared the `setup-enterprise-stack` skill and namespaced setup command
  stable under the Alex ACT semantic-versioning contract.

### Changed

- Updated current compatibility, source-of-truth, and Mall delivery guidance
  after Core and Manager reached `1.0.0` and first-party delivery moved to
  immutable origin tags.

## [0.1.5] - 2026-08-02

### Changed

- Clarified in the shared installation guide that MSFT Agency skills remain `installed-unconfigured` until heir-owned profiles exist and pass MCP/auth smoke checks.

## [0.1.4] - 2026-08-02

### Added

- Added a reset-free end-user `INSTALL.md` covering full constellation setup, Core instruction bootstrap, activation verification, optional workloads, and updates.

## [0.1.3] - 2026-08-02

### Fixed

- Replaced the unsupported `copilot plugin install --all` guidance with the seven explicit marketplace-qualified install commands.
- Qualified the installed setup command as `/alex-act-enterprise setup-enterprise` throughout active guidance.
- Replaced stale placeholder verification metadata with the live Steward integration contract.

## [0.1.2] - 2026-08-01

### Fixed

- Updated living version and publication status after v0.1.1 reached `alex-mall`.

## [0.1.1] - 2026-08-01

### Fixed

- Aligned manifest and README scope guidance with the existing repo-scope default and `--user` opt-in.
- Removed empty-scaffold and pending-publication language after the skill and Mall entry shipped.
- Qualified the plugin command as `/alex-act-enterprise setup-enterprise`.

### Scope default flipped to repo (2026-07-30)

Per the constellation `PLUGIN-INTEGRATION.md` § 2 (adopted 2026-07-30 in Steward commit `ab6eb9c`), `setup-enterprise-stack` now defaults its target-block writes to **repo scope** (`.github/copilot/settings.json`) instead of user scope. The seven plugins the skill emits (Azure, Fabric-consumption/-skills/-operations/-authoring, Power BI, M365 Agents Toolkit) are project-specific tools; loading them at user scope means every non-Microsoft workspace pays the context cost for skills the heir will never invoke there.

Users who want the plugins available in every workspace (regardless of project) can pass `--user` to opt into user scope.

Changes:

- Added a "Scope decision" section at the top of the flow — decide scope before choosing mode. Two-row table (repo default vs. user opt-in) with the "am I this? vs. am I working on this?" heuristic from PLUGIN-INTEGRATION § 2.
- Emit-mode instructions now target `.github/copilot/settings.json` by default and note that the file gets committed (teammates inherit on clone). User-scope instructions preserved for the `--user` path.
- Consent-gated auto-install merges into the scope-decided target file. `marketplace add` still writes to `~/.copilot/settings.json` regardless of scope choice (that is where CLI reads marketplace registration).
- Audit mode reads the scope-decided settings file and adds an "other scope" column to surface accidental cross-scope enablement.
- Safety rules extended: never silently pick user scope; warn on cross-scope collisions; remind the heir the repo file gets committed.
- Anti-patterns table extended: skipping the scope-decision step is now an anti-pattern.

Frontmatter description updated to name the repo-scope default and the `--user` opt-in.

No breaking change to existing installs — heirs who already applied at user scope stay as-is; the next `/setup-enterprise` invocation defaults to repo but detects the existing user-scope enablement in audit mode.

### Content port — `setup-enterprise-stack` skill + `/setup-enterprise` prompt (2026-07-30)

First shipped content. Config-template skill + slash-command prompt that emit the seven-plugin `enabledPlugins` + `extraKnownMarketplaces` block from Steward's user-brain inventory § 184.

Contents:

- `.github/skills/setup-enterprise-stack/SKILL.md` — three-mode flow (emit only, consent-gated auto-install, audit only), prerequisite table for Azure / Fabric / Power BI / M365 subscriptions, safety rules against overwriting existing `~/.copilot/settings.json` entries.
- `.github/prompts/setup-enterprise.prompt.md` — thin `/setup-enterprise` slash-command wrapper that loads the skill and runs the three-mode flow.

Manifest updated:

- `shape`: `empty-scaffold` → `one-skill + one-prompt (config-template only)`
- `$comment`: refreshed to note the skill + prompt now ship
- `assets.skills[]`: `[]` → `[".github/skills/setup-enterprise-stack/SKILL.md"]`
- `assets.prompts[]`: `[]` → `[".github/prompts/setup-enterprise.prompt.md"]`

Content sourced directly from Steward's `brain/user-brain-inventory.md` § 184 — no upstream heir to port from (this plugin is 100% Steward-authored).

### Scaffold (2026-07-30)

Initial repository scaffold following the proven `alex-act-core` / `alex-act-illustrator-plugin` shape.

Contents:

- `manifest.json` — Mall-side plugin metadata (identity, target marketplace, empty assets arrays).
- `README.md` — Plugin overview + target settings block from Steward's user-brain inventory § 184.
- `LICENSE` — MIT.
- `.github/copilot-instructions.md` — Identity discovery file for Copilot Chat + CLI.
- Empty per-folder READMEs under `.github/{skills,instructions,prompts,agents}/` documenting the growth protocol.
- `.vscode/settings.json` — Self-dogfooding for this plugin's own discovery.
- `.gitignore`, `.markdownlint.json` — Consistent with sibling plugins.

No shipped assets yet. First content candidate is the `setup-enterprise-stack` skill; requires a proposal in `Alex_ACT_Steward/constellation/proposals/` with Fabio approval per `constellation/act/CURATION-RULES.md`.
