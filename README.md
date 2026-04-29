# Persona-Based AI Chatbot (Scaler Mentors)

This is a working persona-based AI chatbot built with React, Vite, and the Gemini API. It allows users to have rich, contextual conversations with three Scaler/InterviewBit personalities: **Anshuman Singh**, **Abhimanyu Saxena**, and **Kshitij Mishra**.

## Features

- **Three Distinct Personas:** Each persona has a highly customized system prompt complete with their background, specific constraints, and Chain-of-Thought (CoT) instructions.
- **Persona Switcher:** Easily toggle between mentors. Switching personas automatically resets the conversation context.
- **Suggestion Chips:** Quick-start questions tailored to each specific persona to get the conversation flowing.
- **Typing Indicator:** Smooth UI feedback while the Gemini API is generating a response.
- **Premium Design:** Built with custom Vanilla CSS featuring glassmorphism, responsive layouts, and dynamic themes.

## Tech Stack

- **Frontend:** React + Vite
- **AI/LLM:** Google Gemini API (`gemini-2.5-flash`)
- **Styling:** Vanilla CSS (No Tailwind)
- **Icons:** Lucide React

## Setup Instructions

1. **Clone the repository** (or download the source code).
2. **Navigate to the project directory:**
   ```bash
   cd ass1ag
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Set up environment variables:**
   - Rename `.env.example` to `.env` (or create a new `.env` file).
   - Add your Gemini API key:
     ```env
     VITE_GEMINI_API_KEY=your_gemini_api_key_here
     ```
5. **Run the development server:**
   ```bash
   npm run dev
   ```
6. Open your browser and navigate to `http://localhost:5173`.

## Deployment

The app is designed to be easily deployed on platforms like Vercel or Netlify. Since it is a client-side Vite application, you just need to:
1. Connect your GitHub repository to your hosting provider.
2. Add the `VITE_GEMINI_API_KEY` to the environment variables in your hosting provider's dashboard.
3. Deploy! (Build command: `npm run build`, Output directory: `dist`)

## Project Documentation

- `prompts.md`: Contains the three system prompts with annotations explaining the design decisions behind them.
- `reflection.md`: A reflection on what worked, the GIGO principle, and potential improvements.
