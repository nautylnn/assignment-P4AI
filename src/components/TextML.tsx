import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Lưu ý đổi 'motion/react' thành 'framer-motion'
import Plot from "react-plotly.js";
import {
    Brain,
    ChevronDown,
    BookOpen,
    Copy,
    BarChart,
    Terminal,
    Zap,
    CheckCircle2,
    Target,
    Sparkles,
    Layers,
    GitMerge,
    Rocket,
    Settings,
    TrendingUp,
    Info,
    Code2,
    Hash,
    ArrowRight,
    Cpu,
    FlaskConical,
    BarChart3,
    Gauge,
    Filter,
    Activity,
    AlertTriangle,
    Trophy,
    Clock,
    ChevronRight,
    FileText,
    Database,
    Lightbulb, 
    Table,
    ChevronLeft,
    Grid3X3,
    Minimize2,
    Network, 
    BrainCircuit,
    ShieldCheck,
    Search
} from "lucide-react";


// =============================
// DATA
// =============================

const MODELS = [
    {
        id: "naive_bayes",
        name: "Naive Bayes",
        tag: "Baseline",
        tagColor: "bg-slate-100 text-slate-600 border-slate-200",
        color: "#667eea",
        accuracy: 84.07,
        precision: 83.87,
        recall: 84.37,
        f1: 84.12,
        trainTime: 0.13,
        inferenceSpeed: 5210510,
        cm: [[41885, 8115], [7817, 42183]],
        isBest: false,
    },
    {
        id: "logistic_regression",
        name: "Logistic Regression",
        tag: "Recommended",
        tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
        color: "#43db97",
        accuracy: 88.35,
        precision: 88.12,
        recall: 88.65,
        f1: 88.39,
        trainTime: 3.25,
        inferenceSpeed: 9183535,
        cm: [[44024, 5976], [5673, 44327]],
        isBest: false,
    },
    {
        id: "decision_tree",
        name: "Decision Tree",
        tag: "Low",
        tagColor: "bg-red-50 text-red-600 border-red-200",
        color: "#f093fb",
        accuracy: 72.91,
        precision: 69.45,
        recall: 81.79,
        f1: 75.12,
        trainTime: 216.11,
        inferenceSpeed: 3479826,
        cm: [[32009, 17991], [9104, 40896]],
        isBest: false,
    },
    {
        id: "svm",
        name: "SVM",
        tag: "Best Accuracy",
        tagColor: "bg-violet-50 text-violet-700 border-violet-200",
        color: "#764ba2",
        accuracy: 88.46,
        precision: 88.16,
        recall: 88.85,
        f1: 88.51,
        trainTime: 13.57,
        inferenceSpeed: 12989885,
        cm: [[44034, 5966], [5574, 44426]],
        isBest: true,
    },
    {
        id: "random_forest",
        name: "Random Forest",
        tag: "Ensemble",
        tagColor: "bg-amber-50 text-amber-700 border-amber-200",
        color: "#4facfe",
        accuracy: 84.83,
        precision: 85.66,
        recall: 83.68,
        f1: 84.65,
        trainTime: 2598.48,
        inferenceSpeed: 22758,
        cm: [[42994, 7006], [8162, 41838]],
        isBest: false,
    },
    {
        id: "adaboost",
        name: "AdaBoost",
        tag: "Boosting",
        tagColor: "bg-orange-50 text-orange-700 border-orange-200",
        color: "#f5876c",
        accuracy: 71.81,
        precision: 68.72,
        recall: 80.07,
        f1: 73.96,
        trainTime: 520.56,
        inferenceSpeed: 46537,
        cm: [[31773, 18227], [9964, 40036]],
        isBest: false,
    },
    {
        id: "xgboost",
        name: "XGBoost",
        tag: "Gradient Boost",
        tagColor: "bg-blue-50 text-blue-700 border-blue-200",
        color: "#38bdf8",
        accuracy: 83.69,
        precision: 82.40,
        recall: 85.68,
        f1: 84.01,
        trainTime: 176.30,
        inferenceSpeed: 378551,
        cm: [[40847, 9153], [7159, 42841]],
        isBest: false,
    },
    {
        id: "voting_ensemble",
        name: "Voting Ensemble",
        tag: "Best Precision",
        tagColor: "bg-pink-50 text-pink-700 border-pink-200",
        color: "#f472b6",
        accuracy: 86.58,
        precision: 90.25,
        recall: 82.01,
        f1: 85.93,
        trainTime: 178.42,
        inferenceSpeed: 126662,
        cm: [[45568, 4432], [8993, 41007]],
        isBest: false,
    },
];

const PIPELINE_DATA: Record<string, {
    steps: string[];
    params: Record<string, string>;
    rationale: string;
    code: string;
}> = {
    naive_bayes: {
        steps: ["Text Input", "Lowercase", "Tokenize", "Remove Stopwords", "TF-IDF (50k)", "MultinomialNB", "Prediction"],
        params: {
            vectorizer: "TfidfVectorizer(max_features=50000)",
            model: "MultinomialNB(alpha=1.0)",
            "train time": "0.13s"
        },
        rationale: "Naive Bayes is ideal as a baseline due to its extremely fast training. TF-IDF features capture term significance while the probabilistic model handles sparse text data well. However, it ignores word order and assumes feature independence.",
        code: `from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.pipeline import Pipeline

pipeline = Pipeline([
    ('tfidf', TfidfVectorizer(max_features=50000)),
    ('clf', MultinomialNB(alpha=1.0))
])

pipeline.fit(X_train, y_train)
y_pred = pipeline.predict(X_test)`
    },
    logistic_regression: {
        steps: ["Text Input", "Lowercase", "Tokenize", "Remove Stopwords", "TF-IDF (50k, bigrams)", "LogisticRegression", "Prediction"],
        params: {
            vectorizer: "TfidfVectorizer(max_features=50000, ngram_range=(1,2))",
            model: "LogisticRegression(C=1.0, max_iter=1000)",
            "train time": "3.25s"
        },
        rationale: "Logistic Regression with bigrams excels at sentiment analysis by capturing negation patterns ('not good') and common sentiment phrases. The regularization prevents overfitting on sparse features.",
        code: `from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.pipeline import Pipeline

pipeline = Pipeline([
    ('tfidf', TfidfVectorizer(max_features=50000, ngram_range=(1, 2))),
    ('clf', LogisticRegression(C=1.0, max_iter=1000, solver='lbfgs'))
])

pipeline.fit(X_train, y_train)
y_pred = pipeline.predict(X_test)`
    },
    svm: {
        steps: ["Text Input", "Lowercase", "Tokenize", "Remove Stopwords", "TF-IDF (50k, bigrams)", "LinearSVC", "Prediction"],
        params: {
            vectorizer: "TfidfVectorizer(max_features=50000, ngram_range=(1,2))",
            model: "LinearSVC(C=1.0, max_iter=5000)",
            "train time": "13.57s"
        },
        rationale: "SVM with LinearSVC finds the optimal hyperplane separating positive/negative reviews. Excellent with high-dimensional TF-IDF features and achieves the best accuracy/F1 in this comparison.",
        code: `from sklearn.svm import LinearSVC
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.pipeline import Pipeline

pipeline = Pipeline([
    ('tfidf', TfidfVectorizer(max_features=50000, ngram_range=(1, 2))),
    ('clf', LinearSVC(C=1.0, max_iter=5000))
])

pipeline.fit(X_train, y_train)
y_pred = pipeline.predict(X_test)`
    },
    random_forest: {
        steps: ["Text Input", "Lowercase", "Tokenize", "Remove Stopwords", "TF-IDF (10k)", "RandomForest (100 trees)", "Prediction"],
        params: {
            vectorizer: "TfidfVectorizer(max_features=10000)",
            model: "RandomForestClassifier(n_estimators=100, n_jobs=-1)",
            "train time": "2598.48s (~43 min)"
        },
        rationale: "Random Forest builds multiple decision trees on subsets of features. Extremely slow to train on high-dimensional text data but robust to overfitting. Reduced max_features to 10k to make training feasible.",
        code: `from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.pipeline import Pipeline

pipeline = Pipeline([
    ('tfidf', TfidfVectorizer(max_features=10000)),
    ('clf', RandomForestClassifier(n_estimators=100, n_jobs=-1))
])

pipeline.fit(X_train, y_train)
y_pred = pipeline.predict(X_test)`
    },
    voting_ensemble: {
        steps: ["Text Input", "Lowercase", "Tokenize", "Remove Stopwords", "TF-IDF (50k)", "LR + NB + LinearSVC", "Hard Vote", "Prediction"],
        params: {
            vectorizer: "TfidfVectorizer(max_features=50000)",
            model: "VotingClassifier([LR, NB, LinearSVC], voting='hard')",
            "train time": "178.42s"
        },
        rationale: "Combines the strengths of three complementary models. Achieves the best Precision (90.25%) at the cost of slightly lower recall. Ideal for applications where false positives are costly.",
        code: `from sklearn.ensemble import VotingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import MultinomialNB
from sklearn.svm import LinearSVC
from sklearn.pipeline import Pipeline

pipeline = Pipeline([
    ('tfidf', TfidfVectorizer(max_features=50000)),
    ('clf', VotingClassifier(estimators=[
        ('lr', LogisticRegression()),
        ('nb', MultinomialNB()),
        ('svm', LinearSVC())
    ], voting='hard'))
])

pipeline.fit(X_train, y_train)
y_pred = pipeline.predict(X_test)`
    },
};

