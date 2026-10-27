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

// --- Drug Card Component (Bronchodilator / DM Guide Layout) ---
const DrugCard = ({ drug, lang, isCompared, onToggleCompare, onSelectDetail, isBookmarked, onToggleBookmark }) => {
  const t = translations[lang];
  const renalBadge = getRenalBadge(drug.renalAdjustment, lang);
  const pregBadge = getPregnancyBadge(drug.pregnancyRisk, lang);

  return (
    <div
      id={`drug-${drug.id}`}
      className={`relative bg-white dark:bg-slate-900 rounded-2xl border ${
        isCompared
          ? 'border-rose-500 ring-2 ring-rose-500/40 dark:border-rose-500 dark:ring-rose-500/40 shadow-md'
          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md'
      } shadow-sm transition-all duration-200 flex flex-col overflow-hidden group`}
    >
      {/* Card Header Top Accent Bar */}
      <div className="h-1.5 w-full shrink-0" style={{ backgroundColor: drug.color }} />

      {/* Top-Right Action Buttons: Select above, Details below (Strict Bronchodilator pattern) */}
      <div className="absolute top-3.5 right-3 md:top-4 md:right-4 print:hidden flex flex-col items-end gap-1.5 z-10" data-card-actions>
        {/* 1. Select / Compare Button */}
        <button
          onClick={() => onToggleCompare(drug)}
          title={isCompared ? (lang === 'th' ? 'ยกเลิกการเลือกเปรียบเทียบ' : 'Remove from compare') : (lang === 'th' ? 'เลือกเปรียบเทียบ' : 'Select for compare')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase transition-colors border shadow-sm ${
            isCompared
              ? 'bg-rose-600 text-white border-rose-600 hover:bg-rose-500'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-rose-400 hover:text-rose-600 dark:hover:text-rose-300 hover:bg-rose-50/50 dark:hover:bg-slate-700'
          }`}
        >
          {isCompared ? <CheckIcon className="w-3 h-3" /> : <CompareIcon className="w-3 h-3" />}
          <span>{isCompared ? (lang === 'th' ? 'เลือกแล้ว' : 'Selected') : (lang === 'th' ? 'เลือก' : 'Select')}</span>
        </button>

        {/* 2. Details Button (Directly below Select) */}
        <button
          onClick={() => onSelectDetail(drug)}
          data-details
          className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase transition-colors border border-rose-200 dark:border-rose-800/80 bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/60 shadow-sm"
        >
          <span>{lang === 'th' ? 'รายละเอียด' : 'Details'}</span>
          <span aria-hidden="true">&rarr;</span>
        </button>

        {/* 3. Bookmark Button */}
        <button
          onClick={() => onToggleBookmark(drug.id)}
          title={isBookmarked ? (lang === 'th' ? 'ยกเลิกบุ๊กมาร์ก' : 'Remove bookmark') : (lang === 'th' ? 'บันทึกยานี้' : 'Bookmark drug')}
          className={`p-1 rounded-md text-xs border transition-colors ${
            isBookmarked
              ? 'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-700'
              : 'bg-white dark:bg-slate-800 text-slate-400 hover:text-amber-600 border-slate-200 dark:border-slate-700'
          }`}
        >
          {isBookmarked ? <BookmarkCheckIcon className="w-3.5 h-3.5" /> : <BookmarkIcon className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Top Row: Drug Picture & Identification (pr-24 preserves space for top-right action buttons) */}
          <div className="flex items-center gap-3 mb-3 pt-1 pr-24">
            {/* Drug Picture Container */}
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shadow-inner">
              <DrugPicture drug={drug} className="w-11 h-11 sm:w-12 sm:h-12" />
            </div>

            {/* Drug Names & Category */}
            <div className="min-w-0 flex-1">
              <div className="flex gap-1.5 items-center mb-1 flex-wrap">
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: `${drug.color}15`, color: drug.color }}
                >
                  {lang === 'th' ? drug.classNameTh : drug.classNameEn}
                </span>

                {drug.nlem ? (
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    {nlemChip(drug)}
                  </span>
                ) : (
                  <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    Non-NLEM
                  </span>
                )}
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight break-words">
                {lang === 'th' ? drug.nameTh : drug.nameEn}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 break-words font-mono">
                {drug.genericName}
              </p>
            </div>
          </div>

          {/* Thai Brand Names in Thailand */}
          {drug.brandNames && drug.brandNames.length > 0 && (
            <div className="mb-3 px-2 py-1 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 mr-1.5">
                {lang === 'th' ? 'ชื่อการค้าในไทย:' : 'Brands in TH:'}
              </span>
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                {drug.brandNames.slice(0, 3).join(', ')}{drug.brandNames.length > 3 ? '...' : ''}
              </span>
            </div>
          )}

          {/* Prominent Max Dose Badge (High-yield clinical safety feature) */}
          <div className="mb-3 p-2.5 rounded-xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/60 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <ShieldAlertIcon className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
              <span className="text-xs font-bold text-rose-800 dark:text-rose-300">
                {lang === 'th' ? 'ขนาดยาสูงสุด (Max Dose):' : 'Maximum Daily Dose:'}
              </span>
            </div>
            <span className="text-xs font-black px-2 py-0.5 rounded bg-rose-600 text-white shadow-sm font-mono">
              {lang === 'th' ? drug.maxDoseTh : drug.maxDose}
            </span>
          </div>

          {/* Dosing Row: Start Dose & Maintenance */}
          <div className="grid grid-cols-2 gap-2 mb-3 text-xs bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/80">
            <div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">
                {lang === 'th' ? 'ขนาดเริ่มต้น (Start):' : 'Starting Dose:'}
              </span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 text-[11px] leading-tight block">
                {lang === 'th' ? drug.startDoseTh : drug.startDose}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">
                {lang === 'th' ? 'ขนาดทั่วไป (Maint):' : 'Typical Dose:'}
              </span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 text-[11px] leading-tight block">
                {lang === 'th' ? drug.maintenanceDoseTh : drug.maintenanceDose}
              </span>
            </div>
          </div>

          {/* Core Clinical Safety Badges */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {renalBadge && (
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${renalBadge.bg}`}>
                {renalBadge.text}
              </span>
            )}
            {pregBadge && (
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${pregBadge.bg}`}>
                {pregBadge.text}
              </span>
            )}
            {drug.heartRateEffect === 'decreases' && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                {lang === 'th' ? 'ลดอัตราเต้นหัวใจ' : 'Lowers HR'}
              </span>
            )}
            {drug.potassiumEffect === 'increases' && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 dark:bg-purple-950/70 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                {lang === 'th' ? 'เสี่ยง K+ สูง' : 'K+ Sparing'}
              </span>
            )}
            {drug.potassiumEffect === 'decreases' && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                {lang === 'th' ? 'เสี่ยง K+ ต่ำ' : 'K+ Wasting'}
              </span>
            )}
          </div>

          {/* Compelling Indications Pills */}
          {drug.compellingIndications && drug.compellingIndications.length > 0 && (
            <div className="mb-2">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                {lang === 'th' ? 'ข้อบ่งใช้เด่น (Indications):' : 'Compelling Indications:'}
              </span>
              <div className="flex flex-wrap gap-1">
                {drug.compellingIndications.map((ind) => (
                  <span
                    key={ind}
                    className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    {ind.replace(/_/g, ' ')}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Card Footer: Thai Guideline 2024 Class of Recommendation */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-rose-700 dark:text-rose-400 leading-snug" title={gradeOf(drug, lang)}>
            {lang === 'th' ? 'แนวทางฯ: ' : 'Thai CPG: '}{gradeShort(drug, lang)}
          </span>
        </div>
      </div>
    </div>
  );
};

// --- Compact List View Row Component ---
const DrugListRow = ({ drug, lang, isCompared, onToggleCompare, onSelectDetail, isBookmarked, onToggleBookmark }) => {
  return (
    <div
      className={`p-3 bg-white dark:bg-slate-900 border ${
        isCompared ? 'border-rose-500 bg-rose-50/20 dark:bg-rose-950/20' : 'border-slate-200 dark:border-slate-800'
      } rounded-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center p-1 border border-slate-200 dark:border-slate-700 shrink-0">
          <DrugPicture drug={drug} className="w-7 h-7" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-sm text-slate-900 dark:text-white break-words">
              {lang === 'th' ? drug.nameTh : drug.nameEn}
            </span>
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 break-words">
              ({drug.genericName})
            </span>
            <span
              className="text-[9px] font-bold px-1.5 py-0.2 rounded-full"
              style={{ backgroundColor: `${drug.color}15`, color: drug.color }}
            >
              {lang === 'th' ? drug.classNameTh.split('(')[0] : drug.classNameEn}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            <span>
              <strong className="text-slate-700 dark:text-slate-300">{lang === 'th' ? 'เริ่ม:' : 'Start:'}</strong> {lang === 'th' ? drug.startDoseTh.split('(')[0] : drug.startDose.split('(')[0]}
            </span>
            <span>
              <strong className="text-rose-600 dark:text-rose-400">{lang === 'th' ? 'สูงสุด:' : 'Max:'}</strong> {lang === 'th' ? drug.maxDoseTh.split('(')[0] : drug.maxDose.split('(')[0]}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
        <button
          onClick={() => onToggleCompare(drug)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold border ${
            isCompared
              ? 'bg-rose-600 text-white border-rose-600'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-rose-400'
          }`}
        >
          {isCompared ? <CheckIcon className="w-3 h-3" /> : <CompareIcon className="w-3 h-3" />}
          <span>{isCompared ? (lang === 'th' ? 'เลือกแล้ว' : 'Selected') : (lang === 'th' ? 'เลือก' : 'Select')}</span>
        </button>

        <button
          onClick={() => onSelectDetail(drug)}
          className="px-2.5 py-1 rounded text-xs font-bold border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 hover:bg-rose-100"
        >
          {lang === 'th' ? 'รายละเอียด' : 'Details'} &rarr;
        </button>

        <button
          onClick={() => onToggleBookmark(drug.id)}
          className="p-1 rounded text-slate-400 hover:text-amber-500"
        >
          {isBookmarked ? <BookmarkCheckIcon className="w-4 h-4 text-amber-500" /> : <BookmarkIcon className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
