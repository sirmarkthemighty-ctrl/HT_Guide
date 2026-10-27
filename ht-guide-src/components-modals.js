// --- Drug detail view (bronchodilator style): one scrolling page of colour-coded, foldable sections ---

const DETAIL_TONE = {
  teal: ['border-l-teal-500', 'text-teal-700 dark:text-teal-300'],
  emerald: ['border-l-emerald-500', 'text-emerald-700 dark:text-emerald-300'],
  rose: ['border-l-rose-500', 'text-rose-700 dark:text-rose-300'],
  amber: ['border-l-amber-500', 'text-amber-700 dark:text-amber-300'],
  indigo: ['border-l-indigo-500', 'text-indigo-700 dark:text-indigo-300'],
  sky: ['border-l-sky-500', 'text-sky-700 dark:text-sky-300'],
  cyan: ['border-l-cyan-500', 'text-cyan-700 dark:text-cyan-300'],
  slate: ['border-l-slate-400', 'text-slate-600 dark:text-slate-300'],
};
const FoldSection = ({ id, title, icon: Icon, tone = 'slate', open, onToggle, children }) => {
  const [edge, text] = DETAIL_TONE[tone] || DETAIL_TONE.slate;
  return (
    <section className={`bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 border-l-4 ${edge}`} data-detail-fold={id} data-open={open ? '1' : '0'}>
      <h3 className="m-0">
        <button type="button" onClick={onToggle} aria-expanded={open}
          className={`w-full flex items-center justify-between gap-3 px-3 sm:px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider ${text}`}>
          <span className="flex items-center gap-1.5 min-w-0">{Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}<span className="break-words">{title}</span></span>
          <ChevronDownIcon className={`w-4 h-4 shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </h3>
      {open && <div className="px-3 sm:px-4 pb-3 text-xs">{children}</div>}
    </section>
  );
};

// Short values sit beside the label; long text goes underneath
const DetailRow = ({ label, children, stack = false, valueClass = 'text-slate-700 dark:text-slate-200' }) => (
  <div className="py-1.5 border-b border-slate-200 dark:border-slate-700 last:border-b-0 min-w-0">
    {stack ? (
      <>
        {label && <span className="text-slate-500 dark:text-slate-400 font-medium block">{label}</span>}
        <span className={`font-semibold leading-snug block mt-0.5 break-words ${valueClass}`}>{children}</span>
      </>
    ) : (
      <div className="flex justify-between items-start gap-3 min-w-0">
        <span className="text-slate-500 dark:text-slate-400 font-medium break-words min-w-0">{label}</span>
        <span className={`font-bold text-right break-words shrink-0 max-w-[65%] ${valueClass}`}>{children}</span>
      </div>
    )}
  </div>
);

const BulletList = ({ items }) => (
  <ul className="list-disc pl-4 space-y-0.5 mt-0.5 font-medium text-slate-700 dark:text-slate-200 leading-snug">
    {(items || []).map((x, i) => <li key={i} className="break-words">{x}</li>)}
  </ul>
);

// "Source:" line under a section. items: {en, th, url}; none = "No source recorded"
const SourceLine = ({ items, lang }) => {
  const list = (items || []).filter(Boolean);
  return (
    <p className="mt-1.5 text-[10px] leading-snug text-slate-500 dark:text-slate-400 break-words" data-source>
      <span className="font-bold">{lang === 'th' ? 'แหล่งที่มา' : 'Source'}:</span>{' '}
      {list.length ? list.map((s, i) => (
        <span key={i}>{i > 0 && '; '}{s.url
          ? <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline decoration-dotted hover:text-teal-700 dark:hover:text-teal-300">{lang === 'th' ? s.th : s.en}</a>
          : (lang === 'th' ? s.th : s.en)}</span>
      )) : <span className="italic">{lang === 'th' ? 'ยังไม่มีแหล่งอ้างอิงที่ตรวจสอบแล้ว' : 'No source recorded'}</span>}
    </p>
  );
};

const DETAIL_FOLDS = ['dose', 'kidney', 'safety', 'interactions', 'advice', 'status', 'mechanism'];
const DETAIL_FOLD_KEY = 'htg-detail-folds';
const SRC_KEY = 'htg-show-sources';
const readDetailFolds = () => {
  try { const v = JSON.parse(localStorage.getItem(DETAIL_FOLD_KEY) || 'null'); if (v && typeof v === 'object') return v; } catch (e) { /* use default */ }
  return { dose: true };
};

const DrugDetailModal = ({ drug, lang, onClose, onToggleCompare, isCompared }) => {
  const [folds, setFolds] = useState(readDetailFolds);
  const [showSrc, setShowSrc] = useState(() => { try { return localStorage.getItem(SRC_KEY) === '1'; } catch (e) { return false; } });
  if (!drug) return null;
  const t = translations[lang];
  const L = (th, en) => (lang === 'th' ? th : en);
  const save = (next) => { setFolds(next); try { localStorage.setItem(DETAIL_FOLD_KEY, JSON.stringify(next)); } catch (e) { /* not remembered */ } };
  const fold = (k) => ({ id: k, open: !!folds[k], onToggle: () => save({ ...folds, [k]: !folds[k] }) });
  const allOpen = DETAIL_FOLDS.every((k) => folds[k]);
  const setAll = (v) => save(Object.fromEntries(DETAIL_FOLDS.map((k) => [k, v])));
  const toggleSrc = () => setShowSrc((v) => { try { localStorage.setItem(SRC_KEY, v ? '0' : '1'); } catch (e) { /* not remembered */ } return !v; });
  const src = (items) => (showSrc ? <SourceLine items={items} lang={lang} /> : null);
  const label = drug.label ? { en: drug.label.name, th: drug.label.name, url: drug.label.url } : null;
  const pic = DRUG_PICTURE[drug.id];
  const englishOnly = lang === 'th' ? <span className="block text-[10px] font-medium text-slate-400 mt-0.5">(ภาษาอังกฤษ)</span> : null;
  const btn = 'flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold border transition-colors';
  const btnOff = 'bg-white text-slate-600 border-slate-200 hover:border-teal-300 hover:text-teal-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300';

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} data-detail-modal>
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[95vh]" role="dialog" aria-modal="true" aria-label={drug.nameEn}>
        <div className="flex items-start gap-3 p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 rounded-t-2xl shrink-0">
          <div className="p-2 rounded-xl bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-700 shrink-0"><DrugPicture drug={drug} className="w-12 h-12 sm:w-14 sm:h-14" /></div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 mb-1">
              <ClassChip drug={drug} lang={lang} />
              <NlemChip drug={drug} lang={lang} />
              <GradeChip drug={drug} lang={lang} />
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-800 dark:text-white leading-tight break-words">{drug.nameEn}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 break-words">{lang === 'th' ? drug.nameTh + ' · ' + drug.genericName : drug.genericName}</p>
          </div>
          <button onClick={onClose} className="p-2 -m-1 text-slate-400 hover:text-slate-700 hover:bg-white dark:hover:bg-slate-700 dark:hover:text-slate-200 rounded-full transition-colors shrink-0" aria-label={t.close}><XIcon className="w-5 h-5" /></button>
        </div>

        <div className="p-3 sm:p-5 flex-grow overflow-y-auto flex flex-col gap-3 bg-white dark:bg-slate-900">
          <FoldSection {...fold('dose')} title={L('ขนาดยาและรูปแบบยา', 'Dose and forms')} icon={PillIcon} tone="teal">
            <DetailRow label={ui('brands', lang)} stack>
              {drug.brandNames.join(', ')}
              {!drug.brandsVerified && <span className="block text-[10px] font-medium text-amber-700 dark:text-amber-300 mt-0.5">{L('ยังไม่ได้ตรวจสอบกับทะเบียนยา อย.', 'Not yet checked against the Thai FDA register')}</span>}
            </DetailRow>
            <DetailRow label={L('ความแรง', 'Strengths')} stack>{drug.strengths.join(' • ')}</DetailRow>
            <DetailRow label={ui('start', lang)} stack>{lang === 'th' ? drug.startDoseTh : drug.startDose}</DetailRow>
            <DetailRow label={ui('usual', lang)} stack>{lang === 'th' ? drug.maintenanceDoseTh : drug.maintenanceDose}</DetailRow>
            <DetailRow label={ui('maxDose', lang)} stack valueClass="text-amber-800 dark:text-amber-300 font-bold">{lang === 'th' ? drug.maxDoseTh : drug.maxDose}</DetailRow>
            <DetailRow label={L('ภาพยา', 'Picture')} stack valueClass="text-slate-600 dark:text-slate-300 font-medium">
              {pic ? (
                <span data-picture-note>
                  {pic.brand}: {lang === 'th' ? pic.th : pic.en}.{' '}
                  <a href={pic.src[1]} target="_blank" rel="noopener noreferrer" className="underline decoration-dotted hover:text-teal-700 dark:hover:text-teal-300">{pic.src[0]}</a>
                  <span className="block text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{L('วาดจากคำบรรยายในฉลากยา สีเป็นค่าประมาณ ยาในไทยหรือยาชื่อสามัญอาจมีลักษณะต่างกัน', 'Drawn from the label description; colours are approximate. Thai packs and generics may look different.')}</span>
                </span>
              ) : L('N/A: ไม่พบคำบรรยายลักษณะยาในฉลากของยี่ห้อที่จำหน่ายในไทย', 'N/A: no label description found for a brand sold in Thailand')}
            </DetailRow>
            {src([label])}
          </FoldSection>

          <FoldSection {...fold('kidney')} title={L('ไตและตับ', 'Kidney and liver')} icon={KidneyIcon} tone="emerald">
            <DetailRow label={L('ปรับตามการทำงานของไต', 'Kidney dosing')} stack valueClass="text-emerald-800 dark:text-emerald-300">{lang === 'th' ? drug.renalAdjustment.textTh : drug.renalAdjustment.textEn}</DetailRow>
            <DetailRow label={ui('kidney', lang)} valueClass={KIDNEY_TONE(drug)}>{kidneyText(drug, lang)}</DetailRow>
            <DetailRow label={ui('potassium', lang)}>{potassiumText(drug, lang)}</DetailRow>
            <DetailRow label={L('โรคตับ', 'Liver disease')} stack>{lang === 'th' ? drug.hepaticAdjustment.textTh : drug.hepaticAdjustment.textEn}</DetailRow>
            {src([label])}
          </FoldSection>

          <FoldSection {...fold('safety')} title={L('ข้อห้ามใช้และผลข้างเคียง', 'Contraindications and side effects')} icon={AlertTriangleIcon} tone="amber">
            <DetailRow label={ui('pregnancy', lang)} valueClass={PREG_TONE[drug.pregnancyRisk] || PREG_TONE.caution}>{pregText(drug, lang)}</DetailRow>
            <DetailRow label={L('ข้อห้ามใช้', 'Contraindications')} stack><BulletList items={drug.contraindications.absolute} />{englishOnly}</DetailRow>
            <DetailRow label={L('ข้อควรระวัง', 'Cautions')} stack><BulletList items={drug.contraindications.relative} /></DetailRow>
            <DetailRow label={L('ผลข้างเคียงที่พบบ่อย', 'Common side effects')} stack><BulletList items={drug.sideEffects.common} /></DetailRow>
            <DetailRow label={L('ผลข้างเคียงรุนแรง', 'Serious side effects')} stack valueClass="text-rose-800 dark:text-rose-300"><BulletList items={drug.sideEffects.serious} /></DetailRow>
            {src([label])}
          </FoldSection>

          <FoldSection {...fold('interactions')} title={L('อันตรกิริยาและข้อควรทราบ', 'Interactions and precautions')} icon={ZapIcon} tone="rose">
            <DetailRow label={L('อันตรกิริยาระหว่างยา', 'Drug interactions')} stack><BulletList items={drug.drugInteractions} />{englishOnly}</DetailRow>
            {drug.precautions && drug.precautions.length > 0 && <DetailRow label={L('ข้อควรทราบ', 'Precautions')} stack><BulletList items={drug.precautions} /></DetailRow>}
            {src([label])}
          </FoldSection>

          <FoldSection {...fold('advice')} title={L('คำแนะนำผู้ป่วย', 'Patient advice')} icon={InfoIcon} tone="sky">
            <DetailRow label="" stack>{lang === 'th' ? drug.patientCounseling.th : drug.patientCounseling.en}</DetailRow>
          </FoldSection>

          <FoldSection {...fold('status')} title={L('แนวทางฯ บัญชียาหลัก และราคา', 'Guideline, NLEM and price')} icon={ShieldCheckIcon} tone="cyan">
            <DetailRow label={L('ระดับคำแนะนำ (กลุ่มยา)', 'CPG grade (drug class)')} stack valueClass="text-rose-700 dark:text-rose-300">{gradeOf(drug, lang)}</DetailRow>
            <DetailRow label={L('บัญชียาหลัก', 'NLEM')} stack valueClass={drug.nlem ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-500'}>{nlemLine(drug, lang)}</DetailRow>
            {drug.nlemNoteEn && <DetailRow label={L('เงื่อนไขในบัญชียาหลัก', 'NLEM conditions')} stack>{lang === 'th' ? drug.nlemNoteTh : drug.nlemNoteEn}</DetailRow>}
            <DetailRow label={L('ราคา', 'Price')}>{formatCurrency(drug.costLevel, lang)}</DetailRow>
            {drug.compellingIndications && drug.compellingIndications.length > 0 && (
              <DetailRow label={L('ข้อบ่งใช้เด่น', 'Compelling indications')} stack>{drug.compellingIndications.map((x) => x.replace(/_/g, ' ')).join(' • ')}</DetailRow>
            )}
            {src([SOURCES.cpg, SOURCES.nlem])}
          </FoldSection>

          <FoldSection {...fold('mechanism')} title={L('กลไกการออกฤทธิ์', 'Mechanism')} icon={ActivityIcon} tone="slate">
            <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-medium">{lang === 'th' ? drug.mechanismTh : drug.mechanism}</p>
          </FoldSection>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2 p-3 sm:p-4 border-t border-slate-100 dark:border-slate-800 shrink-0">
          <button onClick={toggleSrc} aria-pressed={showSrc} data-src-toggle className={`${btn} ${showSrc ? 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-700 dark:text-white dark:border-slate-600' : btnOff}`}>
            <BookOpenIcon className="w-3.5 h-3.5" /> {showSrc ? L('ซ่อนแหล่งที่มา', 'Hide sources') : L('แสดงแหล่งที่มา', 'Show sources')}
          </button>
          <button onClick={() => setAll(!allOpen)} data-detail-fold-all className={`mr-auto ${btn} ${btnOff}`}>
            <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform ${allOpen ? 'rotate-180' : ''}`} /> {allOpen ? L('ย่อทั้งหมด', 'Collapse all') : L('ขยายทั้งหมด', 'Expand all')}
          </button>
          <button onClick={() => onToggleCompare(drug)} data-detail-select className={`${btn} ${isCompared ? 'bg-teal-600 text-white border-teal-600' : btnOff}`}>
            {isCompared ? <CheckIcon className="w-3.5 h-3.5" /> : <CompareIcon className="w-3.5 h-3.5" />} {isCompared ? ui('selected', lang) : ui('select', lang)}
          </button>
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-xs font-bold bg-slate-800 text-white hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors">{t.close}</button>
        </div>
      </div>
    </div>
  );
};

// --- Compare window: table on wide screens, one card per drug on phones ---
const CompareModal = ({ comparedDrugs, lang, onClose, onRemoveDrug }) => {
  const t = translations[lang];
  if (!comparedDrugs || comparedDrugs.length === 0) return null;
  const L = (th, en) => (lang === 'th' ? th : en);
  // One row per compared fact: label, value, value colour
  const ROWS = [
    [ui('maxDose', lang), (d) => (lang === 'th' ? d.maxDoseTh : d.maxDose), 'text-amber-800 dark:text-amber-300 font-bold'],
    [ui('start', lang), (d) => (lang === 'th' ? d.startDoseTh : d.startDose), ''],
    [ui('usual', lang), (d) => (lang === 'th' ? d.maintenanceDoseTh : d.maintenanceDose), ''],
    [L('ไต (eGFR)', 'Kidney (eGFR)'), (d) => (lang === 'th' ? d.renalAdjustment.textTh : d.renalAdjustment.textEn), ''],
    [ui('pregnancy', lang), (d) => pregText(d, lang), ''],
    [L('ข้อบ่งใช้เด่น', 'Indications'), (d) => (d.compellingIndications || []).map((x) => x.replace(/_/g, ' ')).join(' • '), ''],
    [L('บัญชียาหลัก 2569', 'NLEM 2569'), (d) => nlemLine(d, lang), ''],
    [L('แนวทางฯ (กลุ่มยา)', 'CPG (class)'), (d) => gradeOf(d, lang), 'text-rose-700 dark:text-rose-300 font-bold'],
  ];
  const removeBtn = (d) => (
    <button onClick={() => onRemoveDrug(d.id)} className="text-slate-400 hover:text-rose-600 p-0.5 rounded shrink-0" title={L('เอาออก', 'Remove')} aria-label={L('เอาออก ', 'Remove ') + d.nameEn}>
      <XIcon className="w-4 h-4" />
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/70 backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} data-compare-modal>
      <div className="bg-white dark:bg-slate-900 w-full max-w-5xl max-h-[95vh] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800">
          <h2 className="flex items-center gap-2 text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            <CompareIcon className="w-5 h-5 text-teal-600 dark:text-teal-400" /> {t.compareTitle} ({comparedDrugs.length}/4)
          </h2>
          <button onClick={onClose} className="p-2 -m-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-white dark:hover:bg-slate-700" aria-label={t.close}><XIcon className="w-5 h-5" /></button>
        </div>

        <div className="p-3 sm:p-6 overflow-y-auto flex-1">
          {/* Phones: one card per drug */}
          <div className="flex flex-col gap-3 sm:hidden" data-compare-cards>
            {comparedDrugs.map((d) => (
              <div key={d.id} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 text-xs">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="min-w-0">
                    <ClassChip drug={d} lang={lang} />
                    <div className="mt-1 font-extrabold text-sm text-slate-800 dark:text-white break-words">{d.nameEn}</div>
                  </div>
                  {removeBtn(d)}
                </div>
                {ROWS.map(([label, get, cls]) => (
                  <div key={label} className="py-1.5 border-b border-slate-200 dark:border-slate-700 last:border-b-0">
                    <span className="block text-slate-500 dark:text-slate-400 font-medium">{label}</span>
                    <span className={`block font-semibold leading-snug break-words text-slate-700 dark:text-slate-200 ${cls}`}>{get(d)}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Wider screens: side-by-side table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="p-2 sm:p-3 font-bold text-slate-400 w-32">{L('คุณสมบัติ', 'Feature')}</th>
                  {comparedDrugs.map((d) => (
                    <th key={d.id} className="p-2 sm:p-3 align-top min-w-[160px]">
                      <div className="flex items-start justify-between gap-2 mb-1"><ClassChip drug={d} lang={lang} />{removeBtn(d)}</div>
                      <div className="font-extrabold text-base text-slate-800 dark:text-white break-words">{d.nameEn}</div>
                      <div className="text-[11px] font-mono text-slate-400 break-words">{d.genericName}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {ROWS.map(([label, get, cls]) => (
                  <tr key={label}>
                    <td className="p-2 sm:p-3 font-semibold text-slate-500 align-top">{label}</td>
                    {comparedDrugs.map((d) => <td key={d.id} className={`p-2 sm:p-3 text-xs leading-relaxed align-top text-slate-700 dark:text-slate-200 ${cls}`}>{get(d)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-xs font-bold bg-slate-800 text-white hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600">{t.close}</button>
        </div>
      </div>
    </div>
  );
};

// --- Compare bar (bronchodilator style, pinned at the bottom) ---
const CompareDrawer = ({ comparedDrugs, lang, onOpenCompare, onClearCompare, onRemoveDrug }) => {
  if (!comparedDrugs || comparedDrugs.length === 0) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-2 sm:p-4 flex justify-center pointer-events-none">
      <div className="pointer-events-auto bg-slate-900 text-white px-2.5 py-2 rounded-xl shadow-2xl flex flex-wrap items-center gap-1.5 w-full max-w-3xl border border-slate-700" data-compare-tray>
        <span className="text-[11px] font-bold text-slate-300 px-1">{lang === 'th' ? 'เลือกไว้' : 'Selected'}:</span>
        {comparedDrugs.map((d) => (
          <span key={d.id} className="inline-flex items-center gap-1 pl-2 pr-1 py-0.5 rounded-full bg-slate-800 border border-slate-600 text-[11px] font-bold">
            {d.nameEn.split(/[ (]/)[0]}
            <button onClick={() => onRemoveDrug(d.id)} aria-label={(lang === 'th' ? 'เอาออก ' : 'Remove ') + d.nameEn} title={(lang === 'th' ? 'เอาออก ' : 'Remove ') + d.nameEn}
              className="w-5 h-5 flex items-center justify-center rounded-full text-slate-400 hover:text-white hover:bg-slate-700"><XIcon className="w-3 h-3" /></button>
          </span>
        ))}
        <span className="ml-auto flex items-center gap-1.5">
          <button onClick={onClearCompare} className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-slate-300 hover:text-white hover:bg-slate-800">{lang === 'th' ? 'ล้าง' : 'Clear'}</button>
          <button onClick={onOpenCompare} disabled={comparedDrugs.length < 2}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-900 disabled:opacity-50 flex items-center gap-1.5">
            <CompareIcon className="w-3.5 h-3.5" /> {lang === 'th' ? `เปรียบเทียบ (${comparedDrugs.length})` : `Compare (${comparedDrugs.length})`}
          </button>
        </span>
      </div>
    </div>
  );
};
