import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const github = "https://github.com/ngyinze";
const areas = ["Desktop", "Data", "Knowledge"];
const projects = [
  {
    title: "Orbit",
    area: "Desktop",
    tech: "C++ / Qt 6 / QML",
    status: "An independently maintained fork",
    description:
      "One native Windows library for games installed across Steam, Epic, GOG, and Xbox. I work on this fork to explore desktop interfaces and improve the everyday experience.",
    note: "Originally created by tv7. My fork is a place for ongoing improvements to an existing open-source application.",
    href: `${github}/Orbit`,
  },
  {
    title: "Business software",
    area: "Data",
    tech: "Delphi / SQL",
    status: "An area of professional work",
    description:
      "Accounting and payroll software is full of details that have to be right. My work includes data imports, validation, database connections, and tracing bugs through existing systems.",
    note: "I enjoy following a problem from the interface to the underlying data, fixing the shared cause, and checking the surrounding behavior.",
  },
  {
    title: "A second brain",
    area: "Knowledge",
    tech: "Obsidian / Linked notes / AI retrieval",
    status: "An ongoing exploration",
    description:
      "Exploring a personal knowledge system where sources become connected notes, and an AI assistant can follow those connections to answer questions with evidence.",
    note: "The idea: keep durable knowledge in Obsidian, connect notes back to their sources, and use natural language as another way to explore them. This is an exploration, not a released product.",
  },
];

function Icon({ name, ...props }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {name === "Desktop" && (
        <>
          <rect x="7" y="7" width="34" height="25" rx="2" />
          <path d="M18 40h12M24 32v8" />
        </>
      )}
      {name === "Data" && (
        <>
          <ellipse cx="24" cy="10" rx="15" ry="6" />
          <path d="M9 10v25c0 8 30 8 30 0V10M9 22c0 8 30 8 30 0M9 32c0 8 30 8 30 0" />
        </>
      )}
      {name === "Knowledge" && (
        <>
          <path d="M12 5h17l8 8v30H12zM29 5v9h8M19 22h12M19 28h12M19 34h8" />
        </>
      )}
      {name === "arrow" && <path d="M9 24h29M27 13l11 11-11 11" />}
      {name === "external" && <path d="M12 36 36 12M14 12h22v22" />}
    </svg>
  );
}

function WorkMap({ selected, onSelect }) {
  return (
    <div className="work-map" aria-label="Explore areas of my work">
      <svg
        className="map-lines"
        viewBox="0 0 460 460"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="230" cy="230" r="166" stroke="currentColor" />
        <circle
          cx="230"
          cy="230"
          r="130"
          stroke="currentColor"
          strokeDasharray="4 7"
        />
        <path
          d="M230 18v424M18 230h424M230 90 87 320h286Z"
          stroke="currentColor"
          strokeDasharray="4 7"
        />
        <circle className="orbit-dot" cx="379" cy="154" r="6" />
        <circle
          cx="230"
          cy="230"
          r="7"
          fill="var(--yellow)"
          stroke="currentColor"
        />
        <circle cx="90" cy="140" r="5" fill="var(--blue)" />
        <circle cx="288" cy="388" r="5" fill="var(--blue)" />
      </svg>
      {areas.map((area) => (
        <button
          key={area}
          className={`map-node node-${area.toLowerCase()}`}
          aria-pressed={selected === area}
          onClick={() => onSelect(selected === area ? "All" : area)}
        >
          <Icon name={area} />
          <strong>{area}</strong>
          <span>
            {area === "Desktop"
              ? "Apps that run locally"
              : area === "Data"
                ? "Reliable business workflows"
                : "Tools for thinking"}
          </span>
        </button>
      ))}
    </div>
  );
}

