'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Layout } from '@/components/Layout';
import dynamic from 'next/dynamic';
import MLPredictionCard from '@/components/dashboard/MLPredictionCard';
import ClusteringCard from '@/components/dashboard/ClusteringCard';
import { dashboardAPI } from '@/lib/api/endpoints';

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

  // --- Real-time / simulation controls ---
  const [autoRefresh, setAutoRefresh] = useState(true);
  const retryDelayRef = useRef<number>(2000);
  const intervalRef = useRef<number | null>(null);

  // staged override refs to prevent polling from overwriting simulated alerts
  const overrideRef = useRef(false);
  const timersRef = useRef<number[]>([]);
  const sequenceIntervalRef = useRef<number | null>(null);

  const fetchMetrics = async () => {
    try {
      const res = await dashboardAPI.getMetrics();
      const d = res.data;
      if (d && d.air && d.water) {
        setDashboardData((prev) => ({
          ...prev,
          // if an override is active, keep those staged values
          co2: overrideRef.current ? prev.co2 : d.air.co2 ?? prev.co2,
          pm25: overrideRef.current ? prev.pm25 : d.air.pm25 ?? prev.pm25,
          so2: d.air.so2 ?? prev.so2,
          temp: overrideRef.current ? prev.temp : d.air.temperature ?? prev.temp,
          humidity: d.air.humidity ?? prev.humidity,
          o2: d.air.o2 ?? prev.o2,
          waterReservoir: d.water.reservoir ?? prev.waterReservoir,
          irrigationFlow: d.water.flow ?? prev.irrigationFlow,
          waterGeneration: d.water.generation ?? prev.waterGeneration,
          waterPurity: d.water.purity ?? prev.waterPurity,
        }));
      } else {
        refreshDashboard();
      }
      retryDelayRef.current = 2000;
    } catch (err) {
      console.error('fetchMetrics error', err);
      // fallback to local random data
      refreshDashboard();
      // backoff
      retryDelayRef.current = Math.min(retryDelayRef.current * 1.5, 30000);
    }
  };

  useEffect(() => {
    const startPolling = () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = window.setInterval(() => {
        if (!document.hidden && !overrideRef.current) fetchMetrics();
      }, retryDelayRef.current);
    };

    if (autoRefresh) {
      fetchMetrics();
      startPolling();
    }

    const onVisibility = () => {
      if (document.hidden) {
        if (intervalRef.current) {
          window.clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      } else if (autoRefresh) {
        fetchMetrics();
        startPolling();
      }
    };

    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      // clear staged timers
      timersRef.current.forEach((t) => window.clearTimeout(t));
      timersRef.current = [];
      overrideRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRefresh]);

  // Simulate staged alert: PM2.5 (5s) -> CO2 (2s) -> Temperature (2s)
  const startStagedAlertSequence = (opts?: { pm25?: number; co2?: number; temp?: number }) => {
    if (overrideRef.current) return; // already running
    overrideRef.current = true;
    const pm25Peak = opts?.pm25 ?? 80;
    const co2Peak = opts?.co2 ?? 700;
    const tempPeak = opts?.temp ?? 30;

    const originals = { ...dashboardData };

    // clear any previous timers
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];

    // Step 1: PM2.5 high for 5s
    setDashboardData((prev) => ({ ...prev, pm25: pm25Peak }));
    const t1 = window.setTimeout(() => {
      // Step 2: CO2 high for 2s
      setDashboardData((prev) => ({ ...prev, pm25: originals.pm25, co2: co2Peak }));
      const t2 = window.setTimeout(() => {
        // Step 3: Temp high for 2s
        setDashboardData((prev) => ({ ...prev, co2: originals.co2, temp: tempPeak }));
        const t3 = window.setTimeout(() => {
          // revert all
          setDashboardData((prev) => ({ ...prev, pm25: originals.pm25, co2: originals.co2, temp: originals.temp }));
          overrideRef.current = false;
          timersRef.current = timersRef.current.filter((x) => x !== t3);
        }, 2000);
        timersRef.current.push(t3);
        timersRef.current = timersRef.current.filter((x) => x !== t2);
      }, 2000);
      timersRef.current.push(t2);
      timersRef.current = timersRef.current.filter((x) => x !== t1);
    }, 5000);
    timersRef.current.push(t1);
  };

  // Auto-run the staged sequence periodically when auto-refresh is enabled
  useEffect(() => {
    // clear any existing sequence interval
    if (sequenceIntervalRef.current) {
      window.clearInterval(sequenceIntervalRef.current);
      sequenceIntervalRef.current = null;
    }

    if (autoRefresh) {
      // start one run shortly after enabling
      const startTimeout = window.setTimeout(() => {
        if (!overrideRef.current) startStagedAlertSequence();
      }, 5000);
      timersRef.current.push(startTimeout as unknown as number);

      // then schedule periodic runs every 30s
      sequenceIntervalRef.current = window.setInterval(() => {
        if (!overrideRef.current) startStagedAlertSequence();
      }, 30000);
    }

    return () => {
      if (sequenceIntervalRef.current) {
        window.clearInterval(sequenceIntervalRef.current);
        sequenceIntervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRefresh]);

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

          </div>

          {/* AI Predictions Section */}
          <h2 className="text-2xl font-bold text-slate-900 mb-6 mt-10">🤖 AI Predictions & Analytics</h2>
          <div className="grid md:grid-cols-2  gap-6 mb-12">
            <MLPredictionCard />
            <ClusteringCard />
          </div>
          {/* header controls removed: simulation and auto-refresh disabled */}

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
