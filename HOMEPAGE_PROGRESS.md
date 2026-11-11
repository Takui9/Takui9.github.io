# Homepage rebuild — milestone log

Last updated: 2026-11-06 (Asia/Shanghai)

## Goal

Rebuild the Jekyll homepage with cinematic experiment footage and one clear
research storyline: **adapting motion priors to real-world demands**.
Use takahiromiki.com as design inspiration. Preserve this repository and its
GitHub Pages deployment workflow.

## Milestones

| Milestone | Status | Result |
| --- | --- | --- |
| 1. Audit content and reference | Complete | Reviewed existing biography, three research publications, linked project pages, and reference homepage. |
| 2. Refine research narrative | Complete | GPT-6 Astra helped refine three adaptation mechanisms: parameters, residual corrections, generated references. Incorporated user's correction to center adaptation. |
| 3. Implement homepage | Complete | Personal-first homepage, responsive shared layout, Projects adaptation storyline, complete Papers index, biography and contact links. |
| 4. Produce research teaser | Complete | Astra selected and reviewed the final 47-second teaser; root encoded it. Straight grass walking, selected two-step descent/ascent cycle, navigation and humanoid climbing. Full reel and chapter videos preserved. |
| 5. Review and validate | Complete | Template rendered successfully for root and subpath hosting; HTML structure, anchors, local assets, JS syntax, and full decode of all four videos passed. Astra reviewed source and poster, identifying mobile heading spacing and footage cropping; both fixed. Playback smoke checks also passed: visibility, manual pause persistence, scene seeking and labels, reduced-motion and data-saving preferences, and offscreen chapter pausing. |
| 6. Production build and deployment | Complete | Production Jekyll build and both GitHub publication runs succeeded. Root verified public pages/resources and approved video hashes. Astra found no production-package blockers and approved handoff. Browser UI inspection remains unavailable. |

## Current work

Latest result: About now includes two compact education and research timelines
with five source-verified records and exact months. Astra approved the design,
wording and fresh public version after merge. The specified recent placement and
private source data were excluded. All eight public pages, timeline CSS and
31 resources passed release checks. Local dashboard: `_homepage-progress.html`.

## Main files

- `_pages/about.md`: homepage routing and metadata.
- `_layouts/research-home.html`: homepage content and structure.
- `assets/css/research-home.css`: responsive design.
- `assets/js/research-home.js`: teaser playback, chapter cues, motion preferences.
- `assets/video/`: teaser and three chapter clips.
- `scripts/build_research_media.py`: reproducible video editing script.
- `HOMEPAGE.md`: editorial plan, footage provenance, edit timing, maintenance notes.

## Identity audit update

Audited inherited content after Zewei's clarification. The rebuilt homepage does
not include Kexin's papers/CV, Yihan-only projects, or Einstein sample CV records.
Removed the optional chatbot entry from the homepage; retained verified robotics
projects. Public LinkedIn indexing confirmed EPFL study dates (2022–2025), now
included in the biography. The full LinkedIn About section remains inaccessible.

## Teaser revision requested

In progress: replace the initial cut with ANYmal grass turning, continuous indoor
stairs, and indoor block navigation; G1 climbing up/down with and without
reorientation; and mixed terrain with a smooth following crop. Exclude CPG and
vaulting from the teaser. Add ACP as a separate coauthored publication with no
inferred individual contribution claim and no teaser footage.

## Teaser revision completed

- Replaced the original cut with six requested scenes (80.5 seconds, 1× speed).
- ANYmal: grass and natural turns (29–38 s); continuous indoor stairs (12–24 s);
  local navigation among blocks (30–42 s of indoor rough navigation 01).
- G1: complete box climb-up/down 01; complete climb/reorientation/descent 02;
  mixed terrain 01 with a manually keyframed, smooth following crop.
- Uniform 1280×720, 16:9, 30fps, H.264, silent, fast-start. Portrait stairs use
  an undistorted foreground and blurred same-footage background after removing
  the original white margins. No CPG, vaulting, or ACP footage in the teaser.