const FINE_TUNE_RESULTS = {
    logistic_regression: {
        baseline: { C: 1.0, accuracy: 88.35, f1: 88.39 },
        best: { C: 5.0, accuracy: 88.71, f1: 88.74, improvement: "+0.35%" },
        grid: [
            { C: 0.01, accuracy: 82.10, f1: 82.15 },
            { C: 0.1, accuracy: 87.22, f1: 87.26 },
            { C: 1.0, accuracy: 88.35, f1: 88.39 },
            { C: 5.0, accuracy: 88.71, f1: 88.74 },
            { C: 10.0, accuracy: 88.68, f1: 88.72 },
            { C: 50.0, accuracy: 88.42, f1: 88.46 },
        ],
        code: `from sklearn.model_selection import GridSearchCV
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline

pipeline = Pipeline([
    ('tfidf', TfidfVectorizer(max_features=50000, ngram_range=(1,2))),
    ('clf', LogisticRegression(max_iter=1000))
])

param_grid = {
    'clf__C': [0.01, 0.1, 1.0, 5.0, 10.0, 50.0],
    'clf__solver': ['lbfgs', 'saga']
}

gs = GridSearchCV(pipeline, param_grid, cv=5, scoring='f1', n_jobs=-1, verbose=1)
gs.fit(X_train, y_train)

print(f"Best params: {gs.best_params_}")
print(f"Best F1: {gs.best_score_:.4f}")`
    },
    svm: {
        baseline: { C: 1.0, accuracy: 88.46, f1: 88.51 },
        best: { C: 0.5, accuracy: 88.52, f1: 88.57, improvement: "+0.06%" },
        grid: [
            { C: 0.01, accuracy: 86.12, f1: 86.18 },
            { C: 0.1, accuracy: 88.21, f1: 88.26 },
            { C: 0.5, accuracy: 88.52, f1: 88.57 },
            { C: 1.0, accuracy: 88.46, f1: 88.51 },
            { C: 5.0, accuracy: 88.30, f1: 88.35 },
            { C: 10.0, accuracy: 88.18, f1: 88.23 },
        ],
        code: `from sklearn.model_selection import GridSearchCV
from sklearn.svm import LinearSVC
from sklearn.pipeline import Pipeline

pipeline = Pipeline([
    ('tfidf', TfidfVectorizer(max_features=50000, ngram_range=(1,2))),
    ('clf', LinearSVC(max_iter=5000))
])

param_grid = {
    'clf__C': [0.01, 0.1, 0.5, 1.0, 5.0, 10.0],
    'tfidf__ngram_range': [(1, 1), (1, 2)]
}

gs = GridSearchCV(pipeline, param_grid, cv=5, scoring='f1', n_jobs=-1)
gs.fit(X_train, y_train)

print(f"Best params: {gs.best_params_}")
print(f"Best F1: {gs.best_score_:.4f}")`
    },
};

// =============================
// SUB-COMPONENTS
// =============================

