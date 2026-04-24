import React, { useState, useEffect } from "react";
import heroImage from "../assets/images/image/ảnh.jpg";
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
    Users,
    FileWarning,
    Calendar
} from "lucide-react";

// Import local data 
import _missing_values from "../assets/data/tabularEDA/missing_values.json";
import _numerical_distribution from "../assets/data/tabularEDA/numerical_distribution.json";
import _categorical_distribution from "../assets/data/tabularEDA/categorical_distribution.json";
import _target_distribution from "../assets/data/tabularEDA/target_distribution.json";
import _correlation_analysis from "../assets/data/tabularEDA/correlation_analysis.json";
import _outlier_detection from "../assets/data/tabularEDA/outlier_detection.json";
import _target_vs from "../assets/data/tabularEDA/target_vs.json";
import _weather_data from "../assets/data/tabularEDA/weather_data.json";
import _timeseries from "../assets/data/tabularEDA/timeseries.json";
import TabularPipeline from "./TabularPipeline";

const missing_values = _missing_values as any;
const numerical_distribution = _numerical_distribution as any;
const categorical_distribution = _categorical_distribution as any;
const target_distribution = _target_distribution as any;
const correlation_analysis = _correlation_analysis as any;
const outlier_detection = _outlier_detection as any;
const target_vs = _target_vs as any;
const weather_data = _weather_data as any;
const timeseries = _timeseries as any;

