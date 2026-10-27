// --- Layout pieces: changelog, guide windows, disclaimer, colour-coded foldable blocks ---

// Newest first. The header badge reads changelogData[0].version. One entry per day.
const changelogData = [
  {
    version: 'v1.3.0',
    date: 'October 27, 2026',
    titleEn: 'Bronchodilator Guide layout; checked against the Thai CPG 2567 and NLEM 2569',
    titleTh: 'หน้าตาแบบคู่มือยาพ่นขยายหลอดลม; ตรวจทานกับแนวทางฯ 2567 และบัญชียาหลักแห่งชาติ 2569',
    features: [
      'Same layout as the Bronchodilator Guide: drug list on the main page; version, language and sun/moon buttons at the top right; guide buttons that open each guideline section in its own window (two rows of icon tiles on phones).',
      'Pinned search row with sort, card / list view and a Filters button; filters in compact groups (NLEM 2569, bookmarks, drug type, class, clinical) with removable chips and a result count.',
      'Cards: Select, Details and Bookmark buttons at the top right, a facts box (kidney, pregnancy, potassium, starting dose) and the maximum dose at the bottom; a click on the card opens the details.',
      'Drug details: one scrolling page of colour-coded sections that fold, Expand all / Collapse all, and Show sources with the product label link for 38 drugs (US label, or EU product information for Micardis and Twynsta), the Thai CPG and NLEM 2569.',
      'Guideline windows: every block is colour-coded and folds, with Expand all / Collapse all; English and Thai for every guideline line.',
      'Selected drugs show in a bar at the bottom of the screen; disclaimer at the end of the page.',
      'References: a collapsible, numbered list at the bottom of the page; each item says what it was used for, with the guideline grade key.',
      'Sun/moon theme button follows the device until you tap it. Changelog in this window.',
      'Drug pictures for 31 medicines, drawn from the colour, shape and score written in the label of the same maker\'s brand sold in Thailand (US label; EU product information; Irish or UK SmPC or leaflet; Japanese package insert); the detail view names the brand and links the label. The other 10 show N/A.',
    ],
    bugs: [
      'NLEM tags corrected to NLEM 2569 (b / s / ex); ramipril, valsartan, telmisartan, bisoprolol, indapamide, chlorthalidone, sacubitril/valsartan, empagliflozin and the SPCs are not on the list.',
      'ARNI moved out of the first-line classes (Thai CPG Table 12) and the first-line filter.',
      'Drug grades show the Thai CPG class-level grade with its table, not trial names.',
      'Eplerenone: hypertension dose 50 mg once to twice daily; not if CrCl < 50 (US label). Coveram kidney dosing, Concor AM 10/10 mg, telmisartan liver note, ramipril maximum source.',
      'Spironolactone: use if eGFR >= 30, with caution if eGFR < 45 or K+ > 4.5 (was a hard K+ cut-off).',
      'Crises: aortic dissection "as fast as possible" (not 20 min); ischaemic stroke without reperfusion follows the CPG (not the 15% rule); sICH grades; pre-eclampsia doses from Table 30.',
      'Primary aldosteronism renin target is Class IIb, B; monotherapy rule, CAD and stroke drug choice, PSH grades corrected.',
      'Secondary HT screener shows advice for every ticked box.',
      'Content not in the Thai CPG is marked [Not in Thai CPG 2567]; prices show Unknown because no price source is recorded.',
      'Classification colour dots show.',
    ],
  },
  {
    version: 'v1.0.0',
    date: 'October 23, 2026',
    titleEn: 'First version',
    titleTh: 'เวอร์ชันแรก',
    features: ['Drug list (41 drugs), guideline sections, clinical tools, compare and patient sheet.'],
    bugs: [],
  },
];
const APP_VERSION = changelogData[0].version;

