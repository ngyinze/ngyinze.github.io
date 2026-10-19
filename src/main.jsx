import React, { lazy, Suspense, useState } from "react";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  DesktopIcon,
  DatabaseIcon,
  FilesIcon,
  ArrowClockwiseIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react";
import { areas, projects, filterProjects, github } from "./projects";
import "./style.css";

const FoldingModel = lazy(() => import("./FoldingModel"));
const icons = {
  Desktop: DesktopIcon,
  Data: DatabaseIcon,
  Knowledge: FilesIcon,
};

function ModelPoster() {
  return (
    <img
      className="model-poster"
      src="/assets/fold-fallback.png"
      alt="Three cobalt panels joined by yellow hinges, folded into a sculptural workspace."
      width="1466"
      height="1073"
    />
  );
}

function App() {
  const [activeArea, setActiveArea] = useState("Desktop");
  const [area, setArea] = useState("All");
  const [query, setQuery] = useState("");
  const [reset, setReset] = useState(0);
  const [sceneStatus, setSceneStatus] = useState("loading");
  const visible = filterProjects(projects, area, query);
  const featured = projects.find((project) => project.area === activeArea);
  function explore() {
    flushSync(() => {
      setArea(activeArea);
      setQuery("");
    });
  }
  function allWork() {
    setArea("All");
    setQuery("");
  }

  return (
    <>
      <a className="skip-link" href="#work">
        Skip to work
      </a>
      <header className="site-header page-wrap" id="top">
        <a className="brand" href="#top" aria-label="Isaac Ng, back to top">
          Isaac Ng
          <span className="brand-dot" />
        </a>
        <nav aria-label="Main navigation">
          <a href="#work" onClick={allWork}>
            Work
          </a>
          <a href="#about">About</a>
          <a href={github}>
            GitHub <ArrowUpRightIcon aria-hidden="true" />
          </a>
        </nav>
      </header>
      <main>
        <section className="hero page-wrap" aria-labelledby="hero-title">
          <div className="hero-intro">
            <h1 id="hero-title">
              A different side<span>of my work.</span>
            </h1>
            <p>
              I’m Isaac. I build desktop apps, work with data, and explore tools
              for thinking.
            </p>
          </div>
          <figure className="hero-object">
            <div className="model-stage">
              <Suspense fallback={<ModelPoster />}>
                <FoldingModel
                  selected={activeArea}
                  onSelect={setActiveArea}
                  onStatus={setSceneStatus}
                  reset={reset}
                />
              </Suspense>
            </div>
            <figcaption id="model-instructions">
              {sceneStatus === "unavailable"
                ? "Choose a discipline to explore my work."
                : "Drag to turn. Choose a side to unfold."}
            </figcaption>
            <div
              className="area-controls"
              role="group"
              aria-label="Explore a discipline"
            >
              {areas.map((item) => {
                const Icon = icons[item];
                return (
                  <button
                    key={item}
                    aria-pressed={activeArea === item}
                    onClick={() => setActiveArea(item)}
                  >
                    <Icon size={24} weight="light" aria-hidden="true" />
                    {item}
                  </button>
                );
              })}
            </div>
            {sceneStatus !== "unavailable" && (
              <button
                disabled={sceneStatus !== "ready"}
                className="reset-view"
                onClick={() => {
                  setReset((v) => v + 1);
                  setActiveArea("Desktop");
                }}
              >
                <ArrowClockwiseIcon size={16} aria-hidden="true" />
                Reset view
              </button>
            )}
          </figure>
          <div className="hero-feature" aria-live="polite" aria-atomic="true">
            <h2>{featured.title}</h2>
            <div className="feature-meta">
              <span>{featured.area}</span>
              <span>{featured.kind}</span>
            </div>
            <p>{featured.hero}</p>
            <a
              className="primary-link"
              href={"#" + featured.id}
              onClick={explore}
            >
              {featured.action}
              <ArrowRightIcon size={23} aria-hidden="true" />
            </a>
            <a className="all-work" href="#work" onClick={allWork}>
              View all work
              <ArrowRightIcon size={19} aria-hidden="true" />
            </a>
          </div>
        </section>
        <section
          className="work page-wrap"
          id="work"
          aria-labelledby="work-title"
        >
          <div className="section-heading">
            <h2 id="work-title">Work, with context.</h2>
            <p>
              What I work on, how I approach it,
              <br className="desktop-break" /> and where I’m still exploring.
            </p>
          </div>
          <div className="work-toolbar">
            <div
              className="filters"
              role="group"
              aria-label="Filter work by area"
            >
              {["All", ...areas].map((item) => (
                <button
                  key={item}
                  aria-pressed={area === item}
                  onClick={() => setArea(item)}
                >
                  {item === "All" ? "All work" : item}
                </button>
              ))}
            </div>
            <label className="search">
              <MagnifyingGlassIcon size={20} aria-hidden="true" />
              <span className="sr-only">Search projects</span>
              <input
                type="search"
                placeholder="Find a project or skill"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
          </div>
          <p className="result-count" role="status">
            {visible.length} {visible.length === 1 ? "entry" : "entries"}
          </p>
          <div className="projects">
            {visible.map((project) => (
              <article className="project" id={project.id} key={project.id}>
                <div className="project-heading">
                  <h3>{project.title}</h3>
                  <p className="project-kind">{project.kind}</p>
                  <ul className="technologies" aria-label="Technologies">
                    {project.tech.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                  {project.href && (
                    <a className="repository-link" href={project.href}>
                      View repository
                      <ArrowUpRightIcon size={18} aria-hidden="true" />
                    </a>
                  )}
                </div>
                <div className="project-body">
                  <p className="project-summary">{project.summary}</p>
                  <p>{project.description}</p>
                  <dl>
                    <div>
                      <dt>My role</dt>
                      <dd>{project.role}</dd>
                    </div>
                    <div>
                      <dt>Focus</dt>
                      <dd>{project.focus}</dd>
                    </div>
                  </dl>
                  <details>
                    <summary>Behind the work</summary>
                    <div className="project-details">
                      <h4>How I approach it</h4>
                      <p>{project.approach}</p>
                      <p className="project-note">{project.note}</p>
                    </div>
                  </details>
                </div>
              </article>
            ))}
            {visible.length === 0 && (
              <div className="empty-state">
                <h3>No matching work yet.</h3>
                <p>Try another skill or browse the full collection.</p>
                <button className="text-button" onClick={allWork}>
                  Show all work <ArrowRightIcon aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </section>
        <section className="about" id="about" aria-labelledby="about-title">
          <div className="page-wrap about-grid">
            <h2 id="about-title">
              Understand the system.<span>Then make it simpler.</span>
            </h2>
            <div>
              <p>
                I’m Isaac Ng, also known as Ng Yin Ze. I enjoy software with a
                real job to do: a better desktop experience, a dependable data
                workflow, or a useful way to connect ideas.
              </p>
              <p>
                I work across existing codebases, follow problems to their
                cause, and care about the details that make software reliable.
              </p>
              <a className="contact-link" href={github}>
                Let’s connect on GitHub
                <ArrowUpRightIcon size={22} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="page-wrap">
        <p>
          <strong>Isaac Ng</strong>
          <span>Desktop software. Data. Tools for thinking.</span>
        </p>
        <a href="#top">
          Back to top
          <ArrowUpRightIcon size={19} aria-hidden="true" />
        </a>
      </footer>
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
