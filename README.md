# KINETIX Athletic Club

Welcome to the **KINETIX Athletic Club** project repository! I built this as a comprehensive, full-stack web development project. My goal was to design and develop a premium, visually stunning gym website from scratch, complete with immersive 3D elements and a robust backend to handle member inquiries.

## 🚀 Project Overview

KINETIX isn't just a standard landing page. It's built to provide an elite digital experience that mirrors the luxury of the physical fitness facility. I focused heavily on the visual impact and the user experience by integrating modern web technologies.

### Key Features
- **Immersive 3D Experience:** I integrated `Three.js` (via `@react-three/fiber` and `@react-three/drei`) to create interactive 3D hero sections and equipment viewers that elevate the brand without feeling gimmicky.
- **Premium Aesthetics:** Styled entirely with `Tailwind CSS`, featuring a dark, sleek, and cohesive design language. I used high-quality, authentic fitness imagery to maintain a professional look.
- **Interactive UI:** Smooth scrolling, animated components (using `framer-motion`), and dynamic sections for Facilities, Programs, Memberships, and a BMI/Fitness Calculator.
- **Functional Inquiry Form:** A working frontend form that prospective members can use to book a tour or request information (stores data locally).

## 🛠 Tech Stack

**Frontend:**
- React (Vite)
- Tailwind CSS
- Three.js / React Three Fiber / Drei
- Framer Motion
- React Icons


**Deployment & Tooling:**
- Configured for deployment on Vercel (`vercel.json`) and Netlify (`netlify.toml`).
- GitHub Actions workflow included for automated deployments.

## 💻 Getting Started

I've set up the project so it's very easy to run locally.

### Prerequisites
- Node.js
- npm or yarn

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd GYM
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the application:**
   ```bash
   npm run dev
   ```
   
   - The frontend will be available at: `http://localhost:3000` (or the port specified by Vite)

## 📂 Project Structure Highlights

- `/src`: Contains the React frontend (Components, App routing, Three.js canvases).
  - `/src/utils/api.js`: The API client for handling data storage in localStorage.

## 🎓 Reflection

Building this project taught me a lot about seamlessly bridging cutting-edge frontend libraries like Three.js with robust React architectures. Building the immersive 3D experience was incredibly rewarding. I'm excited about how it turned out!
