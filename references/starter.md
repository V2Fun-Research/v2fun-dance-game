# Scaffold and runtime contracts

Run from the installed skill directory:

```sh
python3 scripts/scaffold.py /path/to/new-game --assets-dir /path/to/prepared-assets --three-dir /path/to/three-package --dancers 2
```

Python 3.9+ and Node.js 18+ are required for the supplied tools. Use a WebGL-capable browser. The destination must not exist. Omit asset/dependency paths to create source only; the command reports missing inputs and never uses the network, calls an API or deploys.

Prepared assets:

```text
source.mp4
avatar.glb
dancer.bvh
dancer-2.bvh
track.json
```

For the default BVH route, video must contain the desired audio. The GLB must be rigged and compatible with the adapted bone mapping. The second BVH is needed only with two dancers. The default blue-white concert stage is entirely procedural: abstract LED wall, vertical light bars, overhead beams and a reflective dark floor. No stage images, logo or posters are required. Adapt stage.js for requested visual changes; do not introduce stage-material requirements by default.

track.json example:

```json
{"title":"My track","duration":20.0,"bpm":120,"beatOffset":0.0}
```

Use actual media duration, positive finite BPM and finite nonnegative offset in seconds. The first hit (offset + four beats) must leave 0.45 seconds before the end. Calibrate by listening; these values are not universal. The starter assumes each BVH begins at media time zero and covers the track. Adapt sampling for different offsets using [motion capture](mocap.md). One or two dancers share one model; more dancers or different models require code changes.

Supply one consistent Three.js package containing build/three.module.js, build/three.core.js, examples/jsm and LICENSE. Three.js r180 is the license-reviewed version used to browser-test the default stage. No browser library is bundled. Character and full-game compatibility still require testing with actual inputs. Keep core and addons from the same package. Scaffolding copies addons and their notices; review additional dependencies if introducing new loaders. No separate setup skill is needed.

Modules: game.js handles input/state/media timing; avatar.js is a skeleton-specific retargeter; stage.js builds the stage; show.js supplies camera/lights/Bloom; index.html/style.css supply the game UI; i18n.js supplies English/Chinese text switching, defaulting to English on every opening.

From the generated project run `npm run build` and `npm start`. The local server listens on loopback port 4173 by default. The build uses an explicit public file list in public-files.json; add new public modules/assets there. It refuses existing dist output to avoid stale files or overwriting user work; inspect and move previous output before rebuilding. Do not add credentials, API logs, provenance records or signed URLs to that list. The build is static source, not a single-file offline example.

## Default and embedded-animation routes

After the user chooses the default materials, create a single-dancer project without any capture call:

```sh
python3 scripts/scaffold.py /path/to/default-game --use-defaults --three-dir /path/to/three-package
```

This copies the bundled video and animated default derivative, selects the embedded-animation adapter and preserves the original inputs. It needs no sibling skill or credentials. For a new user video, use assets/default.glb as the unanimated fallback and obtain/reuse that video's motion; never reuse the default dance as a substitute for the new video.

For a user-provided animated GLB with a prepared soundtrack video:

```sh
python3 scripts/scaffold.py /path/to/animated-game --assets-dir /path/to/prepared-assets --motion-source embedded --three-dir /path/to/three-package
```

Embedded mode requires source.mp4, avatar.glb and track.json, not BVH. It defaults to one dancer. Multiple animation clips require animationClip (index or exact name) in track.json. animationTiming is hold by default; loop or fit must reflect the user's agreed length-alignment choice. The bundled known default uses fit to map its captured duration to its corresponding video. Inspect rig, clip, orientation and floor alignment in the browser; an adapter cannot certify arbitrary uploads automatically.

For music-only inputs, adapt the media source/extension and hide original-video controls; the supplied scaffold's prepared-file convention remains source.mp4. Do not rename an audio file to pretend it is a video. Read onboarding.md for user-facing decisions before preparing assets.
