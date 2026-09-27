'use client';

import React, { useState, useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';

const bundles = [
  {
    id: 'rug',
    title: 'THE SERIAL RUGGERS',
    bg: 'radial-gradient(circle at 70% 50%, #2a5a3a 0%, #0a1a0f 100%)',
    characters: ['section3_char1.png', 'section3_char2.png', 'section3_char3.png'],
    items: ['exit_liquidity.png', 'blackbull_gta.png', '10x_with_cheese.png']
  },
  {
    id: 'epstein',
    title: 'THE EPSTEIN FILES',
    bg: 'radial-gradient(circle at 70% 50%, #3a1870 0%, #1a0c3a 100%)',
    characters: ['jeffrey_epstein.png', 'ghislaine_maxwell.png', 'prince_andrew.png', 'steven_hawking.png'],
    items: ['little_saint_james_map.png', 'epstein_files_classified.jpg', 'lolita_express.png']
  },
  {
    id: 'vape',
    title: 'LA VAPE CABAL',
    bg: 'radial-gradient(circle at 70% 50%, #1e8a9a 0%, #0a303a 100%)',
    characters: ['frank.png', 'thread_guy.png', 'banks.png'],
    items: ['chrome_bag.png', 'vape_axe.png', 'curry_potion.png']
  }
];

export default function PromoGenerator() {
  const [selectedBundleId, setSelectedBundleId] = useState(bundles[0].id);
  const [isExporting, setIsExporting] = useState(false);
  const promoRef = useRef<HTMLDivElement>(null);
  
  const bundle = bundles.find(b => b.id === selectedBundleId) || bundles[0];

  const handleDownload = async () => {
    if (!promoRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await htmlToImage.toPng(promoRef.current, {
        quality: 1.0,
        pixelRatio: 1, // Keep it exactly 1920x1080
      });
      const link = document.createElement('a');
      link.download = `${bundle.title.toLowerCase().replace(/\s+/g, '_')}_promo.png`;
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', backgroundColor: '#111', padding: '16px', borderRadius: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
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
          {isExporting ? 'Generating...' : 'Download 1080p Promo'}
        </button>
      </div>

      {/* Wrapper to allow scrolling since it's exactly 1920x1080 */}
      <div style={{ width: '100%', overflowX: 'auto', overflowY: 'auto', border: '2px dashed #333', borderRadius: '12px', display: 'flex', justifyContent: 'center', backgroundColor: '#111' }}>
        
        {/* The 1920x1080 Canvas */}
        <div 
          ref={promoRef}
          style={{
            width: '1920px',
            height: '1080px',
            background: bundle.bg,
            position: 'relative',
            overflow: 'hidden',
            flexShrink: 0
          }}
        >
          {/* Top Left Text */}
          <div style={{ position: 'absolute', top: '100px', left: '120px', zIndex: 20 }}>
            <h1 className="fortnite-header" style={{ fontSize: '180px', lineHeight: '0.85', margin: 0, textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>ITEM SHOP</h1>
            <h2 className="fortnite-header" style={{ fontSize: '70px', color: '#fce000', margin: '20px 0 0 0', textShadow: '0 5px 15px rgba(0,0,0,0.5)' }}>{bundle.title}</h2>
          </div>

          {/* Items Grid (Left side) */}
          <div style={{ position: 'absolute', bottom: '100px', left: '120px', width: '500px', zIndex: 15 }}>
            {/* Corner brackets */}
            <div style={{ position: 'absolute', top: '-20px', left: '-20px', width: '40px', height: '40px', borderTop: '6px solid white', borderLeft: '6px solid white' }}></div>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '40px', height: '40px', borderTop: '6px solid white', borderRight: '6px solid white' }}></div>
            <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '40px', height: '40px', borderBottom: '6px solid white', borderLeft: '6px solid white' }}></div>
            <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', width: '40px', height: '40px', borderBottom: '6px solid white', borderRight: '6px solid white' }}></div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {bundle.items.map((item, i) => {
                const isJpg = item.endsWith('.jpg');
                return (
                  <div key={i} style={{ 
                    aspectRatio: '1', 
                    backgroundColor: 'rgba(0,0,0,0.25)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                  }}>
                    <img 
                      src={`/images/${item}`} 
                      alt="Item" 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'contain', 
                        filter: isJpg ? 'none' : 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))',
                        mixBlendMode: isJpg ? 'screen' : 'normal'
                      }} 
                    />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Characters (Right side) */}
          <div style={{ 
            position: 'absolute', 
            top: '0', 
            right: '-100px', 
            width: '1400px', 
            height: '100%',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            zIndex: 10
          }}>
            {bundle.characters.map((char, i) => (
              <img 
                key={i}
                src={`/images/${char}`} 
                alt="Character" 
                style={{ 
                  height: '95%', 
                  width: 'auto', 
                  objectFit: 'contain',
                  marginLeft: i > 0 ? '-250px' : '0',
                  zIndex: bundle.characters.length - i,
                  filter: 'drop-shadow(0 0 40px rgba(0,0,0,0.6))',
                  maskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)'
                }} 
              />
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}
