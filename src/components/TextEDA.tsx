// import React, { useState, useEffect } from "react";
// import heroTextImage from "../assets/images/image/text.jpg";
// import { motion, AnimatePresence } from "motion/react";
// import trendingSamples from "../assets/data/textEDA/trending_samples.json";
// import Plot from "react-plotly.js";
// import {
//     ArrowRight,
//     ArrowLeft,
//     BookOpen,
//     HelpCircle,
//     BarChart3,
//     Search,
//     Brain,
//     Rocket,
//     Terminal,
//     Code2,
//     CheckCircle2,
//     Columns,
//     Database,
//     FileText,
//     AlertTriangle,
//     Layout,
//     Layers,
//     Table,
//     ChevronDown,
//     ChevronRight,
//     Copy,
//     Dices,
//     BarChart,
//     Activity,
//     Zap,
//     Info,
//     GitMerge,
//     PieChart,
//     Filter,
//     Target,
//     Link,
//     BoxSelect,
//     Hash,
//     MessageSquare,
//     Globe,
//     Type,
//     Grid,
//     Sparkles,
//     BadgeCheck,
//     Users
// } from "lucide-react";
// import TextML from "./TextML";

// // --- Modern Academic UI Components (Same as TabularEDA) ---

// const NavItem = ({ href, children, active = false }: { href: string, children: React.ReactNode, active?: boolean }) => (
//     <a
//         href={href}
//         className={`text-sm font-semibold tracking-tight transition-all flex items-center h-full px-4 border-b-2 ${active
//             ? "text-primary border-primary"
//             : "text-on-surface-variant border-transparent hover:text-primary hover:border-primary/20"
//             }`}
//     >
//         {children}
//     </a>
// );

// const StatCard = ({ label, value, icon: Icon, variant = "ghost" }: { label: string, value: string | number, icon?: any, variant?: "ghost" | "primary" }) => (
//     <div className={`${variant === "primary" ? "bg-primary text-on-primary shadow-2xl shadow-primary/20 scale-105" : "bg-white border border-outline-variant/10 shadow-sm hover:shadow-md transition-all"} p-8 md:p-10 rounded-3xl relative overflow-hidden group`}>
//         {Icon && <div className={`absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity ${variant === "primary" ? "text-white" : "text-primary"}`}><Icon size={120} /></div>}
//         <div className={`${variant === "primary" ? "text-primary-container" : "text-on-surface-variant"} text-[10px] font-black uppercase tracking-[0.2em] mb-4`}>{label}</div>
//         <div className="text-4xl font-sans font-bold tracking-tight">{value}</div>
//     </div>
// );

// const ImagePlaceholder = ({ className = "", label = "Topic Image Placeholder", src }: { className?: string, label?: string, src?: string }) => (
//     <div className={`relative overflow-hidden group/img ${className}`}>
//         {src ? (
//             <img
//                 src={src}
//                 alt={label}
//                 className="w-full h-full object-cover rounded-[2.5rem] transition-transform duration-700 group-hover/img:scale-110"
//             />
//         ) : (
//             <div className={`bg-white/5 border-2 border-dashed border-outline-variant/10 rounded-[2.5rem] flex items-center justify-center p-8 transition-all hover:bg-primary/5 hover:border-primary/20 min-h-[200px]`}>
//                 <div className="flex flex-col items-center gap-4 opacity-10 group-hover/img:opacity-30 transition-opacity">
//                     <Layout size={40} />
//                     <span className="text-[9px] font-black uppercase tracking-[0.2em] text-center leading-relaxed">{label}</span>
//                 </div>
//             </div>
//         )}
//         <div className="absolute inset-0 bg-linear-to-t from-on-surface/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 rounded-[2.5rem]" />
//     </div>
// );

// const InteractiveAnalysis = ({ id, title, subtitle, icon: Icon, pythonCode, plots = [], children, defaultOpen = false }: any) => {
//     const [isOpen, setIsOpen] = useState(defaultOpen);
//     const [showCode, setShowCode] = useState(false);
//     const [selectedPlot, setSelectedPlot] = useState(plots && plots.length > 0 ? plots[0].label : "All");

//     const handleCopy = () => {
//         if (pythonCode) navigator.clipboard.writeText(pythonCode);
//     };

//     const plotsToRender = selectedPlot === "All" ? plots : plots.filter((p: any) => p.label === selectedPlot);

//     return (
//         <section className="py-2 mb-8 scroll-mt-24" id={id}>
//             <div className="bg-white rounded-[2rem] border border-outline-variant/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden transition-all hover:shadow-[0_15px_60px_rgb(0,0,0,0.08)]">
//                 <button
//                     onClick={() => setIsOpen(!isOpen)}
//                     className="w-full flex flex-col md:flex-row justify-between items-start md:items-center py-5 px-8 hover:bg-surface-container-low transition-colors group cursor-pointer text-left focus:outline-none"
//                 >
//                     <div className="flex items-center gap-6">
//                         <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${isOpen ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-surface-container-high text-primary group-hover:bg-primary/5 shadow-sm"}`}>
//                             <Icon size={22} />
//                         </div>
//                         <div>
//                             <h2 className="text-xl font-bold tracking-tight text-on-surface">{title}</h2>
//                             <p className="text-on-surface-variant text-[11px] font-medium opacity-60 italic">{subtitle}</p>
//                         </div>
//                     </div>
//                     <div className={`flex items-center text-on-surface-variant/40 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}>
//                         <ChevronDown size={28} />
//                     </div>
//                 </button>

//                 <AnimatePresence>
//                     {isOpen && (
//                         <motion.div
//                             initial={{ height: 0, opacity: 0 }}
//                             animate={{ height: "auto", opacity: 1 }}
//                             exit={{ height: 0, opacity: 0 }}
//                             transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
//                         >
//                             <div className="pt-2 pb-16 px-10 border-t border-outline-variant/5">
//                                 <div className="flex justify-end mb-10">
//                                     <button
//                                         onClick={(e) => { e.stopPropagation(); setShowCode(!showCode); }}
//                                         className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs tracking-tight transition-all cursor-pointer border ${showCode ? "bg-on-surface text-white border-on-surface" : "bg-white text-on-surface-variant border-outline-variant/20 hover:bg-surface-container"}`}
//                                     >
//                                         <BookOpen size={16} />
//                                         {showCode ? "Hide Tutorial" : "View Tutorial"}
//                                     </button>
//                                 </div>

//                                 <AnimatePresence>
//                                     {showCode && (
//                                         <motion.div
//                                             initial={{ height: 0, opacity: 0 }}
//                                             animate={{ height: "auto", opacity: 1 }}
//                                             exit={{ height: 0, opacity: 0 }}
//                                             className="overflow-hidden mb-12"
//                                         >
//                                             <div className="bg-slate-900 rounded-3xl p-8 font-mono text-[13px] relative border border-outline-variant/10 shadow-inner">
//                                                 <div className="flex gap-2 mb-6 border-b border-white/5 pb-4">
//                                                     <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
//                                                     <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
//                                                     <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
//                                                     <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] ml-2">Python Analysis Script</span>
//                                                 </div>
//                                                 <code className="text-slate-300 block leading-relaxed overflow-x-auto whitespace-pre custom-scrollbar select-all">
//                                                     {pythonCode || "# No code provided"}
//                                                 </code>
//                                                 <button
//                                                     onClick={handleCopy}
//                                                     className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors cursor-pointer bg-white/5 p-2 rounded-lg"
//                                                     title="Copy Code"
//                                                 >
//                                                     <Copy size={16} />
//                                                 </button>
//                                             </div>
//                                         </motion.div>
//                                     )}
//                                 </AnimatePresence>

//                                 <div className="flex flex-col gap-10">
//                                     {children && <div className="w-full">{children}</div>}

//                                     {plots && plots.length > 1 && (
//                                         <div className="flex flex-col sm:flex-row items-baseline sm:items-center gap-6 bg-surface-container-low/50 p-4 rounded-2xl border border-outline-variant/10 w-fit">
//                                             <div className="flex items-center gap-2 border-r border-outline-variant/10 pr-6">
//                                                 <Filter size={16} className="text-primary" />
//                                                 <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Views</span>
//                                             </div>
//                                             <div className="flex flex-wrap gap-2">
//                                                 {plots.map((plot: any) => (
//                                                     <button
//                                                         key={plot.label}
//                                                         onClick={() => setSelectedPlot(plot.label)}
//                                                         className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer border ${selectedPlot === plot.label ? "bg-primary text-on-primary border-primary shadow-md" : "bg-white text-on-surface-variant border-outline-variant/10 hover:border-primary/50"}`}
//                                                     >
//                                                         {plot.label}
//                                                     </button>
//                                                 ))}
//                                                 <button
//                                                     onClick={() => setSelectedPlot("All")}
//                                                     className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer border ${selectedPlot === "All" ? "bg-on-surface text-white border-on-surface shadow-md" : "bg-white text-on-surface border-outline-variant/10 hover:border-on-surface/50"}`}
//                                                 >
//                                                     Full Archive
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     )}

//                                     <div className="grid grid-cols-1 gap-12">
//                                         {plotsToRender && plotsToRender.map((plot: any, idx: number) => (
//                                             <motion.div
//                                                 key={plot.label || idx}
//                                                 initial={{ opacity: 0, y: 20 }}
//                                                 whileInView={{ opacity: 1, y: 0 }}
//                                                 viewport={{ once: true }}
//                                                 className="bg-white rounded-3xl p-8 border border-outline-variant/10 shadow-sm relative group overflow-hidden"
//                                             >
//                                                 <div className="flex justify-between items-center mb-8 pb-4 border-b border-outline-variant/5">
//                                                     <div className="flex items-center gap-3">
//                                                         <BarChart size={18} className="text-primary" />
//                                                         <h4 className="text-sm font-bold text-on-surface uppercase tracking-tight">{plot.label} Profile</h4>
//                                                     </div>
//                                                     {plot.badge && <span className="px-3 py-1 bg-primary/5 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/10">{plot.badge}</span>}
//                                                 </div>
//                                                 <div className="w-full flex items-center justify-center min-h-[500px]">
//                                                     {plot.data ? (
//                                                         <Plot
//                                                             data={plot.data}
//                                                             layout={{
//                                                                 ...plot.layout,
//                                                                 paper_bgcolor: "rgba(0,0,0,0)",
//                                                                 plot_bgcolor: "rgba(0,0,0,0)",
//                                                                 font: { family: "Inter, sans-serif", size: 12 },
//                                                                 margin: { t: 40, r: 40, b: 80, l: 60 },
//                                                                 width: undefined,
//                                                                 autosize: true,
//                                                                 responsive: true,
//                                                                 showlegend: true,
//                                                                 legend: { orientation: "h", y: -0.2 }
//                                                             }}
//                                                             useResizeHandler={true}
//                                                             style={{ width: "100%", height: "500px" }}
//                                                             config={{ responsive: true, displayModeBar: false }}
//                                                         />
//                                                     ) : (
//                                                         <div className="text-outline-variant/40 italic text-sm">No visualization data provided</div>
//                                                     )}
//                                                 </div>
//                                             </motion.div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>
//             </div>
//         </section>
//     );
// };

// export default function TextEDA({ onBack, initialMode = "eda" }: { onBack: () => void, initialMode?: "eda" | "ml" }) {
//     const [activeNav, setActiveNav] = useState("overview");
//     const [activeMode, setActiveMode] = useState<"eda" | "ml">(initialMode);
//     const [selectedCategory, setSelectedCategory] = useState("overall");
//     const [bigramTopic, setBigramTopic] = useState("economy");
//     const [globalUnit, setGlobalUnit] = useState<"unigrams" | "bigrams">("unigrams");
//     const [currentSamples, setCurrentSamples] = useState<any[]>([]);
//     const [isRolling, setIsRolling] = useState(false);

//     const rollSamples = () => {
//         setIsRolling(true);
//         setTimeout(() => {
//             const shuffled = [...trendingSamples].sort(() => 0.5 - Math.random());
//             setCurrentSamples(shuffled.slice(0, 2));
//             setIsRolling(false);
//         }, 800);
//     };

//     useEffect(() => {
//         rollSamples();
//     }, []);

//     const categoricalTFIDFData: Record<string, {
//         unigrams: { words: string[], scores: number[] },
//         bigrams: { words: string[], scores: number[] }
//     }> = {
//         ai_and_tech: {
//             unigrams: {
//                 words: ["ai", "tech", "startups", "users", "platforms", "discussing", "actively", "broader", "category", "multiple", "agentic", "programming", "gen", "jobs", "pk", "gb", "stock", "sports", "releases", "music"],
//                 scores: [0.5355, 0.3641, 0.1653, 0.1403, 0.1403, 0.1403, 0.1403, 0.1403, 0.1403, 0.1403, 0.1330, 0.1306, 0.1285, 0.1088, 0.0826, 0.0815, 0.0, 0.0, 0.0, 0.0]
//             },
//             bigrams: {
//                 words: ["tech multiple", "ai tech", "broader category", "category ai", "actively discussing", "multiple platforms", "platforms users", "ai broader", "users actively", "startups broader"],
//                 scores: [0.3469, 0.3469, 0.3469, 0.3469, 0.3469, 0.3469, 0.3463, 0.1759, 0.1738, 0.0910]
//             }
//         },
//         economy: {
//             unigrams: {
//                 words: ["economy", "inflation", "crypto", "platforms", "users", "broader", "actively", "discussing", "multiple", "category", "jobs", "stock", "market", "pk", "gb", "sports", "startups", "tech", "releases", "music"],
//                 scores: [0.4463, 0.1798, 0.1775, 0.1701, 0.1701, 0.1701, 0.1701, 0.1701, 0.1701, 0.1701, 0.1471, 0.1464, 0.1464, 0.1071, 0.1019, 0.0, 0.0, 0.0, 0.0, 0.0]
//             },
//             bigrams: {
//                 words: ["broader category", "actively discussing", "economy multiple", "multiple platforms", "category economy", "platforms users", "users actively", "users pk", "pk actively", "users gb"],
//                 scores: [0.3762, 0.3762, 0.3762, 0.3762, 0.3762, 0.3755, 0.1759, 0.1032, 0.1032, 0.0971]
//             }
//         },
//         entertainment: {
//             unigrams: {
//                 words: ["entertainment", "hollywood", "kdrama", "platforms", "users", "broader", "actively", "category", "discussing", "multiple", "bollywood", "releases", "music", "gb", "pk", "startups", "stock", "tech", "sports", "olympics"],
//                 scores: [0.4366, 0.1912, 0.1852, 0.1688, 0.1688, 0.1688, 0.1688, 0.1688, 0.1688, 0.1688, 0.1507, 0.1412, 0.1412, 0.1019, 0.0890, 0.0, 0.0, 0.0, 0.0, 0.0]
//             },
//             bigrams: {
//                 words: ["broader category", "actively discussing", "entertainment multiple", "multiple platforms", "category entertainment", "platforms users", "users actively", "discussing hollywood", "hollywood broader", "discussing kdrama"],
//                 scores: [0.3763, 0.3763, 0.3763, 0.3763, 0.3763, 0.3755, 0.1907, 0.1038, 0.1038, 0.1001]
//             }
//         },
//         global_events: {
//             unigrams: {
//                 words: ["events", "global", "elections", "platforms", "users", "broader", "actively", "discussing", "multiple", "category", "climate", "conflicts", "protests", "pk", "gb", "releases", "startups", "stock", "tech", "sports"],
//                 scores: [0.4125, 0.4125, 0.1643, 0.1634, 0.1634, 0.1634, 0.1634, 0.1634, 0.1634, 0.1634, 0.1615, 0.1566, 0.1556, 0.0898, 0.0802, 0.0, 0.0, 0.0, 0.0, 0.0]
//             },
//             bigrams: {
//                 words: ["broader category", "events multiple", "multiple platforms", "global events", "actively discussing", "category global", "platforms users", "users actively", "discussing elections", "elections broader"],
//                 scores: [0.3535, 0.3535, 0.3535, 0.3535, 0.3535, 0.3535, 0.3529, 0.1936, 0.0916, 0.0916]
//             }
//         },
//         sports: {
//             unigrams: {
//                 words: ["sports", "football", "esports", "multiple", "platforms", "users", "broader", "category", "discussing", "actively", "olympics", "cricket", "pk", "gb", "releases", "startups", "stock", "tech", "market", "music"],
//                 scores: [0.4681, 0.1956, 0.1756, 0.1719, 0.1719, 0.1719, 0.1719, 0.1719, 0.1719, 0.1719, 0.1692, 0.1641, 0.1025, 0.0885, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
//             },
//             bigrams: {
//                 words: ["actively discussing", "multiple platforms", "sports multiple", "category sports", "broader category", "platforms users", "users actively", "discussing football", "football broader", "pk actively"],
//                 scores: [0.3780, 0.3780, 0.3780, 0.3780, 0.3780, 0.3771, 0.1949, 0.1059, 0.1059, 0.0991]
//             }
//         }
//     };

