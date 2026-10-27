// --- Guideline sections shown in guide windows (moved from the old tab layout, v1.2.0) ---
const GuideBody = ({ id, lang }) => {
  const t = translations[lang];
  const g = guidelinesData;
  const L = (obj, key) => (lang === 'th' && obj[key + 'Th'] ? obj[key + 'Th'] : obj[key + 'En']);
  if (id === 'starting') return (
          <div className="space-y-4">
            <FoldAllBar lang={lang} />

            <Fold id="start-class" tone="sky" icon={GaugeIcon} defaultOpen title={lang === 'th' ? g.bpClassification.titleTh : g.bpClassification.titleEn} badge={lang === 'th' ? 'ตารางที่ 5' : 'Table 5'}>
              <p className="text-xs text-rose-700 dark:text-rose-400 font-semibold">{t.bpAtRiskNote}</p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                      <th className="p-2.5 font-bold">{lang === 'th' ? 'ระดับ' : 'Category'}</th>
                      <th className="p-2.5 font-bold font-mono">SBP</th>
                      <th className="p-2.5 font-bold font-mono">DBP</th>
                      <th className="p-2.5 font-bold hidden sm:table-cell">{lang === 'th' ? 'สิ่งที่ควรทำ' : 'What to do'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {g.bpClassification.table5_clinic.map((row, i) => (
                      <tr key={i} className={row.isNew2024 ? 'bg-amber-50 dark:bg-amber-950/30' : ''}>
                        <td className="p-2.5 font-bold text-slate-900 dark:text-white">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${DOT_COLOUR[row.color] || 'bg-slate-400'}`}></span>
                            <span>{lang === 'th' ? row.categoryTh : row.categoryEn}</span>
                          </div>
                          <p className="sm:hidden mt-1 font-normal text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">{lang === 'th' ? row.actionTh : row.actionEn}</p>
                        </td>
                        <td className="p-2.5 font-mono font-bold whitespace-nowrap">{row.sbp}</td>
                        <td className="p-2.5 font-mono font-bold whitespace-nowrap">{row.dbp}</td>
                        <td className="p-2.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed hidden sm:table-cell">{lang === 'th' ? row.actionTh : row.actionEn}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Fold>

            <Fold id="start-oob" tone="teal" icon={HomeIcon} title={lang === 'th' ? 'เกณฑ์วินิจฉัยตามวิธีวัด และรูปแบบความดันกลางคืน' : 'Diagnostic thresholds by method, and night-time patterns'} badge={lang === 'th' ? 'ตารางที่ 3, 6' : 'Tables 3, 6'}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {g.bpClassification.table6_modalities.map((m, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <strong className="text-slate-900 dark:text-white">{lang === 'th' ? m.modalityTh : m.modalityEn}</strong>
                      <span className="font-mono font-black text-teal-700 dark:text-teal-300">&ge; {m.sbpCutoff}/{m.dbpCutoff}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">{lang === 'th' ? m.noteTh : m.noteEn}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {g.bpClassification.diurnalPatterns.map((p, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                    <strong className="block text-slate-900 dark:text-white">{lang === 'th' ? p.patternTh : p.patternEn}</strong>
                    <span className="text-slate-600 dark:text-slate-300">{lang === 'th' ? p.dropTh : p.dropEn}</span>
                    <span className="block text-teal-700 dark:text-teal-300 font-semibold">{lang === 'th' ? p.cvRiskTh : p.cvRiskEn}</span>
                  </div>
                ))}
              </div>
            </Fold>

            <Fold id="start-when" tone="amber" icon={InfoIcon} title={lang === 'th' ? 'เมื่อใดควรเริ่มยา' : 'When to start drugs'} badge={lang === 'th' ? 'ตารางที่ 9' : 'Table 9'}>
              <div className="space-y-2">
                {g.startingGuide.whenToStart.map((w, i) => (
                  <div key={i} className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs space-y-1">
                    <strong className="block text-slate-900 dark:text-white">{lang === 'th' ? w.conditionTh : w.conditionEn}</strong>
                    <p className="text-slate-700 dark:text-slate-300">{lang === 'th' ? w.thresholdTh : w.thresholdEn}</p>
                    <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300">{w.classLevel}</span>
                  </div>
                ))}
              </div>
            </Fold>

            <Fold id="start-strategy" tone="rose" icon={StethoscopeIcon} title={t.strategyTitle} badge={lang === 'th' ? 'ตารางที่ 12' : 'Table 12'}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {g.startingGuide.strategyRules.map((rule, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{lang === 'th' ? rule.titleTh : rule.titleEn}</h4>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">{rule.classLevel}</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{lang === 'th' ? rule.ruleTh : rule.ruleEn}</p>
                  </div>
                ))}
              </div>
            </Fold>

            <Fold id="start-targets" tone="emerald" icon={HospitalIcon} title={lang === 'th' ? 'ความดันเป้าหมาย' : 'Target blood pressure'} badge={lang === 'th' ? 'ตารางที่ 10, 11' : 'Tables 10, 11'}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
                    <HospitalIcon className="w-4 h-4 text-emerald-600" /> {t.clinicBpGoals}
                  </h4>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
                    {g.startingGuide.targetsClinic.map((target, idx) => (
                      <div key={idx} className="py-2.5 flex flex-wrap items-center justify-between gap-2">
                        <div className="min-w-0">
                          <span className="font-bold text-slate-800 dark:text-slate-200 block">{lang === 'th' ? target.ageTh : target.ageEn}</span>
                          <span className="text-[10px] text-slate-500">{target.classLevel}</span>
                        </div>
                        <span className="font-mono font-black text-xs px-2.5 py-1 rounded bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300">{lang === 'th' ? target.targetTh : target.targetEn}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
                    <HomeIcon className="w-4 h-4 text-emerald-600" /> {t.homeBpGoals}
                  </h4>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
                    {g.startingGuide.targetsHome.map((target, idx) => (
                      <div key={idx} className="py-2.5 flex flex-wrap items-center justify-between gap-2">
                        <div className="min-w-0">
                          <span className="font-bold text-slate-800 dark:text-slate-200 block">{lang === 'th' ? target.groupTh : target.groupEn}</span>
                          <span className="text-[10px] text-slate-500">{target.classLevel}</span>
                        </div>
                        <span className="font-mono font-black text-xs px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">{lang === 'th' ? target.targetTh : target.targetEn}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-900 flex items-start gap-3">
                <AlertTriangleIcon className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <p className="text-xs text-rose-800 dark:text-rose-300">{t.neverHarmRule}</p>
              </div>
            </Fold>
          </div>
  );
  if (id === 'secondary') return (
          <div className="space-y-4">
            <FoldAllBar lang={lang} />
            <Fold id="sec-when" tone="violet" icon={InfoIcon} defaultOpen title={t.whenToWorkup} badge={lang === 'th' ? 'ตารางที่ 36' : 'Table 36'}>
              <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1">
                {g.secondaryHT.whenToSuspect.map((w, i) => (
                  <li key={i}>{lang === 'th' ? w.th : w.en}</li>
                ))}
              </ul>
            </Fold>
            {g.secondaryHT.etiologies.map((et, i) => (
              <Fold key={et.id} id={'sec-' + et.id} tone={TONE_CYCLE[i % TONE_CYCLE.length]} icon={ZapIcon} title={lang === 'th' ? et.nameTh : et.nameEn}>
                {et.prevalenceEn && <p className="text-[11px] font-bold text-slate-500">{L(et, 'prevalence')}</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed">
                  <div>
                    <strong className="text-slate-800 dark:text-slate-200 block mb-0.5">{lang === 'th' ? 'ลักษณะที่ต้องสงสัย:' : 'Clinical clues:'}</strong>
                    <p className="text-slate-600 dark:text-slate-300">{L(et, 'clinicalClues')}</p>
                  </div>
                  <div>
                    <strong className="text-slate-800 dark:text-slate-200 block mb-0.5">{lang === 'th' ? 'การตรวจคัดกรอง:' : 'Screening test:'}</strong>
                    <p className="text-slate-600 dark:text-slate-300">{L(et, 'screeningTest')}</p>
                  </div>
                </div>
                {et.preTestPrepEn && (
                  <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200">
                    <strong>{lang === 'th' ? 'การเตรียมก่อนตรวจ: ' : 'Before the test: '}</strong>{L(et, 'preTestPrep')}
                  </div>
                )}
                {et.confirmatoryEn && (
                  <p className="text-xs text-slate-700 dark:text-slate-300"><strong>{lang === 'th' ? 'การยืนยัน: ' : 'Confirmation: '}</strong>{L(et, 'confirmatory')}</p>
                )}
                {et.imagingEn && (
                  <p className="text-xs text-slate-700 dark:text-slate-300"><strong>{lang === 'th' ? 'ภาพถ่ายรังสี: ' : 'Imaging: '}</strong>{L(et, 'imaging')}</p>
                )}
                <p className="text-xs text-slate-700 dark:text-slate-300"><strong>{lang === 'th' ? 'การรักษา: ' : 'Treatment: '}</strong>{L(et, 'treatment')}</p>
              </Fold>
            ))}
          </div>
  );
  if (id === 'resistant') return (
          <div className="space-y-4">
            <FoldAllBar lang={lang} />
            <Fold id="res-def" tone="rose" icon={ActivityIcon} defaultOpen title={t.resistantHtTitle} badge={lang === 'th' ? 'ภาพที่ 4' : 'Figure 4'}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 space-y-1">
                  <span className="text-xs font-bold text-rose-800 dark:text-rose-300 block">{lang === 'th' ? 'Resistant hypertension' : 'Resistant hypertension'}</span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{L(g.resistantHT.definitions, 'resistant')}</p>
                </div>
                <div className="p-3 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-900 space-y-1">
                  <span className="text-xs font-bold text-violet-800 dark:text-violet-300 block">{lang === 'th' ? 'Refractory hypertension' : 'Refractory hypertension'}</span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{L(g.resistantHT.definitions, 'refractory')}</p>
                </div>
              </div>
            </Fold>
            <Fold id="res-pseudo" tone="amber" icon={InfoIcon} title={t.pseudoResistantCheck}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {g.resistantHT.pseudoResistanceChecklist.map((item) => (
                  <div key={item.id} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">{L(item, 'text')}</div>
                ))}
              </div>
            </Fold>
            {g.resistantHT.stepwiseAlgorithm.map((step, i) => (
              <Fold key={step.step} id={'res-step-' + step.step} tone={['emerald', 'sky', 'violet', 'indigo'][i] || 'slate'} icon={ActivityIcon} title={lang === 'th' ? step.titleTh : step.titleEn} badge={lang === 'th' ? 'ภาพที่ 6' : 'Figure 6'}>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  {(lang === 'th' ? step.actionsTh : step.actionsEn).map((act, k) => (
                    <li key={k} className="leading-relaxed">{act}</li>
                  ))}
                </ul>
              </Fold>
            ))}
          </div>
  );
  if (id === 'crises') return (
          <div className="space-y-4">
            <FoldAllBar lang={lang} />
            <Fold id="cri-types" tone="rose" icon={AlertTriangleIcon} defaultOpen title={t.crisesTitle}>
              <p className="text-xs text-slate-700 dark:text-slate-300">{L(g.hypertensiveCrises, 'overview')}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-bold text-xs">EMERGENCY</span>
                    <h4 className="font-bold text-rose-900 dark:text-rose-200">Hypertensive emergency</h4>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{t.emergencyDesc}</p>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-amber-600 text-white font-bold text-xs">PSH</span>
                    <h4 className="font-bold text-amber-900 dark:text-amber-200">Pre-critical symptomatic hypertension</h4>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{t.pshDesc}</p>
                </div>
              </div>
            </Fold>
            <Fold id="cri-psh" tone="amber" icon={InfoIcon} title={L(g.hypertensiveCrises.pshProtocol, 'name')} badge={lang === 'th' ? 'ตารางที่ 42' : 'Table 42'}>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {(lang === 'th' ? g.hypertensiveCrises.pshProtocol.principlesTh : g.hypertensiveCrises.pshProtocol.principles).map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </Fold>
            {g.hypertensiveCrises.table41_emergencySyndromes.map((syn, idx) => (
              <Fold key={idx} id={'cri-syn-' + idx} tone={TONE_CYCLE[idx % TONE_CYCLE.length]} icon={AlertTriangleIcon} title={L(syn, 'syndrome')}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <strong className="text-slate-700 dark:text-slate-300 block mb-0.5">{lang === 'th' ? 'เป้าหมายความดัน:' : 'Target BP:'}</strong>
                    <span className="font-bold text-rose-700 dark:text-rose-300">{L(syn, 'bpTarget')}</span>
                  </div>
                  <div>
                    <strong className="text-slate-700 dark:text-slate-300 block mb-0.5">{lang === 'th' ? 'ระยะเวลา:' : 'Timing:'}</strong>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{L(syn, 'timeline')}</span>
                  </div>
                </div>
                <p className="text-xs"><strong className="text-slate-700 dark:text-slate-300">{lang === 'th' ? 'ยาที่แนะนำ: ' : 'Recommended drugs: '}</strong><span className="text-slate-800 dark:text-slate-200">{L(syn, 'firstLineMeds')}</span></p>
                <p className="text-[11px] text-rose-900 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 p-2 rounded-lg border border-rose-200 dark:border-rose-900">
                  <strong>{lang === 'th' ? 'ข้อควรระวัง: ' : 'Caution: '}</strong>{L(syn, 'caution')}
                </p>
              </Fold>
            ))}
          </div>
  );
  if (id === 'comorbidities') return (
          <div className="space-y-4">
            <FoldAllBar lang={lang} />
            {g.specialPopulations.map((pop, i) => (
              <Fold key={pop.id} id={'pop-' + pop.id} tone={TONE_CYCLE[i % TONE_CYCLE.length]} icon={HeartPulseIcon} defaultOpen={i === 0} title={lang === 'th' ? pop.nameTh : pop.nameEn}>
                <p className="text-xs"><strong className="text-slate-700 dark:text-slate-300">{lang === 'th' ? 'เป้าหมาย: ' : 'Target: '}</strong><span className="font-mono font-bold text-rose-700 dark:text-rose-300">{L(pop, 'target')}</span></p>
                <div className="text-xs space-y-1">
                  <strong className="text-slate-700 dark:text-slate-300 block">{lang === 'th' ? 'ยาที่แนะนำ:' : 'Preferred drugs:'}</strong>
                  <p className="text-slate-800 dark:text-slate-200 font-semibold">{L(pop, 'firstChoice')}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-[11px] text-teal-950 dark:text-teal-200">
                  <strong>{lang === 'th' ? 'ข้อควรทราบ: ' : 'Note: '}</strong>{L(pop, 'pearl')}
                </div>
              </Fold>
            ))}
          </div>
  );
  if (id === 'tools') return (
          <ClinicalTools lang={lang} />
  );
  return null;
};
