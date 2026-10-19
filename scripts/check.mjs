import assert from "node:assert/strict";
import { areas, projects, filterProjects } from "../src/projects.js";

assert.equal(new Set(projects.map((p) => p.id)).size, projects.length);
for (const p of projects) {
  assert.ok(areas.includes(p.area));
  assert.ok(p.id && p.title && p.role && p.kind && p.summary);
}
assert.equal(
  filterProjects(projects, "All", "  DELPHI ").at(0).id,
  "business-software",
);
assert.equal(filterProjects(projects, "Knowledge", "Qt").length, 0);
assert.equal(filterProjects(projects, "All", "no-such-project").length, 0);
const collection = Array.from({ length: 120 }, (_, i) => ({
  ...projects[i % 3],
  id: "project-" + i,
}));
assert.equal(filterProjects(collection, "All").length, 120);
for (const area of areas)
  assert.equal(filterProjects(collection, area).length, 40);
assert.equal(filterProjects(collection, "All", "Qt").length, 40);
console.log(
  "PASS: project identity, required content, combined filters, case-insensitive skill search, empty results, and a 120-project collection.",
);
