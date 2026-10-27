// --- Helper Functions for Badges & Display ---

// Price level: no price source is recorded for any drug, so null shows as Unknown
const formatCurrency = (level, lang = 'th') => {
  if (level == null) return lang === 'th' ? 'ไม่ทราบ (ไม่มีแหล่งข้อมูลราคา)' : 'Unknown (no price source)';
  return '฿'.repeat(Math.min(Math.max(level, 1), 4));
};

// NLEM 2569 short chip and full line
const NLEM_LIST = {
  b: { en: 'basic list (b)', th: 'บัญชียาพื้นฐาน (b)' },
  s: { en: 'supplemental list (s)', th: 'บัญชียาทางเลือก (s)' },
  ex: { en: 'exclusive list (ex)', th: 'บัญชียาเฉพาะโรค (ex)' },
};
const nlemChip = (drug) => (drug.nlem ? 'NLEM ' + drug.nlemCode : 'Non-NLEM');
const nlemLine = (drug, lang) => {
  if (!drug.nlem) return lang === 'th' ? 'ไม่อยู่ในบัญชียาหลักแห่งชาติ พ.ศ. 2569' : 'Not in NLEM 2569';
  const list = NLEM_LIST[drug.nlemCode] || { en: drug.nlemCode, th: drug.nlemCode };
  return lang === 'th' ? 'บัญชียาหลักแห่งชาติ พ.ศ. 2569: ' + list.th : 'NLEM 2569: ' + list.en;
};
// Thai CPG grade (class-level; the CPG does not grade single drugs)
const gradeOf = (drug, lang) => (lang === 'th' && drug.thaiGuidelineClassTh ? drug.thaiGuidelineClassTh : drug.thaiGuidelineClass);
const gradeShort = (drug, lang) => gradeOf(drug, lang).split('(')[0].trim();

