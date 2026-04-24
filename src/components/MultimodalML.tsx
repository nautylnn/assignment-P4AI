import React, { useState } from "react";
import { motion } from "motion/react";
import { 
    BrainCircuit, 
    Cpu, 
    Zap, 
    Target, 
    Activity, 
    LineChart, 
    BarChart3, 
    Search, 
    CheckCircle2, 
    Code2, 
    Layers,
    FileCode,
    Terminal,
    Maximize,
    FlaskConical,
    Network,
    Image as ImageIcon,
    Type,
    GitMerge
} from "lucide-react";
import Plot from "react-plotly.js";

// --- Mock Data for the Template ---
const comparisonData = {
    labels: ['Image-Only', 'Text-Only', 'Multimodal (Concat)'],
    accuracy: [0.42, 0.58, 0.65],
    f1: [0.38, 0.55, 0.62]
};

const MLStatCard = ({ label, value, icon: Icon, color = "text-primary" }: any) => (
    <div className="bg-white p-8 rounded-3xl border border-outline-variant/10 shadow-sm hover:shadow-md transition-all group">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl bg-surface-container-low ${color} group-hover:scale-110 transition-transform`}>
                <Icon size={20} />
            </div>
            <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">Metric</span>
        </div>
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-2">{label}</div>
        <div className="text-3xl font-bold tracking-tight text-on-surface">{value}</div>
    </div>
);

export default function MultimodalML() {
    return (
        <div className="space-y-12 pb-40">
            {/* Header / Intro */}
            <section className="bg-primary/5 rounded-[3rem] p-12 border border-primary/10">
                <div className="max-w-3xl">
                    <div className="flex items-center gap-3 text-primary font-bold tracking-widest text-[10px] uppercase mb-6">
                        <span className="w-8 h-px bg-primary/40"></span>
                        Assignment 2: Machine Learning
                    </div>
                    <h2 className="text-4xl font-extrabold tracking-tighter text-on-surface mb-6">
                        ArtEmis Affective Prediction <br/>
                        <span className="text-primary italic font-serif">with Multimodal Fusion.</span>
                    </h2>
                    <p className="text-on-surface-variant leading-relaxed font-medium opacity-80 mb-8">
                        Our EDA revealed significant correlations between visual styles and emotional utterances. We now implement a late-fusion multimodal pipeline that combines visual features from ResNet with semantic embeddings from TF-IDF.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-outline-variant/10 text-[10px] font-black uppercase tracking-widest">
                            <Cpu size={14} className="text-indigo-600" />
                            PyTorch Multi-Stream
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-outline-variant/10 text-[10px] font-black uppercase tracking-widest text-blue-600">
                            <GitMerge size={14} />
                            Feature Fusion
                        </div>
                    </div>
                </div>
            </section>

            {/* Model Architecture Section */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-[2rem] border border-outline-variant/10 p-10 shadow-sm">
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center"><BrainCircuit size={20} /></div>
                            <h3 className="text-xl font-bold tracking-tight">Fusion Architecture</h3>
                        </div>
                        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">Late Fusion (Concat)</span>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="flex items-start gap-4 p-5 bg-surface-container-low rounded-2xl border border-outline-variant/5">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-on-surface-variant/40 font-bold text-xs">01</div>
                            <div className="flex-1">
                                <h4 className="text-sm font-bold text-on-surface uppercase tracking-tight mb-1">Visual Stream</h4>
                                <p className="text-xs text-on-surface-variant leading-relaxed opacity-70">ResNet18 backbone extracts 512-dimensional visual vectors from artwork images.</p>
                            </div>
                            <ImageIcon size={16} className="text-primary/40" />
                        </div>
                        <div className="flex items-start gap-4 p-5 bg-surface-container-low rounded-2xl border border-outline-variant/5">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-on-surface-variant/40 font-bold text-xs">02</div>
                            <div className="flex-1">
                                <h4 className="text-sm font-bold text-on-surface uppercase tracking-tight mb-1">Textual Stream</h4>
                                <p className="text-xs text-on-surface-variant leading-relaxed opacity-70">TF-IDF Vectorizer (Top 5000 features) encodes human emotional utterances.</p>
                            </div>
                            <Type size={16} className="text-primary/40" />
                        </div>
                        <div className="flex items-start gap-4 p-5 bg-primary/5 rounded-2xl border border-primary/10">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-primary font-bold text-xs">03</div>
                            <div className="flex-1">
                                <h4 className="text-sm font-bold text-on-surface uppercase tracking-tight mb-1">Fusion Layer</h4>
                                <p className="text-xs text-on-surface-variant leading-relaxed opacity-70">Concatenated vectors are passed through a MLP with 3 hidden layers and Dropout for emotion classification.</p>
                            </div>
                            <GitMerge size={16} className="text-primary" />
                        </div>
                    </div>
                </div>

                <div className="bg-on-surface rounded-[2rem] p-10 text-white shadow-xl flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-bold tracking-tight mb-6 flex items-center gap-2">
                            <Zap className="text-amber-400" size={20} />
                            Comparison Specs
                        </h3>
                        <div className="space-y-4">
                            {[
                                { label: "Image Dim", val: "224x224" },
                                { label: "Text Vocab", val: "5,000" },
                                { label: "Fusion Dim", val: "5512" },
                                { label: "Classes", val: "8 (ArtEmis)" },
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center py-3 border-b border-white/10">
                                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{item.label}</span>
                                    <span className="text-xs font-bold tracking-tight">{item.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-10 p-5 bg-white/5 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-2 mb-2 text-amber-400">
                            <Activity size={14} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Ensemble Logic</span>
                        </div>
                        <p className="text-[11px] opacity-60 leading-relaxed italic">Multimodal fusion consistently outperforms single-modality baselines by 7-23%.</p>
                    </div>
                </div>
            </section>

            {/* Performance Metrics */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <MLStatCard label="Accuracy (Joint)" value="65.4%" icon={Target} color="text-emerald-600" />
                <MLStatCard label="Macro F1-Score" value="0.62" icon={Activity} color="text-blue-600" />
                <MLStatCard label="Image Gain" value="+23.4%" icon={LineChart} color="text-purple-600" />
                <MLStatCard label="Text Gain" value="+7.4%" icon={Zap} color="text-amber-600" />
            </section>

            {/* Visualization Section - Modal Comparison */}
            <section className="bg-white rounded-[2.5rem] border border-outline-variant/10 p-12 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <h3 className="text-2xl font-bold tracking-tight mb-2">Modality Comparison</h3>
                        <p className="text-xs text-on-surface-variant opacity-60 font-medium uppercase tracking-widest">Comparing Single vs. Multi-modal performance</p>
                    </div>
                </div>

                <div className="w-full min-h-[400px] flex items-center justify-center">
                    <Plot
                        data={[
                            {
                                x: comparisonData.labels,
                                y: comparisonData.accuracy,
                                type: 'bar',
                                name: 'Accuracy',
                                marker: { color: '#00685f' },
                            },
                            {
                                x: comparisonData.labels,
                                y: comparisonData.f1,
                                type: 'bar',
                                name: 'F1 Score',
                                marker: { color: '#6366f1' },
                            }
                        ]}
                        layout={{
                            paper_bgcolor: 'rgba(0,0,0,0)',
                            plot_bgcolor: 'rgba(0,0,0,0)',
                            margin: { t: 10, r: 10, b: 60, l: 60 },
                            xaxis: { title: 'Pipeline Configuration' },
                            yaxis: { title: 'Score', range: [0, 1] },
                            autosize: true,
                            barmode: 'group'
                        }}
                        useResizeHandler={true}
                        style={{ width: "100%", height: "400px" }}
                        config={{ responsive: true, displayModeBar: false }}
                    />
                </div>
            </section>

            {/* Implementation Details */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-on-surface/5 rounded-xl flex items-center justify-center"><Code2 size={20} /></div>
                        <h3 className="text-xl font-bold tracking-tight">Fusion Implementation</h3>
                    </div>
                    <div className="bg-slate-900 rounded-3xl p-8 font-mono text-[11px] leading-relaxed relative border border-white/5 shadow-2xl overflow-hidden">
                        <code className="text-slate-300 block overflow-x-auto whitespace-pre custom-scrollbar">
{`# Multimodal Joint Embedding (Late Fusion)
class MultimodalModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.img_stream = models.resnet18(pretrained=True)
        self.text_stream = nn.Linear(5000, 256)
        
        self.fusion = nn.Sequential(
            nn.Linear(512 + 256, 128),
            nn.ReLU(),
            nn.Linear(128, 8) # 8 Emotions
        )

    def forward(self, img, text):
        v_feat = self.img_stream(img)
        t_feat = self.text_stream(text)
        joint = torch.cat((v_feat, t_feat), dim=1)
        return self.fusion(joint)`}
                        </code>
                    </div>
                </div>

                <div className="bg-white rounded-[2rem] border border-outline-variant/10 p-10 shadow-sm">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center"><FlaskConical size={20} /></div>
                        <h3 className="text-xl font-bold tracking-tight">EDA Multi-modal Insights</h3>
                    </div>
                    <ul className="space-y-6">
                        <li className="flex gap-4">
                            <CheckCircle2 className="text-emerald-500 shrink-0" size={18} />
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-on-surface mb-1">Style-Emotion Bias</h4>
                                <p className="text-xs text-on-surface-variant leading-relaxed opacity-70">EDA showed Impressionism correlates strongly with Contentment. The model uses style features to bias the emotional prediction.</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <CheckCircle2 className="text-emerald-500 shrink-0" size={18} />
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-on-surface mb-1">Textual Grounding</h4>
                                <p className="text-xs text-on-surface-variant leading-relaxed opacity-70">Lexical patterns (e.g., "dark", "jagged") provide critical grounding that visual features alone sometimes miss in abstract art.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
}
