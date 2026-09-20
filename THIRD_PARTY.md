# Licenses and external components

The skill instructions and starter code are maintained by V2Fun Team and distributed under MIT; see LICENSE. The starter has no bundled browser library. The package includes the user-selected default GLB, default video and existing captured BVH/animated derivative under assets/default.glb and assets/defaults/. The single-file example embeds Three.js, the user-supplied video/audio and the default character with previously captured body/finger motion.

| Component | Distribution | License / source |
| --- | --- | --- |
| Three.js core and addons | External starter runtime; r180 is also embedded in example/index.html with example/THREE-LICENSE.txt | MIT; reference reviewed: [r180 LICENSE](https://github.com/mrdoob/three.js/blob/r180/LICENSE) |
| Python and Node.js | External runtimes, not redistributed here | Their upstream distributions retain their own licenses |
| V2Fun logos | Documentation-only V2Fun publication branding; not used on the game stage | Trademark/brand rights remain with their owners; MIT is not a trademark grant |
| Video, music, rigged GLB and BVH | User-supplied task inputs; the example and default-material folders include video/audio, default character and its captured motion | Verify rights for each intended distribution |

Scaffolding preserves the supplied Three.js LICENSE and embedded addon notices. If a different version or additional loader/decoder is introduced, review that actual distribution and required notices. License inspection is not runtime compatibility testing.

Motion capture requires separate V2Fun service access and potentially credits. Software licensing does not grant service access or rights to uploaded/generated assets. The game is independently implemented; it does not bundle Audition source, logos or music or imply endorsement.

The example default character is derived from the user-selected default.glb in V2Fun Animation. Its geometry and rig are preserved; its baked capture is not a prerecorded substitute for the supplied video. The character and supplied media are excluded from this package's MIT grant. Third-party redistribution rights have not been established; do not infer public-distribution rights from inclusion in this local example.
