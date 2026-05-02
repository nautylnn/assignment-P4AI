import React from "react";
import { motion } from "motion/react";
import {
    BrainCircuit,
    Target,
    Activity,
    Zap,
    Type,
    Image as ImageIcon,
    GitMerge,
    ArrowRight,
    TrendingUp,
    Info,
    CheckCircle2,
    BarChart3,
    ExternalLink
} from "lucide-react";

import textOnlyImg from "../assets/images/image/text-only.png";
import textOnlyF1Img from "../assets/images/image/text-only-f1.png";
import imageOnlyF1Img from "../assets/images/image/image-only-f1.png";
import multimodalFusionF1Img from "../assets/images/image/multimodal-fusion-f1.png";

// --- Data from Notebook Analysis ---
const mlSummary = [
    { modality: "Text", technique: "BoW + NB", feature: "CountVectorizer", classifier: "MultinomialNB", acc: "0.6692", macroF1: "0.5293", weightedF1: "0.6587" },
    { modality: "Text", technique: "TF-IDF + LR", feature: "TF-IDF", classifier: "Logistic Regression", acc: "0.6382", macroF1: "0.5329", weightedF1: "0.6510" },
    { modality: "Text", technique: "TF-IDF + SVM", feature: "TF-IDF", classifier: "LinearSVC", acc: "0.6624", macroF1: "0.5517", weightedF1: "0.6692" },
    { modality: "Image", technique: "Color histogram", feature: "HSV/RGB hist", classifier: "Random Forest", acc: "0.3728", macroF1: "0.1014", weightedF1: "0.2537" },
    { modality: "Image", technique: "HOG", feature: "HOG vector", classifier: "LinearSVC", acc: "0.1981", macroF1: "0.1290", weightedF1: "0.2165" },
    { modality: "Image", technique: "CNN feature", feature: "ResNet18 512-d", classifier: "LinearSVC", acc: "0.2746", macroF1: "0.1774", weightedF1: "0.2995" },
    { modality: "Image", technique: "Transfer learning", feature: "Fine-tuned ResNet18", classifier: "CNN classifier", acc: "0.3772", macroF1: "0.1423", weightedF1: "0.3053" },
    { modality: "Multi", technique: "Early fusion", feature: "TF-IDF + ResNet", classifier: "LinearSVC", acc: "0.6509", macroF1: "0.5413", weightedF1: "0.6593" },
    { modality: "Multi", technique: "Late fusion", feature: "Text prob + image prob", classifier: "Weighted average", acc: "0.6666", macroF1: "0.5620", weightedF1: "0.6629" },
];