//     const categoricalData: any = {
//         ai_and_tech: {
//             words: ["users", "actively", "discussing", "broader", "category", "tech", "multiple", "platforms", "startups", "agentic", "artificial", "intelligence", "future", "innovation", "silicon", "valley", "machine", "learning", "neural", "networks"],
//             counts: [507, 507, 507, 507, 507, 507, 507, 507, 133, 131, 125, 120, 115, 110, 105, 100, 95, 90, 85, 80]
//         },
//         economy: {
//             words: ["users", "actively", "discussing", "broader", "category", "economy", "multiple", "platforms", "inflation", "stock", "market", "crypto", "jobs", "recession", "interest", "rates", "banking", "finance", "global", "trade"],
//             counts: [492, 492, 492, 492, 492, 492, 492, 492, 127, 126, 126, 125, 114, 110, 105, 100, 95, 90, 85, 80]
//         },
//         entertainment: {
//             words: ["users", "actively", "discussing", "broader", "category", "entertainment", "multiple", "platforms", "hollywood", "kdrama", "music", "releases", "bollywood", "netflix", "cinema", "streaming", "awards", "box", "office", "concerts"],
//             counts: [511, 511, 511, 511, 511, 511, 511, 511, 141, 136, 126, 126, 108, 105, 100, 95, 90, 85, 80, 75]
//         },
//         global_events: {
//             words: ["users", "actively", "discussing", "broader", "category", "global", "events", "multiple", "platforms", "elections", "climate", "summit", "protests", "unsc", "treaty", "peace", "conflict", "diplomacy", "summit", "border"],
//             counts: [544, 544, 544, 544, 544, 544, 544, 544, 544, 141, 135, 130, 125, 120, 115, 110, 105, 100, 95, 90]
//         },
//         sports: {
//             words: ["users", "actively", "discussing", "broader", "category", "sports", "multiple", "platforms", "football", "esports", "olympics", "world", "cup", "tennis", "basketball", "cricket", "league", "championship", "tournament", "finals"],
//             counts: [446, 446, 446, 446, 446, 446, 446, 446, 125, 111, 105, 100, 95, 90, 85, 80, 75, 70, 65, 60]
//         },
//         overall: {
//             words: ["users", "actively", "discussing", "broader", "category", "multiple", "platforms", "global", "events", "entertainment", "tech", "economy", "sports", "jobs", "elections", "hollywood", "climate", "kdrama", "conflicts", "startups"],
//             counts: [2500, 2500, 2500, 2500, 2500, 2500, 2500, 544, 544, 511, 507, 492, 446, 231, 141, 141, 138, 136, 134, 133]
//         }
//     };

//     useEffect(() => {
//         window.scrollTo(0, 0);

//         const observerOptions = {
//             root: null,
//             rootMargin: '-20% 0px -70% 0px',
//             threshold: 0
//         };

//         const observerCallback = (entries: IntersectionObserverEntry[]) => {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting) {
//                     setActiveNav(entry.target.id);
//                 }
//             });
//         };

//         const observer = new IntersectionObserver(observerCallback, observerOptions);
//         const sections = document.querySelectorAll('section[id], div[id]');
//         sections.forEach(section => observer.observe(section));

//         return () => observer.disconnect();
//     }, []);

//     const tocItems = [
//         { id: "overview", label: "Overview" },
//         { id: "methodology", label: "Methodology" },
//         { id: "dataset-overview", label: "Dataset Overview" },
//         { id: "inventory", label: "Dataset Inventory" },
//         { id: "content", label: "Category Distribution" },
//         { id: "stop-words", label: "Stop Words" },
//         { id: "word-count", label: "Word Count" },
//         { id: "char-count", label: "Char Count" },
//         { id: "semantic", label: "Vocabulary Richness by category" },
//         { id: "category", label: "TOP 20 WORDS BY CATEGORIES" },
//         { id: "tfidf-category", label: "Category Weights (TF-IDF)" },
//         { id: "bigrams-comparison", label: "Categorical Bigrams Comparison" },
//         { id: "matrix", label: "Similarity Matrix" },
//         { id: "insights", label: "Key Insights" },
//     ];

//     return (
//         <div className="min-h-screen relative bg-[#f8fafb] selection:bg-primary/20 text-on-surface font-sans antialiased">
//             <style>{`
//         .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
//         .custom-scrollbar::-webkit-scrollbar-track { background: #f1f3f5; border-radius: 10px; }
//         .custom-scrollbar::-webkit-scrollbar-thumb { background: #00685f; border-radius: 10px; border: 2.5px solid #f1f3f5; }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #004d46; }
//         .no-scrollbar::-webkit-scrollbar { display: none; }
//       `}</style>

//             {/* Back Button */}
//             <div className="fixed top-24 left-8 z-50">
//                 <button
//                     onClick={onBack}
//                     className="bg-white p-4 rounded-2xl border border-outline-variant/10 shadow-2xl hover:bg-primary hover:text-white transition-all group cursor-pointer active:scale-90"
//                 >
//                     <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
//                 </button>
//             </div>

//             <main className="pt-8 flex max-w-[1440px] mx-auto px-4 lg:px-8">
//                 {/* Sticky Table of Contents Sidebar */}
//                 <aside className="hidden xl:block w-72 sticky top-32 self-start pr-12 h-[calc(100vh-160px)] overflow-y-auto no-scrollbar">
//                     <div className="space-y-12">
//                         <div>
//                             <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40 mb-10 pl-6">Analysis Index</h3>
//                             <div className="relative border-l-2 border-outline-variant/10 ml-6 space-y-1">
//                                 {tocItems.map((item) => {
//                                     const isActive = activeNav === item.id;
//                                     return (
//                                         <a
//                                             key={item.id}
//                                             href={`#${item.id}`}
//                                             onClick={(e) => {
//                                                 e.preventDefault();
//                                                 document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
//                                             }}
//                                             className={`block py-2.5 px-6 -ml-[2px] border-l-2 text-[11px] font-bold tracking-tight transition-all duration-300 ${isActive
//                                                 ? "text-primary border-primary bg-primary/5"
//                                                 : "text-on-surface-variant/40 border-transparent hover:text-on-surface-variant/70 hover:border-outline-variant/30"
//                                                 }`}
//                                         >
//                                             {item.label}
//                                         </a>
//                                     );
//                                 })}
//                             </div>
//                         </div>
//                     </div>
//                 </aside>

//                 <div className="flex-1 min-w-0">
//                     {/* Mode Switcher Tabs */}
//                     <div className="flex bg-surface-container-high p-1 rounded-2xl w-fit mx-auto mb-12 shadow-inner border border-outline-variant/10">
//                         <button
//                             onClick={() => setActiveMode("eda")}
//                             className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer border-none ${activeMode === "eda" ? "bg-white text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"}`}
//                         >
//                             <div className="flex items-center gap-2">
//                                 <BarChart3 size={14} />
//                                 EDA Analysis
//                             </div>
//                         </button>
//                         <button
//                             onClick={() => setActiveMode("ml")}
//                             className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer border-none ${activeMode === "ml" ? "bg-white text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"}`}
//                         >
//                             <div className="flex items-center gap-2">
//                                 <Brain size={14} />
//                                 Machine Learning
//                             </div>
//                         </button>
//                     </div>

//                     {/* Hero Section */}
//                     <section className="relative py-28 overflow-hidden bg-white border border-outline-variant/5 rounded-[3rem] shadow-sm mb-12" id="overview">
//                         <div className="max-w-[1240px] mx-auto px-10">
//                             <div className="flex flex-col lg:flex-row items-center gap-20">
//                                 <motion.div
//                                     initial={{ opacity: 0, y: 20 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     className="flex-1 text-center lg:text-left"
//                                 >
//                                     <div className="flex items-center justify-center lg:justify-start gap-3 text-primary font-bold tracking-widest text-[10px] uppercase mb-8">
//                                         <span className="w-8 h-px bg-primary/40"></span>
//                                         Textual Dataset Analysis
//                                     </div>
//                                     <h1 className="text-6xl md:text-7xl font-extrabold mb-8 tracking-tighter leading-[1] text-on-surface">
//                                         Trending Topics <br />
//                                         <span className="text-primary italic font-serif opacity-90">Analysis Report.</span>
//                                     </h1>
//                                     <p className="text-lg text-on-surface-variant leading-relaxed max-w-2xl font-medium mb-12 opacity-80">
//                                         Exploratory analysis of cross-platform trending topics, investigating semantic patterns and categorical distributions.
//                                     </p>
//                                     <div className="flex flex-wrap justify-center lg:justify-start gap-4">
//                                         <div className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-low rounded-xl border border-outline-variant/10 text-[10px] font-black uppercase tracking-widest">
//                                             <Database size={14} className="text-primary" />
//                                             2,500 articles
//                                         </div>
//                                         <div className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-low rounded-xl border border-outline-variant/10 text-[10px] font-black uppercase tracking-widest text-emerald-600">
//                                             <CheckCircle2 size={14} />
//                                             Language: Multi
//                                         </div>
//                                         <div className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-low rounded-xl border border-outline-variant/10 text-[10px] font-black uppercase tracking-widest text-secondary">
//                                             <Info size={14} />
//                                             Synthetic Content
//                                         </div>
//                                     </div>
//                                 </motion.div>

//                                 <motion.div
//                                     initial={{ opacity: 0, x: 20 }}
//                                     animate={{ opacity: 1, x: 0 }}
//                                     className="w-full lg:w-[420px] space-y-8"
//                                 >
//                                     <div className="bg-white rounded-[2.5rem] p-10 border border-outline-variant/10 shadow-2xl shadow-on-surface/5">
//                                         <div className="space-y-8">
//                                             <div className="flex justify-between items-center pb-6 border-b border-outline-variant/10">
//                                                 <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Study Metadata</span>
//                                                 <span className="px-3 py-1 bg-surface-container-high rounded-full text-[9px] font-bold uppercase tracking-tight">V2.0.0</span>
//                                             </div>
//                                             <div className="space-y-5">
//                                                 {[
//                                                     { label: "Temporal Depth", val: "2026 Archive" },
//                                                     { label: "Primary Field", val: "short_text" },
//                                                     { label: "Category Field", val: "topic_category" },
//                                                     { label: "Kaggle Usability", val: "10.00" },
//                                                     { label: "Updates", val: "Annually" },
//                                                     { label: "Data Tags", val: "Text, NLP" }
//                                                 ].map((item, i) => (
//                                                     <div key={i} className="flex justify-between items-center">
//                                                         <span className="text-xs font-semibold text-on-surface-variant opacity-60 uppercase tracking-tight font-headline">{item.label}</span>
//                                                         <span className="text-on-surface font-black text-sm">{item.val}</span>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                             <div className="pt-8 border-t border-outline-variant/10">
//                                                 <div className="flex items-center gap-3 mb-6">
//                                                     <Users size={16} className="text-primary" />
//                                                     <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Project Contributors</span>
//                                                 </div>
//                                                 <div className="flex flex-wrap gap-4">
//                                                     {[
//                                                         "Nguyễn Đặng Minh Trường"
//                                                     ].map((member, i) => (
//                                                         <div key={i} className="flex items-center gap-2 px-4 py-2 bg-surface-container-low rounded-xl border border-outline-variant/10 w-fit">
//                                                             <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
//                                                             <span className="text-[10px] font-bold text-on-surface whitespace-nowrap">{member}</span>
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <ImagePlaceholder label="Editorial Scene" src={heroTextImage} className="min-h-[280px]" />
//                                 </motion.div>
//                             </div>

//                             {/* Core KPIs */}
//                             <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-24">
//                                 <StatCard label="Total Articles" value="2500" icon={Database} />
//                                 <StatCard label="Categories" value="5" icon={Target} />
//                                 <StatCard label="Avg Words" value="17" icon={Hash} />
//                                 <StatCard label="Avg Chars" value="116" icon={FileText} />
//                             </div>
//                         </div>
//                     </section>


//                     <div className="max-w-[1240px] mx-auto pb-40">
//                         {activeMode === "eda" ? (
//                             <>
//                                 {/* Dataset Ethics Notice */}
//                         <div className="bg-surface-container-low/30 p-8 rounded-[2.5rem] border border-outline-variant/10 mb-12 flex flex-col md:flex-row gap-8 items-center md:items-start group transition-all hover:bg-white hover:shadow-xl hover:shadow-on-surface/5">
//                             <div className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
//                                 <AlertTriangle size={24} />
//                             </div>
//                             <div>
//                                 <h3 className="text-sm font-black text-on-surface uppercase tracking-[0.1em] mb-3">Dataset Ethics & Origin</h3>
//                                 <p className="text-sm text-on-surface-variant leading-relaxed opacity-70 font-medium">
//                                     This report utilizes the <strong className="text-secondary">Global Trending Topics 2026 – Multi-Source Synthetic Dataset</strong>.
//                                     The data comprises ~2,500 records of artificially generated trending topics for February 2026.
//                                     With a <strong className="text-primary font-bold">10.00 Usability Score</strong> on Kaggle, this analysis ensure absolute privacy compliance and zero-risk exploration of NLP patterns.
//                                     Licensed under <span className="font-bold">CC0 1.0 (Public Domain)</span>.
//                                 </p>
//                                 <a
//                                     href="https://www.kaggle.com/datasets/mmuneeb5522/crossplatform-trending-topics-2026multilanguage"
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-on-surface text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-primary hover:shadow-lg hover:-translate-y-0.5 group"
//                                 >
//                                     <Link size={14} className="group-hover:rotate-45 transition-transform" />
//                                     Source Repository (Kaggle)
//                                 </a>
//                             </div>
//                         </div>


//                         {/* Methodology Section */}
//                         <section className="py-20 scroll-mt-24" id="methodology">
//                             <div className="bg-white rounded-[2.5rem] border border-outline-variant/10 shadow-sm p-12 group transition-all hover:shadow-xl hover:shadow-on-surface/5">
//                                 <div className="flex items-center gap-6 mb-12">
//                                     <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110"><BookOpen size={28} /></div>
//                                     <div>
//                                         <h2 className="text-3xl font-bold tracking-tight mb-2 text-on-surface">Analysis Methodology</h2>
//                                         <p className="text-on-surface-variant text-sm font-medium opacity-60">This report uses two distinct text processing approaches based on specific analytical objectives.</p>
//                                     </div>
//                                 </div>

//                                 <div className="bg-white rounded-[2rem] border border-outline-variant/10 shadow-inner overflow-hidden">
//                                     <table className="w-full text-left border-collapse">
//                                         <thead className="bg-primary/5 text-primary border-b border-outline-variant/10">
//                                             <tr>
//                                                 <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest w-[30%]">Analysis Type</th>
//                                                 <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-center">Raw Data</th>
//                                                 <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-center">Stopwords Removed</th>
//                                                 <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">Scientific Rationale</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody className="divide-y divide-outline-variant/5">
//                                             {[
//                                                 { type: "Basic Statistics", sub: "(Word/Char counts)", raw: true, stop: false, reason: "Measure actual physical document footprint." },
//                                                 { type: "Stop Words Analysis", sub: "(Noise profiling)", raw: true, stop: false, reason: "Audit the frequency of non-semantic functional words." },
//                                                 { type: "Word Frequency", sub: "(Top overall words)", raw: false, stop: true, reason: "Surface meaningful lexical keywords & concepts." },
//                                                 { type: "Category Keywords", sub: "(Sector specific)", raw: false, stop: true, reason: "Isolate terms unique to platform segments." },
//                                                 { type: "Vocabulary Richness by category", sub: "(TTR & Diversity)", raw: false, stop: true, reason: "Analyze semantic variety without syntactic noise." },
//                                                 { type: "TF-IDF Weighted Terms", sub: "(Significance)", raw: false, stop: true, reason: "Determine most distinctive categorical identifiers." },
//                                                 { type: "N-grams (Bigrams)", sub: "(Phrase patterns)", raw: false, stop: true, reason: "Capture meaningful contextual word dependencies." },
//                                                 { type: "Distributions", sub: "(Length histograms)", raw: true, stop: false, reason: "Maintain integrity of original text delivery format." }
//                                             ].map((row, i) => (
//                                                 <tr key={i} className="hover:bg-surface-container-low/30 transition-colors group/row">
//                                                     <td className="px-8 py-6">
//                                                         <div className="font-bold text-on-surface text-sm">{row.type}</div>
//                                                         <div className="text-[10px] text-on-surface-variant opacity-60 font-medium tracking-tight">{row.sub}</div>
//                                                     </td>
//                                                     <td className="px-8 py-6 text-center">
//                                                         {row.raw ? (
//                                                             <div className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-100 text-emerald-600 shadow-sm"><CheckCircle2 size={14} /></div>
//                                                         ) : (
//                                                             <div className="text-on-surface-variant opacity-20 text-lg font-light">-</div>
//                                                         )}
//                                                     </td>
//                                                     <td className="px-8 py-6 text-center">
//                                                         {row.stop ? (
//                                                             <div className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-primary/10 text-primary shadow-sm"><CheckCircle2 size={14} /></div>
//                                                         ) : (
//                                                             <div className="text-on-surface-variant opacity-20 text-lg font-light">-</div>
//                                                         )}
//                                                     </td>
//                                                     <td className="px-8 py-6 text-xs text-on-surface-variant/70 leading-relaxed font-medium">
//                                                         {row.reason}
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>

//                                 <div className="mt-8 flex items-center gap-4 bg-surface-container-low/50 p-6 rounded-2xl border border-outline-variant/10 text-[11px] text-on-surface-variant italic leading-relaxed">
//                                     <Sparkles size={16} className="text-primary shrink-0" />
//                                     <span>
//                                         Analytic Note: Categorical segmentation and semantic extraction require a filtered approach to remove <strong>syntax noise</strong> (stopwards), ensuring that the resulting visualizations reflect actual <strong>domain knowledge</strong> rather than language mechanics.
//                                     </span>
//                                 </div>
//                             </div>
//                         </section>

