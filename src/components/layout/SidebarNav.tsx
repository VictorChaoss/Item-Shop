'use client';

import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { allSectionIds } from '@/data/shopItems';

export default function SidebarNav({ active, onNav }: { active: string; onNav: (id: string) => void }) {
  return (
    <div className="fixed left-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-2.5">
      <button className="w-10 h-10 rounded-xl flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors mb-2"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <SlidersHorizontal className="w-4 h-4" />
      </button>
      {allSectionIds.map(id => (
        <button key={id} onClick={() => onNav(id)}
          className="transition-all duration-200 rounded-full"
          style={{
            width: active === id ? 10 : 8,
            height: active === id ? 10 : 8,
            background: active === id ? '#fff' : 'rgba(255,255,255,0.2)',
            boxShadow: active === id ? '0 0 8px rgba(255,255,255,0.3)' : 'none',
          }} />
      ))}
    </div>
  );
}
