"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const requiredFiles = [
  "AGENTS.md",
  "docs/agentic/INDEX.md",
  "docs/agentic/ARCHITECTURE.md",
  "docs/agentic/PRODUCT.md",
  "docs/agentic/QUALITY.md",
  "docs/agentic/RELIABILITY.md",
  "docs/agentic/SECURITY.md",
  "docs/agentic/GOLDEN_PRINCIPLES.md",
  "docs/agentic/QUALITY_SCORE.md",
  "docs/agentic/DOC_GARDENING.md",
  "docs/agentic/TECH_DEBT.md",
  "docs/agentic/generated/README.md",
  "docs/agentic/references/README.md",
  "docs/agentic/plans/active/.gitkeep",
  "docs/agentic/plans/completed/.gitkeep"
];

for (const relativePath of requiredFiles) {
  assert.ok(fs.existsSync(path.join(root, relativePath)), `${relativePath} must exist`);
}

const agentsSource = fs.readFileSync(path.join(root, "AGENTS.md"), "utf8");
for (const command of ["npm run check", "npm test", "npm run validate", "npm run check:agentic"]) {
  assert.ok(agentsSource.includes(command), `AGENTS.md must document ${command}`);
}

const markdownLinkPattern = /\[[^\]]+\]\(([^)]+)\)/g;
const docsRoot = path.join(root, "docs", "agentic");

for (const entry of fs.readdirSync(docsRoot, { recursive: true, withFileTypes: true })) {
  if (!entry.isFile() || !entry.name.endsWith(".md")) continue;

  const filePath = path.join(entry.parentPath, entry.name);
  const source = fs.readFileSync(filePath, "utf8");

  for (const match of source.matchAll(markdownLinkPattern)) {
    const target = match[1].split("#", 1)[0];
    if (!target || /^(https?:|mailto:|#)/.test(target)) continue;

    const resolved = path.resolve(path.dirname(filePath), target);
    assert.ok(resolved.startsWith(root), `${path.relative(root, filePath)} links outside the repository`);
    assert.ok(fs.existsSync(resolved), `${path.relative(root, filePath)} has broken link: ${target}`);
  }
}

console.log("Agent-facing documentation is valid.");
