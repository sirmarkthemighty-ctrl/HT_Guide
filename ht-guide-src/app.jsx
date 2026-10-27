// --- Main page: Thai HT Guide (Bronchodilator Guide layout, v1.2.0) ---
// APP_VERSION and changelogData live in components-layout.js; guide windows render GuideBody (components-guides.js)

const FIRST_LINE_CLASS_IDS = ['acei', 'arb', 'dhp_ccb', 'thiazide_like', 'beta_blocker', 'spc_dual', 'spc_triple'];

// Guide buttons: key, full name, short name (phone tiles), colour, icon
const GUIDES = [
  ['starting', { th: 'เริ่มยาและเป้าหมาย', en: 'Start & targets' }, { th: 'เริ่มยา', en: 'Start' }, 'bg-teal-600 hover:bg-teal-700 border-teal-700', StethoscopeIcon],
  ['secondary', { th: 'ความดันสูงทุติยภูมิ', en: 'Secondary HT' }, { th: 'ทุติยภูมิ', en: 'Secondary' }, 'bg-violet-600 hover:bg-violet-700 border-violet-700', ZapIcon],
  ['resistant', { th: 'ความดันสูงดื้อยา', en: 'Resistant HT' }, { th: 'ดื้อยา', en: 'Resistant' }, 'bg-indigo-600 hover:bg-indigo-700 border-indigo-700', ActivityIcon],
  ['crises', { th: 'ภาวะวิกฤต', en: 'Crises' }, { th: 'วิกฤต', en: 'Crises' }, 'bg-rose-600 hover:bg-rose-700 border-rose-700', AlertTriangleIcon],
  ['comorbidities', { th: 'โรคร่วม', en: 'Comorbidities' }, { th: 'โรคร่วม', en: 'Comorbid' }, 'bg-sky-600 hover:bg-sky-700 border-sky-700', HeartPulseIcon],
  ['tools', { th: 'เครื่องมือคำนวณ', en: 'Clinical tools' }, { th: 'เครื่องมือ', en: 'Tools' }, 'bg-amber-600 hover:bg-amber-700 border-amber-700', CalculatorIcon],
  ['sheet', { th: 'ใบคำแนะนำผู้ป่วย', en: 'Patient sheet' }, { th: 'ใบผู้ป่วย', en: 'Sheet' }, 'bg-emerald-600 hover:bg-emerald-700 border-emerald-700', PrinterIcon],
];

const CLINICAL = [
  ['firstLine', { th: 'ยากลุ่มหลัก 5 กลุ่ม', en: 'First-line classes' }, 'bg-blue-600 text-white shadow-sm', 'text-blue-700 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-slate-700'],
  ['spc', { th: 'ยารวมเม็ด (SPC)', en: 'Single-pill combos' }, 'bg-teal-600 text-white shadow-sm', 'text-teal-700 hover:bg-teal-50 dark:text-teal-300 dark:hover:bg-slate-700'],
  ['pregnancy', { th: 'ใช้ได้ในครรภ์', en: 'Pregnancy use' }, 'bg-rose-600 text-white shadow-sm', 'text-rose-700 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-slate-700'],
  ['renal', { th: 'ใช้ได้เมื่อ eGFR < 30', en: 'eGFR < 30 use' }, 'bg-indigo-600 text-white shadow-sm', 'text-indigo-700 hover:bg-indigo-50 dark:text-indigo-300 dark:hover:bg-slate-700'],
];
const CLINICAL_TEST = {
  firstLine: (d) => FIRST_LINE_CLASS_IDS.includes(d.classId),
  spc: (d) => d.classId.startsWith('spc_'),
  pregnancy: (d) => d.pregnancyRisk === 'safe_first_line',
  renal: (d) => d.renalAdjustment.cutoff <= 15,
};

