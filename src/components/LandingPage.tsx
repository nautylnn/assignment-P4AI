import { motion } from "motion/react";
import { User, FileText, PlayCircle, Code, Table, Languages, Image as ImageIcon, Layers, MousePointer2, Brain } from "lucide-react";
import aviation from '../assets/images/aviation/aviation.png';
import textPreview from '../assets/images/image/text_preview.jpg';
import imagePreview from '../assets/images/image/image_preview.jpg';
import multimodalPreview from '../assets/images/image/multimodal_preview.webp';

interface LandingPageProps {
  onNavigate: (page: 'overview' | 'assignments' | 'datasets' | 'art-analysis' | 'tabular-eda' | 'text-eda' | 'image-eda' | 'multimodal-eda', dataset?: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="max-w-[1200px] mx-auto px-8 py-16">
      {/* ... (rest of the component) ... */}
      <section className="mb-24 relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 blur-3xl -z-10"></div>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full lg:w-1/2"
          >
            <div className="flex items-center gap-3 text-primary font-bold tracking-widest text-[10px] uppercase mb-6">
              <span className="w-10 h-px bg-primary/30"></span>
              Programming for AI & Data Science (CO3135) | Instructor: Dr. LE THANH SACH
            </div>

            <h1 className="text-6xl md:text-7xl font-headline font-extrabold text-on-surface tracking-tighter mb-8 leading-[1.05]">
              Academic <br />
              <span className="text-primary italic font-serif">Curator.</span>
            </h1>

            <p className="text-xl text-on-surface-variant max-w-xl leading-relaxed mb-10 opacity-90">
              Assignment portfolio for Exploratory Data Analysis project. A systematic investigation into data patterns and insights across diverse modalities.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <div className="flex items-center gap-2 px-4 py-2 bg-surface-container-low border border-on-surface-variant/10 text-[10px] font-black uppercase tracking-widest">
                <Layers size={14} className="text-primary" />
                3 Modalities
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-surface-container-low border border-on-surface-variant/10 text-[10px] font-black uppercase tracking-widest">
                <Table size={14} className="text-primary" />
                120k+ Samples
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-surface-container-low border border-on-surface-variant/10 text-[10px] font-black uppercase tracking-widest">
                <ImageIcon size={14} className="text-primary" />
                Curated Assets
              </div>
            </div>

            <div className="flex gap-6">
              <button
                onClick={() => onNavigate('datasets')}
                className="px-8 py-4 bg-on-surface text-white font-bold hover:bg-primary transition-all shadow-xl shadow-on-surface/5 cursor-pointer"
              >
                Browse Datasets
              </button>
              <button
                onClick={() => {
                  document.getElementById('datasets-overview')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-white border border-on-surface-variant/20 text-on-surface font-bold hover:bg-surface-container-low transition-all cursor-pointer"
              >
                View Report
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="aspect-[4/5] overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] duration-500 border border-on-surface-variant/5">
                  <img src={imagePreview} alt="Data Preview" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square bg-primary/10 flex items-center justify-center p-8 border border-primary/10">
                  <div className="text-center">
                    <div className="text-4xl font-headline font-black text-primary mb-1 tracking-tighter">99%</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-primary/60">Data Integrity</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="aspect-square bg-secondary/10 flex items-center justify-center p-8 border border-on-surface-variant/5">
                  <div className="text-center">
                    <div className="text-4xl font-headline font-black text-on-surface mb-1 tracking-tighter">04</div>
                    <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Collaborators</div>
                  </div>
                </div>
                <div className="aspect-[4/5] overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] duration-500 border border-on-surface-variant/5">
                  <img src={multimodalPreview} alt="Art Analysis" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Floating Logo Badge - Keeping it square and sharp now */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 bg-white/95 backdrop-blur-md shadow-2xl border border-on-surface/5 p-6 flex items-center justify-center z-20">
              <img src={aviation} alt="P4AI Logo" className="w-full h-full object-contain" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scroll Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col items-center gap-3 mb-24 opacity-60"
      >
        <div className="flex items-center gap-3 px-6 py-2.5 bg-surface-container-low border border-on-surface-variant/5 shadow-sm">
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <MousePointer2 size={16} className="text-primary rotate-12" />
          </motion.div>
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-on-surface-variant">
            Explore dataset distributions below
          </span>
        </div>
        <div className="h-12 w-px bg-linear-to-b from-primary/30 to-transparent"></div>
      </motion.div>

      {/* Group Info Section */}
      <section className="mb-24">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-grow bg-on-surface-variant opacity-20"></div>
          <h2 className="text-3xl font-headline font-bold text-on-surface px-4">Group Information</h2>
          <div className="h-px flex-grow bg-on-surface-variant opacity-20"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "ĐẶNG DUY NGUYÊN", id: "2352821" },
            { name: "NGUYỄN ĐẶNG MINH	TRƯỜNG", id: "2353262" },
            { name: "TRẦN QUỐC	THẮNG", id: "2353125" },
            { name: "LÊ MINH	HÀO", id: "2310846" }
          ].map((member, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-white paper-shadow p-6 border border-transparent hover:border-primary/20 transition-all"
            >
              <div className="w-12 h-12 bg-secondary-container flex items-center justify-center mb-4">
                <User className="text-primary w-6 h-6" />
              </div>
              <h3 className="font-headline font-bold text-lg mb-1">{member.name}</h3>
              <p className="text-on-surface-variant text-sm">Student ID: {member.id}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Assignment 1 Focus Section */}
      <section className="mb-12 bg-surface-container-low p-12 overflow-hidden relative">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-4xl font-headline font-extrabold text-on-surface mb-6 tracking-tight">Assignment 1 – Exploratory Data Analysis (EDA)</h2>
          <p className="text-lg text-on-surface-variant mb-10 leading-relaxed">
            A comprehensive study focusing on tabular, text, and image data analysis. Our project explores the underlying distributions, patterns, and anomalies across diverse data formats to build a robust foundation for future modeling.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/assignment-P4AI/Assignment_report_EDA.pdf"
              download="Assignment report EDA.pdf"
              className="flex items-center gap-2 academic-gradient text-white px-8 py-3 rounded font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all cursor-pointer no-underline"
            >
              <FileText size={20} />
              Report (PDF)
            </a>
            <a
              href="https://youtu.be/Bs-nb6exOT0"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white text-on-surface px-8 py-3 rounded font-bold hover:bg-surface-container-high transition-all cursor-pointer no-underline"
            >
              <PlayCircle size={20} />
              Video Presentation
            </a>
            <a
              href="https://github.com/nguyendangcole/assignment-P4AI.git"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white text-on-surface px-8 py-3 rounded font-bold hover:bg-surface-container-high transition-all cursor-pointer no-underline"
            >
              <Code size={20} />
              GitHub Repository
            </a>
          </div>
        </div>
        <div className="absolute right-[-10%] top-[-20%] w-[50%] h-[150%] opacity-10 pointer-events-none rotate-12">
          <img
            alt="Abstract data waves"
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* Assignment 2 Focus Section */}
      <section className="mb-24 bg-surface-container-low p-12 overflow-hidden relative border-t border-outline-variant/10">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20">Current Stage</span>
          </div>
          <h2 className="text-4xl font-headline font-extrabold text-on-surface mb-6 tracking-tight">Assignment 2 – Machine Learning for Data Analysis</h2>
          <p className="text-lg text-on-surface-variant mb-10 leading-relaxed">
            Implementing advanced machine learning workflows across multiple modalities. We leverage Transfer Learning for Image classification, NLP architectures for Text, and ensemble methods for Tabular data to build predictive intelligence.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate?.('datasets')}
              className="flex items-center gap-2 bg-on-surface text-white px-8 py-3 rounded font-bold hover:bg-primary transition-all cursor-pointer border-none shadow-lg shadow-on-surface/10"
            >
              <Brain size={20} />
              Explore ML Analytics
            </button>
            <button
              className="flex items-center gap-2 bg-white text-on-surface px-8 py-3 rounded font-bold border border-on-surface-variant/10 opacity-50 cursor-not-allowed"
              disabled
            >
              <FileText size={20} />
              Report (PDF)
            </button>
            <a
              href="https://github.com/nguyendangcole/assignment-P4AI.git"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white text-on-surface px-8 py-3 rounded font-bold hover:bg-surface-container-high transition-all cursor-pointer no-underline border border-on-surface-variant/10"
            >
              <Code size={20} />
              GitHub Repository
            </a>
          </div>
        </div>
        <div className="absolute right-[-10%] top-[-20%] w-[50%] h-[150%] opacity-10 pointer-events-none -rotate-12">
          <img
            alt="Neural network visualization"
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* Datasets Overview */}
      <section id="datasets-overview" className="mb-24">
        <h2 className="text-3xl font-headline font-bold text-on-surface mb-10 text-center">Datasets Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Tabular Data",
              icon: <Table className="text-primary" />,
              desc: "Exploration of structured datasets focusing on feature engineering, correlation matrices, and statistical distributions of numerical and categorical variables.",
              img: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=800"
            },
            {
              title: "Text Data",
              icon: <Languages className="text-primary" />,
              desc: "NLP preprocessing including tokenization, stop-word removal, and TF-IDF analysis to uncover semantic patterns and sentiment trends within textual corpora.",
              img: textPreview
            },
            {
              title: "Image Data",
              icon: <ImageIcon className="text-primary" />,
              desc: "Initial computer vision analysis involving pixel intensity distributions, RGB channel histograms, and basic shape/edge detection techniques.",
              img: imagePreview
            },
            {
              title: "Multimodal Data",
              icon: <Layers className="text-primary" />,
              desc: "Integrative analysis of text-image pairs, investigating cross-modal semantic mapping and combined feature space distributions for complex data understanding.",
              img: multimodalPreview
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
              onClick={() => {
                if (item.title === "Tabular Data") {
                  onNavigate('tabular-eda');
                } else if (item.title === "Text Data") {
                  onNavigate('text-eda');
                } else if (item.title === "Image Data") {
                  onNavigate('image-eda');
                } else {
                  onNavigate('multimodal-eda');
                }
              }}
            >
              <div className="h-64 mb-6 overflow-hidden bg-surface-container-highest">
                <img
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={item.img}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex items-center gap-3 mb-3">
                {item.icon}
                <h3 className="text-xl font-headline font-bold">{item.title}</h3>
              </div>
              <p className="text-on-surface-variant leading-relaxed text-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
