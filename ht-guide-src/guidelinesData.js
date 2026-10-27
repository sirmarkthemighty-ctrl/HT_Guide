// --- 2024 Thai Guidelines on the Treatment of Hypertension Data Store ---

const guidelinesData = {
  // 1. Blood Pressure Classification & Measurement Standards
  bpClassification: {
    titleEn: 'Blood Pressure Classification & Diagnostic Thresholds (2024 Thai CPG)',
    titleTh: 'การจำแนกความรุนแรงและเกณฑ์วินิจฉัยโรคความดันโลหิตสูง (พ.ศ. 2567)',
    table5_clinic: [
      { categoryEn: 'Optimal', categoryTh: 'เหมาะสม (Optimal)', sbp: '< 120', dbp: '< 80', sbpMin: 0, sbpMax: 119, dbpMin: 0, dbpMax: 79, color: 'emerald', actionEn: 'Healthy lifestyle', actionTh: 'ส่งเสริมพฤติกรรมสุขภาพ' },
      { categoryEn: 'Normal', categoryTh: 'ปกติ (Normal)', sbp: '120 - 129', dbp: '< 80', sbpMin: 120, sbpMax: 129, dbpMin: 0, dbpMax: 79, color: 'teal', actionEn: 'Healthy lifestyle', actionTh: 'ส่งเสริมพฤติกรรมสุขภาพ' },
      { categoryEn: 'BP at risk', categoryTh: 'ความดันโลหิตเริ่มเสี่ยง (BP at risk)', sbp: '130 - 139', dbp: '80 - 89', sbpMin: 130, sbpMax: 139, dbpMin: 80, dbpMax: 89, color: 'amber', isNew2024: true, actionEn: 'Lifestyle change; check out-of-office BP for masked HT. Diagnose HT if HMOD, CVD, DM or high CV risk; drugs from 130/80 in CVD, DM or risk >= 10%', actionTh: 'ปรับพฤติกรรม; วัดความดันนอกสถานพยาบาลเพื่อหา masked HT วินิจฉัยความดันสูงถ้ามี HMOD, CVD, เบาหวาน หรือเสี่ยงสูง; เริ่มยาตั้งแต่ 130/80 ใน CVD, เบาหวาน หรือเสี่ยง >= 10%' },
      { categoryEn: 'Hypertension Grade 1', categoryTh: 'ความดันโลหิตสูง ระดับ 1', sbp: '140 - 159', dbp: '90 - 99', sbpMin: 140, sbpMax: 159, dbpMin: 90, dbpMax: 99, color: 'orange', actionEn: 'Initiate dual therapy (SPC) or monotherapy if low risk/frail; target < 130/80', actionTh: 'เริ่มยาสูตรรวม 2 ชนิด (SPC) หรือยาเดี่ยวในผู้ป่วยเสี่ยงต่ำ/ผู้สูงอายุเปราะบาง; เป้าหมาย < 130/80' },
      { categoryEn: 'Hypertension Grade 2', categoryTh: 'ความดันโลหิตสูง ระดับ 2', sbp: '160 - 179', dbp: '100 - 109', sbpMin: 160, sbpMax: 179, dbpMin: 100, dbpMax: 109, color: 'rose', actionEn: 'Prompt dual therapy (SPC preferred); close follow-up in 2-4 weeks', actionTh: 'เริ่มยาสูตรรวม 2 ชนิด (SPC) ทันที; นัดติดตามใน 2-4 สัปดาห์' },
      { categoryEn: 'Hypertension Grade 3', categoryTh: 'ความดันโลหิตสูง ระดับ 3', sbp: '>= 180', dbp: '>= 110', sbpMin: 180, sbpMax: 300, dbpMin: 110, dbpMax: 200, color: 'red', actionEn: 'Immediately evaluate for Hypertensive Emergency (acute HMOD) vs PSH; urgent dual/triple therapy', actionTh: 'ประเมินภาวะฉุกเฉิน (Hypertensive Emergency) ทันที แยกจาก PSH; เริ่มยา 2-3 ชนิดอย่างเร่งด่วน' },
      { categoryEn: 'Isolated Systolic HT (ISH)', categoryTh: 'ความดันโลหิตซิสโตลิกสูงเดี่ยว (ISH)', sbp: '>= 140', dbp: '< 90', sbpMin: 140, sbpMax: 300, dbpMin: 0, dbpMax: 89, color: 'blue', actionEn: 'Common in elderly; first-line CCB or thiazide-like; initial target SBP 140-150', actionTh: 'พบบ่อยในผู้สูงอายุ ยาขนานแรก CCB หรือ Thiazide-like; เป้าหมายเบื้องต้น 140-150' },
      { categoryEn: 'Isolated Diastolic HT (IDH)', categoryTh: 'ความดันโลหิตไดแอสโตลิกสูงเดี่ยว (IDH)', sbp: '< 140', dbp: '>= 90', sbpMin: 0, sbpMax: 139, dbpMin: 90, dbpMax: 200, color: 'indigo', actionEn: 'Common in young adults (<50y); screen secondary HT if severe; lifestyle + standard meds', actionTh: 'พบบ่อยในวัยทำงาน (<50 ปี) สัมพันธ์กับอ้วนลงพุง; คัดกรองความดันทางทุติยภูมิหากรุนแรง' },
    ],
    table6_modalities: [
      { modalityEn: 'Clinic / Office BP', modalityTh: 'การวัดความดันที่สถานพยาบาล', sbpCutoff: 140, dbpCutoff: 90, noteEn: 'Standard auscultatory or automated device after 3-5 min rest, bilateral arm check on 1st visit.', noteTh: 'วัดด้วยวิธีมาตรฐานหลังจากนั่งพัก 3-5 นาที ตรวจทั้ง 2 แขนในครั้งแรก' },
      { modalityEn: 'Home BP Monitoring (HBPM)', modalityTh: 'การวัดความดันด้วยตนเองที่บ้าน (HBPM)', sbpCutoff: 135, dbpCutoff: 85, noteEn: 'Measure morning (within 1h of waking, pre-meds/breakfast) and evening for 7 days (min 3 days).', noteTh: 'วัดรอบเช้า (ภายใน 1 ชม.หลังตื่น ปัสสาวะแล้ว ก่อนกินยา/อาหาร) และรอบค่ำก่อนนอน 7 วันต่อเนื่อง' },
      { modalityEn: 'ABPM 24-Hour Average', modalityTh: 'ABPM ค่าเฉลี่ย 24 ชั่วโมง', sbpCutoff: 130, dbpCutoff: 80, noteEn: 'Cuff auto-inflates every 20-30 min over full 24 hours.', noteTh: 'เครื่องติดตัววัดอัตโนมัติทุก 20-30 นาที ตลอด 24 ชั่วโมง' },
      { modalityEn: 'ABPM Daytime (Awake) Average', modalityTh: 'ABPM ค่าเฉลี่ยตอนกลางวัน (ตื่น)', sbpCutoff: 135, dbpCutoff: 85, noteEn: 'Corresponds well with HBPM thresholds.', noteTh: 'สอดคล้องกับเกณฑ์การวัดที่บ้าน' },
      { modalityEn: 'ABPM Nighttime (Asleep) Average', modalityTh: 'ABPM ค่าเฉลี่ยตอนกลางคืน (หลับ)', sbpCutoff: 120, dbpCutoff: 70, noteEn: 'Nocturnal HT (>=120/70) strongly predicts cardiovascular events.', noteTh: 'ความดันกลางคืนสูง (>=120/70) สัมพันธ์กับการเกิดโรคหัวใจและหลอดเลือดสูงที่สุด' },
    ],
    diurnalPatterns: [
      { patternEn: 'Normal Dipping', patternTh: 'ลดลงปกติ (Normal dipping)', dropEn: 'Drops 10% to 20% at night', dropTh: 'ลดลงร้อยละ 10 ถึง 20', cvRiskEn: 'Standard baseline risk', cvRiskTh: 'ไม่เพิ่มความเสี่ยง' },
      { patternEn: 'Extreme Dipping', patternTh: 'ลดลงมากเกินไป (Extreme dipping)', dropEn: 'Drops > 20% at night', dropTh: 'ลดลงมากกว่าร้อยละ 20', cvRiskEn: 'May increase ischemic risk', cvRiskTh: 'อาจเพิ่มความเสี่ยงสมอง/หัวใจขาดเลือด' },
      { patternEn: 'Reduced Dipping (Non-dipper)', patternTh: 'ลดลงน้อย (Reduced dipping)', dropEn: 'Drops only 1% to 10%', dropTh: 'ลดลงเพียงร้อยละ 1 ถึง 10', cvRiskEn: 'Significantly increased CV risk', cvRiskTh: 'เพิ่มความเสี่ยงโรคหัวใจและหลอดเลือด' },
      { patternEn: 'Rising (Reverse Dipper)', patternTh: 'ความดันพุ่งขึ้นกลางคืน (Rising)', dropEn: 'Nighttime BP higher than daytime BP', dropTh: 'ความดันกลางคืนสูงกว่ากลางวัน', cvRiskEn: 'Highest CV mortality and stroke risk', cvRiskTh: 'ความเสี่ยงเสียชีวิตและสโตรกสูงสุด' },
    ]
  },

  // 2. Initial Pharmacological Therapy & Target Goals
  startingGuide: {
    titleEn: 'Initiating Antihypertensive Therapy & Blood Pressure Targets',
    titleTh: 'แนวทางการเริ่มยาลดความดันโลหิตและเป้าหมายการรักษา',
    whenToStart: [
      { conditionEn: 'Confirmed CVD, Diabetes Mellitus, or 10-year Thai CV Risk >= 10%', conditionTh: 'มีโรคหัวใจและหลอดเลือด (CVD), โรคเบาหวาน หรือเสี่ยงต่อ CVD ใน 10 ปี >= 10%', thresholdEn: 'Clinic SBP >= 130 mmHg and/or DBP >= 80 mmHg', thresholdTh: 'ความดันโลหิตเฉลี่ยที่คลินิก >= 130/80 มม.ปรอท', classLevel: 'Class I, Level A (SBP) / Level C (DBP)' },
      { conditionEn: 'General Hypertensive Population (without CVD/DM/High risk)', conditionTh: 'ผู้ป่วยความดันโลหิตสูงทั่วไป (ไม่มี CVD, เบาหวาน หรือความเสี่ยงสูง)', thresholdEn: 'Clinic SBP >= 140 mmHg and/or DBP >= 90 mmHg', thresholdTh: 'ความดันโลหิตเฉลี่ยที่คลินิก >= 140/90 มม.ปรอท', classLevel: 'Class I, Level C' },
      { conditionEn: 'BP at risk (130-139 / 80-89 mmHg) without CVD/DM/High risk', conditionTh: 'ความดันระดับ BP at risk (130-139 / 80-89 มม.ปรอท) ที่ไม่มีโรคร่วม', thresholdEn: 'Lifestyle change and out-of-office BP to look for masked HT (Table 15); one drug may be started if CV risk is very high (Table 12)', thresholdTh: 'ปรับพฤติกรรม และวัดความดันนอกสถานพยาบาลเพื่อหา masked HT (ตารางที่ 15); อาจเริ่มยา 1 ชนิดถ้าเสี่ยงสูงมาก (ตารางที่ 12)', classLevel: 'Class I, Level B' }
    ],
    strategyRules: [
      {
        titleEn: 'Dual Combination (SPC Preferred) as Standard First-Line',
        titleTh: 'เริ่มด้วยยาสูตรรวมเม็ด 2 ชนิด (SPC) เป็นมาตรฐานในผู้ป่วยส่วนใหญ่',
        ruleEn: 'Start with 2-drug combination in ONE tablet (Single-Pill Combination, SPC) for most patients. Pair a RAS blocker (ACEI or ARB) with a CCB OR a Thiazide/Thiazide-like diuretic.',
        ruleTh: 'แนะนำเริ่มยา 2 ชนิดในเม็ดเดียวกัน (SPC) เป็นยาขนานแรกในผู้ป่วยส่วนใหญ่ โดยใช้ RAS blocker (ACEI หรือ ARB) ร่วมกับ CCB หรือ Thiazide/Thiazide-like diuretic การศึกษา START พิสูจน์ว่ายารวมเม็ดลดอัตราเสียชีวิตและโรคแทรกซ้อนได้ดีกว่ายากินแยกเม็ด',
        classLevel: 'Class I, Level A'
      },
      {
        titleEn: '4 Indications for Initial Monotherapy',
        titleTh: '4 กรณีที่ควรเริ่มต้นด้วยยาเพียงชนิดเดียว (Monotherapy)',
        ruleEn: 'Start with one drug only in: 1) advanced age; 2) general weakness and/or frailty; 3) low starting BP (140-149/90-95) with LOW CV risk; 4) BP at risk (130-139/80-89) with VERY HIGH CV risk (Table 12).',
        ruleTh: 'เริ่มต้นด้วยยาชนิดเดียวในกลุ่มต่อไปนี้: 1) ผู้สูงอายุ; 2) ผู้ป่วยที่อ่อนแอและ/หรือเปราะบาง; 3) ความดันเริ่มต้นไม่สูงมาก (140-149/90-95 มม.ปรอท) และมีความเสี่ยงต่อ CVD ต่ำ; 4) ความดันระดับ BP at risk (130-139/80-89) ที่มีความเสี่ยงต่อ CVD สูงมาก (ตารางที่ 12)',
        classLevel: 'Class I, Level C'
      },
      {
        titleEn: 'Triple Combination Therapy (Step 2)',
        titleTh: 'การปรับเพิ่มยาเป็น 3 ชนิดเมื่อคุมไม่ได้ด้วยยา 2 ชนิด',
        ruleEn: 'If 2 drugs at maximum tolerated dose fail to achieve target BP: Step up to 3 drugs: RAS blocker + CCB + Thiazide/Thiazide-like diuretic (preferably thiazide-like indapamide or chlorthalidone).',
        ruleTh: 'หากใช้ยา 2 ชนิดขนาดเต็มที่แล้วยังคุมความดันไม่ได้ ให้เพิ่มยาเป็น 3 ชนิด: RAS blocker + CCB + Thiazide/Thiazide-like (แนะนำ Indapamide หรือ Chlorthalidone)',
        classLevel: 'Class I, Level A'
      },
      {
        titleEn: 'ABSOLUTE PROHIBITION: Dual RAS Blockade',
        titleTh: 'ข้อห้ามเด็ดขาด: ห้ามใช้ยาในกลุ่มยับยั้ง RAS สองชนิดร่วมกัน',
        ruleEn: 'NEVER combine ACEI with ARB, or ACEI/ARB with Direct Renin Inhibitor. Markedly increases acute kidney failure and hyperkalemia without any additional cardiovascular benefit.',
        ruleTh: 'ห้ามใช้ยา ACEI ร่วมกับ ARB หรือร่วมกับยาต้านเรนินโดยเด็ดขาด เนื่องจากเพิ่มความเสี่ยงไตวายเฉียบพลันและโพแทสเซียมในเลือดสูงรุนแรงโดยไม่ได้ประโยชน์ต่อหัวใจ',
        classLevel: 'Class III (Harmful), Level A'
      }
    ],
    targetsClinic: [
      { ageEn: 'Age 18 to 64 years', ageTh: 'อายุ 18 ถึง 64 ปี', targetEn: '< 130/80 mmHg', targetTh: '< 130/80 มม.ปรอท', classLevel: 'Class I, Level A' },
      { ageEn: 'Age 65 to 79 years', ageTh: 'อายุ 65 ถึง 79 ปี', targetEn: 'Initial < 140/90 mmHg; further lower to < 130/80 mmHg if well tolerated', targetTh: 'เบื้องต้น < 140/90 มม.ปรอท; ปรับลงจน < 130/80 มม.ปรอท หากผู้ป่วยทนยาได้ดี', classLevel: 'Class I, Level A (initial) / Level B (further)' },
      { ageEn: 'Age >= 80 years', ageTh: 'อายุตั้งแต่ 80 ปีขึ้นไป', targetEn: 'SBP 140 - 150 mmHg and DBP < 80 mmHg; may lower SBP to 130-139 if tolerated', targetTh: 'ซิสโตลิก 140 - 150 มม.ปรอท และไดแอสโตลิก < 80 มม.ปรอท; อาจลดซิสโตลิกเหลือ 130-139 หากทนยาได้', classLevel: 'Class I, Level A / Class IIb, Level B' },
      { ageEn: 'Frail / Debilitated patients', ageTh: 'ผู้ป่วยที่มีสภาพร่างกายทรุดโทรม เปราะบาง', targetEn: 'Individualized target based on functional capacity and tolerance', targetTh: 'กำหนดเป้าหมายเฉพาะบุคคลตามความเหมาะสมและความทนต่อยา', classLevel: 'Class I, Level C' },
      { ageEn: 'SAFETY FLOOR (All Patients)', ageTh: 'ขีดจำกัดความปลอดภัย (ห้ามต่ำกว่านี้)', targetEn: 'DO NOT lower Clinic SBP < 120 mmHg or DBP < 70 mmHg', targetTh: 'ไม่ควรตั้งเป้าหมายความดันซิสโตลิกต่ำกว่า 120 หรือไดแอสโตลิกต่ำกว่า 70 มม.ปรอท', classLevel: 'Class III (Harmful), Level C' },
    ],
    targetsHome: [
      { groupEn: 'General Hypertensive Population', groupTh: 'ผู้ป่วยความดันโลหิตสูงทั่วไป', targetEn: '< 130/80 mmHg', targetTh: '< 130/80 มม.ปรอท', classLevel: 'Class I, Level B' },
      { groupEn: 'Diabetes, CVD, High CV risk, or Age 18-65', groupTh: 'เบาหวาน, โรคหัวใจหลอดเลือด, เสี่ยงสูง หรืออายุ 18-65 ปี', targetEn: '< 125/75 mmHg', targetTh: '< 125/75 มม.ปรอท', classLevel: 'Class IIa, Level B' },
      { groupEn: 'Age 65 to 79 years or Prior Stroke', groupTh: 'อายุ 65 ถึง 79 ปี หรือเคยเป็นสโตรก', targetEn: '< 135/85 mmHg', targetTh: '< 135/85 มม.ปรอท', classLevel: 'Class I, Level C' },
      { groupEn: 'Age >= 80 years', groupTh: 'อายุตั้งแต่ 80 ปีขึ้นไป', targetEn: '< 140/80 mmHg', targetTh: '< 140/80 มม.ปรอท', classLevel: 'Class IIb, Level C' },
    ]
  },

  // 3. Work-up for Secondary Hypertension
  secondaryHT: {
    titleEn: 'Systematic Work-up for Secondary Hypertension',
    titleTh: 'แนวทางการสืบค้นและวินิจฉัยโรคความดันโลหิตสูงทุติยภูมิ',
    whenToSuspect: [
      { en: 'Hypertension starting before age 40 years', th: 'เริ่มเป็นความดันโลหิตสูงก่อนอายุ 40 ปี' },
      { en: 'Resistant hypertension (uncontrolled on >= 3 drugs, or controlled only on >= 4; Figure 4)', th: 'Resistant hypertension (คุมไม่ได้ด้วยยา >= 3 ชนิด หรือคุมได้ด้วยยา >= 4 ชนิด; ภาพที่ 4)' },
      { en: 'Acute rise in BP, or loss of control in previously controlled BP', th: 'ความดันสูงขึ้นอย่างเฉียบพลัน หรือเคยคุมได้แล้วกลับคุมไม่ได้' },
      { en: 'Hypokalaemia, spontaneous or diuretic-induced (screen for primary aldosteronism, Class I, Level A)', th: 'โพแทสเซียมต่ำ ทั้งเกิดเองหรือจากยาขับปัสสาวะ (คัดกรอง PA ระดับ I, หลักฐาน A)' },
      { en: 'Adrenal incidentaloma (screen for PA, Class I, Level A; for PPGL if unenhanced CT > 10 HU)', th: 'Adrenal incidentaloma (คัดกรอง PA ระดับ I, หลักฐาน A; คัดกรอง PPGL ถ้า unenhanced CT > 10 HU)' },
      { en: 'OSA or unexplained AF (screen for PA, Class IIa, Level B)', th: 'OSA หรือ AF ที่ไม่ทราบสาเหตุ (คัดกรอง PA ระดับ IIa, หลักฐาน B)' },
      { en: 'HMOD out of proportion to the duration of hypertension [Not in Thai CPG 2567]', th: 'มี HMOD มากเกินระยะเวลาที่เป็นความดันสูง [ไม่มีในแนวทางฯ 2567]' },
      { en: 'Kidneys differing > 1.5 cm in size, or abdominal bruit [Not in Thai CPG 2567]', th: 'ขนาดไตสองข้างต่างกัน > 1.5 ซม. หรือได้ยินเสียงฟู่ที่ท้อง [ไม่มีในแนวทางฯ 2567]' }
    ],
    etiologies: [
      {
        id: 'pa',
        nameEn: 'Primary Aldosteronism (PA)',
        nameTh: 'เนื้องอกต่อมหมวกไตสร้างฮอร์โมนอัลโดสเตอโรนเกิน (Primary Aldosteronism)',
        prevalenceEn: '5-10% of all HT; up to 20% in resistant HT and OSA',
        prevalenceTh: 'ร้อยละ 5-10 ของผู้ป่วยความดันทั้งหมด; สูงถึงร้อยละ 20 ในความดันดื้อยาและ OSA',
        clinicalCluesEn: 'Spontaneous or diuretic-induced hypokalemia, muscle weakness, cramps, polyuria, adrenal incidentaloma, resistant HT, OSA, unprovoked AF.',
        clinicalCluesTh: 'โพแทสเซียมในเลือดต่ำเองหรือหลังเริ่มยาขับปัสสาวะ, อ่อนแรง, เป็นตะคริว, ปัสสาวะบ่อย, ก้อนที่ต่อมหมวกไต, ความดันดื้อยา, หยุดหายใจขณะหลับ (OSA)',
        screeningTestEn: 'Plasma Aldosterone Concentration (PAC) and Plasma Renin Activity (PRA) -> calculate Aldosterone-to-Renin Ratio (ARR).',
        screeningTestTh: 'ตรวจความเข้มข้น Aldosterone (PAC) และ Renin (PRA/DRC) คำนวณอัตราส่วน ARR',
        preTestPrepEn: '1) Correct hypokalaemia first (low K+ lowers aldosterone); 2) switch drugs that interfere with aldosterone and renin to verapamil SR, hydralazine or an alpha-blocker; read the result with care if the drugs cannot be switched (Thai CPG p.106). [Not in Thai CPG 2567: wash-out times, e.g. MRA 4-6 weeks, ACEI/ARB/diuretic/beta-blocker 2 weeks]',
        preTestPrepTh: '1) แก้ไขโพแทสเซียมต่ำก่อน (K+ ต่ำทำให้ aldosterone ลดลง); 2) เปลี่ยนยาที่รบกวนระดับ aldosterone และ renin เป็น verapamil SR, hydralazine หรือ alpha-blocker ถ้าเปลี่ยนยาไม่ได้ต้องแปลผลด้วยความระมัดระวัง (แนวทางฯ หน้า 106) [ไม่มีในแนวทางฯ 2567: ระยะหยุดยา เช่น MRA 4-6 สัปดาห์ ACEI/ARB/ยาขับปัสสาวะ/beta-blocker 2 สัปดาห์]',
        confirmatoryEn: 'Diagnostic without confirmation if: PAC > 20 ng/dL + suppressed renin + unprovoked hypokalemia (Table 38). Otherwise confirm with saline infusion test or oral sodium loading test.',
        confirmatoryTh: 'วินิจฉัยได้ทันทีโดยไม่ต้องตรวจยืนยันหาก: PAC > 20 ng/dL ร่วมกับ Renin ถูกกด และมีโพแทสเซียมต่ำ หากไม่ครบเกณฑ์ให้ตรวจยืนยันด้วย Saline infusion test',
        imagingEn: 'Adrenal CT protocol in all confirmed patients (Class I, Level A). Adrenal Venous Sampling (AVS) is gold standard for lateralization before surgery (except age <35y with clear unilateral adenoma and marked PA).',
        imagingTh: 'ตรวจ CT scan adrenal protocol ทุกราย (Class I, Level A); ทำ Adrenal Venous Sampling (AVS) เพื่อแยกข้างก่อนผ่าตัด (ยกเว้นอายุน้อยกว่า 35 ปี ที่มีก้อนชัดเจนและเกลือแร่ผิดปกติรุนแรง)',
        treatmentEn: 'Unilateral PA: unilateral adrenalectomy (Class I, Level A). Bilateral PA, or unilateral PA not operated: spironolactone (Class I, Level B); for long-term treatment a target plasma renin activity > 1 may be set (printed as ng/ml/min in the CPG; PRA is usually reported in ng/mL/h) (Class IIb, Level B) (Table 38).',
        treatmentTh: 'ชนิดข้างเดียว: ผ่าตัด unilateral adrenalectomy (ระดับ I, หลักฐาน A); ชนิดสองข้าง หรือข้างเดียวที่ผ่าตัดไม่ได้: ให้ spironolactone (ระดับ I, หลักฐาน B) การรักษาระยะยาวอาจตั้งเป้า plasma renin activity > 1 (แนวทางฯ พิมพ์หน่วย ng/ml/min; ปกติรายงานเป็น ng/mL/h) (ระดับ IIb, หลักฐาน B) (ตารางที่ 38)'
      },
      {
        id: 'ppgl',
        nameEn: 'Pheochromocytoma and Paraganglioma (PPGL)',
        nameTh: 'เนื้องอกต่อมหมวกไตหลั่งฮอร์โมนแคทีโคลามีน (Pheochromocytoma / PPGL)',
        prevalenceEn: '0.2 - 0.6% of hypertensive patients [Not in Thai CPG 2567]',
        prevalenceTh: 'ร้อยละ 0.2 - 0.6 ของผู้ป่วยความดันโลหิตสูง [ไม่มีในแนวทางฯ 2567]',
        clinicalCluesEn: 'Classic Triad: Episodic headache, profuse sweating, and palpitations (paroxysmal 5Ps: Paroxysms, Palpitations, Perspiration, Pain/headache, Pallor). Marked labile BP, orthostatic hypotension, adrenal mass >10 HU on unenhanced CT.',
        clinicalCluesTh: 'กลุ่มอาการ 3 อย่าง: ปวดศีรษะ เหงื่อออกท่วมตัว และใจสั่นเต้นแรง เกิดเป็นพักๆ (Paroxysmal), ความดันโลหิตสวิงขึ้นลงรุนแรง, หน้ามืดตอนยืน, ก้อนต่อมหมวกไต unenhanced CT > 10 Hounsfield units',
        screeningTestEn: 'Plasma-free metanephrines (patient supine for 20 minutes before blood draw) OR 24-hour urinary fractionated metanephrines + creatinine.',
        screeningTestTh: 'ตรวจระดับ Plasma-free metanephrines (ต้องนอนหงายอย่างน้อย 20 นาทีก่อนเจาะเลือด) หรือตรวจ Urinary fractionated metanephrines ในปัสสาวะ 24 ชั่วโมง',
        preTestPrepEn: 'Stop interfering drugs (tricyclic antidepressants, acetaminophen, labetalol, decongestants, levodopa) prior to test.',
        preTestPrepTh: 'หยุดยาที่รบกวนผลตรวจ (ยาแก้ซึมเศร้า TCA, พาราเซตามอล, ยาลดน้ำมูก, labetalol)',
        confirmatoryEn: 'Metanephrines > 2x upper limit of normal -> strongly positive; refer to endocrine specialist.',
        confirmatoryTh: 'ค่าตรวจ metanephrines สูงเกิน 2 เท่าของค่ามาตรฐานสูงสุด ให้ส่งต่อแพทย์เฉพาะทางต่อมไร้ท่อ',
        imagingEn: 'CT scan abdomen/pelvis. MIBG scan or 68Ga-DOTATATE PET-CT if tumor > 5 cm or suspected extra-adrenal/metastatic disease.',
        imagingTh: 'ทำ CT scan ท้องและอุ้งเชิงกราน; ส่งตรวจ MIBG หรือ PET-CT หากก้อนใหญ่กว่า 5 ซม. หรือสงสัยเนื้องอกนอกต่อมหมวกไต',
        treatmentEn: 'Start an alpha-blocker (e.g. doxazosin, phenoxybenzamine) BEFORE any beta-blocker in every suspected PPGL (Class I, Level A, Table 37): a beta-blocker alone leaves alpha vasoconstriction unopposed and can trigger a hypertensive crisis. Offer genetic testing if available (Class IIa, Level B). Surgery after adequate alpha/beta blockade and volume expansion.',
        treatmentTh: 'กฎเหล็กช่วยชีวิต (Class I, Level A): ต้องเริ่มยา Alpha-blocker (Doxazosin หรือ Phenoxybenzamine) ก่อนเริ่มยา Beta-blocker เสมอ! ห้ามให้ Beta-blocker เดี่ยวๆ เด็ดขาด เพราะจะทำให้หลอดเลือดหดเกร็งรุนแรงจนเกิดวิกฤตความดันพุ่งถึงแก่ชีวิตได้ ผ่าตัดเอาก้อนออกหลังเตรียมยาและสารน้ำเต็มที่'
      },
      {
        id: 'cushings',
        nameEn: 'Cushing Syndrome / Hypercortisolism',
        nameTh: 'กลุ่มอาการคุชชิง ฮอร์โมนคอร์ติซอลเกิน (Cushing’s Syndrome)',
        prevalenceEn: '< 1% of hypertensive population',
        prevalenceTh: 'พบน้อยกว่าร้อยละ 1',
        clinicalCluesEn: 'Easy bruising, facial plethora, moon face, buffalo hump, central obesity with thin extremities, purple abdominal striae (>1 cm wide), proximal muscle weakness, early osteoporosis in young adults.',
        clinicalCluesTh: 'รอยช้ำง่าย, ใบหน้าแดงกลม (moon face), หนอกคอ (buffalo hump), อ้วนลงพุงแขนขาลีบ, รอยแตกลายสีม่วงกว้างกว่า 1 ซม., กล้ามเนื้อต้นแขนต้นขาอ่อนแรง, กระดูกพรุนในคนอายุน้อย',
        screeningTestEn: '1) Rule out exogenous steroids (morning 8 AM cortisol); 2) Overnight 1 mg Dexamethasone Suppression Test (DST); 3) 24h Urine Free Cortisol (UFC); 4) Late-night salivary cortisol (at least 2 tests).',
        screeningTestTh: '1) ซักประวัติและเจาะ Cortisol 8:00 น. เพื่อแยกการได้รับยาสเตียรอยด์ภายนอก; 2) ตรวจ Overnight 1 mg Dexamethasone suppression test; 3) ตรวจ Cortisol ในปัสสาวะ 24 ชั่วโมง; 4) ตรวจ Salivary cortisol ตอนดึก (ต้องตรวจอย่างน้อย 2 ครั้ง)',
        preTestPrepEn: 'Do not use 1 mg DST in pregnancy or women taking estrogen (CBG increases); use 24h UFC or salivary cortisol instead.',
        preTestPrepTh: 'ห้ามใช้ 1 mg DST ในหญิงตั้งครรภ์หรือกินยาคุมกำเนิด (เอสโตรเจนเพิ่ม CBG ให้ผลบวกเทียม) ให้ใช้ปัสสาวะ 24 ชม. หรือน้ำลายแทน',
        treatmentEn: 'Refer to an endocrinologist: pituitary surgery for Cushing disease, adrenalectomy for an adrenal adenoma, taper exogenous steroids. [Treatment details not in Thai CPG 2567]',
        treatmentTh: 'ส่งต่อแพทย์ต่อมไร้ท่อ: ผ่าตัดต่อมใต้สมองใน Cushing disease, ผ่าตัดต่อมหมวกไตใน adrenal adenoma, ค่อย ๆ ลดยาสเตียรอยด์ที่ได้จากภายนอก [รายละเอียดการรักษาไม่มีในแนวทางฯ 2567]'
      },
      {
        id: 'ras',
        nameEn: 'Renal Artery Stenosis / Renovascular HT',
        nameTh: 'หลอดเลือดแดงไตตีบ (Renovascular HT / Renal Artery Stenosis)',
        prevalenceEn: '1-5% of all HT; up to 30% in secondary HT cohort',
        prevalenceTh: 'ร้อยละ 1-5 ของผู้ป่วยความดัน; สูงถึงร้อยละ 30 ในกลุ่มความดันโลหิตสูงทุติยภูมิ',
        clinicalCluesEn: 'Atherosclerotic (older adults, widespread vascular disease) or Fibromuscular Dysplasia (young women < 35y); recurrent unexplained flash pulmonary edema, acute worsening of renal function (>30% Cr rise) after starting ACEi/ARB, epigastric bruit.',
        clinicalCluesTh: 'หลอดเลือดแดงแข็ง (ผู้สูงอายุ) หรือ FMD (หญิงสาวอายุน้อย); น้ำท่วมปอดฉับพลันซ้ำๆ โดยไม่ทราบสาเหตุ, ค่าไตทรุดลงเฉียบพลัน (Cr พุ่งเกิน 30%) หลังได้ยา ACEi/ARB, ฟังได้เสียงฟู่ในช่องท้อง (abdominal bruit)',
        screeningTestEn: 'Renal Duplex Ultrasonography & Doppler; CTA or MRA of renal arteries.',
        screeningTestTh: 'ตรวจอัลตราซาวด์หลอดเลือดไต Doppler หรือทำ CTA/MRA หลอดเลือดไต',
        treatmentEn: 'Consider revascularisation in atherosclerotic renal artery stenosis with acute pulmonary oedema, progressive CKD or high-grade stenosis > 75% (not graded). ACEI or ARB may be used if tolerated, with close monitoring (Class IIb, Level B, Table 21). Same office BP targets as CKD (Class IIa, Level B).',
        treatmentTh: 'พิจารณาทำ revascularization ใน atherosclerotic renal artery stenosis ที่มีน้ำท่วมปอดเฉียบพลัน CKD ที่แย่ลง หรือตีบรุนแรง > 75% (ไม่ได้ระบุระดับ) อาจใช้ ACEI หรือ ARB ถ้าทนได้และติดตามใกล้ชิด (ระดับ IIb, หลักฐาน B ตารางที่ 21) เป้าหมายความดันเหมือนผู้ป่วย CKD (ระดับ IIa, หลักฐาน B)'
      },
      {
        id: 'osa',
        nameEn: 'Obstructive Sleep Apnea (OSA)',
        nameTh: 'ภาวะหยุดหายใจขณะหลับจากการอุดกั้น (OSA)',
        prevalenceEn: '35% to 80% in hypertensive patients (Table 26)',
        prevalenceTh: 'พบร้อยละ 35 ถึง 80 ในผู้ป่วยความดันโลหิตสูง (ตารางที่ 26)',
        clinicalCluesEn: 'Habitual loud snoring, witnessed choking/apneic spells during sleep, daytime excessive somnolence, morning headaches, obesity (BMI >= 30), nocturnal non-dipping or rising BP pattern.',
        clinicalCluesTh: 'นอนกรนเสียงดัง, มีอาการสะดุ้งสำลักหรือหยุดหายใจขณะหลับ, ง่วงนอนตอนกลางวันมาก, ตื่นมาปวดศีรษะ, โรคอ้วน, ความดันกลางคืนไม่ลดลง (non-dipping)',
        screeningTestEn: 'Polysomnography (Sleep study, Class I, Level A). Note: Screen for Primary Aldosteronism in OSA (Class IIa, Level B)!',
        screeningTestTh: 'ตรวจ Polysomnography (PSG) (Class I, Level A); แนะนำให้ตรวจคัดกรองโรคเนื้องอกต่อมหมวกไต (PA) ร่วมด้วยเสมอ (Class IIa, Level B)',
        treatmentEn: 'CPAP therapy (Class IIa, Level B) + MRA (Spironolactone), ACEI, or ARB as preferred medical therapy (Class I, Level A).',
        treatmentTh: 'พิจารณาใช้ CPAP (ระดับ IIa, หลักฐาน B) และเลือกใช้ MRA (spironolactone), ACEI หรือ ARB ในการลดความดัน (ระดับ I, หลักฐาน A)'
      },
      {
        id: 'coarctation',
        nameEn: 'Coarctation of the Aorta',
        nameTh: 'หลอดเลือดแดงใหญ่เอออร์ตาร์ตีบแต่กำเนิด (Coarctation of Aorta)',
        clinicalCluesEn: 'Young patient, upper extremity hypertension with low BP in lower extremities (>20 mmHg difference), diminished or delayed femoral pulses, continuous murmur over back.',
        clinicalCluesTh: 'ผู้ป่วยอายุน้อย ความดันแขนสูงกว่าขามากกว่า 20 มม.ปรอท คลำชีพจรที่ขาหนีบ (femoral pulse) ได้เบาหรือมาช้ากว่าแขน',
        screeningTestEn: 'Compare arm and leg BP; transthoracic echocardiogram or CT angiography. [Work-up details not in Thai CPG 2567; listed as a cause in Table 36]',
        screeningTestTh: 'วัดความดันแขนเทียบกับขา; echocardiogram หรือ CT angiography [รายละเอียดไม่มีในแนวทางฯ 2567; ระบุเป็นสาเหตุในตารางที่ 36]',
        treatmentEn: 'Balloon angioplasty with stenting, or surgical repair. [Not in Thai CPG 2567]',
        treatmentTh: 'ขยายด้วยบอลลูนและใส่ขดลวด หรือผ่าตัดแก้ไข [ไม่มีในแนวทางฯ 2567]'
      }
    ]
  },

  // 4. Resistant and Refractory Hypertension
  resistantHT: {
    titleEn: 'Resistant and Refractory Hypertension Management Protocol',
    titleTh: 'แนวทางการดูแลรักษาความดันโลหิตสูงชนิดดื้อยาและดื้อยาขั้นรุนแรง',
    definitions: {
      resistantEn: 'Clinic BP >= 140/90 mmHg despite concurrent use of 3 antihypertensive drug classes at optimal/maximal tolerated doses (one of which MUST BE A DIURETIC); OR controlled BP requiring >= 4 antihypertensive medications.',
      resistantTh: 'ความดันโลหิตที่คลินิก >= 140/90 มม.ปรอท แม้จะใช้ยาลดความดันโลหิตต่างกลุ่มกันตั้งแต่ 3 ชนิดขึ้นไปในขนาดสูงสุดที่ทนได้ โดย 1 ใน 3 ชนิดนั้นต้องมียาขับปัสสาวะ (Diuretic); หรือ คุมความดันได้แต่ต้องใช้ยาตั้งแต่ 4 ชนิดขึ้นไป',
      refractoryEn: 'Clinic BP >= 140/90 mmHg despite concurrent use of >= 5 antihypertensive drug classes at maximal tolerated doses, which MUST INCLUDE a long-acting thiazide-like diuretic (Chlorthalidone or Indapamide) AND an MRA (Spironolactone).',
      refractoryTh: 'ความดันโลหิตที่คลินิกยังคง >= 140/90 มม.ปรอท แม้จะได้ยาลดความดันต่างกลุ่มกันตั้งแต่ 5 ชนิดขึ้นไปในขนาดสูงสุดที่ทนได้ ซึ่งรวมถึงยาขับปัสสาวะชนิดออกฤทธิ์ยาว (Chlorthalidone หรือ Indapamide) และ Spironolactone แล้ว'
    },
    pseudoResistanceChecklist: [
      { id: 'technique', textEn: 'Improper BP measurement technique (cuff too small, arm not supported at heart level, patient talking, full bladder, acute pain/stress)', textTh: 'เทคนิคการวัดความดันไม่ถูกต้อง (ขนาด cuff เล็กเกินไป, แขนไม่อยู่ระดับหัวใจ, พูดคุยขณะวัด, ปวดปัสสาวะ, ความเครียด/ปวดเฉียบพลัน)' },
      { id: 'whitecoat', textEn: 'White-coat effect (Must verify with ABPM or HBPM; up to 30% of apparent resistant HT is white-coat!)', textTh: 'ภาวะ White-coat effect (ต้องตรวจยืนยันด้วย ABPM หรือ HBPM; พบว่าผู้ป่วยที่สงสัยดื้อยาถึง 1 ใน 3 มีความดันที่บ้านปกติ!)' },
      { id: 'adherence', textEn: 'Poor medication adherence (Ask objectively, count pills, review refill records; accounts for ~50% of uncontrolled HT)', textTh: 'การไม่รับประทานยาอย่างถูกต้องสม่ำเสมอ (ซักประวัติอย่างเปิดใจ ตรวจนับเม็ดยา ประวัติการรับยาต่อเนื่อง)' },
      { id: 'substances', textEn: 'Interfering drugs and substances (Table 39: NSAIDs/COX-2 inhibitors, oral contraceptives, steroids, pseudoephedrine/decongestants, alcohol, amphetamines, cyclosporine, VEGF inhibitors, herbal products like licorice)', textTh: 'ยาหรือสารออกฤทธิ์ที่เพิ่มความดัน (ตารางที่ 39: ยาแก้ปวดข้อ NSAIDs/COX-2, ยาคุมกำเนิด, สเตียรอยด์, ยาลดน้ำมูก pseudoephedrine, แอลกอฮอล์, ยาบ้า/โคเคน, ชะเอมเทศ/สมุนไพรบางชนิด)' }
    ],
    stepwiseAlgorithm: [
      {
        step: 1,
        titleEn: 'Step 1: Lifestyle Modification',
        titleTh: 'ขั้นตอนที่ 1: การปรับเปลี่ยนพฤติกรรมชีวิตอย่างเข้มงวด',
        actionsEn: [
          'Sodium restriction: < 2 g sodium/day (<5 g salt/day ~1 tsp) combined with DASH diet pattern (Class I, Level A)',
          'Weight control by diet and regular exercise if overweight or obese (Class I, Level B, Table 40); Thai normal BMI 18.5-22.9, waist < 90 cm men, < 80 cm women',
          'Aerobic exercise: moderate-intensity aerobic exercise with diet control (Class I, Level B)',
          'Adequate sleep hygiene: Screen and treat sleep deprivation and obstructive sleep apnea'
        ],
        actionsTh: [
          'จำกัดโซเดียมอย่างเข้มงวด: ไม่เกินวันละ 2 กรัม (เกลือแกงไม่เกิน 1 ช้อนชา) ร่วมกับอาหารแบบ DASH (Class I, Level A)',
          'ควบคุมน้ำหนักด้วยการควบคุมอาหารและออกกำลังกายสม่ำเสมอในผู้ที่น้ำหนักเกินหรืออ้วน (ระดับ I, หลักฐาน B ตารางที่ 40); ค่าปกติคนไทย BMI 18.5-22.9 รอบเอวชาย < 90 ซม. หญิง < 80 ซม.',
          'ออกกำลังกายแบบแอโรบิกระดับปานกลางร่วมกับการควบคุมอาหาร (ระดับ I, หลักฐาน B)',
          'นอนหลับอย่างเพียงพอ คัดกรองและรักษาภาวะหยุดหายใจขณะหลับ (OSA)'
        ]
      },
      {
        step: 2,
        titleEn: 'Step 2: Core Triple Therapy Optimization & Diuretic Switching',
        titleTh: 'ขั้นตอนที่ 2: ปรับยา 3 กลุ่มหลักให้เต็มขนาดและปรับชนิดยาขับปัสสาวะ',
        actionsEn: [
          'Ensure 3 core drug classes are at full or maximum tolerated doses: RAS blocker (ACEI/ARB) + DHP-CCB + Diuretic.',
          'DIURETIC SWITCH: Switch hydrochlorothiazide (HCTZ) to a long-acting thiazide-like diuretic (Chlorthalidone 12.5-50 mg or Indapamide 1.5-2.5 mg) (Class IIa, Level B).',
          'If eGFR < 30-45 mL/min/1.73m2 or fluid overload: Switch to Loop Diuretic (Furosemide 40-80 mg).',
          'ADD 4TH DRUG: spironolactone 25-50 mg OD (Class I, Level B, PATHWAY-2) or eplerenone, only if eGFR >= 30 mL/min/1.73m2; use with caution if eGFR < 45 or K+ > 4.5 mmol/L (CPG p.115).',
          'If eGFR 15-30 mL/min/1.73m2: Chlorthalidone can still be added/used (CLICK trial, Class IIa, Level B).'
        ],
        actionsTh: [
          'ใช้ยา 3 กลุ่มหลักให้ครบในขนาดสูงสุดที่ผู้ป่วยทนได้: RAS blocker + CCB + ยาขับปัสสาวะ',
          'เปลี่ยนยาขับปัสสาวะ: เปลี่ยน HCTZ เป็นชนิดออกฤทธิ์ยาว Thiazide-like คือ Chlorthalidone (12.5-50 มก.) หรือ Indapamide (1.5-2.5 มก.) (Class IIa, Level B)',
          'หาก eGFR < 30-45 หรือมีภาวะน้ำคั่ง: เปลี่ยนเป็น Loop Diuretic (Furosemide)',
          'เพิ่มยาชนิดที่ 4: spironolactone 25-50 มก./วัน (ระดับ I, หลักฐาน B; PATHWAY-2) หรือ eplerenone เฉพาะเมื่อ eGFR >= 30; ใช้ด้วยความระมัดระวังถ้า eGFR < 45 หรือ K+ > 4.5 มิลลิโมล/ลิตร (หน้า 115)',
          'หาก eGFR 15-30: สามารถเพิ่ม Chlorthalidone ได้ตามการศึกษา CLICK trial (Class IIa, Level B)'
        ]
      },
      {
        step: 3,
        titleEn: 'Step 3: 5th-Line Add-on Pharmacotherapy',
        titleTh: 'ขั้นตอนที่ 3: การให้ยาลดความดันกลุ่มเพิ่มเติมขนานที่ 5 (เลือกตามความเหมาะสม)',
        actionsEn: [
          'Switch RAS blocker to Sacubitril/Valsartan (ARNI) (Class IIb, Level B in resistant HT / PARAGON-HF)',
          'Add Beta-Blocker (Bisoprolol or Carvedilol) if resting heart rate >= 70 bpm',
          'Add Alpha-1 Blocker (Doxazosin 4-8 mg XL) or Centrally Acting Agent (Clonidine / Methyldopa)',
          'Add Direct Vasodilator: Hydralazine (25-50 mg TID) or Minoxidil (caution: reflex tachycardia and fluid retention)'
        ],
        actionsTh: [
          'เปลี่ยนยา ACEi หรือ ARB มาเป็น Sacubitril/Valsartan (ARNI) (Class IIb, Level B ในความดันดื้อยา)',
          'เพิ่ม Beta-blocker (Bisoprolol หรือ Carvedilol) หากผู้ป่วยมีชีพจรตั้งแต่ 70 ครั้ง/นาทีขึ้นไป',
          'เพิ่ม Alpha-1 blocker (Doxazosin XL) หรือ Centrally acting agent (Clonidine หรือ Methyldopa)',
          'เพิ่ม Direct vasodilator: Hydralazine หรือ Minoxidil (ต้องระวังอาการใจสั่นและบวมน้ำคั่ง)'
        ]
      },
      {
        step: 4,
        titleEn: 'Step 4: Device-Based Therapy (Renal Denervation, RDN)',
        titleTh: 'ขั้นตอนที่ 4: การรักษาด้วยหัตถการจี้เส้นประสาทไตด้วยคลื่นวิทยุ (RDN)',
        actionsEn: [
          'Catheter-based Renal Denervation (RDN) via radiofrequency or ultrasound ablation.',
          'Class I, Level C recommendation for Refractory Hypertension on maximal tolerated medical therapy.',
          'Class IIa, Level B recommendation for Resistant Hypertension with established ASCVD or progressive HMOD.',
          'Eligibility requirement: eGFR >= 30 mL/min/1.73m2, anatomy suitable, confirmed by ABPM and compliance check.'
        ],
        actionsTh: [
          'การทำ Catheter-based Renal Denervation (RDN) จี้เส้นประสาทอัตโนมัติรอบหลอดเลือดไตด้วยความถี่วิทยุหรืออัลตราซาวด์',
          'คำแนะนำ Class I, Level C ในผู้ป่วย Refractory Hypertension ที่ได้ยาขนาดสูงสุดแล้ว',
          'คำแนะนำ Class IIa, Level B ในผู้ป่วย Resistant Hypertension ที่มีโรคหลอดเลือดแข็ง (ASCVD) หรือมี HMOD รุนแรงขึ้น',
          'เกณฑ์พิจารณา: eGFR >= 30 มล./นาที, หลอดเลือดไตเหมาะสม, ยืนยันความดันสูงจริงด้วย ABPM'
        ]
      }
    ]
  },

  // 5. Hypertensive Crises: Emergency vs PSH (Urgency)
  hypertensiveCrises: {
    titleEn: 'Hypertensive Crises: Emergency vs Pre-critical Symptomatic HT (PSH)',
    titleTh: 'ภาวะวิกฤตความดันโลหิตสูง: ภาวะฉุกเฉิน (Emergency) และ PSH',
    overviewEn: 'Severe BP elevation (usually Grade 3: SBP >= 180 or DBP >= 110 mmHg). Crucial first step is differentiating acute progressive target organ damage (Emergency) from absence of organ damage (PSH).',
    overviewTh: 'ความดันโลหิตสูงรุนแรงมาก (ส่วนใหญ่ Grade 3: SBP >= 180 หรือ DBP >= 110 มม.ปรอท) ขั้นตอนแรกที่สำคัญที่สุดคือการแยกภาวะที่มีความเสียหายต่ออวัยวะสำคัญเฉียบพลัน (Emergency) ออกจากภาวะที่ไม่มีความเสียหายต่ออวัยวะ (PSH)',
    table41_emergencySyndromes: [
      {
        syndromeEn: 'Acute Coronary Syndromes (ACS / STEMI / NSTEMI / Unstable Angina)',
        syndromeTh: 'ภาวะกล้ามเนื้อหัวใจขาดเลือดเฉียบพลัน (ACS)',
        bpTargetEn: 'SBP < 140 mmHg immediately (ASAP)',
        bpTargetTh: 'ลด SBP ลงมาต่ำกว่า 140 มม.ปรอท เร็วที่สุดที่จะทำได้',
        timelineEn: 'As fast as possible',
        timelineTh: 'เร็วที่สุดที่จะทำได้',
        firstLineMedsEn: 'Nitroglycerin IV, Labetalol IV',
        firstLineMedsTh: 'Nitroglycerin IV, Labetalol IV',
        cautionEn: 'Do not lower SBP < 110 mmHg or DBP < 60 mmHg (Table 41). [Not in Thai CPG 2567: avoid hydralazine (reflex tachycardia)]',
        cautionTh: 'ไม่ควรลด SBP ต่ำกว่า 110 หรือ DBP ต่ำกว่า 60 มม.ปรอท (ตารางที่ 41) [ไม่มีในแนวทางฯ 2567: หลีกเลี่ยง hydralazine]'
      },
      {
        syndromeEn: 'Acute Decompensated Heart Failure (Cardiogenic Pulmonary Edema)',
        syndromeTh: 'ภาวะหัวใจล้มเหลวเฉียบพลัน / ปอดบวมน้ำ (Pulmonary Edema)',
        bpTargetEn: 'SBP < 140 mmHg immediately',
        bpTargetTh: 'ลด SBP ลงมาต่ำกว่า 140 มม.ปรอท เร็วที่สุดที่จะทำได้',
        timelineEn: 'As fast as possible',
        timelineTh: 'เร็วที่สุดที่จะทำได้',
        firstLineMedsEn: 'Nitroglycerin IV, Sodium Nitroprusside IV + Loop Diuretics (Furosemide IV)',
        firstLineMedsTh: 'Nitroglycerin IV, Sodium Nitroprusside IV ร่วมกับ Furosemide IV',
        cautionEn: 'AVOID Labetalol and beta-blockers in severe pulmonary congestion (negative inotrope worsens failure!). Avoid hydralazine.',
        cautionTh: 'หลีกเลี่ยงการใช้ Labetalol และ Beta-blocker ในผู้ป่วยที่มีน้ำท่วมปอดรุนแรง เพราะจะกดการบีบตัวของหัวใจ'
      },
      {
        syndromeEn: 'Acute Aortic Diseases (Aortic Dissection / Rupture)',
        syndromeTh: 'โรคหลอดเลือดแดงใหญ่เอออร์ตาฉีกขาดเฉียบพลัน (Acute Aortic Dissection)',
        bpTargetEn: 'SBP < 120 mmHg AND heart rate < 60 bpm',
        bpTargetTh: 'ลด SBP ต่ำกว่า 120 มม.ปรอท และ ชีพจรต่ำกว่า 60 ครั้ง/นาที',
        timelineEn: 'As fast as possible',
        timelineTh: 'เร็วที่สุดที่จะทำได้',
        firstLineMedsEn: 'Esmolol, labetalol, nicardipine, nitroglycerin IV; 2 classes may be needed to control both SBP and HR (Table 41)',
        firstLineMedsTh: 'Esmolol, labetalol, nicardipine, nitroglycerin IV; อาจต้องใช้ยา 2 กลุ่มร่วมกันเพื่อคุมทั้ง SBP และชีพจร (ตารางที่ 41)',
        cautionEn: 'Control heart rate with a beta-blocker before adding a vasodilator, so reflex tachycardia does not raise aortic wall stress. [Order of drugs not stated in Thai CPG 2567]',
        cautionTh: 'คุมชีพจรด้วย beta-blocker ก่อนให้ยาขยายหลอดเลือด เพื่อไม่ให้หัวใจเต้นเร็วจนเพิ่มแรงที่ผนังหลอดเลือด [ลำดับการให้ยาไม่มีในแนวทางฯ 2567]'
      },
      {
        syndromeEn: 'Malignant Hypertension with Papilledema / Bilateral Retinopathy',
        syndromeTh: 'ความดันโลหิตสูงชนิดร้ายแรง (Malignant Hypertension with Papilledema)',
        bpTargetEn: 'Reduce Mean Arterial Pressure (MAP) by 20% to 25%',
        bpTargetTh: 'ลด Mean Arterial Pressure (MAP) ลงมาร้อยละ 20 ถึง 25',
        timelineEn: 'Over 2 to 3 hours',
        timelineTh: 'ภายใน 2 ถึง 3 ชั่วโมง',
        firstLineMedsEn: 'Nicardipine IV, Labetalol IV (Nitroprusside if refractory)',
        firstLineMedsTh: 'Nicardipine IV, Labetalol IV (หรือ Nitroprusside หากดื้อยา)',
        cautionEn: 'Do not normalize BP precipitously (prevents watershed ischemic stroke / cerebral hypoperfusion).',
        cautionTh: 'ห้ามลดความดันลงมาเป็นปกติในทันที เพราะจะทำให้สมองขาดเลือดเฉียบพลัน'
      },
      {
        syndromeEn: 'Hypertensive Encephalopathy (Severe headache, confusion, seizures, lethargy)',
        syndromeTh: 'ภาวะสมองบวมจากความดันโลหิตสูงวิกฤต (Hypertensive Encephalopathy)',
        bpTargetEn: 'Reduce MAP by 20% to 25% immediately',
        bpTargetTh: 'ลด Mean Arterial Pressure (MAP) ลงมาร้อยละ 20 ถึง 25 เร็วที่สุด',
        timelineEn: 'As fast as possible',
        timelineTh: 'เร็วที่สุดที่จะทำได้',
        firstLineMedsEn: 'Nicardipine IV, Labetalol IV',
        firstLineMedsTh: 'Nicardipine IV, Labetalol IV',
        cautionEn: 'Differentiate from acute stroke. Rapidly reversible upon BP reduction.',
        cautionTh: 'แยกจากโรคหลอดเลือดสมองเฉียบพลัน อาการทางสมองจะดีขึ้นอย่างรวดเร็วเมื่อความดันลดลง'
      },
      {
        syndromeEn: 'Acute Ischemic Stroke (Candidate for Thrombolysis / Thrombectomy)',
        syndromeTh: 'โรคหลอดเลือดสมองขาดเลือดเฉียบพลัน (กรณีได้ยาละลายลิ่มเลือด/ลากลิ่มเลือด)',
        bpTargetEn: 'SBP < 185 mmHg and DBP < 110 mmHg BEFORE thrombolysis; maintain < 180/105 mmHg for 24h post-reperfusion',
        bpTargetTh: 'ลดลงมาต่ำกว่า 185/110 มม.ปรอท ก่อนฉีดยาละลายลิ่มเลือด; และคุมให้ต่ำกว่า 180/105 มม.ปรอท ตลอด 24 ชม.แรก',
        timelineEn: 'Immediately, before thrombolysis (Class I, Level B) or thrombectomy (Class IIa, Level B)',
        timelineTh: 'ทันทีก่อนให้ยาละลายลิ่มเลือด (ระดับ I, หลักฐาน B) หรือก่อนทำ thrombectomy (ระดับ IIa, หลักฐาน B)',
        firstLineMedsEn: 'Nicardipine IV 2 mg over 1-2 min, then 5 mg/h, titrate every 5-15 min; or labetalol IV 10 mg over 1-2 min, then 2-8 mg/min (CPG p.58)',
        firstLineMedsTh: 'Nicardipine IV 2 มก. ใน 1-2 นาที แล้วหยด 5 มก./ชม. ปรับทุก 5-15 นาที; หรือ labetalol IV 10 มก. ใน 1-2 นาที แล้วหยด 2-8 มก./นาที (หน้า 58)',
        cautionEn: 'NEVER USE SHORT-ACTING NIFEDIPINE (Class III, Level C - sudden precipitous drop causes extension of cerebral infarction).',
        cautionTh: 'ห้ามใช้ยา nifedipine ชนิดออกฤทธิ์สั้นอมใต้ลิ้นหรือกินเด็ดขาด (Class III, Level C) เพราะความดันจะตกวูบจนเนื้อสมองตายลุกลาม'
      },
      {
        syndromeEn: 'Acute Ischemic Stroke (NOT a candidate for reperfusion)',
        syndromeTh: 'โรคหลอดเลือดสมองขาดเลือดเฉียบพลัน (กรณีไม่ได้ยาละลายลิ่มเลือด)',
        bpTargetEn: 'If BP > 220/120 mmHg: let the patient rest briefly and re-measure; if still high, lower to SBP < 220 and DBP < 120 mmHg (Class IIa, Level C)',
        bpTargetTh: 'ถ้าความดัน > 220/120 มม.ปรอท ให้พักสั้น ๆ แล้ววัดซ้ำ ถ้ายังสูงให้ลด SBP < 220 และ DBP < 120 มม.ปรอท (ระดับ IIa, หลักฐาน C)',
        timelineEn: 'After a short rest and repeat measurement',
        timelineTh: 'หลังพักสั้น ๆ และวัดซ้ำ',
        firstLineMedsEn: 'Nicardipine IV, Labetalol IV',
        firstLineMedsTh: 'Nicardipine IV, Labetalol IV',
        cautionEn: 'Low or normal BP in acute ischaemic stroke is unusual: look for a cause (e.g. aortic dissection, MI, arrhythmia). [The "reduce 15% in 24 h" rule is AHA, not Thai CPG 2567]',
        cautionTh: 'ผู้ป่วย ischemic stroke ระยะเฉียบพลันที่ความดันปกติหรือต่ำ ต้องหาสาเหตุ เช่น aortic dissection, MI, หัวใจเต้นผิดจังหวะ [กฎ "ลดร้อยละ 15 ใน 24 ชม." มาจาก AHA ไม่ใช่แนวทางฯ 2567]'
      },
      {
        syndromeEn: 'Acute Spontaneous Intracerebral Hemorrhage (sICH)',
        syndromeTh: 'ภาวะเลือดออกในเนื้อสมองเฉียบพลัน (sICH)',
        bpTargetEn: 'SBP > 180 mmHg: lower with IV drugs (Class IIa, Level B); in mild-moderate sICH a target SBP of 140 mmHg may be considered (Class IIb, Level B)',
        bpTargetTh: 'SBP > 180 มม.ปรอท: ลดด้วยยาฉีด (ระดับ IIa, หลักฐาน B); ใน sICH รุนแรงน้อยถึงปานกลาง อาจลด SBP ถึงเป้า 140 มม.ปรอท (ระดับ IIb, หลักฐาน B)',
        timelineEn: 'Titrate smoothly; keep SBP variability as low as possible (Class IIa, Level C)',
        timelineTh: 'ปรับยาอย่างนุ่มนวล ให้ SBP แกว่งน้อยที่สุด (ระดับ IIa, หลักฐาน C)',
        firstLineMedsEn: 'Nicardipine IV, Labetalol IV',
        firstLineMedsTh: 'Nicardipine IV, Labetalol IV',
        cautionEn: 'Avoid wide BP fluctuations to prevent hematoma expansion.',
        cautionTh: 'หลีกเลี่ยงความดันแกว่งขึ้นลง เพื่อป้องกันก้อนเลือดขยายตัว'
      },
      {
        syndromeEn: 'Severe Preeclampsia / Eclampsia',
        syndromeTh: 'ภาวะครรภ์เป็นพิษรุนแรง / อาการชัก (Preeclampsia / Eclampsia)',
        bpTargetEn: 'Treat SBP >= 160 and/or DBP >= 110 mmHg promptly (Table 29). [A numeric target is not given in Thai CPG 2567]',
        bpTargetTh: 'รักษาทันทีเมื่อ SBP >= 160 และ/หรือ DBP >= 110 มม.ปรอท (ตารางที่ 29) [แนวทางฯ 2567 ไม่ได้กำหนดตัวเลขเป้าหมาย]',
        timelineEn: 'Timely (crisis)',
        timelineTh: 'ทันที (ภาวะวิกฤต)',
        firstLineMedsEn: 'Hydralazine 5 mg IV/IM, then 5-10 mg IV every 20-40 min (max 20 mg) or 0.5-10 mg/h; nifedipine 10-20 mg oral, repeat in 20 min, then 10-20 mg every 2-6 h (max 180 mg/day); labetalol 10-20 mg IV, then 20-80 mg every 10-30 min (max 300 mg) or 1-2 mg/min (all Class I, Level B, Table 30). Magnesium sulfate for end-organ involvement.',
        firstLineMedsTh: 'Hydralazine 5 มก. IV/IM แล้ว 5-10 มก. IV ทุก 20-40 นาที (สูงสุด 20 มก.) หรือหยด 0.5-10 มก./ชม.; nifedipine 10-20 มก. กิน ซ้ำได้ใน 20 นาที แล้ว 10-20 มก. ทุก 2-6 ชม. (สูงสุด 180 มก./วัน); labetalol 10-20 มก. IV แล้ว 20-80 มก. ทุก 10-30 นาที (สูงสุด 300 มก.) หรือหยด 1-2 มก./นาที (ระดับ I, หลักฐาน B ตารางที่ 30) ให้ magnesium sulfate เมื่อมี end-organ involvement',
        cautionEn: 'ACEI, ARB, ARNI, and Nitroprusside are STRICTLY CONTRAINDICATED (fetotoxic). Definitive cure is delivery.',
        cautionTh: 'ห้ามใช้ ACEI, ARB, ARNI และ Nitroprusside เด็ดขาด การรักษาให้หายขาดคือการคลอด'
      }
    ],
    pshProtocol: {
      nameEn: 'Pre-critical Symptomatic Hypertension (PSH) Protocol (Formerly Hypertensive Urgency)',
      nameTh: 'แนวทางการดูแลภาวะความดันโลหิตสูงมากที่มีอาการนำแต่ยังไม่วิกฤต (PSH)',
      definitionEn: 'Marked BP elevation (usually Grade 3: SBP >= 180 or DBP >= 110) with mild non-specific symptoms (mild headache, dizziness, anxiety, nausea) but WITHOUT acute end-organ damage.',
      definitionTh: 'ความดันโลหิตสูงมาก (ส่วนใหญ่ Grade 3) ร่วมกับมีอาการเล็กน้อย เช่น ปวดศีรษะเล็กน้อย เวียนศีรษะ คลื่นไส้ วิตกกังวล แต่ไม่มีความเสียหายต่ออวัยวะสำคัญเฉียบพลัน',
      principles: [
        'First make sure there is no acute organ damage (Class I, Level B), then look for triggers: stress, anxiety, BP-raising drugs, severe pain, missed or never-started antihypertensives, severe white-coat effect (Class I, Level B).',
        'Lower BP gradually over 24 to 48 hours instead of rapidly to normal (Class I, Level B); do not use IV or sublingual drugs to drop BP fast.',
        'Rest, relaxation breathing and an anxiolytic for stress or anxiety (Class IIb, Level B); pain relief for moderate to severe pain (Class IIa, Level B).',
        'Initiate or adjust oral combination regimen (>= 2 drugs, SPC preferred) before discharge (Class I, Level A).',
        'Arrange structured outpatient follow-up within 2 to 4 weeks (Class I, Level C).'
      ],
      principlesTh: [
        'ตรวจให้แน่ใจก่อนว่าไม่มี acute organ damage (ระดับ I, หลักฐาน B) แล้วค้นหาปัจจัยกระตุ้น: ความเครียด วิตกกังวล ยาหรือสารที่เพิ่มความดัน ปวดรุนแรง ขาดยา/ไม่เคยได้ยา white-coat รุนแรง (ระดับ I, หลักฐาน B)',
        'ค่อย ๆ ลดความดันลงภายใน 24 ถึง 48 ชั่วโมง แทนการลดลงเป็นปกติอย่างรวดเร็ว (ระดับ I, หลักฐาน B) ไม่ใช้ยาฉีดหรือยาอมใต้ลิ้นเพื่อลดความดันเร็ว',
        'ให้พัก ฝึกหายใจผ่อนคลาย และยาลดความวิตกกังวลเมื่อเครียด (ระดับ IIb, หลักฐาน B); ให้ยาแก้ปวดเมื่อปวดปานกลางถึงรุนแรง (ระดับ IIa, หลักฐาน B)',
        'ให้ยาลดความดันชนิดรับประทานกลับบ้าน โดยเริ่มด้วยยาร่วมกันตั้งแต่ 2 ชนิดขึ้นไป (SPC แนะนำ) (Class I, Level A)',
        'นัดผู้ป่วยกลับมาตรวจติดตามอาการและประเมินซ้ำภายใน 2 ถึง 4 สัปดาห์ (Class I, Level C)'
      ]
    }
  },

  // 6. Special Populations & Comorbidities (Chapter 6 & 7 & 8 & 10)
  specialPopulations: [
    {
      id: 'cad',
      nameEn: 'Coronary Artery Disease (CAD)',
      nameTh: 'โรคหลอดเลือดหัวใจ (CAD)',
      targetEn: '< 130/80 mmHg (caution if DBP < 70 mmHg, J-curve)',
      targetTh: '< 130/80 มม.ปรอท (ระวังหาก DBP < 70 มม.ปรอท)',
      firstChoiceEn: 'ACEI and/or beta-blocker (ARB if ACEI not tolerated) (Class I, Level A); for angina: beta-blocker, DHP-CCB or non-DHP-CCB (Class I, Level A) (Table 16)',
      firstChoiceTh: 'ACEI และ/หรือ beta-blocker (ใช้ ARB ถ้าทน ACEI ไม่ได้) (ระดับ I, หลักฐาน A); ถ้ามี angina: beta-blocker, DHP-CCB หรือ non-DHP-CCB (ระดับ I, หลักฐาน A) (ตารางที่ 16)',
      pearlEn: 'Target resting heart rate 60-80 bpm with a beta-blocker or non-DHP-CCB (Class I, Level B). Start drugs from BP 130-139/85-89 mmHg (Class I, Level A). Do not combine a beta-blocker with a non-DHP-CCB (Class III, Level C, AF table).',
      pearlTh: 'คุมชีพจรขณะพัก 60-80 ครั้ง/นาที ด้วย beta-blocker หรือ non-DHP-CCB (ระดับ I, หลักฐาน B) เริ่มยาตั้งแต่ความดัน 130-139/85-89 มม.ปรอท (ระดับ I, หลักฐาน A) ไม่ใช้ beta-blocker ร่วมกับ non-DHP-CCB (ระดับ III, หลักฐาน C จากตาราง AF)'
    },
    {
      id: 'hfref',
      nameEn: 'Heart Failure with Reduced Ejection Fraction (HFrEF, EF <= 40%)',
      nameTh: 'ภาวะหัวใจล้มเหลว ชนิดการบีบตัวลดลง (HFrEF)',
      targetEn: 'SBP < 130 mmHg',
      targetTh: 'ความดันซิสโตลิก < 130 มม.ปรอท',
      firstChoiceEn: '4 GDMT Pillars: ACEi/ARB/ARNI + Beta-blocker (Bisoprolol/Carvedilol) + MRA (Spironolactone) + SGLT2i',
      firstChoiceTh: 'ยาหลัก 4 กลุ่ม: ARNI/ACEi/ARB + Beta-blocker + MRA (Spironolactone) + SGLT2i',
      pearlEn: 'If BP still high on all 4 drugs: Add Amlodipine (DHP-CCB). STRICTLY CONTRAINDICATED: Non-DHP CCBs (Verapamil, Diltiazem) (Class III, Level C).',
      pearlTh: 'หากความดันยังสูงหลังได้ยาครบ 4 กลุ่ม ให้เพิ่ม Amlodipine ห้ามใช้ Non-DHP CCB (Verapamil, Diltiazem) เด็ดขาด'
    },
    {
      id: 'hfpef',
      nameEn: 'Heart Failure with Preserved Ejection Fraction (HFpEF, EF >= 50%)',
      nameTh: 'ภาวะหัวใจล้มเหลว ชนิดการบีบตัวปกติ (HFpEF)',
      targetEn: 'SBP < 130 mmHg',
      targetTh: 'ความดันซิสโตลิก < 130 มม.ปรอท',
      firstChoiceEn: 'SGLT2i (Empagliflozin/Dapagliflozin) + ARNI (or ARB) + Spironolactone + Diuretic for congestion',
      firstChoiceTh: 'SGLT2i + ARNI (หรือ ARB) + Spironolactone + ยาขับปัสสาวะหากมีน้ำคั่ง',
      pearlEn: 'ARNI is superior to valsartan in lowering BP in HFpEF (PARAGON-HF sub-study). Spironolactone reduces HF hospitalization (TOPCAT).',
      pearlTh: 'ARNI ช่วยลดความดันได้ดีกว่า ARB ใน HFpEF (PARAGON-HF); Spironolactone ลดการนอนโรงพยาบาล (TOPCAT)'
    },
    {
      id: 'ckd',
      nameEn: 'Chronic Kidney Disease (CKD) & Proteinuria',
      nameTh: 'โรคไตเรื้อรังและภาวะโปรตีนรั่วในปัสสาวะ (CKD)',
      targetEn: '120 - 130 / 70 - 79 mmHg if albuminuria (Class IIa, Level A)',
      targetTh: '120 - 130 / 70 - 79 มม.ปรอท หากมี albuminuria (Class IIa, Level A)',
      firstChoiceEn: 'UACR >= 30 mg/g: ACEI or ARB titrated to maximum dose (Class I, Level A); Add Finerenone if diabetic with persistent albuminuria. If eGFR < 30-45: use Loop Diuretic instead of thiazide.',
      firstChoiceTh: 'UACR >= 30: ต้องใช้ ACEI หรือ ARB เป็นยาขนานแรกปรับจนขนาดสูงสุด; เพิ่ม Finerenone หากเป็นเบาหวานไต; หาก eGFR < 30-45 ให้เปลี่ยนเป็น Loop diuretic',
      pearlEn: 'Check Cr & K+ at 2-4 weeks. Accept up to 30% rise in Cr. NEVER combine ACEI + ARB (Class III, Level B).',
      pearlTh: 'ตรวจ Cr และ K+ ที่ 2-4 สัปดาห์ ยอมรับ Cr เพิ่มได้ไม่เกิน 30% ห้ามใช้ ACEI ร่วมกับ ARB เด็ดขาด'
    },
    {
      id: 'stroke_secondary',
      nameEn: 'Post-Stroke & Secondary Stroke Prevention',
      nameTh: 'ผู้ป่วยโรคหลอดเลือดสมองและการป้องกันสโตรกซ้ำ',
      targetEn: 'Ischaemic stroke: 120-130/70-80 mmHg (Class IIb, Level B), most useful in lacunar stroke; sICH: 130/80 mmHg (Class IIa, Level B)',
      targetTh: 'Ischemic stroke: 120-130/70-80 มม.ปรอท (ระดับ IIb, หลักฐาน B) ได้ประโยชน์มากใน lacunar stroke; sICH: 130/80 มม.ปรอท (ระดับ IIa, หลักฐาน B)',
      firstChoiceEn: 'Any drug that reaches the target: the size of the BP fall matters more than the drug class (Class I, Level A, Table 22)',
      firstChoiceTh: 'ยาใดก็ได้ที่ทำให้ถึงเป้าหมาย: ขนาดของการลดความดันสำคัญกว่าชนิดของยา (ระดับ I, หลักฐาน A ตารางที่ 22)',
      pearlEn: 'Intracranial artery stenosis: lower BP with special care and set the target individually (Class IIb, Level C).',
      pearlTh: 'ผู้ป่วยหลอดเลือดในสมองตีบ: ลดความดันด้วยความระมัดระวังเป็นพิเศษ และกำหนดเป้าหมายเฉพาะราย (ระดับ IIb, หลักฐาน C)'
    },
    {
      id: 'diabetes',
      nameEn: 'Diabetes Mellitus (DM)',
      nameTh: 'โรคเบาหวาน (Diabetes Mellitus)',
      targetEn: '< 130/80 mmHg (Class I, Level B)',
      targetTh: '< 130/80 มม.ปรอท (Class I, Level B)',
      firstChoiceEn: 'Dual combination (SPC preferred). ACEI or ARB first-line if albuminuria (UACR >= 30). Add SGLT2i and/or GLP-1 RA for organ protection.',
      firstChoiceTh: 'ยาสูตรรวม 2 ชนิด (SPC); ต้องมี ACEI หรือ ARB หากมีไข่ขาวรั่ว; เสริม SGLT2i หรือ GLP-1 RA เพื่อปกป้องหัวใจไต',
      pearlEn: 'Start with 2 drugs if baseline BP >= 150/90 mmHg. Check orthostatic hypotension routinely (autonomic neuropathy).',
      pearlTh: 'เริ่มยา 2 ชนิดทันทีหากความดันแรกรับ >= 150/90 มม.ปรอท ตรวจความดันท่านอนและท่ายืนเพื่อดูภาวะความดันตกขณะยืน'
    },
    {
      id: 'pregnancy',
      nameEn: 'Hypertension in Pregnancy & Preeclampsia',
      nameTh: 'ความดันโลหิตสูงในสตรีตั้งครรภ์และครรภ์เป็นพิษ',
      targetEn: 'High BP: >= 140/90 twice >= 4 h apart after 20 weeks; crisis if >= 160/110 (Table 29). [A treatment target is not given in Thai CPG 2567]',
      targetTh: 'ความดันสูง: >= 140/90 สองครั้งห่างกัน >= 4 ชม. หลัง 20 สัปดาห์; วิกฤตถ้า >= 160/110 (ตารางที่ 29) [แนวทางฯ 2567 ไม่ได้กำหนดเป้าหมาย]',
      firstChoiceEn: 'Crisis: hydralazine IV/IM, oral nifedipine, labetalol IV (Class I, Level B, Table 30) + magnesium sulfate if end-organ involvement. [Chronic HT drugs such as methyldopa are not covered in Thai CPG 2567; NLEM 2569 lists methyldopa and hydralazine, and nifedipine SR 20 mg when they fail]',
      firstChoiceTh: 'ภาวะวิกฤต: hydralazine IV/IM, nifedipine กิน, labetalol IV (ระดับ I, หลักฐาน B ตารางที่ 30) และ magnesium sulfate เมื่อมี end-organ involvement [ยาสำหรับความดันสูงเรื้อรัง เช่น methyldopa ไม่มีในแนวทางฯ 2567; บัญชียาหลักฯ 2569 มี methyldopa และ hydralazine และ nifedipine SR 20 มก. เมื่อยาทั้งสองไม่ได้ผล]',
      pearlEn: 'Low-dose aspirin 81 mg/day from 12-28 weeks (best before 16) until delivery if >= 1 high-risk or >= 2 moderate-risk factors (Class I, Level A, Table 31). Avoid ACEI, ARB, ARNI and MRA in pregnancy (fetotoxic; drug labels).',
      pearlTh: 'Aspirin ขนาดต่ำ 81 มก./วัน เริ่ม 12-28 สัปดาห์ (ดีที่สุดก่อน 16 สัปดาห์) จนคลอด ถ้ามีปัจจัยเสี่ยงสูง >= 1 ข้อ หรือปานกลาง >= 2 ข้อ (ระดับ I, หลักฐาน A ตารางที่ 31) หลีกเลี่ยง ACEI, ARB, ARNI และ MRA ในหญิงตั้งครรภ์ (เป็นพิษต่อทารก; ตามฉลากยา)'
    },
    {
      id: 'af',
      nameEn: 'Atrial Fibrillation (AF)',
      nameTh: 'ภาวะหัวใจห้องบนสั่นพลิ้ว (Atrial Fibrillation)',
      targetEn: '< 130/80 mmHg; Resting HR < 110 bpm (<80 if symptomatic)',
      targetTh: '< 130/80 มม.ปรอท; ชีพจรพัก < 110 ครั้ง/นาที (<80 หากมีอาการ)',
      firstChoiceEn: 'Beta-blockers (Bisoprolol/Metoprolol) + ACEI or ARB (reduces recurrent AF)',
      firstChoiceTh: 'Beta-blocker (Bisoprolol) ร่วมกับ ACEI หรือ ARB (ช่วยลดการเกิด AF ซ้ำ)',
      pearlEn: 'CRITICAL: DO NOT combine Beta-blocker with non-DHP CCB (Class III, Level C). Lower SBP < 160 mmHg BEFORE initiating oral anticoagulant to prevent intracranial bleeding (Class I, Level B).',
      pearlTh: 'ห้ามใช้ Beta-blocker ร่วมกับ Non-DHP CCB เด็ดขาด ต้องคุมความดันซิสโตลิกให้ต่ำกว่า 160 ก่อนเริ่มยาละลายลิ่มเลือดป้องกันสโตรก'
    },
    {
      id: 'periop',
      nameEn: 'Perioperative Non-Cardiac Surgery',
      nameTh: 'การดูแลความดันโลหิตในผู้ป่วยผ่าตัด (Non-Cardiac Surgery)',
      targetEn: 'Elective target SBP < 160 mmHg; avoid delay for Grade 1-2 HT',
      targetTh: 'เป้าหมายผ่าตัดทั่วไป SBP < 160 มม.ปรอท; ห้ามเลื่อนผ่าตัดใน Grade 1 หรือ 2',
      firstChoiceEn: 'Continue chronic medications. Grade 3 HT (>=180/110) should be postponed until controlled.',
      firstChoiceTh: 'ให้ยากินเดิมต่อเนื่อง เลื่อนการผ่าตัดเฉพาะเมื่อความดันสูง Grade 3 (>=180/110) จนกว่าจะคุมได้',
      pearlEn: 'CRITICAL: NEVER STOP BETA-BLOCKERS ABRUPTLY before surgery (Class III, Level C - severe rebound tachycardia/MI). May temporarily hold ACEI/ARB on morning of surgery if high hypotension risk, but resume promptly (Class IIb, Level B).',
      pearlTh: 'ห้ามหยุดยา Beta-blocker กะทันหันก่อนผ่าตัดเด็ดขาด อาจพิจารณาหยุดยา ACEI/ARB เฉพาะเช้าวันผ่าตัดหากเสี่ยงความดันตก แต่ให้เริ่มใหม่โดยเร็วหลังผ่าตัด'
    }
  ],

  // 7. Cardiovascular Risk & Prevention (Table 44)
  cvRiskPrevention: {
    titleEn: 'Cardiovascular Risk Reduction & Primary Prevention Guidelines',
    titleTh: 'แนวทางการลดความเสี่ยงและการป้องกันโรคหัวใจและหลอดเลือด (ตารางที่ 44)',
    thaiCvRisk: {
      highRiskCutoffEn: '10-year Thai CV Risk Score >= 10%',
      highRiskCutoffTh: 'คะแนนความเสี่ยง Thai CV risk score ใน 10 ปี >= 10%',
      statinRecommendationEn: 'Statins strongly recommended if Thai CV risk >= 10% (Class IIa, Level C) or if >= 3 risk factors present (Class I, Level A).',
      statinRecommendationTh: 'ควรให้ statin ถ้ามีปัจจัยเสี่ยงตั้งแต่ 3 ข้อ (ระดับ I, หลักฐาน A); อาจพิจารณาให้ถ้า Thai CV risk >= 10% (ระดับ IIa, หลักฐาน C)',
      riskFactorsList: [
        'Male sex (เพศชาย)',
        'Age > 55 years (อายุมากกว่า 55 ปี)',
        'Current cigarette smoking (สูบบุหรี่)',
        'Left ventricular hypertrophy on ECG/Echo (หัวใจห้องล่างซ้ายโต LVH)',
        'Family history of premature CVD (ประวัติครอบครัวมีโรคหัวใจและหลอดเลือดตั้งแต่อายุน้อย)',
        'Albuminuria (มีไข่ขาวรั่วในปัสสาวะ)',
        'Diabetes Mellitus (เป็นโรคเบาหวาน)',
        'Atherosclerotic vascular disease (มีโรคหลอดเลือดแดงแข็ง)',
        'Total cholesterol to HDL-C ratio >= 6 (สัดส่วน TC/HDL >= 6)'
      ]
    },
    aspirinWarning: {
      recommendationEn: 'DO NOT prescribe Aspirin for PRIMARY prevention of cardiovascular disease in hypertensive patients without prior CVD (Class III, Level A). Major bleeding risk (0.47% absolute increase) exceeds cardiovascular event reduction (0.41%).',
      recommendationTh: 'ไม่ควรใช้ยาแอสไพริน (Aspirin) เพื่อป้องกันโรคหัวใจและหลอดเลือดแบบปฐมภูมิ (Primary Prevention) ในผู้ป่วยความดันโลหิตสูงที่ยังไม่เคยมีประวัติโรคหลอดเลือดหัวใจหรือสมองโดยไม่จำเป็น (คำแนะนำระดับ III - ห้ามปฏิบัติ, คุณภาพหลักฐาน A) เนื่องจากความเสี่ยงต่อการเกิดเลือดออกรุนแรงในทางเดินอาหารและสมองสูงกว่าประโยชน์ที่ได้รับ'
    }
  }
};
