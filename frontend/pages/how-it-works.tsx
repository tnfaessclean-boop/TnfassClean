'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/Layout';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const timelineSteps = [
    { icon: '💨', label: 'Air Intake & Capture', color: '#3498db' },
    { icon: '🌿', label: 'Gaseous Absorption', color: '#2ecc71' },
    { icon: '💧', label: 'Water Condensation', color: '#3498db' },
    { icon: '✨', label: 'Water Purification', color: '#27ae60' },
    { icon: '🌱', label: 'Bio-Layer Hydration', color: '#16a085' },
    { icon: '📊', label: 'Environmental Monitoring', color: '#2980b9' },
    { icon: '🤖', label: 'Data & AI Processing', color: '#8e44ad' },
    { icon: '🚨', label: 'Alerts & Safety', color: '#e74c3c' },
    { icon: '⚡', label: 'Energy Management', color: '#f39c12' },
    { icon: '🌾', label: 'Biomass Growth & Reuse', color: '#27ae60' },
    { icon: '♻️', label: 'Product Generation', color: '#2ecc71' },
  ];

  const detailedSteps = [
    {
      num: 1,
      title: 'Air Intake and Particulate Capture',
      desc: 'Polluted ambient air is drawn into the system through the panel via the Moss & Algae Filtration subsystem.',
      details: [
        'Air drawn through intake panel',
        'Moss layer captures PM2.5 and PM10',
        '95% particulate matter removed',
        'Reduced particulate load for next stages',
      ],
    },
    {
      num: 2,
      title: 'Gaseous Pollutant Absorption',
      desc: 'Air flows to the Algae Layer where microalgae (Spirulina platensis) absorb CO₂ and toxic gases via photosynthesis.',
      details: [
        'Microalgae absorb CO₂ and SO₂',
        'Clean O₂ is released',
        'Algae biomass grows',
        'Significant air quality improvement',
      ],
    },
    {
      num: 3,
      title: 'Water Condensation',
      desc: 'Part of incoming air is routed to the Condensation Unit where cool air condenses water vapor.',
      details: [
        'Thermoelectric cooling activated',
        'Water vapor condensed',
        '70-150L fresh water per day',
        'Solar-powered condensation process',
      ],
    },
    {
      num: 4,
      title: 'Water Purification & Mineralization',
      desc: 'Condensed water is purified and enriched via the Condensation & Water Purification subsystem.',
      details: [
        '3-stage mechanical filtration',
        'Activated carbon treatment',
        'UV-C sterilization (99.9% kill rate)',
        'Phosphate rock mineralization for nutrients',
      ],
    },
    {
      num: 5,
      title: 'Bio-Layer Hydration and Control',
      desc: 'AI optimizes watering of moss and algae using mineralized water via the Irrigation & AI Control subsystem.',
      details: [
        'Micro-pump distribution system',
        'AI-controlled watering schedule',
        'Humidity-based irrigation',
        'Maintains optimal bio-layer health',
      ],
    },
    {
      num: 6,
      title: 'Environmental Monitoring',
      desc: 'IoT sensors collect real-time air quality and environmental data continuously throughout the system.',
      details: [
        'PM2.5 and PM10 detection',
        'CO₂ concentration monitoring',
        'Temperature and humidity sensors',
        'Toxin level detection (SO₂, NO₂)',
      ],
    },
    {
      num: 7,
      title: 'Data Transmission & AI Processing',
      desc: 'Sensor data is sent to AI platform for advanced processing and predictive analytics.',
      details: [
        'LSTM Model: PM2.5 prediction',
        'K-Means/DBSCAN: Bio-filter state classification',
        'Anomaly detection for toxin levels',
        'Real-time data pipeline processing',
      ],
    },
    {
      num: 8,
      title: 'Alerts and Public Safety',
      desc: 'AI triggers alerts if pollution or toxin levels exceed safe thresholds for public safety.',
      details: [
        'Dashboard notifications',
        'SMS alerts for critical levels',
        'Public safety recommendations',
        'Real-time pollution warnings',
      ],
    },
    {
      num: 9,
      title: 'Energy Management',
      desc: '20W solar panel with LiFePO₄ battery supplies continuous autonomous power via the Energy Subsystem.',
      details: [
        '20W solar panel generation',
        'LiFePO₄ battery storage',
        'Charge controller and BMS',
        '24/7 autonomous operation',
      ],
    },
    {
      num: 10,
      title: 'Biomass Growth & Reuse',
      desc: 'Algae and moss biomass accumulates as they capture pollutants, then gets periodically harvested and recycled.',
      details: [
        'Monthly biomass harvesting',
        '5kg bio-fertilizer per month',
        'Nutrient recycling and decomposition',
        'Water recycling loop maintained',
      ],
    },
    {
      num: 11,
      title: 'Product Generation',
      desc: 'Processed biomass is packaged as organic fertilizer or gels, closing the circular economy loop.',
      details: [
        'Biomass processing and packaging',
        'Organic fertilizer products',
        'Bio-feedstock creation',
        'Revenue generation through circular economy',
      ],
    },
  ];

  return (
    <Layout title="How It Works" description="Discover the 11-step TnafesClean workflow that transforms polluted air">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-slate-900 mb-6">TnafesClean Air Purification System Workflow</h1>
          <p className="text-xl text-slate-600">
            Discover the 11-step integrated workflow that transforms polluted air into clean oxygen, generates fresh water, powers intelligent analytics, and creates circular economy products.
          </p>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 text-center">The 11-Step TnafesClean Workflow</h2>
          <p className="text-center text-slate-600 mb-12 text-lg">
            An integrated system combining biological filtration, water regeneration, AI analytics, and circular economy
          </p>

          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 border border-slate-200">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {timelineSteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`flex flex-col items-center gap-3 p-4 rounded-xl transition-all duration-300 ${
                    activeStep === idx
                      ? 'bg-white shadow-lg scale-105'
                      : 'bg-white/60 hover:bg-white hover:shadow-md'
                  }`}
                  style={{
                    borderTop: activeStep === idx ? `3px solid ${step.color}` : '3px solid #e2e8f0',
                  }}
                >
                  <div className="text-4xl">{step.icon}</div>
                  <div className="text-xs font-bold uppercase text-slate-500">Step {idx + 1}</div>
                  <div className="text-sm font-semibold text-slate-900 text-center leading-tight">{step.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Breakdown */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 text-center">Detailed Step Breakdown</h2>
          <p className="text-center text-slate-600 mb-12">Click on any step above or explore the detailed cards below</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {detailedSteps.map((step, idx) => (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`bg-white rounded-xl p-6 cursor-pointer transition-all duration-300 border-l-4 ${
                  activeStep === idx
                    ? 'border-l-emerald-600 shadow-lg scale-105'
                    : 'border-l-slate-300 shadow-md hover:shadow-lg'
                }`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {step.num}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                </div>
                <p className="text-slate-600 text-sm mb-4">{step.desc}</p>

                {activeStep === idx && (
                  <div className="pt-4 border-t border-slate-200 animate-in fade-in duration-300">
                    <ul className="space-y-2">
                      {step.details.map((detail, didx) => (
                        <li key={didx} className="flex gap-3 text-sm text-slate-600">
                          <span className="text-emerald-600 font-bold flex-shrink-0">✓</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Complete Process Overview</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
              <div className="text-5xl mb-4">💨</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Air Input</h3>
              <p className="text-slate-700 text-lg">
                Polluted air: CO₂ 410ppm, PM2.5 35µg/m³, SO₂ 8ppb detected
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border border-purple-200 flex flex-col justify-center">
              <div className="text-5xl mb-4">⚙️</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">TnafesClean Processing</h3>
              <p className="text-slate-700 text-lg">
                11 integrated steps combining biological filtration and AI analytics
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border border-green-200">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Clean Output</h3>
              <p className="text-slate-700 text-lg">
                Clean air: O₂ +2%, water 150L/day, fertilizer 5kg/month, insights
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Key System Features</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Bio-Filtration</h3>
              <p className="text-slate-600">
                Natural moss and algae work together to filter pollutants and convert harmful CO₂ into oxygen. 95% particulate matter removal with complete sustainability.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">💧</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Water Harvesting</h3>
              <p className="text-slate-600">
                Advanced condensation technology extracts water vapor from the air, producing 150+ liters of fresh water daily even in arid conditions.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Solar Powered</h3>
              <p className="text-slate-600">
                20W solar panels with LiFePO₄ battery ensure 24/7 autonomous operation with zero grid dependency.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">AI Analytics</h3>
              <p className="text-slate-600">
                LSTM models predict pollution, K-Means clustering for bio-filter optimization, and real-time anomaly detection.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Real-Time Monitoring</h3>
              <p className="text-slate-600">
                IoT sensors track PM2.5, CO₂, temperature, humidity, and toxins with live dashboard access and instant alerts.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">♻️</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Circular Economy</h3>
              <p className="text-slate-600">
                Harvested biomass becomes premium bio-fertilizer, creating revenue streams and closing the environmental loop.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
