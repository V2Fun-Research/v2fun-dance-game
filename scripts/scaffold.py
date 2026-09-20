#!/usr/bin/env python3
"""Create a dance project without copying credentials or site bindings."""
import argparse, json, pathlib, shutil, math

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('destination', type=pathlib.Path)
    parser.add_argument('--assets-dir', type=pathlib.Path, help='Prepared media folder; see references/starter.md')
    parser.add_argument('--three-dir', type=pathlib.Path, help='Three.js package root containing build and examples/jsm')
    parser.add_argument('--dancers', type=int, choices=[1, 2], default=None)
    parser.add_argument('--use-defaults', action='store_true', help='Use bundled video and animated default character; no API calls')
    parser.add_argument('--motion-source', choices=['bvh', 'embedded'], default=None)
    args = parser.parse_args()
    skill = pathlib.Path(__file__).resolve().parents[1]
    if args.use_defaults:
        if args.assets_dir or args.motion_source == 'bvh' or args.dancers == 2:
            parser.error('--use-defaults uses its own assets, embedded animation and one dancer')
        args.assets_dir = skill / 'assets/defaults'
        args.motion_source = 'embedded'
    args.motion_source = args.motion_source or 'bvh'
    args.dancers = args.dancers if args.dancers is not None else (1 if args.motion_source == 'embedded' else 2)
    dest = args.destination.resolve()
    if dest.exists():
        parser.error('Destination exists; choose a new directory. Existing projects must be edited in place.')
    required = ['source.mp4', 'avatar.glb', 'track.json']
    if args.motion_source == 'bvh':
        required.append('dancer.bvh')
    if args.dancers == 2 and args.motion_source == 'bvh':
        required.append('dancer-2.bvh')
    if args.assets_dir:
        for name in required:
            if not (args.assets_dir / name).is_file():
                parser.error('Missing asset: ' + name)
        try:
            track = json.loads((args.assets_dir / 'track.json').read_text())
        except (ValueError, OSError) as exc:
            parser.error('Invalid track.json: ' + str(exc))
        if not isinstance(track, dict):
            parser.error('track.json must be an object')
        for name in ['duration', 'bpm']:
            if type(track.get(name)) not in (int, float) or not math.isfinite(track[name]) or track[name] <= 0:
                parser.error('track.json requires positive ' + name)
        if type(track.get('beatOffset')) not in (int, float) or not math.isfinite(track['beatOffset']) or track['beatOffset'] < 0 or not isinstance(track.get('title'), str) or not track['title'].strip():
            parser.error('track.json requires a finite nonnegative beatOffset and nonempty title')
        if track['beatOffset'] + 240 / track['bpm'] >= track['duration'] - .45:
            parser.error('Track is too short for the first four-beat round')
    if args.three_dir:
        for name in ['build/three.module.js', 'build/three.core.js', 'examples/jsm', 'LICENSE']:
            if not (args.three_dir / name).exists():
                parser.error('Invalid Three.js package: missing ' + name)
    template = pathlib.Path(__file__).resolve().parents[1] / 'assets/starter'
    shutil.copytree(template, dest)
    (dest / '.gitignore').write_text('node_modules/\ndist/\n.env*\n.DS_Store\n')
    if args.assets_dir:
        for name in required:
            target = dest / 'assets' / name
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(args.assets_dir / name, target)
    if args.three_dir:
        vendor = dest / 'vendor'
        vendor.mkdir()
        for name in ['three.module.js', 'three.core.js']:
            shutil.copy2(args.three_dir / 'build' / name, vendor / name)
        shutil.copy2(args.three_dir / 'LICENSE', vendor / 'LICENSE')
        shutil.copytree(args.three_dir / 'examples/jsm', vendor / 'addons')
    if args.motion_source == 'embedded':
        shutil.copy2(template / 'animated-avatar.js', dest / 'avatar.js')
        game = dest / 'game.js'
        text = game.read_text().replace("const data=await new BVHLoader().loadAsync(file),avatar=await createCapturedAvatar(data,index,scene)", "const avatar=await createCapturedAvatar(null,index,scene)")
        game.write_text(text.replace("import { BVHLoader } from 'three/addons/loaders/BVHLoader.js';\n", ''))
    if args.dancers == 1:
        game = dest / 'game.js'
        game.write_text(game.read_text().replace(",dancer('assets/dancer-2.bvh',1)", ''))
    public_files = ['index.html', 'style.css', 'game.js', 'stage.js', 'avatar.js', 'show.js', 'i18n.js']
    public_files += ['assets/' + name for name in required]
    if args.three_dir:
        public_files += [x.relative_to(dest).as_posix() for x in sorted((dest / 'vendor').rglob('*')) if x.is_file()]
    (dest / 'public-files.json').write_text(json.dumps(public_files, indent=2) + '\n')
    missing = [name for name in required if not (dest / 'assets' / name).is_file()]
    print(json.dumps({'project': str(dest), 'missing_assets': missing,
        'three_ready': (dest / 'vendor/three.module.js').exists(),
        'motion_source': args.motion_source, 'used_defaults': args.use_defaults,
        'next': 'Inspect bone mapping, calibrate track, then build and browser-test. No site was published.'}, ensure_ascii=False, indent=2))

if __name__ == '__main__':
    main()
