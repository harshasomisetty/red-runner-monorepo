# Red Runner Monorepo

This repository contains three main components of the Red Runner project:
- Unity Game
- Game Server (Backend)
- Wallet Login Page

## Repository Structure

```
red-runner/
├── backend/     # Game server
├── game/        # Unity game files
│   └── exports/ # WebGL build output
└── login/       # Wallet login interface
```

## Quick Start

### Installation

In each project directory (`backend/` and `login/`), run:

```bash
yarn install
```

When prompted, type `y` to confirm the installation.

### Running the Projects

#### Game (Unity)
1. Open the project in Unity
2. Select `Build As` and choose WebGL as the build target
3. Export the build to the `exports/` directory
4. The game will run locally from this export
5. When committed to GitHub, the export will automatically deploy via Vercel (or your chosen hosting platform)

#### Backend Server
```bash
yarn dev
```

#### Login Server
```bash
yarn dev
```

## Deployment

The game's WebGL build can be deployed to:
- Vercel (automatic deployment when pushing to GitHub)
- Any other web hosting platform of your choice
