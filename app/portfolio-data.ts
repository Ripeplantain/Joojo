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
    stack: ["Vue", "Nuxt", "REST APIs", "CSV pipelines"],
    ratio: "16 / 10",
    plate: "Lenders Portal — borrower search and credit report view",
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
      "Delivered both frontend and backend features for the Agency Portal, connecting agency workflows to APIs and supporting services, and worked across teams on authentication, access controls, automated testing and Azure DevOps releases.",
    outcome:
      "Complex agency operations read as one coherent backoffice rather than a set of disconnected screens.",
    stack: ["Vue", "Nuxt", "REST APIs", "Access controls", "Azure DevOps"],
    ratio: "16 / 10",
    plate: "Agency Backoffice — operations queue",
  },
  {
    id: "paysmallsmall",
    index: "03",
    name: "PaySmallSmall Backoffice",
    context: "Hubtel · Digital payments and overdrafts",
    kind: "production",
    problem:
      "PaySmallSmall is a digital payment and overdraft product for Albrim Microfinance. Financiers and Hubtel’s internal operations teams both need to support it, and they need different things from it.",
    contribution:
      "Built the backoffice applications for both groups, with portal interfaces integrated into the product’s supporting services.",
    outcome:
      "Financiers and operations teams each got a focused surface for the payment and overdraft workflows they are accountable for.",
    stack: ["Vue", "Nuxt", "Payment integrations", "Internal tooling"],
    ratio: "16 / 10",
    plate: "PaySmallSmall — financier backoffice",
  },
  {
    id: "merchant-invoicing",
    index: "04",
    name: "Merchant Invoicing Platform",
    context: "Hubtel · Merchant payments",
    kind: "production",
    problem:
      "A merchant’s customer needs to find their invoice, pay it, and get a receipt — across tenant subdomains, without the payment or the session being the weak point.",
    contribution:
      "Built the invoice listing, detail, payment-status and receipt experiences in Nuxt 3 and Vue 3, with Google and Microsoft OAuth, secure sessions across tenant subdomains, authentication and bot-protection checks, and card payments verified by OTP and 3DS through Hubtel Unified Checkout.",
    outcome:
      "Invoice discovery, payment and receipt became a single secure journey for merchant customers.",
    stack: ["Nuxt 3", "Vue 3", "OAuth", "OTP / 3DS", "Unified Checkout"],
    ratio: "16 / 10",
    plate: "Merchant Invoicing — checkout and receipt",
  },
  {
    id: "starline-hr",
    index: "05",
    name: "Starline HR",
    context: "Startup · Applicant tracking",
    kind: "personal",
    problem:
      "Hiring scatters across email threads, spreadsheets and private notes. Scheduling drags on for days, and nobody on the panel can see where a candidate actually stands.",
    contribution:
      "I work across most of it, but the part that is mine is where the hiring actually happens: booking interviews and keeping them in step with everyone's calendar, the video-call links, the reminders that chase a reply, candidate shortlists with quick résumé previews, the score that ranks applicants against a role, and the permissions that decide who on a hiring team sees what. I also set up how the product gets shipped, and wrote the working agreement the team's AI coding agents follow.",
    outcome:
      "A hiring team works one shared pipeline instead of reassembling it from inboxes, and can see where every candidate stands without having to ask.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Docker", "CI/CD"],
    ratio: "16 / 10",
    plate: "Starline HR — candidate pipeline",
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
    title: "Front-End Engineer",
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
  heading: "Curious about the whole system, not just the screen.",
  paragraphs: [
    "I work where product thinking meets infrastructure: understanding the need, shaping the model, and shipping something that can keep its footing when the stakes get higher.",
    "Most of what I build carries money or the data people are judged by. Credit bureau submissions, lending portals, overdraft operations, card payments verified by OTP and 3DS. That work has a particular discipline to it — validation, audit logging, encrypted transmission and access control are not features you add later.",
    "My path moved from university operations to agency platforms and now enterprise financial products. Each step made the same thing clearer: good software earns trust through its details.",
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
