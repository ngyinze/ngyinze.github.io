export const github = "https://github.com/ngyinze";
export const areas = ["Desktop", "Data", "Knowledge"];
// Add work here; discipline count is independent of project count.
export const projects = [
  {
    id: "orbit",
    title: "Orbit",
    area: "Desktop",
    tech: ["C++", "Qt 6", "QML"],
    kind: "Open-source fork",
    role: "Independent fork maintainer",
    summary:
      "A native Windows library that brings installed games into one place.",
    description:
      "An existing desktop application for games installed across Steam, Epic, GOG, and Xbox. I work on this fork to explore desktop interfaces and improve the everyday experience.",
    focus: "Native interfaces · Existing codebases · Everyday usability",
    approach:
      "Understand the existing application, trace the behavior through its code, and make focused improvements to the desktop experience.",
    note: "Originally created by tv7. This is an independently maintained fork, not a claim to have created the original application.",
    href: github + "/Orbit",
    action: "Explore Orbit",
    hero: "An independently maintained C++ / Qt fork.",
  },
  {
    id: "business-software",
    title: "Business software",
    area: "Data",
    tech: ["Delphi", "SQL"],
    kind: "Professional practice",
    role: "Software development & debugging",
    summary:
      "Working through the details behind accounting and payroll software.",
    description:
      "My work includes data imports, validation, database connections, and tracing bugs through existing systems. It calls for following a problem from the interface to the underlying data.",
    focus: "Data validation · Root-cause debugging · Reliable workflows",
    approach:
      "Trace the full path, fix the shared cause, and check the surrounding behavior. Accuracy matters in systems people depend on.",
    note: "An overview of professional work. Company source code and internal project details are private.",
    action: "Explore my approach",
    hero: "Delphi and SQL, with attention to the details.",
  },
  {
    id: "second-brain",
    title: "A second brain",
    area: "Knowledge",
    tech: ["Obsidian", "Linked notes", "AI retrieval"],
    kind: "Ongoing exploration",
    role: "Personal research & experimentation",
    summary:
      "Exploring how connected notes can make knowledge easier to find and use.",
    description:
      "A personal knowledge system where sources become connected notes, and an AI assistant can follow those connections to answer questions with evidence.",
    focus: "Source-backed notes · Connected ideas · Retrieval",
    approach:
      "Keep durable knowledge in Obsidian, connect notes to their sources, and explore natural language as another way into the material.",
    note: "This is an ongoing exploration, not a released product or a finished AI system.",
    action: "Explore the idea",
    hero: "Linked notes, source material, and tools for thinking.",
  },
];
export function filterProjects(collection, area, query = "") {
  const search = query.trim().toLocaleLowerCase();
  return collection.filter(
    (p) =>
      (area === "All" || p.area === area) &&
      [p.title, p.summary, ...p.tech, p.kind]
        .join(" ")
        .toLocaleLowerCase()
        .includes(search),
  );
}
