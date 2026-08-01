'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useDictionary } from '@/app/components/DictionaryProvider';

export default function HeaderNav() {
  const pathname = usePathname();
  const { dict, lang } = useDictionary();

  const navItems = [
    {
      name: dict?.nav?.onboarding || 'Onboarding',
      href: `/${lang}/onboarding`,
    },
    {
      name: dict?.nav?.projectStudio || 'Project Studio',
      href: `/${lang}/project/demo-project-001`,
    },
    {
      name: dict?.nav?.auditorPortal || 'Auditor Portal',
      href: `/${lang}/evaluator`,
    },
    {
      name: dict?.nav?.marketplace || 'Marketplace',
      href: `/${lang}/marketplace/demo-project-001`,
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-3xl bg-gradient-to-r from-[#0a1128] via-[#0a1128]/80 to-transparent border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-shadow duration-500">
      {/* Signature Decorator Line - Subtle */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#5EC8F2]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo with Official ACCET Asset */}
        <Link href={`/${lang}/project/demo-project-001`} className="flex items-center gap-4 group">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="ACCET Logo"
              width={32}
              height={32}
              className="object-contain filter drop-shadow opacity-90 group-hover:opacity-100 transition-opacity"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-sans text-lg font-semibold tracking-wide text-white group-hover:text-[#5EC8F2] transition-colors">
                ACCET
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-sans bg-white/10 text-slate-300 border border-white/10">
                v1.0.7
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-sans tracking-widest uppercase">
              {dict?.nav?.activeManagementSuite || 'Active Management Suite'}
            </p>
          </div>
        </Link>

        {/* Center Navigation Menu - Minimalist Pills */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== `/${lang}/onboarding` && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-2 rounded-full font-sans text-[13px] font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-white bg-white/10 border border-white/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Status / Auth */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/5 text-[#5EC8F2] text-[11px] font-sans tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5EC8F2] animate-pulse" />
            <span>{dict?.nav?.nodeActive || 'Node Active'}</span>
          </div>

          <Link
            href={`/${lang}/login`}
            className="flex items-center px-5 py-2 rounded-full text-[13px] font-sans font-medium text-[#050505] bg-gradient-to-r from-[#5EC8F2] to-[#377D8C] hover:opacity-90 transition-opacity"
          >
            {dict?.nav?.signIn || 'Sign In'}
          </Link>
        </div>
      </div>
    </header>
  );
}
