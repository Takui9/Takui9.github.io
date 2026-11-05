# Research homepage

The homepage uses `_layouts/research-home.html`, `assets/css/research-home.css`,
and `assets/js/research-home.js`. `_pages/about.md` retains the root permalink.
The research pages share the new layout; the CPG project page keeps its original
layout. CI uses Ruby 3.3, locked gems, and ImageMagick; no frontend build step is
required.

## Research pages and shared content

- `/`: personal introduction, current research teaser, About, selected papers.
- `/projects/`: one adaptation storyline, in chronological CPG → animal → human
  order, with mechanism explanations, experiment media, factual summaries, and
  related-paper links. This replaces the inherited computer-vision project index.
- `/papers/`: complete four-record bibliography grouped by year, with full author
  lists, first-author/coauthor labels, publication status, research-context links,
  and downloadable arXiv BibTeX.

`_data/research.yml` is the shared publication and narrative source. Shared
`research-head`, `research-nav`, `research-footer`, and `research-record` includes
keep navigation, titles, authors and links consistent. The two document pages
use `_layouts/research-page.html` and the same typography and spacing as Home.
The original source exports for citation downloads are:

- https://arxiv.org/bibtex/2604.17335
- https://arxiv.org/bibtex/2505.16084
- https://arxiv.org/bibtex/2410.16417
- https://arxiv.org/bibtex/2610.31608

The downloads are labeled **arXiv BibTeX**, rather than presented as publisher
citations. ACP is marked coauthored and under review; it is not a fourth chapter
of the first-author adaptation story and contributes no teaser footage.

GPT-6 Astra and the implementation agent exchanged four rounds on the Projects
and Papers extension: reference analysis, content/IA discussion, implemented page
review, and final editorial corrections. Final navigation emphasizes adaptation
mechanisms; animal priors are not ranked above CPGs; human-reference generation
is distinguished from both residual adaptation and the tracker’s RL/fine-tuning.
Astra approved the resulting structure, copy and CSS layout. Actual browser
appearance remains unverified under the current browser/Computer Use restrictions.

## Design and content

The homepage follows the personal-first hierarchy of https://takahiromiki.com/:
a video-backed introduction, neutral white content, one Geist sans-serif family,
and restrained blue links. Zewei's name, factual background, and direct contact
links lead the page. About and a portrait follow immediately, before publications.

The three first-author publications appear as compact rows, newest first. Each
retains its title, venue, full author list, one explanatory sentence, and links.
ACP is separate collaborative work, without an individual contribution claim.
Earlier robotics projects appear as plain links near the end.

The adaptation theme is stated once above the papers: motion priors adapted
through online optimization, residual policies, and terrain-aware generation.
It is not presented as a competing headline or three large campaign chapters.

GPT-6 Astra reviewed two implemented revisions. Round one required preserving the
complete video frame through 1000px viewports and removing redundant research
introductions. Round two confirmed those changes and approved the content,
structure, and CSS layout. No browser screenshot was available: the browser
connector was unavailable and native Computer Use permission was not granted.
This is source-level design approval, not pixel-level browser verification.

The teaser was subsequently refined to 47 seconds; the 80.5-second full reel
was preserved. The player retains explicit play/pause, reduced-motion and data
saving preferences, offscreen pausing, and hidden-tab pausing. Scene selection UI,
numbered maps, decorative status dots, slogans, and repeated method headlines were
removed. The generated cue manifests remain editing records rather than homepage
navigation elements.

The bio uses the completed EPFL MSc and verified BioRob/RSL experience. It does
not infer a new current appointment. The inherited missing Kexin CV is not linked.

## Video edit and provenance

The homepage uses a 47-second silent teaser, `assets/video/research-teaser.mp4`.
The approved 80.5-second cut is retained as `assets/video/research-reel-full.mp4`,
linked as “Watch the full research reel.” Both contain only
Zewei's two first-author projects on animal and human motion priors. CPG and ACP
footage are excluded. All scenes use 1280×720, 16:9, square pixels, H.264, 30fps,
and the original 1× playback speed.

### Homepage teaser (47 seconds, Astra-selected highlights)

GPT-6 Astra selected and implemented these source windows after chronological
frame comparisons and the user's final editorial corrections. All clips retain
original 1× speed. Only grass, quadruped stairs, and the mixed-terrain ending
changed in this revision.

