/**
 * Single source of truth for portfolio content.
 * Mirrors the CV at client/public/Asif_Ikbal_PM.pdf · update both together.
 */

export const profile = {
  name: "Asif Ikbal",
  role: "Project Manager",
  discipline: "Strategy & Discovery",
  location: "Dhaka, Bangladesh",
  email: "asifikbalprotik@gmail.com",
  phone: "+880 1878 044854",
  linkedin: "https://www.linkedin.com/in/improtik/",
  github: "https://github.com/asif-ikbal-protik",
  resume: "/Asif_Ikbal_PM.pdf",
  languages: "English · professional proficiency",
  available: "Open to new engagements",
};

export const headline = {
  lead: "I find the problem",
  emphasis: "behind the request",
  tail: "before anyone writes a line of scope.",
};

export const intro =
  "Project Manager with 4+ years running client engagements end to end for web, mobile, SaaS, and AI products, in an agency setting with distributed teams and international clients. I own the work from the first discovery call through scoping, delivery, and follow-on phases.";

export const summary = [
  "The last two years have been spent mostly on product decisions rather than execution alone. I run client interviews and working sessions to find the real problem behind the request, then check it against product data (funnels, retention, cohort behaviour, usage patterns) so recommendations rest on evidence instead of opinion.",
  "Findings go into short recommendation reports covering impact, effort, risk, and sequencing, each one tied back to revenue, retention, adoption, or operating cost. I shape how work is phased, packaged, and priced, present directly to founders and senior stakeholders, and push back when a requested feature will not move the number they care about.",
  "A Computer Science background and working knowledge of software delivery, UX process, analytics, and AI automation keep those recommendations feasible and costed.",
];

export const pullQuote =
  "A feature list is not a decision. Evidence, impact, effort, risk, and sequencing are.";

export const metrics = [
  { value: "4+", label: "Years running client engagements", note: "Web, mobile, SaaS, AI" },
  { value: "70+", label: "Contributors coordinated", note: "Across time zones" },
  { value: "82→97%", label: "Operational accuracy lifted", note: "Workflow redesign" },
  { value: "Days", label: "Concept to tested prototype", note: "Figma Make + Claude" },
];

export const method = [
  {
    step: "01",
    title: "Discover",
    body: "Interviews and working sessions with founders and client teams to map the business model, users, and workflows and to separate the stated request from the underlying problem.",
  },
  {
    step: "02",
    title: "Validate",
    body: "Opportunities checked against product data before scope is recommended. Funnel analysis locates drop-off, retention and cohort views test whether new users stay, usage patterns separate wants from needs.",
  },
  {
    step: "03",
    title: "Recommend",
    body: "A short report covering evidence, expected impact, effort, risk, and sequencing, each item connected to revenue, retention, adoption, or operating cost, with payback modelled before budget is committed.",
  },
  {
    step: "04",
    title: "Shape & price",
    body: "Phasing, packaging, and pricing structured against effort, risk, and client value, then defended through negotiation instead of discounted away.",
  },
  {
    step: "05",
    title: "Deliver",
    body: "Scope and timeline ownership across cross-functional, cross-time-zone teams, from UX handoff through release, on a single shared view of progress.",
  },
  {
    step: "06",
    title: "Extend",
    body: "Validated opportunities converted into scoped change requests and follow-on phases, extending several engagements beyond their original contract value.",
  },
];

export const capabilities = [
  {
    id: "product",
    title: "Product",
    items: [
      "Discovery interviews & workshops",
      "Problem framing",
      "Opportunity assessment",
      "Roadmap phasing",
      "Prioritization",
      "Validation planning",
      "Business cases",
      "Prototyping",
    ],
  },
  {
    id: "analytics",
    title: "Analytics",
    items: [
      "Funnels",
      "Retention",
      "Cohorts",
      "Activation",
      "KPI & SLA reporting",
      "Unit economics",
    ],
  },
  {
    id: "commercial",
    title: "Commercial",
    items: [
      "Pricing & packaging",
      "Proposals",
      "Scope expansion",
      "Change requests",
      "Project margin",
    ],
  },
  {
    id: "delivery",
    title: "Delivery",
    items: [
      "Agile & Scrum",
      "Scope & timeline ownership",
      "Cross-functional teams",
      "Cross-time-zone coordination",
      "UX to development handoff",
      "SOPs & team coaching",
    ],
  },
];

