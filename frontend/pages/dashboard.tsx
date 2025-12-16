'use client';

import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import dynamic from 'next/dynamic';
import MLPredictionCard from '@/components/dashboard/MLPredictionCard';
import ClusteringCard from '@/components/dashboard/ClusteringCard';
import MLModelsStatus from '@/components/dashboard/MLModelsStatus';

// Dynamically import Chart.js to avoid SSR issues
const Chart = dynamic(() => import('react-chartjs-2').then(mod => mod.Chart), { ssr: false });

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    co2: 320,
    pm25: 12,
    so2: 8,
    temp: 22,
    humidity: 65,
    o2: 2.5,
    waterReservoir: 30,
    irrigationFlow: 12.5,
    waterGeneration: 5.2,
    waterPurity: 99.8,
    mossMoisture: 72,
    algaeGrowth: 0.168,
    filterEfficiency: 85,
  });

  const refreshDashboard = () => {
    setDashboardData({
      co2: Math.floor(Math.random() * 50) + 300,
      pm25: Math.floor(Math.random() * 20) + 8,
      so2: Math.floor(Math.random() * 10) + 5,
      temp: Math.floor(Math.random() * 5) + 20,
      humidity: Math.floor(Math.random() * 20) + 60,
      o2: (Math.random() * 1 + 2.2),
      waterReservoir: Math.floor(Math.random() * 30) + 20,
      irrigationFlow: (Math.random() * 3 + 10),
      waterGeneration: (Math.random() * 2 + 4.5),
      waterPurity: (Math.random() * 0.2 + 99.5),
      mossMoisture: Math.floor(Math.random() * 10) + 68,
      algaeGrowth: (Math.random() * 2 + 6.5),
      filterEfficiency: Math.floor(Math.random() * 20) + 80,
    });
  };

  const DashboardCard = ({ title, value, unit, icon, status = 'normal', progress = 80 }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:translate-y-[-5px] transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <span className="text-2xl">{icon}</span>
      </div>
      <div className="mb-3">
        <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
          {typeof value === 'number' ? value.toFixed(1) : value}
        </p>
        <p className="text-sm text-slate-500">{unit}</p>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
        <div
          className="bg-gradient-to-r from-emerald-600 to-emerald-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <span
        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
          status === 'warning' ? 'bg-yellow-100 text-yellow-700' : 'bg-emerald-100 text-emerald-700'
        }`}
      >
        {status === 'warning' ? 'Needs Maintenance' : 'Healthy'}
      </span>
    </div>
  );

  const AlertItem = ({ icon, title, description, type = 'info' }) => {
    const bgColor = type === 'success' ? 'bg-emerald-50 border-l-emerald-500' : 'bg-yellow-50 border-l-yellow-500';
    return (
      <div className={`flex gap-4 p-4 border-l-4 rounded-lg ${bgColor} mb-4`}>
        <span className="text-xl">{icon}</span>
        <div>
          <h4 className="font-semibold text-slate-900">{title}</h4>
          <p className="text-sm text-slate-600">{description}</p>
        </div>
      </div>
    );
  };

  return (
    <Layout title="Dashboard" description="Monitor your air and water quality in real-time">
      <section className="bg-slate-50 pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-8 flex-wrap gap-4">
            <div>
              <h1 className="text-5xl font-bold text-slate-900 mb-2">Live Dashboard</h1>
              <p className="flex items-center gap-2 text-slate-600 font-semibold">
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                Real-Time Monitoring
              </p>
            </div>
            <button
              onClick={refreshDashboard}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              🔄 Refresh Data
            </button>
          </div>

          {/* AI Predictions Section */}
          <h2 className="text-2xl font-bold text-slate-900 mb-6 mt-10">🤖 AI Predictions & Analytics</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <MLPredictionCard />
            <ClusteringCard />
            <MLModelsStatus />
          </div>

          {/* Air Quality Metrics */}
          <h2 className="text-2xl font-bold text-slate-900 mb-6 mt-10">Air Quality Metrics</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <DashboardCard title="CO₂ Level" value={dashboardData.co2} unit="ppm (Target: <300)" icon="💨" progress={80} />
            <DashboardCard title="PM2.5" value={dashboardData.pm25} unit="µg/m³ (Target: <15)" icon="🌫️" progress={20} />
            <DashboardCard title="PM 1.0 Level" value={dashboardData.so2} unit="ppb" icon="⚠️" progress={25} />
            <DashboardCard title="Temperature" value={dashboardData.temp} unit="°C (Optimal: 20-25)" icon="🌡️" progress={60} />
            <DashboardCard title="Humidity" value={dashboardData.humidity} unit="% (Target: 60-80)" icon="💧" progress={65} />
            <DashboardCard title="O₂ Generation" value={dashboardData.o2} unit="m³/hour" icon="🍃" progress={85} />
          </div>

          {/* Water System Metrics */}
          <h2 className="text-2xl font-bold text-slate-900 mb-6 mt-10">Water System Metrics</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <DashboardCard
              title="Water Reservoir"
              value={dashboardData.waterReservoir}
              unit="liters (Capacity: 40L)"
              icon="🏞️"
              progress={72.5}
            />
            <DashboardCard
              title="Irrigation Flow"
              value={dashboardData.irrigationFlow}
              unit="L/day distributed"
              icon="💧"
              progress={50}
            />
            <DashboardCard
              title="Water Generation"
              value={dashboardData.waterGeneration}
              unit="L/day generated"
              icon="🌧️"
              progress={75}
            />
            <DashboardCard
              title="Water Purity"
              value={dashboardData.waterPurity}
              unit="% (UV sterilization active)"
              icon="✨"
              progress={99.8}
            />
            <DashboardCard
              title="Moss Moisture"
              value={dashboardData.mossMoisture}
              unit="% (Optimal: 70-80)"
              icon="🌱"
              progress={dashboardData.mossMoisture}
            />
            <DashboardCard
              title="Algae Growth"
              value={dashboardData.algaeGrowth}
              unit="kg biomass this month"
              icon="🟢"
              progress={85}
            />
          </div>

          {/* System Alerts & Maintenance */}
          <h2 className="text-2xl font-bold text-slate-900 mb-6 mt-10">System Alerts & Maintenance</h2>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <AlertItem
              icon="✓"
              title="System Status"
              description="All sensors operational and calibrated. Last maintenance: 5 days ago."
              type="success"
            />
            <AlertItem
              icon="⚠️"
              title="Water Refill Scheduled"
              description="Reservoir will reach optimal capacity in 3 days. Manual refill not needed - condensation in progress."
            />
            <AlertItem
              icon="✓"
              title="Biomass Harvesting"
              description="Current biomass: 8.5kg. Scheduled harvest in 6 days. Bio-fertilizer packaging ready."
              type="success"
            />
            <AlertItem
              icon="✓"
              title="Filter Status"
              description="All filters functioning normally. Next scheduled filter cleaning: 15 days."
              type="success"
            />
            <AlertItem
              icon="ℹ️"
              title="UV Sterilizer"
              description="Operating at 98% efficiency. Bulb replacement recommended in 30 days."
            />
            <AlertItem
              icon="✓"
              title="Solar Charging"
              description="Battery at 92% capacity. Today's collection: 4.8kWh. Weather forecast: 80% sunny."
              type="success"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}
