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
    Network
} from "lucide-react";
import Plot from "react-plotly.js";

// --- Mock Data for the Template ---
const trainingHistory = {
    iterations: Array.from({ length: 50 }, (_, i) => i + 1),
    auc: [0.65, 0.70, 0.75, 0.78, 0.81, 0.83, 0.84, 0.85, 0.855, 0.86, 0.865, 0.87, 0.872, 0.874, 0.875, 0.876, 0.877, 0.878, 0.879, 0.88, 0.881, 0.882, 0.883, 0.884, 0.885, 0.886, 0.887, 0.888, 0.889, 0.89, 0.891, 0.892, 0.893, 0.894, 0.895, 0.896, 0.897, 0.898, 0.899, 0.90, 0.901, 0.902, 0.903, 0.904, 0.905, 0.906, 0.907, 0.908, 0.909, 0.91],
};

const featureImportance = {
    features: ['Humidity3pm', 'Pressure3pm', 'Cloud3pm', 'Sunshine', 'WindGustSpeed', 'Temp3pm', 'Humidity9am', 'RainToday', 'Pressure9am', 'MinTemp'],
    scores: [0.28, 0.18, 0.12, 0.10, 0.08, 0.06, 0.05, 0.04, 0.03, 0.02]
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

export default function TabularML() {
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
                        Predicting Rain in Australia <br/>
                        <span className="text-primary italic font-serif">with Gradient Boosted Trees.</span>
                    </h2>
                    <p className="text-on-surface-variant leading-relaxed font-medium opacity-80 mb-8">
                        Following our EDA insights on missing value patterns and feature correlations, we implement a supervised learning pipeline using XGBoost and Random Forest to predict next-day rainfall.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-outline-variant/10 text-[10px] font-black uppercase tracking-widest">
                            <Cpu size={14} className="text-emerald-600" />
                            XGBoost 2.0
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-outline-variant/10 text-[10px] font-black uppercase tracking-widest text-blue-600">
                            <Network size={14} />
                            Ensemble Pipeline
                        </div>
                    </div>
                </div>
            </section>

            {/* Model Strategy Section */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-[2rem] border border-outline-variant/10 p-10 shadow-sm">
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center"><BrainCircuit size={20} /></div>
                            <h3 className="text-xl font-bold tracking-tight">Model Strategy</h3>
                        </div>
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">XGBoost Classifier</span>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="flex items-start gap-4 p-5 bg-surface-container-low rounded-2xl border border-outline-variant/5">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-on-surface-variant/40 font-bold text-xs">01</div>
                            <div>
                                <h4 className="text-sm font-bold text-on-surface uppercase tracking-tight mb-1">Feature Engineering</h4>
                                <p className="text-xs text-on-surface-variant leading-relaxed opacity-70">Handling missing values with Median Imputation for numerical and Mode for categorical. Created 'Month' feature from Date to capture seasonality.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-5 bg-surface-container-low rounded-2xl border border-outline-variant/5">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-on-surface-variant/40 font-bold text-xs">02</div>
                            <div>
                                <h4 className="text-sm font-bold text-on-surface uppercase tracking-tight mb-1">Imbalance Handling</h4>
                                <p className="text-xs text-on-surface-variant leading-relaxed opacity-70">Used `scale_pos_weight` (~3.5) to account for the minority 'Rain=Yes' class (approx 22% of data).</p>
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
                                { label: "n_estimators", val: "500" },
                                { label: "max_depth", val: "6" },
                                { label: "learning_rate", val: "0.05" },
                                { label: "subsample", val: "0.8" },
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
                            <span className="text-[10px] font-black uppercase tracking-widest">Training Progress</span>
                        </div>
                        <p className="text-[11px] opacity-60 leading-relaxed italic">Optimization completed using Optuna Bayesian Search over 50 trials.</p>
                    </div>
                </div>
            </section>

            {/* Performance Metrics */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <MLStatCard label="AUC-ROC Score" value="0.891" icon={Target} color="text-emerald-600" />
                <MLStatCard label="Accuracy" value="85.2%" icon={Activity} color="text-blue-600" />
                <MLStatCard label="Precision (Yes)" value="0.74" icon={LineChart} color="text-purple-600" />
                <MLStatCard label="Recall (Yes)" value="0.78" icon={Zap} color="text-amber-600" />
            </section>

            {/* Visualization Section - Feature Importance */}
            <section className="bg-white rounded-[2.5rem] border border-outline-variant/10 p-12 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <h3 className="text-2xl font-bold tracking-tight mb-2">Feature Importance (SHAP)</h3>
                        <p className="text-xs text-on-surface-variant opacity-60 font-medium uppercase tracking-widest">Top Predictors for Rainfall</p>
                    </div>
                </div>

                <div className="w-full min-h-[400px] flex items-center justify-center">
                    <Plot
                        data={[
                            {
                                x: featureImportance.scores,
                                y: featureImportance.features,
                                type: 'bar',
                                orientation: 'h',
                                marker: { color: '#00685f' },
                            }
                        ]}
                        layout={{
                            paper_bgcolor: 'rgba(0,0,0,0)',
                            plot_bgcolor: 'rgba(0,0,0,0)',
                            margin: { t: 10, r: 10, b: 40, l: 120 },
                            xaxis: { title: 'Relative Importance', showgrid: true },
                            yaxis: { autorange: 'reversed' },
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
{`# XGBoost Training Pipeline
from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split

# 1. Split Data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y
)

# 2. Define Model
model = XGBClassifier(
    n_estimators=500,
    max_depth=6,
    learning_rate=0.05,
    scale_pos_weight=3.5,
    tree_method='gpu_hist' # For faster training
)

# 3. Fit
model.fit(X_train, y_train, 
          eval_set=[(X_test, y_test)], 
          early_stopping_rounds=10)`}
                        </code>
                    </div>
                </div>

                <div className="bg-white rounded-[2rem] border border-outline-variant/10 p-10 shadow-sm">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center"><FlaskConical size={20} /></div>
                        <h3 className="text-xl font-bold tracking-tight">EDA Findings Integration</h3>
                    </div>
                    <ul className="space-y-6">
                        <li className="flex gap-4">
                            <CheckCircle2 className="text-emerald-500 shrink-0" size={18} />
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-on-surface mb-1">Humidity & Pressure</h4>
                                <p className="text-xs text-on-surface-variant leading-relaxed opacity-70">EDA showed clear divergence in 3pm Humidity and Pressure. These were confirmed as top features in the model.</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <CheckCircle2 className="text-emerald-500 shrink-0" size={18} />
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-on-surface mb-1">Temporal Alignment</h4>
                                <p className="text-xs text-on-surface-variant leading-relaxed opacity-70">Observation of seasonal variance in EDA led to encoding Date as cyclical features (sine/cosine).</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
}
