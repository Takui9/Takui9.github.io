#!/usr/bin/env python3
"""Build the homepage's first-author research reel with FFmpeg.

Usage: python3 scripts/build_research_media.py /path/to/source-clips
Set FFMPEG if ffmpeg is not on PATH. See HOMEPAGE.md for source provenance.
"""
import argparse
import json
import os
import re
from pathlib import Path
import shutil
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
# All shots have the same presentation: 1280x720, square pixels, 30fps, 1x speed.
SHOTS = [
    dict(name='grass', start=29, duration=9, label='Grass & natural turns',
         kicker='Animal motion priors', caption='Natural movement, adapted to the outdoors.'),
    dict(name='stairs', start=12, duration=12, label='Continuous stairs',
         kicker='Animal motion priors', caption='Continuous climbing across stair flights.'),
    dict(name='navigation1', start=30, duration=12, label='Local navigation',
         kicker='Animal motion priors', caption='Navigate around obstacles and across blocks.'),
    dict(name='climb1', start=0.3, duration=10, label='Climb up & down',
         kicker='Human motion priors', caption='Climb up. Coordinate the body. Climb down.'),
    dict(name='climb2', start=0.3, duration=13.5, label='Climb & reorient',
         kicker='Human motion priors', caption='Climb, reorient, and descend.'),
    dict(name='mixed1', start=1, duration=24, label='Mixed terrain',
         kicker='Human motion priors', caption='Whole-body coordination across mixed terrain.'),
]


# GPT-6 Astra selected these windows from full-source chronological reviews,
# then refined endpoints at 0.5-second spacing. Preserve original 1x speed.
# The full reel remains independent of these action-based short selections.
TEASER_SHOTS = [
    SHOTS[0] | dict(start=0, duration=4.5, label='Walking on grass',
        caption='Natural walking on uneven ground.',
        reason='Early straight walking extended by two seconds, including re-emergence from vegetation before the later reversal.'),
    SHOTS[1] | dict(name='stairs-short', start=12, duration=6.5,
        label='Two-step traversal',
        caption='Walk down two steps, turn, and climb back up.',
        reason='Selected after comparing four complete cycles: descent, compact ground turn, and a more direct ascent with continuous successive foot placements. Ends on the upper landing before the next turn; avoids the rejected side-on repositioning at source 24–25 seconds.'),
    SHOTS[2] | dict(name='navigation2', start=14.5, duration=6,
        reason='Close, unobscured approach, block traversal, and clean foreground exit; avoids the source dissolve.'),
    SHOTS[3] | dict(start=1, duration=7.5,
        reason='Complete ascent, descent, and initial grounded recovery; stops at source 8.5 seconds before corrective foot movement and backward rocking at about 8.6–9.1 seconds.'),
    SHOTS[4] | dict(start=1, duration=11,
        reason='Complete ascent, on-box reorientation, and descent, with no idle walking tail.'),
    SHOTS[5] | dict(start=6.5, duration=11.5,
        caption='Climb the stairs. Jump down. Climb again.',
        reason='First stair ascent, jump down, and second-box climb; cuts immediately after rising onto the box, before the backward-leaning top walk and final descent.'),
]
# Opening poster shows the unobstructed early grass walk at source time 0.5s.
TEASER_POSTER_TIME = 0.5