const ChangelogModal = ({ lang, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} data-changelog>
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
      <div className="px-5 sm:px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2.5 bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 rounded-xl shrink-0"><HistoryIcon className="w-5 h-5" /></div>
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">{lang === 'th' ? 'บันทึกการเปลี่ยนแปลง' : 'Changelog'}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{lang === 'th' ? 'สิ่งที่เพิ่มและแก้ไขในแต่ละเวอร์ชัน' : 'What changed in each version'}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-slate-700 rounded-full transition-colors shrink-0" aria-label={lang === 'th' ? 'ปิด' : 'Close'}><XIcon className="w-5 h-5" /></button>
      </div>
      <div className="p-4 sm:p-6 flex-grow overflow-y-auto space-y-5 bg-slate-50 dark:bg-slate-900">
        {changelogData.map((log, idx) => (
          <div key={log.version} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 sm:p-5 shadow-sm relative overflow-hidden">
            {idx === 0 && (
              <div className="absolute top-0 right-0 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-widest border-b border-l border-emerald-200 dark:border-emerald-800">
                {lang === 'th' ? 'ล่าสุด' : 'Latest'}
              </div>
            )}
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 mb-1 pr-16">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">{log.version}</h3>
              <span className="text-xs font-bold text-slate-400">{log.date}</span>
            </div>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-3 border-b border-slate-100 dark:border-slate-700 pb-2.5">{lang === 'th' ? log.titleTh : log.titleEn}</p>
            <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <SparklesIcon className="w-3.5 h-3.5" /> {lang === 'th' ? 'สิ่งใหม่' : 'New'}
            </span>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 pl-5 list-disc leading-relaxed">
              {log.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
            {log.bugs.length > 0 && (
              <>
                <span className="text-[11px] font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider mt-3 mb-2 flex items-center gap-1.5">
                  <AlertTriangleIcon className="w-3.5 h-3.5" /> {lang === 'th' ? 'แก้ไข' : 'Fixes'}
                </span>
                <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 pl-5 list-disc leading-relaxed">
                  {log.bugs.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 flex justify-end">
        <button onClick={onClose} className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors">{lang === 'th' ? 'ปิด' : 'Close'}</button>
      </div>
    </div>
  </div>
);

// Window that holds one guideline section or tool (opened from a guide button)
const GuideWindow = ({ id, title, icon: Icon, tone, lang, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/70 backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} data-guide-window={id}>
    <div className="bg-slate-100 dark:bg-slate-950 w-full max-w-5xl max-h-[95vh] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden" role="dialog" aria-modal="true" aria-label={title}>
      <div className={`flex items-center justify-between gap-3 px-4 sm:px-5 py-3 text-white shrink-0 ${tone}`}>
        <h2 className="flex items-center gap-2 font-extrabold text-base sm:text-lg leading-tight min-w-0">
          {Icon && <Icon className="w-5 h-5 shrink-0" />}<span className="break-words">{title}</span>
        </h2>
        <button onClick={onClose} className="p-2 -m-1 rounded-full text-white/80 hover:text-white hover:bg-white/15 shrink-0" aria-label={lang === 'th' ? 'ปิด' : 'Close'} data-guide-close><XIcon className="w-5 h-5" /></button>
      </div>
      <div className="p-3 sm:p-5 overflow-y-auto flex-1" id="main-app-container">{children}</div>
    </div>
  </div>
);

// Disclaimer at the end of the page (linked from the header)
const DisclaimerSection = ({ lang }) => (
  <section className="mt-10 md:mt-14 pt-6 border-t border-slate-200 dark:border-slate-800" aria-labelledby="disclaimer-heading">
    <h2 id="disclaimer-heading" className="text-sm font-extrabold text-amber-800 dark:text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-2">
      <AlertTriangleIcon className="w-4 h-4" /> {lang === 'th' ? 'ข้อจำกัดความรับผิดชอบ' : 'Disclaimer'}
    </h2>
    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-900 rounded-xl p-3 md:p-4">
      {lang === 'th'
        ? 'แอปนี้เป็นเครื่องมือช่วยตัดสินใจสำหรับบุคลากรทางการแพทย์ สรุปจากแนวทางการรักษาโรคความดันโลหิตสูงในเวชปฏิบัติทั่วไป พ.ศ. 2567 บัญชียาหลักแห่งชาติ พ.ศ. 2569 และฉลากยา ไม่ใช้แทนแนวทางฯ ฉบับเต็ม ฉลากยา หรือดุลยพินิจทางคลินิก ราคาและชื่อการค้ายังไม่มีแหล่งข้อมูลที่ตรวจสอบแล้ว รูปยาวาดจากคำบรรยายในฉลากและอาจต่างจากยาในไทย ข้อความที่มีเครื่องหมาย [ไม่มีในแนวทางฯ 2567] ไม่ได้มาจากแนวทางฯ'
        : 'Decision support for healthcare professionals, summarised from the Thai Guidelines on the Treatment of Hypertension in General Practice B.E. 2567 (2024), NLEM B.E. 2569 and product labels. It does not replace the full guideline, the product label or clinical judgement. Prices and brand names have no checked source yet; drug pictures are drawn from label descriptions and may differ from Thai packs. Text marked [Not in Thai CPG 2567] does not come from the guideline.'}
    </p>
  </section>
);

// --- References: collapsible section at the bottom of the page (Bronchodilator Guide style) ---
const REFERENCES = [
  { key: 'cpg', cite: SOURCES.cpg.en, url: SOURCES.cpg.url, usedForEn: 'All guideline content: classification, targets, drug strategy, secondary and resistant HT, crises, comorbidities, CPG grades. Tables and pages refer to this Thai edition (printed page numbers).', usedForTh: 'เนื้อหาตามแนวทางทั้งหมด: การจำแนกความดัน เป้าหมาย กลยุทธ์การใช้ยา ความดันทุติยภูมิและดื้อยา ภาวะวิกฤต โรคร่วม และระดับคำแนะนำ (ตารางและหน้าอ้างอิงฉบับภาษาไทย เลขหน้าตามที่พิมพ์)' },
  { key: 'cpgEn', cite: SOURCES.cpgEn.en, url: SOURCES.cpgEn.url, usedForEn: 'English wording of the same guideline, checked against the Thai edition.', usedForTh: 'ฉบับภาษาอังกฤษของแนวทางเดียวกัน ใช้ตรวจทานกับฉบับภาษาไทย' },
  { key: 'nlem', cite: SOURCES.nlem.en, url: SOURCES.nlem.url, usedForEn: 'NLEM status (b / s / ex) and its conditions for each drug.', usedForTh: 'สถานะในบัญชียาหลัก (b / s / ex) และเงื่อนไขของยาแต่ละตัว' },
  { key: 'dailymed', cite: SOURCES.dailymed.en, url: SOURCES.dailymed.url, usedForEn: 'Doses, kidney dosing and tablet descriptions for drug pictures; each drug links its own label in the detail view.', usedForTh: 'ขนาดยา การปรับยาตามไต และคำบรรยายลักษณะเม็ดยาสำหรับภาพยา (หน้ารายละเอียดยาแต่ละตัวมีลิงก์ฉลากของยานั้น)' },
  { key: 'ema', cite: 'European Medicines Agency. Product information: Micardis, Twynsta.', url: 'https://www.ema.europa.eu/en/medicines', usedForEn: 'Doses and tablet descriptions for telmisartan (Micardis) and telmisartan/amlodipine (Twynsta).', usedForTh: 'ขนาดยาและคำบรรยายลักษณะเม็ดยาของ telmisartan (Micardis) และ telmisartan/amlodipine (Twynsta)' },
  { key: 'sprint', cite: 'SPRINT Research Group. A randomized trial of intensive versus standard blood-pressure control. N Engl J Med 2015;373:2103-2116.', url: 'https://doi.org/10.1056/NEJMoa1511939', usedForEn: 'Named in the Thai CPG: intensive SBP target < 120 mmHg reduced the primary CV outcome by 25%.', usedForTh: 'อ้างในแนวทางฯ: เป้า SBP < 120 มม.ปรอท ลดเหตุการณ์หลักทางหัวใจและหลอดเลือดร้อยละ 25' },
  { key: 'step', cite: 'Zhang W, et al. Trial of intensive blood-pressure control in older patients with hypertension (STEP). N Engl J Med 2021;385:1268-1279.', url: 'https://doi.org/10.1056/NEJMoa2111437', usedForEn: 'Named in the Thai CPG: SBP 110-129 mmHg in older patients reduced CV events.', usedForTh: 'อ้างในแนวทางฯ: SBP 110-129 มม.ปรอท ในผู้สูงอายุลดเหตุการณ์ทางหัวใจและหลอดเลือด' },
  { key: 'pathway2', cite: 'Williams B, et al. Spironolactone versus placebo, bisoprolol, and doxazosin in drug-resistant hypertension (PATHWAY-2). Lancet 2015;386:2059-2068.', url: 'https://doi.org/10.1016/S0140-6736(15)00257-3', usedForEn: 'Named in the Thai CPG: spironolactone as the 4th drug in resistant hypertension.', usedForTh: 'อ้างในแนวทางฯ: spironolactone เป็นยาชนิดที่ 4 ใน resistant hypertension' },
  { key: 'start', cite: 'Schmieder RE, et al. Single-pill combinations in hypertension: results from the START-study. Hypertension 2023;80:1127-1135.', url: 'https://doi.org/10.1161/HYPERTENSIONAHA.122.20810', usedForEn: 'Named in the Thai CPG: single-pill combinations improved persistence and lowered CV events and mortality.', usedForTh: 'อ้างในแนวทางฯ: ยารวมเม็ดเพิ่มความต่อเนื่องในการใช้ยา และลดเหตุการณ์ทางหัวใจและการเสียชีวิต' },
  { key: 'time', cite: 'Mackenzie IS, et al. Evening versus morning dosing of usual antihypertensives (TIME). Lancet 2022;400:1417-1425.', url: 'https://doi.org/10.1016/S0140-6736(22)01786-X', usedForEn: 'Named in the Thai CPG: timing of antihypertensive doses (Table 13).', usedForTh: 'อ้างในแนวทางฯ: ช่วงเวลาที่ให้ยาลดความดัน (ตารางที่ 13)' },
  { key: 'paragon', cite: 'Jackson AM, et al. Sacubitril-valsartan for apparent resistant hypertension in HFpEF. Eur Heart J 2021;42:3741-3752.', url: 'https://doi.org/10.1093/eurheartj/ehab499', usedForEn: 'Named in the Thai CPG: ARNI in resistant hypertension with HFpEF.', usedForTh: 'อ้างในแนวทางฯ: ARNI ใน resistant hypertension ที่มี HFpEF' },
  { key: 'select', cite: 'Lincoff AM, et al. Semaglutide and cardiovascular outcomes in obesity without diabetes (SELECT). N Engl J Med 2023;389:2221-2232.', url: 'https://doi.org/10.1056/NEJMoa2307563', usedForEn: 'Named in the Thai CPG: semaglutide in obesity with ASCVD.', usedForTh: 'อ้างในแนวทางฯ: semaglutide ในผู้ที่อ้วนและมี ASCVD' },
  { key: 'click', cite: 'Agarwal R, et al. Chlorthalidone for hypertension in advanced chronic kidney disease (CLICK). N Engl J Med 2021;385:2507-2519.', url: 'https://doi.org/10.1056/NEJMoa2110730', usedForEn: 'Chlorthalidone in stage 4 CKD (eGFR 15-30); referred to in this app, not named in the CPG.', usedForTh: 'chlorthalidone ใน CKD ระยะ 4 (eGFR 15-30) อ้างในแอปนี้ ไม่ได้ระบุชื่อในแนวทางฯ' },
];

const ReferencesSection = ({ lang }) => {
  const [open, setOpen] = useState(false);
  const L = (th, en) => (lang === 'th' ? th : en);
  const GRADES = [
    ['I', 'text-emerald-700 dark:text-emerald-400', 'ควรปฏิบัติ', 'Should be practised'],
    ['IIa', 'text-teal-700 dark:text-teal-400', 'น่าปฏิบัติ', 'Could be practised'],
    ['IIb', 'text-amber-700 dark:text-amber-400', 'อาจปฏิบัติ', 'May be practised'],
    ['III', 'text-rose-700 dark:text-rose-400', 'ไม่ควรหรือห้ามปฏิบัติ', 'Should not / must not be practised'],
    ['A', 'text-blue-700 dark:text-blue-400', 'RCT คุณภาพดีหลายการศึกษา หรือ meta-analysis', 'Several high-quality RCTs or meta-analyses'],
    ['B', 'text-indigo-700 dark:text-indigo-400', 'RCT คุณภาพดีอย่างน้อย 1 การศึกษา หรือการศึกษาขนาดใหญ่', 'At least one high-quality RCT, or a large non-randomised study'],
    ['C', 'text-slate-700 dark:text-slate-300', 'การศึกษาอื่น ทะเบียนข้อมูล หรือความเห็นผู้เชี่ยวชาญ', 'Other studies, registries or expert opinion'],
  ];
  return (
    <section className="mt-10 md:mt-14 pt-6 border-t border-slate-200 dark:border-slate-800" aria-labelledby="refs-heading" data-references>
      <h2 id="refs-heading" className="text-sm font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} data-refs-toggle
          className="w-full flex items-center justify-between gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
          <span className="uppercase tracking-wider flex items-center gap-2">
            <BookOpenIcon className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>{L('เอกสารอ้างอิง', 'References')}</span>
            <span className="text-slate-400 font-bold normal-case tracking-normal">({REFERENCES.length})</span>
          </span>
          <ChevronDownIcon className={`w-4 h-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </h2>
      {open && (
        <div className="mt-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm" data-refs-list>
          <ol className="flex flex-col gap-3.5">
            {REFERENCES.map((r, i) => (
              <li key={r.key} className="flex gap-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-b border-slate-100 dark:border-slate-800 pb-3 last:border-b-0 last:pb-0">
                <span className="shrink-0 font-bold text-teal-600 dark:text-teal-400 tabular-nums w-5 text-right">{i + 1}.</span>
                <span className="min-w-0 flex-1">
                  <span className="font-medium text-slate-800 dark:text-slate-200">{lang === 'th' && SOURCES[r.key] ? SOURCES[r.key].th : r.cite}</span>
                  {r.url && (
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="ml-1 text-teal-600 dark:text-teal-400 hover:underline break-all inline-flex items-center gap-0.5">
                      <span>[{r.url}]</span><ExternalLinkIcon className="w-3 h-3 inline" />
                    </a>
                  )}
                  <span className="block text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    <strong className="text-slate-700 dark:text-slate-300">{L('ใช้สำหรับ', 'Used for')}:</strong> {lang === 'th' ? r.usedForTh : r.usedForEn}
                  </span>
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800" data-grades-key>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">{L('ระดับคำแนะนำและคุณภาพหลักฐาน (แนวทางฯ 2567)', 'Strength of recommendation and quality of evidence (Thai CPG 2567)')}</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-slate-700 dark:text-slate-300">
              {GRADES.map(([k, cls, th, en]) => <li key={k}><strong className={cls}>{k}:</strong> {L(th, en)}</li>)}
            </ul>
            <p className="mt-3 text-[11px] text-slate-500 dark:text-slate-400">
              {L('ข้อความที่มีเครื่องหมาย [ไม่มีในแนวทางฯ 2567] ไม่ได้มาจากแนวทางฯ ราคาและชื่อการค้ายังไม่มีแหล่งข้อมูลที่ตรวจสอบแล้ว',
                'Text marked [Not in Thai CPG 2567] does not come from the guideline. Prices and brand names have no checked source yet.')}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

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
