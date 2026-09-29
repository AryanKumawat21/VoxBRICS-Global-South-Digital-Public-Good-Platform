# VoxBRICS — Multilingual Citizen Intelligence & Predictive Urban Planning Platform
> **A Digital Public Good (DPG) for National Policymakers and Grassroots Communities across BRICS Nations**

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Digital Public Good](https://img.shields.io/badge/DPG-UN_SDG_6_%26_11-emerald.svg)](https://digitalpublicgoods.net/)
[![Firebase Firestore](https://img.shields.io/badge/Database-Firebase_Firestore-orange.svg)](https://firebase.google.com/)
[![Gemini Multimodal AI](https://img.shields.io/badge/AI-Google_GenAI_SDK-cyan.svg)](https://ai.google.dev/)

---

## 📌 Overview

**VoxBRICS** is an open-source, scalable, multilingual Digital Public Good platform engineered to bridge the critical gap between grassroots citizen needs and national infrastructure investment across BRICS+ nations (*India, Brazil, South Africa, Egypt, Ethiopia, China, UAE, and partner states*).

By aggregating citizen development requests through voice recordings, SMS gateways, WhatsApp, and community kiosks, VoxBRICS harmonizes unstructured public feedback with census layers, demographic vulnerability indices, and public investment budgets. The platform automatically flags demand hotspots, drafts bankable project dossiers aligned with multilateral institutions like the **New Development Bank (NDB)**, and models long-term urban planning trajectories up to 2035.

---

## ✨ Key Features

### 1. Multimodal & Multilingual Citizen Intake
- **Voice-First Accessibility**: Empowers non-literate and regional-language speakers to record voice notes transcribed accurately into native scripts via `gemini-3.5-transcribe`.
- **Multi-Channel Integration**: Supports Voice Audio, WhatsApp bots, 2G/3G SMS gateways, Telegram, and Civic Center Web Kiosks.
- **Fast Telemetry Extraction**: Automatic issue classification, sentiment distress indexing, and beneficiary impact calculation powered by `gemini-3.1-flash-lite`.
- **Text-to-Speech (TTS)**: Spoken audio briefings in native dialects powered by `gemini-3.8-flash-tts`.

### 2. Spatial Infrastructure Deficit & Hotspot Explorer
- GIS-based cluster visualizer correlating citizen demand counts with regional vulnerability ratios, population density, and municipal infrastructure deficit scores (0–100).
- Real-time heat mapping for critical sectors:
  - Clean Water & Sanitation
  - Renewable Energy & Microgrids
  - Transit & Rural Feeder Paving
  - Primary Healthcare & Telemedicine Hubs
  - Stormwater & Flood Resilience

### 3. National Policymaker Engine (Grounded AI Dossiers)
- **Maps & Web Grounding**: Real-time cross-referencing with municipal master plans, satellite indices, and live public datasets using `gemini-3.5-flash` with Google Maps and Google Search tools.
- **NDB Multilateral Pipeline Integration**: Converts citizen demand into bankable project prospectuses adhering to sovereign green bond standards and NDB concessional loan frameworks.
- **3-Phase CapEx Milestone Breakdown**: Clear procurement pathways, budget estimates, and beneficiary milestones.

### 4. Interactive Predictive Dashboard (2026 – 2035)
- Dynamic scenario modeling with stress levers:
  - Climate Vulnerability Factor (1.0x – 2.5x baseline)
  - Peri-Urban Inward Migration Rate (1% – 6% YoY)
  - Sovereign CapEx Stimulus (Austerity, NDB Blended, Green Stimulus)
- 10-year forecasts tracking demand intensity, aquifer water stress, and amortized cost per beneficiary.

### 5. Live Audio Consultation (Gemini Live)
- Bi-directional, ultra-low-latency spoken dialogue via `gemini-3.8-live` for interactive consultations between citizens and urban planning delegates.

### 6. Strategic Urban AI Advisory Chat
- Multi-turn consultative interface powered by `gemini-3.1-pro-preview` with specialized domain instructions for urban economists and municipal ministers.

### 7. Cloud Persistence & Secure Authentication
- **Firebase Firestore**: Real-time data sync for logged development requests and priority projects.
- **Firebase Authentication**: One-click Google Sign-In for verified delegates and community representatives.
- Production-hardened `firestore.rules` security policies.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Canvas Confetti
- **Backend / Real-time**: Node.js, Express, Vite
- **Cloud & Database**: Google Firebase Firestore, Firebase Authentication
- **AI & Multimodal SDK**: `@google/genai` (Google GenAI TypeScript SDK)
  - `gemini-3.5-transcribe` (Voice note transcription & language detection)
  - `gemini-3.5-flash` (Google Search & Google Maps Grounding)
  - `gemini-3.8-flash-tts` (Text-to-Speech audio generation)
  - `gemini-3.8-live` (Real-time live voice consultation)
  - `gemini-3.1-pro-preview` (Deep strategic multi-turn urban chat)
  - `gemini-3.1-flash-lite` (High-speed request classification & telemetry)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or bun
- Gemini API Key

### Installation

1. **Clone repository:**
   ```bash
   git clone https://github.com/your-username/VoxBRICS.git
   cd VoxBRICS
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY="your-gemini-api-key"
   VITE_GEMINI_API_KEY="your-gemini-api-key"
   APP_URL="http://localhost:3000"
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for Production:**
   ```bash
   npm run build
   ```

---

## 🌍 Supported BRICS Member Nations

- 🇮🇳 **India** (Hindi, Tamil, Bengali, Telugu, Marathi, English)
- 🇧🇷 **Brazil** (Portuguese, English)
- 🇿🇦 **South Africa** (isiZulu, isiXhosa, Afrikaans, English)
- 🇪🇬 **Egypt** (Arabic, English)
- 🇪🇹 **Ethiopia** (Amharic, Afaan Oromoo, English)
- 🇨🇳 **China** (Mandarin, English)
- 🇦🇪 **United Arab Emirates** (Arabic, English)

---

## 📜 License
Distributed under the Apache 2.0 License. Designed in compliance with the **Digital Public Goods Standard** (DPG) and UN Sustainable Development Goals (SDG 6: Clean Water and Sanitation & SDG 11: Sustainable Cities and Communities).