- Updated scene buttons, accessible video descriptions, chapter previews, and
  posters. Cue times and labels come from HTML button attributes.
- Added ACP as a separate Collaborative work citation with complete author list,
  arXiv 2026 / under review status, and neutral system-level description.
- Passed full decode checks of all four updated MP4s; verified video dimensions,
  frame rate, absence of audio, fast-start metadata, six-scene timing parity,
  rendered template structure and assets, JS syntax and playback smoke checks.
- Astra reviewed the refreshed contact sheet and poster with no substantial
  visual findings. This was sampled-frame review, not browser playback review.

## Short homepage cut completed

Homepage teaser shortened to **49.5 seconds**, retaining six scenes and original
playback speed. Grass, stairs, and navigation each use 5-second excerpts. Both
climbing actions remain complete (10 and 13.5 seconds). The tracked mixed-terrain
excerpt is 11 seconds. The approved 80.5-second version is now
`assets/video/research-reel-full.mp4`, linked from the homepage.

The media build script reproducibly generates both cuts and their separate cue
manifests. Updated scene buttons and the file-based preview. Full decode, exact
durations, format, fast-start metadata, scene timing, full-reel link, template,
and playback checks passed. Browser review/full Jekyll build remain unverified.

## Astra-led highlight selection completed

The final homepage teaser is **50.5 seconds**. GPT-6 Astra independently compared
all source timelines at 2-second intervals, refined candidate actions at half-second
intervals, and selected exact source windows. A second review of the encoded
framing replaced its initial late stair choice with a clearer, full-body ascent.

Final source windows: grass 30.5–36.5; stairs 14–20; close navigation 02
14.5–20.5; climb 01 1–9.5; climb 02 1–12; mixed terrain 01 11.5–24.5 seconds.
The poster is grass at source time 32 seconds. Each selection's action-based
reason is stored in the cue JSON and displayed in the visual progress dashboard.

The teaser now encodes directly from originals, with tracking anchored to source
time. Full decode, exact durations and source windows, video format, streaming
metadata, HTML scene parity, rendered links, and playback smoke checks passed.
Checksum comparison confirms the approved 80.5-second full reel is byte-for-byte
unchanged. Browser playback and the full Jekyll build remain unverified.

## Three-scene refinement completed — 46 seconds

At Zewei's request, Astra revised only grass, quadruped stairs, and the mixed-terrain
finale. Grass now uses source 4.5–8.5 s: walking, an actual reversal around 6–7 s,
and resumed walking. A modest centered crop improves readability amid vegetation.
Quadruped stairs use 16–19.5 s (3.5 seconds). The finale uses mixed terrain 01
6.5–19.5 s: first stairs ascent, jump down, and the higher second climb. Astra's
final encoded-frame review shortened its initial endpoint to omit the preparatory
crouch as well as the final jump down.

Navigation and the two dedicated humanoid climbing sections were retained.
Decoded-frame checksum comparisons confirm they are pixel-identical to the
previous version. The full research reel's file checksum is also unchanged.
Scene controls, poster, maintenance notes, visual dashboard, and preview updated.


## Astra execution — final three-scene correction

GPT-6 Astra directly selected and rendered the revised 45-second teaser:
- Grass: source 0–2.5 s, early straight walking; uncropped landscape framing.
- Stairs: replaced the long portrait recording with `indoor_stairs_short.mp4`,
  source 1–6.5 s, showing one complete two-step ascent, turn, and descent.
- Mixed terrain: source 6.5–18 s; cut immediately after rising onto the second
  box, before the backward-leaning top walk and final descent.

The navigation and two standalone humanoid climbing windows and filters remain
unchanged. The build uses `--teaser-only`, preserving the approved full reel and
chapter previews. Scene controls, opening caption, accessible description, poster,
cue manifest, maintenance notes, and dashboard are synchronized. Final decode,
metadata, cue, and preservation checks passed.

Verified the complete 45-second decode; 1280×720, 30fps, silent H.264 with fast-start metadata; all six source windows and HTML/JSON cue parity. SHA-256 confirms the full reel and all chapter videos are unchanged. Decoded-pixel MD5 confirms navigation 02 and both standalone climbing scenes are identical to the previous cut. Reviewed actual encoded start/middle/end frames and the new poster. This is sampled-frame inspection, not browser playback verification.

