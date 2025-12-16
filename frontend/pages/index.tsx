'use client';

import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import Link from 'next/link';

export default function Home() {
  const [statValues, setStatValues] = useState({
    airPurified: 0,
    waterGenerated: 0,
    activeSystems: 0,
    co2Captured: 0,
  });

  useEffect(() => {
    // Animate stat values on mount
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setStatValues({
        airPurified: Math.floor(50000 * progress),
        waterGenerated: Math.floor(150 * progress),
        activeSystems: Math.floor(12 * progress),
        co2Captured: Math.floor(8500 * progress),
      });

      if (currentStep >= steps) clearInterval(interval);
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: '📊',
      title: 'Air Quality Monitoring',
      desc: 'Real-time tracking of environmental air quality metrics.',
    },
    {
      icon: '💧',
      title: 'Water System Tracking',
      desc: 'Monitor water quality and system performance.',
    },
    {
      icon: '🤖',
      title: 'Predictive Analytics',
      desc: 'Machine learning models for environmental forecasting.',
    },
    {
      icon: '🎯',
      title: 'Data Clustering',
      desc: 'Advanced pattern recognition and analysis.',
    },
    {
      icon: '⚡',
      title: 'System Monitoring',
      desc: 'Real-time alerts and performance metrics.',
    },
    {
      icon: '📱',
      title: 'Unified Dashboard',
      desc: 'Centralized view of all environmental data.',
    },
  ];

  const stats = [
    { value: statValues.airPurified, unit: 'm³/month', label: 'Air Purified' },
    { value: statValues.waterGenerated, unit: 'Liters/day', label: 'Water Generated' },
    { value: statValues.activeSystems, unit: 'panels', label: 'Active Systems' },
    { value: statValues.co2Captured, unit: 'kg/month', label: 'CO₂ Captured' },
  ];

  return (
    <Layout title="Home" description="TnafesClean Air Purification & Water Regeneration System">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 overflow-hidden pt-20">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Hero Text */}
            <div className="space-y-8">
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight animate-in slide-in-from-left duration-1000">
                Environmental Monitoring System
              </h1>
              <p className="text-xl text-emerald-300 font-semibold animate-in fade-in duration-1000 delay-100">
                Real-time environmental data collection and analysis.
              </p>
              <p className="text-lg text-gray-300 animate-in fade-in duration-1000 delay-200">
                Monitor air quality, water systems, and environmental performance with integrated data analytics.
              </p>

              <div className="flex gap-4 pt-4 animate-in scale-in duration-1000 delay-300">
                <Link
                  href="/dashboard"
                  className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-all hover:scale-105"
                >
                  Explore Dashboard
                </Link>
                <Link
                  href="/how-it-works"
                  className="px-8 py-3 border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-slate-900 font-bold rounded-lg transition-all"
                >
                  Learn How It Works
                </Link>
              </div>
            </div>

            {/* Hero Visualization */}
            <div className="relative h-96 flex items-center justify-center animate-in fade-in slide-in-from-right duration-1000">
              <svg
                className="w-full h-full"
                viewBox="0 0 400 400"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="mossGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#2ecc71" stopOpacity={1} />
                    <stop offset="100%" stopColor="#27ae60" stopOpacity={1} />
                  </linearGradient>
                  <linearGradient
                    id="waterGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#3498db" stopOpacity={1} />
                    <stop offset="100%" stopColor="#2980b9" stopOpacity={1} />
                  </linearGradient>
                </defs>

                {/* Main system container */}
                <rect
                  x="50"
                  y="50"
                  width="300"
                  height="300"
                  rx="20"
                  fill="none"
                  stroke="#34495e"
                  strokeWidth="2"
                />

                {/* Air intake (top) */}
                <circle cx="200" cy="80" r="25" fill="#3498db" />
                <path
                  d="M 200 80 L 200 130"
                  stroke="#3498db"
                  strokeWidth="3"
                  strokeDasharray="5,5"
                />

                {/* Moss layer (upper section) */}
                <ellipse cx="200" cy="150" rx="80" ry="30" fill="url(#mossGradient)" />
                <text
                  x="200"
                  y="155"
                  textAnchor="middle"
                  fontSize="12"
                  fill="white"
                  fontWeight="bold"
                >
                  Moss Layer
                </text>

                {/* Algae layer (middle section) */}
                <ellipse cx="200" cy="220" rx="80" ry="35" fill="#16a085" />
                <text
                  x="200"
                  y="225"
                  textAnchor="middle"
                  fontSize="12"
                  fill="white"
                  fontWeight="bold"
                >
                  Algae
                </text>

                {/* Water condensation (bottom) */}
                <path
                  d="M 140 280 Q 150 290 160 280 Q 170 290 180 280 Q 190 290 200 280 Q 210 290 220 280 Q 230 290 240 280 Q 250 290 260 280"
                  stroke="#3498db"
                  strokeWidth="3"
                  fill="none"
                />
                <circle cx="140" cy="285" r="4" fill="#3498db" />
                <circle cx="200" cy="295" r="3" fill="#3498db" />
                <circle cx="260" cy="280" r="4" fill="#3498db" />

                {/* Energy indicators (solar) */}
                <circle cx="100" cy="100" r="15" fill="none" stroke="#f1c40f" strokeWidth="2" />
                <text x="100" y="110" textAnchor="middle" fontSize="20">
                  ☀️
                </text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="text-center text-white animate-in fade-in slide-in-from-bottom duration-700"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm uppercase tracking-wider opacity-90">{stat.unit}</div>
                <div className="text-lg font-semibold mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-900 mb-4">
            Key Features
          </h2>
          <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            Comprehensive environmental monitoring capabilities
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="p-8 bg-gradient-to-br from-slate-50 to-emerald-50 rounded-xl border border-emerald-200 hover:shadow-lg transition-all hover:translate-y-[-5px] animate-in fade-in duration-500"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-700 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Start Monitoring</h2>
          <p className="text-xl text-emerald-100 mb-8">
            Access environmental data and analytics in real-time.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="px-8 py-3 bg-white text-emerald-700 font-bold rounded-lg hover:bg-emerald-50 transition-all hover:scale-105"
            >
              Dashboard
            </Link>
            <Link
              href="/how-it-works"
              className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-emerald-700 transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
