import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  title = 'TnafesClean System',
  description = 'Environmental Monitoring and Analytics Platform',
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <Head>
        <title>{title} | TnafesClean</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div className="min-h-screen bg-white flex flex-col">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-md z-1000">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  TnafesClean
                </span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <ul className="hidden md:flex gap-8">
              <li><Link href="/" className="text-slate-700 hover:text-emerald-600 font-medium transition">Home</Link></li>
              <li><Link href="/how-it-works" className="text-slate-700 hover:text-emerald-600 font-medium transition">How It Works</Link></li>
              <li><Link href="/subsystems" className="text-slate-700 hover:text-emerald-600 font-medium transition">Subsystems</Link></li>
              <li><Link href="/dashboard" className="text-slate-700 hover:text-emerald-600 font-medium transition">Dashboard</Link></li>
              <li><Link href="/sustainability" className="text-slate-700 hover:text-emerald-600 font-medium transition">Sustainability</Link></li>
              <li><Link href="/about" className="text-slate-700 hover:text-emerald-600 font-medium transition">About</Link></li>
            </ul>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-slate-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-slate-200 p-4">
              <ul className="flex flex-col gap-4">
                <li><Link href="/" className="text-slate-700 hover:text-emerald-600 font-medium transition block">Home</Link></li>
                <li><Link href="/how-it-works" className="text-slate-700 hover:text-emerald-600 font-medium transition block">How It Works</Link></li>
                <li><Link href="/subsystems" className="text-slate-700 hover:text-emerald-600 font-medium transition block">Subsystems</Link></li>
                <li><Link href="/dashboard" className="text-slate-700 hover:text-emerald-600 font-medium transition block">Dashboard</Link></li>
                <li><Link href="/sustainability" className="text-slate-700 hover:text-emerald-600 font-medium transition block">Sustainability</Link></li>
                <li><Link href="/about" className="text-slate-700 hover:text-emerald-600 font-medium transition block">About</Link></li>
              </ul>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="flex-1 pt-20">{children}</main>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h4 className="font-bold text-lg mb-4">TnafesClean System</h4>
                <p className="text-slate-400">Environmental monitoring and analytics platform.</p>
              </div>
              <div>
                <h4 className="font-bold mb-4">Platform</h4>
                <ul className="space-y-2 text-slate-400">
                  <li><Link href="/how-it-works" className="hover:text-white transition">How It Works</Link></li>
                  <li><Link href="/subsystems" className="hover:text-white transition">Subsystems</Link></li>
                  <li><Link href="/dashboard" className="hover:text-white transition">Dashboard</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Company</h4>
                <ul className="space-y-2 text-slate-400">
                  <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
                  <li><Link href="/sustainability" className="hover:text-white transition">Sustainability</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Contact</h4>
                <p className="text-slate-400">
                  Environmental Monitoring<br/>
                  Real-Time Analytics
                </p>
              </div>
            </div>
            <div className="border-t border-slate-700 pt-8 text-center text-slate-400">
              <p>&copy; 2025 TnafesClean System. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
