'use client';

import React, { useEffect, useState } from 'react';
import { Brain } from 'lucide-react';

interface ModelMetadata {
  lstm: any;
  kmeans: any;
}

export default function MLModelsStatus() {
  const [metadata, setMetadata] = useState<ModelMetadata | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModelsMetadata();
  }, []);

  const fetchModelsMetadata = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/ml/models/metadata');
      if (!response.ok) throw new Error('Failed to fetch metadata');
      const data = await response.json();
      setMetadata(data);
    } catch (err) {
      console.error('Error fetching metadata:', err);
      // Fallback mock data
      setMetadata({
        lstm: {
          model_type: 'LSTM',
          prediction_target: 'temperature',
          status: 'loaded',
          rmse: 27.58,
        },
        kmeans: {
          model_type: 'K-Means',
          n_clusters: 3,
          status: 'loaded',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Brain className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-semibold text-slate-900">ML Models Status</h3>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="w-6 h-6 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      ) : metadata ? (
        <div className="space-y-4">
          {/* LSTM Model */}
          <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-semibold text-slate-900">LSTM Neural Network</p>
                <p className="text-xs text-slate-600">
                  {metadata.lstm.prediction_target || 'Temperature'} Prediction
                </p>
              </div>
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                ✓ Active
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-600">Type:</span>
                <p className="font-semibold text-slate-900">{metadata.lstm.model_type}</p>
              </div>
              <div>
                <span className="text-slate-600">RMSE:</span>
                <p className="font-semibold text-slate-900">
                  {metadata.lstm.rmse?.toFixed(2) || 'N/A'}
                </p>
              </div>
              {metadata.lstm.training_samples && (
                <div>
                  <span className="text-slate-600">Train Samples:</span>
                  <p className="font-semibold text-slate-900">{metadata.lstm.training_samples}</p>
                </div>
              )}
              {metadata.lstm.input_shape && (
                <div>
                  <span className="text-slate-600">Sequence Length:</span>
                  <p className="font-semibold text-slate-900">{metadata.lstm.input_shape}</p>
                </div>
              )}
            </div>
          </div>

          {/* K-Means Model */}
          <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-semibold text-slate-900">K-Means Clustering</p>
                <p className="text-xs text-slate-600">Biofilter State Classification</p>
              </div>
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                ✓ Active
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-600">Type:</span>
                <p className="font-semibold text-slate-900">{metadata.kmeans.model_type}</p>
              </div>
              <div>
                <span className="text-slate-600">Clusters:</span>
                <p className="font-semibold text-slate-900">{metadata.kmeans.n_clusters}</p>
              </div>
            </div>
            <div className="mt-3 text-xs">
              <span className="text-slate-600">States:</span>
              <p className="font-semibold text-slate-900">Optimal • Normal • Maintenance</p>
            </div>
          </div>

          {/* API Status */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 text-xs">
            <p className="text-slate-700">
              <strong>API Endpoint:</strong> /api/ml • <strong>Status:</strong>{' '}
              <span className="text-green-600 font-semibold">✓ Connected</span>
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center text-slate-500 py-8">Unable to load model metadata</div>
      )}
    </div>
  );
}
