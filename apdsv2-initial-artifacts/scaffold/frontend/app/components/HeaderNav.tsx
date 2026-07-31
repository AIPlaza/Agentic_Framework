'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Sparkles, LayoutDashboard, ShieldCheck, Store, UserCheck } from 'lucide-react';

export default function HeaderNav() {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Onboarding',
      href: '/onboarding',
      icon: Sparkles
    },
    {
      name: 'Project Studio',
      href: '/project/demo-project-001',
      icon: LayoutDashboard
    },
    {
      name: 'Auditor Portal',
      href: '/evaluator',
      icon: ShieldCheck
    },
    {
      name: 'Marketplace',
      href: '/marketplace/demo-project-001',
      icon: Store
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-[#020624]/80 border-b border-white/15 shadow-2xl">
      {/* Signature Decorator Line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#5EC8F2] via-[#5ED7F2] to-[#377D8C]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo with Official ACCET Asset */}
        <Link href="/project/demo-project-001" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-black/40 border border-[#5EC8F2]/40 p-1 group-hover:border-[#5EC8F2] group-hover:shadow-[0_0_20px_rgba(94,200,242,0.4)] transition-all duration-300">
            <Image
              src="/logo.png"
              alt="ACCET Logo"
              width={34}
              height={34}
              className="object-contain filter drop-shadow"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-syne text-xl font-bold tracking-tight text-white group-hover:text-[#5EC8F2] transition-colors">
                ACCET
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#5EC8F2]/15 text-[#5EC8F2] border border-[#5EC8F2]/30 font-bold">
                v1.0.7
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans tracking-wide">
              Active Management Suite
            </p>
          </div>
        </Link>

        {/* Center Navigation Menu */}
        <nav className="hidden md:flex items-center gap-1.5 bg-black/40 p-1.5 rounded-2xl border border-white/15 backdrop-blur-2xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/onboarding' && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#5EC8F2]/20 to-[#377D8C]/20 text-[#5EC8F2] border border-[#5EC8F2]/40 shadow-[0_0_15px_rgba(94,200,242,0.2)] font-bold'
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
            <span className="font-bold">Node Active</span>
          </div>

          <Link
            href="/login"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono text-[#020624] bg-gradient-to-r from-[#5EC8F2] to-[#377D8C] hover:shadow-[0_0_20px_rgba(94,200,242,0.4)] transition-all shadow-md font-bold"
          >
            <UserCheck className="w-4 h-4 text-[#020624]" />
            <span>Sign In</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
