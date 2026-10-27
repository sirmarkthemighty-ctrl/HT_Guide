// --- Main Application Component: Thai Hypertension Guide (CPG 2567) ---
// APP_VERSION and changelogData live in components-layout.js

const FIRST_LINE_CLASS_IDS = ['acei', 'arb', 'dhp_ccb', 'thiazide_like', 'beta_blocker', 'spc_dual', 'spc_triple'];
const EMPTY_FILTERS = { nlemOnly: false, firstLineOnly: false, spcOnly: false, pregnancySafe: false, renalSafe: false };

const App = () => {
  // Theme: follows the device until the sun/moon button is tapped, then remembers the choice
  const [themePref, setThemePref] = useState(() => {
    try {
      const saved = localStorage.getItem('htg-theme');
      return saved === 'dark' || saved === 'light' ? saved : null;
    } catch (e) {
      return null;
    }
  });
  const [systemDark, setSystemDark] = useState(() => !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches));
  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => setSystemDark(e.matches);
    if (mq.addEventListener) mq.addEventListener('change', onChange); else mq.addListener(onChange);
    return () => { if (mq.removeEventListener) mq.removeEventListener('change', onChange); else mq.removeListener(onChange); };
  }, []);
  const theme = themePref || (systemDark ? 'dark' : 'light');
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setThemePref(next);
    try { localStorage.setItem('htg-theme', next); } catch (e) { /* not remembered */ }
  };

  // Language ('th' or 'en')
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('htg-lang') === 'en' ? 'en' : 'th';
    } catch (e) {
      return 'th';
    }
  });
  useEffect(() => {
    try { localStorage.setItem('htg-lang', lang); } catch (e) { /* not remembered */ }
    document.documentElement.lang = lang;
  }, [lang]);
  const toggleLang = () => setLang((prev) => (prev === 'th' ? 'en' : 'th'));

  const [activeTab, setActiveTab] = useState('drugs');

  // Search & filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedClass, setSelectedClass] = useState('all');
  const [quickFilters, setQuickFilters] = useState(EMPTY_FILTERS);
  const [showFiltersDrawer, setShowFiltersDrawer] = useState(false);
  const [viewMode, setViewMode] = useState('card');

  // Compare (up to 4), detail, patient sheet, changelog
  const [comparedIds, setComparedIds] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [detailDrug, setDetailDrug] = useState(null);
  const [showPatientSheet, setShowPatientSheet] = useState(false);
  const [showChangelog, setShowChangelog] = useState(false);

  // Bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('htg-bookmarks'));
      return Array.isArray(saved) ? saved : [];
    } catch (e) {
      return [];
    }
  });
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  useEffect(() => {
    try { localStorage.setItem('htg-bookmarks', JSON.stringify(bookmarkedIds)); } catch (e) { /* not remembered */ }
  }, [bookmarkedIds]);

  // Escape closes the top-most window
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (showChangelog) setShowChangelog(false);
      else if (detailDrug) setDetailDrug(null);
      else if (showCompareModal) setShowCompareModal(false);
      else if (showPatientSheet) setShowPatientSheet(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showChangelog, detailDrug, showCompareModal, showPatientSheet]);

  const toggleBookmark = (id) => {
    setBookmarkedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const toggleCompare = (drug) => {
    setComparedIds((prev) => {
      if (prev.includes(drug.id)) return prev.filter((x) => x !== drug.id);
      if (prev.length >= 4) {
        alert(lang === 'th' ? 'สามารถเปรียบเทียบได้สูงสุด 4 ตัวยาพร้อมกัน' : 'You can compare up to 4 drugs at a time.');
        return prev;
      }
      return [...prev, drug.id];
    });
  };
  const removeCompared = (id) => setComparedIds((prev) => prev.filter((x) => x !== id));
  const clearCompared = () => setComparedIds([]);

  const comparedDrugs = useMemo(
    () => comparedIds.map((id) => drugsData.find((d) => d.id === id)).filter(Boolean),
    [comparedIds]
  );

  const activeFiltersCount = useMemo(() => {
    let count = Object.values(quickFilters).filter(Boolean).length;
    if (selectedCategory !== 'all') count++;
    if (selectedClass !== 'all') count++;
    if (showBookmarksOnly) count++;
    return count;
  }, [selectedCategory, selectedClass, quickFilters, showBookmarksOnly]);

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedClass('all');
    setQuickFilters(EMPTY_FILTERS);
    setShowBookmarksOnly(false);
    setSearchQuery('');
  };
  const toggleQuick = (key) => setQuickFilters((prev) => ({ ...prev, [key]: !prev[key] }));

  const filteredDrugs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return drugsData.filter((drug) => {
      if (showBookmarksOnly && !bookmarkedIds.includes(drug.id)) return false;
      if (selectedCategory !== 'all') {
        const cls = drugClasses.find((c) => c.id === drug.classId);
        if (!cls || cls.categoryId !== selectedCategory) return false;
      }
      if (selectedClass !== 'all' && drug.classId !== selectedClass) return false;
      if (quickFilters.nlemOnly && !drug.nlem) return false;
      if (quickFilters.firstLineOnly && !FIRST_LINE_CLASS_IDS.includes(drug.classId)) return false;
      if (quickFilters.spcOnly && !drug.classId.startsWith('spc_')) return false;
      if (quickFilters.pregnancySafe && drug.pregnancyRisk !== 'safe_first_line') return false;
      if (quickFilters.renalSafe && drug.renalAdjustment.cutoff > 15) return false;
      if (!q) return true;
      const has = (s) => !!s && s.toLowerCase().includes(q);
      return has(drug.nameEn) || has(drug.nameTh) || has(drug.genericName) ||
        (drug.brandNames || []).some(has) || has(drug.classNameEn) || has(drug.classNameTh) ||
        (drug.compellingIndications || []).some(has);
    });
  }, [searchQuery, selectedCategory, selectedClass, quickFilters, showBookmarksOnly, bookmarkedIds]);

  const t = translations[lang];
  const L = (obj, key) => (lang === 'th' && obj[key + 'Th'] ? obj[key + 'Th'] : obj[key + 'En']);
  const g = guidelinesData;

  const chip = (on, onCls, offHover) =>
    `px-2.5 py-1 rounded-lg font-semibold border transition-colors ${on ? onCls : `bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 ${offHover}`}`;
  const iconBtn = 'w-8 h-8 inline-flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-rose-400 transition-colors';

  const TABS = [
    { id: 'drugs', label: t.tabDrugs, icon: PillIcon },
    { id: 'starting', label: t.tabStarting, icon: StethoscopeIcon },
    { id: 'secondary', label: t.tabSecondary, icon: ZapIcon },
    { id: 'resistant', label: t.tabResistant, icon: ActivityIcon },
    { id: 'crises', label: t.tabCrises, icon: AlertTriangleIcon },
    { id: 'comorbidities', label: t.tabComorbidities, icon: HeartPulseIcon },
    { id: 'tools', label: t.tabTools, icon: GaugeIcon },
    { id: 'references', label: t.tabReferences, icon: BookOpenIcon },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b1329] text-slate-900 dark:text-slate-100 flex flex-col font-sans">

      {/* ==================== TITLE BAR (always pinned) ==================== */}
      <div className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 md:h-[60px]" data-title-bar>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 md:py-0 md:h-full flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-rose-500 text-white flex items-center justify-center p-1.5 shadow-md shrink-0">
              <HeartPulseIcon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base md:text-lg font-black text-slate-900 dark:text-white leading-tight">
                {t.appTitle}
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <button
                  onClick={() => setShowChangelog(true)}
                  className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-800 hover:bg-rose-200 dark:hover:bg-rose-900"
                  title={lang === 'th' ? 'บันทึกการเปลี่ยนแปลง' : 'Changelog'}
                  data-version-badge
                >
                  {APP_VERSION}
                </button>
                <p className="hidden md:block text-[11px] text-slate-500 dark:text-slate-400 truncate">{t.appSubtitle}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button onClick={() => setShowPatientSheet(true)} className={iconBtn} title={t.patientSheet} aria-label={t.patientSheet} data-patient-sheet>
              <PrinterIcon className="w-4 h-4 text-rose-600" />
            </button>
            <button
              onClick={() => setShowBookmarksOnly((prev) => !prev)}
              className={showBookmarksOnly ? 'w-8 h-8 inline-flex items-center justify-center rounded-full border bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-700' : iconBtn}
              title={t.bookmarks}
              aria-label={t.bookmarks}
              aria-pressed={showBookmarksOnly}
            >
              <BookmarkIcon className="w-4 h-4" />
            </button>
            <button onClick={toggleLang} className="h-8 inline-flex items-center gap-1 px-2.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-rose-400 text-xs font-bold text-slate-700 dark:text-slate-200" title="Switch language" data-lang-toggle>
              <GlobeIcon className="w-3.5 h-3.5 text-rose-600" />
              <span>{lang === 'th' ? 'EN' : 'ไทย'}</span>
            </button>
            <button onClick={toggleTheme} className={iconBtn} title={theme === 'dark' ? t.themeLight : t.themeDark} aria-label={theme === 'dark' ? t.themeLight : t.themeDark} data-theme-toggle>
              {theme === 'dark' ? <SunIcon className="w-4 h-4 text-amber-400" /> : <MoonIcon className="w-4 h-4 text-slate-600" />}
            </button>
          </div>
        </div>
      </div>

      {/* ==================== SEARCH, FILTERS, TABS (pinned on wide screens only) ==================== */}
      <header className="md:sticky md:top-[60px] z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
        {activeTab === 'drugs' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500"
                  data-search
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" title={t.clearSearch}>
                    <XIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setShowFiltersDrawer((prev) => !prev)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-colors shadow-sm ${
                    showFiltersDrawer || activeFiltersCount > 0
                      ? 'bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-rose-400'
                  }`}
                >
                  <FilterIcon className="w-3.5 h-3.5" />
                  <span>{t.filters}</span>
                  {activeFiltersCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] font-black flex items-center justify-center">{activeFiltersCount}</span>
                  )}
                </button>
                <div className="flex border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden p-0.5 bg-slate-100 dark:bg-slate-800">
                  <button onClick={() => setViewMode('card')} className={`p-1.5 rounded-lg ${viewMode === 'card' ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-300 shadow-sm' : 'text-slate-400 hover:text-slate-700'}`} title={t.viewCard}>
                    <LayoutGridIcon className="w-4 h-4" />
                  </button>
                  <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-lg ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-300 shadow-sm' : 'text-slate-400 hover:text-slate-700'}`} title={t.viewList}>
                    <ListIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick filter chips: wrap onto more rows on narrow screens */}
            <div className="flex flex-wrap items-center gap-1.5 text-[11px]" data-quick-filters>
              <button
                onClick={clearAllFilters}
                className={`px-2.5 py-1 rounded-lg font-bold border transition-colors ${
                  activeFiltersCount === 0
                    ? 'bg-slate-800 text-white dark:bg-white dark:text-slate-900 border-slate-800 dark:border-white'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                }`}
              >
                {t.filterAll}
              </button>
              <button onClick={() => toggleQuick('firstLineOnly')} className={chip(quickFilters.firstLineOnly, 'bg-blue-600 text-white border-blue-600', 'hover:border-blue-400')}>{t.filterFirstLine}</button>
              <button onClick={() => toggleQuick('spcOnly')} className={chip(quickFilters.spcOnly, 'bg-teal-600 text-white border-teal-600', 'hover:border-teal-400')}>{t.filterSpc}</button>
              <button onClick={() => toggleQuick('nlemOnly')} className={chip(quickFilters.nlemOnly, 'bg-emerald-600 text-white border-emerald-600', 'hover:border-emerald-400')}>{t.filterNlem}</button>
              <button onClick={() => toggleQuick('pregnancySafe')} className={chip(quickFilters.pregnancySafe, 'bg-rose-600 text-white border-rose-600', 'hover:border-rose-400')}>{t.filterPregnancySafe}</button>
              <button onClick={() => toggleQuick('renalSafe')} className={chip(quickFilters.renalSafe, 'bg-indigo-600 text-white border-indigo-600', 'hover:border-indigo-400')}>{t.filterRenalSafe}</button>
            </div>
          </div>
        )}

        {/* Main tabs: wrap instead of scrolling sideways */}
        <div className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-2 sm:px-6">
          <nav className="max-w-7xl mx-auto flex flex-wrap items-center gap-x-1 text-xs sm:text-sm font-bold" data-main-tabs>
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  data-tab={tab.id}
                  className={`flex items-center gap-1.5 py-2.5 px-2.5 sm:px-3 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-rose-600 text-rose-600 dark:text-rose-400 dark:border-rose-400 bg-white dark:bg-slate-800 rounded-t-lg'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6" id="main-app-container">

        {/* TAB 1: DRUG DIRECTORY */}
        {activeTab === 'drugs' && (
          <div className="space-y-5">
            {showFiltersDrawer && (
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                    <SlidersIcon className="w-4 h-4 text-rose-600" />
                    <span>{lang === 'th' ? 'กรองตามกลุ่มยา' : 'Filter by drug class'}</span>
                  </h4>
                  <button onClick={clearAllFilters} className="text-xs text-rose-600 hover:underline font-semibold">{t.clearAllFilters}</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-600 dark:text-slate-400 block mb-1">{lang === 'th' ? 'หมวดหมู่หลัก:' : 'Main category:'}</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => { setSelectedCategory(e.target.value); setSelectedClass('all'); }}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                      <option value="all">{t.allCategories}</option>
                      {drugCategories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{lang === 'th' ? cat.nameTh : cat.nameEn}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-600 dark:text-slate-400 block mb-1">{lang === 'th' ? 'กลุ่มทางเภสัชวิทยา:' : 'Drug class:'}</label>
                    <select
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                      <option value="all">{lang === 'th' ? 'ทุกกลุ่ม' : 'All classes'}</option>
                      {drugClasses
                        .filter((c) => selectedCategory === 'all' || c.categoryId === selectedCategory)
                        .map((cls) => (
                          <option key={cls.id} value={cls.id}>{lang === 'th' ? cls.nameTh : cls.nameEn}</option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 px-1">
              <span data-result-count>
                {lang === 'th'
                  ? `แสดง ${filteredDrugs.length} จาก ${drugsData.length} รายการยา`
                  : `Showing ${filteredDrugs.length} of ${drugsData.length} medications`}
                {activeFiltersCount > 0 && ` (${t.activeFilters}: ${activeFiltersCount})`}
              </span>
              {bookmarkedIds.length > 0 && (
                <span className="text-amber-600 dark:text-amber-400 font-semibold">
                  ★ {bookmarkedIds.length} {lang === 'th' ? 'รายการที่บันทึก' : 'bookmarked'}
                </span>
              )}
            </div>

            {filteredDrugs.length === 0 ? (
              <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <PillIcon className="w-12 h-12 text-slate-300 mx-auto" />
                <h4 className="text-base font-bold text-slate-700 dark:text-slate-300">
                  {lang === 'th' ? 'ไม่พบรายการยาที่ตรงกับเงื่อนไข' : 'No medications match your filters'}
                </h4>
                <button onClick={clearAllFilters} className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-500 shadow-sm">{t.clearAllFilters}</button>
              </div>
            ) : viewMode === 'card' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5" data-drug-grid>
                {filteredDrugs.map((drug) => (
                  <DrugCard
                    key={drug.id}
                    drug={drug}
                    lang={lang}
                    isCompared={comparedIds.includes(drug.id)}
                    onToggleCompare={toggleCompare}
                    onSelectDetail={setDetailDrug}
                    isBookmarked={bookmarkedIds.includes(drug.id)}
                    onToggleBookmark={toggleBookmark}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-2" data-drug-list>
                {filteredDrugs.map((drug) => (
                  <DrugListRow
                    key={drug.id}
                    drug={drug}
                    lang={lang}
                    isCompared={comparedIds.includes(drug.id)}
                    onToggleCompare={toggleCompare}
                    onSelectDetail={setDetailDrug}
                    isBookmarked={bookmarkedIds.includes(drug.id)}
                    onToggleBookmark={toggleBookmark}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CLASSIFICATION, STARTING DRUGS & TARGETS */}
        {activeTab === 'starting' && (
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
        )}

        {/* TAB 3: SECONDARY HT */}
        {activeTab === 'secondary' && (
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
        )}

        {/* TAB 4: RESISTANT & REFRACTORY HT */}
        {activeTab === 'resistant' && (
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
        )}

        {/* TAB 5: HYPERTENSIVE CRISES */}
        {activeTab === 'crises' && (
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
        )}

        {/* TAB 6: COMORBIDITIES */}
        {activeTab === 'comorbidities' && (
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
        )}

        {/* TAB 7: TOOLS */}
        {activeTab === 'tools' && <ClinicalTools lang={lang} />}

        {/* TAB 8: REFERENCES */}
        {activeTab === 'references' && (
          <div className="space-y-4">
            <FoldAllBar lang={lang} />
            <Fold id="ref-sources" tone="sky" icon={BookOpenIcon} defaultOpen title={lang === 'th' ? 'แหล่งข้อมูลของแอปนี้' : 'Sources used in this app'}>
              <ul className="space-y-2 text-xs sm:text-sm">
                {['cpg', 'cpgEn', 'nlem', 'dailymed'].map((k) => (
                  <li key={k}>
                    <a href={SOURCES[k].url} target="_blank" rel="noopener noreferrer" className="text-sky-700 dark:text-sky-300 underline break-words">{SOURCES[k][lang]}</a>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {lang === 'th'
                  ? 'ตาราง หน้า และระดับคำแนะนำในแอปอ้างอิงฉบับภาษาไทย (เลขหน้าตามที่พิมพ์) ข้อความที่มีเครื่องหมาย [ไม่มีในแนวทางฯ 2567] ไม่ได้มาจากแนวทางฯ ราคา รูปยา และชื่อการค้ายังไม่มีแหล่งข้อมูล'
                  : 'Tables, pages and grades refer to the Thai edition (printed page numbers). Text marked [Not in Thai CPG 2567] does not come from the guideline. Prices, drug pictures and brand names have no recorded source yet.'}
              </p>
            </Fold>
            <Fold id="ref-grades" tone="emerald" icon={InfoIcon} title={lang === 'th' ? 'ระดับคำแนะนำและคุณภาพหลักฐาน' : 'Strength of recommendation and quality of evidence'}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700 dark:text-slate-300">
                <ul className="space-y-1.5">
                  <li><strong className="text-emerald-700 dark:text-emerald-400">I:</strong> {lang === 'th' ? 'ควรปฏิบัติ (น่าเชื่อถือ มีประโยชน์ คุ้มค่า)' : 'Should be practised (reliable, beneficial, worthwhile)'}</li>
                  <li><strong className="text-teal-700 dark:text-teal-400">IIa:</strong> {lang === 'th' ? 'น่าปฏิบัติ' : 'Could be practised'}</li>
                  <li><strong className="text-amber-700 dark:text-amber-400">IIb:</strong> {lang === 'th' ? 'อาจปฏิบัติ' : 'May be practised'}</li>
                  <li><strong className="text-rose-700 dark:text-rose-400">III:</strong> {lang === 'th' ? 'ไม่ควรหรือห้ามปฏิบัติ (ไม่มีประโยชน์ อาจเป็นอันตราย)' : 'Should not / must not be practised (no benefit, may harm)'}</li>
                </ul>
                <ul className="space-y-1.5">
                  <li><strong className="text-blue-700 dark:text-blue-400">A:</strong> {lang === 'th' ? 'RCT คุณภาพดีหลายการศึกษา หรือ meta-analysis' : 'Several high-quality RCTs or meta-analyses'}</li>
                  <li><strong className="text-indigo-700 dark:text-indigo-400">B:</strong> {lang === 'th' ? 'RCT คุณภาพดีอย่างน้อย 1 การศึกษา หรือการศึกษาขนาดใหญ่ที่ไม่ใช่ RCT' : 'At least one high-quality RCT, or a large non-randomised study'}</li>
                  <li><strong className="text-slate-700 dark:text-slate-300">C:</strong> {lang === 'th' ? 'การศึกษาอื่น ทะเบียนข้อมูล หรือความเห็นผู้เชี่ยวชาญ' : 'Other studies, registries or expert opinion'}</li>
                </ul>
              </div>
            </Fold>
            <Fold id="ref-trials" tone="violet" icon={BookOpenIcon} title={lang === 'th' ? 'การศึกษาที่แนวทางฯ อ้างถึง' : 'Trials named in the Thai CPG'}>
              <div className="space-y-2 text-xs">
                {[
                  { name: 'SPRINT (2015)', cite: 'SPRINT Research Group. N Engl J Med 2015;373:2103-2116. Intensive SBP target < 120 mmHg reduced the primary CV outcome by 25%.' },
                  { name: 'STEP (2021)', cite: 'Zhang W, et al. N Engl J Med 2021;385:1268-1279. SBP 110-129 mmHg in older Chinese patients reduced CV events.' },
                  { name: 'PATHWAY-2 (2015)', cite: 'Williams B, et al. Lancet 2015;386:2059-2068. Spironolactone was the most effective add-on drug in resistant hypertension.' },
                  { name: 'START study (2023)', cite: 'Schmieder RE, et al. Hypertension 2023;80:1127-1135. Single-pill combinations: better persistence, fewer CV events and lower all-cause mortality than the same drugs as separate pills.' },
                  { name: 'TIME (2022)', cite: 'Mackenzie IS, et al. Lancet 2022;400:1417-1425. Evening vs morning dosing: no difference in major CV outcomes.' },
                  { name: 'PARAGON-HF sub-study (2021)', cite: 'Jackson AM, et al. Eur Heart J 2021;42:3741-3752. Sacubitril/valsartan for apparent resistant hypertension in HFpEF.' },
                  { name: 'SELECT (2023)', cite: 'Lincoff AM, et al. N Engl J Med 2023;389:2221-2232. Semaglutide 2.4 mg weekly in obesity with ASCVD reduced CV events.' },
                ].map((ref, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <strong className="text-slate-800 dark:text-slate-200 block mb-0.5">{ref.name}</strong>
                    <p className="text-slate-600 dark:text-slate-300 text-[11px]">{ref.cite}</p>
                  </div>
                ))}
                <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700">
                  <strong className="text-slate-800 dark:text-slate-200 block mb-0.5">{lang === 'th' ? 'อ้างถึงในแอป (ไม่ได้ระบุชื่อในแนวทางฯ)' : 'Referred to in this app (not named in the CPG)'}</strong>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px]">CLICK (2021): Agarwal R, et al. N Engl J Med 2021;385:2507-2519. Chlorthalidone in stage 4 CKD (eGFR 15-30).</p>
                </div>
              </div>
            </Fold>
          </div>
        )}
      </main>

      {/* ==================== WINDOWS ==================== */}
      {detailDrug && (
        <DrugDetailModal
          drug={detailDrug}
          lang={lang}
          onClose={() => setDetailDrug(null)}
          onToggleCompare={toggleCompare}
          isCompared={comparedIds.includes(detailDrug.id)}
        />
      )}
      {showCompareModal && (
        <CompareModal comparedDrugs={comparedDrugs} lang={lang} onClose={() => setShowCompareModal(false)} onRemoveDrug={removeCompared} />
      )}
      <CompareDrawer
        comparedDrugs={comparedDrugs}
        lang={lang}
        onOpenCompare={() => setShowCompareModal(true)}
        onClearCompare={clearCompared}
        onRemoveDrug={removeCompared}
      />
      {showPatientSheet && <PatientSheetModal lang={lang} onClose={() => setShowPatientSheet(false)} />}
      {showChangelog && <ChangelogModal lang={lang} onClose={() => setShowChangelog(false)} />}

      {/* ==================== FOOTER ==================== */}
      <footer className={`mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-center text-xs text-slate-500 ${comparedDrugs.length ? 'pb-28 sm:pb-6' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-semibold text-slate-600 dark:text-slate-400">{t.appTitle} - {t.appSubtitle}</p>
          <p className="text-[11px]">
            <button onClick={() => setShowChangelog(true)} className="underline">{APP_VERSION}</button> &bull; {lang === 'th' ? 'สำหรับบุคลากรทางการแพทย์ ใช้ประกอบการตัดสินใจทางคลินิก' : 'For healthcare professionals; supports, not replaces, clinical judgement'}
          </p>
        </div>
      </footer>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
