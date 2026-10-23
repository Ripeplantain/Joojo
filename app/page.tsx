"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import DigitalTwin from "./digital-twin";

const emailHref = "https://mail.google.com/mail/?view=cm&fs=1&to=irvingmanny%40gmail.com&su=Hello%20Emmanuel";
const resumeHref = "/Emmanuel%20Gyang%20%E2%80%94%20Software%20Engineer%20Resume.pdf";
const navItems = ["about", "journey", "portfolio", "contact"];

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

type Project = (typeof projects)[number];

const ACTIVE_LINK_CLASS = ":target-current";

export default function Home() {
  const [activeProject, setActiveProject] = useState(0);
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const navSheetRef = useRef<HTMLDialogElement>(null);
  const projectDialogRef = useRef<HTMLDialogElement>(null);

  // One-shot reveal for content. Deliberately not scroll-linked: text should not
  // re-animate every time the reader scrolls back past it.
  useEffect(() => {
    document.documentElement.classList.add("reveal-ready");
    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  // Nav highlighting. Chrome/Edge get native `scroll-target-group`; everything
  // else falls back to IntersectionObserver. aria-current is synced either way.
  useEffect(() => {
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-nav] a"));
    if (links.length === 0) return;

    if (CSS.supports("scroll-target-group: auto")) {
      const syncAria = () => {
        links.forEach((link) => {
          link.setAttribute("aria-current", link.matches(":target-current") ? "true" : "false");
        });
      };
      syncAria();
      document.addEventListener("scrollend", syncAria);
      return () => document.removeEventListener("scrollend", syncAria);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible?.target.id) return;
        links.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${visible.target.id}`;
          link.classList.toggle(ACTIVE_LINK_CLASS, isActive);
          link.setAttribute("aria-current", isActive ? "true" : "false");
        });
      },
      { rootMargin: "-30% 0px -55%", threshold: [0.1, 0.3, 0.6] },
    );

    navItems.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  // Which card is centred in the snap carousel. Measured from geometry rather
  // than intersection ratios, because two cards can be fully visible at once.
  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const cards = Array.from(deck.querySelectorAll<HTMLElement>("[data-card-index]"));
      if (cards.length === 0) return;
      const deckRect = deck.getBoundingClientRect();
      const deckCentre = deckRect.left + deckRect.width / 2;
      let nearest = 0;
      let shortest = Infinity;
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const distance = Math.abs(rect.left + rect.width / 2 - deckCentre);
        if (distance < shortest) {
          shortest = distance;
          nearest = Number(card.dataset.cardIndex);
        }
      });
      setActiveProject(nearest);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    deck.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      deck.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const dialog = projectDialogRef.current;
    if (dialog && openProject && !dialog.open) dialog.showModal();
  }, [openProject]);

  // Safari has no `closedby`, so light dismiss is wired up by hand there.
  useEffect(() => {
    if ("closedBy" in HTMLDialogElement.prototype) return;
    const dialogs = [navSheetRef.current, projectDialogRef.current].filter(Boolean) as HTMLDialogElement[];

    const closeOnBackdrop = (event: MouseEvent) => {
      const dialog = event.currentTarget as HTMLDialogElement;
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const insideDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (!insideDialog) dialog.close();
    };

    dialogs.forEach((dialog) => dialog.addEventListener("click", closeOnBackdrop));
    return () => dialogs.forEach((dialog) => dialog.removeEventListener("click", closeOnBackdrop));
  }, []);

  const goToProject = useCallback((index: number) => {
    const deck = deckRef.current;
    if (!deck) return;
    const clamped = Math.max(0, Math.min(projects.length - 1, index));
    deck
      .querySelector<HTMLElement>(`[data-card-index="${clamped}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    if (!canvas || !hero) return;

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;

    const vertexSource = `
      attribute vec2 position;
      void main() { gl_Position = vec4(position, 0.0, 1.0); }
    `;
    const fragmentSource = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 5; i++) {
          value += amplitude * noise(p);
          p = p * 2.02 + 13.7;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        uv *= 0.72;
        float t = time * 0.075;
        vec2 warp = vec2(fbm(uv * 1.35 + vec2(t, -t)), fbm(uv * 1.2 + vec2(-t, t * 0.7)));
        float flow = fbm(uv * 2.0 + warp * 2.25 + vec2(t * 1.5, -t));
        float ribbon = smoothstep(0.36, 0.76, sin((uv.x + uv.y * 0.72 + flow * 0.8) * 4.0) * 0.5 + 0.5);
        vec3 baseA = vec3(0.024, 0.027, 0.043);
        vec3 baseB = vec3(0.055, 0.078, 0.137);
        vec3 accent = vec3(0.302, 0.517, 0.953);
        vec3 color = mix(baseA, baseB, flow);
        color = mix(color, accent, ribbon * 0.38);
        color += pow(flow, 5.0) * vec3(0.16, 0.24, 0.44);
        float vignette = 1.0 - smoothstep(0.45, 1.45, length(uv));
        gl_FragColor = vec4(color * (0.52 + vignette * 0.68), 1.0);
      }
    `;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    const buffer = gl.createBuffer();
    const position = gl.getAttribLocation(program, "position");
    const resolution = gl.getUniformLocation(program, "resolution");
    const time = gl.getUniformLocation(program, "time");
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.useProgram(program);
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animationFrame = 0;
    let visible = true;
    const startedAt = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.floor(canvas.clientWidth * dpr);
      const height = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const render = (now: number) => {
      resize();
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform1f(time, (now - startedAt) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (visible && !reduceMotion) animationFrame = window.requestAnimationFrame(render);
    };

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      const nextVisible = entry.isIntersecting;
      if (nextVisible && !visible && !reduceMotion) animationFrame = window.requestAnimationFrame(render);
      visible = nextVisible;
      if (!visible && animationFrame) window.cancelAnimationFrame(animationFrame);
    });

    visibilityObserver.observe(hero);
    render(startedAt);
    window.addEventListener("resize", resize);
    return () => {
      visibilityObserver.disconnect();
      window.removeEventListener("resize", resize);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return (
    <div className="site-shell">
      <div className="scroll-progress" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <header className="topbar">
        <div className="topbar-inner">
          <a className="wordmark" href="#home" aria-label="Emmanuel Gyang home">
            <span className="wordmark-mark">EG</span>
            <span>Emmanuel Gyang</span>
          </a>
          <nav className="nav-links" data-nav aria-label="Primary navigation">
            {navItems.map((item) => (
              <a href={`#${item}`} key={item}>{item}</a>
            ))}
          </nav>
          <a className="topbar-cta" href={resumeHref} download>Download CV <span aria-hidden="true">[PDF]</span></a>
          <button className="menu-toggle" type="button" aria-label="Open navigation" onClick={() => navSheetRef.current?.showModal()}>
            <span /><span />
          </button>
        </div>
      </header>

      <dialog className="nav-sheet" ref={navSheetRef} aria-label="Navigation" {...{ closedby: "any" }}>
        <div className="nav-sheet-top">
          <span className="eyebrow">Menu</span>
          <button className="nav-sheet-close" type="button" onClick={() => navSheetRef.current?.close()}>Close <span aria-hidden="true">×</span></button>
        </div>
        <nav data-nav aria-label="Mobile navigation">
          {navItems.map((item, index) => (
            <a href={`#${item}`} key={item} onClick={() => navSheetRef.current?.close()}>
              <span>0{index + 1}</span>{item}
            </a>
          ))}
        </nav>
        <a className="nav-sheet-cta" href={resumeHref} download>Download CV <span aria-hidden="true">[PDF]</span></a>
      </dialog>

      <main>
        <section className="hero" id="home" ref={heroRef}>
          <canvas className="hero-canvas" ref={canvasRef} aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-veil" aria-hidden="true" />
          <div className="hero-body">
            <div className="hero-copy">
              <p className="eyebrow reveal"><span className="status-dot" /> Software engineer / Accra, Ghana</p>
              <h1 className="reveal reveal-one">I build the quiet systems behind <em>better decisions.</em></h1>
              <p className="hero-lede reveal reveal-two">
                I&apos;m a software engineer in Accra, Ghana, working across financial platforms, cloud infrastructure, and AI-powered products. I care about the quiet engineering that makes important work feel simple.
              </p>
              <div className="hero-actions reveal reveal-two">
                <a className="button button-primary" href="#portfolio">See selected work <span aria-hidden="true">-&gt;</span></a>
                <a className="button button-ghost" href={emailHref} target="_blank" rel="noreferrer">Say hello <span aria-hidden="true">↗</span></a>
              </div>
              <div className="hero-meta reveal reveal-two">
                <span>Currently at <strong>Hubtel</strong></span>
                <span className="meta-divider" />
                <span>Interested in thoughtful collaborations</span>
              </div>
              <a className="hero-scroll" href="#about"><span>Scroll to explore</span><i aria-hidden="true" /></a>
            </div>

            <aside className="signal-panel reveal reveal-two" aria-label="Current engineering focus">
              <div className="panel-header">
                <span>Field note / 01</span>
                <span className="panel-live"><span className="status-dot" /> currently building</span>
              </div>
              <div className="note-visual" aria-hidden="true">
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
            </aside>
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

        <section className="section-wrap about" id="about">
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

        <section className="section-wrap journey" id="journey">
          <div className="section-kicker reveal"><span>02</span><span>Career journey</span></div>
          <div className="journey-intro">
            <h2 className="reveal reveal-one">A practice built in chapters.</h2>
            <p className="reveal reveal-two">Three environments. One consistent question: how do we make complex work easier to trust?</p>
          </div>
          <div className="timeline">
            <div className="timeline-rail" aria-hidden="true" />
            {journey.map((role) => (
              <article className={`timeline-item ${role.current ? "is-current" : ""}`} key={role.company}>
                <div className="timeline-marker">{role.number}</div>
                <div className="timeline-main">
                  <div className="timeline-heading">
                    <div>
                      <p className="period">{role.period} {role.current && <span className="current-label">current</span>}</p>
                      <h3>{role.role}</h3>
                      <p className="company">{role.company} <span>/</span> {role.location}</p>
                    </div>
                    <span className="timeline-arrow" aria-hidden="true">↗</span>
                  </div>
                  <p className="timeline-summary">{role.summary}</p>
                  <div className="tag-row">{role.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="portfolio" id="portfolio">
          <div className="section-wrap">
            <div className="section-kicker reveal"><span>03</span><span>Selected work</span></div>
            <div className="portfolio-intro">
              <h2 className="reveal reveal-one">Work with a point of view.</h2>
              <div className="portfolio-side">
                <p className="reveal reveal-two">A few systems I have helped make more legible, more resilient, and more useful.</p>
                <div className="deck-controls">
                  <button type="button" onClick={() => goToProject(activeProject - 1)} disabled={activeProject === 0} aria-label="Previous project">←</button>
                  <span>{String(activeProject + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
                  <button type="button" onClick={() => goToProject(activeProject + 1)} disabled={activeProject === projects.length - 1} aria-label="Next project">→</button>
                </div>
              </div>
            </div>
          </div>
          <div className="deck" ref={deckRef}>
            {projects.map((project, index) => (
              <article className={`card ${project.tone}`} key={project.title} data-card-index={index}>
                <div className="card-top"><span>{project.index}</span><span>{project.label}</span></div>
                <h3>{project.title}</h3>
                <p className="card-copy">{project.copy}</p>
                <div className="card-impact">
                  <span>Why it matters</span>
                  <p>{project.impact}</p>
                </div>
                <div className="card-bottom">
                  <span>{project.stack}</span>
                  <span className="card-arrow" aria-hidden="true">-&gt;</span>
                </div>
                <div className="card-glow" aria-hidden="true" />
                <button className="card-hit" type="button" aria-haspopup="dialog" onClick={() => setOpenProject(project)}>
                  <span className="visually-hidden">View details for {project.title}</span>
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="section-wrap contact" id="contact">
          <div className="contact-card reveal">
            <div className="contact-copy">
              <p className="eyebrow"><span className="status-dot" /> The next chapter</p>
              <h2>Have a hard problem worth making clearer?</h2>
              <p>Tell me what you are building, what is getting in the way, or what you want to explore next.</p>
            </div>
            <div className="contact-links">
              <a className="button button-primary" href={emailHref} target="_blank" rel="noreferrer">Email Emmanuel <span aria-hidden="true">-&gt;</span></a>
              <a className="text-link" href="https://github.com/Ripeplantain" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>
      </main>

      <dialog
        className={`project-dialog ${openProject?.tone ?? ""}`}
        ref={projectDialogRef}
        aria-labelledby="project-dialog-title"
        onClose={() => setOpenProject(null)}
        {...{ closedby: "any" }}
      >
        {openProject && (
          <>
            <div className="dialog-top">
              <span>{openProject.index} / {openProject.label}</span>
              <button className="dialog-close" type="button" onClick={() => projectDialogRef.current?.close()}>Close <span aria-hidden="true">×</span></button>
            </div>
            <h2 id="project-dialog-title">{openProject.title}</h2>
            <p className="dialog-summary">{openProject.detail}</p>
            <div className="dialog-grid">
              <div className="dialog-field"><span>My contribution</span><p>{openProject.contribution}</p></div>
              <div className="dialog-field"><span>Impact</span><p>{openProject.impact}</p></div>
            </div>
            <div className="dialog-tools">
              <span>Tools &amp; technologies</span>
              <div className="tag-row">{openProject.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
            </div>
          </>
        )}
      </dialog>

      <footer className="footer section-wrap">
        <span>Emmanuel Gyang / Software Engineer</span>
        <span>Built in Accra <span aria-hidden="true">+</span> for what&apos;s next</span>
        <span>© 2026</span>
        <a className="footer-top" href="#home" aria-label="Back to top">↑</a>
      </footer>
      <DigitalTwin />
    </div>
  );
}
