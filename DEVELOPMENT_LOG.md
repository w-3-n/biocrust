# Biocrust Explorer - Development Log

## Project Overview
A web-based interactive science education game built with React + Vite, designed to teach players about Biological Soil Crusts. The project is structured with scalability in mind to eventually allow for a Unity port.

## Architecture
- **Tech Stack:** React (v19), Vite (v5, explicitly downgraded to avoid Node v20/v6 rolldown conflicts), Vanilla CSS.
- **State Management:** Context API via `GameManager.jsx` handles global state (unlocked knowledge, current level).
- **Routing/Scene Management:** `LevelManager.jsx` acts as the router, conditionally rendering level components based on the global state.
- **Design Pattern:** MVC-like structure where each level has a `Logic hook` (e.g., `JigsawLogic.js`) for state and transitions, and a `UI component` (e.g., `JigsawUI.jsx`) for rendering.
- **Styling:** Global glassmorphism aesthetic managed in `index.css`.

## Completed Features
1. **Level 1: Memory Match** - Fully functional with 3D flip animations and win conditions.
2. **Level 2: Jigsaw Puzzle** - Drag-and-drop puzzle using a custom generated Great Wall image (`greatwall_puzzle.jpg`).
3. **Level 3: Merge Game (Biocrust Synthesis)** - 4x4 grid merging game. Players drag and drop identical tier items to upgrade them until the final "Green Hillside" is synthesized.
4. **Level 4: Planet Farm** - Time-reaction game. Biocrusts spawn dynamically (1-2 at a time, every 1-5 seconds). Players must click (water) them before they dry out (Green 0-3s, Yellow 3-6s, Red >6s). Includes a failure state and restart mechanism. Prevented text-selection bugs on rapid clicks.
5. **Knowledge Unlocks & End Screen** - Players unlock 4 knowledge fragments sequentially and arrive at a final victory screen.
6. **Desktop Application Packaging** - Configured `electron` and `electron-builder` in `package.json` with `main.cjs`.
7. **CI/CD Pipeline** - Configured a GitHub Actions workflow (`.github/workflows/build.yml`) that automatically builds and publishes `.exe` (Windows) and `.dmg` (macOS) to GitHub Releases upon pushing a `v*` tag. The workflow has `contents: write` permissions and bypasses macOS code-signing.

## Current State & Next Steps
- The MVP web game is **100% complete** according to the initial LDD requirements.
- Desktop packaging via GitHub Actions is stable and functioning.
- **Next possible steps for future development:**
  - Code refactoring/optimization for the eventual Unity port.
  - Adding sound effects, animations, or background music.
  - Expanding levels or adding more complex mechanics based on playtest feedback.
