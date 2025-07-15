# Manimatic

**Create Videos with AI** – Transform mathematical concepts into animated videos using natural language prompts.

---

<img src="https://github.com/JolevD/Manimatic/blob/main/demo/home.png" alt="">

## 🎯 Project Overview

Manimatic is a full-stack application that leverages the Manim Community Edition (ManimCE) animation engine and AI-driven natural language understanding to generate educational math videos on demand. Users enter a concept or algorithm, and Manimatic compiles and renders a polished animation demonstrating the idea step by step.

## 🚀 Features

- **Natural Language Input**: Type any mathematical concept (e.g., "Pythagorean theorem", "Matrix multiplication") and receive a custom animation.
- **AI-Powered Script Generation**: Backend AI translates user prompts into Manim script code.
- **Automated Rendering**: ManimCE renders the generated script into a video file.
- **Interactive Frontend**: Modern React interface with a prompt input, example tags, and real-time progress feedback.
- **Example Prompts**:

  - Explain Pythagorean theorem
  - Explain Bubble sort algorithm
  - Explain Matrix multiplication
  - Explain Calculus derivatives
  - Explain Fourier transforms

## 🛠️ Tech Stack

| Layer          | Technology                         |
| -------------- | ---------------------------------- |
| **Frontend**   | React, TypeScript, Tailwind CSS    |
| **Backend**    | Node.js, Express, Python (ManimCE) |
| **AI**         | Anthropic API (Claude)             |
| **Rendering**  | Manim Community Edition            |
| **Deployment** | Docker,                            |

## 📥 Installation

> **Prerequisites:** Node.js (v16+), Python 3.9+, Docker

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/manimatic.git
   cd manimatic
   ```

2. **Setup backend**

   ```bash
   cd backend
   npm install

   ```

3. **Setup frontend**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure environment**

   - Copy `.env.example` to `.env` in both `frontend` and `backend` directories.
   - Add your OpenAI API key and any other secrets. or add ANTHROPIC_API_KEY in .env

5. **Run locally**

   ```bash
   # In one terminal, start the backend API
   cd backend && npm run dev

   # In another terminal, start the frontend
   cd frontend && npm run dev
   ```

6. **Access the App**

Open your browser at `http://localhost:3000` to use Manimatic.

## 📖 Usage

1. Enter a mathematical concept or algorithm in the prompt box.
2. Click **Generate** and watch the progress bar.
3. Download or stream the resulting MP4 animation.

### Example Prompt

> "Animate the derivation of the quadratic formula step by step."

## 📁 Project Structure

```
manimatic/
├── backend/        # Express API + AI script generator
│   ├── src/
│   ├── src/index.ts/     # API endpoints
│   └── ...
├── frontend/       # React TypeScript app
│   ├── src/
│   └── ...
└── README.md
```

## 👥 Contributing

1. Fork this repository.
2. Create a feature branch: `git checkout -b feature/YourFeature`.
3. Commit your changes: `git commit -m "Add awesome feature"`
4. Push to the branch: `git push origin feature/YourFeature`.
5. Open a Pull Request.

_Powered by Manim Community Edition & AI ✨_
