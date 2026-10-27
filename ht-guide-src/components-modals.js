// --- Drug Detail Modal, Compare Modal & Floating Compare Tray ---

const DrugDetailModal = ({ drug, lang, onClose, onToggleCompare, isCompared }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const t = translations[lang];

  if (!drug) return null;

  const tabs = [
    { id: 'overview', labelEn: 'Overview & Dosing', labelTh: 'ภาพรวมและขนาดยา' },
    { id: 'renal_hepatic', labelEn: 'Renal & Hepatic', labelTh: 'ไตและตับ (eGFR)' },
    { id: 'safety', labelEn: 'Contraindications & Safety', labelTh: 'ข้อห้ามใช้และผลข้างเคียง' },
    { id: 'interactions', labelEn: 'Interactions & SPCs', labelTh: 'อันตรกิริยาและยารวมเม็ด' },
    { id: 'counseling', labelEn: 'Patient Counseling', labelTh: 'คำแนะนำผู้ป่วย' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-3xl max-h-[92vh] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in zoom-in-95">
        
        {/* Modal Top Accent Bar */}
        <div className="h-2 w-full" style={{ backgroundColor: drug.color }} />

        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex flex-wrap-reverse items-start justify-between gap-3" data-detail-head>
          <div className="flex items-center gap-3 min-w-0 flex-1 basis-60">
            <div className="hidden sm:flex w-14 h-14 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center p-2 shrink-0">
              <DrugPicture drug={drug} className="w-10 h-10" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: `${drug.color}15`, color: drug.color }}
                >
                  {lang === 'th' ? drug.classNameTh : drug.classNameEn}
                </span>
                {drug.nlem ? (
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    {nlemChip(drug)}
                  </span>
                ) : (
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    Non-NLEM
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white break-words">
                {lang === 'th' ? drug.nameTh : drug.nameEn}
              </h2>
              <p className="text-sm font-mono text-slate-500 dark:text-slate-400 break-words">
                {drug.genericName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 ml-auto">
            <button
              onClick={() => onToggleCompare(drug)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors border shadow-sm ${
                isCompared
                  ? 'bg-rose-600 text-white border-rose-600'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-rose-400'
              }`}
            >
              {isCompared ? <CheckIcon className="w-3.5 h-3.5" /> : <CompareIcon className="w-3.5 h-3.5" />}
              <span>{isCompared ? (lang === 'th' ? 'เลือกแล้ว' : 'Selected') : (lang === 'th' ? 'เลือกเปรียบเทียบ' : 'Compare')}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex flex-wrap border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 bg-slate-50 dark:bg-slate-900" data-detail-tabs>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2.5 px-2.5 sm:px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-rose-600 text-rose-600 dark:text-rose-400 dark:border-rose-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              {lang === 'th' ? tab.labelTh : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Modal Tab Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5 text-sm">
          
          {/* TAB 1: OVERVIEW & DOSING */}
          {activeTab === 'overview' && (
            <div className="space-y-4 animate-in fade-in">
              {/* Max Dose Callout Banner */}
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-rose-800 dark:text-rose-300 block">
                    {lang === 'th' ? 'ขนาดยาสูงสุดต่อวัน (Maximum Daily Dose):' : 'Maximum Daily Dose:'}
                  </span>
                  <span className="text-xs text-rose-600 dark:text-rose-400">
                    {lang === 'th' ? 'ขนาดสูงสุดตามฉลากยา (ดูแหล่งข้อมูลด้านล่าง)' : 'Highest dose in the product label (see Sources below).'}
                  </span>
                </div>
                <span className="text-sm sm:text-base font-black px-3 py-1 rounded bg-rose-600 text-white font-mono shadow-sm">
                  {lang === 'th' ? drug.maxDoseTh : drug.maxDose}
                </span>
              </div>

              {/* Dosing Details Table */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">
                    {lang === 'th' ? 'ขนาดเริ่มต้น (Starting Dose):' : 'Starting Dose:'}
                  </span>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {lang === 'th' ? drug.startDoseTh : drug.startDose}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">
                    {lang === 'th' ? 'ขนาดทั่วไป (Typical Maintenance):' : 'Maintenance Dose:'}
                  </span>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {lang === 'th' ? drug.maintenanceDoseTh : drug.maintenanceDose}
                  </p>
                </div>
              </div>

              {/* Mechanism of Action */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  {lang === 'th' ? 'กลไกการออกฤทธิ์ (Mechanism of Action):' : 'Mechanism of Action:'}
                </span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {lang === 'th' ? drug.mechanismTh : drug.mechanism}
                </p>
              </div>

              {/* Strengths & Brands in Thailand */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">
                    {lang === 'th' ? 'ความแรงที่มีจำหน่ายในไทย:' : 'Available Strengths in TH:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {drug.strengths.map(s => (
                      <span key={s} className="px-2 py-0.5 rounded bg-white dark:bg-slate-700 text-xs font-mono font-semibold border border-slate-200 dark:border-slate-600">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">
                    {lang === 'th' ? 'ชื่อการค้าในไทย:' : 'Brand Names in Thailand:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {drug.brandNames.map(b => (
                      <span key={b} className="px-2 py-0.5 rounded bg-white dark:bg-slate-700 text-xs font-medium border border-slate-200 dark:border-slate-600">
                        {b}
                      </span>
                    ))}
                  </div>
                  {!drug.brandsVerified && (
                    <p className="mt-1.5 text-[11px] text-amber-700 dark:text-amber-300">
                      {lang === 'th' ? 'ยังไม่ได้ตรวจสอบกับทะเบียนยา อย.' : 'Not yet checked against the Thai FDA register.'}
                    </p>
                  )}
                </div>
              </div>

              {/* Guideline Recommendation */}
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 space-y-2">
                <div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">
                    {lang === 'th' ? 'ระดับคำแนะนำในแนวทางฯ 2567 (ระดับกลุ่มยา):' : 'Thai CPG 2024 recommendation (drug class):'}
                  </span>
                  <span className="font-bold text-rose-700 dark:text-rose-400 text-sm">
                    {gradeOf(drug, lang)}
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-300">
                  <span><strong>{lang === 'th' ? 'บัญชียาหลัก: ' : 'NLEM: '}</strong>{nlemLine(drug, lang)}</span>
                  <span><strong>{lang === 'th' ? 'ราคา: ' : 'Price: '}</strong>{formatCurrency(drug.costLevel, lang)}</span>
                </div>
                {(lang === 'th' ? drug.nlemNoteTh : drug.nlemNoteEn) && (
                  <p className="text-[11px] text-emerald-800 dark:text-emerald-300">
                    {lang === 'th' ? 'เงื่อนไขบัญชียาหลัก: ' : 'NLEM condition: '}{lang === 'th' ? drug.nlemNoteTh : drug.nlemNoteEn}
                  </p>
                )}
              </div>

              {/* Sources */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800" data-sources>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                  {lang === 'th' ? 'แหล่งข้อมูล' : 'Sources'}
                </span>
                <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                  <li>
                    <strong>{lang === 'th' ? 'ขนาดยา: ' : 'Doses: '}</strong>
                    {drug.label
                      ? <a href={drug.label.url} target="_blank" rel="noopener noreferrer" className="text-sky-700 dark:text-sky-300 underline break-words">{drug.label.name}</a>
                      : <span className="text-amber-700 dark:text-amber-300">{lang === 'th' ? 'ไม่พบฉลากยาสหรัฐฯ ที่ตรงกับผลิตภัณฑ์ในไทย ยังไม่ได้บันทึกแหล่งข้อมูล' : 'No matching US label; no source recorded yet'}</span>}
                  </li>
                  <li>
                    <strong>{lang === 'th' ? 'ระดับคำแนะนำ: ' : 'Grade: '}</strong>
                    <a href={SOURCES.cpg.url} target="_blank" rel="noopener noreferrer" className="text-sky-700 dark:text-sky-300 underline break-words">{SOURCES.cpg[lang]}</a>
                  </li>
                  <li>
                    <strong>{lang === 'th' ? 'บัญชียาหลัก: ' : 'NLEM: '}</strong>
                    <a href={SOURCES.nlem.url} target="_blank" rel="noopener noreferrer" className="text-sky-700 dark:text-sky-300 underline break-words">{SOURCES.nlem[lang]}</a>
                  </li>
                  <li>
                    <strong>{lang === 'th' ? 'ชื่อการค้า / ราคา / รูปยา: ' : 'Brands / price / picture: '}</strong>
                    <span className="text-amber-700 dark:text-amber-300">{lang === 'th' ? 'ยังไม่มีแหล่งข้อมูล' : 'No source recorded yet'}</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: RENAL & HEPATIC */}
          {activeTab === 'renal_hepatic' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <KidneyIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h4 className="font-bold text-blue-900 dark:text-blue-300">
                    {lang === 'th' ? 'การปรับขนาดยาตามการทำงานของไต (Renal Adjustment)' : 'Renal Adjustment & eGFR Safety'}
                  </h4>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {lang === 'th' ? drug.renalAdjustment.textTh : drug.renalAdjustment.textEn}
                </p>
                <div className="mt-3 inline-block px-3 py-1 rounded-md bg-white dark:bg-slate-800 text-xs font-bold text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
                  {drug.renalAdjustment.cutoff === 0
                    ? (lang === 'th' ? 'ปลอดภัยในทุกระยะของโรคไต (CKD 1-5 & Hemodialysis)' : 'Safe in all CKD stages & Dialysis')
                    : (lang === 'th' ? `ขีดจำกัดความปลอดภัย: eGFR >= ${drug.renalAdjustment.cutoff} มล./นาที` : `Safety Cutoff: eGFR >= ${drug.renalAdjustment.cutoff} mL/min`)}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-2 mb-2">
                  <ActivityIcon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <h4 className="font-bold text-amber-900 dark:text-amber-300">
                    {lang === 'th' ? 'การปรับขนาดยาในโรคตับ (Hepatic Adjustment)' : 'Hepatic Impairment Guidance'}
                  </h4>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {lang === 'th' ? drug.hepaticAdjustment.textTh : drug.hepaticAdjustment.textEn}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                <h5 className="font-bold text-xs text-slate-500 uppercase tracking-wider mb-2">
                  {lang === 'th' ? 'ผลต่อเกลือแร่โพแทสเซียม (Serum Potassium Effect)' : 'Serum Potassium Effect'}
                </h5>
                <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-bold ${
                  drug.potassiumEffect === 'increases' ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300' :
                  drug.potassiumEffect === 'decreases' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                  'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}>
                  {drug.potassiumEffect === 'increases' ? (lang === 'th' ? 'เพิ่มระดับโพแทสเซียม (เสี่ยง Hyperkalemia)' : 'Increases K+ (Hyperkalemia risk)') :
                   drug.potassiumEffect === 'decreases' ? (lang === 'th' ? 'ลดระดับโพแทสเซียม (เสี่ยง Hypokalemia)' : 'Decreases K+ (Hypokalemia risk)') :
                   (lang === 'th' ? 'ไม่มีผลต่อระดับโพแทสเซียม' : 'Neutral on potassium')}
                </span>
              </div>
            </div>
          )}

          {/* TAB 3: SAFETY & CONTRAINDICATIONS */}
          {activeTab === 'safety' && (
            <div className="space-y-4 animate-in fade-in">
              {/* Absolute Contraindications */}
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldAlertIcon className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                  <h4 className="font-bold text-rose-900 dark:text-rose-300">
                    {lang === 'th' ? 'ข้อห้ามใช้เด็ดขาด (Absolute Contraindications)' : 'Absolute Contraindications'}
                  </h4>
                </div>
                <ul className="list-disc list-inside space-y-1.5 text-slate-800 dark:text-slate-200">
                  {drug.contraindications.absolute.map((c, i) => (
                    <li key={i} className="font-medium text-xs sm:text-sm">{c}</li>
                  ))}
                </ul>
              </div>

              {/* Relative Precautions */}
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                <h4 className="font-bold text-amber-900 dark:text-amber-300 mb-2">
                  {lang === 'th' ? 'ข้อควรระวังพิเศษ (Relative Precautions)' : 'Relative Precautions'}
                </h4>
                <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
                  {drug.contraindications.relative.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              {/* Adverse Effects */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                    {lang === 'th' ? 'ผลข้างเคียงที่พบบ่อย (Common):' : 'Common Adverse Effects:'}
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-700 dark:text-slate-300">
                    {drug.sideEffects.common.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-3.5 rounded-xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900">
                  <span className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider block mb-1.5">
                    {lang === 'th' ? 'ผลข้างเคียงรุนแรง (Serious):' : 'Serious Adverse Reactions:'}
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-xs text-rose-900 dark:text-rose-200">
                    {drug.sideEffects.serious.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: INTERACTIONS & SPCS */}
          {activeTab === 'interactions' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                  {lang === 'th' ? 'อันตรกิริยาระหว่างยาที่สำคัญ (Drug Interactions)' : 'Key Drug Interactions'}
                </h4>
                <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                  {drug.drugInteractions.map((inter, i) => (
                    <li key={i} className="leading-relaxed">{inter}</li>
                  ))}
                </ul>
              </div>

              {/* Special Clinical Pearls */}
              {drug.precautions && drug.precautions.length > 0 && (
                <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800">
                  <h4 className="font-bold text-teal-900 dark:text-teal-300 mb-2">
                    {lang === 'th' ? 'ข้อแนะนำทางคลินิก (Clinical Pearls):' : 'Clinical Pearls:'}
                  </h4>
                  <ul className="list-disc list-inside space-y-1.5 text-slate-700 dark:text-slate-300">
                    {drug.precautions.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: PATIENT COUNSELING */}
          {activeTab === 'counseling' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <h4 className="font-bold text-emerald-900 dark:text-emerald-300 mb-2 flex items-center gap-2">
                  <InfoIcon className="w-5 h-5" />
                  {lang === 'th' ? 'คำแนะนำที่ต้องสื่อสารกับผู้ป่วย (Patient Counseling):' : 'Patient Counseling Advice:'}
                </h4>
                <p className="text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base">
                  {lang === 'th' ? drug.patientCounseling.th : drug.patientCounseling.en}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                <h5 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">
                  {lang === 'th' ? 'การตรวจติดตาม (Follow-up Monitoring):' : 'Monitoring Protocol:'}
                </h5>
                <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
                  {lang === 'th'
                    ? 'ตรวจวัดความดันโลหิตสม่ำเสมอทั้งที่บ้าน (HBPM) และคลินิก ตรวจระดับ Cr และอิเล็กโทรไลต์ในเลือดภายใน 2-4 สัปดาห์หลังเริ่มยาหรือปรับขนาดยา'
                    : 'Monitor BP at home (HBPM) and clinic. Recheck serum Cr and electrolytes at 2-4 weeks post initiation or dose escalation.'}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 text-xs font-bold transition-colors shadow-sm"
          >
            {t.close}
          </button>
        </div>

      </div>
    </div>
  );
};

// --- Compare Modal Component (Up to 4 Drugs Side-by-Side Matrix) ---
const CompareModal = ({ comparedDrugs, lang, onClose, onRemoveDrug }) => {
  const t = translations[lang];

  if (!comparedDrugs || comparedDrugs.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-5xl max-h-[92vh] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in zoom-in-95">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CompareIcon className="w-6 h-6 text-rose-600" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {t.compareTitle} ({comparedDrugs.length}/4)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Matrix Table */}
        <div className="p-4 sm:p-6 overflow-x-auto flex-1">
          <table className="w-full border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="p-2 sm:p-3 font-bold text-slate-400 w-32 shrink-0">
                  {lang === 'th' ? 'คุณสมบัติ' : 'Feature'}
                </th>
                {comparedDrugs.map(drug => (
                  <th key={drug.id} className="p-2 sm:p-3 font-bold text-slate-900 dark:text-white min-w-[200px] align-top">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${drug.color}15`, color: drug.color }}>
                        {lang === 'th' ? drug.classNameTh.split('(')[0] : drug.classNameEn}
                      </span>
                      <button
                        onClick={() => onRemoveDrug(drug.id)}
                        className="text-slate-400 hover:text-rose-600 p-0.5 rounded"
                        title={lang === 'th' ? 'ลบออก' : 'Remove'}
                      >
                        <XIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="font-extrabold text-base text-rose-700 dark:text-rose-400">
                      {lang === 'th' ? drug.nameTh : drug.nameEn}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 truncate">
                      {drug.genericName}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {/* Max Dose */}
              <tr className="bg-rose-50/50 dark:bg-rose-950/20">
                <td className="p-2 sm:p-3 font-bold text-rose-800 dark:text-rose-300">
                  {t.maxDoseBadge}
                </td>
                {comparedDrugs.map(drug => (
                  <td key={drug.id} className="p-2 sm:p-3 font-mono font-black text-rose-700 dark:text-rose-400">
                    {lang === 'th' ? drug.maxDoseTh : drug.maxDose}
                  </td>
                ))}
              </tr>

              {/* Start Dose */}
              <tr>
                <td className="p-2 sm:p-3 font-semibold text-slate-500">
                  {t.startDoseBadge}
                </td>
                {comparedDrugs.map(drug => (
                  <td key={drug.id} className="p-2 sm:p-3 font-medium">
                    {lang === 'th' ? drug.startDoseTh : drug.startDose}
                  </td>
                ))}
              </tr>

              {/* Maintenance Dose */}
              <tr>
                <td className="p-2 sm:p-3 font-semibold text-slate-500">
                  {t.maintDoseBadge}
                </td>
                {comparedDrugs.map(drug => (
                  <td key={drug.id} className="p-2 sm:p-3 font-medium">
                    {lang === 'th' ? drug.maintenanceDoseTh : drug.maintenanceDose}
                  </td>
                ))}
              </tr>

              {/* Renal Safety (eGFR) */}
              <tr>
                <td className="p-2 sm:p-3 font-semibold text-slate-500">
                  {lang === 'th' ? 'ไต (eGFR)' : 'eGFR Safety'}
                </td>
                {comparedDrugs.map(drug => (
                  <td key={drug.id} className="p-2 sm:p-3 text-xs leading-relaxed">
                    {lang === 'th' ? drug.renalAdjustment.textTh : drug.renalAdjustment.textEn}
                  </td>
                ))}
              </tr>

              {/* Pregnancy Safety */}
              <tr>
                <td className="p-2 sm:p-3 font-semibold text-slate-500">
                  {lang === 'th' ? 'สตรีมีครรภ์' : 'Pregnancy'}
                </td>
                {comparedDrugs.map(drug => {
                  const b = getPregnancyBadge(drug.pregnancyRisk, lang);
                  return (
                    <td key={drug.id} className="p-2 sm:p-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${b.bg}`}>
                        {b.text}
                      </span>
                    </td>
                  );
                })}
              </tr>

              {/* Compelling Indications */}
              <tr>
                <td className="p-2 sm:p-3 font-semibold text-slate-500">
                  {lang === 'th' ? 'ข้อบ่งใช้เด่น' : 'Indications'}
                </td>
                {comparedDrugs.map(drug => (
                  <td key={drug.id} className="p-2 sm:p-3">
                    <div className="flex flex-wrap gap-1">
                      {drug.compellingIndications.map(ind => (
                        <span key={ind} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px]">
                          {ind.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* NLEM & Price */}
              <tr>
                <td className="p-2 sm:p-3 font-semibold text-slate-500">
                  {lang === 'th' ? 'บัญชียาหลัก 2569' : 'NLEM 2569'}
                </td>
                {comparedDrugs.map(drug => (
                  <td key={drug.id} className="p-2 sm:p-3 font-medium">
                    <div>
                      <span className="text-xs font-bold">
                        {nlemLine(drug, lang)}
                      </span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Guideline Recommendation */}
              <tr>
                <td className="p-2 sm:p-3 font-semibold text-slate-500">
                  {lang === 'th' ? 'คำแนะนำ 2567' : 'Guideline'}
                </td>
                {comparedDrugs.map(drug => (
                  <td key={drug.id} className="p-2 sm:p-3 text-xs font-bold text-rose-700 dark:text-rose-400">
                    {gradeOf(drug, lang)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 text-xs font-bold shadow-sm"
          >
            {t.close}
          </button>
        </div>

      </div>
    </div>
  );
};

// --- Floating Compare Tray (Pinned Dock at Bottom) ---
const CompareDrawer = ({ comparedDrugs, lang, onOpenCompare, onClearCompare, onRemoveDrug }) => {
  const t = translations[lang];

  if (!comparedDrugs || comparedDrugs.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto z-40 sm:max-w-lg bg-white dark:bg-slate-900 border border-rose-300 dark:border-rose-900 rounded-2xl shadow-2xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 animate-in slide-in-from-bottom-4" data-compare-tray>
      <div className="flex items-center gap-2 min-w-0">
        <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 shrink-0">
          <CompareIcon className="w-5 h-5" />
        </div>
        <div className="flex flex-wrap items-center gap-1.5 min-w-0">
          {comparedDrugs.map(drug => (
            <div
              key={drug.id}
              className="flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
            >
              <span className="truncate max-w-[80px]">{lang === 'th' ? drug.nameTh : drug.nameEn}</span>
              <button
                onClick={() => onRemoveDrug(drug.id)}
                className="text-slate-400 hover:text-rose-600"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onClearCompare}
          className="text-xs text-slate-500 hover:text-rose-600 font-semibold px-2 py-1"
        >
          {lang === 'th' ? 'ล้าง' : 'Clear'}
        </button>
        <button
          onClick={onOpenCompare}
          className="px-3.5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1.5"
        >
          <span>{lang === 'th' ? 'เปรียบเทียบ' : 'Compare'}</span>
          <span className="px-1.5 py-0.2 rounded-full bg-rose-800 text-[10px]">
            {comparedDrugs.length}
          </span>
        </button>
      </div>
    </div>
  );
};
