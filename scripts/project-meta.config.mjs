// Metadata inputs for this repository - unique to react-redux-memory-card-game.
//
// Everything here is curated by hand: identity, commands, the screenshot recipe
// (capture), the recorded trailer (trailers.items, kind: capture) and where the
// card, icons and trailers are published. scripts/generate-project-meta.mjs
// derives the rest into project.meta.json; scripts/project-media.test.mjs
// checks that everything here was actually produced.
//   npm run meta:refresh   trailers -> shots -> social -> icons -> meta
//   npm run test:media     the media contract

import path from 'node:path';

const portfolioRoot = process.env.PORTFOLIO_ROOT ?? String.raw`C:\Users\Gaming PC\Desktop\Repos\portfolio`;

export default {
  "slug": "memory-card-quest",
  "classification": "web-app",
  "curated": {
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
  "capture": {
    "route": "/",
    "actions": [
      {
        "type": "click",
        "target": {
          "role": "button",
          "name": "New game"
        },
        "label": "start a new game",
        "optional": true
      },
      {
        "type": "click",
        "target": {
          "selector": "[class*=card]"
        },
        "label": "flip the first card"
      },
      {
        "type": "wait",
        "ms": 500
      }
    ],
    "waitAfterReadyMs": 600
  },
  "scores": {
    "priorityScore": 55,
    "demoabilityScore": 68,
    "depthScore": 52,
    "polishScore": 54,
    "uniquenessScore": 52,
    "maintenanceScore": 48
  },
  "analysisNotes": "Small React/Redux memory game; demoable and useful as early work, but intentionally lower emphasis.",
  "social": {
    "htmlFile": "public/index.html",
    "pageTitle": "Memory Card Quest",
    "staticDir": "public",
    "imageName": "og-image.jpg",
    "imageUrlPath": "/og-image.jpg"
  },
  "icons": {
    "background": "#2e1065",
    "themeColor": "#2e1065",
    "shortName": "Memory Quest"
  },
  "media": {
    "sourceDir": path.join(portfolioRoot, "public", "project-shots", "memory-card-quest", "latest"),
    "publicPathPrefix": "/project-shots/memory-card-quest/latest",
    "primaryProfile": "card"
  },
  "trailers": {
    "items": [
      {
        "id": "tour",
        "title": "Memory Card Quest: flip, match, keep your lives",
        "kind": "capture",
        "inputs": [
          "src",
          "public/index.html"
        ],
        "source": "deployment",
        "music": "project-media/music/tour.m4a",
        "posterAt": 0.5,
        "recipe": {
          "route": "/",
          "viewport": {
            "width": 1280,
            "height": 720
          },
          "durationMs": 20000,
          "setup": {
            "actions": [
              {
                "type": "click",
                "target": {
                  "role": "button",
                  "name": "New game"
                },
                "label": "start a new game",
                "optional": true
              }
            ],
            "waitAfterReadyMs": 800
          },
          "timeline": [
            {
              "type": "click",
              "target": {
                "selector": "[class*=card]:nth-child(1)"
              },
              "label": "card 1",
              "optional": true
            },
            {
              "type": "wait",
              "ms": 900
            },
            {
              "type": "click",
              "target": {
                "selector": "[class*=card]:nth-child(6)"
              },
              "label": "card 6",
              "optional": true
            },
            {
              "type": "wait",
              "ms": 1600
            },
            {
              "type": "click",
              "target": {
                "selector": "[class*=card]:nth-child(3)"
              },
              "label": "card 3",
              "optional": true
            },
            {
              "type": "wait",
              "ms": 900
            },
            {
              "type": "click",
              "target": {
                "selector": "[class*=card]:nth-child(9)"
              },
              "label": "card 9",
              "optional": true
            },
            {
              "type": "wait",
              "ms": 1600
            },
            {
              "type": "click",
              "target": {
                "selector": "[class*=card]:nth-child(2)"
              },
              "label": "card 2",
              "optional": true
            },
            {
              "type": "wait",
              "ms": 900
            },
            {
              "type": "click",
              "target": {
                "selector": "[class*=card]:nth-child(11)"
              },
              "label": "card 11",
              "optional": true
            },
            {
              "type": "wait",
              "ms": 1600
            },
            {
              "type": "click",
              "target": {
                "selector": "[class*=card]:nth-child(5)"
              },
              "label": "card 5",
              "optional": true
            },
            {
              "type": "wait",
              "ms": 900
            },
            {
              "type": "click",
              "target": {
                "selector": "[class*=card]:nth-child(8)"
              },
              "label": "card 8",
              "optional": true
            }
          ]
        }
      }
    ]
  }
};
