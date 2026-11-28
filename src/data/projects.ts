export interface Project {
  cls: string;
  period: string;
  name: string;
  summary: string;
  bullets: string[];
  chips: string[];
  panel: {
    stat?: { value: string; label: string };
    bars?: { label: string; to: number; dec: number; fill: 'f-b' | 'f-a' }[];
    duo?: { value: string; label: string }[];
    mini?: [string, string][];
    spec: [string, string][];
  };
}

export const projects: Project[] = [
  {
    "cls": "c2",
    "period": "Jun 2026 to present",
    "name": "MagicMarks",
    "summary": "A B2C learning marketplace with syllabus-aligned video activities and an AI Teacher companion.",
    "bullets": [
      "Built the frontend across 18 feature modules with Angular 21, standalone components, Signals and Event Replay hydration.",
      "Built an interactive AI Teacher chat with context-aware replies, LaTeX formula rendering and a typewriter directive that runs outside Angular’s zone.",
      "Added stale-while-revalidate HTTP caching with in-flight request coalescing to reuse responses and avoid duplicate calls.",
      "Integrated Razorpay subscription checkout, dynamic SDK preloading and cookie-based Moodle authentication."
    ],
    "chips": [
      "Angular 21",
      "TypeScript",
      "RxJS",
      "PrimeNG",
      "Signals",
      "SSR",
      "Razorpay"
    ],
    "panel": {
      "mini": [
        [
          "Payments",
          "Razorpay checkout"
        ],
        [
          "Sign-in",
          "Moodle-based authentication"
        ],
        [
          "Data",
          "Stale-while-revalidate caching"
        ],
        [
          "Learning",
          "AI Teacher interface"
        ]
      ],
      "spec": [
        [
          "Role",
          "Sole frontend developer"
        ],
        [
          "Domain",
          "EdTech, B2C learning marketplace"
        ]
      ],
      "stat": {
        "value": "18",
        "label": "feature modules built on Angular 21"
      }
    }
  },
  {
    "cls": "c1",
    "period": "Apr 2024 to Mar 2026",
    "name": "GovIntra",
    "summary": "A secure intranet for ministerial operations, departmental coordination, task management and executive scheduling.",
    "bullets": [
      "Contributed to the Angular 13 to 20 modernisation of major modules and moved the build from Webpack to esbuild.",
      "Cut startup from 90 to 30 seconds by parallelising API calls with RxJS forkJoin, lazy-loading routes and deferring non-critical data.",
      "Reduced the main JavaScript bundle from 2.15 MB to 94.5 KB through build optimisation, upgrade work and a Moment.js to Day.js swap.",
      "Fixed memory leaks across 27+ components with takeUntil-based unsubscription and added timezone-aware scheduling."
    ],
    "chips": [
      "Angular 13 to 20",
      "TypeScript",
      "RxJS",
      "esbuild",
      "Day.js",
      "Bootstrap"
    ],
    "panel": {
      "spec": [
        [
          "Role",
          "Frontend developer"
        ],
        [
          "Domain",
          "National government intranet platform"
        ]
      ],
      "bars": [
        {
          "label": "Main bundle before",
          "to": 2150.0,
          "dec": 0,
          "fill": "f-b"
        },
        {
          "label": "Main bundle after",
          "to": 94.5,
          "dec": 1,
          "fill": "f-a"
        }
      ],
      "duo": [
        {
          "value": "95.6%",
          "label": "smaller main bundle"
        },
        {
          "value": "67%",
          "label": "faster startup, 90 to 30 seconds"
        }
      ]
    }
  },
  {
    "cls": "c3",
    "period": "Apr 2025 to Apr 2026",
    "name": "Central Communication Layer",
    "summary": "A gateway that sends citizens updates on government schemes through WhatsApp Business API, RCS, SMS and IVRS.",
    "bullets": [
      "Built campaign-dispatch workflows for Excel and JSON beneficiary ingestion, debounced search and dynamic channel-priority matrices.",
      "Kept the UI responsive when telecom gateways stall, using an RxJS race with a 20-second timeout.",
      "Built Chart.js dashboards that render survey responses as bar and pie charts.",
      "Added client-side AES-256 encryption with CryptoJS and an interceptor that checks cached roles against verified JWT claims."
    ],
    "chips": [
      "Angular 16",
      "TypeScript",
      "RxJS",
      "Chart.js",
      "Bootstrap 5",
      "GitLab"
    ],
    "panel": {
      "mini": [
        [
          "Channels",
          "WhatsApp Business API, RCS, SMS, IVRS"
        ],
        [
          "Resilience",
          "RxJS race with a 20 s timeout"
        ],
        [
          "Access",
          "JWT role-based interceptor"
        ],
        [
          "Reports",
          "Chart.js bar and pie dashboards"
        ]
      ],
      "spec": [
        [
          "Role",
          "Primary frontend developer"
        ],
        [
          "Domain",
          "Government citizen communication, National Informatics Centre"
        ]
      ],
      "stat": {
        "value": "AES-256",
        "label": "client-side encryption of application data"
      }
    }
  },
  {
    "cls": "c4",
    "period": "Apr 2024 to Apr 2026",
    "name": "Epilepsy Care Platforms",
    "summary": "Decision-support and telemedicine portals that connect rural clinicians with remote neurologists.",
    "bullets": [
      "Built responsive patient dashboards that combine adult and paediatric drug-titration regimens with CT, MRI and EEG image galleries.",
      "Generated prescriptions and clinical summaries in the browser with jsPDF, removing server round trips for documents.",
      "Moved patient registries to server-side pagination to avoid large in-memory datasets and browser memory spikes.",
      "Set up English and French runtime localisation with ngx-translate and deployed frontend assets to AWS S3."
    ],
    "chips": [
      "Angular 14",
      "TypeScript",
      "RxJS",
      "Angular Material",
      "ngx-translate",
      "jsPDF",
      "AWS S3"
    ],
    "panel": {
      "mini": [
        [
          "Reports",
          "PDF export with jsPDF"
        ],
        [
          "Tables",
          "Server-side pagination"
        ],
        [
          "Patients",
          "Adult and paediatric regimens"
        ]
      ],
      "spec": [
        [
          "Role",
          "Frontend developer"
        ],
        [
          "Domain",
          "Healthcare, clinical decision support (ETA and EMA)"
        ]
      ],
      "stat": {
        "value": "EN + FR",
        "label": "runtime localisation with ngx-translate"
      }
    }
  },
  {
    "cls": "c5",
    "period": "Dec 2023 to Aug 2024",
    "name": "B-Tracker",
    "summary": "An enterprise billing and financial contract tracker for staffing work orders, Monthly Progress Reports and financial reconciliation.",
    "bullets": [
      "Engineered three-tier Reactive Forms (Contract, Level, Resource) with consultant-splitting logic for mid-contract replacements without overlapping billable periods.",
      "Built a Monthly Progress Report calculation engine for prorated consultant charges using actual calendar days and unpaid-leave adjustments.",
      "Developed invoice-reconciliation ledgers for multi-tranche payments, 2% TDS on GST, penalty disallowances and live shortfall balances.",
      "Embedded Apache Superset analytics through a two-stage guest-token authentication flow with lazy iframe rendering."
    ],
    "chips": [
      "Angular 17",
      "TypeScript",
      "RxJS",
      "PrimeNG",
      "Highcharts",
      "Apache Superset"
    ],
    "panel": {
      "mini": [
        [
          "Forms",
          "Three-tier Reactive Forms"
        ],
        [
          "Billing",
          "MPR engine"
        ],
        [
          "Finance",
          "Reconciliation ledgers"
        ],
        [
          "Analytics",
          "Superset with guest tokens"
        ]
      ],
      "spec": [
        [
          "Role",
          "Frontend developer"
        ],
        [
          "Domain",
          "Enterprise ERP, staffing contracts and finance"
        ]
      ],
      "stat": {
        "value": "3",
        "label": "form tiers: contract, level and resource"
      }
    }
  },
  {
    "cls": "c6",
    "period": "Nov 2023 to Nov 2024",
    "name": "Digicel Pacific",
    "summary": "A self-care portal and mobile WebView that serves subscribers across Pacific markets.",
    "bullets": [
      "Built and packaged reusable Angular libraries with ng-packagr on Angular 16, and migrated core modules to Angular 18 standalone components.",
      "Built a shared OTP verification component with a 60-second countdown, reused across balance-transfer and account-settings flows.",
      "Added Worry-Off spend protection with a dual-tier OTP challenge for linked accounts.",
      "Delivered support-ticket workflows with binary file uploads, reCAPTCHA v2 and timezone-aware status timelines."
    ],
    "chips": [
      "Angular 16 and 18",
      "TypeScript",
      "RxJS",
      "PrimeNG",
      "PrimeFlex",
      "ng-packagr"
    ],
    "panel": {
      "mini": [
        [
          "Library",
          "Shared components via ng-packagr"
        ],
        [
          "Sign-in",
          "Reusable OTP component"
        ],
        [
          "Features",
          "Worry-Off, support tickets"
        ],
        [
          "Upgrade",
          "Angular 16 to 18"
        ]
      ],
      "spec": [
        [
          "Role",
          "Frontend developer"
        ],
        [
          "Domain",
          "Telecom, customer self-care portal and mobile WebView"
        ]
      ],
      "stat": {
        "value": "16 to 18",
        "label": "core modules moved to Angular 18 standalone components"
      }
    }
  }
];
