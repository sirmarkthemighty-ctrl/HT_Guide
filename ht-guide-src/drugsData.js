// --- Hypertension Medications Dataset (Thai CPG 2567 / NLEM 2569) ---
// Patched 2026-10-26 after the clinical audit (see AUDIT-2026-10-26.md).
// nlemCode: b = basic, s = supplemental, ex = exclusive list (NLEM 2569, group 2). costLevel null = no price source.
// label: US prescribing information on DailyMed (null when no US label matches the Thai product).

const drugCategories = [
  {
    "id": "first_line",
    "nameEn": "First-Line Core Classes (5 Major Groups)",
    "nameTh": "ยากลุ่มหลัก 5 กลุ่มแรก (First-Line)",
    "color": "#2563eb"
  },
  {
    "id": "spc_combos",
    "nameEn": "Single-Pill Combinations (SPCs in TH)",
    "nameTh": "ยาสูตรรวมเม็ดเดียว (SPC ในประเทศไทย)",
    "color": "#0d9488"
  },
  {
    "id": "second_line",
    "nameEn": "Second-Line & Add-on Agents",
    "nameTh": "ยากลุ่มเสริมและทางเลือก (Add-on & 2nd-Line)",
    "color": "#7c3aed"
  },
  {
    "id": "iv_crisis",
    "nameEn": "IV Emergency Crisis Agents",
    "nameTh": "ยาฉีดภาวะวิกฤตความดันโลหิต (IV Crises)",
    "color": "#e11d48"
  },
  {
    "id": "special_metabolic",
    "nameEn": "Cardiometabolic Add-ons (SGLT2i / GLP-1 RA)",
    "nameTh": "ยาเสริมกลุ่มคาร์ดิโอเมแทบอลิก (SGLT2i / GLP-1 RA)",
    "color": "#d97706"
  }
];

const drugClasses = [
  {
    "id": "acei",
    "categoryId": "first_line",
    "nameEn": "ACE Inhibitors (ACEIs)",
    "nameTh": "เอซีอี อินฮิบิเตอร์ (ACEIs)",
    "color": "#2563eb"
  },
  {
    "id": "arb",
    "categoryId": "first_line",
    "nameEn": "Angiotensin Receptor Blockers (ARBs)",
    "nameTh": "เออาร์บี (ARBs)",
    "color": "#3b82f6"
  },
  {
    "id": "arni",
    "categoryId": "second_line",
    "nameEn": "ARNI (Angiotensin Receptor-Neprilysin Inhibitor)",
    "nameTh": "เออาร์เอ็นไอ (ARNI)",
    "color": "#6366f1"
  },
  {
    "id": "dhp_ccb",
    "categoryId": "first_line",
    "nameEn": "Dihydropyridine CCBs (DHP-CCBs)",
    "nameTh": "แคลเซียมแชนแนลบล็อกเกอร์ DHP-CCB",
    "color": "#0284c7"
  },
  {
    "id": "thiazide_like",
    "categoryId": "first_line",
    "nameEn": "Thiazide & Thiazide-like Diuretics",
    "nameTh": "ไธอะไซด์และไธอะไซด์ไลค์ ไดยูเรติก",
    "color": "#059669"
  },
  {
    "id": "beta_blocker",
    "categoryId": "first_line",
    "nameEn": "Beta-Blockers (BBs)",
    "nameTh": "เบต้า บล็อกเกอร์ (BBs)",
    "color": "#4f46e5"
  },
  {
    "id": "spc_dual",
    "categoryId": "spc_combos",
    "nameEn": "Dual Single-Pill Combinations (Dual SPC)",
    "nameTh": "ยารวมเม็ด 2 ชนิด (Dual SPC)",
    "color": "#0d9488"
  },
  {
    "id": "spc_triple",
    "categoryId": "spc_combos",
    "nameEn": "Triple Single-Pill Combinations (Triple SPC)",
    "nameTh": "ยารวมเม็ด 3 ชนิด (Triple SPC)",
    "color": "#047857"
  },
  {
    "id": "mra",
    "categoryId": "second_line",
    "nameEn": "MRAs (Aldosterone Antagonists)",
    "nameTh": "เอ็มอาร์เอ (ยาต้านอัลโดสเตอโรน)",
    "color": "#7c3aed"
  },
  {
    "id": "non_dhp_ccb",
    "categoryId": "second_line",
    "nameEn": "Non-Dihydropyridine CCBs",
    "nameTh": "นอน-ไดไฮโดรไพริดีน CCBs",
    "color": "#8b5cf6"
  },
  {
    "id": "loop_diuretic",
    "categoryId": "second_line",
    "nameEn": "Loop Diuretics",
    "nameTh": "ลูป ไดยูเรติก",
    "color": "#10b981"
  },
  {
    "id": "alpha_blocker",
    "categoryId": "second_line",
    "nameEn": "Alpha-1 Blockers",
    "nameTh": "อัลฟา-1 บล็อกเกอร์",
    "color": "#9333ea"
  },
  {
    "id": "central_agonist",
    "categoryId": "second_line",
    "nameEn": "Centrally Acting Agents",
    "nameTh": "ยาออกฤทธิ์ต่อระบบประสาทส่วนกลาง",
    "color": "#a855f7"
  },
  {
    "id": "direct_vasodilator",
    "categoryId": "second_line",
    "nameEn": "Direct Vasodilators",
    "nameTh": "ยาขยายหลอดเลือดโดยตรง (Direct Vasodilators)",
    "color": "#c026d3"
  },
  {
    "id": "iv_crisis_class",
    "categoryId": "iv_crisis",
    "nameEn": "Parenteral / IV Antihypertensives",
    "nameTh": "ยาลดความดันชนิดฉีดหลอดเลือดดำ",
    "color": "#e11d48"
  },
  {
    "id": "metabolic_class",
    "categoryId": "special_metabolic",
    "nameEn": "SGLT2i & GLP-1 RA Add-ons",
    "nameTh": "ยาลดน้ำตาลที่มีผลลดความดันและปกป้องหัวใจไต",
    "color": "#d97706"
  }
];

