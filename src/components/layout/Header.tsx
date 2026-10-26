'use client';

import React, { useState } from 'react';
import { ChevronDown, Download, Copy, Check, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { SITE_CONFIG } from '@/config/site';

const CONTRACT_ADDRESS = SITE_CONFIG.contractAddress;

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

        {/* Official V-Bucks Logo */}
        <Link href="/" className="epic-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', textDecoration: 'none' }}>
          <img
            src="/images/vbucks_logo.png"
            alt="$VBUCKS"
            style={{ width: '40px', height: '40px', objectFit: 'contain', filter: 'drop-shadow(0 2px 8px rgba(78,176,255,0.4))' }}
          />
          <span className="fortnite-header" style={{ color: '#ffffff', fontSize: '24px', letterSpacing: '0.8px', lineHeight: 1 }}>
            $VBUCKS
          </span>
        </Link>

        {/* Divider */}
        <div style={{ width: '1px', height: '28px', backgroundColor: 'rgba(255,255,255,0.1)', marginLeft: '20px', marginRight: '8px' }}></div>

        {/* Nav Links */}
        <nav className="header-nav" style={{ display: 'flex', alignItems: 'center', marginLeft: '16px', gap: '6px', height: '100%' }}>
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
            paddingLeft: '10px',
            paddingRight: '14px',
            border: '1px solid rgba(78,176,255,0.35)',
            cursor: 'pointer',
            boxShadow: '0 0 20px rgba(78,176,255,0.12)',
            transition: 'all 0.2s ease',
          }}
        >
          <img
            src="/images/vbucks_logo.png"
            alt="V-Bucks"
            style={{ width: '26px', height: '26px', objectFit: 'contain', flexShrink: 0 }}
          />

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

        {/* Buy V-Bucks on StonkFun */}
        <a
          href={SITE_CONFIG.stonkfunUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-hide"
          style={{
            height: '42px',
            paddingLeft: '14px',
            paddingRight: '18px',
            borderRadius: '6px',
            background: 'linear-gradient(90deg, #44227f 0%, #2f47d9 100%)',
            border: 'none',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap',
            textDecoration: 'none',
          }}
        >
          <img
            src="/images/vbucks_logo.png"
            alt="V-Bucks"
            style={{ width: '26px', height: '26px', objectFit: 'contain', flexShrink: 0 }}
          />
          Buy $VBUCKS
        </a>

        {/* 1-Click DexScreener */}
        <a
          href={SITE_CONFIG.dexScreenerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-hide"
          style={{
            height: '42px',
            paddingLeft: '14px',
            paddingRight: '14px',
            borderRadius: '6px',
            backgroundColor: '#1c1e24',
            border: '1px solid rgba(255,255,255,0.16)',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            whiteSpace: 'nowrap',
            textDecoration: 'none',
          }}
        >
          DexScreener
        </a>

        {/* Join X */}
        <a href={SITE_CONFIG.xUrl} target="_blank" rel="noopener noreferrer" className="mobile-hide" style={{
          height: '42px',
          paddingLeft: '18px',
          paddingRight: '14px',
          borderRadius: '6px',
          backgroundColor: '#fce000',
          border: 'none',
          color: '#000000',
          fontSize: '14px',
          fontWeight: 700,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          whiteSpace: 'nowrap',
          textDecoration: 'none',
        }}>
          Join X
          <Download style={{ width: '16px', height: '16px', color: '#000000' }} strokeWidth={2.5} />
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
