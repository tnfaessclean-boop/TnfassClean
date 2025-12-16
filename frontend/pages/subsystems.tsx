'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/Layout';

export default function Subsystems() {
  const [expandedSection, setExpandedSection] = useState(0);

  const subsystems = [
    {
      icon: '🌿',
      title: 'Biological Filtration',
      desc: 'Living moss and algae layers provide natural, self-sustaining air purification.',
      components: [
        { name: 'Moss Layer', spec: 'Captures PM2.5, PM10, pollutants' },
        { name: 'Algae Culture', spec: 'CO₂ conversion, O₂ generation' },
        { name: 'Nutrient Medium', spec: 'Organic substrate, phosphate rock' },
      ],
    },
    {
      icon: '🏗️',
      title: 'Structural & Mechanical',
      desc: 'Durable frame, irrigation, and thermal management systems.',
      components: [
        { name: 'Aluminum Frame', spec: 'Weather-resistant, 10-year lifespan' },
        { name: 'Drip Irrigation', spec: 'Micro-pump, 12V solenoid valve' },
        { name: 'Insulation', spec: 'Thermal protection, condensation trays' },
      ],
    },
    {
      icon: '💧',
      title: 'Water Systems',
      desc: 'Advanced condensation and multi-stage water purification.',
      components: [
        { name: 'Peltier Module', spec: 'TEC1-12706, thermoelectric cooling' },
        { name: 'Multi-Stage Filters', spec: 'Sediment, carbon, membrane filters' },
        { name: 'UV-C Sterilizer', spec: '254nm wavelength, 99.9% sterilization' },
      ],
    },
    {
      icon: '⚡',
      title: 'Energy & Power',
      desc: 'Solar-powered system with intelligent energy management.',
      components: [
        { name: 'Solar Panel', spec: '400W monocrystalline panel' },
        { name: 'Battery Storage', spec: '48V LiFePO₄, 10kWh capacity' },
        { name: 'MPPT Controller', spec: '96% efficiency, temperature monitoring' },
      ],
    },
    {
      icon: '📊',
      title: 'Sensor Network',
      desc: 'Real-time environmental monitoring with IoT integration.',
      components: [
        { name: 'CO₂/SO₂ Sensors', spec: 'NDIR technology, ±50ppm accuracy' },
        { name: 'PM Sensor', spec: 'PM1, PM2.5, PM10 measurements' },
        { name: 'Environmental Sensors', spec: 'Temperature, humidity, water level' },
      ],
    },
    {
      icon: '♻️',
      title: 'Circular Economy Module',
      desc: 'Biomass collection and bio-fertilizer production system.',
      components: [
        { name: 'Biomass Collection', spec: 'Monthly harvest, 5-10kg per cycle' },
        { name: 'Processing Unit', spec: 'Drying and composting system' },
        { name: 'Community Distribution', spec: 'QR-tracked fertilizer packages' },
      ],
    },
  ];

  const specifications = [
    {
      icon: '🌫️',
      title: 'Air Quality System Specifications',
      specs: [
        { component: 'Moss Layer Thickness', specification: '15-20 cm', performance: 'PM2.5 capture: 95%' },
        { component: 'Algae Culture Volume', specification: '50 liters', performance: 'CO₂ conversion: 8.5kg/month' },
        { component: 'Air Throughput', specification: '2,000 m³/hour', performance: 'Monthly processing: 50,000m³' },
        { component: 'Pollutant Removal', specification: 'Multi-stage', performance: 'PM10: 98%, PM2.5: 95%, SO₂: 90%' },
      ],
      metrics: [
        { label: 'Moss Efficiency', value: 95 },
        { label: 'Algae Growth Rate', value: 88 },
        { label: 'System Uptime', value: 99.5 },
      ],
    },
    {
      icon: '💧',
      title: 'Water Generation System Specifications',
      specs: [
        { component: 'Peltier Module', specification: 'TEC1-12706, 60W', performance: 'ΔT up to 67°C' },
        { component: 'Water Generation', specification: '70-150 liters/day', performance: 'Dependent on humidity & temperature' },
        { component: 'Condensation Area', specification: '2 m² collecting surface', performance: 'Optimized for vapor capture' },
        { component: 'Filtration Stages', specification: '3-stage + UV-C', performance: '99.9% sterilization' },
      ],
      features: ['Solar Powered', 'UV Sterilized', 'IoT Monitored'],
    },
    {
      icon: '⚡',
      title: 'Energy System Specifications',
      specs: [
        { component: 'Solar Panel', specification: 'Monocrystalline, 400W', performance: 'Peak output: 400W, 25°C' },
        { component: 'Battery System', specification: '48V LiFePO₄', performance: '10kWh storage capacity' },
        { component: 'MPPT Controller', specification: '80A continuous current', performance: '96% efficiency' },
        { component: 'System Load', specification: 'Avg 300W continuous', performance: 'Peak 800W (Peltier active)' },
      ],
      metrics: [
        { label: 'Solar Generation', value: 85 },
        { label: 'Battery Efficiency', value: 92 },
      ],
    },
    {
      icon: '📊',
      title: 'Sensor Network Specifications',
      specs: [
        { component: 'CO₂ Sensor', specification: 'NDIR, 0-5000ppm', performance: '±50ppm ±3% reading' },
        { component: 'SO₂ Sensor', specification: 'Electrochemical, 0-500ppb', performance: '±5ppb' },
        { component: 'PM Sensor', specification: 'Laser-based, PM1/2.5/10', performance: '±10% accuracy' },
        { component: 'Temperature', specification: 'DS18B20, -55 to +125°C', performance: '±0.5°C' },
        { component: 'Humidity', specification: 'DHT22, 0-100%', performance: '±2%' },
        { component: 'Water Level', specification: 'Ultrasonic, 0-200cm', performance: '±1cm' },
      ],
    },
  ];

  return (
    <Layout title="Subsystems" description="Explore the technical specifications of our TnafesClean system">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-slate-900 mb-6">Technical Specifications</h1>
          <p className="text-xl text-slate-600">
            Deep dive into the subsystems and components that power the TnafesClean Air Purification & Water Regeneration System.
          </p>
        </div>
      </section>

      {/* Core Subsystems */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Core Subsystems</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subsystems.map((sys, idx) => (
              <div key={idx} className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl overflow-hidden hover:shadow-lg transition-all hover:translate-y-[-5px] border border-emerald-200">
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-6 flex items-center gap-4">
                  <div className="text-4xl">{sys.icon}</div>
                  <h3 className="text-xl font-bold">{sys.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-slate-600 mb-4">{sys.desc}</p>
                  <ul className="space-y-3">
                    {sys.components.map((comp, cidx) => (
                      <li key={cidx} className="flex gap-3">
                        <span className="text-emerald-600 font-bold">●</span>
                        <div className="flex-1">
                          <div className="font-semibold text-slate-900">{comp.name}</div>
                          <div className="text-sm text-slate-600">{comp.spec}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Specifications */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Detailed Specifications</h2>

          <div className="space-y-6">
            {specifications.map((spec, idx) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
                <button
                  onClick={() => setExpandedSection(expandedSection === idx ? -1 : idx)}
                  className="w-full p-6 flex justify-between items-center hover:bg-slate-50 transition"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{spec.icon}</span>
                    <h3 className="text-xl font-bold text-slate-900">{spec.title}</h3>
                  </div>
                  <span
                    className={`text-2xl transition-transform duration-300 ${
                      expandedSection === idx ? 'rotate-180' : ''
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {expandedSection === idx && (
                  <div className="border-t border-slate-200 p-6 space-y-6 animate-in fade-in duration-300">
                    {/* Specs Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-emerald-50 border-b-2 border-emerald-200">
                            <th className="px-4 py-3 text-left font-semibold text-slate-900">Component</th>
                            <th className="px-4 py-3 text-left font-semibold text-slate-900">Specification</th>
                            <th className="px-4 py-3 text-left font-semibold text-slate-900">Performance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {spec.specs.map((row, sidx) => (
                            <tr key={sidx} className="border-b border-slate-200 hover:bg-slate-50">
                              <td className="px-4 py-3 text-slate-900 font-medium">{row.component}</td>
                              <td className="px-4 py-3 text-slate-600">{row.specification}</td>
                              <td className="px-4 py-3 text-slate-600">{row.performance}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Metrics */}
                    {spec.metrics && (
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-4">Performance Metrics:</h4>
                        <div className="space-y-3">
                          {spec.metrics.map((metric, midx) => (
                            <div key={midx} className="flex items-center gap-4">
                              <span className="text-slate-700 font-medium min-w-40">{metric.label}</span>
                              <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-full transition-all"
                                  style={{ width: `${metric.value}%` }}
                                ></div>
                              </div>
                              <span className="font-bold text-emerald-600 min-w-12 text-right">{metric.value}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Features */}
                    {spec.features && (
                      <div className="flex flex-wrap gap-2">
                        {spec.features.map((feature, fidx) => (
                          <span
                            key={fidx}
                            className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
                              fidx === 0
                                ? 'bg-emerald-600'
                                : fidx === 1
                                ? 'bg-blue-600'
                                : 'bg-amber-600'
                            }`}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
