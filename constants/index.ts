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
  title: string;
  desc: string;
}

export interface TechIcon {
  name: string;
  emoji: string;
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
    title: "GovIntranet v2.0",
    desc: "Enterprise intranet platform developed for Government of India (MeitY/NIC), providing a unified digital workspace with meeting lifecycle management, task tracking, document systems, role-based dashboards, and secure SSO authentication for thousands of employees.",
  },
  {
    title: "GovIntranet Backend",
    desc: "Scalable Node.js backend built on Directus CMS powering real-time meeting workflows, correspondence tracking, document processing, and multi-channel notifications across ministries.",
  },
  {
    title: "CCL (Centralized Communication Layer)",
    desc: "Enterprise communication platform enabling multi-channel messaging (SMS, WhatsApp, RCS, Voice) with template workflows, vendor onboarding, RBAC, and analytics dashboards.",
  },
  {
    title: "Billing Tracker",
    desc: "Financial management system handling work orders, invoices, bank guarantees, and MPR tracking with integrated business intelligence dashboards using Apache Superset and Highcharts.",
  },
  {
    title: "Digicel SelfCare",
    desc: "Production-grade telecom customer portal enabling real-time account management, billing, plan tracking, and secure transactions across multiple international regions.",
  },
  {
    title: "e-Taal v2.0",
    desc: "National-scale analytics platform aggregating and visualizing millions of digital transactions across ministries with interactive dashboards, comparative reports, and multi-format exports.",
  },
  {
    title: "EMA (Epilepsy Management Aid)",
    desc: "Healthcare platform enabling field doctors to record structured epilepsy diagnoses and collaborate with specialists through a role-based system with multilingual support.",
  },
  {
    title: "ETA (Epilepsy Treatment Algorithm)",
    desc: "Clinical decision support system providing algorithm-based drug recommendations, patient tracking, and treatment analytics across multiple healthcare roles.",
  },
  {
    title: "Unova Mobility",
    desc: "Workforce mobility platform connecting Indian healthcare professionals with international opportunities through an interactive, media-rich user experience.",
  },
  {
    title: "Dhoom Dhaam",
    desc: "Luxury destination wedding platform built with React, featuring immersive UI, interactive planning flows, and high-end animations for an engaging user experience.",
  },
];


export const TECH_STACK: TechIcon[] = [
  { name: "Angular", emoji: "🅰️" },
  { name: "React", emoji: "⚛️" },
  { name: "TypeScript", emoji: "📘" },
  { name: "JavaScript", emoji: "🟨" },
  { name: "RxJS", emoji: "🟣" },
  { name: "Node.js", emoji: "🟢" },
  { name: "Express.js", emoji: "🚀" },
  { name: "PostgreSQL", emoji: "🐘" },
  { name: "REST APIs", emoji: "🔗" },
  { name: "JWT Auth", emoji: "🔐" },
  { name: "SSR (Angular)", emoji: "🌐" },
  { name: "Highcharts", emoji: "📊" },
  { name: "Chart.js", emoji: "📈" },
  { name: "Firebase", emoji: "🔥" },
  { name: "Docker", emoji: "🐳" },
  { name: "CI/CD (Jenkins)", emoji: "⚙️" },
  { name: "GSAP", emoji: "✨" },
];