export const toolkit = [
  { group: "Planning", tools: ["ClickUp", "Jira", "Asana", "Trello", "Notion"] },
  { group: "Design", tools: ["Figma", "Figma Make", "Lucidchart"] },
  { group: "Data", tools: ["GA4", "Looker Studio", "Retool", "Excel & Sheets"] },
  { group: "Automation", tools: ["Claude", "n8n"] },
  { group: "Technical", tools: ["GitHub", "Postman", "HTML", "CSS", "JavaScript"] },
];

export const experience = [
  {
    company: "Appalux Global IT",
    title: "Project Manager",
    period: "Apr 2025 to Present",
    location: "Dhaka, Bangladesh",
    current: true,
    summary:
      "Own client engagements end to end, from the first discovery call through scoping, delivery, and follow-on phases, covering both direct clients and clients acquired through the company Upwork agency profile.",
    bullets: [
      "Conduct discovery interviews and working sessions with founders and client teams to map the business model, users, and workflows, and identify the underlying problem behind the stated request.",
      "Validate opportunities against product data before recommending scope, using funnel analysis to locate drop-off points, retention and cohort views to assess whether new users stay, and usage patterns to distinguish requested features from actual user needs.",
      "Produce concise recommendation reports covering evidence, expected impact, effort, risk, and sequencing, giving clients a complete basis for the decision rather than a feature list.",
      "Connect each recommendation to a measurable business outcome across revenue, retention, adoption, or operating cost, and model the expected payback before budget is committed.",
      "Present recommendations directly to founders and senior stakeholders, and challenge assumptions where a requested feature does not serve the stated outcome, proposing lower cost alternatives that reach the same result.",
      "Shape phasing, packaging, and pricing for new and expanded scope, structuring cost against effort, risk, and client value, and defending that structure through client negotiation.",
      "Convert validated opportunities into scoped change requests and follow-on phases, extending several engagements beyond their original contract value.",
      "Build working prototypes in Figma Make and Claude to test concepts within days, reducing the risk of committing budget to unvalidated ideas.",
      "Identify automation opportunities across client and internal workflows and implement them with n8n, eliminating repetitive manual work and improving project margin alongside tighter scope definition.",
      "Build reporting in Looker Studio, Retool, and GA4 to surface adoption, quality, and turnaround trends before they reach the client.",
      "Coordinate cross-functional teams across time zones supporting 70+ contributors, lifting operational accuracy from 82% to 97% through workflow redesign and closer execution tracking.",
      "Develop reusable discovery checklists, prioritization frameworks, and SOPs, and coach team members on applying them, reducing ramp-up time and keeping output consistent across clients.",
    ],
    tags: ["Discovery", "Product data", "Pricing & packaging", "n8n", "Looker Studio"],
  },
  {
    company: "Quantigo AI",
    title: "Associate Delivery Lead",
    period: "Dec 2023 to Apr 2025",
    location: "Dhaka, Bangladesh",
    summary:
      "Managed delivery across multiple concurrent AI product engagements for global clients, aligning client expectations with what engineering, QA, and operations could realistically execute.",
    bullets: [
      "Translated client requirements into scoped, prioritised work, and declined requests that added cost without contributing to the client outcome.",
      "Tracked KPIs, SLA adherence, quality scores, and throughput, and used the trends to recommend process changes ahead of a miss rather than after one.",
      "Diagnosed workflow bottlenecks, quantified the cost of each, and implemented the fixes with the strongest return.",
      "Maintained sprint documentation, delivery reports, and status communication so client and internal teams operated from a single view of progress.",
    ],
    tags: ["Multi-engagement delivery", "KPI & SLA", "Bottleneck analysis"],
  },
  {
    company: "Quantanite",
    title: "Project Associate",
    period: "Aug 2022 to Dec 2023",
    location: "Dhaka, Bangladesh",
    summary:
      "Supported delivery across multiple client projects covering workflow coordination, quality monitoring, and reporting, and tracked SLA compliance to protect timelines.",
    bullets: [
      "Produced operational analysis that management used for staffing, workflow, and process decisions.",
    ],
    tags: ["Workflow coordination", "SLA compliance", "Operational analysis"],
  },
  {
    company: "Bengali AI",
    title: "Data Operations Associate",
    period: "Aug 2021 to Jan 2023",
    location: "Dhaka, Bangladesh",
    summary:
      "Supported AI and ML data operations across computer vision and NLP projects, holding output to project guidelines and quality standards.",
    bullets: [
      "Worked with cross-functional teams on data validation and quality review, and resolved operational and data issues to keep accuracy consistent.",
    ],
    tags: ["Computer vision", "NLP", "Data quality"],
  },
];