// Where each fact comes from (drug detail view, References tab)
const SOURCES = {
  cpg: { en: 'Thai Hypertension Society. Thai Guidelines on the Treatment of Hypertension in General Practice B.E. 2567 (2024)', th: 'สมาคมความดันโลหิตสูงแห่งประเทศไทย. แนวทางการรักษาโรคความดันโลหิตสูงในเวชปฏิบัติทั่วไป พ.ศ. 2567', url: 'https://www.thaihypertension.org/wp-content/uploads/2025/07/Guideline2024.pdf' },
  cpgEn: { en: 'Kunanon S, et al. 2024 Thai guidelines on the treatment of hypertension. Asian Biomed 2025;19(6):316-357', th: 'Kunanon S, et al. 2024 Thai guidelines on the treatment of hypertension. Asian Biomed 2025;19(6):316-357', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12919385/' },
  nlem: { en: 'National List of Essential Medicines B.E. 2569, group 2 Cardiovascular system (Royal Gazette)', th: 'บัญชียาหลักแห่งชาติ พ.ศ. 2569 กลุ่มยา 2 Cardiovascular system (ราชกิจจานุเบกษา)', url: 'https://ratchakitcha.soc.go.th/documents/111371.pdf' },
  dailymed: { en: 'US prescribing information (DailyMed, US National Library of Medicine)', th: 'ฉลากยาสหรัฐอเมริกา (DailyMed, US National Library of Medicine)', url: 'https://dailymed.nlm.nih.gov/dailymed/' },
};

const getRenalBadge = (renal, lang) => {
  if (!renal) return null;
  if (renal.cutoff === 0) {
    return {
      bg: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80',
      text: lang === 'th' ? 'eGFR: ปลอดภัยทุกระยะไต' : 'eGFR: Safe all CKD stages'
    };
  }
  if (renal.cutoff >= 30) {
    return {
      bg: 'bg-amber-50 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-200 dark:border-amber-800/80',
      text: `eGFR >= ${renal.cutoff} mL/min`
    };
  }
  return {
    bg: 'bg-blue-50 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80',
    text: `eGFR >= ${renal.cutoff} mL/min`
  };
};

const getPregnancyBadge = (status, lang) => {
  if (status === 'safe_first_line') {
    return {
      bg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700',
      text: lang === 'th' ? 'ปลอดภัยในครรภ์ (1st-line)' : 'Pregnancy Safe (1st-line)'
    };
  }
  if (status === 'contraindicated') {
    return {
      bg: 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-300 dark:border-rose-700',
      text: lang === 'th' ? 'ห้ามใช้ในสตรีมีครรภ์' : 'Pregnancy Contraindicated'
    };
  }
  return {
    bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700',
    text: lang === 'th' ? 'ระวังในสตรีมีครรภ์' : 'Caution in Pregnancy'
  };
};

// --- Bronchodilator-style drug card and list row (v1.2.0) ---

const UI = {
  select: { th: 'เลือก', en: 'Select' },
  selected: { th: 'เลือกแล้ว', en: 'Selected' },
  details: { th: 'รายละเอียด', en: 'Details' },
  brands: { th: 'ชื่อการค้า', en: 'Brands' },
  start: { th: 'ขนาดเริ่มต้น', en: 'Starting dose' },
  usual: { th: 'ขนาดที่ใช้ทั่วไป', en: 'Usual dose' },
  kidney: { th: 'ไต', en: 'Kidney' },
  pregnancy: { th: 'ตั้งครรภ์', en: 'Pregnancy' },
  potassium: { th: 'โพแทสเซียม', en: 'Potassium' },
  maxDose: { th: 'ขนาดยาสูงสุด (Max Dose)', en: 'Maximum dose' },
  bookmark: { th: 'บันทึกยานี้', en: 'Bookmark' },
  unbookmark: { th: 'ยกเลิกบันทึก', en: 'Remove bookmark' },
};
const ui = (k, lang) => UI[k][lang];

const kidneyText = (drug, lang) => {
  const r = drug.renalAdjustment;
  if (!r) return lang === 'th' ? 'ไม่ทราบ' : 'Unknown';
  if (r.cutoff === 0) return lang === 'th' ? 'ไม่ต้องปรับตาม eGFR' : 'No eGFR limit';
  return `eGFR >= ${r.cutoff}`;
};
const KIDNEY_TONE = (drug) => (drug.renalAdjustment && drug.renalAdjustment.cutoff === 0 ? 'text-emerald-700 dark:text-emerald-300' : 'text-amber-700 dark:text-amber-300');
const PREG_TONE = { safe_first_line: 'text-emerald-700 dark:text-emerald-300', contraindicated: 'text-rose-700 dark:text-rose-300', caution: 'text-slate-700 dark:text-slate-200' };
const pregText = (drug, lang) => ({
  safe_first_line: lang === 'th' ? 'ใช้ได้' : 'Can be used',
  contraindicated: lang === 'th' ? 'ห้ามใช้' : 'Contraindicated',
}[drug.pregnancyRisk] || (lang === 'th' ? 'ระวัง' : 'Caution'));
const potassiumText = (drug, lang) => ({
  increases: lang === 'th' ? 'เพิ่ม K+' : 'Raises K+',
  decreases: lang === 'th' ? 'ลด K+' : 'Lowers K+',
}[drug.potassiumEffect] || (lang === 'th' ? 'ไม่มีผล' : 'Neutral'));

// Class chip in the drug's own colour
const ClassChip = ({ drug, lang }) => (
  <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider" style={{ backgroundColor: `${drug.color}1f`, color: drug.color }}>
    {lang === 'th' ? drug.classNameTh.split('(')[0].trim() : drug.classNameEn}
  </span>
);

const NlemChip = ({ drug, lang }) => (
  drug.nlem ? (
    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" title={nlemLine(drug, lang)} data-nlem>
      {nlemChip(drug)}
    </span>
  ) : (
    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide" title={nlemLine(drug, lang)}>Non-NLEM</span>
  )
);

const GradeChip = ({ drug, lang }) => (
  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded border border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-300" title={gradeOf(drug, lang)} data-grade>
    {lang === 'th' ? 'แนวทางฯ ' : 'CPG '}{gradeShort(drug, lang).replace(/^Class /, '').replace(/^ระดับ /, '')}
  </span>
);

// One label/value line in a facts box
const FactRow = ({ label, children, valueClass = 'text-slate-700 dark:text-slate-200' }) => (
  <div className="flex justify-between items-start gap-2 border-b border-slate-200 dark:border-slate-700 pb-1.5 pt-1 last:border-b-0 min-w-0">
    <span className="text-slate-500 dark:text-slate-400 font-medium shrink-0">{label}</span>
    <span className={`font-bold text-right break-words min-w-0 ${valueClass}`}>{children}</span>
  </div>
);

const SelectButtons = ({ drug, lang, isCompared, onToggleCompare, onSelectDetail, isBookmarked, onToggleBookmark, compact = false }) => {
  const size = compact ? 'w-7 h-7 sm:w-auto sm:h-auto sm:px-3 sm:py-1.5' : 'px-2 md:px-2.5 py-1';
  return (
    <>
      <button onClick={() => onToggleCompare(drug)} aria-pressed={isCompared} title={isCompared ? ui('selected', lang) : ui('select', lang)} data-select
        className={`flex items-center justify-center gap-1 rounded-md text-[10px] font-bold tracking-wider uppercase transition-colors border ${size} ${isCompared ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-slate-400 border-slate-200 hover:border-teal-300 hover:text-teal-600 hover:bg-teal-50 shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:text-teal-300'}`}>
        {isCompared ? <CheckIcon className={compact ? 'w-4 h-4 sm:w-3 sm:h-3' : 'w-3 h-3'} /> : <CompareIcon className={compact ? 'w-4 h-4 sm:w-3 sm:h-3' : 'w-3 h-3'} />}
        <span className={compact ? 'hidden sm:inline' : ''}>{isCompared ? ui('selected', lang) : ui('select', lang)}</span>
      </button>
      <button onClick={() => onSelectDetail(drug)} data-details title={ui('details', lang)} aria-label={ui('details', lang)}
        className={`flex items-center justify-center gap-1 rounded-md text-[10px] font-bold tracking-wider uppercase transition-colors border border-teal-100 bg-teal-50 text-teal-700 hover:bg-teal-100 shadow-sm dark:border-teal-900 dark:bg-teal-950 dark:text-teal-300 ${size}`}>
        {compact && <InfoIcon className="w-4 h-4 sm:hidden" />}
        <span className={compact ? 'hidden sm:inline' : ''}>{ui('details', lang)} <span aria-hidden="true">›</span></span>
      </button>
      <button onClick={() => onToggleBookmark(drug.id)} aria-pressed={isBookmarked} data-bookmark
        title={isBookmarked ? ui('unbookmark', lang) : ui('bookmark', lang)} aria-label={isBookmarked ? ui('unbookmark', lang) : ui('bookmark', lang)}
        className={`flex items-center justify-center rounded-md border transition-colors ${compact ? 'w-7 h-7' : 'w-7 h-6'} ${isBookmarked ? 'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-700' : 'bg-white text-slate-400 border-slate-200 hover:text-amber-600 dark:bg-slate-800 dark:border-slate-700'}`}>
        {isBookmarked ? <BookmarkCheckIcon className="w-3.5 h-3.5" /> : <BookmarkIcon className="w-3.5 h-3.5" />}
      </button>
    </>
  );
};

// A click anywhere on the card opens the detail view, except on its own controls
const openFromCard = (e, drug, onSelectDetail) => {
  if (e.target.closest('button, a, input, select, summary, label')) return;
  onSelectDetail(drug);
};

const BrandLine = ({ drug, lang }) => (
  <p className="text-[11px] mt-1.5 text-slate-500 dark:text-slate-400 break-words">
    <span className="font-medium">{ui('brands', lang)}:</span>{' '}
    <span className="font-bold text-slate-700 dark:text-slate-200">{drug.brandNames.join(', ')}</span>
  </p>
);

// --- Grid card ---
const DrugCard = ({ drug, lang, isCompared, onToggleCompare, onSelectDetail, isBookmarked, onToggleBookmark }) => (
  <div id={'drug-' + drug.id} onClick={(e) => openFromCard(e, drug, onSelectDetail)}
    className={`cursor-pointer h-full rounded-xl md:rounded-2xl border ${isCompared ? 'border-teal-500 ring-1 ring-teal-500' : 'border-slate-200 dark:border-slate-800 hover:shadow-md'} bg-white dark:bg-slate-900 p-3.5 md:p-5 flex flex-col shadow-sm transition-all relative`}>
    <div className="absolute top-3 right-3 md:top-4 md:right-4 flex flex-col items-end gap-1.5" data-card-actions>
      <SelectButtons drug={drug} lang={lang} isCompared={isCompared} onToggleCompare={onToggleCompare} onSelectDetail={onSelectDetail} isBookmarked={isBookmarked} onToggleBookmark={onToggleBookmark} />
    </div>

    <div className="flex items-end gap-2 mb-3 md:mb-4 pt-1">
      <div className="p-2 md:p-3 rounded-lg md:rounded-xl bg-slate-50 border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
        <DrugPicture drug={drug} className="w-10 h-10 md:w-14 md:h-14" />
      </div>
    </div>

    <div className="flex-grow">
      <div className="flex gap-1.5 items-center flex-wrap pr-24">
        <ClassChip drug={drug} lang={lang} />
      </div>
      <h3 className="text-lg font-extrabold text-slate-800 dark:text-white leading-tight mb-0.5 mt-2 break-words">{drug.nameEn}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-snug break-words">{lang === 'th' ? drug.nameTh : drug.genericName}</p>
      <BrandLine drug={drug} lang={lang} />
      <div className="flex flex-wrap items-center gap-1.5 mt-2">
        <NlemChip drug={drug} lang={lang} />
        <GradeChip drug={drug} lang={lang} />
      </div>

      <div className="space-y-1.5 text-xs bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700 mt-4" data-card-facts>
        <FactRow label={ui('kidney', lang)} valueClass={KIDNEY_TONE(drug)}>{kidneyText(drug, lang)}</FactRow>
        <FactRow label={ui('pregnancy', lang)} valueClass={PREG_TONE[drug.pregnancyRisk] || PREG_TONE.caution}>{pregText(drug, lang)}</FactRow>
        <FactRow label={ui('potassium', lang)} valueClass="text-slate-700 dark:text-slate-200">{potassiumText(drug, lang)}</FactRow>
        <div className="pt-1">
          <span className="text-slate-500 dark:text-slate-400 font-medium block">{ui('start', lang)}</span>
          <span className="font-semibold text-slate-700 dark:text-slate-200 leading-snug block mt-0.5">{lang === 'th' ? drug.startDoseTh : drug.startDose}</span>
        </div>
      </div>
    </div>

    <div className="mt-auto pt-4">
      <div className="p-3 rounded-xl border bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-200" data-max-dose>
        <span className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 text-amber-700 dark:text-amber-300">
          <FlameIcon className="w-3.5 h-3.5" /> {ui('maxDose', lang)}
        </span>
        <span className="block text-xs font-bold leading-snug mt-1">{lang === 'th' ? drug.maxDoseTh : drug.maxDose}</span>
      </div>
    </div>
  </div>
);

// --- List row ---
const DrugListRow = ({ drug, lang, isCompared, onToggleCompare, onSelectDetail, isBookmarked, onToggleBookmark }) => (
  <div id={'drug-' + drug.id} onClick={(e) => openFromCard(e, drug, onSelectDetail)}
    className={`cursor-pointer w-full rounded-xl border ${isCompared ? 'border-teal-500 ring-1 ring-teal-500' : 'border-slate-200 dark:border-slate-800 hover:shadow-sm'} bg-white dark:bg-slate-900 p-3 md:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 transition-all relative`}>
    <div className="absolute z-10 top-3 right-3 sm:relative sm:top-0 sm:right-0 shrink-0 order-first sm:order-last flex flex-col items-end sm:items-stretch gap-1.5" data-card-actions>
      <SelectButtons drug={drug} lang={lang} isCompared={isCompared} onToggleCompare={onToggleCompare} onSelectDetail={onSelectDetail} isBookmarked={isBookmarked} onToggleBookmark={onToggleBookmark} compact />
    </div>
    <div className="flex items-start gap-3 min-w-0 flex-1 pr-10 sm:pr-0">
      <div className="p-1.5 md:p-2 rounded-lg bg-slate-50 border border-slate-100 dark:bg-slate-800 dark:border-slate-700 shrink-0">
        <DrugPicture drug={drug} className="w-9 h-9 md:w-11 md:h-11" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <h3 className="text-sm md:text-base font-extrabold text-slate-800 dark:text-white leading-tight break-words">{drug.nameEn}</h3>
          <ClassChip drug={drug} lang={lang} />
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 break-words">
          {lang === 'th' && <span>{drug.nameTh} · </span>}
          <span className="font-bold text-slate-700 dark:text-slate-200">{drug.brandNames.join(', ')}</span>
        </p>
        <p className="text-[11px] mt-1 leading-snug text-slate-600 dark:text-slate-300 flex flex-wrap gap-x-3 gap-y-0.5">
          <span>{ui('kidney', lang)}: <b className={KIDNEY_TONE(drug)}>{kidneyText(drug, lang)}</b></span>
          <span>{ui('pregnancy', lang)}: <b className={PREG_TONE[drug.pregnancyRisk] || PREG_TONE.caution}>{pregText(drug, lang)}</b></span>
          <span>{ui('potassium', lang)}: <b>{potassiumText(drug, lang)}</b></span>
        </p>
        <p className="text-[11px] mt-1 leading-snug text-amber-800 dark:text-amber-300 break-words" data-max-dose>
          <b>{ui('maxDose', lang)}:</b> {lang === 'th' ? drug.maxDoseTh : drug.maxDose}
        </p>
        <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
          <NlemChip drug={drug} lang={lang} />
          <GradeChip drug={drug} lang={lang} />
        </div>
      </div>
    </div>
  </div>
);
