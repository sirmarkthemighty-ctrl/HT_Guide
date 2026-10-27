// --- Layout pieces: changelog, colour-coded foldable blocks ---

// Newest first. The header badge reads changelogData[0].version. One entry per day.
const changelogData = [
  {
    version: 'v1.1.0',
    date: 'October 27, 2026',
    titleEn: 'Checked against the Thai CPG 2567 and NLEM 2569',
    titleTh: 'ตรวจทานกับแนวทางฯ 2567 และบัญชียาหลักแห่งชาติ 2569',
    features: [
      'Every guideline block is colour-coded and folds; only the first block of each tab starts open, and each tab has Expand all / Collapse all.',
      'Changelog (this window) and version badge in the header.',
      'Drug detail view: Sources block with the US label link for 38 drugs, the Thai CPG and NLEM 2569; NLEM conditions shown.',
      'Secondary HT tab shows confirmatory test and imaging; the crisis tab shows the PSH steps; English and Thai for every guideline line.',
      'Phone layout: only the title bar stays pinned; tabs, filter chips and tool buttons wrap instead of scrolling sideways; Patient Sheet button on phones.',
      'Sun/moon theme button follows the device until you tap it.',
    ],
    bugs: [
      'NLEM tags corrected to NLEM 2569 (b / s / ex); ramipril, valsartan, telmisartan, bisoprolol, indapamide, chlorthalidone, sacubitril/valsartan, empagliflozin and the SPCs are not on the list.',
      'ARNI moved out of the first-line classes (Thai CPG Table 12) and the 1st-line filter.',
      'Drug grades now show the Thai CPG class-level grade with its table, not trial names.',
      'Eplerenone: hypertension dose 50 mg once to twice daily; not if CrCl < 50 (US label). Coveram kidney dosing, Concor AM 10/10 mg, telmisartan liver note, ramipril maximum source.',
      'Spironolactone: use if eGFR >= 30, with caution if eGFR < 45 or K+ > 4.5 (was a hard K+ cut-off).',
      'Crises: aortic dissection "as fast as possible" (not 20 min); ischaemic stroke without reperfusion follows the CPG (not the 15% rule); sICH grades; pre-eclampsia doses from Table 30.',
      'Primary aldosteronism renin target is Class IIb, B; monotherapy rule, CAD and stroke drug choice, PSH grades corrected.',
      'Secondary HT screener now shows advice for every ticked box.',
      'Content not in the Thai CPG is marked [Not in Thai CPG 2567]; prices and drug pictures show Unknown / N/A because no source is recorded.',
      'Classification colour dots now show.',
    ],
  },
  {
    version: 'v1.0.0',
    date: 'October 23, 2026',
    titleEn: 'First version',
    titleTh: 'เวอร์ชันแรก',
    features: ['Drug list (41 drugs), guideline tabs, clinical tools, compare and patient sheet.'],
    bugs: [],
  },
];
const APP_VERSION = changelogData[0].version;