export const featuredWork = {
  title: "Appalux Global IT: Company Promo",
  kind: "Motion graphics",
  description:
    "Motion graphics promotional film produced in Adobe After Effects to carry the company's services, culture, and brand identity into pitch and outreach material.",
  href: "https://drive.google.com/file/d/17fKDvPru01mdZlFB6ABH9WJUYAys42A6/view",
  thumb: "/images/appalux-promo-v2.png",
  tags: ["After Effects", "Motion graphics", "Brand identity"],
};

export const engagements = [
  {
    index: "A",
    image: "/images/point-cloud.png",
    imageAlt: "Concept illustration of a segmented point-cloud street for autonomous navigation",
    title: "3D point cloud segmentation",
    sector: "Autonomous navigation",
    description:
      "Annotation and QA programme for autonomous navigation systems, run against complex 3D segmentation guidelines and a hard accuracy floor.",
    tags: ["Computer vision", "3D segmentation", "Quality gates"],
  },
  {
    index: "B",
    image: "/images/human-feedback.png",
    imageAlt: "Concept illustration of a feedback loop connecting glass conversation forms",
    title: "RLHF for chatbot optimization",
    sector: "Conversational AI",
    description:
      "Large-scale reinforcement learning from human feedback programme, coordinating reviewer throughput against response quality targets.",
    tags: ["NLP", "RLHF", "Reviewer throughput"],
  },
  {
    index: "C",
    image: "/images/aerial-inspection.png",
    imageAlt: "Concept illustration of a drone undergoing a scanning inspection",
    title: "Defect detection for aerial vehicles",
    sector: "Safety-critical inspection",
    description:
      "Annotation pipeline for an aerial vehicle defect detection system, where a missed defect is a safety event rather than a metric.",
    tags: ["Computer vision", "QA pipeline", "Safety-critical"],
  },
  {
    index: "D",
    image: "/images/multimodal-sentiment.png",
    imageAlt: "Concept illustration of audio, image, and dialogue inputs converging into classified signals",
    title: "Multimodal sentiment classification",
    sector: "Banking",
    description:
      "Sentiment and intent classification across multimodal customer data for a banking client, scoped around what the model could act on.",
    tags: ["Multimodal AI", "NLP", "Banking"],
  },
];

export const education = {
  degree: "B.Sc. in Computer Science and Engineering",
  school: "Bangladesh University of Business and Technology",
  period: "2018 to 2022",
  location: "Dhaka, Bangladesh",
};

export const certifications = [
  { name: "Project Delivery Manager", issuer: "micro1", year: "2026" },
  { name: "The Complete AI Crash Course · AI Workflows & AI Adoption", issuer: "Product Space", year: "2026" },
  { name: "AI Agent Development · AI Agents & n8n Automation", issuer: "Ostad", year: "2025" },
  { name: "Leveraging Generative AI for Project Management", issuer: "Project Management Institute (PMI)", year: "2024" },
  { name: "Foundations of Project Management, Agile and Scrum", issuer: "Coursera", year: "2024" },
  { name: "Conflict Management", issuer: "Quantigo AI", year: "2024" },
];

export const sections = [
  { id: "index", num: "00", label: "Index" },
  { id: "profile", num: "01", label: "Profile" },
  { id: "method", num: "02", label: "Method" },
  { id: "capabilities", num: "03", label: "Capabilities" },
  { id: "experience", num: "04", label: "Experience" },
  { id: "work", num: "05", label: "Work" },
  { id: "credentials", num: "06", label: "Credentials" },
  { id: "contact", num: "07", label: "Contact" },
];

/* ------------------------------------------------------------------ */
/* Bento grid (About)                                                  */
/* ------------------------------------------------------------------ */

export const bentoItems = [
  { id: 1, eyebrow: "How I work", title: "I run discovery before anyone writes a line of scope", className: "bento-discovery", variant: "discovery" as const },
  { id: 2, eyebrow: "Time zones", title: "Based in Dhaka at GMT+6, overlapping both US and EU working hours", className: "bento-timezone", variant: "globe" as const },
  { id: 3, eyebrow: "The tools behind the work", title: "My toolkit", className: "bento-toolkit", variant: "toolkit" as const },
  { id: 6, eyebrow: "Contact", title: "Have a product decision to work through?", className: "bento-contact", variant: "contact" as const },
  { id: 4, eyebrow: "Product data", title: "Evidence over opinion: funnels, retention, cohorts, unit economics", className: "bento-metrics", variant: "metrics" as const },
  { id: 5, eyebrow: "Current focus", title: "Currently cutting manual work out of client and internal workflows with n8n", className: "bento-current", variant: "current" as const },
];

