import React from 'react';
import { Layout } from '@/components/Layout';

export default function Sustainability() {
  const impacts = [
    { metric: '50%', label: 'CO₂ Reduction', desc: 'Average reduction in household carbon footprint' },
    { metric: '30L', label: 'Water Generated', desc: 'Per day in optimal conditions' },
    { metric: '99%', label: 'Pollutants Filtered', desc: 'Removes PM2.5, VOCs, and allergens' },
    { metric: '80%', label: 'Energy Independent', desc: 'Via solar and battery storage' },
  ];

  const goals = [
    { title: 'Climate Action', desc: 'Combat climate change through reduced emissions and carbon capture' },
    { title: 'Clean Water', desc: 'Make fresh water accessible in water-scarce regions' },
    { title: 'Health & Wellness', desc: 'Provide clean air that improves respiratory and cardiovascular health' },
    { title: 'Sustainable Living', desc: 'Enable eco-conscious lifestyles without compromising comfort' },
  ];

  return (
    <Layout title="Sustainability" description="Our commitment to environmental sustainability">
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-6xl mx-auto px-4 py-20">
            <h1 className="text-5xl font-bold text-center text-slate-900 mb-6">Sustainability Impact</h1>
            <p className="text-xl text-center text-slate-600 mb-16 max-w-2xl mx-auto">
              TnafesClean creates measurable positive environmental impact while improving quality of life.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
              {impacts.map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">
                  <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
                    {item.metric}
                  </div>
                  <div className="text-sm font-semibold text-slate-900 mb-1">{item.label}</div>
                  <p className="text-xs text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-20">
              {goals.map((goal, idx) => (
                <div key={idx} className="bg-gradient-to-br from-emerald-50 to-blue-50 p-8 rounded-xl border border-emerald-200 hover:border-emerald-400 transition">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">🎯 {goal.title}</h3>
                  <p className="text-slate-600">{goal.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-slate-900 text-white p-12 rounded-2xl">
              <h2 className="text-3xl font-bold mb-6">Our Commitment to the Future</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-emerald-400 mb-3">Circular Economy</h3>
                  <p className="text-slate-200 mb-4">
                    Every component of TnafesClean is designed for recyclability and minimal environmental impact. We partner with suppliers who share our commitment to sustainability.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-emerald-400 mb-3">Social Impact</h3>
                  <p className="text-slate-200">
                    We believe clean air and water are human rights. We're committed to making TnafesClean accessible to communities regardless of economic status through partnerships and subsidy programs.
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-slate-700">
                <p className="text-slate-300">
                  By choosing TnafesClean, you're not just improving your own environment—you're joining a global movement toward sustainable, regenerative living.
                </p>
              </div>
            </div>
          </div>
      </div>
    </Layout>
  );
}
