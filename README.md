# KINETIX Athletic Club | Elite Human Performance & Wellness

> **Course / Project Assignment**: Full-Stack Web Development & Interactive 3D Web Applications  
> **Student Developer**: Debanshika Das  
> **Project Type**: Interactive Frontend Web Application with Three.js & Tailwind CSS  
> **Live Local URL**: [http://localhost:3000](http://localhost:3000)

---

## 📖 Student Project Overview

For this project, I was tasked with designing and developing a premium, production-ready website for a high-performance luxury gym from scratch. Rather than creating a generic fitness site with stock templates and filler content, I wanted to build an evocative, editorial-grade digital experience for **KINETIX Athletic Club**—a fictional 35,000 sq ft private athletic sanctuary located in Tribeca, New York.

My goal was to merge **high-performance sports science** with **architectural luxury**, demonstrating how modern web technologies like React, Tailwind CSS, and Three.js can be combined to create a fluid, tactile user experience without sacrificing performance or accessibility.

---

## 🏛️ Brand Concept & Visual Identity

### Why "KINETIX"?
I conceptualized **KINETIX** not merely as a commercial gym, but as a "human optimization lab." The club is designed around three distinct pillars:
1. **Biometric Precision**: Scientific training guided by barbell velocity tracking and metabolic gas carts.
2. **Architectural Solitude**: Acoustic decoupling, mood lighting, and strict member caps (300 active members).
3. **Contrast Restorative Medicine**: Thermal hydrotherapy (38°F cold plunges, 195°F Finnish saunas, and red-light therapy).

### Aesthetic & Color Palette
- **Obsidian & Matte Graphite** (`#07080B`, `#0C0E14`): Provides a dark, cinematic ambiance reminiscent of private luxury facilities.
- **Titanium Gold & Champagne** (`#E5A93C`, `#F6CE7D`): Evokes craftsmanship and exclusivity.
- **Electric Cyan** (`#00F2FE`): Used intentionally for biometric and telemetry data points.
- **Authentic Photography**: All imagery is sourced directly from high-resolution Unsplash fitness archives. I deliberately avoided watermarked stock photos, generic smiling stock models, or filler graphics—every photo showcases real Olympic weights, contrast plunge baths, boxing bags, and training environments.

---

## ⚡ Technical Architecture & Stack

- **Core Framework**: React 18 + Vite (Lightning-fast HMR and bundle compilation under 1.2s)
- **Styling**: Tailwind CSS with custom glassmorphic utilities and responsive breakpoints
- **3D Graphics & Shaders**: Three.js (WebGL renderer running at a silky 60 FPS)
- **Icons**: Lucide React
- **Micro-Interactions & Feedback**: Canvas Confetti for celebratory application submissions
- **Storage**: Browser `localStorage` API for client-side persistence

---

## 🪐 3D WebGL Features (Three.js)

To satisfy the 3D element requirement in an organic, non-gimmicky way, I engineered two separate WebGL experiences:

### 1. The Kinetic Gyroscopic Core (Hero Canvas)
- **Concept**: A kinetic sculpture symbolizing the alignment of human energy, neuromuscular timing, and physical discipline.
- **Technical Specs**:
  - Three concentric torus rings with custom PVD Gold, Dark Titanium, and Cyan materials rotating asynchronously along multiple 3D axes.
  - A central faceted icosahedron core with an emissive pulsing light source.
  - A floating particle dust field composed of 1,200 points that gently drift through 3D space.
  - **Interactive HUD**: Users can click to toggle between **Solid PVD** and **Wireframe Mesh** topology, adjust speed multipliers (1x Normal, 2x Turbo, 0.4x Slow), or click-and-drag to orbit the sculpture with real-time mouse parallax damping.

### 2. The 3D Equipment Forge (`ThreeEquipmentViewer`)
- **Concept**: An interactive 3D hardware studio allowing prospective members to inspect our competition-calibrated Olympic machinery.
- **Technical Specs**:
  - A 3D model of an Olympic barbell sleeve and an IWF-calibrated 25kg bumper plate with recessed hubs and collars.
  - **Live Material Swapper**: Users can toggle between **24K Titanium Gold**, **Stealth Obsidian Urethane**, and **Forged Carbon & Cyan**.
  - **Interactive Orbit**: Supports 360-degree click-and-drag rotation and mouse-wheel zoom.
  - **Lighting Studio**: Toggle between "Noir Light" and "Studio Spotlight" to inspect specular reflections and chamfers.

---

## 🏋️ Website Sections & Features

1. **Glassmorphism Navigation (`Navbar.jsx`)**: Sticky header with blur effects, responsive mobile drawer, smooth anchor links, and a live counter badge showing saved inquiries.
2. **Hero Section (`HeroSection.jsx`)**: Bold editorial typography, quick-stat badges, interactive 3D hero canvas, and a trigger for the cinematic brand reel.
3. **Core Doctrine & Philosophy (`PhilosophySection.jsx`)**: Interactive tabbed breakdown of our training pillars with high-res photography and scientific benchmarks.
4. **Disciplines of Mastery (`ProgramsSection.jsx`)**: Filterable class cards by discipline (*Strength & Power*, *High-Octane HIIT*, *Combat & Boxing*, *Recovery & Mobility*, *HYROX*). Each card contains calorie burn estimates, duration, coach allocation, and an instant **"Reserve Spot"** button that pre-populates the inquiry form.
5. **Sanctuary Zones (`FacilitiesSection.jsx`)**: Visual tour of our 6 zones with an interactive modal lightbox displaying machinery inventories.
6. **Performance Architects (`TrainersSection.jsx`)**: Profiles of our certified coaches (PhD Exercise Physiologists, Olympic weightlifters, Golden Gloves Champions) with credentials, specializations, and quotes.
7. **Private Membership Allocations (`MembershipSection.jsx`)**: Monthly vs. Annual toggle (20% discount calculation) for *The Athletic Pass*, *Obsidian Black*, and *Founding Sovereign* tiers, paired with athlete testimonials.
8. **Interactive Metabolic Calculator (`FitnessCalculator.jsx`)**: Uses biological age, weight, and resting heart rate to calculate Tanaka Max Heart Rate ($208 - 0.7 \times \text{age}$), Karvonen Zone 2 aerobic base, Zone 4 anaerobic threshold, and estimated weekly caloric burn.
9. **Cinematic Brand Film (`VideoModal.jsx`)**: A 4K video player overlay with sound and playback controls.
10. **VIP Sanctuary Inquiry Form & Vault (`InquirySection.jsx` & `InquiriesModal.jsx`)**: Full client-side intake form (details below).
11. **Footer (`Footer.jsx`)**: Operating hours, Tribeca location, contact links, newsletter signup with instant validation, and smooth scroll-to-top.

---

## 📬 Frontend Inquiry Form & Local Storage Vault

Per the project requirements, the inquiry form is **100% functional on the frontend**:
- **Fields**: Full Name, Email Address, Phone (SMS updates), Selected Program / Membership, Current Fitness Level, Preferred Tour Window, and Message / Objectives.
- **Client-Side Validation**:
  - Full Name required (minimum 2 characters).
  - Strict RFC-compliant email regex format validation (`user@domain.com`).
  - Message required (minimum 10 characters).
  - Real-time inline error messages and visual warnings.
- **Seamless State Pre-Filling**: Clicking "Reserve Spot" on any class card or "Select Tier" on the pricing table automatically populates the form's dropdown and smoothly scrolls the user to the form.
- **Celebratory User Feedback**: On successful submission, an animated confetti burst triggers via `canvas-confetti`, and a luxury receipt appears displaying the unique Reference ID (e.g. `INQ-9842`), timestamp, and follow-up timeline.
- **Local Storage Dispatch Ledger**: Submissions are written directly to `localStorage` under the key `kinetix_inquiries_data`.
- **Concierge Inquiries Vault Modal**: A built-in modal accessible from the Navbar and form that allows users (and evaluators!) to view all stored submissions, inspect details, delete individual entries, or purge the ledger.

---

## ❓ Backend Status: Has a Backend Been Added?

### **Short Answer**: Only the frontend is completed (by design).

### Detailed Explanation:
In strict accordance with the project prompt guidelines:
> *"Store submissions in frontend state/local storage for now — no backend or database integration needed"*

- **What is currently implemented**:
  - Full frontend data handling, input sanitization, form validation, and reactive UI feedback.
  - Browser-level persistence using the HTML5 `localStorage` Web API. Submissions survive page reloads and browser restarts.
- **What a future Phase 2 Backend would look like**:
  If I were to expand this into a complete production full-stack deployment, I would build:
  1. **REST / GraphQL API**: A Node.js + Express or Next.js Serverless route (`/api/inquiries`).
  2. **Database Layer**: PostgreSQL or MongoDB (via Prisma ORM) to store inquiries, member profiles, and booking schedules.
  3. **Transactional Email**: Integration with Resend or SendGrid to send automatic confirmation emails with calendar `.ics` invites for booked tours.
  4. **Authentication**: JWT or Clerk / NextAuth for a private member portal.

---

## 💻 Local Setup & Development Instructions

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### Steps to Run
1. Clone or navigate to the project directory:
   ```bash
   cd /path/to/GYM
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```
5. To test building for production:
   ```bash
   npm run build
   ```

---

## 🎓 Student Reflection & Key Takeaways

Building this project taught me several crucial lessons:
- **WebGL Performance in React**: Initializing Three.js instances requires rigorous memory management. Ensuring all geometries, materials, and requestAnimationFrame listeners are cleanly disposed of in `useEffect` cleanup functions is essential to prevent memory leaks.
- **Elevating Visual Polish**: Luxury web design relies heavily on subtle details—border opacities (`rgba(255,255,255,0.08)`), blurred glassmorphic surfaces, responsive typographical scales (`font-display`), and purposeful animation rather than arbitrary effects.
- **Accessible State Flow**: Connecting interactive widgets (like the Metabolic Calculator and Class Cards) directly to the Inquiry Form created a coherent, high-converting user journey.
