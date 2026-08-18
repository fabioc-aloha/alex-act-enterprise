#!/usr/bin/env node

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const files = [
  path.join(root, '.github', 'prompts', 'setup-enterprise.prompt.md'),
  path.join(root, '.github', 'skills', 'setup-enterprise-stack', 'SKILL.md'),
];

for (const filePath of files) {
  const content = fs.readFileSync(filePath, 'utf8');
  assert.match(content, /do not create or update todos, tasks, plan items/i, filePath);
  assert.match(
    content,
    /do not modify files, settings, plugins, or\s+marketplace\s+registrations/i,
    filePath,
  );
}

process.stdout.write('Emit-only safety guards are present in the Enterprise command and skill.\n');