## Whole-site local preview started

Installed Ruby 3.3 and all 135 resolved gems for the existing Gemfile. Added
`bin/preview` to launch the complete Jekyll site with LiveReload and temporary
development overrides; production config unchanged. Local Jekyll generation
passes. HTTP 200 checks passed for `/`, `/cpg_rl.html`, `/cv/`, `/projects/`,
`/_homepage-progress.html`, homepage CSS/JS, and the current teaser MP4.

Preview: http://127.0.0.1:4000/
Dashboard: http://127.0.0.1:4000/_homepage-progress.html

Astra directly completed and exported the requested 45-second video revision.
Browser UI host remains unavailable; no commit/push/deployment has occurred.

## Personal academic homepage redesign — Astra approved

Replaced the promotional research-theme layout with a personal introduction,
nearby About/portrait, compact latest-first paper rows, separate ACP collaboration,
and plain project/contact links. Neutral white, Geist sans-serif, restrained blue.
Removed slogans, repeated oversized chapter headings, numbered story map, arrows,
and scene-tab UI. The approved teaser/full-reel file checksums are unchanged.

Astra reviewed two implemented revisions. Required round-one corrections were
completed: full-frame stacked video through 1000px viewports, and removal of
repeated research introductions. Astra explicitly approved round two's content,
HTML structure, and CSS layout. Browser appearance remains unverified because the
browser connector is unavailable and native Computer Use permission is not granted.

Local Jekyll generation, page/asset links, semantic HTML checks, and simplified
playback behavior checks passed. The local preview remains running. No deployment.

## Projects / Papers extension — four Astra exchanges, approved

1. Compared the reference's actual Projects and Papers HTML/CSS/interactions.
2. Agreed the page roles and wrote one adaptation storyline with three studies.
3. Reviewed implemented pages and shared publication records.
4. Refined mechanism-first navigation and scientific wording; Astra approved.

Projects now explains CPG parameter optimization → animal residual adaptation →
human terrain-aware reference generation. Papers groups all four records by year,
with complete authors, first-author/coauthor roles, status, cross-links, and
BibTeX downloaded from primary arXiv exports. The inherited computer-vision
project index is replaced. The approved personal homepage and 45-second teaser
remain, with shared Home / Projects / Papers navigation.

Actual Jekyll pages, semantic HTML, internal/external-local assets, cross-page
anchors, four complete author lists, role labels, citation files, story order,
method distinctions, and preserved video checksums passed. Browser pixel review
remains unavailable. No commit, push or public deployment.

## Cleaner two-step cycle, longer grass, landing-tail trim completed

Astra selected source windows and reviewed encoded frames; root executed the code
and render. Grass extended from 0–2.5 to 0–4.5 s. Two-step demonstration now uses
19–27.7333 s: descent, ground turn away from the edge, and ascent. Astra localized
backward rocking in climb01 near 8.6–9.1 s; that clip now ends at 8.5 s after
landing. Total teaser duration is 49.2333 s.

Generated `_data/reel.yml` keeps the homepage's rounded duration label in sync.
Exact source-window, full-decode, video-format, fast-start, HTTP range playback,
and duration-label checks passed. Navigation, the reorienting humanoid climb,
and mixed-terrain clips remain pixel-identical. Full-reel and chapter-file hashes
are unchanged. Astra approved the final source choices and encoded frames.

## Four-candidate stair comparison completed — 47 seconds

Astra compared four full cycles, prepared four real-time clips, and inspected
selected foot placements at 0.1-second intervals. Ranked 12–18.5 s first; rejected
19–27.73 s for prolonged side-on repositioning, and early/late alternatives for
awkward descent or partial framing during the floor turn. Root encoded the
selected cycle at original speed and Astra approved its actual encoded framing.

The selected motion remains a tight-turning real experiment, not a claim of
perfect gait. Source cadence inspection found no exact adjacent duplicate frames.
The other five teaser clips are pixel-identical; full reel and chapter files
remain byte-identical. Full decode, 47-second duration, format, generated label,
streaming/range requests and playback checks passed.