def following_curve(points):
    """Cubic Hermite curve with continuous velocity, in FFmpeg expression syntax.

    Control points are manually checked against the robot in the original frames.
    Times are relative to the mixed-terrain shot; positions are crop top-lefts.
    """
    slopes = []
    for i, (time, value) in enumerate(points):
        left = max(0, i - 1)
        right = min(len(points) - 1, i + 1)
        slopes.append((points[right][1] - points[left][1]) /
                      (points[right][0] - points[left][0]))
    expression = str(points[-1][1])
    for i in reversed(range(len(points) - 1)):
        t0, v0 = points[i]
        t1, v1 = points[i + 1]
        span = t1 - t0
        u = f'((t-{t0})/{span})'
        poly = (f'((2*{u}^3-3*{u}^2+1)*{v0}'
                f'+({u}^3-2*{u}^2+{u})*{span}*{slopes[i]}'
                f'+(-2*{u}^3+3*{u}^2)*{v1}'
                f'+({u}^3-{u}^2)*{span}*{slopes[i + 1]})')
        expression = f'if(lt(t,{t1}),{poly},{expression})'
    return expression


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('sources', type=Path)
    parser.add_argument('--teaser-only', action='store_true',
                        help='Preserve the approved full reel and chapter previews.')
    args = parser.parse_args()
    ffmpeg = os.environ.get('FFMPEG') or shutil.which('ffmpeg')
    if not ffmpeg:
        parser.error('Install ffmpeg or set FFMPEG to its executable path.')
    sources = args.sources.resolve()
    required_shots = TEASER_SHOTS if args.teaser_only else SHOTS + TEASER_SHOTS
    for shot in required_shots:
        if not (sources / (shot['name'] + '.mp4')).is_file():
            parser.error(f"Missing {shot['name']}.mp4")
    videos = ROOT / 'assets/video'
    images = ROOT / 'assets/img'
    videos.mkdir(exist_ok=True)

    def run(*arguments):
        subprocess.run([ffmpeg, '-hide_banner', '-loglevel', 'error', '-y',
                        *map(str, arguments)], check=True)

    # A 2x following crop (960x540 from 1920x1080) keeps the G1 legible.
    # Hermite interpolation avoids abrupt camera changes; clamps respect edges.
    x = following_curve([(0, 0), (3.3, 0), (6.5, 260), (9.7, 454),
                         (12.9, 645), (16.1, 895), (19.3, 960), (24, 960)])
    y = following_curve([(0, 420), (3.3, 420), (6.5, 375), (9.7, 310),
                         (12.9, 420), (16.1, 365), (19.3, 350), (24, 420)])
    climb_x1 = following_curve([(0, 384), (3, 384), (5, 280), (7, 80), (10, 0)])
    climb_x2 = following_curve([(0, 0), (1.5, 0), (4, 100), (7, 280), (10, 384), (13.5, 384)])
    filters = {
        'grass': '[0:v]scale=1280:720,setsar=1[v]',
        'stairs-short': '[0:v]scale=1280:720,setsar=1[v]',
        # Original 1080x1080 has baked white margins around a 664px portrait.
        # Use the actual portrait once as foreground and a soft fill behind it.
        'stairs': ('[0:v]crop=664:1080:208:0,split=2[front][back];'
                   '[back]scale=1280:720:force_original_aspect_ratio=increase,'
                   'crop=1280:720,gblur=sigma=35,eq=brightness=-0.12[bg];'
                   '[front]scale=-2:720[fg];'
                   '[bg][fg]overlay=(W-w)/2:0,setsar=1[v]'),
        'navigation1': '[0:v]crop=1600:900:100:80,scale=1280:720,setsar=1[v]',
        # Remove original title/speed banners and the bottom explanatory label.
        'climb1': f"[0:v]crop=1536:864:x='clip({climb_x1},0,384)':y=112,scale=1280:720,setsar=1[v]",
        'climb2': f"[0:v]crop=1536:864:x='clip({climb_x2},0,384)':y=112,scale=1280:720,setsar=1[v]",
        'mixed1': f"[0:v]crop=960:540:x='clip({x},0,960)':y='clip({y},110,540)',scale=1280:720:flags=lanczos,setsar=1[v]",
    }
    # Camera keyframes are anchored to original source time, even when a new
    # action window starts elsewhere. This prevents the crop restarting mid-path.
    crop_origins = {'climb1': 0.3, 'climb2': 0.3, 'mixed1': 1}
    filters['navigation2'] = '[0:v]scale=1280:720,setsar=1[v]'

    def filters_for(shot):
        value = filters[shot['name']]
        if shot.get('crop'):
            value = f"[0:v]crop={shot['crop']},scale=1280:720,setsar=1[v]"
        if shot['name'] in crop_origins:
            offset = shot['start'] - crop_origins[shot['name']]
            value = re.sub(r'\bt\b', f'(t+{offset})', value)
        return value

    with tempfile.TemporaryDirectory(prefix='research-reel-') as temporary:
        temp = Path(temporary)

        def build_cut(shots, name):
            cue_data = []
            reel_time = 0
            paths = []
            for index, shot in enumerate(shots):
                output = temp / f'{name}-{index}.mp4'
                run('-ss', shot['start'], '-i', sources / (shot['name'] + '.mp4'),
                    '-t', shot['duration'], '-filter_complex', filters_for(shot),
                    '-map', '[v]', '-an', '-r', 30, '-c:v', 'libx264', '-preset', 'medium',
                    '-crf', 23, '-pix_fmt', 'yuv420p', '-video_track_timescale', 15360,
                    '-movflags', '+faststart', output)
                cue_data.append({key: shot[key] for key in ('label', 'kicker', 'caption')} |
                                dict(start=reel_time, duration=shot['duration'], source=shot['name'],
                                     source_start=shot['start'],
                                     source_end=shot['start'] + shot['duration'],
                                     selection_reason=shot.get('reason', 'Approved full-length action.')))
                reel_time += shot['duration']
                paths.append(output)
                print(f"Encoded {name}/{shot['name']}: {shot['start']}–{shot['start'] + shot['duration']}s", flush=True)
            manifest = temp / f'{name}-concat.txt'
            manifest.write_text(''.join(f"file '{path}'\n" for path in paths))
            run('-f', 'concat', '-safe', 0, '-i', manifest, '-c', 'copy',
                '-movflags', '+faststart', videos / f'{name}.mp4')
            (videos / f'{name}-cues.json').write_text(json.dumps(cue_data, indent=2) + '\n')
            return paths, reel_time

        if not args.teaser_only:
            full_paths, full_time = build_cut(SHOTS, 'research-reel-full')
            shutil.copyfile(full_paths[0], videos / 'animal-adaptation.mp4')
            shutil.copyfile(full_paths[3], videos / 'human-adaptation.mp4')
            shutil.copyfile(full_paths[5], videos / 'mixed-terrain-tracked.mp4')
        _, short_time = build_cut(TEASER_SHOTS, 'research-teaser')
    # Keep the homepage duration label synchronized with the generated edit.
    (ROOT / '_data/reel.yml').write_text(f'duration: {short_time:g}\n')
    for video, poster, time in (
        ('research-teaser', 'research-teaser', TEASER_POSTER_TIME),
        ('animal-adaptation', 'animal-poster', 3),
        ('human-adaptation', 'human-poster', 4),
    ):
        if args.teaser_only and video != 'research-teaser':
            continue
        run('-ss', time, '-i', videos / f'{video}.mp4', '-frames:v', 1,
            '-q:v', 3, images / f'{poster}.jpg')
    print(f'Built {short_time}s homepage teaser. Full reel preserved.' if args.teaser_only
          else f'Built {short_time}s homepage teaser and {full_time}s full reel.')


if __name__ == '__main__':
    main()