// --- Modern Academic UI Components ---

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
        navigator.clipboard.writeText(pythonCode);
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
                                                    {pythonCode}
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

                                    {plots.length > 1 && (
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
                                        {plotsToRender.map((plot: any, idx: number) => (
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

export default function TabularEDA({ onBack, initialMode = "eda" }: { onBack: () => void, initialMode?: "eda" | "ml" }) {
    const [activeNav, setActiveNav] = useState("overview");
    const [activeMode, setActiveMode] = useState<"eda" | "ml">(initialMode);
    const [yesRows, setYesRows] = useState([]);
    const [noRows, setNoRows] = useState([]);
    const [isRolling, setIsRolling] = useState(false);


    useEffect(() => {
        // Reset scroll position to top whenever component mounts
        window.scrollTo(0, 0);

        rollDice();

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

    const edaTocItems = [
        { id: "overview", label: "Overview" },
        { id: "missing", label: "Missing Data" },
        { id: "numerical", label: "Numerical Analysis" },
        { id: "outliers", label: "Outlier Detection" },
        { id: "categorical", label: "Categorical Distribution" },
        { id: "targetLikelihood", label: "Target vs Categorical" },
        { id: "targetRel", label: "Correlation Matrix" },
        { id: "time-series-seasonality", label: "Seasonality Analysis" },
        { id: "sampling", label: "Isolated Archives" },
        { id: "findings", label: "Report Summary" },
    ];

    const mlTocItems = [
        { id: "overview", label: "Overview" },
        { id: "architecture", label: "Pipeline Architecture" },
        { id: "traditional", label: "Traditional ML" },
        { id: "tuning", label: "Fine-tuning Performance" },
        { id: "simulation", label: "Hyperparameter Simulation" },
    ];

    const tocItems = activeMode === "eda" ? edaTocItems : mlTocItems;

    const rollDice = () => {
        setIsRolling(true);
        setTimeout(() => {
            const allYes = weather_data.Yes || [];
            const allNo = weather_data.No || [];
            const randomYes = [...allYes].sort(() => 0.5 - Math.random()).slice(0, 3);
            const randomNo = [...allNo].sort(() => 0.5 - Math.random()).slice(0, 3);
            setYesRows(randomYes as any);
            setNoRows(randomNo as any);
            setIsRolling(false);
        }, 600);
    };

    const renderTable = (rows: any[], title: string, icon: any) => {
        if (rows.length === 0) return null;
        const columns = Object.keys(rows[0]);

        return (
            <div className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 bg-white shadow-sm border border-outline-variant/10 rounded-xl flex items-center justify-center text-xl">{icon}</div>
                    <h3 className="text-2xl font-bold tracking-tight">Outcome Segment: <span className={title === "Yes" ? "text-primary" : "text-secondary"}>{title}</span></h3>
                </div>
                <div className="bg-white rounded-[1.5rem] border border-outline-variant/10 shadow-xl overflow-hidden shadow-on-surface/5">
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse min-w-[1400px]">
                            <thead className="bg-on-surface text-white">
                                <tr>
                                    {columns.map((col) => (
                                        <th key={col} className="px-6 py-5 text-[11px] font-bold uppercase tracking-widest">{col}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className={isRolling ? "opacity-30 blur-[1px] transition-all" : "opacity-100 transition-all font-sans"}>
                                {rows.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-primary/5 border-b border-outline-variant/5 even:bg-surface-container-low/20">
                                        {columns.map((col) => (
                                            <td key={col} className="px-6 py-4 text-xs text-on-surface-variant font-medium max-w-[200px] truncate">
                                                {row[col] === "NaN" ? <span className="text-outline-variant italic font-normal text-[10px]">NULL</span> : String(row[col])}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };

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

                    {activeMode === "eda" ? (
                        <>
                            {/* Academic Hero Section */}
                            <section className="relative py-28 overflow-hidden bg-white border border-outline-variant/5 rounded-[3rem] shadow-sm mb-12" id="overview">
                                <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-bl from-primary/[0.03] to-transparent -z-10" />
                                <div className="max-w-[1240px] mx-auto px-10">
                                    <div className="flex flex-col lg:flex-row items-center gap-20">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex-1 text-center lg:text-left"
                                        >
                                            <div className="flex items-center justify-center lg:justify-start gap-3 text-primary font-bold tracking-widest text-[10px] uppercase mb-8">
                                                <span className="w-8 h-px bg-primary/40"></span>
                                                Descriptive Data Analysis
                                            </div>
                                            <h1 className="text-6xl md:text-7xl font-extrabold mb-8 tracking-tighter leading-[1] text-on-surface">
                                                Rain in Australia <br />
                                                <span className="text-primary italic font-serif opacity-90">A Descriptive Report.</span>
                                            </h1>
                                            <p className="text-lg text-on-surface-variant leading-relaxed max-w-2xl font-medium mb-12 opacity-80">
                                                Exploration of a decade of daily weather observations from across Australia to predict the likelihood of rain the following day.
                                            </p>
                                            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                                <div className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-low rounded-xl border border-outline-variant/10 text-[10px] font-black uppercase tracking-widest">
                                                    <Database size={14} className="text-primary" />
                                                    145,460 Records
                                                </div>
                                                <div className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-low rounded-xl border border-outline-variant/10 text-[10px] font-black uppercase tracking-widest text-emerald-600">
                                                    <CheckCircle2 size={14} />
                                                    Verified Integrity
                                                </div>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="w-full lg:w-[420px] space-y-8"
                                        >
                                            <div className="bg-white rounded-[2.5rem] p-10 border border-outline-variant/10 shadow-2xl shadow-on-surface/5 relative">
                                                <div className="space-y-8">
                                                    <div className="flex justify-between items-center pb-6 border-b border-outline-variant/10">
                                                        <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Study Metadata</span>
                                                        <span className="px-3 py-1 bg-surface-container-high rounded-full text-[9px] font-bold uppercase tracking-tight">V1.0.4</span>
                                                    </div>
                                                    <div className="space-y-5">
                                                        {[
                                                            { label: "Temporal Range", val: "2007 - 2017" },
                                                            { label: "Target Label", val: "RainTomorrow" },
                                                            { label: "Observations", val: "145,460" },
                                                        ].map((item, i) => (
                                                            <div key={i} className="flex justify-between items-center">
                                                                <span className="text-xs font-semibold text-on-surface-variant opacity-60 uppercase tracking-tight font-headline">{item.label}</span>
                                                                <span className="text-on-surface font-black text-sm">{item.val}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <a
                                                        href="https://www.kaggle.com/datasets/jsphyg/weather-dataset-rattle-package?select=weatherAUS.csv"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-full mt-10 py-5 bg-on-surface text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-primary transition-all shadow-xl shadow-on-surface/10 flex items-center justify-center gap-3 cursor-pointer no-underline mb-10"
                                                    >
                                                        <BookOpen size={18} />
                                                        Dataset on Kaggle
                                                    </a>

                                                    <div className="pt-8 border-t border-outline-variant/10">
                                                        <div className="flex items-center gap-3 mb-6">
                                                            <Users size={16} className="text-primary" />
                                                            <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Project Contributors</span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-3">
                                                            {[
                                                                "Lê Minh Hào"

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
                                            <ImagePlaceholder label="Meteorological Scene" src={heroImage} className="min-h-[280px]" />
                                        </motion.div>
                                    </div>

                                    {/* Core KPIs */}
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-24">
                                        <StatCard label="Total Samples" value="145,460" icon={Database} />
                                        <StatCard label="Weather Stations" value="49" icon={Layout} />
                                        <StatCard label="Feature Count" value="23" icon={Columns} />
                                        <StatCard label="Majority Base" value="77.9%" variant="primary" icon={Target} />
                                    </div>
                                </div>
                            </section>
                            
                            <div className="max-w-[1240px] mx-auto">
                                {/* Dataset Profile & Ethics */}
                        <section className="py-20 mb-8">
                            <div className="flex flex-col md:flex-row gap-16">
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center"><Info size={20} /></div>
                                        <h2 className="text-2xl font-bold tracking-tight">Dataset Profile</h2>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 text-on-surface-variant leading-relaxed">
                                        <div>
                                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-4">Study Context</h3>
                                            <p className="text-sm font-medium">
                                                Ever wondered if you should carry an umbrella tomorrow? This study utilizes meteorological data to train classification models predicting the target variable <span className="text-on-surface font-bold">RainTomorrow</span>.
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-4">Observation Scope</h3>
                                            <p className="text-sm font-medium">
                                                The archives comprise approximately 10 years of daily observations from a multitude of weather stations across the Australian continent.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-[380px] bg-surface-container-low/50 rounded-3xl p-8 border border-outline-variant/10">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-6">Source & Attribution</h3>
                                    <div className="space-y-6">
                                        <p className="text-[12px] leading-relaxed text-on-surface-variant font-medium italic opacity-70">
                                            Definitions Adapted from Bureau of Meteorology (BoM) Climate Data Online.
                                        </p>
                                        <div className="flex flex-col gap-3">
                                            <a href="http://www.bom.gov.au/climate/data" target="_blank" className="flex items-center gap-2 text-[11px] font-bold text-primary hover:underline transition-colors"><Link size={14} /> BoM Open Data</a>
                                            <a href="https://www.kaggle.com/datasets/jsphyg/weather-dataset-rattle-package" target="_blank" className="flex items-center gap-2 text-[11px] font-bold text-primary hover:underline transition-colors"><Database size={14} /> Kaggle Archive</a>
                                        </div>
                                        <div className="pt-4 border-t border-outline-variant/10 text-[9px] font-bold text-on-surface-variant/40 uppercase tracking-widest leading-loose">
                                            Copyright © Commonwealth of Australia 2010, <br />Bureau of Meteorology.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="py-20 scroll-mt-24" id="methodology">
                            <div className="bg-white rounded-[2.5rem] border border-outline-variant/10 shadow-sm p-12 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/[0.02] rounded-full translate-x-1/2 -translate-y-1/2" />
                                <div className="flex items-center gap-6 mb-12">
                                    <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/10 transition-transform group-hover:scale-110"><BookOpen size={28} /></div>
                                    <div>
                                        <h2 className="text-3xl font-bold tracking-tight mb-2 text-on-surface">Analysis Methodology</h2>
                                        <p className="text-on-surface-variant text-sm font-medium opacity-60 italic">Key Principle: Understand data quality and distributions BEFORE applying machine learning models.</p>
                                    </div>
                                </div>
                                <div className="bg-white rounded-3xl border border-outline-variant/10 shadow-inner overflow-hidden overflow-x-auto custom-scrollbar">
                                    <table className="w-full text-left border-collapse min-w-[800px]">
                                        <thead className="bg-[#4a5568] text-white">
                                            <tr>
                                                <th className="px-8 py-6 text-[11px] font-bold uppercase tracking-widest">Analysis Type</th>
                                                <th className="px-8 py-6 text-[11px] font-bold uppercase tracking-widest">Purpose</th>
                                                <th className="px-8 py-6 text-[11px] font-bold uppercase tracking-widest">Key Metrics</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-outline-variant/5">
                                            {[
                                                { phase: "Missing Values", purpose: "Data quality assessment", metrics: "Missing %, Patterns, Imputation strategy" },
                                                { phase: "Numerical Features", purpose: "Distribution & outliers", metrics: "Mean, Median, Std, IQR, Outliers" },
                                                { phase: "Categorical Features", purpose: "Category frequencies", metrics: "Unique values, Mode, Cardinality" },
                                                { phase: "Correlation", purpose: "Feature relationships", metrics: "Pearson r, Multicollinearity" },
                                                { phase: "Target Analysis", purpose: "Class balance & relationships", metrics: "Distribution, Target vs features" },
                                            ].map((row, idx) => (
                                                <tr key={idx} className="hover:bg-primary/5 transition-colors">
                                                    <td className="px-8 py-6 font-bold text-sm text-on-surface">{row.phase}</td>
                                                    <td className="px-8 py-6 text-on-surface-variant text-sm font-medium opacity-80">{row.purpose}</td>
                                                    <td className="px-8 py-6 text-primary font-black text-xs uppercase tracking-tight italic">{row.metrics}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </section>

                        <InteractiveAnalysis
                            id="features"
                            title="Dataset Overview"
                            icon={Columns}
                            defaultOpen={false}
                        >
                            <div className="bg-white rounded-[1.5rem] border border-outline-variant/10 shadow-sm overflow-hidden overflow-x-auto overflow-y-auto max-h-[500px] custom-scrollbar">
                                <table className="w-full text-left border-collapse min-w-[1000px]">
                                    <thead className="sticky top-0 z-20 bg-on-surface text-white">
                                        <tr>
                                            <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest">Feature</th>
                                            <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest">Class</th>
                                            <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-outline-variant/5">
                                        {[
                                            { name: "Date", type: "Categorical", desc: "The date of observation." },
                                            { name: "Location", type: "Categorical", desc: "Common name of the weather station location." },
                                            { name: "MinTemp", type: "Numerical", desc: "Minimum temperature in Celsius." },
                                            { name: "MaxTemp", type: "Numerical", desc: "Maximum temperature in Celsius." },
                                            { name: "Rainfall", type: "Numerical", desc: "Amount of rainfall recorded for the day (mm)." },
                                            { name: "Evaporation", type: "Numerical", desc: "Class A pan evaporation (mm) in the 24h to 9am." },
                                            { name: "Sunshine", type: "Numerical", desc: "Number of hours of bright sunshine in the day." },
                                            { name: "WindGustDir", type: "Categorical", desc: "Direction of the strongest wind gust in the 24h to midnight." },
                                            { name: "WindGustSpeed", type: "Numerical", desc: "Speed (km/h) of strongest wind gust in the 24h to midnight." },
                                            { name: "WindDir9am", type: "Categorical", desc: "Wind direction at 9am." },
                                            { name: "WindDir3pm", type: "Categorical", desc: "Wind direction at 3pm." },
                                            { name: "WindSpeed9am", type: "Numerical", desc: "Wind speed (km/h) averaged over 10min prior to 9am." },
                                            { name: "WindSpeed3pm", type: "Numerical", desc: "Wind speed (km/h) averaged over 10min prior to 3pm." },
                                            { name: "Humidity9am", type: "Numerical", desc: "Humidity (%) at 9am." },
                                            { name: "Humidity3pm", type: "Numerical", desc: "Humidity (%) at 3pm." },
                                            { name: "Pressure9am", type: "Numerical", desc: "Atmospheric pressure (hpa) reduced to MSL at 9am." },
                                            { name: "Pressure3pm", type: "Numerical", desc: "Atmospheric pressure (hpa) reduced to MSL at 3pm." },
                                            { name: "Cloud9am", type: "Numerical", desc: "Fraction of sky obscured by cloud at 9am (oktas)." },
                                            { name: "Cloud3pm", type: "Numerical", desc: "Fraction of sky obscured by cloud at 3pm (oktas)." },
                                            { name: "Temp9am", type: "Numerical", desc: "Temperature (Celsius) at 9am." },
                                            { name: "Temp3pm", type: "Numerical", desc: "Temperature (Celsius) at 3pm." },
                                            { name: "RainToday", type: "Categorical", desc: "Did the rainfall exceed 1mm today? (Yes/No)" },
                                            { name: "RainTomorrow", type: "Target", desc: "Did it rain the next day? (Yes/No)" }
                                        ].map((f) => (
                                            <tr key={f.name} className="hover:bg-primary/5 transition-colors even:bg-surface-container-low/20">
                                                <td className="px-8 py-4 font-bold text-sm text-primary">{f.name}</td>
                                                <td className="px-8 py-4">
                                                    <span className={`px-2.5 py-1 rounded text-[9px] font-black uppercase tracking-widest border ${f.type === "Numerical" ? "bg-primary/5 text-primary border-primary/20" : f.type === "Target" ? "bg-on-surface text-white border-on-surface shadow-sm" : "bg-on-surface-variant/5 text-on-surface-variant border-outline-variant/10"}`}>
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

                        <InteractiveAnalysis
                            id="quality"
                            title="Missing Values Analysis"
                            icon={Activity}
                            pythonCode={missing_values.pythonCode}
                            plots={[{ label: "Missing Data Density", data: missing_values.chartData?.data, layout: missing_values.chartData?.layout }]}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                <div className="bg-white p-10 rounded-[2rem] border border-outline-variant/10 shadow-sm relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
                                    <div className="text-5xl font-sans font-bold text-on-surface mb-2 tracking-tighter italic">343,248</div>
                                    <div className="text-xs font-bold text-outline-variant uppercase tracking-widest">Total Null Cells in Dataset</div>
                                </div>
                                <div className="bg-on-surface p-10 rounded-[2rem] text-white shadow-xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
                                    <div className="text-5xl font-sans font-bold text-primary mb-2 tracking-tighter italic">21 <span className="text-white/20">/ 23</span></div>
                                    <div className="text-xs font-bold text-white/30 uppercase tracking-widest">Columns with missing records</div>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl border border-outline-variant/10 shadow-inner overflow-hidden overflow-x-auto overflow-y-auto max-h-[500px] custom-scrollbar">
                                <table className="w-full text-left border-collapse min-w-[800px]">
                                    <thead className="sticky top-0 z-20 bg-on-surface text-white">
                                        <tr>
                                            <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest">Feature</th>
                                            <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-center">Null Count</th>
                                            <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-center">Null %</th>
                                            <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest">Assessment</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-outline-variant/5">
                                        {[
                                            { name: "Sunshine", count: "69,835", pct: "48.01%", severity: "High", badge: "red" },
                                            { name: "Evaporation", count: "62,790", pct: "43.17%", severity: "High", badge: "red" },
                                            { name: "Cloud3pm", count: "59,358", pct: "40.81%", severity: "High", badge: "red" },
                                            { name: "Cloud9am", count: "55,888", pct: "38.42%", severity: "High", badge: "red" },
                                            { name: "Pressure9am", count: "15,065", pct: "10.36%", severity: "Medium", badge: "amber" },
                                            { name: "Pressure3pm", count: "15,028", pct: "10.33%", severity: "Medium", badge: "amber" },
                                            { name: "WindDir9am", count: "10,566", pct: "7.26%", severity: "Medium", badge: "amber" },
                                            { name: "WindGustDir", count: "10,326", pct: "7.10%", severity: "Medium", badge: "amber" },
                                            { name: "WindGustSpeed", count: "10,263", pct: "7.06%", severity: "Medium", badge: "amber" },
                                            { name: "Humidity3pm", count: "4,507", pct: "3.10%", severity: "Low", badge: "emerald" },
                                            { name: "WindDir3pm", count: "4,228", pct: "2.91%", severity: "Low", badge: "emerald" },
                                            { name: "Temp3pm", count: "3,609", pct: "2.48%", severity: "Low", badge: "emerald" },
                                            { name: "RainTomorrow", count: "3,267", pct: "2.25%", severity: "Low", badge: "emerald" }, 
                                            { name: "Rainfall", count: "3,261", pct: "2.24%", severity: "Low", badge: "emerald" },
                                            { name: "RainToday", count: "3,261", pct: "2.24%", severity: "Low", badge: "emerald" },
                                            { name: "WindSpeed3pm", count: "3,062", pct: "2.11%", severity: "Low", badge: "emerald" },
                                            { name: "Humidity9am", count: "2,654", pct: "1.82%", severity: "Low", badge: "emerald" },
                                            { name: "WindSpeed9am", count: "1,767", pct: "1.21%", severity: "Low", badge: "emerald" },
                                            { name: "Temp9am", count: "1,767", pct: "1.21%", severity: "Low", badge: "emerald" },
                                            { name: "MinTemp", count: "1,485", pct: "1.02%", severity: "Low", badge: "emerald" },
                                            { name: "MaxTemp", count: "1,261", pct: "0.87%", severity: "Low", badge: "emerald" }
                                        ].map((m) => (
                                            <tr key={m.name} className="hover:bg-primary/5 transition-colors even:bg-surface-container-low/5">
                                                <td className="px-8 py-4 font-bold text-sm text-on-surface">{m.name}</td>
                                                <td className="px-8 py-4 text-center text-sm font-medium text-on-surface-variant opacity-60">{m.count}</td>
                                                <td className="px-8 py-4 text-center font-black text-primary text-sm italic">{m.pct}</td>
                                                <td className="px-8 py-4">
                                                    <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-tight ${m.badge === "red" ? "text-red-600" : m.badge === "amber" ? "text-amber-600" : "text-emerald-600"}`}>
                                                        <div className={`w-2 h-2 rounded-full ${m.badge === "red" ? "bg-red-500" : m.badge === "amber" ? "bg-amber-500" : "bg-emerald-500"}`} />
                                                        {m.severity}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </InteractiveAnalysis>

                        <InteractiveAnalysis
                            id="distribution"
                            title="Numerical Features Distributions"
                            icon={Layers}
                            headerImage={true}
                            pythonCode={numerical_distribution.pythonCode}
                            plots={[
                                { label: "MinTemp", data: numerical_distribution.minTempChart?.data, layout: numerical_distribution.minTempChart?.layout },
                                { label: "MaxTemp", data: numerical_distribution.maxTempChart?.data, layout: numerical_distribution.maxTempChart?.layout },
                                { label: "Rainfall", data: numerical_distribution.rainfallChart?.data, layout: numerical_distribution.rainfallChart?.layout },
                                { label: "Evaporation", data: numerical_distribution.evaporationChart?.data, layout: numerical_distribution.evaporationChart?.layout },
                                { label: "Sunshine", data: numerical_distribution.sunshineChart?.data, layout: numerical_distribution.sunshineChart?.layout },
                                { label: "WindGustSpeed", data: numerical_distribution.windGustSpeedChart?.data, layout: numerical_distribution.windGustSpeedChart?.layout },
                                { label: "WindSpeed9am", data: numerical_distribution.windSpeed9amChart?.data, layout: numerical_distribution.windSpeed9amChart?.layout },
                                { label: "WindSpeed3pm", data: numerical_distribution.windSpeed3pmChart?.data, layout: numerical_distribution.windSpeed3pmChart?.layout },
                                { label: "Humidity9am", data: numerical_distribution.humidity9amChart?.data, layout: numerical_distribution.humidity9amChart?.layout },
                                { label: "Humidity3pm", data: numerical_distribution.humidity3pmChart?.data, layout: numerical_distribution.humidity3pmChart?.layout },
                                { label: "Pressure9am", data: numerical_distribution.pressure9amChart?.data, layout: numerical_distribution.pressure9amChart?.layout },
                                { label: "Pressure3pm", data: numerical_distribution.pressure3pmChart?.data, layout: numerical_distribution.pressure3pmChart?.layout },
                                { label: "Cloud9am", data: numerical_distribution.cloud9amChart?.data, layout: numerical_distribution.cloud9amChart?.layout },
                                { label: "Cloud3pm", data: numerical_distribution.cloud3pmChart?.data, layout: numerical_distribution.cloud3pmChart?.layout },
                                { label: "Temp9am", data: numerical_distribution.temp9amChart?.data, layout: numerical_distribution.temp9amChart?.layout },
                                { label: "Temp3pm", data: numerical_distribution.temp3pmChart?.data, layout: numerical_distribution.temp3pmChart?.layout }
                            ]}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                                {[
                                    { label: "MinTemp", mean: "12.19", median: "12.00", std: "6.40" },
                                    { label: "MaxTemp", mean: "23.22", median: "22.60", std: "7.12" }, // Fixed the typo 23,22 to 23.22
                                    { label: "Rainfall", mean: "2.35", median: "0.00", std: "8.48" },
                                    { label: "Evaporation", mean: "5.47", median: "4.80", std: "4.19" },
                                    { label: "Sunshine", mean: "7.61", median: "8.40", std: "3.79" },
                                    { label: "WindGustSpeed", mean: "40.04", median: "39.00", std: "13.61" },
                                    { label: "WindSpeed9am", mean: "14.04", median: "13.00", std: "8.92" },
                                    { label: "WindSpeed3pm", mean: "18.66", median: "19.00", std: "8.81" },
                                    { label: "Humidity9am", mean: "68.88", median: "70.00", std: "19.03" },
                                    { label: "Humidity3pm", mean: "51.54", median: "52.00", std: "20.80" },
                                    { label: "Pressure9am", mean: "1017.65", median: "1017.60", std: "7.11" },
                                    { label: "Pressure3pm", mean: "1015.26", median: "1015.20", std: "7.04" },
                                    { label: "Cloud9am", mean: "4.45", median: "5.00", std: "2.89" },
                                    { label: "Cloud3pm", mean: "4.51", median: "5.00", std: "2.72" },
                                    { label: "Temp9am", mean: "16.99", median: "16.70", std: "6.49" },
                                    { label: "Temp3pm", mean: "21.68", median: "21.10", std: "6.94" }
                                ].map((stat) => (
                                    <div key={stat.label} className="bg-white p-8 rounded-2xl border border-outline-variant/10 shadow-sm relative group hover:shadow-xl transition-all border-l-4 border-l-primary">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="text-on-surface font-bold text-sm tracking-tight">{stat.label}</div>
                                            <BarChart3 size={16} className="text-outline-variant group-hover:text-primary transition-colors" />
                                        </div>
                                        <div className="space-y-4 text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">
                                            <div className="flex justify-between border-b border-outline-variant/5 pb-2"><span>MEAN</span> <span className="text-on-surface font-black italic">{stat.mean}</span></div>
                                            <div className="flex justify-between border-b border-outline-variant/5 pb-2"><span>MEDIAN</span> <span className="text-on-surface font-black italic">{stat.median}</span></div>
                                            <div className="flex justify-between"><span>STD DEV</span> <span className="text-on-surface font-black italic">{stat.std}</span></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </InteractiveAnalysis>

                        <InteractiveAnalysis
                            id="outliers"
                            title="Outlier Detection (IQR Method)"
                            icon={BoxSelect}
                            pythonCode={outlier_detection.pythonCode}
                            plots={[]}
                        >
                            <div className="bg-white rounded-[2.5rem] border border-outline-variant/10 shadow-sm overflow-hidden overflow-x-auto overflow-y-auto max-h-[500px] shadow-on-surface/5 custom-scrollbar">
                                <table className="w-full text-left border-collapse min-w-[1000px]">
                                    <thead className="sticky top-0 z-20 bg-on-surface text-white">
                                        <tr>
                                            <th className="px-10 py-5 text-[11px] font-bold uppercase tracking-widest">Feature</th>
                                            <th className="px-10 py-5 text-[11px] font-bold uppercase tracking-widest">Anomaly Volume</th>
                                            <th className="px-10 py-5 text-[11px] font-bold uppercase tracking-widest">Arrest Range (IQR)</th>
                                            <th className="px-10 py-5 text-[11px] font-bold uppercase tracking-widest">Assessment</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-outline-variant/5">
                                        {[
                                            { name: "Rainfall", count: "25,578 (17.58%)", severity: "High", badge: "red", range: "[-1.20, 2.00]" },
                                            { name: "WindGustSpeed", count: "3,092 (2.13%)", severity: "Medium", badge: "amber", range: "[5.50, 73.50]" },
                                            { name: "WindSpeed3pm", count: "2,523 (1.73%)", severity: "Medium", badge: "amber", range: "[-3.50, 40.50]" },
                                            { name: "Evaporation", count: "1,995 (1.37%)", severity: "Medium", badge: "amber", range: "[-4.60, 14.60]" },
                                            { name: "WindSpeed9am", count: "1,817 (1.25%)", severity: "Medium", badge: "amber", range: "[-11.00, 37.00]" },
                                            { name: "Humidity9am", count: "1,425 (0.98%)", severity: "Low", badge: "emerald", range: "[18.00, 122.00]" },
                                            { name: "Pressure9am", count: "1,191 (0.82%)", severity: "Low", badge: "emerald", range: "[998.65, 1036.65]" },
                                            { name: "Pressure3pm", count: "919 (0.63%)", severity: "Low", badge: "emerald", range: "[996.00, 1034.40]" },
                                            { name: "Temp3pm", count: "764 (0.53%)", severity: "Low", badge: "emerald", range: "[1.90, 41.10]" },
                                            { name: "MaxTemp", count: "489 (0.34%)", severity: "Low", badge: "emerald", range: "[2.45, 43.65]" },
                                            { name: "Temp9am", count: "262 (0.18%)", severity: "Low", badge: "emerald", range: "[-1.65, 35.55]" },
                                            { name: "MinTemp", count: "54 (0.04%)", severity: "Low", badge: "emerald", range: "[-6.35, 30.85]" },
                                            { name: "Sunshine", count: "0 (0.00%)", severity: "None", badge: "emerald", range: "[-3.90, 19.30]" },
                                            { name: "Humidity3pm", count: "0 (0.00%)", severity: "None", badge: "emerald", range: "[-6.50, 109.50]" },
                                            { name: "Cloud9am", count: "0 (0.00%)", severity: "None", badge: "emerald", range: "[-8.00, 16.00]" },
                                            { name: "Cloud3pm", count: "0 (0.00%)", severity: "None", badge: "emerald", range: "[-5.50, 14.50]" }
                                        ].map((o) => (
                                            <tr key={o.name} className="hover:bg-primary/5 transition-colors even:bg-surface-container-low/20">
                                                <td className="px-10 py-5 font-bold text-sm text-on-surface">{o.name}</td>
                                                <td className="px-10 py-5 font-medium text-sm text-on-surface-variant italic opacity-60">{o.count}</td>
                                                <td className="px-10 py-5 text-[11px] font-mono text-primary font-black tracking-widest uppercase">{o.range}</td>
                                                <td className="px-10 py-5">
                                                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black tracking-[0.1em] border ${o.badge === "red" ? "bg-red-50 text-red-600 border-red-100" : o.badge === "amber" ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"}`}>
                                                        {o.severity}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </InteractiveAnalysis>

                        <InteractiveAnalysis
                            id="categorical"
                            title="Categorical Features Distribution"
                            icon={GitMerge}
                            pythonCode={categorical_distribution.pythonCode}
                            plots={[
                                { label: "Date", data: categorical_distribution.dateChart?.data, layout: categorical_distribution.dateChart?.layout },
                                { label: "Location", data: categorical_distribution.locationChart?.data, layout: categorical_distribution.locationChart?.layout },
                                { label: "WindGustDir", data: categorical_distribution.windGustDirChart?.data, layout: categorical_distribution.windGustDirChart?.layout },
                                { label: "WindDir9am", data: categorical_distribution.windDir9amChart?.data, layout: categorical_distribution.windDir9amChart?.layout },
                                { label: "WindDir3pm", data: categorical_distribution.windDir3pmChart?.data, layout: categorical_distribution.windDir3pmChart?.layout },
                                { label: "RainToday", data: categorical_distribution.rainTodayChart?.data, layout: categorical_distribution.rainTodayChart?.layout }
                            ]}
                        />

                        <InteractiveAnalysis
                            id="targetLikelihood"
                            title="Target vs Categorical Features"
                            icon={Target}
                            pythonCode={target_vs.pythonCode}
                            plots={[
                                { label: "Date", data: target_vs.dateChart?.data, layout: target_vs.dateChart?.layout },
                                { label: "Location", data: target_vs.locationChart?.data, layout: target_vs.locationChart?.layout },
                                { label: "WindGustDir", data: target_vs.windGustDirChart?.data, layout: target_vs.windGustDirChart?.layout },
                                { label: "WindDir9am", data: target_vs.windDir9amChart?.data, layout: target_vs.windDir9amChart?.layout },
                                { label: "WindDir3pm", data: target_vs.windDir3pmChart?.data, layout: target_vs.windDir3pmChart?.layout },
                                { label: "RainToday", data: target_vs.rainTodayChart?.data, layout: target_vs.rainTodayChart?.layout },
                            ]}
                        />

                        <InteractiveAnalysis
                            id="targetRel"
                            title="Correlation Analysis"
                            icon={BarChart}
                            pythonCode={correlation_analysis.pythonCode}
                            plots={[
                                { label: "Pearson Matrix", data: correlation_analysis.chartData?.data, layout: correlation_analysis.chartData?.layout },
                            ]}
                        />

                        <InteractiveAnalysis
                            id="time-series-seasonality"
                            title="Time-Series & Seasonality Analysis"
                            icon={Calendar}
                            pythonCode={timeseries.pythonCode}
                            plots={[
                                { label: "Newcastle", data: timeseries.newcastleChart?.data, layout: timeseries.newcastleChart?.layout },
                                { label: "Richmond", data: timeseries.richmondChart?.data, layout: timeseries.richmondChart?.layout },
                                { label: "Sydney", data: timeseries.sydneyChart?.data, layout: timeseries.sydneyChart?.layout },
                                { label: "Wollongong", data: timeseries.wollongongChart?.data, layout: timeseries.wollongongChart?.layout },
                                { label: "Canberra", data: timeseries.canberraChart?.data, layout: timeseries.canberraChart?.layout },
                                { label: "Ballarat", data: timeseries.ballaratChart?.data, layout: timeseries.ballaratChart?.layout },
                                { label: "Bendigo", data: timeseries.bendigoChart?.data, layout: timeseries.bendigoChart?.layout },
                                { label: "Melbourne", data: timeseries.melbourneChart?.data, layout: timeseries.melbourneChart?.layout },
                                { label: "Portland", data: timeseries.portlandChart?.data, layout: timeseries.portlandChart?.layout },
                                { label: "Brisbane", data: timeseries.brisbaneChart?.data, layout: timeseries.brisbaneChart?.layout },
                                { label: "GoldCoast", data: timeseries.goldcoastChart?.data, layout: timeseries.goldcoastChart?.layout }, // If your JSON uses lowercase 'c', change this to goldcoastChart
                                { label: "Adelaide", data: timeseries.adelaideChart?.data, layout: timeseries.adelaideChart?.layout },
                                { label: "Perth", data: timeseries.perthChart?.data, layout: timeseries.perthChart?.layout },
                                { label: "Hobart", data: timeseries.hobartChart?.data, layout: timeseries.hobartChart?.layout },
                                { label: "Launceston", data: timeseries.launcestonChart?.data, layout: timeseries.launcestonChart?.layout },
                                { label: "Darwin", data: timeseries.darwinChart?.data, layout: timeseries.darwinChart?.layout }
                            ]}
                        />

                        {/* Records Archive Section */}
                        <section className="py-8 border-t border-outline-variant/10" id="sampling">
                            <div className="bg-on-surface rounded-[4rem] p-16 text-white shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3" />
                                <div className="relative z-10">
                                    <div className="max-w-3xl mb-16">
                                        <h2 className="text-5xl font-extrabold mb-8 tracking-tighter italic shadow-sm">Exploration Archives</h2>
                                        <p className="text-white/40 text-xl font-medium leading-relaxed italic">
                                            Query isolated meteorogical archives from the baseline, stratified by RainTomorrow outcome. Utilize the Archive Dice to refresh the study sample.
                                        </p>
                                    </div>
                                    <div className="flex flex-col xl:flex-row gap-12 items-center">
                                        <button
                                            onClick={rollDice}
                                            disabled={isRolling}
                                            className="group flex flex-col items-center gap-4 p-10 bg-white text-on-surface rounded-[2.5rem] hover:bg-primary hover:text-white transition-all shadow-2xl disabled:opacity-50 cursor-pointer min-w-[240px] active:scale-95 focus:outline-none"
                                        >
                                            <div className={`transition-transform duration-[1200ms] ${isRolling ? "rotate-[720deg]" : ""}`}>
                                                <Dices size={48} />
                                            </div>
                                            <span className="text-[10px] font-black tracking-[0.3em] uppercase">Study Dice</span>
                                        </button>
                                        <div className="flex-1 space-y-6">
                                            <div className="flex items-center gap-4 text-primary text-sm font-black uppercase tracking-[0.2em] mb-4">
                                                <Info size={16} />
                                                Active Archive Filter: RainTomorrow
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="p-8 bg-white/5 rounded-3xl border border-white/5">
                                                    <div className="text-[10px] font-bold text-white/20 uppercase mb-2 mr-2">Study Class A</div>
                                                    <div className="text-3xl font-bold tracking-tighter italic">"Yes" Archive</div>
                                                </div>
                                                <div className="p-8 bg-white/5 rounded-3xl border border-white/5">
                                                    <div className="text-[10px] font-bold text-white/20 uppercase mb-2 mr-2">Study Class B</div>
                                                    <div className="text-3xl font-bold tracking-tighter italic">"No" Archive</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-16">
                                {renderTable(yesRows, "Yes", <Zap size={20} className="text-primary" />)}
                                {renderTable(noRows, "No", <Info size={20} className="text-secondary" />)}
                            </div>
                        </section>
                    </div>

                    {/* Global Study Summary */}
                    <section className="py-20 bg-white border-t border-outline-variant/10 relative overflow-hidden" id="findings">
                        <div className="max-w-[1240px] mx-auto px-10 relative">
                            <div className="flex flex-col items-center mb-24">
                                <div className="px-5 py-2 bg-primary/5 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-primary/10">Key Insight</div>
                                <h2 className="text-6xl md:text-7xl font-extrabold tracking-tighter text-center italic leading-[1] text-on-surface max-w-4xl">Study Summary</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                                {/* Box 1: Dataset Overview */}
                                <div className="p-12 bg-white rounded-[3.5rem] border border-outline-variant/10 shadow-sm hover:shadow-2xl transition-all border-t-[12px] border-t-primary cursor-default group">
                                    <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-10 transition-transform group-hover:scale-110"><Database size={32} /></div>
                                    <h3 className="text-2xl font-bold mb-6 tracking-tight italic">Dataset Overview</h3>
                                    <p className="text-on-surface-variant leading-relaxed font-medium opacity-70 mb-4">
                                        A comprehensive historical weather dataset comprising 10 years of daily observations (2007-2017) across Australia.
                                    </p>
                                    <ul className="text-sm text-on-surface-variant/80 space-y-2 font-medium">
                                        <li>• <strong>Total Records:</strong> 145,460 rows</li>
                                        <li>• <strong>Features:</strong> 23 columns (Categorical & Numerical)</li>
                                        <li>• <strong>Locations:</strong> 49 distinct weather stations</li>
                                        <li>• <strong>Target Variable:</strong> RainTomorrow (Binary)</li>
                                    </ul>
                                </div>

                                {/* Box 2: Target Imbalance */}
                                <div className="p-12 bg-white rounded-[3.5rem] border border-outline-variant/10 shadow-sm hover:shadow-2xl transition-all border-t-[12px] border-t-secondary cursor-default group">
                                    <div className="w-16 h-16 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-10 transition-transform group-hover:scale-110"><PieChart size={32} /></div>
                                    <h3 className="text-2xl font-bold mb-6 tracking-tight italic">Target Imbalance</h3>
                                    <p className="text-on-surface-variant leading-relaxed font-medium opacity-70 mb-4">
                                        The target variable exhibits a severe 3.46:1 class imbalance, requiring handling prior to model training.
                                    </p>
                                    <ul className="text-sm text-on-surface-variant/80 space-y-2 font-medium mb-4">
                                        <li>• <strong>No (Dry Days):</strong> 110,316 (77.6%)</li>
                                        <li>• <strong>Yes (Rainy Days):</strong> 31,877 (22.4%)</li>
                                        <li>• <strong>Unlabeled:</strong> 3,267 rows missing target data</li>
                                    </ul>
                                    <div className="bg-secondary/10 text-secondary-dark p-3 rounded-xl text-sm font-semibold">
                                        💡 Suggestion: Drop unlabeled rows. Use SMOTE or class weights during training.
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                                {/* Box 3: Missing Data - Updated with Subtle Background Color */}
                                <div className="p-12 bg-white rounded-[3.5rem] border border-outline-variant/10 shadow-sm hover:shadow-2xl transition-all border-t-[12px] border-t-amber-200 cursor-default group">
                                    <div className="w-16 h-16 rounded-2xl bg-amber-200/20 text-amber-200 flex items-center justify-center mb-10 transition-transform group-hover:scale-110"><FileWarning size={32} /></div>
                                    <h3 className="text-2xl font-bold mb-6 tracking-tight italic">Missing Data Analysis</h3>                                  
                                    <p className="text-on-surface-variant leading-relaxed font-medium opacity-70 mb-4">
                                        ⚠️ Detected 343,248 missing cells across 21 features. 9 features are missing &gt;5% of their data:
                                    </p>
                                    
                                    <div className="grid grid-cols-2 gap-2 text-sm text-on-surface-variant/80 font-medium mb-4">
                                        <ul className="space-y-1">
                                            <li>• Sunshine: 48.0%</li>
                                            <li>• Evaporation: 43.2%</li>
                                            <li>• Cloud3pm: 40.8%</li>
                                            <li>• Cloud9am: 38.4%</li>
                                            <li>• Pressure9am: 10.4%</li>
                                        </ul>
                                        <ul className="space-y-1">
                                            <li>• Pressure3pm: 10.3%</li>
                                            <li>• WindDir9am: 7.3%</li>
                                            <li>• WindGustDir: 7.1%</li>
                                            <li>• WindGustSpeed: 7.1%</li>
                                        </ul>
                                    </div>
                                    
                                    <div className="bg-amber-100 text-amber-900 p-3 rounded-xl text-sm font-semibold">
                                        💡 Suggestion: Drop Sunshine. Use KNN Imputation for the remaining high-missing features.
                                    </div>
                                </div>

                                {/* Box 4: Outlier Detection */}
                                <div className="p-12 bg-white rounded-[3.5rem] border border-outline-variant/10 shadow-sm hover:shadow-2xl transition-all border-t-[12px] border-t-tertiary cursor-default group">
                                    <div className="w-16 h-16 rounded-2xl bg-tertiary/10 text-tertiary flex items-center justify-center mb-10 transition-transform group-hover:scale-110"><Activity size={32} /></div>
                                    <h3 className="text-2xl font-bold mb-6 tracking-tight italic">Outlier Detection (IQR)</h3>
                                    <p className="text-on-surface-variant leading-relaxed font-medium opacity-70 mb-4">
                                        ⚠️ Detected 40,109 outliers across 16 numerical features. 5 features exceed 1% outliers:
                                    </p>
                                    <ul className="text-sm text-on-surface-variant/80 space-y-2 font-medium mb-4">
                                        <li><span className="text-error font-bold">• Rainfall:</span> 25,578 outliers (17.58%)</li>
                                        <li>• WindGustSpeed: 3,092 outliers (2.13%)</li>
                                        <li>• WindSpeed3pm: 2,523 outliers (1.73%)</li>
                                        <li>• Evaporation: 1,995 outliers (1.37%)</li>
                                        <li>• WindSpeed9am: 1,817 outliers (1.25%)</li>
                                    </ul>
                                    <div className="bg-tertiary/10 text-tertiary-dark p-3 rounded-xl text-sm font-semibold">
                                        💡 Suggestion: Log Transform Rainfall (real storms). Winsorize wind/evaporation at 99th percentile.
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {/* Box 5: Multicollinearity */}
                                <div className="p-12 bg-white rounded-[3.5rem] border border-outline-variant/10 shadow-sm hover:shadow-2xl transition-all border-t-[12px] border-t-amber-500 cursor-default group">
                                    <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-10 transition-transform group-hover:scale-110"><Link size={32} /></div>
                                    <h3 className="text-2xl font-bold mb-6 tracking-tight italic">Multicollinearity Mitigation</h3>
                                    <p className="text-on-surface-variant leading-relaxed font-medium opacity-70 mb-4">
                                        ⚠️ Detected 7 highly correlated feature pairs (|r| &gt; 0.7) that will distort linear models:
                                    </p>
                                    <div className="grid grid-cols-2 gap-2 text-sm text-on-surface-variant/80 font-medium mb-4">
                                        <ul className="space-y-1">
                                            <li>• MaxTemp ↔ Temp3pm (0.98)</li>
                                            <li>• Pressure9am ↔ 3pm (0.96)</li>
                                            <li>• MinTemp ↔ Temp9am (0.90)</li>
                                            <li>• Temp9am ↔ Temp3pm (0.86)</li>
                                        </ul>
                                        <ul className="space-y-1">
                                            <li>• MinTemp ↔ MaxTemp (0.73)</li>
                                            <li>• MinTemp ↔ Temp3pm (0.70)</li>
                                            <li>• Cloud3pm ↔ Sunshine (-0.70)</li>
                                        </ul>
                                    </div>
                                    <div className="bg-amber-500/10 text-amber-700 p-3 rounded-xl text-sm font-semibold">
                                        💡 Suggestion: Drop time-specific readings (9am/3pm) and keep daily summaries.
                                    </div>
                                </div>

                                {/* Box 6: Geospatial Seasonality */}
                                <div className="p-12 bg-white rounded-[3.5rem] border border-outline-variant/10 shadow-sm hover:shadow-2xl transition-all border-t-[12px] border-t-emerald-500 cursor-default group">
                                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-10 transition-transform group-hover:scale-110"><Calendar size={32} /></div>
                                    <h3 className="text-2xl font-bold mb-6 tracking-tight italic">Geospatial Seasonality</h3>
                                    <p className="text-on-surface-variant leading-relaxed font-medium opacity-70 mb-4">
                                        Weather patterns are heavily cyclical, but completely inverse depending on the specific location (e.g., Perth winter rains vs. Darwin summer monsoons). 
                                    </p>
                                    <p className="text-on-surface-variant leading-relaxed font-medium opacity-70 mb-4">
                                        Raw Date strings (YYYY-MM-DD) cause machine learning algorithms to treat every day as a unique, random event without context.
                                    </p>
                                    <div className="bg-emerald-500/10 text-emerald-700 p-3 rounded-xl text-sm font-semibold">
                                        💡 Suggestion: Feature Engineer by extracting the "Month" from the Date column so models can learn localized rules.
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Design BG */}
                        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/[0.03] rounded-full blur-[100px]" />
                    </section>

                        </>
                    ) : (
                        <TabularPipeline onBack={onBack} isEmbedded={true} />
                    )}
                </div>
            </main>
        </div>
    );
}