## Deployment preparation

User authorized public deployment. Astra completed readiness review; main-page
assets, anchors, citations, attribution and production URL filters passed.
Production exclusions now remove internal workflow notes/scripts and inherited
CV, demo projects/posts/news and template instructions from the published site.
Scholar identity corrected to Zewei. Production repository/baseurl made explicit.
CI aligned to the locally verified Ruby 3.3 environment, with a committed
Mac/Linux dependency lock and explicit image conversion tools. Production build
with native image generation/minification passed.


## Published — 2026-11-05

- Live site: https://takui9.github.io/ (Home, Projects, Papers).
- Published source: `150cf479ca7d` (`main`).
- Deploy: https://github.com/Takui9/Takui9.github.io/actions/runs/42040161232 — success.
- Pages: https://github.com/Takui9/Takui9.github.io/actions/runs/42040397558 — success.
- Public checks passed: page structure/navigation, local resources and anchors,
  complete author lists, first-author/coauthor roles, adaptation-method nuance,
  and absence of inherited template records from the three research pages.
- The 47-second teaser and 80.5-second full reel downloaded from the live site
  match the approved source SHA-256 checksums. Teaser HTTP range request returns
  206, supporting seek/streaming. The sitemap contains the four intended routes.
- Internal progress/docs/scripts and inherited CV/teaching/repository pages
  return 404, as intended.
- The live Home/Projects/Papers HTML is byte-identical to the reviewed local
  production build. Fresh public snapshots are saved at `/tmp/zewei-live-review/`.
- Astra approved the production package and handoff with no blockers or further
  changes recommended. Its own public fetch returned stale content/access errors;
  fresh-live verification was performed by root, not independently by Astra.
- Browser visual inspection remains unavailable under this environment's
  browser/Computer Use restrictions.


## Full copy and factual audit — published (6 November 2026)

User requested Astra review and refine all published text, verify claims against
the papers, then automatically publish the revised version. Scope: Home,
Projects, Papers, the earlier CPG-RL page, shared navigation/footer, metadata,
image/video descriptions, and playback labels.

Root downloaded the four latest full arXiv HTML papers and three official
project pages into `/tmp/zewei-copy-audit/`, and extracted all current public
copy for coverage. Astra is reviewing language, adaptation mechanisms, hardware
versus simulation claims, authors, venues/status, and biography provenance.
Confirmed RA-L 2026 against Xue Bin Peng's coauthor project page; CoRL 2025 and
IROS 2024 against the papers and Zewei's public LinkedIn record. No new current
appointment is inferred. Existing approved video assets will be preserved.

Astra's complete review and final generated-HTML review both passed. Implemented
language refinements throughout the four pages; clarified CPG context/data reuse,
the frozen animal low-level policy and joint residuals, and the humanoid tracker’s
terrain input/closed-loop fine-tuning. Corrected CPG-RL course-project/instructor
attribution, name spelling, and simulation-only scope. Extended reel label now
reads “Extended highlights.” Full evidence map is in `HOMEPAGE.md`.

Production generation, all four pages' HTML/navigation/resources/anchors,
metadata/author/role preservation, exclusions, and unchanged approved video
checks passed. The revision is ready and being pushed for automatic deployment.

Publishing source revision: `9ca8647be338`. Workflow:
https://github.com/Takui9/Takui9.github.io/actions/runs/42161115147.

Final publication:

- Reviewed source: `9ca8647be338`; published build: `8d9ba4d817d9`.
- GitHub Pages deployment succeeded:
  https://github.com/Takui9/Takui9.github.io/actions/runs/42161954567.
- The source-build workflow remained in its image-tool installation step, so
  root published the already validated production output directly to the existing
  `gh-pages` branch using a normal fast-forward push from an isolated worktree.
  No source-workspace checkout or force push was used. The original source build
  was still running at handoff; this is distinct from the successful Pages deploy.
