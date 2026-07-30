# alex-act-enterprise

Alex ACT config-template plugin for the **public Microsoft ecosystem**. Ships a single scaffolding skill (`setup-enterprise-stack`) that generates the `~/.copilot/settings.json` block for 7 Microsoft plugins any tenant can use.

**Status**: v0.1.0 (unreleased) — empty scaffold. Repository created 2026-07-30. Content lands through evidence-gated Steward proposals per [`Alex_ACT_Steward/constellation/act/CURATION-RULES.md`](https://github.com/fabioc-aloha/Alex_ACT_Steward/blob/main/constellation/act/CURATION-RULES.md).

**Maintainer**: [`Alex_ACT_Steward`](https://github.com/fabioc-aloha/Alex_ACT_Steward) (top-of-chain in the plugin-architecture lineage since 2026-07-26 fork-and-freeze).

## What this is

`alex-act-enterprise` is a **config-template plugin** — it ships one skill, not a large surface. The skill emits a paste-ready `enabledPlugins` + `extraKnownMarketplaces` block for the seven public Microsoft ecosystem plugins:

| Plugin | Marketplace | Marketplace source | Purpose |
|---|---|---|---|
| `azure` | `azure-skills` | `microsoft/azure-skills` | Azure resource authoring + ops + diagnostics + RBAC + storage + compute |
| `fabric-consumption` | `copilot-plugins` (default) | (built-in) | Fabric semantic model / warehouse / SQL / dataflow consumption |
| `fabric-skills` | `copilot-plugins` (default) | (built-in) | Cross-Fabric workload utility skills |
| `fabric-operations` | `copilot-plugins` (default) | (built-in) | Fabric admin + capacity + governance ops |
| `fabric-authoring` | `copilot-plugins` (default) | (built-in) | Fabric pipeline / dataflow / eventhouse / semantic-model / spark authoring |
| `powerbi-authoring` | `fabric-collection` | `microsoft/skills-for-fabric` | Power BI report design + authoring + planning + management |
| `microsoft-365-agents-toolkit` | `copilot-plugins` (default) | (built-in) | Declarative agent authoring, Teams app dev, UI widget dev |

Every entry is **public**. Any tenant with the corresponding Microsoft subscription (Azure, Fabric workspace, M365) can enable them.

## What this is NOT

- **Not the Copilot CLI itself** — this plugin rides on top of Copilot CLI + Chat.
- **Not the underlying plugins** — this is a config template. The actual plugins (`azure`, `fabric-*`, `powerbi-authoring`, `microsoft-365-agents-toolkit`) live in their upstream Microsoft repos and marketplaces. This plugin points a heir at the right block to paste.
- **Not Microsoft-internal** — everything here is publicly available. Microsoft-internal services (WorkIQ, Agency framework, `org-report`) live in a separate private plugin, [`alex-act-msft`](../alex-act-msft) (not published to public Mall).
- **Not opinionated about which subset to enable** — the target block enables all 7. Heirs edit their local `enabledPlugins` after the initial paste to drop plugins they don't need.

## Where this sits

Three-layer constellation stack:

| Layer | Plugin | Role |
|---|---|---|
| **Baseline** | [`alex-act-core`](https://github.com/fabioc-aloha/Alex_ACT_Core) | Always-on epistemic discipline every heir needs |
| **Specialization — visual authoring** | [`alex-act-illustrator-plugin`](https://github.com/fabioc-aloha/Alex_ACT_Illustrator_Plugin) | Charts, print figures, SVG banners, AI imagery |
| **Specialization — Microsoft ecosystem** | **`alex-act-enterprise`** (this repo) | Config template for the public Microsoft plugin set |
| **Specialization — Microsoft-internal** | [`alex-act-msft`](../alex-act-msft) (private) | Agency framework + WorkIQ + `org-report` scaffolding |

Heirs enable whichever specializations apply to their workspace.

## Target settings block

Once the `setup-enterprise-stack` skill ships, invoking it produces:

```json
{
  "extraKnownMarketplaces": {
    "azure-skills":       { "source": { "source": "github", "repo": "microsoft/azure-skills" } },
    "fabric-collection":  { "source": { "source": "github", "repo": "microsoft/skills-for-fabric" } }
  },
  "enabledPlugins": {
    "azure@azure-skills":                            true,
    "fabric-consumption@copilot-plugins":            true,
    "fabric-skills@copilot-plugins":                 true,
    "fabric-operations@copilot-plugins":             true,
    "fabric-authoring@copilot-plugins":              true,
    "powerbi-authoring@fabric-collection":           true,
    "microsoft-365-agents-toolkit@copilot-plugins": true
  }
}
```

Heirs paste this into their `~/.copilot/settings.json` (or `.github/copilot/settings.json` for repo-scoped enablement) and either wait for declarative auto-install or run `copilot plugin install` per entry.

## Layout

```text
alex-act-enterprise/
├── manifest.json               # Mall-side plugin metadata
├── README.md                   # (this file)
├── CHANGELOG.md                # Keep a Changelog format
├── LICENSE                     # MIT
├── .gitignore
├── .markdownlint.json
├── .github/                    # Copilot Chat + CLI discovery surface
│   ├── copilot-instructions.md
│   ├── skills/                 # empty in v0.1.0 (setup-enterprise-stack lands here)
│   ├── instructions/           # empty in v0.1.0
│   ├── prompts/                # empty in v0.1.0
│   └── agents/                 # empty in v0.1.0 (this plugin ships no agents by design)
└── .vscode/                    # workspace settings for self-dogfooding
```

Same layout as [`alex-act-core`](https://github.com/fabioc-aloha/Alex_ACT_Core) and [`alex-act-illustrator-plugin`](https://github.com/fabioc-aloha/Alex_ACT_Illustrator_Plugin) — the proven Steward-authored CLI plugin pattern.

## Install (once content ships)

```powershell
# From the public Mall catalog (once published):
copilot plugin install alex-act-enterprise@alex-mall

# Or directly from GitHub during development:
copilot plugin install fabioc-aloha/alex-act-enterprise
```

Empty scaffold today — installing v0.1.0 registers the plugin but ships no artefacts.

## Roadmap

Growth happens through evidence-gated proposals per [`Alex_ACT_Steward/constellation/act/CURATION-RULES.md`](https://github.com/fabioc-aloha/Alex_ACT_Steward/blob/main/constellation/act/CURATION-RULES.md). Planned first content:

- **`setup-enterprise-stack` skill** — emits the paste-ready settings block, verifies the CLI is installed, optionally runs `copilot plugin install` for each entry after user consent.

Future candidates (evaluated per proposal):

- Composition skills that call across the enabled plugins (e.g., "author a Fabric semantic-model driven by an Azure Data Lake source").
- Diagnostic skills that check whether the target subscriptions are actually configured before invoking the underlying plugins.

Each proposal requires explicit Fabio approval before landing.

## Related

- [`Alex_ACT_Steward`](https://github.com/fabioc-aloha/Alex_ACT_Steward) — authoring authority and top-of-chain
- [`Alex_ACT_Core`](https://github.com/fabioc-aloha/Alex_ACT_Core) — the baseline plugin every heir installs
- [`alex-act-illustrator-plugin`](https://github.com/fabioc-aloha/Alex_ACT_Illustrator_Plugin) — sibling specialization (visual authoring)
- `alex-act-msft` — sibling specialization (Microsoft-internal Agency + WorkIQ), private-only
- [`Alex_ACT_Plugin_Mall`](https://github.com/fabioc-aloha/Alex_Skill_Mall) — distribution surface

## License

[MIT](LICENSE)
