"use client";

import { useEffect, useState } from "react";
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
    stack: "Borrower search / Credit reports / CSV uploads",
    tone: "project-orange",
  },
  {
    index: "02",
    label: "Credit data platform",
    title: "Agency Backoffice",
    copy: "Delivered frontend and backend features for the Agency Portal, connecting agency workflows with APIs and supporting services within the wider credit-data platform.",
    stack: "Frontend + backend / APIs / Agency workflows",
    tone: "project-blue",
  },
  {
    index: "03",
    label: "Digital payments + overdrafts",
    title: "PaySmallSmall Backoffice",
    copy: "Built backoffice applications for financiers and Hubtel internal operations teams supporting PaySmallSmall, a digital payment and overdraft solution for Albrim Microfinance.",
    stack: "Financier portal / Internal operations / Supporting services",
    tone: "project-green",
  },
  {
    index: "04",
    label: "Merchant payments",
    title: "Merchant Invoicing Platform",
    copy: "Built Nuxt 3 and Vue 3 invoice listing, detail, payment-status, and receipt experiences, including OAuth, secure tenant sessions, bot protection, and OTP/3DS card payments through Hubtel Unified Checkout.",
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
            <h1>I build the systems behind <em>better decisions.</em></h1>
            <p className="hero-lede">
              Full-stack engineer working across financial platforms, cloud infrastructure, and AI-powered products. I care about the quiet engineering that makes important work feel simple.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#journey">Explore the journey <span aria-hidden="true">-&gt;</span></a>
              <a className="text-link" href="https://www.linkedin.com/in/emmanuel-gyang" target="_blank" rel="noreferrer">LinkedIn profile <span aria-hidden="true">↗</span></a>
            </div>
            <div className="hero-meta">
              <span>Currently at <strong>Hubtel</strong></span>
              <span className="meta-divider" />
              <span>Open to thoughtful collaborations</span>
            </div>
          </div>

          <div className="signal-panel reveal reveal-two" aria-label="Current engineering focus">
            <div className="panel-header">
              <span>Signal / 01</span>
              <span className="panel-live"><span className="status-dot" /> live focus</span>
            </div>
            <div className="signal-visual" aria-hidden="true">
              <div className="signal-grid" />
              <div className="signal-line line-one" />
              <div className="signal-line line-two" />
              <div className="signal-line line-three" />
              <div className="signal-node node-core"><span>core</span></div>
              <div className="signal-node node-data"><span>data</span></div>
              <div className="signal-node node-people"><span>people</span></div>
              <div className="signal-node node-scale"><span>scale</span></div>
              <div className="signal-caption">Secure by default<br />Useful under pressure</div>
            </div>
            <div className="signal-footer">
              <div><strong>04+</strong><span>years building</span></div>
              <div><strong>03</strong><span>domains explored</span></div>
              <div><strong>01</strong><span>north star</span></div>
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
                <article className={`project-card ${project.tone}`} key={project.title}>
                  <div className="project-top"><span>{project.index}</span><span>{project.label}</span></div>
                  <div className="project-art" aria-hidden="true"><span className="project-art-line" /><span className="project-art-square" /><span className="project-art-dot" /></div>
                  <h3>{project.title}</h3>
                  <p>{project.copy}</p>
                  <div className="project-bottom"><span>{project.stack}</span><span className="card-arrow" aria-hidden="true">-&gt;</span></div>
                </article>
              ))}
            </div>
          </div>
        </section>

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
