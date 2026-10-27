// --- Patient Education Printable Sheet, Starting Drug Wizard, & Secondary HT Screener ---

const PatientSheetModal = ({ lang, onClose }) => {
  const [patientName, setPatientName] = useState('');
  const [targetSbp, setTargetSbp] = useState('130');
  const [targetDbp, setTargetDbp] = useState('80');
  const [selectedMeds, setSelectedMeds] = useState([
    { name: lang === 'th' ? 'แอมโลดิพีน (Amlodipine) 5 มก.' : 'Amlodipine 5 mg', timing: lang === 'th' ? '1 เม็ด ตอนเช้า' : '1 tablet in morning' },
    { name: lang === 'th' ? 'โลซาร์แทน (Losartan) 50 มก.' : 'Losartan 50 mg', timing: lang === 'th' ? '1 เม็ด ตอนเช้า' : '1 tablet in morning' }
  ]);
  const [newMedName, setNewMedName] = useState('');
  const [newMedTiming, setNewMedTiming] = useState('');

  const t = translations[lang];

  const handlePrint = () => {
    document.documentElement.classList.add('printing-sheet');
    window.print();
    setTimeout(() => {
      document.documentElement.classList.remove('printing-sheet');
    }, 1000);
  };

  const addMed = () => {
    if (!newMedName) return;
    setSelectedMeds([...selectedMeds, { name: newMedName, timing: newMedTiming || (lang === 'th' ? '1 เม็ด วันละครั้ง' : '1 tablet daily') }]);
    setNewMedName('');
    setNewMedTiming('');
  };

  const removeMed = (index) => {
    setSelectedMeds(selectedMeds.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[92vh] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in zoom-in-95">
        
        {/* Modal Controls Header (Hidden during print) */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <PrinterIcon className="w-5 h-5 text-rose-600" />
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              {t.patientSheet}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md transition-colors"
            >
              <PrinterIcon className="w-4 h-4" />
              <span>{t.printSheet}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Sheet Body */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-900 dark:text-slate-100" id="patient-sheet-print">
          
          {/* Sheet Header */}
          <div className="border-b-2 border-rose-600 pb-4 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-black text-xs uppercase tracking-wider">
                  THS CPG 2024
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-rose-950 dark:text-rose-100">
                  {lang === 'th' ? 'ใบคำแนะนำการดูแลตนเองสำหรับผู้ป่วยโรคความดันโลหิตสูง' : 'Hypertension Self-Care & Patient Education Sheet'}
                </h1>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {lang === 'th' ? 'อ้างอิงแนวทางการรักษาโรคความดันโลหิตสูงในเวชปฏิบัติทั่วไป พ.ศ. 2567 สมาคมความดันโลหิตสูงแห่งประเทศไทย' : 'Based on 2024 Thai Guidelines on the Treatment of Hypertension, Thai Hypertension Society'}
              </p>
            </div>

            {/* Target BP Callout Box */}
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-center shrink-0">
              <span className="text-[11px] font-bold text-rose-800 dark:text-rose-300 block">
                {lang === 'th' ? 'เป้าหมายความดันโลหิตของคุณ' : 'Your Target BP Goal'}
              </span>
              <div className="text-2xl font-black text-rose-600 dark:text-rose-400 font-mono">
                &lt; {targetSbp} / {targetDbp} <span className="text-xs font-normal">mmHg</span>
              </div>
            </div>
          </div>

          {/* Patient Details & Editable Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs">
            <div>
              <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">
                {t.patientName}
              </label>
              <input
                type="text"
                placeholder={lang === 'th' ? 'ระบุชื่อ-นามสกุล' : 'Enter patient name'}
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">
                {lang === 'th' ? 'เป้าหมายความดันตัวบน (SBP):' : 'Target Systolic (SBP):'}
              </label>
              <input
                type="text"
                value={targetSbp}
                onChange={(e) => setTargetSbp(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
              />
            </div>
            <div>
              <label className="font-bold text-slate-600 dark:text-slate-300 block mb-1">
                {lang === 'th' ? 'เป้าหมายความดันตัวล่าง (DBP):' : 'Target Diastolic (DBP):'}
              </label>
              <input
                type="text"
                value={targetDbp}
                onChange={(e) => setTargetDbp(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
              />
            </div>
          </div>

          {/* Section 1: Prescribed Medications */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-sm uppercase tracking-wider text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                <PillIcon className="w-4 h-4" />
                {t.prescribedMeds}
              </h4>
            </div>

            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
              {selectedMeds.map((med, idx) => (
                <div key={idx} className="p-3 flex items-center justify-between gap-3 bg-white dark:bg-slate-800/40">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {med.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                      {med.timing}
                    </span>
                    <button
                      onClick={() => removeMed(idx)}
                      className="text-slate-300 hover:text-rose-600 print:hidden text-lg font-bold"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Add Custom Med (Print:hidden) */}
            <div className="mt-2 flex gap-2 print:hidden">
              <input
                type="text"
                placeholder={lang === 'th' ? 'ชื่อยาและขนาด' : 'Drug and dose'}
                value={newMedName}
                onChange={(e) => setNewMedName(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
              <input
                type="text"
                placeholder={lang === 'th' ? 'วิธีกิน' : 'When to take'}
                value={newMedTiming}
                onChange={(e) => setNewMedTiming(e.target.value)}
                className="w-44 px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
              <button
                onClick={addMed}
                className="px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-800 text-white hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-900"
              >
                + {lang === 'th' ? 'เพิ่ม' : 'Add'}
              </button>
            </div>
          </div>

          {/* Section 2: Dietary Lifestyle: Thai 2:1:1 Plate & Sodium Guide */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            
            {/* 2:1:1 Plate Model */}
            <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80">
              <h5 className="font-bold text-xs uppercase tracking-wider text-emerald-900 dark:text-emerald-300 mb-2 flex items-center gap-1.5">
                <CheckIcon className="w-4 h-4 text-emerald-600" />
                {t.plate211}
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
                {lang === 'th' ? 'แบ่งจานอาหารขนาด 9 นิ้ว ออกเป็น 4 ส่วนเท่าๆ กัน:' : 'Divide standard 9-inch plate into 4 equal quarters:'}
              </p>
              <div className="space-y-1.5 text-xs text-slate-800 dark:text-slate-200">
                <div className="p-2 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-emerald-200 dark:border-emerald-800">
                  <strong className="text-emerald-700 dark:text-emerald-400">{lang === 'th' ? 'ผัก 2 ส่วน (ครึ่งจาน):' : 'Vegetables 2 parts (Half plate):'}</strong> {lang === 'th' ? 'ผักหลากสี ผักใบเขียว สดหรือต้มสุก รวมอย่างน้อย 400 กรัม/วัน' : 'Colorful leafy vegetables, at least 400g daily.'}
                </div>
                <div className="p-2 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-emerald-200 dark:border-emerald-800">
                  <strong className="text-amber-700 dark:text-amber-400">{lang === 'th' ? 'ข้าว-แป้ง 1 ส่วน (หนึ่งในสี่):' : 'Carbs 1 part (One quarter):'}</strong> {lang === 'th' ? 'เน้นข้าวกล้อง ข้าวไม่ขัดสี ธัญพืช ไม่เกิน 2 ทัพพี' : 'Whole grains, brown rice, unrefined starch.'}
                </div>
                <div className="p-2 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-emerald-200 dark:border-emerald-800">
                  <strong className="text-blue-700 dark:text-blue-400">{lang === 'th' ? 'โปรตีน 1 ส่วน (หนึ่งในสี่):' : 'Protein 1 part (One quarter):'}</strong> {lang === 'th' ? 'เนื้อปลา อกไก่ไม่ติดหนัง ไข่ ถั่วเต้าหู้ ไขมันอิ่มตัวต่ำ' : 'Fish, skinless poultry, eggs, tofu, low saturated fat.'}
                </div>
              </div>
            </div>

            {/* Sodium Restriction & Practical Rules */}
            <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/80">
              <h5 className="font-bold text-xs uppercase tracking-wider text-amber-900 dark:text-amber-300 mb-2 flex items-center gap-1.5">
                <AlertTriangleIcon className="w-4 h-4 text-amber-600" />
                {lang === 'th' ? 'การจำกัดเกลือและโซเดียม (< 2,000 มก./วัน)' : 'Sodium Restriction (< 2,000 mg/day)'}
              </h5>
              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <p>
                  <strong>{lang === 'th' ? 'เกลือ 1 ช้อนชา (5 กรัม) = โซเดียม 2,000 มก.' : '1 tsp salt (5g) = 2,000 mg sodium'}</strong>
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>{lang === 'th' ? 'น้ำปลา / ซีอิ๊วขาว ไม่เกินวันละ 3 ช้อนชา' : 'Fish sauce / soy sauce max 3 teaspoons daily'}</li>
                  <li>{lang === 'th' ? 'หลีกเลี่ยงการซดน้ำแกง น้ำต้มยำ น้ำก๋วยเตี๋ยวจนหมด' : 'Do not drink down all soup broth (contains heavy salt)'}</li>
                  <li>{lang === 'th' ? 'งดอาหารแปรรูป: ไส้กรอก กุนเชียง หมูยอ บะหมี่กึ่งสำเร็จรูป' : 'Avoid processed meats, cured sausages, instant noodles'}</li>
                  <li>{lang === 'th' ? 'ระวังโซเดียมแฝง: ผงฟู ขนมอบ สารกันบูด' : 'Watch hidden sodium: baking soda, pastries, preservatives'}</li>
                </ul>
              </div>
            </div>

          </div>

          {/* Section 3: 7-Day Home Blood Pressure Monitoring (HBPM) Template */}
          <div className="mb-4">
            <h5 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
              <ClockIcon className="w-4 h-4" />
              {t.hbpmDiaryTitle}
            </h5>
            <p className="text-[11px] text-slate-500 mb-2">
              {lang === 'th' ? 'คำแนะนำการวัด: นั่งพัก 3-5 นาที, วางแขนระดับหัวใจ, วัด 2 ครั้งห่างกัน 1 นาที แล้วจดบันทึก' : 'Measurement rules: Rest 3-5 min, arm at heart level, take 2 readings 1 min apart and record.'}
            </p>

            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <table className="w-full text-center text-xs border-collapse">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                  <tr>
                    <th className="p-2 border border-slate-200 dark:border-slate-700 w-20">{lang === 'th' ? 'วันที่' : 'Day'}</th>
                    <th className="p-2 border border-slate-200 dark:border-slate-700" colSpan="3">{lang === 'th' ? 'รอบเช้า (หลังตื่นนอน / ก่อนกินยา)' : 'Morning (Waking / Pre-meds)'}</th>
                    <th className="p-2 border border-slate-200 dark:border-slate-700" colSpan="3">{lang === 'th' ? 'รอบค่ำ (ก่อนเข้านอน)' : 'Evening (Before Bedtime)'}</th>
                  </tr>
                  <tr className="bg-slate-50 dark:bg-slate-800/60 text-[10px] text-slate-500">
                    <th className="p-1 border border-slate-200 dark:border-slate-700">Day</th>
                    <th className="p-1 border border-slate-200 dark:border-slate-700">SBP (ตัวบน)</th>
                    <th className="p-1 border border-slate-200 dark:border-slate-700">DBP (ตัวล่าง)</th>
                    <th className="p-1 border border-slate-200 dark:border-slate-700">HR (ชีพจร)</th>
                    <th className="p-1 border border-slate-200 dark:border-slate-700">SBP (ตัวบน)</th>
                    <th className="p-1 border border-slate-200 dark:border-slate-700">DBP (ตัวล่าง)</th>
                    <th className="p-1 border border-slate-200 dark:border-slate-700">HR (ชีพจร)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-[11px]">
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <tr key={day} className="h-7">
                      <td className="p-1 font-sans font-bold border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/20">{lang === 'th' ? `วันที่ ${day}` : `Day ${day}`}</td>
                      <td className="border border-slate-200 dark:border-slate-700"></td>
                      <td className="border border-slate-200 dark:border-slate-700"></td>
                      <td className="border border-slate-200 dark:border-slate-700"></td>
                      <td className="border border-slate-200 dark:border-slate-700"></td>
                      <td className="border border-slate-200 dark:border-slate-700"></td>
                      <td className="border border-slate-200 dark:border-slate-700"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Disclaimer */}
          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-400 text-center">
            {t.disclaimer}
          </div>

        </div>

      </div>
    </div>
  );
};
