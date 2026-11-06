#!/usr/bin/env python3
"""Synthesize the reviewed CPG explainer narration and exact 90-second captions.

Requires kokoro-onnx, numpy, soundfile; models remain outside this repository.
python scripts/build_cpg_narration.py --models /path/to/kokoro-models
"""
import argparse
import json
from pathlib import Path
import textwrap
import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

ROOT = Path(__file__).resolve().parents[1]

def timestamp(seconds):
    milliseconds = round(seconds * 1000)
    return f'{milliseconds // 3600000:02d}:{milliseconds // 60000 % 60:02d}:{milliseconds // 1000 % 60:02d}.{milliseconds % 1000:03d}'

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--models', type=Path, required=True)
    parser.add_argument('--work', type=Path, default=Path('/tmp/zewei-cpg-render'))
    parser.add_argument('--voice', default='af_sarah')
    args = parser.parse_args()
    args.work.mkdir(parents=True, exist_ok=True)
    data = json.loads((ROOT / '_data/cpg_explainer.json').read_text())
    model = Kokoro(str(args.models / 'kokoro-v1.0.int8.onnx'), str(args.models / 'voices-v1.0.bin'))
    rate = 24000
    audio = np.zeros(data['target_duration_seconds'] * rate, dtype=np.float32)
    captions = ['WEBVTT', '']
    manifest = []
    for scene in data['scenes']:
        speed = .92
        samples, sr = model.create(scene['narration'], voice=args.voice, speed=speed, lang='en-us')
        assert sr == rate
        available = scene['duration'] - .65
        for attempt in range(4):
            if len(samples) / rate <= available:
                break
            speed *= max(1.04, (len(samples) / rate) / available * 1.04)
            samples, sr = model.create(scene['narration'], voice=args.voice, speed=speed, lang='en-us')
        assert speed <= 1.35, (scene['id'], 'Shorten narration rather than rushing speech', speed)
        seconds = len(samples) / rate
        assert seconds <= scene['duration'] - .35, (scene['id'], seconds)
        assert np.sqrt(np.mean(samples ** 2)) > .002, scene['id']
        onset = scene['start'] + .2
        at = round(onset * rate)
        audio[at:at + len(samples)] = samples
        sf.write(args.work / f"{scene['id']}.wav", samples, rate)
        captions += [f'{timestamp(onset)} --> {timestamp(onset + seconds)}', textwrap.fill(scene['narration'], width=72), '']
        manifest.append(dict(id=scene['id'], start=onset, speech_duration=seconds, voice_speed=speed))
        print(scene['id'], f'{seconds:.2f}s / {scene["duration"]}s', flush=True)
    sf.write(args.work / 'narration.wav', audio, rate, subtype='PCM_16')
    (ROOT / 'assets/video/cpg-explainer.vtt').write_text('\n'.join(captions))
    (args.work / 'narration-timing.json').write_text(json.dumps(manifest, indent=2))
    print('Narration and captions: exactly 90-second timeline.', flush=True)

if __name__ == '__main__':
    main()
