import React, { useState, useEffect } from "react";
import heroMultimodalImage from "../assets/images/image/artemis_multimodal.png";
import { motion, AnimatePresence } from "motion/react";
import Plot from "react-plotly.js";
import {
    ArrowLeft,
    BookOpen,
    Database,
    FileText,
    AlertTriangle,
    Layout,
    ChevronDown,
    Copy,
    Target,
    Link,
    Hash,
    Sparkles,
    CheckCircle2,
    Info,
    Users,
    Columns,
    Layers,
    Image as ImageIcon,
    Palette,
    Smile,
    MessageSquare,
    Globe,
    Maximize,
    Type,
    MoveHorizontal,
    MoveVertical,
    CircleDot,
    RefreshCw
} from "lucide-react";

// Import Analysis Data
import emotionDistribution from "../assets/data/multimodalEDA/emotion_distribution.json";
import top15ArtStyles from "../assets/data/multimodalEDA/top_15_art_styles.json";
import imageWidthDist from "../assets/data/multimodalEDA/image_width_distribution.json";
import imageHeightDist from "../assets/data/multimodalEDA/image_height_distribution.json";
import imageAspectRatioDist from "../assets/data/multimodalEDA/image_aspect_ratio_distribution.json";
import imageDimensionsScatter from "../assets/data/multimodalEDA/image_dimensions_scatter.json";
import styleEmotionHeatmap from "../assets/data/multimodalEDA/style_emotion_heatmap.json";
import topEmotionProportionsByStyle from "../assets/data/multimodalEDA/top_emotion_proportions_by_style.json";
import topWordsByEmotion from "../assets/data/multimodalEDA/top_words_by_emotion.json";
import textLengthDist from "../assets/data/multimodalEDA/text_length_distribution.json";
import imageUtterances from "../assets/data/multimodalEDA/image_utterances.json";
import MultimodalML from "./MultimodalML";
import { Brain, BarChart3 } from "lucide-react";

// Import Sample Images Dynamically
const sampleFiles = import.meta.glob("../assets/data/multimodalEDA/sample/*.{jpg,png}", { eager: true });
const allSampleImages = Object.entries(sampleFiles).map(([path, mod]: [string, any]) => {
    const fileName = path.split('/').pop() || '';
    const nameParts = fileName.replace(/\.[^/.]+$/, "").split('_');
    const authorRaw = nameParts[0]?.replace(/-/g, ' ') || 'Unknown Artist';
    const titleRaw = nameParts[1]?.replace(/-/g, ' ') || 'Artemis Collection';
    
    // Match with CSV mapping
    const mapping = (imageUtterances as any)[fileName];
    if (!mapping) return null;

    return {
        src: mod.default || mod, // Handle both module object and direct URL string
        author: authorRaw.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        year: titleRaw.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        emotion: mapping.emotion,
        utterance: mapping.utterance
    };
}).filter((item): item is NonNullable<typeof item> => item !== null);

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

