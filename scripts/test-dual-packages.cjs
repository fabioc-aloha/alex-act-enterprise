#!/usr/bin/env node

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const builder = path.join(__dirname, 'build-dual-packages.cjs');
const portableRoot = path.join(root, 'packages', 'portable');
const copilotRoot = path.join(root, 'packages', 'copilot');

const checked = spawnSync(process.execPath, [builder, '--check'], {
  cwd: root,
  encoding: 'utf8',
});
assert.equal(checked.status, 0, checked.stderr);

const portable = JSON.parse(fs.readFileSync(path.join(portableRoot, 'plugin.json'), 'utf8'));
assert.deepEqual(Object.keys(portable).sort(), [
  '$schema',
  'author',
  'description',
  'homepage',
  'keywords',
  'license',
  'name',
  'repository',
  'version',
]);
assert.equal(portable.$schema, 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json');
assert.equal(portable.name, 'alex-act-enterprise-portable');
assert.equal(fs.existsSync(path.join(portableRoot, 'commands')), false);

const copilot = JSON.parse(fs.readFileSync(path.join(copilotRoot, 'plugin.json'), 'utf8'));
assert.equal('$schema' in copilot, false);
assert.equal(copilot.name, 'alex-act-enterprise');
assert.equal(copilot.skills, 'skills/');
assert.equal(copilot.commands, 'commands/');

const command = fs.readFileSync(path.join(copilotRoot, 'commands', 'setup-enterprise.md'), 'utf8');
assert.match(command, /^---\r?\ndescription:/);
assert.match(command, /setup-enterprise-stack/);
assert.match(command, /do not create or update todos, tasks, plan items/i);

process.stdout.write('Dual package outputs satisfy the Enterprise pilot contract.\n');