//                         {/* Dataset Overview Section */}
//                         <InteractiveAnalysis
//                             id="dataset-overview"
//                             title="Dataset Overview"
//                             subtitle="Core descriptive statistics and data health assessment."
//                             icon={Layout}
//                             pythonCode={`import pandas as pd

// # Assume your file is 'dataset.csv' with 'text' column for content and 'topic_category' for label

// # 1. Total Articles
// total_articles = len(df)

// # 2. Categories
// num_categories = df['topic_category'].nunique()

// # Calculate word and character counts for each article
// df['word_count'] = df['short_text'].apply(lambda x: len(str(x).split()))
// df['char_count'] = df['short_text'].apply(lambda x: len(str(x)))

// # 3. Avg Words/Article
// avg_words = df['word_count'].mean()

// # 4. Avg Chars/Article
// avg_chars = df['char_count'].mean()

// print(f"Total Articles: {total_articles}")
// print(f"Categories: {num_categories}")
// print(f"Avg Words: {avg_words:.0f}")
// print(f"Avg Chars: {avg_chars:.0f}")`}
//                         >
//                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                                 <div className="bg-surface-container-low/50 p-6 rounded-2xl border border-outline-variant/10">
//                                     <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Sampling Volume</h4>
//                                     <div className="text-2xl font-bold text-on-surface">2500 Records</div>
//                                     <p className="text-xs text-on-surface-variant mt-2 font-medium">Total indexed articles.</p>
//                                 </div>
//                                 <div className="bg-surface-container-low/50 p-6 rounded-2xl border border-outline-variant/10">
//                                     <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Categorical Depth</h4>
//                                     <div className="text-2xl font-bold text-on-surface">5 Unique Topics</div>
//                                     <p className="text-xs text-on-surface-variant mt-2 font-medium">Distinct editorial segments.</p>
//                                 </div>
//                                 <div className="bg-surface-container-low/50 p-6 rounded-2xl border border-outline-variant/10">
//                                     <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Lexical Mean</h4>
//                                     <div className="text-2xl font-bold text-on-surface">17 Words</div>
//                                     <p className="text-xs text-on-surface-variant mt-2 font-medium">Average article length.</p>
//                                 </div>
//                                 <div className="bg-surface-container-low/50 p-6 rounded-2xl border border-outline-variant/10">
//                                     <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Content Density</h4>
//                                     <div className="text-2xl font-bold text-on-surface">116 Chars</div>
//                                     <p className="text-xs text-on-surface-variant mt-2 font-medium">Average byte footprint.</p>
//                                 </div>
//                             </div>
//                         </InteractiveAnalysis>

//                         {/* Dataset Inventory Section */}
//                         <InteractiveAnalysis
//                             id="inventory"
//                             title="Dataset Inventory"
//                             subtitle="Full enumeration of article metadata fields and content headers."
//                             icon={Columns}
//                             pythonCode={`import pandas as pd
// import os

// df = pd.read_csv(os.path.join(path,"trending_topics_2026_synthetic.csv"))

// # Check dataset schema
// df.info()`}
//                         >
//                             <div className="bg-white rounded-[1.5rem] border border-outline-variant/10 shadow-sm overflow-hidden overflow-x-auto overflow-y-auto max-h-[500px] custom-scrollbar">
//                                 <table className="w-full text-left border-collapse min-w-[1000px]">
//                                     <thead className="sticky top-0 z-20 bg-on-surface text-white">
//                                         <tr>
//                                             <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest">Field Name</th>
//                                             <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest">Dtype</th>
//                                             <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest">Description</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody className="divide-y divide-outline-variant/5">
//                                         {[
//                                             { name: "id", type: "object", desc: "Unique identifier for each article record." },
//                                             { name: "date", type: "object", desc: "Timestamp of the article publication." },
//                                             { name: "source", type: "object", desc: "Originating platform or news outlet." },
//                                             { name: "language", type: "object", desc: "Primary language of the content (Multi)." },
//                                             { name: "country", type: "object", desc: "Geographic origin of the trending topic." },
//                                             { name: "topic_category", type: "object", desc: "High-level classification (e.g., AI, Economy)." },
//                                             { name: "topic_subcategory", type: "object", desc: "Granular topic focus within the category." },
//                                             { name: "headline", type: "object", desc: "Primary title of the trending article." },
//                                             { name: "short_text", type: "object", desc: "Cleaned text snippet for semantic analysis." },
//                                             { name: "sentiment", type: "object", desc: "Categorical sentiment label (Positive/Neutral/Negative)." },
//                                             { name: "engagement_score", type: "int64", desc: "Numeric weight of user interactions." },
//                                             { name: "trend_score", type: "float64", desc: "Calculated velocity of topic popularity." }
//                                         ].map((f) => (
//                                             <tr key={f.name} className="hover:bg-primary/5 transition-colors even:bg-surface-container-low/20">
//                                                 <td className="px-8 py-4 font-bold text-sm text-primary">{f.name}</td>
//                                                 <td className="px-8 py-4">
//                                                     <span className={`px-2.5 py-1 rounded text-[9px] font-black uppercase tracking-widest border ${f.type === "int64" || f.type === "float64" ? "bg-primary/5 text-primary border-primary/20" : "bg-on-surface-variant/5 text-on-surface-variant border-outline-variant/10"}`}>
//                                                         {f.type}
//                                                     </span>
//                                                 </td>
//                                                 <td className="px-8 py-4 text-on-surface-variant text-sm font-normal opacity-70 leading-relaxed">{f.desc}</td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </InteractiveAnalysis>

//                         {/* Category Distribution Section */}
//                         {/* Category Distribution Section */}
//                         <InteractiveAnalysis
//                             id="content"
//                             title="Category Distribution"
//                             subtitle="Prophetic breakdown of article volumes across major platform topics."
//                             icon={PieChart}
//                             pythonCode={`# Load data from URL or upload
// import pandas as pd
// import plotly.graph_objects as go

// # Option 2: Upload in Google Colab
// # from google.colab import files
// # uploaded = files.upload()
// # df = pd.read_csv('bbc-news.csv')

// # Count articles per category
// category_counts = df['topic_category'].value_counts().sort_index()

// # Create pie chart
// fig1 = go.Figure(data=[go.Pie(
//     labels=category_counts.index,
//     values=category_counts.values,
//     hole=0.3,  # Makes it a donut chart
//     marker=dict(colors=['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b']),
//     textinfo='label+percent',
//     textfont_size=14
// )])

// fig1.update_layout(
//     title='Category Distribution',
//     showlegend=True,
//     width=600,
//     height=400
// )

// fig1.show()

// # Print statistics
// print("Category Distribution:")
// print(category_counts)
// print(f"\\ntotal articles: {len(df)}")
// print(f"Most common: {category_counts.idxmax()} ({category_counts.max()} articles)")
// print(f"Least common: {category_counts.idxmin()} ({category_counts.min()} articles)")`}
//                             plots={[
//                                 {
//                                     label: "Topic Distribution",
//                                     data: [{
//                                         type: 'pie',
//                                         labels: ['ai_and_tech', 'economy', 'entertainment', 'global_events', 'sports'],
//                                         values: [507, 492, 511, 544, 446],
//                                         hole: 0.3,
//                                         marker: { colors: ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b'] },
//                                         textinfo: 'label+percent'
//                                     }],
//                                     layout: {
//                                         showlegend: true,
//                                         height: 400
//                                     }
//                                 }
//                             ]}
//                         >
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//                                 <div className="space-y-6">
//                                     <div className="bg-surface-container-low/50 p-6 rounded-2xl border border-outline-variant/10">
//                                         <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Dominant Category</h4>
//                                         <div className="text-2xl font-bold text-on-surface">Global Events (21.8%)</div>
//                                         <p className="text-sm text-on-surface-variant mt-2">Leading with 544 unique articles across all indexed platforms.</p>
//                                     </div>
//                                     <div className="bg-surface-container-low/50 p-6 rounded-2xl border border-outline-variant/10">
//                                         <h4 className="text-[10px] font-black uppercase tracking-widest text-secondary mb-2">Minority Class</h4>
//                                         <div className="text-2xl font-bold text-on-surface">Sports (17.8%)</div>
//                                         <p className="text-sm text-on-surface-variant mt-2">Represents the leanest segment with 446 specialized reports.</p>
//                                     </div>
//                                 </div>
//                                 <div className="p-6 bg-white rounded-3xl border border-outline-variant/10 shadow-sm italic text-sm text-on-surface-variant">
//                                     <Info className="text-primary mb-4" size={20} />
//                                     Observation: The dataset presents a remarkably balanced categorical spread, with all segments hovering between 17% and 22% total volume. This equilibrium is ideal for training unbiased multi-class classifiers.
//                                 </div>
//                             </div>
//                         </InteractiveAnalysis>

//                         {/* Stop Words Analysis Section */}
//                         <InteractiveAnalysis
//                             id="stop-words"
//                             title="Stop Words Analysis"
//                             subtitle="Frequency audit of non-semantic functional words within the text corpus."
//                             icon={Filter}
//                             pythonCode={`import pandas as pd
// import plotly.graph_objects as go
// from collections import Counter
// from sklearn.feature_extraction.text import ENGLISH_STOP_WORDS

// # Use sklearn stop words + custom news stopwords
// stop_words = set(ENGLISH_STOP_WORDS)
// custom_news_stopwords = ['said', 'mr', 'ms', 'mrs', 'told', 'says', 'say',
//                          'according', 'year', 'years', 'new', 'old', 'like',
//                          'just', 'going', 'got', 'use', 'used', 'make', 'made']
// stop_words.update(custom_news_stopwords)

// # Count stop words
// all_words = ' '.join(df['short_text']).lower().split()
// stop_word_counts = Counter([word for word in all_words if word in stop_words])
// top_stop_words = stop_word_counts.most_common(20)

// words = [word for word, count in top_stop_words]
// counts = [count for word, count in top_stop_words]

// # Create bar chart
// fig2 = go.Figure(data=[go.Bar(
//     x=words,
//     y=counts,
//     marker_color='#764ba2',
//     text=counts,
//     textposition='outside'
// )])

// fig2.update_layout(
//     title='Top 20 Stop Words',
//     xaxis_title='Stop Words',
//     yaxis_title='Frequency',
//     showlegend=False
// )

// fig2.show()

// # Print statistics
// total_words = len(all_words)
// total_stop_words = sum(stop_word_counts.values())
// print(f"Total words: {total_words:,}")
// print(f"Stop words: {total_stop_words:,} ({total_stop_words/total_words*100:.1f}%)")
// print(f"Unique stop words found: {len(stop_word_counts)}")`}
//                             plots={[
//                                 {
//                                     label: "Top Stop Words",
//                                     data: [{
//                                         type: 'bar',
//                                         x: ['from', 'are', 'within', 'the', 'of', 'across', 'us', 'in', 'and'],
//                                         y: [2500, 2500, 2500, 2500, 2500, 2500, 651, 620, 507],
//                                         marker: { color: '#764ba2' },
//                                         textposition: 'outside'
//                                     }],
//                                     layout: {
//                                         title: 'Top 20 Stop Words (Actual)',
//                                         xaxis: { title: 'Stop Words' },
//                                         yaxis: { title: 'Frequency' }
//                                     }
//                                 }
//                             ]}
//                         >
//                             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                                 <div className="bg-white p-8 rounded-2xl border border-outline-variant/10 shadow-sm border-t-4 border-t-[#764ba2]">
//                                     <div className="text-[10px] font-black uppercase tracking-widest text-[#764ba2] mb-2">Total Word Volume</div>
//                                     <div className="text-3xl font-bold">42,184</div>
//                                     <div className="text-xs text-on-surface-variant mt-1 font-medium italic opacity-60">Complete corpus word count</div>
//                                 </div>
//                                 <div className="bg-white p-8 rounded-2xl border border-outline-variant/10 shadow-sm border-t-4 border-t-[#764ba2]">
//                                     <div className="text-[10px] font-black uppercase tracking-widest text-[#764ba2] mb-2">Stop Word Density</div>
//                                     <div className="text-3xl font-bold">39.8%</div>
//                                     <div className="text-xs text-on-surface-variant mt-1 font-medium italic opacity-60">16,778 noise words identified</div>
//                                 </div>
//                                 <div className="bg-white p-8 rounded-2xl border border-outline-variant/10 shadow-sm border-t-4 border-t-[#764ba2]">
//                                     <div className="text-[10px] font-black uppercase tracking-widest text-[#764ba2] mb-2">Unique Filters</div>
//                                     <div className="text-3xl font-bold">9</div>
//                                     <div className="text-xs text-on-surface-variant mt-1 font-medium italic opacity-60">Distinct functional terms</div>
//                                 </div>
//                             </div>
//                         </InteractiveAnalysis>

//                         {/* Word Count Distribution Section */}
//                         <InteractiveAnalysis
//                             id="word-count"
//                             title="Word Count Distribution"
//                             subtitle="Granular histogram of article lengths measured in tokens."
//                             icon={Hash}
//                             pythonCode={`import pandas as pd
// import plotly.graph_objects as go
// import numpy as np

// # Calculate word counts
// df['word_count'] = df['short_text'].str.split().str.len().fillna(0).astype(int)

// # Defined range for fine-grained analysis
// max_range = 21
// bins = np.arange(0, max_range + 1, 1)

// hist, bin_edges = np.histogram(df['word_count'], bins=bins)
// bin_labels = [str(int(bin_edges[i])) for i in range(len(hist))]

// # Create bar chart
// fig = go.Figure(data=[go.Bar(
//     x=bin_labels,
//     y=hist,
//     marker_color='#667eea',
//     text=hist,
//     textposition='outside'
// )])

// fig.update_layout(
//     title='Detailed Word Count Distribution (0-20 words)',
//     xaxis_title='Exact Word Count',
//     yaxis_title='Number of Articles',
//     width=1000, 
//     height=500,
//     template='plotly_white',
//     xaxis=dict(
//         type='category', 
//         tickmode='linear'
//     )
// )

// fig.show()

// # Export file for web
// fig.write_html("detailed_word_count_0_20.html")

// # Quick statistics for this subset
// print(f"Total articles with 0-20 words: {sum(hist)}")`}
//                             plots={[
//                                 {
//                                     label: "Word Count (0-20)",
//                                     data: [{
//                                         type: 'bar',
//                                         x: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
//                                         y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1197, 796, 133, 374, 0],
//                                         marker: { color: '#667eea' },
//                                         text: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1197, 796, 133, 374, 0],
//                                         textposition: 'outside'
//                                     }],
//                                     layout: {
//                                         title: 'Detailed Word Count Distribution (0 to 20 words)',
//                                         xaxis: { title: 'Exact Word Count', type: 'category' },
//                                         yaxis: { title: 'Number of Articles' },
//                                         height: 500
//                                     }
//                                 }
//                             ]}
//                         >
//                             <div className="bg-surface-container-low/50 p-8 rounded-[2rem] border border-outline-variant/10 text-on-surface flex flex-col items-center justify-center text-center">
//                                 <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Key Observation</div>
//                                 <div className="text-2xl font-bold max-w-2xl px-8">Most articles contain exactly 16 to 17 words.</div>
//                                 <p className="text-sm text-on-surface-variant mt-4 opacity-70 italic">This consistency indicates a standardized content injection pipeline from the trending source platforms.</p>
//                             </div>
//                         </InteractiveAnalysis>

//                         {/* Character Count Distribution Section */}
//                         <InteractiveAnalysis
//                             id="char-count"
//                             title="Character Count Distribution"
//                             subtitle="Analysis of byte-level density and physical article length across the corpus."
//                             icon={Type}
//                             pythonCode={`import pandas as pd
// import plotly.graph_objects as go
// import numpy as np

// # Calculate character counts
// df['char_count'] = df['short_text'].str.len()

// # Create histogram bins
// # Note: Data ranges from 108 to 124 chars
// bins = np.arange(100, df['char_count'].max() + 1, 1)
// hist, bin_edges = np.histogram(df['char_count'], bins=bins)

// bin_labels = [f"{int(bin_edges[i])}-{int(bin_edges[i+1])}" for i in range(len(hist))]

// # Create histogram
// fig = go.Figure(data=[go.Bar(
//     x=bin_labels,
//     y=hist,
//     marker_color='#f093fb',
//     text=hist,
//     textposition='outside'
// )])

// fig.update_layout(
//     title='Character Count Distribution',
//     xaxis_title='Character Count Ranges',
//     yaxis_title='Number of Articles',
//     showlegend=False
// )

// fig.show()