const drugsData = [
  {
    "id": "enalapril",
    "genericName": "Enalapril maleate",
    "nameEn": "Enalapril",
    "nameTh": "อีนาลาพริล",
    "brandNames": [
      "Renitec",
      "Enaril",
      "Anapril",
      "Enalapril GPO"
    ],
    "classId": "acei",
    "classNameEn": "ACE Inhibitor",
    "classNameTh": "เอซีอี อินฮิบิเตอร์ (ACEI)",
    "formType": "tablet_scored_round",
    "color": "#2563eb",
    "strengths": [
      "5 mg",
      "20 mg"
    ],
    "startDose": "5 mg OD (2.5 mg OD in elderly, CKD, or volume depleted)",
    "startDoseTh": "5 มก. วันละ 1 ครั้ง (2.5 มก. ในผู้สูงอายุ โรคไต หรือได้รับยาขับปัสสาวะ)",
    "maintenanceDose": "10 - 20 mg OD or divided BID",
    "maintenanceDoseTh": "10 - 20 มก. วันละ 1 ครั้ง หรือแบ่งวันละ 2 ครั้ง",
    "maxDose": "40 mg/day",
    "maxDoseTh": "40 มก./วัน",
    "frequency": "OD or BID",
    "costLevel": null,
    "nlem": true,
    "nlemCode": "b",
    "thaiGuidelineClass": "Class I, Level A (Table 12: one of the 5 first-line classes)",
    "compellingIndications": [
      "CAD",
      "HFrEF",
      "CKD_alb",
      "Stroke",
      "DM"
    ],
    "pregnancyRisk": "contraindicated",
    "heartRateEffect": "neutral",
    "potassiumEffect": "increases",
    "mechanism": "Inhibits Angiotensin Converting Enzyme (ACE), blocking conversion of Angiotensin I to Angiotensin II; reduces aldosterone secretion and increases bradykinin.",
    "mechanismTh": "ยับยั้งเอนไซม์ ACE ลดการเปลี่ยน Angiotensin I เป็น Angiotensin II ส่งผลให้หลอดเลือดขยายตัว ลดการหลั่ง aldosterone และชะลอการสลาย bradykinin",
    "renalAdjustment": {
      "minEgfrSafe": 15,
      "cutoff": 30,
      "textEn": "CrCl 30-80: Start 5 mg/d; CrCl < 30: Start 2.5 mg/d. Titrate cautiously. Accept up to 30% rise in Cr within 4 weeks.",
      "textTh": "eGFR 30-80: เริ่ม 5 มก./วัน; eGFR < 30: เริ่ม 2.5 มก./วัน ค่อยๆ ปรับขนาดยา ยอมรับค่า Cr เพิ่มขึ้นได้ไม่เกิน 30% ภายใน 4 สัปดาห์"
    },
    "hepaticAdjustment": {
      "textEn": "Enalapril is a prodrug hydrolyzed to enalaprilat in liver. Slower activation in severe liver disease but usually no dose reduction needed.",
      "textTh": "เป็น prodrug ต้องผ่านตับเปลี่ยนเป็น enalaprilat ในตับวายรุนแรงการออกฤทธิ์อาจช้าลง แต่โดยทั่วไปไม่ต้องปรับขนาดยา"
    },
    "contraindications": {
      "absolute": [
        "History of ACEI-associated angioedema",
        "Hereditary or idiopathic angioedema",
        "Pregnancy (2nd/3rd trimester: fetotoxicity)",
        "Bilateral renal artery stenosis (or stenosis in solitary kidney)",
        "Concomitant use with Sacubitril/Valsartan (wait 36h)"
      ],
      "relative": [
        "Severe aortic stenosis",
        "Baseline Serum K+ > 5.0 mEq/L",
        "eGFR < 15 mL/min/1.73m2"
      ]
    },
    "sideEffects": {
      "common": [
        "Dry cough (5-20%, bradykinin-mediated)",
        "Dizziness / Orthostatic hypotension",
        "Hyperkalemia",
        "Headache"
      ],
      "serious": [
        "Angioedema (life-threatening airway compromise)",
        "Acute Kidney Injury (esp. bilateral RAS, dehydration)",
        "Neutropenia (rare)"
      ]
    },
    "precautions": [
      "Check Serum Creatinine and K+ within 2-4 weeks after initiation or dose titration.",
      "Stop medication and seek emergency care immediately if facial, lip, tongue, or throat swelling occurs.",
      "Avoid NSAIDs (blunts antihypertensive effect and increases AKI risk)."
    ],
    "drugInteractions": [
      "NEVER combine with ARB or Direct Renin Inhibitor (Class III, Level A - excessive risk of AKI & hyperkalemia).",
      "Washout period of 36 hours required before initiating Sacubitril/Valsartan (ARNI).",
      "Potassium-sparing diuretics & K-supplements: High risk of severe hyperkalemia.",
      "Lithium: Increases lithium toxicity."
    ],
    "patientCounseling": {
      "en": "Take with or without food once daily in the morning. If persistent dry tickling cough occurs, contact your doctor (may switch to ARB). Report any swelling of lips, eyes, or breathing difficulty immediately.",
      "th": "รับประทานยาวันละ 1 ครั้ง ตอนเช้าพร้อมหรือหลังอาหาร หากมีอาการไอแห้งต่อเนื่องเป็นประจำให้ปรึกษาแพทย์เพื่อเปลี่ยนเป็นกลุ่ม ARB หากมีอาการบวมที่ริมฝีปาก ใบหน้า หรือหายใจลำบากให้หยุดยาทันทีและไปห้องฉุกเฉิน"
    },
    "nlemNoteEn": null,
    "nlemNoteTh": null,
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ระดับ I, หลักฐาน A (ตารางที่ 12: ยา 5 กลุ่มหลัก)",
    "label": {
      "name": "Vasotec (US label)",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=39631f1f-5d19-43c1-b504-bf56d991ed97"
    }
  },
  {
    "id": "ramipril",
    "genericName": "Ramipril",
    "nameEn": "Ramipril",
    "nameTh": "รามิพริล",
    "brandNames": [
      "Tritace",
      "Cardace",
      "Ramace"
    ],
    "classId": "acei",
    "classNameEn": "ACE Inhibitor",
    "classNameTh": "เอซีอี อินฮิบิเตอร์ (ACEI)",
    "formType": "tablet_scored_round",
    "color": "#2563eb",
    "strengths": [
      "2.5 mg",
      "5 mg",
      "10 mg"
    ],
    "startDose": "2.5 mg OD (1.25 mg OD in high-risk/elderly/CKD)",
    "startDoseTh": "2.5 มก. วันละ 1 ครั้ง (1.25 มก. ในกลุ่มเสี่ยงสูง/ผู้สูงอายุ/ไตวาย)",
    "maintenanceDose": "5 - 10 mg OD",
    "maintenanceDoseTh": "5 - 10 มก. วันละ 1 ครั้ง",
    "maxDose": "10 mg/day in EU SmPC (US label allows 20 mg/day)",
    "maxDoseTh": "10 มก./วัน ตาม SmPC ยุโรป (ฉลากสหรัฐฯ สูงสุด 20 มก./วัน)",
    "frequency": "OD",
    "costLevel": null,
    "nlem": false,
    "nlemCode": null,
    "thaiGuidelineClass": "Class I, Level A (Table 12: one of the 5 first-line classes)",
    "compellingIndications": [
      "CAD",
      "HFrEF",
      "CKD_alb",
      "Stroke",
      "DM"
    ],
    "pregnancyRisk": "contraindicated",
    "heartRateEffect": "neutral",
    "potassiumEffect": "increases",
    "mechanism": "Long-acting prodrug converted to ramiprilat, a potent competitive inhibitor of ACE; demonstrated strong cardioprotective & nephroprotective outcomes.",
    "mechanismTh": "Long-acting ACE inhibitor เปลี่ยนเป็น ramiprilat ออกฤทธิ์ยับยั้งระบบ RAAS มีหลักฐานทางคลินิกเด่นชัดในการลดการเสียชีวิตและภาวะแทรกซ้อนหลอดเลือดหัวใจ (HOPE Trial)",
    "renalAdjustment": {
      "minEgfrSafe": 15,
      "cutoff": 40,
      "textEn": "CrCl < 40 mL/min: Start 1.25 mg OD, max 5 mg/day.",
      "textTh": "eGFR < 40: เริ่ม 1.25 มก. วันละครั้ง ขนาดยาสูงสุดไม่เกิน 5 มก./วัน"
    },
    "hepaticAdjustment": {
      "textEn": "Metabolism impaired in hepatic dysfunction; monitor closely.",
      "textTh": "การเปลี่ยนเป็น active metabolite ในตับลดลง ติดตามการตอบสนองอย่างใกล้ชิด"
    },
    "contraindications": {
      "absolute": [
        "History of ACEI angioedema",
        "Pregnancy",
        "Bilateral renal artery stenosis",
        "Concurrent ARNI (wait 36h)"
      ],
      "relative": [
        "Severe aortic stenosis",
        "Baseline Serum K+ > 5.0 mEq/L"
      ]
    },
    "sideEffects": {
      "common": [
        "Dry cough",
        "Dizziness",
        "Hypotension",
        "Hyperkalemia"
      ],
      "serious": [
        "Angioedema",
        "Acute Kidney Failure"
      ]
    },
    "precautions": [
      "Monitor renal function and serum K+ within 2-4 weeks."
    ],
    "drugInteractions": [
      "Avoid ARBs, direct renin inhibitors, potassium supplements, NSAIDs."
    ],
    "patientCounseling": {
      "en": "Take once daily in the morning with a glass of water. Swallow whole or may open capsule. Report unexplained cough or facial swelling.",
      "th": "รับประทานวันละ 1 ครั้งตอนเช้า กลืนทั้งเม็ดพร้อมน้ำ แจ้งแพทย์หากมีอาการไอแห้งรบกวน หรือมีผื่นบวมรอบปาก"
    },
    "nlemNoteEn": null,
    "nlemNoteTh": null,
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ระดับ I, หลักฐาน A (ตารางที่ 12: ยา 5 กลุ่มหลัก)",
    "label": {
      "name": "Ramipril capsules, Aurobindo (US label)",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d6d57158-e8f9-4c91-8317-0374e0c87d33"
    }
  },
  {
    "id": "perindopril",
    "genericName": "Perindopril arginine / erbumine",
    "nameEn": "Perindopril",
    "nameTh": "เพอรินโดพริล",
    "brandNames": [
      "Coversyl",
      "Perindopril Servier"
    ],
    "classId": "acei",
    "classNameEn": "ACE Inhibitor",
    "classNameTh": "เอซีอี อินฮิบิเตอร์ (ACEI)",
    "formType": "tablet_scored_round",
    "color": "#2563eb",
    "strengths": [
      "5 mg",
      "10 mg"
    ],
    "startDose": "5 mg OD in the morning (2.5 mg OD in elderly or CKD)",
    "startDoseTh": "5 มก. วันละ 1 ครั้งตอนเช้า (2.5 มก. ในผู้สูงอายุหรือโรคไต)",
    "maintenanceDose": "5 - 10 mg OD",
    "maintenanceDoseTh": "5 - 10 มก. วันละ 1 ครั้ง",
    "maxDose": "10 mg/day (arginine) or 8 mg/day (erbumine)",
    "maxDoseTh": "10 มก./วัน (arginine)",
    "frequency": "OD morning",
    "costLevel": null,
    "nlem": false,
    "nlemCode": null,
    "thaiGuidelineClass": "Class I, Level A (Table 12: one of the 5 first-line classes)",
    "compellingIndications": [
      "CAD",
      "HFrEF",
      "Stroke",
      "DM",
      "CKD_alb"
    ],
    "pregnancyRisk": "contraindicated",
    "heartRateEffect": "neutral",
    "potassiumEffect": "increases",
    "mechanism": "High tissue-affinity ACE inhibitor providing sustained 24-hour BP control, endothelial protection, and pulse wave velocity reduction.",
    "mechanismTh": "ACE inhibitor ที่มี tissue ACE affinity สูง ออกฤทธิ์คุมความดันโลหิตสม่ำเสมอตลอด 24 ชม. และลดความแข็งตัวของหลอดเลือดแดง",
    "renalAdjustment": {
      "minEgfrSafe": 15,
      "cutoff": 30,
      "textEn": "CrCl 30-60: 2.5 mg/d; CrCl 15-30: 2.5 mg every other day; CrCl < 15: 2.5 mg on dialysis days.",
      "textTh": "eGFR 30-60: 2.5 มก./วัน; eGFR 15-30: 2.5 มก. วันเว้นวัน; eGFR < 15: 2.5 มก. เฉพาะวันที่ฟอกไต"
    },
    "hepaticAdjustment": {
      "textEn": "No dosage adjustment required in hepatic impairment.",
      "textTh": "ไม่ต้องปรับขนาดยาในผู้ป่วยตับบกพร่อง"
    },
    "contraindications": {
      "absolute": [
        "History of ACEI angioedema",
        "Pregnancy",
        "Bilateral renal artery stenosis",
        "Concurrent ARNI"
      ],
      "relative": [
        "Hyperkalemia > 5.0 mEq/L"
      ]
    },
    "sideEffects": {
      "common": [
        "Cough",
        "Headache",
        "Dizziness",
        "Paresthesia"
      ],
      "serious": [
        "Angioedema",
        "AKI"
      ]
    },
    "precautions": [
      "Take before breakfast for consistent absorption."
    ],
    "drugInteractions": [
      "Dual RAS blockade contraindicated.",
      "Potassium supplements, NSAIDs."
    ],
    "patientCounseling": {
      "en": "Take in the morning before food. Do not skip doses. Report dry cough or facial swelling.",
      "th": "รับประทานก่อนอาหารเช้าเป็นประจำทุกวัน สังเกตอาการไอแห้งหรือริมฝีปากบวม"
    },
    "nlemNoteEn": null,
    "nlemNoteTh": null,
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ระดับ I, หลักฐาน A (ตารางที่ 12: ยา 5 กลุ่มหลัก)",
    "label": {
      "name": "Perindopril erbumine, Aurobindo (US label)",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=87768fbf-7c63-47da-8925-0316f343d6ef"
    }
  },
  {
    "id": "losartan",
    "genericName": "Losartan potassium",
    "nameEn": "Losartan",
    "nameTh": "โลซาร์แทน",
    "brandNames": [
      "Cozaar",
      "Losartan GPO",
      "Lanzaar",
      "Tanzaan"
    ],
    "classId": "arb",
    "classNameEn": "Angiotensin Receptor Blocker (ARB)",
    "classNameTh": "เออาร์บี (ARB)",
    "formType": "tablet_oblong",
    "color": "#3b82f6",
    "strengths": [
      "50 mg",
      "100 mg"
    ],
    "startDose": "50 mg OD (25 mg OD in elderly or volume depletion)",
    "startDoseTh": "50 มก. วันละ 1 ครั้ง (25 มก. ในผู้สูงอายุหรือภาวะขาดน้ำ)",
    "maintenanceDose": "50 - 100 mg OD (or 50 mg BID)",
    "maintenanceDoseTh": "50 - 100 มก. วันละ 1 ครั้ง (หรือ 50 มก. วันละ 2 ครั้ง)",
    "maxDose": "100 mg/day",
    "maxDoseTh": "100 มก./วัน",
    "frequency": "OD or BID",
    "costLevel": null,
    "nlem": true,
    "nlemCode": "b",
    "thaiGuidelineClass": "Class I, Level A (Table 12: one of the 5 first-line classes)",
    "compellingIndications": [
      "CAD",
      "HFrEF",
      "CKD_alb",
      "Stroke",
      "DM",
      "Gout_Hyperuricemia"
    ],
    "pregnancyRisk": "contraindicated",
    "heartRateEffect": "neutral",
    "potassiumEffect": "increases",
    "mechanism": "Selective, competitive AT1 receptor antagonist. Unique among ARBs: exerts mild uricosuric effect (lowers serum uric acid, beneficial in gout/hyperuricemia). Does not affect bradykinin, rarely causes cough.",
    "mechanismTh": "ยับยั้งตัวรับ AT1 อย่างเจาะจง มีฤทธิ์พิเศษในการขับกรดยูริกออกทางปัสสาวะ (uricosuric effect) เหมาะกับผู้ป่วยความดันโลหิตสูงที่มีกรดยูริกสูงหรือเกาต์ร่วม ไม่เพิ่ม bradykinin จึงแทบไม่ก่อให้เกิดอาการไอแห้ง",
    "renalAdjustment": {
      "minEgfrSafe": 15,
      "cutoff": 20,
      "textEn": "No initial dose adjustment for mild-moderate renal impairment. Cautious monitoring if eGFR < 30 mL/min.",
      "textTh": "ไม่ต้องปรับขนาดเริ่มต้นในโรคไตระดับเล็กน้อยถึงปานกลาง ติดตามค่า Cr และ K+ สม่ำเสมอหาก eGFR < 30"
    },
    "hepaticAdjustment": {
      "textEn": "Start with 25 mg OD in patients with history of hepatic impairment.",
      "textTh": "ผู้ป่วยตับบกพร่องให้เริ่มต้นที่ 25 มก. วันละ 1 ครั้ง"
    },
    "contraindications": {
      "absolute": [
        "Pregnancy (Class X / Fetotoxicity)",
        "Bilateral renal artery stenosis",
        "Concurrent Aliskiren in DM/CKD"
      ],
      "relative": [
        "Severe hyperkalemia (K+ > 5.5 mEq/L)",
        "Severe volume contraction"
      ]
    },
    "sideEffects": {
      "common": [
        "Dizziness",
        "Nasal congestion",
        "Back pain",
        "Mild hyperkalemia"
      ],
      "serious": [
        "Angioedema (much rarer than ACEI, <0.1%)",
        "Acute renal dysfunction"
      ]
    },
    "precautions": [
      "Excellent first-line substitute for patients who develop dry cough on ACEIs."
    ],
    "drugInteractions": [
      "Do NOT combine with ACEIs. K-sparing diuretics increase hyperkalemia risk."
    ],
    "patientCounseling": {
      "en": "Take once daily at the same time every day. Drink adequate water. Avoid salt substitutes containing potassium without consulting physician.",
      "th": "รับประทานวันละ 1 ครั้งเวลาเดียวกันทุกวัน ไม่ต้องกังวลเรื่องไอแห้ง หลีกเลี่ยงเกลือโซเดียมต่ำที่ผสมโพแทสเซียมสูงโดยไม่ได้ปรึกษาแพทย์"
    },
    "nlemNoteEn": "Only 50 and 100 mg; for patients who cannot take an ACE inhibitor because of its side effects",
    "nlemNoteTh": "เฉพาะ 50 และ 100 มก. ใช้กับผู้ป่วยที่ใช้ยากลุ่ม ACEI ไม่ได้เนื่องจากอาการไม่พึงประสงค์",
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ระดับ I, หลักฐาน A (ตารางที่ 12: ยา 5 กลุ่มหลัก)",
    "label": {
      "name": "Cozaar (US label)",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9949448f-c3b9-44ee-94ed-c1aca8c90f39"
    }
  },
  {
    "id": "valsartan",
    "genericName": "Valsartan",
    "nameEn": "Valsartan",
    "nameTh": "วาลซาร์แทน",
    "brandNames": [
      "Diovan",
      "Valpress",
      "Valsan"
    ],
    "classId": "arb",
    "classNameEn": "Angiotensin Receptor Blocker (ARB)",
    "classNameTh": "เออาร์บี (ARB)",
    "formType": "tablet_oblong",
    "color": "#3b82f6",
    "strengths": [
      "80 mg",
      "160 mg",
      "320 mg"
    ],
    "startDose": "80 mg OD (40 mg OD in elderly or volume depletion)",
    "startDoseTh": "80 มก. วันละ 1 ครั้ง (40 มก. ในผู้สูงอายุหรือขาดน้ำ)",
    "maintenanceDose": "80 - 160 mg OD",
    "maintenanceDoseTh": "80 - 160 มก. วันละ 1 ครั้ง",
    "maxDose": "320 mg/day",
    "maxDoseTh": "320 มก./วัน",
    "frequency": "OD",
    "costLevel": null,
    "nlem": false,
    "nlemCode": null,
    "thaiGuidelineClass": "Class I, Level A (Table 12: one of the 5 first-line classes)",
    "compellingIndications": [
      "HFrEF",
      "CAD",
      "Stroke",
      "DM",
      "CKD_alb"
    ],
    "pregnancyRisk": "contraindicated",
    "heartRateEffect": "neutral",
    "potassiumEffect": "increases",
    "mechanism": "Potent non-peptide AT1 receptor blocker with extensive clinical trial evidence in post-MI and heart failure.",
    "mechanismTh": "ยับยั้งตัวรับ AT1 อย่างเจาะจง มีหลักฐานการศึกษาระดับโลกในภาวะหัวใจล้มเหลวและหลังกล้ามเนื้อหัวใจขาดเลือดเฉียบพลัน",
    "renalAdjustment": {
      "minEgfrSafe": 15,
      "cutoff": 30,
      "textEn": "No initial dose adjustment for CrCl >= 10 mL/min.",
      "textTh": "ไม่ต้องปรับขนาดยาเริ่มต้นหาก eGFR >= 10 มล./นาที"
    },
    "hepaticAdjustment": {
      "textEn": "Do not exceed 80 mg/day in mild to moderate hepatic impairment; contraindicated in severe cirrhosis/biliary obstruction.",
      "textTh": "ตับบกพร่องเล็กน้อยถึงปานกลางไม่ควรเกิน 80 มก./วัน ห้ามใช้ในตับแข็งรุนแรง"
    },
    "contraindications": {
      "absolute": [
        "Pregnancy",
        "Severe hepatic impairment / biliary cirrhosis",
        "Bilateral renal artery stenosis"
      ],
      "relative": [
        "Hyperkalemia > 5.5 mEq/L"
      ]
    },
    "sideEffects": {
      "common": [
        "Headache",
        "Dizziness",
        "Fatigue"
      ],
      "serious": [
        "Hyperkalemia",
        "Hypotension in volume depleted"
      ]
    },
    "precautions": [
      "Monitor potassium and renal function periodically."
    ],
    "drugInteractions": [
      "Avoid ACEI combination. Monitor lithium levels."
    ],
    "patientCounseling": {
      "en": "Take once daily in the morning with water. Maintain adequate hydration.",
      "th": "รับประทานวันละ 1 ครั้งตอนเช้าอย่างสม่ำเสมอ"
    },
    "nlemNoteEn": null,
    "nlemNoteTh": null,
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ระดับ I, หลักฐาน A (ตารางที่ 12: ยา 5 กลุ่มหลัก)",
    "label": {
      "name": "Diovan (US label)",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5ddba454-f3e6-43c2-a7a6-58365d297213"
    }
  },
  {
    "id": "telmisartan",
    "genericName": "Telmisartan",
    "nameEn": "Telmisartan",
    "nameTh": "เทลมิซาร์แทน",
    "brandNames": [
      "Micardis",
      "Telma",
      "Telsar"
    ],
    "classId": "arb",
    "classNameEn": "Angiotensin Receptor Blocker (ARB)",
    "classNameTh": "เออาร์บี (ARB)",
    "formType": "tablet_oblong",
    "color": "#3b82f6",
    "strengths": [
      "40 mg",
      "80 mg"
    ],
    "startDose": "40 mg OD (hepatic impairment: start low, titrate slowly)",
    "startDoseTh": "40 มก. วันละ 1 ครั้ง (ตับบกพร่อง: เริ่มขนาดต่ำและปรับช้า ๆ)",
    "maintenanceDose": "40 - 80 mg OD",
    "maintenanceDoseTh": "40 - 80 มก. วันละ 1 ครั้ง",
    "maxDose": "80 mg/day",
    "maxDoseTh": "80 มก./วัน",
    "frequency": "OD",
    "costLevel": null,
    "nlem": false,
    "nlemCode": null,
    "thaiGuidelineClass": "Class I, Level A (Table 12: one of the 5 first-line classes)",
    "compellingIndications": [
      "CAD",
      "Stroke",
      "DM",
      "CKD_alb",
      "Metabolic_Syndrome"
    ],
    "pregnancyRisk": "contraindicated",
    "heartRateEffect": "neutral",
    "potassiumEffect": "increases",
    "mechanism": "Longest half-life (~24 hours) among all ARBs providing excellent morning BP surge suppression; partial PPAR-gamma agonist activity enhancing insulin sensitivity and lipid metabolism.",
    "mechanismTh": "มีค่าครึ่งชีวิตยาวนานที่สุดในกลุ่ม ARB (ประมาณ 24 ชม.) จึงคุมความดันช่วงเช้าตรู่ (morning BP surge) ได้ดีเยี่ยม และมีฤทธิ์กระตุ้น PPAR-gamma บางส่วน ช่วยเพิ่มความไวต่ออินซูลินและเมแทบอลิซึมของไขมัน",
    "renalAdjustment": {
      "minEgfrSafe": 15,
      "cutoff": 15,
      "textEn": "Excreted almost exclusively via biliary/fecal route (98%). No dose adjustment required in renal impairment, including ESRD/hemodialysis.",
      "textTh": "ขับออกทางถุงน้ำดีและอุจจาระถึง 98% จึงไม่ต้องปรับขนาดยาในผู้ป่วยโรคไตเรื้อรัง รวมถึงผู้ป่วยฟอกไต (ไตปลอดภัยสูง)"
    },
    "hepaticAdjustment": {
      "textEn": "Do not exceed 40 mg once daily in mild-to-moderate hepatic impairment. Contraindicated in severe biliary obstruction.",
      "textTh": "ตับบกพร่องเล็กน้อยถึงปานกลางไม่ควรเกิน 40 มก./วัน ห้ามใช้ในท่อน้ำดีอุดตันรุนแรง"
    },
    "contraindications": {
      "absolute": [
        "Pregnancy",
        "Biliary obstructive disorders / severe hepatic impairment",
        "Bilateral renal artery stenosis"
      ],
      "relative": [
        "Hyperkalemia > 5.5 mEq/L"
      ]
    },
    "sideEffects": {
      "common": [
        "Dizziness",
        "Sinusitis",
        "Diarrhea",
        "Back pain"
      ],
      "serious": [
        "Hyperkalemia",
        "Symptomatic hypotension"
      ]
    },
    "precautions": [
      "Keep in blister pack until immediately before ingestion due to hygroscopic nature."
    ],
    "drugInteractions": [
      "Digoxin: may increase digoxin peak plasma levels by 20%.",
      "NSAIDs, ACEIs."
    ],
    "patientCounseling": {
      "en": "Take once daily with or without food. Do not push tablet out of blister foil until ready to swallow (absorbs moisture from air).",
      "th": "รับประทานวันละ 1 ครั้งตอนเช้า อย่าแกะเม็ดยาออกจากแผงฟอยล์ทิ้งไว้ล่วงหน้าเพราะเม็ดยาดูดความชื้นได้ง่าย"
    },
    "nlemNoteEn": null,
    "nlemNoteTh": null,
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ระดับ I, หลักฐาน A (ตารางที่ 12: ยา 5 กลุ่มหลัก)",
    "label": {
      "name": "Telmisartan tablets (US label)",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=dd2b0604-f887-40d9-9109-dafcc9987e4e"
    }
  },
  {
    "id": "sacubitril_valsartan",
    "genericName": "Sacubitril / Valsartan",
    "nameEn": "Sacubitril/Valsartan (ARNI)",
    "nameTh": "ซาคิวบิทริล / วาลซาร์แทน (ARNI)",
    "brandNames": [
      "Entresto"
    ],
    "classId": "arni",
    "classNameEn": "ARNI (Neprilysin Inhibitor + ARB)",
    "classNameTh": "เออาร์เอ็นไอ (ARNI)",
    "formType": "tablet_oblong",
    "color": "#6366f1",
    "strengths": [
      "50 mg (24/26 mg)",
      "100 mg (49/51 mg)",
      "200 mg (97/103 mg)"
    ],
    "startDose": "50 - 100 mg BID (in HT: 200 mg OD or 100 mg BID)",
    "startDoseTh": "100 มก. วันละ 1 ครั้ง หรือ 50 มก. วันละ 2 ครั้ง (ในผู้ป่วยความดันโลหิตสูง)",
    "maintenanceDose": "200 mg OD or 100 - 200 mg BID",
    "maintenanceDoseTh": "200 มก. วันละ 1 ครั้ง หรือ 100-200 มก. วันละ 2 ครั้ง",
    "maxDose": "400 mg/day (200 mg BID)",
    "maxDoseTh": "400 มก./วัน (200 มก. วันละ 2 ครั้ง)",
    "frequency": "OD or BID",
    "costLevel": null,
    "nlem": false,
    "nlemCode": null,
    "thaiGuidelineClass": "Class IIb, Level B (Table 12: instead of ACEI/ARB in resistant HT)",
    "compellingIndications": [
      "HFrEF",
      "HFpEF",
      "Resistant",
      "CAD"
    ],
    "pregnancyRisk": "contraindicated",
    "heartRateEffect": "neutral",
    "potassiumEffect": "increases",
    "mechanism": "First-in-class Angiotensin Receptor-Neprilysin Inhibitor. Sacubitril inhibits neprilysin (increasing natriuretic peptides, bradykinin, and adrenomedullin) promoting natriuresis, vasodilation, and antifibrotic remodeling, while valsartan blocks AT1 receptor.",
    "mechanismTh": "ยับยั้งเอนไซม์ neprilysin เพิ่มระดับ natriuretic peptides ขับโซเดียมและน้ำ ขยายหลอดเลือด ยับยั้ง fibrosis พร้อมกับบล็อกตัวรับ AT1 อย่างมีประสิทธิภาพ ได้รับอนุมัติในประเทศไทยทั้งข้อบ่งชี้ภาวะหัวใจล้มเหลวและความดันโลหิตสูงชนิดดื้อยา",
    "renalAdjustment": {
      "minEgfrSafe": 15,
      "cutoff": 30,
      "textEn": "eGFR < 30 mL/min/1.73m2: Start with 50 mg BID. Monitor potassium and renal function closely.",
      "textTh": "eGFR < 30: เริ่มต้นที่ 50 มก. วันละ 2 ครั้ง ตรวจติดตาม K+ และ Cr อย่างใกล้ชิด"
    },
    "hepaticAdjustment": {
      "textEn": "Moderate hepatic impairment (Child-Pugh B): Start 50 mg BID. Severe impairment (Child-Pugh C): Contraindicated.",
      "textTh": "ตับบกพร่องปานกลาง (Child-Pugh B): เริ่ม 50 มก. วันละ 2 ครั้ง; ตับบกพร่องรุนแรง (Child-Pugh C): ห้ามใช้"
    },
    "contraindications": {
      "absolute": [
        "Concurrent use of ACEI (must wait >= 36 hours after stopping ACEI before starting ARNI)",
        "History of angioedema related to ACEI/ARB",
        "Pregnancy",
        "Severe hepatic impairment"
      ],
      "relative": [
        "Baseline SBP < 100 mmHg",
        "Serum K+ > 5.4 mEq/L"
      ]
    },
    "sideEffects": {
      "common": [
        "Hypotension (especially in elderly/volume depleted)",
        "Hyperkalemia",
        "Dizziness",
        "Cough (rare)"
      ],
      "serious": [
        "Angioedema",
        "Acute Kidney Failure"
      ]
    },
    "precautions": [
      "CRITICAL: If switching from an ACE inhibitor, MUST ALLOW 36-HOUR WASHOUT PERIOD to avoid severe life-threatening angioedema.",
      "If switching from an ARB, can start ARNI immediately without washout period."
    ],
    "drugInteractions": [
      "ACE inhibitors (contraindicated / 36h rule)",
      "Potassium-sparing diuretics & K-supplements (hyperkalemia)",
      "NSAIDs"
    ],
    "patientCounseling": {
      "en": "Take twice daily with or without food. If changing from older blood pressure medicine (like enalapril), ensure at least 36 hours have passed since last dose. Watch for lightheadedness.",
      "th": "รับประทานวันละ 2 ครั้งเช้า-เย็น หากเปลี่ยนมาจากยาในกลุ่ม ACEI (เช่น enalapril) ต้องหยุดยานั้นให้ครบ 36 ชั่วโมงก่อนเริ่มยานี้ เพื่อป้องกันการแพ้รุนแรงบวมที่คอหอย"
    },
    "nlemNoteEn": null,
    "nlemNoteTh": null,
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ระดับ IIb, หลักฐาน B (ตารางที่ 12: ใช้แทน ACEI/ARB ใน resistant HT)",
    "label": {
      "name": "Entresto (US label)",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=000dc81d-ab91-450c-8eae-8eb74e72296f"
    }
  },
  {
    "id": "amlodipine",
    "genericName": "Amlodipine besylate",
    "nameEn": "Amlodipine",
    "nameTh": "แอมโลดิพีน",
    "brandNames": [
      "Norvasc",
      "Amcard",
      "Amlopin",
      "Cardilox"
    ],
    "classId": "dhp_ccb",
    "classNameEn": "Dihydropyridine CCB (DHP-CCB)",
    "classNameTh": "แคลเซียมแชนแนลบล็อกเกอร์ DHP",
    "formType": "tablet_scored_round",
    "color": "#0284c7",
    "strengths": [
      "5 mg",
      "10 mg"
    ],
    "startDose": "5 mg OD (2.5 mg OD in elderly, frail, or hepatic impairment)",
    "startDoseTh": "5 มก. วันละ 1 ครั้ง (2.5 มก. ในผู้สูงอายุ ผู้ป่วยผอมเปราะบาง หรือตับบกพร่อง)",
    "maintenanceDose": "5 - 10 mg OD",
    "maintenanceDoseTh": "5 - 10 มก. วันละ 1 ครั้ง",
    "maxDose": "10 mg/day",
    "maxDoseTh": "10 มก./วัน",
    "frequency": "OD",
    "costLevel": null,
    "nlem": true,
    "nlemCode": "b",
    "thaiGuidelineClass": "Class I, Level A (Table 12: one of the 5 first-line classes)",
    "compellingIndications": [
      "CAD",
      "ISH",
      "Stroke",
      "DM",
      "PAD",
      "Kidney_Transplant"
    ],
    "pregnancyRisk": "caution",
    "heartRateEffect": "neutral",
    "potassiumEffect": "neutral",
    "mechanism": "Potent peripheral arterial vasodilator via selective blockade of L-type calcium channels on vascular smooth muscle; long elimination half-life (35-50h) ensures smooth 24-hour BP control.",
    "mechanismTh": "ยับยั้งช่องแคลเซียมชนิด L-type ในกล้ามเนื้อเรียบของผนังหลอดเลือดแดงอย่างเจาะจง มีค่าครึ่งชีวิตยาวนาน (35-50 ชม.) คุมความดันได้สม่ำเสมอราบเรียบ ไม่ทำให้หัวใจเต้นเร็วผิดปกติ",
    "renalAdjustment": {
      "minEgfrSafe": 0,
      "cutoff": 0,
      "textEn": "No dosage adjustment required in any stage of CKD or hemodialysis. Not dialyzable.",
      "textTh": "ไม่ต้องปรับขนาดยาในทุกระยะของโรคไตเรื้อรังรวมถึงผู้ป่วยฟอกเลือดด้วยเครื่องไตเทียม ปลอดภัยสูงต่อไต"
    },
    "hepaticAdjustment": {
      "textEn": "Extensively metabolized by liver. Start at 2.5 mg once daily in hepatic impairment.",
      "textTh": "ขับผ่านตับเป็นหลัก ผู้ป่วยโรคตับควรเริ่มที่ขนาด 2.5 มก. วันละ 1 ครั้ง"
    },
    "contraindications": {
      "absolute": [
        "Severe hypotension (SBP < 90 mmHg)",
        "Cardiogenic shock",
        "Known hypersensitivity to dihydropyridines"
      ],
      "relative": [
        "Severe aortic stenosis",
        "Pre-existing severe peripheral ankle edema"
      ]
    },
    "sideEffects": {
      "common": [
        "Dependent pedal edema (dose-dependent, 5-10% at 10mg; vasodilation transudate, NOT fluid overload)",
        "Flushing",
        "Headache",
        "Gingival hyperplasia (long-term)"
      ],
      "serious": [
        "Severe reflex tachycardia / palpitations (uncommon)",
        "Worsening angina (rare at start)"
      ]
    },
    "precautions": [
      "Pedal edema is due to precapillary arteriolar vasodilation; it responds poorly to diuretics but is reversed by adding an ACEI or ARB (which dilates post-capillary venules).",
      "Preferred CCB post kidney transplant to counteract calcineurin inhibitor vasoconstriction."
    ],
    "drugInteractions": [
      "Simvastatin: Limit simvastatin dose to maximum 20 mg/day when co-administered with amlodipine (CYP3A4 inhibition increases statin toxicity/myopathy).",
      "Cyclosporine & Tacrolimus: May increase blood levels; monitor levels."
    ],
    "patientCounseling": {
      "en": "Take once daily morning or evening. You may notice mild swelling around ankles; this is harmless and not kidney failure. Elevate feet when sitting.",
      "th": "รับประทานวันละ 1 ครั้ง สม่ำเสมอ หากมีอาการข้อเท้าบวมเล็กน้อยเกิดจากการขยายตัวของหลอดเลือด ไม่ใช่ไตวายและไม่ใช่การคั่งน้ำ การนอนยกขาสูงจะช่วยบรรเทาได้ หากบวมมากให้ปรึกษาแพทย์เพื่อเพิ่มยาในกลุ่ม ACEI/ARB ช่วยลดอาการบวม"
    },
    "nlemNoteEn": null,
    "nlemNoteTh": null,
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ระดับ I, หลักฐาน A (ตารางที่ 12: ยา 5 กลุ่มหลัก)",
    "label": {
      "name": "Norvasc (US label)",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=abd6a2ca-40c2-485c-bc53-db1c652505ed"
    }
  },
  {
    "id": "nifedipine_cr",
    "genericName": "Nifedipine GITS / CR",
    "nameEn": "Nifedipine CR/GITS",
    "nameTh": "นิเฟดิพีน ซีอาร์/จิทส์",
    "brandNames": [
      "Adalat CC",
      "Adalat GITS",
      "Nifecard XL"
    ],
    "classId": "dhp_ccb",
    "classNameEn": "Dihydropyridine CCB (DHP-CCB)",
    "classNameTh": "แคลเซียมแชนแนลบล็อกเกอร์ DHP",
    "formType": "tablet_scored_round",
    "color": "#0284c7",
    "strengths": [
      "20 mg",
      "30 mg",
      "60 mg"
    ],
    "startDose": "20 - 30 mg OD",
    "startDoseTh": "20 - 30 มก. วันละ 1 ครั้ง",
    "maintenanceDose": "30 - 60 mg OD",
    "maintenanceDoseTh": "30 - 60 มก. วันละ 1 ครั้ง",
    "maxDose": "90 mg/day (or up to 120 mg/day in severe refractory HT)",
    "maxDoseTh": "90 - 120 มก./วัน",
    "frequency": "OD",
    "costLevel": null,
    "nlem": true,
    "nlemCode": "ex",
    "thaiGuidelineClass": "Class I, Level A (Table 12: one of the 5 first-line classes)",
    "compellingIndications": [
      "Pregnancy",
      "CAD",
      "ISH",
      "Raynaud_Phenomenon"
    ],
    "pregnancyRisk": "safe_first_line",
    "heartRateEffect": "neutral",
    "potassiumEffect": "neutral",
    "mechanism": "Controlled-release osmotic pump formulation delivering steady zero-order release of nifedipine over 24 hours. Proven safe and effective in pregnancy-induced hypertension and preeclampsia.",
    "mechanismTh": "ระบบควบคุมการปลดปล่อยยาแบบออสโมติก (GITS/CR) ออกฤทธิ์สม่ำเสมอ 24 ชม. เป็นยาขนานแรกที่ปลอดภัยและแนะนำในสตรีตั้งครรภ์ที่มีความดันโลหิตสูง",
    "renalAdjustment": {
      "minEgfrSafe": 0,
      "cutoff": 0,
      "textEn": "No dosage adjustment required in renal impairment.",
      "textTh": "ไม่ต้องปรับขนาดยาในผู้ป่วยโรคไต"
    },
    "hepaticAdjustment": {
      "textEn": "Dose reduction needed in severe liver cirrhosis.",
      "textTh": "ปรับลดขนาดยาในตับแข็งรุนแรง"
    },
    "contraindications": {
      "absolute": [
        "NEVER USE SHORT-ACTING SUBLINGUAL NIFEDIPINE in acute stroke or hypertensive crisis (Class III, Level C - risk of catastrophic stroke/MI)",
        "Cardiogenic shock"
      ],
      "relative": [
        "Gastrointestinal severe narrowing / obstruction (insoluble shell tablet)"
      ]
    },
    "sideEffects": {
      "common": [
        "Peripheral edema",
        "Headache",
        "Flushing",
        "Constipation"
      ],
      "serious": [
        "Reflex tachycardia (rare with CR formulation)"
      ]
    },
    "precautions": [
      "STRICT WARNING: Short-acting nifedipine capsule bitten or sublingual is DANGEROUS and CONTRAINDICATED in acute stroke / hypertensive crises.",
      "Swallow tablet whole with liquid; do not chew, crush, or divide. Insoluble tablet shell may appear in stool."
    ],
    "drugInteractions": [
      "Grapefruit juice increases serum concentrations; avoid."
    ],
    "patientCounseling": {
      "en": "Swallow whole with water. Do NOT crush, bite, or chew. The empty outer shell may sometimes be seen in the stool; this is normal as medication has been absorbed.",
      "th": "กลืนทั้งเม็ดพร้อมน้ำ ห้ามเคี้ยว บด หรือหักเม็ดยาเด็ดขาด เปลือกเม็ดยาที่ไม่ละลายอาจปนออกมากับอุจจาระได้ซึ่งเป็นปกติ ตัวยาสำคัญได้ถูกดูดซึมเข้าร่างกายแล้ว"
    },
    "nlemNoteEn": "SR 20 mg only; for hypertension in pregnancy when methyldopa and hydralazine fail, or intractable Raynaud phenomenon",
    "nlemNoteTh": "เฉพาะ SR 20 มก. ใช้สำหรับความดันโลหิตสูงในหญิงตั้งครรภ์ที่ใช้ methyldopa และ hydralazine แล้วไม่ได้ผล หรือ Raynaud ที่รักษายาก",
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ระดับ I, หลักฐาน A (ตารางที่ 12: ยา 5 กลุ่มหลัก)",
    "label": {
      "name": "Procardia XL (US label)",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8ebcb33c-f43b-4b36-9f94-9774b2a59e06"
    }
  },
  {
    "id": "manidipine",
    "genericName": "Manidipine HCl",
    "nameEn": "Manidipine",
    "nameTh": "แมนิดิพีน",
    "brandNames": [
      "Mandi",
      "Manyper"
    ],
    "classId": "dhp_ccb",
    "classNameEn": "Dihydropyridine CCB (DHP-CCB)",
    "classNameTh": "แคลเซียมแชนแนลบล็อกเกอร์ DHP",
    "formType": "tablet_scored_round",
    "color": "#0284c7",
    "strengths": [
      "10 mg",
      "20 mg"
    ],
    "startDose": "10 mg OD morning after breakfast",
    "startDoseTh": "10 มก. วันละ 1 ครั้งหลังอาหารเช้า",
    "maintenanceDose": "10 - 20 mg OD",
    "maintenanceDoseTh": "10 - 20 มก. วันละ 1 ครั้ง",
    "maxDose": "20 mg/day",
    "maxDoseTh": "20 มก./วัน",
    "frequency": "OD",
    "costLevel": null,
    "nlem": true,
    "nlemCode": "b",
    "thaiGuidelineClass": "Class I, Level A (Table 12: one of the 5 first-line classes)",
    "compellingIndications": [
      "DM",
      "CKD_alb",
      "ISH"
    ],
    "pregnancyRisk": "caution",
    "heartRateEffect": "neutral",
    "potassiumEffect": "neutral",
    "mechanism": "Blocks both L-type and T-type calcium channels. T-type channel blockade dilates both afferent and efferent renal arterioles, reducing glomerular capillary pressure and proteinuria with significantly lower ankle edema than amlodipine.",
    "mechanismTh": "บล็อกทั้ง L-type และ T-type calcium channels การบล็อก T-type ช่วยขยายทั้งหลอดเลือดไตขาเข้าและขาออก (afferent & efferent) จึงลดแรงดันในโกลเมอรูลัส ลดโปรตีนรั่วในปัสสาวะ และมีอัตราเกิดข้อเท้าบวมต่ำกว่าแอมโลดิพีนอย่างชัดเจน",
    "renalAdjustment": {
      "minEgfrSafe": 15,
      "cutoff": 30,
      "textEn": "CrCl < 30: Start 5-10 mg OD with careful monitoring.",
      "textTh": "eGFR < 30: เริ่ม 5-10 มก./วัน ติดตามอย่างใกล้ชิด"
    },
    "hepaticAdjustment": {
      "textEn": "Reduce initial dose in severe liver disease.",
      "textTh": "ลดขนาดเริ่มต้นในโรคตับรุนแรง"
    },
    "contraindications": {
      "absolute": [
        "Hypersensitivity to DHP",
        "Severe unstable angina or within 1 month of MI",
        "Pregnancy"
      ],
      "relative": [
        "Severe aortic stenosis"
      ]
    },
    "sideEffects": {
      "common": [
        "Headache",
        "Dizziness",
        "Palpitations (rare)",
        "Ankle edema (low incidence < 3%)"
      ],
      "serious": [
        "Severe hypotension"
      ]
    },
    "precautions": [
      "Take after morning breakfast for optimal tolerability."
    ],
    "drugInteractions": [
      "CYP3A4 inhibitors increase levels."
    ],
    "patientCounseling": {
      "en": "Take in the morning after breakfast. Low incidence of ankle swelling compared to older calcium blockers.",
      "th": "รับประทานหลังอาหารเช้าวันละ 1 ครั้ง เกิดอาการบวมที่ขาน้อยกว่ายาแคลเซียมบล็อกเกอร์รุ่นเดิม"
    },
    "nlemNoteEn": "20 mg only; alternative for patients who cannot tolerate amlodipine",
    "nlemNoteTh": "เฉพาะ 20 มก. ใช้เป็นทางเลือกในผู้ป่วยที่ทนผลข้างเคียงของ amlodipine ไม่ได้",
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ระดับ I, หลักฐาน A (ตารางที่ 12: ยา 5 กลุ่มหลัก)",
    "label": null
  },
  {
    "id": "hctz",
    "genericName": "Hydrochlorothiazide",
    "nameEn": "Hydrochlorothiazide (HCTZ)",
    "nameTh": "ไฮโดรคลอโรไธอะไซด์ (HCTZ)",
    "brandNames": [
      "HCTZ GPO",
      "Hypothiazide",
      "Dichlotride"
    ],
    "classId": "thiazide_like",
    "classNameEn": "Thiazide Diuretic",
    "classNameTh": "ไธอะไซด์ ไดยูเรติก",
    "formType": "tablet_scored_round",
    "color": "#059669",
    "strengths": [
      "25 mg",
      "50 mg"
    ],
    "startDose": "12.5 mg OD morning (half of 25 mg tablet)",
    "startDoseTh": "12.5 มก. วันละ 1 ครั้งตอนเช้า (ครึ่งเม็ดของ 25 มก.)",
    "maintenanceDose": "12.5 - 25 mg OD",
    "maintenanceDoseTh": "12.5 - 25 มก. วันละ 1 ครั้ง",
    "maxDose": "25 mg/day for HT (doses > 25 mg offer minimal added BP reduction but markedly increase hypokalemia/metabolic harm)",
    "maxDoseTh": "25 มก./วัน ในความดันโลหิตสูง (เกิน 25 มก. ไม่ลดความดันเพิ่ม แต่ทำให้โพแทสเซียมต่ำและน้ำตาลพุ่ง)",
    "frequency": "OD morning",
    "costLevel": null,
    "nlem": true,
    "nlemCode": "b",
    "thaiGuidelineClass": "Class I, Level A (Table 12: one of the 5 first-line classes)",
    "compellingIndications": [
      "ISH",
      "Stroke",
      "Heart_Failure_Prevention",
      "Osteoporosis_Hypercalciuria"
    ],
    "pregnancyRisk": "caution",
    "heartRateEffect": "neutral",
    "potassiumEffect": "decreases",
    "mechanism": "Inhibits Na+/Cl- cotransporter in distal convoluted tubule; promotes natriuresis and long-term peripheral vascular resistance reduction. Reduces urinary calcium excretion (benefits osteopenia).",
    "mechanismTh": "ยับยั้ง Na+/Cl- cotransporter ที่ท่อไตส่วนปลาย เพิ่มการขับโซเดียมและน้ำ ลดแรงต้านทานของหลอดเลือดแดงส่วนปลายในระยะยาว ลดการขับแคลเซียมในปัสสาวะ (ช่วยชะลอกระดูกบาง)",
    "renalAdjustment": {
      "minEgfrSafe": 30,
      "cutoff": 30,
      "textEn": "Ineffective when eGFR < 30 mL/min/1.73m2 (switch to loop diuretics like furosemide or long-acting thiazide-like chlorthalidone).",
      "textTh": "ประสิทธิภาพลดลงอย่างมากเมื่อ eGFR < 30 มล./นาที (แนะนำเปลี่ยนเป็นลูปไดยูเรติก เช่น Furosemide หรือ Chlorthalidone)"
    },
    "hepaticAdjustment": {
      "textEn": "Caution in severe liver disease (electrolyte shifts may precipitate hepatic encephalopathy).",
      "textTh": "ระวังในโรคตับรุนแรง เกลือแร่แปรปรวนอาจกระตุ้นให้เกิดภาวะสมองจากโรคตับ"
    },
    "contraindications": {
      "absolute": [
        "Anuria",
        "Known sulfonamide allergy",
        "Refractory hypokalemia / hyponatremia",
        "Severe symptomatic hyperuricemia / acute gout crisis"
      ],
      "relative": [
        "History of gout",
        "Diabetes with poor glycemic control",
        "eGFR < 30 mL/min"
      ]
    },
    "sideEffects": {
      "common": [
        "Hypokalemia (muscle cramps, weakness)",
        "Hyponatremia",
        "Hyperuricemia (may trigger gout)",
        "Mild hyperglycemia",
        "Erectile dysfunction"
      ],
      "serious": [
        "Severe electrolyte depletion",
        "Arrhythmias (torsades if severe hypokalemia)",
        "Acute angle-closure glaucoma"
      ]
    },
    "precautions": [
      "Thai 2024 Guidelines recommend thiazide-like diuretics (Indapamide or Chlorthalidone) over HCTZ when possible due to longer duration and superior CV outcome evidence.",
      "Check electrolytes (Na+, K+) and renal function at baseline and within 4-8 weeks."
    ],
    "drugInteractions": [
      "NSAIDs decrease diuretic efficacy and increase nephrotoxicity.",
      "Digoxin: Hypokalemia strongly potentiates digitalis arrhythmias.",
      "Lithium: Reduces renal lithium clearance, inducing toxicity."
    ],
    "patientCounseling": {
      "en": "Take in the morning with breakfast to avoid having to wake up to urinate at night. Eat potassium-rich foods (bananas, oranges) unless instructed otherwise. Report muscle cramps or extreme tiredness.",
      "th": "รับประทานในตอนเช้าหลังอาหาร เพื่อหลีกเลี่ยงการตื่นมาปัสสาวะกลางดึก หากมีอาการตะคริวหรือกล้ามเนื้ออ่อนแรงให้แจ้งแพทย์เพื่อตรวจระดับเกลือแร่โพแทสเซียม"
    },
    "nlemNoteEn": null,
    "nlemNoteTh": null,
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ระดับ I, หลักฐาน A (ตารางที่ 12: ยา 5 กลุ่มหลัก)",
    "label": {
      "name": "Hydrochlorothiazide tablets, Teva (US label)",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7e03988e-4bc3-4a68-a69c-dab2d568006a"
    }
  },
  {
    "id": "indapamide",
    "genericName": "Indapamide hemihydrate",
    "nameEn": "Indapamide",
    "nameTh": "อินดาพาไมด์",
    "brandNames": [
      "Natrilix SR",
      "Indapamide Servier",
      "Fludex SR"
    ],
    "classId": "thiazide_like",
    "classNameEn": "Thiazide-like Diuretic",
    "classNameTh": "ไธอะไซด์-ไลค์ ไดยูเรติก",
    "formType": "tablet_scored_round",
    "color": "#059669",
    "strengths": [
      "1.5 mg SR",
      "2.5 mg IR"
    ],
    "startDose": "1.5 mg SR OD morning",
    "startDoseTh": "1.5 มก. ชนิด SR วันละ 1 ครั้งตอนเช้า",
    "maintenanceDose": "1.5 mg SR OD (or 2.5 mg IR OD)",
    "maintenanceDoseTh": "1.5 มก. ชนิด SR วันละ 1 ครั้ง",
    "maxDose": "1.5 mg/day (SR) or 2.5 mg/day (IR)",
    "maxDoseTh": "1.5 มก./วัน (SR) หรือ 2.5 มก./วัน (IR)",
    "frequency": "OD morning",
    "costLevel": null,
    "nlem": false,
    "nlemCode": null,
    "thaiGuidelineClass": "Class I, Level A (Table 12: one of the 5 first-line classes)",
    "compellingIndications": [
      "ISH",
      "Elderly",
      "Stroke",
      "Resistant",
      "DM"
    ],
    "pregnancyRisk": "caution",
    "heartRateEffect": "neutral",
    "potassiumEffect": "decreases",
    "mechanism": "Thiazide-like sulfonamide diuretic with dual action: distal tubule natriuresis PLUS direct arterial vasodilation via calcium entry blockade into vascular smooth muscle. Proven in HYVET to reduce stroke and all-cause mortality in patients aged >= 80 years.",
    "mechanismTh": "ยาขับปัสสาวะกลุ่ม thiazide-like ที่มีกลไกคู่ ทั้งขับโซเดียมที่ท่อไตและขยายหลอดเลือดโดยตรง (vasodilation) มีหลักฐานระดับสูงสุดในการศึกษา HYVET ช่วยลดอัตราการเสียชีวิตและสโตรกในผู้สูงอายุ 80 ปีขึ้นไปอย่างมีนัยสำคัญ ส่งผลต่อระดับน้ำตาลและกรดยูริกน้อยกว่า HCTZ",
    "renalAdjustment": {
      "minEgfrSafe": 30,
      "cutoff": 30,
      "textEn": "Safe down to eGFR 30 mL/min/1.73m2. In severe renal failure (eGFR < 30), effectiveness decreases; switch to loop diuretic.",
      "textTh": "ใช้ได้ปลอดภัยจนถึง eGFR 30 มล./นาที หากไตวายรุนแรงต่ำกว่า 30 แนะนำเปลี่ยนเป็นลูปไดยูเรติก"
    },
    "hepaticAdjustment": {
      "textEn": "Contraindicated in severe hepatic impairment.",
      "textTh": "ห้ามใช้ในผู้ป่วยตับวายรุนแรง"
    },
    "contraindications": {
      "absolute": [
        "Severe renal failure (anuria)",
        "Severe hepatic encephalopathy",
        "Severe hypokalemia",
        "Sulfonamide allergy"
      ],
      "relative": [
        "Gout"
      ]
    },
    "sideEffects": {
      "common": [
        "Mild hypokalemia (lower incidence with 1.5mg SR than HCTZ)",
        "Headache",
        "Fatigue"
      ],
      "serious": [
        "Severe hyponatremia in elderly frail women",
        "Aplastic anemia (extremely rare)"
      ]
    },
    "precautions": [
      "Preferred thiazide-like diuretic in elderly and isolated systolic hypertension in Thai CPG 2024.",
      "Check electrolytes within 4-8 weeks."
    ],
    "drugInteractions": [
      "Lithium, NSAIDs, digitalis."
    ],
    "patientCounseling": {
      "en": "Take one tablet every morning. Swallow sustained-release tablet whole without chewing. Highly effective in protecting brain blood vessels in older adults.",
      "th": "รับประทานวันละ 1 เม็ดตอนเช้า กลืนทั้งเม็ดห้ามเคี้ยว ยานี้มีประสิทธิภาพสูงในการป้องกันโรคหลอดเลือดสมองในผู้สูงอายุ"
    },
    "nlemNoteEn": null,
    "nlemNoteTh": null,
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ระดับ I, หลักฐาน A (ตารางที่ 12: ยา 5 กลุ่มหลัก)",
    "label": {
      "name": "Indapamide tablets (US label; IR only - no SR in US)",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=59cd3331-7afe-432a-8b50-39533fd5f392"
    }
  },
  {
    "id": "chlorthalidone",
    "genericName": "Chlorthalidone",
    "nameEn": "Chlorthalidone",
    "nameTh": "คลอร์ธาลิโดน",
    "brandNames": [
      "Hygroton",
      "Chlorthalidone"
    ],
    "classId": "thiazide_like",
    "classNameEn": "Thiazide-like Diuretic",
    "classNameTh": "ไธอะไซด์-ไลค์ ไดยูเรติก",
    "formType": "tablet_scored_round",
    "color": "#059669",
    "strengths": [
      "25 mg",
      "50 mg"
    ],
    "startDose": "12.5 mg OD morning (half of 25 mg tablet)",
    "startDoseTh": "12.5 มก. วันละ 1 ครั้งตอนเช้า (ครึ่งเม็ด 25 มก.)",
    "maintenanceDose": "12.5 - 25 mg OD",
    "maintenanceDoseTh": "12.5 - 25 มก. วันละ 1 ครั้ง",
    "maxDose": "50 mg/day (in Resistant HT; usually 25 mg/day in primary HT)",
    "maxDoseTh": "25 มก./วัน (ในความดันทั่วไป) ถึง 50 มก./วัน (ในความดันดื้อยา)",
    "frequency": "OD morning",
    "costLevel": null,
    "nlem": false,
    "nlemCode": null,
    "thaiGuidelineClass": "Class I, Level A (Table 12: one of the 5 first-line classes)",
    "compellingIndications": [
      "Resistant",
      "CKD_alb",
      "ISH",
      "Stroke"
    ],
    "pregnancyRisk": "caution",
    "heartRateEffect": "neutral",
    "potassiumEffect": "decreases",
    "mechanism": "Potent, extremely long-acting thiazide-like diuretic (half-life 40-60h) and carbonic anhydrase inhibitor. Proven in the CLICK trial (2021) to effectively lower BP even in advanced CKD stage 4 (eGFR 15-30 mL/min). Key drug in Step 2 of Resistant HT algorithm.",
    "mechanismTh": "ยาขับปัสสาวะ thiazide-like ที่ออกฤทธิ์ยาวนานที่สุด (ค่าครึ่งชีวิต 40-60 ชม.) มีหลักฐานการศึกษา CLICK trial ยืนยันว่าสามารถลดความดันโลหิตและโปรตีนรั่วในผู้ป่วยโรคไตเรื้อรังระยะที่ 4 (eGFR 15-30) ได้ผลดี เป็นยาสำคัญในขั้นตอนที่ 2 ของการรักษาความดันโลหิตสูงดื้อยา (Resistant HT)",
    "renalAdjustment": {
      "minEgfrSafe": 15,
      "cutoff": 15,
      "textEn": "Effective down to eGFR 15-30 mL/min/1.73m2 (Class IIa, Level B in Resistant HT). Monitor K+ closely.",
      "textTh": "มีประสิทธิภาพใช้ได้แม้ eGFR 15-30 มล./นาที (คำแนะนำ Class IIa, Level B ในผู้ป่วย Resistant HT) แต่ต้องติดตามเกลือแร่ K+ อย่างใกล้ชิด"
    },
    "hepaticAdjustment": {
      "textEn": "Use with caution in progressive hepatic disease.",
      "textTh": "ใช้ด้วยความระมัดระวังในโรคตับ"
    },
    "contraindications": {
      "absolute": [
        "Anuria",
        "Refractory hypokalemia / hyponatremia",
        "Severe sulfonamide allergy"
      ],
      "relative": [
        "History of recurrent acute gout attacks",
        "Severe hypokalemia"
      ]
    },
    "sideEffects": {
      "common": [
        "Hypokalemia (more potent than HCTZ; ~15-20%)",
        "Hyponatremia",
        "Hyperuricemia",
        "Dizziness"
      ],
      "serious": [
        "Severe electrolyte imbalance",
        "Pancreatitis (rare)"
      ]
    },
    "precautions": [
      "Higher potency and longer half-life than HCTZ: check serum potassium at 2, 4, and 12 weeks.",
      "Ideal replacement for HCTZ when managing Resistant Hypertension."
    ],
    "drugInteractions": [
      "Lithium, NSAIDs, Digoxin."
    ],
    "patientCounseling": {
      "en": "Take in the morning. Stronger and longer-acting than regular water pills. Drink adequate water and attend follow-up blood tests for potassium.",
      "th": "รับประทานวันละครั้งตอนเช้า มีฤทธิ์ลดความดันแรงและยาวนานกว่ายาขับปัสสาวะทั่วไป ควรมาตรวจเลือดติดตามเกลือแร่โพแทสเซียมตามนัด"
    },
    "nlemNoteEn": null,
    "nlemNoteTh": null,
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ระดับ I, หลักฐาน A (ตารางที่ 12: ยา 5 กลุ่มหลัก)",
    "label": {
      "name": "Thalitone (US label)",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=bc5a0299-115b-4e60-bb3f-c75a95c51c15"
    }
  },
  {
    "id": "bisoprolol",
    "genericName": "Bisoprolol fumarate",
    "nameEn": "Bisoprolol",
    "nameTh": "บิโซโพรลอล",
    "brandNames": [
      "Concor",
      "Bisoprolol GPO",
      "Bisotab",
      "Cordicor"
    ],
    "classId": "beta_blocker",
    "classNameEn": "Cardioselective Beta-1 Blocker",
    "classNameTh": "เบต้า-1 บล็อกเกอร์ ชนิดเจาะจงหัวใจ",
    "formType": "tablet_scored_round",
    "color": "#4f46e5",
    "strengths": [
      "2.5 mg",
      "5 mg",
      "10 mg"
    ],
    "startDose": "2.5 - 5 mg OD morning (1.25 mg OD in HFrEF titration)",
    "startDoseTh": "2.5 - 5 มก. วันละ 1 ครั้งตอนเช้า (1.25 มก. หากเป็น HFrEF)",
    "maintenanceDose": "5 - 10 mg OD",
    "maintenanceDoseTh": "5 - 10 มก. วันละ 1 ครั้ง",
    "maxDose": "20 mg/day (usually 10 mg/day in HT and HFrEF)",
    "maxDoseTh": "10 - 20 มก./วัน",
    "frequency": "OD morning",
    "costLevel": null,
    "nlem": false,
    "nlemCode": null,
    "thaiGuidelineClass": "Class I, Level A (Table 12: one of the 5 first-line classes)",
    "compellingIndications": [
      "CAD",
      "HFrEF",
      "AF",
      "Post_MI",
      "Aortic_Aneurysm"
    ],
    "pregnancyRisk": "caution",
    "heartRateEffect": "decreases",
    "potassiumEffect": "neutral",
    "mechanism": "Highly selective beta-1 adrenergic receptor antagonist (Beta-1:Beta-2 ratio ~ 1:75). Reduces heart rate, cardiac contractility, myocardial oxygen demand, and renin release. Minimal bronchoconstrictive risk compared to non-selective agents.",
    "mechanismTh": "ยับยั้งตัวรับ Beta-1 ที่หัวใจอย่างเจาะจงสูงมาก (อัตราส่วน 75:1) ชะลออัตราการเต้นของหัวใจ ลดการบีบตัว ลดความต้องการออกซิเจนของกล้ามเนื้อหัวใจ และลดการหลั่งเรนิน มีผลกระทบต่อหลอดลมและหลอดเลือดส่วนปลายน้อยมาก",
    "renalAdjustment": {
      "minEgfrSafe": 15,
      "cutoff": 20,
      "textEn": "CrCl < 20 mL/min: Max dose 10 mg/day.",
      "textTh": "eGFR < 20: ขนาดยาสูงสุดไม่เกิน 10 มก./วัน"
    },
    "hepaticAdjustment": {
      "textEn": "Max dose 10 mg/day in severe hepatic impairment.",
      "textTh": "ตับบกพร่องรุนแรง ขนาดยาสูงสุดไม่เกิน 10 มก./วัน"
    },
    "contraindications": {
      "absolute": [
        "Severe bradycardia (HR < 50 bpm)",
        "Second- or third-degree AV block (without pacemaker)",
        "Cardiogenic shock",
        "Decompensated acute heart failure / pulmonary edema",
        "Severe active asthma"
      ],
      "relative": [
        "Well-controlled COPD (can use cautiously)",
        "Peripheral artery disease (intermittent claudication)",
        "Severe Raynaud phenomenon",
        "PR interval > 0.24s"
      ]
    },
    "sideEffects": {
      "common": [
        "Bradycardia (HR < 60)",
        "Fatigue",
        "Dizziness",
        "Cold extremities",
        "Sleep disturbances / vivid dreams"
      ],
      "serious": [
        "Severe symptomatic heart block",
        "Acute heart failure decompensation",
        "Severe bronchospasm"
      ]
    },
    "precautions": [
      "CRITICAL: NEVER STOP ABRUPTLY! Abrupt cessation may precipitate severe rebound hypertension, myocardial infarction, or fatal arrhythmias (Class III, Level C).",
      "Target resting heart rate in CAD and AF is 60-80 bpm.",
      "May mask hypoglycemia symptoms (sweating, palpitations) in diabetic patients."
    ],
    "drugInteractions": [
      "NEVER COMBINE WITH NON-DHP CCB (Verapamil / Diltiazem) (Class III, Level C) -> severe bradycardia, complete AV block, and acute heart failure.",
      "Digoxin: Increased risk of bradycardia and AV block.",
      "Amiodarone: Profound sinus bradycardia."
    ],
    "patientCounseling": {
      "en": "Take once daily in the morning. Check pulse rate periodically. NEVER STOP taking this medication suddenly without talking to your doctor. If you feel dizzy or pulse drops below 50 bpm, notify clinic.",
      "th": "รับประทานวันละ 1 ครั้งตอนเช้า ห้ามหยุดยาเองกะทันหันโดยเด็ดขาด เพราะอาจทำให้หัวใจเต้นเร็วรุนแรงและความดันพุ่งสูงฉับพลัน ตรวจวัดชีพจรสม่ำเสมอ หากชีพจรต่ำกว่า 50 ครั้ง/นาทีหรือหน้ามืดให้แจ้งแพทย์"
    },
    "nlemNoteEn": null,
    "nlemNoteTh": null,
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ระดับ I, หลักฐาน A (ตารางที่ 12: ยา 5 กลุ่มหลัก)",
    "label": {
      "name": "Bisoprolol fumarate, Sun (US label)",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7556f457-c4d3-49d6-b383-0ade6d489091"
    }
  },
  {
    "id": "carvedilol",
    "genericName": "Carvedilol",
    "nameEn": "Carvedilol",
    "nameTh": "คาร์เวดิลอล",
    "brandNames": [
      "Dilatrend",
      "Carvedilol GPO",
      "Carvedil"
    ],
    "classId": "beta_blocker",
    "classNameEn": "Vasodilating Non-selective Beta + Alpha-1 Blocker",
    "classNameTh": "เบต้า บล็อกเกอร์ ชนิดขยายหลอดเลือด (Alpha-1 + Beta)",
    "formType": "tablet_scored_round",
    "color": "#4f46e5",
    "strengths": [
      "6.25 mg",
      "12.5 mg",
      "25 mg"
    ],
    "startDose": "6.25 mg BID (3.125 mg BID in HFrEF) with meals",
    "startDoseTh": "6.25 มก. วันละ 2 ครั้งพร้อมอาหาร (3.125 มก. ใน HFrEF)",
    "maintenanceDose": "12.5 - 25 mg BID",
    "maintenanceDoseTh": "12.5 - 25 มก. วันละ 2 ครั้งพร้อมอาหาร",
    "maxDose": "50 mg/day (25 mg BID; in weight > 85kg can use 50 mg BID)",
    "maxDoseTh": "50 มก./วัน (25 มก. วันละ 2 ครั้ง)",
    "frequency": "BID with food",
    "costLevel": null,
    "nlem": true,
    "nlemCode": "s",
    "thaiGuidelineClass": "Class I, Level A (Table 12: one of the 5 first-line classes)",
    "compellingIndications": [
      "HFrEF",
      "CAD",
      "Post_MI",
      "Resistant",
      "Metabolic_Syndrome"
    ],
    "pregnancyRisk": "caution",
    "heartRateEffect": "decreases",
    "potassiumEffect": "neutral",
    "mechanism": "Non-selective beta blocker with competitive alpha-1 adrenergic blockade; produces systemic vasodilation, reduces peripheral resistance, avoids metabolic worsening (neutral to favorable on insulin sensitivity and lipid profile).",
    "mechanismTh": "ออกฤทธิ์บล็อกทั้งตัวรับ Beta และ Alpha-1 ทำให้หลอดเลือดส่วนปลายขยายตัว ไม่ทำให้หลอดเลือดหดเกร็ง และไม่มีผลเสียต่อระดับน้ำตาลหรือไขมันในเลือด เหมาะกับผู้ป่วยหัวใจล้มเหลว HFrEF และโรคอ้วน/เมแทบอลิก",
    "renalAdjustment": {
      "minEgfrSafe": 15,
      "cutoff": 0,
      "textEn": "Excreted primarily via bile and feces. No dose adjustment needed in renal failure or hemodialysis.",
      "textTh": "ขับออกทางตับและถุงน้ำดีเป็นหลัก ไม่ต้องปรับขนาดยาในผู้ป่วยโรคไตหรือฟอกเลือด"
    },
    "hepaticAdjustment": {
      "textEn": "Contraindicated in clinically manifest severe hepatic impairment.",
      "textTh": "ห้ามใช้ในตับวายรุนแรง"
    },
    "contraindications": {
      "absolute": [
        "Bronchial asthma or active severe bronchospasm",
        "Decompensated acute heart failure (NYHA IV decompensated)",
        "Severe bradycardia or AV block grade 2-3",
        "Severe hepatic dysfunction"
      ],
      "relative": [
        "COPD",
        "Severe peripheral artery disease"
      ]
    },
    "sideEffects": {
      "common": [
        "Orthostatic hypotension / dizziness (due to alpha-1 block)",
        "Fatigue",
        "Bradycardia",
        "Weight gain (mild)"
      ],
      "serious": [
        "Severe bronchospasm",
        "Severe heart block"
      ]
    },
    "precautions": [
      "Take WITH FOOD to slow absorption rate and minimize orthostatic lightheadedness.",
      "Titrate slowly q 2 weeks in heart failure."
    ],
    "drugInteractions": [
      "Verapamil / Diltiazem (strictly avoid), Digoxin, Insulin (may mask hypoglycemia)."
    ],
    "patientCounseling": {
      "en": "Take twice daily WITH MEALS to prevent dizziness. Do not stop abruptly. Rise slowly from lying or seated positions.",
      "th": "รับประทานวันละ 2 ครั้ง พร้อมอาหารเช้าและเย็นเพื่อลดอาการเวียนศีรษะหน้ามืด ลุกจากท่านอนช้าๆ ห้ามหยุดยาเองกะทันหัน"
    },
    "nlemNoteEn": "For heart failure with reduced ejection fraction",
    "nlemNoteTh": "ใช้สำหรับ heart failure with reduced ejection fraction",
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ระดับ I, หลักฐาน A (ตารางที่ 12: ยา 5 กลุ่มหลัก)",
    "label": {
      "name": "Coreg (US label)",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=07c619c6-4a0c-445e-94fa-664a54f68a39"
    }
  },
  {
    "id": "nebivolol",
    "genericName": "Nebivolol HCl",
    "nameEn": "Nebivolol",
    "nameTh": "เนบิวอลอล",
    "brandNames": [
      "Nebilet"
    ],
    "classId": "beta_blocker",
    "classNameEn": "Third-Generation Vasodilating Beta-1 Blocker",
    "classNameTh": "เบต้า บล็อกเกอร์ รุ่นที่ 3 ชนิดกระตุ้น Nitric Oxide",
    "formType": "tablet_scored_round",
    "color": "#4f46e5",
    "strengths": [
      "5 mg"
    ],
    "startDose": "2.5 - 5 mg OD morning",
    "startDoseTh": "2.5 - 5 มก. วันละ 1 ครั้งตอนเช้า (1.25 มก. ในผู้สูงอายุ/ไตวาย)",
    "maintenanceDose": "5 mg OD",
    "maintenanceDoseTh": "5 มก. วันละ 1 ครั้ง",
    "maxDose": "10 mg/day (up to 40 mg in US FDA, but 10 mg in Thailand/Europe)",
    "maxDoseTh": "10 มก./วัน",
    "frequency": "OD morning",
    "costLevel": null,
    "nlem": false,
    "nlemCode": null,
    "thaiGuidelineClass": "Class I, Level A (Table 12: one of the 5 first-line classes)",
    "compellingIndications": [
      "Elderly",
      "CAD",
      "HFrEF",
      "Erectile_Dysfunction_Concern"
    ],
    "pregnancyRisk": "caution",
    "heartRateEffect": "decreases",
    "potassiumEffect": "neutral",
    "mechanism": "Highest beta-1 selectivity plus L-arginine / nitric oxide (NO)-mediated endothelial vasodilation. Demonstrates significantly lower incidence of erectile dysfunction, fatigue, and bronchospasm compared to older beta-blockers.",
    "mechanismTh": "มีความจำเพาะต่อ Beta-1 สูงที่สุด ร่วมกับกระตุ้นการหลั่ง Nitric Oxide (NO) จากเยื่อบุหลอดเลือด ทำให้หลอดเลือดขยายตัว ไม่กดสมรรถภาพทางเพศ (แทบไม่พบปัญหาหย่อนสมรรถภาพทางเพศ) และมีผลดีในผู้สูงอายุ",
    "renalAdjustment": {
      "minEgfrSafe": 15,
      "cutoff": 30,
      "textEn": "CrCl < 30 mL/min: Start 2.5 mg OD.",
      "textTh": "eGFR < 30: เริ่มต้นที่ 2.5 มก. วันละ 1 ครั้ง"
    },
    "hepaticAdjustment": {
      "textEn": "Contraindicated in severe hepatic impairment.",
      "textTh": "ห้ามใช้ในผู้ป่วยตับบกพร่องรุนแรง"
    },
    "contraindications": {
      "absolute": [
        "Severe bradycardia",
        "Cardiogenic shock",
        "Decompensated acute HF",
        "Severe hepatic impairment",
        "Second/third-degree AV block"
      ],
      "relative": [
        "Asthma"
      ]
    },
    "sideEffects": {
      "common": [
        "Headache",
        "Dizziness",
        "Fatigue",
        "Paresthesia"
      ],
      "serious": [
        "Bradycardia",
        "Heart block"
      ]
    },
    "precautions": [
      "Do not stop abruptly. Excellent option for patients concerned about sexual dysfunction."
    ],
    "drugInteractions": [
      "Verapamil, Diltiazem, CYP2D6 inhibitors (Fluoxetine, Paroxetine)."
    ],
    "patientCounseling": {
      "en": "Take once daily in the morning. Better tolerated with less tiredness and less sexual dysfunction than older beta-blockers.",
      "th": "รับประทานวันละ 1 ครั้งตอนเช้า อ่อนเพลียน้อยกว่าและไม่รบกวนสมรรถภาพทางเพศ"
    },
    "nlemNoteEn": null,
    "nlemNoteTh": null,
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ระดับ I, หลักฐาน A (ตารางที่ 12: ยา 5 กลุ่มหลัก)",
    "label": {
      "name": "Bystolic (US label)",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8b8ad213-1dc8-454e-a524-075685c0e1a8"
    }
  },
  {
    "id": "spironolactone",
    "genericName": "Spironolactone",
    "nameEn": "Spironolactone",
    "nameTh": "สไปโรโนแลคโตน",
    "brandNames": [
      "Aldactone",
      "Spironolactone GPO",
      "Hyles"
    ],
    "classId": "mra",
    "classNameEn": "Mineralocorticoid Receptor Antagonist (MRA)",
    "classNameTh": "เอ็มอาร์เอ (ยาต้านอัลโดสเตอโรน)",
    "formType": "tablet_scored_round",
    "color": "#7c3aed",
    "strengths": [
      "25 mg",
      "100 mg"
    ],
    "startDose": "12.5 - 25 mg OD morning",
    "startDoseTh": "12.5 - 25 มก. วันละ 1 ครั้งตอนเช้า",
    "maintenanceDose": "25 - 50 mg OD",
    "maintenanceDoseTh": "25 - 50 มก. วันละ 1 ครั้ง",
    "maxDose": "50 mg/day for HT (up to 100-200 mg/day for Primary Aldosteronism)",
    "maxDoseTh": "50 มก./วัน ในความดันโลหิตสูง (100-200 มก./วัน ในเนื้องอกต่อมหมวกไต PA)",
    "frequency": "OD morning",
    "costLevel": null,
    "nlem": true,
    "nlemCode": "b",
    "thaiGuidelineClass": "Class I, Level B (4th drug in resistant HT, PATHWAY-2; CPG p.115)",
    "compellingIndications": [
      "Resistant",
      "Primary_Aldosteronism",
      "HFrEF",
      "HFpEF",
      "OSA"
    ],
    "pregnancyRisk": "contraindicated",
    "heartRateEffect": "neutral",
    "potassiumEffect": "increases",
    "mechanism": "Competitive antagonist of aldosterone at mineralocorticoid receptors in distal tubule and collecting ducts; promotes natriuresis, retains potassium and magnesium, halts myocardial and vascular fibrosis. Indisputable #1 choice for Resistant HT and Primary Aldosteronism.",
    "mechanismTh": "แย่งจับตัวรับ mineralocorticoid ขับโซเดียมและน้ำ เก็บโพแทสเซียม ยับยั้ง aldosterone-mediated fibrosis เป็นยาขนานที่ 4 ที่ดีที่สุดในการรักษาความดันโลหิตสูงดื้อยา (Resistant HT ตามการศึกษา PATHWAY-2) และเป็นยาหลักในการรักษาเนื้องอกต่อมหมวกไต Primary Aldosteronism",
    "renalAdjustment": {
      "minEgfrSafe": 30,
      "cutoff": 45,
      "textEn": "Use only if eGFR >= 30 mL/min/1.73m2. Use with caution if eGFR < 45 or serum K+ > 4.5 mmol/L; check K+ and creatinine closely for the first 8 weeks (Thai CPG p.115-116).",
      "textTh": "ใช้เฉพาะเมื่อ eGFR >= 30 มล./นาที/1.73 ม2 ใช้ด้วยความระมัดระวังถ้า eGFR < 45 หรือ K+ > 4.5 มิลลิโมล/ลิตร ติดตาม K+ และการทำงานของไตใกล้ชิดใน 8 สัปดาห์แรก (แนวทางฯ หน้า 115-116)"
    },
    "hepaticAdjustment": {
      "textEn": "Extensively metabolized by liver; safe in cirrhosis, but monitor electrolytes.",
      "textTh": "เผาผลาญที่ตับ ระวังเกลือแร่แปรปรวน"
    },
    "contraindications": {
      "absolute": [
        "eGFR < 30 mL/min/1.73m2",
        "Serum K+ > 5.0 mEq/L",
        "Anuria / Acute Renal Failure",
        "Addison disease",
        "Concomitant Eplerenone"
      ],
      "relative": [
        "eGFR 30-45 mL/min or K+ > 4.5 mmol/L: use with caution (Thai CPG p.115)"
      ]
    },
    "sideEffects": {
      "common": [
        "Hyperkalemia (dose-limiting)",
        "Gynecomastia (breast tenderness/enlargement in men, up to 10%)",
        "Menstrual irregularity in women",
        "GI irritation"
      ],
      "serious": [
        "Severe fatal hyperkalemia (K+ > 6.0 mEq/L)",
        "Acute renal insufficiency"
      ]
    },
    "precautions": [
      "Check Serum Creatinine and K+ at 1, 4, and 8 weeks after starting or titrating.",
      "Stop potassium supplements and advise patient to avoid high-potassium salt substitutes."
    ],
    "drugInteractions": [
      "ACEI / ARB (compounds hyperkalemia; monitor closely), Potassium supplements, NSAIDs, Trimethoprim."
    ],
    "patientCounseling": {
      "en": "Take in the morning with food. Do NOT take potassium supplements or use potassium-based salt substitutes. Male patients: report any breast tenderness or swelling. Come for mandatory blood tests.",
      "th": "รับประทานตอนเช้าพร้อมอาหาร ห้ามรับประทานเกลือโพแทสเซียมเสริมโดยเด็ดขาด ผู้ชายอาจพบอาการเจ็บหรือเต้านมขยายได้ หากมีให้แจ้งแพทย์ ต้องมาเจาะเลือดตรวจค่าไตและเกลือแร่ตามนัดอย่างเคร่งครัด"
    },
    "nlemNoteEn": null,
    "nlemNoteTh": null,
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ระดับ I, หลักฐาน B (ยาชนิดที่ 4 ใน resistant HT; หน้า 115)",
    "label": {
      "name": "Aldactone (US label)",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0fed2822-3a03-4b64-9857-c682fcd462bc"
    }
  },
  {
    "id": "eplerenone",
    "genericName": "Eplerenone",
    "nameEn": "Eplerenone",
    "nameTh": "เอพลีรีโนน",
    "brandNames": [
      "Inspra"
    ],
    "classId": "mra",
    "classNameEn": "Selective Mineralocorticoid Receptor Antagonist",
    "classNameTh": "เอ็มอาร์เอ ชนิดเจาะจงสูง (ไม่ทำให้เจ็บเต้านม)",
    "formType": "tablet_scored_round",
    "color": "#7c3aed",
    "strengths": [
      "25 mg",
      "50 mg"
    ],
    "startDose": "50 mg OD (hypertension)",
    "startDoseTh": "50 มก. วันละ 1 ครั้ง (ความดันโลหิตสูง)",
    "maintenanceDose": "50 mg OD; may increase to 50 mg BID",
    "maintenanceDoseTh": "50 มก. วันละ 1 ครั้ง; เพิ่มเป็น 50 มก. วันละ 2 ครั้งได้",
    "maxDose": "100 mg/day (50 mg BID)",
    "maxDoseTh": "100 มก./วัน (50 มก. วันละ 2 ครั้ง)",
    "frequency": "OD or BID",
    "costLevel": null,
    "nlem": false,
    "nlemCode": null,
    "thaiGuidelineClass": "Not graded (Figure 6: spironolactone or eplerenone if eGFR >= 30)",
    "compellingIndications": [
      "Resistant",
      "HFrEF",
      "Primary_Aldosteronism",
      "Gynecomastia_Intolerance"
    ],
    "pregnancyRisk": "contraindicated",
    "heartRateEffect": "neutral",
    "potassiumEffect": "increases",
    "mechanism": "Highly selective aldosterone antagonist with minimal affinity for androgen and progesterone receptors. Eliminates gynecomastia and menstrual irregularities seen with spironolactone.",
    "mechanismTh": "ยับยั้งตัวรับ aldosterone อย่างเจาะจงสูงมาก ไม่จับกับตัวรับฮอร์โมนเพศเพศชายและหญิง จึงไม่ทำให้เกิดอาการเจ็บเต้านมหรือเต้านมโตในผู้ชาย (ใช้แทน spironolactone ในผู้ป่วยที่ทนผลข้างเคียงไม่ได้)",
    "renalAdjustment": {
      "minEgfrSafe": 50,
      "cutoff": 50,
      "textEn": "For hypertension: contraindicated if CrCl < 50 mL/min, serum Cr > 2.0 mg/dL (men) or > 1.8 mg/dL (women), or type 2 diabetes with microalbuminuria (US label).",
      "textTh": "สำหรับความดันโลหิตสูง: ห้ามใช้ถ้า CrCl < 50 มล./นาที, Cr > 2.0 มก./ดล. (ชาย) หรือ > 1.8 มก./ดล. (หญิง) หรือเบาหวานชนิดที่ 2 ที่มี microalbuminuria (ฉลากยาสหรัฐฯ)"
    },
    "hepaticAdjustment": {
      "textEn": "Contraindicated in severe hepatic impairment.",
      "textTh": "ห้ามใช้ในโรคตับรุนแรง"
    },
    "contraindications": {
      "absolute": [
        "Serum K+ > 5.5 mEq/L at start",
        "CrCl <= 30 mL/min (all patients); CrCl < 50 mL/min for hypertension",
        "Serum Cr > 2.0 (men) / > 1.8 mg/dL (women) for hypertension",
        "Type 2 diabetes with microalbuminuria (hypertension)",
        "Strong CYP3A4 inhibitors (ketoconazole, itraconazole, clarithromycin, ritonavir)",
        "Potassium supplements or K-sparing diuretics (hypertension)"
      ],
      "relative": []
    },
    "sideEffects": {
      "common": [
        "Hyperkalemia",
        "Dizziness",
        "Diarrhea",
        "No gynecomastia"
      ],
      "serious": [
        "Severe hyperkalemia"
      ]
    },
    "precautions": [
      "Monitor K+ and renal function regularly."
    ],
    "drugInteractions": [
      "Strong CYP3A4 inhibitors, Potassium supplements."
    ],
    "patientCounseling": {
      "en": "Take once daily. Does not cause breast swelling or sexual side effects. Avoid high-potassium foods and supplements.",
      "th": "รับประทานวันละ 1 ครั้งตอนเช้า ไม่ทำให้เต้านมโตหรือเจ็บเต้านม หลีกเลี่ยงเกลือแร่โพแทสเซียมเสริม"
    },
    "nlemNoteEn": null,
    "nlemNoteTh": null,
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ไม่ได้ระบุระดับ (ภาพที่ 6: spironolactone หรือ eplerenone ถ้า eGFR >= 30)",
    "label": {
      "name": "Inspra (US label)",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1a52bedc-8e2c-4116-a296-a87770676b4a"
    }
  },
  {
    "id": "spc_amlodipine_valsartan",
    "genericName": "Amlodipine besylate + Valsartan",
    "nameEn": "Amlodipine / Valsartan (SPC)",
    "nameTh": "แอมโลดิพีน + วาลซาร์แทน (สูตรรวมเม็ด)",
    "brandNames": [
      "Exforge",
      "Valamlo",
      "Amlodipine/Valsartan Sandoz"
    ],
    "classId": "spc_dual",
    "classNameEn": "Dual SPC (DHP-CCB + ARB)",
    "classNameTh": "ยารวมเม็ด 2 ชนิด (CCB + ARB)",
    "formType": "spc_bilayer",
    "color": "#0d9488",
    "strengths": [
      "5/80 mg",
      "5/160 mg",
      "10/160 mg"
    ],
    "startDose": "5/80 mg or 5/160 mg OD morning",
    "startDoseTh": "5/80 มก. หรือ 5/160 มก. วันละ 1 ครั้งตอนเช้า",
    "maintenanceDose": "5/160 mg to 10/160 mg OD",
    "maintenanceDoseTh": "5/160 มก. ถึง 10/160 มก. วันละ 1 ครั้ง",
    "maxDose": "10/160 mg/day (or 10/320 mg if available)",
    "maxDoseTh": "10/160 มก./วัน",
    "frequency": "OD morning",
    "costLevel": null,
    "nlem": false,
    "nlemCode": null,
    "thaiGuidelineClass": "Class I, Level A (Table 12: start 2 drugs; single pill preferred)",
    "compellingIndications": [
      "CAD",
      "DM",
      "Stroke",
      "Grade2_3_HT",
      "Metabolic_Syndrome"
    ],
    "pregnancyRisk": "contraindicated",
    "heartRateEffect": "neutral",
    "potassiumEffect": "increases",
    "mechanism": "Synergistic dual mechanism: Amlodipine causes arterial vasodilation while Valsartan blocks angiotensin II vasoconstriction and counteracts CCB-induced reflex sympathetic and RAAS activation. Valsartan post-capillary venodilation markedly eliminates amlodipine ankle edema.",
    "mechanismTh": "กลไกเสริมฤทธิ์กันอย่างยอดเยี่ยม: Amlodipine ขยายหลอดเลือดแดงส่วนปลาย ขณะที่ Valsartan บล็อก RAAS และขยายหลอดเลือดดำหลังแคปิลลารี จึงช่วยหักล้างอาการข้อเท้าบวมของ amlodipine ได้เป็นอย่างดี การศึกษา START Trial พิสูจน์ว่ายารวมเม็ด SPC ลดอัตราการเสียชีวิตและภาวะแทรกซ้อนได้ดีกว่ายากินแยกเม็ด",
    "renalAdjustment": {
      "minEgfrSafe": 15,
      "cutoff": 30,
      "textEn": "No adjustment needed for mild-to-moderate CKD (eGFR >= 30). Monitor K+ and Cr.",
      "textTh": "ไม่ต้องปรับยาใน eGFR >= 30 ตรวจติดตามค่าไตและเกลือแร่สม่ำเสมอ"
    },
    "hepaticAdjustment": {
      "textEn": "Caution with amlodipine and valsartan in hepatic impairment. Do not exceed 5/80 mg.",
      "textTh": "ใช้ด้วยความระมัดระวังในโรคตับ ขนาดสูงสุดไม่ควรเกิน 5/80 มก."
    },
    "contraindications": {
      "absolute": [
        "Pregnancy",
        "Severe hepatic impairment / biliary obstruction",
        "Bilateral renal artery stenosis"
      ],
      "relative": [
        "Severe aortic stenosis",
        "Hyperkalemia"
      ]
    },
    "sideEffects": {
      "common": [
        "Dizziness",
        "Headache",
        "Peripheral edema (significantly lower than amlodipine alone)"
      ],
      "serious": [
        "Hypotension",
        "Hyperkalemia"
      ]
    },
    "precautions": [
      "Recommended as initial therapy in most patients with Grade 2 HT or Grade 1 HT with high CV risk."
    ],
    "drugInteractions": [
      "Potassium supplements, NSAIDs, Simvastatin (limit simvastatin to 20 mg)."
    ],
    "patientCounseling": {
      "en": "Take one single tablet once daily in the morning. Combines two powerful medicines into one pill to improve control and convenience.",
      "th": "รับประทานวันละ 1 เม็ดตอนเช้า รวมยาสองขนานเข้าด้วยกันช่วยให้คุมความดันได้เร็วและทานยาง่ายขึ้น"
    },
    "nlemNoteEn": null,
    "nlemNoteTh": null,
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ระดับ I, หลักฐาน A (ตารางที่ 12: เริ่มยา 2 ชนิด แนะนำยารวมเม็ด)",
    "label": {
      "name": "Exforge (US label)",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d0caec89-96ec-411d-a933-63eda74a6da7"
    }
  },
  {
    "id": "spc_telmisartan_amlodipine",
    "genericName": "Telmisartan + Amlodipine besylate",
    "nameEn": "Telmisartan / Amlodipine (SPC)",
    "nameTh": "เทลมิซาร์แทน + แอมโลดิพีน (สูตรรวมเม็ด)",
    "brandNames": [
      "Twynsta",
      "Telsar-A"
    ],
    "classId": "spc_dual",
    "classNameEn": "Dual SPC (DHP-CCB + ARB)",
    "classNameTh": "ยารวมเม็ด 2 ชนิด (CCB + ARB)",
    "formType": "spc_bilayer",
    "color": "#0d9488",
    "strengths": [
      "40/5 mg",
      "40/10 mg",
      "80/5 mg",
      "80/10 mg"
    ],
    "startDose": "40/5 mg OD morning",
    "startDoseTh": "40/5 มก. วันละ 1 ครั้งตอนเช้า",
    "maintenanceDose": "40/5 mg to 80/5 mg OD",
    "maintenanceDoseTh": "40/5 ถึง 80/5 มก. วันละ 1 ครั้ง",
    "maxDose": "80/10 mg/day",
    "maxDoseTh": "80/10 มก./วัน",
    "frequency": "OD morning",
    "costLevel": null,
    "nlem": false,
    "nlemCode": null,
    "thaiGuidelineClass": "Class I, Level A (Table 12: start 2 drugs; single pill preferred)",
    "compellingIndications": [
      "CAD",
      "DM",
      "Stroke",
      "Grade2_3_HT",
      "Metabolic_Syndrome"
    ],
    "pregnancyRisk": "contraindicated",
    "heartRateEffect": "neutral",
    "potassiumEffect": "increases",
    "mechanism": "Combines the longest-acting ARB (Telmisartan, t1/2 ~ 24h) with the longest-acting DHP-CCB (Amlodipine, t1/2 ~ 40h). Unsurpassed 24-hour BP control, complete protection against morning blood pressure surge.",
    "mechanismTh": "การรวมตัวของยา ARB ที่ออกฤทธิ์ยาวนานที่สุด (Telmisartan) กับ CCB ที่ออกฤทธิ์ยาวนานที่สุด (Amlodipine) คุมความดันโลหิตตลอด 24 ชั่วโมงได้อย่างราบเรียบที่สุดและป้องกันความดันพุ่งช่วงเช้าตรู่ได้ดีเยี่ยม",
    "renalAdjustment": {
      "minEgfrSafe": 15,
      "cutoff": 15,
      "textEn": "No dosage adjustment required in CKD or hemodialysis (Telmisartan is eliminated hepatically, amlodipine is renal safe).",
      "textTh": "ไม่ต้องปรับขนาดยาในผู้ป่วยโรคไตเรื้อรังหรือฟอกไต"
    },
    "hepaticAdjustment": {
      "textEn": "Do not exceed 40/5 mg OD in mild-to-moderate hepatic impairment.",
      "textTh": "ตับบกพร่องเล็กน้อยถึงปานกลางไม่ควรเกิน 40/5 มก./วัน"
    },
    "contraindications": {
      "absolute": [
        "Pregnancy",
        "Severe biliary obstruction / liver disease",
        "Bilateral renal artery stenosis"
      ],
      "relative": [
        "Severe aortic stenosis"
      ]
    },
    "sideEffects": {
      "common": [
        "Dizziness",
        "Headache",
        "Mild edema"
      ],
      "serious": [
        "Severe hypotension"
      ]
    },
    "precautions": [
      "Keep in blister until ingestion."
    ],
    "drugInteractions": [
      "Simvastatin (max 20mg), Digoxin."
    ],
    "patientCounseling": {
      "en": "Take one tablet every morning. Protects BP all day and all night including early morning hours.",
      "th": "รับประทานวันละ 1 เม็ดตอนเช้า คุมความดันได้ครอบคลุมตลอด 24 ชั่วโมง"
    },
    "nlemNoteEn": null,
    "nlemNoteTh": null,
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ระดับ I, หลักฐาน A (ตารางที่ 12: เริ่มยา 2 ชนิด แนะนำยารวมเม็ด)",
    "label": {
      "name": "Telmisartan and amlodipine, Mylan (US label)",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ca60a4d5-ace7-4889-94ee-e2265fd63811"
    }
  },
  {
    "id": "spc_perindopril_amlodipine",
    "genericName": "Perindopril arginine + Amlodipine besylate",
    "nameEn": "Perindopril / Amlodipine (SPC)",
    "nameTh": "เพอรินโดพริล + แอมโลดิพีน (สูตรรวมเม็ด)",
    "brandNames": [
      "Coveram"
    ],
    "classId": "spc_dual",
    "classNameEn": "Dual SPC (ACEI + DHP-CCB)",
    "classNameTh": "ยารวมเม็ด 2 ชนิด (ACEI + CCB)",
    "formType": "spc_bilayer",
    "color": "#0d9488",
    "strengths": [
      "5/5 mg",
      "5/10 mg",
      "10/5 mg",
      "10/10 mg"
    ],
    "startDose": "5/5 mg OD morning",
    "startDoseTh": "5/5 มก. วันละ 1 ครั้งตอนเช้า",
    "maintenanceDose": "5/5 mg to 10/5 mg OD",
    "maintenanceDoseTh": "5/5 ถึง 10/5 มก. วันละ 1 ครั้ง",
    "maxDose": "10/10 mg/day",
    "maxDoseTh": "10/10 มก./วัน",
    "frequency": "OD morning",
    "costLevel": null,
    "nlem": false,
    "nlemCode": null,
    "thaiGuidelineClass": "Class I, Level A (Table 12: start 2 drugs; single pill preferred)",
    "compellingIndications": [
      "CAD",
      "Stroke",
      "DM",
      "Grade2_3_HT"
    ],
    "pregnancyRisk": "contraindicated",
    "heartRateEffect": "neutral",
    "potassiumEffect": "increases",
    "mechanism": "Gold-standard ACEI + CCB combination proven in ASCOT-BPLA trial to significantly reduce all-cause mortality, cardiovascular mortality, and new-onset diabetes compared to atenolol + thiazide.",
    "mechanismTh": "คู่ผสมมาตรฐานทองคำระหว่าง ACEI และ CCB ที่พิสูจน์ใน ASCOT-BPLA Trial ว่าลดการเสียชีวิตรวม ลดการเกิดเบาหวานรายใหม่ และป้องกันโรคหลอดเลือดสมองได้อย่างเด่นชัด",
    "renalAdjustment": {
      "minEgfrSafe": 30,
      "cutoff": 80,
      "textEn": "CrCl < 30: not recommended. CrCl 30-80: do not exceed perindopril arginine 7 mg / amlodipine 5 mg (US Prestalia label). Thai strengths differ, so titrate with the separate drugs.",
      "textTh": "CrCl < 30: ไม่แนะนำ; CrCl 30-80: perindopril arginine ไม่เกิน 7 มก. / amlodipine 5 มก. (ฉลาก Prestalia สหรัฐฯ) ขนาดในไทยต่างกัน จึงควรปรับยาแยกเม็ด"
    },
    "hepaticAdjustment": {
      "textEn": "Start with lowest dose; monitor liver function.",
      "textTh": "เริ่มขนาดต่ำสุดในโรคตับ"
    },
    "contraindications": {
      "absolute": [
        "History of ACEI angioedema",
        "Pregnancy",
        "Bilateral renal artery stenosis",
        "Concurrent ARNI"
      ],
      "relative": [
        "Severe aortic stenosis"
      ]
    },
    "sideEffects": {
      "common": [
        "Dry cough (due to perindopril)",
        "Ankle edema (counteracted by perindopril)",
        "Dizziness"
      ],
      "serious": [
        "Angioedema",
        "Hypotension"
      ]
    },
    "precautions": [
      "Take before breakfast."
    ],
    "drugInteractions": [
      "ARBs contraindicated. Simvastatin max 20mg."
    ],
    "patientCounseling": {
      "en": "Take in the morning before breakfast. If persistent cough develops, notify your physician.",
      "th": "รับประทานก่อนอาหารเช้า หากมีอาการไอแห้งต่อเนื่องให้ปรึกษาแพทย์"
    },
    "nlemNoteEn": null,
    "nlemNoteTh": null,
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ระดับ I, หลักฐาน A (ตารางที่ 12: เริ่มยา 2 ชนิด แนะนำยารวมเม็ด)",
    "label": {
      "name": "Prestalia (US label; US strengths differ from Coveram)",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=eaa2bbbc-5fcc-4f15-a51c-c4e1bf320c90"
    }
  },
  {
    "id": "spc_losartan_hctz",
    "genericName": "Losartan potassium + Hydrochlorothiazide",
    "nameEn": "Losartan / HCTZ (SPC)",
    "nameTh": "โลซาร์แทน + ไฮโดรคลอโรไธอะไซด์ (สูตรรวมเม็ด)",
    "brandNames": [
      "Hyzaar",
      "Unisia",
      "Co-Lanzaar"
    ],
    "classId": "spc_dual",
    "classNameEn": "Dual SPC (ARB + Thiazide)",
    "classNameTh": "ยารวมเม็ด 2 ชนิด (ARB + Thiazide)",
    "formType": "spc_bilayer",
    "color": "#0d9488",
    "strengths": [
      "50/12.5 mg",
      "100/25 mg"
    ],
    "startDose": "50/12.5 mg OD morning",
    "startDoseTh": "50/12.5 มก. วันละ 1 ครั้งตอนเช้า",
    "maintenanceDose": "50/12.5 mg to 100/25 mg OD",
    "maintenanceDoseTh": "50/12.5 มก. ถึง 100/25 มก. วันละ 1 ครั้ง",
    "maxDose": "100/25 mg/day",
    "maxDoseTh": "100/25 มก./วัน",
    "frequency": "OD morning",
    "costLevel": null,
    "nlem": false,
    "nlemCode": null,
    "thaiGuidelineClass": "Class I, Level A (Table 12: start 2 drugs; single pill preferred)",
    "compellingIndications": [
      "ISH",
      "Stroke",
      "DM",
      "Volume_Dependent_HT"
    ],
    "pregnancyRisk": "contraindicated",
    "heartRateEffect": "neutral",
    "potassiumEffect": "neutral",
    "mechanism": "Complementary synergy: Thiazide diuretic stimulates RAAS via sodium depletion; Losartan blocks RAAS activation. Losartan mitigates HCTZ-induced hypokalemia and hyperuricemia while HCTZ boosts BP lowering efficacy.",
    "mechanismTh": "ฤทธิ์เสริมกันอย่างลงตัว: HCTZ ขับโซเดียมทำให้ระบบ RAAS ตื่นตัว โลซาร์แทนเข้าไปบล็อก RAAS ทำให้ความดันลดลงอย่างรวดเร็ว โลซาร์แทนช่วยป้องกันภาวะโพแทสเซียมต่ำและช่วยขับกรดยูริกชดเชยผลข้างเคียงของ HCTZ",
    "renalAdjustment": {
      "minEgfrSafe": 30,
      "cutoff": 30,
      "textEn": "Not recommended if eGFR < 30 mL/min/1.73m2 (HCTZ loses efficacy).",
      "textTh": "ไม่แนะนำหาก eGFR < 30 เนื่องจากส่วนประกอบ HCTZ จะหมดประสิทธิภาพ"
    },
    "hepaticAdjustment": {
      "textEn": "Not recommended for initial titration in hepatic impairment.",
      "textTh": "ไม่แนะนำให้เริ่มใช้ในผู้ป่วยตับบกพร่อง"
    },
    "contraindications": {
      "absolute": [
        "Pregnancy",
        "Anuria",
        "Refractory hypokalemia / hyponatremia",
        "Bilateral renal artery stenosis"
      ],
      "relative": [
        "Gout",
        "Severe sulfa allergy"
      ]
    },
    "sideEffects": {
      "common": [
        "Dizziness",
        "Fatigue",
        "Electrolyte imbalance (much milder than HCTZ alone)"
      ],
      "serious": [
        "Severe hypotension",
        "Renal impairment"
      ]
    },
    "precautions": [
      "Monitor electrolytes and renal panel."
    ],
    "drugInteractions": [
      "Lithium, NSAIDs, ACEIs."
    ],
    "patientCounseling": {
      "en": "Take in the morning with water. Highly effective, affordable option included in the Thai National List of Essential Medicines.",
      "th": "รับประทานตอนเช้าพร้อมน้ำ เป็นยาสูตรรวมเม็ดที่อยู่ในบัญชียาหลักแห่งชาติ ช่วยคุมความดันได้ดีและประหยัดค่าใช้จ่าย"
    },
    "nlemNoteEn": null,
    "nlemNoteTh": null,
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ระดับ I, หลักฐาน A (ตารางที่ 12: เริ่มยา 2 ชนิด แนะนำยารวมเม็ด)",
    "label": {
      "name": "Hyzaar (US label)",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4116ccde-2e23-45f4-b12f-6337df877744"
    }
  },
  {
    "id": "spc_triple_amlodipine_valsartan_hctz",
    "genericName": "Amlodipine + Valsartan + Hydrochlorothiazide",
    "nameEn": "Amlodipine / Valsartan / HCTZ (Triple SPC)",
    "nameTh": "แอมโลดิพีน + วาลซาร์แทน + HCTZ (สูตรรวมเม็ด 3 ชนิด)",
    "brandNames": [
      "Exforge HCT"
    ],
    "classId": "spc_triple",
    "classNameEn": "Triple SPC (CCB + ARB + Diuretic)",
    "classNameTh": "ยารวมเม็ด 3 ชนิด (CCB + ARB + Diuretic)",
    "formType": "spc_triple",
    "color": "#047857",
    "strengths": [
      "5/160/12.5 mg",
      "10/160/12.5 mg",
      "10/160/25 mg"
    ],
    "startDose": "5/160/12.5 mg OD morning",
    "startDoseTh": "5/160/12.5 มก. วันละ 1 ครั้งตอนเช้า",
    "maintenanceDose": "5/160/12.5 mg to 10/160/25 mg OD",
    "maintenanceDoseTh": "5/160/12.5 ถึง 10/160/25 มก. วันละ 1 ครั้ง",
    "maxDose": "10/160/25 mg/day (or 10/320/25 mg)",
    "maxDoseTh": "10/160/25 มก./วัน",
    "frequency": "OD morning",
    "costLevel": null,
    "nlem": false,
    "nlemCode": null,
    "thaiGuidelineClass": "Class I, Level A (Table 12: 3-drug step RAS blocker + CCB + diuretic)",
    "compellingIndications": [
      "Resistant",
      "Severe_Grade3_HT",
      "Uncontrolled_Dual_Therapy"
    ],
    "pregnancyRisk": "contraindicated",
    "heartRateEffect": "neutral",
    "potassiumEffect": "neutral",
    "mechanism": "Triple synergistic attack on 3 independent hypertensive pathways: vascular tone (CCB), renin-angiotensin-aldosterone axis (ARB), and sodium-volume expansion (Diuretic). Maximizes adherence by combining 3 full-strength drugs into ONE single morning tablet.",
    "mechanismTh": "ยารวม 3 กลไกหลักที่ออกฤทธิ์อิสระต่อกัน: ขยายหลอดเลือดแดง (CCB) + บล็อกระบบฮอร์โมนเรนิน-แองจิโอเทนซิน (ARB) + ขับโซเดียมและลดปริมาตรน้ำ (Diuretic) รวมเป็นเม็ดเดียวตอนเช้า เพิ่มความร่วมมือในการรับประทานยาอย่างสูงสุดสำหรับผู้ที่ใช้ยา 2 ขนานแล้วยังคุมความดันไม่ได้",
    "renalAdjustment": {
      "minEgfrSafe": 30,
      "cutoff": 30,
      "textEn": "Avoid if eGFR < 30 mL/min/1.73m2 due to HCTZ component.",
      "textTh": "หลีกเลี่ยงหาก eGFR < 30 เนื่องจากส่วนประกอบ HCTZ"
    },
    "hepaticAdjustment": {
      "textEn": "Use with caution in moderate hepatic impairment; contraindicated in severe cirrhosis.",
      "textTh": "ระวังในโรคตับปานกลาง ห้ามใช้ในตับแข็งรุนแรง"
    },
    "contraindications": {
      "absolute": [
        "Pregnancy",
        "Severe hepatic impairment / biliary cirrhosis",
        "Anuria",
        "Bilateral renal artery stenosis"
      ],
      "relative": [
        "Severe gout",
        "Aortic stenosis"
      ]
    },
    "sideEffects": {
      "common": [
        "Dizziness",
        "Headache",
        "Peripheral edema",
        "Fatigue"
      ],
      "serious": [
        "Severe hypotension",
        "Electrolyte imbalance"
      ]
    },
    "precautions": [
      "Ensure patient is adequately hydrated before initiating triple therapy."
    ],
    "drugInteractions": [
      "Avoid other ACEI/ARBs. Simvastatin max 20mg."
    ],
    "patientCounseling": {
      "en": "Take ONE tablet each morning. Replaces 3 separate tablets, drastically reducing pill burden and improving blood pressure control.",
      "th": "รับประทานเพียงวันละ 1 เม็ดตอนเช้า แทนการรับประทานยาแยกกันถึง 3 เม็ด ช่วยลดจำนวนเม็ดยาและควบคุมความดันได้ดียิ่งขึ้น"
    },
    "nlemNoteEn": null,
    "nlemNoteTh": null,
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ระดับ I, หลักฐาน A (ตารางที่ 12: ยา 3 ชนิด RAS blocker + CCB + diuretic)",
    "label": {
      "name": "Exforge HCT (US label)",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=18d7820d-471f-4ee2-9ec6-25d8d27c77de"
    }
  },
  {
    "id": "doxazosin",
    "genericName": "Doxazosin mesylate",
    "nameEn": "Doxazosin",
    "nameTh": "ด็อกซาโซซิน",
    "brandNames": [
      "Cardura",
      "Cardura XL",
      "Doxazosin GPO",
      "Kamiren"
    ],
    "classId": "alpha_blocker",
    "classNameEn": "Selective Alpha-1 Adrenergic Blocker",
    "classNameTh": "อัลฟา-1 บล็อกเกอร์ (Alpha-1 Blocker)",
    "formType": "tablet_scored_round",
    "color": "#9333ea",
    "strengths": [
      "2 mg",
      "4 mg",
      "4 mg XL"
    ],
    "startDose": "1 mg OD at bedtime (or 4 mg XL OD morning)",
    "startDoseTh": "1 มก. ก่อนนอน (หรือชนิด XL 4 มก. เช้า)",
    "maintenanceDose": "2 - 8 mg OD (Cardura XL: 4 - 8 mg OD)",
    "maintenanceDoseTh": "2 - 8 มก. วันละ 1 ครั้ง (XL: 4 - 8 มก.)",
    "maxDose": "16 mg/day (standard) or 8 mg/day (XL)",
    "maxDoseTh": "16 มก./วัน (มาตรฐาน) หรือ 8 มก./วัน (XL)",
    "frequency": "OD bedtime (standard) or morning (XL)",
    "costLevel": null,
    "nlem": true,
    "nlemCode": "s",
    "thaiGuidelineClass": "Not graded (Figure 6: resistant HT step 3 add-on)",
    "compellingIndications": [
      "BPH",
      "Resistant",
      "Pheochromocytoma",
      "Dyslipidemia"
    ],
    "pregnancyRisk": "caution",
    "heartRateEffect": "neutral",
    "potassiumEffect": "neutral",
    "mechanism": "Selective post-synaptic alpha-1 adrenergic receptor antagonist; relaxes vascular smooth muscle in resistance arterioles and relaxes prostate smooth muscle. Key preparation drug for Pheochromocytoma (PPGL) and Step 3 add-on in Resistant HT.",
    "mechanismTh": "ยับยั้งตัวรับ alpha-1 ที่หลอดเลือดและต่อมลูกหมาก คลายกล้ามเนื้อเรียบหลอดเลือดแดงและคอกระเพาะปัสสาวะ เหมาะมากสำหรับผู้ชายสูงอายุที่มีต่อมลูกหมากโต (BPH) ร่วมด้วย และเป็นยาสำคัญในขั้นตอนที่ 3 ของ Resistant HT รวมถึงการเตรียมผ่าตัดเนื้องอกฟีโอโครโมไซโตมา",
    "renalAdjustment": {
      "minEgfrSafe": 0,
      "cutoff": 0,
      "textEn": "No dosage adjustment required in renal impairment or dialysis.",
      "textTh": "ไม่ต้องปรับขนาดยาในผู้ป่วยโรคไตหรือฟอกไต"
    },
    "hepaticAdjustment": {
      "textEn": "Titrate cautiously in hepatic impairment.",
      "textTh": "ค่อยๆ ปรับขนาดยาในโรคตับ"
    },
    "contraindications": {
      "absolute": [
        "Known hypersensitivity to quinazolines",
        "History of orthostatic hypotension"
      ],
      "relative": [
        "Heart failure due to mechanical obstruction"
      ]
    },
    "sideEffects": {
      "common": [
        "First-dose orthostatic syncope / severe postural hypotension",
        "Dizziness",
        "Headache",
        "Edema / fluid retention",
        "Nasal congestion"
      ],
      "serious": [
        "Severe syncope / collapse",
        "Priapism (extremely rare)"
      ]
    },
    "precautions": [
      "FIRST-DOSE PHENOMENON: First dose should always be taken at BEDTIME to avoid sudden postural collapse/syncope.",
      "Cardura XL should be swallowed whole, not chewed or crushed."
    ],
    "drugInteractions": [
      "PDE-5 Inhibitors (Sildenafil, Tadalafil): High risk of profound symptomatic hypotension; separate administration by at least 4-6 hours.",
      "Other vasodilators."
    ],
    "patientCounseling": {
      "en": "Take the first dose at bedtime. Rise slowly from bed or chair. Also helps ease urination if you have an enlarged prostate.",
      "th": "เริ่มกินเม็ดแรกก่อนนอนเพื่อป้องกันอาการหน้ามืดเป็นลม ลุกจากเตียงหรือเก้าอี้ช้าๆ ยานี้ช่วยให้ปัสสาวะคล่องขึ้นในผู้ป่วยต่อมลูกหมากโต"
    },
    "nlemNoteEn": "Immediate-release tablet only (not XL)",
    "nlemNoteTh": "เฉพาะชนิด immediate release (ไม่รวม XL)",
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ไม่ได้ระบุระดับ (ภาพที่ 6: ยาเพิ่มเติมขั้นที่ 3 ใน resistant HT)",
    "label": {
      "name": "Cardura (US label); Cardura XL is labelled for BPH only",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5e1f5e49-2da1-43ab-9795-228a8bcc5a82"
    }
  },
  {
    "id": "methyldopa",
    "genericName": "Methyldopa",
    "nameEn": "Methyldopa",
    "nameTh": "เมทิลโดปา",
    "brandNames": [
      "Aldomet",
      "Methyldopa GPO"
    ],
    "classId": "central_agonist",
    "classNameEn": "Centrally Acting Alpha-2 Agonist",
    "classNameTh": "ยาออกฤทธิ์กระตุ้นตัวรับอัลฟา-2 ในสมอง",
    "formType": "tablet_scored_round",
    "color": "#a855f7",
    "strengths": [
      "125 mg",
      "250 mg"
    ],
    "startDose": "250 mg BID or TID",
    "startDoseTh": "250 มก. วันละ 2 - 3 ครั้ง",
    "maintenanceDose": "500 - 1,500 mg/day in 2 to 3 divided doses",
    "maintenanceDoseTh": "500 - 1,500 มก./วัน แบ่งวันละ 2 - 3 ครั้ง",
    "maxDose": "3,000 mg/day (usually 2,000 mg/day in practice)",
    "maxDoseTh": "3,000 มก./วัน (ทั่วไปไม่เกิน 2,000 มก./วัน)",
    "frequency": "BID or TID",
    "costLevel": null,
    "nlem": true,
    "nlemCode": "b",
    "thaiGuidelineClass": "Not graded (Figure 6: resistant HT step 3 add-on)",
    "compellingIndications": [
      "Pregnancy",
      "Preeclampsia_Prevention"
    ],
    "pregnancyRisk": "safe_first_line",
    "heartRateEffect": "decreases",
    "potassiumEffect": "neutral",
    "mechanism": "Converted centrally to alpha-methylnorepinephrine, stimulating central inhibitory alpha-2 adrenergic receptors, reducing sympathetic outflow to heart, kidneys, and peripheral vasculature. Unrivaled 40+ year safety record in pregnancy.",
    "mechanismTh": "เปลี่ยนเป็น alpha-methylnorepinephrine ในสมอง ออกฤทธิ์กระตุ้นตัวรับ alpha-2 ในระบบประสาทส่วนกลาง ลดการส่งสัญญาณ sympathetic เป็นยาลดความดันขนานแรกที่มีประวัติความปลอดภัยยาวนานที่สุดในสตรีมีครรภ์ ไม่เป็นอันตรายต่อทารกในครรภ์",
    "renalAdjustment": {
      "minEgfrSafe": 15,
      "cutoff": 50,
      "textEn": "CrCl < 50: Increase dosing interval to q 8-12h; CrCl < 10: q 12-24h.",
      "textTh": "eGFR < 50: ขยายช่วงเวลาให้ยาทุก 8-12 ชม.; eGFR < 10: ให้ยาทุก 12-24 ชม."
    },
    "hepaticAdjustment": {
      "textEn": "Contraindicated in active hepatic disease (acute hepatitis, active cirrhosis).",
      "textTh": "ห้ามใช้ในโรคตับเฉียบพลันหรือตับแข็งที่มีอาการ"
    },
    "contraindications": {
      "absolute": [
        "Active liver disease",
        "History of methyldopa-induced hepatitis or hemolytic anemia",
        "Concurrent MAO inhibitors"
      ],
      "relative": [
        "Severe depression"
      ]
    },
    "sideEffects": {
      "common": [
        "Sedation / Drowsiness (very common at start)",
        "Dry mouth",
        "Headache",
        "Fluid retention",
        "Nasal congestion"
      ],
      "serious": [
        "Drug-induced Coombs-positive autoimmune hemolytic anemia (1-2%)",
        "Hepatotoxicity / Drug hepatitis",
        "Lupus-like syndrome"
      ]
    },
    "precautions": [
      "Check CBC and baseline LFT before starting and periodically.",
      "Positive direct Coombs test develops in 10-20% of patients on chronic therapy (hemolytic anemia occurs in <1%)."
    ],
    "drugInteractions": [
      "Iron supplements (reduces methyldopa absorption significantly; space by 2 hours), MAOIs."
    ],
    "patientCounseling": {
      "en": "Take 2-3 times daily. You may feel drowsy or sleepy during the first few days; this usually wears off. First-line safe choice during pregnancy.",
      "th": "รับประทานวันละ 2-3 ครั้ง อาจมีอาการง่วงซึมในช่วง 2-3 วันแรกแล้วจะค่อยๆ ดีขึ้น เป็นยาที่ปลอดภัยที่สุดสำหรับแม่และลูกในครรภ์"
    },
    "nlemNoteEn": null,
    "nlemNoteTh": null,
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ไม่ได้ระบุระดับ (ภาพที่ 6: ยาเพิ่มเติมขั้นที่ 3 ใน resistant HT)",
    "label": {
      "name": "Methyldopa tablets, Rising (US label)",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9e22e1d8-04ec-4b67-92ea-b09c706f2703"
    }
  },
  {
    "id": "clonidine",
    "genericName": "Clonidine HCl",
    "nameEn": "Clonidine",
    "nameTh": "โคลนิดีน",
    "brandNames": [
      "Catapres"
    ],
    "classId": "central_agonist",
    "classNameEn": "Centrally Acting Alpha-2 Agonist",
    "classNameTh": "ยาออกฤทธิ์กระตุ้นอัลฟา-2 ในสมอง",
    "formType": "tablet_scored_round",
    "color": "#a855f7",
    "strengths": [
      "0.15 mg (150 mcg)"
    ],
    "startDose": "0.075 - 0.15 mg BID",
    "startDoseTh": "0.075 - 0.15 มก. วันละ 2 ครั้ง",
    "maintenanceDose": "0.15 - 0.6 mg/day divided BID or TID",
    "maintenanceDoseTh": "0.15 - 0.6 มก./วัน แบ่งวันละ 2-3 ครั้ง",
    "maxDose": "1.2 mg/day",
    "maxDoseTh": "1.2 มก./วัน",
    "frequency": "BID or TID",
    "costLevel": null,
    "nlem": false,
    "nlemCode": null,
    "thaiGuidelineClass": "Not graded (Figure 6: resistant HT step 3 add-on)",
    "compellingIndications": [
      "Resistant",
      "Pre_Critical_HT",
      "Sympathetic_Overactivity"
    ],
    "pregnancyRisk": "caution",
    "heartRateEffect": "decreases",
    "potassiumEffect": "neutral",
    "mechanism": "Stimulates alpha-2 adrenergic receptors in brainstem, reducing central sympathetic outflow, reducing peripheral vascular resistance, heart rate, and BP. Rapid oral onset makes it useful in Pre-critical Symptomatic HT (PSH).",
    "mechanismTh": "กระตุ้นตัวรับ alpha-2 ในก้านสมอง ลด sympathetic outflow ส่งผลให้ความดันและชีพจรลดลง ออกฤทธิ์เร็วทางปาก ใช้เป็นยาเสริมใน Resistant HT และใช้แบบค่อยเป็นค่อยไปใน Pre-critical Symptomatic HT (PSH)",
    "renalAdjustment": {
      "minEgfrSafe": 15,
      "cutoff": 15,
      "textEn": "Dose adjustment according to BP response; excreted 50% unchanged by kidneys.",
      "textTh": "ปรับขนาดตามการตอบสนองของความดันโลหิต ขับออกทางไต 50%"
    },
    "hepaticAdjustment": {
      "textEn": "No specific adjustment.",
      "textTh": "ไม่ต้องปรับขนาดเฉพาะ"
    },
    "contraindications": {
      "absolute": [
        "Severe bradyarrhythmias / sick sinus syndrome"
      ],
      "relative": [
        "Depression",
        "Severe Raynaud syndrome"
      ]
    },
    "sideEffects": {
      "common": [
        "Dry mouth (>40%)",
        "Severe drowsiness / sedation",
        "Dizziness",
        "Constipation"
      ],
      "serious": [
        "REBOUND HYPERTENSIVE CRISIS upon abrupt withdrawal",
        "Severe bradycardia / AV block"
      ]
    },
    "precautions": [
      "SEVERE WARNING: NEVER STOP SUDDENLY! Abrupt withdrawal causes massive sympathetic storm with hypertensive crisis and catecholamine surge.",
      "Must taper over 2-4 days when discontinuing."
    ],
    "drugInteractions": [
      "Beta-blockers: If stopping both, stop beta-blocker first, then clonidine several days later."
    ],
    "patientCounseling": {
      "en": "Take as prescribed. NEVER RUN OUT OF MEDICATION OR STOP SUDDENLY, as blood pressure can dangerously rebound. Sips of water help dry mouth.",
      "th": "รับประทานตรงเวลา ห้ามหยุดยาเองกะทันหันเด็ดขาด เพราะความดันจะพุ่งสูงอย่างรุนแรงและอันตรายมาก จิบน้ำบ่อยๆ ช่วยแก้ปากแห้ง"
    },
    "nlemNoteEn": "Listed only for heroin withdrawal (section 4.10.3), not for hypertension",
    "nlemNoteTh": "อยู่ในบัญชีเฉพาะข้อบ่งใช้ heroin withdrawal (หมวด 4.10.3) ไม่ใช่สำหรับความดันโลหิตสูง",
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ไม่ได้ระบุระดับ (ภาพที่ 6: ยาเพิ่มเติมขั้นที่ 3 ใน resistant HT)",
    "label": {
      "name": "Clonidine tablets, Alembic (US label)",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=cf493e6a-1603-4c7d-a442-69a119bec843"
    }
  },
  {
    "id": "hydralazine",
    "genericName": "Hydralazine HCl",
    "nameEn": "Hydralazine",
    "nameTh": "ไฮดราลาซีน",
    "brandNames": [
      "Apresoline",
      "Hydralazine GPO",
      "Cesoline"
    ],
    "classId": "direct_vasodilator",
    "classNameEn": "Direct-Acting Arteriolar Vasodilator",
    "classNameTh": "ยาขยายหลอดเลือดแดงโดยตรง (Direct Vasodilator)",
    "formType": "tablet_scored_round",
    "color": "#c026d3",
    "strengths": [
      "25 mg",
      "50 mg",
      "20 mg/mL ampoule (IV)"
    ],
    "startDose": "Oral: 25 mg TID or QID (IV in crisis: 5 mg bolus)",
    "startDoseTh": "กิน: 25 มก. วันละ 3-4 ครั้ง (ยาฉีดในภาวะวิกฤต: 5 มก. bolus)",
    "maintenanceDose": "Oral: 50 - 200 mg/day divided TID/QID",
    "maintenanceDoseTh": "กิน: 50 - 200 มก./วัน แบ่งวันละ 3-4 ครั้ง",
    "maxDose": "200 mg/day (doses > 200 mg drastically increase Drug-Induced Lupus Erythematosus risk)",
    "maxDoseTh": "200 มก./วัน (หากเกิน 200 มก. เสี่ยงต่อการเกิดโรคลูปัสจากยา DILE สูงมาก)",
    "frequency": "TID or QID",
    "costLevel": null,
    "nlem": true,
    "nlemCode": "b",
    "thaiGuidelineClass": "Class I, Level B (Table 30: emergent BP control in pregnancy)",
    "compellingIndications": [
      "Preeclampsia_Crisis",
      "Pregnancy",
      "Resistant",
      "HFrEF_with_Nitrate"
    ],
    "pregnancyRisk": "safe_first_line",
    "heartRateEffect": "increases",
    "potassiumEffect": "neutral",
    "mechanism": "Direct relaxation of arteriolar vascular smooth muscle via cellular calcium inhibition. Triggers potent reflex sympathetic tachycardia and sodium/water retention; MUST be paired with a beta-blocker and diuretic in chronic use.",
    "mechanismTh": "ออกฤทธิ์คลายกล้ามเนื้อเรียบของผนังหลอดเลือดแดงโดยตรงอย่างรวดเร็ว กระตุ้นให้เกิดหัวใจเต้นเร็ว (reflex tachycardia) และคั่งน้ำอย่างรุนแรง ในการรักษาเรื้อรังจึงจำเป็นต้องให้ร่วมกับ beta-blocker และยาขับปัสสาวะเสมอ เป็นยาฉีดมาตรฐานในวิกฤตความดันโลหิตสูงในสตรีตั้งครรภ์",
    "renalAdjustment": {
      "minEgfrSafe": 0,
      "cutoff": 50,
      "textEn": "CrCl 10-50: q 8h; CrCl < 10: q 8-16h.",
      "textTh": "eGFR 10-50: ให้ยาทุก 8 ชม.; eGFR < 10: ให้ยาทุก 8-16 ชม."
    },
    "hepaticAdjustment": {
      "textEn": "Dose reduction in severe hepatic impairment.",
      "textTh": "ปรับลดขนาดยาในตับบกพร่องรุนแรง"
    },
    "contraindications": {
      "absolute": [
        "Coronary artery disease (triggers angina/MI from reflex tachycardia)",
        "Mitral valve rheumatic heart disease",
        "Aortic dissection (contraindicated alone)"
      ],
      "relative": [
        "Systemic lupus erythematosus"
      ]
    },
    "sideEffects": {
      "common": [
        "Reflex tachycardia / palpitations",
        "Headache",
        "Flushing",
        "Peripheral edema / fluid retention",
        "Nausea"
      ],
      "serious": [
        "Drug-Induced Lupus Erythematosus (DILE; positive ANA, arthralgia, fever, esp. slow acetylators at >200mg/d)",
        "Myocardial ischemia"
      ]
    },
    "precautions": [
      "In non-pregnant chronic HT: DO NOT use as monotherapy! Always combine with beta-blocker (to prevent tachycardia) and diuretic (to prevent edema).",
      "IV Protocol in Pregnancy (Table 30): 5 mg IV bolus, then 5-10 mg q 20-40 min (max 20 mg), or IV infusion 0.5-10 mg/h."
    ],
    "drugInteractions": [
      "Potentiates other antihypertensives."
    ],
    "patientCounseling": {
      "en": "Take with meals at evenly spaced times (3 to 4 times a day). Report any persistent joint pain, unexplained fever, or rapid heartbeat.",
      "th": "รับประทานพร้อมอาหารวันละ 3-4 ครั้งตรงเวลา หากมีอาการปวดข้อ มีไข้ หรือใจสั่นเต้นเร็วผิดปกติให้แจ้งแพทย์"
    },
    "nlemNoteEn": "Injection: for hypertensive emergencies in pregnancy",
    "nlemNoteTh": "ชนิดฉีดใช้สำหรับ hypertensive emergencies ในหญิงตั้งครรภ์",
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ระดับ I, หลักฐาน B (ตารางที่ 30: ควบคุมความดันเร่งด่วนในหญิงตั้งครรภ์)",
    "label": {
      "name": "Hydralazine tablets (US label)",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=336b11da-e592-4386-921f-3c136d754f2a"
    }
  },
  {
    "id": "nicardipine_iv",
    "genericName": "Nicardipine HCl (IV)",
    "nameEn": "Nicardipine IV",
    "nameTh": "นิคาร์ดิพีน ชนิดฉีดเข้าหลอดเลือดดำ (IV)",
    "brandNames": [
      "Cardene IV",
      "Nicardipine GPO IV"
    ],
    "classId": "iv_crisis_class",
    "classNameEn": "IV Calcium Channel Blocker",
    "classNameTh": "ยาฉีดขยายหลอดเลือด CCB ในภาวะวิกฤต",
    "formType": "iv_vial",
    "color": "#e11d48",
    "strengths": [
      "10 mg/10 mL ampoule",
      "25 mg/10 mL ampoule"
    ],
    "startDose": "IV infusion: 5 mg/h (titrate by 2.5 mg/h q 5-15 min, max 15 mg/h)",
    "startDoseTh": "หยดเข้าหลอดเลือดดำ: เริ่ม 5 มก./ชม. (ปรับเพิ่มครั้งละ 2.5 มก./ชม. ทุก 5-15 นาที สูงสุด 15 มก./ชม.)",
    "maintenanceDose": "3 - 5 mg/h once target BP reached",
    "maintenanceDoseTh": "3 - 5 มก./ชม. เมื่อได้ระดับความดันตามเป้าหมาย",
    "maxDose": "15 mg/h",
    "maxDoseTh": "15 มก./ชม.",
    "frequency": "Continuous IV Infusion",
    "costLevel": null,
    "nlem": true,
    "nlemCode": "s",
    "thaiGuidelineClass": "Class I, Level A (Table 42: IV drugs for emergencies; choice by organ, Table 41)",
    "compellingIndications": [
      "Hypertensive_Emergency",
      "Acute_Ischemic_Stroke",
      "sICH",
      "Encephalopathy",
      "Malignant_HT",
      "Aortic_Dissection"
    ],
    "pregnancyRisk": "caution",
    "heartRateEffect": "neutral",
    "potassiumEffect": "neutral",
    "mechanism": "Second-generation dihydropyridine CCB with high vascular selectivity for coronary and cerebral blood vessels; fast onset (5-15 min), linear dose-response, and easily titratable half-life without raising intracranial pressure.",
    "mechanismTh": "ยาฉีด CCB ที่มีความเจาะจงต่อหลอดเลือดสมองและหัวใจสูงมาก ออกฤทธิ์เร็ว ปรับขนาดยาได้แม่นยำ ไม่เพิ่มความดันในกะโหลกศีรษะ (ICP) เป็นยาอันดับ 1 ในผู้ป่วยหลอดเลือดสมองเฉียบพลัน ทั้งสโตรกขาดเลือดและเลือดออกในสมอง (sICH)",
    "renalAdjustment": {
      "minEgfrSafe": 0,
      "cutoff": 0,
      "textEn": "Titrate carefully in renal impairment.",
      "textTh": "ค่อยๆ ปรับขนาดยาในผู้ป่วยไตวาย"
    },
    "hepaticAdjustment": {
      "textEn": "Titrate slowly in severe liver dysfunction.",
      "textTh": "ค่อยๆ ปรับขนาดยาในผู้ป่วยตับวาย"
    },
    "contraindications": {
      "absolute": [
        "Advanced aortic stenosis",
        "Hypersensitivity to nicardipine"
      ],
      "relative": [
        "Acute decompensated heart failure with reduced EF (can reduce contractility)"
      ]
    },
    "sideEffects": {
      "common": [
        "Headache",
        "Flushing",
        "Nausea/vomiting",
        "Local vein irritation/phlebitis (change infusion site q 12h)"
      ],
      "serious": [
        "Severe precipitous hypotension",
        "Reflex tachycardia"
      ]
    },
    "precautions": [
      "Dilute in D5W or NSS (e.g. 25 mg in 250 mL = 0.1 mg/mL).",
      "Change peripheral IV infusion site every 12 hours to prevent thrombophlebitis; central line preferred if available.",
      "In Acute Ischemic Stroke: reduce SBP < 185/110 before thrombolysis; maintain < 180/105 for 24 hours."
    ],
    "drugInteractions": [
      "Beta-blockers (synergistic BP drop), Cyclosporine."
    ],
    "patientCounseling": {
      "en": "Administered in ICU/emergency room with continuous blood pressure monitoring.",
      "th": "ให้ยาทางสายน้ำเกลือในห้องฉุกเฉินหรือไอซียู พร้อมวัดความดันโลหิตอย่างต่อเนื่องทุก 5-15 นาที"
    },
    "nlemNoteEn": "For hypertensive emergencies without cardiac complications, or when nitroprusside or glyceryl trinitrate cannot be used",
    "nlemNoteTh": "ใช้กับ hypertensive emergencies ที่ไม่มีภาวะแทรกซ้อนทางหัวใจ หรือใช้แทนเมื่อใช้ sodium nitroprusside หรือ glyceryl trinitrate ไม่ได้",
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ระดับ I, หลักฐาน A (ตารางที่ 42: ยาฉีดใน emergency; เลือกตามอวัยวะ ตารางที่ 41)",
    "label": {
      "name": "Cardene IV (US label)",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5499cfac-9147-4d5d-a8cb-f8d64f1481af"
    }
  },
  {
    "id": "labetalol_iv",
    "genericName": "Labetalol HCl (IV & Oral)",
    "nameEn": "Labetalol IV / Oral",
    "nameTh": "ลาเบทาลอล ชนิดฉีดและกิน",
    "brandNames": [
      "Trandate",
      "Labetalol Hospira"
    ],
    "classId": "iv_crisis_class",
    "classNameEn": "Combined Alpha-1 & Beta Blocker (IV/Oral)",
    "classNameTh": "อัลฟาและเบต้าบล็อกเกอร์ ชนิดฉีด/กิน",
    "formType": "iv_vial",
    "color": "#e11d48",
    "strengths": [
      "100 mg/20 mL vial (5 mg/mL)",
      "100 mg tablet",
      "200 mg tablet"
    ],
    "startDose": "IV Bolus: 10 - 20 mg over 1-2 min; OR IV Infusion: 1 - 2 mg/min",
    "startDoseTh": "IV Bolus: 10 - 20 มก. ฉีดช้าๆ 1-2 นาที; หรือ หยดเข้าหลอดเลือด 1 - 2 มก./นาที",
    "maintenanceDose": "IV Infusion: 2 - 8 mg/min (or repeat bolus 20-80 mg q 10 min, max 300 mg)",
    "maintenanceDoseTh": "หยดเข้าหลอดเลือด 2 - 8 มก./นาที (หรือฉีดซ้ำ 20-80 มก. ทุก 10-30 นาที รวมไม่เกิน 300 มก.)",
    "maxDose": "Cumulative 300 mg/day IV (Oral: up to 2,400 mg/day)",
    "maxDoseTh": "รวมไม่เกิน 300 มก. สำหรับยาฉีด (ยากินสูงสุด 2,400 มก./วัน)",
    "frequency": "IV Bolus / Continuous Infusion",
    "costLevel": null,
    "nlem": true,
    "nlemCode": "ex",
    "thaiGuidelineClass": "Class I, Level A (Table 42: IV drugs for emergencies; choice by organ, Table 41)",
    "compellingIndications": [
      "Preeclampsia_Crisis",
      "Aortic_Dissection",
      "Acute_Ischemic_Stroke",
      "ACS",
      "sICH"
    ],
    "pregnancyRisk": "safe_first_line",
    "heartRateEffect": "decreases",
    "potassiumEffect": "neutral",
    "mechanism": "Antagonizes both alpha-1 and beta-adrenergic receptors (ratio 1:7 IV, 1:3 oral). Reduces systemic vascular resistance without causing reflex tachycardia or altering cerebral/renal blood flow. Safe and gold standard in pregnancy crisis.",
    "mechanismTh": "บล็อกทั้งตัวรับ alpha-1 และ beta (อัตราส่วน 1:7 ทาง IV) ลดแรงต้านทานหลอดเลือดส่วนปลายโดยไม่ทำให้หัวใจเต้นเร็ว และไม่ลดเลือดที่ไปเลี้ยงสมอง ไต หรือมดลูก เป็นยาอันดับ 1 ในภาวะวิกฤตความดันโลหิตสูงในสตรีตั้งครรภ์ และโรคหลอดเลือดแดงใหญ่เอออร์ตาฉีกขาด (Aortic dissection)",
    "renalAdjustment": {
      "minEgfrSafe": 0,
      "cutoff": 0,
      "textEn": "No dose adjustment required in renal failure.",
      "textTh": "ไม่ต้องปรับขนาดยาในผู้ป่วยไตวาย"
    },
    "hepaticAdjustment": {
      "textEn": "Extensively metabolized by liver; caution in severe cirrhosis.",
      "textTh": "ระวังในโรคตับแข็งรุนแรง"
    },
    "contraindications": {
      "absolute": [
        "Severe acute pulmonary edema / cardiogenic shock (Table 41 footnote: AVOID in severe pulmonary congestion)",
        "Second- or third-degree AV block",
        "Severe active bronchial asthma"
      ],
      "relative": [
        "Bradycardia (HR < 60)"
      ]
    },
    "sideEffects": {
      "common": [
        "Dizziness",
        "Nausea",
        "Scalp tingling / paresthesia",
        "Orthostatic hypotension on standing"
      ],
      "serious": [
        "Severe bradycardia",
        "Bronchospasm",
        "Heart block"
      ]
    },
    "precautions": [
      "Avoid in acute decompensated heart failure with severe pulmonary edema (negative inotropic effect worsens congestion).",
      "Patient must remain supine during IV administration and for 3 hours afterward."
    ],
    "drugInteractions": [
      "Verapamil/Diltiazem (severe bradycardia)."
    ],
    "patientCounseling": {
      "en": "Keep lying flat during and after IV infusion. Scalp tingling is a known harmless sensation of the medication.",
      "th": "ต้องนอนราบระหว่างให้ยาฉีดและหลังให้ยาอย่างน้อย 3 ชั่วโมง อาการคันยิบๆ ที่หนังศีรษะเป็นฤทธิ์ของยา ไม่อันตราย"
    },
    "nlemNoteEn": "For hypertensive emergencies",
    "nlemNoteTh": "ใช้สำหรับ hypertensive emergencies",
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ระดับ I, หลักฐาน A (ตารางที่ 42: ยาฉีดใน emergency; เลือกตามอวัยวะ ตารางที่ 41)",
    "label": {
      "name": "Labetalol injection, Hospira (US label)",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=abfc6b75-1ed5-41f1-0484-4597488237bc"
    }
  },
  {
    "id": "nitroglycerin_iv",
    "genericName": "Nitroglycerin (IV)",
    "nameEn": "Nitroglycerin IV (NTG)",
    "nameTh": "ไนโตรกลีเซอรีน ชนิดฉีด (NTG)",
    "brandNames": [
      "Nitroglycerin IV",
      "Nitro-Bid IV"
    ],
    "classId": "iv_crisis_class",
    "classNameEn": "IV Nitrate Vasodilator",
    "classNameTh": "ยาฉีดกลุ่มไนเตรตขยายหลอดเลือดดำและหลอดเลือดหัวใจ",
    "formType": "iv_vial",
    "color": "#e11d48",
    "strengths": [
      "50 mg/10 mL vial"
    ],
    "startDose": "IV Infusion: 5 mcg/min (titrate by 5 mcg/min q 3-5 min)",
    "startDoseTh": "หยดเข้าหลอดเลือด: เริ่ม 5 ไมโครกรัม/นาที (ปรับเพิ่มครั้งละ 5 ไมโครกรัม/นาที ทุก 3-5 นาที)",
    "maintenanceDose": "10 - 100 mcg/min (titrate to symptom & BP response)",
    "maintenanceDoseTh": "10 - 100 ไมโครกรัม/นาที ตามการตอบสนอง",
    "maxDose": "200 mcg/min",
    "maxDoseTh": "200 ไมโครกรัม/นาที",
    "frequency": "Continuous IV Infusion",
    "costLevel": null,
    "nlem": true,
    "nlemCode": "b",
    "thaiGuidelineClass": "Class I, Level A (Table 42: IV drugs for emergencies; choice by organ, Table 41)",
    "compellingIndications": [
      "ACS",
      "Acute_Pulmonary_Edema",
      "ADHF"
    ],
    "pregnancyRisk": "caution",
    "heartRateEffect": "increases",
    "potassiumEffect": "neutral",
    "mechanism": "Generates nitric oxide, stimulating guanylyl cyclase to increase cGMP; causes potent venodilation (reducing preload and LV filling pressures) and dilates coronary arteries. At higher doses (>100 mcg/min), also provides arteriolar dilation (reducing afterload).",
    "mechanismTh": "เปลี่ยนเป็น nitric oxide ขยายหลอดเลือดดำอย่างทรงพลัง (venodilation) ลด preload และแรงดันในหัวใจห้องซ้าย และขยายหลอดเลือดหัวใจโคโรนารี เหมาะที่สุดสำหรับวิกฤตความดันโลหิตสูงที่มีกล้ามเนื้อหัวใจขาดเลือด (ACS) หรือน้ำท่วมปอดเฉียบพลัน (Pulmonary Edema)",
    "renalAdjustment": {
      "minEgfrSafe": 0,
      "cutoff": 0,
      "textEn": "No dose adjustment in renal impairment.",
      "textTh": "ไม่ต้องปรับขนาดยาในผู้ป่วยไตวาย"
    },
    "hepaticAdjustment": {
      "textEn": "Caution in severe hepatic impairment.",
      "textTh": "ระวังในโรคตับรุนแรง"
    },
    "contraindications": {
      "absolute": [
        "Concomitant PDE-5 inhibitors (Sildenafil/Vardenafil within 24h, Tadalafil within 48h -> FATAL HYPOTENSION)",
        "Right ventricular infarction",
        "Severe aortic stenosis / hypertrophic obstructive cardiomyopathy",
        "Severe hypotension (SBP < 90 mmHg)"
      ],
      "relative": [
        "Severe bradycardia or tachycardia"
      ]
    },
    "sideEffects": {
      "common": [
        "Throbbing headache (very common)",
        "Reflex tachycardia",
        "Flushing",
        "Tolerance (tachyphylaxis after 24-48h)"
      ],
      "serious": [
        "Severe hypotension",
        "Methemoglobinemia (prolonged high-dose infusions)"
      ]
    },
    "precautions": [
      "In ACS: DO NOT lower SBP < 110 mmHg or DBP < 60 mmHg to maintain coronary perfusion pressure (Table 41).",
      "Use non-PVC tubing to avoid drug absorption into plastic."
    ],
    "drugInteractions": [
      "STRICT CONTRAINDICATION WITH PDE-5 INHIBITORS (Viagra/Cialis)."
    ],
    "patientCounseling": {
      "en": "Given by continuous IV in hospital. Headache is common and can be treated with paracetamol.",
      "th": "ให้ยาทางสายน้ำเกลือในโรงพยาบาล อาการปวดศีรษะพบได้บ่อย สามารถรับประทานยาพาราเซตามอลบรรเทาได้"
    },
    "nlemNoteEn": "For hypertensive emergencies with coronary ischaemia",
    "nlemNoteTh": "ใช้สำหรับ hypertensive emergencies ที่มี coronary ischemia",
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ระดับ I, หลักฐาน A (ตารางที่ 42: ยาฉีดใน emergency; เลือกตามอวัยวะ ตารางที่ 41)",
    "label": {
      "name": "Nitroglycerin in dextrose, Baxter (US label)",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=457a026c-ebce-4701-9deb-2d7652759a99"
    }
  },
  {
    "id": "nitroprusside_iv",
    "genericName": "Sodium nitroprusside (IV)",
    "nameEn": "Sodium Nitroprusside (IV)",
    "nameTh": "โซเดียม ไนโตรปรัสไซด์ ชนิดฉีด",
    "brandNames": [
      "Nipride",
      "Nitropress"
    ],
    "classId": "iv_crisis_class",
    "classNameEn": "Direct NO Donor Vasodilator (IV)",
    "classNameTh": "ยาฉีดขยายหลอดเลือดทั้งหลอดเลือดดำและแดงอย่างรุนแรง",
    "formType": "iv_vial",
    "color": "#e11d48",
    "strengths": [
      "50 mg/2 mL vial"
    ],
    "startDose": "0.3 - 0.5 mcg/kg/min IV infusion",
    "startDoseTh": "หยดเข้าหลอดเลือด: 0.3 - 0.5 ไมโครกรัม/กก./นาที",
    "maintenanceDose": "0.5 - 3 mcg/kg/min titrated q 2-5 min",
    "maintenanceDoseTh": "0.5 - 3 ไมโครกรัม/กก./นาที ปรับทุก 2-5 นาที",
    "maxDose": "10 mcg/kg/min (do not exceed 2 mcg/kg/min for > 24-48h due to cyanide toxicity)",
    "maxDoseTh": "10 ไมโครกรัม/กก./นาที (ไม่ควรเกิน 2 ไมโครกรัม/กก./นาที เกิน 24-48 ชม.)",
    "frequency": "Continuous IV Infusion",
    "costLevel": null,
    "nlem": true,
    "nlemCode": "b",
    "thaiGuidelineClass": "Class I, Level A (Table 42: IV drugs for emergencies; choice by organ, Table 41)",
    "compellingIndications": [
      "Acute_Pulmonary_Edema",
      "Aortic_Dissection",
      "Hypertensive_Emergency"
    ],
    "pregnancyRisk": "contraindicated",
    "heartRateEffect": "increases",
    "potassiumEffect": "neutral",
    "mechanism": "Potent direct donor of nitric oxide causing balanced, instantaneous relaxation of both arterial resistance and venous capacitance vessels; immediate onset (<1 min) and ultrashort duration (1-2 min).",
    "mechanismTh": "ปล่อย nitric oxide โดยตรง ขยายทั้งหลอดเลือดแดงและหลอดเลือดดำพร้อมกันทันที ออกฤทธิ์ทันทีภายในไม่กี่วินาที หมดฤทธิ์ทันทีเมื่อหยุดยา ใช้เป็นยาช่วยชีวิตในภาวะวิกฤต",
    "renalAdjustment": {
      "minEgfrSafe": 15,
      "cutoff": 30,
      "textEn": "Severe risk of thiocyanate toxicity in renal impairment; avoid prolonged infusion > 24 hours.",
      "textTh": "เสี่ยงต่อการคั่งของสารพิษไธโอไซยาเนตในผู้ป่วยไตวาย ห้ามให้ติดต่อกันเกิน 24-48 ชั่วโมง"
    },
    "hepaticAdjustment": {
      "textEn": "Impaired liver function prevents cyanide conversion; contraindicated in liver failure.",
      "textTh": "ห้ามใช้ในตับวายรุนแรงเนื่องจากตับเปลี่ยนสารไซยาไนด์ไม่ได้"
    },
    "contraindications": {
      "absolute": [
        "Severe renal and hepatic impairment",
        "Cyanide toxicity susceptibility",
        "Pregnancy",
        "Coarctation of aorta",
        "Inadequate cerebral circulation"
      ],
      "relative": [
        "Elevated intracranial pressure (causes cerebral vasodilation)"
      ]
    },
    "sideEffects": {
      "common": [
        "Nausea, vomiting",
        "Muscle twitching",
        "Sweating",
        "Headache"
      ],
      "serious": [
        "Cyanide and thiocyanate toxicity (lactic acidosis, confusion, coma, death)",
        "Coronary steal phenomenon in CAD"
      ]
    },
    "precautions": [
      "MUST WRAP INFUSION BAG AND TUBING IN OPAQUE FOIL (light-sensitive photolysis releases cyanide).",
      "Monitor arterial line blood pressure continuously.",
      "Watch for unexplained lactic acidosis or altered mental status."
    ],
    "drugInteractions": [
      "Antihypertensives, Sildenafil."
    ],
    "patientCounseling": {
      "en": "Requires intensive care unit (ICU) and arterial line monitoring.",
      "th": "ต้องให้ในหออภิบาลผู้ป่วยหนัก (ICU) พร้อมใส่สายวัดความดันในหลอดเลือดแดง"
    },
    "nlemNoteEn": "Standard treatment in hypertensive emergencies (except in pregnancy)",
    "nlemNoteTh": "ใช้เป็นมาตรฐานการรักษาใน hypertensive emergencies (ยกเว้นในหญิงตั้งครรภ์)",
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ระดับ I, หลักฐาน A (ตารางที่ 42: ยาฉีดใน emergency; เลือกตามอวัยวะ ตารางที่ 41)",
    "label": {
      "name": "Nipride RTU (US label)",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5acf0836-93ff-4064-b888-3f560e8a558d"
    }
  },
  {
    "id": "esmolol_iv",
    "genericName": "Esmolol HCl (IV)",
    "nameEn": "Esmolol IV",
    "nameTh": "เอสโมลอล ชนิดฉีด (IV)",
    "brandNames": [
      "Brevibloc"
    ],
    "classId": "iv_crisis_class",
    "classNameEn": "Ultra-Short-Acting Cardioselective Beta-1 Blocker",
    "classNameTh": "เบต้า-1 บล็อกเกอร์ ชนิดฉีดออกฤทธิ์สั้นมาก",
    "formType": "iv_vial",
    "color": "#e11d48",
    "strengths": [
      "100 mg/10 mL vial",
      "2,500 mg/10 mL ampoule (concentrate)"
    ],
    "startDose": "Loading dose: 500 mcg/kg over 1 minute",
    "startDoseTh": "ให้ขนาดเริ่มต้น: 500 ไมโครกรัม/กก. ฉีดช้าๆ ใน 1 นาที",
    "maintenanceDose": "50 - 200 mcg/kg/min IV infusion",
    "maintenanceDoseTh": "หยดเข้าหลอดเลือด 50 - 200 ไมโครกรัม/กก./นาที",
    "maxDose": "300 mcg/kg/min",
    "maxDoseTh": "300 ไมโครกรัม/กก./นาที",
    "frequency": "Continuous IV Infusion",
    "costLevel": null,
    "nlem": true,
    "nlemCode": "ex",
    "thaiGuidelineClass": "Class I, Level A (Table 42: IV drugs for emergencies; choice by organ, Table 41)",
    "compellingIndications": [
      "Aortic_Dissection",
      "Perioperative_HT",
      "Severe_Tachycardia"
    ],
    "pregnancyRisk": "caution",
    "heartRateEffect": "decreases",
    "potassiumEffect": "neutral",
    "mechanism": "Ultrashort-acting cardioselective beta-1 blocker rapidly metabolized by red blood cell esterases (elimination half-life ~ 9 minutes). In Acute Aortic Dissection, it decreases shear stress (dP/dt) and heart rate to < 60 bpm before giving vasodilators.",
    "mechanismTh": "เบต้า-1 บล็อกเกอร์ชนิดฉีดที่ออกฤทธิ์สั้นที่สุดในโลก สลายตัวด้วยเอนไซม์ในเม็ดเลือดแดง (ค่าครึ่งชีวิตเพียง 9 นาที) เป็นยาอันดับ 1 ในภาวะหลอดเลือดแดงใหญ่ฉีกขาด (Aortic dissection) เพื่อลดแรงเฉือนและลดชีพจรให้ต่ำกว่า 60 ครั้ง/นาที ก่อนที่จะให้ยาขยายหลอดเลือด",
    "renalAdjustment": {
      "minEgfrSafe": 0,
      "cutoff": 0,
      "textEn": "No dose adjustment required.",
      "textTh": "ไม่ต้องปรับขนาดยา"
    },
    "hepaticAdjustment": {
      "textEn": "No hepatic adjustment needed (hydrolyzed by RBC esterases).",
      "textTh": "ไม่ต้องปรับขนาดในโรคตับ"
    },
    "contraindications": {
      "absolute": [
        "Severe sinus bradycardia (HR < 50)",
        "Second- or third-degree AV block",
        "Cardiogenic shock",
        "Decompensated acute pulmonary edema"
      ],
      "relative": [
        "Severe bronchospasm / active asthma"
      ]
    },
    "sideEffects": {
      "common": [
        "Hypotension (resolves rapidly within 10-20 min of stopping)",
        "Nausea",
        "Infusion site irritation"
      ],
      "serious": [
        "Severe heart block",
        "Heart failure decompensation"
      ]
    },
    "precautions": [
      "In Acute Aortic Dissection: ALWAYS START ESMOLOL BEFORE NICARDIPINE/NITROPRUSSIDE to prevent reflex sympathetic tachycardia that accelerates aortic tear!",
      "Target SBP < 120 mmHg and HR < 60 bpm within 20 minutes (Table 41)."
    ],
    "drugInteractions": [
      "Verapamil/Diltiazem, Digoxin."
    ],
    "patientCounseling": {
      "en": "ICU continuous infusion medicine.",
      "th": "ยาฉีดเฉพาะทางในหอผู้ป่วยวิกฤต"
    },
    "nlemNoteEn": "Peri-operative or procedural tachycardia; specialist use; no longer than 24 hours",
    "nlemNoteTh": "ใช้ควบคุมหัวใจเต้นเร็วระหว่างและหลังผ่าตัดหรือหัตถการ โดยแพทย์ผู้เชี่ยวชาญ ไม่เกิน 24 ชั่วโมง",
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ระดับ I, หลักฐาน A (ตารางที่ 42: ยาฉีดใน emergency; เลือกตามอวัยวะ ตารางที่ 41)",
    "label": {
      "name": "Brevibloc (US label)",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=220a07b8-5c68-41a3-8705-fd91f14c50b4"
    }
  },
  {
    "id": "empagliflozin",
    "genericName": "Empagliflozin",
    "nameEn": "Empagliflozin (SGLT2i)",
    "nameTh": "เอ็มพากลิโฟลซิน (SGLT2i)",
    "brandNames": [
      "Jardiance"
    ],
    "classId": "metabolic_class",
    "classNameEn": "SGLT2 Inhibitor",
    "classNameTh": "เอสจีแอลที-2 อินฮิบิเตอร์ (SGLT2i)",
    "formType": "tablet_scored_round",
    "color": "#d97706",
    "strengths": [
      "10 mg",
      "25 mg"
    ],
    "startDose": "10 mg OD morning",
    "startDoseTh": "10 มก. วันละ 1 ครั้งตอนเช้า",
    "maintenanceDose": "10 - 25 mg OD",
    "maintenanceDoseTh": "10 - 25 มก. วันละ 1 ครั้ง",
    "maxDose": "25 mg/day",
    "maxDoseTh": "25 มก./วัน",
    "frequency": "OD morning",
    "costLevel": null,
    "nlem": false,
    "nlemCode": null,
    "thaiGuidelineClass": "Class IIa, Level A add-on with a compelling comorbidity; Class III for BP alone (Table 12)",
    "compellingIndications": [
      "DM",
      "HFrEF",
      "HFpEF",
      "CKD_alb",
      "CAD"
    ],
    "pregnancyRisk": "contraindicated",
    "heartRateEffect": "neutral",
    "potassiumEffect": "neutral",
    "mechanism": "Inhibits SGLT2 cotransporter in renal proximal tubule; causes glucosuria and osmotic natriuresis, lowering SBP by 3-5 mmHg, reducing sympathetic tone, and conferring extraordinary cardioprotection and renal preservation.",
    "mechanismTh": "ยับยั้งตัวขนส่ง SGLT2 ที่ท่อไตส่วนต้น ขับกลูโคสและโซเดียมออกทางปัสสาวะ ลดความดันซิสโตลิกได้ประมาณ 3-5 มม.ปรอท ลด sympathetic tone มีประโยชน์สูงมากในการรักษาโรคร่วมทั้งเบาหวาน โรคหัวใจล้มเหลว (ทั้ง HFrEF และ HFpEF) และชะลอไตเสื่อม",
    "renalAdjustment": {
      "minEgfrSafe": 20,
      "cutoff": 20,
      "textEn": "Can initiate down to eGFR 20 mL/min/1.73m2 for kidney/cardiac protection. Continue until dialysis.",
      "textTh": "เริ่มยาได้จนถึง eGFR 20 มล./นาที เพื่อปกป้องหัวใจและไต ใช้ต่อเนื่องได้จนกว่าจะเริ่มฟอกไต"
    },
    "hepaticAdjustment": {
      "textEn": "No dose adjustment in mild-to-moderate impairment.",
      "textTh": "ไม่ต้องปรับยาในตับบกพร่องเล็กน้อยถึงปานกลาง"
    },
    "contraindications": {
      "absolute": [
        "End-stage renal disease on dialysis",
        "Pregnancy",
        "History of ketoacidosis"
      ],
      "relative": [
        "Severe volume depletion",
        "Active foot ulceration"
      ]
    },
    "sideEffects": {
      "common": [
        "Mycotic genital infections (fungal balanitis/vulvovaginitis)",
        "Polyuria / mild volume contraction",
        "Urinary tract infections"
      ],
      "serious": [
        "Euglycemic Diabetic Ketoacidosis (euDKA)",
        "Necrotizing fasciitis of perineum (Fournier gangrene)"
      ]
    },
    "precautions": [
      "Maintain good perineal hygiene.",
      "Withhold medication during acute illness, prolonged fasting, or 3 days prior to major surgery (sick-day rule to avoid ketoacidosis)."
    ],
    "drugInteractions": [
      "Loop diuretics (potentiates dehydration/hypotension; reduce diuretic dose)."
    ],
    "patientCounseling": {
      "en": "Take in the morning with water. Maintain good personal hygiene to prevent fungal infections. Drink plenty of water.",
      "th": "รับประทานตอนเช้าวันละ 1 เม็ด ดื่มน้ำให้เพียงพอ ดูแลสุขอนามัยจุดซ่อนเร้น หากมีอาการคลื่นไส้หายใจหอบเหนื่อยให้หยุดยาและพบแพทย์"
    },
    "nlemNoteEn": null,
    "nlemNoteTh": null,
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ระดับ IIa, หลักฐาน A เป็นยาเสริมเมื่อมีโรคร่วม; ระดับ III ถ้าใช้เพื่อลดความดันอย่างเดียว (ตารางที่ 12)",
    "label": {
      "name": "Jardiance (US label)",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=faf3dd6a-9cd0-39c2-0d2e-232cb3f67565"
    }
  },
  {
    "id": "semaglutide",
    "genericName": "Semaglutide (SC / Oral)",
    "nameEn": "Semaglutide (GLP-1 RA)",
    "nameTh": "เซมากลูไทด์ (GLP-1 RA)",
    "brandNames": [
      "Ozempic (SC)",
      "Wegovy (SC)",
      "Rybelsus (Oral)"
    ],
    "classId": "metabolic_class",
    "classNameEn": "GLP-1 Receptor Agonist",
    "classNameTh": "จีแอลพี-1 รีเซพเตอร์ อะโกนิสต์ (GLP-1 RA)",
    "formType": "tablet_oblong",
    "color": "#d97706",
    "strengths": [
      "0.25/0.5/1.0/2.4 mg SC pen",
      "3/7/14 mg Oral tablet"
    ],
    "startDose": "SC: 0.25 mg once weekly for 4 weeks; Oral: 3 mg OD for 1 month",
    "startDoseTh": "ฉีดใต้ผิวหนัง: 0.25 มก. สัปดาห์ละ 1 ครั้ง 4 สัปดาห์แรก; กิน: 3 มก. วันละ 1 ครั้งตอนเช้าท้องว่าง",
    "maintenanceDose": "SC: 0.5 - 2.4 mg weekly; Oral: 7 - 14 mg OD",
    "maintenanceDoseTh": "ฉีด: 0.5 - 2.4 มก. สัปดาห์ละ 1 ครั้ง; กิน: 7 - 14 มก. วันละ 1 ครั้ง",
    "maxDose": "2.4 mg/week (SC for obesity) or 14 mg/day (Oral)",
    "maxDoseTh": "2.4 มก./สัปดาห์ (ชนิดฉีดสำหรับโรคอ้วน) หรือ 14 มก./วัน (ยากิน)",
    "frequency": "Once Weekly (SC) or OD morning (Oral)",
    "costLevel": null,
    "nlem": false,
    "nlemCode": null,
    "thaiGuidelineClass": "Class IIa, Level A add-on with a compelling comorbidity; Class III for BP alone (Table 12)",
    "compellingIndications": [
      "Obesity",
      "DM",
      "CAD",
      "Stroke",
      "Resistant",
      "Metabolic_Syndrome"
    ],
    "pregnancyRisk": "contraindicated",
    "heartRateEffect": "increases",
    "potassiumEffect": "neutral",
    "mechanism": "GLP-1 receptor agonist; enhances glucose-dependent insulin secretion, slows gastric emptying, reduces central appetite. SELECT trial proved that semaglutide 2.4 mg/week reduces CVD events by 20%, lowers weight by 8.8 kg, and reduces SBP by 4.1 mmHg.",
    "mechanismTh": "กระตุ้นตัวรับ GLP-1 เพิ่มการหลั่งอินซูลินตามระดับน้ำตาล ชะลอการย่อยอาหาร ลดความอยากอาหารในสมอง การศึกษา SELECT Trial พิสูจน์ว่าลดน้ำหนักได้เฉลี่ย 8.8 กิโลกรัม ลดความดันซิสโตลิกได้ 4.1 มม.ปรอท และลดอัตราการเกิดโรคหัวใจและหลอดเลือดได้ถึงร้อยละ 20 ในผู้ป่วยโรคอ้วนที่มีความดันโลหิตสูง",
    "renalAdjustment": {
      "minEgfrSafe": 15,
      "cutoff": 15,
      "textEn": "No dosage adjustment required in renal impairment down to eGFR 15 mL/min/1.73m2 (FLOW trial proven nephroprotection).",
      "textTh": "ไม่ต้องปรับขนาดยาในผู้ป่วยโรคไตเรื้อรังจนถึง eGFR 15 มล./นาที (การศึกษา FLOW Trial ยืนยันช่วยชะลอไตเสื่อม)"
    },
    "hepaticAdjustment": {
      "textEn": "No dosage adjustment required.",
      "textTh": "ไม่ต้องปรับขนาดยาในโรคตับ"
    },
    "contraindications": {
      "absolute": [
        "Personal or family history of medullary thyroid carcinoma (MTC)",
        "Multiple Endocrine Neoplasia syndrome type 2 (MEN 2)",
        "Pregnancy"
      ],
      "relative": [
        "History of severe pancreatitis",
        "Severe gastroparesis"
      ]
    },
    "sideEffects": {
      "common": [
        "Nausea, vomiting, diarrhea, constipation (transient during titration)",
        "Decreased appetite",
        "Mild heart rate increase (2-4 bpm)"
      ],
      "serious": [
        "Acute pancreatitis (rare)",
        "Diabetic retinopathy complications in rapid glycemic drop",
        "Gallbladder disease"
      ]
    },
    "precautions": [
      "Titrate dose every 4 weeks to minimize GI adverse effects.",
      "Oral form (Rybelsus) MUST be taken on an empty stomach upon waking with <= 120 mL plain water; wait >= 30 minutes before eating or drinking."
    ],
    "drugInteractions": [
      "Insulin / Sulfonylureas (reduce dose to avoid hypoglycemia due to combined effect)."
    ],
    "patientCounseling": {
      "en": "If taking weekly injection: Inject once weekly on the same day into abdomen or thigh. If taking daily oral tablet: Take immediately upon waking on empty stomach with half glass of plain water, wait 30 min before eating.",
      "th": "ชนิดฉีด: ฉีดสัปดาห์ละ 1 ครั้งวันเดิม สลับตำแหน่งหน้าท้องหรือต้นขา; ชนิดเม็ด: ตื่นนอนตอนเช้าให้รับประทานทันทีตอนท้องว่างพร้อมน้ำเปล่าครึ่งแก้ว รออย่างน้อย 30 นาทีก่อนรับประทานอาหารเช้าหรือดื่มเครื่องดื่ม"
    },
    "nlemNoteEn": null,
    "nlemNoteTh": null,
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ระดับ IIa, หลักฐาน A เป็นยาเสริมเมื่อมีโรคร่วม; ระดับ III ถ้าใช้เพื่อลดความดันอย่างเดียว (ตารางที่ 12)",
    "label": {
      "name": "Ozempic (US label)",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=adec4fd2-6858-4c99-91d4-531f5f2a2d79"
    }
  },
  {
    "id": "finerenone",
    "genericName": "Finerenone",
    "nameEn": "Finerenone",
    "nameTh": "ไฟเนอรีโนน",
    "brandNames": [
      "Kerendia"
    ],
    "classId": "mra",
    "classNameEn": "Non-Steroidal MRA",
    "classNameTh": "เอ็มอาร์เอ ชนิดไม่ใช่สเตียรอยด์ (Non-steroidal MRA)",
    "formType": "tablet_scored_round",
    "color": "#7c3aed",
    "strengths": [
      "10 mg",
      "20 mg"
    ],
    "startDose": "10 mg or 20 mg OD based on baseline eGFR and serum K+",
    "startDoseTh": "10 มก. หรือ 20 มก. วันละ 1 ครั้ง ขึ้นกับระดับ eGFR และ K+ เริ่มต้น",
    "maintenanceDose": "20 mg OD",
    "maintenanceDoseTh": "20 มก. วันละ 1 ครั้ง",
    "maxDose": "20 mg/day",
    "maxDoseTh": "20 มก./วัน",
    "frequency": "OD",
    "costLevel": null,
    "nlem": false,
    "nlemCode": null,
    "thaiGuidelineClass": "Not graded (may add in DM with albuminuria > 30 mg/g on full ACEI/ARB; CPG p.66)",
    "compellingIndications": [
      "DM",
      "CKD_alb",
      "CAD",
      "HFrEF"
    ],
    "pregnancyRisk": "contraindicated",
    "heartRateEffect": "neutral",
    "potassiumEffect": "increases",
    "mechanism": "First-in-class non-steroidal, selective mineralocorticoid receptor antagonist. Distinct bulky structure prevents MR cofactor recruitment, delivering potent antifibrotic and anti-inflammatory renal and cardiac protection with significantly lower hyperkalemia risk than spironolactone.",
    "mechanismTh": "ยาต้าน mineralocorticoid ชนิดใหม่ที่ไม่ใช่โครงสร้างสเตียรอยด์ มีความจำเพาะสูงมาก ลดการอักเสบและพังผืดที่ไตและหัวใจอย่างมีนัยสำคัญ ได้รับการระบุชัดเจนในแนวทางเวชปฏิบัติ พ.ศ. 2567 หน้า 66 สำหรับผู้ป่วยเบาหวานที่มีโปรตีนรั่วในปัสสาวะ (UACR > 30) แม้จะได้ยา ACEi/ARB ขนาดเต็มที่แล้ว",
    "renalAdjustment": {
      "minEgfrSafe": 25,
      "cutoff": 60,
      "textEn": "eGFR >= 60 mL/min with K <= 4.8: Start 20 mg OD. eGFR 25-59 with K <= 4.8: Start 10 mg OD. eGFR < 25: Do not initiate.",
      "textTh": "eGFR >= 60 ร่วมกับ K <= 4.8: เริ่ม 20 มก./วัน; eGFR 25-59 ร่วมกับ K <= 4.8: เริ่ม 10 มก./วัน; eGFR < 25: ไม่แนะนำให้เริ่มยา"
    },
    "hepaticAdjustment": {
      "textEn": "Avoid in severe hepatic impairment (Child-Pugh C).",
      "textTh": "หลีกเลี่ยงในตับวายรุนแรง"
    },
    "contraindications": {
      "absolute": [
        "Serum K+ > 5.0 mEq/L before initiation",
        "Concomitant strong CYP3A4 inhibitors (Itraconazole, Clarithromycin)",
        "Adrenal insufficiency",
        "Pregnancy"
      ],
      "relative": [
        "eGFR < 25 mL/min"
      ]
    },
    "sideEffects": {
      "common": [
        "Hyperkalemia (dose-dependent, lower than spironolactone)",
        "Hypotension (mild, SBP ~ 3-4 mmHg drop)",
        "Hyponatremia"
      ],
      "serious": [
        "Severe hyperkalemia (K+ > 5.5 mEq/L)"
      ]
    },
    "precautions": [
      "Re-check serum potassium and eGFR at 4 weeks after initiation and adjust dose accordingly.",
      "Withhold if potassium > 5.5 mEq/L; restart at 10 mg OD when K <= 5.0."
    ],
    "drugInteractions": [
      "Strong CYP3A4 inhibitors (contraindicated), Grapefruit juice, Potassium supplements."
    ],
    "patientCounseling": {
      "en": "Take once daily with or without food. Protects kidneys and heart in diabetic kidney disease. Routine blood testing for potassium is mandatory.",
      "th": "รับประทานวันละ 1 ครั้งพร้อมหรือหลังอาหาร ช่วยชะลอไตเสื่อมและปกป้องหัวใจในผู้ป่วยเบาหวานที่มีไข่ขาวรั่ว ต้องเจาะเลือดตรวจโพแทสเซียมตามนัด"
    },
    "nlemNoteEn": null,
    "nlemNoteTh": null,
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ไม่ได้ระบุระดับ (อาจเพิ่มในเบาหวานที่ยังมี albuminuria > 30 มก./ก. แม้ได้ ACEI/ARB เต็มที่; หน้า 66)",
    "label": {
      "name": "Kerendia (US label)",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=fc726765-5d5a-4d6e-b037-b847bda9fb7c"
    }
  },
  {
    "id": "furosemide",
    "genericName": "Furosemide",
    "nameEn": "Furosemide",
    "nameTh": "ฟูโรซีไมด์",
    "brandNames": [
      "Lasix",
      "Furosemide GPO",
      "Hidonac"
    ],
    "classId": "loop_diuretic",
    "classNameEn": "Loop Diuretic",
    "classNameTh": "ลูป ไดยูเรติก (ยาขับปัสสาวะกลุ่มออกฤทธิ์แรง)",
    "formType": "tablet_scored_round",
    "color": "#10b981",
    "strengths": [
      "40 mg",
      "500 mg",
      "20 mg/2 mL ampoule (IV)"
    ],
    "startDose": "20 - 40 mg OD morning",
    "startDoseTh": "20 - 40 มก. วันละ 1 ครั้งตอนเช้า",
    "maintenanceDose": "40 - 80 mg/day (or divided BID in severe edema)",
    "maintenanceDoseTh": "40 - 80 มก./วัน (หรือแบ่งเช้า-บ่าย)",
    "maxDose": "Up to 240-600 mg/day in severe advanced CKD/ESRD (HT dose usually <= 80 mg/d)",
    "maxDoseTh": "สูงสุด 240-600 มก./วัน ในไตวายระยะสุดท้าย (ในความดันทั่วไปไม่เกิน 80 มก./วัน)",
    "frequency": "OD morning or BID (morning + midday)",
    "costLevel": null,
    "nlem": true,
    "nlemCode": "b",
    "thaiGuidelineClass": "Class IIa, Level B (replace thiazide if eGFR < 30-45; CPG p.115)",
    "compellingIndications": [
      "HFrEF",
      "CKD_alb",
      "Acute_Pulmonary_Edema",
      "Resistant"
    ],
    "pregnancyRisk": "caution",
    "heartRateEffect": "neutral",
    "potassiumEffect": "decreases",
    "mechanism": "Inhibits Na+/K+/2Cl- cotransporter in thick ascending limb of loop of Henle; promotes potent rapid natriuresis and diuresis. The diuretic of choice when eGFR is reduced (< 30-45 mL/min) where thiazides are ineffective.",
    "mechanismTh": "ยับยั้ง Na+/K+/2Cl- cotransporter ที่ loop of Henle ส่วนหนา ขับโซเดียม โพแทสเซียม และน้ำในปริมาณมากอย่างรวดเร็ว เป็นยาขับปัสสาวะหลักที่ต้องใช้แทนกลุ่มไธอะไซด์เมื่อผู้ป่วยมีไตเสื่อม (eGFR < 30-45 มล./นาที) หรือมีภาวะน้ำคั่ง/น้ำท่วมปอด",
    "renalAdjustment": {
      "minEgfrSafe": 0,
      "cutoff": 30,
      "textEn": "Effective even in severe renal failure and ESRD. Higher doses required as eGFR declines.",
      "textTh": "มีประสิทธิภาพสูงแม้ในผู้ป่วยไตวายรุนแรงระยะสุดท้าย อาจต้องใช้ขนาดยาสูงขึ้นเมื่อการทำงานของไตลดลง"
    },
    "hepaticAdjustment": {
      "textEn": "Monitor electrolytes strictly in cirrhosis to avoid hepatic encephalopathy.",
      "textTh": "ติดตามเกลือแร่อย่างใกล้ชิดในโรคตับแข็ง"
    },
    "contraindications": {
      "absolute": [
        "Anuria unresponsive to test dose",
        "Severe uncorrected hypokalemia / hyponatremia",
        "Hepatic coma"
      ],
      "relative": [
        "Hypovolemia / dehydration",
        "Severe gout"
      ]
    },
    "sideEffects": {
      "common": [
        "Hypokalemia",
        "Hyponatremia",
        "Hypomagnesemia",
        "Dehydration / Orthostatic dizziness",
        "Hyperuricemia"
      ],
      "serious": [
        "Ototoxicity (tinnitus/hearing loss, esp. high IV doses with aminoglycosides)",
        "Acute interstitial nephritis"
      ]
    },
    "precautions": [
      "Take in the morning and early afternoon (e.g. 8:00 AM and 2:00 PM) to avoid nocturia.",
      "Check electrolytes and renal function periodically."
    ],
    "drugInteractions": [
      "Aminoglycosides (ototoxicity/nephrotoxicity), Digoxin (hypokalemia-induced toxicity), NSAIDs."
    ],
    "patientCounseling": {
      "en": "Take in the morning. If taking twice daily, take second dose before 4 PM so your sleep is not disrupted by bathroom visits. Eat potassium foods if advised.",
      "th": "รับประทานตอนเช้า หากต้องรับประทานวันละ 2 ครั้ง ให้รับประทานมื้อที่สองก่อนบ่ายสี่โมงเย็นเพื่อจะได้ไม่ต้องตื่นมาปัสสาวะตอนกลางดึก"
    },
    "nlemNoteEn": null,
    "nlemNoteTh": null,
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ระดับ IIa, หลักฐาน B (ใช้แทน thiazide ถ้า eGFR < 30-45; หน้า 115)",
    "label": {
      "name": "Lasix (US label)",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2c9b4d8f-0770-482d-a9e6-9c616a440b1a"
    }
  },
  {
    "id": "verapamil_sr",
    "genericName": "Verapamil HCl (SR & IR)",
    "nameEn": "Verapamil SR",
    "nameTh": "เวอราพามิล เอสอาร์",
    "brandNames": [
      "Isoptin SR",
      "Isoptin"
    ],
    "classId": "non_dhp_ccb",
    "classNameEn": "Non-Dihydropyridine CCB (Phenylalkylamine)",
    "classNameTh": "นอน-ไดไฮโดรไพริดีน CCB (กลุ่มฟีนิลอัลคิลเอมีน)",
    "formType": "tablet_scored_round",
    "color": "#8b5cf6",
    "strengths": [
      "40 mg",
      "80 mg",
      "240 mg SR",
      "5 mg/2 mL ampoule (IV)"
    ],
    "startDose": "120 - 180 mg SR OD morning with food",
    "startDoseTh": "120 - 180 มก. ชนิด SR วันละ 1 ครั้งตอนเช้าพร้อมอาหาร",
    "maintenanceDose": "180 - 240 mg SR OD",
    "maintenanceDoseTh": "180 - 240 มก. ชนิด SR วันละ 1 ครั้ง",
    "maxDose": "480 mg/day (240 mg BID SR)",
    "maxDoseTh": "480 มก./วัน",
    "frequency": "OD or BID with food",
    "costLevel": null,
    "nlem": true,
    "nlemCode": "b",
    "thaiGuidelineClass": "Class I, Level A (Table 16: CCB for angina in CAD)",
    "compellingIndications": [
      "CAD",
      "AF",
      "Primary_Aldosteronism_Screening",
      "Migraine_Prophylaxis"
    ],
    "pregnancyRisk": "caution",
    "heartRateEffect": "decreases",
    "potassiumEffect": "neutral",
    "mechanism": "Inhibits L-type calcium channels with marked selectivity for myocardium and AV node; slows SA node automaticity, delays AV nodal conduction, reduces contractility (negative inotropic/chronotropic), and dilates coronary/peripheral vessels. Preferred bridging agent during Primary Aldosteronism work-up.",
    "mechanismTh": "ยับยั้งช่องแคลเซียมที่กล้ามเนื้อหัวใจและระบบนำไฟฟ้า AV node ลดการบีบตัวและชะลออัตราการเต้นของหัวใจ ขยายหลอดเลือดโคโรนารี เป็นยาสำคัญที่ระบุในแนวทาง พ.ศ. 2567 หน้า 106 สำหรับใช้ลดความดันชั่วคราวระหว่างเตรียมตรวจคัดกรองโรค Primary Aldosteronism (เพราะไม่รบกวนการตรวจ Aldosterone/Renin)",
    "renalAdjustment": {
      "minEgfrSafe": 15,
      "cutoff": 0,
      "textEn": "No dose adjustment required.",
      "textTh": "ไม่ต้องปรับขนาดยา"
    },
    "hepaticAdjustment": {
      "textEn": "Extensive first-pass metabolism; reduce dose by 50-70% in severe cirrhosis.",
      "textTh": "ลดขนาดยาลง 50-70% ในผู้ป่วยตับแข็งรุนแรง"
    },
    "contraindications": {
      "absolute": [
        "HFrEF / severe LV systolic dysfunction (EF < 40%) (Class III, Level C)",
        "Second- or third-degree AV block (without pacemaker)",
        "Sick sinus syndrome",
        "Severe hypotension",
        "NEVER COMBINE WITH BETA-BLOCKERS (Class III, Level C - severe asystole/block)"
      ],
      "relative": [
        "Constipation"
      ]
    },
    "sideEffects": {
      "common": [
        "Constipation (very common, up to 30%)",
        "Dizziness",
        "Bradycardia",
        "Gingival hyperplasia"
      ],
      "serious": [
        "Complete AV heart block",
        "Severe heart failure decompensation"
      ]
    },
    "precautions": [
      "CONTRAINDICATED IN HFrEF: strong negative inotropic action worsens heart failure mortality.",
      "STRICT WARNING: NEVER combine with Beta-Blockers (causes complete heart block and cardiac arrest)."
    ],
    "drugInteractions": [
      "Beta-blockers (contraindicated)",
      "Digoxin (increases digoxin levels by 50-75%)",
      "Simvastatin/Atorvastatin (CYP3A4 inhibition increases statin toxicity)"
    ],
    "patientCounseling": {
      "en": "Take with food. Swallow SR tablet whole. Drink plenty of water and eat high-fiber food to prevent constipation. Check your pulse rate regularly.",
      "th": "รับประทานพร้อมอาหาร กลืนทั้งเม็ดห้ามเคี้ยว ดื่มน้ำและทานอาหารที่มีกากใยสูงเพื่อป้องกันอาการท้องผูก ตรวจวัดชีพจรสม่ำเสมอ"
    },
    "nlemNoteEn": "Tablet, and SR 240 mg only; for ischaemic heart disease or essential hypertension",
    "nlemNoteTh": "เฉพาะชนิดเม็ด และ SR 240 มก. ใช้สำหรับ IHD หรือ essential hypertension",
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ระดับ I, หลักฐาน A (ตารางที่ 16: CCB ในผู้ป่วย CAD ที่มี angina)",
    "label": {
      "name": "Verapamil ER tablets, Nivagen (US label)",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e36e485f-fbed-4e30-9a63-984931f2e54e"
    }
  },
  {
    "id": "diltiazem_sr",
    "genericName": "Diltiazem HCl (SR & IR)",
    "nameEn": "Diltiazem SR",
    "nameTh": "ดิลไทอะเซม เอสอาร์",
    "brandNames": [
      "Herbesser",
      "Herbesser R",
      "Cardizem"
    ],
    "classId": "non_dhp_ccb",
    "classNameEn": "Non-Dihydropyridine CCB (Benzothiazepine)",
    "classNameTh": "นอน-ไดไฮโดรไพริดีน CCB (กลุ่มเบนโซไธอะซีปีน)",
    "formType": "tablet_scored_round",
    "color": "#8b5cf6",
    "strengths": [
      "30 mg",
      "60 mg",
      "90 mg SR",
      "100 mg SR",
      "200 mg SR"
    ],
    "startDose": "90 - 120 mg SR BID (or 100-200 mg Herbesser R OD)",
    "startDoseTh": "90 - 120 มก. SR วันละ 2 ครั้ง (หรือชนิด R 100-200 มก. วันละครั้ง)",
    "maintenanceDose": "180 - 360 mg/day divided",
    "maintenanceDoseTh": "180 - 360 มก./วัน",
    "maxDose": "360 mg/day (or 480 mg/day in severe angina)",
    "maxDoseTh": "360 มก./วัน",
    "frequency": "OD or BID",
    "costLevel": null,
    "nlem": true,
    "nlemCode": "b",
    "thaiGuidelineClass": "Class I, Level A (Table 16: CCB for angina in CAD)",
    "compellingIndications": [
      "CAD",
      "AF",
      "Raynaud_Phenomenon"
    ],
    "pregnancyRisk": "caution",
    "heartRateEffect": "decreases",
    "potassiumEffect": "neutral",
    "mechanism": "Benzothiazepine calcium channel blocker offering balanced vasodilation and negative chronotropic action with less depression of myocardial contractility and less constipation than verapamil.",
    "mechanismTh": "ขยายหลอดเลือดและชะลอการนำไฟฟ้าที่ AV node อย่างสมดุล กดการบีบตัวของหัวใจน้อยกว่าและทำให้ท้องผูกน้อยกว่าเวอราพามิล",
    "renalAdjustment": {
      "minEgfrSafe": 15,
      "cutoff": 0,
      "textEn": "No dose adjustment in renal impairment.",
      "textTh": "ไม่ต้องปรับขนาดยา"
    },
    "hepaticAdjustment": {
      "textEn": "Titrate with caution in liver disease.",
      "textTh": "ค่อยๆ ปรับขนาดยาในโรคตับ"
    },
    "contraindications": {
      "absolute": [
        "HFrEF (EF < 40%) (Class III, Level C)",
        "Second/third-degree AV block",
        "Sick sinus syndrome",
        "Severe hypotension",
        "Concurrent Beta-blocker"
      ],
      "relative": [
        "Sinus bradycardia"
      ]
    },
    "sideEffects": {
      "common": [
        "Edema",
        "Headache",
        "Dizziness",
        "Bradycardia",
        "Rash"
      ],
      "serious": [
        "AV block",
        "Heart failure exacerbation"
      ]
    },
    "precautions": [
      "Do NOT combine with Beta-Blockers. Contraindicated in HFrEF."
    ],
    "drugInteractions": [
      "Beta-blockers, Digoxin, Statins (CYP3A4)."
    ],
    "patientCounseling": {
      "en": "Take regularly as prescribed. Check your heart rate periodically. Do not combine with beta-blockers.",
      "th": "รับประทานตรงเวลา ตรวจวัดอัตราการเต้นของหัวใจเป็นประจำ ห้ามรับประทานร่วมกับยาเบต้าบล็อกเกอร์"
    },
    "nlemNoteEn": "SR 120 mg only; for ischaemic heart disease (immediate-release not recommended for hypertension)",
    "nlemNoteTh": "เฉพาะ SR 120 มก. ใช้สำหรับ IHD (ชนิด immediate release ไม่แนะนำสำหรับ essential hypertension)",
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ระดับ I, หลักฐาน A (ตารางที่ 16: CCB ในผู้ป่วย CAD ที่มี angina)",
    "label": {
      "name": "Cardizem CD (US label)",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1042fa13-e6af-46b9-8008-6c941f0978b1"
    }
  },
  {
    "id": "spc_perindopril_indapamide",
    "genericName": "Perindopril arginine + Indapamide",
    "nameEn": "Perindopril / Indapamide (SPC)",
    "nameTh": "เพอรินโดพริล + อินดาพาไมด์ (สูตรรวมเม็ด)",
    "brandNames": [
      "Preterax",
      "Bi-Preterax",
      "Coversyl Plus"
    ],
    "classId": "spc_dual",
    "classNameEn": "Dual SPC (ACEI + Thiazide-like)",
    "classNameTh": "ยารวมเม็ด 2 ชนิด (ACEI + Thiazide-like)",
    "formType": "spc_bilayer",
    "color": "#0d9488",
    "strengths": [
      "2.5/0.625 mg",
      "5/1.25 mg",
      "10/2.5 mg"
    ],
    "startDose": "2.5/0.625 mg or 5/1.25 mg OD morning",
    "startDoseTh": "2.5/0.625 มก. หรือ 5/1.25 มก. วันละ 1 ครั้งตอนเช้า",
    "maintenanceDose": "5/1.25 mg to 10/2.5 mg OD",
    "maintenanceDoseTh": "5/1.25 มก. ถึง 10/2.5 มก. วันละ 1 ครั้ง",
    "maxDose": "10/2.5 mg/day",
    "maxDoseTh": "10/2.5 มก./วัน",
    "frequency": "OD morning",
    "costLevel": null,
    "nlem": false,
    "nlemCode": null,
    "thaiGuidelineClass": "Class I, Level A (Table 12: start 2 drugs; single pill preferred)",
    "compellingIndications": [
      "DM",
      "Stroke",
      "CKD_alb",
      "ISH",
      "Elderly"
    ],
    "pregnancyRisk": "contraindicated",
    "heartRateEffect": "neutral",
    "potassiumEffect": "neutral",
    "mechanism": "Synergistic combination of high-tissue affinity ACEI and vascular-active thiazide-like diuretic. Landmark ADVANCE trial proved significant reduction in total mortality, cardiovascular death, and diabetic nephropathy in hypertensive diabetic patients.",
    "mechanismTh": "การผสานฤทธิ์ระหว่าง ACEI และ thiazide-like diuretic การศึกษา ADVANCE Trial และ PROGRESS Trial พิสูจน์ว่าช่วยลดการเสียชีวิตรวม ลดโรคหลอดเลือดหัวใจและไตในผู้ป่วยเบาหวาน และป้องกันการเกิดสโตรกซ้ำได้อย่างชัดเจน",
    "renalAdjustment": {
      "minEgfrSafe": 30,
      "cutoff": 30,
      "textEn": "CrCl 30-60: 2.5/0.625 mg or 5/1.25 mg OD. CrCl < 30: contraindicated.",
      "textTh": "eGFR 30-60: 2.5/0.625 หรือ 5/1.25 มก./วัน; eGFR < 30: ห้ามใช้"
    },
    "hepaticAdjustment": {
      "textEn": "Contraindicated in severe hepatic impairment.",
      "textTh": "ห้ามใช้ในตับวายรุนแรง"
    },
    "contraindications": {
      "absolute": [
        "History of ACEI angioedema",
        "Pregnancy",
        "eGFR < 30 mL/min",
        "Severe hypokalemia",
        "Bilateral renal artery stenosis"
      ],
      "relative": [
        "Severe gout"
      ]
    },
    "sideEffects": {
      "common": [
        "Cough (perindopril)",
        "Dizziness",
        "Fatigue",
        "Electrolyte shifts (balanced between K+ loss and retention)"
      ],
      "serious": [
        "Angioedema",
        "Acute renal insufficiency"
      ]
    },
    "precautions": [
      "Take in the morning before food. Monitor electrolytes."
    ],
    "drugInteractions": [
      "ARBs contraindicated. Lithium, NSAIDs."
    ],
    "patientCounseling": {
      "en": "Take one tablet every morning before breakfast. Extensively proven in large clinical studies to protect kidneys and heart in diabetes and prevent recurrent strokes.",
      "th": "รับประทานวันละ 1 เม็ดก่อนอาหารเช้า มีหลักฐานการศึกษาระดับโลกยืนยันการปกป้องไตและหัวใจในผู้ป่วยเบาหวาน และป้องกันสโตรกซ้ำ"
    },
    "nlemNoteEn": null,
    "nlemNoteTh": null,
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ระดับ I, หลักฐาน A (ตารางที่ 12: เริ่มยา 2 ชนิด แนะนำยารวมเม็ด)",
    "label": null
  },
  {
    "id": "spc_bisoprolol_amlodipine",
    "genericName": "Bisoprolol fumarate + Amlodipine besylate",
    "nameEn": "Bisoprolol / Amlodipine (SPC)",
    "nameTh": "บิโซโพรลอล + แอมโลดิพีน (สูตรรวมเม็ด)",
    "brandNames": [
      "Concor AM",
      "Bisopine"
    ],
    "classId": "spc_dual",
    "classNameEn": "Dual SPC (Beta-Blocker + DHP-CCB)",
    "classNameTh": "ยารวมเม็ด 2 ชนิด (Beta-Blocker + CCB)",
    "formType": "spc_bilayer",
    "color": "#0d9488",
    "strengths": [
      "5/5 mg",
      "5/10 mg",
      "10/5 mg",
      "10/10 mg"
    ],
    "startDose": "5/5 mg OD morning",
    "startDoseTh": "5/5 มก. วันละ 1 ครั้งตอนเช้า",
    "maintenanceDose": "5/5 mg to 10/5 mg OD",
    "maintenanceDoseTh": "5/5 ถึง 10/5 มก. วันละ 1 ครั้ง",
    "maxDose": "10/10 mg/day",
    "maxDoseTh": "10/10 มก./วัน",
    "frequency": "OD morning",
    "costLevel": null,
    "nlem": false,
    "nlemCode": null,
    "thaiGuidelineClass": "Class I, Level A (Table 12: start 2 drugs; single pill preferred)",
    "compellingIndications": [
      "CAD",
      "AF",
      "Post_MI",
      "Resting_HR_Over_80"
    ],
    "pregnancyRisk": "caution",
    "heartRateEffect": "decreases",
    "potassiumEffect": "neutral",
    "mechanism": "Combines peripheral arteriolar vasodilation (Amlodipine) with heart rate and contractility reduction (Bisoprolol). Bisoprolol suppresses CCB-induced reflex tachycardia; Amlodipine counters peripheral vasoconstriction. Superb combination for hypertensive patients with stable coronary angina.",
    "mechanismTh": "การรวมตัวของยาขยายหลอดเลือดแดง (Amlodipine) กับยาชะลอชีพจรและลดการทำงานของหัวใจ (Bisoprolol) ช่วยตัดปัญหาหัวใจเต้นเร็วจาก CCB และคุมอาการเจ็บหน้าอกได้อย่างยอดเยี่ยมในผู้ป่วยโรคหลอดเลือดหัวใจตีบ",
    "renalAdjustment": {
      "minEgfrSafe": 15,
      "cutoff": 20,
      "textEn": "CrCl < 20: Max bisoprolol component 10 mg/day.",
      "textTh": "eGFR < 20: ส่วนประกอบ bisoprolol ไม่เกิน 10 มก./วัน"
    },
    "hepaticAdjustment": {
      "textEn": "Start with 5/5 mg; monitor closely in severe liver disease.",
      "textTh": "เริ่ม 5/5 มก. ในโรคตับ"
    },
    "contraindications": {
      "absolute": [
        "Severe bradycardia (HR < 50)",
        "Second/third-degree AV block",
        "Cardiogenic shock",
        "Decompensated acute HF",
        "Severe asthma"
      ],
      "relative": [
        "Severe peripheral arterial disease"
      ]
    },
    "sideEffects": {
      "common": [
        "Bradycardia",
        "Ankle edema",
        "Headache",
        "Fatigue",
        "Dizziness"
      ],
      "serious": [
        "Heart block",
        "Severe hypotension"
      ]
    },
    "precautions": [
      "DO NOT STOP ABRUPTLY due to beta-blocker rebound risk. Target resting HR 60-80 bpm."
    ],
    "drugInteractions": [
      "Verapamil/Diltiazem (strictly avoid), Digoxin, Simvastatin (max 20mg)."
    ],
    "patientCounseling": {
      "en": "Take once daily in the morning. Check pulse rate regularly. DO NOT STOP SUDDENLY.",
      "th": "รับประทานวันละ 1 เม็ดตอนเช้า ตรวจวัดชีพจรสม่ำเสมอ ห้ามหยุดยาเองกะทันหันเด็ดขาด"
    },
    "nlemNoteEn": null,
    "nlemNoteTh": null,
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ระดับ I, หลักฐาน A (ตารางที่ 12: เริ่มยา 2 ชนิด แนะนำยารวมเม็ด)",
    "label": null
  },
  {
    "id": "spc_olmesartan_amlodipine_hctz",
    "genericName": "Olmesartan medoxomil + Amlodipine + Hydrochlorothiazide",
    "nameEn": "Olmesartan / Amlodipine / HCTZ (Triple SPC)",
    "nameTh": "โอลมีซาร์แทน + แอมโลดิพีน + HCTZ (สูตรรวมเม็ด 3 ชนิด)",
    "brandNames": [
      "Sevikar HCT"
    ],
    "classId": "spc_triple",
    "classNameEn": "Triple SPC (ARB + CCB + Diuretic)",
    "classNameTh": "ยารวมเม็ด 3 ชนิด (ARB + CCB + Diuretic)",
    "formType": "spc_triple",
    "color": "#047857",
    "strengths": [
      "20/5/12.5 mg",
      "40/5/12.5 mg",
      "40/10/12.5 mg",
      "40/10/25 mg"
    ],
    "startDose": "20/5/12.5 mg or 40/5/12.5 mg OD morning",
    "startDoseTh": "20/5/12.5 มก. หรือ 40/5/12.5 มก. วันละ 1 ครั้งตอนเช้า",
    "maintenanceDose": "40/5/12.5 mg to 40/10/25 mg OD",
    "maintenanceDoseTh": "40/5/12.5 มก. ถึง 40/10/25 มก. วันละ 1 ครั้ง",
    "maxDose": "40/10/25 mg/day",
    "maxDoseTh": "40/10/25 มก./วัน",
    "frequency": "OD morning",
    "costLevel": null,
    "nlem": false,
    "nlemCode": null,
    "thaiGuidelineClass": "Class I, Level A (Table 12: 3-drug step RAS blocker + CCB + diuretic)",
    "compellingIndications": [
      "Resistant",
      "Severe_Grade3_HT",
      "Uncontrolled_Dual_Therapy"
    ],
    "pregnancyRisk": "contraindicated",
    "heartRateEffect": "neutral",
    "potassiumEffect": "neutral",
    "mechanism": "Comprehensive triple pathway targeting vascular resistance, RAAS vasoconstriction, and volume retention. The TRINITY study demonstrated that triple combination achieved blood pressure goal in over 70% of patients with severe or uncontrolled hypertension with excellent tolerability.",
    "mechanismTh": "ผสาน 3 กลไกการลดความดันโลหิตที่สมบูรณ์แบบที่สุด การศึกษา TRINITY Study ยืนยันว่าสามารถช่วยให้ผู้ป่วยความดันโลหิตสูงรุนแรงที่คุมไม่ได้ด้วยยา 2 ขนาน บรรลุเป้าหมายความดันโลหิตได้มากกว่าร้อยละ 70",
    "renalAdjustment": {
      "minEgfrSafe": 30,
      "cutoff": 30,
      "textEn": "Avoid if eGFR < 30 mL/min/1.73m2 due to HCTZ.",
      "textTh": "หลีกเลี่ยงหาก eGFR < 30 เนื่องจากส่วนประกอบ HCTZ"
    },
    "hepaticAdjustment": {
      "textEn": "Contraindicated in severe biliary obstruction / cirrhosis.",
      "textTh": "ห้ามใช้ในตับวายหรือท่อน้ำดีอุดตัน"
    },
    "contraindications": {
      "absolute": [
        "Pregnancy",
        "Severe hepatic impairment / biliary cirrhosis",
        "Anuria",
        "Bilateral renal artery stenosis"
      ],
      "relative": [
        "Gout"
      ]
    },
    "sideEffects": {
      "common": [
        "Dizziness",
        "Headache",
        "Peripheral edema",
        "Fatigue",
        "Nasopharyngitis"
      ],
      "serious": [
        "Sprue-like enteropathy (olmesartan rare severe chronic diarrhea with weight loss)",
        "Severe hypotension"
      ]
    },
    "precautions": [
      "If severe chronic diarrhea with substantial weight loss develops, rule out olmesartan-associated sprue-like enteropathy.",
      "Check electrolytes and renal function periodically."
    ],
    "drugInteractions": [
      "ACE inhibitors, Potassium supplements, Simvastatin (max 20mg)."
    ],
    "patientCounseling": {
      "en": "Take one tablet every morning. Combines 3 powerful medicines into a single tablet. If you experience severe unexplained chronic diarrhea, contact doctor.",
      "th": "รับประทานวันละ 1 เม็ดตอนเช้า รวมยา 3 ขนานในเม็ดเดียว หากมีอาการท้องเสียเรื้อรังรุนแรงและน้ำหนักลดมากให้รีบแจ้งแพทย์"
    },
    "nlemNoteEn": null,
    "nlemNoteTh": null,
    "brandsVerified": false,
    "thaiGuidelineClassTh": "ระดับ I, หลักฐาน A (ตารางที่ 12: ยา 3 ชนิด RAS blocker + CCB + diuretic)",
    "label": {
      "name": "Tribenzor (US label)",
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2f56d0bc-236b-41a0-9fc0-21cdfea8d890"
    }
  }
];
