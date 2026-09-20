# Onboarding and route selection

## First response

Invite the user to upload a dance video and a rigged character model. Offer default video and default character so they can try the game without uploading. If the model already contains animation, request music or a video containing the desired soundtrack. Explain body-only capture as the default and optional hand capture with a live credit estimate only when new capture is needed.

An example first-use message, localized to the user's language: “Upload a dance video and rigged character, or choose our default video and character. If your model already has animation, also supply music or a video for its soundtrack. New video capture defaults to body motion; I will show the estimated credits and offer hand capture before a paid call.”

## Routing table

| Input / explicit choice | Model | Motion | Music |
| --- | --- | --- | --- |
| Use all defaults | Bundled default character | Reuse its existing captured animation | Default video soundtrack |
| Video only, accept default model | assets/default.glb | Reuse matching capture or obtain new capture | Uploaded video soundtrack |
| Rigged, unanimated model only, accept default video | Uploaded model | Retarget bundled default BVH; inspect skeleton first | Default video soundtrack |
| Video plus rigged, unanimated model | Uploaded model | Reuse matching capture or obtain new capture | Uploaded video soundtrack |
| Animated model | Uploaded model | Selected embedded clip | Request music or a video for audio |
| Animated model plus dance video | Uploaded model | Clarify embedded clip versus newly captured video motion unless already specified | Selected soundtrack |

Do not overwrite provided media with defaults silently. A partial upload is not yet an instruction to proceed while the user is still choosing. Once default selection is explicit, do not ask for the missing upload again. If users explicitly request default music for an animated model, use it; otherwise request their soundtrack instead of silently choosing one.

## Model inspection

Inspect GLB skins, joint hierarchy, mesh weights, animations and durations. Report missing binding with an actionable choice: upload a rigged model or use the default. Do not claim automatic rigging. List multiple animation clips for selection; a single usable clip can be selected without another question. Files with invalid/empty tracks do not qualify as usable animation. The supplied scaffold handles GLB; other formats need a verified conversion/adaptation, not a renamed extension.

## Audio and alignment

Check that the chosen video actually has an audio stream. Music-only inputs can drive the existing media element once its source, MIME handling and public manifest are adapted; hide the original-video panel for audio-only media. Preserve source audio quality when extraction is needed. A music-source video does not trigger motion capture.

Compare animation/music length. Explain consequential mismatch and choose trimming, animation looping or agreed speed fitting. Do not silently stretch an arbitrary character performance. Analyze BPM/offset from the audio, verify synchronization and disclose automatic estimates. The user need not supply technical beat metadata.

## Capture choice and credits

Reuse matching input hashes, selected segment and required person first. Before new capture show body-only estimate, body-plus-hands estimate, difference, selected duration and current pricing source. Default to body-only unless hands are explicitly chosen. Check whether the target rig has usable finger joints before offering a visible hand improvement. Body-only capture should leave fingers in a neutral/rest pose rather than inventing tracked motion.

Do not hardcode prices or an account balance. If current rates or billing granularity are unavailable, state what is unknown; do not invent an exact charge. Distinguish proportional estimate, conservative budget and actual cost. If separate paid retargeting is needed, quote it separately. Existing authorization applies within its scope; additional cost beyond it needs a current user decision.

Before executing, summarize model, motion source, soundtrack, hand option and planned paid calls. Reuse task IDs and budget records on resume. Unknown submission outcome is not a reason to pay again.

## Output defaults

Procedural blue-white stage, English-first UI with Chinese switch, attempted audible opening playback with interaction fallback, direction sequences and timed hits, easy/challenge/demo modes and touch controls. Deliver the requested HTML/source with actual verification and cost outcome. Deployment is a separate requested action, not implied by local game creation.
