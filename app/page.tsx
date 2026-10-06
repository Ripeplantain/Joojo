"use client";

import { useEffect, useRef, useState } from "react";
import DigitalTwin from "./digital-twin";

const emailHref = "https://mail.google.com/mail/?view=cm&fs=1&to=irvingmanny%40gmail.com&su=Hello%20Emmanuel";

const journey = [
  {
    number: "03",
    period: "2024 - now",
    role: "Front-End Engineer",
    company: "Hubtel Limited",
    location: "Accra, Ghana",
    summary:
      "Build responsive Vue/Nuxt interfaces for lenders, agencies, financiers, and merchant customers across production credit-data and payment platforms. Deliver frontend and backend features for the Agency Portal, integrating user workflows with APIs and supporting services. Collaborate across frontend and backend teams on authentication, payment integrations, access controls, automated testing, and Azure DevOps releases.",
    tags: ["Vue", "Nuxt", "Azure DevOps"],
    current: true,
  },
  {
    number: "02",
    period: "2023",
    role: "Software Engineer",
    company: "Zerotech Agency",
    location: "US remote",
    summary:
      "Developed RESTful APIs with Node.js/NestJS and Python/Django, and responsive React/Next.js dashboards using Material UI. Integrated Twilio and AWS SES APIs for communications, with Redis supporting application workflows. Contributed to microservice design, PostgreSQL-backed services, and CI/CD workflows using GitHub Actions, Docker, AWS, and Terraform.",
    tags: ["NestJS", "Django", "Terraform"],
  },
  {
    number: "01",
    period: "2021 - 2022",
    role: "Software Engineer",
    company: "University of Cape Coast",
    location: "Cape Coast, Ghana",
    summary:
      "Built internal administration portals with Laravel, Jetstream, Tailwind CSS, and Alpine.js during national service. Automated reporting and approval workflows, analyzed student issues with Python, and supported digitization of student records.",
    tags: ["Laravel", "Python", "Tailwind"],
  },
];

const projects = [
  {
    index: "01",
    label: "Credit data platform",
    title: "Lenders Portal",
    copy: "Frontend workflows that let lenders submit credit data to MyCreditScore Bureau and access credit reports for individuals and businesses.",
    detail: "A lender-facing portal for submitting bureau data and retrieving credit reports for people and businesses.",
    contribution: "Built the responsive workflows around borrower search, CSV uploads, and report access.",
    impact: "Brings borrower search, data uploads, and credit reports into one lender workflow.",
    tools: ["Vue", "Nuxt", "APIs", "CSV workflows"],
    stack: "Borrower search / Credit reports / CSV uploads",
    tone: "project-orange",
  },
  {
    index: "02",
    label: "Credit data platform",
    title: "Agency Backoffice",
    copy: "Delivered frontend and backend features for the Agency Portal, connecting agency workflows with APIs and supporting services within the wider credit-data platform.",
    detail: "An agency operations backoffice inside the wider credit-data platform.",
    contribution: "Delivered frontend and backend features that connected agency workflows to APIs and supporting services.",
    impact: "Turns complex agency operations into a clearer backoffice experience connected to the wider platform.",
    tools: ["Vue", "Nuxt", "APIs", "Access controls"],
    stack: "Frontend + backend / APIs / Agency workflows",
    tone: "project-blue",
  },
  {
    index: "03",
    label: "Digital payments + overdrafts",
    title: "PaySmallSmall Backoffice",
    copy: "Built backoffice applications for financiers and Hubtel internal operations teams supporting PaySmallSmall, a digital payment and overdraft solution for Albrim Microfinance.",
    detail: "Backoffice applications supporting financiers and internal operations for a digital payment and overdraft product.",
    contribution: "Built focused surfaces for teams supporting PaySmallSmall workflows across financier and internal operations.",
    impact: "Gives financiers and operations teams a focused surface for supporting payment and overdraft workflows.",
    tools: ["Vue", "Nuxt", "Payment integrations", "Internal tools"],
    stack: "Financier portal / Internal operations / Supporting services",
    tone: "project-green",
  },
  {
    index: "04",
    label: "Merchant payments",
    title: "Merchant Invoicing Platform",
    copy: "Built Nuxt 3 and Vue 3 invoice listing, detail, payment-status, and receipt experiences, including OAuth, secure tenant sessions, bot protection, and OTP/3DS card payments through Hubtel Unified Checkout.",
    detail: "A merchant invoicing experience that connects invoice discovery, payment status, and receipts.",
    contribution: "Built invoice listing, detail, payment-status, and receipt experiences with secure tenant sessions and checkout flows.",
    impact: "Connects invoice discovery, payment status, and receipts into one secure merchant journey.",
    tools: ["Nuxt 3", "Vue 3", "OAuth", "OTP / 3DS", "Unified Checkout"],
    stack: "Nuxt 3 / Vue 3 / OAuth / 3DS checkout",
    tone: "project-orange",
  },
];

