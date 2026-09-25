'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShopItem } from '@/data/shopItems';

export default function ItemCard({ item }: { item: ShopItem }) {
  return (
    <motion.div
      whileHover={{ scale: 1.035, y: -6 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className="relative cursor-pointer rounded-2xl overflow-hidden select-none group"
      style={{ background: item.bg, aspectRatio: '3/4' }}>

      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 35%, rgba(255,255,255,0.12), transparent 65%)' }} />

      {/* Item display */}
      <div className="absolute inset-0 flex items-center justify-center">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <span className="text-[80px] drop-shadow-xl transition-transform duration-300 group-hover:scale-110 select-none z-10">{item.emoji}</span>
        )}
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 inset-x-0 px-3.5 pb-3.5 pt-12 z-20 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)' }}>
        {item.tag && <span className="inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase text-black mb-1" style={{ background: '#f0e14a' }}>{item.tag}</span>}
        <p className="text-white text-[14px] font-bold leading-tight truncate">{item.name}</p>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-[13px]">🪙</span>
          <span className="text-white text-[14px] font-bold">{item.price.toLocaleString()}</span>
          {item.originalPrice && <span className="text-white/45 text-[12px] line-through ml-0.5">{item.originalPrice.toLocaleString()}</span>}
        </div>
      </div>
    </motion.div>
  );
}
