# Memory Card Quest

Historical React/Redux project built as a browser memory matching game.

This is a React 16 single-page card game where the player flips cards, matches pairs, tracks score and lives, and reaches a game-over state when lives run out. It is kept as a portfolio/archive project that shows early React component composition, Redux state management, randomized game setup, card-flip UI behavior, and GitHub Pages deployment.

## What It Demonstrates

- React class-component application structure.
- Redux store setup with `react-redux` provider wiring.
- Game state modeled through actions and reducer transitions.
- Randomized card-pair generation at game start.
- Flip-card interaction and temporary reveal state.
- Match detection, score updates, life tracking, disabled matched cards, and game-over display.
- Separated UI components for game board, cards, score/lives panel, game-over state, and replay control.
- Create React App build/deploy workflow with GitHub Pages configuration.

## Tech Stack

- React 16
- JavaScript
- Redux
- React Redux
- Create React App / `react-scripts@3.0.1`
- CSS card animations
- GitHub Pages

## Main Code Areas

- `src/index.js` - Redux store creation and provider setup.
- `src/App.js` - app entry component.
- `src/components/game/Game.js` - card generation, game board rendering, and click orchestration.
- `src/components/mysteryCard/Card.js` - flip-card presentation and card click handling.
- `src/components/informationDiv/` - score and lives display.
- `src/components/gameOver/` - game-over overlay.
- `src/gameRedux/reducer.js` - game state transitions.
- `src/gameRedux/actionTypes.js` - Redux action constants.

## Run Locally

```bash
npm install
npm start
```

Open `http://localhost:3000`. The game is fully client-side and does not require a backend. The npm scripts set the legacy Create React App environment flags needed for modern Node versions.

Useful scripts:

```bash
npm run build
npm test
npm run deploy
```

## Deployment

The `homepage` field points to:

```text
https://BorisThoris.github.io/react-redux-memory-card-game/
```

The project includes a `deploy` script using `gh-pages`.

## Status

Archived portfolio project. The goal of this repository is to show early React/Redux game-state work, not to represent current production React practices. The dependency stack is intentionally old because the project is preserved close to its original implementation.

## Cloudflare Pages

- Pages project name: `memory-card-quest`
- GitHub repository: `BorisThoris/memory-card-quest`
- Production branch: `master`
- Root directory: `.`
- Build command: `SKIP_PREFLIGHT_CHECK=true NODE_OPTIONS=--openssl-legacy-provider npx react-scripts build`
- Build output directory: `build`
- Public URL target: `https://memory-card-quest.pages.dev/`

Do not enable Cloudflare Access for the demo deployment. Leave frame-blocking headers unset so the portfolio can iframe the public build.