const capabilities = [
  "TypeScript + JavaScript",
  "React, Next.js, Vue + Nuxt",
  "NestJS, Django + Laravel",
  "PostgreSQL, Redis + MongoDB",
  "AWS, Docker + Terraform",
  "AI + third-party API integration",
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const modalCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sections = ["home", "about", "journey", "portfolio", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -55%", threshold: [0.1, 0.3, 0.6] },
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modalCloseRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <div className="site-shell">
      <div className="grain" aria-hidden="true" />
      <header className="topbar">
        <a className="wordmark" href="#home" aria-label="Emmanuel Gyang home">
          <span className="wordmark-mark">EG</span>
          <span>Emmanuel Gyang</span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          {[
            ["about", "about"],
            ["journey", "journey"],
            ["portfolio", "portfolio"],
            ["contact", "contact"],
          ].map(([label, href]) => (
            <a className={activeSection === href ? "active" : ""} href={`#${href}`} key={href}>
              {label}
            </a>
          ))}
        </nav>
        <a className="topbar-link" href="/Emmanuel%20Gyang%20%E2%80%94%20Software%20Engineer%20Resume.pdf" download>
          Download CV <span aria-hidden="true">[PDF]</span>
        </a>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy reveal reveal-one">
            <p className="eyebrow"><span className="status-dot" /> Software engineer / Accra, Ghana</p>
            <h1>I build the quiet systems behind <em>better decisions.</em></h1>
            <p className="hero-lede">
              I&apos;m a software engineer in Accra, Ghana, working across financial platforms, cloud infrastructure, and AI-powered products. I care about the quiet engineering that makes important work feel simple.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#portfolio">See selected work <span aria-hidden="true">-&gt;</span></a>
              <a className="text-link" href={emailHref} target="_blank" rel="noreferrer">Say hello <span aria-hidden="true">↗</span></a>
            </div>
            <div className="hero-meta">
              <span>Currently at <strong>Hubtel</strong></span>
              <span className="meta-divider" />
              <span>Interested in thoughtful collaborations</span>
            </div>
          </div>

          <div className="signal-panel reveal reveal-two" aria-label="Current engineering focus">
            <div className="panel-header">
              <span>Field note / 01</span>
              <span className="panel-live"><span className="status-dot" /> currently building</span>
            </div>
            <div className="signal-visual note-visual" aria-hidden="true">
              <div className="signal-grid" />
              <div className="note-rule note-rule-one" />
              <div className="note-rule note-rule-two" />
              <div className="note-stamp">EG</div>
              <div className="note-copy">Good software<br /><em>earns trust</em><br />through the details.</div>
              <div className="signal-caption">Accra / Ghana<br />06.10.26</div>
            </div>
            <div className="signal-footer">
              <div><strong>04+</strong><span>years building</span></div>
              <div><strong>03</strong><span>domains explored</span></div>
              <div><strong>01</strong><span>digital twin</span></div>
            </div>
          </div>
        </section>

        <section className="ticker" aria-label="Focus areas">
          <div className="ticker-track">
            <span>PRODUCT ENGINEERING</span><i />
            <span>FINANCIAL SYSTEMS</span><i />
            <span>CLOUD + AI</span><i />
            <span>PRODUCT ENGINEERING</span><i />
            <span>FINANCIAL SYSTEMS</span><i />
            <span>CLOUD + AI</span><i />
          </div>
        </section>

        <section className="section-wrap about-section" id="about">
          <div className="section-kicker reveal"><span>01</span><span>About the work</span></div>
          <div className="about-grid">
            <h2 className="reveal reveal-one">Curious about the whole system, not just the screen.</h2>
            <div className="about-copy reveal reveal-two">
              <p>I like working where product thinking meets infrastructure: understanding the need, shaping the model, and shipping something that can keep its footing when the stakes get higher.</p>
              <p>My path has moved from university operations to agency platforms and now enterprise financial products. Each step has made the same thing clearer: good software earns trust through its details.</p>
              <a className="text-link" href={emailHref} target="_blank" rel="noreferrer">Start a conversation <span aria-hidden="true">-&gt;</span></a>
            </div>
          </div>
          <div className="capability-strip reveal">
            {capabilities.map((capability) => <span key={capability}>{capability}</span>)}
          </div>
        </section>

        <section className="section-wrap journey-section" id="journey">
          <div className="section-kicker reveal"><span>02</span><span>Career journey</span></div>
          <div className="journey-intro">
            <h2 className="reveal reveal-one">A practice built in chapters.</h2>
            <p className="reveal reveal-two">Three environments. One consistent question: how do we make complex work easier to trust?</p>
          </div>
          <div className="timeline">
            {journey.map((role) => (
              <article className={`timeline-item ${role.current ? "is-current" : ""}`} key={role.company}>
                <div className="timeline-marker"><span>{role.number}</span></div>
                <div className="timeline-main">
                  <div className="timeline-heading">
                    <div><p className="period">{role.period} {role.current && <span className="current-label">current</span>}</p><h3>{role.role}</h3><p className="company">{role.company} <span>/</span> {role.location}</p></div>
                    <span className="timeline-arrow" aria-hidden="true">↗</span>
                  </div>
                  <p className="timeline-summary">{role.summary}</p>
                  <div className="tag-row">{role.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="portfolio-section" id="portfolio">
          <div className="section-wrap">
            <div className="section-kicker section-kicker-light reveal"><span>03</span><span>Selected work</span></div>
            <div className="portfolio-intro"><h2 className="reveal reveal-one">Work with a point of view.</h2><p className="reveal reveal-two">A few systems I have helped make more legible, more resilient, and more useful.</p></div>
            <div className="project-grid">
              {projects.map((project) => (
                <article
                  className={`project-card ${project.tone}`}
                  key={project.title}
                  role="button"
                  tabIndex={0}
                  aria-haspopup="dialog"
                  aria-label={`View details for ${project.title}`}
                  onClick={() => setSelectedProject(project)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedProject(project);
                    }
                  }}
                >
                  <div className="project-top"><span>{project.index}</span><span>{project.label}</span></div>
                  <div className="project-art" aria-hidden="true"><span className="project-art-line" /><span className="project-art-square" /><span className="project-art-dot" /></div>
                  <h3>{project.title}</h3>
                  <p>{project.copy}</p>
                  <div className="project-impact"><span>Why it matters</span><p>{project.impact}</p></div>
                  <div className="project-bottom"><span>{project.stack}</span><span className="card-arrow" aria-hidden="true">-&gt;</span></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {selectedProject && (
          <div
            className="project-modal-backdrop"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelectedProject(null);
            }}
          >
            <section className={`project-modal ${selectedProject.tone}`} role="dialog" aria-modal="true" aria-labelledby="project-modal-title" aria-describedby="project-modal-summary">
              <div className="project-modal-top">
                <span>{selectedProject.index} / {selectedProject.label}</span>
                <button className="project-modal-close" ref={modalCloseRef} type="button" onClick={() => setSelectedProject(null)} aria-label="Close project details">Close <span aria-hidden="true">×</span></button>
              </div>
              <h2 id="project-modal-title">{selectedProject.title}</h2>
              <p className="project-modal-summary" id="project-modal-summary">{selectedProject.detail}</p>
              <div className="project-modal-grid">
                <div className="project-modal-field"><span>My contribution</span><p>{selectedProject.contribution}</p></div>
                <div className="project-modal-field"><span>Impact</span><p>{selectedProject.impact}</p></div>
              </div>
              <div className="project-modal-tools"><span>Tools &amp; technologies</span><div>{selectedProject.tools.map((tool) => <span key={tool}>{tool}</span>)}</div></div>
            </section>
          </div>
        )}

        <section className="section-wrap contact-section" id="contact">
          <div className="contact-card reveal">
            <div className="contact-copy"><p className="eyebrow"><span className="status-dot" /> The next chapter</p><h2>Have a hard problem worth making clearer?</h2><p>Tell me what you are building, what is getting in the way, or what you want to explore next.</p></div>
            <div className="contact-links"><a className="button button-primary" href={emailHref} target="_blank" rel="noreferrer">Email Emmanuel <span aria-hidden="true">-&gt;</span></a><a className="text-link" href="https://github.com/Ripeplantain" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a></div>
          </div>
        </section>
      </main>

      <footer className="footer section-wrap"><span>Emmanuel Gyang / Software Engineer</span><span>Built in Accra <span aria-hidden="true">+</span> for what&apos;s next</span><span>© 2026</span></footer>
      <DigitalTwin />
    </div>
  );
}
