// --- Interactive Clinical Calculators & Decision Support Tools ---

// Triage select value -> row of guidelinesData.hypertensiveCrises.table41_emergencySyndromes
const CRISIS_ROW = { acs: 0, hf_edema: 1, aortic_dissection: 2, malignant: 3, encephalopathy: 4, stroke_reperfusion: 5, stroke_non_reperfusion: 6, sich: 7, preeclampsia: 8 };

const ClinicalTools = ({ lang }) => {
  const [activeTool, setActiveTool] = useState('stager');
  const t = translations[lang];

  // Tool 1 State: BP Stager
  const [stagerSetting, setStagerSetting] = useState('clinic');
  const [stagerSbp, setStagerSbp] = useState(145);
  const [stagerDbp, setStagerDbp] = useState(92);
  const [stagerHasDm, setStagerHasDm] = useState(false);
  const [stagerHasCvd, setStagerHasCvd] = useState(false);
  const [stagerHasHmod, setStagerHasHmod] = useState(false);

  // Tool 2 State: Initial Therapy Wizard
  const [wizAge, setWizAge] = useState(55);
  const [wizSbp, setWizSbp] = useState(155);
  const [wizDbp, setWizDbp] = useState(95);
  const [wizFrail, setWizFrail] = useState(false);
  const [wizComorbidities, setWizComorbidities] = useState({
    cad: false,
    hfref: false,
    hfpef: false,
    ckd_alb: false,
    stroke: false,
    dm: false,
    af: false,
    pregnancy: false,
  });

  // Tool 3 State: Secondary HT Screener
  const [secChecked, setSecChecked] = useState({});

  // Tool 4 State: Resistant HT Navigator
  const [resEgfr, setResEgfr] = useState(50);
  const [resPotassium, setResPotassium] = useState(4.2);
  const [resHr, setResHr] = useState(74);

  // Tool 5 State: Crisis Triage
  const [crisisSbp, setCrisisSbp] = useState(195);
  const [crisisDbp, setCrisisDbp] = useState(115);
  const [crisisSyndrome, setCrisisSyndrome] = useState('none');

  // Tool 6 State: CV Risk Clustering
  const [riskAge, setRiskAge] = useState(58);
  const [riskMale, setRiskMale] = useState(true);
  const [riskSmoking, setRiskSmoking] = useState(true);
  const [riskLvh, setRiskLvh] = useState(false);
  const [riskFh, setRiskFh] = useState(false);
  const [riskAlb, setRiskAlb] = useState(false);
  const [riskDm, setRiskDm] = useState(true);
  const [riskAscvd, setRiskAscvd] = useState(false);
  const [riskTcRatio, setRiskTcRatio] = useState(true);

  // Tool 7 State: Renal Safety
  const [renalEgfrInput, setRenalEgfrInput] = useState(28);
  const [selectedRenalDrugId, setSelectedRenalDrugId] = useState('losartan');

  // --- Calculations for Tool 1 (Stager) ---
  const stagingResult = useMemo(() => {
    const sbp = Number(stagerSbp) || 0;
    const dbp = Number(stagerDbp) || 0;

    let category = '';
    let categoryTh = '';
    let color = 'slate';
    let advice = '';

    if (stagerSetting === 'clinic') {
      if (sbp >= 180 || dbp >= 110) {
        category = 'Hypertension Grade 3';
        categoryTh = 'ความดันโลหิตสูง ระดับ 3 (Grade 3)';
        color = 'red';
        advice = lang === 'th' ? 'ความดันโลหิตสูงรุนแรง ประเมินภาวะ Hypertensive Emergency ทันที เริ่มยาสูตรรวม 2-3 ชนิดอย่างเร่งด่วน' : 'Severe HT! Evaluate for Hypertensive Emergency immediately. Urgent dual/triple therapy.';
      } else if (sbp >= 160 || dbp >= 100) {
        category = 'Hypertension Grade 2';
        categoryTh = 'ความดันโลหิตสูง ระดับ 2 (Grade 2)';
        color = 'rose';
        advice = lang === 'th' ? 'แนะนำเริ่มยาสูตรรวมเม็ด 2 ชนิด (SPC) ทันที ติดตามผลใน 2-4 สัปดาห์' : 'Initiate dual combination (SPC preferred). Follow up in 2-4 weeks.';
      } else if (sbp >= 140 || dbp >= 90) {
        if (sbp >= 140 && dbp < 90) {
          category = 'Isolated Systolic Hypertension (ISH)';
          categoryTh = 'ความดันโลหิตซิสโตลิกสูงเดี่ยว (ISH)';
          color = 'blue';
          advice = lang === 'th' ? 'พบบ่อยในผู้สูงอายุ ยาขนานแรกแนะนำ CCB หรือ Thiazide-like' : 'Common in older adults. First-line CCB or Thiazide-like diuretic.';
        } else if (sbp < 140 && dbp >= 90) {
          category = 'Isolated Diastolic Hypertension (IDH)';
          categoryTh = 'ความดันโลหิตไดแอสโตลิกสูงเดี่ยว (IDH)';
          color = 'indigo';
          advice = lang === 'th' ? 'พบบ่อยในคนอายุน้อย/อ้วนลงพุง ปรับพฤติกรรมชีวิตและให้ยามาตรฐาน' : 'Common in young adults. Lifestyle modification + standard therapy.';
        } else {
          category = 'Hypertension Grade 1';
          categoryTh = 'ความดันโลหิตสูง ระดับ 1 (Grade 1)';
          color = 'orange';
          advice = lang === 'th' ? 'เริ่มยาสูตรรวม 2 ชนิด (SPC) ในผู้ป่วยส่วนใหญ่ หรือยาเดี่ยวหากความเสี่ยงต่ำมาก/เปราะบาง' : 'Dual therapy (SPC) for most patients, or monotherapy if very low risk/frail.';
        }
      } else if ((sbp >= 130 && sbp <= 139) || (dbp >= 80 && dbp <= 89)) {
        category = 'BP at risk (ความดันเริ่มเสี่ยง)';
        categoryTh = 'ความดันโลหิตเริ่มเสี่ยง (BP at risk - เกณฑ์ใหม่ 2567)';
        color = 'amber';
        if (stagerHasDm || stagerHasCvd || stagerHasHmod) {
          advice = lang === 'th' ? 'มีเบาหวาน / CVD / HMOD: วินิจฉัยเป็นความดันโลหิตสูงได้ (ระดับ I, หลักฐาน A) และเริ่มยาเมื่อความดัน >= 130/80 ในผู้ป่วย CVD, เบาหวาน หรือเสี่ยง >= 10% (ระดับ I, หลักฐาน A ตารางที่ 9)' : 'DM / CVD / HMOD: hypertension can be diagnosed (Class I, Level A); start drugs from 130/80 mmHg in CVD, DM or 10-year risk >= 10% (Class I, Level A, Table 9).';
        } else {
          advice = lang === 'th' ? 'ปรับเปลี่ยนพฤติกรรม และวัดความดันนอกสถานพยาบาล (HBPM/ABPM) เพื่อหา masked hypertension (ระดับ I, หลักฐาน B ตารางที่ 15)' : 'Lifestyle change, and out-of-office BP (HBPM/ABPM) to look for masked hypertension (Class I, Level B, Table 15).';
        }
      } else if (sbp >= 120 && sbp <= 129 && dbp < 80) {
        category = 'Normal';
        categoryTh = 'ปกติ (Normal)';
        color = 'teal';
        advice = lang === 'th' ? 'ส่งเสริมพฤติกรรมสุขภาพ' : 'Healthy lifestyle.';
      } else {
        category = 'Optimal';
        categoryTh = 'เหมาะสม (Optimal)';
        color = 'emerald';
        advice = lang === 'th' ? 'ความดันโลหิตเหมาะสม ส่งเสริมพฤติกรรมสุขภาพ' : 'Optimal blood pressure. Healthy lifestyle.';
      }
    } else {
      // Out-of-office (HBPM / ABPM)
      const isHbpm = stagerSetting === 'hbpm' || stagerSetting === 'abpm_day';
      const isNight = stagerSetting === 'abpm_night';
      const cutSbp = isNight ? 120 : (stagerSetting === 'abpm_24' ? 130 : 135);
      const cutDbp = isNight ? 70 : (stagerSetting === 'abpm_24' ? 80 : 85);

      if (sbp >= cutSbp || dbp >= cutDbp) {
        category = 'Out-of-office Hypertension Confirmed';
        categoryTh = 'ความดันโลหิตสูงนอกสถานพยาบาล (ผิดปกติ)';
        color = 'rose';
        advice = lang === 'th' ? `ค่าเกินเกณฑ์มาตรฐาน (${cutSbp}/${cutDbp} มม.ปรอท) ยืนยันการเป็นโรคความดันโลหิตสูง` : `Exceeds threshold (${cutSbp}/${cutDbp} mmHg). Confirms Hypertension.`;
      } else {
        category = 'Out-of-office Normal';
        categoryTh = 'ความดันโลหิตนอกสถานพยาบาลปกติ';
        color = 'emerald';
        advice = lang === 'th' ? `อยู่ในเกณฑ์ปกติ (ต่ำกว่า ${cutSbp}/${cutDbp} มม.ปรอท) หากที่คลินิกสูง บ่งชี้ภาวะ White-coat HT` : `Normal out-of-office BP (< ${cutSbp}/${cutDbp} mmHg). If clinic BP is elevated, indicates White-coat HT.`;
      }
    }

    return { category, categoryTh, color, advice };
  }, [stagerSetting, stagerSbp, stagerDbp, stagerHasDm, stagerHasCvd, stagerHasHmod, lang]);

  // --- Calculations for Tool 2 (Wizard) ---
  const wizardResult = useMemo(() => {
    const age = Number(wizAge) || 50;
    const sbp = Number(wizSbp) || 140;
    const dbp = Number(wizDbp) || 90;
    const c = wizComorbidities;

    let targetBp = '< 130/80 mmHg';
    let targetBpTh = '< 130/80 มม.ปรอท';

    if (age >= 80) {
      targetBp = 'SBP 140-150 mmHg and DBP < 80 mmHg';
      targetBpTh = 'ซิสโตลิก 140-150 มม.ปรอท และไดแอสโตลิก < 80 มม.ปรอท';
    } else if (age >= 65) {
      targetBp = 'Initial < 140/90 mmHg; target < 130/80 mmHg if tolerated';
      targetBpTh = 'เบื้องต้น < 140/90 มม.ปรอท; ปรับลงจน < 130/80 มม.ปรอท หากทนยาได้ดี';
    }

    if (wizFrail) {
      targetBp = 'Individualized (Avoid SBP < 120 or DBP < 70 mmHg)';
      targetBpTh = 'เป้าหมายเฉพาะบุคคลตามความเหมาะสม (ห้ามต่ำกว่า 120/70 มม.ปรอท)';
    }

    let strategy = '';
    let strategyTh = '';
    let drugs = [];

    // Pregnancy check first
    if (c.pregnancy) {
      strategy = 'Pregnancy: chronic-HT drug choice is not covered by Thai CPG 2567';
      strategyTh = 'หญิงตั้งครรภ์: แนวทางฯ 2567 ไม่ได้ครอบคลุมการเลือกยาสำหรับความดันสูงเรื้อรัง';
      targetBp = 'Not given in Thai CPG 2567';
      targetBpTh = 'แนวทางฯ 2567 ไม่ได้กำหนด';
      drugs = [
        'NLEM 2569 lists methyldopa and hydralazine; nifedipine SR 20 mg (ex) when they fail',
        'Crisis (>= 160/110): hydralazine IV/IM, oral nifedipine, labetalol IV (Class I, Level B, Table 30)',
        'Avoid ACEI, ARB, ARNI and MRA (fetotoxic; drug labels)'
      ];
      return { targetBp, targetBpTh, strategy, strategyTh, drugs };
    }

    // Monotherapy indications (p.37, Table 12)
    // Low starting BP 140-149/90-95 with low CV risk (no CVD / DM / HF / stroke ticked)
    const isMildGrade1 = sbp >= 140 && sbp <= 149 && dbp <= 95 && !c.cad && !c.hfref && !c.hfpef && !c.stroke && !c.dm && !c.ckd_alb;
    // BP at risk (130-139 and/or 80-89) with very high CV risk
    const isBpAtRiskHigh = sbp < 140 && dbp < 90 && (sbp >= 130 || dbp >= 80) && (c.cad || c.dm || c.stroke || c.ckd_alb);

    if (wizFrail || isMildGrade1 || isBpAtRiskHigh) {
      strategy = 'Initial Monotherapy (Class I, Level C)';
      strategyTh = 'เริ่มต้นด้วยยาชนิดเดียว (Initial Monotherapy, Class I, Level C)';
      if (c.hfref) {
        drugs = ['Beta-blocker (Bisoprolol or Carvedilol) OR ARNI/ACEI/ARB', 'Add SGLT2i + Spironolactone'];
      } else if (c.ckd_alb || c.dm) {
        drugs = ['ACEI (Enalapril 5-10 mg) OR ARB (Losartan 50 mg / Telmisartan 40 mg)'];
      } else if (c.cad) {
        drugs = ['ACEI or beta-blocker (ARB if ACEI not tolerated) (Table 16)'];
      } else if (age >= 65 || sbp >= 140 && dbp < 90) {
        drugs = ['DHP-CCB (Amlodipine 2.5-5 mg) OR Thiazide-like (Indapamide 1.5 mg SR)'];
      } else {
        drugs = ['DHP-CCB (Amlodipine 5 mg) OR ARB (Losartan 50 mg) OR Thiazide-like'];
      }
    } else {
      // Standard Dual Combination SPC (Class I, Level A)
      strategy = 'Dual Combination in ONE Tablet (Single-Pill Combination, SPC) - Preferred (Class I, Level A)';
      strategyTh = 'ยาสูตรรวมเม็ด 2 ชนิด (Single-Pill Combination, SPC) - คำแนะนำอันดับ 1 (Class I, Level A)';

      if (c.hfref) {
        drugs = [
          'HFrEF 4 GDMT Pillars: ARNI (Sacubitril/Valsartan) + Beta-blocker (Bisoprolol/Carvedilol) + MRA (Spironolactone) + SGLT2i',
          'Add Amlodipine if BP remains uncontrolled'
        ];
      } else if (c.cad) {
        drugs = [
          'ACEI and/or beta-blocker (ARB if ACEI not tolerated); for angina a beta-blocker or CCB (Class I, Level A, Table 16)',
          'Examples: Perindopril/Amlodipine (Coveram) OR Bisoprolol/Amlodipine (Concor AM)'
        ];
      } else if (c.ckd_alb || c.dm) {
        drugs = [
          'Albuminuria (UACR >= 30 mg/g): ACEI or ARB first (Class I, Level A), combined with a CCB, or a thiazide/thiazide-like diuretic if eGFR > 45 (Table 21, Table 24)',
          'Examples: Amlodipine/Valsartan (Exforge) OR Telmisartan/Amlodipine (Twynsta) OR Losartan/HCTZ (Hyzaar)'
        ];
      } else if (c.stroke) {
        drugs = [
          'Standard dual SPC: RAS blocker + CCB or thiazide/thiazide-like; the size of the BP fall matters more than the class (Class I, Level A, Table 22)',
          'Examples: Amlodipine/Valsartan (Exforge) OR Perindopril/Indapamide (Preterax)'
        ];
      } else {
        drugs = [
          'Standard First-line Dual SPC: RAS blocker (ACEI/ARB) + DHP-CCB',
          'Examples: Amlodipine/Valsartan (Exforge) OR Telmisartan/Amlodipine (Twynsta)',
          'Alternative Dual SPC: RAS blocker + Thiazide/Thiazide-like (Losartan/HCTZ or Perindopril/Indapamide)'
        ];
      }
    }

    return { targetBp, targetBpTh, strategy, strategyTh, drugs };
  }, [wizAge, wizSbp, wizDbp, wizFrail, wizComorbidities, lang]);

  // --- Calculations for Tool 6 (CV Risk Factor Clustering) ---
  const riskClusteringCount = useMemo(() => {
    let count = 0;
    if (riskMale) count++;
    if (Number(riskAge) > 55) count++;
    if (riskSmoking) count++;
    if (riskLvh) count++;
    if (riskFh) count++;
    if (riskAlb) count++;
    if (riskDm) count++;
    if (riskAscvd) count++;
    if (riskTcRatio) count++;
    return count;
  }, [riskMale, riskAge, riskSmoking, riskLvh, riskFh, riskAlb, riskDm, riskAscvd, riskTcRatio]);

  return (
    <div className="space-y-6 animate-in fade-in">
      
      {/* Tool Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-200 dark:border-slate-800" data-tool-tabs>
        {[
          { id: 'stager', labelEn: '1. BP Stager & Classifier', labelTh: '1. คัดกรองและจัดระดับความดัน' },
          { id: 'wizard', labelEn: '2. Initial Therapy Wizard', labelTh: '2. ตัวช่วยเลือกสูตรยาเริ่มต้น' },
          { id: 'secondary', labelEn: '3. Secondary HT Screener', labelTh: '3. ตรวจคัดกรองความดันผิดปกติ' },
          { id: 'resistant', labelEn: '4. Resistant HT Navigator', labelTh: '4. ขั้นตอนความดันดื้อยา' },
          { id: 'crisis', labelEn: '5. Crisis Triage & IV Dosing', labelTh: '5. ภาวะวิกฤตและขนาดยาฉีด' },
          { id: 'cvrisk', labelEn: '6. Thai CV Risk & Statin', labelTh: '6. ประเมินความเสี่ยงและ Statin' },
          { id: 'renal', labelEn: '7. eGFR Drug Safety', labelTh: '7. ตรวจสอบความปลอดภัยต่อไต' },
        ].map(tool => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors border shadow-sm ${
              activeTool === tool.id
                ? 'bg-rose-600 text-white border-rose-600'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-rose-400'
            }`}
          >
            {lang === 'th' ? tool.labelTh : tool.labelEn}
          </button>
        ))}
      </div>

      {/* TOOL 1: BP STAGING & DIAGNOSTIC CLASSIFIER */}
      {activeTool === 'stager' && (
        <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <GaugeIcon className="w-5 h-5 text-rose-600" />
              {lang === 'th' ? 'เครื่องมือจำแนกและวินิจฉัยระดับความดันโลหิต (พ.ศ. 2567)' : 'BP Staging & Diagnostic Classifier (2024 Guidelines)'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {lang === 'th' ? 'รองรับการคำนวณทั้งความดันที่สถานพยาบาล (Clinic), ที่บ้าน (HBPM) และเครื่องติดตัว 24 ชั่วโมง (ABPM)' : 'Supports Clinic BP, HBPM, and 24h/Day/Night ABPM classification.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {lang === 'th' ? 'วิธีหรือสถานที่ตรวจวัด:' : 'Measurement Modality:'}
              </label>
              <select
                value={stagerSetting}
                onChange={(e) => setStagerSetting(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium"
              >
                <option value="clinic">{lang === 'th' ? 'สถานพยาบาล (Clinic / Office BP)' : 'Clinic / Office BP'}</option>
                <option value="hbpm">{lang === 'th' ? 'วัดด้วยตนเองที่บ้าน (HBPM เฉลี่ย 7 วัน)' : 'Home BP (HBPM 7-day average)'}</option>
                <option value="abpm_24">{lang === 'th' ? 'ABPM ค่าเฉลี่ย 24 ชั่วโมง' : 'ABPM 24-Hour Mean'}</option>
                <option value="abpm_day">{lang === 'th' ? 'ABPM ค่าเฉลี่ยกลางวัน (ตื่น)' : 'ABPM Daytime Mean'}</option>
                <option value="abpm_night">{lang === 'th' ? 'ABPM ค่าเฉลี่ยกลางคืน (หลับ)' : 'ABPM Nighttime Mean'}</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {lang === 'th' ? 'ความดันตัวบน (Systolic, SBP):' : 'Systolic BP (SBP, mmHg):'}
              </label>
              <input
                type="number"
                value={stagerSbp}
                onChange={(e) => setStagerSbp(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {lang === 'th' ? 'ความดันตัวล่าง (Diastolic, DBP):' : 'Diastolic BP (DBP, mmHg):'}
              </label>
              <input
                type="number"
                value={stagerDbp}
                onChange={(e) => setStagerDbp(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm"
              />
            </div>
          </div>

          {/* Conditional Modifiers for BP at risk */}
          {stagerSetting === 'clinic' && stagingResult.color === 'amber' && (
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-2">
              <span className="text-xs font-bold text-amber-900 dark:text-amber-300 block">
                {lang === 'th' ? 'ตรวจหาโรคร่วมสำหรับความดันระดับ BP at risk (130-139 / 80-89 มม.ปรอท):' : 'Co-morbidity Check for BP at risk (130-139 / 80-89 mmHg):'}
              </span>
              <div className="flex flex-wrap gap-4 text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={stagerHasDm} onChange={(e) => setStagerHasDm(e.target.checked)} className="rounded text-rose-600" />
                  <span>{lang === 'th' ? 'เป็นโรคเบาหวาน (Diabetes)' : 'Diabetes Mellitus'}</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={stagerHasCvd} onChange={(e) => setStagerHasCvd(e.target.checked)} className="rounded text-rose-600" />
                  <span>{lang === 'th' ? 'โรคหลอดเลือดหัวใจ/สมอง (CVD)' : 'Cardiovascular Disease'}</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={stagerHasHmod} onChange={(e) => setStagerHasHmod(e.target.checked)} className="rounded text-rose-600" />
                  <span>{lang === 'th' ? 'มีอวัยวะถูกทำลาย (HMOD / ไข่ขาวรั่ว)' : 'HMOD / Albuminuria'}</span>
                </label>
              </div>
            </div>
          )}

          {/* Result Card */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                {lang === 'th' ? 'ผลการวินิจฉัยและระดับความรุนแรง:' : 'Diagnostic Classification:'}
              </span>
              <div className="text-xl sm:text-2xl font-black text-rose-600 dark:text-rose-400">
                {lang === 'th' ? stagingResult.categoryTh : stagingResult.category}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
                {stagingResult.advice}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center shrink-0">
              <span className="text-[10px] font-bold text-slate-400 block">{lang === 'th' ? 'ค่าความดันที่ระบุ' : 'Input BP'}</span>
              <span className="text-xl font-black font-mono text-slate-900 dark:text-white">{stagerSbp}/{stagerDbp}</span>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 2: INITIAL THERAPY WIZARD */}
      {activeTool === 'wizard' && (
        <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <StethoscopeIcon className="w-5 h-5 text-rose-600" />
              {lang === 'th' ? 'ตัวช่วยเลือกสูตรยาเริ่มต้นและเป้าหมายความดัน (Initial Therapy Wizard)' : 'Initial Therapy Selector & Target BP Wizard'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {lang === 'th' ? 'ประมวลผลตามแนวทาง พ.ศ. 2567 แยกกรณี Monotherapy vs Dual SPC พร้อมเป้าหมายความดันเฉพาะบุคคล' : 'Generates personalized starting strategy (Monotherapy vs Dual SPC) & BP goal.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {lang === 'th' ? 'อายุ (ปี):' : 'Age (years):'}
              </label>
              <input
                type="number"
                value={wizAge}
                onChange={(e) => setWizAge(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">SBP (mmHg):</label>
              <input
                type="number"
                value={wizSbp}
                onChange={(e) => setWizSbp(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">DBP (mmHg):</label>
              <input
                type="number"
                value={wizDbp}
                onChange={(e) => setWizDbp(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm"
              />
            </div>
            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={wizFrail}
                  onChange={(e) => setWizFrail(e.target.checked)}
                  className="rounded text-rose-600"
                />
                <span>{lang === 'th' ? 'สูงอายุ / อ่อนแอ / เปราะบาง' : 'Advanced age / weak / frail'}</span>
              </label>
            </div>
          </div>

          {/* Comorbidities Checkboxes */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
              {lang === 'th' ? 'ภาวะโรคร่วมสำคัญ (Comorbidities):' : 'Compelling Comorbidities:'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {[
                { key: 'cad', labelEn: 'Coronary CAD / Angina', labelTh: 'โรคหลอดเลือดหัวใจตีบ (CAD)' },
                { key: 'hfref', labelEn: 'Heart Failure HFrEF (EF<=40%)', labelTh: 'หัวใจล้มเหลว (HFrEF)' },
                { key: 'hfpef', labelEn: 'Heart Failure HFpEF', labelTh: 'หัวใจล้มเหลว (HFpEF)' },
                { key: 'ckd_alb', labelEn: 'CKD / Albuminuria', labelTh: 'โรคไตเรื้อรัง / ไข่ขาวรั่ว' },
                { key: 'stroke', labelEn: 'Prior Stroke / TIA', labelTh: 'เคยเป็นสโตรก (Stroke)' },
                { key: 'dm', labelEn: 'Diabetes Mellitus', labelTh: 'โรคเบาหวาน (DM)' },
                { key: 'af', labelEn: 'Atrial Fibrillation', labelTh: 'หัวใจสั่นพลิ้ว (AF)' },
                { key: 'pregnancy', labelEn: 'Pregnancy', labelTh: 'สตรีมีครรภ์ (Pregnancy)' },
              ].map(item => (
                <label key={item.key} className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={wizComorbidities[item.key]}
                    onChange={(e) => setWizComorbidities({ ...wizComorbidities, [item.key]: e.target.checked })}
                    className="rounded text-rose-600"
                  />
                  <span>{lang === 'th' ? item.labelTh : item.labelEn}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Recommendation Output */}
          <div className="p-5 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rose-200 dark:border-rose-900/60 pb-3">
              <div>
                <span className="text-xs font-bold text-rose-800 dark:text-rose-300 block mb-1">
                  {lang === 'th' ? 'กลยุทธ์การเริ่มยาที่แนะนำ:' : 'Recommended Initiation Strategy:'}
                </span>
                <h4 className="text-base sm:text-lg font-black text-rose-900 dark:text-rose-100">
                  {lang === 'th' ? wizardResult.strategyTh : wizardResult.strategy}
                </h4>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-900 text-center shrink-0">
                <span className="text-[10px] font-bold text-slate-500 block">{lang === 'th' ? 'เป้าหมายความดัน' : 'Target BP Goal'}</span>
                <span className="text-sm font-black text-rose-600 dark:text-rose-400 font-mono">
                  {lang === 'th' ? wizardResult.targetBpTh : wizardResult.targetBp}
                </span>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                {lang === 'th' ? 'สูตรยาที่แนะนำตามแนวทางเวชปฏิบัติ 2567:' : 'Recommended Regimen per 2024 Guidelines:'}
              </span>
              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                {wizardResult.drugs.map((d, i) => (
                  <li key={i} className="font-medium leading-relaxed">{d}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 3: SECONDARY HT SCREENER */}
      {activeTool === 'secondary' && (
        <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ZapIcon className="w-5 h-5 text-rose-600" />
              {lang === 'th' ? 'เครื่องมือคัดกรองความดันโลหิตสูงทุติยภูมิ (Secondary HT Screener)' : 'Secondary Hypertension Clinical Screener'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {lang === 'th' ? 'เลือกอาการและอาการแสดงที่ตรวจพบ เพื่อแสดงแนวทางการสืบค้น การเตรียมตัวก่อนตรวจ และการส่งตรวจยืนยัน' : 'Select patient clues to identify suspected causes and ordered tests.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {[
              { id: 'hypokalemia', labelEn: 'Spontaneous or diuretic-induced hypokalemia', labelTh: 'โพแทสเซียมในเลือดต่ำเอง หรือหลังเริ่มยาขับปัสสาวะ', target: 'pa' },
              { id: 'triad', labelEn: 'Classic Triad: Paroxysmal headache, sweating, palpitations', labelTh: 'กลุ่มอาการ 3 อย่าง: ปวดหัว เหงื่อแตก ใจสั่น เป็นพักๆ', target: 'ppgl' },
              { id: 'young_grade23', labelEn: 'Hypertension starting before age 40', labelTh: 'เริ่มเป็นความดันโลหิตสูงก่อนอายุ 40 ปี', target: 'pa' },
              { id: 'snoring', labelEn: 'Loud snoring, daytime somnolence, witnessed apnea, obesity', labelTh: 'นอนกรนเสียงดัง ง่วงกลางวันมาก มีหยุดหายใจ อ้วนลงพุง', target: 'osa' },
              { id: 'cushingoid', labelEn: 'Purple striae > 1cm, moon face, proximal weakness, bruising', labelTh: 'รอยแตกลายสีม่วงกว้าง > 1 ซม., หน้ากลม, กล้ามเนื้อต้นแขนขาอ่อนแรง', target: 'cushings' },
              { id: 'bruit', labelEn: 'Abdominal epigastric bruit, flash pulmonary edema, Cr surge with ACEi', labelTh: 'ฟังได้เสียงฟู่ในช่องท้อง, น้ำท่วมปอดฉับพลันซ้ำๆ, ค่าไตพุ่งหลังได้ ACEi/ARB', target: 'ras' },
              { id: 'adrenal_mass', labelEn: 'Adrenal incidentaloma on CT scan (> 10 HU)', labelTh: 'ตรวจพบก้อนที่ต่อมหมวกไตโดยบังเอิญ (Adrenal Incidentaloma)', target: 'pa_ppgl' },
              { id: 'resistant', labelEn: 'Resistant HT (BP >= 140/90 on 3 max drugs including diuretic)', labelTh: 'ความดันโลหิตสูงดื้อยา (กินยา 3 กลุ่มหลักรวมยาขับปัสสาวะแล้วยังไม่ลง)', target: 'pa' },
            ].map(item => (
              <label key={item.id} className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!secChecked[item.id]}
                  onChange={(e) => setSecChecked({ ...secChecked, [item.id]: e.target.checked })}
                  className="rounded text-rose-600 mt-0.5"
                />
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">
                    {lang === 'th' ? item.labelTh : item.labelEn}
                  </span>
                </div>
              </label>
            ))}
          </div>

          {/* Action Plan Guidance */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <CheckIcon className="w-4 h-4 text-emerald-600" />
              {lang === 'th' ? 'การสืบค้นที่แนะนำตามลักษณะที่เลือก:' : 'Recommended Diagnostic Plan:'}
            </h4>

            {(secChecked['hypokalemia'] || secChecked['young_grade23'] || secChecked['resistant'] || secChecked['adrenal_mass']) && (
              <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs text-purple-900 dark:text-purple-200">
                <strong>{lang === 'th' ? 'คัดกรอง Primary Aldosteronism (PA):' : 'Screen for Primary Aldosteronism (PA):'}</strong>
                <p className="mt-1">{lang === 'th' ? 'ตรวจ plasma aldosterone และ renin (ระดับ I: อายุ < 40 ปี หลักฐาน B; โพแทสเซียมต่ำ, adrenal incidentaloma, resistant HT หลักฐาน A) แก้ K+ ต่ำก่อน และเปลี่ยนยาที่รบกวนผลเป็น verapamil SR, hydralazine หรือ alpha-blocker (ตารางที่ 38, หน้า 106)' : 'Plasma aldosterone and renin (Class I: onset < 40 y Level B; hypokalaemia, adrenal incidentaloma, resistant HT Level A). Correct low K+ first and switch interfering drugs to verapamil SR, hydralazine or an alpha-blocker (Table 38, p.106).'}</p>
              </div>
            )}

            {(secChecked['triad'] || secChecked['adrenal_mass']) && (
              <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-900 dark:text-rose-200">
                <strong>{lang === 'th' ? 'สงสัยเนื้องอกฟีโอโครโมไซโตมา (Pheochromocytoma / PPGL):' : 'Suspect Pheochromocytoma (PPGL):'}</strong>
                <p className="mt-1">{lang === 'th' ? 'ตรวจ plasma-free metanephrines (นอนหงาย >= 20 นาทีก่อนเจาะ) หรือ urine fractionated metanephrines 24 ชม. (adrenal incidentaloma: ตรวจถ้า unenhanced CT > 10 HU) ต้องให้ alpha-blocker ก่อน beta-blocker (ระดับ I, หลักฐาน A ตารางที่ 37)' : 'Plasma-free metanephrines (supine >= 20 min) or 24-h urine fractionated metanephrines (incidentaloma: if unenhanced CT > 10 HU). Alpha-blocker before any beta-blocker (Class I, Level A, Table 37).'}</p>
              </div>
            )}

            {secChecked['snoring'] && (
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200">
                <strong>{lang === 'th' ? 'สงสัยภาวะหยุดหายใจขณะหลับ (OSA):' : 'Suspect Obstructive Sleep Apnea (OSA):'}</strong>
                <p className="mt-1">{lang === 'th' ? 'ส่งตรวจ polysomnography (ระดับ I, หลักฐาน A) อาจคัดกรอง PA (ระดับ IIa, หลักฐาน B) ใช้ MRA, ACEI หรือ ARB ลดความดัน (ระดับ I, หลักฐาน A) และพิจารณา CPAP (ระดับ IIa, หลักฐาน B) (ตารางที่ 26)' : 'Polysomnography (Class I, Level A); PA can be screened (Class IIa, Level B); MRA, ACEI or ARB to lower BP (Class I, Level A); consider CPAP (Class IIa, Level B) (Table 26).'}</p>
              </div>
            )}

            {secChecked['bruit'] && (
              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200">
                <strong>{lang === 'th' ? 'สงสัยหลอดเลือดแดงไตตีบ (Renal Artery Stenosis):' : 'Suspect Renal Artery Stenosis (RAS):'}</strong>
                <p className="mt-1">{lang === 'th' ? 'ตรวจอัลตราซาวด์ไตและ Doppler (ระดับ IIa, หลักฐาน C) หรือ CTA/MRA พิจารณา revascularization ถ้ามีน้ำท่วมปอดเฉียบพลัน CKD แย่ลง หรือตีบ > 75%' : 'Kidney ultrasound and Doppler (Class IIa, Level C) or CTA/MRA. Consider revascularisation with acute pulmonary oedema, progressive CKD or stenosis > 75%.'}</p>
              </div>
            )}

            {secChecked['cushingoid'] && (
              <div className="p-3 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs text-teal-900 dark:text-teal-200">
                <strong>{lang === 'th' ? 'สงสัยกลุ่มอาการคุชชิง (Cushing Syndrome):' : 'Suspect Cushing Syndrome:'}</strong>
                <p className="mt-1">{lang === 'th' ? 'เจาะ Cortisol 8:00 น. แยกการได้รับยาสเตียรอยด์ภายนอก จากนั้นตรวจ Overnight 1 mg DST หรือ 24h UFC หรือน้ำลายตอนดึก อย่างน้อย 2 ครั้ง' : 'Check 8 AM cortisol to rule out exogenous steroids. Screen with 1 mg overnight DST or 24h UFC.'}</p>
              </div>
            )}

            {Object.keys(secChecked).filter(k => secChecked[k]).length === 0 && (
              <p className="text-xs text-slate-500 italic">
                {lang === 'th' ? 'กรุณาติ๊กเลือกอาการหรือความผิดปกติที่ตรวจพบเพื่อดูคำแนะนำการสืบค้น' : 'Select at least one clinical clue above to view targeted work-up.'}
              </p>
            )}
          </div>
        </div>
      )}

      {/* TOOL 4: RESISTANT HT NAVIGATOR */}
      {activeTool === 'resistant' && (
        <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ActivityIcon className="w-5 h-5 text-rose-600" />
              {lang === 'th' ? 'ขั้นตอนการดูแลความดันโลหิตสูงดื้อยา (Resistant HT Navigator)' : 'Resistant & Refractory HT Stepwise Navigator'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {lang === 'th' ? 'ตามภาพที่ 6 และหน้า 115-116 ของแนวทางฯ 2567' : 'Follows Figure 6 and p.115-116 of the Thai CPG 2567.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                eGFR (mL/min/1.73m2):
              </label>
              <input
                type="number"
                value={resEgfr}
                onChange={(e) => setResEgfr(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Serum Potassium K+ (mEq/L):
              </label>
              <input
                type="number"
                step="0.1"
                value={resPotassium}
                onChange={(e) => setResPotassium(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {lang === 'th' ? 'ชีพจรขณะพัก (HR, ครั้ง/นาที):' : 'Resting Heart Rate (bpm):'}
              </label>
              <input
                type="number"
                value={resHr}
                onChange={(e) => setResHr(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm"
              />
            </div>
          </div>

          {/* Dynamic Step Recommendations */}
          <div className="space-y-3">
            {/* Step 2 Diuretic & MRA check */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider block">
                {lang === 'th' ? 'ขั้นตอนที่ 2: การปรับยาขับปัสสาวะและยาขนานที่ 4 (MRA)' : 'Step 2: Diuretic Switch & 4th-Line MRA'}
              </span>

              {/* Diuretic recommendation based on eGFR */}
              <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <p>
                  <strong>{lang === 'th' ? 'ยาขับปัสสาวะที่ต้องเลือก:' : 'Diuretic Selection:'} </strong>
                  {resEgfr < 30 ? (
                    <span className="text-rose-600 dark:text-rose-400 font-bold">
                      {lang === 'th' ? 'eGFR < 30 มล./นาที: ต้องเปลี่ยนเป็น Loop Diuretic (Furosemide 40-80 มก.) (หรือเสริม Chlorthalidone หาก eGFR 15-30)' : 'eGFR < 30: Switch to Loop Diuretic (Furosemide 40-80 mg). Chlorthalidone can also be used if eGFR 15-30.'}
                    </span>
                  ) : resEgfr < 45 ? (
                    <span className="text-amber-600 dark:text-amber-400 font-bold">
                      {lang === 'th' ? 'eGFR 30-45 มล./นาที: พิจารณาเปลี่ยนเป็น Loop Diuretic หรือ Chlorthalidone 12.5-25 มก.' : 'eGFR 30-45: Consider Loop Diuretic or Chlorthalidone 12.5-25 mg.'}
                    </span>
                  ) : (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                      {lang === 'th' ? 'eGFR >= 45 มล./นาที: เปลี่ยน HCTZ เป็น Chlorthalidone (12.5-50 มก.) หรือ Indapamide (1.5-2.5 มก.) ชนิดออกฤทธิ์ยาว' : 'eGFR >= 45: Switch HCTZ to long-acting thiazide-like (Chlorthalidone 12.5-50 mg or Indapamide 1.5-2.5 mg).'}
                    </span>
                  )}
                </p>

                {/* Spironolactone eligibility */}
                <p>
                  <strong>{lang === 'th' ? 'ความปลอดภัยในการเพิ่ม Spironolactone 25-50 มก./วัน:' : 'Spironolactone 25-50 mg Safety:'} </strong>
                  {Number(resEgfr) < 30 ? (
                    <span className="text-rose-600 dark:text-rose-400 font-bold">
                      {lang === 'th' ? 'eGFR < 30: ไม่ใช้ spironolactone หรือ eplerenone (ใช้เฉพาะ eGFR >= 30; ภาพที่ 6) พิจารณา chlorthalidone ถ้า eGFR 15-30' : 'eGFR < 30: do not use spironolactone or eplerenone (only if eGFR >= 30; Figure 6). Consider chlorthalidone if eGFR 15-30.'}
                    </span>
                  ) : (Number(resEgfr) < 45 || Number(resPotassium) > 4.5) ? (
                    <span className="text-amber-600 dark:text-amber-400 font-bold">
                      {lang === 'th' ? 'ใช้ได้ด้วยความระมัดระวัง (eGFR < 45 หรือ K+ > 4.5 มิลลิโมล/ลิตร) ติดตาม K+ และการทำงานของไตใกล้ชิดใน 8 สัปดาห์แรก (หน้า 115-116)' : 'Use with caution (eGFR < 45 or K+ > 4.5 mmol/L); check K+ and kidney function closely for 8 weeks (p.115-116).'}
                    </span>
                  ) : (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                      {lang === 'th' ? 'ยาชนิดที่ 4 ที่ควรเลือก (ระดับ I, หลักฐาน B; PATHWAY-2) ติดตาม K+ และการทำงานของไตใน 8 สัปดาห์แรก' : 'Preferred 4th drug (Class I, Level B; PATHWAY-2). Check K+ and kidney function during the first 8 weeks.'}
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Step 3 5th-Line Add-on */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
              <span className="font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider block">
                {lang === 'th' ? 'ขั้นตอนที่ 3: ทางเลือกยากลุ่มเพิ่มเติมขนานที่ 5' : 'Step 3: 5th-Line Add-on Selection'}
              </span>
              <p>
                &bull; <strong>ARNI:</strong> {lang === 'th' ? 'เปลี่ยนยา ACEi หรือ ARB มาเป็น Sacubitril/Valsartan (Entresto) (Class IIb, Level B)' : 'Switch ACEI/ARB to Sacubitril/Valsartan (ARNI) (Class IIb, Level B)'}
              </p>
              <p>
                &bull; <strong>Beta-Blocker:</strong> {resHr >= 70 ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    {lang === 'th' ? `ผู้ป่วยมีชีพจร ${resHr} ครั้ง/นาที (>=70) -> แนะนำเพิ่ม Beta-Blocker (Bisoprolol 5-10 มก.)` : `HR is ${resHr} bpm (>=70) -> Add Beta-Blocker (Bisoprolol 5-10 mg)`}
                  </span>
                ) : (
                  <span>{lang === 'th' ? `ชีพจร ${resHr} ครั้ง/นาที (<70) -> ไม่แนะนำเพิ่ม Beta-Blocker` : `HR is ${resHr} bpm (<70) -> Beta-blocker not favored`}</span>
                )}
              </p>
              <p>
                &bull; <strong>Alpha-1 blocker / Central agent:</strong> {lang === 'th' ? 'Doxazosin XL (4-8 มก.) หรือ Clonidine (0.15 มก. วันละ 2 ครั้ง)' : 'Doxazosin XL (4-8 mg) or Clonidine (0.15 mg BID)'}
              </p>
              <p>
                &bull; <strong>Direct Vasodilator:</strong> {lang === 'th' ? 'Hydralazine หรือ minoxidil (ทำให้ใจสั่นและบวมน้ำ; minoxidil ทำให้ขนดก ใช้เมื่อจำเป็น)' : 'Hydralazine or minoxidil (cause fast heart rate and fluid retention; minoxidil also hair growth - use only when needed)'}
              </p>
            </div>

            {/* Step 4 RDN check */}
            <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 text-xs text-indigo-950 dark:text-indigo-200 space-y-1">
              <span className="font-bold uppercase tracking-wider block">
                {lang === 'th' ? 'ขั้นตอนที่ 4: การพิจารณาจี้เส้นประสาทไต (Renal Denervation, RDN)' : 'Step 4: Renal Denervation (RDN) Eligibility'}
              </span>
              <p>
                {resEgfr >= 30 ? (
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                    {lang === 'th' ? 'eGFR >= 30 มล./นาที: มีสิทธิ์พิจารณาทำ RDN หากเป็น Refractory HT (Class I, Level C) หรือ Resistant HT ร่วมกับโรคหลอดเลือดแข็ง/HMOD รุนแรง (Class IIa, Level B)' : 'eGFR >= 30: Eligible for RDN if Refractory HT (Class I, Level C) or Resistant HT with ASCVD/progressive HMOD (Class IIa, Level B).'}
                  </span>
                ) : (
                  <span className="text-rose-600 dark:text-rose-400 font-bold">
                    {lang === 'th' ? 'eGFR < 30 มล./นาที: ไม่อยู่ในเกณฑ์พิจารณา RDN (ภาพที่ 6 ระบุ eGFR >= 30)' : 'eGFR < 30: outside the RDN criteria (Figure 6 requires eGFR >= 30).'}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 5: HYPERTENSIVE CRISIS TRIAGE & IV DOSING */}
      {activeTool === 'crisis' && (
        <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertTriangleIcon className="w-5 h-5 text-rose-600" />
              {lang === 'th' ? 'คัดแยกภาวะวิกฤตความดันและขนาดยาฉีด (Crisis Triage & IV Dosing)' : 'Hypertensive Crisis Triage & IV Protocol'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {lang === 'th' ? 'แยก Hypertensive Emergency จาก PSH พร้อมแนวทางการให้ยาฉีด Nicardipine, Labetalol, NTG, Esmolol' : 'Differentiates Emergency from PSH and provides syndrome-specific IV titration.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">SBP (mmHg):</label>
              <input
                type="number"
                value={crisisSbp}
                onChange={(e) => setCrisisSbp(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">DBP (mmHg):</label>
              <input
                type="number"
                value={crisisDbp}
                onChange={(e) => setCrisisDbp(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {lang === 'th' ? 'ภาวะอวัยวะสำคัญถูกทำลายเฉียบพลัน:' : 'Acute Target Organ Damage:'}
              </label>
              <select
                value={crisisSyndrome}
                onChange={(e) => setCrisisSyndrome(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium"
              >
                <option value="none">{lang === 'th' ? 'ไม่มีอวัยวะถูกทำลาย (มีแค่อาการนำ ปวดหัว เวียนหัว) -> PSH' : 'No acute organ damage (mild symptoms only) -> PSH'}</option>
                <option value="acs">{lang === 'th' ? 'เจ็บหน้าอกขาดเลือดเฉียบพลัน (ACS / NSTEMI / STEMI)' : 'Acute Coronary Syndrome (ACS)'}</option>
                <option value="hf_edema">{lang === 'th' ? 'น้ำท่วมปอดเฉียบพลัน / หัวใจล้มเหลว (Pulmonary Edema)' : 'Acute Pulmonary Edema / ADHF'}</option>
                <option value="aortic_dissection">{lang === 'th' ? 'หลอดเลือดแดงใหญ่เอออร์ตาฉีกขาด (Aortic Dissection)' : 'Acute Aortic Dissection'}</option>
                <option value="stroke_reperfusion">{lang === 'th' ? 'สโตรกขาดเลือดเฉียบพลัน (เตรียมฉีด rtPA/ลากลิ่มเลือด)' : 'Ischemic Stroke (Reperfusion Candidate)'}</option>
                <option value="stroke_non_reperfusion">{lang === 'th' ? 'สโตรกขาดเลือดเฉียบพลัน (ไม่ได้ยาละลายลิ่มเลือด)' : 'Ischemic Stroke (Non-Reperfusion)'}</option>
                <option value="sich">{lang === 'th' ? 'เลือดออกในเนื้อสมองเฉียบพลัน (sICH)' : 'Spontaneous Intracerebral Hemorrhage (sICH)'}</option>
                <option value="encephalopathy">{lang === 'th' ? 'สมองบวมจากความดันวิกฤต (Hypertensive Encephalopathy)' : 'Hypertensive Encephalopathy'}</option>
                <option value="malignant">{lang === 'th' ? 'ความดันร้ายแรง จอประสาทตาบวม (Malignant HT / Papilledema)' : 'Malignant HT with Papilledema'}</option>
                <option value="preeclampsia">{lang === 'th' ? 'ครรภ์เป็นพิษรุนแรง / อาการชัก (Severe Preeclampsia)' : 'Severe Preeclampsia / Eclampsia'}</option>
              </select>
            </div>
          </div>

          {/* Triage Decision Output */}
          {crisisSyndrome === 'none' ? (
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-600 text-white font-bold text-xs">PSH</span>
                <h4 className="font-bold text-amber-900 dark:text-amber-200">
                  {lang === 'th' ? 'วินิจฉัย: ภาวะความดันโลหิตสูงที่มีอาการนำแต่ยังไม่วิกฤต (Pre-critical Symptomatic HT, PSH)' : 'Diagnosis: Pre-critical Symptomatic HT (PSH / Hypertensive Urgency)'}
                </h4>
              </div>
              {Number(crisisSbp) < 180 && Number(crisisDbp) < 110 && (
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {lang === 'th' ? 'ความดันที่ใส่ยังไม่ถึง grade 3 (>= 180/110); PSH มักหมายถึงความดันสูงขึ้นเฉียบพลันอย่างมาก' : 'The BP entered is below grade 3 (>= 180/110); PSH usually means a marked, acute rise.'}
                </p>
              )}
              <ul className="list-disc list-inside text-xs text-slate-700 dark:text-slate-300 space-y-1">
                {(lang === 'th' ? guidelinesData.hypertensiveCrises.pshProtocol.principlesTh : guidelinesData.hypertensiveCrises.pshProtocol.principles).map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-bold text-xs uppercase animate-pulse">EMERGENCY</span>
                <h4 className="font-bold text-rose-900 dark:text-rose-200">
                  {lang === 'th' ? 'วินิจฉัย: Hypertensive Emergency - ลดความดันทันทีด้วยยาฉีด (ระดับ I, หลักฐาน A)' : 'Diagnosis: Hypertensive Emergency - lower BP immediately with IV drugs (Class I, Level A)'}
                </h4>
              </div>

              {/* Protocol for Selected Syndrome */}
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-rose-200 dark:border-rose-900 text-xs space-y-2">
                {(() => {
                  const row = guidelinesData.hypertensiveCrises.table41_emergencySyndromes[CRISIS_ROW[crisisSyndrome]];
                  if (!row) return null;
                  const L = (en, th) => (lang === 'th' && row[th] ? row[th] : row[en]);
                  return (
                    <div className="space-y-1.5" data-crisis-row>
                      <p><strong className="text-rose-700 dark:text-rose-400">{lang === 'th' ? 'เป้าหมาย: ' : 'Target: '}</strong>{L('bpTargetEn', 'bpTargetTh')}</p>
                      <p><strong className="text-rose-700 dark:text-rose-400">{lang === 'th' ? 'ระยะเวลา: ' : 'Timing: '}</strong>{L('timelineEn', 'timelineTh')}</p>
                      <p><strong className="text-slate-700 dark:text-slate-300">{lang === 'th' ? 'ยาที่แนะนำ: ' : 'Drugs: '}</strong>{L('firstLineMedsEn', 'firstLineMedsTh')}</p>
                      <p className="text-rose-900 dark:text-rose-200"><strong>{lang === 'th' ? 'ข้อควรระวัง: ' : 'Caution: '}</strong>{L('cautionEn', 'cautionTh')}</p>
                    </div>
                  );
                })()}

                <div>
                  <strong className="text-slate-700 dark:text-slate-300">{lang === 'th' ? 'ขนาดยาฉีดตามฉลากยา:' : 'IV doses (product labels):'}</strong>
                  <div className="mt-1 space-y-1 text-slate-700 dark:text-slate-300">
                    <p>&bull; <strong>Nicardipine IV:</strong> {lang === 'th' ? 'เริ่ม 5 มก./ชม. ปรับเพิ่มครั้งละ 2.5 มก./ชม. ทุก 5-15 นาที (สูงสุด 15 มก./ชม.) เมื่อได้เป้าหมายลดเหลือ 3-5 มก./ชม.' : 'Start 5 mg/h, titrate by 2.5 mg/h q 5-15 min (max 15 mg/h). Maintenance 3-5 mg/h.'}</p>
                    <p>&bull; <strong>Labetalol IV:</strong> {lang === 'th' ? 'Bolus 10-20 มก. ใน 1-2 นาที จากนั้นฉีดซ้ำ 20-80 มก. ทุก 10-30 นาที (รวมไม่เกิน 300 มก.) หรือหยด 1-2 มก./นาที' : 'Bolus 10-20 mg over 1-2 min; repeat 20-80 mg q 10-30 min (max 300 mg) or infuse 1-2 mg/min.'}</p>
                    <p>&bull; <strong>Nitroglycerin IV (ACS / Pulmonary Edema):</strong> {lang === 'th' ? 'เริ่ม 5 ไมโครกรัม/นาที ปรับเพิ่มทุก 3-5 นาที (สูงสุด 200 ไมโครกรัม/นาที)' : 'Start 5 mcg/min, titrate q 3-5 min (max 200 mcg/min).'}</p>
                    <p>&bull; <strong>Esmolol IV (Aortic Dissection):</strong> {lang === 'th' ? 'Loading 500 ไมโครกรัม/กก. ใน 1 นาที จากนั้นหยด 50-200 ไมโครกรัม/กก./นาที (ฉลาก Brevibloc)' : 'Load 500 mcg/kg over 1 min, then infuse 50-200 mcg/kg/min (Brevibloc label).'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TOOL 6: THAI CV RISK & STATIN ASSESSOR */}
      {activeTool === 'cvrisk' && (
        <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HeartPulseIcon className="w-5 h-5 text-rose-600" />
              {lang === 'th' ? 'ประเมินปัจจัยเสี่ยงและการให้ยา Statin / ข้อห้าม Aspirin (ตารางที่ 44)' : 'Cardiovascular Risk Clustering & Statin / Aspirin Assessor'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {lang === 'th' ? 'ปัจจัยเสี่ยง >= 3 ข้อ: ควรให้ statin (ระดับ I, หลักฐาน A); Thai CV risk >= 10%: อาจพิจารณา statin (ระดับ IIa, หลักฐาน C); ไม่ใช้ aspirin เป็น primary prevention ทุกราย (ระดับ III, หลักฐาน A) (ตารางที่ 44)' : '>= 3 risk factors: give a statin (Class I, Level A); Thai CV risk >= 10%: a statin can be considered (Class IIa, Level C); aspirin is not for routine primary prevention (Class III, Level A) (Table 44).'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer">
              <input type="checkbox" checked={riskMale} onChange={(e) => setRiskMale(e.target.checked)} className="rounded text-rose-600" />
              <span>{lang === 'th' ? 'เพศชาย (Male)' : 'Male sex'}</span>
            </label>
            <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer">
              <input type="checkbox" checked={Number(riskAge) > 55} onChange={(e) => setRiskAge(e.target.checked ? 60 : 45)} className="rounded text-rose-600" />
              <span>{lang === 'th' ? 'อายุมากกว่า 55 ปี (Age > 55)' : 'Age > 55 years'}</span>
            </label>
            <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer">
              <input type="checkbox" checked={riskSmoking} onChange={(e) => setRiskSmoking(e.target.checked)} className="rounded text-rose-600" />
              <span>{lang === 'th' ? 'สูบบุหรี่ในปัจจุบัน (Smoking)' : 'Current cigarette smoking'}</span>
            </label>
            <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer">
              <input type="checkbox" checked={riskLvh} onChange={(e) => setRiskLvh(e.target.checked)} className="rounded text-rose-600" />
              <span>{lang === 'th' ? 'หัวใจห้องล่างซ้ายโต (LVH on ECG/Echo)' : 'Left ventricular hypertrophy (LVH)'}</span>
            </label>
            <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer">
              <input type="checkbox" checked={riskFh} onChange={(e) => setRiskFh(e.target.checked)} className="rounded text-rose-600" />
              <span>{lang === 'th' ? 'ประวัติครอบครัวมี CVD ก่อนวัย' : 'Family history premature CVD'}</span>
            </label>
            <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer">
              <input type="checkbox" checked={riskAlb} onChange={(e) => setRiskAlb(e.target.checked)} className="rounded text-rose-600" />
              <span>{lang === 'th' ? 'มีไข่ขาวรั่วในปัสสาวะ (Albuminuria)' : 'Albuminuria (UACR >= 30)'}</span>
            </label>
            <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer">
              <input type="checkbox" checked={riskDm} onChange={(e) => setRiskDm(e.target.checked)} className="rounded text-rose-600" />
              <span>{lang === 'th' ? 'เป็นโรคเบาหวาน (Diabetes)' : 'Diabetes Mellitus'}</span>
            </label>
            <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer">
              <input type="checkbox" checked={riskAscvd} onChange={(e) => setRiskAscvd(e.target.checked)} className="rounded text-rose-600" />
              <span>{lang === 'th' ? 'มีโรคหลอดเลือดแดงแข็ง (Atherosclerosis)' : 'Atherosclerosis / Plaque'}</span>
            </label>
            <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer">
              <input type="checkbox" checked={riskTcRatio} onChange={(e) => setRiskTcRatio(e.target.checked)} className="rounded text-rose-600" />
              <span>{lang === 'th' ? 'สัดส่วน TC / HDL-C >= 6' : 'Total Chol / HDL ratio >= 6'}</span>
            </label>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-slate-500 block mb-1">
                {lang === 'th' ? 'จำนวนปัจจัยเสี่ยงที่พบ (Risk Factor Clustering):' : 'Risk Factor Count:'}
              </span>
              <div className="text-2xl font-black text-rose-600">
                {riskClusteringCount} / 9 {lang === 'th' ? 'ข้อ' : 'factors'}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                {riskClusteringCount >= 3 ? (
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                    {lang === 'th' ? 'ปัจจัยเสี่ยง >= 3 ข้อ: ควรให้ statin (ระดับ I, หลักฐาน A)' : '>= 3 risk factors: give a statin (Class I, Level A).'}
                  </span>
                ) : (
                  <span>{lang === 'th' ? 'ยังไม่ถึง 3 ข้อ: คำนวณ Thai CV risk score (ระดับ I, หลักฐาน C) ถ้า >= 10% อาจพิจารณา statin' : '< 3 factors: calculate the Thai CV risk score (Class I, Level C); if >= 10% a statin can be considered.'}</span>
                )}
              </p>
            </div>

            {/* Warning Callout on Aspirin */}
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-900 text-xs max-w-sm">
              <strong className="text-rose-800 dark:text-rose-300 flex items-center gap-1 mb-1">
                <AlertTriangleIcon className="w-3.5 h-3.5" />
                {lang === 'th' ? 'Aspirin ไม่ใช่ยาป้องกันปฐมภูมิทุกราย' : 'Aspirin: not for routine primary prevention'}
              </strong>
              <p className="text-rose-950 dark:text-rose-200 text-[11px] leading-tight">
                {lang === 'th' ? 'ไม่ใช้ aspirin เป็น primary prevention ในผู้ป่วยความดันสูงทุกราย (ระดับ III, หลักฐาน A) เพราะเลือดออกรุนแรงเพิ่มขึ้นใกล้เคียงหรือมากกว่าประโยชน์' : 'Aspirin is not for routine primary prevention in hypertension (Class III, Level A): major bleeding rises about as much as events fall.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 7: eGFR DRUG SAFETY CHECKER */}
      {activeTool === 'renal' && (
        <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <KidneyIcon className="w-5 h-5 text-rose-600" />
              {lang === 'th' ? 'ตรวจสอบความปลอดภัยของยาตามระดับการทำงานของไต (eGFR Safety Checker)' : 'Renal Dosing & eGFR Safety Checker'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {lang === 'th' ? 'เลือกยาลดความดันและระบุค่า eGFR ของผู้ป่วย เพื่อดูว่าปลอดภัย ต้องปรับขนาด หรือมีข้อห้ามใช้' : 'Select medication and input eGFR to verify safety margin and dosage adjustments.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {lang === 'th' ? 'เลือกยาที่ต้องการตรวจสอบ:' : 'Select Medication:'}
              </label>
              <select
                value={selectedRenalDrugId}
                onChange={(e) => setSelectedRenalDrugId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium"
              >
                {drugsData.map(d => (
                  <option key={d.id} value={d.id}>
                    {lang === 'th' ? `${d.nameTh} (${d.genericName})` : `${d.nameEn} (${d.genericName})`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {lang === 'th' ? 'ค่า eGFR ของผู้ป่วย (มล./นาที/1.73 ม2):' : 'Patient eGFR (mL/min/1.73m2):'}
              </label>
              <input
                type="number"
                value={renalEgfrInput}
                onChange={(e) => setRenalEgfrInput(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm"
              />
            </div>
          </div>

          {/* Dosing Rule Output */}
          {(() => {
            const drug = drugsData.find(d => d.id === selectedRenalDrugId);
            if (!drug) return null;
            const egfr = Number(renalEgfrInput) || 0;
            const minSafe = drug.renalAdjustment ? drug.renalAdjustment.minEgfrSafe : 0;
            const isUnsafe = minSafe > 0 && egfr < minSafe;

            return (
              <div className={`p-5 rounded-2xl border ${
                isUnsafe ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-900' : 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-900'
              } space-y-3`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isUnsafe ? <AlertTriangleIcon className="w-5 h-5 text-rose-600" /> : <ShieldCheckIcon className="w-5 h-5 text-emerald-600" />}
                    <h4 className={`font-black text-base ${isUnsafe ? 'text-rose-900 dark:text-rose-200' : 'text-emerald-900 dark:text-emerald-200'}`}>
                      {isUnsafe
                        ? (lang === 'th' ? `ข้อห้ามใช้ / เสี่ยงอันตราย (eGFR < ${minSafe} มล./นาที)` : `Contraindicated / Unsafe (eGFR < ${minSafe} mL/min)`)
                        : (lang === 'th' ? 'สามารถใช้ยาได้ / ปลอดภัย' : 'Safe to Administer / Within Safety Threshold')}
                    </h4>
                  </div>
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border">
                    eGFR: {egfr} mL/min
                  </span>
                </div>

                <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                  <strong>{lang === 'th' ? 'คำแนะนำการปรับขนาดยา:' : 'Renal Adjustment Instruction:'} </strong>
                  {lang === 'th' ? drug.renalAdjustment.textTh : drug.renalAdjustment.textEn}
                </div>
              </div>
            );
          })()}
        </div>
      )}

    </div>
  );
};
