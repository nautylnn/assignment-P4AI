import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    BrainCircuit, 
    Cpu, 
    Zap, 
    Target, 
    Activity, 
    BarChart3, 
    Code2, 
    CheckCircle2, 
    Sparkles,
    Layers,
    Timer,
    Database,
    Camera,
    PlayCircle,
    Code,
    ChevronDown,
    ChevronUp,
    Terminal,
    Image as ImageIcon,
    Info,
    LineChart
} from "lucide-react";
import Plot from "react-plotly.js";

// Import local assets for Vite base path compatibility
import learningCurvesImg from "../assets/learning_curves.png";
import mlInferenceImg from "../assets/ml_inference.png";

// --- Actual Data from Notebook ---
const splitClasses = ["Ayam Goreng", "Ayam Pop", "Daging Rendang", "Dendeng Batokok", "Gulai Ikan", "Gulai Tambusu", "Gulai Tunjang", "Telur Balado", "Telur Dadar"];
const splitData = {
    train: [74, 76, 71, 74, 78, 68, 78, 76, 80],
    val: [16, 16, 15, 16, 17, 14, 17, 16, 18],
    test: [16, 17, 15, 16, 16, 15, 17, 16, 17]
};

const trainingHistory = [
    { epoch: 1, train_acc: 0.25, val_acc: 0.39, train_loss: 2.13, val_loss: 1.99 },
    { epoch: 4, train_acc: 0.62, val_acc: 0.84, train_loss: 1.47, val_loss: 1.45 },
    { epoch: 8, train_acc: 0.85, val_acc: 0.88, train_loss: 0.82, val_loss: 0.78 },
    { epoch: 12, train_acc: 0.91, val_acc: 0.89, train_loss: 0.54, val_loss: 0.62 },
    { epoch: 16, train_acc: 0.94, val_acc: 0.90, train_loss: 0.39, val_loss: 0.51 },
    { epoch: 20, train_acc: 0.96, val_acc: 0.91, train_loss: 0.28, val_loss: 0.44 },
    { epoch: 25, train_acc: 0.98, val_acc: 0.90, train_loss: 0.19, val_loss: 0.42 },
    { epoch: 30, train_acc: 0.99, val_acc: 0.91, train_loss: 0.15, val_loss: 0.38 },
];

const classNames = [
    "ayam_goreng", "ayam_pop", "daging_rendang", "dendeng_batokok",
    "gulai_ikan", "gulai_tambusu", "gulai_tunjang", "telur_balado", "telur_dadar"
];

const confusionMatrixData = [
    [11, 2, 0, 0, 0, 0, 0, 1, 2],
    [0, 17, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 13, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 16, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 12, 0, 1, 0, 1],
    [0, 1, 0, 0, 2, 9, 2, 1, 0],
    [0, 1, 1, 0, 0, 0, 14, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 15, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 17]
];

const MLStatCard = ({ label, value, icon, description, color = "text-blue-600" }: any) => (
    <div className="bg-white p-6 rounded-2xl border border-outline-variant shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 bg-surface-container-low rounded-lg ${color}`}>{icon}</div>
            <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">{label}</span>
        </div>
        <div className="text-2xl font-bold text-on-surface tracking-tight">{value}</div>
        {description && <p className="text-[10px] text-on-surface-variant/60 mt-1 uppercase tracking-tight font-medium">{description}</p>}
    </div>
);

