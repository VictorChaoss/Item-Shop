
'use client';

import React, { useState, useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';

const bundles = [
  {
    id: 'breathe',
    title: 'I CANT BREATHE BUNDLE',
    bg: 'radial-gradient(circle at 50% 30%, #175a96 0%, #041224 100%)',
    characters: ['character1.png', 'character2.png'],
    items: ['fried_chicken_koolaid.png', 'fentanyl.png', 'protest_pickaxe.png']
  },
  {
    id: 'offenders',
    title: 'THE OFFENDERS BUNDLE',
    bg: 'radial-gradient(circle at 50% 30%, #8b1010 0%, #1a0202 100%)',
    characters: ['offender1.png', 'offender2.png'],
    items: ['two_state_solution.jpg', 'talking_point.jpg', 'ceasefire_report.jpg']
  },
  {
    id: 'rug',
    title: 'THE SERIAL RUGGER BUNDLE',
    bg: 'radial-gradient(circle at 50% 30%, #1e7a3a 0%, #0a2a14 100%)',
    characters: ['section3_char1.png', 'section3_char2.png', 'section3_char3.png'],
    items: ['exit_liquidity.png', 'blackbull_gta.png', '10x_with_cheese.png']
  },
  {
    id: 'epstein',
    title: 'THE EPSTEIN FILES BUNDLE',
    bg: 'radial-gradient(circle at 50% 30%, #3a1870 0%, #1a0c3a 100%)',
    characters: ['epstein.png'],
    items: ['little_saint_james_map.png', 'epstein_files_classified.jpg', 'lolita_express.png']
  },
  {
    id: 'vape',
    title: 'EXTRA CHROMEYS BUNDLE',
    bg: 'radial-gradient(circle at 50% 30%, #1e8a9a 0%, #0a303a 100%)',
    characters: ['frank.png', 'thread_guy.png', 'banks.png'],
    items: ['chrome_bag.png', 'vape_axe.png', 'curry_potion.png']
  }
];

export default function PromoGenerator() {
  const [selectedBundleId, setSelectedBundleId] = useState(bundles[0].id);
  const [layout, setLayout] = useState('landscape'); // 'landscape' | 'poster'
  const [isExporting, setIsExporting] = useState(false);
  const promoRef = useRef<HTMLDivElement>(null);
  
  const bundle = bundles.find(b => b.id === selectedBundleId) || bundles[0];

  const handleDownload = async () => {
    if (!promoRef.current) return;
    setIsExporting(true);
    try {
      // For posters, we render at 1200x1800 but output at 2400x3600 (pixelRatio: 2) for print quality.
      const ratio = layout === 'poster' ? 2 : 1; 
      const dataUrl = await htmlToImage.toPng(promoRef.current, {
        quality: 1.0,
        pixelRatio: ratio,
      });
      const link = document.createElement('a');
      const suffix = layout === 'poster' ? '_poster_print' : '_promo';
      link.download = `${bundle.title.toLowerCase().replace(/\s+/g, '_')}${suffix}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generating image', err);
      alert('Failed to generate image. Check console for details.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000', color: '#fff', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', backgroundColor: '#111', padding: '16px', borderRadius: '12px', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: '#aaa', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowLeft size={20} /> Back to Shop
          </Link>
          <select 
            value={selectedBundleId} 
            onChange={(e) => setSelectedBundleId(e.target.value)}
            style={{ padding: '8px 16px', fontSize: '16px', borderRadius: '8px', backgroundColor: '#222', color: '#fff', border: '1px solid #444', cursor: 'pointer' }}
          >
            {bundles.map(b => (
              <option key={b.id} value={b.id}>{b.title}</option>
            ))}
          </select>
          <select 
            value={layout} 
            onChange={(e) => setLayout(e.target.value)}
            style={{ padding: '8px 16px', fontSize: '16px', borderRadius: '8px', backgroundColor: '#222', color: '#fff', border: '1px solid #444', cursor: 'pointer' }}
          >
            <option value="landscape">Twitter Promo (1920x1080)</option>
            <option value="poster">Print Poster (2400x3600)</option>
          </select>
        </div>
        
        <button 
          onClick={handleDownload}
          disabled={isExporting}
          style={{ 
            display: 'flex', alignItems: 'center', gap: '8px',
            backgroundColor: isExporting ? '#666' : '#fce000', color: '#000', border: 'none', padding: '10px 20px', 
            borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: isExporting ? 'not-allowed' : 'pointer' 
          }}
        >
          <Download size={20} />
          {isExporting ? 'Generating...' : `Download ${layout === 'poster' ? 'Print Poster' : '1080p Promo'}`}
        </button>
      </div>

      {/* Wrapper to allow scrolling */}
      <div style={{ width: '100%', height: 'calc(100vh - 120px)', overflowX: 'auto', overflowY: 'auto', border: '2px dashed #333', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', backgroundColor: '#111', padding: '40px' }}>
        
        {layout === 'landscape' ? (
          /* ==================================================== */
          /* 16:9 LANDSCAPE PROMO LAYOUT                          */
          /* ==================================================== */
          <div 
            ref={promoRef}
            style={{ width: '1920px', height: '1080px', background: bundle.bg, position: 'relative', overflow: 'hidden', flexShrink: 0 }}
          >
            {/* Top Left Text */}
            <div style={{ position: 'absolute', top: '100px', left: '120px', zIndex: 10 }}>
              <h1 className="fortnite-header" style={{ fontSize: '160px', lineHeight: '0.85', margin: 0, textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>ITEM SHOP</h1>
              <h2 className="fortnite-header" style={{ fontSize: '70px', color: '#fce000', margin: '20px 0 0 0', textShadow: '0 5px 15px rgba(0,0,0,0.5)' }}>{bundle.title}</h2>
            </div>

            {/* Items Grid (Left side) */}
            <div style={{ position: 'absolute', bottom: '100px', left: '120px', width: '500px', zIndex: 15 }}>
              <div style={{ position: 'absolute', top: '-20px', left: '-20px', width: '40px', height: '40px', borderTop: '6px solid white', borderLeft: '6px solid white' }}></div>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '40px', height: '40px', borderTop: '6px solid white', borderRight: '6px solid white' }}></div>
              <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '40px', height: '40px', borderBottom: '6px solid white', borderLeft: '6px solid white' }}></div>
              <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', width: '40px', height: '40px', borderBottom: '6px solid white', borderRight: '6px solid white' }}></div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {bundle.items.map((item, i) => {
                  const isJpg = item.endsWith('.jpg');
                  return (
                    <div key={i} style={{ aspectRatio: '1', backgroundColor: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.1)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                      <img src={`/images/${item}`} alt="Item" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: isJpg ? 'none' : 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))', mixBlendMode: isJpg ? 'screen' : 'normal' }} />
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Characters (Right side) */}
            <div style={{ position: 'absolute', top: '0', right: '-100px', width: '1400px', height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 30 }}>
              {bundle.characters.map((char, i) => (
                <img key={i} src={`/images/${char}`} alt="Character" style={{ height: '95%', width: 'auto', objectFit: 'contain', marginLeft: i > 0 ? '-250px' : '0', zIndex: bundle.characters.length - i, filter: 'drop-shadow(0 0 40px rgba(0,0,0,0.6))', maskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)' }} />
              ))}
            </div>
          </div>
        ) : (
          /* ==================================================== */
          /* 2:3 PRINT POSTER LAYOUT                              */
          /* ==================================================== */
          <div 
            ref={promoRef}
            style={{ width: '1200px', height: '1800px', background: bundle.bg, position: 'relative', overflow: 'hidden', flexShrink: 0 }}
          >
            {/* Top Center Text */}
            <div style={{ position: 'absolute', top: '120px', left: '0', width: '100%', textAlign: 'center', zIndex: 10 }}>
              <h1 className="fortnite-header" style={{ fontSize: '180px', lineHeight: '0.85', margin: 0, textShadow: '0 10px 40px rgba(0,0,0,0.6)' }}>ITEM SHOP</h1>
              <h2 className="fortnite-header" style={{ fontSize: '70px', color: '#fce000', margin: '30px 0 0 0', textShadow: '0 5px 20px rgba(0,0,0,0.6)' }}>{bundle.title}</h2>
            </div>

            {/* Characters (Center) */}
            <div style={{ position: 'absolute', top: '350px', left: '0', width: '100%', height: '1100px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 30 }}>
              {bundle.characters.map((char, i) => (
                <img key={i} src={`/images/${char}`} alt="Character" style={{ height: '100%', width: 'auto', objectFit: 'contain', marginLeft: i > 0 ? '-180px' : '0', zIndex: bundle.characters.length - i, filter: 'drop-shadow(0 0 60px rgba(0,0,0,0.8))' }} />
              ))}
            </div>

            {/* Items Grid (Bottom Center) */}
            <div style={{ position: 'absolute', bottom: '120px', left: '50%', transform: 'translateX(-50%)', width: '1000px', zIndex: 40 }}>
              <div style={{ position: 'absolute', top: '-20px', left: '-20px', width: '40px', height: '40px', borderTop: '6px solid white', borderLeft: '6px solid white' }}></div>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '40px', height: '40px', borderTop: '6px solid white', borderRight: '6px solid white' }}></div>
              <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '40px', height: '40px', borderBottom: '6px solid white', borderLeft: '6px solid white' }}></div>
              <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', width: '40px', height: '40px', borderBottom: '6px solid white', borderRight: '6px solid white' }}></div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                {bundle.items.map((item, i) => {
                  const isJpg = item.endsWith('.jpg');
                  return (
                    <div key={i} style={{ aspectRatio: '1', backgroundColor: 'rgba(0,0,0,0.35)', border: '2px solid rgba(255,255,255,0.1)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '30px' }}>
                      <img src={`/images/${item}`} alt="Item" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: isJpg ? 'none' : 'drop-shadow(0 15px 30px rgba(0,0,0,0.6))', mixBlendMode: isJpg ? 'screen' : 'normal' }} />
                    </div>
                  )
                })}
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
          
          {/* Idea 1 */}
          <div style={{ backgroundColor: '#222', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
            <h4 style={{ color: '#fff', fontSize: '18px', marginBottom: '8px', fontWeight: 'bold' }}>1. The Daily Shop Reset</h4>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '16px' }}>Post with the 16:9 Promo image.</p>
            <div style={{ backgroundColor: '#000', padding: '15px', borderRadius: '6px', color: '#00ffcc', fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.5' }}>
              🚨 ITEM SHOP UPDATE 🚨<br/><br/>
              The {bundle.title} has entered the shop.<br/><br/>
              Grab the {bundle.items[0] ? bundle.items[0].replace('.png','').replace('.jpg','').replace(/_/g, ' ') : 'Item'} before it rotates out. Tag your duo.
            </div>
          </div>

          {/* Idea 2 */}
          <div style={{ backgroundColor: '#222', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
            <h4 style={{ color: '#fff', fontSize: '18px', marginBottom: '8px', fontWeight: 'bold' }}>2. Fake Patch Notes</h4>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '16px' }}>Use for TikTok text or Twitter.</p>
            <div style={{ backgroundColor: '#000', padding: '15px', borderRadius: '6px', color: '#00ffcc', fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.5' }}>
              Patch v2.1:<br/>
              - Nerfed the {bundle.items[0] ? bundle.items[0].replace('.png','').replace('.jpg','').replace(/_/g, ' ') : 'Item'} drop rate.<br/>
              - Buffed the {bundle.items[1] ? bundle.items[1].replace('.png','').replace('.jpg','').replace(/_/g, ' ') : 'Item'}.<br/>
              - Fixed a bug where players couldn't equip the {bundle.title}.
            </div>
          </div>

          {/* Idea 3 */}
          <div style={{ backgroundColor: '#222', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
            <h4 style={{ color: '#fff', fontSize: '18px', marginBottom: '8px', fontWeight: 'bold' }}>3. Where We Dropping?</h4>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '16px' }}>Post with an image of {bundle.items[0] ? bundle.items[0].replace('.png','').replace('.jpg','').replace(/_/g, ' ') : 'the item'}.</p>
            <div style={{ backgroundColor: '#000', padding: '15px', borderRadius: '6px', color: '#00ffcc', fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.5' }}>
              Where we dropping boys?<br/><br/>
              POV: You're trying to survive the {bundle.title} lobby but your duo didn't pack the {bundle.items[0] ? bundle.items[0].replace('.png','').replace('.jpg','').replace(/_/g, ' ') : 'Item'}.
            </div>
          </div>

          {/* Idea 4 */}
          <div style={{ backgroundColor: '#222', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
            <h4 style={{ color: '#fff', fontSize: '18px', marginBottom: '8px', fontWeight: 'bold' }}>4. Streamer Bait</h4>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '16px' }}>Tag the influencers/politicians in the bundle.</p>
            <div style={{ backgroundColor: '#000', padding: '15px', borderRadius: '6px', color: '#00ffcc', fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.5' }}>
              Yo, your signature skins just dropped in the {bundle.title}.<br/><br/>
              Rate the {bundle.items[1] ? bundle.items[1].replace('.png','').replace('.jpg','').replace(/_/g, ' ') : 'Item'} out of 10.
            </div>
          </div>

          {/* Idea 5 */}
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
