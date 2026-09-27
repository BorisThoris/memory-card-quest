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
    "description": "A React and Redux memory game with 6, 8 or 10 pairs. Match named symbols, earn hearts back, use keyboard grid controls, and improve the best move count saved for each board size.",
    "tags": [
      "Game",
      "React",
      "Redux",
      "Archive"
    ],
    "accent": "#dec184",
    "deploymentUrl": "https://memory-card-quest-git.pages.dev/",
    "localUrl": "http://127.0.0.1:4512/",
    "buildCommand": "npm run build",
    "buildOutput": "build",
    "runCommand": "node scripts/serve-demo.cjs build 4512",
    "devPort": 4512,
    "showcaseTier": "more"
  },
  "capture": {
    "route": "/",
    "readySelector": ".quest-board",
    "actions": [
        {
            "type": "click",
            "target": {
                "selector": ".quest-card:first-child"
            }
        }
    ],
    "waitAfterReadyMs": 500
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
        "source": "local",
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
                "readySelector": ".quest-board",
                "actions": [],
                "waitAfterReadyMs": 500
        },
        "timeline": [
                {
                        "type": "click",
                        "target": {
                                "selector": ".quest-card:nth-child(1)"
                        },
                        "label": "Flip card 1"
                },
                {
                        "type": "wait",
                        "ms": 1100
                },
                {
                        "type": "click",
                        "target": {
                                "selector": ".quest-card:nth-child(2)"
                        },
                        "label": "Flip card 2"
                },
                {
                        "type": "wait",
                        "ms": 1100
                },
                {
                        "type": "click",
                        "target": {
                                "selector": ".quest-card:nth-child(3)"
                        },
                        "label": "Flip card 3"
                },
                {
                        "type": "wait",
                        "ms": 1100
                },
                {
                        "type": "click",
                        "target": {
                                "selector": ".quest-card:nth-child(4)"
                        },
                        "label": "Flip card 4"
                },
                {
                        "type": "wait",
                        "ms": 1100
                },
                {
                        "type": "click",
                        "target": {
                                "selector": ".quest-card:nth-child(5)"
                        },
                        "label": "Flip card 5"
                },
                {
                        "type": "wait",
                        "ms": 1100
                },
                {
                        "type": "click",
                        "target": {
                                "selector": ".quest-card:nth-child(6)"
                        },
                        "label": "Flip card 6"
                },
                {
                        "type": "wait",
                        "ms": 1100
                }
        ]
}
      }
    ]
  }
};