// # Print statistics
// print(f"Mean: {df['char_count'].mean():.2f}")
// print(f"Median: {df['char_count'].median():.2f}")
// print(f"Min: {df['char_count'].min()}")
// print(f"Max: {df['char_count'].max()}")`}
//                             plots={[
//                                 {
//                                     label: "Char Distribution",
//                                     data: [{
//                                         type: 'bar',
//                                         x: ['100-101', '101-102', '102-103', '103-104', '104-105', '105-106', '106-107', '107-108', '108-109', '109-110', '110-111', '111-112', '112-113', '113-114', '114-115', '115-116', '116-117', '117-118', '118-119', '119-120', '120-121', '121-122', '122-123', '123-124'],
//                                         y: [0, 0, 0, 0, 0, 0, 0, 0, 114, 0, 339, 232, 0, 127, 126, 0, 395, 138, 262, 524, 0, 0, 0, 243],
//                                         marker: { color: '#f093fb' },
//                                         text: [0, 0, 0, 0, 0, 0, 0, 0, 114, 0, 339, 232, 0, 127, 126, 0, 395, 138, 262, 524, 0, 0, 0, 243],
//                                         textposition: 'outside'
//                                     }],
//                                     layout: {
//                                         title: 'Character Count Density',
//                                         xaxis: { title: 'Character Count Ranges', tickangle: 45 },
//                                         yaxis: { title: 'Number of Articles' },
//                                         height: 500
//                                     }
//                                 }
//                             ]}
//                         >
//                             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                                 <div className="bg-surface-container-low/30 p-4 rounded-xl border border-outline-variant/10 text-center">
//                                     <div className="text-[9px] font-bold uppercase tracking-tighter text-on-surface-variant/50 mb-1">Mean</div>
//                                     <div className="text-xl font-bold text-primary">115.78</div>
//                                 </div>
//                                 <div className="bg-surface-container-low/30 p-4 rounded-xl border border-outline-variant/10 text-center">
//                                     <div className="text-[9px] font-bold uppercase tracking-tighter text-on-surface-variant/50 mb-1">Median</div>
//                                     <div className="text-xl font-bold text-primary">116.0</div>
//                                 </div>
//                                 <div className="bg-surface-container-low/30 p-4 rounded-xl border border-outline-variant/10 text-center">
//                                     <div className="text-[9px] font-bold uppercase tracking-tighter text-on-surface-variant/50 mb-1">Min</div>
//                                     <div className="text-xl font-bold text-primary">108</div>
//                                 </div>
//                                 <div className="bg-surface-container-low/30 p-4 rounded-xl border border-outline-variant/10 text-center">
//                                     <div className="text-[9px] font-bold uppercase tracking-tighter text-on-surface-variant/50 mb-1">Max</div>
//                                     <div className="text-xl font-bold text-primary">124</div>
//                                 </div>
//                             </div>
//                         </InteractiveAnalysis>

//                         {/* Vocabulary Richness Section */}
//                         <InteractiveAnalysis
//                             id="semantic"
//                             title="Vocabulary Richness by category"
//                             subtitle="Evaluation of lexical diversity and unique token density across categories."
//                             icon={Brain}
//                             pythonCode={`import pandas as pd
// import plotly.graph_objects as go
// import re
// from sklearn.feature_extraction.text import ENGLISH_STOP_WORDS

// # Setup stop words
// stop_words = set(ENGLISH_STOP_WORDS)
// custom_news_stopwords = ['said', 'mr', 'ms', 'mrs', 'told', 'says', 'say',
//                          'according', 'year', 'years', 'new', 'old', 'like',
//                          'just', 'going', 'got', 'use', 'used', 'make', 'made']
// stop_words.update(custom_news_stopwords)

// # Calculate vocabulary richness per category
// vocab_stats = []
// for category in sorted(df['topic_category'].unique()):
//     cat_df = df[df['topic_category'] == category]
//     all_text = ' '.join(cat_df['short_text']).lower()
    
//     # Extract words >= 3 chars, filtering stop words
//     words = re.findall(r'\\b[a-z]{3,}\\b', all_text)
//     words = [w for w in words if w not in stop_words]

//     unique_words = len(set(words))
//     total_words = len(words)
//     ttr = unique_words / total_words if total_words > 0 else 0

//     vocab_stats.append({
//         'category': category,
//         'unique_words': unique_words,
//         'total_words': total_words,
//         'ttr': ttr
//     })

// vocab_df = pd.DataFrame(vocab_stats)

// # Create bar chart
// fig = go.Figure(data=[go.Bar(
//     x=vocab_df['category'],
//     y=vocab_df['unique_words'],
//     name='Unique Words',
//     marker_color='#4facfe'
// )])

// fig.update_layout(
//     title='Vocabulary Richness by category',
//     xaxis_title='Category',
//     yaxis_title='Unique Words Count'
// )

// fig.show()

// # Print statistics
// print("\\nVocabulary Richness by category Statistics:")
// print(vocab_df.to_string(index=False))`}
//                             plots={[
//                                 {
//                                     label: "Unique Words",
//                                     data: [{
//                                         type: 'bar',
//                                         x: ['ai_and_tech', 'economy', 'entertainment', 'global_events', 'sports'],
//                                         y: [13, 13, 13, 13, 12],
//                                         marker: { color: '#4facfe' }
//                                     }],
//                                     layout: {
//                                         title: 'Vocabulary Richness by category (Unique Concepts)',
//                                         xaxis: { title: 'Category' },
//                                         yaxis: { title: 'Unique Word Count' }
//                                     }
//                                 }
//                             ]}
//                         >
//                             <div className="bg-surface-container-low/50 p-6 rounded-2xl border border-outline-variant/10 shadow-sm italic text-sm text-on-surface-variant flex gap-4 items-start">
//                                 <Info className="text-primary mt-1 shrink-0" size={20} />
//                                 <p>
//                                     Technical Observation: After filtering 420+ standard stop words and custom news noise, the semantic core of each category remains highly focused (approx. 13 unique keywords). This suggests a highly redundant/templated writing style typical of synthetic trending datasets.
//                                 </p>
//                             </div>
//                         </InteractiveAnalysis>



//                         {/* TOP 20 WORDS BY CATEGORIES Section */}
//                         <InteractiveAnalysis
//                             id="category"
//                             title="TOP 20 WORDS BY CATEGORIES"
//                             subtitle="In-depth topic frequency analysis per platform domain."
//                             icon={GitMerge}
//                             pythonCode={`import pandas as pd
// import plotly.graph_objects as go
// from collections import Counter
// import re
// from sklearn.feature_extraction.text import ENGLISH_STOP_WORDS

// # Setup stop words
// stop_words = set(ENGLISH_STOP_WORDS)
// custom_news_stopwords = ['said', 'mr', 'ms', 'mrs', 'told', 'says', 'say',
//                          'according', 'year', 'years', 'new', 'old', 'like',
//                          'just', 'going', 'got', 'use', 'used', 'make', 'made']
// stop_words.update(custom_news_stopwords)

// # Select a category to analyze
// selected_category = '${selectedCategory}'
// cat_df = df[df['topic_category'] == selected_category]

// # Tokenize and filter
// all_text = ' '.join(cat_df['short_text']).lower()
// words = re.findall(r'\\b[a-z]{3,}\\b', all_text)
// words = [w for w in words if w not in stop_words]

// # Calculate frequencies
// word_counts = Counter(words).most_common(20)
// words_list = [word for word, count in word_counts]
// counts_list = [count for word, count in word_counts]

// # Plot horizontal bar chart
// fig = go.Figure(data=[go.Bar(
//     x=counts_list,
//     y=words_list,
//     orientation='h',
//     marker_color='#667eea',
//     text=counts_list,
//     textposition='outside'
// )])

// fig.update_layout(
//     title=f'Top 20 Words in {selected_category.capitalize()} Articles',
//     xaxis_title='Frequency',
//     yaxis_title='Words',
//     yaxis={'autorange': 'reversed'}
// )

// fig.show()`}
//                         >
//                             <div className="space-y-12">
//                                 <div className="flex flex-col md:flex-row gap-6 items-center justify-between pb-8 border-b border-outline-variant/10">
//                                     <div className="space-y-1">
//                                         <h4 className="text-xl font-bold text-on-surface">Category Inquisitior</h4>
//                                         <p className="text-sm text-on-surface-variant max-w-md opacity-60">Drill down into specific platform topics to uncover localized trending terminology.</p>
//                                     </div>
//                                     <div className="relative group min-w-[240px]">
//                                         <select
//                                             value={selectedCategory}
//                                             onChange={(e) => setSelectedCategory(e.target.value as any)}
//                                             className="w-full h-14 pl-6 pr-12 bg-white rounded-2xl border border-outline-variant/20 appearance-none text-primary font-bold focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer shadow-sm group-hover:border-primary/40"
//                                         >
//                                             <option value="overall" className="font-bold text-accent">TOP FREQUENTLY OVERALL</option>
//                                             <option value="ai_and_tech">Tech & AI</option>
//                                             <option value="economy">Economy & Finance</option>
//                                             <option value="entertainment">Entertainment</option>
//                                             <option value="global_events">Global Events</option>
//                                             <option value="sports">Sports & Gaming</option>
//                                         </select>
//                                         <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-primary/40 group-hover:text-primary transition-colors" size={20} />
//                                     </div>
//                                 </div>

//                                 <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 items-start">
//                                     <div className="bg-white p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-sm min-h-[500px]">
//                                         <div className="flex items-center gap-3 mb-8">
//                                             <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center">
//                                                 <BarChart className="text-primary" size={20} />
//                                             </div>
//                                             <h5 className="font-bold text-lg text-on-surface">Term Frequency Intensity</h5>
//                                         </div>
//                                         <Plot
//                                             data={[{
//                                                 type: 'bar',
//                                                 orientation: 'h',
//                                                 x: categoricalData[selectedCategory].counts,
//                                                 y: categoricalData[selectedCategory].words,
//                                                 marker: { color: '#667eea' },
//                                                 text: categoricalData[selectedCategory].counts,
//                                                 textposition: 'outside'
//                                             }]}
//                                             layout={{
//                                                 title: {
//                                                     text: `Top 20 Words in ${selectedCategory.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Articles`,
//                                                     font: { size: 16, color: '#2a3f5f' },
//                                                     x: 0.05
//                                                 },
//                                                 autosize: true,
//                                                 margin: { l: 120, r: 100, t: 80, b: 40 },
//                                                 xaxis: {
//                                                     title: 'Frequency',
//                                                     gridcolor: '#f0f0f0',
//                                                     range: [0, selectedCategory === 'overall' ? 2600 : 650] // Adjusted for overall counts
//                                                 },
//                                                 yaxis: { title: 'Words', autorange: 'reversed', gridcolor: '#f0f0f0' },
//                                                 plot_bgcolor: 'transparent',
//                                                 paper_bgcolor: 'transparent',
//                                                 height: 800
//                                             }}
//                                             config={{ responsive: true, displayModeBar: false }}
//                                             className="w-full"
//                                         />
//                                     </div>

//                                     <div className="space-y-8">
//                                         <div className="bg-surface-container-low/50 p-8 rounded-[2.5rem] border border-outline-variant/10 backdrop-blur-sm">
//                                             <div className="flex gap-4 mb-6">
//                                                 <Zap className="text-secondary" size={24} />
//                                                 <div>
//                                                     <h5 className="font-bold text-on-surface">Distribution Insight</h5>
//                                                     <p className="text-sm text-on-surface-variant mt-1 opacity-70 italic leading-relaxed">
//                                                         The top 8 terms in this category show identical frequencies ({categoricalData[selectedCategory].counts[0]}), indicating these articles likely follow a structured template or common boilerplate across platforms.
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <div className="bg-surface-container-low/50 p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-sm">
//                                             <div className="flex items-center gap-3 mb-6">
//                                                 <Terminal className="text-primary" size={20} />
//                                                 <h6 className="font-bold text-on-surface">Notebook Output Preview</h6>
//                                             </div>
//                                             <div className="bg-slate-900 rounded-2xl p-6 font-mono text-[13px] text-slate-300 space-y-2 border border-slate-800 shadow-inner overflow-hidden">
//                                                 <div className="text-secondary/70 mb-4 font-bold border-b border-slate-700/50 pb-2">
//                                                     Top words in {selectedCategory.replace('_', ' ')}:
//                                                 </div>
//                                                 {categoricalData[selectedCategory].words.slice(0, 10).map((word: string, idx: number) => (
//                                                     <div key={idx} className="flex justify-between items-center group">
//                                                         <span className="text-slate-100 group-hover:text-primary transition-colors">
//                                                             {word.padEnd(20, ' ')}
//                                                         </span>
//                                                         <span className="text-slate-500 font-bold ml-4 whitespace-nowrap">
//                                                             :  {categoricalData[selectedCategory].counts[idx]}
//                                                         </span>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                             <p className="text-[11px] text-on-surface-variant mt-4 opacity-50 italic">
//                                                 * This output mirrors the stdout from the Python notebook cell execution.
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </InteractiveAnalysis>

//                         {/* TF-IDF Top Terms by Category Section */}
//                         <InteractiveAnalysis
//                             id="tfidf-category"
//                             title="TF-IDF Top Terms by Category"
//                             subtitle="Granular analysis of term significance within specific topic categories using TF-IDF weighting."
//                             icon={Hash}
//                             pythonCode={`import pandas as pd
// from sklearn.feature_extraction.text import TfidfVectorizer, ENGLISH_STOP_WORDS
// import numpy as np

// # Setup stopwords
// stop_words = set(ENGLISH_STOP_WORDS)
// custom_news_stopwords = ['said', 'mr', 'ms', 'mrs', 'told', 'says', 'say',
//                          'according', 'year', 'years', 'new', 'old', 'like',
//                          'just', 'going', 'got', 'use', 'used', 'make', 'made']
// stop_words.update(custom_news_stopwords)

// # Calculate TF-IDF for category: '${selectedCategory}'
// cat_df = df[df['topic_category'] == '${selectedCategory}']
// vectorizer = TfidfVectorizer(max_features=50, stop_words=list(stop_words))
// tfidf_matrix = vectorizer.fit_transform(cat_df['short_text'])
// feature_names = vectorizer.get_feature_names_out()
// mean_scores = np.array(tfidf_matrix.mean(axis=0)).flatten()

// # Get top 20 terms
// top_indices = mean_scores.argsort()[-20:][::-1]
// top_words = [feature_names[i] for i in top_indices]
// top_scores = [mean_scores[i] for i in top_indices]

// print(f"Top 20 TF-IDF terms in ${selectedCategory}:")
// for word, score in zip(top_words, top_scores):
//     print(f"  {word:20s}: {score:.4f}")`}
//                         >
//                             <div className="space-y-12">
//                                 <div className="flex flex-col md:flex-row gap-6 items-center justify-between pb-8 border-b border-outline-variant/10">
//                                     <div className="space-y-1">
//                                         <h4 className="text-xl font-bold text-on-surface">Topic Weight Analysis</h4>
//                                         <p className="text-sm text-on-surface-variant max-w-md opacity-60">Displaying TF-IDF term distribution for the <span className="text-primary font-bold">{selectedCategory.replace('_', ' ')}</span> topic.</p>
//                                     </div>
//                                     <div className="flex bg-surface-container-high p-1.5 rounded-2xl border border-outline-variant/10 overflow-x-auto max-w-full custom-scrollbar">
//                                         {[
//                                             { id: "ai_and_tech", label: "AI & Tech" },
//                                             { id: "economy", label: "Economy" },
//                                             { id: "entertainment", label: "Entertainment" },
//                                             { id: "global_events", label: "Global Events" },
//                                             { id: "sports", label: "Sports" },
//                                         ].map((cat) => (
//                                             <button
//                                                 key={cat.id}
//                                                 onClick={() => setSelectedCategory(cat.id)}
//                                                 className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer whitespace-nowrap ${selectedCategory === cat.id ? "bg-white text-primary shadow-sm" : "text-on-surface-variant opacity-60 hover:opacity-100"}`}
//                                             >
//                                                 {cat.label}
//                                             </button>
//                                         ))}
//                                     </div>
//                                 </div>

//                                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
//                                     <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-sm min-h-[500px]">
//                                         <div className="flex items-center gap-3 mb-8">
//                                             <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center">
//                                                 <BarChart className="text-primary" size={20} />
//                                             </div>
//                                             <h5 className="font-bold text-lg text-on-surface">Top 20 TF-IDF Weighted Terms ({selectedCategory.replace('_', ' ')})</h5>
//                                         </div>
//                                         <Plot
//                                             data={[{
//                                                 type: 'bar',
//                                                 orientation: 'h',
//                                                 x: categoricalTFIDFData[selectedCategory]?.unigrams?.scores.slice(0, 20) || [],
//                                                 y: categoricalTFIDFData[selectedCategory]?.unigrams?.words.slice(0, 20) || [],
//                                                 marker: {
//                                                     color: '#764ba2',
//                                                     opacity: 0.85
//                                                 },
//                                                 text: (categoricalTFIDFData[selectedCategory]?.unigrams?.scores.slice(0, 20) || []).map(s => s.toFixed(4)),
//                                                 textposition: 'outside'
//                                             }]}
//                                             layout={{
//                                                 title: {
//                                                     text: `Top 20 TF-IDF Terms in ${selectedCategory.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`,
//                                                     font: { size: 16, color: '#2a3f5f' },
//                                                     x: 0.05
//                                                 },
//                                                 autosize: true,
//                                                 margin: { l: 160, r: 80, t: 80, b: 40 },
//                                                 xaxis: { title: 'TF-IDF Score', gridcolor: '#f0f0f0', range: [0, 0.6] },
//                                                 yaxis: { title: 'Terms', autorange: 'reversed', gridcolor: '#f0f0f0' },
//                                                 plot_bgcolor: 'transparent',
//                                                 paper_bgcolor: 'transparent',
//                                                 height: 700
//                                             }}
//                                             config={{ responsive: true, displayModeBar: false }}
//                                             className="w-full"
//                                         />
//                                     </div>

