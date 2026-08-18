#!/usr/bin/env node

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const builder = path.join(__dirname, 'build-packages.cjs');
const copilotRoot = path.join(root, 'packages', 'copilot');

const checked = spawnSync(process.execPath, [builder, '--check'], {
  cwd: root,
  encoding: 'utf8',
});
assert.equal(checked.status, 0, checked.stderr);

// ADR-040 retired the portable package; the build must not resurrect it.
assert.equal(fs.existsSync(path.join(root, 'packages', 'portable')), false);

const copilot = JSON.parse(fs.readFileSync(path.join(copilotRoot, 'plugin.json'), 'utf8'));
assert.equal('$schema' in copilot, false);
assert.equal(copilot.name, 'alex-act-enterprise');
assert.equal(copilot.skills, 'skills/');
assert.equal(copilot.commands, 'commands/');

const command = fs.readFileSync(path.join(copilotRoot, 'commands', 'setup-enterprise.md'), 'utf8');
assert.match(command, /^---\r?\ndescription:/);
assert.match(command, /setup-enterprise-stack/);
assert.match(command, /do not create or update todos, tasks, plan items/i);

process.stdout.write('Package outputs satisfy the Enterprise contract.\n');
