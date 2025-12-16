import React, { useState, useEffect } from 'react';
import { dashboardAPI, DashboardMetrics } from '@/lib/api/endpoints';

export const DashboardOverview: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchMetrics = async () => {
    try {
      const response = await dashboardAPI.getMetrics();
      setMetrics(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch metrics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-600 text-center py-8">{error}</div>;
  if (!metrics) return <div className="text-center py-8">No data available</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Air Quality Cards */}
      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">CO₂ Level</h3>
        <p className="text-3xl font-bold text-blue-600">{metrics.air.co2}</p>
        <p className="text-gray-600 text-sm">ppm</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">PM2.5</h3>
        <p className="text-3xl font-bold text-yellow-600">{metrics.air.pm25}</p>
        <p className="text-gray-600 text-sm">µg/m³</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Temperature</h3>
        <p className="text-3xl font-bold text-green-600">{metrics.air.temperature}°C</p>
        <p className="text-gray-600 text-sm">Current</p>
      </div>

      {/* Water System Cards */}
      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-cyan-500">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Water Reservoir</h3>
        <p className="text-3xl font-bold text-cyan-600">{metrics.water.reservoir}</p>
        <p className="text-gray-600 text-sm">liters</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-indigo-500">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Water Generation</h3>
        <p className="text-3xl font-bold text-indigo-600">{metrics.water.generation}</p>
        <p className="text-gray-600 text-sm">L/day</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Water Purity</h3>
        <p className="text-3xl font-bold text-purple-600">{metrics.water.purity}</p>
        <p className="text-gray-600 text-sm">%</p>
      </div>
    </div>
  );
};
