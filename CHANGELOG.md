# Changelog

All notable changes to `alex-act-enterprise` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
