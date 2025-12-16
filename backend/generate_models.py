import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans, MiniBatchKMeans
from sklearn.decomposition import PCA
from sklearn.metrics import silhouette_score
import joblib
import os

print("🔄 Generating models...")
np.random.seed(42)
n_samples = 500

df = pd.DataFrame({
    "PM2.5": np.random.normal(50, 20, n_samples),
    "CO2": np.random.normal(400, 50, n_samples),
    "SO2": np.random.normal(15, 5, n_samples),
    "Moss_Humidity": np.random.normal(75, 15, n_samples),
    "Pump_Activity": np.random.normal(1.5, 0.5, n_samples),
    "Solar_Power": np.random.normal(500, 150, n_samples)
}).clip(lower=0)

features = ["PM2.5", "CO2", "SO2", "Moss_Humidity", "Pump_Activity", "Solar_Power"]
df["PM25_rate"] = df["PM2.5"].diff().fillna(0)
df["Moss_Dryness"] = 100 - df["Moss_Humidity"]
df["Activity_Ratio"] = df["Pump_Activity"] / (df["Solar_Power"] + 1)
features += ["PM25_rate", "Moss_Dryness", "Activity_Ratio"]

data = df[features].copy().ffill().bfill()

scaler = StandardScaler()
X_scaled = scaler.fit_transform(data)

pca = PCA(n_components=2)
X_pca = pca.fit_transform(X_scaled)

sil_scores = {}
for k in range(2, 7):
    km = KMeans(n_clusters=k, random_state=42, n_init=10)
    lbls = km.fit_predict(X_pca)
    sil_scores[k] = silhouette_score(X_pca, lbls)

best_k = max(sil_scores, key=sil_scores.get)

mbk = MiniBatchKMeans(n_clusters=best_k, random_state=42, batch_size=10)
mbk.fit(X_pca)

models_dir = "./models"
os.makedirs(models_dir, exist_ok=True)

joblib.dump(scaler, os.path.join(models_dir, "scaler.pkl"))
joblib.dump(pca, os.path.join(models_dir, "pca.pkl"))
joblib.dump(mbk, os.path.join(models_dir, "minibatch_kmeans_model.pkl"))

with open(os.path.join(models_dir, "features.txt"), 'w') as f:
    f.write('\n'.join(features))

print(f"✅ Models saved to {os.path.abspath(models_dir)}")
print(f"   Best K: {best_k}")