function ProjectGraphic({ area }) {
  return (
    <div
      className={`project-graphic graphic-${area.toLowerCase()}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 230"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        {area === "Desktop" && (
          <>
            <ellipse
              cx="200"
              cy="115"
              rx="154"
              ry="63"
              transform="rotate(-22 200 115)"
            />
            <ellipse
              cx="200"
              cy="115"
              rx="154"
              ry="63"
              transform="rotate(22 200 115)"
              strokeDasharray="3 5"
            />
            <circle cx="200" cy="115" r="71" />
            <path d="M200 20v190M100 115h200" />
            <circle
              cx="200"
              cy="115"
              r="8"
              fill="var(--yellow)"
              stroke="none"
            />
            <circle cx="59" cy="145" r="5" fill="currentColor" />
            <circle cx="340" cy="87" r="5" fill="currentColor" />
          </>
        )}
        {area === "Data" && (
          <>
            <rect x="126" y="36" width="227" height="158" rx="3" />
            <path d="M126 74h227M126 114h227M126 154h227M214 36v158M284 36v158M40 94h61l-9-9M101 94l-9 9M40 134h61l-9-9M101 134l-9 9" />
            <path d="M144 56h50M144 94h41M144 134h34M144 174h53M232 94h33M232 134h23M232 174h33" />
            <rect
              x="296"
              y="126"
              width="42"
              height="14"
              fill="var(--yellow)"
              stroke="none"
            />
          </>
        )}
        {area === "Knowledge" && (
          <>
            <path d="M72 60 193 115 72 172M193 115l128-57M193 115l128 57" />
            <circle cx="193" cy="115" r="34" />
            <circle cx="72" cy="60" r="19" />
            <circle cx="72" cy="172" r="19" />
            <circle cx="321" cy="58" r="19" />
            <circle cx="321" cy="172" r="19" />
            <circle
              cx="193"
              cy="115"
              r="8"
              fill="var(--yellow)"
              stroke="none"
            />
            <path
              d="M186 64V32M186 32l-5 5M186 32l5 5M72 83v66M321 82v67"
              strokeDasharray="4 5"
            />
          </>
        )}
      </svg>
      <span>
        {area === "Desktop"
          ? "A library, brought together."
          : area === "Data"
            ? "Details that add up."
            : "Sources → notes → understanding."}
      </span>
    </div>
  );
}

function App() {
  const [selected, setSelected] = useState("All");
  const visibleProjects = projects.filter(
    (project) => selected === "All" || project.area === selected,
  );
  return (
    <>
      <a className="skip-link" href="#work">
        Skip to work
      </a>
      <div className="hero">
        <div className="hero-copy">
          <header>
            <a className="brand" href="#top" aria-label="Isaac Ng, back to top">
              Isaac Ng
              <span className="brand-dot" />
            </a>
            <nav aria-label="Main navigation">
              <a href="#work">Work</a>
              <a href="#about">About</a>
              <a href={github}>
                GitHub
                <Icon name="external" />
              </a>
            </nav>
          </header>
          <div className="introduction" id="top">
            <h1>
              <span>Useful software.</span>
              <span>Thoughtfully built.</span>
            </h1>
            <p>
              I’m Isaac, a developer working across desktop apps, business
              software, and tools for thinking.
            </p>
            <a className="primary-link" href="#work">
              View my work
              <Icon name="arrow" />
            </a>
            <p className="hero-footnote">
              A little of what I build. A little of how I think.
            </p>
          </div>
        </div>
        <aside className="hero-map">
          <WorkMap selected={selected} onSelect={setSelected} />
          <p>Select an area to explore the work below.</p>
        </aside>
      </div>
      <main>
        <section
          className="work section-wrap"
          id="work"
          aria-labelledby="work-title"
        >
          <div className="section-heading">
            <h2 id="work-title">Work &amp; explorations</h2>
            <p>Projects, practice, and ideas in progress.</p>
          </div>
          <div className="work-toolbar">
            <div
              className="filters"
              role="group"
              aria-label="Filter work by area"
            >
              {["All", ...areas].map((area) => (
                <button
                  key={area}
                  aria-pressed={selected === area}
                  onClick={() => setSelected(area)}
                >
                  {area === "All" ? "All work" : area}
                </button>
              ))}
            </div>
            <p className="result-count" role="status">
              {visibleProjects.length}{" "}
              {visibleProjects.length === 1 ? "entry" : "entries"}
            </p>
          </div>
          <div className="projects">
            {visibleProjects.map((project) => (
              <article className="project" key={project.title}>
                <ProjectGraphic area={project.area} />
                <div className="project-copy">
                  <div className="project-title">
                    <h3>{project.title}</h3>
                    <span>{project.area}</span>
                  </div>
                  <p className="project-tech">{project.tech}</p>
                  <p>{project.description}</p>
                  <p className="project-status">{project.status}</p>
                  <details>
                    <summary>Behind the work</summary>
                    <p>{project.note}</p>
                  </details>
                  {project.href && (
                    <a className="text-link" href={project.href}>
                      View repository
                      <Icon name="external" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="about" id="about" aria-labelledby="about-title">
          <div className="section-wrap about-grid">
            <h2 id="about-title">
              Understand the system.
              <br />
              Then make it simpler.
            </h2>
            <div>
              <p>
                I’m Isaac Ng, also known as Ng Yin Ze. I enjoy working with
                software that has a real job to do, whether that means a better
                desktop experience or a more dependable data workflow.
              </p>
              <p>
                My interests connect practical development with learning: native
                applications, existing codebases, and knowledge systems that
                make ideas easier to find and use.
              </p>
              <a className="contact-link" href={github}>
                Find me on GitHub
                <Icon name="external" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="section-wrap">
        <p>
          Isaac Ng<span>Personal developer portfolio</span>
        </p>
        <a href="#top">
          Back to top
          <Icon name="arrow" />
        </a>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
