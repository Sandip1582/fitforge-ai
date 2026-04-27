# 🏋️ FitForge AI — Virtual Personal Trainer

FitForge AI is an advanced, multi-agent AI fitness platform designed to act as your complete virtual personal trainer. It features 5 specialized AI agents that collaborate to deliver personalized workout plans, diet recommendations, machine guidance, progress tracking, and intelligent coaching — all through a premium, dynamic interface.

![FitForge AI Dashboard Demo](https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop)

## ✨ Core Features (5 AI Agents)

1. **🏋️ Workout Planner Agent:** Generates personalized workout plans based on user data and adjusts plans dynamically based on progress. Includes a library of exercises with YouTube demo videos.
2. **🔧 Machine Guide Agent:** Explains how to use gym machines step-by-step with video guides. Includes safety tips and common mistakes.
3. **📊 Progress Tracking Agent:** Tracks user data like weight, strength (estimated 1RM), and workout consistency. Detects plateaus and suggests intelligent improvements.
4. **🥗 Diet Planner Agent:** Creates personalized meal plans based on fitness goals, calculating precise calories and macro/protein intake. Supports both vegetarian and non-vegetarian preferences.
5. **🤖 Chatbot Trainer Agent:** Acts as an AI fitness assistant that answers user queries related to workouts, diets, and machines. Provides intelligent recommendations across all domains.

## 💻 Tech Stack

- **Frontend Framework:** React 18 with Vite
- **Routing:** React Router v6
- **Styling:** Custom CSS with Glassmorphism and CSS variables
- **Charts & Visualizations:** Recharts
- **Animations:** Framer Motion (Ready) & CSS Keyframes
- **Icons:** React Icons (`lucide-react`)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sandip1582/fitforge-ai.git
   cd fitforge-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the URL provided in the terminal (usually `http://localhost:5173`).

## 📁 Project Structure

```
fitforge-ai/
├── public/               # Static assets
├── src/
│   ├── pages/            # Main UI pages (Dashboard, Workouts, etc.)
│   ├── data.js           # Mock data and AI responses
│   ├── App.jsx           # Main application routing
│   ├── main.jsx          # Entry point
│   └── index.css         # Global design system & styles
├── index.html            # HTML template
└── package.json          # Dependencies & scripts
```

## 🔮 Future Roadmap

- **Video Demo System:** Transition from YouTube embeds to a self-hosted HLS streaming system.
- **AI Posture Detection:** Analyze user exercise form using MediaPipe pose detection directly in the browser.
- **Backend Integration:** Connect the React frontend to a Node.js/Express REST API and PostgreSQL database.
- **LLM Integration:** Connect the Chatbot and Generator tools directly to OpenAI GPT-4 or Google Gemini APIs.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
