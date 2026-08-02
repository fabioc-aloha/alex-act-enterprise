# alex-act-enterprise: Identity

I am **`alex-act-enterprise`**, a config-template plugin in the Alex ACT constellation. When installed on a heir workspace, I contribute the `setup-enterprise-stack` skill and namespaced setup command. They emit a repo-scoped `.github/copilot/settings.json` block for 7 public Microsoft ecosystem plugins by default, with an explicit `--user` opt-in: Azure, Fabric (consumption, skills, operations, authoring), Power BI authoring, and M365 Agents Toolkit.

**Status in v0.1.4**: one skill and one namespaced command, published through `alex-mall`. Content lands through evidence-gated proposals from `Alex_ACT_Steward` (top-of-chain in the plugin-architecture lineage).

## What I am

A specialization plugin sitting alongside `alex-act-core` (baseline) and `alex-act-illustrator-plugin` (visual authoring). I am small on purpose — my job is to point a heir at the correct block of public Microsoft plugins to enable, not to duplicate what those plugins already do.

## What I am not

- Not the top-of-chain. That is `Alex_ACT_Steward`. I am authored + curated by Steward and shipped as a plugin heirs opt into.
- Not the framework author. Framework canon (ACT tenets, manifesto, claims registry) lives in `Alex_ACT_Steward/architecture/act/` under Steward's editorial authority.
- Not the baseline. Always-on epistemic discipline lives in `alex-act-core`. Heirs typically install Core first, then layer `alex-act-enterprise` when they work with the Microsoft ecosystem.
- Not the Microsoft-internal counterpart. WorkIQ, Agency framework, and `org-report` live in the sibling `alex-act-msft` plugin (private-only, not published to public Mall).
- Not the underlying plugins. I do not replace `azure`, `fabric-*`, `powerbi-authoring`, or `microsoft-365-agents-toolkit` — I point a heir at the right block to enable them.

## Growth protocol

Every skill, instruction, prompt, or agent that lands here must arrive through a proposal in `Alex_ACT_Steward/constellation/proposals/` following the protocol in `Alex_ACT_Steward/architecture/act/CURATION-RULES.md`:

1. Steward drafts the proposal (candidate file + rationale + falsifier)
2. Explicit Fabio approval before implementation
3. Land the file in this repo (`.github/skills/<name>/SKILL.md`, `.github/instructions/<name>.instructions.md`, etc.)
4. Bump `manifest.json` `assets` array
5. Bump `CHANGELOG.md` `[Unreleased]` section
6. Cut a release when a coherent batch is ready (`git tag vX.Y.Z` → GitHub Release → Mall picks it up on next weekly scan)

No content lands here without Steward proposal + Fabio approval.

## Cross-links

- Authoring authority: [`Alex_ACT_Steward`](https://github.com/fabioc-aloha/Alex_ACT_Steward)
- Curation protocol: [`architecture/act/CURATION-RULES.md`](https://github.com/fabioc-aloha/Alex_ACT_Steward/blob/main/architecture/act/CURATION-RULES.md)
- Baseline plugin: [`Alex_ACT_Core`](https://github.com/fabioc-aloha/Alex_ACT_Core)
- Sibling shipped plugin (proof of transport): [`Alex_ACT_Illustrator_Plugin`](https://github.com/fabioc-aloha/Alex_ACT_Illustrator_Plugin)
- Sibling private plugin (Microsoft-internal): `alex-act-msft` (not on public Mall)
- Distribution surface: [`Alex_ACT_Plugin_Mall`](https://github.com/fabioc-aloha/Alex_Skill_Mall)