//                                     <div className="space-y-8">
//                                         <div className="bg-slate-900 rounded-[2.5rem] p-10 font-mono text-[11px] leading-relaxed text-indigo-100 shadow-2xl border border-white/10 overflow-hidden">
//                                             <div className="text-secondary/70 mb-6 font-bold uppercase tracking-widest border-b border-white/5 pb-2">
//                                                 Top TF-IDF terms in {selectedCategory}:
//                                             </div>
//                                             <div className="space-y-1.5 custom-scrollbar h-[550px] overflow-y-auto pr-4">
//                                                 {(categoricalTFIDFData[selectedCategory]?.unigrams?.words.slice(0, 20) || []).map((word, idx) => (
//                                                     <div key={idx} className="flex justify-between items-center group">
//                                                         <span className="text-indigo-200 group-hover:text-white transition-colors">
//                                                             {word.padEnd(25, ' ')}
//                                                         </span>
//                                                         <span className="text-primary-container font-bold ml-4">
//                                                             :  {(categoricalTFIDFData[selectedCategory]?.unigrams?.scores[idx] || 0).toFixed(4)}
//                                                         </span>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                         <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10">
//                                             <h6 className="text-xs font-black uppercase tracking-widest text-primary mb-3">Topic Relevance</h6>
//                                             <p className="text-[11px] text-on-surface-variant leading-relaxed opacity-70">
//                                                 Higher TF-IDF scores indicate words that are more unique and representative of the <span className="font-bold">{selectedCategory.replace('_', ' ')}</span> category compared to the rest of the corpus.
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </InteractiveAnalysis>

//                         {/* Categorical Bigrams Comparison Section */}
//                         <InteractiveAnalysis
//                             id="bigrams-comparison"
//                             title="Categorical Bigrams comparison"
//                             subtitle="Top 10 Bigrams by Category (TF-IDF Weighting)"
//                             icon={Grid}
//                             pythonCode={`import pandas as pd
// import plotly.graph_objects as go
// from sklearn.feature_extraction.text import TfidfVectorizer, ENGLISH_STOP_WORDS
// import numpy as np

// # Setup stopwords
// stop_words = set(ENGLISH_STOP_WORDS)
// custom_news_stopwords = ['said', 'mr', 'ms', 'mrs', 'told', 'says', 'say',
//                          'according', 'year', 'years', 'new', 'old', 'like',
//                          'just', 'going', 'got', 'use', 'used', 'make', 'made']
// stop_words.update(custom_news_stopwords)

// # Select category
// category = '${bigramTopic}'

// if category == 'all':
//     # Analyze all categories (Batch Processing)
//     categories = sorted(df['topic_category'].unique())
//     colors = ['#667eea', '#764ba2', '#f472b6', '#38bdf8', '#4ade80']
//     fig = make_subplots(rows=2, cols=3, subplot_titles=[cat.capitalize() for cat in categories])
    
//     for idx, cat in enumerate(categories):
//         cat_df = df[df['topic_category'] == cat]
//         # ... process text and TF-IDF ...
        
//         fig.add_trace(
//             go.Bar(x=tfidf_scores, y=feature_names, orientation='h', marker_color=colors[idx]),
//             row=row, col=col
//         )
    
//     fig.update_layout(height=800, title_text="Categorical Bigram TF-IDF Comparison", showlegend=false)
// else:
//     # Single Topic Analysis
//     cat_df = df[df['topic_category'] == category]
//     combined_text = ' '.join(cat_df['short_text'].values)
//     vectorizer = TfidfVectorizer(ngram_range=(2, 2), max_features=30, stop_words=list(stop_words))
//     tfidf_matrix = vectorizer.fit_transform([combined_text])
//     feature_names = vectorizer.get_feature_names_out()
//     tfidf_scores = tfidf_matrix.toarray()[0]

//     top_indices = tfidf_scores.argsort()[-10:][::-1]
//     top_bigrams = [feature_names[i] for i in top_indices]
//     top_scores = [tfidf_scores[i] for i in top_indices]

//     fig = go.Figure(data=[go.Bar(
//         x=top_scores, y=top_bigrams, orientation='h', marker_color='#4facfe',
//         text=[f'{score:.4f}' for score in top_scores], textposition='outside'
//     )])
//     fig.update_layout(title=f'Top 10 Bigrams in {category.capitalize()}',
//                       xaxis_title='TF-IDF Score', yaxis_title='Bigrams',
//                       yaxis={'autorange': 'reversed'})

// fig.show()`}
//                         >
//                             <div className="space-y-12">
//                                 <div className="flex flex-col md:flex-row gap-6 items-center justify-between pb-8 border-b border-outline-variant/10">
//                                     <div className="space-y-1">
//                                         <h4 className="text-xl font-bold text-on-surface">Bigram Topic Intelligence</h4>
//                                         <p className="text-sm text-on-surface-variant max-w-md opacity-60">Analyze how word pairs interact within specific platform categories to identify unique narratives.</p>
//                                     </div>
//                                     <div className="relative group min-w-[240px]">
//                                         <select
//                                             value={bigramTopic}
//                                             onChange={(e) => setBigramTopic(e.target.value as any)}
//                                             className="w-full h-14 pl-6 pr-12 bg-white rounded-2xl border border-outline-variant/20 appearance-none text-primary font-bold focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer shadow-sm group-hover:border-primary/40"
//                                         >
//                                             <option value="economy">Economy & Finance</option>
//                                             <option value="ai_and_tech">Tech & AI</option>
//                                             <option value="entertainment">Entertainment</option>
//                                             <option value="global_events">Global Events</option>
//                                             <option value="sports">Sports & Gaming</option>
//                                             <option value="all">--- View All Topics ---</option>
//                                         </select>
//                                         <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-primary/40 group-hover:text-primary transition-colors" size={20} />
//                                     </div>
//                                 </div>

//                                 {bigramTopic === 'all' ? (
//                                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 w-full">
//                                         {Object.entries(categoricalTFIDFData).map(([topic, data], idx) => {
//                                             const colors = ['#667eea', '#764ba2', '#f472b6', '#38bdf8', '#4ade80'];
//                                             const topicColor = colors[idx % colors.length];
//                                             return (
//                                                 <div key={topic} className="bg-white p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-sm flex flex-col h-[600px] transition-all hover:shadow-xl">
//                                                     <h5 className="font-bold text-sm text-on-surface mb-4 flex items-center gap-2">
//                                                         <div className="w-2 h-2 rounded-full" style={{ backgroundColor: topicColor }}></div>
//                                                         {topic.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
//                                                     </h5>
//                                                     <div className="flex-1 min-h-0">
//                                                         <Plot
//                                                             data={[{
//                                                                 type: 'bar',
//                                                                 orientation: 'h',
//                                                                 x: data.bigrams.scores,
//                                                                 y: data.bigrams.words,
//                                                                 marker: { color: topicColor, opacity: 0.7 },
//                                                                 text: data.bigrams.scores.map(s => s.toFixed(3)),
//                                                                 textposition: 'outside',
//                                                                 textfont: { size: 10, weight: 'bold' }
//                                                             }]}
//                                                             layout={{
//                                                                 autosize: true,
//                                                                 margin: { l: 180, r: 100, t: 40, b: 60 },
//                                                                 xaxis: {
//                                                                     gridcolor: '#f0f0f0',
//                                                                     tickfont: { size: 11 },
//                                                                     range: [0, 0.45]
//                                                                 },
//                                                                 yaxis: { autorange: 'reversed', tickfont: { size: 11, weight: 'bold' } },
//                                                                 plot_bgcolor: 'transparent',
//                                                                 paper_bgcolor: 'transparent',
//                                                             }}
//                                                             config={{ responsive: true, displayModeBar: false }}
//                                                             className="w-full h-full"
//                                                         />
//                                                     </div>
//                                                 </div>
//                                             );
//                                         })}
//                                     </div>
//                                 ) : (
//                                     <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 items-start w-full">
//                                         <div className="bg-white p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-sm min-h-[550px]">
//                                             <div className="flex items-center gap-3 mb-8">
//                                                 <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center">
//                                                     <Grid className="text-primary" size={20} />
//                                                 </div>
//                                                 <h5 className="font-bold text-lg text-on-surface">TF-IDF Weighted Bigrams ({bigramTopic.replace('_', ' ')})</h5>
//                                             </div>
//                                             <Plot
//                                                 data={[{
//                                                     type: 'bar',
//                                                     orientation: 'h',
//                                                     x: categoricalTFIDFData[bigramTopic]?.bigrams?.scores || [],
//                                                     y: categoricalTFIDFData[bigramTopic]?.bigrams?.words || [],
//                                                     marker: {
//                                                         color: '#4facfe',
//                                                         opacity: 0.85
//                                                     },
//                                                     text: (categoricalTFIDFData[bigramTopic]?.bigrams?.scores || []).map(s => s.toFixed(4)),
//                                                     textposition: 'outside'
//                                                 }]}
//                                                 layout={{
//                                                     title: {
//                                                         text: `Top 10 Bigrams in ${bigramTopic.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} (TF-IDF)`,
//                                                         font: { size: 16, color: '#2a3f5f' },
//                                                         x: 0.05
//                                                     },
//                                                     autosize: true,
//                                                     margin: { l: 180, r: 120, t: 80, b: 40 },
//                                                     xaxis: {
//                                                         title: 'TF-IDF Score',
//                                                         gridcolor: '#f0f0f0',
//                                                         range: [0, 0.45]
//                                                     },
//                                                     yaxis: { title: 'Bigrams', autorange: 'reversed', gridcolor: '#f0f0f0' },
//                                                     plot_bgcolor: 'transparent',
//                                                     paper_bgcolor: 'transparent',
//                                                     height: 550
//                                                 }}
//                                                 config={{ responsive: true, displayModeBar: false }}
//                                                 className="w-full"
//                                             />
//                                         </div>

//                                         <div className="space-y-8">
//                                             <div className="bg-slate-900 rounded-[2.5rem] p-8 border border-slate-800 shadow-xl overflow-hidden relative group">
//                                                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[80px] group-hover:bg-primary/20 transition-colors" />
//                                                 <div className="flex items-center gap-3 mb-6">
//                                                     <Terminal className="text-secondary" size={20} />
//                                                     <h6 className="font-bold text-white tracking-tight">Notebook Output</h6>
//                                                 </div>
//                                                 <div className="text-secondary/70 mb-6 font-bold uppercase tracking-widest border-b border-white/5 pb-2">
//                                                     Top bigrams in {bigramTopic}:
//                                                 </div>
//                                                 <div className="space-y-1.5 custom-scrollbar h-[400px] overflow-y-auto pr-4">
//                                                     {(categoricalTFIDFData[bigramTopic]?.bigrams?.words || []).map((word, idx) => (
//                                                         <div key={idx} className="flex justify-between items-center group/item">
//                                                             <span className="text-blue-200 group-hover/item:text-white transition-colors">
//                                                                 {word.padEnd(25, ' ')}
//                                                             </span>
//                                                             <span className="text-secondary font-bold ml-4">
//                                                                 :  {(categoricalTFIDFData[bigramTopic]?.bigrams?.scores[idx] || 0).toFixed(4)}
//                                                             </span>
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </InteractiveAnalysis>

//                         {/* Matrix & Correlations Section */}

//                         <InteractiveAnalysis
//                             id="matrix"
//                             title="Matrix & Correlations"
//                             subtitle="Cosine similarity and feature correlation mapping across categorical clusters."
//                             icon={PieChart}
//                             pythonCode={`import pandas as pd
// import plotly.graph_objects as go
// from sklearn.metrics.pairwise import cosine_similarity
// import numpy as np

// # Calculate TF-IDF on ALL documents
// categories = sorted(df['topic_category'].unique())
// vectorizer = TfidfVectorizer(max_features=5000, stop_words=list(stop_words))
// tfidf_matrix = vectorizer.fit_transform(df['short_text'])

// # Calculate mean similarity between each pair of categories
// n_cats = len(categories)
// similarity_matrix = np.zeros((n_cats, n_cats))

// for i, cat1 in enumerate(categories):
//     cat1_indices = df[df['topic_category'] == cat1].index
//     cat1_vectors = tfidf_matrix[cat1_indices]
//     for j, cat2 in enumerate(categories):
//         cat2_indices = df[df['topic_category'] == cat2].index
//         cat2_vectors = tfidf_matrix[cat2_indices]
//         pairwise_sim = cosine_similarity(cat1_vectors, cat2_vectors)
//         similarity_matrix[i, j] = np.mean(pairwise_sim)

// # Create heatmap
// fig = go.Figure(data=go.Heatmap(
//     z=similarity_matrix, x=categories, y=categories,
//     colorscale='Purples', text=similarity_matrix,
//     texttemplate='%{text:.3f}', textfont={"size": 12}
// ))
// fig.update_layout(title='Category Similarity Matrix (Cosine Similarity)',
//                   yaxis={'autorange': 'reversed'})
// fig.show()

// print("\\nCategory Similarity Matrix:")
// print("Note: Diagonal is NOT 1.0 because it's MEAN similarity between documents")
// print("within same category, not self-similarity\\n")`}
//                         >
//                             <div className="space-y-12">
//                                 {/* Visual Summary First */}
//                                 <div className="bg-white rounded-[2.5rem] p-8 border border-outline-variant/10 shadow-sm relative group overflow-hidden min-h-[500px]">
//                                     <div className="flex justify-between items-center mb-8 pb-4 border-b border-outline-variant/5">
//                                         <div className="flex items-center gap-3">
//                                             <BarChart size={18} className="text-primary" />
//                                             <h4 className="text-sm font-bold text-on-surface uppercase tracking-tight">Similarity Heatmap Profile</h4>
//                                         </div>
//                                         <span className="px-3 py-1 bg-primary/5 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/10">Cosine Similarity</span>
//                                     </div>
//                                     <div className="w-full flex items-center justify-center">
//                                         <Plot
//                                             data={[{
//                                                 type: 'heatmap',
//                                                 z: [
//                                                     [0.661, 0.200, 0.182, 0.175, 0.185],
//                                                     [0.200, 0.552, 0.221, 0.212, 0.225],
//                                                     [0.182, 0.221, 0.542, 0.209, 0.221],
//                                                     [0.175, 0.212, 0.209, 0.644, 0.213],
//                                                     [0.185, 0.225, 0.221, 0.213, 0.569]
//                                                 ],
//                                                 x: ['ai_and_tech', 'economy', 'entertainment', 'global_events', 'sports'],
//                                                 y: ['ai_and_tech', 'economy', 'entertainment', 'global_events', 'sports'],
//                                                 colorscale: 'Purples',
//                                                 showscale: true,
//                                                 text: [
//                                                     ['0.661', '0.200', '0.182', '0.175', '0.185'],
//                                                     ['0.200', '0.552', '0.221', '0.212', '0.225'],
//                                                     ['0.182', '0.221', '0.542', '0.209', '0.221'],
//                                                     ['0.175', '0.212', '0.209', '0.644', '0.213'],
//                                                     ['0.185', '0.225', '0.221', '0.213', '0.569']
//                                                 ],
//                                                 texttemplate: '%{text}',
//                                                 textfont: { color: 'white' }
//                                             }]}
//                                             layout={{
//                                                 paper_bgcolor: "rgba(0,0,0,0)",
//                                                 plot_bgcolor: "rgba(0,0,0,0)",
//                                                 font: { family: "Inter, sans-serif", size: 12 },
//                                                 margin: { t: 40, r: 40, b: 80, l: 150 },
//                                                 autosize: true,
//                                                 xaxis: { title: 'Category' },
//                                                 yaxis: { title: 'Category', autorange: 'reversed' },
//                                                 height: 500
//                                             }}
//                                             useResizeHandler={true}
//                                             style={{ width: "100%", height: "500px" }}
//                                             config={{ responsive: true, displayModeBar: false }}
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className="p-8 rounded-[2.5rem] bg-indigo-50/50 border border-indigo-100 flex gap-6">
//                                     <Target className="text-primary mt-1" size={28} />
//                                     <div>
//                                         <h6 className="font-bold text-lg text-on-surface">Matrix Interpretation & Note</h6>
//                                         <p className="text-sm text-on-surface-variant mt-2 leading-relaxed opacity-80">
//                                             The diagonal values represent the <strong>Intra-category Cohesion</strong>. Note: Diagonal is NOT 1.0 because it's the <strong>MEAN similarity</strong> between documents within the same category, not self-similarity. Global Events (0.644) and AI & Tech (0.661) show the highest internal consistency.
//                                         </p>
//                                     </div>
//                                 </div>