const ChangelogModal = ({ lang, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60" onClick={onClose} data-changelog>
    <div className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[88vh] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">{lang === 'th' ? 'บันทึกการเปลี่ยนแปลง' : 'Changelog'}</h2>
        <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Close">
          <XIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="p-4 overflow-y-auto space-y-5 text-sm">
        {changelogData.map((c) => (
          <div key={c.version} className="space-y-1.5">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <span className="font-mono font-black text-rose-600 dark:text-rose-400">{c.version}</span>
              <span className="text-xs text-slate-500">{c.date}</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{lang === 'th' ? c.titleTh : c.titleEn}</span>
            </div>
            {c.features.length > 0 && (
              <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
                {c.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            )}
            {c.bugs.length > 0 && (
              <>
                <div className="text-xs font-bold text-amber-700 dark:text-amber-300 pt-1">{lang === 'th' ? 'แก้ไข' : 'Fixes'}</div>
                <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
                  {c.bugs.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Colour tones for blocks: literal class names so Tailwind keeps them
const FOLD_TONES = {
  rose: { edge: 'border-l-rose-500', head: 'bg-rose-50 dark:bg-rose-950/40', title: 'text-rose-900 dark:text-rose-200', icon: 'text-rose-600 dark:text-rose-400' },
  amber: { edge: 'border-l-amber-500', head: 'bg-amber-50 dark:bg-amber-950/40', title: 'text-amber-900 dark:text-amber-200', icon: 'text-amber-600 dark:text-amber-400' },
  teal: { edge: 'border-l-teal-500', head: 'bg-teal-50 dark:bg-teal-950/40', title: 'text-teal-900 dark:text-teal-200', icon: 'text-teal-600 dark:text-teal-400' },
  emerald: { edge: 'border-l-emerald-500', head: 'bg-emerald-50 dark:bg-emerald-950/40', title: 'text-emerald-900 dark:text-emerald-200', icon: 'text-emerald-600 dark:text-emerald-400' },
  sky: { edge: 'border-l-sky-500', head: 'bg-sky-50 dark:bg-sky-950/40', title: 'text-sky-900 dark:text-sky-200', icon: 'text-sky-600 dark:text-sky-400' },
  violet: { edge: 'border-l-violet-500', head: 'bg-violet-50 dark:bg-violet-950/40', title: 'text-violet-900 dark:text-violet-200', icon: 'text-violet-600 dark:text-violet-400' },
  indigo: { edge: 'border-l-indigo-500', head: 'bg-indigo-50 dark:bg-indigo-950/40', title: 'text-indigo-900 dark:text-indigo-200', icon: 'text-indigo-600 dark:text-indigo-400' },
  slate: { edge: 'border-l-slate-400', head: 'bg-slate-50 dark:bg-slate-800/60', title: 'text-slate-900 dark:text-slate-100', icon: 'text-slate-500 dark:text-slate-400' },
};
// Cycle used when a tab has many blocks of the same kind
const TONE_CYCLE = ['rose', 'sky', 'emerald', 'amber', 'violet', 'teal', 'indigo'];

const FOLD_KEY = 'htg-folds';
const readFolds = () => {
  try { return JSON.parse(localStorage.getItem(FOLD_KEY)) || {}; } catch (e) { return {}; }
};
const saveFold = (id, open) => {
  try { const f = readFolds(); f[id] = open; localStorage.setItem(FOLD_KEY, JSON.stringify(f)); } catch (e) { /* storage blocked: state just is not remembered */ }
};

// A block with a coloured left edge and a header that folds it. State is remembered per id.
const Fold = ({ id, title, icon: Icon, tone = 'slate', defaultOpen = false, badge, children }) => {
  const c = FOLD_TONES[tone] || FOLD_TONES.slate;
  const [open, setOpen] = useState(() => {
    const saved = readFolds()[id];
    return saved === undefined ? defaultOpen : saved;
  });
  useEffect(() => {
    const onAll = (e) => { setOpen(e.detail); saveFold(id, e.detail); };
    window.addEventListener('htg-fold-all', onAll);
    return () => window.removeEventListener('htg-fold-all', onAll);
  }, [id]);
  const toggle = () => setOpen((o) => { saveFold(id, !o); return !o; });

  return (
    <section className={`rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 ${c.edge} shadow-sm overflow-hidden`} data-fold={id} data-open={open ? '1' : '0'}>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className={`w-full flex items-start gap-2 px-4 py-3 text-left ${c.head}`}
      >
        {Icon && <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${c.icon}`} />}
        <span className={`flex-1 min-w-0 font-bold text-sm sm:text-base ${c.title}`}>{title}</span>
        {badge && <span className="shrink-0 text-[11px] font-bold px-2 py-0.5 rounded bg-white/80 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300">{badge}</span>}
        <svg viewBox="0 0 24 24" className={`w-5 h-5 mt-0.5 shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
      </button>
      {open && <div className="p-4 sm:p-5 space-y-4">{children}</div>}
    </section>
  );
};

const FoldAllBar = ({ lang }) => {
  const all = (open) => window.dispatchEvent(new CustomEvent('htg-fold-all', { detail: open }));
  const btn = 'px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-rose-400';
  return (
    <div className="flex flex-wrap justify-end gap-2 text-xs font-semibold" data-fold-all>
      <button type="button" className={btn} onClick={() => all(true)}>{lang === 'th' ? 'ขยายทั้งหมด' : 'Expand all'}</button>
      <button type="button" className={btn} onClick={() => all(false)}>{lang === 'th' ? 'ย่อทั้งหมด' : 'Collapse all'}</button>
    </div>
  );
};

// Classification dot colours (literal classes; template strings get purged)
const DOT_COLOUR = { emerald: 'bg-emerald-500', teal: 'bg-teal-500', amber: 'bg-amber-500', orange: 'bg-orange-500', rose: 'bg-rose-500', red: 'bg-red-600', blue: 'bg-blue-500', indigo: 'bg-indigo-500' };
