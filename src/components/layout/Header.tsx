'use client';

import React from 'react';
import { Search, Globe, ChevronDown, Download, Copy } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const pathname = usePathname();
  
  const navItems = [
    { label: 'Discover', href: '/' },
    { label: 'Tokenomics', href: '/tokenomics' },
    { label: 'Socials', href: '/socials' },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      width: '100%',
      height: '64px',
      backgroundColor: '#101014',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: '20px',
      paddingRight: '20px',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      
      {/* LEFT SIDE */}
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        
        {/* Epic Games Shield Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <div style={{
            width: '34px',
            height: '40px',
            backgroundColor: '#ffffff',
            clipPath: 'polygon(50% 100%, 100% 82%, 100% 0, 0 0, 0 82%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '3px',
          }}>
            <span style={{
              color: '#000',
              fontFamily: 'Arial Black, sans-serif',
              fontWeight: 900,
              fontSize: '7.5px',
              lineHeight: '1',
              letterSpacing: '-0.3px',
              textAlign: 'center',
            }}>
              EPIC<br/>GAMES
            </span>
          </div>
          <ChevronDown style={{ width: '14px', height: '14px', color: 'rgba(255,255,255,0.4)' }} />
        </div>

        {/* Divider */}
        <div style={{ width: '1px', height: '28px', backgroundColor: 'rgba(255,255,255,0.1)', marginLeft: '22px', marginRight: '22px' }}></div>

        {/* Fortnite F Logo */}
        <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <svg viewBox="0 0 30 30" style={{ width: '26px', height: '32px', fill: '#ffffff' }}>
            <path d="M4 1h22v7H12v4h12v7H12v11H4V1z"/>
          </svg>
        </div>

        {/* Nav Links */}
        <nav className="header-nav" style={{ display: 'flex', alignItems: 'center', marginLeft: '32px', gap: '6px', height: '100%' }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} style={{
                color: isActive ? '#ffffff' : 'rgba(255,255,255,0.7)',
                fontSize: '16px',
                fontWeight: isActive ? 700 : 500,
                textDecoration: 'none',
                padding: '0 14px',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                borderBottom: isActive ? '3px solid #fff' : '3px solid transparent',
              }}>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* RIGHT SIDE */}
      <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '12px', height: '100%' }}>
        
        {/* CA Placeholder */}
        <div className="ca-placeholder" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#1c1e22',
          height: '42px',
          borderRadius: '9999px',
          paddingLeft: '16px',
          paddingRight: '16px',
          width: '280px',
          border: '1px solid rgba(255,255,255,0.06)',
          cursor: 'pointer',
        }}>
          <span style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '14px',
            fontFamily: 'monospace',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            CA: 0xPLACEHOLDER...
          </span>
          <Copy style={{ width: '16px', height: '16px', color: 'rgba(255,255,255,0.45)', flexShrink: 0, marginLeft: '8px' }} />
        </div>
        
        {/* Globe */}
        <button className="mobile-hide" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Globe style={{ width: '22px', height: '22px', color: 'rgba(255,255,255,0.5)' }} />
        </button>

        {/* Sign In */}
        <button className="mobile-hide" style={{
          height: '42px',
          paddingLeft: '22px',
          paddingRight: '22px',
          borderRadius: '8px',
          backgroundColor: '#2e3137',
          border: 'none',
          color: '#ffffff',
          fontSize: '15px',
          fontWeight: 600,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}>
          Sign in
        </button>

        {/* Buy V-Bucks */}
        <button className="mobile-hide" style={{
          height: '42px',
          paddingLeft: '16px',
          paddingRight: '22px',
          borderRadius: '6px',
          background: 'linear-gradient(90deg, #44227f 0%, #2f47d9 100%)',
          border: 'none',
          color: '#ffffff',
          fontSize: '15px',
          fontWeight: 700,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          whiteSpace: 'nowrap',
        }}>
          <div style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{ color: '#3047d9', fontSize: '14px', fontWeight: 900, lineHeight: 1 }}>V</span>
          </div>
          Buy V-Bucks
        </button>

        {/* Get Fortnite */}
        <button className="mobile-hide" style={{
          height: '42px',
          paddingLeft: '22px',
          paddingRight: '16px',
          borderRadius: '6px',
          backgroundColor: '#fce000',
          border: 'none',
          color: '#000000',
          fontSize: '15px',
          fontWeight: 700,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          whiteSpace: 'nowrap',
        }}>
          Get Fortnite
          <Download style={{ width: '18px', height: '18px', color: '#000000' }} strokeWidth={2.5} />
        </button>
        
      </div>
    </header>
  );
}
