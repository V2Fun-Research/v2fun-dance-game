# Gameplay and stage

Enter a direction sequence, then press Space in the timing zone. This is not a falling-note track. Easy uses three directions; challenge uses four or five. Defaults are PERFECT ±75 ms and GOOD ±230 ms (easy) or ±140 ms (challenge), adjustable original design values rather than official Audition rules. Wrong directions reset the sequence, early Space allows retry, each group scores once and misses break the combo.

Cover loading, idle, countdown, starting, playing, paused and result states. Use media currentTime, not frame accumulation. Pause/resume the intro clock separately, pause in the background, and provide recovery for blocked playback. Restart clears judgments, combo and media time. Demo mode must not write player records; separate records by track and mode.

Generate charts from measured BPM/offset with an end judgment margin. Short loops and multiple-person segments require explicit seam handling. Derive title, duration and dancer count from actual inputs.

The default stage follows a blue-white live-performance reference: dark trusses, cool spotlights, vertical side bars, an abstract diagonal LED wall and a reflective dark floor. Generate all stage geometry and screen graphics in code. No logos, posters, brand screen images or other stage uploads are required. Keep the dancer visually dominant and avoid reproducing the reference person or embedding the reference photo. The floor uses a 512-pixel planar reflection; reduce reflection resolution or disable it on constrained devices after checking performance.

Reserve full-body space before sizing HUD and camera. Keep touch directions and timing input usable on phones, short screens, landscape and tablets. Hiding overflow alone is not layout validation. The opening may use a roughly five-second aerial move and countdown. Show real combo progress and avoid fabricated opponent scores.

Use one Three.js version for EffectComposer, RenderPass, UnrealBloomPass and OutputPass. Tune exposure/color management before bloom to preserve character detail. Beams are visual effects, not physically volumetric shadows. Prefer brief hit rings over intense screen flashes. Respect prefers-reduced-motion; reduce camera travel, beam motion and pulses. Adjust pixel ratio, particles, shadows and bloom to observed device performance, and judge screenshots rather than parameter values.

The UI defaults to English and offers a visible Chinese/English switch, including live gameplay and results. On opening, attempt unmuted media playback as an idle preview and synchronize the character to that media time. If browser autoplay is blocked, expose Enable sound and retry after an interaction. Do not auto-start a scored round. Starting a round resets the media; idle looping must be disabled during scoring. Language switching must preserve current time, score and pause state.
