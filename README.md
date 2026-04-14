# 🚀 Premium Developer Portfolio - Tushar Ahuja

Welcome to the source code of my professional portfolio. This project is a high-end, recruiter-impressive showcase built with **React**, **TypeScript**, and **GSAP**. It’s designed to tell a story through architecture, performance, and immersive UI/UX.

---

## 👨‍💻 About Me

**Tushar Ahuja**  
*Software Engineer specializing in Scalable Full-Stack Systems & High-Performance Applications.*

I am a Software Engineer with a proven track record of building and optimizing large-scale enterprise applications. From leading architecture migrations in government systems to developing national-scale analytics platforms, I focus on performance, robust system design, and creating seamless user experiences.

- **Current Role**: Software Engineer at NetProphets Cyberworks.
- **Expertise**: Angular (v17+), React, RxJS, Node.js, and System Architecture.
- **Philosophy**: "I don’t just write code — I design systems."

---

## 🛠️ Tech Stack & Tools

| Category | Technologies |
| :--- | :--- |
| **Frontend** | React, Angular, TypeScript, RxJS, JavaScript (ES6+) |
| **Animation** | GSAP (ScrollTrigger, Flip, TextPlugin), CSS Transitions |
| **UI/UX** | Vanilla CSS (Modern), Glassmorphism, Responsive Design |
| **Backend** | Node.js, Express.js, REST APIs, JWT Authentication |
| **Database** | PostgreSQL, Redis, Data Modeling |
| **DevOps/Tools** | Vite, Git, CI/CD, Performance Optimization |

---

## ✨ Key Portfolio Features

- **GSAP Powered Interactions**: 
  - Staggered scroll entrance animations for all sections.
  - 3D Tilt effects on project cards using real-time mouse tracking.
  - Infinite floating micro-animations for visual depth.
  - Magnetic button interactions for an interactive feel.
- **Advanced Architecture**:
  - Modular component structure.
  - Centralized project data management (Constants pattern).
  - High-performance asset loading and 60fps animations.
- **Premium Showcase**: Featured projects with custom AI-generated mockups focusing on enterprise-level SaaS aesthetics.

---

## 🚀 Use This Template for Your Portfolio

If you want to use this project as a base for your own developer portfolio, follow these steps:

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone <your-repo-link>
cd portfolio-v2
npm install
```

### 2. Customization Guide

This portfolio is designed to be easily configurable without digging deep into the layout logic.

#### Update Personal Info & Projects
Navigate to `constants/index.ts` and update the exported constants:
- **`ENTERPRISE_PROJECTS`**: Add your projects, taglines, and descriptions. Set `isFeatured: true` for those you want in the top section.
- **`EXPERIENCES`**: List your work history and key highlights.
- **`SKILL_CATEGORIES`**: Update the skills grid.

#### Update Images
Replace the images in `public/images/projects/` with your own project screenshots or mockups. Ensure the slug in `constants/index.ts` matches the mapping in `Projects.tsx`.

#### Style Customization
- **Theme Colors**: Update the CSS variables in `src/index.css` to change the primary/secondary color schemes.
- **Components**: Each section has its own `.css` file for granular control.

### 3. Running Locally

```bash
npm run dev
```

### 4. Build for Production

```bash
npm run build
```

---

## 📬 Contact & Connect

- **LinkedIn**: [Your LinkedIn Link]
- **Email**: [Your Email]
- **Portfolio**: [Live Demo Link]

---

*Built with ❤️ and GSAP by Tushar Ahuja.*

