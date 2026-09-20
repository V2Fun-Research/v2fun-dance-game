# Video motion capture

Prefer existing BVH. First run `python3 scripts/v2fun.py region --project /path/to/project` and follow [server routing](server-routing.md). The bundled client resolves CN/global servers; use `Client.binding()` in every saved task and quote. This package documents a historical V2Fun API shape used in September 2026; it does not ship a submit command or certify the current service contract. Verify the current official contract or an available maintained client before a new paid call. Do not require a sibling setup skill.

Historical request:

```http
POST {verified_base_url}/videos/motion_detections
Authorization: Bearer <V2FUN_API_KEY from the execution environment>
Content-Type: application/json
```

```json
{"model":"turbo","input_video":"data:video/mp4;base64,<task video>","start_time_seconds":0,"duration_seconds":19.6,"options":{"block":false}}
```

After receiving task_uuid, query GET /api/v1/videos/motion_detections/{task_uuid} on the same host. Historical terminal states are COMPLETED and FAILED. Inspect metadata.motions for bvh_path, person/segment times and frame ranges, and metadata.downloads for asset_path and download_url. Do not assume a single person or full-length coverage. Refresh expired links by querying the original task.

Read actual media duration and plan only necessary clips under current user authorization and the existing cumulative budget. Before submission save input hash, segment bounds, parameters, authorization scope and submitting state outside the publishable directory. Persist the task ID immediately. A timeout without an ID is an uncertain submission: reconcile it before another POST. Resume tasks with IDs instead of paying again. Poll with a finite deadline and bounded backoff; preserve resumable state on timeout, failure or budget exhaustion.

Keep keys in the execution environment, never browser code. Keep signed URLs and API responses in private task records; publish downloaded static BVH only within the permitted asset scope. Validate response status, size, BVH header/frame count and actual BVHLoader loading. A completed service task alone does not prove useful motion.

Use media currentTime as the master clock. Sample each person's BVH at media time minus that segment's start, clamped to its duration; explicitly handle gaps and different people. Obtain BPM and beat offset from audio analysis or the user and verify by listening. Do not reuse a historical tempo for unrelated music.

## Body and hand choice

Default NEW capture to body-only, with neutral/rest fingers. Offer body-plus-hands and display both current credit estimates plus the additional cost. Check finger bones before promising visible hand tracking. The historical turbo request above illustrates body capture; advanced hand capture historically used pro. Verify the current provider schema and rates before selecting a model; do not invent a hands=true parameter or hardcode a rate. Verify actual video segment duration, applicable billing granularity, balance and authorization. If no hand preference is supplied, retain body-only, but never treat that silence as authorization to spend. Existing matching captures, including the bundled default capture, are reused without a new paid submission. For an animated model with music-source video, do not invoke this route unless the user chose video motion over embedded animation.

For manual capture submission, construct Client with the saved server binding, not an unbound default. Preserve that binding when refreshing signed downloads or adapting motion. The client does not implement capture authorization, quoting, or task recovery for you; retain the safeguards above.
