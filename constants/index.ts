export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface EnterpriseProject {
  slug: string;
  title: string;
  tagline: string;
  desc: string;
  overview: string;
  role: string;
  features: string[];
  stack: string[];
  impact: string;
  confidential?: boolean;
  isFeatured?: boolean;
}

import { Link, ShieldCheck, Sparkles, ChartCandlestick, type LucideIcon } from "lucide-react";


export interface TechIcon {
  name: string;
  img: string;
  isImg?: boolean;
  icon?: LucideIcon;
}

export interface AboutCard {
  icon: string;
  title: string;
  description: string;
}

export const ABOUT_CARDS: AboutCard[] = [
  {
    icon: "🧠",
    title: "Engineering Mindset",
    description: "I don’t just write code — I design systems. Every decision is intentional, focused on scalability, maintainability, and long-term performance."
  },
  {
    icon: "🏢",
    title: "Enterprise Experience",
    description: "Proven track record of building and optimizing large-scale applications capable of handling massive traffic dynamically.",
  },
  {
    icon: "⚡",
    title: "Full-Stack Thinking",
    description: "From seamless frontend integrations to robust database schemas, I stitch the entire stack together flawlessly.",
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend",
    skills: ["Angular (v17+)", "React", "RxJS", "TypeScript", "JavaScript"],
  },
  {
    title: "UI/UX & Animation",
    skills: ["GSAP", "Framer Motion", "AOS", "Micro-interactions"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT Auth"],
  },
  {
    title: "Database",
    skills: ["PostgreSQL", "Data Modeling", "Query Optimization"],
  },
  {
    title: "Core",
    skills: ["System Design", "Performance Optimization", "Scalable Architecture"],
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: "NetProphets Cyberworks",
    role: "Software Engineer",
    period: "2023 — Present",
    description:
      "Developed and optimized large-scale enterprise frontend applications, contributing to architectural decisions and improving performance across multiple government platforms.",
    highlights: [
      "Optimized frontend performance and API consumption, reducing load time by 80%.",
      "Led migration of legacy Angular applications (v13) to modern Angular (v17+ / v20) with a scalable standalone architecture.",
      "Designed modular frontend architecture with lazy loading, improving maintainability and scalability.",
      "Built complex dashboards, RBAC systems, and enterprise-grade UI used by government officials across ministries."
    ],
  },
];

export const ENTERPRISE_PROJECTS: EnterpriseProject[] = [
  {
    slug: "govintranet",
    title: "GovIntranet",
    tagline: "Centralized Digital Workspace for Government Ministries",
    desc: "Enterprise intranet platform developed for Ministry of Electronics and Information Technology (MeitY).",
    overview:
      "A large-scale government intranet platform serving multiple ministries, enabling secure collaboration, task management, and administrative workflows in a unified system.",
    role:
      "Core frontend contributor and module owner, leading architecture decisions during migration from Angular v13 to v20. Owned the Calendar and User Management modules and contributed to critical backend APIs.",
    features: [
      "End-to-end Meeting & Calendar Management module (owned and developed)",
      "User Management system with role-based access for ministry hierarchies",
      "Migration to modern Angular standalone architecture (v13 → v20)",
      "Secure workflows used across 13+ ministries",
    ],
    stack: ["Angular 20", "RxJS", "Node.js", "Directus", "PostgreSQL"],
    impact:
      "Adopted across 13 ministries, streamlining internal workflows and reducing manual administrative overhead.",
    confidential: true,
    isFeatured: true,
  },

  {
    slug: "etaal",
    title: "e-Taal",
    tagline: "National Digital Transaction Analytics Platform",
    desc: "Analytics platform visualizing digital transactions across ministries.",
    overview:
      "A national-level analytics system under the e-Governance initiative, providing insights into digital service adoption across central and state governments.",
    role:
      "Frontend developer responsible for upgrading the application from Angular v15 to v20 and contributing to architectural improvements.",
    features: [
      "Migration to modern Angular architecture (v15 → v20)",
      "Interactive dashboards with large-scale transaction data",
      "Comparative reporting across ministries and states",
      "Optimized rendering for high-volume datasets",
    ],
    stack: ["Angular", "Highcharts", "RxJS", "REST APIs", "Bootstrap"],
    impact:
      "Enabled stakeholders to monitor and analyze large-scale government transaction data efficiently.",
    confidential: true,
    isFeatured: true,
  },

  {
    slug: "digicel-selfcare",
    title: "Digicel SelfCare",
    tagline: "International Telecom Customer Portal",
    desc: "Telecom self-service platform for account and plan management.",
    overview:
      "A multi-region telecom portal allowing users to manage accounts, track usage, and handle services across different countries.",
    role:
      "Frontend-focused developer responsible for building core user-facing features and optimizing UI performance.",
    features: [
      "Real-time usage tracking and account management UI",
      "Responsive dashboards for telecom services",
      "Multi-region UI handling and configurations",
      "Optimized frontend performance for high traffic",
    ],
    stack: ["Angular", "RxJS", "REST APIs", "Bootstrap"],
    impact:
      "Improved user experience for telecom customers across multiple regions.",
  },

  {
    slug: "ccl-platform",
    title: "CCL (Centralized Communication Layer)",
    tagline: "Enterprise Multi-Channel Communication Platform",
    desc: "Platform enabling SMS, WhatsApp, RCS, and Voice communication workflows.",
    overview:
      "A centralized communication system designed to manage enterprise messaging across multiple channels.",
    role:
      "Project owner responsible for feature development, mentoring junior developers, code reviews, and coordinating deployments with DevOps.",
    features: [
      "Multi-channel messaging workflows (SMS, WhatsApp, RCS, Voice)",
      "Vendor onboarding and template management system",
      "Role-based access control and admin dashboards",
      "End-to-end project ownership and team mentoring",
    ],
    stack: ["Angular", "RxJS", "Node.js", "Redis", "BullMQ"],
    impact:
      "Improved communication efficiency and reduced operational overhead.",
  },

  {
    slug: "billing-tracker",
    title: "Billing Tracker",
    tagline: "Enterprise Financial & Work Order Management System",
    desc: "Platform for managing work orders, invoices, and financial tracking.",
    overview:
      "A finance-focused enterprise system used to manage work orders, invoices, bank guarantees, and generate analytical reports.",
    role:
      "Frontend developer responsible for building financial dashboards, integrating BI tools, and handling complex data visualization.",
    features: [
      "Work order lifecycle management with approvals and tracking",
      "Invoice and bank guarantee management system",
      "Embedded analytics dashboards using Apache Superset",
      "Data visualization using Highcharts and Chart.js",
    ],
    stack: ["Angular", "PrimeNG", "Highcharts", "Superset", "RxJS"],
    impact:
      "Improved financial tracking accuracy and provided real-time business insights.",
  },

  {
    slug: "ema",
    title: "EMA (Epilepsy Management Aid)",
    tagline: "Healthcare Diagnosis & Collaboration Platform",
    desc: "System enabling doctors to record diagnoses and collaborate with specialists.",
    overview:
      "A healthcare platform designed to digitize epilepsy diagnosis workflows between field doctors and specialists.",
    role:
      "Frontend developer responsible for building role-based dashboards, patient workflows, and multilingual UI.",
    features: [
      "Role-based access (Admin, Doctor, Specialist)",
      "Structured patient diagnosis workflow",
      "Doctor-specialist communication system",
      "Multilingual support using ngx-translate",
    ],
    stack: ["Angular", "RxJS", "Bootstrap", "ngx-translate"],
    impact:
      "Improved collaboration between field doctors and specialists for better diagnosis outcomes.",
  },

  {
    slug: "eta",
    title: "ETA (Epilepsy Treatment Algorithm)",
    tagline: "Clinical Decision Support System",
    desc: "System providing algorithm-based treatment recommendations.",
    overview:
      "A clinical platform that evaluates patient data and provides treatment recommendations with multi-role dashboards.",
    role:
      "Frontend developer responsible for implementing treatment workflows, dashboards, and report generation.",
    features: [
      "Algorithm-based drug recommendation system",
      "Role-based dashboards and analytics",
      "PDF report generation for treatment summaries",
      "Multilingual UI with dynamic translations",
    ],
    stack: ["Angular", "Angular Material", "RxJS", "jsPDF"],
    impact:
      "Enabled structured and data-driven treatment decisions in clinical workflows.",
  },

  {
    slug: "dhoom-dhaam",
    title: "Dhoom Dhaam",
    tagline: "Interactive Wedding Planning Platform",
    desc: "Modern wedding planning platform with immersive UI and animations.",
    overview:
      "A client-facing platform designed to provide an engaging and visually rich experience for planning destination weddings.",
    role:
      "Frontend developer responsible for interactive UI, animations, and form workflows using Formik.",
    features: [
      "Interactive planning flows and dynamic UI",
      "Form handling and validation using Formik",
      "Responsive design with animation support",
      "Production deployment and client collaboration",
    ],
    stack: ["React", "Formik", "TypeScript"],
    impact:
      "Delivered an engaging user experience with modern UI interactions.",
    isFeatured: true,
  },
];

export const TECH_STACK: TechIcon[] = [
  { name: "Angular", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg", isImg: true },
  { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", isImg: true },
  { name: "TypeScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", isImg: true },
  { name: "JavaScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", isImg: true },
  { name: "RxJS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rxjs/rxjs-original.svg", isImg: true },
  { name: "Node.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", isImg: true },
  { name: "Express.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg", isImg: true },
  { name: "PostgreSQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", isImg: true },
  { name: "REST APIs", img: "", isImg: false, icon: Link },
  { name: "JWT Auth", img: "", isImg: false, icon: ShieldCheck },
  { name: "SSR (Angular)", img: "", isImg: false, icon: Sparkles },
  { name: "Highcharts", img: "", isImg: false, icon: ChartCandlestick },
  { name: "Chart.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/chartjs/chartjs-original.svg", isImg: true },
  { name: "Firebase", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg", isImg: true },
  { name: "Docker", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", isImg: true },
  { name: "CI/CD (Jenkins)", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg", isImg: true },
  { name: "GSAP", img: "", isImg: false, icon: Sparkles },
];