export const deliveryHighlights = [
  {
    category: "OPERATIONS",
    value: "82 → 97%",
    title: "Operational accuracy",
    description: "Workflow redesign and closer execution tracking improved accuracy across distributed delivery teams.",
    context: "Appalux Global IT · Project Manager",
  },
  {
    category: "COORDINATION",
    value: "70+",
    title: "Contributors supported",
    description: "Cross-functional coordination across time zones, with shared priorities, clear handoffs, and a single view of progress.",
    context: "Appalux Global IT · Delivery operations",
  },
  {
    category: "VALIDATION",
    value: "Days",
    title: "From idea to working prototype",
    description: "Working prototypes built in Figma Make and Claude to test concepts before committing to a full delivery phase.",
    context: "Appalux Global IT · Discovery & prototyping",
  },
];

export const clientStrip = [
  { name: "Appalux Global IT", note: "2025 to present" },
  { name: "Quantigo AI", note: "2023 to 2025" },
  { name: "Quantanite", note: "2022 to 2023" },
  { name: "Bengali AI", note: "2021 to 2023" },
];

// Project ownership supplied by Asif; descriptions reflect the provided images.
export const managedProjects = [
  {
    "name": "Health & Wellness SaaS Platform",
    "category": "Health & wellness",
    "description": "A wellness dashboard bringing heart-rate trends, sleep analysis, weight tracking, and doctor appointment scheduling into one experience. Activity, nutrition, hydration, and goals sit alongside the core health overview.",
    "technologies": [
      "React",
      "Python",
      "REST APIs"
    ],
    "image": "/images/projects/Health & Wellness SaaS Platform _ React + Python + REST APIs.png",
    "role": "Project Manager"
  },
  {
    "name": "AI Agent for Business Operations",
    "category": "AI & business operations",
    "description": "An operations workspace connecting an AI agent with business tools to act on requests. The interface brings together conversations, workflow execution, Google Sheets and ClickUp integrations, task status, and activity monitoring.",
    "technologies": [
      "LLM",
      "APIs",
      "Tool Use"
    ],
    "image": "/images/projects/AI Agent for Business Operations _ LLM + APIs + Tool Use.png",
    "role": "Project Manager"
  },
  {
    "name": "AI Sales Workflow Automation",
    "category": "Sales automation",
    "description": "A connected sales workflow for reading leads, enriching person and company information, generating personalized outreach, and sending email. The visual flow shows how data collection, AI processing, and delivery steps fit together.",
    "technologies": [
      "n8n",
      "Claude",
      "APIs"
    ],
    "image": "/images/projects/AI Sales Workflow Automation _ n8n + Claude + APIs.png",
    "role": "Project Manager"
  },
  {
    "name": "RAG Knowledge Assistant",
    "category": "Knowledge & retrieval",
    "description": "A knowledge assistant that searches connected documents and returns answers with supporting sources. The dashboard includes document ingestion, retrieved passages, conversational search, and connections to PDFs, Confluence, Notion, websites, and support tickets.",
    "technologies": [
      "Python",
      "OpenAI",
      "Vector Search"
    ],
    "image": "/images/projects/RAG Knowledge Assistant _ Python + OpenAI + Vector Search.png",
    "role": "Project Manager"
  },
  {
    "name": "AI-Powered Assistant Platform",
    "category": "AI assistant experience",
    "description": "A mobile-oriented assistant experience with text writing, image generation, and coding tools. Recent conversations, suggested prompts, chat responses, and voice input provide multiple ways to begin and continue a task.",
    "technologies": [
      "OpenAI",
      "React"
    ],
    "image": "/images/projects/AI-Powered Assistant Platform _ OpenAI + React.png",
    "role": "Project Manager"
  },
  {
    "name": "SaaS Backend & API Platform",
    "category": "Platform & infrastructure",
    "description": "A backend management dashboard for API endpoints, authentication, database status, and service integrations. Architecture views, monitoring, and API documentation bring the platform’s operational controls into one workspace.",
    "technologies": [
      "Python FastAPI",
      "PostgreSQL"
    ],
    "image": "/images/projects/SaaS Backend & API Platform _ Python FastAPI + PostgreSQL.png",
    "role": "Project Manager"
  },
  {
    "name": "SaaS Product UX/UI",
    "category": "Responsive product design",
    "description": "A responsive smart-home interface shown across desktop and mobile. Room navigation, lighting controls, security status, camera feeds, and media playback share a consistent component language across screen sizes.",
    "technologies": [
      "Figma",
      "Responsive Design System"
    ],
    "image": "/images/projects/SaaS Product UX_UI _ Figma + Responsive Design System.png",
    "role": "Project Manager"
  }
];
