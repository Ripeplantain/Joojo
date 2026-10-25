"use client";

import Joojo from "./joojo";
import { useActiveSection, useReveal } from "./use-page";
import {
  about,
  capabilities,
  certifications,
  education,
  links,
  navSections,
  profile,
  projects,
  roles,
} from "./portfolio-data";

const sectionIds = navSections.map((section) => section.id);

export default function DarkCinematic() {
  useReveal(".eg");
  const active = useActiveSection(sectionIds);

  return (
    <>
      <a className="eg-skip" href="#work">Skip to the work</a>
      <div className="eg-light" aria-hidden="true" />

      <header className="eg-bar">
        <a className="eg-name" href="#top">
          {profile.name}
        </a>
        <nav className="eg-nav" aria-label="Sections">
          {navSections.map((section) => (
            <a key={section.id} href={`#${section.id}`} aria-current={active === section.id ? "true" : undefined}>
              {section.label}
            </a>
          ))}
        </nav>
        <a className="eg-bar-cv" href={links.resumeHref} download>
          Download CV
        </a>
      </header>

      <main id="top">
        <section className="eg-hero">
          <p className="eg-slug" data-reveal>
            {profile.role} — {profile.location}
          </p>

          <h1 className="eg-title" data-reveal>
            <span>Systems</span>
            <span>that hold</span>
            <span>when it counts.</span>
          </h1>


          <div className="eg-hero-foot">
            <div className="eg-hero-actions" data-reveal>
              <a className="eg-btn" href="#work">
                View my work
              </a>
              <a className="eg-btn eg-btn-line" href={links.emailHref} target="_blank" rel="noreferrer">
                Get in touch
              </a>
            </div>
            <p className="eg-caption" data-reveal>
              {profile.lede}
            </p>
          </div>

          <p className="eg-standby" data-reveal>
            <span className="eg-lit" />
            {profile.currently}
          </p>
        </section>

        <section className="eg-section" id="work" aria-labelledby="eg-work-title">
          <div className="eg-section-head">
            <h2 id="eg-work-title" data-reveal>
              Selected work
            </h2>
            <p data-reveal>
              Four production platforms inside Ghana&rsquo;s financial infrastructure, and a hiring product I am
              building with friends. One frame at a time.
            </p>
          </div>

          {projects.map((project, index) => (
            <article className={`eg-frame ${index % 2 === 1 ? "is-flipped" : ""}`} key={project.id} data-reveal>
              <figure className="eg-plate" style={{ aspectRatio: project.ratio }}>
                <figcaption>{project.plate}</figcaption>
              </figure>
              <div className="eg-frame-body">
                <h3>{project.name}</h3>
                <p className="eg-context">{project.context}</p>
                <p className="eg-frame-copy">{project.problem}</p>
                <div className="eg-frame-fields">
                  <div>
                    <h4>What I built</h4>
                    <p>{project.contribution}</p>
                  </div>
                  <div>
                    <h4>Why it matters</h4>
                    <p>{project.outcome}</p>
                  </div>
                </div>
                <ul className="eg-stack">
                  {project.stack.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
                {project.link && (
                  <a className="eg-frame-link" href={project.link.href} target="_blank" rel="noreferrer">
                    {project.link.label}
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </section>

        <section className="eg-section eg-about" id="about" aria-labelledby="eg-about-title">
          <div className="eg-about-grid">
            <div data-reveal>
              <h2 id="eg-about-title">{about.heading}</h2>
              <div className="eg-prose">
                {about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <ul className="eg-principles">
                {about.principles.map((principle) => (
                  <li key={principle}>{principle}</li>
                ))}
              </ul>
            </div>
            <figure className="eg-plate eg-portrait" style={{ aspectRatio: "4 / 5" }} data-reveal>
              <figcaption>Portrait — {profile.name}, Accra</figcaption>
            </figure>
          </div>
        </section>

        <section className="eg-section" id="expertise" aria-labelledby="eg-expertise-title">
          <div className="eg-section-head">
            <h2 id="eg-expertise-title" data-reveal>
              What I do
            </h2>
            <p data-reveal>Six places I work, across the stack and the infrastructure under it.</p>
          </div>
          <ul className="eg-capabilities">
            {capabilities.map((capability) => (
              <li key={capability.title} data-reveal>
                <h3>{capability.title}</h3>
                <p>{capability.body}</p>
                <ul className="eg-stack">
                  {capability.tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <section className="eg-section" id="experience" aria-labelledby="eg-experience-title">
          <div className="eg-section-head">
            <h2 id="eg-experience-title" data-reveal>
              Experience
            </h2>
            <p data-reveal>Three environments, one consistent question: how do we make complex work easier to trust?</p>
          </div>

          <div className="eg-roles">
            {roles.map((role) => (
              <article className={`eg-role ${role.current ? "is-current" : ""}`} key={role.company} data-reveal>
                <p className="eg-period">
                  {role.period}
                  {role.current && <span className="eg-lit" aria-hidden="true" />}
                </p>
                <div>
                  <h3>
                    {role.title} <span>· {role.company}</span>
                  </h3>
                  <p className="eg-context">{role.location}</p>
                  <p className="eg-frame-copy">{role.summary}</p>
                  <ul className="eg-highlights">
                    {role.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                  <ul className="eg-stack">
                    {role.stack.map((tool) => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className="eg-credentials" data-reveal>
            <div>
              <h4>Education</h4>
              <ul>
                {education.map((item) => (
                  <li key={item.title}>
                    <strong>{item.title}</strong>
                    <span>
                      {item.org} · {item.period}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Certifications</h4>
              <ul>
                {certifications.map((item) => (
                  <li key={item}>
                    <strong>{item}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="eg-section eg-end" id="contact" aria-labelledby="eg-contact-title">
          <h2 id="eg-contact-title" data-reveal>
            Have a hard problem worth making clearer?
          </h2>
          <p data-reveal>
            Tell me what you are building, what is getting in the way, or what you want to explore next.
          </p>
          <div className="eg-hero-actions" data-reveal>
            <a className="eg-btn" href={links.emailHref} target="_blank" rel="noreferrer">
              Email {profile.name.split(" ")[0]}
            </a>
            <a className="eg-btn eg-btn-line" href={links.githubHref} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
          <p className="eg-address" data-reveal>
            {links.email}
          </p>
        </section>
      </main>

      <footer className="eg-footer">
        <span>
          {profile.name} — {profile.role}
        </span>
        <span>Set in Gloock and Epilogue. Built in Accra.</span>
        <a href="#top">Back to top</a>
      </footer>

      <Joojo tagline="Answers from the verified profile" />
    </>
  );
}
