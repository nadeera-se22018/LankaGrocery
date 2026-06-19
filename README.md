# 🛒 LankaGrocery - Premium MERN Stack E-Commerce Platform

A comprehensive, modern online grocery shopping web application tailored for the Sri Lankan market. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js), this platform delivers an app-like, premium shopping experience. It features a highly responsive mobile-first UI, secure payment gateways, AI-assisted customer support, and a highly scalable serverless architecture.

## ✨ Key Features

* **Mobile-First App Experience:** Custom bottom navigation bar for mobile devices, glassmorphism UI elements, premium dark footer, and smooth page transitions.
* **Dual Authentication System:** Secure email/password login using JWT and seamless third-party login via **Google OAuth 2.0**.
* **Localized & International Payments:** Integrated with **PayPal** for card/international transactions and **LankaQR** for easy local mobile payments.
* **Smart Customer Support:** Interactive AI-support Chatbot featuring pulse animations and hover tooltips for instant user assistance.
* **Optimized Media & State:** Product image handling via Cloudinary API and lightweight frontend state management using Zustand.
* **Unified Serverless Deployment:** Architected for zero-config scaling using Vercel Serverless Functions, running both the React frontend and Node.js backend on a single domain without CORS overhead.

## 🚀 Tech Stack

* **Frontend:** React.js (Vite), Tailwind CSS, Zustand, React Router, React-Hot-Toast
* **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT
* **Integrations:** Google OAuth (@react-oauth/google), PayPal API, Cloudinary, LankaQR
* **Deployment:** Vercel (Serverless Functions via `@vercel/node` and `@vercel/static-build`)

## 📁 Project Structure

The project follows a decoupled architecture, structured perfectly for a unified Vercel deployment:

```text
lankagrocery/
├── backend/               # Express.js server, API routes, Controllers, Models
│   └── server.js          # Main entry point (exported for Vercel Serverless)
├── frontend/              # React/Vite application
│   ├── src/
│   │   ├── components/    # Reusable UI (Chatbot, BottomNav, Footer, etc.)
│   │   ├── pages/         # Application screens
│   │   └── store/         # Zustand state management
│   └── package.json       
├── vercel.json            # Vercel configuration for routing and serverless builds
└── package.json           # Root package.json