- Fresh public Home, Projects, Papers and CPG-RL HTML matches the approved build
  byte for byte. All 19 linked local resources returned 200, the stylesheet
  matches the build, and the teaser range request returned correct 206 data.
- Astra's final generated-text review found no further language or factual
  corrections. All original videos remain unchanged.


## Projects collaboration entry — published

User requested only the Projects tab's Related collaboration section use a
compact project-entry format, and asked Astra to review its text. The new entry
has year/arXiv/status/Coauthor metadata, the formal title, full authors, one
previously verified method sentence, and Paper/Project links. It uses the main
project typography and separators, without a fourth storyline chapter.

Astra reviewed the actual rendered entry and approved the text, author order,
coauthor label and under-review status. Production generation passed; Home,
Papers and CPG-RL HTML are byte-identical to the prior reviewed build. CSS changes
are limited to the new Projects entry's class. Publishing the two changed public
files only: Projects HTML and its stylesheet.

Publication completed: source `a68a64bf9798`, public build `c0ae7577a4fc`;
Pages run https://github.com/Takui9/Takui9.github.io/actions/runs/42168030909
succeeded. Fresh public Projects HTML and CSS match the approved output. Home,
Papers, and CPG-RL remain byte-identical to their previous reviewed output.


## Paper explainers — implementation and media review in progress

User requested the reference site's short paper-explainer feature, reusing the
two existing explainers and asking Astra to create an IROS CPG explainer.

- New local directory and three detail pages use the site's typography and
  navigation. Home/Papers/Projects receive per-paper explainer links.
- The existing humanoid and quadruped films are embedded from Takahiro Miki's
  original pages, with attribution, links to the full interactive walkthroughs,
  and new source-checked scope notes. Their actual durations remain 1:40/1:50.
- Astra authored and checked eight CPG scenes totaling 90 seconds, including
  narration, explanatory details, glossary, visual scope and paper references.
- Root implemented the canvas diagrams, three educational interactions, a
  synthetic narrated film, captions and transcript. The same diagram code is
  rendered offline with native Canvas for video; no browser screenshots or
  copied reference engine are used.
- Narration and control checks passed. Full encoding and Astra's diagram/page
  review are in progress. The approved homepage teaser is preserved.
- Homepage GitHub removal is prepared. Twitter remains unconfigured because the
  account address has not been supplied; no account is guessed.

Final explainer review passed after two wording fixes. Astra approved the actual
new pages, encoded frames and interaction code. Native-control regressions
verified scene selection, GP/UCB trials, context, target reuse, pause-state
continuity and bounded ARIA updates. Production generation, all eight pages'
local resource graph/anchors, 90-second full video decode, captions, fast-start
metadata, external video range support, and original-media preservation passed.
The browser host is unavailable; this is not a browser or screen-reader test.
Publishing the reviewed explainer feature now.


Paper explainer publication completed:

- Source `98b6b761ce4f`; published build `c9fc3c1c23e0`.
- Source build succeeded: https://github.com/Takui9/Takui9.github.io/actions/runs/42171846133.
- Pages deployment succeeded: https://github.com/Takui9/Takui9.github.io/actions/runs/42171929138.
- All eight live pages match the reviewed production HTML byte for byte.
- All 28 linked local resources return 200; deployed explainer CSS/JS/VTT match
  the build. The complete 13,849,299-byte CPG film matches its approved SHA-256,
  and its range request returns correct 206 data.
- The automatic source workflow published first; the parallel isolated direct
  push safely declined the changed remote ref, and no retry/force push was made.
  The isolated worktree was removed.
- Astra approved text, encoded frames, diagram logic and interaction fixes.
  Browser playback/screen-reader testing remains unavailable via CUA.
- GitHub personal link is removed. Twitter awaits the user's account address.


## Astra post-merge review — approved

At the user's request, root confirmed the feature is integrated in main, then
asked Astra to review the merged public version once more. Fresh snapshots of
all eight live pages and the explainer JS/CSS/VTT are saved under
`/tmp/zewei-postmerge-review/`; all 11 payloads match the approved production
build byte for byte. No additional source changes have been made.