const App = () => {
  // Theme: follows the device until the sun/moon button is tapped, then remembers the choice
  const [themePref, setThemePref] = useState(() => {
    try { const s = localStorage.getItem('htg-theme'); return s === 'dark' || s === 'light' ? s : null; } catch (e) { return null; }
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
  useEffect(() => { document.documentElement.classList.toggle('dark', theme === 'dark'); }, [theme]);
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setThemePref(next);
    try { localStorage.setItem('htg-theme', next); } catch (e) { /* not remembered */ }
  };

  const [lang, setLang] = useState(() => { try { return localStorage.getItem('htg-lang') === 'en' ? 'en' : 'th'; } catch (e) { return 'th'; } });
  useEffect(() => {
    try { localStorage.setItem('htg-lang', lang); } catch (e) { /* not remembered */ }
    document.documentElement.lang = lang;
  }, [lang]);
  const L = (th, en) => (lang === 'th' ? th : en);
  const t = translations[lang];

  // Search, sort, view, filters
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOpen, setSearchOpen] = useState(false); // phones: the search box opens across the row
  const searchRef = useRef(null);
  useEffect(() => { if (searchOpen && searchRef.current) searchRef.current.focus(); }, [searchOpen]);
  const [sortOrder, setSortOrder] = useState('nameAsc');
  const [viewMode, setViewMode] = useState('grid');
  const [filtersOpen, setFiltersOpen] = useState(() => !(typeof window !== 'undefined' && window.innerWidth < 640));
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [clinical, setClinical] = useState([]);
  const [nlemOnly, setNlemOnly] = useState(false);
  const [bookmarksOnly, setBookmarksOnly] = useState(false);

  // Windows
  const [openGuide, setOpenGuide] = useState(null);
  const [detailDrug, setDetailDrug] = useState(null);
  const [showChangelog, setShowChangelog] = useState(false);
  const [comparedIds, setComparedIds] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try { const s = JSON.parse(localStorage.getItem('htg-bookmarks')); return Array.isArray(s) ? s : []; } catch (e) { return []; }
  });
  useEffect(() => { try { localStorage.setItem('htg-bookmarks', JSON.stringify(bookmarkedIds)); } catch (e) { /* not remembered */ } }, [bookmarkedIds]);
  const toggleBookmark = (id) => setBookmarkedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  // Escape closes the top-most window
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (showChangelog) setShowChangelog(false);
      else if (detailDrug) setDetailDrug(null);
      else if (showCompareModal) setShowCompareModal(false);
      else if (openGuide) setOpenGuide(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showChangelog, detailDrug, showCompareModal, openGuide]);

  const toggleCompare = (drug) => {
    setComparedIds((prev) => {
      if (prev.includes(drug.id)) return prev.filter((x) => x !== drug.id);
      if (prev.length >= 4) return prev; // the bar holds 4; a fifth tap does nothing
      return [...prev, drug.id];
    });
  };
  const comparedDrugs = useMemo(() => comparedIds.map((id) => drugsData.find((d) => d.id === id)).filter(Boolean), [comparedIds]);

  const classesOf = (cat) => drugClasses.filter((c) => cat === 'all' || c.categoryId === cat);
  const toggleIn = (setter) => (k) => setter((prev) => (prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]));
  const toggleClass = toggleIn(setSelectedClasses);
  const toggleClinical = toggleIn(setClinical);
  const selectCategory = (cat) => {
    setSelectedCategory(cat);
    if (cat !== 'all') setSelectedClasses((prev) => prev.filter((k) => classesOf(cat).some((c) => c.id === k)));
  };
  const resetFilters = () => {
    setSearchTerm(''); setSelectedCategory('all'); setSelectedClasses([]); setClinical([]);
    setNlemOnly(false); setBookmarksOnly(false); setSortOrder('nameAsc');
  };

  const filteredDrugs = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    const has = (s) => !!s && s.toLowerCase().includes(q);
    const catOf = (d) => (drugClasses.find((c) => c.id === d.classId) || {}).categoryId;
    return drugsData.filter((d) => {
      if (q && !(has(d.nameEn) || has(d.nameTh) || has(d.genericName) || (d.brandNames || []).some(has) || has(d.classNameEn) || has(d.classNameTh) || (d.compellingIndications || []).some(has))) return false;
      if (nlemOnly && !d.nlem) return false;
      if (bookmarksOnly && !bookmarkedIds.includes(d.id)) return false;
      if (selectedCategory !== 'all' && catOf(d) !== selectedCategory) return false;
      if (selectedClasses.length && !selectedClasses.includes(d.classId)) return false;
      return clinical.every((k) => CLINICAL_TEST[k](d));
    }).sort((a, b) => {
      if (sortOrder === 'class') return a.classNameEn.localeCompare(b.classNameEn) || a.nameEn.localeCompare(b.nameEn);
      if (sortOrder === 'nlem') return (b.nlem ? 1 : 0) - (a.nlem ? 1 : 0) || a.nameEn.localeCompare(b.nameEn);
      return a.nameEn.localeCompare(b.nameEn);
    });
  }, [searchTerm, nlemOnly, bookmarksOnly, bookmarkedIds, selectedCategory, selectedClasses, clinical, sortOrder]);

  const catLabel = (c) => (lang === 'th' ? c.nameTh : c.nameEn).split('(')[0].trim();
  const clsLabel = (c) => (lang === 'th' ? c.nameTh : c.nameEn).split('(')[0].trim();
  const filterChips = [
    ...(searchTerm.trim() ? [{ key: 'q', label: '"' + searchTerm.trim() + '"', off: () => setSearchTerm('') }] : []),
    ...(nlemOnly ? [{ key: 'nlem', label: t.filterNlem, off: () => setNlemOnly(false) }] : []),
    ...(bookmarksOnly ? [{ key: 'bm', label: L('ที่บันทึกไว้', 'Bookmarked'), off: () => setBookmarksOnly(false) }] : []),
    ...(selectedCategory !== 'all' ? [{ key: 'cat', label: catLabel(drugCategories.find((c) => c.id === selectedCategory)), off: () => setSelectedCategory('all') }] : []),
    ...selectedClasses.map((k) => ({ key: 'cls-' + k, label: clsLabel(drugClasses.find((c) => c.id === k)), off: () => toggleClass(k) })),
    ...clinical.map((k) => ({ key: 'cf-' + k, label: CLINICAL.find((c) => c[0] === k)[1][lang], off: () => toggleClinical(k) })),
  ];
  const activeFilterCount = filterChips.filter((c) => c.key !== 'q').length;

  const segBox = 'flex flex-wrap bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 p-0.5 shadow-sm items-center min-h-[26px] md:min-h-[28px] gap-0.5 max-w-full';
  const segLabel = 'pl-1 pr-0.5 text-[10px] font-bold text-slate-400 whitespace-nowrap';
  const segBtn = 'min-h-[22px] md:min-h-[24px] px-1.5 md:px-2 rounded flex items-center justify-center gap-1 text-[10px] font-bold transition-all text-left';
  const segOn = 'bg-slate-700 text-white shadow-sm dark:bg-slate-200 dark:text-slate-900';
  const segOff = 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700';

  const guideButton = ([k, name, short, tone, Icon], phone) => (
    <button key={k} onClick={() => setOpenGuide(k)} data-guide={k} aria-label={name[lang]} title={name[lang]}
      className={phone
        ? `flex flex-col items-center justify-center gap-0.5 min-w-0 ${tone} border text-white px-0.5 py-1.5 rounded-lg font-bold shadow-sm active:scale-95 transition-all`
        : `flex items-center justify-center gap-1.5 ${tone} border text-white px-3 py-2 rounded-lg font-bold shadow-sm transition-all active:scale-95 text-xs md:text-sm whitespace-nowrap`}>
      <Icon className={phone ? 'w-4 h-4 shrink-0' : 'w-3.5 h-3.5 md:w-4 md:h-4 shrink-0'} />
      <span className={phone ? 'text-[10px] leading-[1.15] text-center max-w-full break-words' : ''}>{phone ? short[lang] : name[lang]}</span>
    </button>
  );
  const guide = GUIDES.find((x) => x[0] === openGuide);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 px-3 sm:px-4 md:px-6 pt-3 md:pt-6 pb-32">
      <div className="max-w-6xl mx-auto relative pt-10 md:pt-0" id="ht-list-page">

        {/* Top-right controls: version, language, theme */}
        <div className="absolute top-0 right-0 flex items-center gap-1.5 md:gap-2 z-20" data-top-controls>
          <button onClick={() => setShowChangelog(true)} title={L('บันทึกการเปลี่ยนแปลง', 'Changelog')} data-version-badge
            className="text-[10px] font-bold text-slate-500 dark:text-slate-300 bg-white dark:bg-slate-800 shadow-sm px-2.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 hover:bg-slate-50 hover:text-teal-700 hover:border-teal-200 dark:hover:bg-slate-700 transition-all">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>{APP_VERSION}
          </button>
          <button onClick={() => setLang(lang === 'th' ? 'en' : 'th')} title="Switch language" aria-label="Switch language" data-lang-toggle
            className="text-[10px] md:text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 shadow-sm px-2.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
            {lang === 'th' ? 'ไทย' : 'EN'}
          </button>
          <button onClick={toggleTheme} aria-label={theme === 'dark' ? t.themeLight : t.themeDark} title={theme === 'dark' ? t.themeLight : t.themeDark} data-theme-toggle
            className="w-7 h-7 text-slate-600 dark:text-amber-300 bg-white dark:bg-slate-800 shadow-sm rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
            {theme === 'dark' ? <SunIcon className="w-3.5 h-3.5" /> : <MoonIcon className="w-3.5 h-3.5" />}
          </button>
        </div>

        <header className="mb-3 md:mb-4">
          <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-800 dark:text-white mb-1 md:mb-2 leading-tight sm:pr-48">
            {L('คู่มือการรักษาความดันโลหิตสูง', 'Thai HT Guide')} <span className="align-middle text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200 dark:bg-teal-950 dark:text-teal-300 dark:border-teal-800">CPG 2567</span>
          </h1>
          <p className="hidden sm:block text-xs md:text-sm text-slate-600 dark:text-slate-300" data-subtitle>
            {L('ยาลดความดันโลหิต 41 รายการและเครื่องมือข้างเตียง ตามแนวทางการรักษาโรคความดันโลหิตสูงในเวชปฏิบัติทั่วไป พ.ศ. 2567 และบัญชียาหลักแห่งชาติ 2569',
              '41 blood-pressure medicines and bedside tools, based on the Thai Hypertension Society guideline B.E. 2567 (2024) and NLEM 2569.')}
          </p>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 sm:block" data-credit-line>
            <p className="text-[10px] md:text-xs font-semibold text-indigo-500 dark:text-indigo-300 sm:mt-1">Made by Warodom Phaenthong, M.D.</p>
            <a href="#disclaimer-heading" onClick={(e) => { e.preventDefault(); const el = document.getElementById('disclaimer-heading'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
              className="block sm:mt-1 text-[11px] md:text-xs font-semibold text-amber-700 dark:text-amber-300 hover:underline">{L('ใช้ช่วยตัดสินใจเท่านั้น: อ่านข้อจำกัด', 'Decision support only: read the disclaimer')}</a>
          </div>
        </header>

        {/* Phones: guides as two rows of icon tiles (scroll away with the page) */}
        <div className="grid grid-cols-4 gap-1 sm:hidden mb-2" data-guide-buttons="phone">
          {GUIDES.map((g) => guideButton(g, true))}
        </div>

        {/* Guides (tablet up) and the search row: pinned */}
        <div className="sticky top-0 z-30 pt-2 pb-2 md:pt-3 md:pb-2.5 -mt-2 md:-mt-3 bg-slate-100 dark:bg-slate-950" data-search-bar>
          <div className="hidden sm:flex sm:flex-wrap sm:items-center sm:gap-2 w-full mb-2" data-guide-buttons="wide">
            {GUIDES.map((g) => guideButton(g, false))}
          </div>

          <div className="flex gap-2 md:gap-3 w-full h-9 md:h-10">
            <button onClick={() => setSearchOpen(true)} aria-label={L('ค้นหา', 'Search')} title={L('ค้นหา', 'Search')} aria-expanded={searchOpen} data-search-open
              className={`${searchOpen ? 'hidden' : 'flex sm:hidden'} shrink-0 h-full w-9 items-center justify-center rounded-lg border shadow-sm transition-colors ${searchTerm !== '' ? 'bg-teal-600 border-teal-600 text-white' : 'bg-white border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'}`}>
              <SearchIcon className="w-4 h-4" />
            </button>
            <div className={`${searchOpen ? 'block flex-1' : 'hidden sm:block'} relative min-w-0 sm:flex-none sm:w-[45%] md:w-[38%] lg:w-1/3 h-full`} data-search-box>
              <input ref={searchRef} type="text" id="ht-search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder={t.searchPlaceholder}
                onBlur={() => setSearchOpen(false)} onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur(); }} data-search
                className="w-full h-full pl-3 pr-9 md:pl-4 md:pr-10 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white dark:bg-slate-800 text-base sm:text-xs md:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400" />
              <SearchIcon className="hidden sm:block absolute right-2.5 md:right-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5 md:w-4 md:h-4 pointer-events-none" />
              <button onMouseDown={(e) => e.preventDefault()} onClick={() => { setSearchTerm(''); setSearchOpen(false); if (searchRef.current) searchRef.current.blur(); }} aria-label={L('ล้างคำค้น', 'Clear search')} title={L('ล้างคำค้น', 'Clear search')}
                className="flex sm:hidden absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"><XIcon className="w-4 h-4" /></button>
            </div>

            <div className={`${searchOpen ? 'hidden sm:block' : 'block'} relative flex-1 min-w-0 h-full`} data-sort>
              <div className="absolute inset-y-0 left-0 pl-2 sm:pl-2.5 flex items-center pointer-events-none"><SortIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-slate-400" /></div>
              <select id="ht-sort" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} aria-label={L('เรียงลำดับ', 'Sort')}
                className="w-full h-full pl-6 pr-1 sm:pl-8 sm:pr-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-200 text-[11px] md:text-xs font-bold appearance-none cursor-pointer">
                <option value="nameAsc">{L('ชื่อยา (A - Z)', 'Name (A - Z)')}</option>
                <option value="class">{L('กลุ่มยา', 'Drug class')}</option>
                <option value="nlem">{L('บัญชียาหลักก่อน', 'NLEM first')}</option>
              </select>
            </div>

            <div className={`${searchOpen ? 'hidden sm:flex' : 'flex'} bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-0.5 shadow-sm shrink-0 items-center h-full`}>
              <button onClick={() => setViewMode('grid')} aria-label={t.viewCard} title={t.viewCard} aria-pressed={viewMode === 'grid'}
                className={`h-full px-2 md:px-2.5 rounded-md transition-colors flex items-center justify-center ${viewMode === 'grid' ? 'bg-slate-100 text-slate-900 dark:bg-slate-700 dark:text-white' : 'text-slate-400 hover:text-slate-600'}`}>
                <LayoutGridIcon className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </button>
              <button onClick={() => setViewMode('list')} aria-label={t.viewList} title={t.viewList} aria-pressed={viewMode === 'list'} data-view-list
                className={`h-full px-2 md:px-2.5 rounded-md transition-colors flex items-center justify-center ${viewMode === 'list' ? 'bg-slate-100 text-slate-900 dark:bg-slate-700 dark:text-white' : 'text-slate-400 hover:text-slate-600'}`}>
                <ListIcon className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </button>
            </div>

            <button onClick={() => setFiltersOpen((v) => !v)} aria-expanded={filtersOpen} aria-controls="filter-bar" aria-label={t.filters} title={t.filters} data-filters-toggle
              className={`shrink-0 h-full px-2 md:px-3 rounded-lg border shadow-sm flex items-center gap-1 md:gap-1.5 text-[10px] md:text-xs font-bold whitespace-nowrap transition-colors ${activeFilterCount ? 'bg-teal-600 border-teal-600 text-white hover:bg-teal-500' : filtersOpen ? 'bg-slate-200 border-slate-300 text-slate-900 dark:bg-slate-700 dark:border-slate-600 dark:text-white' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'}`}>
              <FilterIcon className="w-3 h-3 md:w-3.5 md:h-3.5" />
              <span className="max-[359px]:hidden">{t.filters}</span>{activeFilterCount > 0 && <span className="tabular-nums" data-filter-count>{activeFilterCount}</span>}
            </button>
          </div>
        </div>

        {/* Filter groups: compact segments that wrap; shown while opened with the Filters button */}
        <div id="filter-bar" className={`${filtersOpen ? 'flex' : 'hidden'} flex-col gap-2 md:gap-2.5 pb-2 md:pb-3 mb-3 md:mb-4 border-b border-slate-200 dark:border-slate-800`} data-filter-bar>
          <div className="flex flex-wrap items-center gap-1.5 md:gap-2 w-full min-w-0" data-filter-row="status">
            <div className={segBox} data-nlem-group>
              <button onClick={() => setNlemOnly((v) => !v)} aria-pressed={nlemOnly} title={L('บัญชียาหลักแห่งชาติ พ.ศ. 2569', 'Thai National List of Essential Medicines B.E. 2569')} data-nlem-filter
                className={`${segBtn} whitespace-nowrap ${nlemOnly ? 'bg-emerald-600 text-white shadow-sm' : 'text-emerald-700 hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-slate-700'}`}>
                <CheckIcon className="w-2.5 h-2.5 md:w-3 md:h-3" /> {t.filterNlem}
              </button>
            </div>
            <div className={segBox} data-bookmark-group>
              <button onClick={() => setBookmarksOnly((v) => !v)} aria-pressed={bookmarksOnly} data-bookmark-filter
                className={`${segBtn} whitespace-nowrap ${bookmarksOnly ? 'bg-amber-500 text-white shadow-sm' : 'text-amber-700 hover:bg-amber-50 dark:text-amber-300 dark:hover:bg-slate-700'}`}>
                <BookmarkIcon className="w-2.5 h-2.5 md:w-3 md:h-3" /> {L('ที่บันทึกไว้', 'Bookmarked')}
                <span className="opacity-60 tabular-nums">{bookmarkedIds.length}</span>
              </button>
            </div>
          </div>

          <div className={segBox} role="group" aria-label={L('ประเภทยา', 'Drug type')} data-filter-row="type">
            <span className={segLabel}>{L('ประเภท', 'Type')}:</span>
            <button onClick={() => selectCategory('all')} aria-pressed={selectedCategory === 'all'} className={`${segBtn} ${selectedCategory === 'all' ? segOn : segOff}`}>{L('ทั้งหมด', 'All')}</button>
            {drugCategories.map((cat) => {
              const on = selectedCategory === cat.id;
              const n = drugsData.filter((d) => classesOf(cat.id).some((c) => c.id === d.classId)).length;
              return (
                <button key={cat.id} onClick={() => selectCategory(cat.id)} aria-pressed={on} className={`${segBtn} ${on ? segOn : segOff}`}>
                  {catLabel(cat)} <span className="opacity-60 tabular-nums">{n}</span>
                </button>
              );
            })}
          </div>

          {(selectedCategory !== 'all' || selectedClasses.length > 0) && (
            <div className={segBox} role="group" aria-label={L('กลุ่มยา', 'Drug class')} data-filter-row="class">
              <span className={segLabel}>{L('กลุ่ม', 'Class')}:</span>
              {classesOf(selectedCategory).map((cls) => {
                const on = selectedClasses.includes(cls.id);
                return (
                  <button key={cls.id} onClick={() => toggleClass(cls.id)} aria-pressed={on}
                    className={`${segBtn} ${on ? 'bg-slate-800 text-white shadow-sm dark:bg-white dark:text-slate-900' : segOff}`}>
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cls.color }} />
                    {clsLabel(cls)}
                  </button>
                );
              })}
            </div>
          )}

          <div className={segBox} role="group" aria-label={L('ข้อพิจารณาทางคลินิก', 'Clinical')} data-filter-row="clinical">
            <span className={segLabel}>{L('คลินิก', 'Clinical')}:</span>
            {CLINICAL.map(([k, label, onCls, offCls]) => {
              const on = clinical.includes(k);
              return (
                <button key={k} onClick={() => toggleClinical(k)} aria-pressed={on} data-clinical={k} className={`${segBtn} ${on ? onCls : offCls}`}>
                  {on && <CheckIcon className="w-2.5 h-2.5" />}{label[lang]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active filter chips, then the result count */}
        <div className={`${filtersOpen ? '' : 'mt-1 md:mt-1.5'} mb-2 md:mb-3 px-0.5`}>
          {filterChips.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mb-1.5" role="group" data-active-filters>
              <button onClick={resetFilters} title={t.clearAllFilters} data-clear-filters
                className="shrink-0 min-h-[26px] px-2.5 rounded-full border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-300 shadow-sm inline-flex items-center gap-1 text-[11px] font-bold whitespace-nowrap transition-colors">
                <XIcon className="w-3 h-3" /> {L('ล้าง', 'Clear')}
              </button>
              {filterChips.map((c) => (
                <button key={c.key} onClick={c.off} title={L('เอาออก: ', 'Remove: ') + c.label} aria-label={L('เอาออก: ', 'Remove: ') + c.label} data-chip={c.key}
                  className="max-w-full min-h-[26px] inline-flex items-center gap-1 pl-2.5 pr-1.5 py-0.5 rounded-full border border-teal-200 bg-teal-50 text-teal-800 hover:bg-teal-100 dark:border-teal-900 dark:bg-teal-950 dark:text-teal-300 text-[11px] font-bold leading-tight text-left transition-colors">
                  <span className="break-words min-w-0">{c.label}</span><XIcon className="w-3 h-3 shrink-0 opacity-60" />
                </button>
              ))}
            </div>
          )}
          <div className="text-[11px] md:text-xs text-slate-500 dark:text-slate-400" aria-live="polite" data-result-count>
            {L('แสดง', 'Showing')} <span className="font-bold text-slate-800 dark:text-slate-100 tabular-nums">{filteredDrugs.length}</span> {L('จาก', 'of')} <span className="font-bold text-slate-800 dark:text-slate-100 tabular-nums">{drugsData.length}</span> {L('รายการยา', 'medicines')}
          </div>
        </div>

        {filteredDrugs.length === 0 ? (
          <div className="py-12 md:py-16 text-center text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-xl md:rounded-2xl border border-slate-200 dark:border-slate-800 border-dashed">
            <SearchIcon className="w-8 h-8 md:w-10 md:h-10 text-slate-300 mx-auto mb-3 md:mb-4" />
            <p className="text-base md:text-lg font-medium">{L('ไม่พบรายการยาที่ตรงกับเงื่อนไข', 'No medicines match these filters')}</p>
            <button onClick={resetFilters} className="mt-2 text-teal-700 dark:text-teal-300 hover:underline text-sm md:text-base">{t.clearAllFilters}</button>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5' : 'flex flex-col gap-2 md:gap-3'} data-drug-grid>
            {filteredDrugs.map((drug) => {
              const Comp = viewMode === 'grid' ? DrugCard : DrugListRow;
              return (
                <Comp key={drug.id} drug={drug} lang={lang} isCompared={comparedIds.includes(drug.id)} onToggleCompare={toggleCompare} onSelectDetail={setDetailDrug}
                  isBookmarked={bookmarkedIds.includes(drug.id)} onToggleBookmark={toggleBookmark} />
              );
            })}
          </div>
        )}

        <DisclaimerSection lang={lang} />
        <ReferencesSection lang={lang} />
        <p className="mt-6 text-center text-[11px] text-slate-500 dark:text-slate-400">
          <button onClick={() => setShowChangelog(true)} className="underline">{APP_VERSION}</button> · {L('สำหรับบุคลากรทางการแพทย์', 'For healthcare professionals')}
        </p>
      </div>

      <CompareDrawer comparedDrugs={comparedDrugs} lang={lang} onOpenCompare={() => setShowCompareModal(true)} onClearCompare={() => setComparedIds([])} onRemoveDrug={(id) => setComparedIds((p) => p.filter((x) => x !== id))} />

      {guide && guide[0] === 'sheet' && <PatientSheetModal lang={lang} onClose={() => setOpenGuide(null)} />}
      {guide && guide[0] !== 'sheet' && (
        <GuideWindow id={guide[0]} title={guide[1][lang]} icon={guide[4]} tone={guide[3].split(' ')[0]} lang={lang} onClose={() => setOpenGuide(null)}>
          <GuideBody id={guide[0]} lang={lang} />
        </GuideWindow>
      )}
      {detailDrug && (
        <DrugDetailModal drug={detailDrug} lang={lang} onClose={() => setDetailDrug(null)} onToggleCompare={toggleCompare} isCompared={comparedIds.includes(detailDrug.id)} />
      )}
      {showCompareModal && (
        <CompareModal comparedDrugs={comparedDrugs} lang={lang} onClose={() => setShowCompareModal(false)} onRemoveDrug={(id) => setComparedIds((p) => p.filter((x) => x !== id))} />
      )}
      {showChangelog && <ChangelogModal lang={lang} onClose={() => setShowChangelog(false)} />}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
