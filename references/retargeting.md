# GLB/BVH retargeting

The starter maps target Hips/Spine/LeftFoot names to source Pelvis/Spine1/Left_ankle names. Inspect skinned meshes, parent hierarchy, rest/bind pose, units, forward axis, root transforms, materials and existing animation before adapting it. An unrigged model needs real rigging or an explicitly agreed alternative.

Load GLB with GLTFLoader, restore rest pose and save world rest quaternions. Clone skeletons independently with SkeletonUtils.clone. Build an explicit semantic map covering root, spine, head, shoulders, arms, hips, knees and ankles. Missing mapped bones must produce a useful error or a documented deliberate partial mapping, not silent sample assumptions.

After coordinate alignment use target world rotation = source current world rotation × inverse(source rest world rotation) × target rest world rotation, then inverse(target parent world rotation) to recover local rotation. Update parents before children. Forward axis and proportions still require visual calibration.

The sample merges three influence sets, keeps four strongest weights and normalizes them. Check actual attribute names/counts when adapting another model. Invalid indices, nonfinite/negative weights and zero total weights must be rejected or explicitly repaired, never silently accepted.

The sample uses horizontal travel scale 0.25, heights 1.95/1.65 and two stage positions. These are design defaults. Its lowest-foot grounding suppresses jumping: for jumping clips preserve root vertical motion and ground only during appropriate contact phases. Inspect penetration, floating, sliding and joint twists.

Inspect start, quarter, midpoint, three-quarter, end and extreme poses. Verify finite transforms, normalized weights and independent dancer skeletons. Numeric checks are not proof of visual quality.
