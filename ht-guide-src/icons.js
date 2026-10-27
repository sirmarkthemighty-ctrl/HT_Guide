const { useState, useEffect, useMemo, useRef } = React;

// --- SVG Icons ---
const SearchIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
const LayoutGridIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
);
const ListIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
);
const FilterIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
);
const SlidersIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
);
const CheckIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"></polyline></svg>
);
const XIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const CompareIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="8" height="14" x="3" y="5" rx="2"></rect><rect width="8" height="14" x="13" y="5" rx="2"></rect><line x1="11" x2="13" y1="12" y2="12"></line></svg>
);
const StethoscopeIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path><circle cx="20" cy="10" r="2"></circle></svg>
);
const HeartPulseIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path><path d="M3.22 12H9.5l1.5-3 2 6.5 1.5-3.5h6.28"></path></svg>
);
const KidneyIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2C8 2 5 5 5 9c0 5 4 10 7 13 3-3 7-8 7-13 0-4-3-7-7-7z"></path><path d="M12 6c-1.5 0-3 1.5-3 3.5 0 2.5 3 4.5 3 4.5s3-2 3-4.5C15 7.5 13.5 6 12 6z"></path></svg>
);
const BrainIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-5.04Z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-5.04Z"></path></svg>
);
const EyeIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);
const PillIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"></path><path d="m8.5 8.5 7 7"></path></svg>
);
const SyringeIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m18 2 4 4"></path><path d="m17 7 3-3"></path><path d="M19 9 8.7 19.3c-.4.4-1 .6-1.6.6H3v-4.1c0-.6.2-1.2.6-1.6L14 3.9"></path><path d="m9 11 4 4"></path><path d="m5 19-3 3"></path><path d="m14 4 6 6"></path></svg>
);
const ShieldIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);
const ShieldCheckIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
);
const ShieldAlertIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
);
const AlertTriangleIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
);
const GaugeIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 14 4-4"></path><path d="M3.34 19a10 10 0 1 1 17.32 0"></path></svg>
);
const ActivityIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
);
const ZapIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
);
const MoonIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
);
const SunIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
);
const GlobeIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
);
const ChevronDownIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="6 9 12 15 18 9"></polyline></svg>
);
const ChevronUpIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="18 15 12 9 6 15"></polyline></svg>
);
const ArrowRightIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
);
const PrinterIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect width="12" height="8" x="6" y="14"></rect></svg>
);
const BookmarkIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
);
const BookmarkCheckIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" className={className}><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
);
const InfoIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
);
const ClockIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);
const BookOpenIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
);
const SparklesIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>
);
const RotateCcwIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
);
const HomeIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
);
const HospitalIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 6v4"></path><path d="M14 14h-4"></path><path d="M14 18h-4"></path><path d="M14 8h-4"></path><path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2"></path><path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18"></path></svg>
);
const CopyIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>
);
const ExternalLinkIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
);

// --- Copied from the DM guide (bronchodilator-style UI) ---
const SortIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="15" y1="18" x2="15" y2="6"></line><polyline points="11 10 15 6 19 10"></polyline><line x1="9" y1="6" x2="9" y2="18"></line><polyline points="5 14 9 18 13 14"></polyline></svg>
);
const FlameIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5z"></path></svg>
);
const HistoryIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M12 7v5l4 2"></path></svg>
);
const CalculatorIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="16" height="20" x="4" y="2" rx="2"></rect><line x1="8" x2="16" y1="6" y2="6"></line><line x1="16" x2="16" y1="14" y2="18"></line><path d="M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01"></path></svg>
);

