# SpeechSupport — AI-Powered Speech Practice Platform

> A web application that helps users improve their English pronunciation and speaking skills through real-time AI feedback and interactive conversation practice.

---

## What Does This App Do?

SpeechSupport is an online platform where users can practice speaking English and get instant feedback. Think of it like a personal speech coach available 24/7 in your browser. It has two main features:

1. **Speech Coach** — You read a sentence or paragraph aloud, the app listens, and tells you how closely your pronunciation matched the target text, along with a score out of 100%.
2. **AI Companion** — You have a real spoken conversation with an AI tutor. You speak, the AI listens, understands, and replies back to you in audio — just like talking to a person.

---

## Who Is This For?

- Students learning English pronunciation
- Language learners who want daily speaking practice
- Teachers who want to provide self-paced tools to students
- Anyone who wants to improve their public speaking or accent

---

## Table of Contents

- [Features](#features)
- [How It Works (Non-Technical)](#how-it-works-non-technical)
- [Project Structure](#project-structure)
- [Architecture Overview](#architecture-overview)
- [Technologies Used](#technologies-used)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)

---

## Features

### For Students / Users

| Feature | Description |
|---|---|
| Speech Coach | Record yourself reading sentences or paragraphs and receive an instant similarity score |
| AI Companion | Have a back-and-forth spoken conversation with an AI tutor |
| Progress Dashboard | View your practice history — total sessions, average score, best score |
| User Registration | Create your own account with email and password |

### For Administrators

| Feature | Description |
|---|---|
| Admin Panel | View and manage all user accounts |
| User Progress Monitoring | View any student's practice history |
| User Management | Create, update, or delete user accounts |
| Role-Based Access | Admins have extra permissions that regular users don't |

---

## How It Works (Non-Technical)

### Speech Coach

1. You land on the Coach page and see a target sentence or paragraph.
2. Click the **Record** button and speak the text aloud into your microphone.
3. The app sends your voice recording to a powerful AI speech recognition engine (OpenAI Whisper) running on the server.
4. The app converts your speech to text and compares it word-by-word against the original target.
5. You receive a **similarity score** (e.g., 87%) and can see your transcribed words next to the original.
6. Your result is saved to your progress dashboard automatically.

### AI Companion

1. You open the AI Companion page and click to start speaking.
2. Your voice is recorded and sent to the server.
3. The server converts your speech to text using Google's Speech Recognition.
4. Your text is sent to Google's Gemini AI model, which generates a short, helpful response.
5. That text response is converted back into audio using Google Text-to-Speech.
6. The AI's voice plays back in your browser while an animated video shows on screen.
7. You can keep the conversation going — the app remembers what was said earlier in the session.

---

## Project Structure

```
Speech/
│
├── app.py                    # Main application — handles login, speech coach, dashboard
├── ai_app.py                 # AI Companion module — handles AI conversation feature
│
├── templates/                # HTML pages (what you see in the browser)
│   ├── index.html            # Home / landing page
│   ├── coach.html            # Speech Coach interface
│   ├── dashboard.html        # User progress dashboard
│   ├── login.html            # Login page
│   ├── register.html         # Registration page
│   ├── admin_users.html      # Admin user management panel
│   └── aicompanion/
│       └── index.html        # AI Companion interface
│
├── static/                   # Visual assets and scripts
│   ├── css/                  # Stylesheets (colors, layouts, fonts)
│   ├── js/                   # JavaScript (microphone recording, sending audio)
│   ├── images/               # Logos and icons
│   └── videos/               # Demo video played during AI responses
│
├── requirements.txt          # List of Python packages needed to run the app
├── packages.txt              # System-level tools needed (ffmpeg for audio)
├── .env                      # Secret configuration values (not shared publicly)
├── firebase-admin-sdk.json   # Firebase credentials file
└── RENDER_WHISPER_SETUP.md   # Guide for deploying to Render cloud platform
```

### What Each Main File Does

#### [app.py](app.py)
The heart of the application. It handles:
- User login, registration, and logout
- Serving all the main web pages
- Receiving audio from the Speech Coach, transcribing it with Whisper, and scoring it
- Saving and fetching user progress from the database
- Admin-only routes for user management

#### [ai_app.py](ai_app.py)
A separate module (called a "Blueprint" in Flask) that powers the AI Companion feature:
- Receives your spoken audio
- Converts audio format using ffmpeg
- Transcribes speech using Google Speech Recognition
- Sends your message to Google Gemini AI and gets a reply
- Converts the reply to audio with Google Text-to-Speech
- Sends the audio back to your browser

---

## Architecture Overview

Below is a simplified picture of how all the parts connect:

```
Your Browser
    │
    │  You speak into your mic
    │  JavaScript records audio
    │
    ▼
Flask Web Server (app.py + ai_app.py)
    │
    ├── Speech Coach Flow:
    │   Audio → OpenAI Whisper → Text → Compare → Score → Save to Firestore
    │
    └── AI Companion Flow:
        Audio → FFmpeg → Google Speech Recognition → Text
                                                        │
                                               Google Gemini AI
                                                        │
                                               Text Response
                                                        │
                                          Google Text-to-Speech
                                                        │
                                            Audio plays in browser

External Services Used:
    ├── OpenAI Whisper      (runs locally on server — no API call needed)
    ├── Google Speech API   (transcribes AI Companion audio)
    ├── Google Gemini API   (generates AI tutor responses)
    ├── Google TTS API      (turns text into spoken audio)
    └── Firebase Firestore  (stores user accounts and progress)
```

---

## Technologies Used

### What Is Each Technology?

| Technology | What It Is | Why It's Used Here |
|---|---|---|
| **Python** | A programming language | The entire backend is written in Python |
| **Flask** | A lightweight web framework for Python | Handles web routes, user sessions, and server logic |
| **Flask-Login** | An extension for Flask | Manages who is logged in and restricts pages to authenticated users |
| **OpenAI Whisper** | A state-of-the-art speech recognition AI model from OpenAI | Converts user audio to text for the Speech Coach with high accuracy |
| **Google Gemini API** | Google's large language AI model | Powers the AI Companion's conversational intelligence |
| **Google Speech Recognition** | Google's cloud speech-to-text service | Transcribes audio for the AI Companion |
| **gTTS (Google Text-to-Speech)** | Converts written text to spoken audio | Generates the AI Companion's voice responses |
| **FFmpeg** | A tool for processing audio and video files | Converts browser-recorded audio (WebM) into a format the server can process (WAV) |
| **Firebase / Firestore** | Google's cloud database | Stores user accounts and practice session history persistently |
| **HTML / CSS / JavaScript** | Standard web technologies | Build the user interface and handle audio recording in the browser |
| **MediaRecorder API** | A browser built-in feature | Captures microphone audio directly in the browser |
| **PyTorch** | A machine learning framework | Required by Whisper to run the AI model |
| **difflib** | A Python standard library module | Calculates how similar two pieces of text are (used for scoring) |

### Frontend vs Backend — What's the Difference?

- **Frontend** is everything you see and interact with in your browser: the buttons, text, colors, and microphone functionality. This is built with HTML, CSS, and JavaScript.
- **Backend** is the server-side logic you don't see: processing audio, running AI models, talking to databases, managing users. This is built with Python and Flask.

---

## Setup & Installation

### Prerequisites

- Python 3.9 or later
- FFmpeg installed on your system
- A Google Cloud account (for Gemini and Speech APIs)
- A Firebase project with Firestore enabled

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Speech
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   venv\Scripts\activate        # On Windows
   # source venv/bin/activate   # On Mac/Linux
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables** — create a `.env` file (see next section)

5. **Add your Firebase credentials** — place your `firebase-admin-sdk.json` in the root folder

6. **Run the application**
   ```bash
   python app.py
   ```

7. Open your browser and go to `http://localhost:5000`

---

## Environment Variables

Create a `.env` file in the root of the project with the following values:

```env
# Admin Account (created automatically on first run)
APP_ADMIN_EMAIL=admin@example.com
APP_ADMIN_PASSWORD=YourStrongPassword123!

# Whisper Model Settings
WHISPER_MODEL=base            # Options: tiny, base, small, medium, large
WHISPER_CACHE_DIR=./models    # Where to store the downloaded model

# Firebase
FIREBASE_CREDENTIALS=./firebase-admin-sdk.json

# Google APIs
GOOGLE_API_KEY=your_google_api_key_here

# Flask
FLASK_SECRET_KEY=a_random_secret_string
PORT=5000
```

> **Note:** Never share your `.env` file publicly. It contains sensitive credentials.

---

## Deployment

The app is configured for deployment on **Render** (a cloud hosting platform). Refer to [RENDER_WHISPER_SETUP.md](RENDER_WHISPER_SETUP.md) for detailed deployment instructions.

Key deployment notes:
- The Whisper model (~150 MB) is automatically downloaded on first startup — this takes 2–3 minutes
- FFmpeg is installed automatically via `packages.txt`
- Firebase credentials should be provided as a **Secret File** on Render

---

## User Roles

| Role | What They Can Do |
|---|---|
| **User** | Register, log in, use Speech Coach, use AI Companion, view their own dashboard |
| **Admin** | Everything a user can do, plus: view all users, create/update/delete accounts, view any user's progress |

> There must always be at least one admin account. The system will prevent you from deleting the last admin.

---

## Data Flow Summary

### Speech Coach
```
User records audio
    → Sent to /transcribe endpoint
    → OpenAI Whisper converts audio to text
    → difflib compares transcription to target text
    → Similarity score calculated
    → Result saved to Firestore
    → Score and transcript shown to user
```

### AI Companion
```
User records audio
    → Sent to /aicompanion/process_audio
    → FFmpeg converts WebM to WAV
    → Google Speech Recognition transcribes audio
    → Message + conversation history sent to Gemini AI
    → Gemini responds with a short reply (max 20 words)
    → gTTS converts reply text to audio
    → Audio file sent back to browser and played aloud
```

---

## Built With

- [Flask](https://flask.palletsprojects.com/) — Web framework
- [OpenAI Whisper](https://github.com/openai/whisper) — Speech recognition
- [Google Gemini](https://ai.google.dev/) — AI conversation
- [Firebase](https://firebase.google.com/) — Database and user storage
- [gTTS](https://gtts.readthedocs.io/) — Text-to-speech
- [FFmpeg](https://ffmpeg.org/) — Audio processing
