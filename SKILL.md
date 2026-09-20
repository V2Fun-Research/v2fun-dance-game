---
name: v2fun-dance-game
license: MIT
description: "Build or improve Audition-style browser dance rhythm games from video motion capture and rigged characters, using Three.js, direction sequences and beat-timed input. Use for playable dance games, character or motion replacement, stage design and requested deployment; not ordinary video editing, standalone animation or modeling from scratch."
---

# V2Fun Dance Game

Turn the user's video motion into a playable rhythm game. Reuse existing video, BVH, rigged GLB and website projects. All local 3D processing, animation and rendering use Three.js. This is an original game template inspired by a gameplay style, not an official Audition product.

## Guide a new user

Follow [onboarding and route selection](references/onboarding.md). When asked how to use the skill, briefly invite a dance video and a rigged character model, offer the bundled default video/model, and explain the embedded-animation route and optional hand capture. Do not require stage artwork or BPM from the user.

Identify new game, existing-game edit, or deployment. For new games, offer explicit choices: upload both inputs, upload one and use the other default, or use all defaults. Do not treat silence or a still-pending upload as choosing defaults. Once the user chooses defaults, proceed without requesting the same materials again.

Inspect uploaded models for actual skins, bones and animation clips. A rigged model without animation uses video motion capture or an existing BVH. A model with usable animation defaults to its own animation: request music or a video from which to use/extract audio. Do not submit that audio-source video for motion capture. If the user supplies both animated model and dance video with ambiguous intent, ask which motion to use; if several clips exist, ask which clip. An unrigged model needs replacement or the explicitly selected default; do not call it compatible automatically.

For new video capture, default to body-only capture (no independent hand/finger tracking). Offer optional hand capture with current body/hand credit estimates and the additional cost, then respect the user's choice. A missing hand preference leaves body-only selected; it does not authorize paid work. Verify current pricing, actual clip length, service rounding and available balance before new paid calls. Reuse existing authorization, task IDs and cumulative budget; never manufacture authorization or re-submit an uncertain task. Reuse matching existing captures before spending credits. Existing default capture may contain hand motion; reusing it incurs no new capture charge.

Analyze music timing and calibrate the chart. Briefly summarize chosen model, motion, music and any planned credits before execution. The stage is generated entirely in code with no logo/poster inputs. Do not call paid APIs or publish just to edit/audit this skill.

## Local package and defaults

Use [starter setup](references/starter.md) and [scaffold.py](scripts/scaffold.py). The package includes a bind-pose default GLB and the local default video's existing capture/animated derivative; see [default asset scope](references/default-assets.md). The example HTML is directly playable. Python scaffolding is offline and standard-library-only; no sibling setup skill is required. Motion capture has documented API guidance, not an integrated submission/recovery CLI. A scaffold is not proof that a newly uploaded model is correctly retargeted.

## Load only relevant guidance

- **Video to motion:** [motion capture](references/mocap.md). Reuse usable BVH. Preserve current authorization, saved task IDs and cumulative budgets. Offline cloud capture is not live browser tracking.
- **Character replacement or bad poses:** [retargeting](references/retargeting.md). Inspect the skeleton and adapt its explicit mapping; the sample is not universal auto-rigging.
- **Gameplay or stage changes:** [gameplay and visuals](references/gameplay-visuals.md). Validate actual input, timing and visible layout.
- **Delivery or deployment:** [verification and publishing](references/verify-publish.md). Use the current hosting integration and existing site configuration when appropriate; deployment requires the user's requested scope.

## Language and music defaults

Start the interface in English and provide a visible English/Chinese switch. Translate static labels, live judgments, countdown, errors and result text without resetting gameplay or audio. Attempt audible music playback on opening, using the source media as the idle preview clock. Browser policies may block unmuted autoplay: show an Enable sound control and retry on the first user interaction. Never claim audible autoplay is guaranteed. Starting a scored round resets the media and disables preview looping; pause and mute must continue to work.

## Acceptance

Load real motion, synchronize with audio, and verify direction input, timed hits, judgments, scoring, pause, results and restart. Label demo mode and exclude its scores from player records. Test touch controls, a narrow phone viewport and full-body visibility. Retain truthful verification and asset provenance outside the public build. Report a deployment URL only after successful completion.

Example requests:
- “Use this video and rigged GLB to make an Audition-style dance game.”
- “Restyle this game for a blue-white concert and improve its lights and opening camera.”
- “Replace the character, fix foot sliding and update the existing website.”
