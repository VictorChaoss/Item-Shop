'use client';

import React, { useEffect, useRef, useState } from 'react';

import BackgroundEffects from '@/components/effects/BackgroundEffects';

const SECTION_COLORS: Record<string, string> = {
  blue: '#0a3d7a',
  red: '#8b1a1a',
  green: '#0d6b2e',
  purple: '#4a1a8a',
  teal: '#0c6878',
};

const SECTION_KEYS = ['blue', 'red', 'green', 'purple', 'teal'];

export default function Home() {
  const [bgColor, setBgColor] = useState(SECTION_COLORS.blue);
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    Object.entries(sectionRefs.current).forEach(([key, el]) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
              setBgColor(SECTION_COLORS[key] || SECTION_COLORS.blue);
              setActiveSection(SECTION_KEYS.indexOf(key));
            }
          });
        },
        { threshold: [0.2, 0.5] }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
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
      
      <div style={{ flex: 1, width: '100%', position: 'relative', zIndex: 5 }}>
        
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
                <button key={key} style={{
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
          maxWidth: '1400px',
        }}>
          
          {/* Title Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
            <div>
              <h1 className="fortnite-header" style={{ fontSize: '72px', color: '#ffffff', lineHeight: 1, marginBottom: '8px' }}>ITEM SHOP</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.85)', fontWeight: 700, fontSize: '13px', marginTop: '8px' }}>
                <div style={{
                  width: '18px', height: '18px', backgroundColor: '#fff', borderRadius: '3px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#000', fontSize: '7px', fontWeight: 900, lineHeight: 1, textAlign: 'center',
                }}>
                  EPIC<br/>GAMES
                </div>
                Powered by the Epic Games Store
              </div>
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
                  <div style={{
                    width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ color: '#3047d9', fontSize: '13px', fontWeight: 900 }}>V</span>
                  </div>
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
              <img src="/images/fried_chicken_koolaid.png" alt="Fried Chicken & Kool Aid" style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -55%)',
                width: '85%', height: 'auto', objectFit: 'contain',
                filter: 'drop-shadow(0 4px 15px rgba(0,0,0,0.3))',
              }} />
              <span style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', zIndex: 5 }}>NEW!</span>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px', position: 'relative', zIndex: 5 }}>Fried Chicken & Kool Aid</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 5 }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#3047d9', fontSize: '11px', fontWeight: 900 }}>V</span>
                </div>
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
              <img src="/images/fentanyl.png" alt="Fentanyl" style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -55%)',
                width: '85%', height: 'auto', objectFit: 'contain',
                filter: 'drop-shadow(0 4px 15px rgba(0,0,0,0.3))',
              }} />
              <span style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', zIndex: 5 }}>NEW!</span>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px', position: 'relative', zIndex: 5 }}>Fentanyl</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 5 }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#3047d9', fontSize: '11px', fontWeight: 900 }}>V</span>
                </div>
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
              <img src="/images/protest_pickaxe.png" alt="Protest Pickaxe" style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -55%)',
                width: '75%', height: 'auto', objectFit: 'contain',
                filter: 'drop-shadow(0 4px 15px rgba(0,0,0,0.3))',
              }} />
              <span style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', zIndex: 5 }}>NEW!</span>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px', position: 'relative', zIndex: 5 }}>Protest Pickaxe</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 5 }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#3047d9', fontSize: '11px', fontWeight: 900 }}>V</span>
                </div>
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
                  <div style={{
                    width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ color: '#3047d9', fontSize: '13px', fontWeight: 900 }}>V</span>
                  </div>
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
              <img src="/images/two_state_solution.jpg" alt="Two State Solution" style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -55%)',
                width: '75%', height: 'auto', objectFit: 'contain',
                mixBlendMode: 'screen',
              }} />
              <span style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', zIndex: 5 }}>NEW!</span>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px', position: 'relative', zIndex: 5 }}>Two State Solution</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 5 }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#3047d9', fontSize: '11px', fontWeight: 900 }}>V</span>
                </div>
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
              <img src="/images/talking_point.jpg" alt="The Talking Point" style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -45%)',
                width: '80%', height: 'auto', objectFit: 'contain',
                mixBlendMode: 'screen',
              }} />
              <span style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', zIndex: 5 }}>NEW!</span>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px', position: 'relative', zIndex: 5 }}>The Talking Point</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 5 }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#3047d9', fontSize: '11px', fontWeight: 900 }}>V</span>
                </div>
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
              <img src="/images/ceasefire_report.jpg" alt="The Ceasefire Report" style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -55%)',
                width: '75%', height: 'auto', objectFit: 'contain',
                mixBlendMode: 'screen',
              }} />
              <span style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', zIndex: 5 }}>NEW!</span>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px', position: 'relative', zIndex: 5 }}>The Ceasefire Report</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 5 }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#3047d9', fontSize: '11px', fontWeight: 900 }}>V</span>
                </div>
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
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: '#3047d9', fontSize: '13px', fontWeight: 900 }}>V</span></div>
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
              <img src="/images/exit_liquidity.png" alt="Exit Liquidity" style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -55%)',
                width: '75%', height: 'auto', objectFit: 'contain',
                filter: 'drop-shadow(0 4px 15px rgba(0,0,0,0.3))',
              }} />
              <span style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', zIndex: 5 }}>NEW!</span>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px', position: 'relative', zIndex: 5 }}>Exit Liquidity</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 5 }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#3047d9', fontSize: '11px', fontWeight: 900 }}>V</span>
                </div>
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
              <img src="/images/blackbull_gta.png" alt="Black Bull GT" style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -55%)',
                width: '75%', height: 'auto', objectFit: 'contain',
                filter: 'drop-shadow(0 4px 15px rgba(0,0,0,0.3))',
              }} />
              <span style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', zIndex: 5 }}>NEW!</span>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px', position: 'relative', zIndex: 5 }}>Black Bull GT</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 5 }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#3047d9', fontSize: '11px', fontWeight: 900 }}>V</span>
                </div>
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
              <img src="/images/10x_with_cheese.png" alt="10x With Cheese" style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -55%)',
                width: '75%', height: 'auto', objectFit: 'contain',
                filter: 'drop-shadow(0 4px 15px rgba(0,0,0,0.3))',
              }} />
              <span style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', zIndex: 5 }}>NEW!</span>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px', position: 'relative', zIndex: 5 }}>10x With Cheese</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 5 }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#3047d9', fontSize: '11px', fontWeight: 900 }}>V</span>
                </div>
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
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: '#3047d9', fontSize: '13px', fontWeight: 900 }}>V</span></div>
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
              <img src="/images/little_saint_james_map.png" alt="Map of Little Saint James" style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -45%)',
                width: '65%', height: 'auto', objectFit: 'contain',
                filter: 'drop-shadow(0 4px 15px rgba(0,0,0,0.3))',
              }} />
              <span style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', zIndex: 5 }}>NEW!</span>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px', position: 'relative', zIndex: 5 }}>Map of Little Saint James</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 5 }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#3047d9', fontSize: '11px', fontWeight: 900 }}>V</span>
                </div>
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
              <img src="/images/epstein_files_classified.jpg" alt="The Classified Files" style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: '80%', height: 'auto', objectFit: 'contain',
                mixBlendMode: 'screen',
              }} />
              <span style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', zIndex: 5 }}>NEW!</span>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px', position: 'relative', zIndex: 5 }}>The Classified Files</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 5 }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#3047d9', fontSize: '11px', fontWeight: 900 }}>V</span>
                </div>
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
              <img src="/images/lolita_express.png" alt="Lolita Express" style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: '80%', height: 'auto', objectFit: 'contain',
                filter: 'drop-shadow(0 4px 15px rgba(0,0,0,0.3))',
              }} />
              <span style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', zIndex: 5 }}>NEW!</span>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px', position: 'relative', zIndex: 5 }}>Lolita Express</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative', zIndex: 5 }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#3047d9', fontSize: '11px', fontWeight: 900 }}>V</span>
                </div>
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
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#333', letterSpacing: '0.5px', textTransform: 'uppercase' }}>BUNDLE &nbsp; + CHROME BAG, VAPE AXE AND ROLEX INCLUDED</span>
              </div>
              <div style={{ position: 'absolute', bottom: '50px', right: '28px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '28px', fontWeight: 300, cursor: 'pointer', backdropFilter: 'blur(8px)', zIndex: 15 }}>+</div>
              <div style={{ position: 'absolute', bottom: '60px', left: '32px', zIndex: 10 }}>
                <span style={{ display: 'inline-block', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '13px', padding: '4px 12px', borderRadius: '3px', textTransform: 'uppercase', marginBottom: '10px' }}>NEW!</span>
                <h3 className="bundle-title" style={{ fontSize: '32px', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>The LA Vape Cabal Bundle</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: '#3047d9', fontSize: '13px', fontWeight: 900 }}>V</span></div>
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
              <img src="/images/chrome_bag.png" alt="Chrome Bag" style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '75%', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 5 }}>
                <span style={{ display: 'inline-block', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>NEW!</span>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Chrome Bag</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: '#3047d9', fontSize: '11px', fontWeight: 900 }}>V</span></div><span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>800</span></div>
              </div>
            </div>
            
            {/* Card 2 */}
            <div style={{ height: '320px', borderRadius: '20px', background: 'linear-gradient(180deg, #40d4e6 0%, #1e8e9e 100%)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)' }}>
              <img src="/images/vape_axe.png" alt="Vape Axe" style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '75%', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 5 }}>
                <span style={{ display: 'inline-block', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>NEW!</span>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Vape Axe</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: '#3047d9', fontSize: '11px', fontWeight: 900 }}>V</span></div><span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>800</span></div>
              </div>
            </div>

            {/* Card 3 */}
            <div style={{ height: '320px', borderRadius: '20px', background: 'linear-gradient(180deg, #40d4e6 0%, #1e8e9e 100%)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)' }}>
              <img src="/images/rolex.png" alt="Rolex" style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '75%', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 5 }}>
                <span style={{ display: 'inline-block', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>NEW!</span>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Rolex</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: '#3047d9', fontSize: '11px', fontWeight: 900 }}>V</span></div><span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>1,200</span></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
