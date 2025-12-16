'use client';

import { useState, useEffect } from 'react';
import { Wind, TrendingUp } from 'lucide-react';

interface AirQualityCardProps {
  historicalData?: number[];
}

/**
 * Air Quality Card Component
 * Displays 7-day PM2.5 forecast using LSTM predictions
 * Follows ATPNE color scheme (blue gradient)
 */
export default function AirQualityCard({ historicalData = [] }: AirQualityCardProps) {
  const [forecast, setForecast] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/ai/forecast-weekly');
        if (!response.ok) throw new Error('Erreur de prédiction');
        const data = await response.json();
        setForecast(data.forecast || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur de prédiction');
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, []);

  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  const maxPM25 = Math.max(...forecast, 100);
  const avgPM25 = forecast.length > 0 
    ? forecast.reduce((a, b) => a + b, 0) / forecast.length 
    : 0;

  const getQualityStatus = (avg: number) => {
    if (avg < 50) return { text: '✓ Bon', color: 'text-green-600', bg: 'bg-green-50' };
    if (avg < 100) return { text: '⚠ Acceptable', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    if (avg < 150) return { text: '⚠ Dégradé', color: 'text-orange-600', bg: 'bg-orange-50' };
    return { text: '✗ Mauvais', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const status = getQualityStatus(avgPM25);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600 hover:shadow-lg transition">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Wind className="w-5 h-5 text-blue-600" />
          Qualité de l&apos;Air
        </h2>
        <span className="text-xs font-semibold text-gray-500">7 jours</span>
      </div>

      {loading && (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
          {error}
        </div>
      )}

      {!loading && forecast.length > 0 && (
        <div className="space-y-4">
          {/* Chart */}
          <div className="flex items-end justify-between gap-1 h-32 bg-gradient-to-br from-blue-50 to-gray-50 p-4 rounded-lg">
            {forecast.map((value, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-sm hover:shadow-lg transition"
                  style={{ height: `${(value / maxPM25) * 100}%` }}
                  title={`${value.toFixed(1)} μg/m³`}
                />
                <span className="text-xs text-gray-600 mt-2 font-semibold">{days[idx]}</span>
              </div>
            ))}
          </div>

          {/* Status */}
          <div className={`${status.bg} border-l-4 border-blue-500 p-3 rounded`}>
            <p className={`text-sm font-bold ${status.color}`}>{status.text}</p>
            <p className="text-xs text-gray-600 mt-1">
              Moyenne: <span className="font-semibold">{avgPM25.toFixed(1)} μg/m³</span>
            </p>
            <div className="flex items-center gap-1 mt-2 text-xs text-gray-700">
              <TrendingUp className="w-4 h-4" />
              {forecast[0] > avgPM25 ? 'Tendance à la hausse' : 'Tendance à la baisse'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