Astra independently read the fresh public directory, three explainer pages,
Home/Papers/Projects entry links and production resources. All 11 public payloads
matched the approved build with zero mismatches; VTT narration matches all eight
reviewed scenes. Attribution, experiment scope and final copy corrections are
correct. Post-merge approved, with no further source fixes needed. Review remains
limited to public content/resources and encoded frames, not browser playback or
screen-reader testing.


## Homepage featured paper explainer — published and post-merge approved

User asked Astra how to place a directly visible Paper Explainer on Home. After
comparing the fresh reference homepage, Astra recommended a single CPG player
after Selected publications and before Collaborative work. Root implemented a
7:5 media/copy layout, stacked copy-then-media at 800px, existing 16:9 poster,
manual native playback, English captions, and two links to the CPG explanation
and the three-explainer directory. Featured title/description/duration are data
driven. No new promotional headline or collage was added.

Astra reviewed the generated Home HTML/CSS and playback source and approved it
without changes. Other seven HTML pages remain byte-identical; the original
video assets and 47-second hero teaser are unchanged. Browser visual testing
remains unavailable. Preparing the main-branch release.

Release check observed a ten-minute shared stylesheet cache. The new home-only component CSS was separated into a newly loaded file to avoid stale styling for returning visitors; the reviewed layout and copy are unchanged.

Homepage feature release completed:

- Feature source `64d0d9802cb0`; cache-safe component loading `49e61e87053d`.
- Published build `b4bc83d38c0c`. Source workflow
  https://github.com/Takui9/Takui9.github.io/actions/runs/42177367922 and Pages
  https://github.com/Takui9/Takui9.github.io/actions/runs/42177466538 succeeded.
- All eight public pages match the approved build. Featured component CSS,
  shared CSS and playback JS match; all 29 local resources return 200 and
  featured-film range streaming returns valid 206 data.
- Astra independently reviewed the fresh public Home HTML, isolated component
  stylesheet and shared styles. Post-merge approved: placement, 7:5 layout,
  <=800px stack, copy, links, captions and manual playback are correct.
- Review remains source/HTML/CSS based; browser visual testing is unavailable.


## Default humanoid and three manual explainer selections — published and approved

User requested humanoid or three rotating explainers. Astra recommended default
humanoid plus three simple manual selectors, keeping the academic homepage calm
and avoiding interrupted reading. Root implemented this recommendation.

The selected film's title, duration, venue/year, description, links, poster,
source, caption track and attribution update together. Switching pauses the old
video and never plays the new one automatically. CPG captions are cleared for
the external films; external films retain Takahiro Miki credit and original
walkthrough links. JavaScript-free fallback remains a playable humanoid film.

Production build passed. Source and minified production code passed DOM
interaction checks; default human, subtitle scope, other seven unchanged HTML
pages and cache-versioned component CSS also passed. Astra approved the actual
generated HTML and CSS/JS. Publishing through the main workflow.

Published source `149bb9d1675e`, build `6236e4f7e0a1`. Source run
https://github.com/Takui9/Takui9.github.io/actions/runs/42179350986 and Pages run
https://github.com/Takui9/Takui9.github.io/actions/runs/42179424752 succeeded.
All eight public HTML pages and selector CSS/JS match the approved build;
30 local resources return 200. Astra's independent public snapshot comparison
and post-merge check passed. No further changes required; browser real-media
playback testing remains unavailable.


## About timelines — published and post-merge approved

User requested a visual career timeline below About and supplied a private CV
with one explicit placement exclusion. Root verified the source visually, using
only five selected education/earlier-research records and precise months. The
excluded placement, private contacts/status and the original CV are not included
in the source or published materials.

Astra revised the layout to two independent timelines: Education (2 entries) and
Research experience (3 entries), stacked at 860px. This cleanly shows overlapping
studies/placements and keeps RSL's period independent of the MSc. About text was
condensed without changing the portrait or research publications.

Astra's generated-page/data/CSS review approved the exact dates, roles, advisors
and layout without changes. Root verified 5 records, exclusions, chronology and
7 unchanged pages. Publishing through the existing main-branch workflow.

About timeline publication completed:

