import React from 'react';
import { Layout } from '@/components/Layout';

export default function About() {
  const values = [
    { icon: '🎯', title: 'Accuracy', desc: 'Reliable data collection and analysis for informed decision-making.' },
    { icon: '📊', title: 'Transparency', desc: 'Clear reporting and open access to environmental metrics.' },
    { icon: '💡', title: 'Innovation', desc: 'Continuous improvement through technology and analytics.' },
    { icon: '🌍', title: 'Sustainability', desc: 'Supporting environmental health and conservation.' },
    { icon: '🤝', title: 'Collaboration', desc: 'Working together to address environmental challenges.' },
    { icon: '⚡', title: 'Efficiency', desc: 'Optimized systems and processes for maximum impact.' },
  ];

  const innovations = [
    { icon: '📊', title: 'Real-Time Monitoring', desc: 'Live environmental data collection from multiple sensors and sources.' },
    { icon: '🤖', title: 'Machine Learning', desc: 'Predictive models for environmental forecasting and trend analysis.' },
    { icon: '📡', title: 'IoT Integration', desc: 'Seamless integration with sensor networks and data sources.' },
    { icon: '⚡', title: 'Performance Metrics', desc: 'Comprehensive system health monitoring and alerts.' },
    { icon: '📱', title: 'Data Visualization', desc: 'Intuitive dashboards for environmental data presentation.' },
    { icon: '💾', title: 'Data Management', desc: 'Robust storage and retrieval of historical environmental data.' },
  ];

  const team = [
    { emoji: '👨‍�', name: 'Dr. Raj Patel', role: 'Lead Data Scientist', bio: 'PhD in Machine Learning. Specializes in LSTM models and time-series forecasting for environmental data analysis.' },
    { emoji: '👩‍🔬', name: 'Dr. Sarah Chen', role: 'Systems Architect', bio: 'PhD in Environmental Engineering. 10+ years designing IoT monitoring systems and data pipeline architecture.' },
    { emoji: '👨‍💼', name: 'David Kumar', role: 'Project Lead', bio: 'Full-stack engineer with 15 years experience in environmental tech startups and sustainable solutions.' },
    { emoji: '👩‍💻', name: 'Alex Rodriguez', role: 'Backend Developer', bio: 'Nest.js expert specializing in API design, real-time data processing, and high-performance systems.' },
    { emoji: '👨‍🎨', name: 'Marcus Johnson', role: 'Frontend Developer', bio: 'React specialist with expertise in interactive data visualization and real-time dashboard design.' },
    { emoji: '👩‍🔧', name: 'Lisa Wang', role: 'DevOps & Infrastructure', bio: 'Cloud infrastructure specialist experienced in Docker, Kubernetes, and scalable deployment solutions.' },
  ];

  const timeline = [
    { year: '2024', title: 'Project Started', desc: 'Initiated development of environmental monitoring platform.' },
    { year: '2024', title: 'Core Development', desc: 'Built full-stack application with Next.js, Nest.js, and MongoDB.' },
    { year: '2024', title: 'Feature Integration', desc: 'Integrated data collection, analytics, and visualization tools.' },
    { year: '2024', title: 'Testing Phase', desc: 'Comprehensive testing and quality assurance.' },
    { year: '2025', title: 'Deployment', desc: 'System deployed and ready for environmental monitoring.' },
    { year: '2025', title: 'Expansion', desc: 'Continuous enhancement and feature development.' },
  ];

  const partners = [
    { name: 'Technology Partners', type: 'Infrastructure' },
    { name: 'Research Institutions', type: 'Data Science' },
    { name: 'Development Team', type: 'Engineering' },
  ];

  return (
    <Layout title="About" description="About the TnafesClean Environmental Monitoring System">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-slate-900 mb-6">About TnafesClean System</h1>
          <p className="text-2xl text-slate-600">Environmental monitoring through technology and data.</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Our Mission & Vision</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 border-l-4 border-emerald-600 rounded-xl p-8 hover:shadow-lg hover:translate-y-[-5px] transition-all">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl">🎯</span>
                <h3 className="text-2xl font-bold text-slate-900">Mission</h3>
              </div>
              <p className="text-slate-700 leading-relaxed">
                To provide comprehensive environmental monitoring and data analysis tools that help communities understand and manage air quality, water systems, and environmental performance.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-emerald-50 border-l-4 border-blue-600 rounded-xl p-8 hover:shadow-lg hover:translate-y-[-5px] transition-all">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl">🔮</span>
                <h3 className="text-2xl font-bold text-slate-900">Vision</h3>
              </div>
              <p className="text-slate-700 leading-relaxed">
                A world where environmental data is accessible, actionable, and drives better decision-making for sustainable development and environmental health.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all text-center">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Highlights */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 text-center">Innovation Highlights</h2>
          <p className="text-center text-slate-600 mb-12 text-lg">How we combine biology, IoT, and sustainability</p>
          <div className="grid md:grid-cols-3 gap-8">
            {innovations.map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl border-2 border-transparent hover:border-emerald-600 hover:shadow-lg hover:translate-y-[-5px] transition-all text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Our Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:translate-y-[-10px] transition-all">
                <div className="h-40 bg-gradient-to-br from-emerald-600 to-blue-600 flex items-center justify-center text-6xl">
                  {member.emoji}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-slate-900 text-lg mb-1">{member.name}</h3>
                  <p className="text-emerald-600 font-semibold text-sm mb-3">{member.role}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Our Journey</h2>
          <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl p-8">
            {timeline.map((item, idx) => (
              <div key={idx} className={`flex gap-8 pb-8 ${idx !== timeline.length - 1 ? 'border-b border-emerald-200' : ''}`}>
                <div className="text-2xl font-bold text-emerald-600 min-w-[80px]">{item.year}</div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2"><strong>{item.title}</strong> - {item.desc}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Our Partners & Collaborators</h2>
          <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl p-8">
            <div className="grid md:grid-cols-3 gap-6">
              {partners.map((partner, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg text-center shadow-sm hover:shadow-md hover:scale-105 transition-all">
                  <h4 className="font-bold text-slate-900 mb-2">{partner.name}</h4>
                  <p className="text-emerald-600 font-semibold text-sm">{partner.type}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Join Us in Building a Sustainable Future</h2>
          <p className="text-emerald-50 text-lg mb-8">Whether you're an entrepreneur, community leader, researcher, or citizen, there's a role for you.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3 bg-white text-emerald-600 font-bold rounded-lg hover:bg-emerald-50 transition-all">
              View Career Opportunities
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-emerald-600 transition-all">
              Get In Touch
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
