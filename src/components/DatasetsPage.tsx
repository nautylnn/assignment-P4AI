import { motion } from "motion/react";
import { Table, FileText, ImageIcon, ExternalLink, Download, CloudDownload, Eraser, Share2, ShieldCheck, ArrowRight, Info, History, Layers, BarChart3, Brain } from "lucide-react";
import tabularHero from "../assets/images/image/ảnh.jpg";
import textHero from "../assets/images/image/text.jpg";
import imageHero from "../assets/images/image/padang_food.png";
import multimodalHero from "../assets/images/image/artemis_multimodal.png";

interface DatasetsPageProps {
  onNavigate?: (page: 'overview' | 'assignments' | 'datasets' | 'art-analysis' | 'tabular-eda' | 'tabular-pipeline' | 'text-eda' | 'image-eda' | 'multimodal-eda', dataset?: string, mode?: "eda" | "ml") => void;
}

export default function DatasetsPage({ onNavigate }: DatasetsPageProps) {
  return (
    <div className="max-w-[1200px] mx-auto px-8 py-12">
      {/* ... (Hero Editorial Section) ... */}
      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <span className="text-primary font-semibold tracking-widest text-xs uppercase mb-4 block">Archive 02 // Research Data</span>
            <h1 className="text-5xl md:text-6xl font-headline font-extrabold tracking-tighter text-on-surface mb-6 leading-[1.1]">
              Curated <span className="text-primary-container">Datasets</span>
            </h1>
          </div>
          <div className="md:col-span-4 pb-2">
            <p className="text-lg text-on-surface-variant leading-relaxed opacity-80 border-l-2 border-on-surface-variant/30 pl-6">
              A rigorous collection of standardized datasets for academic benchmarking, ranging from longitudinal tabular records to high-dimensional visual corpora.
            </p>
          </div>
        </div>
      </section>

      {/* Bento Grid Datasets */}
      <section className="mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Tabular Dataset Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-sm flex flex-col h-full group transition-all duration-300 border border-on-surface-variant/5"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Table className="text-primary w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">Type: Tabular</span>
            </div>
            <div className="w-full h-32 rounded-lg overflow-hidden mb-6">
              <img
                src={tabularHero}
                alt="Rain in Australia"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <h3 className="text-xl font-headline font-bold text-on-surface mb-2">Rain in Australia</h3>
            <p className="text-xs text-on-surface-variant mb-6">Predicting next-day rain using 10 years of daily observations from the Bureau of Meteorology.</p>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-[10px] py-1 border-b border-on-surface-variant/10">
                <span className="text-on-surface-variant/60">Source</span>
                <span className="text-on-surface font-medium">Bureau of Meteorology</span>
              </div>
              <div className="flex justify-between text-[10px] py-1 border-b border-on-surface-variant/10">
                <span className="text-on-surface-variant/60">Size</span>
                <span className="text-on-surface font-medium">145.5k rows / 14MB</span>
              </div>
            </div>
            <div className="bg-surface-container-low rounded-lg p-4 mb-8 overflow-hidden">
              <span className="text-[9px] uppercase font-bold text-primary mb-2 block">Structure Preview</span>
              <code className="text-[10px] font-mono text-on-surface-variant leading-tight block">
                {`{ Date: str, Location: str, MinTemp: float, MaxTemp: float, RainTomorrow: bool }`}
              </code>
            </div>
            <div className="flex gap-3 mt-auto">
              <a 
                href="https://www.kaggle.com/datasets/jsphyg/weather-dataset-rattle-package?select=weatherAUS.csv"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 bg-surface-container text-on-surface text-sm font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-surface-container-high transition-all no-underline cursor-pointer"
              >
                <ExternalLink size={14} />
                Kaggle
              </a>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onNavigate?.('tabular-eda', '', 'eda')}
                className="py-2.5 bg-surface-container-high text-on-surface text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 hover:bg-primary/10 transition-all cursor-pointer"
              >
                <BarChart3 size={12} />
                EDA
              </button>
              <button
                onClick={() => onNavigate?.('tabular-eda', '', 'ml')}
                className="py-2.5 academic-gradient text-white text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all cursor-pointer"
              >
                <Brain size={12} />
                ML
              </button>
            </div>
          </div>
            <div className="flex gap-3 mt-4">
              <a 
                href="https://colab.research.google.com/drive/143sQz3NqiTBltcTjpuzkPa0QnDxy1I3j?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 bg-surface-container text-on-surface text-sm font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-surface-container-high transition-all no-underline cursor-pointer"
              >
                <ExternalLink size={14} />
                Colab
              </a>
            </div>

          </motion.div>

          {/* Text Dataset Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-sm flex flex-col h-full group transition-all duration-300 border border-on-surface-variant/5"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="bg-secondary/10 p-3 rounded-lg">
                <FileText className="text-secondary w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">Type: Textual</span>
            </div>
            <div className="w-full h-32 rounded-lg overflow-hidden mb-6">
              <img
                src={textHero}
                alt="Trending Topics"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <h3 className="text-xl font-headline font-bold text-on-surface mb-2">Trending Topics 2026</h3>
            <p className="text-xs text-on-surface-variant mb-6">Multi-source synthetic dataset of trending news topics and categories for Feb 2026.</p>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-[10px] py-1 border-b border-on-surface-variant/10">
                <span className="text-on-surface-variant/60">Source</span>
                <span className="text-on-surface font-medium">Kaggle Synthetic Archive</span>
              </div>
              <div className="flex justify-between text-[10px] py-1 border-b border-on-surface-variant/10">
                <span className="text-on-surface-variant/60">Size</span>
                <span className="text-on-surface font-medium">2.5k docs / 1.2MB</span>
              </div>
            </div>
            <div className="bg-surface-container-low rounded-lg p-4 mb-8 overflow-hidden">
              <span className="text-[9px] uppercase font-bold text-secondary mb-2 block">Structure Preview</span>
              <code className="text-[10px] font-mono text-on-surface-variant leading-tight block">
                {`{ article_id: str, short_text: longtext, topic_category: enum }`}
              </code>
            </div>
            <div className="flex gap-3 mt-auto">
              <a 
                href="https://www.kaggle.com/datasets/mmuneeb5522/crossplatform-trending-topics-2026multilanguage"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 bg-surface-container text-on-surface text-sm font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-surface-container-high transition-all no-underline cursor-pointer"
              >
                <ExternalLink size={14} />
                Kaggle
              </a>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onNavigate?.('text-eda', '', 'eda')}
                className="py-2.5 bg-surface-container-high text-on-surface text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 hover:bg-primary/10 transition-all cursor-pointer"
              >
                <BarChart3 size={12} />
                EDA
              </button>
              <button
                onClick={() => onNavigate?.('text-eda', '', 'ml')}
                className="py-2.5 academic-gradient text-white text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all cursor-pointer"
              >
                <Brain size={12} />
                ML
              </button>
            </div>
          </div>
            <div className="flex gap-3 mt-4">
              <a 
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 bg-surface-container text-on-surface text-sm font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-surface-container-high transition-all no-underline cursor-pointer"
              >
                <ExternalLink size={14} />
                Colab
              </a>
            </div>

          </motion.div>

          {/* Image Dataset Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-sm flex flex-col h-full group transition-all duration-300 border border-on-surface-variant/5"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="bg-tertiary/10 p-3 rounded-lg">
                <ImageIcon className="text-tertiary w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">Type: Visual</span>
            </div>
            <div className="w-full h-32 rounded-lg overflow-hidden mb-6">
              <img
                src={imageHero}
                alt="Padang Cuisine"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <h3 className="text-xl font-headline font-bold text-on-surface mb-2">Padang Cuisine (Food Image)</h3>
            <p className="text-xs text-on-surface-variant mb-6">Indonesian Food Image Dataset with 9 classes, featuring authentic Padang culinary delights.</p>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-[10px] py-1 border-b border-on-surface-variant/10">
                <span className="text-on-surface-variant/60">Source</span>
                <span className="text-on-surface font-medium">Kaggle PadangFood Dataset</span>
              </div>
              <div className="flex justify-between text-[10px] py-1 border-b border-on-surface-variant/10">
                <span className="text-on-surface-variant/60">Size</span>
                <span className="text-on-surface font-medium">1k+ imgs / ~400MB</span>
              </div>
            </div>
            <div className="bg-surface-container-low rounded-lg p-4 mb-8 overflow-hidden">
              <span className="text-[9px] uppercase font-bold text-tertiary mb-2 block">Structure Preview</span>
              <code className="text-[10px] font-mono text-on-surface-variant leading-tight block">
                /train/ {`{ ayam_pop, rendang, gulai_tunjang, ... }`}
              </code>
            </div>
            <div className="flex gap-3 mt-auto">
              <a 
                href="https://www.kaggle.com/datasets/faldoae/padangfood"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 bg-surface-container text-on-surface text-sm font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-surface-container-high transition-all no-underline cursor-pointer"
              >
                <ExternalLink size={14} />
                Kaggle
              </a>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onNavigate?.('image-eda', '', 'eda')}
                className="py-2.5 bg-surface-container-high text-on-surface text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 hover:bg-primary/10 transition-all cursor-pointer"
              >
                <BarChart3 size={12} />
                EDA
              </button>
              <button
                onClick={() => onNavigate?.('image-eda', '', 'ml')}
                className="py-2.5 academic-gradient text-white text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all cursor-pointer"
              >
                <Brain size={12} />
                ML
              </button>
            </div>
          </div>
            <div className="flex gap-3 mt-4">
              <a 
                href="https://colab.research.google.com/drive/1gJlZcRzuRz0I-2ZRfJQZ4I0dlNgbSzKl?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 bg-surface-container text-on-surface text-sm font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-surface-container-high transition-all no-underline cursor-pointer"
              >
                <ExternalLink size={14} />
                Colab
              </a>
            </div>

          </motion.div>

          {/* Multimodal Dataset Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-sm flex flex-col h-full group transition-all duration-300 border border-on-surface-variant/5"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Layers className="text-primary w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">Type: Multimodal</span>
            </div>
            <div className="w-full h-32 rounded-lg overflow-hidden mb-6">
              <img
                src={multimodalHero}
                alt="Artemis Dataset"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <h3 className="text-xl font-headline font-bold text-on-surface mb-2">Artemis (Art & Emotions)</h3>
            <p className="text-xs text-on-surface-variant mb-6">A high-fidelity multimodal dataset of artworks and emotional responses for affective computing research.</p>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-[10px] py-1 border-b border-on-surface-variant/10">
                <span className="text-on-surface-variant/60">Source</span>
                <span className="text-on-surface font-medium">Artemis Multimodal Archive</span>
              </div>
              <div className="flex justify-between text-[10px] py-1 border-b border-on-surface-variant/10">
                <span className="text-on-surface-variant/60">Size</span>
                <span className="text-on-surface font-medium">80k+ pairs / ~30GB</span>
              </div>
            </div>
            <div className="bg-surface-container-low rounded-lg p-4 mb-8 overflow-hidden">
              <span className="text-[9px] uppercase font-bold text-primary mb-2 block">Structure Preview</span>
              <code className="text-[10px] font-mono text-on-surface-variant leading-tight block">
                /images/ *.jpg {`{ art_style, emotion, utterance }`} /metadata.csv
              </code>
            </div>
            <div className="flex gap-3 mt-auto">
              <a 
                href="https://www.kaggle.com/datasets/rollas/artemis-dataset-including-10k-images"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 bg-surface-container text-on-surface text-sm font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-surface-container-high transition-all no-underline cursor-pointer"
              >
                <ExternalLink size={14} />
                Kaggle
              </a>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onNavigate?.('multimodal-eda', 'Artemis', 'eda')}
                className="py-2.5 bg-surface-container-high text-on-surface text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 hover:bg-primary/10 transition-all cursor-pointer"
              >
                <BarChart3 size={12} />
                EDA
              </button>
              <button
                onClick={() => onNavigate?.('multimodal-eda', 'Artemis', 'ml')}
                className="py-2.5 academic-gradient text-white text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all cursor-pointer"
              >
                <Brain size={12} />
                ML
              </button>
            </div>
          </div>
            <div className="flex gap-3 mt-4">
              <a 
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 bg-surface-container text-on-surface text-sm font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-surface-container-high transition-all no-underline cursor-pointer"
              >
                <ExternalLink size={14} />
                Colab
              </a>
            </div>

          </motion.div>
        </div>
      </section>

      {/* Pipeline Diagram Section */}
      <section className="bg-surface-container-low rounded-3xl p-12 mb-24 relative overflow-hidden">
        <div className="relative z-10">
          <div className="max-w-2xl mb-16">
            <h2 className="text-3xl font-headline font-bold text-on-surface mb-4">Data Processing Pipeline</h2>
            <p className="text-on-surface-variant opacity-80">Our rigorous multi-stage pipeline ensures the integrity and reproducibility of every dataset provided in the curator.</p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
            {[
              { title: "Raw Acquisition", icon: <CloudDownload />, desc: "Unfiltered extraction from source APIs" },
              { title: "Cleansing", icon: <Eraser />, desc: "Outlier removal & value normalization", active: true },
              { title: "Structuring", icon: <Share2 />, desc: "Format conversion (JSON, CSV, H5)" },
              { title: "Verification", icon: <ShieldCheck />, desc: "Statistical integrity & hash validation" }
            ].map((step, idx, arr) => (
              <div key={idx} className="flex flex-col md:flex-row items-center gap-4 flex-1">
                <div className="flex flex-col items-center text-center max-w-[180px]">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-sm mb-4 border border-on-surface-variant/10 ${step.active ? 'bg-primary text-white' : 'bg-white text-primary'}`}>
                    {step.icon}
                  </div>
                  <h4 className="font-bold text-sm mb-1">{step.title}</h4>
                  <p className="text-[11px] text-on-surface-variant">{step.desc}</p>
                </div>
                {idx < arr.length - 1 && (
                  <div className="hidden md:block flex-1 h-[2px] bg-gradient-to-r from-primary/20 to-primary/40 relative min-w-[40px]">
                    <div className="absolute -right-1 -top-[9px] text-primary/40">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </section>

      {/* Informational Footer Callout */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center border-t border-on-surface-variant/10 pt-20">
        <div>
          <h2 className="text-2xl font-headline font-bold mb-4">Request a Dataset</h2>
          <p className="text-on-surface-variant leading-relaxed mb-8">Missing a specific study or niche repository? Our team can facilitate acquisition and preprocessing for verified university faculty and researchers.</p>
          <a className="inline-flex items-center gap-2 text-primary font-bold hover:underline transition-all cursor-pointer" href="#">
            Inquire about custom curation
            <ArrowRight size={16} />
          </a>
        </div>
        <div className="bg-surface-container rounded-2xl p-8 border border-on-surface-variant/10">
          <div className="flex gap-4 items-start mb-6">
            <Info className="text-primary mt-1 flex-shrink-0" size={24} />
            <div>
              <h4 className="font-bold mb-1">Fair Use Policy</h4>
              <p className="text-sm text-on-surface-variant">All datasets are provided under the Academic Open License. Commercial redistribution is strictly prohibited without explicit written consent from the source institution.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <History className="text-primary mt-1 flex-shrink-0" size={24} />
            <div>
              <h4 className="font-bold mb-1">Citation Mandate</h4>
              <p className="text-sm text-on-surface-variant">Researchers must cite both the original source and **Academic Curator** in all resulting publications or whitepapers.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
