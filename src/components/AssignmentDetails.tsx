import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, CheckCircle, Clock, Hourglass, BookOpen, Database, FileText, Code, Video, Info, Layers, Sparkles, Layout, BrainCircuit, Cpu, Zap, ShieldCheck } from "lucide-react";

const assignments = {
  1: {
    id: 1,
    title: "Exploratory Data Analysis",
    description: "Systematic exploration of multi-modal datasets at HCMUT, focusing on data inspection, visual synthesis, and interpretation for downstream machine learning tasks.",
    dueDate: "03 APR 2026",
    status: "Completed",
    requirements: [
      {
        id: "01",
        title: "Tri-Modal EDA",
        desc: "Mandatory analysis of **Tabular**, **Text**, and **Image** data. Students must load, inspect, and summarize distributions for each modality.",
        icon: <Layers size={40} />,
        color: "text-primary",
        borderColor: "hover:border-primary/20"
      },
      {
        id: "02",
        title: "Advanced Synthesis",
        desc: "Integration of **Multimodal** (Text + Image) pairs to capture visual semantics and complex cross-modal relationships.",
        icon: <Sparkles size={40} />,
        color: "text-[#00685f]",
        borderColor: "hover:border-[#00685f]/20"
      }
    ],
    deliverables: [
      { title: "GitHub Landing Page", icon: <Layout size={18}/>, status: "READY", statusIcon: <CheckCircle size={14} />, color: "text-emerald-600", link: "https://github.com/nguyendangcole/assignment-P4AI" },
      { title: "Video Presentation (10-15m)", icon: <Video size={18}/>, status: "READY", statusIcon: <CheckCircle size={14} />, color: "text-emerald-600", link: "https://youtu.be/Bs-nb6exOT0" },
      { title: "Slide-style PDF Report", icon: <FileText size={18}/>, status: "READY", statusIcon: <CheckCircle size={14} />, color: "text-emerald-600", link: "/assignment-P4AI/Assignment_report_EDA.pdf" }
    ],
    resources: [
      { type: "Documentation", title: "Pandas Profiling API", desc: "Automated exploratory data analysis reports generator." },
      { type: "Library", title: "Seaborn Statistical Plots", desc: "Python data visualization library based on matplotlib." },
      { type: "Reference", title: "Statistical Foundations", desc: "University Lab guidelines for EDA best practices." }
    ]
  },
  2: {
    id: 2,
    title: "Machine Learning for Data Analysis",
    description: "Build and evaluate models for tabular (Classification/Regression), text (TF-IDF/Transformers), and image data (Transfer Learning) using insights from Assignment 1 EDA.",
    dueDate: "24 APR 2026",
    status: "Active Mission",
    requirements: [
      {
        id: "01",
        title: "Machine learning",
        desc: "Apply ML to **Tabular**, **Text**, and **Image** modalities. Preprocessing and feature choice must be informed by Assignment 1 insights.",
        icon: <BrainCircuit size={40} />,
        color: "text-blue-600",
        borderColor: "hover:border-blue-600/20"
      },
      {
        id: "02",
        title: "Transfer Learning",
        desc: "Mandatory use of **Transfer Learning** (e.g., fine-tuning pretrained CNNs) for image tasks. Compare with traditional ML on extracted features.",
        icon: <Cpu size={40} />,
        color: "text-purple-600",
        borderColor: "hover:border-purple-600/20"
      }
    ],
    deliverables: [
      { title: "GitHub Landing Page", icon: <Layout size={18}/>, status: "PENDING", statusIcon: <Clock size={14} />, color: "text-amber-600", link: "#" },
      { title: "YouTube Presentation", icon: <Video size={18}/>, status: "IN PROGRESS", statusIcon: <Hourglass size={14} />, color: "text-blue-600", link: "#" },
      { title: "Slide-style PDF Report", icon: <FileText size={18}/>, status: "DRAFT", statusIcon: <FileText size={14} />, color: "text-on-surface-variant", link: "#" }
    ],
    resources: [
      { type: "Sample Assignment", title: "BBC News ML Pipeline", desc: "Reference guide for text classification (TF-IDF + Transformers)." },
      { type: "Objective", title: "Predictive Analysis", desc: "Continuity with Assignment 1 datasets and EDA findings." },
      { type: "Integrity", title: "Academic Attribution", desc: "Always cite original authors and respect dataset licenses." }
    ]
  }
};

