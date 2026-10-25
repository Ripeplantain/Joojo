// Verified profile content: the single source for every career fact on the page.
// app/page.tsx holds markup only and reads everything from here. The same facts are
// restated for the chat in DIGITAL_TWIN_INSTRUCTIONS in app/api/chat/route.ts, so a
// confirmed change belongs in both places. Nothing is added without Emmanuel
// confirming it. There are no public project links and no verifiable metrics, so
// neither is represented here.

export const profile = {
  name: "Emmanuel Gyang",
  initials: "EG",
  role: "Software Engineer",
  location: "Accra, Ghana",
  coordinates: "5.6037° N, 0.1870° W",
  experience: "4+ years",
  currently: "Software Engineer at Hubtel Limited",
  lede: "I build the systems powering Ghana’s financial infrastructure—from credit data and lending platforms to digital payments and merchant checkout—engineered for scale, resilience, and trust.",
  summary:
    "Software engineer with 4+ years across financial platforms, responsive web applications, scalable APIs, cloud-native systems, and AI-powered applications.",
} as const;

export const links = {
  email: "irvingmanny@gmail.com",
  emailHref:
    "https://mail.google.com/mail/?view=cm&fs=1&to=irvingmanny%40gmail.com&su=Hello%20Emmanuel",
  github: "github.com/Ripeplantain",
  githubHref: "https://github.com/Ripeplantain",
  resumeHref: "/Emmanuel%20Gyang%20%E2%80%94%20Software%20Engineer%20Resume.pdf",
} as const;

export type Project = {
  id: string;
  index: string;
  name: string;
  context: string;
  kind: "production" | "personal";
  problem: string;
  contribution: string;
  outcome: string;
  stack: string[];
  /** Aspect ratio for the reserved image area, so a real screenshot drops in without reflow. */
  ratio: string;
  plate: string;
  /** Only on work that is publicly reachable. Most of the work here is not. */
  link?: { href: string; label: string };
};

