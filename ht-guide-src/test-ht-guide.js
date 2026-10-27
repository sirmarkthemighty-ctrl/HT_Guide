#!/usr/bin/env node
// HT Guide regression test.
// usage: node ht-guide-src/test-ht-guide.js   (build first with build-ht-guide.js)
// Part 1 checks the data (audit fixes of 2026-10-26 must stay fixed).
// Part 2 opens ht-guide.html in headless Edge/Chrome and walks every tab in both languages at 1280 and 375 px.
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');
const { pathToFileURL } = require('url');

const SRC = __dirname;
const PAGE = path.join(SRC, '..', 'ht-guide.html');
const BROWSERS = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let failures = 0;
const check = (name, ok, detail) => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${!ok && detail ? '  -> ' + detail : ''}`);
  if (!ok) failures++;
};

// ---------------- Part 1: data ----------------
function dataChecks() {
  const read = (f) => fs.readFileSync(path.join(SRC, f), 'utf8');
  const ctx = {};
  new Function('ctx', read('drugsData.js') + read('guidelinesData.js') +
    ';ctx.d=drugsData;ctx.classes=drugClasses;ctx.g=guidelinesData;')(ctx);
  const { d, classes, g } = ctx;
  const by = Object.fromEntries(d.map((x) => [x.id, x]));

  check('41 drugs', d.length === 41, d.length);
  check('every drug has a label entry (object or null)', d.every((x) => 'label' in x), d.filter((x) => !('label' in x)).map((x) => x.id).join());
  check('label links point to DailyMed', d.every((x) => !x.label || x.label.url.startsWith('https://dailymed.nlm.nih.gov/')));
  check('NLEM codes are b / s / ex / null', d.every((x) => [null, 'b', 's', 'ex'].includes(x.nlemCode) && x.nlem === !!x.nlemCode));
  const notListed = ['ramipril', 'valsartan', 'telmisartan', 'bisoprolol', 'indapamide', 'chlorthalidone', 'sacubitril_valsartan', 'empagliflozin', 'clonidine', 'spc_losartan_hctz'];
  check('NLEM 2569: drugs not on the HT list are not tagged', notListed.every((id) => by[id].nlem === false), notListed.filter((id) => by[id].nlem).join());
  check('NLEM 2569: nifedipine ex, carvedilol s, doxazosin s, manidipine b', by.nifedipine_cr.nlemCode === 'ex' && by.carvedilol.nlemCode === 's' && by.doxazosin.nlemCode === 's' && by.manidipine.nlemCode === 'b');
  check('no price levels without a source', d.every((x) => x.costLevel == null));
  check('ARNI is not a first-line class', classes.find((c) => c.id === 'arni').categoryId !== 'first_line');
  check('every drug has an English and Thai CPG grade', d.every((x) => x.thaiGuidelineClass && x.thaiGuidelineClassTh));
  check('eplerenone: HT contraindicated if CrCl < 50, max 100 mg/day', by.eplerenone.renalAdjustment.minEgfrSafe === 50 && /100 mg/.test(by.eplerenone.maxDose));
  check('spironolactone: no hard K+ <= 4.5 rule', !/K\+ <= 4\.5/.test(by.spironolactone.renalAdjustment.textEn));

  const crisisText = JSON.stringify(g.hypertensiveCrises);
  check('crises: no "15% in 24 hours" target', g.hypertensiveCrises.table41_emergencySyndromes.every((r) => !/15%/.test(r.bpTargetEn + r.timelineEn)));
  check('crises: no "within 20 minutes"', !/20 minutes/i.test(crisisText));
  check('crises: every row has Thai timing', g.hypertensiveCrises.table41_emergencySyndromes.every((r) => r.timelineTh));
  check('PA renin target graded IIb', /Class IIb, Level B/.test(g.secondaryHT.etiologies.find((e) => e.id === 'pa').treatmentEn));
  check('every secondary-HT cause has Thai treatment text', g.secondaryHT.etiologies.every((e) => e.treatmentTh), g.secondaryHT.etiologies.filter((e) => !e.treatmentTh).map((e) => e.id).join());
  check('when-to-suspect list is bilingual', g.secondaryHT.whenToSuspect.every((w) => w.en && w.th));
  check('stroke card does not prefer a drug class', !/PROGRESS|PATS/.test(JSON.stringify(g.specialPopulations)));
}

// ---------------- Part 2: browser ----------------
async function browserChecks() {
  const exe = BROWSERS.find((p) => fs.existsSync(p));
  if (!exe) throw new Error('No Edge or Chrome found.');
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'htg-test-'));
  const browser = spawn(exe, [
    '--headless=new', '--disable-gpu', '--no-first-run', '--remote-debugging-port=0',
    '--disable-background-timer-throttling', '--disable-renderer-backgrounding',
    `--user-data-dir=${profile}`, '--window-size=1280,1000', 'about:blank',
  ], { stdio: 'ignore' });

  try {
    let port;
    for (let i = 0; i < 100 && !port; i++) {
      await sleep(100);
      try { port = fs.readFileSync(path.join(profile, 'DevToolsActivePort'), 'utf8').split('\n')[0].trim(); } catch (e) { /* not yet */ }
    }
    if (!port) throw new Error('Browser did not open a debugging port.');
    let target;
    for (let i = 0; i < 50 && !target; i++) {
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      target = list.find((t) => t.type === 'page');
      if (!target) await sleep(100);
    }
    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

    let nextId = 1;
    const pending = new Map();
    const errors = [];
    ws.onmessage = (m) => {
      const msg = JSON.parse(m.data);
      if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') errors.push(msg.params.args.map((a) => a.value || a.description || '').join(' '));
      if (msg.method === 'Runtime.exceptionThrown') errors.push(msg.params.exceptionDetails.exception ? msg.params.exceptionDetails.exception.description : msg.params.exceptionDetails.text);
      if (pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
    };
    const send = (method, params = {}, ms = 20000) => new Promise((resolve, reject) => {
      const id = nextId++;
      const timer = setTimeout(() => { pending.delete(id); reject(new Error(method + ' timed out')); }, ms);
      pending.set(id, (msg) => { clearTimeout(timer); if (msg.error) reject(new Error(msg.error.message)); else resolve(msg.result); });
      ws.send(JSON.stringify({ id, method, params }));
    });
    const evaluate = async (expr) => {
      const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
      if (res.exceptionDetails) throw new Error('Eval error: ' + (res.exceptionDetails.exception ? res.exceptionDetails.exception.description : res.exceptionDetails.text));
      return res.result.value;
    };
    const setWidth = (w) => send('Emulation.setDeviceMetricsOverride', { width: w, height: w < 600 ? 812 : 1000, deviceScaleFactor: 1, mobile: w < 600 });

    await send('Runtime.enable');
    await send('Page.enable');
    await send('Page.navigate', { url: pathToFileURL(PAGE).href });
    await sleep(2500);
    await evaluate(`localStorage.clear(); location.reload(); true`);
    await sleep(2500);

    check('page renders 41 drug cards', (await evaluate(`document.querySelectorAll('[id^="drug-"]').length`)) === 41);
    check('every drug picture is N/A', await evaluate(`[...document.querySelectorAll('[id^="drug-"]')].every(c => c.querySelector('[data-picture-na]'))`));
    check('version badge shows v1.1.0', (await evaluate(`(document.querySelector('[data-version-badge]')||{}).textContent`)) === 'v1.1.0');
    check('1st-line filter excludes ARNI', await evaluate(`(async () => {
      const b = [...document.querySelectorAll('[data-quick-filters] button')][1]; b.click();
      await new Promise(r => setTimeout(r, 200));
      const hasArni = !!document.getElementById('drug-sacubitril_valsartan');
      b.click(); await new Promise(r => setTimeout(r, 200));
      return !hasArni;
    })()`));

    // detail view sources
    const detail = await evaluate(`(async () => {
      document.querySelector('#drug-eplerenone [data-details]').click();
      await new Promise(r => setTimeout(r, 300));
      const s = document.querySelector('[data-sources]');
      const out = { sources: !!s, link: !!(s && s.querySelector('a[href*="dailymed"]')) };
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await new Promise(r => setTimeout(r, 200));
      out.closed = !document.querySelector('[data-sources]');
      return out;
    })()`);
    check('detail view has a Sources block with a DailyMed link', detail.sources && detail.link);
    check('Escape closes the detail view', detail.closed);

    // changelog
    check('changelog opens from the badge', await evaluate(`(async () => {
      document.querySelector('[data-version-badge]').click();
      await new Promise(r => setTimeout(r, 200));
      const ok = !!document.querySelector('[data-changelog]');
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await new Promise(r => setTimeout(r, 200));
      return ok && !document.querySelector('[data-changelog]');
    })()`));

    // theme
    check('theme button toggles dark mode and remembers it', await evaluate(`(async () => {
      const before = document.documentElement.classList.contains('dark');
      document.querySelector('[data-theme-toggle]').click();
      await new Promise(r => setTimeout(r, 200));
      const after = document.documentElement.classList.contains('dark');
      const saved = localStorage.getItem('htg-theme');
      document.querySelector('[data-theme-toggle]').click();
      await new Promise(r => setTimeout(r, 200));
      return before !== after && saved === (after ? 'dark' : 'light');
    })()`));

    // secondary screener: each box shows advice
    check('secondary-HT screener shows advice for "resistant" alone', await evaluate(`(async () => {
      document.querySelector('[data-tab="tools"]').click();
      await new Promise(r => setTimeout(r, 200));
      [...document.querySelectorAll('[data-tool-tabs] button')][2].click();
      await new Promise(r => setTimeout(r, 200));
      const label = [...document.querySelectorAll('label')].find(l => /Resistant HT|ดื้อยา/.test(l.textContent));
      label.querySelector('input').click();
      await new Promise(r => setTimeout(r, 200));
      return /Primary Aldosteronism/.test(document.getElementById('main-app-container').textContent);
    })()`));

    // walk every tab, both languages, both widths
    const TABS = ['drugs', 'starting', 'secondary', 'resistant', 'crises', 'comorbidities', 'tools', 'references'];
    for (const width of [1280, 375]) {
      await setWidth(width);
      for (const lang of ['th', 'en']) {
        await evaluate(`(async () => {
          const want = '${lang}';
          if (document.documentElement.lang !== want) document.querySelector('[data-lang-toggle]').click();
          await new Promise(r => setTimeout(r, 200));
          window.dispatchEvent(new CustomEvent('htg-fold-all', { detail: true }));
          return true;
        })()`);
        for (const tab of TABS) {
          const r = await evaluate(`(async () => {
            document.querySelector('[data-tab="${tab}"]').click();
            await new Promise(r => setTimeout(r, 250));
            window.dispatchEvent(new CustomEvent('htg-fold-all', { detail: true }));
            await new Promise(r => setTimeout(r, 250));
            const main = document.getElementById('main-app-container');
            const text = main.innerText;
            const thai = '${lang}' === 'en' ? (text.match(/[^\\n]*[\\u0E00-\\u0E7F][^\\n]*/g) || []).slice(0, 3) : [];
            return {
              len: text.length,
              folds: document.querySelectorAll('[data-fold]').length,
              overflow: document.documentElement.scrollWidth - window.innerWidth,
              undefinedText: /\\bundefined\\b/.test(text),
              thai,
            };
          })()`);
          const where = `${width}px ${lang} ${tab}`;
          check(`${where}: renders`, r.len > 200, r.len);
          check(`${where}: no "undefined" text`, !r.undefinedText);
          check(`${where}: no sideways page scroll`, r.overflow <= 0, r.overflow + 'px');
          if (lang === 'en') check(`${where}: no Thai text in English mode`, r.thai.length === 0, r.thai.join(' | ').slice(0, 160));
          if (!['drugs', 'tools'].includes(tab)) check(`${where}: blocks fold`, r.folds > 0, r.folds);
        }
      }
    }

    check('no console errors', errors.length === 0, errors.slice(0, 3).join(' | '));
    try { ws.close(); } catch (e) { /* closing */ }
  } finally {
    try { browser.kill('SIGKILL'); } catch (e) { /* already gone */ }
    await sleep(500);
    try { fs.rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 }); } catch (e) { /* temp left behind */ }
  }
}

(async () => {
  dataChecks();
  if (!process.argv.includes('--data-only')) await browserChecks();
  console.log(failures ? `\n${failures} check(s) FAILED` : '\nAll checks passed');
  process.exit(failures ? 1 : 0);
})().catch((e) => { console.error('Test error:', e); process.exit(1); });