export default function AssignmentDetails() {
  const [activeTab, setActiveTab] = useState<1 | 2>(2);
  const data = assignments[activeTab];

  return (
    <div className="max-w-[1200px] mx-auto px-8 py-12">
      {/* Breadcrumb & Tab Switcher */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <nav className="flex items-center gap-2 text-sm text-on-surface-variant uppercase tracking-widest font-medium">
            <span>Assignments</span>
            <ChevronRight size={14} />
            <span className="text-primary font-bold">Assignment {activeTab}</span>
          </nav>

          <div className="flex bg-surface-container-low p-1 rounded-xl border border-on-surface-variant/10">
            <button 
              onClick={() => setActiveTab(1)}
              className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 1 ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              Assignment 1
            </button>
            <button 
              onClick={() => setActiveTab(2)}
              className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 2 ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              Assignment 2
            </button>
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:flex-row gap-12 items-start"
          >
            <div className="flex-1">
              <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tighter text-on-surface mb-6 leading-tight">
                {data.title.split('(')[0]} <br/>
                <span className="text-primary opacity-50">(Assignment {activeTab})</span>
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="px-4 py-1 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-full">CO3135</div>
                <div className="text-sm font-bold text-on-surface-variant uppercase tracking-tight opacity-60">Programming for AI & Data Science</div>
              </div>
              <p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed">
                {data.description}
              </p>
            </div>
            
            <div className="w-full md:w-1/3 bg-surface-container-low rounded-xl p-8 border border-on-surface-variant/10">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-on-surface-variant">Status</span>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${data.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-secondary-container text-secondary'}`}>
                    {data.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-on-surface-variant">Instructor</span>
                  <span className="text-on-surface font-black text-xs uppercase tracking-tighter">Dr. Thanh-Sach LE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-on-surface-variant">Due Date</span>
                  <span className="text-on-surface font-bold text-xs uppercase tracking-tight">{data.dueDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-on-surface-variant">Institution</span>
                  <span className="text-on-surface font-bold text-xs uppercase tracking-tight">HCMUT - VNU-HCM</span>
                </div>
              </div>
              <button className="w-full mt-8 py-4 academic-gradient text-white rounded-lg font-bold shadow-lg shadow-primary/10 hover:scale-[0.98] transition-transform cursor-pointer flex items-center justify-center gap-2">
                {data.status === 'Completed' ? <Zap size={18} /> : null}
                {data.status === 'Completed' ? 'View Final Submission' : 'Submit Deliverables'}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Grid */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeTab + "-content"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12"
        >
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-16">
            {/* Goals Section */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <span className="w-8 h-[2px] bg-primary"></span>
                <h2 className="font-headline text-2xl font-bold tracking-tight">Assignment Objectives</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.requirements.map((req) => (
                  <div key={req.id} className={`bg-white p-8 rounded-[2rem] shadow-sm border border-on-surface-variant/5 group ${req.borderColor} transition-all`}>
                    <div className={`${req.color} mb-6 transition-transform group-hover:scale-110`}>
                      {req.icon}
                    </div>
                    <h3 className={`font-sans font-black uppercase tracking-widest text-[10px] ${req.color} mb-2`}>Requirement {req.id}</h3>
                    <h3 className="font-headline font-extrabold text-xl mb-3">{req.title}</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed opacity-70">
                      {req.desc.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} className="text-on-surface opacity-100">{part}</strong> : part)}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Academic Integrity Section */}
            <section className="bg-surface-container-low rounded-[2rem] p-10 border border-outline-variant/10">
              <div className="flex items-center gap-3 mb-8">
                <ShieldCheck className="text-secondary" size={24} />
                <h2 className="font-headline text-2xl font-bold tracking-tight">Academic Integrity</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-secondary">Attribution & Honesty</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Always cite original authors and provide links to sources (datasets, code, papers). Clearly distinguish your own work from adapted material.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-secondary">Collaboration</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Acknowledge all group members and external help. Respect the license and terms of use for all reused resources (MIT, CC-BY, etc.).
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-12">
            {/* Deliverables */}
            <section>
              <h3 className="font-headline text-xl font-bold mb-6">Execution Deliverables</h3>
              <div className="space-y-4">
                {data.deliverables.map((item, idx) => (
                  <a 
                    key={idx} 
                    href={item.link}
                    target={item.link.startsWith('http') ? "_blank" : undefined}
                    rel={item.link.startsWith('http') ? "noopener noreferrer" : undefined}
                    className="group flex items-center justify-between p-5 bg-white rounded-2xl border border-on-surface-variant/10 hover:bg-surface-container-low transition-all cursor-pointer no-underline text-on-surface"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-primary group-hover:scale-110 transition-transform">{item.icon}</span>
                      <span className="font-bold text-sm tracking-tight">{item.title}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full bg-surface-container flex items-center gap-1.5 text-[9px] font-black tracking-widest ${item.color}`}>
                      {item.statusIcon}
                      {item.status}
                    </span>
                  </a>
                ))}
              </div>
            </section>

            {/* Resources */}
            <section className="bg-primary/5 rounded-2xl p-8">
              <h3 className="font-headline text-xl font-bold mb-6 flex items-center gap-2">
                <BookOpen className="text-primary" size={20} />
                Resources
              </h3>
              <ul className="space-y-6">
                {data.resources.map((res, idx) => (
                  <li key={idx}>
                    <a className="block group cursor-pointer" href="#">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">{res.type}</span>
                      <p className="font-headline font-bold text-on-surface group-hover:text-primary transition-colors">{res.title}</p>
                      <p className="text-xs text-on-surface-variant mt-1">{res.desc}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