- Source `93f04e1fab58`, published build `0d40ab25e80d`.
- Source workflow https://github.com/Takui9/Takui9.github.io/actions/runs/42183011930
  and Pages https://github.com/Takui9/Takui9.github.io/actions/runs/42183109267
  succeeded.
- Eight public pages and the timeline stylesheet match the approved build;
  31 local resources return 200. Private exclusion checks passed on public HTML.
- Astra independently reviewed the fresh public About content and CSS and
  approved the merged version with no further changes. Browser visual testing
  remains unavailable.
- Temporary private CV render/extraction files were removed after review; the
  original user PDF remains untouched outside the repository.


## ACP media alignment — published and post-merge approved

Astra recommended matching the existing Home publication grid and Projects study
grid, while retaining the separate collaboration headings, full author list,
Coauthor / Under review labels and unchanged one-sentence summary. The three
first-author story chapters and all video assets remain unchanged. Root has
implemented both layouts and a shared official ladder-climbing hardware still
selected with Astra. Production checks and final review are next.

Production build and eight-page structure/local-link checks passed. The six
unaffected pages are byte-identical to the previous approved release, and all
original MP4 files are unchanged. Astra approved the generated HTML/CSS and
actual final image without revisions. Publishing via the existing main workflow.

ACP release completed from source `800189e30a5a`, published build
`f31616ea00c7`. Source workflow
https://github.com/Takui9/Takui9.github.io/actions/runs/42558215588 and Pages
https://github.com/Takui9/Takui9.github.io/actions/runs/42558289107 succeeded.
All eight public HTML pages, component/shared CSS and original image match the
approved production build. All 32 linked local resources return 200.
Astra independently reviewed the fresh public Home/Projects HTML, component CSS
and real image, confirmed their byte-for-byte match to the approved version,
and gave post-merge approval with no changes. Review remains image/source based;
browser visual testing is unavailable.


## Robot platforms — published and post-merge approved

User requested five platforms at the end of Home: Unitree G1, Unitree Go1,
ANYmal-D, UR10 and Crazyflie, explicitly confirming UR10 use during BMW. The
first three follow the verified research projects; the existing drone project
provides the navigation context for Crazyflie. Astra recommended five/three/two
columns with contained white-background images, platform names and one short
work caption, after Earlier projects and before the footer. Root implemented
the data-driven Home-only section; final image and production checks are next.

Five final device images are normalized without altering robot structures.
Production build passed. All eight pages passed structure, local-resource and
fragment checks; seven unaffected HTML pages are byte-identical, and original
MP4 files are unchanged. Final Astra review is in progress.
Astra approved all five real images, generated Home, responsive CSS and links
without required changes. His optional credit clarification was adopted:
Unitree (G1 via Funduino). Preparing the main-branch release.

Published source `a158f90e27bb`, build `98763b7b9197`. Source workflow
https://github.com/Takui9/Takui9.github.io/actions/runs/42576760131 and Pages
https://github.com/Takui9/Takui9.github.io/actions/runs/42576877188 succeeded.
All eight public HTML pages, Home component/shared CSS and five robot images
match the approved production build. All 38 linked local resources return 200.
Astra independently checked the fresh public Home, CSS and all five images,
confirmed the placement, names, work links and precise credits, and gave
post-merge approval without changes. Review is image/source based; browser
visual testing remains unavailable.


## Google Scholar and Contact — implementation review

Added the exact Google Scholar profile supplied by Zewei to the Home personal
links, using `scholar_userid: ofBIqOIAAAAJ`. Contact in the same row points to a
new final Home section that displays `ctki49@gmail.com` as a mailto link. The
Home footer keeps only the name, avoiding a duplicate contact anchor/email;
other pages retain their original footer. No new styles or scripts are needed.
Production and link checks are next.

Production build and eight-page structure, resource and fragment checks passed.
The Scholar URL exactly matches the supplied user ID, the Contact anchor is
unique, and the email is visible with a mailto action. All seven other public
HTML pages match byte-for-byte. Astra approved the generated Home and footer
logic without revisions. Publishing through the existing main workflow.