export const projects: Project[] = [
  {
    id: "lenders-portal",
    index: "01",
    name: "Lenders Portal",
    context: "Hubtel · Credit data platform",
    kind: "production",
    problem:
      "Lenders have to submit credit data to MyCreditScore Bureau and pull reports on individuals and businesses before they can price risk. Split across tools, that work is slow and easy to get wrong.",
    contribution:
      "Built the lender-facing workflows: borrower search, identity and credit-report views, dashboard totals, non-performing loan ratio displays, CSV upload flows with templates and error feedback, transaction and repayment views, and trusted-lender access states.",
    outcome:
      "Credit data now moves through one continuous submission-to-retrieval workflow, giving lenders complete, readable information at the point of decision.",
    stack: [
      "Nuxt 4",
      "Vue 3",
      "TypeScript",
      "Pinia",
      "Axios",
      "AWS S3",
      "OAuth 2.0",
      "Vitest",
      "Playwright",
      "Azure DevOps",
    ],
    ratio: "16 / 10",
    plate: "MyCreditScore — understanding what builds a credit score",
  },
  {
    id: "agency-backoffice",
    index: "02",
    name: "Agency Backoffice",
    context: "Hubtel · Credit data platform",
    kind: "production",
    problem:
      "Agency teams run day-to-day operations inside the wider credit-data platform, and their portal has to stay wired to the services underneath it.",
    contribution:
      "Built the agency dashboard, lender, merchant and staff administration, report-fee and maker-checker approval flows, and consumer, business and BNPL credit-report experiences. Engineered bulk report processing as resilient server-side jobs with PostgreSQL state, S3 uploads, ZIP, CSV and PDF exports, live progress and retry handling; also migrated authentication, enforced role-based access and expanded automated test coverage.",
    outcome:
      "Complex agency operations read as one coherent backoffice rather than a set of disconnected screens.",
    stack: [
      "Nuxt 4",
      "Vue 3",
      "TypeScript",
      "Pinia",
      "PostgreSQL",
      "AWS S3",
      "Socket.IO",
      "ExcelJS",
      "Vitest",
      "Azure DevOps",
    ],
    ratio: "16 / 10",
    plate: "MyCreditScore — credit report overview",
  },
  {
    id: "paysmallsmall",
    index: "03",
    name: "PaySmallSmall Backoffice",
    context: "Hubtel · PaySmallSmall for Albrim Microfinance",
    kind: "production",
    problem:
      "PaySmallSmall is Albrim Microfinance’s digital payment and overdraft platform. Its backoffice has to keep deposits, disbursements, repayments, defaults, recoveries and field operations visible as one connected loan lifecycle.",
    contribution:
      "Built and evolved the shared PaySmallSmall and Albrim backoffice: operational dashboards for daily performance, disbursements, paybacks, defaults, non-performing loans and spend; workflows for accounts, transactions, approvals, recoveries and agent management; and downloadable reports and exports. Structured both operational views on reusable Nuxt layers, integrated authentication, role permissions, APIs and event tracking, and expanded automated test coverage.",
    outcome:
      "Albrim and Hubtel teams can operate from one coherent system, follow money from deposit through repayment or recovery, and act on risk and exceptions without piecing the loan book together across tools.",
    stack: ["Vue", "Nuxt", "Payment integrations", "Internal tooling"],
    ratio: "16 / 10",
    plate: "PaySmallSmall Backoffice — sign-in at paysmallsmall.hubtel.com",
  },
  {
    id: "merchant-invoicing",
    index: "04",
    name: "Merchant Invoicing Platform",
    context: "Hubtel · Custom Approvals",
    kind: "production",
    problem:
      "Merchant customers need one secure place to discover invoices, review attachments, pay and retrieve receipts, while each tenant retains its own subdomain, identity and branding.",
    contribution:
      "Built the multi-tenant customer portal across invoice and receipt lists, invoice details, shared payment links, customer updates, attachments, pay-in slips and payment-status experiences. Engineered centralized Google and Microsoft OAuth with secure cross-subdomain sessions, tenant-aware routing and branding, Unified Checkout handoff, in-app card authentication with OTP and 3DS, Turnstile protection, product analytics and automated tests.",
    outcome:
      "Customers can move from invoice discovery to verified payment and receipt in one branded journey, while new merchant and public-sector tenants can reuse the same authentication, routing and payment foundation.",
    stack: ["Nuxt 3", "Vue 3", "OAuth", "OTP / 3DS", "Unified Checkout"],
    ratio: "16 / 10",
    plate: "Clifton Homes — invoice detail and payment status",
  },
  {
    id: "starline-hr",
    index: "05",
    name: "Starline HR",
    context: "Startup · Multi-tenant applicant tracking",
    kind: "personal",
    problem:
      "Hiring work is often scattered across inboxes, calendars, spreadsheets and disconnected candidate records. Teams need one place to move applicants from application to interview and decision without losing context or control.",
    contribution:
      "Built core hiring workflows across the multi-tenant ATS: interview scheduling and rescheduling with calendar and video-call integrations, notifications and candidate acceptance, bulk candidate actions, résumé quick view, job-match scoring, team roles and permissions, and reports and analytics. Also built and operated the delivery foundation—Dockerized applications, database migrations, CI/CD and server workflows—and wrote the engineering guidance used by coding agents across the monorepo.",
    outcome:
      "Hiring teams can manage candidates, interviews and decisions in one shared system, while each organization keeps its data, permissions and public careers experience isolated.",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "tRPC",
      "Drizzle ORM",
      "PostgreSQL",
      "Redis",
      "Astro",
      "Docker",
      "GitHub Actions",
    ],
    ratio: "16 / 10",
    plate: "Starline HR — modern hiring platform",
    link: { href: "https://starlinehr.com/", label: "starlinehr.com" },
  },
];

export type Role = {
  index: string;
  period: string;
  start: string;
  end: string;
  title: string;
  company: string;
  location: string;
  summary: string;
  highlights: string[];
  stack: string[];
  current?: boolean;
};