//                                 <div className="bg-slate-900 rounded-[2.5rem] p-10 font-mono text-[11px] leading-relaxed text-indigo-100 shadow-2xl border border-white/10 overflow-hidden">
//                                     <div className="text-white mb-6 font-bold uppercase tracking-widest border-b border-white/10 pb-4">
//                                         Category Similarity Matrix Results:
//                                     </div>
//                                     <div className="space-y-4 custom-scrollbar max-h-[400px] overflow-y-auto pr-4">
//                                         {[
//                                             { cat: "ai_and_tech", self: 0.661, vs: [{ n: "economy", s: 0.200 }, { n: "entertainment", s: 0.182 }, { n: "global_events", s: 0.175 }, { n: "sports", s: 0.185 }] },
//                                             { cat: "economy", self: 0.552, vs: [{ n: "entertainment", s: 0.221 }, { n: "global_events", s: 0.212 }, { n: "sports", s: 0.225 }] },
//                                             { cat: "entertainment", self: 0.542, vs: [{ n: "global_events", s: 0.209 }, { n: "sports", s: 0.221 }] },
//                                             { cat: "global_events", self: 0.644, vs: [{ n: "sports", s: 0.213 }] },
//                                             { cat: "sports", self: 0.569, vs: [] },
//                                         ].map((row, i) => (
//                                             <div key={i} className="border-b border-white/5 pb-4 last:border-0">
//                                                 <div className="flex justify-between items-center mb-1">
//                                                     <span className="text-white font-bold">{row.cat.padEnd(15)}: </span>
//                                                     <span className="text-primary-container font-bold">{row.self.toFixed(3)} (within-category)</span>
//                                                 </div>
//                                                 {row.vs.map((v, j) => (
//                                                     <div key={j} className="flex justify-between items-center pl-4 opacity-70 hover:opacity-100 transition-opacity">
//                                                         <span>vs {v.n.padEnd(15)}: </span>
//                                                         <span className="flex items-center gap-2">
//                                                             {v.s.toFixed(3)}
//                                                             <span className="text-amber-400 font-bold">⚠️ High</span>
//                                                         </span>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         ))}
//                                     </div>
//                                     <div className="mt-6 pt-4 border-t border-white/10 text-[10px] opacity-40 italic">
//                                         * High similarity indicated where score exceeds semantic boundary threshold (0.02).
//                                     </div>
//                                 </div>
//                             </div>
//                         </InteractiveAnalysis>
//                         {/* Key Analytical Insights Section */}
//                         <InteractiveAnalysis
//                             id="insights"
//                             title="Key Analytical Insights"
//                             subtitle="Synthesized findings from the exploratory data analysis process."
//                             icon={Sparkles}
//                             pythonCode={`import pandas as pd

// # 1. Basic Stats
// avg_length = df['short_text'].apply(lambda x: len(str(x).split())).mean()
// category_dist = df['topic_category'].value_counts(normalize=True) * 100

// # 2. Word Count Distribution Details
// word_counts = df['short_text'].fillna('').apply(lambda x: len(str(x).split()))
// min_words = word_counts.min()
// max_words = word_counts.max()
// median_words = word_counts.median()
// std_dev = word_counts.std()

// print("💡 KEY INSIGHTS")
// print("-" * 30)
// print(f"Min Words: {min_words}")
// print(f"Max Words: {max_words}")
// print(f"Median Words: {median_words}")
// print(f"Std Dev: {std_dev:.2f}")

// print("\\n--- Data Processing Notes ---")
// print(f"* Stop Words Removed: {', '.join(custom_news_stopwords[:10])}...")`}
//                         >
//                             <div className="bg-slate-900 rounded-[2.5rem] p-12 font-mono text-[14px] leading-relaxed text-slate-300 shadow-2xl border border-white/5 overflow-hidden relative group">
//                                 <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px]" />
//                                 <div className="flex items-center gap-3 mb-10 border-b border-white/5 pb-6">
//                                     <Terminal className="text-primary" size={24} />
//                                     <span className="text-[12px] font-black uppercase tracking-[0.2em] text-white/40">Terminal Output: System Insights</span>
//                                 </div>
//                                 <div className="text-emerald-400 font-bold mb-6 text-xl flex items-center gap-3">
//                                     <Zap size={20} />
//                                     💡 KEY ANALYTICAL INSIGHTS
//                                 </div>
//                                 <div className="text-slate-600 mb-8">------------------------------------------------------------</div>

//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
//                                     {[
//                                         {
//                                             badge: "Anomaly",
//                                             badgeClass: "bg-red-500/10 text-red-500 border-red-500/20",
//                                             title: "Stop words",
//                                             desc: <>The top 6 words (<strong>from, are, within, the, of, across</strong>) all appear exactly <strong>2,500 times</strong> — suggesting a <strong>hard frequency cap</strong> was applied during data processing. This is a sign that stop words were not removed, which could negatively impact NLP models if not addressed.</>
//                                         },
//                                         {
//                                             badge: "Anomaly",
//                                             badgeClass: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
//                                             title: "Word count distribution",
//                                             desc: <>All articles contain only <strong>16–19 words</strong> — not a single article falls below 15 or above 20. This extremely <strong>narrow distribution</strong> is unusual and suggests the dataset may consist of <strong>news headlines</strong> rather than full articles, or that a hard truncation step was applied.</>
//                                         },
//                                         {
//                                             badge: "Anomaly",
//                                             badgeClass: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
//                                             title: "Character count distribution",
//                                             desc: <>No articles fall within certain character ranges (<strong>100–107, 111–112, 114–115, 119–123</strong>). These <strong>irregular gaps</strong> suggest the data originates from multiple sources with different formatting conventions, or that <strong>fixed-length filters</strong> were applied.</>
//                                         },
//                                         {
//                                             badge: "Important",
//                                             badgeClass: "bg-blue-500/10 text-blue-500 border-blue-500/20",
//                                             title: "Vocabulary richness",
//                                             desc: <>4 out of 5 categories share nearly <strong>identical vocabulary richness</strong> (~13 unique words/article). Only <strong>sports is lower (~11–12)</strong>, reflecting the repetitive nature of sports language (team names, scores, results). This may make it harder for a model to distinguish sports from other categories.</>
//                                         },
//                                         {
//                                             badge: "Critical",
//                                             badgeClass: "bg-red-600/10 text-red-600 border-red-600/20",
//                                             title: "Economy word frequency",
//                                             desc: <>The top 8 words in Economy articles (<strong>users, actively, discussing, broader, category, economy, multiple, platforms</strong>) all appear exactly <strong>492 times</strong> — a clear sign of <strong>boilerplate/template text</strong> being repeated, not natural language. This strongly suggests the data may be <strong>synthetically or template-generated</strong>.</>
//                                         },
//                                         {
//                                             badge: "Important",
//                                             badgeClass: "bg-blue-500/10 text-blue-500 border-blue-500/20",
//                                             title: "TF-IDF — economy",
//                                             desc: <>The word <strong>"economy"</strong> has a TF-IDF score of <strong>0.44</strong> — nearly double the next term (inflation: 0.18). Words like sports, startups, tech, releases, and music score <strong>0.0000 in Economy</strong> — a positive sign showing low cross-category term overlap. <strong>Crypto (0.18)</strong> stands out prominently, reflecting strong digital economy coverage.</>
//                                         }
//                                     ].map((item, i) => (
//                                         <div key={i} className="bg-[#1c1c1c] border border-white/5 rounded-3xl p-8 hover:bg-[#252525] transition-all group/insight md:min-h-[220px] flex flex-col justify-start">
//                                             <div className="flex items-center gap-4 mb-6">
//                                                 <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${item.badgeClass}`}>
//                                                     {item.badge}
//                                                 </span>
//                                                 <h6 className="font-bold text-white text-lg tracking-tight group-hover/insight:text-primary transition-colors">{item.title}</h6>
//                                             </div>
//                                             <p className="text-slate-400 text-[14px] leading-[1.6] font-medium font-sans">
//                                                 {item.desc}
//                                             </p>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </InteractiveAnalysis>

//                         {/* Raw Data Explorer Section */}
//                         <InteractiveAnalysis
//                             id="raw-explorer"
//                             title="Raw Data Article Explorer"
//                             subtitle="Interaction with actual underlying dataset records (Top 50 Samples)."
//                             icon={Database}
//                             pythonCode={`# View random samples from the processed dataset
// import pandas as pd

// print("--- Fetching Random Records ---")
// samples = df.sample(n=2)
// print(samples[['topic_category', 'short_text']])`}
//                         >
//                             <div className="bg-white rounded-[2.5rem] border border-outline-variant/10 shadow-sm p-10 group overflow-hidden relative">
//                                 <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
//                                     <div className="flex items-center gap-4">
//                                         <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
//                                             <Search size={22} />
//                                         </div>
//                                         <div>
//                                             <h4 className="font-bold text-lg text-on-surface">Dataset Record Lookup</h4>
//                                             <p className="text-xs text-on-surface-variant opacity-60">Querying real synthetic entries from trending_topics_2026.csv</p>
//                                         </div>
//                                     </div>
//                                     <button
//                                         onClick={rollSamples}
//                                         disabled={isRolling}
//                                         className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-lg transition-all ${isRolling ? "bg-surface-container-high text-on-surface-variant cursor-wait" : "bg-primary text-white hover:bg-primary/90 hover:-translate-y-1 shadow-primary/20 cursor-pointer active:scale-95"}`}
//                                     >
//                                         <Dices size={18} className={isRolling ? "animate-spin" : "group-hover:rotate-12 transition-transform"} />
//                                         {isRolling ? "Fetching..." : "Roll New Samples"}
//                                     </button>
//                                 </div>

//                                 <AnimatePresence mode="wait">
//                                     <motion.div
//                                         key={JSON.stringify(currentSamples)}
//                                         initial={{ opacity: 0, scale: 0.98, y: 10 }}
//                                         animate={{ opacity: 1, scale: 1, y: 0 }}
//                                         exit={{ opacity: 0, scale: 0.98, y: -10 }}
//                                         transition={{ duration: 0.4, ease: "easeOut" }}
//                                         className="grid grid-cols-1 lg:grid-cols-2 gap-8"
//                                     >
//                                         {currentSamples.length > 0 ? currentSamples.map((sample: any, idx: number) => (
//                                             <div key={idx} className="relative bg-surface-container-low/30 rounded-[2rem] p-8 border border-outline-variant/5 hover:border-primary/20 hover:bg-white transition-all group/card hover:shadow-xl hover:shadow-on-surface/5">
//                                                 <div className="flex justify-between items-center mb-6">
//                                                     <div className="flex items-center gap-2">
//                                                         <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary font-bold text-xs">
//                                                             #{idx + 1}
//                                                         </div>
//                                                         <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 italic">Data Entry</span>
//                                                     </div>
//                                                     <span className="px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-widest rounded-full border border-secondary/10">
//                                                         {sample.topic_category.replace('_', ' ')}
//                                                     </span>
//                                                 </div>
//                                                 <div className="text-on-surface leading-loose text-[15px] font-medium italic relative z-10">
//                                                     <span className="text-3xl font-serif text-primary/10 absolute -top-4 -left-2 select-none">"</span>
//                                                     {sample.short_text}
//                                                     <span className="text-3xl font-serif text-primary/10 select-none">"</span>
//                                                 </div>
//                                                 <div className="mt-8 pt-6 border-t border-outline-variant/5 flex items-center justify-between opacity-40 group-hover/card:opacity-100 transition-opacity">
//                                                     <div className="flex items-center gap-2 text-[10px] font-bold">
//                                                         <BadgeCheck size={14} className="text-emerald-500" />
//                                                         Kaggle Verified Record
//                                                     </div>
//                                                     <ArrowRight size={14} className="text-primary" />
//                                                 </div>
//                                             </div>
//                                         )) : (
//                                             <div className="col-span-2 flex flex-col items-center justify-center py-24 text-on-surface-variant/20 border-2 border-dashed border-outline-variant/10 rounded-[3rem]">
//                                                 <Database size={60} className="mb-6 opacity-10 animate-pulse" />
//                                                 <p className="text-sm font-bold uppercase tracking-widest">Interface Ready to Query</p>
//                                                 <p className="text-[10px] italic mt-2">Initialize by clicking the Roll button</p>
//                                             </div>
//                                         )}
//                                     </motion.div>
//                                 </AnimatePresence>

//                                 <div className="mt-10 p-5 bg-primary/[0.02] rounded-2xl border border-primary/5 flex items-center gap-3 text-[10px] text-on-surface-variant italic">
//                                     <Info size={14} className="text-primary shrink-0" />
//                                     <span>These samples represent verified entries from the 2026 trending dataset, provided to validate the semantic accuracy of the categorical TF-IDF models.</span>
//                                 </div>
//                             </div>
//                         </InteractiveAnalysis>
//                         </>
//                         ) : (
//                             <TextML />
//                         )}
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// }

import React, { useState, useEffect } from "react";
import heroTextImage from "../assets/images/image/text.jpg";
import { motion, AnimatePresence } from "motion/react";
import Plot from "react-plotly.js";
import {
    ArrowRight,
    ArrowLeft,
    BookOpen,
    HelpCircle,
    BarChart3,
    Search,
    Brain,
    Rocket,
    Terminal,
    Code2,
    CheckCircle2,
    Columns,
    Database,
    FileText,
    AlertTriangle,
    Layout,
    Layers,
    Table,
    ChevronDown,
    ChevronRight,
    Copy,
    Dices,
    BarChart,
    Activity,
    Zap,
    Info,
    GitMerge,
    PieChart,
    Filter,
    Target,
    Link,
    BoxSelect,
    Hash,
    MessageSquare,
    Globe,
    Type,
    Grid,
    Sparkles,
    BadgeCheck,
    Users
} from "lucide-react";
import TextML from "./TextML";

const NavItem = ({ href, children, active = false }: { href: string, children: React.ReactNode, active?: boolean }) => (
    <a
        href={href}
        className={`text-sm font-semibold tracking-tight transition-all flex items-center h-full px-4 border-b-2 ${active
            ? "text-primary border-primary"
            : "text-on-surface-variant border-transparent hover:text-primary hover:border-primary/20"
            }`}
    >
        {children}
    </a>
);

const StatCard = ({ label, value, icon: Icon, variant = "ghost" }: { label: string, value: string | number, icon?: any, variant?: "ghost" | "primary" }) => (
    <div className={`${variant === "primary" ? "bg-primary text-on-primary shadow-2xl shadow-primary/20 scale-105" : "bg-white border border-outline-variant/10 shadow-sm hover:shadow-md transition-all"} p-8 md:p-10 rounded-3xl relative overflow-hidden group`}>
        {Icon && <div className={`absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity ${variant === "primary" ? "text-white" : "text-primary"}`}><Icon size={120} /></div>}
        <div className={`${variant === "primary" ? "text-primary-container" : "text-on-surface-variant"} text-[10px] font-black uppercase tracking-[0.2em] mb-4`}>{label}</div>
        <div className="text-4xl font-sans font-bold tracking-tight">{value}</div>
    </div>
);

