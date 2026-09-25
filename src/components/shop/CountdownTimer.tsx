'use client';

import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    function update() {
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setHours(24, 0, 0, 0);
      const diff = tomorrow.getTime() - now.getTime();
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(
        `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
      );
    }
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) return null;

  return (
    <div className="flex items-center justify-between py-5 px-1">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
        Item Shop
      </h1>
      <div className="flex items-center gap-2 text-white/50 text-sm font-medium">
        <Clock className="w-4 h-4" />
        <span>Daily items reset in</span>
        <span className="text-white font-bold tabular-nums">{timeLeft}</span>
      </div>
    </div>
  );
}