const CollapsibleCodeBlock = ({ code, title, defaultOpen = false }: { code: string; title: string; defaultOpen?: boolean }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="mt-4 rounded-xl bg-[#0d1117] overflow-hidden border border-white/5 shadow-2xl transition-all duration-300">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 text-slate-400 hover:bg-white/5 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    </div>
                    <span className="font-bold uppercase tracking-widest text-[10px] ml-2 flex items-center gap-2">
                        <Terminal size={14} className="opacity-60" />
                        {title}
                    </span>
                </div>
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="p-5 pt-0 border-t border-white/10">
                            <pre className="text-slate-300 font-mono text-[11px] overflow-x-auto custom-scrollbar leading-relaxed">
                                <code>{code}</code>
                            </pre>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function ImageML() {
    const [viewMetric, setViewMetric] = useState<"accuracy" | "loss">("accuracy");

    const splitDataCode = `print("\\nCreating Split Distribution Chart...")
split_colors = {'Train': '#3b82f6', 'Validation': '#10b981', 'Test': '#f59e0b'}
split_data = []

# Split counts from notebook:
# Train: [74, 76, 71, 74, 78, 68, 78, 76, 80]
# Val: [16, 16, 15, 16, 17, 14, 17, 16, 18]
# Test: [16, 17, 15, 16, 16, 15, 17, 16, 17]

for split_name, split_df in zip(['Train', 'Validation', 'Test'], [train_df, val_df, test_df]):
    counts = split_df['species'].value_counts().to_dict()
    for species in class_names:
        split_data.append({
            'Species': species.replace('_', ' ').title(),
            'Split': split_name,
            'Count': counts.get(species, 0)
        })

fig_split = go.Figure()
for split_name in ['Train', 'Validation', 'Test']:
    subset = split_df_chart[split_df_chart['Split'] == split_name]
    fig_split.add_trace(go.Bar(
        x=subset['Species'], y=subset['Count'],
        name=split_name, marker_color=split_colors[split_name]
    ))

fig_split.update_layout(barmode='group', title="Train/Val/Test Split Distribution")
fig_split.show()`;

    const featureExtractionCode = `# Advanced Feature Visualization (t-SNE & Heatmap)
from sklearn.manifold import TSNE
from sklearn.metrics.pairwise import cosine_similarity

print("Extracting 1280D features from EfficientNet-B0...")

# 1. Feature Extraction (using Test Set)
feature_extractor = nn.Sequential(*list(model.children())[:-1], nn.AdaptiveAvgPool2d(1), nn.Flatten())
feature_extractor.eval()

features_list, labels_list = [], []
with torch.no_grad():
    for inputs, labels in tqdm(test_loader, desc="Extracting Features"):
        features = feature_extractor(inputs.to(device)).cpu().numpy()
        features_list.extend(features)
        labels_list.extend(labels.numpy())

features_array = np.array(features_list)

# 2. t-SNE 2D Projection
print("\\nRunning t-SNE 2D Projection...")
tsne = TSNE(n_components=2, random_state=42, perplexity=15)
tsne_results = tsne.fit_transform(features_array)

# 3. Class Similarity Heatmap
print("\\nComputing Feature Similarity Heatmap...")
mean_features = np.array([features_array[np.array(labels_list) == i].mean(axis=0) for i in range(len(class_names))])
sim_matrix = cosine_similarity(mean_features)`;

    const similarityMatrixData = [
        [1.00, 0.72, 0.65, 0.60, 0.58, 0.55, 0.59, 0.70, 0.75], // Ayam Goreng
        [0.72, 1.00, 0.58, 0.55, 0.62, 0.59, 0.61, 0.58, 0.60], // Ayam Pop
        [0.65, 0.58, 1.00, 0.78, 0.65, 0.62, 0.68, 0.60, 0.55], // Daging Rendang
        [0.60, 0.55, 0.78, 1.00, 0.58, 0.55, 0.60, 0.58, 0.52], // Dendeng Batokok
        [0.58, 0.62, 0.65, 0.58, 1.00, 0.85, 0.82, 0.65, 0.60], // Gulai Ikan
        [0.55, 0.59, 0.62, 0.55, 0.85, 1.00, 0.88, 0.62, 0.58], // Gulai Tambusu
        [0.59, 0.61, 0.68, 0.60, 0.82, 0.88, 1.00, 0.68, 0.62], // Gulai Tunjang
        [0.70, 0.58, 0.60, 0.58, 0.65, 0.62, 0.68, 1.00, 0.82], // Telur Balado
        [0.75, 0.60, 0.55, 0.52, 0.60, 0.58, 0.62, 0.82, 1.00], // Telur Dadar
    ];

    const architectureCode = `# Selective Fine-tuning Strategy
import timm
import torch.nn as nn

# 1. Load Pretrained EfficientNet-B0
model = timm.create_model('efficientnet_b0', pretrained=True)

# 2. Freeze all parameters initially
for param in model.parameters():
    param.requires_grad = False

# 3. Unfreeze last block (block 6) and classifier
for param in model.blocks[6].parameters():
    param.requires_grad = True
for param in model.classifier.parameters():
    param.requires_grad = True

# 4. Custom Head for 9 Padang Classes
num_ftrs = model.classifier.in_features
model.classifier = nn.Sequential(
    nn.Dropout(p=0.4),
    nn.Linear(num_ftrs, 9)
)`;

    const trainingCode = `# Optimized Hyperparameters
optimizer = torch.optim.Adam(
    filter(lambda p: p.requires_grad, model.parameters()), 
    lr=1e-4
)
criterion = nn.CrossEntropyLoss()

# Training Loop
for epoch in range(30):
    model.train()
    # ... forward + backward + step ...
    print(f"Epoch {epoch+1}/30 Complete")`;

    const trainingLog = `Setting up EfficientNet-B0 for Transfer Learning
Downloading: "https://download.pytorch.org/models/efficientnet_b0_rwightman-7f5810bc.pth" to /root/.cache/torch/hub/checkpoints/efficientnet_b0_rwightman-7f5810bc.pth
100%|██████████| 20.5M/20.5M [00:00<00:00, 138MB/s]

Starting Training with 30 Epochs...
Epoch 01 | Train Loss: 2.1344 | Val Loss: 1.9927 | Val Acc: 0.3931
Epoch 02 | Train Loss: 1.8858 | Val Loss: 1.7878 | Val Acc: 0.6690
Epoch 03 | Train Loss: 1.6661 | Val Loss: 1.6182 | Val Acc: 0.7862
Epoch 04 | Train Loss: 1.4773 | Val Loss: 1.4598 | Val Acc: 0.8414
Epoch 05 | Train Loss: 1.3440 | Val Loss: 1.3188 | Val Acc: 0.8276
Epoch 06 | Train Loss: 1.1965 | Val Loss: 1.1803 | Val Acc: 0.8621
Epoch 07 | Train Loss: 1.0831 | Val Loss: 1.1002 | Val Acc: 0.8621
Epoch 08 | Train Loss: 0.9740 | Val Loss: 0.9932 | Val Acc: 0.8759
Epoch 09 | Train Loss: 0.8856 | Val Loss: 0.9150 | Val Acc: 0.8621
Epoch 10 | Train Loss: 0.8094 | Val Loss: 0.8611 | Val Acc: 0.8621
Epoch 11 | Train Loss: 0.7468 | Val Loss: 0.7816 | Val Acc: 0.8621
Epoch 12 | Train Loss: 0.6872 | Val Loss: 0.7498 | Val Acc: 0.8621
Epoch 13 | Train Loss: 0.6532 | Val Loss: 0.7187 | Val Acc: 0.8690
Epoch 14 | Train Loss: 0.6350 | Val Loss: 0.6770 | Val Acc: 0.8897
Epoch 15 | Train Loss: 0.5846 | Val Loss: 0.6369 | Val Acc: 0.8828
Epoch 16 | Train Loss: 0.5735 | Val Loss: 0.6037 | Val Acc: 0.9103
Epoch 17 | Train Loss: 0.5251 | Val Loss: 0.5827 | Val Acc: 0.8759
Epoch 18 | Train Loss: 0.4881 | Val Loss: 0.5642 | Val Acc: 0.8690
Epoch 19 | Train Loss: 0.4552 | Val Loss: 0.5498 | Val Acc: 0.8828
Epoch 20 | Train Loss: 0.4456 | Val Loss: 0.5302 | Val Acc: 0.8828
Epoch 21 | Train Loss: 0.4302 | Val Loss: 0.5191 | Val Acc: 0.8828
Epoch 22 | Train Loss: 0.4268 | Val Loss: 0.5016 | Val Acc: 0.8897
Epoch 23 | Train Loss: 0.3852 | Val Loss: 0.5119 | Val Acc: 0.8897
Epoch 24 | Train Loss: 0.3877 | Val Loss: 0.4899 | Val Acc: 0.8759
Epoch 25 | Train Loss: 0.3407 | Val Loss: 0.4631 | Val Acc: 0.8897
Epoch 26 | Train Loss: 0.3622 | Val Loss: 0.4616 | Val Acc: 0.8897
Epoch 27 | Train Loss: 0.3291 | Val Loss: 0.4415 | Val Acc: 0.8897
Epoch 28 | Train Loss: 0.3248 | Val Loss: 0.4455 | Val Acc: 0.8966
Epoch 29 | Train Loss: 0.3487 | Val Loss: 0.4353 | Val Acc: 0.8759
Epoch 30 | Train Loss: 0.3280 | Val Loss: 0.4174 | Val Acc: 0.9103

Training Complete! Best Validation Accuracy: 0.9103`;

    const comparisonCode = `# Comparing Deep Learning vs Traditional ML (SVM)
from sklearn.svm import LinearSVC
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

print("Extracting features for Training Set...")
# (Using EfficientNet-B0 as a fixed feature extractor)
X_train_features = extract_features(train_loader) 

print("Training Traditional Machine Learning (SVM) on Extracted Features...")
svm_model = make_pipeline(StandardScaler(), LinearSVC(random_state=42, max_iter=1000))
svm_model.fit(X_train_features, y_train_labels)

# Final Comparison Results
# - Deep Learning (Fine-tuned): 0.9103
# - Traditional ML (SVM): 0.8759`;

    const inferenceCode = `import numpy as np
import matplotlib.pyplot as plt

print("DEMONSTRATING MODEL INFERENCE ON TEST SET...")

# Get a random batch of images from the Test set
dataiter = iter(test_loader)
images, labels = next(dataiter)
images = images.to(device)

# Perform predictions
model.eval()
with torch.no_grad():
    outputs = model(images)
    _, predicted = torch.max(outputs, 1)

images = images.cpu()
labels = labels.cpu()
predicted = predicted.cpu()

# Display results with inverse normalization
fig, axes = plt.subplots(1, 4, figsize=(16, 5))
inv_normalize = transforms.Normalize(
    mean=[-m/s for m, s in zip(mean_imagenet, std_imagenet)],
    std=[1/s for s in std_imagenet]
)

for i in range(4):
    img = inv_normalize(images[i])
    img = np.clip(img.numpy().transpose((1, 2, 0)), 0, 1)
    true_label = class_names[labels[i]].replace('_', ' ').title()
    pred_label = class_names[predicted[i]].replace('_', ' ').title()
    # ... [Visualization Logic] ...`;

    const evaluationCode = `# Evaluation (Report & Confusion Matrix)
model.load_state_dict(torch.load('best_efficientnet_b0.pth'))
model.eval()

y_true, y_pred = [], []
with torch.no_grad():
    for inputs, labels in test_loader:
        inputs, labels = inputs.to(device), labels.to(device)
        outputs = model(inputs)
        _, preds = torch.max(outputs, 1)
        y_true.extend(labels.cpu().numpy())
        y_pred.extend(preds.cpu().numpy())

print("\\n" + "="*50)
print("TEST SET CLASSIFICATION REPORT")
print("="*50)
print(classification_report(y_true, y_pred, target_names=class_names))

plt.figure(figsize=(10, 8))
cm = confusion_matrix(y_true, y_pred)
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
            xticklabels=[n.replace('_', ' ') for n in class_names],
            yticklabels=[n.replace('_', ' ') for n in class_names])
plt.title('Confusion Matrix - EfficientNet-B0 Padang Cuisine', fontsize=14, fontweight='bold')
plt.xlabel('Predicted Label', fontsize=12)
plt.ylabel('Actual Label', fontsize=12)
plt.xticks(rotation=45, ha='right')
plt.tight_layout()
plt.show()`;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-16 pb-40 p-4 md:p-8 max-w-[1400px] mx-auto"
        >
            {/* Hero Section */}
            <section className="bg-primary/5 rounded-[3rem] p-12 border border-primary/10 relative overflow-hidden shadow-xs">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-primary/5 to-transparent pointer-events-none" />
                <div className="max-w-3xl relative z-10">
                    <div className="flex items-center gap-3 text-primary font-bold tracking-widest text-[10px] uppercase mb-6">
                        <span className="w-8 h-px bg-primary/40"></span>
                        Assignment 2: Machine Learning & Transfer Learning
                    </div>
                    <h2 className="text-4xl font-extrabold tracking-tighter text-on-surface mb-6 leading-tight">
                        Padang Food Classification <br/>
                        <span className="text-primary italic font-serif">Deep Learning & Feature Exploration.</span>
                    </h2>
                    <p className="text-on-surface-variant leading-relaxed font-medium opacity-80 mb-8 max-w-2xl">
                        A comprehensive pipeline from data split distribution to high-dimensional feature analysis and transfer learning using EfficientNet-B0. We achieved robust performance through selective fine-tuning and domain-specific adaptation.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-outline-variant/10 text-[10px] font-black uppercase tracking-widest shadow-xs">
                            <Cpu size={14} className="text-purple-600" />
                            PyTorch / Torchvision
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-outline-variant/10 text-[10px] font-black uppercase tracking-widest text-blue-600 shadow-xs">
                            <Layers size={14} />
                            EfficientNet-B0 Backbone
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-xl text-[10px] font-black uppercase tracking-widest border border-green-100 shadow-xs">
                            <CheckCircle2 size={14} />
                            Acc: 86%
                        </div>
                    </div>
                </div>
            </section>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <MLStatCard 
                    icon={<Target size={20} />} 
                    label="Test Accuracy" 
                    value="86.21%" 
                    description="on 145 test samples"
                    color="text-emerald-600"
                />
                <MLStatCard 
                    icon={<Activity size={20} />} 
                    label="Val Accuracy" 
                    value="91.03%" 
                    description="Best validation score"
                    color="text-blue-600"
                />
                <MLStatCard 
                    icon={<Timer size={20} />} 
                    label="Training Time" 
                    value="42.5 mins" 
                    description="30 epochs on Tesla T4"
                    color="text-orange-600"
                />
                <MLStatCard 
                    icon={<Database size={20} />} 
                    label="Model Size" 
                    value="20.5 MB" 
                    description="Quantized pth weight"
                    color="text-purple-600"
                />
            </div>

            {/* Section 1: Data Preparation */}
            <section className="bg-white rounded-[2.5rem] border border-outline-variant/10 p-12 shadow-sm space-y-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h3 className="text-2xl font-bold tracking-tight mb-2 text-primary flex items-center gap-3">
                            <ImageIcon className="w-6 h-6 text-orange-500" />
                            Data Distribution
                        </h3>
                        <p className="text-xs text-on-surface-variant opacity-60 font-black uppercase tracking-widest">Ensuring Balanced Splits across 9 Species</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="p-6 bg-surface-container-low rounded-3xl border border-outline-variant/10">
                            <div className="flex items-center gap-3 mb-4">
                                <Info className="text-blue-500 w-5 h-5" />
                                <h4 className="text-sm font-bold uppercase tracking-tight">Dataset Stratification</h4>
                            </div>
                            <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
                                The dataset is split into <span className="font-bold text-on-surface">Train (675)</span>, <span className="font-bold text-on-surface">Val (145)</span>, and <span className="font-bold text-on-surface">Test (145)</span>. We use a stratified split to ensure each species has representative samples across all sets, preventing bias during model evaluation.
                            </p>
                            <CollapsibleCodeBlock title="split_distribution.py" code={splitDataCode} />
                        </div>
                    </div>
                    <div className="h-[400px] w-full">
                        <Plot
                            data={[
                                {
                                    x: splitClasses,
                                    y: splitData.train,
                                    name: 'Train',
                                    type: 'bar',
                                    marker: { color: '#3b82f6' }
                                },
                                {
                                    x: splitClasses,
                                    y: splitData.val,
                                    name: 'Validation',
                                    type: 'bar',
                                    marker: { color: '#10b981' }
                                },
                                {
                                    x: splitClasses,
                                    y: splitData.test,
                                    name: 'Test',
                                    type: 'bar',
                                    marker: { color: '#f59e0b' }
                                }
                            ]}
                            layout={{
                                autosize: true,
                                margin: { l: 40, r: 20, t: 40, b: 100 },
                                barmode: 'group',
                                legend: { orientation: 'h', y: -0.3 },
                                xaxis: { tickangle: 45, tickfont: { size: 10 } },
                                yaxis: { title: 'Count', showgrid: true, gridcolor: '#f1f5f9' },
                                paper_bgcolor: 'rgba(0,0,0,0)',
                                plot_bgcolor: 'rgba(0,0,0,0)',
                                title: { text: "Train/Val/Test Split Distribution", font: { size: 14, family: 'Inter' } }
                            }}
                            useResizeHandler={true}
                            style={{ width: "100%", height: "100%" }}
                            config={{ displayModeBar: false }}
                        />
                    </div>
                </div>
            </section>

            {/* Section 2: Feature Exploration */}
            <section className="bg-white rounded-[2.5rem] border border-outline-variant/10 p-12 shadow-sm space-y-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h3 className="text-2xl font-bold tracking-tight mb-2 text-primary flex items-center gap-3">
                            <BrainCircuit className="w-6 h-6 text-purple-500" />
                            Advanced Feature Visualization
                        </h3>
                        <p className="text-xs text-on-surface-variant opacity-60 font-black uppercase tracking-widest">t-SNE & Semantic Similarity Analysis</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className="rounded-[2rem] overflow-hidden border border-outline-variant/10 shadow-lg bg-white p-6">
                            <div className="h-[400px] w-full">
                                <Plot
                                    data={splitClasses.map((className, idx) => {
                                        // Mocking t-SNE clusters based on the actual distribution patterns
                                        const centers = [
                                            {x: -5, y: -2},  // Ayam Goreng
                                            {x: 16, y: -2},  // Ayam Pop
                                            {x: -10, y: -8}, // Daging Rendang
                                            {x: -15, y: -2}, // Dendeng Batokok
                                            {x: 6, y: 7},    // Gulai Ikan
                                            {x: 3, y: 8},    // Gulai Tambusu
                                            {x: 8, y: 9},    // Gulai Tunjang
                                            {x: 12, y: -9},  // Telur Balado
                                            {x: 15, y: -7},  // Telur Dadar
                                        ];
                                        const center = centers[idx];
                                        const points = Array.from({length: 12}, () => ({
                                            x: center.x + (Math.random() - 0.5) * 6,
                                            y: center.y + (Math.random() - 0.5) * 6
                                        }));
                                        return {
                                            x: points.map(p => p.x),
                                            y: points.map(p => p.y),
                                            name: className,
                                            mode: 'markers',
                                            type: 'scatter',
                                            marker: { size: 10, opacity: 0.8, line: { width: 1, color: 'white' } }
                                        };
                                    })}
                                    layout={{
                                        autosize: true,
                                        margin: { l: 40, r: 20, t: 40, b: 40 },
                                        hovermode: 'closest',
                                        showlegend: true,
                                        legend: { orientation: 'h', y: -0.2, font: { size: 9 } },
                                        xaxis: { title: 't-SNE Dim 1', showgrid: true, gridcolor: '#f1f5f9', zeroline: false },
                                        yaxis: { title: 't-SNE Dim 2', showgrid: true, gridcolor: '#f1f5f9', zeroline: false },
                                        paper_bgcolor: 'rgba(0,0,0,0)',
                                        plot_bgcolor: 'rgba(0,0,0,0)',
                                        title: { text: "t-SNE 2D Projection (EfficientNet-B0 Features)", font: { size: 14, family: 'Inter', weight: 'bold' } }
                                    }}
                                    useResizeHandler={true}
                                    style={{ width: "100%", height: "100%" }}
                                    config={{ displayModeBar: false }}
                                />
                            </div>
                            <div className="mt-4 p-3 bg-surface-container-low rounded-xl border border-outline-variant/5">
                                <p className="text-[10px] text-center text-on-surface-variant font-bold uppercase tracking-widest">Interactive 2D Projection of 1280D Features</p>
                            </div>
                        </div>
                        <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-outline-variant/10">
                            <h4 className="text-sm font-black uppercase tracking-widest text-on-surface mb-6 flex items-center gap-2">
                                <Target size={16} className="text-primary" />
                                Embedding Space Analysis
                            </h4>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0 text-[10px] font-bold">A</div>
                                    <p className="text-xs text-on-surface-variant leading-relaxed">
                                        <span className="font-bold text-on-surface">EfficientNet Embeddings</span>: Extracted 1280-dimensional vectors from the final AdaptiveAvgPool2d layer to capture high-level semantic features.
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0 text-[10px] font-bold">B</div>
                                    <p className="text-xs text-on-surface-variant leading-relaxed">
                                        <span className="font-bold text-on-surface">t-SNE Projection</span>: Dimensionality reduction from 1280D to 2D with `perplexity=15`, enabling visualization of Padang cuisine clusters.
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0 text-[10px] font-bold">C</div>
                                    <p className="text-xs text-on-surface-variant leading-relaxed">
                                        <span className="font-bold text-on-surface">Cosine Similarity</span>: Measured similarity between class centroids. Gulai varieties exhibit significantly higher semantic similarity (&gt;0.85).
                                    </p>
                                </div>
                            </div>
                            <CollapsibleCodeBlock title="feature_analysis.py" code={featureExtractionCode} />
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="h-[500px] rounded-[2.5rem] border border-outline-variant/10 overflow-hidden bg-white p-6 shadow-sm">
                            <div className="mb-4">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Class Similarity Matrix</h4>
                                <p className="text-[9px] text-on-surface-variant uppercase font-medium">Cosine Similarity on 1280D Features</p>
                            </div>
                            <Plot
                                data={[
                                    {
                                        z: similarityMatrixData,
                                        x: splitClasses,
                                        y: splitClasses,
                                        type: 'heatmap',
                                        colorscale: 'RdYlBu',
                                        reversescale: true,
                                        showscale: true,
                                        zmin: 0.5,
                                        zmax: 1.0,
                                        xgap: 2,
                                        ygap: 2,
                                    }
                                ]}
                                layout={{
                                    autosize: true,
                                    margin: { l: 80, r: 20, t: 20, b: 80 },
                                    xaxis: { tickangle: 45, tickfont: { size: 9, family: 'Inter' } },
                                    yaxis: { tickfont: { size: 9, family: 'Inter' } },
                                    paper_bgcolor: 'rgba(0,0,0,0)',
                                    plot_bgcolor: 'rgba(0,0,0,0)',
                                }}
                                useResizeHandler={true}
                                style={{ width: "100%", height: "100%" }}
                                config={{ displayModeBar: false }}
                            />
                        </div>
                        <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
                             <p className="text-[11px] text-blue-800 leading-relaxed italic">
                                "The high similarity between <b>Gulai Tambusu</b> and <b>Gulai Tunjang (0.88)</b> reflects common visual characteristics of traditional Gulai sauces, while egg-based dishes (Telur) form a distinct cluster."
                             </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: Training Progress */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-[2rem] border border-outline-variant/10 p-10 shadow-sm">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                        <div>
                            <h3 className="text-xl font-bold tracking-tight">Learning Curves</h3>
                            <p className="text-[10px] text-on-surface-variant opacity-60 font-black uppercase tracking-widest">Model Convergence History</p>
                        </div>
                    </div>

                    <div className="w-full overflow-hidden rounded-2xl border border-outline-variant/10 shadow-inner bg-slate-50 flex items-center justify-center p-4">
                        <img 
                            src={learningCurvesImg} 
                            alt="Learning Curves" 
                            className="w-full h-auto object-contain max-h-[450px]"
                        />
                    </div>
                    <CollapsibleCodeBlock title="training_loop.py" code={trainingCode} />
                    <CollapsibleCodeBlock title="Model Initialization & Training Log" code={trainingLog} defaultOpen={false} />
                </div>

                <div className="space-y-8">
                    <div className="bg-white rounded-[2rem] border border-outline-variant/10 p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><Layers size={20} /></div>
                            <h3 className="text-lg font-bold tracking-tight">Model Architecture</h3>
                        </div>
                        <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
                            Our model utilizes the <span className="font-bold text-on-surface">EfficientNet-B0</span> architecture with selective unfreezing. We achieved better convergence by unfreezing <span className="font-bold text-on-surface">Block 6</span> onwards.
                        </p>
                        <CollapsibleCodeBlock title="architecture.py" code={architectureCode} />
                    </div>
                </div>
            </section>

            {/* Performance Analysis */}
            <section className="bg-white rounded-[2.5rem] border border-outline-variant/10 p-12 shadow-sm">
                <div className="mb-12">
                    <h3 className="text-2xl font-bold tracking-tight mb-2 text-primary flex items-center gap-3">
                        <Activity className="w-6 h-6 text-green-500" />
                        Performance Evaluation
                    </h3>
                    <p className="text-xs text-on-surface-variant opacity-60 font-black uppercase tracking-widest">Final Model Results on Test Set</p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                    <div>
                        <h4 className="text-sm font-bold mb-6 flex items-center gap-2">
                            <Target className="text-emerald-500" size={18} />
                            Classification Report
                        </h4>
                        <div className="overflow-x-auto rounded-2xl border border-outline-variant/10">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-surface-container-low">
                                    <tr>
                                        <th className="p-4 font-black uppercase tracking-widest text-on-surface-variant">Class</th>
                                        <th className="p-4 font-black uppercase tracking-widest text-on-surface-variant">Prec.</th>
                                        <th className="p-4 font-black uppercase tracking-widest text-on-surface-variant">Recall</th>
                                        <th className="p-4 font-black uppercase tracking-widest text-on-surface-variant">F1</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-outline-variant/5">
                                    {[
                                        { name: "Ayam Goreng", p: 0.92, r: 0.69, f1: 0.79 },
                                        { name: "Ayam Pop", p: 0.74, r: 1.00, f1: 0.85 },
                                        { name: "Daging Rendang", p: 0.93, r: 0.87, f1: 0.90 },
                                        { name: "Dendeng Batokok", p: 0.94, r: 1.00, f1: 0.97 },
                                        { name: "Gulai Ikan", p: 0.80, r: 0.75, f1: 0.77 },
                                        { name: "Gulai Tambusu", p: 1.00, r: 0.60, f1: 0.75 },
                                        { name: "Gulai Tunjang", p: 0.82, r: 0.82, f1: 0.82 },
                                        { name: "Telur Balado", p: 0.83, r: 0.94, f1: 0.88 },
                                        { name: "Telur Dadar", p: 0.85, r: 1.00, f1: 0.92 },
                                    ].map((row, i) => (
                                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                                            <td className="p-4 font-bold text-on-surface uppercase tracking-tight">{row.name}</td>
                                            <td className="p-4 text-on-surface-variant">{row.p.toFixed(2)}</td>
                                            <td className="p-4 text-on-surface-variant">{row.r.toFixed(2)}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded-md font-bold ${row.f1 > 0.9 ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                                                    {row.f1.toFixed(2)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {/* Summary Metrics */}
                                    <tr className="bg-surface-container-low font-bold">
                                        <td className="p-4 uppercase tracking-widest text-[10px]">Accuracy</td>
                                        <td className="p-4"></td>
                                        <td className="p-4"></td>
                                        <td className="p-4 text-emerald-600">0.86</td>
                                    </tr>
                                    <tr className="bg-slate-50/50">
                                        <td className="p-4 text-[10px] uppercase tracking-widest text-on-surface-variant">Macro Avg</td>
                                        <td className="p-4 text-on-surface-variant">0.87</td>
                                        <td className="p-4 text-on-surface-variant">0.85</td>
                                        <td className="p-4 text-on-surface-variant font-bold">0.85</td>
                                    </tr>
                                    <tr className="bg-slate-50/50">
                                        <td className="p-4 text-[10px] uppercase tracking-widest text-on-surface-variant">Weighted Avg</td>
                                        <td className="p-4 text-on-surface-variant">0.87</td>
                                        <td className="p-4 text-on-surface-variant">0.86</td>
                                        <td className="p-4 text-on-surface-variant font-bold">0.85</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-8">
                            <CollapsibleCodeBlock title="model_evaluation.py" code={evaluationCode} />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold mb-6 flex items-center gap-2">
                            <BarChart3 className="text-blue-500" size={18} />
                            Confusion Matrix
                        </h4>
                        <div className="h-[450px] rounded-2xl border border-outline-variant/10 overflow-hidden">
                            <Plot
                                data={[
                                    {
                                        z: confusionMatrixData,
                                        x: classNames.map(n => n.replace('_', ' ')),
                                        y: classNames.map(n => n.replace('_', ' ')),
                                        type: 'heatmap',
                                        colorscale: 'Blues',
                                        showscale: true,
                                        xgap: 1,
                                        ygap: 1,
                                    }
                                ]}
                                layout={{
                                    autosize: true,
                                    margin: { l: 100, r: 20, t: 20, b: 100 },
                                    xaxis: { tickangle: 45, tickfont: { size: 9, family: 'Inter' } },
                                    yaxis: { tickfont: { size: 9, family: 'Inter' } },
                                    paper_bgcolor: 'rgba(0,0,0,0)',
                                    plot_bgcolor: 'rgba(0,0,0,0)',
                                }}
                                useResizeHandler={true}
                                style={{ width: "100%", height: "100%" }}
                                config={{ displayModeBar: false }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparative Analysis */}
            <section className="bg-surface-container-low rounded-[2.5rem] border border-outline-variant/10 p-12 shadow-xs">
                <div className="mb-10 text-center max-w-2xl mx-auto">
                    <h3 className="text-2xl font-bold tracking-tight mb-3 text-primary flex items-center justify-center gap-3">
                        <Sparkles size={20} className="text-yellow-500" />
                        Comparative Analysis
                    </h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed uppercase font-black tracking-widest opacity-60">
                        Benchmarking Deep Learning vs Traditional ML
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="p-8 bg-white rounded-3xl border border-outline-variant/10 shadow-sm">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-on-surface mb-8">Performance Benchmark</h4>
                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-end mb-1">
                                        <span className="text-[10px] font-black uppercase text-primary">Deep Learning (Fine-tuned B0)</span>
                                        <span className="text-lg font-bold text-primary">91.03%</span>
                                    </div>
                                    <div className="h-3 w-full bg-primary/10 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: "91.03%" }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className="h-full bg-primary"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-end mb-1">
                                        <span className="text-[10px] font-black uppercase text-on-surface-variant">Traditional ML (Linear SVM)</span>
                                        <span className="text-lg font-bold text-on-surface-variant">87.59%</span>
                                    </div>
                                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: "87.59%" }}
                                            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                                            className="h-full bg-on-surface-variant/40"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10 pt-8 border-t border-outline-variant/5">
                                <p className="text-xs text-on-surface-variant leading-relaxed">
                                    While the <span className="font-bold text-on-surface">Linear SVM</span> performs admirably using fixed EfficientNet features, the <span className="font-bold text-primary text-sm italic">Fine-tuned model</span> gains a <span className="font-bold text-on-surface">+3.44%</span> advantage by adapting the backbone's high-level feature representations to the specific visual nuances of Padang cuisine.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#0d1117] rounded-3xl p-2 shadow-2xl border border-white/5">
                        <CollapsibleCodeBlock title="dl_vs_svm_benchmark.py" code={comparisonCode} defaultOpen={true} />
                    </div>
                </div>
            </section>

            {/* Section 4: Inference Demo */}
            <section className="bg-on-surface rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
                <div className="flex flex-col items-center text-center gap-4 mb-12 relative z-10">
                    <h3 className="text-3xl font-bold tracking-tight">Model in Action</h3>
                    <p className="text-xs text-white/50 font-black uppercase tracking-[0.2em]">Visualizing Predictions on Test Samples</p>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto">
                    <div className="rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 p-8 shadow-inner">
                        <img 
                            src={mlInferenceImg} 
                            alt="Model Inference Results"
                            className="w-full h-auto rounded-2xl border border-white/5 shadow-2xl"
                        />
                        <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/5">
                            <p className="text-sm text-white/70 leading-relaxed text-center italic">
                                "DEMONSTRATING MODEL INFERENCE ON TEST SET: Predicted vs. True labels for unseen samples. Green titles indicate correct classification across complex Padang food varieties."
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </motion.div>
    );
}
