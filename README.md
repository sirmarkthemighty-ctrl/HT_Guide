# Thai HT Guide
### แนวทางการรักษาโรคความดันโลหิตสูง พ.ศ. 2567 สำหรับใช้ข้างเตียง

A bedside reference for adult hypertension in Thailand, based on the Thai Hypertension Society's Thai Guidelines on the
Treatment of Hypertension in General Practice B.E. 2567 (2024), by Warodom Phaenthong, M.D.
It is one self-contained HTML page (`ht-guide.html`, opened by `index.html`) that runs in the browser, in Thai and English,
with no installation and no data sent anywhere.

It is decision support for healthcare professionals, not a substitute for the guideline, product labels or clinical judgement.

**Open it:** https://sirmarkthemighty-ctrl.github.io/HT_Guide/

## What it contains

- 41 antihypertensive and add-on medicines (ACEI, ARB, CCB, thiazide and thiazide-like diuretics, beta-blockers,
  single-pill combinations, MRAs, add-on drugs, IV crisis drugs, SGLT2i / GLP-1 RA): starting, usual and maximum doses,
  kidney and liver dosing, safety, interactions, patient advice, Thai NLEM 2569 status, the Thai CPG grade of the drug class,
  and a link to the product label used for the doses.
- Guideline tabs: BP classification and diagnostic thresholds, when to start drugs, starting strategy and targets,
  secondary hypertension work-up, resistant and refractory hypertension, hypertensive crises (emergency and PSH),
  comorbidities and special populations, references.
- Seven tools: BP classifier, starting-drug wizard, secondary-HT screener, resistant-HT navigator, crisis triage,
  CV risk and statin, and a kidney (eGFR) drug check.
- Search, filters, card and list views, side-by-side comparison of up to 4 drugs, colour-coded folding blocks,
  light and dark themes.

Tap the version badge next to the title for the changelog. Text that is not in the Thai guideline is marked
`[Not in Thai CPG 2567]`; prices and drug pictures show Unknown / N/A because no source is recorded for them.
`ht-guide-src/AUDIT-2026-10-26.md` lists what was checked and corrected against the guideline, NLEM 2569 and drug labels.

## Source and build

`ht-guide.html` is generated; edit the files in `ht-guide-src/` instead:

- `app.jsx`: the main page, header, filters and guideline tabs
- `components-layout.js`: changelog, colour-coded folding blocks; `components-card.js`: drug card, list row, shared helpers, sources
- `components-modals*.js`: drug detail view, comparison, patient sheet; `components-tools.js`: the seven tools
- `drugsData.js`: the 41 drugs; `guidelinesData.js`: guideline tables and text (Thai and English)
- `translations.js`: interface text; `shell.html`, `styles.css`, `tailwind.config.js`: page skeleton and styles

Build and test with Node.js. The build expects its tools in `%LOCALAPPDATA%\med-apps-build`
(`npm install @babel/standalone react@18 react-dom@18 tailwindcss@3 terser` in that folder); the test needs Microsoft Edge
or Google Chrome:

```
node ht-guide-src/build-ht-guide.js
node ht-guide-src/test-ht-guide.js
```

The test checks the data (NLEM codes, guideline fixes) and walks every tab in both languages at desktop and phone width.
For a closer interface check, serve the folder (`node .claude/serve-static.js 8765`), open
`http://localhost:8765/ht-guide.html`, load `/.claude/ui-audit.js` in the page and run `window.__uiAudit(document.body)`.

## Licence

Copyright (c) 2026 Warodom Phaenthong, M.D. The app's code and text are licensed under
[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/): share and adapt for non-commercial use,
with credit, under the same licence. The guideline content, drug brand names and the Thai NLEM belong to their owners;
see `NOTICE`.
