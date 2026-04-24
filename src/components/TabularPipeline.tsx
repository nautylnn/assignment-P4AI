import React, { useState, useEffect } from "react";
import heroImage from "../assets/images/image/ảnh.jpg";
import { motion, AnimatePresence } from "motion/react";
import Plot from "react-plotly.js";
import {
    ArrowLeft,
    BookOpen,
    BarChart3,
    CheckCircle2,
    Columns,
    Database,
    Layout,
    Layers,
    ChevronDown,
    Copy,
    Dices,
    Activity,
    Zap,
    Info,
    GitMerge,
    Target,
    Link,
    BoxSelect,
    Users,
    FileWarning,
    Calendar,
    Network,
    AlertTriangle,
    Settings,
    ArrowRight,
    Filter,
    SearchX,
    Wand2,
    Trophy,
    Sliders
} from "lucide-react";
import _dtData from "../assets/data/tabularEDA/pipeline_data_dt.json";
import _rfData from "../assets/data/tabularEDA/pipeline_data_rf.json";
import _xgbData from "../assets/data/tabularEDA/pipeline_data_xgb.json";

const dtData = _dtData as any;
const rfData = _rfData as any;
const xgbData = _xgbData as any;

const BinaryConfusionMatrix = ({ modelName, tp, tn, fp, fn }: { modelName: string, tp: number, tn: number, fp: number, fn: number }) => {
    // --- Scikit-Learn Style Metric Calculations ---
    const total = tp + tn + fp + fn;
    
    // Support (Actual instances of each class)
    const support0 = tn + fp; // Actual Dry
    const support1 = tp + fn; // Actual Rain

    // Class 0 (Dry Day) Metrics
    const p0 = tn / (tn + fn) || 0;
    const r0 = tn / (tn + fp) || 0;
    const f1_0 = 2 * (p0 * r0) / (p0 + r0) || 0;

    // Class 1 (Rainy Day) Metrics
    const p1 = tp / (tp + fp) || 0;
    const r1 = tp / (tp + fn) || 0;
    const f1_1 = 2 * (p1 * r1) / (p1 + r1) || 0;

    // Averages
    const accuracy = (tp + tn) / total || 0;
    const macro_p = (p0 + p1) / 2;
    const macro_r = (r0 + r1) / 2;
    const macro_f1 = (f1_0 + f1_1) / 2;
    const weighted_p = (p0 * support0 + p1 * support1) / total;
    const weighted_r = (r0 * support0 + r1 * support1) / total;
    const weighted_f1 = (f1_0 * support0 + f1_1 * support1) / total;

    return (
        <div className="bg-white p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-sm hover:shadow-xl transition-all border-l-[6px] border-l-primary flex flex-col group overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold tracking-tight text-on-surface">{modelName}</h3>
                <div className="px-4 py-1.5 bg-primary/10 text-primary rounded-lg text-[11px] font-black uppercase tracking-widest border border-primary/20 shadow-sm">
                    Acc: {(accuracy * 100).toFixed(2)}%
                </div>
            </div>

            <div className="flex flex-col xl:flex-row gap-12">
                
                {/* Left Side: The 2x2 Matrix Grid */}
                <div className="w-full xl:w-[45%] shrink-0">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60 mb-4">Confusion Matrix</div>
                    <div className="relative pt-6 pl-8">
                        {/* Axis Labels */}
                        <div className="absolute top-0 left-8 right-0 flex text-[9px] font-bold uppercase tracking-widest text-on-surface-variant/50 text-center">
                            <div className="flex-1 border-b border-outline-variant/10 pb-2">Predicted Dry</div>
                            <div className="flex-1 border-b border-outline-variant/10 pb-2">Predicted Rain</div>
                        </div>
                        <div className="absolute top-6 bottom-0 left-0 w-8 flex flex-col text-[9px] font-bold uppercase tracking-widest text-on-surface-variant/50 text-center border-r border-outline-variant/10 pr-2">
                            <div className="flex-1 flex items-center justify-end -rotate-90">Actual Dry</div>
                            <div className="flex-1 flex items-center justify-end -rotate-90">Actual Rain</div>
                        </div>

                        {/* 2x2 Grid */}
                        <div className="grid grid-cols-2 gap-2 mt-2 h-full min-h-[140px]">
                            {/* Actual Dry / Predicted Dry */}
                            <div className="bg-surface-container border border-outline-variant/20 p-4 rounded-2xl flex flex-col items-center justify-center text-center transition-transform group-hover:scale-[1.02]">
                                <div className="text-xl font-black text-on-surface">{tn.toLocaleString()}</div>
                            </div>
                            
                            {/* Actual Dry / Predicted Rain */}
                            <div className="bg-error/5 border border-error/20 p-4 rounded-2xl flex flex-col items-center justify-center text-center transition-transform group-hover:scale-[1.02]">
                                <div className="text-[9px] font-bold uppercase tracking-widest text-error/70 mb-1">False Alarm</div>
                                <div className="text-xl font-black text-error">{fp.toLocaleString()}</div>
                            </div>

                            {/* Actual Rain / Predicted Dry */}
                            <div className="bg-error/5 border border-error/20 p-4 rounded-2xl flex flex-col items-center justify-center text-center transition-transform group-hover:scale-[1.02]">
                                <div className="text-[9px] font-bold uppercase tracking-widest text-error/70 mb-1">Missed Rain</div>
                                <div className="text-xl font-black text-error">{fn.toLocaleString()}</div>
                            </div>

                            {/* Actual Rain / Predicted Rain */}
                            <div className="bg-primary/10 border border-primary/20 p-4 rounded-2xl flex flex-col items-center justify-center text-center transition-transform group-hover:scale-[1.02]">
                                <div className="text-xl font-black text-primary">{tp.toLocaleString()}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Classification Report Table */}
                <div className="w-full flex-1 border-t xl:border-t-0 xl:border-l border-outline-variant/10 pt-8 xl:pt-0 xl:pl-8">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60 mb-6">Classification Report</div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-right text-sm border-collapse min-w-[400px]">
                            <thead className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 border-b-2 border-outline-variant/10">
                                <tr>
                                    <th className="text-left pb-3 pr-4">Class</th>
                                    <th className="pb-3 px-3">Precision</th>
                                    <th className="pb-3 px-3">Recall</th>
                                    <th className="pb-3 px-3">F1-Score</th>
                                    <th className="pb-3 pl-3">Support</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant/5">
                                {/* Class 0 */}
                                <tr className="hover:bg-surface-container-low/50 transition-colors">
                                    <td className="text-left py-3 pr-4 font-bold text-on-surface">Dry Day</td>
                                    <td className="py-3 px-3 font-mono font-medium">{p0.toFixed(2)}</td>
                                    <td className="py-3 px-3 font-mono font-medium">{r0.toFixed(2)}</td>
                                    <td className="py-3 px-3 font-mono font-medium">{f1_0.toFixed(2)}</td>
                                    <td className="py-3 pl-3 font-mono font-medium text-on-surface-variant">{support0.toLocaleString()}</td>
                                </tr>
                                {/* Class 1 */}
                                <tr className="hover:bg-surface-container-low/50 transition-colors">
                                    <td className="text-left py-3 pr-4 font-bold text-on-surface">Rainy Day</td>
                                    <td className="py-3 px-3 font-mono font-medium">{p1.toFixed(2)}</td>
                                    <td className="py-3 px-3 font-mono font-medium">{r1.toFixed(2)}</td>
                                    <td className="py-3 px-3 font-mono font-medium">{f1_1.toFixed(2)}</td>
                                    <td className="py-3 pl-3 font-mono font-medium text-on-surface-variant">{support1.toLocaleString()}</td>
                                </tr>
                                
                                {/* Spacing row like scikit-learn */}
                                <tr><td colSpan={5} className="py-2"></td></tr>

                                {/* Aggregate Metrics */}
                                <tr className="border-t-2 border-outline-variant/10 hover:bg-surface-container-low/50 transition-colors">
                                    <td className="text-left py-3 pr-4 font-bold text-on-surface-variant">Accuracy</td>
                                    <td className="py-3 px-3"></td>
                                    <td className="py-3 px-3"></td>
                                    <td className="py-3 px-3 font-mono font-bold text-primary">{accuracy.toFixed(2)}</td>
                                    <td className="py-3 pl-3 font-mono font-medium text-on-surface-variant">{total.toLocaleString()}</td>
                                </tr>
                                <tr className="hover:bg-surface-container-low/50 transition-colors">
                                    <td className="text-left py-3 pr-4 font-bold text-on-surface-variant">Macro Avg</td>
                                    <td className="py-3 px-3 font-mono font-medium">{macro_p.toFixed(2)}</td>
                                    <td className="py-3 px-3 font-mono font-medium">{macro_r.toFixed(2)}</td>
                                    <td className="py-3 px-3 font-mono font-medium">{macro_f1.toFixed(2)}</td>
                                    <td className="py-3 pl-3 font-mono font-medium text-on-surface-variant">{total.toLocaleString()}</td>
                                </tr>
                                <tr className="hover:bg-surface-container-low/50 transition-colors">
                                    <td className="text-left py-3 pr-4 font-bold text-on-surface-variant">Weighted Avg</td>
                                    <td className="py-3 px-3 font-mono font-medium">{weighted_p.toFixed(2)}</td>
                                    <td className="py-3 px-3 font-mono font-medium">{weighted_r.toFixed(2)}</td>
                                    <td className="py-3 px-3 font-mono font-medium">{weighted_f1.toFixed(2)}</td>
                                    <td className="py-3 pl-3 font-mono font-medium text-on-surface-variant">{total.toLocaleString()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

const DarkBinaryConfusionMatrix = ({ modelName, tp, tn, fp, fn, accuracy, trainTime, inferTime }: any) => {
    const total = tp + tn + fp + fn;
    const support0 = tn + fp;
    const support1 = tp + fn;

    const p0 = tn / (tn + fn) || 0;
    const r0 = tn / (tn + fp) || 0;
    const f1_0 = 2 * (p0 * r0) / (p0 + r0) || 0;

    const p1 = tp / (tp + fp) || 0;
    const r1 = tp / (tp + fn) || 0;
    const f1_1 = 2 * (p1 * r1) / (p1 + r1) || 0;

    const macro_p = (p0 + p1) / 2;
    const macro_r = (r0 + r1) / 2;
    const macro_f1 = (f1_0 + f1_1) / 2;

    return (
        <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col group overflow-hidden mt-12 relative">
            
            {/* Speed Badges */}
            <div className="absolute top-8 right-8 flex gap-3">
                <div className="px-3 py-1.5 bg-white/10 text-white/70 rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/10 flex items-center gap-2">
                    <Zap size={12} className="text-amber-400" /> Train: {trainTime.toFixed(2)}s
                </div>
                <div className="px-3 py-1.5 bg-white/10 text-white/70 rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/10 flex items-center gap-2">
                    <Activity size={12} className="text-emerald-400" /> Infer: {(inferTime * 1000).toFixed(2)}ms
                </div>
            </div>

            <div className="mb-8">
                <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Live Evaluation</div>
                <h3 className="text-xl font-bold tracking-tight text-white">{modelName}</h3>
            </div>

            <div className="flex flex-col xl:flex-row gap-12">
                {/* 2x2 Matrix Grid (Dark) */}
                <div className="w-full xl:w-[45%] shrink-0">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-4">Confusion Matrix</div>
                    <div className="relative pt-6 pl-8">
                        <div className="absolute top-0 left-8 right-0 flex text-[9px] font-bold uppercase tracking-widest text-white/40 text-center">
                            <div className="flex-1 border-b border-white/10 pb-2">Predicted Dry</div>
                            <div className="flex-1 border-b border-white/10 pb-2">Predicted Rain</div>
                        </div>
                        <div className="absolute top-6 bottom-0 left-0 w-8 flex flex-col text-[9px] font-bold uppercase tracking-widest text-white/40 text-center border-r border-white/10 pr-2">
                            <div className="flex-1 flex items-center justify-end -rotate-90">Actual Dry</div>
                            <div className="flex-1 flex items-center justify-end -rotate-90">Actual Rain</div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-2 h-full min-h-[140px]">
                            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center text-center transition-transform group-hover:scale-[1.02]">
                                <div className="text-xl font-black text-white">{tn.toLocaleString()}</div>
                            </div>
                            <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-2xl flex flex-col items-center justify-center text-center transition-transform group-hover:scale-[1.02]">
                                <div className="text-[9px] font-bold uppercase tracking-widest text-rose-400/70 mb-1">False Alarm</div>
                                <div className="text-xl font-black text-rose-400">{fp.toLocaleString()}</div>
                            </div>
                            <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-2xl flex flex-col items-center justify-center text-center transition-transform group-hover:scale-[1.02]">
                                <div className="text-[9px] font-bold uppercase tracking-widest text-rose-400/70 mb-1">Missed Rain</div>
                                <div className="text-xl font-black text-rose-400">{fn.toLocaleString()}</div>
                            </div>
                            <div className="bg-primary/20 border border-primary/30 p-4 rounded-2xl flex flex-col items-center justify-center text-center transition-transform group-hover:scale-[1.02]">
                                <div className="text-xl font-black text-primary-container">{tp.toLocaleString()}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Report Table (Dark) */}
                <div className="w-full flex-1 border-t xl:border-t-0 xl:border-l border-white/10 pt-8 xl:pt-0 xl:pl-8">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-6">Classification Report</div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-right text-sm border-collapse min-w-[400px]">
                            <thead className="text-[10px] font-black uppercase tracking-widest text-white/40 border-b border-white/10">
                                <tr>
                                    <th className="text-left pb-3 pr-4">Class</th>
                                    <th className="pb-3 px-3">Precision</th>
                                    <th className="pb-3 px-3">Recall</th>
                                    <th className="pb-3 px-3">F1-Score</th>
                                    <th className="pb-3 pl-3">Support</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-white/80">
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="text-left py-3 pr-4 font-bold text-white">Dry Day</td>
                                    <td className="py-3 px-3 font-mono">{p0.toFixed(2)}</td>
                                    <td className="py-3 px-3 font-mono">{r0.toFixed(2)}</td>
                                    <td className="py-3 px-3 font-mono">{f1_0.toFixed(2)}</td>
                                    <td className="py-3 pl-3 font-mono text-white/50">{support0.toLocaleString()}</td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="text-left py-3 pr-4 font-bold text-white">Rainy Day</td>
                                    <td className="py-3 px-3 font-mono">{p1.toFixed(2)}</td>
                                    <td className="py-3 px-3 font-mono">{r1.toFixed(2)}</td>
                                    <td className="py-3 px-3 font-mono text-primary-container font-bold">{f1_1.toFixed(2)}</td>
                                    <td className="py-3 pl-3 font-mono text-white/50">{support1.toLocaleString()}</td>
                                </tr>
                                <tr><td colSpan={5} className="py-2"></td></tr>
                                <tr className="border-t border-white/10 hover:bg-white/5 transition-colors">
                                    <td className="text-left py-3 pr-4 font-bold text-white/60">Accuracy</td>
                                    <td colSpan={2}></td>
                                    <td className="py-3 px-3 font-mono font-bold text-white">{(accuracy * 100).toFixed(2)}%</td>
                                    <td className="py-3 pl-3 font-mono text-white/50">{total.toLocaleString()}</td>
                                </tr>
                                <tr className="hover:bg-white/5 transition-colors">
                                    <td className="text-left py-3 pr-4 font-bold text-white/60">Macro Avg</td>
                                    <td className="py-3 px-3 font-mono">{macro_p.toFixed(2)}</td>
                                    <td className="py-3 px-3 font-mono">{macro_r.toFixed(2)}</td>
                                    <td className="py-3 px-3 font-mono">{macro_f1.toFixed(2)}</td>
                                    <td className="py-3 pl-3 font-mono text-white/50">{total.toLocaleString()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

const pipelineData = {
    metadata: {
        totalPipelines: 270,
        bestAccuracy: "85.45%",
        fastestTrain: "0.484s",
        fastestInfer: "0.560ms"
    },
    classes: ['No', 'Yes'], // Added this back!
    performers: [
        {
            id: 'log_reg_1.0',
            config: 'LogisticRegression (C=1.0)',
            accuracy: 0.7881515654448789,
            train_time: 4.429841756820679,
            infer_time: 2.6201486587524414,
            matrix: [21862, 5718, 1813, 6156]
        },
        {
            id: 'log_reg_10.0',
            config: 'LogisticRegression (C=10.0)',
            accuracy: 0.7879265239528538,
            train_time: 4.5472962856292725,
            infer_time: 1.8958330154418945,
            matrix: [21853, 5727, 1812, 6157]
        },
        {
            id: 'dt_10',
            config: 'DecisionTree (max_depth=10)',
            accuracy: 0.7719204478325691,
            train_time: 1.13615083694458,
            infer_time: 0.5598306655883789,
            matrix: [21475, 6105, 2003, 5966]
        },
        {
            id: 'dt_20',
            config: 'DecisionTree (max_depth=20)',
            accuracy: 0.7783622605417874,
            train_time: 1.9628126621246338,
            infer_time: 1.1192798614501953,
            matrix: [23228, 4352, 3527, 4442]
        },
        {
            id: 'rf_10',
            config: 'RandomForest (max_depth=10)',
            accuracy: 0.8090804242032125,
            train_time: 15.711721181869507,
            infer_time: 33.83138179779053,
            matrix: [22863, 4717, 2070, 5899]
        },
        {
            id: 'rf_20',
            config: 'RandomForest (max_depth=20)',
            accuracy: 0.8521758699260176,
            train_time: 26.779773235321045,
            infer_time: 78.30595970153809,
            matrix: [26119, 1461, 3794, 4175]
        },
        {
            id: 'xgb_3',
            config: 'XGBoost (max_depth=3)',
            accuracy: 0.8007257588117809,
            train_time: 0.8661305904388428,
            infer_time: 4.467463493347168,
            matrix: [22221, 5359, 1725, 6244]
        },
        {
            id: 'xgb_7',
            config: 'XGBoost (max_depth=7)',
            accuracy: 0.8203887591774733,
            train_time: 1.6982417106628418,
            infer_time: 8.76929759979248,
            matrix: [23143, 4437, 1948, 6021]
        }
    ]
};

const customPipelineCode = `import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer, KNNImputer
from sklearn.preprocessing import OrdinalEncoder, FunctionTransformer
from sklearn.experimental import enable_iterative_imputer
from sklearn.impute import IterativeImputer
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

target_encoder = LabelEncoder()

y_train_clean = target_encoder.fit_transform(y_train)
y_test_clean = target_encoder.transform(y_test)

drop_cols = ['Sunshine', 'Pressure9am', 'Temp9am', 'Temp3pm']
median_cols = ['MinTemp', 'MaxTemp', 'Rainfall', 'WindSpeed9am', 'WindSpeed3pm', 'Humidity9am', 'Humidity3pm']
knn_cols = ['Evaporation', 'WindGustSpeed', 'Pressure3pm', 'Cloud9am', 'Cloud3pm']
wind_cols = ['WindGustDir', 'WindDir9am', 'WindDir3pm']
location_cols = ['Location']
binary_cols = ['RainToday']

def extract_month(X):
    return pd.to_datetime(X['Date']).dt.month.to_frame(name='Month')

month_transformer = FunctionTransformer(extract_month, validate=False)

wind_pipeline = Pipeline(steps=[
    ('encode', OrdinalEncoder(encoded_missing_value=np.nan)),
    ('missforest', IterativeImputer(
        estimator=RandomForestClassifier(n_estimators=50, random_state=42),
        initial_strategy='most_frequent',
        max_iter=10
    ))
])

binary_pipeline = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('encoder', OrdinalEncoder())
])

preprocessor = ColumnTransformer(transformers=[
    ('drop', 'drop', drop_cols),
    ('date', month_transformer, ['Date']),
    # Numerical
    ('median', SimpleImputer(strategy='median'), median_cols),
    ('knn', KNNImputer(n_neighbors=5), knn_cols),
    # Categorical
    ('wind', wind_pipeline, wind_cols),
    ('binary', binary_pipeline, binary_cols),
    ('location', OrdinalEncoder(), location_cols)
])

X_train_li = preprocessor.fit_transform(X_train)
X_test_li = preprocessor.transform(X_test)`;

const customTraditionalMLCode = `import time
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier

log_reg = LogisticRegression(
    max_iter=5000,
    class_weight='balanced',
    random_state=42,
    C = 10.0
)

start_time = time.time()

log_reg.fit(X_train_li, y_train_clean)

training_time = time.time() - start_time

start_time = time.time()

y_test_pred = log_reg.predict(X_test_li)

inference_time = time.time() - start_time

tn, fp, fn, tp = confusion_matrix(y_test_clean, y_test_pred).ravel()

print("--- Logistic Regression Baseline ---")
print(f"Training Time: {training_time} seconds")
print(f"Inference Time: {inference_time*100} miliseconds")
print(f"Accuracy: {accuracy_score(y_test_clean, y_test_pred)}")
print(confusion_matrix(y_test_clean, y_test_pred))
print(classification_report(y_test_clean, y_test_pred, target_names=['No Rain (0)', 'Rain (1)']))

#---------------------------------------------------------------------------------------------------

tree_models = {
    "Decision Tree": DecisionTreeClassifier(class_weight='balanced', random_state=42, max_depth=20),
    "Random Forest": RandomForestClassifier(class_weight='balanced', random_state=42, n_jobs=-1, max_depth=20),
    "XGBoost":       XGBClassifier(scale_pos_weight=3.46, random_state=42, n_jobs=-1, max_depth=7)
}

print("\nTraining models...")
for name, model in tree_models.items():
    print(f"\n==========================================")
    print(f"--- {name} ---")
    start_time = time.time()

    model.fit(X_train_tr, y_train_clean)

    training_time = time.time() - start_time

    start_time = time.time()

    y_test_pred = model.predict(X_test_tr)

    inference_time = time.time() - start_time

    tn, fp, fn, tp = confusion_matrix(y_test_clean, y_test_pred).ravel()

    print(f"Training Time: {training_time} seconds")
    print(f"Inference Time: {inference_time*100} miliseconds")
    print(f"Accuracy: {accuracy_score(y_test_clean, y_test_pred)}")
    print(confusion_matrix(y_test_clean, y_test_pred))
    print(classification_report(y_test_clean, y_test_pred, target_names=['No Rain (0)', 'Rain (1)']))`;

const customTuneCode = `import numpy as np
from sklearn.model_selection import GridSearchCV, PredefinedSplit, StratifiedKFold
from sklearn.metrics import accuracy_score, f1_score, roc_auc_score, classification_report, roc_curve, auc, confusion_matrix
from plotly.subplots import make_subplots
import time
import json
from sklearn.base import clone
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier

def tune_and_evaluate_plotly(model, param_grid, X_train, y_train, X_test, y_test):
    print("Starting Hyperparameter Tuning...")
    grid_search = GridSearchCV(
        estimator=model,
        param_grid=param_grid,
        scoring='f1',
        cv=StratifiedKFold(n_splits=8, shuffle=True, random_state=42),
        n_jobs=1
    )

    # Fit the search
    grid_search.fit(X_train, y_train)

    # Extract winners
    best_model = grid_search.best_estimator_
    best_param = grid_search.best_params_

    print(f"\nBest Parameters Found: {best_param}\n")

    y_pred = best_model.predict(X_test)
    prob = best_model.predict_proba(X_test)[:, 1]

    # Compute metrics
    accuracy = accuracy_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred) # Focuses specifically on the minority class
    roc_auc = roc_auc_score(y_test, prob)

    print('--- Test Set Performance ---')
    print(f'Accuracy:  {accuracy:.4f}')
    print(f'F1 Score:  {f1:.4f}')
    print(f'AUC(ROC):  {roc_auc:.4f}\n')
    print("Classification Report: ")
    print(classification_report(y_test, y_pred, target_names=['No Rain (0)', 'Rain (1)']))

    # Calculate ROC curve data
    fper, tper, _ = roc_curve(y_test, prob)
    auc_scr = auc(fper, tper)

    # Calculate Confusion Matrix
    cm = confusion_matrix(y_test, y_pred)
    cm_text = [[str(y) for y in x] for x in cm]

    return best_model, accuracy, f1, roc_auc, best_param, grid_search

#-------------------------------------------------------------------------------

dt_param_grid = {
    'criterion': ['gini', 'entropy'],
    'splitter': ['best'],
    'max_depth': [None, 10, 20, 30, 40, 50],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4]
}

model_dt = DecisionTreeClassifier(class_weight='balanced', random_state=42)

time_start = time.time()
model_dt, acc_dt, f1_dt, roc_auc_dt, param_dt = tune_and_evaluate_plotly(model_dt, dt_param_grid, X_train_tr, y_train_clean, X_test_tr, y_test_clean)
time_taken_dt = time.time() - time_start
print('Best Parameters: ', param_dt)
print("Time Taken: ", round(time_taken_dt, 2), ' Seconds')

#-------------------------------------------------------------------------------

rf_param_grid = {
    'n_estimators': [100, 200, 300],
    'max_depth': [None, 10, 20, 30],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4],
}

model_rf = RandomForestClassifier(class_weight='balanced', random_state=42, n_jobs=-1)

time_start = time.time()
model_rf, acc_rf, f1_rf, roc_auc_rf, param_rf = tune_and_evaluate_plotly(model_rf, rf_param_grid, X_train_tr, y_train_clean, X_test_tr, y_test_clean)
time_taken_rf = time.time() - time_start
print('Best Parameters: ', param_rf)
print("Time Taken: ", round(time_taken_rf, 2), ' Seconds')

#-------------------------------------------------------------------------------

xgb_param_grid = {
    'n_estimators': [100, 200, 300],
    'learning_rate': [0.01, 0.05, 0.1],
    'max_depth': [3, 5, 7],
    'subsample': [0.8, 1.0],
}

model_xgb = XGBClassifier(scale_pos_weight=3.46, random_state=42, n_jobs=-1)

time_start = time.time()
model_xgb, acc_xgb, f1_xgb, roc_auc_xgb, param_xgb, grid_search = tune_and_evaluate_plotly(model_xgb, xgb_param_grid, X_train_tr, y_train_clean, X_test_tr, y_test_clean)
time_taken_xgb = time.time() - time_start
print('Best Parameters: ', param_xgb)
print("Time Taken: ", round(time_taken_xgb, 2), ' Seconds')

#-------------------------------------------------------------------------------

performers = []

for params in grid_search.cv_results_['params']:
    model = clone(grid_search.estimator)
    model.set_params(**params)

    start_train = time.time()
    model.fit(X_train_tr, y_train_clean)
    train_time = time.time() - start_train

    start_infer = time.time()
    y_pred = model.predict(X_test_tr)
    infer_time = time.time() - start_infer

    acc = accuracy_score(y_test_clean, y_pred)
    tn, fp, fn, tp = confusion_matrix(y_test_clean, y_pred).ravel()

    # Extracts the parameter name (e.g., 'classifier__max_depth' -> 'max_depth=10')
    param_strings = [f"{k.split('__')[-1]}={v}" for k, v in params.items()]
    config_name = ", ".join(param_strings)

    model_id = "_".join([f"{k.split('__')[-1]}_{v}" for k, v in params.items()])

    performers.append({
        "id": model_id.replace(".", "_"),
        "config": config_name,
        "accuracy": float(acc),
        "train_time": float(train_time),
        "infer_time": float(infer_time),
        "matrix": [int(tn), int(fp), int(fn), int(tp)]
    })

pipelineData = {
    "performers": performers
}

print(json.dumps(pipelineData, indent=4))`;

// --- Modern Academic UI Components (Your Style Preserved Exactly) ---

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

const InteractiveAnalysis = ({ id, title, subtitle, icon: Icon, pythonCode, plots = [], matrices = [], children, defaultOpen = false }: any) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [showCode, setShowCode] = useState(false);
    
    // Auto-select the first tab based on whether we have plots or matrices
    const initialTab = plots.length > 0 ? plots[0].label : (matrices.length > 0 ? matrices[0].label : "All");
    const [activeTab, setActiveTab] = useState(initialTab);

    const handleCopy = () => navigator.clipboard.writeText(pythonCode);

    // Filter logic
    const plotsToRender = activeTab === "All" ? plots : plots.filter((p: any) => p.label === activeTab);
    const matricesToRender = activeTab === "All" ? matrices : matrices.filter((m: any) => m.label === activeTab);
    
    // Combine all labels for the filter buttons
    const allLabels = [...plots.map((p: any) => p.label), ...matrices.map((m: any) => m.label)];

    return (
        <section className="py-2 mb-8 scroll-mt-24" id={id}>
            <div className="bg-white rounded-[2rem] border border-outline-variant/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden transition-all hover:shadow-[0_15px_60px_rgb(0,0,0,0.08)]">
                
                {/* Header Button */}
                <button onClick={() => setIsOpen(!isOpen)} className="w-full flex flex-col md:flex-row justify-between items-start md:items-center py-5 px-8 hover:bg-surface-container-low transition-colors group cursor-pointer text-left focus:outline-none">
                    <div className="flex items-center gap-6">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${isOpen ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-surface-container-high text-primary group-hover:bg-primary/5 shadow-sm"}`}>
                            <Icon size={22} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight text-on-surface">{title}</h2>
                            {subtitle && <p className="text-on-surface-variant text-[11px] font-medium opacity-60 italic">{subtitle}</p>}
                        </div>
                    </div>
                    <div className={`flex items-center text-on-surface-variant/40 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}>
                        <ChevronDown size={28} />
                    </div>
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                            <div className="pt-2 pb-16 px-10 border-t border-outline-variant/5">
                                
                                {/* Python Code Toggle */}
                                {pythonCode && (
                                    <div className="flex justify-end mb-10">
                                        <button onClick={(e) => { e.stopPropagation(); setShowCode(!showCode); }} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs tracking-tight transition-all cursor-pointer border ${showCode ? "bg-on-surface text-white border-on-surface" : "bg-white text-on-surface-variant border-outline-variant/20 hover:bg-surface-container"}`}>
                                            <BookOpen size={16} />
                                            {showCode ? "Hide Tutorial" : "View Tutorial"}
                                        </button>
                                    </div>
                                )}

                                {/* Python Code Block */}
                                <AnimatePresence>
                                    {showCode && pythonCode && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-12">
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
                                                <button onClick={handleCopy} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors cursor-pointer bg-white/5 p-2 rounded-lg" title="Copy Code">
                                                    <Copy size={16} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="flex flex-col gap-10">
                                    {children && <div className="w-full">{children}</div>}

                                    {/* Tabs / Filters */}
                                    {allLabels.length > 1 && (
                                        <div className="flex flex-col sm:flex-row items-baseline sm:items-center gap-6 bg-surface-container-low/50 p-4 rounded-2xl border border-outline-variant/10 w-fit">
                                            <div className="flex items-center gap-2 border-r border-outline-variant/10 pr-6">
                                                <Filter size={16} className="text-primary" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Views</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {allLabels.map((label: string) => (
                                                    <button
                                                        key={label}
                                                        onClick={() => setActiveTab(label)}
                                                        className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer border ${activeTab === label ? "bg-primary text-on-primary border-primary shadow-md" : "bg-white text-on-surface-variant border-outline-variant/10 hover:border-primary/50"}`}
                                                    >
                                                        {label}
                                                    </button>
                                                ))}
                                                <button
                                                    onClick={() => setActiveTab("All")}
                                                    className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer border ${activeTab === "All" ? "bg-on-surface text-white border-on-surface shadow-md" : "bg-white text-on-surface border-outline-variant/10 hover:border-on-surface/50"}`}
                                                >
                                                    Compare All
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Render Plotly Charts (if any) */}
                                    {plotsToRender.length > 0 && (
                                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                                            {plotsToRender.map((plot: any, idx: number) => (
                                                <motion.div key={plot.label || idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-3xl p-8 border border-outline-variant/10 shadow-sm relative group overflow-hidden">
                                                    <div className="flex justify-between items-center mb-8 pb-4 border-b border-outline-variant/5">
                                                        <div className="flex items-center gap-3">
                                                            <BarChart size={18} className="text-primary" />
                                                            <h4 className="text-sm font-bold text-on-surface uppercase tracking-tight">{plot.label}</h4>
                                                        </div>
                                                        {plot.badge && <span className="px-3 py-1 bg-primary/5 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/10">{plot.badge}</span>}
                                                    </div>
                                                    <div className="w-full flex items-center justify-center min-h-[400px]">
                                                        <Plot data={plot.data} layout={{ ...plot.layout, paper_bgcolor: "rgba(0,0,0,0)", plot_bgcolor: "rgba(0,0,0,0)", font: { family: "Inter, sans-serif", size: 12 }, margin: { t: 20, r: 20, b: 60, l: 80 }, autosize: true, responsive: true }} useResizeHandler={true} style={{ width: "100%", height: "400px" }} config={{ responsive: true, displayModeBar: false }} />
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Render Custom Binary Confusion Matrices (if any) */}
                                    {matricesToRender.length > 0 && (
                                        <div className="flex flex-col gap-10">
                                            {matricesToRender.map((matrix: any, idx: number) => (
                                                <motion.div key={matrix.label || idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                                    {matrix.component}
                                                </motion.div>
                                            ))}
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

export default function TabularPipeline({ onBack, isEmbedded = false }: { onBack: () => void, isEmbedded?: boolean }) {
    const [activeNav, setActiveNav] = useState("overview");
    const [activeModel, setActiveModel] = useState("DT");
    
    // DT State
    const [criterion, setCriterion] = useState("gini");
    const [maxDepth, setMaxDepth] = useState("None");
    const [minLeaf, setMinLeaf] = useState("1");
    const [minSplit, setMinSplit] = useState("2");

    // RF State
    const [rfNEstimators, setRfNEstimators] = useState("100");
    const [rfMaxDepth, setRfMaxDepth] = useState("None");
    const [rfMinSplit, setRfMinSplit] = useState("2");
    const [rfMinLeaf, setRfMinLeaf] = useState("1");

    // XGB State
    const [learningRate, setLearningRate] = useState("0.05");
    const [nEstimators, setNEstimators] = useState("100");
    const [xgbMaxDepth, setXgbMaxDepth] = useState("3");
    const [subsample, setSubsample] = useState("0.8");

    useEffect(() => {
        // Reset scroll position to top whenever component mounts
        if (!isEmbedded) window.scrollTo(0, 0);

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
    }, [isEmbedded]);

    const tocItems = [
        { id: "overview", label: "Overview" },
        { id: "architecture", label: "Pipeline Architecture" },
        { id: "traditional", label: "Traditional ML" },
        { id: "tuning", label: "Fine-tuning Performance" },
        { id: "simulation", label: "Hyperparameter Simulation" },
    ];

    return (
        <div className={`${isEmbedded ? "" : "min-h-screen"} relative bg-[#f8fafb] selection:bg-primary/20 text-on-surface font-sans antialiased`}>
            <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f3f5; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #00685f; border-radius: 10px; border: 2.5px solid #f1f3f5; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #004d46; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

            {/* Back Button */}
            {!isEmbedded && (
                <div className="fixed top-24 left-8 z-50">
                    <button
                        onClick={onBack}
                        className="bg-white p-4 rounded-2xl border border-outline-variant/10 shadow-2xl hover:bg-primary hover:text-white transition-all group cursor-pointer active:scale-90"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                </div>
            )}


            <main className={`${isEmbedded ? "" : "pt-8"} flex max-w-[1440px] mx-auto px-4 lg:px-8`}>
                {/* Sticky Table of Contents Sidebar */}
                {!isEmbedded && (
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
                )}

                <div className="flex-1 min-w-0">
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
                                        Machine Learning For Data Analysis
                                    </div>
                                    <h1 className="text-6xl md:text-7xl font-extrabold mb-8 tracking-tighter leading-[1] text-on-surface">
                                        Rain in Australia <br />
                                        <span className="text-primary italic font-serif opacity-90">A Descriptive Report.</span>
                                    </h1>
                                    <p className="text-lg text-on-surface-variant leading-relaxed max-w-2xl font-medium mb-12 opacity-80">
                                        Preprocessed the dataset based on key insights from the EDA, and optimized hyperparameters for tree-based Machine Learning Models specifically to reduce the rate of missed rain days.
                                    </p>
                                    <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                        <div className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-low rounded-xl border border-outline-variant/10 text-[10px] font-black uppercase tracking-widest">
                                            <Database size={14} className="text-primary" />
                                            4 Machine Learning Models
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
                                                    { label: "Class Weight", val: "78% No / 22% Yes" },
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
                                <StatCard label="Configurations" value={pipelineData.metadata.totalPipelines} icon={Layers} />
                                <StatCard label="Best Accuracy" value={pipelineData.metadata.bestAccuracy} variant="primary" icon={Target} />
                                <StatCard label="Fastest Training" value={pipelineData.metadata.fastestTrain} icon={Zap} />
                                <StatCard label="Fastest Inference" value={pipelineData.metadata.fastestInfer} icon={Activity} />
                            </div>
                        </div>
                    </section>

                    <div className="max-w-[1240px] mx-auto">
                        
                        <InteractiveAnalysis
                            id="architecture"
                            title="Pipeline Architecture"
                            subtitle="Custom ColumnTransformer pipeline mapping data types to specific preprocessing strategies"
                            icon={Network}
                            pythonCode={customPipelineCode}
                            defaultOpen={true}
                        >
                            <div className="flex flex-col items-center py-6 w-full max-w-5xl mx-auto">
                                {/* Input Node */}
                                <div className="bg-surface-container-low border-2 border-outline-variant/20 rounded-[2rem] p-6 text-center min-w-[220px] mb-4 relative group hover:border-primary transition-colors shadow-sm">
                                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📊</div>
                                    <div className="font-bold text-on-surface text-lg">Raw Tabular Input</div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 mt-1">22 Mixed Features + Target</div>
                                </div>

                                <div className="w-0.5 h-6 bg-primary/20"></div>

                                {/* Parallel Processing Node (ColumnTransformer + Target) */}
                                <div className="w-full bg-primary/[0.03] border border-primary/20 rounded-[3rem] p-8 md:p-10 relative shadow-inner">
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white px-6 py-2 border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-primary shadow-sm flex items-center gap-2 whitespace-nowrap">
                                        <Columns size={14} /> Base Preprocessing (Parallel)
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-4">
                                        
                                        {/* Target Branch */}
                                        <div className="bg-white p-5 rounded-2xl border-2 border-secondary/30 shadow-sm flex flex-col hover:border-secondary transition-colors group relative overflow-hidden">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-secondary mb-3 pb-2 border-b border-outline-variant/10 flex justify-between relative z-10">
                                                <span>Target (y)</span> <span className="bg-secondary/10 px-2 rounded-full">1</span>
                                            </div>
                                            <div className="text-xs text-on-surface-variant font-medium space-y-2 mb-4 relative z-10">
                                                <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary/40"/> LabelEncoder</div>
                                            </div>
                                            <div className="mt-auto pt-3 border-t border-outline-variant/5 text-[9.5px] text-on-surface-variant/80 font-mono font-semibold break-words">
                                                ['RainTomorrow']
                                            </div>
                                        </div>

                                        {/* Date Branch */}
                                        <div className="bg-white p-5 rounded-2xl border border-outline-variant/10 shadow-sm flex flex-col hover:border-primary/30 transition-colors group">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-3 pb-2 border-b border-outline-variant/10 flex justify-between">
                                                <span>Date</span> <span className="bg-primary/10 px-2 rounded-full">1</span>
                                            </div>
                                            <div className="text-xs text-on-surface-variant font-medium space-y-2 mb-4">
                                                <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary/40"/> Extract Month</div>
                                            </div>
                                            <div className="mt-auto pt-3 border-t border-outline-variant/5 text-[9.5px] text-on-surface-variant/80 font-mono font-semibold break-words">
                                                ['Date']
                                            </div>
                                        </div>

                                        {/* Median Num Branch */}
                                        <div className="bg-white p-5 rounded-2xl border border-outline-variant/10 shadow-sm flex flex-col hover:border-primary/30 transition-colors group">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-3 pb-2 border-b border-outline-variant/10 flex justify-between">
                                                <span>Median Num</span> <span className="bg-primary/10 px-2 rounded-full">7</span>
                                            </div>
                                            <div className="text-xs text-on-surface-variant font-medium space-y-2 mb-4">
                                                <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary/40"/> SimpleImpute (median)</div>
                                            </div>
                                            <div className="mt-auto pt-3 border-t border-outline-variant/5 text-[9.5px] text-on-surface-variant/80 font-mono font-semibold break-words">
                                                ['MinTemp', 'MaxTemp', 'Rainfall', 'WindSpeed9am', 'WindSpeed3pm', 'Humidity9am', 'Humidity3pm']
                                            </div>
                                        </div>

                                        {/* KNN Num Branch */}
                                        <div className="bg-white p-5 rounded-2xl border border-outline-variant/10 shadow-sm flex flex-col hover:border-primary/30 transition-colors group">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-3 pb-2 border-b border-outline-variant/10 flex justify-between">
                                                <span>KNN Num</span> <span className="bg-primary/10 px-2 rounded-full">5</span>
                                            </div>
                                            <div className="text-xs text-on-surface-variant font-medium space-y-2 mb-4">
                                                <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary/40"/> KNNImputer (k=5)</div>
                                            </div>
                                            <div className="mt-auto pt-3 border-t border-outline-variant/5 text-[9.5px] text-on-surface-variant/80 font-mono font-semibold break-words">
                                                ['Evaporation', 'WindGustSpeed', 'Pressure3pm', 'Cloud9am', 'Cloud3pm']
                                            </div>
                                        </div>

                                        {/* Wind Cat Branch */}
                                        <div className="bg-white p-5 rounded-2xl border border-outline-variant/10 shadow-sm flex flex-col hover:border-primary/30 transition-colors group">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-3 pb-2 border-b border-outline-variant/10 flex justify-between">
                                                <span>Wind Cat</span> <span className="bg-primary/10 px-2 rounded-full">3</span>
                                            </div>
                                            <div className="text-xs text-on-surface-variant font-medium space-y-2 mb-4">
                                                <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary/40"/> OrdinalEncoder</div>
                                                <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary/40"/> MissForest (Iterative)</div>
                                            </div>
                                            <div className="mt-auto pt-3 border-t border-outline-variant/5 text-[9.5px] text-on-surface-variant/80 font-mono font-semibold break-words">
                                                ['WindGustDir', 'WindDir9am', 'WindDir3pm']
                                            </div>
                                        </div>

                                        {/* Binary Branch */}
                                        <div className="bg-white p-5 rounded-2xl border border-outline-variant/10 shadow-sm flex flex-col hover:border-primary/30 transition-colors group">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-3 pb-2 border-b border-outline-variant/10 flex justify-between">
                                                <span>Binary Cat</span> <span className="bg-primary/10 px-2 rounded-full">1</span>
                                            </div>
                                            <div className="text-xs text-on-surface-variant font-medium space-y-2 mb-4">
                                                <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary/40"/> SimpleImpute (mode)</div>
                                                <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary/40"/> OrdinalEncoder</div>
                                            </div>
                                            <div className="mt-auto pt-3 border-t border-outline-variant/5 text-[9.5px] text-on-surface-variant/80 font-mono font-semibold break-words">
                                                ['RainToday']
                                            </div>
                                        </div>

                                        {/* Location Branch */}
                                        <div className="bg-white p-5 rounded-2xl border border-outline-variant/10 shadow-sm flex flex-col hover:border-primary/30 transition-colors group">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-3 pb-2 border-b border-outline-variant/10 flex justify-between">
                                                <span>Location Cat</span> <span className="bg-primary/10 px-2 rounded-full">1</span>
                                            </div>
                                            <div className="text-xs text-on-surface-variant font-medium space-y-2 mb-4">
                                                <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary/40"/> OrdinalEncoder</div>
                                            </div>
                                            <div className="mt-auto pt-3 border-t border-outline-variant/5 text-[9.5px] text-on-surface-variant/80 font-mono font-semibold break-words">
                                                [Location]
                                            </div>
                                        </div>

                                        {/* Drop Branch */}
                                        <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/10 flex flex-col opacity-60">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-error mb-3 pb-2 border-b border-outline-variant/5 flex justify-between">
                                                <span>Dropped Features</span> <span className="bg-error/10 px-2 rounded-full">4</span>
                                            </div>
                                            <div className="text-xs text-on-surface-variant font-medium leading-relaxed mb-4">
                                                Sunshine, Pressure9am, Temp9am, Temp3pm
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-0.5 h-8 bg-primary/20"></div>

                                {/* Global Transformations Node */}
                                <div className="bg-amber-500/5 border-2 border-amber-500/20 rounded-[2rem] p-8 text-center min-w-[280px] max-w-2xl mb-4 relative group hover:border-amber-500 transition-colors shadow-sm">
                                    <div className="text-4xl mb-4 group-hover:rotate-180 transition-transform duration-700">🔄</div>
                                    <div className="font-bold text-amber-700 text-lg">Transformation: OneHotEncoder & StandardScaler</div>
                                    
                                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6 mb-4">
                                        <div className="px-4 py-2 bg-amber-500/10 rounded-xl border border-amber-500/20 text-xs font-semibold text-amber-800">
                                            <span className="font-black">OHE:</span> All Categorical cols except RainToday
                                        </div>
                                        <div className="px-4 py-2 bg-amber-500/10 rounded-xl border border-amber-500/20 text-xs font-semibold text-amber-800">
                                            <span className="font-black">Scaler:</span> All Numerical cols
                                        </div>
                                    </div>

                                    <div className="mt-4 p-3 bg-white/50 border border-amber-500/10 rounded-xl text-[11px] font-bold text-amber-800/80 flex items-center justify-center gap-2">
                                        <AlertTriangle size={14} /> Note: If we run tree-based models (RF, XGBoost), we do not need this step.
                                    </div>
                                </div>

                                <div className="w-0.5 h-8 bg-primary/20"></div>

                                {/* Classifier Node */}
                                <div className="bg-secondary/10 border-2 border-secondary/20 rounded-[2rem] p-6 text-center min-w-[220px] mb-4 relative group hover:border-secondary transition-colors shadow-sm">
                                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🧠</div>
                                    <div className="font-bold text-secondary text-lg">Classifier Selection</div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-secondary/60 mt-1">e.g., Random Forest, SVM, LR</div>
                                </div>

                                <div className="w-0.5 h-8 bg-primary/20"></div>

                                {/* Results Node */}
                                <div className="bg-surface-container-low border-2 border-outline-variant/20 rounded-[2rem] p-6 text-center min-w-[220px] relative group hover:border-primary transition-colors">
                                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🎯</div>
                                    <div className="font-bold text-on-surface text-lg">Prediction Output</div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 mt-1">RainTomorrow (Yes/No)</div>
                                </div>
                            </div>
                            {/* Missing Transform Section */}
                            <div className="mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-error/10 text-error flex items-center justify-center">
                                    <SearchX size={16} />
                                </div>
                                <h3 className="text-xl font-bold text-on-surface">Missing Value Strategies</h3>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-16">
                                {[
                                    { 
                                        name: "Simple Imputation (Median)", 
                                        title: "Fills missing numerical values with the middle value. Highly robust against extreme outliers.",
                                        config: "Numerical", 
                                        desc: ["Columns=median_cols", "Strategy=Median", "Speed=Very Fast"],
                                        link: "https://scikit-learn.org/stable/modules/generated/sklearn.impute.SimpleImputer.html"
                                    },
                                    { 
                                        name: "Simple Imputation (Mode)", 
                                        title: "Fills missing categorical values with the most frequently occurring value in that specific column.",
                                        config: "Categorical", 
                                        desc: ["Columns=binary_cols", "Strategy=Most_Frequent", "Speed=Very Fast"],
                                        link: "https://scikit-learn.org/stable/modules/generated/sklearn.impute.SimpleImputer.html"
                                    },
                                    { 
                                        name: "KNN Imputation", 
                                        title: "Finds the k (k=5) most similar rows in the dataset and averages their values. Accurate but computationally heavy.",
                                        config: "Advanced Num", 
                                        desc: ["Columns=knn_cols", "Neighbors=5", "Speed=Slow"],
                                        link: "https://scikit-learn.org/stable/modules/generated/sklearn.impute.KNNImputer.html"
                                    },
                                    { 
                                        name: "Iterative Imputer (MissForest)", 
                                        title: "Builds a mini Random Forest to predict missing values. Excellently handles complex non-linear relationships.",
                                        config: "Advanced Cat", 
                                        desc: ["Columns=wind_cols", "Estimator=RandomForest", "Speed=Very Slow"],
                                        link: "https://scikit-learn.org/stable/modules/generated/sklearn.impute.IterativeImputer.html"
                                    }
                                ].map((model) => (
                                    <div key={model.name} className="bg-white p-8 rounded-2xl border border-outline-variant/10 shadow-sm relative group hover:shadow-xl transition-all border-l-4 border-l-error flex flex-col">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="text-on-surface font-bold text-lg tracking-tight">{model.name}</div>
                                            <Settings size={18} className="text-outline-variant group-hover:text-error transition-colors" />
                                        </div>
                                        <div className="text-xs font-medium text-on-surface-variant/80 mb-5 leading-relaxed min-h-[36px]">
                                            {model.title}
                                        </div>
                                        <div className="mb-6">
                                            <span className="px-2.5 py-1 bg-error/5 text-error text-[9px] font-black uppercase tracking-widest rounded-md border border-error/10">
                                                {model.config}
                                            </span>
                                        </div>
                                        <div className="space-y-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-auto pt-4 border-t border-outline-variant/5">
                                            {model.desc.map((param, i) => {
                                                const splitIndex = param.indexOf('=');
                                                const key = splitIndex !== -1 ? param.substring(0, splitIndex) : param;
                                                const value = splitIndex !== -1 ? param.substring(splitIndex + 1) : '';
                                                return (
                                                    <div key={i} className="flex justify-between items-start gap-4 border-b border-outline-variant/5 pb-2 last:border-0 last:pb-0">
                                                        <span className="opacity-70 truncate">{key}</span> 
                                                        <span className="text-on-surface font-black italic text-right break-all">{value}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="mt-6 pt-4 border-t border-outline-variant/5 flex justify-end">
                                            <a href={model.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[10px] font-black text-error hover:opacity-70 transition-opacity uppercase tracking-[0.2em]">
                                                View Docs <ArrowRight size={12} />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Feature Transforms Section */}
                            <div className="mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                                    <Wand2 size={16} />
                                </div>
                                <h3 className="text-xl font-bold text-on-surface">Data Formatting & Scaling</h3>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                                {[
                                    { 
                                        name: "Log Transform", 
                                        title: "Applies a mathematical logarithm (np.log1p) to compress highly right-skewed data, bringing it closer to a normal distribution.",
                                        config: "Distribution", 
                                        desc: ["Columns=['Rainfall']", "Function=np.log1p"],
                                        link: "https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.FunctionTransformer.html"
                                    },
                                    { 
                                        name: "LabelEncoder", 
                                        title: "Converts the target target labels (Yes/No) into machine-readable binary format (1/0). Applied outside the main pipeline.",
                                        config: "Target (y)", 
                                        desc: ["Columns=['RainTomorrow']", "Classes=[0, 1]"],
                                        link: "https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.LabelEncoder.html"
                                    },
                                    { 
                                        name: "OrdinalEncoder", 
                                        title: "Converts text categories into sequential integers. Best for ordinal data or native tree-based models.",
                                        config: "Categorical", 
                                        desc: ["Columns=wind, location, binary", "Output=Integers"],
                                        link: "https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.OrdinalEncoder.html"
                                    },
                                    { 
                                        name: "OneHotEncoder", 
                                        title: "Creates separate binary columns for each category. Essential for linear models to avoid mathematical false hierarchies. Required for distance-based models (LogReg).",
                                        config: "Categorical", 
                                        desc: ["Columns=All Categorical", "Output=Binary Matrix"],
                                        link: "https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.OneHotEncoder.html"
                                    },
                                    { 
                                        name: "StandardScaler", 
                                        title: "Standardizes features by removing the mean and scaling to unit variance. Required for distance-based models (LogReg).",
                                        config: "Numerical", 
                                        desc: ["Columns=All Numerical"],
                                        link: "https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.StandardScaler.html"
                                    }
                                ].map((model) => (
                                    <div key={model.name} className="bg-white p-8 rounded-2xl border border-outline-variant/10 shadow-sm relative group hover:shadow-xl transition-all border-l-4 border-l-primary flex flex-col">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="text-on-surface font-bold text-lg tracking-tight">{model.name}</div>
                                            <Settings size={18} className="text-outline-variant group-hover:text-primary transition-colors" />
                                        </div>
                                        <div className="text-xs font-medium text-on-surface-variant/80 mb-5 leading-relaxed min-h-[36px]">
                                            {model.title}
                                        </div>
                                        <div className="mb-6">
                                            <span className="px-2.5 py-1 bg-primary/5 text-primary text-[9px] font-black uppercase tracking-widest rounded-md border border-primary/10">
                                                {model.config}
                                            </span>
                                        </div>
                                        <div className="space-y-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-auto pt-4 border-t border-outline-variant/5">
                                            {model.desc.map((param, i) => {
                                                const splitIndex = param.indexOf('=');
                                                const key = splitIndex !== -1 ? param.substring(0, splitIndex) : param;
                                                const value = splitIndex !== -1 ? param.substring(splitIndex + 1) : '';
                                                return (
                                                    <div key={i} className="flex justify-between items-start gap-4 border-b border-outline-variant/5 pb-2 last:border-0 last:pb-0">
                                                        <span className="opacity-70 truncate">{key}</span> 
                                                        <span className="text-on-surface font-black italic text-right break-all">{value}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="mt-6 pt-4 border-t border-outline-variant/5 flex justify-end">
                                            <a href={model.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[10px] font-black text-primary hover:opacity-70 transition-opacity uppercase tracking-[0.2em]">
                                                View Docs <ArrowRight size={12} />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </InteractiveAnalysis>

                        <InteractiveAnalysis
                            id="traditional"
                            title="Traditional ML Performers"
                            subtitle="Comparing the some ML config pipelines across Accuracy, Training Time, and Inference Time"
                            icon={Database}
                            pythonCode={customTraditionalMLCode}
                            defaultOpen={true}
                            matrices={pipelineData.performers.map((model) => ({
                                label: model.config, // e.g., "Logistic Regression"
                                component: (
                                    <BinaryConfusionMatrix 
                                        modelName={model.config}
                                        tn={model.matrix[0]}
                                        fp={model.matrix[1]}
                                        fn={model.matrix[2]}
                                        tp={model.matrix[3]}
                                    />
                                )
                            }))}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-16">
                                {[
                                    { 
                                        name: "LogisticRegression", 
                                        title: "Linear model with sigmoid activation. Simple, interpretable, good baseline.",
                                        config: "2 configs", 
                                        desc: ["C=[1.0, 10.0]", "max_iter=5000", "class_weight='balanced'", "random_state=42"],
                                        link: "https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression"
                                    },
                                    { 
                                        name: "DecisionTree", 
                                        title: "Non-parametric model that builds a tree of rules. Highly interpretable but prone to overfitting.",
                                        config: "2 configs", 
                                        desc: ["max_depth=[10, 20]", "class_weight='balanced'", "random_state=42"],
                                        link: "https://scikit-learn.org/stable/modules/tree.html"
                                    },
                                    { 
                                        name: "RandomForest", 
                                        title: "Ensemble of decision trees. Robust, handles non-linearity, reduces overfitting.",
                                        config: "2 configs", 
                                        desc: ["max_depth=[10, 20]", "class_weight='balanced'", "random_state=42"],
                                        link: "https://scikit-learn.org/stable/modules/ensemble.html#random-forests"
                                    },
                                    { 
                                        name: "XGBoost", 
                                        title: "Gradient boosting algorithm. Often wins ML competitions. High performance.",
                                        config: "2 configs", 
                                        desc: ["max_depth=[3, 7]", "scale_pos_weight=3.46", "random_state=42"],
                                        link: "https://xgboost.readthedocs.io/en/release_3.2.0/"
                                    }
                                ].map((model) => (
                                    <div key={model.name} className="bg-white p-8 rounded-2xl border border-outline-variant/10 shadow-sm relative group hover:shadow-xl transition-all border-l-4 border-l-primary flex flex-col">
                                        
                                        {/* Header */}
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="text-on-surface font-bold text-lg tracking-tight">{model.name}</div>
                                            <Settings size={18} className="text-outline-variant group-hover:text-primary transition-colors" />
                                        </div>

                                        {/* Model Title/Description */}
                                        <div className="text-xs font-medium text-on-surface-variant/80 mb-5 leading-relaxed min-h-[36px]">
                                            {model.title}
                                        </div>

                                        {/* Config Badge */}
                                        <div className="mb-6">
                                            <span className="px-2.5 py-1 bg-primary/5 text-primary text-[9px] font-black uppercase tracking-widest rounded-md border border-primary/10">
                                                {model.config}
                                            </span>
                                        </div>

                                        {/* Parameters List */}
                                        <div className="space-y-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-auto pt-4 border-t border-outline-variant/5">
                                            {model.desc.map((param, i) => {
                                                const splitIndex = param.indexOf('=');
                                                const key = splitIndex !== -1 ? param.substring(0, splitIndex) : param;
                                                const value = splitIndex !== -1 ? param.substring(splitIndex + 1) : '';

                                                return (
                                                    <div key={i} className="flex justify-between items-start gap-4 border-b border-outline-variant/5 pb-2 last:border-0 last:pb-0">
                                                        <span className="opacity-70 truncate">{key}</span> 
                                                        <span className="text-on-surface font-black italic text-right break-all">
                                                            {value}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Docs Link */}
                                        <div className="mt-6 pt-4 border-t border-outline-variant/5 flex justify-end">
                                            <a 
                                                href={model.link} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="flex items-center gap-1.5 text-[10px] font-black text-primary hover:opacity-70 transition-opacity uppercase tracking-[0.2em]"
                                            >
                                                View Docs <ArrowRight size={12} />
                                            </a>
                                        </div>
                                        
                                    </div>
                                ))}
                            </div>
                            <div className="bg-white rounded-[1.5rem] border border-outline-variant/10 shadow-sm overflow-hidden overflow-x-auto custom-scrollbar">
                                <table className="w-full text-left border-collapse min-w-[1000px]">
                                    <thead className="bg-on-surface text-white">
                                        <tr>
                                            <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest">Architecture Config</th>
                                            <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest">Accuracy</th>
                                            <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest">Train Time (s)</th>
                                            <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest">Inference Time (ms)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-outline-variant/5">
                                        {pipelineData.performers.map((p, idx) => (
                                            <tr key={p.id} className="hover:bg-primary/5 transition-colors even:bg-surface-container-low/20">
                                                <td className="px-8 py-6 font-bold text-sm text-primary">{p.config}</td>
                                                <td className="px-8 py-6">
                                                    <span className={`px-4 py-2 rounded-lg text-sm font-black italic tracking-widest ${idx === 5 ? "bg-emerald-100 text-emerald-800 border border-emerald-200" : "text-on-surface"}`}>
                                                        {(p.accuracy * 100).toFixed(2)}%
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className={`px-4 py-2 rounded-lg text-sm font-medium tracking-widest ${idx === 6 ? "bg-emerald-100 text-emerald-800 border border-emerald-200" : "text-on-surface"}`}>
                                                        {p.train_time.toFixed(3)}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className={`px-4 py-2 rounded-lg text-sm font-medium tracking-widest ${idx === 2 ? "bg-emerald-100 text-emerald-800 border border-emerald-200" : "text-on-surface"}`}>
                                                        {p.infer_time.toFixed(4)}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </InteractiveAnalysis>
                        <InteractiveAnalysis
                            id="tuning"
                            title="Hyperparameter Optimization Search"
                            subtitle="Grid parameters and top-performing configurations for tree-based models"
                            icon={Sliders}
                            defaultOpen={true}
                            pythonCode={customTuneCode}
                        >
                            <div className="flex flex-col gap-12">
                                
                                {/* Top Section: The Grids */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    
                                    {/* Decision Tree Card */}
                                    <div className="bg-white p-6 rounded-3xl border border-outline-variant/10 shadow-sm relative group hover:shadow-xl transition-all flex flex-col border-t-[6px] border-t-emerald-500">
                                        <div className="mb-6">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-lg font-bold text-on-surface tracking-tight">Decision Tree</h3>
                                                <span className="px-2 py-1 bg-emerald-500/10 text-emerald-700 text-[9px] font-black uppercase tracking-widest rounded-md border border-emerald-500/20">
                                                    108 Configs
                                                </span>
                                            </div>
                                            <div className="text-[10px] font-mono bg-surface-container-low p-3 rounded-xl border border-outline-variant/20 text-on-surface-variant overflow-x-auto whitespace-pre">
                                                <span className="text-emerald-600 font-bold">model</span> = DecisionTreeClassifier(<br/>
                                                &nbsp;&nbsp;class_weight=<span className="text-amber-600">'balanced'</span>, random_state=<span className="text-blue-600">42</span><br/>
                                                )
                                            </div>
                                        </div>

                                        <div className="space-y-3 text-[11px]">
                                            <div><span className="font-mono font-bold text-emerald-600">criterion:</span> ['gini', 'entropy']<br/>
                                            <span className="text-on-surface-variant/80 italic">Mathematical function to measure split quality.</span></div>
                                            <div><span className="font-mono font-bold text-emerald-600">max_depth:</span> [None, 10, 20, 30, 40, 50]<br/>
                                            <span className="text-on-surface-variant/80 italic">Limits how deep the tree grows.</span></div>
                                            <div><span className="font-mono font-bold text-emerald-600">min_samples_split:</span> [2, 5, 10]<br/>
                                            <span className="text-on-surface-variant/80 italic">Minimum rows to create a new branch.</span></div>
                                            <div><span className="font-mono font-bold text-emerald-600">min_samples_leaf:</span> [1, 2, 4]<br/>
                                            <span className="text-on-surface-variant/80 italic">Minimum rows allowed in an end node.</span></div>
                                        </div>
                                    </div>

                                    {/* Random Forest Card */}
                                    <div className="bg-white p-6 rounded-3xl border border-outline-variant/10 shadow-sm relative group hover:shadow-xl transition-all flex flex-col border-t-[6px] border-t-indigo-500">
                                        <div className="mb-6">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-lg font-bold text-on-surface tracking-tight">Random Forest</h3>
                                                <span className="px-2 py-1 bg-indigo-500/10 text-indigo-700 text-[9px] font-black uppercase tracking-widest rounded-md border border-indigo-500/20">
                                                    108 Configs
                                                </span>
                                            </div>
                                            <div className="text-[10px] font-mono bg-surface-container-low p-3 rounded-xl border border-outline-variant/20 text-on-surface-variant overflow-x-auto whitespace-pre">
                                                <span className="text-indigo-600 font-bold">model</span> = RandomForestClassifier(<br/>
                                                &nbsp;&nbsp;class_weight=<span className="text-amber-600">'balanced'</span>, n_jobs=<span className="text-blue-600">-1</span><br/>
                                                &nbsp;&nbsp;random_state=<span className="text-blue-600">42</span><br/>
                                                )
                                            </div>
                                        </div>

                                        <div className="space-y-3 text-[11px]">
                                            <div><span className="font-mono font-bold text-indigo-600">n_estimators:</span> [100, 200, 300]<br/>
                                            <span className="text-on-surface-variant/80 italic">Total number of independent trees to average.</span></div>
                                            <div><span className="font-mono font-bold text-indigo-600">max_depth:</span> [None, 10, 20, 30]<br/>
                                            <span className="text-on-surface-variant/80 italic">Depth of individual trees in the forest.</span></div>
                                            <div><span className="font-mono font-bold text-indigo-600">min_samples_split:</span> [2, 5, 10]<br/>
                                            <span className="text-on-surface-variant/80 italic">Minimum rows to create a new branch.</span></div>
                                            <div><span className="font-mono font-bold text-indigo-600">min_samples_leaf:</span> [1, 2, 4]<br/>
                                            <span className="text-on-surface-variant/80 italic">Minimum rows allowed in an end node.</span></div>
                                        </div>
                                    </div>

                                    {/* XGBoost Card */}
                                    <div className="bg-white p-6 rounded-3xl border border-outline-variant/10 shadow-sm relative group hover:shadow-xl transition-all flex flex-col border-t-[6px] border-t-primary">
                                        <div className="mb-6">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-lg font-bold text-on-surface tracking-tight">XGBoost</h3>
                                                <span className="px-2 py-1 bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest rounded-md border border-primary/20">
                                                    54 Configs
                                                </span>
                                            </div>
                                            <div className="text-[10px] font-mono bg-surface-container-low p-3 rounded-xl border border-outline-variant/20 text-on-surface-variant overflow-x-auto whitespace-pre">
                                                <span className="text-primary font-bold">model</span> = XGBClassifier(<br/>
                                                &nbsp;&nbsp;scale_pos_weight=<span className="text-blue-600">3.46</span>, n_jobs=<span className="text-blue-600">-1</span><br/>
                                                &nbsp;&nbsp;random_state=<span className="text-blue-600">42</span><br/>
                                                )
                                            </div>
                                        </div>

                                        <div className="space-y-3 text-[11px]">
                                            <div><span className="font-mono font-bold text-primary">n_estimators:</span> [100, 200, 300]<br/>
                                            <span className="text-on-surface-variant/80 italic">Sequential mini-trees built to correct errors.</span></div>
                                            <div><span className="font-mono font-bold text-primary">learning_rate:</span> [0.01, 0.05, 0.1]<br/>
                                            <span className="text-on-surface-variant/80 italic">Shrinks tree impact to improve generalization.</span></div>
                                            <div><span className="font-mono font-bold text-primary">max_depth:</span> [3, 5, 7]<br/>
                                            <span className="text-on-surface-variant/80 italic">Tree depth. XGBoost thrives on shallow trees.</span></div>
                                            <div><span className="font-mono font-bold text-primary">subsample:</span> [0.8, 1.0]<br/>
                                            <span className="text-on-surface-variant/80 italic">Randomly drops rows to prevent overfitting.</span></div>
                                        </div>
                                    </div>

                                </div>

                                {/* Bottom Section: Results Tables (Full Width) */}
                                <div>
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
                                            <Trophy size={16} />
                                        </div>
                                        <h3 className="text-xl font-bold text-on-surface">Leaderboards</h3>
                                    </div>

                                    <div className="flex flex-col gap-8">
                                        
                                        {/* Top 5 F1 Score Table */}
                                        <div className="bg-white rounded-3xl border border-outline-variant/10 overflow-hidden shadow-sm">
                                            <div className="bg-on-surface px-8 py-5 border-b border-outline-variant/10">
                                                <div className="text-white font-black text-secondary uppercase tracking-widest">Top Performers by F1-Score (Rain)</div>
                                                <div className="text-xs text-white/60 font-medium mt-1">Optimized for balancing precision and catching missed rain days.</div>
                                            </div>
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left text-sm">
                                                    <thead className="bg-surface-container-low text-xs uppercase tracking-widest text-on-surface-variant/60">
                                                        <tr>
                                                            <th className="px-8 py-4 font-bold w-24">Rank</th>
                                                            <th className="px-8 py-4 font-bold">Model Configuration</th>
                                                            <th className="px-8 py-4 font-bold text-right w-48">F1-Score</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-outline-variant/5">
                                                        <tr className="hover:bg-surface-container-low/50 transition-colors">
                                                            <td className="px-8 py-4 font-black text-secondary text-lg">#1</td>
                                                            <td className="px-8 py-4 font-mono text-xs">XGB (lr=0.1, depth=7, est=300, sub=0.8)</td>
                                                            <td className="px-8 py-4 font-black text-right text-lg">0.659</td>
                                                        </tr>
                                                        <tr className="hover:bg-surface-container-low/50 transition-colors">
                                                            <td className="px-8 py-4 font-bold text-on-surface-variant">#2</td>
                                                            <td className="px-8 py-4 font-mono text-xs text-on-surface-variant/90">XGB (lr=0.05, depth=7, est=300, sub=0.8)</td>
                                                            <td className="px-8 py-4 font-bold text-right text-on-surface-variant/90">0.658</td>
                                                        </tr>
                                                        <tr className="hover:bg-surface-container-low/50 transition-colors">
                                                            <td className="px-8 py-4 font-bold text-on-surface-variant">#3</td>
                                                            <td className="px-8 py-4 font-mono text-xs text-on-surface-variant/90">XGB (lr=0.1, depth=7, est=200, sub=0.8)</td>
                                                            <td className="px-8 py-4 font-bold text-right text-on-surface-variant/90">0.656</td>
                                                        </tr>
                                                        <tr className="hover:bg-surface-container-low/50 transition-colors">
                                                            <td className="px-8 py-4 font-bold text-on-surface-variant">#8</td>
                                                            <td className="px-8 py-4 font-mono text-xs text-on-surface-variant/90">RF (depth=20, leaf=4, split=10, est=300)</td>
                                                            <td className="px-8 py-4 font-bold text-right text-on-surface-variant/90">0.653</td>
                                                        </tr>
                                                        <tr className="hover:bg-surface-container-low/50 transition-colors">
                                                            <td className="px-8 py-4 font-bold text-on-surface-variant">#156</td>
                                                            <td className="px-8 py-4 font-mono text-xs text-on-surface-variant/90">DT (entropy, depth=10, split=10, leaf=2)</td>
                                                            <td className="px-8 py-4 font-bold text-right text-on-surface-variant/90">0.598</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        {/* Top 5 Accuracy Table */}
                                        <div className="bg-white rounded-3xl border border-outline-variant/10 overflow-hidden shadow-sm">
                                            <div className="bg-on-surface px-8 py-5 border-b border-outline-variant/10">
                                                <div className="text-white font-black text-primary uppercase tracking-widest">Top Performers by Accuracy</div>
                                                <div className="text-xs text-white/60 font-medium mt-1">Optimized for general correctness across both Dry and Rain days.</div>
                                            </div>
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left text-sm">
                                                    <thead className="bg-surface-container-low text-xs uppercase tracking-widest text-on-surface-variant/60">
                                                        <tr>
                                                            <th className="px-8 py-4 font-bold w-24">Rank</th>
                                                            <th className="px-8 py-4 font-bold">Model Configuration</th>
                                                            <th className="px-8 py-4 font-bold text-right w-48">Accuracy</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-outline-variant/5">
                                                        <tr className="hover:bg-surface-container-low/50 transition-colors">
                                                            <td className="px-8 py-4 font-black text-primary text-lg">#1</td>
                                                            <td className="px-8 py-4 font-mono text-xs">RF (depth=None, leaf=2, split=5, est=300)</td>
                                                            <td className="px-8 py-4 font-black text-right text-lg">85.45%</td>
                                                        </tr>
                                                        <tr className="hover:bg-surface-container-low/50 transition-colors">
                                                            <td className="px-8 py-4 font-bold text-on-surface-variant">#2</td>
                                                            <td className="px-8 py-4 font-mono text-xs text-on-surface-variant/90">RF (depth=None, leaf=2, split=5, est=200)</td>
                                                            <td className="px-8 py-4 font-bold text-right text-on-surface-variant/90">85.39%</td>
                                                        </tr>
                                                        <tr className="hover:bg-surface-container-low/50 transition-colors">
                                                            <td className="px-8 py-4 font-bold text-on-surface-variant">#3</td>
                                                            <td className="px-8 py-4 font-mono text-xs text-on-surface-variant/90">RF (depth=30, leaf=2, split=5, est=300)</td>
                                                            <td className="px-8 py-4 font-bold text-right text-on-surface-variant/90">85.35%</td>
                                                        </tr>
                                                        <tr className="hover:bg-surface-container-low/50 transition-colors">
                                                            <td className="px-8 py-4 font-bold text-on-surface-variant">#82</td>
                                                            <td className="px-8 py-4 font-mono text-xs text-on-surface-variant/90">XGB (lr=0.1, depth=7, est=300, sub=0.8)</td>
                                                            <td className="px-8 py-4 font-bold text-right text-on-surface-variant/90">82.48%</td>
                                                        </tr>
                                                        <tr className="hover:bg-surface-container-low/50 transition-colors">
                                                            <td className="px-8 py-4 font-bold text-on-surface-variant">#160</td>
                                                            <td className="px-8 py-4 font-mono text-xs text-on-surface-variant/90">DT (entropy, depth=40, split=2, leaf=1)</td>
                                                            <td className="px-8 py-4 font-bold text-right text-on-surface-variant/90">78.56%</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </InteractiveAnalysis>
                        <section className="py-12 border-t border-outline-variant/10" id="simulation">
                            <div className="bg-on-surface rounded-[4rem] p-12 lg:p-20 text-white shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl pointer-events-none" />
                                
                                <div className="relative z-10">
                                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                                        <div className="max-w-2xl">
                                            <h2 className="text-5xl font-extrabold mb-6 tracking-tighter italic shadow-sm text-white">Hyperparameter Simulator</h2>
                                            <p className="text-white/60 text-lg font-medium leading-relaxed">
                                                Select your model and parameters to instantly load the exact performance from the Grid Search archives.
                                            </p>
                                        </div>

                                        {/* Top-Level Model Toggle */}
                                        <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 shrink-0">
                                            <button 
                                                onClick={() => setActiveModel("DT")}
                                                className={`px-5 py-2.5 rounded-xl font-black text-[11px] tracking-widest uppercase transition-all ${activeModel === "DT" ? "bg-emerald-500 text-emerald-950 shadow-lg" : "text-white/40 hover:text-white"}`}
                                            >
                                                Decision Tree
                                            </button>
                                            <button 
                                                onClick={() => setActiveModel("RF")}
                                                className={`px-5 py-2.5 rounded-xl font-black text-[11px] tracking-widest uppercase transition-all ${activeModel === "RF" ? "bg-indigo-500 text-white shadow-lg" : "text-white/40 hover:text-white"}`}
                                            >
                                                Random Forest
                                            </button>
                                            <button 
                                                onClick={() => setActiveModel("XGB")}
                                                className={`px-5 py-2.5 rounded-xl font-black text-[11px] tracking-widest uppercase transition-all ${activeModel === "XGB" ? "bg-primary text-on-primary shadow-lg" : "text-white/40 hover:text-white"}`}
                                            >
                                                XGBoost
                                            </button>
                                        </div>
                                    </div>

                                    {/* Dynamic Hyperparameter Controls */}
                                    {activeModel === "DT" && (
                                        /* DECISION TREE CONTROLS */
                                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                            <div className="bg-white/5 rounded-3xl p-6 border border-emerald-500/20">
                                                <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-4">Split Quality</div>
                                                <div className="space-y-3">
                                                    {['gini', 'entropy'].map(val => (
                                                        <button key={val} onClick={() => setCriterion(val)} className={`w-full p-3 rounded-xl border-2 text-left font-bold text-sm transition-all ${criterion === val ? 'bg-emerald-500/20 border-emerald-500 text-white' : 'bg-transparent border-white/10 text-white/50 hover:border-white/30'}`}>
                                                            {val.toUpperCase()}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="bg-white/5 rounded-3xl p-6 border border-emerald-500/20">
                                                <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-4">Max Depth</div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {['None', '10', '20', '30', '40', '50'].map(val => (
                                                        <button key={val} onClick={() => setMaxDepth(val)} className={`p-3 rounded-xl border-2 font-bold text-sm transition-all ${maxDepth === val ? 'bg-emerald-500/20 border-emerald-500 text-white' : 'bg-transparent border-white/10 text-white/50 hover:border-white/30'}`}>
                                                            {val}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="bg-white/5 rounded-3xl p-6 border border-emerald-500/20">
                                                <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-4">Min Samples Split</div>
                                                <div className="grid grid-cols-1 gap-3">
                                                    {['2', '5', '10'].map(val => (
                                                        <button key={val} onClick={() => setMinSplit(val)} className={`p-3 rounded-xl border-2 text-left font-bold text-sm transition-all ${minSplit === val ? 'bg-emerald-500/20 border-emerald-500 text-white' : 'bg-transparent border-white/10 text-white/50 hover:border-white/30'}`}>
                                                            {val} Nodes
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="bg-white/5 rounded-3xl p-6 border border-emerald-500/20">
                                                <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-4">Min Samples Leaf</div>
                                                <div className="grid grid-cols-1 gap-3">
                                                    {['1', '2', '4'].map(val => (
                                                        <button key={val} onClick={() => setMinLeaf(val)} className={`p-3 rounded-xl border-2 text-left font-bold text-sm transition-all ${minLeaf === val ? 'bg-emerald-500/20 border-emerald-500 text-white' : 'bg-transparent border-white/10 text-white/50 hover:border-white/30'}`}>
                                                            {val} {val === '1' ? 'Leaf' : 'Leaves'}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeModel === "RF" && (
                                        /* RANDOM FOREST CONTROLS */
                                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                            <div className="bg-white/5 rounded-3xl p-6 border border-indigo-500/20">
                                                <div className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-4">N Estimators</div>
                                                <div className="grid grid-cols-1 gap-3">
                                                    {['100', '200', '300'].map(val => (
                                                        <button key={val} onClick={() => setRfNEstimators(val)} className={`p-3 rounded-xl border-2 text-left font-bold text-sm transition-all ${rfNEstimators === val ? 'bg-indigo-500/20 border-indigo-500 text-white' : 'bg-transparent border-white/10 text-white/50 hover:border-white/30'}`}>
                                                            {val} Trees
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="bg-white/5 rounded-3xl p-6 border border-indigo-500/20">
                                                <div className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-4">Max Depth</div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {['None', '10', '20', '30'].map(val => (
                                                        <button key={val} onClick={() => setRfMaxDepth(val)} className={`p-3 rounded-xl border-2 font-bold text-sm transition-all ${rfMaxDepth === val ? 'bg-indigo-500/20 border-indigo-500 text-white' : 'bg-transparent border-white/10 text-white/50 hover:border-white/30'}`}>
                                                            {val}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="bg-white/5 rounded-3xl p-6 border border-indigo-500/20">
                                                <div className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-4">Min Samples Split</div>
                                                <div className="grid grid-cols-1 gap-3">
                                                    {['2', '5', '10'].map(val => (
                                                        <button key={val} onClick={() => setRfMinSplit(val)} className={`p-3 rounded-xl border-2 text-left font-bold text-sm transition-all ${rfMinSplit === val ? 'bg-indigo-500/20 border-indigo-500 text-white' : 'bg-transparent border-white/10 text-white/50 hover:border-white/30'}`}>
                                                            {val} Nodes
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="bg-white/5 rounded-3xl p-6 border border-indigo-500/20">
                                                <div className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-4">Min Samples Leaf</div>
                                                <div className="grid grid-cols-1 gap-3">
                                                    {['1', '2', '4'].map(val => (
                                                        <button key={val} onClick={() => setRfMinLeaf(val)} className={`p-3 rounded-xl border-2 text-left font-bold text-sm transition-all ${rfMinLeaf === val ? 'bg-indigo-500/20 border-indigo-500 text-white' : 'bg-transparent border-white/10 text-white/50 hover:border-white/30'}`}>
                                                            {val} {val === '1' ? 'Leaf' : 'Leaves'}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeModel === "XGB" && (
                                        /* XGBOOST CONTROLS */
                                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                            <div className="bg-white/5 rounded-3xl p-6 border border-primary/20">
                                                <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">Learning Rate</div>
                                                <div className="grid grid-cols-1 gap-3">
                                                    {['0.01', '0.05', '0.1'].map(val => (
                                                        <button key={val} onClick={() => setLearningRate(val)} className={`p-3 rounded-xl border-2 text-left font-bold text-sm transition-all ${learningRate === val ? 'bg-primary/20 border-primary text-white' : 'bg-transparent border-white/10 text-white/50 hover:border-white/30'}`}>
                                                            {val}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="bg-white/5 rounded-3xl p-6 border border-primary/20">
                                                <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">N Estimators</div>
                                                <div className="grid grid-cols-1 gap-3">
                                                    {['100', '200', '300'].map(val => (
                                                        <button key={val} onClick={() => setNEstimators(val)} className={`p-3 rounded-xl border-2 font-bold text-sm transition-all ${nEstimators === val ? 'bg-primary/20 border-primary text-white' : 'bg-transparent border-white/10 text-white/50 hover:border-white/30'}`}>
                                                            {val}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="bg-white/5 rounded-3xl p-6 border border-primary/20">
                                                <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">Max Depth</div>
                                                <div className="grid grid-cols-1 gap-3">
                                                    {['3', '5', '7'].map(val => (
                                                        <button key={val} onClick={() => setXgbMaxDepth(val)} className={`p-3 rounded-xl border-2 font-bold text-sm transition-all ${xgbMaxDepth === val ? 'bg-primary/20 border-primary text-white' : 'bg-transparent border-white/10 text-white/50 hover:border-white/30'}`}>
                                                            {val}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="bg-white/5 rounded-3xl p-6 border border-primary/20">
                                                <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">Subsample Row %</div>
                                                <div className="grid grid-cols-1 gap-3">
                                                    {['0.8', '1.0'].map(val => (
                                                        <button key={val} onClick={() => setSubsample(val)} className={`p-3 rounded-xl border-2 text-left font-bold text-sm transition-all ${subsample === val ? 'bg-primary/20 border-primary text-white' : 'bg-transparent border-white/10 text-white/50 hover:border-white/30'}`}>
                                                            {Number(val) * 100}%
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Dynamic Results Rendering */}
                                    {(() => {
                                        let lookupId = "";
                                        let selectedModel = null;
                                        let displayTitle = "";

                                        if (activeModel === "DT") {
                                            lookupId = `criterion_${criterion}_max_depth_${maxDepth}_min_samples_leaf_${minLeaf}_min_samples_split_${minSplit}_splitter_best`;
                                            selectedModel = dtData?.performers?.find((m: any) => m.id === lookupId);
                                            displayTitle = "Decision Tree Classifier";
                                        } else if (activeModel === "RF") {
                                            lookupId = `max_depth_${rfMaxDepth}_min_samples_leaf_${rfMinLeaf}_min_samples_split_${rfMinSplit}_n_estimators_${rfNEstimators}`;
                                            // Make sure you have your rfData variable passed here!
                                            selectedModel = rfData?.performers?.find((m: any) => m.id === lookupId);
                                            displayTitle = "Random Forest Classifier";
                                        } else {
                                            const lrFormat = learningRate.replace('.', '_');
                                            const subFormat = subsample.replace('.', '_');
                                            lookupId = `learning_rate_${lrFormat}_max_depth_${xgbMaxDepth}_n_estimators_${nEstimators}_subsample_${subFormat}`;
                                            selectedModel = xgbData?.performers?.find((m: any) => m.id === lookupId);
                                            displayTitle = "XGBoost Classifier";
                                        }

                                        if (!selectedModel) {
                                            return (
                                                <div className="mt-12 p-12 text-center border-2 border-dashed border-white/20 rounded-3xl text-white/50">
                                                    <div className="text-3xl mb-4">🔍</div>
                                                    <div className="font-bold">Configuration not found in archives.</div>
                                                    <div className="text-xs mt-2 opacity-60 font-mono">ID: {lookupId}</div>
                                                </div>
                                            );
                                        }

                                        return (
                                            <AnimatePresence mode="wait">
                                                <motion.div 
                                                    key={lookupId}
                                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                                                >
                                                    <DarkBinaryConfusionMatrix 
                                                        modelName={displayTitle}
                                                        tn={selectedModel.matrix[0]}
                                                        fp={selectedModel.matrix[1]}
                                                        fn={selectedModel.matrix[2]}
                                                        tp={selectedModel.matrix[3]}
                                                        accuracy={selectedModel.accuracy}
                                                        trainTime={selectedModel.train_time}
                                                        inferTime={selectedModel.infer_time}
                                                    />
                                                </motion.div>
                                            </AnimatePresence>
                                        );
                                    })()}

                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}

// Minimal dummy component for Plotly Grid mapping
const Grid = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>;