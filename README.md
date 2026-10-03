# CreatorAI — AI-Powered Creator Operating Platform

> **"Turn one long-form asset into an entire cross-platform content syndication engine."**

CreatorAI is a production-grade, full-stack creator operating platform built for modern creators, media teams, and founders. It unifies what previously required 5+ disconnected tools (Whisper transcription, Premiere Pro/CapCut clipping, subtitle generators, multi-platform copywriters, and scheduling spreadsheets) into one seamless, tactile operating system.

---

## 🌟 The Core Product Promise

```
ONE LONG-FORM CONTENT ASSET (Keynote, Podcast, Tutorial)
        ↓
AI UNDERSTANDS IT (Whisper large-v3 Phoneme Alignment)
        ↓
TRANSCRIPT + TOPICS (Semantic Clustered Themes)
        ↓
BEST MOMENTS DETECTED (High-Retention Spikes)
        ↓
SHORT-FORM CLIPS GENERATED (9:16, 1:1, 16:9 Aspect Framing)
        ↓
HOOKS + CAPTIONS GENERATED (Dynamic Subtitle Highlight Presets)
        ↓
AI-ASSISTED EDITING (Multi-Track Region Timeline & Live Word Sync)
        ↓
PLATFORM-SPECIFIC ADAPTATION (Instagram, YouTube Shorts, LinkedIn)
        ↓
CONTENT WORKFLOW & EDITORIAL CALENDAR (Queue & Schedule)
        ↓
CONTENT INTELLIGENCE (Retention Diagnostic & AI Insights)
```

---

## 🎨 Visual Design Direction: Strict Premium Light Theme

CreatorAI adheres strictly to a **light, high-trust, Apple/Linear/Stripe-level aesthetic**. Dark mode has been explicitly prohibited to maintain maximum clarity and creative focus.

- **Primary Background**: `#FAFAF7` (warm off-white / ivory) and `#F7F8FC` (cool-white wash)
- **Cards & Surfaces**: `#FFFFFF` with ultra-fine `rgba(20, 20, 40, 0.07)` borders
- **Primary Typography**: `#17172A` (deep ink) with `#68697A` supporting metadata
- **Curated Accents**:
  - Primary Royal Violet: `#635BFF`
  - Creative Magenta: `#EC4899`
  - AI Pulse Cyan: `#06B6D4`
  - Growth Emerald: `#22C55E`
- **Tactile Shadows**: Soft atmospheric drop shadows (`0 8px 30px rgba(30,30,70,0.06)`)
- **Signature AI Core**: Central pulsing gradient orb with orbiting nodes and delicate constellation connection lines.

---

## 🚀 Application Routes & Architecture

### Frontend (Next.js 16 App Router + TypeScript + Tailwind CSS + Framer Motion)

| Route | View | Description |
|---|---|---|
| `/` | **Landing Page** | Apple-grade showcase with signature AI Core visual, interactive product mockups, and workflow breakdown |
| `/dashboard` | **Creator Dashboard** | Performance metrics, active projects, high-potential moment cards, and quick actions |
| `/library` | **Content Library** | Multi-media asset management (Videos, Audio, Scripts) with filter tabs and hover previews |
| `/studio` | **AI Content Studio** | Synchronized video player, scrubbable moment timeline, content summary, and Opportunity Score cards |
| `/clips` | **Generated Clips** | Grid of vertical & square clips with Opportunity Score badges and quick-actions |
| `/editor/[id]` | **AI Video Editor** | Multi-track timeline (Hook, Captions, Video, Audio), dynamic subtitle animator, and platform adapter |
| `/calendar` | **Content Calendar** | Month, week, and list views for scheduled omnichannel publication |
| `/analytics` | **Content Intelligence** | Watch time, completion rate, platform distribution, top topics, and retention insights |
| `/settings` | **Platform Settings** | AI model selection (Whisper, GPT-4o, Claude), API keys, and connected channels |

### Backend (FastAPI + Python + SQLAlchemy)

Located in `backend/`:
```
backend/
├── app/
│   ├── main.py                  # FastAPI app with CORS & router integration
│   ├── utils/config.py          # Environment settings & fallback configuration
│   ├── models/                  # SQLAlchemy ORM models (User, Project, Asset, Transcript, Clip, Content)
│   ├── schemas/                 # Pydantic v2 validation contracts
│   ├── services/
│   │   ├── transcription/       # Whisper speech-to-text service
│   │   ├── ai_analysis/         # Semantic Opportunity Scoring engine
│   │   ├── clip_generation/     # FFmpeg video cropping and rendering pipeline
│   │   ├── caption_generation/  # Subtitle timing & kinetic styling
│   │   └── adaptation/          # Multi-platform tailored copywriting
│   └── api/                     # REST API routers (projects, assets, analysis, clips, hooks, captions, etc.)
└── requirements.txt
```

---

## 💡 60-Second Hackathon Judge Demonstration

Follow this exact walkthrough to experience the end-to-end creator workflow:

1. **Launch**: Open [http://localhost:3000](http://localhost:3000). Experience the landing page and the signature pulsing **AI Core visual**.
2. **Dashboard**: Click **"Start Creating"** to navigate to `/dashboard`. Inspect the 4 live metrics cards and recent projects.
3. **Upload**: Click **"+ Create Content"** in the top bar. In the modal, click **"Load Sample Video"** to simulate an incoming keynote recording.
4. **AI Processing**: Watch the intelligent multi-stage pipeline:
   - ✓ Audio extracted
   - ✓ Speech transcribed with Whisper
   - ● Detecting topics & semantic clusters
   - ○ Finding high-potential moments & Opportunity Scores
5. **AI Content Studio**: In `/studio`, scrub the timeline to preview moments. Notice the **Why This Works** diagnostic breakdown.
6. **Score Diagnostics**: Click on the **92 Opportunity Score Ring** to open the modal showing *Hook Strength (94%)*, *Info Density (91%)*, and *Standalone Context (95%)*.
7. **Clip Generation**: Click **"Generate Clip"** on the top opportunity. Choose **9:16 (Vertical)** and **Dynamic Captions**. Watch the 5-step autonomous rendering workflow finish with celebratory confetti!
8. **AI Video Editor**: Click **"Open Editor"** to launch `/editor/clip-1`. Toggle between **Minimal**, **Bold**, and **Dynamic** subtitle styles and observe the words highlight progressively in real-time.
9. **Multi-Platform Adaptation**: In the editor's right panel, click **"Adaptations"** to view tailored captions and hashtags for Instagram Reels, YouTube Shorts, and LinkedIn. Click **"Copy"**.
10. **Calendar Scheduling**: Click **"Schedule"** to queue the post for 6:00 PM peak distribution. Open `/calendar` to see it on the editorial grid.
11. **Content Intelligence**: Open `/analytics` to review audience watch times, top topics, and automated AI insight callouts.

---

## 🛠️ Running Locally

### 1. Frontend Web App
```bash
npm install
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 2. Backend FastAPI Server (Optional)
```bash
cd backend
python -m uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --reload
```
Interactive Swagger docs available at **[http://localhost:8000/docs](http://localhost:8000/docs)**.

---

## 🛡️ Hackathon Reliability & Fallback Mode

CreatorAI includes a **Hackathon Demo Mode** switch in the top header. If an external AI API key is unconfigured or a network connection is offline, the platform automatically serves realistic seeded keynotes, Whisper phoneme segments, and Opportunity Scores without failing or hanging.
