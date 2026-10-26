'use client';

import React, { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { X, Copy, Check, ArrowUpRight, Sparkles } from 'lucide-react';
import BackgroundEffects from '@/components/effects/BackgroundEffects';
import { SITE_CONFIG } from '@/config/site';

interface InspectedItem {
  title: string;
  price: string;
  images: string[];
  subtitle?: string;
  isBundle?: boolean;
}

const SECTION_COLORS: Record<string, string> = {
  blue: '#0a3d7a',
  red: '#8b1a1a',
  green: '#0d6b2e',
  purple: '#4a1a8a',
  teal: '#0c6878',
  matrix: '#082508',
  degen: '#3b2f15',
  wolf: '#08192b',
  mars: '#3d1607',
  diddy: '#360521',
};

const SECTION_KEYS = ['blue', 'red', 'green', 'purple', 'teal', 'matrix', 'degen', 'wolf', 'mars', 'diddy'];

export default function Home() {
  const [bgColor, setBgColor] = useState(SECTION_COLORS.blue);
  const [activeSection, setActiveSection] = useState(0);
  const [countdown, setCountdown] = useState('6D 04:24:12');
  const [inspectedItem, setInspectedItem] = useState<InspectedItem | null>(null);
  const [copiedCA, setCopiedCA] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const handleCopyCA = () => {
    navigator.clipboard.writeText(SITE_CONFIG.contractAddress);
    setCopiedCA(true);
    setTimeout(() => setCopiedCA(false), 2000);
  };

  const handleShopClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('a, button')) return;

    // Check if user clicked inside an individual item card inside .item-grid
    const itemGrid = target.closest('.item-grid');
    if (itemGrid) {
      const card = Array.from(itemGrid.children).find((child) => child.contains(target)) as HTMLElement | undefined;
      if (card) {
        const title = card.querySelector('h3')?.textContent?.trim() || 'Item Shop Cosmetic';
        const imgs = card.querySelectorAll('img');
        const mainImg = imgs[0]?.getAttribute('src');
        const spans = card.querySelectorAll('span');
        const price = spans[spans.length - 1]?.textContent?.trim() || '800';
        setInspectedItem({
          title,
          price,
          images: mainImg ? [mainImg] : [],
          subtitle: 'ITEM SHOP COSMETIC • UNLOCK WITH $VBUCKS',
          isBundle: false,
        });
        return;
      }
    }

    // Check if user clicked inside a hero bundle banner OR on the characters in front of it
    const heroCard = (target.closest('.hero-card') ||
      target.closest('.character-container')?.parentElement?.querySelector('.hero-card')) as HTMLElement | null;

    if (heroCard) {
      const wrapper = heroCard.parentElement;
      const title = heroCard.querySelector('.bundle-title')?.textContent?.trim() || 'Featured Bundle';
      const subtitle = heroCard.querySelector('span')?.textContent?.trim() || 'FEATURED ITEM SHOP BUNDLE';
      const charImgs = Array.from(wrapper?.querySelectorAll('.character-container img') || [])
        .map((img) => img.getAttribute('src'))
        .filter((src): src is string => Boolean(src));
      const priceEl = heroCard.querySelector('.bundle-title')?.nextElementSibling?.querySelector('span');
      const bundlePrice = priceEl?.textContent?.trim() || '2,800';

      setInspectedItem({
        title,
        price: bundlePrice,
        images: charImgs,
        subtitle,
        isBundle: true,
      });
    }
  };

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      // Count down to next Monday 00:00 UTC (weekly shop rotation)
      const dayOfWeek = now.getUTCDay(); // 0 = Sun, 1 = Mon, ...
      const daysUntilNextMonday = ((8 - dayOfWeek) % 7) || 7;
      const nextWeeklyRotation = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + daysUntilNextMonday, 0, 0, 0)
      );
      const diff = Math.max(0, Math.floor((nextWeeklyRotation.getTime() - now.getTime()) / 1000));
      const days = Math.floor(diff / 86400);
      const hrs = String(Math.floor((diff % 86400) / 3600)).padStart(2, '0');
      const mins = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
      const secs = String(diff % 60).padStart(2, '0');
      setCountdown(`${days}D ${hrs}:${mins}:${secs}`);
    };
    updateTimer();
    const timerId = setInterval(updateTimer, 1000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    const visibilityMap = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const key = Object.keys(sectionRefs.current).find(k => sectionRefs.current[k] === entry.target);
          if (key) {
            visibilityMap.set(key, entry.intersectionRatio);
          }
        });

        let bestKey = SECTION_KEYS[0];
        let maxRatio = 0;
        
        SECTION_KEYS.forEach((key) => {
          const ratio = visibilityMap.get(key) || 0;
          if (ratio > maxRatio) {
            maxRatio = ratio;
            bestKey = key;
          }
        });

        // If at the very bottom of the page, force the last section
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
          bestKey = SECTION_KEYS[SECTION_KEYS.length - 1];
        }

        setBgColor(SECTION_COLORS[bestKey] || SECTION_COLORS.blue);
        setActiveSection(SECTION_KEYS.indexOf(bestKey));
      },
      { 
        threshold: Array.from({length: 21}, (_, i) => i * 0.05) 
      }
    );

    Object.values(sectionRefs.current).forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* Fixed full-screen background that transitions color */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        backgroundColor: bgColor,
        transition: 'background-color 1.2s ease-in-out',
      }} />


      <BackgroundEffects />
      
      <div onClick={handleShopClick} style={{ flex: 1, width: '100%', position: 'relative', zIndex: 5 }}>
        
        {/* Filter Button — floats separately above the pill */}
        <button className="filter-button" style={{
          position: 'fixed',
          left: '16px',
          top: '84px',
          zIndex: 40,
          width: '52px',
          height: '52px',
          backgroundColor: '#d9dbe0',
          borderRadius: '14px',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
        }}>
          <div style={{ width: '20px', height: '3px', backgroundColor: '#000', borderRadius: '2px' }} />
          <div style={{ width: '15px', height: '3px', backgroundColor: '#000', borderRadius: '2px' }} />
          <div style={{ width: '10px', height: '3px', backgroundColor: '#000', borderRadius: '2px' }} />
        </button>

        {/* Dot Navigation Pill — vertically centered on viewport */}
        <aside className="sidebar-dots" style={{
          position: 'fixed',
          left: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 40,
        }}>
          <div style={{
            width: '52px',
            backgroundColor: '#080c12',
            borderRadius: '9999px',
            padding: '24px 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.6)',
          }}>
            {SECTION_KEYS.map((key, i) => {
              const isActive = i === activeSection;
              return (
                <button key={key} onClick={() => {
                  sectionRefs.current[key]?.scrollIntoView({ behavior: 'smooth' });
                }} style={{
                  width: isActive ? '14px' : '8px',
                  height: isActive ? '14px' : '8px',
                  borderRadius: '50%',
                  backgroundColor: isActive ? '#ffffff' : 'rgba(255,255,255,0.3)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isActive ? '0 0 12px rgba(255,255,255,0.9), 0 0 24px rgba(255,255,255,0.4)' : 'none',
                }} />
              );
            })}
          </div>
        </aside>

        {/* Main Content — pushed right to clear sidebar */}
        <main className="section-container" ref={(el) => { sectionRefs.current.blue = el; }} style={{
          width: '100%',
          paddingLeft: '90px',
          paddingRight: '40px',
          paddingTop: '40px',
          paddingBottom: '80px',
        }}>
          
          {/* Title Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
            <div>
              <h1 className="fortnite-header" style={{ fontSize: '72px', color: '#ffffff', lineHeight: 1, marginBottom: '8px' }}>ITEM SHOP</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.9)', fontWeight: 700, fontSize: '13.5px', marginTop: '10px' }}>
                <img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '26px', height: '26px', objectFit: 'contain' }} />
                <span>Powered by <strong>$VBUCKS</strong> on <strong>StonkFun.xyz</strong> &nbsp;•&nbsp; 1% Automatic USDC Holder Rewards</span>
              </div>
            </div>

            {/* Live Fortnite Shop Refresh Timer */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.16)',
              borderRadius: '12px',
              padding: '10px 18px',
            }}>
              <span style={{
                backgroundColor: '#fce000',
                color: '#000',
                fontWeight: 900,
                fontSize: '11px',
                padding: '3px 8px',
                borderRadius: '4px',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
              }}>
                WEEKLY ROTATION
              </span>
              <span className="fortnite-header" style={{
                fontSize: '26px',
                color: '#ffffff',
                letterSpacing: '1.5px',
                lineHeight: 1,
              }}>
                {countdown}
              </span>
            </div>
          </div>

          {/* Section Title */}
          <h2 className="fortnite-header section-title" style={{ fontSize: '48px', color: '#ffffff', lineHeight: 1, marginBottom: '20px' }}>I CANT BREATHE</h2>

          {/* Hero Banner — wrapper allows heads to pop out */}
          <div style={{
            width: '100%',
            position: 'relative',
            marginBottom: '20px',
          }}>
            {/* The card */}
            <div className="hero-card" style={{
              width: '100%',
              height: '380px',
              borderRadius: '20px',
              backgroundColor: '#4eb0ff',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              
              {/* White bottom strip */}
              <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                height: '38px',
                backgroundColor: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '32px',
                zIndex: 12,
              }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#333', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  BUNDLE &nbsp; + FENTANYL, WEED, FRIED CHICKEN, KOOL AID AND NECK BRACE INCLUDED
                </span>
              </div>

              {/* Plus button */}
              <div style={{
                position: 'absolute', bottom: '50px', right: '28px',
                width: '40px', height: '40px', borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: '28px', fontWeight: 300, cursor: 'pointer',
                backdropFilter: 'blur(8px)', zIndex: 15,
              }}>+</div>

              {/* Banner text */}
              <div style={{ position: 'absolute', bottom: '60px', left: '32px', zIndex: 10 }}>
                <span style={{
                  display: 'inline-block', backgroundColor: '#fce000', color: '#000',
                  fontWeight: 900, fontSize: '13px', padding: '4px 12px',
                  borderRadius: '3px', textTransform: 'uppercase', marginBottom: '10px',
                }}>NEW!</span>
                <h3 className="bundle-title" style={{ fontSize: '32px', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>I CANT BREATHE Bundle</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '26px', height: '26px', objectFit: 'contain' }} />
                  <span style={{ fontSize: '26px', fontWeight: 700, color: '#fff' }}>3,400</span>
                  <span style={{ fontSize: '20px', fontWeight: 700, color: 'rgba(255,255,255,0.45)', textDecoration: 'line-through' }}>6,800</span>
                </div>
              </div>
            </div>

            {/* Characters — slight head overflow, waist fades seamlessly */}
            <div className="character-container" style={{
              position: 'absolute',
              right: '40px',
              bottom: '40px',
              display: 'flex',
              alignItems: 'flex-end',
              zIndex: 6,
            }}>
              <div style={{
                height: '440px',
                marginRight: '-70px',
                position: 'relative',
                zIndex: 1,
                maskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
              }}>
                <img 
                  src="/images/character1.png" 
                  alt="Character 1"
                  style={{
                    height: '100%',
                    width: 'auto',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 0 25px rgba(100,140,255,0.6)) drop-shadow(0 0 50px rgba(80,120,255,0.3))',
                  }}
                />
              </div>
              <div style={{
                height: '440px',
                position: 'relative',
                zIndex: 2,
                maskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
              }}>
                <img 
                  src="/images/character2.png" 
                  alt="Character 2"
                  style={{
                    height: '100%',
                    width: 'auto',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 0 25px rgba(100,140,255,0.6)) drop-shadow(0 0 50px rgba(80,120,255,0.3))',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Item Cards Grid */}
          <div className="item-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginBottom: '60px',
          }}>
            
            <div style={{
              height: '320px', borderRadius: '20px',
              background: 'linear-gradient(180deg, #4eb0ff 0%, #2a80d0 100%)',
              padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              position: 'relative', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
            }}>
              <img src="/images/fried_chicken_koolaid.png" alt="Fried Chicken & Kool Aid" style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '65%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))', zIndex: 1 }} />
              <span style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', zIndex: 5 }}>NEW!</span>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px', position: 'relative', zIndex: 5 }}>Fried Chicken & Kool Aid</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 5 }}>
                <img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
                <span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>800</span>
              </div>
            </div>

            <div style={{
              height: '320px', borderRadius: '20px',
              background: 'linear-gradient(180deg, #4eb0ff 0%, #2a80d0 100%)',
              padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              position: 'relative', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
            }}>
              <img src="/images/fentanyl.png" alt="Fentanyl" style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '65%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))', zIndex: 1 }} />
              <span style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', zIndex: 5 }}>NEW!</span>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px', position: 'relative', zIndex: 5 }}>Fentanyl</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 5 }}>
                <img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
                <span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>800</span>
              </div>
            </div>

            <div style={{
              height: '320px', borderRadius: '20px',
              background: 'linear-gradient(180deg, #4eb0ff 0%, #2a80d0 100%)',
              padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              position: 'relative', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
            }}>
              <img src="/images/protest_pickaxe.png" alt="Protest Pickaxe" style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '65%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))', zIndex: 1 }} />
              <span style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', zIndex: 5 }}>NEW!</span>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px', position: 'relative', zIndex: 5 }}>Protest Pickaxe</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 5 }}>
                <img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
                <span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>800</span>
              </div>
            </div>

          </div>

        </main>

        {/* === RED SECTION === */}
        <div className="section-container" ref={(el) => { sectionRefs.current.red = el; }} style={{
          width: '100%',
          paddingLeft: '90px',
          paddingRight: '40px',
          paddingTop: '60px',
          paddingBottom: '80px',
        }}>
          
          {/* Section Title */}
          <h2 className="fortnite-header section-title" style={{ fontSize: '48px', color: '#ffffff', lineHeight: 1, marginBottom: '24px' }}>THE OFFENDERS</h2>

          {/* Hero Banner — wrapper allows heads to pop out */}
          <div style={{
            width: '100%',
            position: 'relative',
            marginBottom: '60px',
          }}>
            {/* The card */}
            <div className="hero-card" style={{
              width: '100%',
              height: '380px',
              borderRadius: '20px',
              background: 'linear-gradient(180deg, #2a3a6e 0%, #1a2a5e 40%, #0c1530 100%)',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              
              {/* White bottom strip */}
              <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                height: '38px',
                backgroundColor: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '32px',
                zIndex: 12,
              }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#333', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  BUNDLE &nbsp; + WAR CRIMES, GENOCIDE, ETHNIC CLEANSING, APARTHEID
                </span>
              </div>

              {/* Plus button */}
              <div style={{
                position: 'absolute', bottom: '50px', right: '28px',
                width: '40px', height: '40px', borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: '28px', fontWeight: 300, cursor: 'pointer',
                backdropFilter: 'blur(8px)', zIndex: 15,
              }}>+</div>

              {/* Banner text */}
              <div style={{ position: 'absolute', bottom: '60px', left: '32px', zIndex: 10 }}>
                <span style={{
                  display: 'inline-block', backgroundColor: '#fce000', color: '#000',
                  fontWeight: 900, fontSize: '13px', padding: '4px 12px',
                  borderRadius: '3px', textTransform: 'uppercase', marginBottom: '10px',
                }}>NEW!</span>
                <h3 className="bundle-title" style={{ fontSize: '32px', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>The Offenders Bundle</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '26px', height: '26px', objectFit: 'contain' }} />
                  <span style={{ fontSize: '26px', fontWeight: 700, color: '#fff' }}>4,200</span>
                  <span style={{ fontSize: '20px', fontWeight: 700, color: 'rgba(255,255,255,0.45)', textDecoration: 'line-through' }}>8,400</span>
                </div>
              </div>
            </div>

            {/* Characters — slight head overflow, waist fades seamlessly */}
            <div className="character-container" style={{
              position: 'absolute',
              right: '40px',
              bottom: '40px',
              display: 'flex',
              alignItems: 'flex-end',
              zIndex: 6,
            }}>
              <div style={{
                height: '440px',
                marginRight: '-70px',
                position: 'relative',
                zIndex: 1,
                maskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
              }}>
                <img 
                  src="/images/offender1.png" 
                  alt="Offender 1"
                  style={{
                    height: '100%',
                    width: 'auto',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 0 25px rgba(100,140,255,0.6)) drop-shadow(0 0 50px rgba(80,120,255,0.3))',
                  }}
                />
              </div>
              <div style={{
                height: '440px',
                position: 'relative',
                zIndex: 2,
                maskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
              }}>
                <img 
                  src="/images/offender2.png" 
                  alt="Offender 2"
                  style={{
                    height: '100%',
                    width: 'auto',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 0 25px rgba(100,140,255,0.6)) drop-shadow(0 0 50px rgba(80,120,255,0.3))',
                  }}
                />
              </div>
            </div>
          </div>

          {/* 3 Item Cards */}
          <div className="item-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {/* Card 1: Two State Solution */}
            <div style={{
              height: '320px', borderRadius: '20px',
              background: 'linear-gradient(180deg, #1a2a5e 0%, #0c1530 100%)',
              padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              position: 'relative', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
            }}>
              <img src="/images/two_state_solution.jpg" alt="Two State Solution" style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '65%', objectFit: 'contain', mixBlendMode: 'screen'}} />
              <span style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', zIndex: 5 }}>NEW!</span>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px', position: 'relative', zIndex: 5 }}>Two State Solution</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 5 }}>
                <img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
                <span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>800</span>
              </div>
            </div>

            {/* Card 2 */}
            <div style={{
              height: '320px', borderRadius: '20px',
              background: 'linear-gradient(180deg, #1a2a5e 0%, #0c1530 100%)',
              padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              position: 'relative', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
            }}>
              <img src="/images/talking_point.jpg" alt="The Talking Point" style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '65%', objectFit: 'contain', mixBlendMode: 'screen'}} />
              <span style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', zIndex: 5 }}>NEW!</span>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px', position: 'relative', zIndex: 5 }}>The Talking Point</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 5 }}>
                <img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
                <span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>800</span>
              </div>
            </div>

            {/* Card 3 */}
            <div style={{
              height: '320px', borderRadius: '20px',
              background: 'linear-gradient(180deg, #1a2a5e 0%, #0c1530 100%)',
              padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              position: 'relative', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
            }}>
              <img src="/images/ceasefire_report.jpg" alt="The Ceasefire Report" style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '65%', objectFit: 'contain', mixBlendMode: 'screen'}} />
              <span style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', zIndex: 5 }}>NEW!</span>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px', position: 'relative', zIndex: 5 }}>The Ceasefire Report</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 5 }}>
                <img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
                <span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>800</span>
              </div>
            </div>
          </div>

        </div>

        {/* === GREEN SECTION === */}
        <div className="section-container" ref={(el) => { sectionRefs.current.green = el; }} style={{
          width: '100%',
          paddingLeft: '90px',
          paddingRight: '40px',
          paddingTop: '60px',
          paddingBottom: '80px',
        }}>
          <h2 className="fortnite-header section-title" style={{ fontSize: '48px', color: '#ffffff', lineHeight: 1, marginBottom: '24px' }}>THE SERIAL RUGGERS</h2>

          <div style={{ width: '100%', position: 'relative', marginBottom: '20px' }}>
            <div className="hero-card" style={{
              width: '100%', height: '380px', borderRadius: '20px',
              background: 'linear-gradient(135deg, #34a85a 0%, #1e7a3a 50%, #105a22 100%)',
              position: 'relative', overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '38px', backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', paddingLeft: '32px', zIndex: 12 }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#333', letterSpacing: '0.5px', textTransform: 'uppercase' }}>BUNDLE &nbsp; + FARMING, BUNDLING, RUGGING AND OVER EATING</span>
              </div>
              <div style={{ position: 'absolute', bottom: '50px', right: '28px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '28px', fontWeight: 300, cursor: 'pointer', backdropFilter: 'blur(8px)', zIndex: 15 }}>+</div>
              <div style={{ position: 'absolute', bottom: '60px', left: '32px', zIndex: 10 }}>
                <span style={{ display: 'inline-block', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '13px', padding: '4px 12px', borderRadius: '3px', textTransform: 'uppercase', marginBottom: '10px' }}>NEW!</span>
                <h3 className="bundle-title" style={{ fontSize: '32px', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>The Serial Rugger Bundle</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '26px', height: '26px', objectFit: 'contain' }} />
                  <span style={{ fontSize: '26px', fontWeight: 700, color: '#fff' }}>2,800</span>
                  <span style={{ fontSize: '20px', fontWeight: 700, color: 'rgba(255,255,255,0.45)', textDecoration: 'line-through' }}>4,200</span>
                </div>
              </div>
            </div>

            {/* Characters — 3 chars, same waist fade style */}
            <div className="character-container" style={{
              position: 'absolute',
              right: '20px',
              bottom: '40px',
              display: 'flex',
              alignItems: 'flex-end',
              zIndex: 6,
            }}>
              <div style={{
                height: '420px',
                marginRight: '-80px',
                position: 'relative',
                zIndex: 1,
                maskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
              }}>
                <img src="/images/section3_char1.png" alt="Character 1" style={{ height: '100%', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 0 25px rgba(100,140,255,0.6)) drop-shadow(0 0 50px rgba(80,120,255,0.3))' }} />
              </div>
              <div style={{
                height: '420px',
                marginRight: '-80px',
                position: 'relative',
                zIndex: 2,
                maskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
              }}>
                <img src="/images/section3_char2.png" alt="Character 2" style={{ height: '100%', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 0 25px rgba(100,140,255,0.6)) drop-shadow(0 0 50px rgba(80,120,255,0.3))' }} />
              </div>
              <div style={{
                height: '420px',
                position: 'relative',
                zIndex: 3,
                maskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
              }}>
                <img src="/images/section3_char3.png" alt="Character 3" style={{ height: '100%', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 0 25px rgba(100,140,255,0.6)) drop-shadow(0 0 50px rgba(80,120,255,0.3))' }} />
              </div>
            </div>
          </div>

          {/* 3 Item Cards */}
          <div className="item-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {/* Card 1: Exit Liquidity */}
            <div style={{
              height: '320px', borderRadius: '20px',
              background: 'linear-gradient(180deg, #42c268 0%, #248a42 100%)',
              padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              position: 'relative', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
            }}>
              <img src="/images/exit_liquidity.png" alt="Exit Liquidity" style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '65%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))', zIndex: 1 }} />
              <span style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', zIndex: 5 }}>NEW!</span>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px', position: 'relative', zIndex: 5 }}>Exit Liquidity</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 5 }}>
                <img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
                <span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>800</span>
              </div>
            </div>

            {/* Card 2 */}
            <div style={{
              height: '320px', borderRadius: '20px',
              background: 'linear-gradient(180deg, #42c268 0%, #248a42 100%)',
              padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              position: 'relative', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
            }}>
              <img src="/images/blackbull_gta.png" alt="Black Bull GT" style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '65%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))', zIndex: 1 }} />
              <span style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', zIndex: 5 }}>NEW!</span>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px', position: 'relative', zIndex: 5 }}>Black Bull GT</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 5 }}>
                <img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
                <span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>800</span>
              </div>
            </div>

            {/* Card 3 */}
            <div style={{
              height: '320px', borderRadius: '20px',
              background: 'linear-gradient(180deg, #42c268 0%, #248a42 100%)',
              padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              position: 'relative', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
            }}>
              <img src="/images/10x_with_cheese.png" alt="10x With Cheese" style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '65%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))', zIndex: 1 }} />
              <span style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', zIndex: 5 }}>NEW!</span>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px', position: 'relative', zIndex: 5 }}>10x With Cheese</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 5 }}>
                <img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
                <span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>800</span>
              </div>
            </div>
          </div>
        </div>

        {/* === PURPLE SECTION === */}
        <div className="section-container" ref={(el) => { sectionRefs.current.purple = el; }} style={{
          width: '100%', paddingLeft: '90px', paddingRight: '40px', paddingTop: '60px', paddingBottom: '80px',
        }}>
          <h2 className="fortnite-header section-title" style={{ fontSize: '48px', color: '#ffffff', lineHeight: 1, marginBottom: '24px' }}>THE EPSTEIN FILES</h2>

          <div style={{ width: '100%', position: 'relative', marginBottom: '20px' }}>
            <div className="hero-card" style={{
              width: '100%', height: '380px', borderRadius: '20px',
              background: 'linear-gradient(135deg, #3a1870 0%, #2a1060 50%, #1a0c3a 100%)',
              position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '38px', backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', paddingLeft: '32px', zIndex: 12 }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#333', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  BUNDLE &nbsp; + ISLAND ACCESS, CLIENT LIST, BLACKMAIL TAPES AND SUICIDE NOTE INCLUDED
                </span>
              </div>
              <div style={{ position: 'absolute', bottom: '50px', right: '28px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '28px', fontWeight: 300, cursor: 'pointer', backdropFilter: 'blur(8px)', zIndex: 15 }}>+</div>
              <div style={{ position: 'absolute', bottom: '60px', left: '32px', zIndex: 10 }}>
                <span style={{ display: 'inline-block', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '13px', padding: '4px 12px', borderRadius: '3px', textTransform: 'uppercase', marginBottom: '10px' }}>NEW!</span>
                <h3 className="bundle-title" style={{ fontSize: '32px', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>The Epstein Files Bundle</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '26px', height: '26px', objectFit: 'contain' }} />
                  <span style={{ fontSize: '26px', fontWeight: 700, color: '#fff' }}>2,000</span>
                  <span style={{ fontSize: '20px', fontWeight: 700, color: 'rgba(255,255,255,0.45)', textDecoration: 'line-through' }}>4,000</span>
                </div>
              </div>
            </div>

            {/* Character */}
            <div className="character-container" style={{
              position: 'absolute',
              right: '80px',
              bottom: '40px',
              display: 'flex',
              alignItems: 'flex-end',
              zIndex: 6,
            }}>
              <div style={{
                height: '440px',
                position: 'relative',
                zIndex: 1,
                maskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
              }}>
                <img 
                  src="/images/epstein.png" 
                  alt="Jeffrey Epstein"
                  style={{
                    height: '100%',
                    width: 'auto',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 0 25px rgba(100,140,255,0.6)) drop-shadow(0 0 50px rgba(80,120,255,0.3))',
                  }}
                />
              </div>
            </div>
          </div>

          <div className="item-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {/* Card 1: Map of Little Saint James */}
            <div style={{
              height: '320px', borderRadius: '20px',
              background: 'linear-gradient(180deg, #3a1870 0%, #1a0c3a 100%)',
              padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              position: 'relative', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
            }}>
              <img src="/images/little_saint_james_map.png" alt="Map of Little Saint James" style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '65%', objectFit: 'contain', mixBlendMode: 'screen'}} />
              <span style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', zIndex: 5 }}>NEW!</span>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px', position: 'relative', zIndex: 5 }}>Map of Little Saint James</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 5 }}>
                <img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
                <span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>800</span>
              </div>
            </div>

            {/* Card 2 */}
            <div style={{
              height: '320px', borderRadius: '20px',
              background: 'linear-gradient(180deg, #3a1870 0%, #1a0c3a 100%)',
              padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              position: 'relative', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
            }}>
              <img src="/images/epstein_files_classified.jpg" alt="The Classified Files" style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '65%', objectFit: 'contain', mixBlendMode: 'screen'}} />
              <span style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', zIndex: 5 }}>NEW!</span>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px', position: 'relative', zIndex: 5 }}>The Classified Files</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 5 }}>
                <img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
                <span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>800</span>
              </div>
            </div>

            {/* Card 3 */}
            <div style={{
              height: '320px', borderRadius: '20px',
              background: 'linear-gradient(180deg, #3a1870 0%, #1a0c3a 100%)',
              padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              position: 'relative', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
            }}>
              <img src="/images/lolita_express.png" alt="Lolita Express" style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '65%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))', zIndex: 1 }} />
              <span style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', zIndex: 5 }}>NEW!</span>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px', position: 'relative', zIndex: 5 }}>Lolita Express</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 5 }}>
                <img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
                <span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>800</span>
              </div>
            </div>
          </div>
        </div>

        {/* === TEAL/OCEAN SECTION === */}
        <div className="section-container" ref={(el) => { sectionRefs.current.teal = el; }} style={{
          width: '100%', paddingLeft: '90px', paddingRight: '40px', paddingTop: '60px', paddingBottom: '80px',
        }}>
          <h2 className="fortnite-header section-title" style={{ fontSize: '48px', color: '#ffffff', lineHeight: 1, marginBottom: '24px' }}>LA VAPE CABAL</h2>

          <div style={{ width: '100%', position: 'relative', marginBottom: '20px' }}>
            <div className="hero-card" style={{
              width: '100%', height: '380px', borderRadius: '20px',
              background: 'linear-gradient(135deg, #32bcd0 0%, #1e8a9a 50%, #10606e 100%)',
              position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '38px', backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', paddingLeft: '32px', zIndex: 12 }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#333', letterSpacing: '0.5px', textTransform: 'uppercase' }}>BUNDLE &nbsp; + CHROME HEARTS, NICOTINE ADDICTION AND A CURRY POTION INCLUDED</span>
              </div>
              <div style={{ position: 'absolute', bottom: '50px', right: '28px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '28px', fontWeight: 300, cursor: 'pointer', backdropFilter: 'blur(8px)', zIndex: 15 }}>+</div>
              <div style={{ position: 'absolute', bottom: '60px', left: '32px', zIndex: 10 }}>
                <span style={{ display: 'inline-block', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '13px', padding: '4px 12px', borderRadius: '3px', textTransform: 'uppercase', marginBottom: '10px' }}>NEW!</span>
                <h3 className="bundle-title" style={{ fontSize: '28px', fontWeight: 800, color: '#fff', marginBottom: '6px', maxWidth: '80%' }}>All the homies with the Extra Chromeys</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '26px', height: '26px', objectFit: 'contain' }} />
                  <span style={{ fontSize: '26px', fontWeight: 700, color: '#fff' }}>4,200</span>
                  <span style={{ fontSize: '20px', fontWeight: 700, color: 'rgba(255,255,255,0.45)', textDecoration: 'line-through' }}>6,000</span>
                </div>
              </div>
            </div>

            {/* Characters */}
            <div className="character-container" style={{
              position: 'absolute', right: '40px', bottom: '40px',
              display: 'flex', alignItems: 'flex-end', zIndex: 6,
            }}>
              <div style={{
                height: '420px', marginRight: '-80px', position: 'relative', zIndex: 1,
                maskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
              }}>
                <img src="/images/frank.png" alt="Frank" style={{ height: '100%', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 0 25px rgba(100,140,255,0.6)) drop-shadow(0 0 50px rgba(80,120,255,0.3))' }} />
              </div>
              <div style={{
                height: '440px', marginRight: '-80px', position: 'relative', zIndex: 3,
                maskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
              }}>
                <img src="/images/thread_guy.png" alt="Thread Guy" style={{ height: '100%', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 0 25px rgba(100,140,255,0.6)) drop-shadow(0 0 50px rgba(80,120,255,0.3))' }} />
              </div>
              <div style={{
                height: '420px', position: 'relative', zIndex: 2,
                maskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
              }}>
                <img src="/images/banks.png" alt="Banks" style={{ height: '100%', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 0 25px rgba(100,140,255,0.6)) drop-shadow(0 0 50px rgba(80,120,255,0.3))' }} />
              </div>
            </div>
          </div>

          <div className="item-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {/* Card 1 */}
            <div style={{ height: '320px', borderRadius: '20px', background: 'linear-gradient(180deg, #40d4e6 0%, #1e8e9e 100%)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)' }}>
              <img src="/images/chrome_bag.png" alt="Chrome Bag" style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '65%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 5 }}>
                <span style={{ display: 'inline-block', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>NEW!</span>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Chrome Bag</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /><span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>800</span></div>
              </div>
            </div>
            
            {/* Card 2 */}
            <div style={{ height: '320px', borderRadius: '20px', background: 'linear-gradient(180deg, #40d4e6 0%, #1e8e9e 100%)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)' }}>
              <img src="/images/vape_axe.png" alt="Vape Axe" style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '65%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 5 }}>
                <span style={{ display: 'inline-block', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>NEW!</span>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Vape Axe</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /><span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>800</span></div>
              </div>
            </div>

            {/* Card 3 */}
            <div style={{ height: '320px', borderRadius: '20px', background: 'linear-gradient(180deg, #40d4e6 0%, #1e8e9e 100%)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)' }}>
              <img src="/images/curry_potion.png" alt="Curry Potion" style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '65%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 5 }}>
                <span style={{ display: 'inline-block', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>NEW!</span>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Curry Potion</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /><span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>1,200</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* === ESCAPE THE MATRIX SECTION === */}
        <div className="section-container" ref={(el) => { sectionRefs.current.matrix = el; }} style={{
          width: '100%', paddingLeft: '90px', paddingRight: '40px', paddingTop: '60px', paddingBottom: '80px',
        }}>
          <h2 className="fortnite-header section-title" style={{ fontSize: '48px', color: '#ffffff', lineHeight: 1, marginBottom: '24px' }}>ESCAPE THE MATRIX</h2>

          <div style={{ width: '100%', position: 'relative', marginBottom: '20px' }}>
            <div className="hero-card" style={{
              width: '100%', height: '380px', borderRadius: '20px',
              background: 'linear-gradient(135deg, #103010 0%, #0a200a 50%, #051005 100%)',
              position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '38px', backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', paddingLeft: '32px', zIndex: 12 }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#333', letterSpacing: '0.5px', textTransform: 'uppercase' }}>BUNDLE &nbsp; + BUGATTI, JOHNNY WALKER AND CIGAR, RED PILL AND SPARKLING WATER INCLUDED</span>
              </div>
              <div style={{ position: 'absolute', bottom: '50px', right: '28px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '28px', fontWeight: 300, cursor: 'pointer', backdropFilter: 'blur(8px)', zIndex: 15 }}>+</div>
              <div style={{ position: 'absolute', bottom: '60px', left: '32px', zIndex: 10 }}>
                <span style={{ display: 'inline-block', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '13px', padding: '4px 12px', borderRadius: '3px', textTransform: 'uppercase', marginBottom: '10px' }}>NEW!</span>
                <h3 className="bundle-title" style={{ fontSize: '32px', fontWeight: 800, color: '#fff', marginBottom: '6px', maxWidth: '80%' }}>The TOP G Bundle</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '26px', height: '26px', objectFit: 'contain' }} />
                  <span style={{ fontSize: '26px', fontWeight: 700, color: '#fff' }}>4,500</span>
                  <span style={{ fontSize: '20px', fontWeight: 700, color: 'rgba(255,255,255,0.45)', textDecoration: 'line-through' }}>6,500</span>
                </div>
              </div>
            </div>

            {/* Characters */}
            <div className="character-container" style={{
              position: 'absolute', right: '40px', bottom: '40px',
              display: 'flex', alignItems: 'flex-end', zIndex: 6,
            }}>
              <div style={{
                height: '420px', marginRight: '-80px', position: 'relative', zIndex: 1,
                maskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
              }}>
                <img src="/images/talisman_tate.png" alt="Talisman Tate" style={{ height: '100%', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 0 25px rgba(100,255,100,0.6)) drop-shadow(0 0 50px rgba(100,255,100,0.3))' }} />
              </div>
              <div style={{
                height: '440px', position: 'relative', zIndex: 2,
                maskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
              }}>
                <img src="/images/top_g.png" alt="Top G" style={{ height: '100%', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 0 25px rgba(100,255,100,0.6)) drop-shadow(0 0 50px rgba(100,255,100,0.3))' }} />
              </div>
            </div>
          </div>

          <div className="item-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {/* Card 1 */}
            <div style={{ height: '320px', borderRadius: '20px', background: 'linear-gradient(180deg, #1a401a 0%, #0a200a 100%)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)' }}>
              <img src="/images/matrix_bugatti.png" alt="Bugatti" style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '65%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 5 }}>
                <span style={{ display: 'inline-block', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>NEW!</span>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Bugatti</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /><span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>1,500</span></div>
              </div>
            </div>
            
            {/* Card 2 */}
            <div style={{ height: '320px', borderRadius: '20px', background: 'linear-gradient(180deg, #1a401a 0%, #0a200a 100%)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)' }}>
              <img src="/images/matrix_cigar.png" alt="Johnny Walker and Cigar" style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '65%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 5 }}>
                <span style={{ display: 'inline-block', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>NEW!</span>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Johnny Walker & Cigar</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /><span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>500</span></div>
              </div>
            </div>

            {/* Card 3 */}
            <div style={{ height: '320px', borderRadius: '20px', background: 'linear-gradient(180deg, #1a401a 0%, #0a200a 100%)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)' }}>
              <img src="/images/matrix_red_pill.png" alt="Red Pill" style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '65%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 5 }}>
                <span style={{ display: 'inline-block', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>NEW!</span>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Red Pill</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /><span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>200</span></div>
              </div>
            </div>

            {/* Card 4 */}
            <div style={{ height: '320px', borderRadius: '20px', background: 'linear-gradient(180deg, #1a401a 0%, #0a200a 100%)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)' }}>
              <img src="/images/matrix_water.png" alt="Sparkling Water" style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '65%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 5 }}>
                <span style={{ display: 'inline-block', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>NEW!</span>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Sparkling Water</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /><span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>800</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* === THE MAX WIN BUNDLE SECTION === */}
        <div className="section-container" ref={(el) => { sectionRefs.current.degen = el; }} style={{
          width: '100%', paddingLeft: '90px', paddingRight: '40px', paddingTop: '60px', paddingBottom: '80px',
        }}>
          <h2 className="fortnite-header section-title" style={{ fontSize: '48px', color: '#ffffff', lineHeight: 1, marginBottom: '24px' }}>MAX WIN</h2>

          <div style={{ width: '100%', position: 'relative', marginBottom: '20px' }}>
            <div className="hero-card" style={{
              width: '100%', height: '380px', borderRadius: '20px',
              background: 'linear-gradient(135deg, #3b2f15 0%, #201808 50%, #110d04 100%)',
              position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '38px', backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', paddingLeft: '32px', zIndex: 12 }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#333', letterSpacing: '0.5px', textTransform: 'uppercase' }}>BUNDLE &nbsp; + IOU, LUCKY PICKAXE, THE JUICE AND THE LAST BET INCLUDED</span>
              </div>
              <div style={{ position: 'absolute', bottom: '50px', right: '28px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '28px', fontWeight: 300, cursor: 'pointer', backdropFilter: 'blur(8px)', zIndex: 15 }}>+</div>
              <div style={{ position: 'absolute', bottom: '60px', left: '32px', zIndex: 10 }}>
                <span style={{ display: 'inline-block', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '13px', padding: '4px 12px', borderRadius: '3px', textTransform: 'uppercase', marginBottom: '10px' }}>NEW!</span>
                <h3 className="bundle-title" style={{ fontSize: '32px', fontWeight: 800, color: '#fff', marginBottom: '6px', maxWidth: '80%' }}>The Max Win Bundle</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '26px', height: '26px', objectFit: 'contain' }} />
                  <span style={{ fontSize: '26px', fontWeight: 700, color: '#fff' }}>5,000</span>
                  <span style={{ fontSize: '20px', fontWeight: 700, color: 'rgba(255,255,255,0.45)', textDecoration: 'line-through' }}>8,000</span>
                </div>
              </div>
            </div>

            {/* Characters */}
            <div className="character-container" style={{
              position: 'absolute', right: '40px', bottom: '40px',
              display: 'flex', alignItems: 'flex-end', zIndex: 6,
            }}>
              <div style={{
                height: '420px', marginRight: '-60px', position: 'relative', zIndex: 1,
                maskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
              }}>
                <img src="/images/steve.png" alt="SteveWillDoIt" style={{ height: '100%', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 0 25px rgba(255,200,50,0.6)) drop-shadow(0 0 50px rgba(255,200,50,0.3))' }} />
              </div>
              <div style={{
                height: '440px', position: 'relative', zIndex: 2,
                maskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
              }}>
                <img src="/images/togi.png" alt="Togi" style={{ height: '100%', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 0 25px rgba(255,200,50,0.6)) drop-shadow(0 0 50px rgba(255,200,50,0.3))' }} />
              </div>
            </div>
          </div>

          <div className="item-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {/* Card 1 */}
            <div style={{ height: '320px', borderRadius: '20px', background: 'linear-gradient(180deg, #3b2f15 0%, #201808 100%)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)' }}>
              <img src="/images/iou.png" alt="IOU" style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '65%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 5 }}>
                <span style={{ display: 'inline-block', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>NEW!</span>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>IOU</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /><span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>500</span></div>
              </div>
            </div>
            
            {/* Card 2 */}
            <div style={{ height: '320px', borderRadius: '20px', background: 'linear-gradient(180deg, #3b2f15 0%, #201808 100%)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)' }}>
              <img src="/images/lucky_pickaxe.png" alt="Lucky Pickaxe" style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '65%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 5 }}>
                <span style={{ display: 'inline-block', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>NEW!</span>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Lucky Pickaxe</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /><span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>800</span></div>
              </div>
            </div>

            {/* Card 3 */}
            <div style={{ height: '320px', borderRadius: '20px', background: 'linear-gradient(180deg, #3b2f15 0%, #201808 100%)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)' }}>
              <img src="/images/the_juice.png" alt="The Juice" style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '65%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 5 }}>
                <span style={{ display: 'inline-block', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>NEW!</span>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>The Juice</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /><span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>1,500</span></div>
              </div>
            </div>

            {/* Card 4 */}
            <div style={{ height: '320px', borderRadius: '20px', background: 'linear-gradient(180deg, #3b2f15 0%, #201808 100%)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)' }}>
              <img src="/images/the_last_bet.png" alt="The Last Bet" style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '65%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 5 }}>
                <span style={{ display: 'inline-block', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>NEW!</span>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>The Last Bet</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /><span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>2,000</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* === THE WOLF OF WALL STREET BUNDLE SECTION === */}
        <div className="section-container" ref={(el) => { sectionRefs.current.wolf = el; }} style={{
          width: '100%', paddingLeft: '90px', paddingRight: '40px', paddingTop: '60px', paddingBottom: '80px',
        }}>
          <h2 className="fortnite-header section-title" style={{ fontSize: '48px', color: '#ffffff', lineHeight: 1, marginBottom: '24px' }}>WOLF OF WALL STREET</h2>

          <div style={{ width: '100%', position: 'relative', marginBottom: '20px' }}>
            <div className="hero-card" style={{
              width: '100%', height: '380px', borderRadius: '20px',
              background: 'linear-gradient(135deg, #08192b 0%, #05101a 50%, #02080d 100%)',
              position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '38px', backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', paddingLeft: '32px', zIndex: 12 }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#333', letterSpacing: '0.5px', textTransform: 'uppercase' }}>BUNDLE &nbsp; + AEROTYNE PENNY SHEET, COUNTACH AND QUAALUDES INCLUDED</span>
              </div>
              <div style={{ position: 'absolute', bottom: '50px', right: '28px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '28px', fontWeight: 300, cursor: 'pointer', backdropFilter: 'blur(8px)', zIndex: 15 }}>+</div>
              <div style={{ position: 'absolute', bottom: '60px', left: '32px', zIndex: 10 }}>
                <span style={{ display: 'inline-block', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '13px', padding: '4px 12px', borderRadius: '3px', textTransform: 'uppercase', marginBottom: '10px' }}>NEW!</span>
                <h3 className="bundle-title" style={{ fontSize: '32px', fontWeight: 800, color: '#fff', marginBottom: '6px', maxWidth: '80%' }}>The Wolf Bundle</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '26px', height: '26px', objectFit: 'contain' }} />
                  <span style={{ fontSize: '26px', fontWeight: 700, color: '#fff' }}>4,000</span>
                  <span style={{ fontSize: '20px', fontWeight: 700, color: 'rgba(255,255,255,0.45)', textDecoration: 'line-through' }}>6,000</span>
                </div>
              </div>
            </div>

            {/* Characters */}
            <div className="character-container" style={{
              position: 'absolute', right: '40px', bottom: '40px',
              display: 'flex', alignItems: 'flex-end', zIndex: 6,
            }}>
              <div style={{
                height: '420px', marginRight: '-60px', position: 'relative', zIndex: 1,
                maskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
              }}>
                <img src="/images/donnie.png" alt="Donnie Azoff" style={{ height: '100%', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 0 25px rgba(100,150,255,0.6)) drop-shadow(0 0 50px rgba(100,150,255,0.3))' }} />
              </div>
              <div style={{
                height: '440px', position: 'relative', zIndex: 2,
                maskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
              }}>
                <img src="/images/jordan.png" alt="Jordan Belfort" style={{ height: '100%', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 0 25px rgba(100,150,255,0.6)) drop-shadow(0 0 50px rgba(100,150,255,0.3))' }} />
              </div>
            </div>
          </div>

          <div className="item-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {/* Card 1 */}
            <div style={{ height: '320px', borderRadius: '20px', background: 'linear-gradient(180deg, #08192b 0%, #05101a 100%)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)' }}>
              <img src="/images/aerotyne.png" alt="Aerotyne Penny Sheet" style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '65%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 5 }}>
                <span style={{ display: 'inline-block', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>NEW!</span>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Aerotyne Penny Sheet</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /><span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>500</span></div>
              </div>
            </div>
            
            {/* Card 2 */}
            <div style={{ height: '320px', borderRadius: '20px', background: 'linear-gradient(180deg, #08192b 0%, #05101a 100%)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)' }}>
              <img src="/images/countach.png" alt="Countach" style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '65%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 5 }}>
                <span style={{ display: 'inline-block', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>NEW!</span>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Countach</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /><span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>1,500</span></div>
              </div>
            </div>

            {/* Card 3 */}
            <div style={{ height: '320px', borderRadius: '20px', background: 'linear-gradient(180deg, #08192b 0%, #05101a 100%)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)' }}>
              <img src="/images/quaalude.png" alt="Quaaludes" style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '65%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 5 }}>
                <span style={{ display: 'inline-block', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>NEW!</span>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Quaaludes</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /><span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>800</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* === THE MARS BUNDLE SECTION === */}
        <div className="section-container" ref={(el) => { sectionRefs.current.mars = el; }} style={{
          width: '100%', paddingLeft: '90px', paddingRight: '40px', paddingTop: '60px', paddingBottom: '80px',
        }}>
          <h2 className="fortnite-header section-title" style={{ fontSize: '48px', color: '#ffffff', lineHeight: 1, marginBottom: '24px' }}>MARS BOUND</h2>

          <div style={{ width: '100%', position: 'relative', marginBottom: '20px' }}>
            <div className="hero-card" style={{
              width: '100%', height: '380px', borderRadius: '20px',
              background: 'linear-gradient(135deg, #3d1607 0%, #210a01 50%, #120500 100%)',
              position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '38px', backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', paddingLeft: '32px', zIndex: 12 }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#333', letterSpacing: '0.5px', textTransform: 'uppercase' }}>BUNDLE &nbsp; + CYBERTRUCK, FLAMETHROWER AND SPACEX BACKPACK INCLUDED</span>
              </div>
              <div style={{ position: 'absolute', bottom: '50px', right: '28px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '28px', fontWeight: 300, cursor: 'pointer', backdropFilter: 'blur(8px)', zIndex: 15 }}>+</div>
              <div style={{ position: 'absolute', bottom: '60px', left: '32px', zIndex: 10 }}>
                <span style={{ display: 'inline-block', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '13px', padding: '4px 12px', borderRadius: '3px', textTransform: 'uppercase', marginBottom: '10px' }}>NEW!</span>
                <h3 className="bundle-title" style={{ fontSize: '32px', fontWeight: 800, color: '#fff', marginBottom: '6px', maxWidth: '80%' }}>The Mars Bundle</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '26px', height: '26px', objectFit: 'contain' }} />
                  <span style={{ fontSize: '26px', fontWeight: 700, color: '#fff' }}>3,500</span>
                  <span style={{ fontSize: '20px', fontWeight: 700, color: 'rgba(255,255,255,0.45)', textDecoration: 'line-through' }}>5,500</span>
                </div>
              </div>
            </div>

            {/* Characters */}
            <div className="character-container" style={{
              position: 'absolute', right: '40px', bottom: '40px',
              display: 'flex', alignItems: 'flex-end', zIndex: 6,
            }}>
              <div style={{
                height: '420px', position: 'relative', zIndex: 1,
                maskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
              }}>
                <img src="/images/elon.png" alt="Elon Musk" style={{ height: '100%', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 0 25px rgba(255,100,50,0.6)) drop-shadow(0 0 50px rgba(255,100,50,0.3))' }} />
              </div>
            </div>
          </div>

          <div className="item-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {/* Card 1 */}
            <div style={{ height: '320px', borderRadius: '20px', background: 'linear-gradient(180deg, #3d1607 0%, #210a01 100%)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)' }}>
              <img src="/images/cybertruck.png" alt="Cybertruck" style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '65%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 5 }}>
                <span style={{ display: 'inline-block', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>NEW!</span>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Cybertruck</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /><span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>2,000</span></div>
              </div>
            </div>
            
            {/* Card 2 */}
            <div style={{ height: '320px', borderRadius: '20px', background: 'linear-gradient(180deg, #3d1607 0%, #210a01 100%)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)' }}>
              <img src="/images/flamethrower.png" alt="Flamethrower" style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '65%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 5 }}>
                <span style={{ display: 'inline-block', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>NEW!</span>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Flamethrower</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /><span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>1,500</span></div>
              </div>
            </div>

            {/* Card 3 */}
            <div style={{ height: '320px', borderRadius: '20px', background: 'linear-gradient(180deg, #3d1607 0%, #210a01 100%)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)' }}>
              <img src="/images/spacex_backpack.png" alt="SpaceX Backpack" style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '65%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 5 }}>
                <span style={{ display: 'inline-block', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>NEW!</span>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>SpaceX Backpack</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /><span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>800</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* === DIDDY PARTY BUNDLE SECTION === */}
        <div className="section-container" ref={(el) => { sectionRefs.current.diddy = el; }} style={{
          width: '100%', paddingLeft: '90px', paddingRight: '40px', paddingTop: '60px', paddingBottom: '80px',
        }}>
          <h2 className="fortnite-header section-title" style={{ fontSize: '48px', color: '#ffffff', lineHeight: 1, marginBottom: '24px' }}>FREAK OFF</h2>

          <div style={{ width: '100%', position: 'relative', marginBottom: '20px' }}>
            <div className="hero-card" style={{
              width: '100%', height: '380px', borderRadius: '20px',
              background: 'linear-gradient(135deg, #360521 0%, #17020f 50%, #050003 100%)',
              position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '38px', backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', paddingLeft: '32px', zIndex: 12 }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#333', letterSpacing: '0.5px', textTransform: 'uppercase' }}>BUNDLE &nbsp; + BABY OIL BACKPACK, NDA AND PARTY INVITATION INCLUDED</span>
              </div>
              <div style={{ position: 'absolute', bottom: '50px', right: '28px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '28px', fontWeight: 300, cursor: 'pointer', backdropFilter: 'blur(8px)', zIndex: 15 }}>+</div>
              <div style={{ position: 'absolute', bottom: '60px', left: '32px', zIndex: 10 }}>
                <span style={{ display: 'inline-block', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '13px', padding: '4px 12px', borderRadius: '3px', textTransform: 'uppercase', marginBottom: '10px' }}>NEW!</span>
                <h3 className="bundle-title" style={{ fontSize: '32px', fontWeight: 800, color: '#fff', marginBottom: '6px', maxWidth: '80%' }}>The Diddy Party Bundle</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '26px', height: '26px', objectFit: 'contain' }} />
                  <span style={{ fontSize: '26px', fontWeight: 700, color: '#fff' }}>2,500</span>
                  <span style={{ fontSize: '20px', fontWeight: 700, color: 'rgba(255,255,255,0.45)', textDecoration: 'line-through' }}>4,000</span>
                </div>
              </div>
            </div>

            {/* Characters */}
            <div className="character-container" style={{
              position: 'absolute', right: '40px', bottom: '40px',
              display: 'flex', alignItems: 'flex-end', zIndex: 6,
            }}>
              <div style={{
                height: '420px', position: 'relative', zIndex: 1,
                maskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 90%)',
              }}>
                <img src="/images/p_diddy.png" alt="P Diddy" style={{ height: '100%', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 0 25px rgba(255,50,150,0.6)) drop-shadow(0 0 50px rgba(255,50,150,0.3))' }} />
              </div>
            </div>
          </div>

          <div className="item-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {/* Card 1 */}
            <div style={{ height: '320px', borderRadius: '20px', background: 'linear-gradient(180deg, #360521 0%, #17020f 100%)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)' }}>
              <img src="/images/baby_oil_backpack.png" alt="Baby Oil Backpack" style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '65%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 5 }}>
                <span style={{ display: 'inline-block', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>NEW!</span>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Baby Oil Backpack</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /><span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>1,200</span></div>
              </div>
            </div>
            
            {/* Card 2 */}
            <div style={{ height: '320px', borderRadius: '20px', background: 'linear-gradient(180deg, #360521 0%, #17020f 100%)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)' }}>
              <img src="/images/nda.png" alt="NDA" style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '65%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 5 }}>
                <span style={{ display: 'inline-block', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>NEW!</span>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>NDA</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /><span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>800</span></div>
              </div>
            </div>

            {/* Card 3 */}
            <div style={{ height: '320px', borderRadius: '20px', background: 'linear-gradient(180deg, #360521 0%, #17020f 100%)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)' }}>
              <img src="/images/party_invitation.png" alt="Party Invitation" style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '65%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 5 }}>
                <span style={{ display: 'inline-block', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>NEW!</span>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Party Invitation</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /><span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>500</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* === BOTTOM ITEM SHOP CTA FOOTER === */}
        <footer className="section-container" style={{
          width: '100%',
          paddingLeft: '90px',
          paddingRight: '40px',
          paddingBottom: '70px',
        }}>
          <div style={{
            width: '100%',
            borderRadius: '22px',
            background: 'linear-gradient(135deg, rgba(16, 24, 48, 0.92) 0%, rgba(8, 12, 24, 0.96) 100%)',
            border: '2px solid rgba(78, 176, 255, 0.3)',
            padding: '36px 36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          }}>
            <div style={{ maxWidth: '580px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '4px 10px', borderRadius: '4px', textTransform: 'uppercase', marginBottom: '10px' }}>
                <Sparkles size={13} strokeWidth={3} /> NEW SHOP ROTATION EVERY WEEK
              </div>
              <h3 className="fortnite-header" style={{ fontSize: '36px', color: '#fff', lineHeight: 1.05, marginBottom: '8px' }}>
                THE SITE IS THE ITEM SHOP. $VBUCKS IS THE CURRENCY.
              </h3>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
                Hold <strong>$VBUCKS</strong> on Solana and earn <strong>1% automatic USDC holder rewards</strong> on every transfer. Every new Item Shop rotation drops a fresh NFT collection.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={handleCopyCA}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: 'rgba(78,176,255,0.15)',
                  border: '1.5px solid #4eb0ff',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '13px',
                  fontFamily: 'monospace',
                  padding: '13px 18px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                }}
              >
                <img src="/images/vbucks_logo.png" alt="V" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
                {copiedCA ? 'COPIED TO CLIPBOARD!' : `CA: ${SITE_CONFIG.contractAddress}`}
                {copiedCA ? <Check size={16} color="#4eff8c" /> : <Copy size={16} color="#4eb0ff" />}
              </button>

              <a
                href={SITE_CONFIG.stonkfunUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'linear-gradient(90deg, #44227f 0%, #2f47d9 100%)',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '14px',
                  padding: '13px 20px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                }}
              >
                STONKFUN <ArrowUpRight size={16} strokeWidth={2.5} />
              </a>

              <a
                href={SITE_CONFIG.dexScreenerUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#1c1e24',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '14px',
                  padding: '13px 20px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                }}
              >
                DEXSCREENER <ArrowUpRight size={16} strokeWidth={2.5} />
              </a>

              <a
                href={SITE_CONFIG.xUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#fce000',
                  color: '#000',
                  fontWeight: 900,
                  fontSize: '14px',
                  padding: '13px 20px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                }}
              >
                FOLLOW {SITE_CONFIG.xHandle} <ArrowUpRight size={16} strokeWidth={3} />
              </a>
            </div>
          </div>
        </footer>

      </div>

      {/* === FORTNITE ITEM INSPECTION MODAL === */}
      {inspectedItem && (
        <div
          onClick={() => setInspectedItem(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            backgroundColor: 'rgba(4, 10, 24, 0.84)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: inspectedItem.images.length > 1 ? '660px' : '520px',
              borderRadius: '24px',
              background: 'radial-gradient(circle at 50% 25%, #3b82f6 0%, #1d4ed8 48%, #0f172a 100%)',
              border: '2px solid rgba(255,255,255,0.3)',
              boxShadow: '0 28px 80px rgba(0,0,0,0.8)',
              overflow: 'hidden',
              padding: '28px 28px 68px',
              textAlign: 'center',
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setInspectedItem(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.25)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              <X size={20} />
            </button>

            <span style={{
              display: 'inline-block',
              backgroundColor: '#fce000',
              color: '#000',
              fontWeight: 900,
              fontSize: '11px',
              padding: '4px 10px',
              borderRadius: '4px',
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}>
              {inspectedItem.isBundle
                ? `FEATURED SHOP BUNDLE${inspectedItem.images.length > 1 ? ` • ${inspectedItem.images.length} SKINS` : ''}`
                : 'ITEM SHOP COSMETIC'}
            </span>

            {inspectedItem.images.length > 0 && (
              <div style={{
                height: '250px',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                margin: '8px auto 16px',
              }}>
                {inspectedItem.images.map((imgSrc, idx) => {
                  const total = inspectedItem.images.length;
                  const isMiddle = total === 3 && idx === 1;
                  return (
                    <img
                      key={idx}
                      src={imgSrc}
                      alt={`${inspectedItem.title} ${idx + 1}`}
                      style={{
                        height: isMiddle ? '245px' : total > 1 ? '225px' : '235px',
                        maxWidth: total === 1 ? '90%' : `${Math.floor(100 / total) + 12}%`,
                        objectFit: 'contain',
                        marginLeft: idx === 0 ? '0px' : '-28px',
                        zIndex: isMiddle ? 4 : idx + 1,
                        filter: 'drop-shadow(0 16px 28px rgba(0,0,0,0.65))',
                      }}
                    />
                  );
                })}
              </div>
            )}

            <h3 className="fortnite-header" style={{ fontSize: '38px', color: '#fff', lineHeight: 1.05, marginBottom: '10px' }}>
              {inspectedItem.title}
            </h3>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(0,0,0,0.45)',
              padding: '8px 18px',
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.2)',
              marginBottom: '18px',
            }}>
              <img src="/images/vbucks_logo.png" alt="V-Bucks" style={{ width: '26px', height: '26px', objectFit: 'contain' }} />
              <span style={{ fontSize: '22px', fontWeight: 800, color: '#fff' }}>{inspectedItem.price}</span>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#4eb0ff', marginLeft: '4px' }}>$VBUCKS</span>
            </div>

            <p style={{ fontSize: '14.5px', color: 'rgba(255,255,255,0.88)', lineHeight: 1.55, marginBottom: '22px' }}>
              Equip this item in the upcoming <strong>Item Shop NFT Collection &amp; PFP Locker</strong>. Hold <strong>$VBUCKS</strong> on Solana to earn <strong>1% automatic USDC rewards</strong>.
            </p>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href={SITE_CONFIG.stonkfunUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#fce000',
                  color: '#000',
                  fontWeight: 900,
                  fontSize: '14px',
                  padding: '13px 22px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                }}
              >
                BUY $VBUCKS <ArrowUpRight size={16} strokeWidth={3} />
              </a>

              <a
                href={`https://x.com/intent/tweet?text=${encodeURIComponent(`Checking out ${inspectedItem.title} in the Item Shop! 🛒\n\nThe site is the Item Shop. $VBUCKS is the currency (1% automatic USDC rewards).\n\n@STONKVBUCKS`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(0,0,0,0.55)',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '14px',
                  padding: '13px 18px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.25)',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                }}
              >
                SHARE ON 𝕏 <ArrowUpRight size={16} />
              </a>
            </div>

            {/* Bottom White Strip */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '38px',
              backgroundColor: 'rgba(255,255,255,0.92)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 16px',
            }}>
              <span style={{ fontSize: '11px', fontWeight: 900, color: '#111', letterSpacing: '0.6px', textTransform: 'uppercase' }}>
                PART OF THE GENESIS 3,000 ITEM SHOP NFT ROSTER
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

