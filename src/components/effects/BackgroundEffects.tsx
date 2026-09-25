'use client';

import React, { useEffect, useState, useMemo } from 'react';

// Seeded random for consistent SSR/client rendering
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function BackgroundEffects() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Generate particle configs once
  const particles = useMemo(() => 
    Array.from({ length: 60 }, (_, i) => ({
      left: `${seededRandom(i * 7 + 1) * 100}%`,
      size: 1.5 + seededRandom(i * 7 + 2) * 3,
      duration: 12 + seededRandom(i * 7 + 3) * 18,
      delay: seededRandom(i * 7 + 4) * 20,
      opacity: 0.15 + seededRandom(i * 7 + 5) * 0.45,
      drift: -40 + seededRandom(i * 7 + 6) * 80,
    })), []);

  const smokeWisps = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      top: `${10 + seededRandom(i * 5 + 10) * 80}%`,
      width: 300 + seededRandom(i * 5 + 11) * 400,
      height: 80 + seededRandom(i * 5 + 12) * 120,
      duration: 30 + seededRandom(i * 5 + 13) * 40,
      delay: seededRandom(i * 5 + 14) * 20,
      opacity: 0.03 + seededRandom(i * 5 + 15) * 0.04,
      direction: i % 2 === 0 ? 1 : -1,
    })), []);

  if (!mounted) return null;

  return (
    <>
      <style>{`
        @keyframes particle-rise {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          5% {
            opacity: var(--p-opacity);
          }
          85% {
            opacity: var(--p-opacity);
          }
          100% {
            transform: translateY(-110vh) translateX(var(--p-drift));
            opacity: 0;
          }
        }

        @keyframes particle-twinkle {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(2.5); }
        }

        @keyframes smoke-drift {
          0% {
            transform: translateX(calc(var(--smoke-dir) * -120vw)) scaleY(1);
            opacity: 0;
          }
          10% {
            opacity: var(--smoke-opacity);
          }
          90% {
            opacity: var(--smoke-opacity);
          }
          100% {
            transform: translateX(calc(var(--smoke-dir) * 120vw)) scaleY(1.3);
            opacity: 0;
          }
        }

        @keyframes glow-pulse {
          0% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(1.08); }
          100% { opacity: 0.2; transform: scale(1); }
        }

        @keyframes rotate-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes shimmer-line {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes noise-shift {
          0% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(-10%, 5%); }
          30% { transform: translate(5%, -10%); }
          40% { transform: translate(-5%, 15%); }
          50% { transform: translate(-10%, 5%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 10%); }
          80% { transform: translate(-15%, 0%); }
          90% { transform: translate(10%, 5%); }
          100% { transform: translate(5%, 0%); }
        }

        @keyframes ray-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* === FILM GRAIN === */}
      <div style={{
        position: 'fixed', inset: '-50%', zIndex: 2, pointerEvents: 'none', opacity: 0.04,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: '256px 256px',
        animation: 'noise-shift 8s steps(10) infinite',
      }} />

      {/* === VIGNETTE === */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)',
      }} />

      {/* === FLOATING PARTICLES — the main show === */}
      {particles.map((p, i) => (
        <div
          key={`p-${i}`}
          style={{
            position: 'fixed',
            left: p.left,
            bottom: '-10px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            pointerEvents: 'none',
            zIndex: 3,
            boxShadow: `0 0 ${p.size * 3}px ${p.size}px rgba(255,255,255,0.3)`,
            ['--p-opacity' as string]: p.opacity,
            ['--p-drift' as string]: `${p.drift}px`,
            animation: `particle-rise ${p.duration}s linear ${p.delay}s infinite, particle-twinkle ${3 + (i % 4)}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* === SMOKE / MIST WISPS === */}
      {smokeWisps.map((s, i) => (
        <div
          key={`smoke-${i}`}
          style={{
            position: 'fixed',
            top: s.top,
            left: 0,
            width: `${s.width}px`,
            height: `${s.height}px`,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, transparent 70%)',
            filter: `blur(${s.height * 0.5}px)`,
            pointerEvents: 'none',
            zIndex: 1,
            ['--smoke-dir' as string]: s.direction,
            ['--smoke-opacity' as string]: s.opacity,
            animation: `smoke-drift ${s.duration}s linear ${s.delay}s infinite`,
          }}
        />
      ))}

      {/* === LARGE GLOW ORBS — brighter, pulsing === */}
      {[
        { color: 'rgba(80,160,255,0.5)', size: 500, x: '5%', y: '5%', dur: 8 },
        { color: 'rgba(255,60,60,0.4)', size: 450, x: '75%', y: '22%', dur: 10 },
        { color: 'rgba(60,220,100,0.4)', size: 420, x: '15%', y: '42%', dur: 12 },
        { color: 'rgba(160,80,255,0.45)', size: 480, x: '70%', y: '58%', dur: 9 },
        { color: 'rgba(60,200,220,0.4)', size: 400, x: '25%', y: '78%', dur: 11 },
      ].map((orb, i) => (
        <div key={`orb-${i}`} style={{
          position: 'fixed', left: orb.x, top: orb.y,
          width: `${orb.size}px`, height: `${orb.size}px`,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${orb.color} 0%, transparent 60%)`,
          filter: `blur(${orb.size * 0.35}px)`,
          pointerEvents: 'none', zIndex: 1,
          animation: `glow-pulse ${orb.dur}s ease-in-out infinite`,
        }} />
      ))}

      {/* === LIGHT RAYS — slow rotating beams === */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        width: '200vw',
        height: '200vh',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.04,
        animation: 'ray-rotate 120s linear infinite',
        background: `conic-gradient(
          from 0deg,
          transparent 0deg, rgba(255,255,255,0.5) 2deg, transparent 4deg,
          transparent 30deg, rgba(255,255,255,0.3) 32deg, transparent 34deg,
          transparent 72deg, rgba(255,255,255,0.4) 74deg, transparent 76deg,
          transparent 120deg, rgba(255,255,255,0.3) 122deg, transparent 124deg,
          transparent 165deg, rgba(255,255,255,0.5) 167deg, transparent 169deg,
          transparent 210deg, rgba(255,255,255,0.3) 212deg, transparent 214deg,
          transparent 260deg, rgba(255,255,255,0.4) 262deg, transparent 264deg,
          transparent 310deg, rgba(255,255,255,0.3) 312deg, transparent 314deg,
          transparent 360deg
        )`,
      }} />

      {/* === SHIMMER LINES === */}
      {[12, 30, 52, 70, 88].map((top, i) => (
        <div key={`line-${i}`} style={{
          position: 'fixed',
          top: `${top}%`,
          left: 0,
          width: '100%',
          height: '1px',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0.06,
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 20%, transparent 40%, transparent 60%, rgba(255,255,255,0.4) 80%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: `shimmer-line ${14 + i * 4}s linear ${i * 3}s infinite`,
        }} />
      ))}

      {/* === TOP BLOOM === */}
      <div style={{
        position: 'fixed', top: '-200px', left: '15%',
        width: '70%', height: '500px',
        background: 'radial-gradient(ellipse at center, rgba(120,180,255,0.2) 0%, transparent 60%)',
        pointerEvents: 'none', zIndex: 1,
        filter: 'blur(60px)',
        animation: 'glow-pulse 10s ease-in-out infinite',
      }} />
    </>
  );
}