// --- Drug pictures: drawn only from a label's written description of a brand sold in Thailand (same maker) ---
// Anything a label does not describe stays N/A. Colours are approximations of the colour words in the label.
const dmLabel = (setid) => 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=' + setid;
const emaPi = (name) => `https://www.ema.europa.eu/en/documents/product-information/${name}-epar-product-information_en.pdf`;
const DRUG_PICTURE = {
  losartan: { brand: 'Cozaar 50 mg', fill: '#f8fafc', shape: 'oval', score: true, en: 'white, oval, film-coated, code 952, scored', th: 'สีขาว รูปไข่ เคลือบฟิล์ม รหัส 952 มีรอยแบ่ง', src: ['US label: Cozaar', dmLabel('9949448f-c3b9-44ee-94ed-c1aca8c90f39')] },
  valsartan: { brand: 'Diovan 80 mg', fill: '#e9a3a3', shape: 'oval', en: 'pale red, almond-shaped, NVR / DV (a round pale red 80 mg is also listed)', th: 'สีแดงอ่อน รูปเมล็ดอัลมอนด์ NVR / DV (มีชนิดกลมสีแดงอ่อนด้วย)', src: ['US label: Diovan', dmLabel('5ddba454-f3e6-43c2-a7a6-58365d297213')] },
  telmisartan: { brand: 'Micardis 40 mg', fill: '#f8fafc', shape: 'capsule', en: 'white, oblong, engraved 51H and the company logo (80 mg: 52H)', th: 'สีขาว รูปยาว สลัก 51H และโลโก้บริษัท (80 มก.: 52H)', src: ['EU product information: Micardis', emaPi('micardis')] },
  sacubitril_valsartan: { brand: 'Entresto 100 mg (49/51 mg)', fill: '#f5e6a3', shape: 'oval', en: 'pale yellow, ovaloid, film-coated, NVR / L1 (50 mg violet-white, 200 mg light pink)', th: 'สีเหลืองอ่อน รูปไข่ เคลือบฟิล์ม NVR / L1 (50 มก. สีขาวอมม่วง, 200 มก. สีชมพูอ่อน)', src: ['US label: Entresto', dmLabel('000dc81d-ab91-450c-8eae-8eb74e72296f')] },
  amlodipine: { brand: 'Norvasc 5 mg', fill: '#f8fafc', shape: 'octagon', en: 'white, elongated octagon, engraved NORVASC 5 (10 mg: white, round)', th: 'สีขาว แปดเหลี่ยมยาว สลัก NORVASC 5 (10 มก.: สีขาว กลม)', src: ['US label: Norvasc', dmLabel('abd6a2ca-40c2-485c-bc53-db1c652505ed')] },
  spironolactone: { brand: 'Aldactone 25 mg', fill: '#f6eba6', shape: 'round', en: 'light yellow, round, film-coated, SEARLE 1001 (100 mg: peach, round, scored)', th: 'สีเหลืองอ่อน กลม เคลือบฟิล์ม SEARLE 1001 (100 มก.: สีพีช กลม มีรอยแบ่ง)', src: ['US label: Aldactone', dmLabel('0fed2822-3a03-4b64-9857-c682fcd462bc')] },
  eplerenone: { brand: 'Inspra 25 / 50 mg', fill: '#f0c84a', shape: 'diamond', en: 'yellow, diamond, film-coated, VLE / NSR 25 or 50', th: 'สีเหลือง รูปข้าวหลามตัด เคลือบฟิล์ม VLE / NSR 25 หรือ 50', src: ['US label: Inspra', dmLabel('1a52bedc-8e2c-4116-a296-a87770676b4a')] },
  spc_amlodipine_valsartan: { brand: 'Exforge 5/160 mg', fill: '#d9a520', shape: 'oval', en: 'dark yellow, ovaloid, film-coated, NVR / ECE (10/160 mg: light yellow)', th: 'สีเหลืองเข้ม รูปไข่ เคลือบฟิล์ม NVR / ECE (10/160 มก.: สีเหลืองอ่อน)', src: ['US label: Exforge', dmLabel('d0caec89-96ec-411d-a933-63eda74a6da7')] },
  spc_telmisartan_amlodipine: { brand: 'Twynsta 40/5 mg', fill: '#f8fafc', fill2: '#6fa8dc', shape: 'twolayer', en: 'blue and white two-layer oval tablet, A1 and the company logo on the white layer', th: 'ยาเม็ดรูปไข่สองชั้น สีฟ้าและขาว สลัก A1 และโลโก้บริษัทบนชั้นสีขาว', src: ['EU product information: Twynsta', emaPi('twynsta')] },
  spc_losartan_hctz: { brand: 'Hyzaar 50/12.5 mg', fill: '#f0d060', shape: 'oval', en: 'yellow, oval, film-coated, code 717 (100/25 mg: yellow, 747)', th: 'สีเหลือง รูปไข่ เคลือบฟิล์ม รหัส 717 (100/25 มก.: สีเหลือง รหัส 747)', src: ['US label: Hyzaar', dmLabel('4116ccde-2e23-45f4-b12f-6337df877744')] },
  spc_triple_amlodipine_valsartan_hctz: { brand: 'Exforge HCT 5/160/12.5 mg', fill: '#f8fafc', shape: 'oval', en: 'white, ovaloid, film-coated, NVR / VCL (10/160/12.5 pale yellow, 10/160/25 brown-yellow)', th: 'สีขาว รูปไข่ เคลือบฟิล์ม NVR / VCL (10/160/12.5 สีเหลืองอ่อน, 10/160/25 สีเหลืองน้ำตาล)', src: ['US label: Exforge HCT', dmLabel('18d7820d-471f-4ee2-9ec6-25d8d27c77de')] },
  doxazosin: { brand: 'Cardura 2 mg', fill: '#f8fafc', shape: 'capsule', score: true, en: 'white, oblong, scored, CN 2 / VLE (4 mg: white, rhombus, scored)', th: 'สีขาว รูปยาว มีรอยแบ่ง CN 2 / VLE (4 มก.: สีขาว รูปขนมเปียกปูน มีรอยแบ่ง)', src: ['US label: Cardura', dmLabel('5e1f5e49-2da1-43ab-9795-228a8bcc5a82')] },
  empagliflozin: { brand: 'Jardiance 10 mg', fill: '#f5e6a3', shape: 'round', en: 'pale yellow, round, film-coated, S 10 (25 mg: pale yellow, oval)', th: 'สีเหลืองอ่อน กลม เคลือบฟิล์ม S 10 (25 มก.: สีเหลืองอ่อน รูปไข่)', src: ['US label: Jardiance', dmLabel('faf3dd6a-9cd0-39c2-0d2e-232cb3f67565')] },
  semaglutide: { brand: 'Rybelsus 3 / 7 / 14 mg', fill: '#faf3d6', shape: 'oval', en: 'white to light yellow, oval (the Ozempic and Wegovy pens: no colour stated)', th: 'สีขาวถึงเหลืองอ่อน รูปไข่ (ปากกา Ozempic และ Wegovy: ไม่ระบุสี)', src: ['US label: Rybelsus', dmLabel('27f15fac-7d98-4114-a2ec-92494a91da98')] },
  finerenone: { brand: 'Kerendia 10 mg', fill: '#f4a7b9', shape: 'capsule', en: 'pink, oblong, FI / 10 (20 mg: yellow)', th: 'สีชมพู รูปยาว FI / 10 (20 มก.: สีเหลือง)', src: ['US label: Kerendia', dmLabel('fc726765-5d5a-4d6e-b037-b847bda9fb7c')] },
  furosemide: { brand: 'Lasix 40 mg', fill: '#f8fafc', shape: 'round', score: true, en: 'white, round, monogrammed, scored', th: 'สีขาว กลม มีตราสลัก มีรอยแบ่ง', src: ['US label: Lasix', dmLabel('2c9b4d8f-0770-482d-a9e6-9c616a440b1a')] },
  // Vials: the label describes the solution only; the vial and cap are drawn as outlines
  labetalol_iv: { brand: 'Labetalol injection (Hospira) 100 mg / 20 mL vial', liquid: '#fbf3c8', shape: 'vial', en: 'vial of clear, colourless to light yellow solution (cap colour not stated)', th: 'ขวดยาบรรจุสารละลายใส ไม่มีสีถึงเหลืองอ่อน (ไม่ระบุสีฝา)', src: ['US label: labetalol injection, Hospira', dmLabel('abfc6b75-1ed5-41f1-0484-4597488237bc')] },
  esmolol_iv: { brand: 'Brevibloc 100 mg / 10 mL vial', liquid: '#fbf3c8', shape: 'vial', en: 'vial of clear, colourless to light yellow solution (cap colour not stated)', th: 'ขวดยาบรรจุสารละลายใส ไม่มีสีถึงเหลืองอ่อน (ไม่ระบุสีฝา)', src: ['US label: Brevibloc', dmLabel('220a07b8-5c68-41a3-8705-fd91f14c50b4')] },
  // v1.3.0: the same maker's brand under its Irish / UK / Japanese name (Irish SmPC or leaflet, UK SmPC, Japanese package insert)
  enalapril: { brand: 'Innovace 5 mg (MSD; Irish name of Renitec)', fill: '#f8fafc', shape: 'triangle', score: true, en: 'white, rounded triangle, scored, marked MSD 712 (20 mg: peach)', th: 'สีขาว สามเหลี่ยมมุมมน มีรอยแบ่ง สลัก MSD 712 (20 มก.: สีพีช)', src: ['Irish SmPC: Innovace 5 mg', 'https://medicines.ie/medicines/innovace-5-mg-tablets~A0000419/spc'] },
  ramipril: { brand: 'Tritace 5 mg', fill: '#eaa4a0', shape: 'capsule', score: true, en: 'pale red, oblong, scored, stamped 5 and the company logo / HMP 5', th: 'สีแดงอ่อน รูปยาว มีรอยแบ่ง ประทับ 5 และโลโก้บริษัท / HMP 5', src: ['Irish SmPC: Tritace 5 mg', 'https://medicines.ie/medicines/tritace-5-mg-tablets~A0000086/spc'] },
  perindopril: { brand: 'Coversyl Arginine 5 mg', fill: '#b9dca0', shape: 'capsule', score: true, en: 'light green, rod-shaped, film-coated, engraved with the company logo, scored on both edges', th: 'สีเขียวอ่อน รูปแท่ง เคลือบฟิล์ม สลักโลโก้บริษัท มีรอยแบ่งทั้งสองขอบ', src: ['Irish patient leaflet: Coversyl Arginine 5 mg', 'https://yourmedicines.ie/pil/027276/A0000383'] },
  indapamide: { brand: 'Natrilix SR 1.5 mg', fill: '#f8fafc', shape: 'round', en: 'white, round, film-coated, prolonged-release', th: 'สีขาว กลม เคลือบฟิล์ม ออกฤทธิ์นาน', src: ['Irish SmPC: Natrilix SR 1.5 mg', 'https://medicines.ie/medicines/natrilix-sr-1-5-mg-prolonged-release-film-coated-tablets~A0000386/spc'] },
  bisoprolol: { brand: 'Cardicor 5 mg (Merck; Irish name of Concor)', fill: '#f8f3dc', shape: 'heart', score: true, en: 'yellowish white, heart-shaped, scored, film-coated (2.5 mg white, 10 mg pale orange)', th: 'สีขาวอมเหลือง รูปหัวใจ มีรอยแบ่ง เคลือบฟิล์ม (2.5 มก. สีขาว, 10 มก. สีส้มอ่อน)', src: ['Irish SmPC: Cardicor 5 mg', 'https://medicines.ie/medicines/cardicor-5-mg-film-coated-tablets~A0000061/spc'] },
  nebivolol: { brand: 'Nebilet 5 mg', fill: '#f8fafc', shape: 'round', cross: true, en: 'white, round, cross-scored', th: 'สีขาว กลม มีรอยแบ่งรูปกากบาท', src: ['Irish SmPC: Nebilet 5 mg', 'https://medicines.ie/medicines/nebilet-5-mg-tablets~A0002169/spc'] },
  spc_perindopril_indapamide: { brand: 'Coversyl Arginine Plus 5/1.25 mg (Servier; Bi-Preterax)', fill: '#f8fafc', shape: 'capsule', en: 'white, rod-shaped, film-coated', th: 'สีขาว รูปแท่ง เคลือบฟิล์ม', src: ['Irish SmPC: Coversyl Arginine Plus 5 mg/1.25 mg', 'https://medicines.ie/medicines/coversyl-arginine-plus-5mg-1-25mg-film-coated-tablets~A0000210/spc'] },
  verapamil_sr: { brand: 'Isoptin SR 240 mg', fill: '#b7dfb0', shape: 'capsule', score: true, en: 'light green, oblong, film-coated, breakline on both sides, Knoll logo on one side', th: 'สีเขียวอ่อน รูปยาว เคลือบฟิล์ม มีรอยแบ่งทั้งสองด้าน มีโลโก้ Knoll ด้านหนึ่ง', src: ['Irish SmPC: Isoptin SR 240 mg', 'https://medicines.ie/medicines/isoptin-sr-240-mg-prolonged-release-tablets~A0000826/spc'] },
  nifedipine_cr: { brand: 'Adalat LA 30 mg (Bayer; UK name of Adalat GITS)', fill: '#f3b3c2', shape: 'round', en: 'pink, round, with a laser hole on one side, marked Adalat 30', th: 'สีชมพู กลม มีรูเลเซอร์ด้านหนึ่ง พิมพ์ Adalat 30', src: ['UK SmPC: Adalat LA 30 mg', 'https://www.medicines.org.uk/emc/product/6180/smpc'] },
  spc_olmesartan_amlodipine_hctz: { brand: 'Sevikar HCT 20/5/12.5 mg', fill: '#f5b47a', shape: 'round', en: 'light orange, round, film-coated, debossed C51 (40/10/25 mg: greyish red, oval)', th: 'สีส้มอ่อน กลม เคลือบฟิล์ม สลัก C51 (40/10/25 มก.: สีแดงอมเทา รูปไข่)', src: ['UK SmPC: Sevikar HCT', 'https://www.medicines.org.uk/emc/product/4596/smpc'] },
  diltiazem_sr: { brand: 'Herbesser R 200 mg capsule', fill: '#d9534f', fill2: '#f8fafc', shape: 'capsule2', en: 'red / white hard capsule, code TA304 (R 100 mg: white / white; 30 and 60 mg tablets: white, round)', th: 'แคปซูลแข็งสีแดง / ขาว รหัส TA304 (R 100 มก.: สีขาว / ขาว; ชนิดเม็ด 30 และ 60 มก.: สีขาว กลม)', src: ['Japanese package insert: Herbesser R', 'https://pins.japic.or.jp/pdf/newPINS/00051504.pdf'] },
  clonidine: { brand: 'Catapres 150 µg', fill: '#f8fafc', shape: 'round', score: true, en: 'white, round, uncoated, scored, code 15C', th: 'สีขาว กลม ไม่เคลือบ มีรอยแบ่ง รหัส 15C', src: ['Japanese package insert: Catapres', 'https://pins.japic.or.jp/pdf/newPINS/00052534.pdf'] },
  hydralazine: { brand: 'Apresoline 25 mg', fill: '#f8fafc', shape: 'round', en: 'white, round, sugar-coated, code SJ 103', th: 'สีขาว กลม เคลือบน้ำตาล รหัส SJ 103', src: ['Japanese package insert: Apresoline', 'https://pins.japic.or.jp/pdf/newPINS/00071748.pdf'] },
};