const InteractiveAnalysis = ({ id, title, subtitle, icon: Icon, pythonCode, observation, children, defaultOpen = false }: any) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [showCode, setShowCode] = useState(false);

    const handleCopy = () => {
        if (pythonCode) navigator.clipboard.writeText(pythonCode);
    };

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
                                    
                                    {observation && (
                                        <div className="bg-surface-container-low rounded-2xl p-6 border-l-4 border-primary/40">
                                            <div className="flex items-start gap-4">
                                                <div className="mt-1 text-primary">
                                                    <Sparkles size={18} />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-black uppercase tracking-widest text-primary mb-2 block">Analytical Observation</span>
                                                    <p className="text-sm font-medium text-on-surface leading-relaxed italic opacity-80">
                                                        {observation}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default function MultimodalEDA({ onBack, initialMode = "eda" }: { onBack: () => void, initialMode?: "eda" | "ml" }) {
    const [activeNav, setActiveNav] = useState("overview");
    const [activeMode, setActiveMode] = useState<"eda" | "ml">(initialMode);
    const [selectedMetric, setSelectedMetric] = useState("width");
    const [selectedEmotionWord, setSelectedEmotionWord] = useState("amusement");
    const [displaySamples, setDisplaySamples] = useState<any[]>([]);
    const [displayUtterances, setDisplayUtterances] = useState<any[]>([]);

    const utteranceSamples = [
        { emotion: "contentment", text: "The colors are so vibrant and full of life, it reminds me of a sunny afternoon in the garden.", style: "Impressionism" },
        { emotion: "fear", text: "I feel like that tree is going to fall on the people in the boat, the darkness is overwhelming.", style: "Romanticism" },
        { emotion: "sadness", text: "The man's brow is furrowed and his face looks gaunt. The colours evoke a darker emotion of loss and regret.", style: "Realism" },
        { emotion: "awe", text: "The vastness of the ocean makes me feel small but incredibly peaceful. The scale is breathtaking.", style: "Romanticism" },
        { emotion: "excitement", text: "The bright yellows and oranges make the painting feel like it's glowing from within, very energetic.", style: "Expressionism" },
        { emotion: "amusement", text: "The characters in the painting look like they're share a secret joke, it's quite whimsical and fun.", style: "Surrealism" },
        { emotion: "anger", text: "The brushstrokes are chaotic, reflecting a sense of internal turmoil and confusion. Intense and sharp.", style: "Abstract" },
        { emotion: "disgust", text: "The color palette is muddy and unpleasant, giving me a feeling of decay and neglect.", style: "Gothic" },
        { emotion: "contentment", text: "The composition is so balanced, it brings a sense of order and calm to my mind immediately.", style: "Classical" },
        { emotion: "awe", text: "The way the light hits the water is absolutely magical, I could stare at it for hours without blinking.", style: "Impressionism" },
        { emotion: "fear", text: "The picture is dark, in browns and blacks. The shadows are deep and hiding something sinister.", style: "Baroque" },
        { emotion: "sadness", text: "It's so abstract that I find it difficult to connect with, it feels cold and distant from humanity.", style: "Post-Modern" },
        { emotion: "amusement", text: "This reminds me of a funny childhood memory, sitting on the porch as the sun went down with family.", style: "Realism" },
        { emotion: "excitement", text: "The contrast between the soft sky and the jagged rocks is visually striking and full of movement.", style: "Nature" },
        { emotion: "awe", text: "Beautiful use of colors and light, it feels like a portal to another world entirely.", style: "Fantasy" }
    ];

    const emotionList = ["amusement", "anger", "awe", "contentment", "disgust", "excitement", "fear", "sadness"];

    const shuffleSamples = () => {
        const shuffledImgs = [...allSampleImages].sort(() => 0.5 - Math.random());
        setDisplaySamples(shuffledImgs.slice(0, 8));
    };

    const imageMetrics = [
        { id: "width", label: "Width", icon: MoveHorizontal },
        { id: "height", label: "Height", icon: MoveVertical },
        { id: "ratio", label: "Aspect Ratio", icon: Maximize },
        { id: "scatter", label: "Correlation", icon: CircleDot }
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
        shuffleSamples();

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
        { id: "metadata-overview", label: "Technical Schema" },
        { id: "sample-gallery", label: "Sample Visualization" },
        { id: "emotion-dist", label: "Emotion Labels" },
        { id: "art-style-dist", label: "Art Movements" },
        { id: "image-metadata", label: "Visual Properties" },
        { id: "text-length", label: "Textual Density" },
        { id: "style-emotion", label: "Style vs Emotion" },
        { id: "style-emotion-bar", label: "Emotional Landscape" },
        { id: "top-words", label: "Lexical Patterns" },
    ];

    return (
        <div className="min-h-screen relative bg-[#f8fafb] selection:bg-primary/20 text-on-surface font-sans antialiased">
            <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f3f5; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #00685f; border-radius: 10px; border: 2.5px solid #f1f3f5; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #004d46; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .js-plotly-plot .plotly .modebar { left: 50%; transform: translateX(-50%); }
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
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40 mb-10 pl-6">Multimodal EDA</h3>
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
                                        Multimodal Synthesis Analysis
                                    </div>
                                    <h1 className="text-6xl md:text-7xl font-extrabold mb-8 tracking-tighter leading-[1] text-on-surface">
                                        ArtEmis Dataset <br />
                                        <span className="text-primary italic font-serif opacity-90">Affective Study Report.</span>
                                    </h1>
                                    <p className="text-lg text-on-surface-variant leading-relaxed max-w-2xl font-medium mb-12 opacity-80">
                                        Exploring the emotional landscape of art through image-text pairs. A curated subset from the ArtEmis corpus with human affective annotations.
                                    </p>
                                    <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                        <div className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-low rounded-xl border border-outline-variant/10 text-[10px] font-black uppercase tracking-widest">
                                            <ImageIcon size={14} className="text-primary" />
                                            10,000+ Images
                                        </div>
                                        <div className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-low rounded-xl border border-outline-variant/10 text-[10px] font-black uppercase tracking-widest text-emerald-600">
                                            <CheckCircle2 size={14} />
                                            Language: English
                                        </div>
                                        <div className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-low rounded-xl border border-outline-variant/10 text-[10px] font-black uppercase tracking-widest text-secondary">
                                            <Palette size={14} />
                                            Art Styles: Multi
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
                                                <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Statistical Summary</span>
                                                <span className="px-3 py-1 bg-surface-container-high rounded-full text-[9px] font-bold uppercase tracking-tight">Subset</span>
                                            </div>
                                            <div className="space-y-5">
                                                {[
                                                    { label: "Total Rows", val: "49,148" },
                                                    { label: "Unique Images", val: "10,000" },
                                                    { label: "Art Movements", val: "27" },
                                                    { label: "Emotion Types", val: "8" },
                                                    { label: "Avg Text Len", val: "15.3 words" },
                                                    { label: "Data Health", val: "100% Clean" }
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
                                                    <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Project contributor</span>
                                                </div>
                                                <div className="flex flex-wrap gap-4">
                                                    {[
                                                        "Đặng Duy Nguyên"
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
                                    <ImagePlaceholder label="Artemis Visual Scene" src={heroMultimodalImage} className="min-h-[280px]" />
                                </motion.div>
                            </div>

                            {/* Core KPIs */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-24">
                                <StatCard label="Entries" value="49,148" icon={Database} />
                                <StatCard label="Styles" value="27" icon={Palette} />
                                <StatCard label="Emotions" value="8" icon={Smile} />
                                <StatCard label="Image Scale" value="Medium" icon={Maximize} />
                            </div>
                        </div>
                    </section>


                    <div className="max-w-[1240px] mx-auto pb-40 px-4 lg:px-0">
                                {/* 3. Dataset Overview */}
                                <InteractiveAnalysis
                                    id="metadata-overview"
                                    title="Dataset Overview"
                                    subtitle="Technical schema, shape, and field distributions."
                                    icon={Database}
                                    pythonCode={`# Dataset dimensions
print(f"Dataset shape: {df.shape}")

# Column information
print("\\nColumns:", df.columns.tolist())
df.info()`}
                                >
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        <div className="bg-white rounded-3xl p-8 border border-outline-variant/10 shadow-sm">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6">Technical Dimensions</h4>
                                            <div className="space-y-6">
                                                <div className="flex justify-between items-end border-b border-outline-variant/5 pb-4">
                                                    <span className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-tight">Total Observations</span>
                                                    <span className="text-2xl font-black text-on-surface">49,056</span>
                                                </div>
                                                <div className="flex justify-between items-end border-b border-outline-variant/5 pb-4">
                                                    <span className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-tight">Available Features</span>
                                                    <span className="text-2xl font-black text-on-surface">8</span>
                                                </div>
                                                <div className="flex justify-between items-end">
                                                    <span className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-tight">Memory Footprint</span>
                                                    <span className="text-2xl font-black text-on-surface">3.0+ MB</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-slate-950 rounded-3xl p-8 border border-white/5 font-mono text-[11px] overflow-hidden">
                                            <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 mb-6 font-sans">Data Schema Analysis</h4>
                                            <div className="space-y-3 custom-scrollbar overflow-x-auto">
                                                {[
                                                    { id: 0, name: "emotion", type: "object", count: "49,056" },
                                                    { id: 1, name: "utterance", type: "object", count: "49,056" },
                                                    { id: 2, name: "art_style", type: "object", count: "49,056" },
                                                    { id: 3, name: "painting", type: "object", count: "49,056" },
                                                    { id: 4, name: "anchor_art_style", type: "object", count: "49,056" },
                                                    { id: 5, name: "anchor_painting", type: "object", count: "49,056" },
                                                    { id: 6, name: "repetition", type: "int64", count: "49,056" },
                                                    { id: 7, name: "filename", type: "object", count: "49,056" },
                                                ].map((col) => (
                                                    <div key={col.id} className="grid grid-cols-4 gap-4 py-1 border-b border-white/5 text-slate-400">
                                                        <span className="text-white/20">#{col.id}</span>
                                                        <span className="text-primary/80 font-bold">{col.name}</span>
                                                        <span className="text-slate-500 italic">{col.type}</span>
                                                        <span className="text-slate-500 text-right">{col.count}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </InteractiveAnalysis>
                                

                                {/* Sample Artwork Visualization */}
                                <InteractiveAnalysis
                                    id="sample-gallery"
                                    title="Sample Visualization"
                                    subtitle="Representing paintings integrated with their human affective annotations."
                                    icon={ImageIcon}
                                    observation="This unified view confirms the tight coupling between visual semantics and human emotion. Instead of raw descriptions, utterances explain 'HOW' visual features (colors, brushstrokes, composition) trigger specific feelings."
                                    pythonCode={`# Data Coupling Logic
sample = df.sample(1)
print(f"Artwork: {sample['painting'].iloc[0]}")
print(f"Label: {sample['emotion'].iloc[0].upper()}")
print(f"Human Reaction: \\"{sample['utterance'].iloc[0]}\\"")`}
                                >
                                    <div className="flex flex-col gap-10">
                                        {/* Shuffle Action */}
                                        <div className="flex justify-end">
                                            <button 
                                                onClick={shuffleSamples}
                                                className="flex items-center gap-3 px-6 py-3 bg-surface-container-high hover:bg-primary hover:text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-sm hover:shadow-primary/20 group/btn cursor-pointer"
                                            >
                                                <RefreshCw size={14} className="group-hover/btn:rotate-180 transition-transform duration-500 text-primary group-hover:text-white" />
                                                Randomize Samples
                                            </button>
                                        </div>

                                        <AnimatePresence mode="popLayout">
                                            <motion.div 
                                                key={displaySamples.map(d => d.src).join(',')}
                                                className="grid grid-cols-1 md:grid-cols-2 gap-10"
                                            >
                                                {displaySamples.map((art, i) => (
                                                    <motion.div 
                                                        key={art.src}
                                                        initial={{ opacity: 0, scale: 0.95 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.95 }}
                                                        transition={{ duration: 0.4, delay: i * 0.05 }}
                                                        className="group/art flex flex-col h-full bg-white rounded-[2.5rem] border border-outline-variant/10 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all overflow-hidden"
                                                    >
                                                        <div className="aspect-[4/3] relative overflow-hidden bg-surface-container-low">
                                                            <img 
                                                                src={art.src} 
                                                                alt={art.author}
                                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover/art:scale-110"
                                                            />
                                                            <div className="absolute top-6 left-6">
                                                                <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg backdrop-blur-md border border-white/20
                                                                    ${art.emotion === 'fear' || art.emotion === 'anger' ? 'bg-red-500/90 text-white' : 
                                                                    art.emotion === 'contentment' || art.emotion === 'awe' ? 'bg-emerald-500/90 text-white' :
                                                                    'bg-primary/90 text-white'}
                                                                `}>
                                                                    {art.emotion}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="p-8 flex flex-col flex-1 justify-between gap-6 border-t border-outline-variant/5">
                                                            <div className="space-y-4">
                                                                <p className="text-on-surface font-medium italic leading-relaxed text-[13px] tracking-tight">
                                                                    "{art.utterance}"
                                                                </p>
                                                            </div>
                                                            
                                                            <div className="flex items-center justify-between pt-6 border-t border-outline-variant/5 mt-auto">
                                                                <div className="flex flex-col">
                                                                    <span className="text-[9px] font-black uppercase tracking-[0.15em] text-primary/60 mb-1">Artist Reflection</span>
                                                                    <span className="text-xs font-bold text-on-surface tracking-tight">{art.author}</span>
                                                                </div>
                                                                <span className="text-[10px] font-medium text-on-surface-variant opacity-40 italic tracking-tight">{art.year}</span>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </InteractiveAnalysis>

                                {/* 6. Emotion Distribution */}
                                <InteractiveAnalysis
                                    id="emotion-dist"
                                    title="Emotion Distribution"
                                    subtitle="Frequency analysis of human-annotated sentiment labels."
                                    icon={Smile}
                                    observation="While the dataset covers 8 fundamental emotions, there is a clear class imbalance. 'Contentment' and 'Sadness' are highly frequent, whereas 'Anger' and 'Disgust' are less represented, matching the typically contemplative nature of fine art."
                                    pythonCode={`emotion_col = "emotion"
emotion_counts = df[emotion_col].value_counts().reset_index()
emotion_counts.columns = ["emotion", "count"]

fig = px.bar(emotion_counts, x="emotion", y="count",
             title="Distribution of Emotion Labels", text="count",
             color="count", color_continuous_scale='Viridis')
fig.update_layout(xaxis_title="Emotion", yaxis_title="Count", template="plotly_white")
fig.show()`}
                                >
                                    <div className="w-full bg-white rounded-3xl overflow-hidden">
                                        <Plot
                                            data={emotionDistribution.data}
                                            layout={{
                                                ...emotionDistribution.layout,
                                                autosize: true,
                                                bargap: 0.1,
                                                margin: { t: 60, b: 80, l: 80, r: 40 }
                                            }}
                                            style={{ width: "100%", height: "600px" }}
                                            useResizeHandler={true}
                                            config={{ responsive: true, displaylogo: false }}
                                        />
                                    </div>
                                </InteractiveAnalysis>

                                {/* 8. Art Style Distribution */}
                                <InteractiveAnalysis
                                    id="art-style-dist"
                                    title="Top 15 Art Styles"
                                    subtitle="Analysis of the most frequent artistic movements in the subset."
                                    icon={Palette}
                                    observation="The dataset is dominated by 'Impressionism' and 'Post-Impressionism'. This reflects the source material (WikiArt) and suggests the model might be more exposed to these visual patterns."
                                    pythonCode={`style_counts = df['art_style'].value_counts().head(15).reset_index()
style_counts.columns = ['art_style', 'count']

fig = px.bar(style_counts, x='art_style', y='count',
             title='Top 15 Art Styles in Artemis Subset',
             text='count', color='count',
             color_continuous_scale='Magma')
fig.update_layout(xaxis_tickangle=-45, template='plotly_white')
fig.show()`}
                                >
                                    <div className="w-full bg-white rounded-3xl overflow-hidden">
                                        <Plot
                                            data={top15ArtStyles.data}
                                            layout={{
                                                ...top15ArtStyles.layout,
                                                autosize: true,
                                                bargap: 0.05,
                                                margin: { t: 60, b: 120, l: 80, r: 40 }
                                            }}
                                            style={{ width: "100%", height: "650px" }}
                                            useResizeHandler={true}
                                            config={{ responsive: true, displaylogo: false }}
                                        />
                                    </div>
                                </InteractiveAnalysis>

                                {/* 9. Image Metadata Analysis */}
                                <InteractiveAnalysis
                                    id="image-metadata"
                                    title="Image Physical Properties"
                                    subtitle="Dimensions, aspect ratios, and resolution clusters."
                                    icon={ImageIcon}
                                    observation="Most images are around 500-1000 pixels. The aspect ratios vary significantly, confirming the diversity of painting formats (portrait, landscape, and square miniatures)."
                                    pythonCode={`import plotly.express as px

# Width Distribution
fig_w = px.histogram(df_img, x="width", nbins=40, title="Distribution of Image Width",
                   color_discrete_sequence=["#636EFA"])
fig_w.update_layout(xaxis_title="Image Width (pixels)", yaxis_title="Frequency", template="plotly_white")
fig_w.show()

# Height Distribution
fig_h = px.histogram(df_img, x="height", nbins=40, title="Distribution of Image Height",
                   color_discrete_sequence=["#00CC96"])
fig_h.update_layout(xaxis_title="Image Height (pixels)", yaxis_title="Frequency", template="plotly_white")
fig_h.show()

# Aspect Ratio Distribution
fig_ar = px.histogram(df_img, x="aspect_ratio", nbins=40, title="Distribution of Image Aspect Ratios",
                    color_discrete_sequence=["#EF553B"])
fig_ar.update_layout(xaxis_title="Aspect Ratio (Width / Height)", yaxis_title="Frequency", template="plotly_white")
fig_ar.show()

# Dimension Scatter
fig_s = px.scatter(df_img, x="width", y="height", opacity=0.5, title="Image Width vs. Height",
                  labels={"width": "Width", "height": "Height"})
fig_s.show()`}
                                >
                                    <div className="flex flex-col gap-8">
                                        {/* Metric Selector */}
                                        <div className="flex flex-wrap gap-2 bg-surface-container-low p-1.5 rounded-2xl w-fit border border-outline-variant/10">
                                            {imageMetrics.map((metric) => {
                                                const isActive = selectedMetric === metric.id;
                                                return (
                                                    <button
                                                        key={metric.id}
                                                        onClick={() => setSelectedMetric(metric.id)}
                                                        className={`
                                                            flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer
                                                            ${isActive 
                                                                ? 'bg-primary text-on-primary shadow-lg shadow-primary/20 scale-105' 
                                                                : 'hover:bg-surface-container-high text-on-surface/60 hover:text-on-surface'}
                                                        `}
                                                    >
                                                        <metric.icon size={16} />
                                                        {metric.label}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {/* Active Chart */}
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={selectedMetric}
                                                initial={{ opacity: 0, scale: 0.98 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.98 }}
                                                transition={{ duration: 0.3 }}
                                                className="bg-white rounded-3xl border border-outline-variant/10 overflow-hidden shadow-sm"
                                            >
                                                {selectedMetric === 'width' && (
                                                    <Plot
                                                        data={imageWidthDist.data}
                                                        layout={{
                                                            ...imageWidthDist.layout,
                                                            autosize: true,
                                                            margin: { t: 60, b: 80, l: 80, r: 40 }
                                                        }}
                                                        style={{ width: "100%", height: "600px" }}
                                                        useResizeHandler={true}
                                                        config={{ responsive: true, displaylogo: false }}
                                                    />
                                                )}
                                                {selectedMetric === 'height' && (
                                                    <Plot
                                                        data={imageHeightDist.data}
                                                        layout={{
                                                            ...imageHeightDist.layout,
                                                            autosize: true,
                                                            margin: { t: 60, b: 80, l: 80, r: 40 }
                                                        }}
                                                        style={{ width: "100%", height: "600px" }}
                                                        useResizeHandler={true}
                                                        config={{ responsive: true, displaylogo: false }}
                                                    />
                                                )}
                                                {selectedMetric === 'ratio' && (
                                                    <Plot
                                                        data={imageAspectRatioDist.data}
                                                        layout={{
                                                            ...imageAspectRatioDist.layout,
                                                            autosize: true,
                                                            margin: { t: 60, b: 80, l: 80, r: 40 }
                                                        }}
                                                        style={{ width: "100%", height: "600px" }}
                                                        useResizeHandler={true}
                                                        config={{ responsive: true, displaylogo: false }}
                                                    />
                                                )}
                                                {selectedMetric === 'scatter' && (
                                                    <Plot
                                                        data={imageDimensionsScatter.data}
                                                        layout={{
                                                            ...imageDimensionsScatter.layout,
                                                            autosize: true,
                                                            margin: { t: 60, b: 80, l: 80, r: 40 }
                                                        }}
                                                        style={{ width: "100%", height: "650px" }}
                                                        useResizeHandler={true}
                                                        config={{ responsive: true, displaylogo: false }}
                                                    />
                                                )}
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </InteractiveAnalysis>

                                {/* 7. Text Length Distribution */}
                                <InteractiveAnalysis
                                    id="text-length"
                                    title="Descriptive Text Density"
                                    subtitle="Word count distribution across the human utterances."
                                    icon={Type}
                                    observation="The majority of human utterances range from 10 to 25 words. This provides enough linguistic complexity for multimodal alignment without being overly verbose."
                                    pythonCode={`df['text_length'] = df['utterance'].str.split().str.len()
fig = px.histogram(df, x='text_length', nbins=100, 
                   title='Text Length Distribution (Words)',
                   color_discrete_sequence=['#ff7f0e'])
fig.update_layout(xaxis_title="Word Count", yaxis_title="Number of Sentences", template="plotly_white")
fig.show()`}
                                >
                                    <div className="w-full bg-white rounded-3xl overflow-hidden">
                                        <Plot
                                            data={textLengthDist.data}
                                            layout={{
                                                ...textLengthDist.layout,
                                                autosize: true,
                                                margin: { t: 60, b: 80, l: 80, r: 40 }
                                            }}
                                            style={{ width: "100%", height: "600px" }}
                                            useResizeHandler={true}
                                            config={{ responsive: true, displaylogo: false }}
                                        />
                                    </div>
                                </InteractiveAnalysis>

                                {/* 10. Style-Emotion Heatmap */}
                                <InteractiveAnalysis
                                    id="style-emotion"
                                    title="Style vs Emotion Relationship"
                                    subtitle="Normalized heatmap showing emotion distributions per art movement."
                                    icon={Layers}
                                    observation="Specific styles often correlate with certain emotions; for instance, 'Impressionism' frequently evokes positive sentiments like 'Contentment' or 'Awe', while 'Expressionism' links more to intense emotions."
                                    pythonCode={`heatmap_data = df.groupby(['art_style', 'emotion']).size().unstack(fill_value=0)
heatmap_norm = heatmap_data.div(heatmap_data.sum(axis=1), axis=0) # Normalize by row

fig = px.imshow(heatmap_norm, 
                color_continuous_scale='YlGnBu',
                labels=dict(x="Emotion", y="Art Style", color="Proportion"),
                title='Heatmap: Emotion Distribution per Art Style')
fig.update_layout(height=800, template='plotly_white')
fig.show()`}
                                >
                                    <div className="w-full bg-white rounded-3xl overflow-hidden">
                                        <Plot
                                            data={styleEmotionHeatmap.data}
                                            layout={{
                                                ...styleEmotionHeatmap.layout,
                                                autosize: true,
                                                margin: { t: 80, b: 120, l: 150, r: 40 }
                                            }}
                                            style={{ width: "100%", height: "800px" }}
                                            useResizeHandler={true}
                                            config={{ responsive: true, displaylogo: false }}
                                        />
                                    </div>
                                </InteractiveAnalysis>

                                {/* 15.1 Top Emotions within Art Styles (Grouped Bar Chart) */}
                                <InteractiveAnalysis
                                    id="style-emotion-bar"
                                    title="Top Emotions within Art Styles"
                                    subtitle="Faceted bar chart showing the proportion of the top 5 emotions within the 10 most frequent art styles."
                                    icon={Columns}
                                    observation="This granular view reveals that even within 'Impressionism', 'Sadness' can be a dominant annotation, alongside the expected 'Contentment'. Faceted analysis allows us to compare emotional signatures across distinct artistic movements directly."
                                    pythonCode={`# Select top 10 art styles based on total annotations for better readability in visualization
# \`style_insights\` DataFrame from cell 833ed3d2 contains 'total_annotations' for each style.
top_n_styles_for_viz = style_insights.sort_values('total_annotations', ascending=False).head(10)['art_style'].tolist()

# Filter \`style_emotion_pct\` for these top styles
df_top_styles_emotions = style_emotion_pct.loc[top_n_styles_for_viz]

# Melt the dataframe to long format for easier plotting with Plotly Express
df_plot = df_top_styles_emotions.reset_index().melt(id_vars='art_style', var_name='emotion', value_name='proportion')

# For each art style, select the top 5 emotions by proportion
final_plot_data = []
for style in top_n_styles_for_viz:
    style_data = df_plot[df_plot['art_style'] == style].sort_values('proportion', ascending=False).head(5)
    final_plot_data.append(style_data)

final_plot_df = pd.concat(final_plot_data)

# Create a grouped bar chart, faceted by art style
fig = px.bar(
    final_plot_df,
    x="emotion",
    y="proportion",
    color="emotion", # Color bars by emotion
    facet_col="art_style",
    facet_col_wrap=5, # Wrap facets into 5 columns
    title="Top 5 Emotion Proportions for Top 10 Art Styles",
    labels={
        "proportion": "Proportion within Art Style",
        "emotion": "Emotion"
    },
    height=800, # Adjust height for better readability
    template="plotly_white"
)

# Update layout for better appearance
fig.update_layout(showlegend=False) # Legend is redundant with color-coding within facets
fig.update_xaxes(matches=None, tickangle=45) # Allow independent x-axes for better readability of emotion labels
fig.show()`}
                                >
                                    <div className="w-full bg-white rounded-3xl overflow-hidden">
                                        <Plot
                                            data={topEmotionProportionsByStyle.data}
                                            layout={{
                                                ...topEmotionProportionsByStyle.layout,
                                                autosize: true,
                                                margin: { t: 80, b: 100, l: 80, r: 40 },
                                                template: "plotly_white"
                                            }}
                                            style={{ width: "100%", height: "800px" }}
                                            useResizeHandler={true}
                                            config={{ responsive: true, displaylogo: false }}
                                        />
                                    </div>
                                </InteractiveAnalysis>

                                {/* 11. Top Words by Emotion */}
                                <InteractiveAnalysis
                                    id="top-words"
                                    title="Lexical Patterns by Emotion"
                                    subtitle="Most significant keywords mentioned when expressing specific emotions."
                                    icon={MessageSquare}
                                    observation="The word frequency analysis shows that each emotion category tends to have its own characteristic vocabulary. These differences suggest that utterances provide useful linguistic cues that may help distinguish emotional labels in the dataset."
                                    pythonCode={`import re
import pandas as pd
from collections import Counter
import plotly.express as px

# stopwords refinement
stopwords = {
    "the", "a", "an", "and", "or", "but", "if", "then", "so", "to", "of", "in", "on", "at", "for",
    "with", "by", "from", "as", "is", "it", "this", "that", "these", "those", "be", "are", "was",
    "were", "am", "i", "me", "my", "mine", "you", "your", "yours", "he", "she", "his", "her",
    "they", "their", "them", "we", "our", "ours", "its", "about", "into", "over", "under", "than",
    "very", "can", "could", "would", "should", "just", "also", "there", "here", "because", "feel",
    "feels", "feeling", "make", "makes", "made", "one", "two", "like", "painting", "picture", "something", "looks", "look"
}

def clean_and_tokenize(text):
    text = str(text).lower()
    text = re.sub(r"[^a-z\\s]", " ", text)   # keep only letters and spaces
    tokens = text.split()
    tokens = [w for w in tokens if w not in stopwords and len(w) > 2]
    return tokens

# Generating word counts per emotion
emotions = df['emotion'].unique()
top_words_data = []

for emotion in emotions:
    tokens = []
    df[df['emotion'] == emotion]['utterance'].apply(lambda x: tokens.extend(clean_and_tokenize(x)))
    most_common = Counter(tokens).most_common(10)
    for word, count in most_common:
        top_words_data.append({"emotion": emotion, "word": word, "count": count})

top_words_df = pd.DataFrame(top_words_data)

# Visualization
fig = px.bar(top_words_df, x='word', y='count', color='emotion',
             facet_col='emotion', facet_col_wrap=3,
             title='Top 10 Most Frequent Words by Emotion')
fig.update_layout(height=1000, showlegend=false, template='plotly_white')
fig.show()`}
                                >
                                    <div className="flex flex-col gap-8">
                                        {/* Emotion Selector */}
                                        <div className="flex flex-wrap gap-2 bg-surface-container-low p-1.5 rounded-2xl w-full max-w-4xl border border-outline-variant/10">
                                            {emotionList.map((emotion) => {
                                                const isActive = selectedEmotionWord === emotion;
                                                return (
                                                    <button
                                                        key={emotion}
                                                        onClick={() => setSelectedEmotionWord(emotion)}
                                                        className={`
                                                            px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 cursor-pointer
                                                            ${isActive 
                                                                ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' 
                                                                : 'hover:bg-surface-container-high text-on-surface/40 hover:text-on-surface'}
                                                        `}
                                                    >
                                                        {emotion}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {/* Active Emotion Chart */}
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={selectedEmotionWord}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{ duration: 0.3 }}
                                                className="bg-white rounded-3xl border border-outline-variant/10 overflow-hidden shadow-sm"
                                            >
                                                <Plot
                                                    data={topWordsByEmotion.data
                                                        .filter(trace => trace.name === selectedEmotionWord)
                                                        .map(trace => ({
                                                            ...trace,
                                                            xaxis: "x",
                                                            yaxis: "y"
                                                        }))}
                                                    layout={{
                                                        title: {
                                                            text: `Top 10 Frequent Words: ${selectedEmotionWord.toUpperCase()}`,
                                                            font: { size: 16, color: '#00685f', weight: 'bold' }
                                                        },
                                                        xaxis: { title: "Word", tickangle: 0 },
                                                        yaxis: { title: "Frequency" },
                                                        autosize: true,
                                                        bargap: 0.15,
                                                        margin: { t: 80, b: 60, l: 80, r: 40 },
                                                        template: "plotly_white"
                                                    }}
                                                    style={{ width: "100%", height: "600px" }}
                                                    useResizeHandler={true}
                                                    config={{ responsive: true, displaylogo: false }}
                                                />
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </InteractiveAnalysis>

                                {/* Final Insight Summary Section */}
                                <div className="mt-24 bg-[#00685f]/5 rounded-[3rem] p-12 lg:p-16 border border-[#00685f]/10 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 transition-transform group-hover:rotate-0 duration-1000">
                                        <Sparkles size={200} className="text-primary" />
                                    </div>
                                    
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-8">
                                            <div className="w-10 h-px bg-primary/40" />
                                            Strategic Intelligence
                                        </div>
                                        <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-12">
                                            Key Findings & <span className="text-primary underline decoration-primary/20 underline-offset-8 italic">Potential Issues</span>
                                        </h2>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <div className="space-y-8">
                                                <div className="flex gap-6">
                                                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0">
                                                        <AlertTriangle size={20} className="text-amber-500" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-md font-bold text-on-surface mb-2">Emotion Label Imbalance</h4>
                                                        <p className="text-sm text-on-surface-variant leading-relaxed opacity-70">
                                                            Significant imbalance detected. <strong>'sadness'</strong> is one of the most frequent labels, while others like <strong>'amusement'</strong> represent a very small fraction. AI models will require class weighting or oversampling.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-6">
                                                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0">
                                                        <Palette size={20} className="text-primary" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-md font-bold text-on-surface mb-2">Art Style Emotional Signatures</h4>
                                                        <p className="text-sm text-on-surface-variant leading-relaxed opacity-70">
                                                            Each style possesses a distinct emotional signature (e.g., 'sadness' in Impressionism, 'disgust' in Abstract Expressionism). These profiles are valuable for nuanced affective modeling.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-8">
                                                <div className="flex gap-6">
                                                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0">
                                                        <Maximize size={20} className="text-secondary" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-md font-bold text-on-surface mb-2">Visual Diversity</h4>
                                                        <p className="text-sm text-on-surface-variant leading-relaxed opacity-70">
                                                            Image resolutions vary significantly from small thumbnails to high-resolution. Preprocessing must maintain visual details and consistent aspect ratios.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-6">
                                                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0">
                                                        <CheckCircle2 size={20} className="text-emerald-600" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-md font-bold text-on-surface mb-2">Data Quality</h4>
                                                        <p className="text-sm text-on-surface-variant leading-relaxed opacity-70">
                                                            The dataset is well-curated with zero missing values and zero duplicate records, providing a robust and clean foundation for multimodal training.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-20 flex justify-center">
                                    <div className="flex items-center gap-4 bg-surface-container-low/50 p-6 rounded-2xl border border-outline-variant/10 text-[11px] text-on-surface-variant italic leading-relaxed max-w-2xl text-center">
                                        <Sparkles size={16} className="text-primary shrink-0" />
                                        <span>
                                            Strategic assessment complete. These findings form the baseline for the ArtEmis deep learning architecture.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <MultimodalML />
                    )}
                </div>
            </main>
        </div>
    );
}
