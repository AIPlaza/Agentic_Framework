'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, LayoutDashboard, ShieldCheck, Store, Compass, UserCheck } from 'lucide-react';

export default function HeaderNav() {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Onboarding',
      href: '/onboarding',
      icon: Sparkles,
      desc: 'AI Diagnosis'
    },
    {
      name: 'Project Studio',
      href: '/project/demo-project-001',
      icon: LayoutDashboard,
      desc: 'Design & PM Board'
    },
    {
      name: 'Auditor Portal',
      href: '/evaluator',
      icon: ShieldCheck,
      desc: 'Quality Verification'
    },
    {
      name: 'Marketplace',
      href: '/marketplace/demo-project-001',
      icon: Store,
      desc: 'Investor Fiche'
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#020624]/80 border-b border-white/10 shadow-2xl">
      {/* Signature Decorator Line */}
      <div className="h-1 w-full bg-gradient-to-r from-[#5EC8F2] via-[#5ED7F2] to-[#377D8C]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/project/demo-project-001" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5EC8F2] to-[#377D8C] flex items-center justify-center shadow-lg shadow-[#5EC8F2]/20 group-hover:scale-105 transition-transform duration-300">
            <Compass className="w-6 h-6 text-[#020624]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-syne text-xl font-bold tracking-tight text-white group-hover:text-[#5EC8F2] transition-colors">
                ACCET
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#5EC8F2]/10 text-[#5EC8F2] border border-[#5EC8F2]/30">
                v1.0.7
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans tracking-wide">
              Active Management Suite
            </p>
          </div>
        </Link>

        {/* Center Navigation Menu */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/onboarding' && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#5EC8F2]/20 to-[#377D8C]/20 text-[#5EC8F2] border border-[#5EC8F2]/40 shadow-inner'
                    : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#5EC8F2]' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Status / Auth */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Node Active</span>
          </div>

          <Link
            href="/login"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium text-white bg-gradient-to-r from-[#5EC8F2] to-[#377D8C] hover:opacity-90 transition-opacity shadow-md shadow-[#5EC8F2]/20"
          >
            <UserCheck className="w-4 h-4 text-[#020624]" />
            <span className="text-[#020624] font-bold">Sign In</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
