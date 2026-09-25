'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { ShopBundle } from '@/data/shopItems';

export default function HeroBanner({ bundle }: { bundle: ShopBundle }) {
  const positions = [
    { top: '12%', left: '6%', size: 38, rot: -12 },
    { top: '8%', left: '32%', size: 30, rot: 8 },
    { top: '55%', left: '12%', size: 34, rot: -18 },
    { top: '22%', left: '50%', size: 26, rot: 5 },
    { top: '48%', left: '42%', size: 32, rot: -8 },
    { top: '18%', left: '68%', size: 28, rot: 14 },
    { top: '52%', left: '62%', size: 30, rot: -6 },
  ];

  return (
    <section id="bundle" className="scroll-mt-20 mb-10">
      {/* Title area */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-[42px] md:text-[52px] font-black italic text-white leading-none tracking-tight">ITEM SHOP</h1>
          <div className="flex items-center gap-2 mt-1.5 text-white/35 text-[13px]">
            <span>🪙</span><span>Powered by the Memecoin Store</span>
          </div>
        </div>
        <button className="hidden sm:flex h-10 px-5 rounded-full text-[14px] font-bold text-white items-center gap-2 mt-2 shrink-0"
          style={{ background: 'linear-gradient(135deg,#4f6bf6,#3b5ce4)' }}>
          <span className="text-lg">🪙</span>Buy Coins
        </button>
      </div>

      {/* Section label */}
      <h2 className="text-[28px] md:text-[34px] font-black text-white tracking-tight mb-4">{bundle.title}</h2>

      {/* Hero card */}
      <motion.div whileHover={{ scale: 1.003 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative w-full rounded-2xl overflow-hidden cursor-pointer group"
        style={{ background: bundle.bg, aspectRatio: '16/6', minHeight: 280 }}>

        {/* Scattered item emojis (only show if no hero image, or maybe keep them in the background) */}
        {!bundle.heroImageUrl && bundle.emojis.map((e, i) => {
          const p = positions[i % positions.length];
          return <span key={i} className="absolute drop-shadow-lg select-none z-10" style={{
            top: p.top, left: p.left, fontSize: p.size, transform: `rotate(${p.rot}deg)`, opacity: 0.85
          }}>{e}</span>;
        })}

        {/* Hero character(s) */}
        <div className="absolute inset-0 flex items-center justify-end overflow-hidden z-10">
            {bundle.heroImageUrl ? (
                <img src={bundle.heroImageUrl} alt={bundle.name} className="h-[120%] w-auto object-cover transform translate-y-[5%] transition-transform duration-300 group-hover:scale-105" />
            ) : (
                <>
                    <span className="absolute right-[8%] top-[10%] drop-shadow-2xl select-none" style={{ fontSize: 130 }}>{bundle.heroEmoji}</span>
                    <span className="absolute right-[28%] top-[15%] drop-shadow-2xl select-none" style={{ fontSize: 90, opacity: 0.6 }}>{bundle.heroEmoji}</span>
                </>
            )}
        </div>

        {/* Bottom overlay */}
        <div className="absolute bottom-0 inset-x-0 p-5 flex items-end justify-between z-20 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)' }}>
          <div>
            {bundle.tag && <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-black uppercase text-black mb-1.5" style={{ background: '#f0e14a' }}>{bundle.tag}</span>}
            <p className="text-white text-2xl font-bold">{bundle.name}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-base">🪙</span>
              <span className="text-white text-lg font-bold">{bundle.price.toLocaleString()}</span>
              {bundle.originalPrice && <span className="text-white/45 text-base line-through">{bundle.originalPrice.toLocaleString()}</span>}
            </div>
          </div>
          <button className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors pointer-events-auto hover:bg-white/30"
            style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}>
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
