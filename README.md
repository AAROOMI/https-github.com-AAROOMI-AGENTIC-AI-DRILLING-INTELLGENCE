# Agentic AI Drilling Intelligence & Well Design Platform

Enterprise Drilling Intelligence and Autonomous Well Design Platform developed for Saudi Aramco Drilling & Workover Engineering Department standards.

---

## 1. System Architecture

- **User Interaction Layer**:
  - **AI Speaking Agent**: Saudi Male voice in conversational Najdi dialect, Modern Standard Arabic, and English.
  - Three interaction modes: **Voice Mode**, **Chat Mode**, and **Manual Mode**.
  - **Unified Custom Voice Identity**: `CustomVoiceService` routes all 19 specialized engineering agents through one single cloned voice identity based on the user's uploaded MP3/MP4 reference recording.
- **Agentic Force Orchestrator**:
  - Multi-agent supervisor managing memory, task planning, context, and downstream dependency invalidation.
- **12-Phase Governed Engineering Workflow**:
  1. Data Collection
  2. Data Validation
  3. Historical Well Intelligence
  4. Ongoing Well Intelligence (Morning Reports)
  5. Offset Well Analysis (Analog Ranking)
  6. Formation Pressure & Safe Mud Weight Window
  7. Well Design Architecture Selection (K-2, K-3, MK-2)
  8. Casing, Borehole & Metallurgy Grade (API Spec 5CT / NACE MR0175)
  9. Subsurface Target Execution Objectives
  10. 3D Directional Trajectory Planning (Minimum Curvature)
  11. Human Approval Governance Gate (Mandatory Engineer Sign-Off)
  12. Comprehensive Drilling Program Manual (PDF, Sheets, JSON)
- **Local LLM Layer & Automatic Offline Fallback**:
  - Built-in oil & gas reasoning engine + Local LLM Gateway (Ollama / Llama.cpp / vLLM adapter).
  - Automatically activates local inference if offline or if `AIR_GAPPED=true`.
- **Database Layer**:
  - Relational PostgreSQL database schema (`database/schema.sql`) covering 35 tables.
  - Firebase Firestore continuous synchronization (`src/services/firebase/firebaseSync.ts`).
- **Secure SQL Agent & Local RAG**:
  - Read-Only AST SQL parser blocking DDL/DML statements.
  - Air-gapped vector search with exact chapter and page citations.

---

## 2. Docker Deployment Instructions (Client Handover)

To run the complete platform via Docker on a client server or workstation:

```bash
# 1. Build and start the complete enterprise stack:
docker compose up -d

# 2. Verify all containers are running and healthy:
docker compose ps

# 3. Access the web interface:
http://localhost:3000
```

### Offline / Air-Gapped Image Export for Field Rigs:

```bash
# On an internet-connected build machine:
docker compose build
docker save -o aramco_drilling_platform.tar aramco-drilling-intelligence postgres:16-alpine ollama/ollama:latest

# On the isolated rig or workstation:
docker load -i aramco_drilling_platform.tar
docker compose up -d
```

---

## 3. Windows Desktop Version Installation

For engineers using Windows field laptops or offshore rig workstations:

### Method A: One-Click Desktop Launcher
1. Double-click `launch-windows-desktop.bat`.
2. The batch script verifies prerequisites, starts the local background service, and opens the application frame automatically.

### Method B: Standalone Native Windows Installer (.exe)
1. Run `npm run build`.
2. Build the Electron NSIS installer using `npx electron-builder --win`.
3. Locate `Aramco-Drilling-Setup.exe` in the `dist-electron/` folder.
4. Run the installer to create a desktop shortcut and Start Menu entry.

---

## 4. Typography & Human-in-the-Loop Directives

- **Normal Font Weight Directive**: All user interface elements, titles, and body texts strictly utilize normal, refined font weights (`font-normal` / `400-500`) without bolding.
- **Engineering Authority Mandate**: AI recommendations never bypass engineering approval. All downstream operational actions strictly require lead drilling engineer sign-off in Phase 11.