export const roles: Role[] = [
  {
    index: "03",
    period: "March 2024 — present",
    start: "2024",
    end: "now",
    title: "Software Engineer",
    company: "Hubtel Limited",
    location: "Accra, Ghana",
    summary:
      "Builds responsive Vue and Nuxt interfaces for lenders, agencies, financiers and merchant customers across production credit-data and payment platforms.",
    highlights: [
      "Delivers frontend and backend features for the Agency Portal, integrating user workflows with APIs and supporting services.",
      "Works across frontend and backend teams on authentication, payment integrations, access controls, automated testing and Azure DevOps releases.",
      "Work has covered AWS Cognito, S3 and CloudFront, financial-data validation, audit logging, encrypted transmission, ClickHouse analytics, Playwright testing and Datadog monitoring.",
    ],
    stack: ["Vue", "Nuxt", "AWS", "ClickHouse", "Playwright", "Datadog", "Azure DevOps"],
    current: true,
  },
  {
    index: "02",
    period: "April 2023 — October 2023",
    start: "2023",
    end: "2023",
    title: "Software Engineer",
    company: "Zerotech Agency",
    location: "US, remote",
    summary:
      "Developed RESTful APIs and responsive dashboards, and contributed to the microservice and delivery work around them.",
    highlights: [
      "Built REST APIs with Node.js/NestJS and Python/Django, and React/Next.js dashboards with Material UI.",
      "Integrated Twilio and AWS SES for communications, with Redis supporting application workflows.",
      "Contributed to microservice design, PostgreSQL-backed services, and CI/CD with GitHub Actions, Docker, AWS and Terraform.",
    ],
    stack: ["NestJS", "Django", "React", "PostgreSQL", "Redis", "Terraform"],
  },
  {
    index: "01",
    period: "October 2021 — November 2022",
    start: "2021",
    end: "2022",
    title: "Software Engineer",
    company: "University of Cape Coast",
    location: "Cape Coast, Ghana",
    summary:
      "Built internal administration portals during national service, and automated the reporting around them.",
    highlights: [
      "Built administration portals with Laravel, Jetstream, Tailwind CSS and Alpine.js.",
      "Automated reporting and approval workflows, and analysed student issues with Python.",
      "Supported the digitization of student records.",
    ],
    stack: ["Laravel", "Alpine.js", "Tailwind", "Python"],
  },
];

export type Capability = {
  index: string;
  title: string;
  body: string;
  tools: string[];
};

export const capabilities: Capability[] = [
  {
    index: "01",
    title: "Full-stack application development",
    body: "Product surfaces built end to end, from the interface a customer uses to the service answering it.",
    tools: ["TypeScript", "React", "Next.js", "Vue", "Nuxt", "Tailwind"],
  },
  {
    index: "02",
    title: "Backend engineering and API design",
    body: "REST APIs and services shaped so the teams consuming them do not have to guess.",
    tools: ["Node.js", "NestJS", "Django", "FastAPI", "Laravel", "Microservices"],
  },
  {
    index: "03",
    title: "Cloud infrastructure and deployment",
    body: "Pipelines and infrastructure that make a release ordinary rather than an event.",
    tools: ["AWS", "Docker", "Terraform", "GitHub Actions", "Azure DevOps"],
  },
  {
    index: "04",
    title: "AI-powered application development",
    body: "LLM features built with the same care as the rest of the system: scoped, bounded and verifiable.",
    tools: ["OpenAI API", "Claude API", "Prompt engineering", "AI agents", "RAG", "OpenRouter"],
  },
  {
    index: "05",
    title: "Database design and system architecture",
    body: "Data models and system boundaries chosen for the questions the product will actually ask.",
    tools: ["PostgreSQL", "MongoDB", "MariaDB", "Redis", "ClickHouse", "SQL"],
  },
  {
    index: "06",
    title: "Product engineering",
    body: "Understanding the need, shaping the model, and shipping something that keeps its footing as the stakes rise.",
    tools: ["Vitest", "Playwright", "Datadog", "Audit logging", "Access controls"],
  },
];

export const about = {
  heading: "I build software people can depend on.",
  paragraphs: [
    "I like understanding the real problem behind a product, then following it all the way from an idea to something people can use with confidence.",
    "Much of my work sits behind everyday financial decisions—checking credit, making payments, managing loans and keeping operations moving. The technology matters, but what matters more is that people can rely on it when the stakes are real.",
    "I started by improving university operations, moved into agency work, and now build production financial products. Each step has reinforced the same belief: good software should make complicated work feel clear, dependable and human.",
  ],
  principles: [
    "Build the model before the screen.",
    "Make the failure case legible.",
    "Ship something that can be handed over.",
  ],
} as const;

export const education = [
  {
    title: "B.Sc. Information Technology",
    org: "University of Cape Coast",
    period: "2017 — 2021",
  },
  {
    title: "Software Engineering Program",
    org: "Holberton School / ALX",
    period: "2022 — 2023",
  },
] as const;

export const certifications = [
  "AWS Certified Cloud Practitioner",
  "GitHub Foundations",
  "Amalitech AWS re/Start Program",
  "Amalitech Graduate Engineer Program",
] as const;

export const navSections = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "expertise", label: "Expertise" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;