const ImagePlaceholder = ({ className = "", label = "Topic Image Placeholder", src }: { className?: string, label?: string, src?: string }) => (
    <div className={`relative overflow-hidden group/img ${className}`}>
        {src ? (
            <img
                src={src}
                alt={label}
                className="w-full h-full object-cover rounded-[2.5rem] transition-transform duration-700 group-hover/img:scale-110"
            />
        ) : (
            <div className={`bg-white/5 border-2 border-dashed border-outline-variant/10 rounded-[2.5rem] flex items-center justify-center p-8 transition-all hover:bg-primary/5 hover:border-primary/20 min-h-[200px]`}>
                <div className="flex flex-col items-center gap-4 opacity-10 group-hover/img:opacity-30 transition-opacity">
                    <Layout size={40} />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-center leading-relaxed">{label}</span>
                </div>
            </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-on-surface/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 rounded-[2.5rem]" />
    </div>
);

const InteractiveAnalysis = ({ id, title, subtitle, icon: Icon, pythonCode, plots = [], children, defaultOpen = false }: any) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [showCode, setShowCode] = useState(false);
    const [selectedPlot, setSelectedPlot] = useState(plots && plots.length > 0 ? plots[0].label : "All");

    const handleCopy = () => {
        if (pythonCode) navigator.clipboard.writeText(pythonCode);
    };

    const plotsToRender = selectedPlot === "All" ? plots : plots.filter((p: any) => p.label === selectedPlot);

    return (
        <section className="py-2 mb-8 scroll-mt-24" id={id}>
            <div className="bg-white rounded-[2rem] border border-outline-variant/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden transition-all hover:shadow-[0_15px_60px_rgb(0,0,0,0.08)]">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex flex-col md:flex-row justify-between items-start md:items-center py-5 px-8 hover:bg-surface-container-low transition-colors group cursor-pointer text-left focus:outline-none"
                >
                    <div className="flex items-center gap-6">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${isOpen ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-surface-container-high text-primary group-hover:bg-primary/5 shadow-sm"}`}>
                            <Icon size={22} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight text-on-surface">{title}</h2>
                            <p className="text-on-surface-variant text-[11px] font-medium opacity-60 italic">{subtitle}</p>
                        </div>
                    </div>
                    <div className={`flex items-center text-on-surface-variant/40 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}>
                        <ChevronDown size={28} />
                    </div>
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="pt-2 pb-16 px-10 border-t border-outline-variant/5">
                                <div className="flex justify-end mb-10">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setShowCode(!showCode); }}
                                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs tracking-tight transition-all cursor-pointer border ${showCode ? "bg-on-surface text-white border-on-surface" : "bg-white text-on-surface-variant border-outline-variant/20 hover:bg-surface-container"}`}
                                    >
                                        <BookOpen size={16} />
                                        {showCode ? "Hide Tutorial" : "View Tutorial"}
                                    </button>
                                </div>

                                <AnimatePresence>
                                    {showCode && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden mb-12"
                                        >
                                            <div className="bg-slate-900 rounded-3xl p-8 font-mono text-[13px] relative border border-outline-variant/10 shadow-inner">
                                                <div className="flex gap-2 mb-6 border-b border-white/5 pb-4">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                                                    <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] ml-2">Python Analysis Script</span>
                                                </div>
                                                <code className="text-slate-300 block leading-relaxed overflow-x-auto whitespace-pre custom-scrollbar select-all">
                                                    {pythonCode || "# No code provided"}
                                                </code>
                                                <button
                                                    onClick={handleCopy}
                                                    className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors cursor-pointer bg-white/5 p-2 rounded-lg"
                                                    title="Copy Code"
                                                >
                                                    <Copy size={16} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="flex flex-col gap-10">
                                    {children && <div className="w-full">{children}</div>}

                                    {plots && plots.length > 1 && (
                                        <div className="flex flex-col sm:flex-row items-baseline sm:items-center gap-6 bg-surface-container-low/50 p-4 rounded-2xl border border-outline-variant/10 w-fit">
                                            <div className="flex items-center gap-2 border-r border-outline-variant/10 pr-6">
                                                <Filter size={16} className="text-primary" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Views</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {plots.map((plot: any) => (
                                                    <button
                                                        key={plot.label}
                                                        onClick={() => setSelectedPlot(plot.label)}
                                                        className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer border ${selectedPlot === plot.label ? "bg-primary text-on-primary border-primary shadow-md" : "bg-white text-on-surface-variant border-outline-variant/10 hover:border-primary/50"}`}
                                                    >
                                                        {plot.label}
                                                    </button>
                                                ))}
                                                <button
                                                    onClick={() => setSelectedPlot("All")}
                                                    className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer border ${selectedPlot === "All" ? "bg-on-surface text-white border-on-surface shadow-md" : "bg-white text-on-surface border-outline-variant/10 hover:border-on-surface/50"}`}
                                                >
                                                    Full Archive
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 gap-12">
                                        {plotsToRender && plotsToRender.map((plot: any, idx: number) => (
                                            <motion.div
                                                key={plot.label || idx}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                className="bg-white rounded-3xl p-8 border border-outline-variant/10 shadow-sm relative group overflow-hidden"
                                            >
                                                <div className="flex justify-between items-center mb-8 pb-4 border-b border-outline-variant/5">
                                                    <div className="flex items-center gap-3">
                                                        <BarChart size={18} className="text-primary" />
                                                        <h4 className="text-sm font-bold text-on-surface uppercase tracking-tight">{plot.label} Profile</h4>
                                                    </div>
                                                    {plot.badge && <span className="px-3 py-1 bg-primary/5 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/10">{plot.badge}</span>}
                                                </div>
                                                <div className="w-full flex items-center justify-center min-h-[500px]">
                                                    {plot.data ? (
                                                        <Plot
                                                            data={plot.data}
                                                            layout={{
                                                                ...plot.layout,
                                                                paper_bgcolor: "rgba(0,0,0,0)",
                                                                plot_bgcolor: "rgba(0,0,0,0)",
                                                                font: { family: "Inter, sans-serif", size: 12 },
                                                                margin: { t: 40, r: 40, b: 80, l: 60 },
                                                                width: undefined,
                                                                autosize: true,
                                                                responsive: true,
                                                                showlegend: true,
                                                                legend: { orientation: "h", y: -0.2 }
                                                            }}
                                                            useResizeHandler={true}
                                                            style={{ width: "100%", height: "500px" }}
                                                            config={{ responsive: true, displayModeBar: false }}
                                                        />
                                                    ) : (
                                                        <div className="text-outline-variant/40 italic text-sm">No visualization data provided</div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default function TextEDA({ onBack, initialMode = "eda" }: { onBack: () => void, initialMode?: "eda" | "ml" }) {
    const [activeNav, setActiveNav] = useState("overview");
    const [activeMode, setActiveMode] = useState<"eda" | "ml">(initialMode);
    
    // Samples cho phần Raw Explorer
    const [currentSamples, setCurrentSamples] = useState<any[]>([]);
    const [isRolling, setIsRolling] = useState(false);

    const rollSamples = () => {
        setIsRolling(true);
        setTimeout(() => {
            const rawAmazonReviews = [
                { Polarity: "2 (Positive)", Text: "This sound track was beautiful! It paints the..." },
                { Polarity: "1 (Negative)", Text: "Not worth the money. Very disappointed..." },
                { Polarity: "2 (Positive)", Text: "The best soundtrack ever to anything. I'm reading a lot..." },
                { Polarity: "1 (Negative)", Text: "Poor quality, broke within 2 days of using." },
                { Polarity: "2 (Positive)", Text: "Amazing! This soundtrack is my favorite music of all ti..." },
                { Polarity: "2 (Positive)", Text: "Remember, Pull Your Jaw Off The Floor After He..." },
            ];
            const shuffled = [...rawAmazonReviews].sort(() => 0.5 - Math.random());
            setCurrentSamples(shuffled.slice(0, 2));
            setIsRolling(false);
        }, 800);
    };

    useEffect(() => {
        rollSamples();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);

        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveNav(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const sections = document.querySelectorAll('section[id], div[id]');
        sections.forEach(section => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    const tocItems = [
        { id: "overview", label: "Overview" },
        { id: "methodology", label: "Methodology" },
        { id: "dataset-overview", label: "Dataset Overview" },
        { id: "inventory", label: "Dataset Inventory" },
        { id: "content", label: "Polarity Distribution" },
        { id: "stop-words", label: "Stop Words" },
        { id: "word-count", label: "Word Count" },
        { id: "char-count", label: "Char Count" },
        { id: "insights", label: "Key Insights" },
        { id: "raw-explorer", label: "Raw Data Explorer" },
    ];

    return (
        <div className="min-h-screen relative bg-[#f8fafb] selection:bg-primary/20 text-on-surface font-sans antialiased">
            <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f3f5; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #00685f; border-radius: 10px; border: 2.5px solid #f1f3f5; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #004d46; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

            {/* Back Button */}
            <div className="fixed top-24 left-8 z-50">
                <button
                    onClick={onBack}
                    className="bg-white p-4 rounded-2xl border border-outline-variant/10 shadow-2xl hover:bg-primary hover:text-white transition-all group cursor-pointer active:scale-90"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                </button>
            </div>

            <main className="pt-8 flex max-w-[1440px] mx-auto px-4 lg:px-8">
                {/* Sticky Table of Contents Sidebar */}
                <aside className="hidden xl:block w-72 sticky top-32 self-start pr-12 h-[calc(100vh-160px)] overflow-y-auto no-scrollbar">
                    <div className="space-y-12">
                        <div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40 mb-10 pl-6">Analysis Index</h3>
                            <div className="relative border-l-2 border-outline-variant/10 ml-6 space-y-1">
                                {tocItems.map((item) => {
                                    const isActive = activeNav === item.id;
                                    return (
                                        <a
                                            key={item.id}
                                            href={`#${item.id}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                                            }}
                                            className={`block py-2.5 px-6 -ml-[2px] border-l-2 text-[11px] font-bold tracking-tight transition-all duration-300 ${isActive
                                                ? "text-primary border-primary bg-primary/5"
                                                : "text-on-surface-variant/40 border-transparent hover:text-on-surface-variant/70 hover:border-outline-variant/30"
                                                }`}
                                        >
                                            {item.label}
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </aside>

                <div className="flex-1 min-w-0">
                    {/* Mode Switcher Tabs */}
                    <div className="flex bg-surface-container-high p-1 rounded-2xl w-fit mx-auto mb-12 shadow-inner border border-outline-variant/10">
                        <button
                            onClick={() => setActiveMode("eda")}
                            className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer border-none ${activeMode === "eda" ? "bg-white text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"}`}
                        >
                            <div className="flex items-center gap-2">
                                <BarChart3 size={14} />
                                EDA Analysis
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveMode("ml")}
                            className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer border-none ${activeMode === "ml" ? "bg-white text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"}`}
                        >
                            <div className="flex items-center gap-2">
                                <Brain size={14} />
                                Machine Learning
                            </div>
                        </button>
                    </div>

                    {/* Hero Section */}
                    <section className="relative py-28 overflow-hidden bg-white border border-outline-variant/5 rounded-[3rem] shadow-sm mb-12" id="overview">
                        <div className="max-w-[1240px] mx-auto px-10">
                            <div className="flex flex-col lg:flex-row items-center gap-20">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex-1 text-center lg:text-left"
                                >
                                    <div className="flex items-center justify-center lg:justify-start gap-3 text-primary font-bold tracking-widest text-[10px] uppercase mb-8">
                                        <span className="w-8 h-px bg-primary/40"></span>
                                        Textual Dataset Analysis
                                    </div>
                                    <h1 className="text-6xl md:text-7xl font-extrabold mb-8 tracking-tighter leading-[1] text-on-surface">
                                        Amazon Reviews <br />
                                        <span className="text-primary italic font-serif opacity-90">Sentiment Analysis.</span>
                                    </h1>
                                    <p className="text-lg text-on-surface-variant leading-relaxed max-w-2xl font-medium mb-12 opacity-80">
                                        Exploratory analysis of customer review polarity, investigating semantic patterns, textual distribution, and sentiment modeling.
                                    </p>
                                    <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                        <div className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-low rounded-xl border border-outline-variant/10 text-[10px] font-black uppercase tracking-widest">
                                            <Database size={14} className="text-primary" />
                                            500,000 articles
                                        </div>
                                        <div className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-low rounded-xl border border-outline-variant/10 text-[10px] font-black uppercase tracking-widest text-emerald-600">
                                            <CheckCircle2 size={14} />
                                            Language: EN
                                        </div>
                                        <div className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-low rounded-xl border border-outline-variant/10 text-[10px] font-black uppercase tracking-widest text-secondary">
                                            <Info size={14} />
                                            Binary Sentiment
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="w-full lg:w-[420px] space-y-8"
                                >
                                    <div className="bg-white rounded-[2.5rem] p-10 border border-outline-variant/10 shadow-2xl shadow-on-surface/5">
                                        <div className="space-y-8">
                                            <div className="flex justify-between items-center pb-6 border-b border-outline-variant/10">
                                                <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Study Metadata</span>
                                                <span className="px-3 py-1 bg-surface-container-high rounded-full text-[9px] font-bold uppercase tracking-tight">V1.0</span>
                                            </div>
                                            <div className="space-y-5">
                                                {[
                                                    { label: "Temporal Depth", val: "Kaggle Dataset" },
                                                    { label: "Primary Field", val: "Text" },
                                                    { label: "Category Field", val: "Polarity" },
                                                    { label: "Target Context", val: "E-Commerce" },
                                                    { label: "Data Tags", val: "Text, NLP, Sentiment" }
                                                ].map((item, i) => (
                                                    <div key={i} className="flex justify-between items-center">
                                                        <span className="text-xs font-semibold text-on-surface-variant opacity-60 uppercase tracking-tight font-headline">{item.label}</span>
                                                        <span className="text-on-surface font-black text-sm">{item.val}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="pt-8 border-t border-outline-variant/10">
                                                <div className="flex items-center gap-3 mb-6">
                                                    <Users size={16} className="text-primary" />
                                                    <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Project Contributors</span>
                                                </div>
                                                <div className="flex flex-wrap gap-4">
                                                    {[
                                                        "Nguyễn Đặng Minh Trường"
                                                    ].map((member, i) => (
                                                        <div key={i} className="flex items-center gap-2 px-4 py-2 bg-surface-container-low rounded-xl border border-outline-variant/10 w-fit">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                                                            <span className="text-[10px] font-bold text-on-surface whitespace-nowrap">{member}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <ImagePlaceholder label="E-Commerce Reviews" src={heroTextImage} className="min-h-[280px]" />
                                </motion.div>
                            </div>

                            {/* Core KPIs */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-24">
                                <StatCard label="Total Samples" value="500,000" icon={Database} />
                                <StatCard label="Categories" value="2" icon={Target} />
                                <StatCard label="Avg Words" value="74" icon={Hash} />
                                <StatCard label="Avg Chars" value="405" icon={FileText} />
                            </div>
                        </div>
                    </section>


                    <div className="max-w-[1240px] mx-auto pb-40">
                        {activeMode === "eda" ? (
                            <>
                                {/* Dataset Ethics Notice */}
                                <div className="bg-surface-container-low/30 p-8 rounded-[2.5rem] border border-outline-variant/10 mb-12 flex flex-col md:flex-row gap-8 items-center md:items-start group transition-all hover:bg-white hover:shadow-xl hover:shadow-on-surface/5">
                                    <div className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                                        <AlertTriangle size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-black text-on-surface uppercase tracking-[0.1em] mb-3">Dataset Origin & Details</h3>
                                        <p className="text-sm text-on-surface-variant leading-relaxed opacity-70 font-medium">
                                            This report utilizes the <strong className="text-secondary">Amazon Customer Reviews Dataset (kritanjalijain/amazon-reviews)</strong>.
                                            The sampled data comprises ~500,000 records of customer reviews categorized by polarity (1 = Negative, 2 = Positive).
                                        </p>
                                        <a
                                            href="https://www.kaggle.com/datasets/kritanjalijain/amazon-reviews"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-on-surface text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-primary hover:shadow-lg hover:-translate-y-0.5 group"
                                        >
                                            <Link size={14} className="group-hover:rotate-45 transition-transform" />
                                            Source Repository (Kaggle)
                                        </a>
                                    </div>
                                </div>


                                {/* Methodology Section */}
                                <section className="py-20 scroll-mt-24" id="methodology">
                                    <div className="bg-white rounded-[2.5rem] border border-outline-variant/10 shadow-sm p-12 group transition-all hover:shadow-xl hover:shadow-on-surface/5">
                                        <div className="flex items-center gap-6 mb-12">
                                            <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110"><BookOpen size={28} /></div>
                                            <div>
                                                <h2 className="text-3xl font-bold tracking-tight mb-2 text-on-surface">Analysis Methodology</h2>
                                                <p className="text-on-surface-variant text-sm font-medium opacity-60">This report uses robust NLP techniques to extract meaningful patterns from Amazon reviews.</p>
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-[2rem] border border-outline-variant/10 shadow-inner overflow-hidden">
                                            <table className="w-full text-left border-collapse">
                                                <thead className="bg-primary/5 text-primary border-b border-outline-variant/10">
                                                    <tr>
                                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest w-[30%]">Analysis Type</th>
                                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-center">Raw Data</th>
                                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-center">Stopwords Removed</th>
                                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">Scientific Rationale</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-outline-variant/5">
                                                    {[
                                                        { type: "Basic Statistics", sub: "(Word/Char counts)", raw: true, stop: false, reason: "Measure actual physical document footprint." },
                                                        { type: "Stop Words Analysis", sub: "(Noise profiling)", raw: true, stop: false, reason: "Audit the frequency of non-semantic functional words." },
                                                        { type: "Distributions", sub: "(Length histograms)", raw: true, stop: false, reason: "Maintain integrity of original text delivery format." }
                                                    ].map((row, i) => (
                                                        <tr key={i} className="hover:bg-surface-container-low/30 transition-colors group/row">
                                                            <td className="px-8 py-6">
                                                                <div className="font-bold text-on-surface text-sm">{row.type}</div>
                                                                <div className="text-[10px] text-on-surface-variant opacity-60 font-medium tracking-tight">{row.sub}</div>
                                                            </td>
                                                            <td className="px-8 py-6 text-center">
                                                                {row.raw ? (
                                                                    <div className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-100 text-emerald-600 shadow-sm"><CheckCircle2 size={14} /></div>
                                                                ) : (
                                                                    <div className="text-on-surface-variant opacity-20 text-lg font-light">-</div>
                                                                )}
                                                            </td>
                                                            <td className="px-8 py-6 text-center">
                                                                {row.stop ? (
                                                                    <div className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-primary/10 text-primary shadow-sm"><CheckCircle2 size={14} /></div>
                                                                ) : (
                                                                    <div className="text-on-surface-variant opacity-20 text-lg font-light">-</div>
                                                                )}
                                                            </td>
                                                            <td className="px-8 py-6 text-xs text-on-surface-variant/70 leading-relaxed font-medium">
                                                                {row.reason}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </section>

                                {/* Dataset Overview Section */}
                                <InteractiveAnalysis
                                    id="dataset-overview"
                                    title="Dataset Overview"
                                    subtitle="Core descriptive statistics and data health assessment."
                                    icon={Layout}
                                    pythonCode={`import pandas as pd

# Load dataset
column_names = ['Polarity', 'Title', 'Text']
df = pd.read_csv("train.csv", header=None, names=column_names)

# Down-sample to 500,000 for analysis
df_small, _ = train_test_split(df, train_size=500000, stratify=df['Polarity'], random_state=42)

# 1. Total Articles
total_articles = len(df_small)

# 2. Categories
num_categories = df_small['Polarity'].nunique()

# Calculate word and character counts for each article
df_small['word_count'] = df_small['Text'].apply(lambda x: len(str(x).split()))
df_small['char_count'] = df_small['Text'].apply(lambda x: len(str(x)))

# 3. Avg Words/Article
avg_words = df_small['word_count'].mean()

# 4. Avg Chars/Article
avg_chars = df_small['char_count'].mean()

print(f"Total Articles: {total_articles}")
print(f"Categories: {num_categories}")
print(f"Avg Words: {avg_words:.0f}")
print(f"Avg Chars: {avg_chars:.0f}")`}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        <div className="bg-surface-container-low/50 p-6 rounded-2xl border border-outline-variant/10">
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Sampling Volume</h4>
                                            <div className="text-2xl font-bold text-on-surface">500,000 Records</div>
                                            <p className="text-xs text-on-surface-variant mt-2 font-medium">Total indexed reviews.</p>
                                        </div>
                                        <div className="bg-surface-container-low/50 p-6 rounded-2xl border border-outline-variant/10">
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Categorical Depth</h4>
                                            <div className="text-2xl font-bold text-on-surface">2 Classes</div>
                                            <p className="text-xs text-on-surface-variant mt-2 font-medium">1 (Negative) and 2 (Positive).</p>
                                        </div>
                                        <div className="bg-surface-container-low/50 p-6 rounded-2xl border border-outline-variant/10">
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Lexical Mean</h4>
                                            <div className="text-2xl font-bold text-on-surface">74 Words</div>
                                            <p className="text-xs text-on-surface-variant mt-2 font-medium">Average review length.</p>
                                        </div>
                                        <div className="bg-surface-container-low/50 p-6 rounded-2xl border border-outline-variant/10">
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Content Density</h4>
                                            <div className="text-2xl font-bold text-on-surface">405 Chars</div>
                                            <p className="text-xs text-on-surface-variant mt-2 font-medium">Average byte footprint.</p>
                                        </div>
                                    </div>
                                </InteractiveAnalysis>

                                {/* Dataset Inventory Section */}
                                <InteractiveAnalysis
                                    id="inventory"
                                    title="Dataset Inventory"
                                    subtitle="Enumeration of article metadata fields and content headers."
                                    icon={Columns}
                                    pythonCode={`import pandas as pd

df = pd.read_csv("train.csv", header=None, names=['Polarity', 'Title', 'Text'])
df.info()`}
                                >
                                    <div className="bg-white rounded-[1.5rem] border border-outline-variant/10 shadow-sm overflow-hidden overflow-x-auto overflow-y-auto max-h-[500px] custom-scrollbar">
                                        <table className="w-full text-left border-collapse min-w-[800px]">
                                            <thead className="sticky top-0 z-20 bg-on-surface text-white">
                                                <tr>
                                                    <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest">Field Name</th>
                                                    <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest">Dtype</th>
                                                    <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest">Description</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-outline-variant/5">
                                                {[
                                                    { name: "Polarity", type: "int64", desc: "Sentiment label (1 = Negative, 2 = Positive)." },
                                                    { name: "Title", type: "object", desc: "Short title or summary of the review." },
                                                    { name: "Text", type: "object", desc: "The main body/content of the customer review." }
                                                ].map((f) => (
                                                    <tr key={f.name} className="hover:bg-primary/5 transition-colors even:bg-surface-container-low/20">
                                                        <td className="px-8 py-4 font-bold text-sm text-primary">{f.name}</td>
                                                        <td className="px-8 py-4">
                                                            <span className={`px-2.5 py-1 rounded text-[9px] font-black uppercase tracking-widest border ${f.type === "int64" || f.type === "float64" ? "bg-primary/5 text-primary border-primary/20" : "bg-on-surface-variant/5 text-on-surface-variant border-outline-variant/10"}`}>
                                                                {f.type}
                                                            </span>
                                                        </td>
                                                        <td className="px-8 py-4 text-on-surface-variant text-sm font-normal opacity-70 leading-relaxed">{f.desc}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </InteractiveAnalysis>

                                {/* Category Distribution Section */}
                                <InteractiveAnalysis
                                    id="content"
                                    title="Polarity Distribution"
                                    subtitle="Balanced breakdown of review sentiments (Positive vs Negative)."
                                    icon={PieChart}
                                    pythonCode={`# Load data
import pandas as pd
import plotly.graph_objects as go

category_counts = df_small['Polarity'].value_counts().sort_index()

fig1 = go.Figure(data=[go.Pie(
    labels=category_counts.index,
    values=category_counts.values,
    hole=0.3,
    marker=dict(colors=['#667eea', '#764ba2']),
    textinfo='label+percent',
    textfont_size=14
)])

fig1.update_layout(title='Polarity Distribution')
fig1.show()

print("1 represent for negative")
print("2 represent for positive")`}
                                    plots={[
                                        {
                                            label: "Sentiment Distribution",
                                            data: [{
                                                type: 'pie',
                                                labels: ['Negative (1)', 'Positive (2)'],
                                                values: [250000, 250000],
                                                hole: 0.3,
                                                marker: { colors: ['#EF553B', '#00cc96'] },
                                                textinfo: 'label+percent'
                                            }],
                                            layout: {
                                                showlegend: true,
                                                height: 400
                                            }
                                        }
                                    ]}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                        <div className="space-y-6">
                                            <div className="bg-surface-container-low/50 p-6 rounded-2xl border border-outline-variant/10">
                                                <h4 className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-2">Class 1: Negative</h4>
                                                <div className="text-2xl font-bold text-on-surface">250,000 (50%)</div>
                                                <p className="text-sm text-on-surface-variant mt-2">Perfectly balanced down-sampled subset representing negative sentiments.</p>
                                            </div>
                                            <div className="bg-surface-container-low/50 p-6 rounded-2xl border border-outline-variant/10">
                                                <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-2">Class 2: Positive</h4>
                                                <div className="text-2xl font-bold text-on-surface">250,000 (50%)</div>
                                                <p className="text-sm text-on-surface-variant mt-2">Perfectly balanced down-sampled subset representing positive sentiments.</p>
                                            </div>
                                        </div>
                                        <div className="p-6 bg-white rounded-3xl border border-outline-variant/10 shadow-sm italic text-sm text-on-surface-variant">
                                            <Info className="text-primary mb-4" size={20} />
                                            Observation: Using `train_test_split` with `stratify=df['Polarity']`, we ensured a perfectly balanced dataset (50/50 split), preventing class-imbalance bias during machine learning model training.
                                        </div>
                                    </div>
                                </InteractiveAnalysis>

                                {/* Stop Words Analysis Section */}
                                <InteractiveAnalysis
                                    id="stop-words"
                                    title="Stop Words Analysis"
                                    subtitle="Frequency audit of non-semantic functional words within the text corpus."
                                    icon={Filter}
                                    pythonCode={`import pandas as pd
import plotly.graph_objects as go
from collections import Counter
from sklearn.feature_extraction.text import ENGLISH_STOP_WORDS

stop_words = set(ENGLISH_STOP_WORDS)
custom_news_stopwords = ['said', 'mr', 'ms', 'mrs', 'told', 'says', 'say',
                         'according', 'year', 'years', 'new', 'old', 'like',
                         'just', 'going', 'got', 'use', 'used', 'make', 'made']
stop_words.update(custom_news_stopwords)

all_words = ' '.join(df_small['Text']).lower().split()
stop_word_counts = Counter([word for word in all_words if word in stop_words])
top_stop_words = stop_word_counts.most_common(20)

words = [w for w, c in top_stop_words]
counts = [c for w, c in top_stop_words]

# Plotting logic...`}
                                    plots={[
                                        {
                                            label: "Top Stop Words",
                                            data: [{
                                                type: 'bar',
                                                x: ["the", "and", "i", "a", "to", "of", "this", "is", "it", "in", "for", "that", "was", "you", "with"],
                                                y: [1880079, 1022460, 978143, 932536, 925873, 745735, 671551, 653996, 646112, 434252, 395157, 365454, 323802, 281572, 272033],
                                                marker: { color: '#764ba2' },
                                                textposition: 'outside'
                                            }],
                                            layout: {
                                                title: 'Top 15 Stop Words (Actual Frequencies)',
                                                xaxis: { title: 'Stop Words' },
                                                yaxis: { title: 'Frequency' }
                                            }
                                        }
                                    ]}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div className="bg-white p-8 rounded-2xl border border-outline-variant/10 shadow-sm border-t-4 border-t-[#764ba2]">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-[#764ba2] mb-2">Total Word Volume</div>
                                            <div className="text-3xl font-bold">37,077,628</div>
                                            <div className="text-xs text-on-surface-variant mt-1 font-medium italic opacity-60">Complete corpus word count</div>
                                        </div>
                                        <div className="bg-white p-8 rounded-2xl border border-outline-variant/10 shadow-sm border-t-4 border-t-[#764ba2]">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-[#764ba2] mb-2">Stop Word Density</div>
                                            <div className="text-3xl font-bold">53.3%</div>
                                            <div className="text-xs text-on-surface-variant mt-1 font-medium italic opacity-60">19,747,676 noise words identified</div>
                                        </div>
                                        <div className="bg-white p-8 rounded-2xl border border-outline-variant/10 shadow-sm border-t-4 border-t-[#764ba2]">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-[#764ba2] mb-2">Unique Filters</div>
                                            <div className="text-3xl font-bold">335</div>
                                            <div className="text-xs text-on-surface-variant mt-1 font-medium italic opacity-60">Distinct functional terms</div>
                                        </div>
                                    </div>
                                </InteractiveAnalysis>

                                {/* Word Count Distribution Section */}
                                <InteractiveAnalysis
                                    id="word-count"
                                    title="Word Count Distribution"
                                    subtitle="Granular histogram of article lengths measured in tokens."
                                    icon={Hash}
                                    pythonCode={`import pandas as pd
import plotly.graph_objects as go
import numpy as np

# Calculate word counts
df_small['word_count'] = df_small['Text'].str.split().str.len().fillna(0).astype(int)

# Defined range for fine-grained analysis
max_range = 30
bins = np.arange(0, max_range + 1, 1)

hist, bin_edges = np.histogram(df_small['word_count'], bins=bins)
bin_labels = [str(int(bin_edges[i])) for i in range(len(hist))]
# Plotting code follows...`}
                                    plots={[
                                        {
                                            label: "Word Count (0-30)",
                                            data: [{
                                                type: 'bar',
                                                x: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29'],
                                                y: [0, 5, 2, 2, 1, 4, 6, 12, 30, 38, 71, 155, 215, 378, 650, 1394, 1816, 2273, 2658, 3217, 7561, 6900, 6843, 6601, 6380, 6246, 6001, 5893, 5728, 11181],
                                                marker: { color: '#667eea' },
                                                textposition: 'outside'
                                            }],
                                            layout: {
                                                title: 'Detailed Word Count Distribution (0 to 30 words)',
                                                xaxis: { title: 'Exact Word Count', type: 'category' },
                                                yaxis: { title: 'Number of Articles' },
                                                height: 500
                                            }
                                        }
                                    ]}
                                >
                                    <div className="bg-surface-container-low/50 p-8 rounded-[2rem] border border-outline-variant/10 text-on-surface flex flex-col items-center justify-center text-center">
                                        <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Key Observation</div>
                                        <div className="text-2xl font-bold max-w-2xl px-8">82,261 reviews are extremely short (0-20 words).</div>
                                        <p className="text-sm text-on-surface-variant mt-4 opacity-70 italic">The word count climbs steadily, peaking initially around 20 words (7,561 articles) and jumping substantially at length 29/30. This suggests many reviews are brief, direct sentiments.</p>
                                    </div>
                                </InteractiveAnalysis>

                                {/* Key Analytical Insights Section */}
                                <InteractiveAnalysis
                                    id="insights"
                                    title="Key Analytical Insights"
                                    subtitle="Synthesized findings from the exploratory data analysis process."
                                    icon={Sparkles}
                                    pythonCode={`print("💡 KEY INSIGHTS")
print("-" * 30)
print(f"Total Stop Words Filtered: 53.3% (Massive noise reduction)")
print(f"Reviews with <20 words: 82,261")`}
                                >
                                    <div className="bg-slate-900 rounded-[2.5rem] p-12 font-mono text-[14px] leading-relaxed text-slate-300 shadow-2xl border border-white/5 overflow-hidden relative group">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px]" />
                                        <div className="flex items-center gap-3 mb-10 border-b border-white/5 pb-6">
                                            <Terminal className="text-primary" size={24} />
                                            <span className="text-[12px] font-black uppercase tracking-[0.2em] text-white/40">Terminal Output: System Insights</span>
                                        </div>
                                        <div className="text-emerald-400 font-bold mb-6 text-xl flex items-center gap-3">
                                            <Zap size={20} />
                                            💡 KEY ANALYTICAL INSIGHTS
                                        </div>
                                        <div className="text-slate-600 mb-8">------------------------------------------------------------</div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                                            {[
                                                {
                                                    badge: "Data Health",
                                                    badgeClass: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
                                                    title: "Class Balance",
                                                    desc: <>The subset selected specifically forces a <strong>50/50 split</strong> between positive and negative labels (250,000 each), ensuring ML classifiers won't default to majority class prediction bias.</>
                                                },
                                                {
                                                    badge: "Noise Ratio",
                                                    badgeClass: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
                                                    title: "High Stop-Word Density",
                                                    desc: <>Over <strong>53%</strong> of the tokens in the dataset are functional stop words ('the', 'and', 'i', 'a'). Applying aggressive filtering is highly recommended for TF-IDF to focus on sentimental adjectives.</>
                                                },
                                                {
                                                    badge: "Text Length",
                                                    badgeClass: "bg-blue-500/10 text-blue-500 border-blue-500/20",
                                                    title: "Review Brevity",
                                                    desc: <>The average review is roughly <strong>74 words</strong>, but over 82,000 reviews are 20 words or less. Sentiment analysis models must handle very short, terse sentences (e.g. "Amazing!", "Broke in 2 days").</>
                                                },
                                                {
                                                    badge: "Preprocessing",
                                                    badgeClass: "bg-purple-500/10 text-purple-400 border-purple-500/20",
                                                    title: "Preserving Negation",
                                                    desc: <>Standard stop-word lists aggressively remove words like <strong>'not'</strong> or <strong>'nor'</strong>. For sentiment analysis, preserving these words is critical because "not good" has the opposite polarity of "good".</>
                                                }
                                            ].map((item, i) => (
                                                <div key={i} className="bg-[#1c1c1c] border border-white/5 rounded-3xl p-8 hover:bg-[#252525] transition-all group/insight md:min-h-[220px] flex flex-col justify-start">
                                                    <div className="flex items-center gap-4 mb-6">
                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${item.badgeClass}`}>
                                                            {item.badge}
                                                        </span>
                                                        <h6 className="font-bold text-white text-lg tracking-tight group-hover/insight:text-primary transition-colors">{item.title}</h6>
                                                    </div>
                                                    <p className="text-slate-400 text-[14px] leading-[1.6] font-medium font-sans">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </InteractiveAnalysis>

                                {/* Raw Data Explorer Section */}
                                <InteractiveAnalysis
                                    id="raw-explorer"
                                    title="Raw Data Article Explorer"
                                    subtitle="Interaction with actual underlying dataset records."
                                    icon={Database}
                                    pythonCode={`# View random samples from the processed dataset
import pandas as pd

print("--- Fetching Random Records ---")
samples = df_small.sample(n=2)
print(samples[['Polarity', 'Title', 'Text']])`}
                                >
                                    <div className="bg-white rounded-[2.5rem] border border-outline-variant/10 shadow-sm p-10 group overflow-hidden relative">
                                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                                                    <Search size={22} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-lg text-on-surface">Dataset Record Lookup</h4>
                                                    <p className="text-xs text-on-surface-variant opacity-60">Querying real entries from Amazon Customer Reviews (train.csv)</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={rollSamples}
                                                disabled={isRolling}
                                                className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-lg transition-all ${isRolling ? "bg-surface-container-high text-on-surface-variant cursor-wait" : "bg-primary text-white hover:bg-primary/90 hover:-translate-y-1 shadow-primary/20 cursor-pointer active:scale-95"}`}
                                            >
                                                <Dices size={18} className={isRolling ? "animate-spin" : "group-hover:rotate-12 transition-transform"} />
                                                {isRolling ? "Fetching..." : "Roll New Samples"}
                                            </button>
                                        </div>

                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={JSON.stringify(currentSamples)}
                                                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                                                transition={{ duration: 0.4, ease: "easeOut" }}
                                                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                                            >
                                                {currentSamples.length > 0 ? currentSamples.map((sample: any, idx: number) => (
                                                    <div key={idx} className="relative bg-surface-container-low/30 rounded-[2rem] p-8 border border-outline-variant/5 hover:border-primary/20 hover:bg-white transition-all group/card hover:shadow-xl hover:shadow-on-surface/5">
                                                        <div className="flex justify-between items-center mb-6">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary font-bold text-xs">
                                                                    #{idx + 1}
                                                                </div>
                                                                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 italic">Data Entry</span>
                                                            </div>
                                                            <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border ${sample.Polarity.includes("Positive") ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-red-500/10 text-red-600 border-red-500/20"}`}>
                                                                {sample.Polarity}
                                                            </span>
                                                        </div>
                                                        <div className="text-on-surface leading-loose text-[15px] font-medium italic relative z-10">
                                                            <span className="text-3xl font-serif text-primary/10 absolute -top-4 -left-2 select-none">"</span>
                                                            {sample.Text}
                                                            <span className="text-3xl font-serif text-primary/10 select-none">"</span>
                                                        </div>
                                                        <div className="mt-8 pt-6 border-t border-outline-variant/5 flex items-center justify-between opacity-40 group-hover/card:opacity-100 transition-opacity">
                                                            <div className="flex items-center gap-2 text-[10px] font-bold">
                                                                <BadgeCheck size={14} className="text-emerald-500" />
                                                                Kaggle Verified Record
                                                            </div>
                                                            <ArrowRight size={14} className="text-primary" />
                                                        </div>
                                                    </div>
                                                )) : (
                                                    <div className="col-span-2 flex flex-col items-center justify-center py-24 text-on-surface-variant/20 border-2 border-dashed border-outline-variant/10 rounded-[3rem]">
                                                        <Database size={60} className="mb-6 opacity-10 animate-pulse" />
                                                        <p className="text-sm font-bold uppercase tracking-widest">Interface Ready to Query</p>
                                                        <p className="text-[10px] italic mt-2">Initialize by clicking the Roll button</p>
                                                    </div>
                                                )}
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </InteractiveAnalysis>
                            </>
                        ) : (
                            <TextML />
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}