// Tablet or vial drawn from its description, or an "N/A" box when there is no reference
const DrugPicture = ({ drug, className = 'w-12 h-12' }) => {
  const p = drug && DRUG_PICTURE[drug.id];
  if (!p) {
    return (
      <svg viewBox="0 0 64 64" className={`${className} text-slate-400 dark:text-slate-500`} role="img" aria-label="No reference picture" data-picture-na>
        <rect x="5" y="5" width="54" height="54" rx="10" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 4" opacity="0.6" />
        <text x="32" y="38" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor" fontFamily="sans-serif">N/A</text>
      </svg>
    );
  }
  const stroke = '#64748b';
  if (p.shape === 'vial') {
    return (
      <svg viewBox="0 0 64 64" className={className} role="img" aria-label={p.brand + ': ' + p.en} data-picture="vial">
        <g fill="none" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round">
          <rect x="24" y="6" width="16" height="7" rx="1.5" />
          <path d="M26 13h12v5c0 1 4 2 4 5v31c0 2-1.5 3.5-3.5 3.5h-13C23.5 57.5 22 56 22 54V23c0-3 4-4 4-5Z" />
        </g>
        <path d="M23 32h18v22c0 1.4-1.1 2.5-2.5 2.5h-13C24.1 56.5 23 55.4 23 54Z" fill={p.liquid} />
        <path d="M22 32h20" stroke={stroke} strokeWidth="1" />
      </svg>
    );
  }
  if (p.shape === 'capsule2') {
    return (
      <svg viewBox="0 0 64 64" className={className} role="img" aria-label={p.brand + ': ' + p.en} data-picture="capsule2">
        <g stroke={stroke} strokeWidth="1.6" strokeLinejoin="round">
          <path d="M33 20H20a12 12 0 0 0 0 24h13Z" fill={p.fill} />
          <path d="M31 20h13a12 12 0 0 1 0 24H31Z" fill={p.fill2} />
        </g>
      </svg>
    );
  }
  if (p.shape === 'twolayer') {
    return (
      <svg viewBox="0 0 64 64" className={className} role="img" aria-label={p.brand + ': ' + p.en} data-picture="twolayer">
        <clipPath id={'tl-' + drug.id}><ellipse cx="32" cy="32" rx="24" ry="14" /></clipPath>
        <g clipPath={`url(#tl-${drug.id})`}>
          <rect x="0" y="0" width="64" height="32" fill={p.fill} />
          <rect x="0" y="32" width="64" height="32" fill={p.fill2} />
        </g>
        <ellipse cx="32" cy="32" rx="24" ry="14" fill="none" stroke={stroke} strokeWidth="1.6" />
        <line x1="8" y1="32" x2="56" y2="32" stroke={stroke} strokeWidth="1" />
      </svg>
    );
  }
  const shape = {
    round: <circle cx="32" cy="32" r="19" />,
    oval: <ellipse cx="32" cy="32" rx="23" ry="14" />,
    capsule: <rect x="8" y="20" width="48" height="24" rx="12" />,
    diamond: <path d="M32 9 55 32 32 55 9 32Z" strokeLinejoin="round" />,
    octagon: <path d="M17 18h30l8 8v12l-8 8H17l-8-8V26Z" strokeLinejoin="round" />,
    triangle: <path d="M32 11c2 0 3.3 1 4.4 2.9l15.4 26.6c1.1 1.9 1.1 3.7 0 5.3-1 1.5-2.6 2.2-4.6 2.2H16.8c-2 0-3.6-.7-4.6-2.2-1.1-1.6-1.1-3.4 0-5.3l15.4-26.6C28.7 12 30 11 32 11Z" />,
    heart: <path d="M32 52C20 43 10 35 10 24c0-6.5 5-11 11-11 4.6 0 8.5 2.6 11 6.5C34.5 15.6 38.4 13 43 13c6 0 11 4.5 11 11 0 11-10 19-22 28Z" strokeLinejoin="round" />,
  }[p.shape];
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label={p.brand + ': ' + p.en} data-picture={p.shape}>
      <g fill={p.fill} stroke={stroke} strokeWidth="1.6">{shape}</g>
      {p.score && <line x1="32" y1={{ round: 15, triangle: 24, heart: 20 }[p.shape] || 20} x2="32" y2={{ round: 49, triangle: 46, heart: 50 }[p.shape] || 44} stroke={stroke} strokeWidth="1.3" />}
      {p.cross && <path d="M32 15v34M15 32h34" stroke={stroke} strokeWidth="1.3" />}
    </svg>
  );
};
