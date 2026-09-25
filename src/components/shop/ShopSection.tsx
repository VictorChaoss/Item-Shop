import React from 'react';
import { ShopItem } from '@/data/shopItems';
import ItemCard from './ItemCard';

export default function ShopSection({ id, title, items }: { id: string; title: string; items: ShopItem[] }) {
  return (
    <section id={id} className="scroll-mt-20 mb-12">
      <h2 className="text-[26px] md:text-[32px] font-black text-white tracking-tight mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {items.map(item => (
          <div key={item.id}><ItemCard item={item} /></div>
        ))}
      </div>
    </section>
  );
}
