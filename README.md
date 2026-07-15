# SkillForge — Developer Learning Platform

SkillForge is a modern, portfolio-ready React web application designed as a comprehensive Developer Learning and Interview Preparation Platform. Built entirely on the frontend using React (Vite), Context API, and `localStorage` for data persistence, it showcases advanced UI/UX principles, glassmorphism, and a 2026 SaaS aesthetic without relying on external CSS frameworks or backend services.

## ✨ Features

*   **100% Client-Side Persistence**: Your progress, XP, streaks, and goals are saved securely in your browser's `localStorage`.
*   **Interactive Learning Roadmaps**: Visual timelines for mastering different tracks (Frontend, Java, etc.) that dynamically unlock as you progress.
*   **Practice & Assessments**:
    *   **Quiz System**: Timed multiple-choice quizzes with real-time feedback.
    *   **Flashcards**: Interactive 3D flip cards with spaced repetition UI elements.
    *   **Mock Interviews**: Simulated video feed UI with recording toggles and AI feedback mockups.
    *   **Daily Challenge**: Embedded code editor interface simulating test execution.
*   **Gamification**: Earn XP, level up, track your daily learning streak, and unlock achievements.
*   **Settings & Data Control**: Easily export your progress as a JSON file, import previous progress, or reset your account data.
*   **Beautiful UI**: Hand-crafted CSS variables supporting seamless dark and light modes, micro-interactions, and a sleek layout.

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18 or higher recommended)
*   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Diva1516/Skill_Forge.git
    cd Skill_Forge
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to `http://localhost:5173`.

## 🛠️ Technology Stack

*   **Core**: React 18, React Router v6
*   **Build Tool**: Vite
*   **Styling**: Vanilla CSS (CSS Modules & Global Variables)
*   **Icons**: Lucide React
*   **State Management**: React Context API
*   **Data Persistence**: localStorage

## 📁 Project Structure

*   `/src/components` - Reusable UI components (Sidebar, TopNav, AppLayout)
*   `/src/context` - Global state managers (Auth, Progress, Theme, Notifications)
*   `/src/pages` - Main application views (Dashboard, Roadmaps, Quiz, Settings, etc.)
*   `/src/data` - Static mock data used to populate roadmaps and practice modules
*   `/src/routes` - Application routing logic

## 📝 License

This project is licensed under the MIT License.
