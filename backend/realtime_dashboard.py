import streamlit as st
import pandas as pd
import numpy as np
import joblib
import plotly.graph_objects as go
from collections import deque
import time
import os

st.set_page_config(page_title="Biofilter Real-Time Clustering", layout="wide")

# Load models
@st.cache_resource
def load_models():
    try:
        scaler = joblib.load("models/scaler.pkl")
        pca = joblib.load("models/pca.pkl")
        mbk = joblib.load("models/minibatch_kmeans_model.pkl")
        return scaler, pca, mbk
    except FileNotFoundError:
        st.error("❌ Models not found. Run generate_models.py first!")
        st.stop()

scaler, pca, mbk = load_models()

st.title("🌱 Biofilter Real-Time Clustering Dashboard")

col1, col2, col3 = st.columns(3)
col1.metric("Model Status", "✅ Ready")
col2.metric("Clusters", mbk.n_clusters)
col3.metric("Features", "9")

st.divider()

col_chart, col_data = st.columns([2, 1])

# Data buffer
if "data_buffer" not in st.session_state:
    st.session_state.data_buffer = deque(maxlen=100)
    st.session_state.cluster_counts = {}
    st.session_state.latest_sample = None

def get_new_sample():
    """Generate simulated sensor data"""
    return {
        "PM2.5": np.random.normal(50, 20),
        "CO2": np.random.normal(400, 50),
        "SO2": np.random.normal(15, 5),
        "Moss_Humidity": np.random.normal(75, 15),
        "Pump_Activity": np.random.normal(1.5, 0.5),
        "Solar_Power": np.random.normal(500, 150)
    }

# Simulate real-time streaming
if st.button("▶️ Start Real-Time Stream (50 samples)", use_container_width=True):
    progress_bar = st.progress(0)
    status_text = st.empty()
    
    features_list = ["PM2.5", "CO2", "SO2", "Moss_Humidity", "Pump_Activity", "Solar_Power",
                     "PM25_rate", "Moss_Dryness", "Activity_Ratio"]
    
    for i in range(50):
        sample_dict = get_new_sample()
        
        # Feature engineering
        sample_dict["PM25_rate"] = 0
        sample_dict["Moss_Dryness"] = 100 - sample_dict["Moss_Humidity"]
        sample_dict["Activity_Ratio"] = sample_dict["Pump_Activity"] / (sample_dict["Solar_Power"] + 1)
        
        # Ensure non-negative
        for key in sample_dict:
            if sample_dict[key] < 0:
                sample_dict[key] = 0
        
        sample_array = np.array([sample_dict[f] for f in features_list]).reshape(1, -1)
        sample_scaled = scaler.transform(sample_array)
        sample_pca = pca.transform(sample_scaled)
        cluster = int(mbk.predict(sample_pca)[0])
        
        st.session_state.data_buffer.append({
            "x": sample_pca[0][0],
            "y": sample_pca[0][1],
            "cluster": cluster,
            "time": time.time(),
            **sample_dict  # Store raw sensor values
        })
        
        st.session_state.cluster_counts[cluster] = st.session_state.cluster_counts.get(cluster, 0) + 1
        st.session_state.latest_sample = sample_dict
        mbk.partial_fit(sample_pca)
        
        # Update chart
        buffer_list = list(st.session_state.data_buffer)
        if buffer_list:
            df_plot = pd.DataFrame(buffer_list)
            fig = go.Figure()
            
            colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"]
            for idx, c in enumerate(sorted(df_plot["cluster"].unique())):
                subset = df_plot[df_plot["cluster"] == c]
                fig.add_trace(go.Scatter(
                    x=subset["x"], y=subset["y"], 
                    mode="markers",
                    name=f"Cluster {c}",
                    marker=dict(size=10, color=colors[c % len(colors)])
                ))
            
            fig.update_layout(
                title="Live PCA Clusters",
                xaxis_title="PC1",
                yaxis_title="PC2",
                height=500,
                hovermode="closest"
            )
            col_chart.plotly_chart(fig, use_container_width=True)
            
            with col_data:
                st.subheader("📊 Latest Sample")
                if st.session_state.latest_sample:
                    for key, value in st.session_state.latest_sample.items():
                        st.write(f"**{key}**: {value:.2f}")
                
                st.subheader("📈 Cluster Distribution")
                for cluster_id in sorted(st.session_state.cluster_counts.keys()):
                    count = st.session_state.cluster_counts[cluster_id]
                    st.write(f"Cluster {cluster_id}: **{count}** samples")
        
        progress_bar.progress((i + 1) / 50)
        status_text.text(f"Processing sample {i+1}/50 → Cluster {cluster}")
        time.sleep(0.3)
    
    st.success("✅ Stream completed!")

st.divider()

if "data_buffer" in st.session_state and len(st.session_state.data_buffer) > 0:
    st.subheader("📋 All Captured Data")
    buffer_df = pd.DataFrame(list(st.session_state.data_buffer))
    
    # Select columns to display
    display_cols = ["PM2.5", "CO2", "SO2", "Moss_Humidity", "Pump_Activity", "Solar_Power", "cluster"]
    if all(col in buffer_df.columns for col in display_cols):
        st.dataframe(buffer_df[display_cols].round(2), use_container_width=True)

st.info("💡 **Real-Time Clustering Pipeline:**\n"
        "- Generates 50 sensor readings with feature engineering\n"
        "- Scales data and transforms via PCA to 2D space\n"
        "- Predicts cluster for each sample\n"
        "- Model learns incrementally (MiniBatchKMeans)\n"
        "- Displays raw sensor values and cluster assignments")