const PipelineBlock = ({ title, steps, metrics, insight, type }: any) => (
    <div className="bg-white rounded-3xl border border-outline-variant/10 p-6 shadow-sm hover:shadow-md transition-all h-full flex flex-col">
        <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-lg ${type === 'text' ? 'bg-blue-50 text-blue-600' : type === 'image' ? 'bg-emerald-50 text-emerald-600' : 'bg-purple-50 text-purple-600'}`}>
                {type === 'text' ? <Type size={18} /> : type === 'image' ? <ImageIcon size={18} /> : <GitMerge size={18} />}
            </div>
            <h4 className="font-bold tracking-tight text-on-surface text-sm">{title}</h4>
        </div>

        {/* Pipeline Visualization */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
            {steps.map((step: string, i: number) => (
                <React.Fragment key={i}>
                    <div className="shrink-0 px-3 py-2 bg-surface-container-low rounded-lg border border-outline-variant/5 text-center text-[9px] font-black uppercase tracking-widest text-on-surface-variant min-w-[80px]">
                        {step}
                    </div>
                    {i < steps.length - 1 && <ArrowRight size={12} className="text-outline-variant/40 shrink-0" />}
                </React.Fragment>
            ))}
        </div>

        {/* Multi-Metric Display */}
        <div className="space-y-4 mb-6">
            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-primary">
                <Target size={12} /> Detailed Performance
            </div>
            <div className="grid grid-cols-1 gap-2">
                {Object.entries(metrics).map(([key, val]: any) => (
                    <div key={key} className="flex justify-between items-center px-4 py-2 bg-surface-container-low/50 rounded-xl border border-outline-variant/5">
                        <span className="text-[10px] font-bold text-on-surface-variant opacity-60 uppercase">{key}</span>
                        <span className="text-xs font-mono font-bold text-on-surface">{val}</span>
                    </div>
                ))}
            </div>
        </div>

        <div className="mt-auto pt-4 border-t border-outline-variant/5">
            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-amber-600 mb-2">
                <TrendingUp size={12} /> Insight
            </div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed opacity-80">{insight}</p>
        </div>
    </div>
);

export default function MultimodalML() {
    return (
        <div className="space-y-16 pb-40 px-4 max-w-7xl mx-auto">
            {/* Header Section */}
            <header className="pt-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl"
                >
                    <div className="flex items-center gap-3 text-primary font-bold tracking-widest text-[10px] uppercase mb-6">
                        <span className="w-8 h-px bg-primary/40"></span>
                        Part 2: Machine Learning for Data Analysis
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface mb-6">
                        Multimodal Affective <br />
                        <span className="text-primary italic font-serif">Analysis & Results.</span>
                    </h1>
                    <p className="text-lg text-on-surface-variant leading-relaxed opacity-80 mb-8">
                        Detailed evaluation of textual, visual, and fused models for predicting human emotional responses to visual art.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a
                            href="https://colab.research.google.com/drive/1SauFyRlbIxI9QwYu9cdxvY3N6N6kVUAX"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-on-surface text-white rounded-2xl font-bold text-xs hover:bg-primary transition-all shadow-lg hover:shadow-primary/20 group"
                        >
                            <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            View Source on Google Colab
                        </a>
                    </div>
                </motion.div>
            </header>

            {/* 1. Text Modality Section */}
            <section className="space-y-8">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
                        <Type className="text-blue-600" /> Text Models Analysis
                    </h2>
                    <div className="h-px flex-1 bg-outline-variant/10"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <PipelineBlock
                        type="text"
                        title="BoW + Naive Bayes"
                        steps={["Raw Text", "CountVec", "NB"]}
                        metrics={{ "Accuracy": "0.6692", "Weighted F1": "0.6587", "Macro F1": "0.5293" }}
                        insight="Efficient baseline. High accuracy due to strong emotional keyword frequency in the dataset."
                    />
                    <PipelineBlock
                        type="text"
                        title="TF-IDF + Logistic Regression"
                        steps={["Raw Text", "TF-IDF", "LogReg"]}
                        metrics={{ "Accuracy": "0.6382", "Weighted F1": "0.6510", "Macro F1": "0.5329" }}
                        insight="Better balancing of common vs rare words. Performs consistently across majority classes."
                    />
                    <PipelineBlock
                        type="text"
                        title="TF-IDF + Linear SVM"
                        steps={["Raw Text", "TF-IDF", "Linear SVC"]}
                        metrics={{ "Accuracy": "0.6624", "Weighted F1": "0.6692", "Macro F1": "0.5517" }}
                        insight="Superior performance in defining decision boundaries for multi-class emotion labels."
                    />
                </div>

                {/* Experimental Output Charts for Text */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                    <div className="bg-white rounded-[2rem] border border-outline-variant/10 p-6 shadow-sm overflow-hidden group">
                        <div className="flex items-center gap-2 mb-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                            <BarChart3 size={14} className="text-blue-600" /> Accuracy & F1 Comparison
                        </div>
                        <div className="rounded-xl overflow-hidden border border-outline-variant/5">
                            <img src={textOnlyImg} alt="Text Only Accuracy" className="w-full h-auto hover:scale-105 transition-transform duration-500" />
                        </div>
                    </div>
                    <div className="bg-white rounded-[2rem] border border-outline-variant/10 p-6 shadow-sm overflow-hidden group">
                        <div className="flex items-center gap-2 mb-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                            <BarChart3 size={14} className="text-blue-600" /> Macro-F1 Performance
                        </div>
                        <div className="rounded-xl overflow-hidden border border-outline-variant/5">
                            <img src={textOnlyF1Img} alt="Text Only Macro F1" className="w-full h-auto hover:scale-105 transition-transform duration-500" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Image Modality Section */}
            <section className="space-y-8">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
                        <ImageIcon className="text-emerald-600" /> Image Models Analysis
                    </h2>
                    <div className="h-px flex-1 bg-outline-variant/10"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <PipelineBlock
                        type="image"
                        title="Color Hist + RF"
                        steps={["Image", "HSV Hist", "RF"]}
                        metrics={{ "Accuracy": "0.3728", "Weighted F1": "0.2537", "Macro F1": "0.1014" }}
                        insight="Color is a strong indicator of emotion, but lacks structural context."
                    />
                    <PipelineBlock
                        type="image"
                        title="HOG + Linear SVM"
                        steps={["Image", "HOG", "Linear SVC"]}
                        metrics={{ "Accuracy": "0.1981", "Weighted F1": "0.2165", "Macro F1": "0.1290" }}
                        insight="Lowest performance. Gradients struggle with abstract emotional nature of fine art."
                    />
                    <PipelineBlock
                        type="image"
                        title="CNN + Linear SVM"
                        steps={["Image", "ResNet18", "Linear SVC"]}
                        metrics={{ "Accuracy": "0.2746", "Weighted F1": "0.2995", "Macro F1": "0.1774" }}
                        insight="High-level semantic features provide better emotional cues than traditional descriptors."
                    />
                    <PipelineBlock
                        type="image"
                        title="Fine-tuned ResNet18"
                        steps={["Image", "ResNet18 FT", "Softmax"]}
                        metrics={{ "Accuracy": "0.3772", "Weighted F1": "0.3053", "Macro F1": "0.1423" }}
                        insight="The best image-only performer. Adapting the CNN to art-specific patterns improves prediction."
                    />
                </div>

                {/* Experimental Output Charts for Image */}
                <div className="grid grid-cols-1 gap-8 mt-12">
                    <div className="bg-white rounded-[2rem] border border-outline-variant/10 p-6 shadow-sm overflow-hidden group">
                        <div className="flex items-center gap-2 mb-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                            <BarChart3 size={14} className="text-emerald-600" /> Image Feature Comparison (Macro-F1)
                        </div>
                        <div className="rounded-xl overflow-hidden border border-outline-variant/5">
                            <img src={imageOnlyF1Img} alt="Image Feature Comparison" className="w-full h-auto hover:scale-105 transition-transform duration-500" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Multimodal Fusion Section */}
            <section className="space-y-8">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
                        <GitMerge className="text-purple-600" /> Multimodal Fusion
                    </h2>
                    <div className="h-px flex-1 bg-outline-variant/10"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <PipelineBlock
                        type="multi"
                        title="Early Fusion"
                        steps={["Text + Image", "Concat", "Linear SVC"]}
                        metrics={{ "Accuracy": "0.6509", "Weighted F1": "0.6593", "Macro F1": "0.5413" }}
                        insight="Combining high-dimensional vectors early can sometimes lead to redundancy."
                    />
                    <PipelineBlock
                        type="multi"
                        title="Late Fusion (Best Weight)"
                        steps={["Probs", "Weighted Avg", "Decision"]}
                        metrics={{ "Accuracy": "0.6666", "Weighted F1": "0.6629", "Macro F1": "0.5620" }}
                        insight="Best Overall (Text:0.6/Img:0.4). Combining probabilities produces most balanced results."
                    />
                </div>

                {/* Experimental Output Charts for Multimodal */}
                <div className="grid grid-cols-1 gap-8 mt-12">
                    <div className="bg-white rounded-[2rem] border border-outline-variant/10 p-6 shadow-sm overflow-hidden group">
                        <div className="flex items-center gap-2 mb-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                            <BarChart3 size={14} className="text-purple-600" /> Fusion Technique Comparison (Macro-F1)
                        </div>
                        <div className="rounded-xl overflow-hidden border border-outline-variant/5">
                            <img src={multimodalFusionF1Img} alt="Fusion Comparison" className="w-full h-auto hover:scale-105 transition-transform duration-500" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Summary Table Section */}
            <section className="space-y-8">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
                        <BarChart3 className="text-primary" /> Performance Summary Table
                    </h2>
                    <div className="h-px flex-1 bg-outline-variant/10"></div>
                </div>

                <div className="overflow-hidden rounded-[2rem] border border-outline-variant/10 shadow-sm bg-white">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-surface-container-low border-b border-outline-variant/10">
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Modality</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Technique</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Feature</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Classifier</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant text-center">Accuracy</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant text-center">Macro F1</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant text-center">Weighted F1</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant/5">
                                {mlSummary.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-primary/5 transition-colors group text-[11px]">
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-[4px] text-[8px] font-bold uppercase tracking-tighter ${row.modality === 'Text' ? 'bg-blue-100 text-blue-700' :
                                                    row.modality === 'Image' ? 'bg-emerald-100 text-emerald-700' : 'bg-purple-100 text-purple-700'
                                                }`}>
                                                {row.modality}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-on-surface">{row.technique}</td>
                                        <td className="px-6 py-4 text-on-surface-variant opacity-70 italic">{row.feature}</td>
                                        <td className="px-6 py-4 text-on-surface-variant">{row.classifier}</td>
                                        <td className="px-6 py-4 font-mono font-bold text-center text-on-surface">{row.acc}</td>
                                        <td className="px-6 py-4 font-mono font-bold text-center text-primary">{row.macroF1}</td>
                                        <td className="px-6 py-4 font-mono font-bold text-center text-on-surface">{row.weightedF1}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Conclusion Insight */}
            <section className="bg-on-surface rounded-[2.5rem] p-12 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="relative z-10 max-w-2xl">
                    <h3 className="text-3xl font-bold tracking-tight mb-6 flex items-center gap-3">
                        <CheckCircle2 className="text-primary" /> Final Insights
                    </h3>
                    <div className="space-y-6">
                        <div className="flex gap-4 p-5 bg-white/5 rounded-2xl border border-white/10">
                            <Info className="text-primary shrink-0" size={20} />
                            <p className="text-sm leading-relaxed opacity-80 italic">
                                "Text data overwhelmingly outperforms visual data in emotion prediction. This suggests that human emotional utterances contain much clearer signals than pure visual features in fine art."
                            </p>
                        </div>
                        <div className="flex gap-4 p-5 bg-white/5 rounded-2xl border border-white/10">
                            <Zap className="text-amber-400 shrink-0" size={20} />
                            <p className="text-sm leading-relaxed opacity-80 italic">
                                "Late Fusion (with optimal weights of 0.6-0.7 for Text and 0.3-0.4 for Image) yields the best results, proving that while text is dominant, visual information still provides valuable nuances that refine the overall prediction accuracy."
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
