'use client';

import React, { useState } from 'react';
import { ChevronDown, Download, Copy, Check, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const CONTRACT_ADDRESS = 'COMING SOON — LAUNCHING ON STONKFUN';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const navItems = [
    { label: 'Discover', href: '/' },
    { label: 'Tokenomics', href: '/tokenomics' },
    { label: 'Socials', href: '/socials' },
  ];

  const handleCopyCA = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
        
        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', marginRight: '16px', padding: '0' }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Epic Games Shield Logo */}
        <Link href="/" className="epic-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', textDecoration: 'none' }}>
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
        </Link>

        {/* Divider */}
        <div style={{ width: '1px', height: '28px', backgroundColor: 'rgba(255,255,255,0.1)', marginLeft: '22px', marginRight: '22px' }}></div>

        {/* Fortnite F Logo */}
        <Link href="/" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <svg viewBox="0 0 30 30" style={{ width: '26px', height: '32px', fill: '#ffffff' }}>
            <path d="M4 1h22v7H12v4h12v7H12v11H4V1z"/>
          </svg>
        </Link>

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
                borderBottom: isActive ? '3px solid #4eb0ff' : '3px solid transparent',
              }}>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* RIGHT SIDE */}
      <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '12px', height: '100%' }}>
        
        {/* Upgraded CA Pill */}
        <button
          onClick={handleCopyCA}
          className="ca-placeholder"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'linear-gradient(135deg, rgba(78,176,255,0.14) 0%, rgba(48,71,217,0.18) 100%)',
            height: '42px',
            borderRadius: '10px',
            paddingLeft: '12px',
            paddingRight: '14px',
            border: '1px solid rgba(78,176,255,0.35)',
            cursor: 'pointer',
            boxShadow: '0 0 20px rgba(78,176,255,0.12)',
            transition: 'all 0.2s ease',
          }}
        >
          {/* V-Buck mini icon */}
          <div style={{
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4eb0ff 0%, #3047d9 100%)',
            border: '1.5px solid #ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{ color: '#ffffff', fontSize: '11px', fontWeight: 900, lineHeight: 1 }}>V</span>
          </div>

          <span style={{
            backgroundColor: '#fce000',
            color: '#000',
            fontSize: '10px',
            fontWeight: 900,
            padding: '2px 6px',
            borderRadius: '4px',
            letterSpacing: '0.5px',
            flexShrink: 0,
          }}>
            CA
          </span>

          <span style={{
            color: '#ffffff',
            fontSize: '13px',
            fontWeight: 700,
            fontFamily: 'monospace',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '210px',
          }}>
            {copied ? 'COPIED TO CLIPBOARD!' : CONTRACT_ADDRESS}
          </span>

          {copied ? (
            <Check style={{ width: '15px', height: '15px', color: '#4eff8c', flexShrink: 0 }} />
          ) : (
            <Copy style={{ width: '15px', height: '15px', color: '#4eb0ff', flexShrink: 0 }} />
          )}
        </button>

        {/* Buy V-Bucks */}
        <Link href="/tokenomics" className="mobile-hide" style={{
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
          textDecoration: 'none',
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
          Buy $VBUCKS
        </Link>

        {/* Get Fortnite */}
        <a href="https://x.com/STONKVBUCKS" target="_blank" rel="noopener noreferrer" className="mobile-hide" style={{
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
          textDecoration: 'none',
        }}>
          Join X
          <Download style={{ width: '18px', height: '18px', color: '#000000' }} strokeWidth={2.5} />
        </a>
        
      </div>
      
      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-menu-dropdown" style={{
          position: 'absolute',
          top: '64px',
          left: 0,
          width: '100%',
          backgroundColor: '#101014',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          flexDirection: 'column',
          padding: '8px 0',
          zIndex: 40,
        }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.7)',
                  fontSize: '18px',
                  fontWeight: isActive ? 700 : 500,
                  textDecoration: 'none',
                  padding: '16px 24px',
                  borderLeft: isActive ? '4px solid #4eb0ff' : '4px solid transparent',
                  backgroundColor: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