| Teaser time | Original source window | Selected action |
| --- | --- | --- |
| 0.00–4.50 s | grass 0.00–4.50 s | Early straight walking, extended by two seconds |
| 4.50–11.00 s | stairs-short 12.00–18.50 s | Selected middle cycle: descend, turn on the ground, ascend to the upper landing |
| 11.00–17.00 s | navigation2 14.50–20.50 s | Close barrier approach, block traversal and foreground exit |
| 17.00–24.50 s | climb1 1.00–8.50 s | Complete ascent and descent; stop before backward rocking |
| 24.50–35.50 s | climb2 1.00–12.00 s | Complete ascent, reorientation and descent |
| 35.50–47.00 s | mixed1 6.50–18.00 s | Stairs, jump down and next climb; stop before the backward-leaning top walk |

Astra compared four complete two-step candidates at original speed: 3.8–12.25,
12–18.5, 19–27.73 (rejected), and 27.75–36.8 s. It ranked the middle cycle first:
the ascent is more direct and avoids the prolonged side-on repositioning near
24–25 s in the rejected cycle. The early and late candidates also partly lose the
robot at the floor turn. The selected cycle still has a compact turn; selection
means strongest available complete cycle, not a claim of flawless gait.

Astra reviewed chronological source frames, with 0.1-second sampling of the
selected ascent, then approved actual encoded frames. Root performed the code
change and export. A source-cadence check found no exact adjacent duplicate frames
in the four windows. This is not a quantitative smoothness benchmark or a browser
continuous-playback test. All other five teaser segments are pixel-identical to
the preceding edit. Full-reel and chapter-file checksums remain unchanged.

The teaser is encoded directly from the original sources in one generation.
Camera keyframes stay anchored to original source time, so the mixed-terrain
following crop begins in the correct position. Navigation 02 retains its full
16:9 frame to preserve the right-side approach. The poster shows the early grass
walk at source time 0.5 s, also 0.5 s into the teaser.
Exact windows and editorial reasons are saved in the teaser cue JSON.
The complete 47-second decode, 1280×720/30fps/silent format, fast-start metadata,
and HTML/JSON cue parity passed validation. File hashes confirm the full reel and
chapter videos are unchanged; decoded-frame hashes confirm the three retained
teaser scenes are pixel-identical to the previous cut.
The selection review uses chronological sampled frames; browser playback and
the complete Jekyll build was subsequently verified with production settings.
Browser rendering remains unverified in this environment.

### Full research reel (80.5 seconds)

| Reel time | Source | Source time | Purpose |
| --- | --- | --- | --- |
| 0–9 s | ANYmal grass | 29–38 s | Natural turning and walking out of vegetation |
| 9–21 s | ANYmal continuous indoor stairs | 12–24 s | Successive flights and the landing turn |
| 21–33 s | ANYmal indoor local navigation | 30–42 s | Navigate among randomly placed blocks |
| 33–43 s | G1 box climbing 01 | 0.3–10.3 s | Complete ascent and descent without reorientation |
| 43–56.5 s | G1 box climbing 02 | 0.3–13.8 s | Complete ascent, reorientation, and descent |
| 56.5–80.5 s | G1 mixed terrain 01 | 1–25 s | Continuous traversal with a smooth following crop |

Sources, downloaded to a temporary directory for editing:

- `grass.mp4`: https://anymalprior.github.io/static/clips/flat_on_the_grass.mp4
- `stairs.mp4` (full reel): https://anymalprior.github.io/static/clips/indoor_stairs_long01.mp4
- `stairs-short.mp4` (homepage highlights): https://anymalprior.github.io/static/clips/indoor_stairs_short.mp4
- `navigation1.mp4` (full reel): https://anymalprior.github.io/static/clips/local_navigation_indoor_rough01.mp4
- `navigation2.mp4` (homepage highlights): https://anymalprior.github.io/static/clips/local_navigation_indoor_rough02.mp4
- `climb1.mp4`: https://wholebodylocomotion.github.io/static/clips/box_climbing_01.mp4
- `climb2.mp4`: https://wholebodylocomotion.github.io/static/clips/box_climbing_02.mp4
- `mixed1.mp4`: https://wholebodylocomotion.github.io/static/clips/mixed_terrain_01.mp4