const SectionBlock = ({ id, title, subtitle, icon: Icon, defaultOpen = false, pythonCode, children }: any) => {
    const [open, setOpen] = useState(defaultOpen);
    const [showCode, setShowCode] = useState(false);

    return (
        <section className="py-2 mb-8 scroll-mt-24" id={id}>
            <div className="bg-white rounded-[2rem] border border-outline-variant/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden transition-all hover:shadow-[0_15px_60px_rgb(0,0,0,0.08)]">
                <button
                    onClick={() => setOpen(!open)}
                    className="w-full flex flex-col md:flex-row justify-between items-start md:items-center py-5 px-8 hover:bg-surface-container-low transition-colors group cursor-pointer text-left"
                >
                    <div className="flex items-center gap-6">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${open ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-surface-container-high text-primary group-hover:bg-primary/5"}`}>
                            <Icon size={22} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight text-on-surface">{title}</h2>
                            <p className="text-on-surface-variant text-[11px] font-medium opacity-60 italic">{subtitle}</p>
                        </div>
                    </div>
                    <div className={`flex items-center text-on-surface-variant/40 transition-transform duration-500 ${open ? "rotate-180" : ""}`}>
                        <ChevronDown size={28} />
                    </div>
                </button>

                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="pt-2 pb-16 px-10 border-t border-outline-variant/5">
                                {pythonCode && (
                                    <div className="flex justify-end mb-10">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setShowCode(!showCode); }}
                                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs tracking-tight transition-all cursor-pointer border ${showCode ? "bg-on-surface text-white border-on-surface" : "bg-white text-on-surface-variant border-outline-variant/20 hover:bg-surface-container"}`}
                                        >
                                            <BookOpen size={16} />
                                            {showCode ? "Hide Code" : "View Code"}
                                        </button>
                                    </div>
                                )}
                                <AnimatePresence>
                                    {showCode && pythonCode && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden mb-12"
                                        >
                                            <div className="bg-slate-900 rounded-3xl p-8 font-mono text-[13px] relative border border-outline-variant/10">
                                                <div className="flex gap-2 mb-6 border-b border-white/5 pb-4">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                                    <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] ml-2">Python Script</span>
                                                </div>
                                                <code className="text-slate-300 block leading-relaxed overflow-x-auto whitespace-pre">
                                                    {pythonCode}
                                                </code>
                                                <button
                                                    onClick={() => navigator.clipboard.writeText(pythonCode)}
                                                    className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors cursor-pointer bg-white/5 p-2 rounded-lg"
                                                >
                                                    <Copy size={16} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                {children}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

const MetricBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
    <div className="space-y-1.5">
        <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">{label}</span>
            <span className="text-sm font-bold text-on-surface">{value.toFixed(2)}%</span>
        </div>
        <div className="h-2 bg-surface-container-high rounded-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(value / 100) * 100}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ backgroundColor: color }}
            />
        </div>
    </div>
);

// =============================
// STEP 1: MODEL RESULTS
// =============================
const Step1ModelResults = () => {
    const [selectedModel, setSelectedModel] = useState("svm");
    const [metricView, setMetricView] = useState<"accuracy" | "f1" | "time">("accuracy");
    const model = MODELS.find(m => m.id === selectedModel)!;

    const barColors = MODELS.map(m => m.id === selectedModel ? "#00685f" : m.color);
    const labels = MODELS.map(m => m.name);

    return (
        <SectionBlock
            id="model-results"
            title="Step 1 — Model Performance Results"
            subtitle="Comparative metrics from 8 classifiers trained on 500,000 Amazon reviews."
            icon={BarChart3}
            defaultOpen={true}
            pythonCode={`from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
import time

results = {}
for name, pipeline in pipelines.items():
    start = time.time()
    pipeline.fit(X_train, y_train)
    train_time = time.time() - start
    
    y_pred = pipeline.predict(X_test)
    results[name] = {
        'accuracy': accuracy_score(y_test, y_pred),
        'precision': precision_score(y_test, y_pred),
        'recall': recall_score(y_test, y_pred),
        'f1': f1_score(y_test, y_pred),
        'train_time': train_time
    }

df_results = pd.DataFrame(results).T
print(df_results.sort_values('f1', ascending=False))`}
        >
            {/* Summary Table */}
            <div className="overflow-x-auto mb-12">
                <table className="w-full text-left border-collapse min-w-[900px] rounded-2xl overflow-hidden border border-outline-variant/10">
                    <thead className="bg-on-surface text-white">
                        <tr>
                            {["Model", "Accuracy", "Precision", "Recall", "F1-Score", "Train Time", "Inference (samples/s)"].map(h => (
                                <th key={h} className="px-5 py-4 text-[10px] font-bold uppercase tracking-widest">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/5">
                        {MODELS.map((m) => (
                            <tr
                                key={m.id}
                                onClick={() => setSelectedModel(m.id)}
                                className={`cursor-pointer transition-colors ${selectedModel === m.id ? "bg-primary/5 border-l-4 border-l-primary" : "hover:bg-surface-container-low/40 border-l-4 border-l-transparent"}`}
                            >
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: m.color }} />
                                        <span className="font-bold text-sm text-on-surface">{m.name}</span>
                                        {m.isBest && <span className="px-2 py-0.5 bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest rounded-full border border-primary/20">★ Best</span>}
                                    </div>
                                </td>
                                <td className={`px-5 py-4 text-sm font-bold ${m.isBest ? "text-primary" : "text-on-surface"}`}>{m.accuracy.toFixed(2)}%</td>
                                <td className="px-5 py-4 text-sm text-on-surface font-medium">{m.precision.toFixed(2)}%</td>
                                <td className="px-5 py-4 text-sm text-on-surface font-medium">{m.recall.toFixed(2)}%</td>
                                <td className={`px-5 py-4 text-sm font-bold ${m.f1 === Math.max(...MODELS.map(x => x.f1)) ? "text-primary" : "text-on-surface"}`}>{m.f1.toFixed(2)}%</td>
                                <td className={`px-5 py-4 text-sm font-medium ${m.trainTime === Math.min(...MODELS.map(x => x.trainTime)) ? "text-emerald-600 font-bold" : "text-on-surface"}`}>
                                    {m.trainTime < 1 ? `${m.trainTime.toFixed(2)}s` : m.trainTime > 100 ? `${(m.trainTime / 60).toFixed(1)}min` : `${m.trainTime.toFixed(2)}s`}
                                </td>
                                <td className="px-5 py-4 text-sm text-on-surface font-medium">{m.inferenceSpeed.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p className="text-[11px] text-on-surface-variant opacity-50 mt-3 italic px-2">Click any row to view the corresponding confusion matrix and metrics below.</p>
            </div>

            {/* Charts + CM */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
                <div className="bg-white p-6 rounded-[2rem] border border-outline-variant/10 shadow-sm">
                    <div className="flex gap-2 mb-6 flex-wrap">
                        {(["accuracy", "f1", "time"] as const).map(v => (
                            <button key={v} onClick={() => setMetricView(v)}
                                className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all cursor-pointer ${metricView === v ? "bg-primary text-white border-primary" : "bg-white text-on-surface-variant border-outline-variant/20"}`}>
                                {v === "time" ? "Train Time" : v}
                            </button>
                        ))}
                    </div>
                    <Plot
                        data={[{
                            type: "bar" as const,
                            x: labels,
                            y: metricView === "time" ? MODELS.map(m => m.trainTime)
                                : metricView === "accuracy" ? MODELS.map(m => m.accuracy)
                                : MODELS.map(m => m.f1),
                            marker: { color: barColors },
                            text: metricView === "time"
                                ? MODELS.map(m => m.trainTime < 1 ? `${m.trainTime.toFixed(2)}s` : `${m.trainTime.toFixed(0)}s`)
                                : MODELS.map(m => `${(metricView === "accuracy" ? m.accuracy : m.f1).toFixed(1)}%`),
                            textposition: "outside" as const
                        }]}
                        layout={{
                            height: 320,
                            autosize: true,
                            margin: { t: 20, r: 20, b: 80, l: 50 },
                            xaxis: { tickangle: -30, tickfont: { size: 10 } },
                            yaxis: { title: metricView === "time" ? "Seconds (log)" : "%" },
                            plot_bgcolor: "transparent",
                            paper_bgcolor: "transparent",
                        }}
                        useResizeHandler={true}
                        style={{ width: "100%", height: "320px" }}
                        config={{ responsive: true, displayModeBar: false }}
                    />
                </div>

                <div className="bg-white p-6 rounded-[2rem] border border-outline-variant/10 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <h4 className="text-sm font-bold text-on-surface uppercase tracking-tight">Confusion Matrix</h4>
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase border border-outline-variant/20 text-on-surface-variant">{model.name}</span>
                    </div>
                    <Plot
                        data={[{
                            type: "heatmap" as const,
                            z: model.cm,
                            x: ["Pred Negative", "Pred Positive"],
                            y: ["True Negative", "True Positive"],
                            colorscale: [[0, "rgb(103,0,31)"], [0.5, "rgb(247,247,247)"], [1, "rgb(5,48,97)"]] as any,
                            showscale: true,
                            text: model.cm as any,
                            texttemplate: "%{text}",
                            textfont: { size: 15 }
                        }]}
                        layout={{
                            height: 280,
                            autosize: true,
                            margin: { t: 10, r: 60, b: 60, l: 100 },
                            xaxis: { tickfont: { size: 11 } },
                            yaxis: { tickfont: { size: 11 } },
                            plot_bgcolor: "transparent",
                            paper_bgcolor: "transparent",
                        }}
                        useResizeHandler={true}
                        style={{ width: "100%", height: "280px" }}
                        config={{ responsive: true, displayModeBar: false }}
                    />
                </div>
            </div>

            {/* Detail Card */}
            <div className="bg-surface-container-low/50 rounded-[2rem] p-8 border border-outline-variant/10">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: model.color }} />
                    <h4 className="font-bold text-lg text-on-surface">{model.name} — Detailed Metrics</h4>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${model.tagColor}`}>{model.tag}</span>
                </div>
                <div className="space-y-4 mb-6">
                    <MetricBar label="Accuracy" value={model.accuracy} color={model.color} />
                    <MetricBar label="Precision (Positive)" value={model.precision} color={model.color} />
                    <MetricBar label="Recall (Positive)" value={model.recall} color={model.color} />
                    <MetricBar label="F1-Score (Positive)" value={model.f1} color={model.color} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-2xl border border-outline-variant/10 text-center">
                        <div className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 mb-1">Train Time</div>
                        <div className="text-xl font-bold text-on-surface">
                            {model.trainTime < 60 ? `${model.trainTime.toFixed(2)}s` : `${(model.trainTime / 60).toFixed(1)} min`}
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-outline-variant/10 text-center">
                        <div className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 mb-1">Inference Speed</div>
                        <div className="text-xl font-bold text-on-surface">
                            {model.inferenceSpeed > 1e6 ? `${(model.inferenceSpeed / 1e6).toFixed(1)}M/s` : `${(model.inferenceSpeed / 1000).toFixed(0)}K/s`}
                        </div>
                    </div>
                </div>
            </div>
        </SectionBlock>
    );
};

// =============================
// RAW DATA (Translated to English)
// =============================
const RAW_PIPELINES = [
    { 
        id: "pipe_1", extractor: 'Bag of Words', reducer: 'None', classifier: 'Logistic Regression',
        extraction_time: 30.22, reduction_time: 0, train_time: 40.66, inference_time: 0.000238,
        accuracy: 0.87593, tp: 43582, fp: 5756, fn: 6418, tn: 44244,
        config: { Vectorizer: 'CountVectorizer(max_features=10000)', 'Dim. reduction': 'None', Model: 'LogisticRegression(C=1.0, max_iter=1000)', Notes: 'Bigrams not used in BoW baseline' },
        rationale: 'Logistic Regression on Bag-of-Words achieves the best overall performance. L2 regularization excellently handles sparse features, and the model learns individual word weights independently without complex feature engineering.',
        color: 'blue'
    },
    { 
        id: "pipe_2", extractor: 'Bag of Words', reducer: 'Chi²', classifier: 'Naive Bayes',
        extraction_time: 30.84, reduction_time: 1.36, train_time: 0.10, inference_time: 0.000200,
        accuracy: 0.82759, tp: 41704, fp: 8946, fn: 8296, tn: 41054,
        config: { Vectorizer: 'CountVectorizer(max_features=10000)', 'Chi²': 'SelectKBest(chi2, k=2000)', Model: 'MultinomialNB(alpha=1.0)', Notes: 'Chi² reduces features from 10k → 2k' },
        rationale: 'Adding Chi² to Naive Bayes filters out 80% of the vocabulary, retaining only the most highly discriminative words. Chi² scores each feature against the label, pairing perfectly with the NB probabilistic model.',
        color: 'emerald'
    },
    { 
        id: "pipe_3", extractor: 'Bag of Words', reducer: 'None', classifier: 'Naive Bayes',
        extraction_time: 30.44, reduction_time: 0, train_time: 0.13, inference_time: 0.000341,
        accuracy: 0.82198, tp: 41350, fp: 9150, fn: 8650, tn: 40850,
        config: { Vectorizer: 'CountVectorizer(max_features=5000)', 'Dim. reduction': 'None', Model: 'MultinomialNB(alpha=1.0)', Notes: 'Smaller vocabulary, faster but weaker' },
        rationale: 'The most basic baseline: simply counting words and applying Laplace-smoothed probabilities. Training takes only 0.13s — ideal for rapid testing. Accuracy drops because raw count vectors ignore term importance (TF-IDF).',
        color: 'teal'
    },
    { 
        id: "pipe_4", extractor: 'Bag of Words', reducer: 'None', classifier: 'Random Forest',
        extraction_time: 30.45, reduction_time: 0, train_time: 90.22, inference_time: 0.007044,
        accuracy: 0.80374, tp: 39243, fp: 8882, fn: 10757, tn: 41118,
        config: { Vectorizer: 'CountVectorizer(max_features=10000)', 'Dim. reduction': 'None', Model: 'RandomForestClassifier(n_estimators=100)', Notes: 'Parallel fit (n_jobs=-1), 100 trees' },
        rationale: 'An ensemble of 100 decision trees. Highly resistant to overfitting but extremely slow to train on high-dimensional text data (90s train). Inference is roughly 30x slower than Logistic Regression.',
        color: 'amber'
    },
    { 
        id: "pipe_5", extractor: 'Bag of Words', reducer: 'None', classifier: 'Decision Tree',
        extraction_time: 30.39, reduction_time: 0, train_time: 252.68, inference_time: 0.000428,
        accuracy: 0.73321, tp: 36536, fp: 13214, fn: 13464, tn: 36786,
        config: { Vectorizer: 'CountVectorizer(max_features=5000)', 'Dim. reduction': 'None', Model: 'DecisionTreeClassifier(max_depth=20)', Notes: 'Prone to overfitting on sparse text' },
        rationale: 'A single Decision Tree with max_depth=20 easily memorizes sparse data points, leading to poor generalization (the lowest F1 score). This is a clear demonstration of why Ensemble models are necessary for NLP tasks.',
        color: 'rose'
    },
];

// =============================
// UTILITIES: METRICS CALCULATION
// =============================
const calculateMetrics = (r: any) => {
    const total = r.tp + r.fp + r.fn + r.tn;
    const recPos = r.tp / (r.tp + r.fn);
    const recNeg = r.tn / (r.tn + r.fp);
    const precPos = r.tp / (r.tp + r.fp);
    const precNeg = r.tn / (r.tn + r.fn);
    const suppPos = r.tp + r.fn;
    const suppNeg = r.tn + r.fp;
    const recW = (recPos * suppPos + recNeg * suppNeg) / total;
    const precW = (precPos * suppPos + precNeg * suppNeg) / total;
    const f1Pos = 2 * precPos * recPos / (precPos + recPos);
    const f1Neg = 2 * precNeg * recNeg / (precNeg + recNeg);
    const f1W = (f1Pos * suppPos + f1Neg * suppNeg) / total;
    return { recW, precW, f1W, recPos, recNeg, precPos, precNeg, f1Pos, f1Neg, suppPos, suppNeg, total };
};

// const formatPct = (val: number) => `${(val * 100).toFixed(2)}%`;
// const formatTime = (s: number) => s < 1 ? `${s.toFixed(3)}s` : s > 60 ? `${(s / 60).toFixed(1)}min` : `${s.toFixed(2)}s`;

const WALK_STEPS = [
    { title: 'Confusion Matrix Basics', desc: 'The confusion matrix compares Predicted and Actual labels, providing the raw counts required to calculate all metrics.', detail: 'Rows = Actual. Cols = Predicted. Diagonal = Correct predictions.', highlight: null },
    { title: 'Diagonal (TP & TN)', desc: 'True Positives (TP) and True Negatives (TN) are the diagonal values — representing correctly classified samples.', detail: 'TP = Predicted Positive & Actual Positive. TN = Predicted Negative & Actual Negative.', highlight: 'diagonal' },
    { title: 'Support (Row Sums)', desc: 'Support = Row sum = The number of actual samples belonging to each class.', detail: 'Helps identify if the dataset is imbalanced.', highlight: 'rows' },
    { title: 'Recall (Sensitivity)', desc: 'Recall = TP / Support. Out of all truly Positive samples, what percentage did the model successfully catch?', detail: 'High Recall = Few False Negatives (FN). Crucial when the risk of missing a positive is high.', highlight: 'recall' },
    { title: 'Predicted Totals (Col Sums)', desc: 'The total number of times the model predicted a specific class, regardless of whether it was correct.', detail: 'Used as the denominator to calculate Precision.', highlight: 'cols' },
    { title: 'Precision', desc: 'Precision = TP / Predicted Total. Out of all the samples the model predicted as Positive, what percentage is actually correct?', detail: 'High Precision = Few False Positives (FP).', highlight: 'precision' },
    { title: 'F1-Score', desc: 'F1 = The harmonic mean of Precision and Recall.', detail: 'Penalizes models with a large disparity between Precision and Recall.', highlight: 'f1' },
    { title: 'Weighted Aggregation', desc: 'Weighted metrics are calculated by multiplying the metric of each class proportionally by its Support.', detail: 'Best suited for evaluating datasets with imbalanced labels.', highlight: 'weighted' },
];

// =============================
// MAIN COMPONENT
// =============================
export const Step2PipelineComparison = () => {
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [activeTab, setActiveTab] = useState<'bars' | 'cm' | 'walkthrough'>('bars');
    const [walkStep, setWalkStep] = useState(0);

    const pipe = RAW_PIPELINES[selectedIdx];
    const metrics = useMemo(() => calculateMetrics(pipe), [pipe]);

    // Rank pipelines for the table
    const rankedPipelines = useMemo(() => {
        return [...RAW_PIPELINES].map((r, i) => ({ ...r, idx: i, m: calculateMetrics(r) }))
            .sort((a, b) => b.m.f1W - a.m.f1W);
    }, []);

    const flowSteps = [
        { label: 'Text Input', color: 'bg-slate-500' },
        { label: pipe.extractor, color: 'bg-indigo-500' },
        { label: pipe.reducer === 'None' ? 'No Reduction' : `${pipe.reducer} (k=2000)`, color: 'bg-purple-500' },
        { label: pipe.classifier, color: `bg-${pipe.color}-500` },
        { label: 'Prediction', color: 'bg-rose-500' }
    ];

    // Helper Highlight for Walkthrough
    const getCellHighlight = (cellType: string) => {
        if (activeTab !== 'walkthrough') return '';
        const hl = WALK_STEPS[walkStep].highlight;
        if (!hl) return '';
        
        if (hl === 'diagonal' && (cellType === 'tp' || cellType === 'tn')) return 'ring-2 ring-emerald-500 ring-offset-2 z-10';
        if (hl === 'rows' && ['tn', 'fp', 'fn', 'tp'].includes(cellType)) return 'ring-2 ring-blue-400 border-dashed z-10';
        if (hl === 'cols' && ['tn', 'fn'].includes(cellType)) return 'ring-2 ring-amber-500 border-dashed z-10';
        if (hl === 'cols' && ['tp', 'fp'].includes(cellType)) return 'ring-2 ring-amber-500 border-dashed z-10';
        return 'opacity-40';
    };

    return (
        <section id="pipeline-comparison" className="mb-12 scroll-mt-24">
            {/* Header */}
            <div className="mb-6 flex items-center gap-3 flex-wrap">
                <GitMerge size={24} className="text-on-surface" />
                <h2 className="text-xl font-bold text-on-surface tracking-tight">Step 2 — Pipeline Comparison</h2>
                <div className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 ml-auto">
                    <Database size={14} /> Amazon Reviews · 500k samples
                </div>
            </div>
            <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
                Every pipeline follows the exact same architecture: <strong className="text-on-surface">Feature Extraction → Dim. Reduction → Classifier</strong>. 
                Below is a detailed analysis of the processing flow, configurations, and how advanced metrics (Weighted Metrics) are calculated.
            </p>

            {/* Pipeline Selector (Pills) */}
            <div className="mb-8">
                <div className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60 mb-3">Select Pipeline</div>
                <div className="flex flex-wrap gap-2">
                    {RAW_PIPELINES.map((p, i) => (
                        <button
                            key={p.id}
                            onClick={() => { setSelectedIdx(i); setWalkStep(0); setActiveTab('bars'); }}
                            className={`px-4 py-2 rounded-full text-xs font-bold border transition-all flex items-center gap-2 ${
                                selectedIdx === i 
                                ? "bg-on-surface text-white border-on-surface shadow-md" 
                                : "bg-white text-on-surface-variant border-outline-variant/30 hover:bg-surface-container hover:border-outline-variant/50"
                            }`}
                        >
                            <div className={`w-2 h-2 rounded-full bg-${p.color}-500`} />
                            {p.extractor} → {p.reducer !== 'None' && `${p.reducer} → `}{p.classifier}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* LEFT COL: Flow + Config */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                    {/* Flow Diagram */}
                    <div className="bg-white rounded-3xl p-6 border border-outline-variant/10 shadow-sm flex-1">
                        <div className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60 mb-6 flex items-center gap-2">
                            <GitMerge size={14} /> Processing Flow
                        </div>
                        <div className="flex flex-col gap-2 relative">
                            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-outline-variant/20" />
                            {flowSteps.map((step, i) => (
                                <motion.div 
                                    key={`${pipe.id}-${i}`}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-4 relative z-10"
                                >
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xs font-black shadow-md ${step.color}`}>
                                        {i + 1}
                                    </div>
                                    <div className="flex-1 bg-surface-container-low px-4 py-3 rounded-2xl border border-outline-variant/5 text-sm font-bold text-on-surface">
                                        {step.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Config & Rationale */}
                    <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-sm border border-slate-800 flex-1">
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                            <Settings size={14} /> Configuration
                        </div>
                        <div className="space-y-3 mb-6">
                            {Object.entries(pipe.config).map(([k, v]) => (
                                <div key={k} className="flex justify-between items-start gap-4 border-b border-slate-800 pb-2 last:border-0">
                                    <span className="text-xs text-slate-400 whitespace-nowrap">{k}</span>
                                    <span className="text-xs font-mono text-emerald-400 text-right">{v}</span>
                                </div>
                            ))}
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                            <Lightbulb size={14} /> Rationale
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed opacity-90">{pipe.rationale}</p>
                    </div>
                </div>

                {/* RIGHT COL: Metrics & Walkthrough */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                    <div className="bg-white rounded-3xl p-6 border border-outline-variant/10 shadow-sm flex-1 flex flex-col">
                        
                        {/* Tabs */}
                        <div className="flex gap-2 mb-6 border-b border-outline-variant/10 pb-4">
                            {[
                                { id: 'bars', label: 'Metric Bars', icon: BarChart3 },
                                { id: 'cm', label: 'Confusion Matrix', icon: Grid3X3 },
                                { id: 'walkthrough', label: 'Interactive Walkthrough', icon: BookOpen }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                                        activeTab === tab.id 
                                        ? "bg-primary text-white" 
                                        : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                                    }`}
                                >
                                    <tab.icon size={14} /> {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* TAB CONTENT: BARS */}
                        {activeTab === 'bars' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <div className="bg-surface-container-low p-4 rounded-2xl text-center">
                                        <div className="text-2xl font-black text-on-surface">{formatPct(pipe.accuracy)}</div>
                                        <div className="text-[10px] uppercase font-bold text-on-surface-variant opacity-60">Accuracy</div>
                                    </div>
                                    <div className="bg-primary/5 border border-primary/20 p-4 rounded-2xl text-center">
                                        <div className="text-2xl font-black text-primary">{formatPct(metrics.f1W)}</div>
                                        <div className="text-[10px] uppercase font-bold text-primary opacity-80">F1 Weighted</div>
                                    </div>
                                    <div className="bg-surface-container-low p-4 rounded-2xl text-center">
                                        <div className="text-2xl font-black text-on-surface">{formatTime(pipe.train_time)}</div>
                                        <div className="text-[10px] uppercase font-bold text-on-surface-variant opacity-60">Train Time</div>
                                    </div>
                                </div>

                                {[
                                    { l: 'Accuracy', v: pipe.accuracy, w: true },
                                    { l: 'Precision (positive)', v: metrics.precPos, w: false },
                                    { l: 'Precision (weighted)', v: metrics.precW, w: true },
                                    { l: 'Recall (positive)', v: metrics.recPos, w: false },
                                    { l: 'Recall (weighted)', v: metrics.recW, w: true },
                                    { l: 'F1-Score (positive)', v: metrics.f1Pos, w: false },
                                    { l: 'F1-Score (weighted)', v: metrics.f1W, w: true },
                                ].map((m, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between text-xs mb-1.5 font-bold">
                                            <span className="text-on-surface-variant">
                                                {m.l} {m.w && <span className="text-[9px] bg-slate-100 px-1.5 py-0.5 rounded ml-1 text-slate-500 uppercase">weighted</span>}
                                            </span>
                                            <span className="text-on-surface">{formatPct(m.v)}</span>
                                        </div>
                                        <div className="h-2 bg-surface-container-high rounded-full overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }} 
                                                animate={{ width: `${m.v * 100}%` }} 
                                                transition={{ duration: 0.5, delay: i * 0.05 }}
                                                className={`h-full bg-${pipe.color}-500 rounded-full`} 
                                            />
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {/* TAB CONTENT: CM & WALKTHROUGH */}
                        {(activeTab === 'cm' || activeTab === 'walkthrough') && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full">
                                <div className="overflow-x-auto mx-auto mb-6">
                                    <table className="border-separate border-spacing-2">
                                        <thead>
                                            <tr>
                                                <td />
                                                <th className="text-[10px] font-black uppercase text-on-surface-variant opacity-60 pb-2">Pred Negative</th>
                                                <th className="text-[10px] font-black uppercase text-on-surface-variant opacity-60 pb-2">Pred Positive</th>
                                                <th className="text-[10px] font-black uppercase text-primary pb-2 pl-4">Support</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="text-[10px] font-black uppercase text-on-surface-variant opacity-60 text-right pr-2">Actual Neg</td>
                                                <td>
                                                    <div className={`w-20 h-20 rounded-2xl bg-emerald-50 text-emerald-700 flex flex-col items-center justify-center transition-all ${getCellHighlight('tn')}`}>
                                                        <span className="text-lg font-black">{pipe.tn.toLocaleString()}</span>
                                                        <span className="text-[10px] font-bold opacity-60">TN</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className={`w-20 h-20 rounded-2xl bg-rose-50 text-rose-700 flex flex-col items-center justify-center transition-all ${getCellHighlight('fp')}`}>
                                                        <span className="text-lg font-black">{pipe.fp.toLocaleString()}</span>
                                                        <span className="text-[10px] font-bold opacity-60">FP</span>
                                                    </div>
                                                </td>
                                                <td className="pl-4 font-mono text-sm font-bold opacity-80 transition-all">{metrics.suppNeg.toLocaleString()}</td>
                                                <td className={`pl-4 font-mono text-xs font-bold text-blue-600 transition-all ${activeTab==='walkthrough' && walkStep >=3 ? 'opacity-100':'opacity-0'}`}>
                                                    Rec: {formatPct(metrics.recNeg)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-[10px] font-black uppercase text-on-surface-variant opacity-60 text-right pr-2">Actual Pos</td>
                                                <td>
                                                    <div className={`w-20 h-20 rounded-2xl bg-rose-50 text-rose-700 flex flex-col items-center justify-center transition-all ${getCellHighlight('fn')}`}>
                                                        <span className="text-lg font-black">{pipe.fn.toLocaleString()}</span>
                                                        <span className="text-[10px] font-bold opacity-60">FN</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className={`w-20 h-20 rounded-2xl bg-emerald-50 text-emerald-700 flex flex-col items-center justify-center transition-all ${getCellHighlight('tp')}`}>
                                                        <span className="text-lg font-black">{pipe.tp.toLocaleString()}</span>
                                                        <span className="text-[10px] font-bold opacity-60">TP</span>
                                                    </div>
                                                </td>
                                                <td className="pl-4 font-mono text-sm font-bold opacity-80 transition-all">{metrics.suppPos.toLocaleString()}</td>
                                                <td className={`pl-4 font-mono text-xs font-bold text-blue-600 transition-all ${activeTab==='walkthrough' && walkStep >=3 ? 'opacity-100':'opacity-0'}`}>
                                                    Rec: {formatPct(metrics.recPos)}
                                                </td>
                                            </tr>
                                            <tr className={`${activeTab==='walkthrough' && walkStep >=4 ? 'opacity-100':'opacity-0'} transition-opacity`}>
                                                <td className="text-[10px] font-black uppercase text-primary text-right pr-2 pt-2">Predicted</td>
                                                <td className="text-center font-mono text-sm font-bold pt-2 opacity-80">{(pipe.tn+pipe.fn).toLocaleString()}</td>
                                                <td className="text-center font-mono text-sm font-bold pt-2 opacity-80">{(pipe.tp+pipe.fp).toLocaleString()}</td>
                                                <td className="pl-4 font-mono text-sm font-black pt-2 text-primary">{metrics.total.toLocaleString()}</td>
                                            </tr>
                                            <tr className={`${activeTab==='walkthrough' && walkStep >=5 ? 'opacity-100':'opacity-0'} transition-opacity`}>
                                                <td className="text-[10px] font-black uppercase text-amber-600 text-right pr-2 pt-2">Precision</td>
                                                <td className="text-center font-mono text-xs font-bold pt-2 text-amber-600">{formatPct(metrics.precNeg)}</td>
                                                <td className="text-center font-mono text-xs font-bold pt-2 text-amber-600">{formatPct(metrics.precPos)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                {activeTab === 'walkthrough' && (
                                    <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 mt-auto">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black">
                                                {walkStep + 1}
                                            </span>
                                            <h4 className="font-bold text-sm text-blue-900">{WALK_STEPS[walkStep].title}</h4>
                                        </div>
                                        <p className="text-xs text-blue-800/80 mb-2">{WALK_STEPS[walkStep].desc}</p>
                                        <p className="text-[11px] text-blue-600/70 italic bg-blue-100/50 p-2 rounded-lg">{WALK_STEPS[walkStep].detail}</p>
                                        
                                        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-blue-200">
                                            <button 
                                                onClick={() => setWalkStep(w => Math.max(0, w - 1))}
                                                disabled={walkStep === 0}
                                                className="p-1.5 rounded-lg hover:bg-blue-200 disabled:opacity-30 transition-colors text-blue-700"
                                            >
                                                <ChevronLeft size={18} />
                                            </button>
                                            <div className="flex-1 flex gap-1 justify-center">
                                                {WALK_STEPS.map((_, i) => (
                                                    <div key={i} className={`h-1.5 rounded-full transition-all ${i === walkStep ? 'w-4 bg-blue-600' : 'w-1.5 bg-blue-200'}`} />
                                                ))}
                                            </div>
                                            <button 
                                                onClick={() => setWalkStep(w => Math.min(WALK_STEPS.length - 1, w + 1))}
                                                disabled={walkStep === WALK_STEPS.length - 1}
                                                className="p-1.5 rounded-lg hover:bg-blue-200 disabled:opacity-30 transition-colors text-blue-700"
                                            >
                                                <ChevronRight size={18} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/* FULL COMPARISON TABLE */}
            <div className="bg-white rounded-3xl p-6 border border-outline-variant/10 shadow-sm mt-6 overflow-hidden">
                <div className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60 mb-6 flex items-center gap-2">
                    <Table size={14} /> All Pipelines Ranked (by F1 Weighted)
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="border-b border-outline-variant/10">
                                {['Rank', 'Pipeline', 'Accuracy', 'Prec (W)', 'Recall (W)', 'F1 (W)', 'F1 (Pos)', 'Train Time'].map(h => (
                                    <th key={h} className="pb-3 text-[10px] font-black uppercase text-on-surface-variant opacity-60">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/5">
                            {rankedPipelines.map((r, rank) => {
                                const isCur = r.idx === selectedIdx;
                                return (
                                    <tr 
                                        key={r.id} 
                                        onClick={() => { setSelectedIdx(r.idx); setActiveTab('bars'); }}
                                        className={`cursor-pointer transition-colors hover:bg-surface-container-low ${isCur ? 'bg-primary/5' : ''}`}
                                    >
                                        <td className="py-3 font-bold text-sm">
                                            {rank === 0 ? '🥇 1' : rank === 1 ? '🥈 2' : rank === 2 ? '🥉 3' : rank + 1}
                                        </td>
                                        <td className="py-3 text-xs font-bold flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full bg-${r.color}-500`} />
                                            {r.extractor} → {r.reducer !== 'None' ? `${r.reducer} → ` : ''}{r.classifier}
                                            {isCur && <span className="bg-primary/10 text-primary text-[9px] px-1.5 py-0.5 rounded uppercase">Viewing</span>}
                                        </td>
                                        <td className={`py-3 text-xs font-mono ${rank===0 ? 'text-emerald-600 font-bold' : ''}`}>{formatPct(r.accuracy)}</td>
                                        <td className="py-3 text-xs font-mono">{formatPct(r.m.precW)}</td>
                                        <td className="py-3 text-xs font-mono">{formatPct(r.m.recW)}</td>
                                        <td className={`py-3 text-xs font-mono ${rank===0 ? 'text-primary font-bold' : ''}`}>{formatPct(r.m.f1W)}</td>
                                        <td className="py-3 text-xs font-mono">{formatPct(r.m.f1Pos)}</td>
                                        <td className={`py-3 text-xs font-mono ${r.train_time < 1 ? 'text-emerald-600' : r.train_time > 60 ? 'text-rose-600' : ''}`}>
                                            {formatTime(r.train_time)}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

// =============================
// DATA: DEEP LEARNING RESULTS (All 8 Models)
// =============================
const DL_MODELS = [
    {
        id: "bert_base_pooler",
        name: "BERT-base + Pooler",
        base_model: "BERT-base-uncased",
        pooling: "Pooler Output (Dense + Tanh)",
        accuracy: 93.313,
        precision: 93.651,
        recall: 92.926,
        f1: 93.287,
        train_time: 1247.02,
        cm: [[46850, 3150], [3537, 46463]],
        rationale: "Utilizes the [CLS] token representation further processed by a Linear layer and Tanh activation (pre-trained on Next Sentence Prediction). This provides the most refined sentence-level embedding, yielding the highest overall performance.",
        color: "emerald",
        isBest: true
    },
    {
        id: "bert_base_mean",
        name: "BERT-base + Mean",
        base_model: "BERT-base-uncased",
        pooling: "Mean Pooling",
        accuracy: 93.268,
        precision: 93.149,
        recall: 93.406,
        f1: 93.277,
        train_time: 1254.09,
        cm: [[46565, 3435], [3297, 46703]],
        rationale: "Averages the hidden states of all tokens in the sequence. Excellent at capturing the global contextual meaning of the review rather than relying solely on the starting token. Achieves the highest Recall.",
        color: "blue",
        isBest: false
    },
    {
        id: "bert_base_cls",
        name: "BERT-base + [CLS]",
        base_model: "BERT-base-uncased",
        pooling: "Raw [CLS] Token",
        accuracy: 93.148,
        precision: 93.226,
        recall: 93.058,
        f1: 93.142,
        train_time: 1236.39,
        cm: [[46619, 3381], [3471, 46529]],
        rationale: "Takes the raw hidden state of the first token ([CLS]). While extremely strong due to BERT's bidirectional attention, it slightly trails behind Mean Pooling and Pooler Output on this specific dataset.",
        color: "indigo",
        isBest: false
    },
    {
        id: "distilbert_mean",
        name: "DistilBERT + Mean",
        base_model: "DistilBERT",
        pooling: "Mean Pooling",
        accuracy: 83.853,
        precision: 84.740,
        recall: 82.576,
        f1: 83.644,
        train_time: 1253.03,
        cm: [[42565, 7435], [8712, 41288]],
        rationale: "Applying Mean Pooling over DistilBERT's outputs provides a slight improvement over the [CLS] token, capturing better global context. However, it still falls short of our SVM baseline.",
        color: "cyan",
        isBest: false
    },
    {
        id: "distilbert_cls",
        name: "DistilBERT + [CLS]",
        base_model: "DistilBERT",
        pooling: "Raw [CLS] Token",
        accuracy: 83.827,
        precision: 85.223,
        recall: 81.846,
        f1: 83.500,
        train_time: 1245.25,
        cm: [[42904, 7096], [9077, 40923]],
        rationale: "A distilled, lighter version of BERT. Unexpectedly, it underperformed compared to our best Traditional ML models (88.5%), indicating that the reduced parameter count struggles with nuances without extensive tuning.",
        color: "rose",
        isBest: false
    },
    {
        id: "tinybert_mean",
        name: "TinyBERT + Mean",
        base_model: "TinyBERT",
        pooling: "Mean Pooling",
        accuracy: 83.626,
        precision: 85.945,
        recall: 80.400,
        f1: 83.080,
        train_time: 90.36,
        cm: [[43426, 6574], [9800, 40200]],
        rationale: "Using Mean Pooling yields the best precision among the TinyBERT family. The lightning-fast ~90s training time (14x faster than BERT-base) makes it highly efficient for edge deployments.",
        color: "amber",
        isBest: false
    },
    {
        id: "tinybert_cls",
        name: "TinyBERT + [CLS]",
        base_model: "TinyBERT",
        pooling: "Raw [CLS] Token",
        accuracy: 83.561,
        precision: 85.274,
        recall: 81.132,
        f1: 83.151,
        train_time: 89.65,
        cm: [[42995, 7005], [9434, 40566]],
        rationale: "TinyBERT offers extreme compression. The trade-off is a lower accuracy (~83.5%), but it serves as an excellent choice for ultra-low latency environments where speed outprioritizes peak accuracy.",
        color: "orange",
        isBest: false
    },
    {
        id: "tinybert_pooler",
        name: "TinyBERT + Pooler",
        base_model: "TinyBERT",
        pooling: "Pooler Output",
        accuracy: 83.489,
        precision: 85.203,
        recall: 81.054,
        f1: 83.076,
        train_time: 89.93,
        cm: [[42962, 7038], [9473, 40527]],
        rationale: "Adding the Pooler Output to TinyBERT provides balanced metrics but doesn't significantly outperform simple Mean Pooling. It maintains the incredible inference and training speed of the Tiny architecture.",
        color: "yellow",
        isBest: false
    }
];

// Formatting helpers
const formatPct = (val: number) => `${val.toFixed(2)}%`;
const formatTime = (s: number) => s < 120 ? `${s.toFixed(1)} s` : `${(s / 60).toFixed(1)} min`;

export const Step3FineTuning = () => {
    const [selectedId, setSelectedId] = useState<string>("bert_base_pooler");
    const activeModel = useMemo(() => DL_MODELS.find(m => m.id === selectedId)!, [selectedId]);

    // Comparison data for Plotly (Using short names for X-axis to prevent overlap)
    const chartLabels = DL_MODELS.map(m => m.name.replace(" + ", "<br>"));
    const chartAcc = DL_MODELS.map(m => m.accuracy);
    const chartF1 = DL_MODELS.map(m => m.f1);
    const chartColors = DL_MODELS.map(m => m.isBest ? "#10b981" : "#6366f1");

    return (
        <section id="fine-tuning" className="mb-12 scroll-mt-24">
            
            {/* Header */}
            <div className="mb-6 flex items-center gap-3 flex-wrap">
                <BrainCircuit size={24} className="text-on-surface" />
                <h2 className="text-xl font-bold text-on-surface tracking-tight">Step 3 — Transformer Fine-Tuning & Architecture</h2>
            </div>
            <p className="text-sm text-on-surface-variant mb-10 leading-relaxed">
                Evaluating state-of-the-art Deep Learning models (BERT architectures) and pooling strategies. We compare full-scale BERT against distilled and highly compressed versions (TinyBERT) to analyze the performance-to-compute trade-off.
            </p>

            {/* KPI ROW: ML vs DL Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-[1.5rem] border border-outline-variant/10 text-center shadow-sm">
                    <div className="flex justify-center mb-3 text-slate-400"><Cpu size={24} /></div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 mb-2">Best Traditional ML</div>
                    <div className="text-3xl font-bold text-slate-700">88.52%</div>
                    <div className="text-xs text-on-surface-variant mt-1 opacity-60">SVM (LinearSVC)</div>
                </div>
                
                <div className="bg-slate-900 p-6 rounded-[1.5rem] text-center shadow-2xl shadow-primary/20 scale-105 relative overflow-hidden border border-slate-700">
                    <div className="absolute -right-4 -bottom-4 text-emerald-500/20"><Network size={100} /></div>
                    <div className="flex justify-center mb-3 text-emerald-400 relative z-10"><BrainCircuit size={24} /></div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-2 relative z-10">Best Transformer</div>
                    <div className="text-3xl font-bold text-white relative z-10">93.31%</div>
                    <div className="text-xs text-emerald-400 mt-1 relative z-10">BERT-base (Pooler Output)</div>
                </div>
                
                <div className="bg-emerald-50 p-6 rounded-[1.5rem] border border-emerald-200 text-center shadow-sm flex flex-col justify-center">
                    <div className="flex justify-center mb-3 text-emerald-600"><TrendingUp size={24} /></div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-emerald-700 opacity-70 mb-2">Absolute Improvement</div>
                    <div className="text-3xl font-bold text-emerald-600">+4.79%</div>
                    <div className="text-xs text-emerald-700 mt-1 opacity-70">Significant leap in Accuracy</div>
                </div>
            </div>

            {/* --- RESTRUCTURED LAYOUT FOR STEP 3 --- */}
            <div className="flex flex-col gap-8 mb-10">
                
                {/* TOP ROW: Strategy Selector & Selected Details Side-by-Side */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* LEFT: Pills Selector Grid (Span 5) */}
                    <div className="lg:col-span-5 bg-surface-container-low rounded-[2rem] p-6 border border-outline-variant/10 shadow-sm flex flex-col">
                        <div className="text-xs font-black uppercase tracking-widest text-on-surface-variant opacity-60 mb-5 text-center">Inspect Strategy</div>
                        <div className="grid grid-cols-2 gap-3">
                            {DL_MODELS.map(m => (
                                <button
                                    key={m.id}
                                    onClick={() => setSelectedId(m.id)}
                                    className={`px-4 py-4 rounded-2xl text-xs font-bold text-center transition-all border ${
                                        selectedId === m.id 
                                        ? `bg-white border-${m.color}-500 shadow-md ring-2 ring-${m.color}-500/50 text-slate-800 scale-[1.02]` 
                                        : "bg-transparent border-outline-variant/20 text-on-surface-variant hover:bg-white hover:border-outline-variant/40"
                                    }`}
                                >
                                    <div className="truncate text-sm font-black">{m.name.split('+')[0].trim()}</div>
                                    <div className={`mt-1 truncate text-xs ${selectedId === m.id ? `text-${m.color}-600 font-black` : 'opacity-60 font-medium'}`}>
                                        + {m.name.split('+')[1]?.trim()}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Selected Model Details (Span 7) */}
                    <div className="lg:col-span-7">
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={selectedId}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-white rounded-[2rem] p-8 border border-outline-variant/10 shadow-sm h-full flex flex-col"
                            >
                                <div className="mb-6 flex justify-between items-start">
                                    <div>
                                        <h4 className="font-black text-slate-800 text-xl leading-tight flex items-center gap-3">
                                            {activeModel.name}
                                            {activeModel.isBest && <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest">Top</span>}
                                        </h4>
                                        <div className="flex items-center gap-3 mt-3 flex-wrap">
                                            <span className="text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full border border-slate-200">Base: <span className="font-bold">{activeModel.base_model}</span></span>
                                            <span className="text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full border border-slate-200 flex items-center gap-1.5">
                                                <Clock size={14} /> <span className="font-bold">{formatTime(activeModel.train_time)}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className={`bg-${activeModel.color}-50 p-6 rounded-3xl border border-${activeModel.color}-100 mb-8`}>
                                    <div className={`text-xs font-black uppercase tracking-widest text-${activeModel.color}-700 opacity-90 mb-3 flex items-center gap-2`}>
                                        <Lightbulb size={16} /> Strategy Rationale
                                    </div>
                                    <p className={`text-sm text-${activeModel.color}-900/90 leading-relaxed`}>{activeModel.rationale}</p>
                                </div>

                                <div className="mt-auto">
                                    <div className="text-xs font-black uppercase tracking-widest text-on-surface-variant opacity-60 mb-4 text-center">Confusion Matrix</div>
                                    <div className="grid grid-cols-4 gap-3 w-full">
                                        {[
                                            { label: 'True Neg', val: activeModel.cm[0][0], color: 'bg-emerald-50 text-emerald-700 border-emerald-100', short: 'TN' },
                                            { label: 'False Pos', val: activeModel.cm[0][1], color: 'bg-rose-50 text-rose-700 border-rose-100', short: 'FP' },
                                            { label: 'False Neg', val: activeModel.cm[1][0], color: 'bg-rose-50 text-rose-700 border-rose-100', short: 'FN' },
                                            { label: 'True Pos', val: activeModel.cm[1][1], color: 'bg-emerald-50 text-emerald-700 border-emerald-100', short: 'TP' },
                                        ].map((cell, idx) => (
                                            <div key={idx} className={`${cell.color} p-4 rounded-2xl flex flex-col items-center justify-center border shadow-sm`}>
                                                <span className="text-xl font-black">{cell.val.toLocaleString()}</span>
                                                <span className="text-[9px] font-bold opacity-70 mt-1 uppercase tracking-tighter">{cell.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* BOTTOM ROW: Model Architecture Performance Chart (Full Width) */}
                <div className="bg-white rounded-[2rem] p-8 lg:p-10 border border-outline-variant/10 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-on-surface uppercase tracking-tight">Model Architecture Performance Comparison</h3>
                            <p className="text-sm text-on-surface-variant opacity-60 mt-1">Holistic view of Accuracy and F1-Score metrics across all 8 tested configurations.</p>
                        </div>
                    </div>

                    <div className="h-[400px] w-full">
                        <Plot
                            data={[
                                {
                                    x: DL_MODELS.map(m => m.name.replace(" + ", "<br>")),
                                    y: chartAcc,
                                    name: 'Accuracy',
                                    type: 'bar',
                                    marker: { color: chartColors, opacity: 0.9 },
                                    text: chartAcc.map(v => `${v.toFixed(2)}%`),
                                    textposition: 'outside',
                                    textfont: { size: 13, color: '#333', weight: 'bold' }
                                },
                                {
                                    x: DL_MODELS.map(m => m.name.replace(" + ", "<br>")),
                                    y: chartF1,
                                    name: 'F1-Score',
                                    type: 'bar',
                                    marker: { color: '#cbd5e1' },
                                    text: chartF1.map(v => `${v.toFixed(2)}%`),
                                    textposition: 'outside',
                                    textfont: { size: 13, color: '#64748b' }
                                }
                            ]}
                            layout={{
                                barmode: 'group',
                                autosize: true,
                                margin: { t: 40, r: 20, b: 80, l: 50 },
                                xaxis: { tickfont: { size: 11 }, tickangle: -20 },
                                yaxis: { range: [78, 96], tickfont: { size: 12 }, title: 'Score (%)' },
                                legend: { orientation: 'h', y: -0.3, x: 0.5, xanchor: 'center', font: { size: 13 } },
                                plot_bgcolor: "transparent",
                                paper_bgcolor: "transparent",
                                bargap: 0.15,
                                bargroupgap: 0.05
                            }}
                            useResizeHandler={true}
                            style={{ width: "100%", height: "100%" }}
                            config={{ displayModeBar: false, responsive: true }}
                        />
                    </div>
                </div>

            </div>

            {/* FULL COMPARISON TABLE */}
            <div className="bg-white rounded-[2rem] p-6 lg:p-8 border border-outline-variant/10 shadow-sm mb-10 overflow-hidden">
                <div className="flex items-center gap-2 mb-6">
                    <Table size={16} className="text-slate-400" />
                    <h3 className="text-sm font-bold text-slate-700 uppercase tracking-tight">Full Architecture Comparison</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className="bg-slate-50 border-y border-slate-200">
                                {['Base Model', 'Pooling Strategy', 'Accuracy', 'Precision', 'Recall', 'F1-Score', 'Train Time'].map(h => (
                                    <th key={h} className="py-3 px-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {DL_MODELS.sort((a, b) => b.accuracy - a.accuracy).map((r, rank) => (
                                <tr key={r.id} className={`transition-colors hover:bg-slate-50/50 ${r.isBest ? 'bg-emerald-50/30' : ''}`}>
                                    <td className="py-4 px-4 text-xs font-bold text-slate-700 flex items-center gap-2 whitespace-nowrap">
                                        {rank === 0 && <span className="text-emerald-500"><ShieldCheck size={16}/></span>}
                                        {r.base_model}
                                    </td>
                                    <td className="py-4 px-4 text-xs font-medium text-slate-600">{r.pooling}</td>
                                    <td className={`py-4 px-4 text-sm font-mono ${r.isBest ? 'text-emerald-600 font-bold' : 'text-slate-700'}`}>{formatPct(r.accuracy)}</td>
                                    <td className="py-4 px-4 text-sm font-mono text-slate-600">{formatPct(r.precision)}</td>
                                    <td className="py-4 px-4 text-sm font-mono text-slate-600">{formatPct(r.recall)}</td>
                                    <td className={`py-4 px-4 text-sm font-mono ${r.isBest ? 'text-emerald-600 font-bold' : 'text-slate-700'}`}>{formatPct(r.f1)}</td>
                                    <td className="py-4 px-4 text-xs font-mono text-slate-500 whitespace-nowrap">{formatTime(r.train_time)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* FINAL EXECUTIVE INSIGHT */}
            <div className="bg-[#111827] rounded-[2rem] p-8 lg:p-10 border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
                
                <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-6 relative z-10">
                    <Sparkles size={24} className="text-indigo-400" />
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-300">Executive Summary & Recommendations</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-3xl p-6 hover:bg-slate-800 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border bg-emerald-500/10 text-emerald-400 border-emerald-500/20 flex items-center gap-1.5">
                                <CheckCircle2 size={12}/> Peak Performance Pick
                            </span>
                        </div>
                        <h6 className="font-bold text-white text-lg mb-2">BERT-base + Pooler Output</h6>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Delivers the definitive peak performance (<strong className="text-white">93.31% Accuracy</strong>). By utilizing the dense layer pre-trained on Next Sentence Prediction, it captures the most accurate semantic representation for classification. This is the optimal model for deployment when maximum accuracy is the priority and compute resources are available.
                        </p>
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-3xl p-6 hover:bg-slate-800 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border bg-amber-500/10 text-amber-400 border-amber-500/20 flex items-center gap-1.5">
                                <Zap size={12}/> Efficiency Trade-off
                            </span>
                        </div>
                        <h6 className="font-bold text-white text-lg mb-2">TinyBERT Architecture</h6>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            While full-scale BERT takes <strong className="text-white">~20 minutes</strong> to train, TinyBERT accomplishes this in just <strong className="text-white">~90 seconds (14x faster)</strong>. Though its accuracy (~83.6%) falls short of our best traditional SVM (~88.5%), its massive compression ratio makes TinyBERT an excellent candidate for highly resource-constrained edge deployments where traditional TF-IDF sparse matrices are too heavy.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

// =============================
// MAIN EXPORT
// =============================
export default function TextML() {
    const steps = [
        { id: 1, anchor: "model-results", label: "Model Results", icon: BarChart3, desc: "Performance metrics & confusion matrices" },
        { id: 2, anchor: "pipeline-comparison", label: "Pipeline Comparison", icon: GitMerge, desc: "Architecture & preprocessing flow" },
        { id: 3, anchor: "fine-tuning", label: "Fine-Tuning", icon: FlaskConical, desc: "GridSearchCV optimization" },
    ];

    return (
        <div className="space-y-4">
            {/* Step Navigator */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                {steps.map((step) => (
                    <a key={step.id}
                        href={`#${step.anchor}`}
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(step.anchor)?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="group bg-white hover:bg-primary/5 rounded-[1.5rem] p-6 border border-outline-variant/10 shadow-sm hover:shadow-md hover:border-primary/20 transition-all cursor-pointer flex items-center gap-5 no-underline"
                    >
                        <div className="w-12 h-12 rounded-xl bg-surface-container-high text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm shrink-0">
                            <step.icon size={22} />
                        </div>
                        <div className="min-w-0">
                            <div className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mb-0.5">Step {step.id}</div>
                            <div className="font-bold text-on-surface group-hover:text-primary transition-colors">{step.label}</div>
                            <div className="text-xs text-on-surface-variant opacity-60">{step.desc}</div>
                        </div>
                        <ArrowRight size={16} className="ml-auto text-outline-variant/30 group-hover:text-primary transition-colors shrink-0" />
                    </a>
                ))}
            </div>

            {/* Overview KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {[
                    { label: "Models Tested", value: "8", icon: Brain },
                    { label: "Best Accuracy", value: "88.46%", icon: Trophy },
                    { label: "Best F1-Score", value: "88.51%", icon: Target },
                    { label: "Fastest Train", value: "0.13s", icon: Zap },
                ].map((kpi, i) => (
                    <div key={i} className="bg-white p-6 rounded-[1.5rem] border border-outline-variant/10 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                        <div className="absolute -right-3 -bottom-3 opacity-5 group-hover:opacity-10 transition-opacity text-primary">
                            <kpi.icon size={80} />
                        </div>
                        <div className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 mb-2">{kpi.label}</div>
                        <div className="text-2xl font-bold text-on-surface">{kpi.value}</div>
                    </div>
                ))}
            </div>

            {/* 3 Steps */}
            <Step1ModelResults />
            <Step2PipelineComparison />
            <Step3FineTuning />
        </div>
    );
}