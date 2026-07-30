# Changelog

All notable changes to `alex-act-enterprise` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

Content sourced directly from Steward's [`brain/user-brain-inventory.md` § 184](https://github.com/fabioc-aloha/Alex_ACT_Steward/blob/main/brain/user-brain-inventory.md) — no upstream heir to port from (this plugin is 100% Steward-authored).

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
