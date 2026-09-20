<div align="center">

<a href="https://v2fun.ai/">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/logo-dark.svg" />
    <img src="assets/logo.svg" width="250" height="100" alt="V2Fun" />
  </picture>
</a>

# V2Fun Dance Game

**Make an Audition-style dance rhythm game from video and a rigged character**

Direction sequences, beat-timed hits and a customizable Three.js stage.

[English](./README.md) | [简体中文](./README.zh-CN.md)

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version: 0.1.0](https://img.shields.io/badge/version-0.1.0-green.svg)](#roadmap)
[![Runtime: Three.js](https://img.shields.io/badge/runtime-Three.js-000000.svg)](https://threejs.org/)
[![Tooling: Python 3.9+ stdlib](https://img.shields.io/badge/tooling-Python%203.9%2B%20stdlib-3776AB.svg)](scripts)
[![Sponsor: V2Fun](https://img.shields.io/badge/Sponsor-V2Fun-16161A.svg)](https://v2fun.ai/)
[![Discord](https://img.shields.io/badge/Discord-Join%20Community-5865F2?logo=discord&logoColor=white)](https://discord.com/invite/2uBMRp275u)

</div>

---
## Live demos

| Demo | Description | View |
| --- | --- | --- |
| Default Character Dance Game | Blue-white concert stage, Easy/Challenge/Demo modes and original audio | [View](example/index.html) |

## What it does

Build or improve browser dance games with keyboard and touch input, easy/challenge/demo modes, score/combo judgments, restart and a procedural blue-white concert stage requiring no logo, posters or stage images. Reuse existing captures and adapt a rigged character to BVH motion. The game opens in English and includes a Chinese/English switch.

The starter supports one or two dancers sharing a model. It is a skeleton-specific starting point, not automatic rigging or universal retargeting. Video editing, standalone animation and modeling from scratch are outside scope.

## How it works

1. Inspect the existing project and authorized media, rigged model and motion.
2. Reuse BVH or obtain motion capture under current service authorization.
3. Adapt bone mapping, motion offsets, BPM and beat offset.
4. Customize the stage and validate real gameplay on desktop and phone.
5. Deliver source and static build; deploy only when requested.

[Motion capture](references/mocap.md) documents an API workflow, not an integrated submit command. No sibling setup skill is required.

## Quick start

### Choose your inputs

Ask: “Use $v2fun-dance-game to make a dance game.” Upload a dance video and a rigged character, or explicitly choose the default video/model. Uploading only one input lets you choose the other default. Stage images and BPM are not required.

If the character already has animation, select its clip and provide music or a video for its soundtrack. That route does not call video motion capture. If both an animated model and dance video are supplied, clarify which motion to use. For mismatched music/animation lengths, agree on trimming, looping or speed fitting.

New video capture defaults to body-only, without independent finger tracking. Before a paid call, the assistant offers optional hand capture and shows current body/hand credit estimates and the difference. Existing matching results and the bundled default capture are reused without a new capture charge. See [onboarding](references/onboarding.md) and [default materials](references/default-assets.md).

To initialize the bundled defaults after choosing them:

```sh
python3 scripts/scaffold.py /path/to/default-game --use-defaults --three-dir /path/to/three-package
```

Install the folder at `~/.codex/skills/v2fun-dance-game/`, or inside the custom `CODEX_HOME` skills directory, with SKILL.md directly inside. Replace the old v2fun-dance installation to avoid duplicates; preserve existing game projects, task IDs and budgets.

Use Python 3.9+, Node.js 18+, one consistent Three.js package and a WebGL browser. The starter still requires a supplied Three.js package; the existing single-file example embeds its runtime. Run from the skill folder:

```sh
python3 scripts/scaffold.py /path/to/new-game --assets-dir /path/to/prepared-assets --three-dir /path/to/three-package --dancers 2
cd /path/to/new-game
npm run build
npm start
```

Invoke `$v2fun-dance-game` with your video, rigged character and any existing BVH; describe the game and intended delivery. Prepared inputs and skeleton limitations are documented in [starter setup](references/starter.md) and [retargeting](references/retargeting.md).

Omitting the two asset/dependency options creates source only and reports missing files. Existing destinations are rejected. Builds reject existing dist output; inspect and move the previous output before rebuilding. Incompatible bones require adapting the mapping.

Local scaffolding requires no key or paid call. New V2Fun capture needs current authorization, service credits and V2FUN_API_KEY in the execution environment. Save and resume task IDs; do not repeat an uncertain submission. The included example reuses an existing capture; no new paid capture was needed.

## What you get

| Output | Contents and acceptance |
| --- | --- |
| Source project | Editable gameplay, stage, character adapter and UI |
| Static build | Files explicitly listed in public-files.json, after required inputs are supplied |
| Optional deployment | An actual URL only after requested deployment succeeds |

A source scaffold alone does not establish correct motion, synchronization or a playable game. See [verification](references/verify-publish.md).

## Roadmap

### v0.1.0

Private repository package with direction-sequence gameplay, three modes, stage effects, explicit public build files and input/skeleton checks. This is not a tagged GitHub Release. See the included example for supported controls and known timing/grounding limits.

## Star history

This repository is private; public star-history data is unavailable.

[![Star History](https://api.star-history.com/svg?repos=V2Fun-Research/v2fun-dance-game&type=Date)](https://github.com/V2Fun-Research/v2fun-dance-game)

## Sponsors

<a href="https://v2fun.ai/"><img src="assets/sponsors/v2fun-square.png" width="96" height="96" alt="V2Fun" /></a>

V2Fun supports the development of this dance-game workflow and its reusable stage template. The skill connects a creator’s supplied video, rigged character and captured motion with editable browser gameplay. Its focus is practical control over timing, character adaptation, stage presentation and delivery. Existing assets can be reused, and local preparation does not require a paid service call. Remote motion capture is a separate service with its own access and credit requirements. Creators retain responsibility for choosing materials they may use and for checking the finished experience on the devices they intend to support.

Maintainer: V2Fun Team · [Feedback on Discord](https://discord.com/invite/2uBMRp275u).

## Acknowledgments

Thanks to [Three.js and its contributors](https://github.com/mrdoob/three.js) for the renderer, loaders and postprocessing APIs used by generated games. README presentation follows the V2Fun publication template, inspired by [img2threejs](https://github.com/img2threejs/img2threejs). No endorsement is implied.

## License

[MIT License](LICENSE)<br>
Copyright © 2026 V2Fun Team.

See [third-party and asset scope](THIRD_PARTY.md). MIT covers the project code and documentation, not trademarks, service credits or third-party media rights. This is not an official Audition product.
