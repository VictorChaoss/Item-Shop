'use client';

import React, { useState, useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';

const ALL_CHARACTERS = [
  'character1.png', 'character2.png', 'offender1.png', 'offender2.png', 
  'section3_char1.png', 'section3_char2.png', 'section3_char3.png', 
  'epstein.png', 'frank.png', 'thread_guy.png', 'banks.png'
];

const ALL_ITEMS = [
  'fried_chicken_koolaid.png', 'fentanyl.png', 'protest_pickaxe.png', 
  'two_state_solution.jpg', 'talking_point.jpg', 'ceasefire_report.jpg', 
  'exit_liquidity.png', 'blackbull_gta.png', '10x_with_cheese.png', 
  'little_saint_james_map.png', 'epstein_files_classified.jpg', 'lolita_express.png', 
  'chrome_bag.png', 'vape_axe.png', 'curry_potion.png'
];

const RANDOM_TITLES = [
  'THE CHAOS BUNDLE', 'MYSTERY DROP', 'THE RUGPULLCOLLECTION', 
  'CANCELED ON TWITTER', 'THE FORBIDDEN STASH', 'DEGEN STARTER PACK',
  'THE TRENCHES BUNDLE'
];

const RANDOM_BGS = [
  'radial-gradient(circle at 50% 50%, #175a96 0%, #041224 100%)',
  'radial-gradient(circle at 50% 50%, #8b1010 0%, #1a0202 100%)',
  'radial-gradient(circle at 50% 50%, #1e7a3a 0%, #0a2a14 100%)',
  'radial-gradient(circle at 50% 50%, #3a1870 0%, #1a0c3a 100%)',
  'radial-gradient(circle at 50% 50%, #1e8a9a 0%, #0a303a 100%)',
  'radial-gradient(circle at 50% 50%, #996600 0%, #332200 100%)'
];

const bundles = [
  {
    id: 'breathe', title: 'I CANT BREATHE BUNDLE', bg: RANDOM_BGS[0],
    characters: ['character1.png', 'character2.png'], items: ['fried_chicken_koolaid.png', 'fentanyl.png', 'protest_pickaxe.png']
  },
  {
    id: 'offenders', title: 'THE OFFENDERS BUNDLE', bg: RANDOM_BGS[1],
    characters: ['offender1.png', 'offender2.png'], items: ['two_state_solution.jpg', 'talking_point.jpg', 'ceasefire_report.jpg']
  },
  {
    id: 'rug', title: 'THE SERIAL RUGGER BUNDLE', bg: RANDOM_BGS[2],
    characters: ['section3_char1.png', 'section3_char2.png', 'section3_char3.png'], items: ['exit_liquidity.png', 'blackbull_gta.png', '10x_with_cheese.png']
  },
  {
    id: 'epstein', title: 'THE EPSTEIN FILES BUNDLE', bg: RANDOM_BGS[3],
    characters: ['epstein.png'], items: ['little_saint_james_map.png', 'epstein_files_classified.jpg', 'lolita_express.png']
  },
  {
    id: 'vape', title: 'EXTRA CHROMEYS BUNDLE', bg: RANDOM_BGS[4],
    characters: ['frank.png', 'thread_guy.png', 'banks.png'], items: ['chrome_bag.png', 'vape_axe.png', 'curry_potion.png']
  },
  {
    id: 'matrix', title: 'THE TOP G BUNDLE', bg: 'radial-gradient(circle at 50% 50%, #103010 0%, #051005 100%)',
    characters: ['talisman_tate.png', 'top_g.png'], items: ['matrix_bugatti.png', 'matrix_cigar.png', 'matrix_red_pill.png', 'matrix_water.png']
  }
];

export default function PromoGenerator() {
  const [selectedBundleId, setSelectedBundleId] = useState(bundles[0].id);
  const [customBundle, setCustomBundle] = useState<any>(null);
  const [layout, setLayout] = useState('landscape'); 
  const [isExporting, setIsExporting] = useState(false);
  const promoRef = useRef<HTMLDivElement>(null);
  
  const bundle = customBundle || bundles.find(b => b.id === selectedBundleId) || bundles[0];


  const generateRandomBundle = () => {
    // Shuffle helper
    const shuffle = (arr: any[]) => [...arr].sort(() => 0.5 - Math.random());
    
    // Pick 1 to 3 characters
    const numChars = Math.floor(Math.random() * 3) + 1;
    const randomChars = shuffle(ALL_CHARACTERS).slice(0, numChars);
    
    // Pick exactly 3 items
    const randomItems = shuffle(ALL_ITEMS).slice(0, 3);
    
    // Pick title and bg
    const randomTitle = RANDOM_TITLES[Math.floor(Math.random() * RANDOM_TITLES.length)];
    const randomBg = RANDOM_BGS[Math.floor(Math.random() * RANDOM_BGS.length)];

    setCustomBundle({
      id: 'custom',
      title: randomTitle,
      bg: randomBg,
      characters: randomChars,
      items: randomItems
    });
    setSelectedBundleId('custom');
  };


  const handleDownload = async () => {
    if (!promoRef.current) return;
    setIsExporting(false);
    setIsExporting(true);
    try {
      const ratio = layout === 'poster' ? 2 : 1; 
      const dataUrl = await htmlToImage.toPng(promoRef.current, { quality: 1.0, pixelRatio: ratio });
      const link = document.createElement('a');
      link.download = `${bundle.title.toLowerCase().replace(/\s+/g, '_')}_${layout}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      alert('Failed to generate image.');
    } finally {
      setIsExporting(false);
    }
  };

  const formatItem = (str: string) => str ? str.replace('.png','').replace('.jpg','').replace(/_/g, ' ').toUpperCase() : 'ITEM';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000', color: '#fff', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      
      {1/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', backgroundColor: '#111', padding: '16px', borderRadius: '12px', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: '#aaa', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}><ArrowLeft size={20} /> Shop</Link>
          <button onClick={generateRandomBundle} style={{ padding: '8px 16px', fontSize: '16px', borderRadius: '8px', backgroundColor: '#6b21a8', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>🎇 Randomize</button>
          
          <select value={selectedBundleId} onChange={(e) => { if (e.target.value !== 'custom') setCustomBundle(null); setSelectedBundleId(e.target.value); }} style={{ padding: '8px 16px', fontSize: '16px', borderRadius: '8px', backgroundColor: '#222', color: '#fff', border: '1px solid #444', cursor: 'pointer' }}>
            {customBundle && <option value="custom">{customBundle.title} (Custom)</option>}
            {bundles.map(b => (<option key={b.id} value={b.id}>{b.title}</option>))}
          </select>
          
          <select value={layout} onChange={(e) => setLayout(e.target.value)} style={{ padding: '8px 16px', fontSize: '16px', borderRadius: '8px', backgroundColor: '#222', color: '#fce000', border: '1px solid #444', cursor: 'pointer', fontWeight: 'bold' }}>
            <option value="landscape">Twitter Promo (1920x1080)</option>
            <option value="poster">Print Poster (2400x3600)</option>
            <option value="unlocked">Item Unlocked (1920x1080)</option>
            <option value="shop_grid">Daily Shop Grid (1080x1080)</option>
            <option value="teaser">Mystery Teaser (1920x1080)</option>
            <option value="split">Choose Your Fighter (1920x1080)</option>
            <option value="patch_notes">Patch Notes (1920x1080)</option>
          </select>
        </div>
        
        <button onClick={handleDownload} disabled={isExporting} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: isExporting ? '#666' : '#fce000', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: isExporting ? 'not-allowed' : 'pointer' }}>
          <Download size={20} /> {isExporting ? 'Generating...' : 'Download Image'}
        </button>
      </div>

      <div style={{ width: '100%', height: 'calc(100vh - 120px)', overflowX: 'auto', overflowY: 'auto', border: '2px dashed #333', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', backgroundColor: '#111', padding: '40px' }}>
        
        {1/* ==================================================== */}
        {/* 1. TWITTER PROMO (LANDSCAPE)                         */}
        {/* ==================================================== */}
        {layout === 'landscape' && (
          <div ref={promoRef} style={{ width: '1920px', height: '1080px', background: bundle.bg, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
            <div style={{ position: 'absolute', top: '100px', left: '120px', zIndex: 10 }}>
              <h1 className="fortnite-header" style={{ fontSize: '160px', lineHeight: '0.85', margin: 0, textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>ITEM SHOP</h1>
              <h2 className="fortnite-header" style={{ fontSize: '70px', color: '#fce000', margin: '20px 0 0 0', textShadow: '0 5px 15px rgba(0,0,0,0.5)' }}>{bundle.title}</h2>
            </div>
            <div style={{ position: 'absolute', bottom: '100px', left: '120px', width: '500px', zIndex: 15 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {bundle.items.map((item: string, i: number) => {
                  const isJpg = item.endsWith('.jpg');
                  return (
                    <div key={i} style={{ aspectRatio: '1', backgroundColor: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                      <img src={`/images/${item}`} alt="Item" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: isJpg ? 'none' : 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))', mixBlendMode: isJpg ? 'screen' : 'normal' }} />
                    </div>
                  )
                })}
              </div>
            </div>
            <div style={{ position: 'absolute', top: '0', right: '-100px', width: '1400px', height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 30 }}>
              {bundle.characters.map((char: string, i: number) => (
                <img key={i} src={`/images/${char}`} alt="Character" style={{ height: '95%', width: 'auto', objectFit: 'contain', marginLeft: i > 0 ? '-250px' : '0', zIndex: bundle.characters.length - i, filter: 'drop-shadow(0 0 40px rgba(0,0,0,0.6))' }} />
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* 2. PRINT POSTER                                     */}
        {/* ==================================================== */}
        {layout === 'poster' && (
          <div ref={promoRef} style={{ width: '1200px', height: '1800px', background: bundle.bg, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
            <div style={{ position: 'absolute', top: '120px', left: '0', width: '100%', textAlign: 'center', zIndex: 10 }}>
              <h1 className="fortnite-header" style={{ fontSize: '180px', lineHeight: '0.85', margin: 0, textShadow: '0 10px 40px rgba(0,0,0,0.6)' }}>ITEM SHOP</h1>
              <h2 className="fortnite-header" style={{ fontSize: '70px', color: '#fce000', margin: '30px 0 0 0' }}>{bundle.title}</h2>
            </div>
            <div style={{ position: 'absolute', top: '350px', left: '0', width: '100%', height: '1100px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 30 }}>
              {bundle.characters.map((char: string, i: number) => (
                <img key={i} src={`/images/${char}`} alt="Character" style={{ height: '100%', width: 'auto', objectFit: 'contain', marginLeft: i > 0 ? '-180px' : '0', zIndex: bundle.characters.length - i, filter: 'drop-shadow(0 0 60px rgba(0,0,0,0.8))' }} />
              ))}
            </div>
            <div style={{ position: 'absolute', bottom: '120px', left: '50%', transform: 'translateX(-50%)', width: '1000px', zIndex: 40 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                {bundle.items.map((item: string, i: number) => (
                  <div key={i} style={{ aspectRatio: '1', backgroundColor: 'rgba(0,0,0,0.35)', border: '2px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '30px' }}>
                    <img src={`/images/${item}`} alt="Item" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: item.endsWith('.jpg') ? 'none' : 'drop-shadow(0 15px 30px rgba(0,0,0,0.6))', mixBlendMode: item.endsWith('.jpg') ? 'screen' : 'normal' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* 3. ITEM UNLOCKED SCREEN                              */}
        {/* ==================================================== */}
        {layout === 'unlocked' && (
          <div ref={promoRef} style={{ width: '1920px', height: '1080px', background: 'radial-gradient(circle at 50% 50%, #40d4e6 0%, #072a4d 100%)', position: 'relative', overflow: 'hidden', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', width: '200%', height: '200%', background: 'conic-gradient(from 0deg, transparent 0deg 15deg, rgba(255,255,255,0.1) 15deg 30deg, transparent 30deg 45deg, rgba(255,255,255,0.1) 45deg 60deg, transparent 60deg 75deg, rgba(255,255,255,0.1) 75deg 90deg, transparent 90deg 105deg, rgba(255,255,255,0.1) 105deg 120deg, transparent 120deg 135deg, rgba(255,255,255,0.1) 135deg 150deg, transparent 150deg 165deg, rgba(255,255,255,0.1) 165deg 180deg, transparent 180deg 195deg, rgba(255,255,255,0.1) 195deg 210deg, transparent 210deg 225deg, rgba(255,255,255,0.1) 225deg 240deg, transparent 240deg 255deg, rgba(255,255,255,0.1) 255deg 270deg, transparent 270deg 285deg, rgba(255,255,255,0.1) 285deg 300deg, transparent 300deg 315deg, rgba(255,255,255,0.1) 315deg 330deg, transparent 330deg 345deg, rgba(255,255,255,0.1) 345deg 360deg)', zIndex: 1 }}></div>
            <h2 className="fortnite-header" style={{ position: 'absolute', top: '80px', fontSize: '100px', color: '#fce000', zIndex: 10, textShadow: '0 5px 20px rgba(0,0,0,0.5)' }}>UNLOCKED!</h2>
            <img src={`/images/${bundle.characters[0]}`} alt="Character" style={{ height: '700px', zIndex: 20, filter: 'drop-shadow(0 0 80px rgba(255,255,255,0.5))' }} />
            <h1 className="fortnite-header" style={{ position: 'absolute', bottom: '80px', fontSize: '140px', color: '#fff', zIndex: 10, textShadow: '0 10px 40px rgba(0,0,0,0.8)' }}>{formatItem(bundle.characters[0])}</h1>
          </div>
        )}

        {/* ==================================================== */}
        {/* 4. DAILY SHOP GRID (1080x1080)                       */}
        {/* ==================================================== */}
        {layout === 'shop_grid' && (
          <div ref={promoRef} style={{ width: '1080px', height: '1080px', background: '#041224', position: 'relative', overflow: 'hidden', flexShrink: 0, padding: '60px' }}>
            <h1 className="fortnite-header" style={{ fontSize: '100px', color: '#fff', textAlign: 'center', marginBottom: '40px' }}>DAILY ITEM SHOP</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {[...bundle.characters, ...bundle.items].slice(0, 6).map((item: string, i: number) => {
                const isJpg = item.endsWith('.jpg');
                return (
                  <div key={i} style={{ aspectRatio: '0.8', background: 'linear-gradient(180deg, #40d4e6 0%, #1e8e9e 100%)', borderRadius: '16px', border: '2px solid rgba(255,255,255,0.2)', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <img src={`/images/${item}`} alt="Item" style={{ width: '100%', height: '70%', objectFit: 'contain', filter: isJpg ? 'none' : 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))', mixBlendMode: isJpg ? 'screen' : 'normal' }} />
                    <div style={{ position: 'absolute', bottom: '20px', left: '0', width: '100%', textAlign: 'center' }}>
                      <h3 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 10px 0', textTransform: 'uppercase' }}>{formatItem(item)}</h3>
                      <div style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#000', padding: '8px 16px', borderRadius: '20px', gap: '8px' }}>
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#40d4e6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>V</div>
                        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{i < 3 ? '1,500' : '800'}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* =================================================== */}
        {/* 5. MYSTERY TEASER (SILHOUETTE)                       */}
        {/* ==================================================== */}
        {layout === 'teaser' && (
          <div ref={promoRef} style={{ width: '1920px', height: '1080px', background: 'linear-gradient(180deg, #111 0%, #000 100%)', position: 'relative', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h1 className="fortnite-header" style={{ position: 'absolute', top: '100px', fontSize: '120px', color: '#fce000', letterSpacing: '10px' }}>CLASSIFIED DROP</h1>
            <img src={`/images/${bundle.characters[0]}`} alt="Teaser" style={{ height: '800px', filter: 'brightness(0) drop-shadow(0 0 40px rgba(252, 224, 0, 0.3))', zIndex: 10 }} />
            <h1 className="fortnite-header" style={{ position: 'absolute', fontSize: '400px', color: 'rgba(252, 224, 0, 0.8)', zIndex: 5, left: '60%' }}>?</h1>
            <h2 className="fortnite-header" style={{ position: 'absolute', bottom: '80px', fontSize: '80px', color: '#fff', opacity: 0.5 }}>COMING TO THE SHOP TOMORROW</h2>
          </div>
        )}

        {/* =================================================== */}
        {/* 6. CHOOSE YOUR FIGHTER (SPLIT)                       */}
        {/* ==================================================== */}
        {layout === 'split' && (
          <div ref={promoRef} style={{ width: '1920px', height: '1080px', background: '#000', position: 'relative', overflow: 'hidden', flexShrink: 0, display: 'flex' }}>
            {bundle.characters.slice(0,2).map((char: string, i: number) => (
              <div key={i} style={{ flex: 1, height: '100%', position: 'relative', borderRight: i === 0 ? '10px solid #fce000' : 'none', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', background: i === 0 ? 'radial-gradient(circle at 50% 50%, #8b1010 0%, #1a0202 100%)' : 'radial-gradient(circle at 50% 50%, #175a96 0%, #041224 100%)' }}>
                <img src={`/images/${char}`} alt="Character" style={{ height: '90%', filter: 'drop-shadow(0 0 30px rgba(0,0,0,0.8))' }} />
                <div style={{ position: 'absolute', bottom: '80px', backgroundColor: '#000', padding: '20px 40px', border: '4px solid #fff', transform: 'skewX(-10deg)' }}>
                  <h2 className="fortnite-header" style={{ fontSize: '80px', margin: 0, transform: 'skewX(10deg)' }}>{formatItem(char)}</h2>
                </div>
              </div>
            ))}
            {
              bundle.characters.length >= 2 && (
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fce000', width: '200px', height: '200px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20, border: '10px solid #000' }}>
                  <h1 className="fortnite-header" style={{ fontSize: '100px', color: '#000', margin: 0 }}>VS</h1>
                </div>
              )
            }
            <h1 className="fortnite-header" style={{ position: 'absolute', top: '60px', left: '50%', transform: 'translateX(-50%)', fontSize: '120px', color: '#fff', zIndex: 20, textShadow: '0 10px 20px #000' }}>CHOOSE YOUR FIGHTER</h1>
          </div>
        )}

        {/* =================================================== */}
        {/* 7. PATCH NOTES                                       */}
        {/* ==================================================== */}
        {layout === 'patch_notes' && (
          <div ref={promoRef} style={{ width: '1920px', height: '1080px', background: '#0a0a0a', position: 'relative', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '1600px', height: '800px', backgroundColor: '#111', border: '4px solid #333', borderRadius: '24px', display: 'flex', overflow: 'hidden' }}>
              <div style={{ flex: '0 0 600px', background: bundle.bg, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', position: 'relative' }}>
                <img src={`/images/${bundle.characters[0]}`} alt="Character" style={{ height: '90%', filter: 'drop-shadow(0 0 30px rgba(0,0,0,0.8))' }} />
              </div>
              <div style={{ flex: 1, padding: '80px', display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ color: '#fce000', fontSize: '40px', fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase' }}>OFFICIAL UPDATE</h2>
                <h1 className="fortnite-header" style={{ fontSize: '120px', margin: '0 0 60px 0', lineHeight: 1 }}>PATCH v4.2.0</h1>
                <div style={{ fontSize: '40px', color: '#fff', display: 'flex', flexDirection: 'column', gap: '30px', fontWeight: 600 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}><span style={{ color: '#ff4444' }}>🔻 NERFED:</span> {formatItem(bundle.items[0])}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}><span style={{ color: '#44ff44' }}>🔺 BUFFED:</span> {formatItem(bundle.items[1])}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}><span style={{ color: '#44aaff' }}>🔩 FIXED:</span> {bundle.title} Bug</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}><span style={{ color: '#fce000' }}>❐ ADDED:</span> {formatItem(bundle.items[2])} Vault</div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Social Media Content Playbook */}
      <div style={{ marginTop: '40px', backgroundColor: '#111', borderRadius: '12px', padding: '30px' }}>
        <h3 className="fortnite-header" style={{ fontSize: '32px', color: '#fce000', marginBottom: '10px' }}>SOCIAL MEDIA PLAYBOOK</h3>
        <p style={{ color: '#aaa', marginBottom: '30px', fontSize: '16px' }}>Dynamic captions for the <strong>{bundle.title}</strong>. Ready to copy & paste.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          
          <div style={{ backgroundColor: '#222', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
            <h4 style={{ color: '#fff', fontSize: '18px', marginBottom: '8px', fontWeight: 'bold' }}>1. The Daily Shop Reset</h4>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '16px' }}>Post with the 16:9 Promo image.</p>
            <div style={{ backgroundColor: '#000', padding: '15px', borderRadius: '6px', color: '#00ffcc', fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.5' }}>
              🚨 ITEM SHOP UPDATE 🚨<br/><br/>
              The {bundle.title} has entered the shop.<br/><br/>
              Grab the {bundle.items[0] ? formatItem(bundle.items[0]) : 'Item'} before it rotates out. Tag your duo.
            </div>
          </div>

          <div style={{ backgroundColor: '#222', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
            <h4 style={{ color: '#fff', fontSize: '18px', marginBottom: '8px', fontWeight: 'bold' }}>2. Fake Patch Notes</h4>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '16px' }}>Use for TikTok text or Twitter.</p>
            <div style={{ backgroundColor: '#000', padding: '15px', borderRadius: '6px', color: '#00ffcc', fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.5' }}>
              Patch v2.1:<br/>
              - Nerfed the {bundle.items[0] ? formatItem(bundle.items[0]) : 'Item'} drop rate.<br/>
              - Buffed the {bundle.items[1] ? formatItem(bundle.items[1]) : 'Item'}.<br/>
              - Fixed a bug where players couldn't equip the {bundle.title}.
            </div>
          </div>

          <div style={{ backgroundColor: '#222', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
            <h4 style={{ color: '#fff', fontSize: '18px', marginBottom: '8px', fontWeight: 'bold' }}>3. Where We Dropping?</h4>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '16px' }}>Post with an image of {bundle.items[0] ? formatItem(bundle.items[0]) : 'the item'}.</p>
            <div style={{ backgroundColor: '#000', padding: '15px', borderRadius: '6px', color: '#00ffcc', fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.5' }}>
              Where we dropping boys?<br/><br/>
              POV: You're trying to survive the {bundle.title} lobby but your duo didn't pack the {bundle.items[0] ? formatItem(bundle.items[0]) : 'Item'}.
            </div>
          </div>

          <div style={{ backgroundColor: '#222', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
            <h4 style={{ color: '#fff', fontSize: '18px', marginBottom: '8px', fontWeight: 'bold' }}>4. Streamer Bait</h4>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '16px' }}>Tag the influencers/politicians in the bundle.</p>
            <div style={{ backgroundColor: '#000', padding: '15px', borderRadius: '6px', color: '#00ffcc', fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.5' }}>
              Yo, your signature skins just dropped in the {bundle.title}.<br/><br/>
              Rate the {bundle.items[1] ? formatItem(bundle.items[1]) : 'Item'} out of 10.
            </div>
          </div>

          <div style={{ backgroundColor: '#222', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
            <h4 style={{ color: '#fff', fontSize: '18px', marginBottom: '8px', fontWeight: 'bold' }}>5. Bundle Gifting Giveaway</h4>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '16px' }}>Engagement farming on Twitter.</p>
            <div style={{ backgroundColor: '#000', padding: '15px', borderRadius: '6px', color: '#00ffcc', fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.5' }}>
              I'm gifting the {bundle.title} to 3 people today.<br/><br/>
              RT and tag the biggest rugger on your timeline to enter. Must be following to win.
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
