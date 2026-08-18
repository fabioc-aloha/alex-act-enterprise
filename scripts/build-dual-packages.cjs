#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const packagesRoot = path.join(root, 'packages');
const sourceSkillPath = path.join(root, '.github', 'skills', 'setup-enterprise-stack', 'SKILL.md');
const sourcePromptPath = path.join(root, '.github', 'prompts', 'setup-enterprise.prompt.md');
const legacyManifestPath = path.join(root, 'plugin.json');
const licensePath = path.join(root, 'LICENSE');

const args = new Set(process.argv.slice(2));
if ([...args].some((argument) => argument !== '--write' && argument !== '--check')) {
  throw new Error('Usage: node scripts/build-dual-packages.cjs [--write|--check]');
}
if (args.has('--write') && args.has('--check')) {
  throw new Error('--write and --check cannot be combined');
}
const mode = args.has('--write') ? 'write' : 'check';

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function stableJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function listFiles(directory, prefix = '') {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const relative = path.posix.join(prefix, entry.name);
      if (entry.isDirectory()) return listFiles(path.join(directory, entry.name), relative);
      return [relative];
    })
    .sort();
}

const legacy = JSON.parse(read(legacyManifestPath));
const sourceSkill = read(sourceSkillPath);
const sourcePrompt = read(sourcePromptPath);
const license = read(licensePath);

const portableSkill = sourceSkill.replace(
  '- [`/alex-act-enterprise setup-enterprise`](../../prompts/setup-enterprise.prompt.md) — namespaced slash-command entry point',
  '- The Copilot compatibility package carries the namespaced `/alex-act-enterprise setup-enterprise` command.',
);
const copilotSkill = sourceSkill.replace(
  '../../prompts/setup-enterprise.prompt.md',
  '../../commands/setup-enterprise.md',
);

const portableManifest = {
  $schema: 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json',
  name: 'alex-act-enterprise-portable',
  version: '0.1.0',
  description: 'Portable Agent Plugins package for the Alex ACT Enterprise setup skill.',
  author: legacy.author,
  homepage: legacy.homepage,
  repository: legacy.repository.url,
  license: legacy.license,
  keywords: legacy.keywords,
};
const copilotManifest = {
  name: legacy.name,
  version: legacy.version,
  description: legacy.description,
  author: legacy.author,
  homepage: legacy.homepage,
  repository: legacy.repository.url,
  license: legacy.license,
  keywords: legacy.keywords,
  category: legacy.category,
  skills: 'skills/',
  commands: 'commands/',
};

const expected = new Map([
  ['portable/LICENSE', license],
  ['portable/plugin.json', stableJson(portableManifest)],
  ['portable/skills/setup-enterprise-stack/SKILL.md', portableSkill],
  ['copilot/LICENSE', license],
  ['copilot/plugin.json', stableJson(copilotManifest)],
  ['copilot/skills/setup-enterprise-stack/SKILL.md', copilotSkill],
  ['copilot/commands/setup-enterprise.md', sourcePrompt],
]);

if (mode === 'write') {
  fs.rmSync(packagesRoot, { recursive: true, force: true });
  for (const [relativePath, content] of expected) {
    const destination = path.join(packagesRoot, ...relativePath.split('/'));
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, content, 'utf8');
  }
  process.stdout.write(`Generated ${expected.size} package files.\n`);
  process.exit(0);
}

const drift = [];
for (const [relativePath, content] of expected) {
  const destination = path.join(packagesRoot, ...relativePath.split('/'));
  if (!fs.existsSync(destination)) {
    drift.push(`Missing ${relativePath}`);
  } else if (read(destination) !== content) {
    drift.push(`Drifted ${relativePath}`);
  }
}
const actualFiles = listFiles(packagesRoot);
const expectedFiles = [...expected.keys()].sort();
for (const relativePath of actualFiles) {
  if (!expected.has(relativePath)) drift.push(`Unexpected ${relativePath}`);
}
for (const relativePath of expectedFiles) {
  if (!actualFiles.includes(relativePath)) drift.push(`Missing ${relativePath}`);
}

if (drift.length) {
  process.stderr.write(`dual-package: ${drift.join('; ')}\n`);
  process.exit(1);
}

process.stdout.write(`Dual package outputs are current (${expected.size} files).\n`);