Rebuild with FFmpeg installed:

```sh
python3 scripts/build_research_media.py /path/to/source-clips
```

To replace only the homepage highlights and preserve the approved full reel:

```sh
python3 scripts/build_research_media.py /path/to/source-clips --teaser-only
```

The full reel’s portrait stairs recording has baked white margins. Its edit removes those
margins and centers an undistorted portrait over a blurred version of the same
footage. Other scenes fill the common 16:9 frame without stretching. The G1 clips
remove original title/speed banners; the climbing shots also remove the bottom
label. The mixed-terrain clip uses a 960×540 crop from 1920×1080, with manually
checked position keyframes and continuous-velocity cubic interpolation. It is
exported separately as `mixed-terrain-tracked.mp4` for inspection.

The script exports both cuts, chapter previews, posters, generated `_data/reel.yml`
for the homepage duration label, `research-teaser-cues.json`,
and `research-reel-full-cues.json`.
The homepage uses a minimal player without scene tabs. Cue JSON records the
source windows and editorial decisions for reproducible editing.
The CPG chapter retains its earlier experiment preview, independently of the reel.

## Collaborative work

ACP is listed separately from the three first-author research chapters:
*Humanoid Mobility via Attention-based Contacts*, arXiv 2026, under review.
The complete author list follows the official project and paper, with Zewei fifth.
The description summarizes the system and makes no individual contribution claim.
Sources: https://leggedrobotics.github.io/ACP/ and https://arxiv.org/abs/2610.31608.
No ACP footage is used in the teaser.

## Accessibility and playback

- Native buttons and links, visible keyboard focus, skip navigation, descriptive
  media labels, responsive layouts, and semantic article headings.
- Hero playback pauses offscreen and in hidden tabs. A visitor's pause choice
  persists while scrolling. Reduced-motion and data-saving preferences suppress
  automatic playback; explicit play/pause and the full-video link remain available.
- Chapter clips use native video controls and load only when requested.
- No JavaScript is required for reading the complete research story or using links.

## Preview

Start the entire Jekyll site locally:

```sh
bin/preview
```

Open http://127.0.0.1:4000/ in a browser. LiveReload refreshes the page after
source changes. The visual progress dashboard is available at
http://127.0.0.1:4000/_homepage-progress.html.

The launcher uses Homebrew Ruby 3.3 when available, installs this repository's
Gemfile dependencies into ignored `vendor/bundle`, and creates a temporary local
configuration. Local preview uses original images instead of ImageMagick-generated
variants and skips JavaScript minification. Production configuration is unchanged.
Stop the process with Ctrl-C; rerun `bin/preview` to restart it.

The full Jekyll site generated successfully, and HTTP checks passed for the homepage,
existing project/CV routes, dashboard, styles, JavaScript, and teaser. Browser UI
verification is still unavailable. No commit, push, or deployment was performed.

## Identity and content provenance audit (5 November 2026)

- Use only Zewei-specific biography, projects that list Zewei as an author/team
  member, and the linked LinkedIn profile: https://ch.linkedin.com/in/zewzhang.
- The indexed public LinkedIn profile confirms EPFL education in 2022–2025,
  RSL experience, and the CoRL/IROS publication titles. Direct access to the
  complete profile returned an access error; the full About section was not read.
- The biography in Git history is explicitly authored by Zewei and supports
  Waseda, EPFL/BioRob, ETH/RSL, and the personal interests used on the homepage.
- Do not use `_includes/papers.html` (Kexin Shi publications), the inherited
  Kexin CV reference, `_includes/myprojects.html` (template-owner projects),
  `_data/cv.yml` (Einstein sample CV), or sample bibliography records as Zewei's.
- The optional chatbot item was removed from this robotics-focused homepage.
  A public report actually lists both Yihan Wang and Zewei Zhang, so the shared
  author name alone does not establish that it is inherited-only content:
  https://ivonne320.github.io/yihan.home/assets/pdf/chatbot.pdf.
- CPG-RL identifies Zewei on its own project page. The drone project explicitly
  identifies Zewei in the original Zewei-specific project list.
- No new current appointment, dates of employment, or claimed achievements were
  inferred from third-party profile aggregators or people with the same name.
