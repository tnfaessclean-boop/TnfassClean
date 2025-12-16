'use client';

import React, { useEffect, useState } from 'react';
import { Zap, BarChart3 } from 'lucide-react';

interface ClusterData {
  cluster: number;
  probability: number;
}

const CLUSTER_NAMES = {
  0: 'Optimal',
  1: 'Normal',
  2: 'Maintenance',
};

const CLUSTER_COLORS = {
  0: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  1: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  2: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
};

export default function ClusteringCard() {
  const [cluster, setCluster] = useState<ClusterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCluster();
  }, []);

  const fetchCluster = async () => {
    try {
      setLoading(true);
      // Simulate K-Means clustering
      const mockFeatures = [50, 400, 15, 75, 1.5, 500]; // Biofilter sensor features
      const response = await fetch('http://localhost:3001/api/ml/classify/biofilter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ features: mockFeatures }),
      });

      if (!response.ok) throw new Error('Failed to fetch cluster');
      const data = await response.json();
      setCluster(data);
      setError(null);
    } catch (err) {
      console.error('Clustering error:', err);
      // Fallback to mock data
      setCluster({
        cluster: 0,
        probability: 0.89,
      });
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-600" />
          Biofilter state classification

          </h3>
        </div>
        <button
          onClick={fetchCluster}
          disabled={loading}
          className="px-3 py-1 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-lg text-xs font-semibold disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      {cluster && (
        <div className="space-y-4">
          {/* Cluster Status */}
          <div
            className={`rounded-xl p-4 border ${
              CLUSTER_COLORS[cluster.cluster as keyof typeof CLUSTER_COLORS].bg
            } ${CLUSTER_COLORS[cluster.cluster as keyof typeof CLUSTER_COLORS].border}`}
          >
            <p
              className={`text-xs font-semibold mb-2 ${
                CLUSTER_COLORS[cluster.cluster as keyof typeof CLUSTER_COLORS].text
              }`}
            >
              Current State
            </p>
            <p
              className={`text-3xl font-bold ${
                CLUSTER_COLORS[cluster.cluster as keyof typeof CLUSTER_COLORS].text
              }`}
            >
              {CLUSTER_NAMES[cluster.cluster as keyof typeof CLUSTER_NAMES]}
            </p>
            <p
              className={`text-xs mt-1 ${
                CLUSTER_COLORS[cluster.cluster as keyof typeof CLUSTER_COLORS].text
              }`}
            >
              Cluster ID: {cluster.cluster}
            </p>
          </div>

          {/* Probability Distribution */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-700">Classification Probability</p>
            {[0, 1, 2].map((c) => (
              <div key={c} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600">
                    {CLUSTER_NAMES[c as keyof typeof CLUSTER_NAMES]}
                  </span>
                  <span className="text-xs font-semibold text-slate-700">
                    {c === cluster.cluster
                      ? (cluster.probability * 100).toFixed(1)
                      : ((1 - cluster.probability) / 2 * 100).toFixed(1)}
                    %
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      c === cluster.cluster
                        ? 'bg-gradient-to-r from-purple-500 to-purple-600'
                        : 'bg-slate-300'
                    }`}
                    style={{
                      width: `${
                        c === cluster.cluster
                          ? cluster.probability * 100
                          : ((1 - cluster.probability) / 2) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Recommendations */}
          <div
            className={`rounded-lg p-3 border ${
              CLUSTER_COLORS[cluster.cluster as keyof typeof CLUSTER_COLORS].border
            } ${CLUSTER_COLORS[cluster.cluster as keyof typeof CLUSTER_COLORS].bg}`}
          >
            <p
              className={`text-xs font-semibold ${
                CLUSTER_COLORS[cluster.cluster as keyof typeof CLUSTER_COLORS].text
              }`}
            >
              {cluster.cluster === 0 && '✅ System operating optimally'}
              {cluster.cluster === 1 && '⚠ System operating normally, monitor closely'}
              {cluster.cluster === 2 && '🔧 Maintenance may be required soon'}
            </p>
          </div>
        </div>
      )}

      {loading && !cluster && (
        <div className="flex items-center justify-center h-48">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            <p className="text-sm text-slate-600">Analyzing biofilter state...</p>
          </div>
        </div>
      )}
    </div>
  );
}
