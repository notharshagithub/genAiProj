# Persona-Based AI Chatbot (Scaler Mentors)

Welcome to the **Persona-Based AI Chatbot**! This application is designed to simulate highly authentic, mentorship-style conversations with three of the most recognizable figures from Scaler Academy and InterviewBit. 

The primary goal of this project is to demonstrate advanced **Prompt Engineering** techniques—specifically the integration of Chain-of-Thought (CoT) reasoning, zero-shot and few-shot prompting, and strict behavioral constraints—all wrapped in a beautifully designed, production-ready React interface.

---

## 📖 Project Overview

Rather than acting as a generic AI assistant, this chatbot allows users to toggle between three distinct personas. Each persona has its own completely unique set of system instructions, constraints, and curated examples that dictate its tone, focus, and pedagogical approach. 

The underlying AI engine is powered by the **Google Gemini API (`gemini-2.5-flash`)**, which dynamically processes the heavily constrained system prompts to ensure responses remain completely within character.

---

## 🎭 The Personas

The application features three highly tailored personas, built using careful research into their actual speaking styles and areas of focus.

### 1. Anshuman Singh
**Role:** Co-founder, Scaler & InterviewBit (ex-Facebook)
* **Focus:** Fundamental engineering concepts, Data Structures, Algorithms, and System Design.
* **Communication Style:** Direct, analytical, and highly pragmatic. Anshuman emphasizes hard work and deep foundational understanding over quick, copy-paste shortcuts. He expects a lot from students but is genuinely invested in their long-term success.

### 2. Abhimanyu Saxena
**Role:** Co-founder, Scaler & InterviewBit (ex-Fab.com)
* **Focus:** Product engineering, system architecture, scalability, and real-world business impact.
* **Communication Style:** Abhimanyu represents the "builder's mindset." He frequently zooms out from code-level syntax to discuss how technical choices impact end-users, server architecture, and business metrics.

### 3. Kshitij Mishra
**Role:** Dean, Scaler School of Technology
* **Focus:** Step-by-step problem solving, debugging, and classroom mentorship.
* **Communication Style:** Calm, patient, and highly structured. Kshitij is designed to help students debug their own code by breaking down overwhelming concepts into easily digestible, logical steps.

---

## 🛠️ Key Features & Prompt Engineering Highlights

- **Chain-of-Thought (CoT) Enforcement:** Every system prompt instructs the AI to utilize a `<think>` block to silently reason out its logic before writing a response. This forces the model to check constraints, structure its teaching plan, and analyze the user's intent. While hidden from the UI to ensure a clean user experience, this `<think>` process fundamentally improves the quality of the final answer.
- **Strict Behavioral Constraints:** The models are forbidden from giving direct "copy-paste" answers to assignments, ensuring they act as mentors rather than answer keys. They are also instructed to avoid condescension and end interactions with thought-provoking questions.
- **Dynamic Context Switching:** When the user switches personas, the active prompt is completely swapped, and the conversation history resets. The UI (including avatars, suggestion chips, and color themes) shifts to match the new persona dynamically.
- **Premium User Interface:** Built entirely with Vanilla CSS (no component libraries or Tailwind), the frontend utilizes glassmorphism, responsive flex layouts, CSS variables, and modern aesthetic animations to create a highly polished experience.

---

## 💻 Technical Architecture

This application uses a streamlined, client-side only architecture to deliver the experience rapidly.

- **Frontend Framework:** React (bootstrapped with Vite for instant server start and HMR).
- **Styling:** Custom Vanilla CSS `index.css`.
- **API Integration:** Google Generative AI SDK (`@google/generative-ai`). 
- **Icons:** `lucide-react` for lightweight, scalable SVGs.

Because the system relies entirely on the frontend to communicate with the Gemini API, the `VITE_GEMINI_API_KEY` environment variable is securely injected into the build process, avoiding the need for a separate Node.js backend while remaining deployable.

---

## 🚀 Setup & Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/notharshagithub/genAiProj.git
   cd genAiProj
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   Rename `.env.example` to `.env` and insert your Gemini API Key:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. **Start the local server:**
   ```bash
   npm run dev
   ```

## 🌍 Deployment

This repository is configured to be seamlessly deployed to platforms like Vercel, Netlify, or Railway. Simply connect the repository to your hosting provider and add your `VITE_GEMINI_API_KEY` into the deployment dashboard environment variables.

---

## 📚 Further Reading

To understand the core prompt engineering decisions made during this project, please view:
- `prompts.md`: A product decision document detailing the exact prompts and constraints.
- `reflection.md`: A summary of the GIGO (Garbage In, Garbage Out) principle and overall project learnings.
