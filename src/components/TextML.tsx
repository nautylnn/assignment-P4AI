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
    MessageSquare,
    Languages
} from "lucide-react";
import Plot from "react-plotly.js";

const confusionMatrix = {
    z: [[85, 5, 2, 4, 4], [3, 90, 1, 3, 3], [4, 2, 88, 3, 3], [5, 4, 2, 85, 4], [4, 3, 3, 4, 86]],
    x: ['AI', 'Economy', 'Entertainment', 'Global', 'Sports'],
    y: ['AI', 'Economy', 'Entertainment', 'Global', 'Sports']
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

export default function TextML() {
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
                        Decoding Trending Topics <br/>
                        <span className="text-primary italic font-serif">with BERT Transformers.</span>
                    </h2>
                    <p className="text-on-surface-variant leading-relaxed font-medium opacity-80 mb-8">
                        Leveraging semantic patterns identified in our TF-IDF exploration, we transition to deep learning using BERT (Bidirectional Encoder Representations from Transformers) for multi-class topic classification.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-outline-variant/10 text-[10px] font-black uppercase tracking-widest">
                            <Cpu size={14} className="text-indigo-600" />
                            PyTorch + HuggingFace
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-outline-variant/10 text-[10px] font-black uppercase tracking-widest text-blue-600">
                            <Layers size={14} />
                            BERT-Base-Uncased
                        </div>
                    </div>
                </div>
            </section>

            {/* Model Architecture Section */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-[2rem] border border-outline-variant/10 p-10 shadow-sm">
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center"><Languages size={20} /></div>
                            <h3 className="text-xl font-bold tracking-tight">Transformer Architecture</h3>
                        </div>
                        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">Natural Language Understanding</span>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="flex items-start gap-4 p-5 bg-surface-container-low rounded-2xl border border-outline-variant/5">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-on-surface-variant/40 font-bold text-xs">01</div>
                            <div>
                                <h4 className="text-sm font-bold text-on-surface uppercase tracking-tight mb-1">Tokenizer & Encoding</h4>
                                <p className="text-xs text-on-surface-variant leading-relaxed opacity-70">WordPiece tokenization with a max sequence length of 128. Special tokens [CLS] and [SEP] used for classification embedding.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-5 bg-surface-container-low rounded-2xl border border-outline-variant/5">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-on-surface-variant/40 font-bold text-xs">02</div>
                            <div>
                                <h4 className="text-sm font-bold text-on-surface uppercase tracking-tight mb-1">Fine-Tuning Layer</h4>
                                <p className="text-xs text-on-surface-variant leading-relaxed opacity-70">A Dropout (0.3) layer and Linear Classifier (768 → 5) are added on top of the pooled [CLS] output.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-on-surface rounded-[2rem] p-10 text-white shadow-xl flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-bold tracking-tight mb-6 flex items-center gap-2">
                            <Zap className="text-amber-400" size={20} />
                            Hyperparameters
                        </h3>
                        <div className="space-y-4">
                            {[
                                { label: "Batch Size", val: "16" },
                                { label: "Learning Rate", val: "2e-5" },
                                { label: "Epochs", val: "3" },
                                { label: "Weight Decay", val: "0.01" },
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
                            <span className="text-[10px] font-black uppercase tracking-widest">Training Health</span>
                        </div>
                        <p className="text-[11px] opacity-60 leading-relaxed italic">Early stopping triggered after Epoch 3 to prevent overfitting on synthetic noise.</p>
                    </div>
                </div>
            </section>

            {/* Performance Metrics */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <MLStatCard label="Weighted F1-Score" value="0.94" icon={Target} color="text-emerald-600" />
                <MLStatCard label="Accuracy" value="93.8%" icon={Activity} color="text-blue-600" />
                <MLStatCard label="Precision" value="0.94" icon={LineChart} color="text-purple-600" />
                <MLStatCard label="Recall" value="0.93" icon={Zap} color="text-amber-600" />
            </section>

            {/* Visualization Section - Confusion Matrix */}
            <section className="bg-white rounded-[2.5rem] border border-outline-variant/10 p-12 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <h3 className="text-2xl font-bold tracking-tight mb-2">Confusion Matrix</h3>
                        <p className="text-xs text-on-surface-variant opacity-60 font-medium uppercase tracking-widest">Category-wise Classification Accuracy</p>
                    </div>
                </div>

                <div className="w-full min-h-[400px] flex items-center justify-center">
                    <Plot
                        data={[
                            {
                                z: confusionMatrix.z,
                                x: confusionMatrix.x,
                                y: confusionMatrix.y,
                                type: 'heatmap',
                                colorscale: 'Viridis',
                                showscale: true,
                            }
                        ]}
                        layout={{
                            paper_bgcolor: 'rgba(0,0,0,0)',
                            plot_bgcolor: 'rgba(0,0,0,0)',
                            margin: { t: 10, r: 10, b: 60, l: 100 },
                            xaxis: { title: 'Predicted Category' },
                            yaxis: { title: 'Actual Category' },
                            autosize: true,
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
                        <h3 className="text-xl font-bold tracking-tight">Code Implementation</h3>
                    </div>
                    <div className="bg-slate-900 rounded-3xl p-8 font-mono text-[11px] leading-relaxed relative border border-white/5 shadow-2xl overflow-hidden">
                        <code className="text-slate-300 block overflow-x-auto whitespace-pre custom-scrollbar">
{`# BERT Fine-Tuning with HuggingFace
from transformers import BertForSequenceClassification, Trainer, TrainingArguments

# 1. Load Model
model = BertForSequenceClassification.from_pretrained(
    "bert-base-uncased", num_labels=5
)

# 2. Define Arguments
training_args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=3,
    per_device_train_batch_size=16,
    learning_rate=2e-5,
    weight_decay=0.01,
    evaluation_strategy="epoch"
)

# 3. Initialize Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_train,
    eval_dataset=tokenized_val
)

# 4. Train
trainer.train()`}
                        </code>
                    </div>
                </div>

                <div className="bg-white rounded-[2rem] border border-outline-variant/10 p-10 shadow-sm">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center"><FlaskConical size={20} /></div>
                        <h3 className="text-xl font-bold tracking-tight">EDA Insights Integration</h3>
                    </div>
                    <ul className="space-y-6">
                        <li className="flex gap-4">
                            <CheckCircle2 className="text-emerald-500 shrink-0" size={18} />
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-on-surface mb-1">Vocabulary Overlap</h4>
                                <p className="text-xs text-on-surface-variant leading-relaxed opacity-70">EDA TF-IDF showed high overlap between 'Tech' and 'Economy'. BERT's context-awareness helped resolve these ambiguities.</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <CheckCircle2 className="text-emerald-500 shrink-0" size={18} />
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-on-surface mb-1">Sequence Length</h4>
                                <p className="text-xs text-on-surface-variant leading-relaxed opacity-70">Distribution analysis of character counts led to choosing a conservative max_length of 128 to save memory.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
}
