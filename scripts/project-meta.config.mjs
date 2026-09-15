// Metadata inputs for this repository - unique to react-redux-memory-card-game.
//
// Everything here is curated by hand. Derived facts (stack, metrics, git,
// screenshots) are computed by scripts/generate-project-meta.mjs, which writes
// project.meta.json. Run it with:
//   npm run meta          regenerate project.meta.json
//   npm run meta:check    fail if project.meta.json is stale

import path from 'node:path';

// Screenshots are captured by the portfolio (npm run capture there). Point
// PORTFOLIO_ROOT elsewhere, or drop images in ./project-media, to override.
const portfolioRoot = process.env.PORTFOLIO_ROOT ?? String.raw`C:\Users\Gaming PC\Desktop\Repos\portfolio`;

export default {
  slug: "memory-card-quest",
  classification: "web-app",

  curated: {
    "title": "Memory Card Quest",
    "subtitle": "Flip, match, and keep your lives",
    "description": "A card-matching memory game in React and Redux: flip two cards, match the pair, watch the score climb and the lives fall, and replay when they run out. Randomised pairs every game and a Redux store that models each flip.",
    "tags": [
      "Game",
      "React",
      "Redux",
      "Archive"
    ],
    "accent": "#c084fc",
    "deploymentUrl": "https://memory-card-quest-git.pages.dev/",
    "localUrl": "http://127.0.0.1:4114/",
    "buildCommand": "npm run build",
    "buildOutput": "build",
    "serveBasePath": "/react-redux-memory-card-game",
    "runCommand": "npm start",
    "devPort": 4114,
    "showcaseTier": "more"
  },

  // How the portfolio screenshot pipeline photographs this project.
  capture: {
    "route": "/"
  },

  scores: {
    "priorityScore": 55,
    "demoabilityScore": 68,
    "depthScore": 52,
    "polishScore": 54,
    "uniquenessScore": 52,
    "maintenanceScore": 48
  },

  analysisNotes:
    "Small React/Redux memory game; demoable and useful as early work, but intentionally lower emphasis.",

  // Where the link-preview card lives: the page head that carries the Open
  // Graph tags, and the static directory the image is published from.
  social: {
    "htmlFile": "public/index.html",
    "pageTitle": "Memory Card Quest",
    "staticDir": "public",
    "imageName": "og-image.jpg",
    "imageUrlPath": "/og-image.jpg"
  },

  // The icon set is rendered from favicon.svg by scripts/generate-app-icons.mjs.
  icons: {
    "background": "#2e1065",
    "themeColor": "#2e1065",
    "shortName": "Memory Quest"
  },

  media: {
    sourceDir: path.join(portfolioRoot, "public", "project-shots", "memory-card-quest", "latest"),
    publicPathPrefix: "/project-shots/memory-card-quest/latest",
    primaryProfile: "card"
  }
};
