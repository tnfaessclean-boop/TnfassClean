'use client';

import { useState } from 'react';
import { Leaf, CheckCircle, AlertCircle } from 'lucide-react';

interface BiofilterStatusCardProps {
  sensorData?: Record<string, number>;
}

/**
 * Biofilter Status Card Component
 * Analyzes sensor data using K-Means clustering
 * Displays cluster state with visual indicators
 * Follows ATPNE color scheme (green gradient)
 */
const CLUSTER_STATES: Record<number, { name: string; emoji: string; description: string; color: string }> = {
  0: { 
    name: 'Optimal', 
    emoji: '🟢', 
    description: 'Biofiltre en parfait état',
    color: 'from-green-500 to-emerald-500'
  },
  1: { 
    name: 'Bon', 
    emoji: '🟢', 
    description: 'Fonctionnement normal',
    color: 'from-green-400 to-emerald-400'
  },
  2: { 
    name: 'Acceptable', 
    emoji: '🟡', 
    description: 'Monitoring requis',
    color: 'from-yellow-500 to-amber-500'
  },
  3: { 
    name: 'Dégradé', 
    emoji: '🟠', 
    description: 'Action recommandée',
    color: 'from-orange-500 to-red-500'
  },
  4: { 
    name: 'Critique', 
    emoji: '🔴', 
    description: 'Intervention urgente',
    color: 'from-red-600 to-red-700'
  },
};

export default function BiofilterStatusCard({ sensorData }: BiofilterStatusCardProps) {
  const [cluster, setCluster] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!sensorData) {
      setError('Données capteurs manquantes');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/ai/clustering', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sensorData),
      });

      if (!response.ok) throw new Error('Analyse échouée');
      
      const result = await response.json();
      setCluster(result.cluster);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur d\'analyse');
    } finally {
      setLoading(false);
    }
  };

  const clusterInfo = cluster !== null && cluster in CLUSTER_STATES 
    ? CLUSTER_STATES[cluster] 
    : null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600 hover:shadow-lg transition">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Leaf className="w-5 h-5 text-green-600" />
          État du Biofiltre
        </h2>
        {clusterInfo && <span className="text-2xl">{clusterInfo.emoji}</span>}
      </div>

      {clusterInfo && (
        <div className={`bg-gradient-to-r ${clusterInfo.color} text-white p-4 rounded-lg mb-4 shadow`}>
          <p className="text-lg font-bold">{clusterInfo.name}</p>
          <p className="text-sm opacity-90">{clusterInfo.description}</p>
          <p className="text-xs opacity-75 mt-2">Cluster ID: {cluster}</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm mb-4 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      <button
        onClick={handleAnalyze}
        disabled={!sensorData || loading}
        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Analyse...
          </>
        ) : (
          <>
            <CheckCircle className="w-4 h-4" />
            Analyser Capteurs
          </>
        )}
      </button>

      {!sensorData && (
        <p className="text-xs text-gray-500 mt-3 text-center">
          Données capteurs requises pour l'analyse
        </p>
      )}
    </div>
  );
}
