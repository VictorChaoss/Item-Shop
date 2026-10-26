'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, Sparkles, BarChart3, Users, DollarSign } from 'lucide-react';
import BackgroundEffects from '@/components/effects/BackgroundEffects';

import { SITE_CONFIG } from '@/config/site';

const CONTRACT_ADDRESS = SITE_CONFIG.contractAddress;

export default function SocialsPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    {
      name: 'OFFICIAL X (TWITTER)',
      handle: SITE_CONFIG.xHandle,
      rarity: 'MYTHIC',
      tag: 'LIVE NOW',
      tagColor: '#4eff8c',
      description: 'Official announcements, new Item Shop character drops, contract launch alerts, and daily memes.',
      bg: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 50%, #4eb0ff 100%)',
      badge: '𝕏',
      url: SITE_CONFIG.xUrl,
      cta: `FOLLOW ${SITE_CONFIG.xHandle}`,
    },
    {
      name: 'X COMMUNITY',
      handle: 'THE ITEM SHOP LOBBY',
      rarity: 'LEGENDARY',
      tag: 'JOIN SQUAD',
      tagColor: '#fce000',
      description: 'Jump in the lobby with the rest of the holders — raids, memes, bundle ideas, and degen talk.',
      bg: 'linear-gradient(135deg, #6d28d9 0%, #8b5cf6 50%, #a855f7 100%)',
      badge: 'USERS',
      url: SITE_CONFIG.xCommunityUrl,
      cta: 'ENTER LOBBY',
    },
    {
      name: 'STONKFUN.XYZ',
      handle: '$VBUCKS / USDC POOL',
      rarity: 'UNCOMMON',
      tag: '1% USDC REWARDS',
      tagColor: '#34d399',
      description: 'Where $VBUCKS launches on the bonding curve paired with USDC and distributes automatic holder rewards.',
      bg: 'linear-gradient(135deg, #047857 0%, #10b981 50%, #34d399 100%)',
      badge: 'USDC',
      url: SITE_CONFIG.stonkfunUrl,
      cta: 'OPEN STONKFUN',
    },
    {
      name: 'DEX SCREENER',
      handle: 'LIVE CHART & VOLUME',
      rarity: 'EPIC',
      tag: 'POST-LAUNCH',
      tagColor: '#f59e0b',
      description: 'Track real-time price action, market cap, 24h volume, and USDC reward velocity once live.',
      bg: 'linear-gradient(135deg, #b45309 0%, #d97706 50%, #f59e0b 100%)',
      badge: 'CHART',
      url: SITE_CONFIG.dexScreenerUrl,
      cta: 'VIEW CHARTS',
    },
  ];

  const renderBadgeIcon = (badge: string) => {
    if (badge === '𝕏') return <span style={{ fontSize: '30px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>𝕏</span>;
    if (badge === 'USERS') return <Users size={28} color="#fff" strokeWidth={2.5} />;
    if (badge === 'USDC') return <DollarSign size={28} color="#fff" strokeWidth={2.8} />;
    return <BarChart3 size={28} color="#fff" strokeWidth={2.5} />;
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Fortnite Deep Blue Backdrop matching Discover Page */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        background: 'radial-gradient(circle at 50% 0%, #175a96 0%, #0a3d7a 45%, #041224 100%)',
      }} />

      <BackgroundEffects />

      <main style={{
        position: 'relative',
        zIndex: 5,
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '48px 24px 100px',
      }}>
        {/* Top Page Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#fce000',
            color: '#000',
            fontWeight: 900,
            fontSize: '12px',
            padding: '4px 10px',
            borderRadius: '4px',
            textTransform: 'uppercase',
            marginBottom: '10px',
          }}>
            <Sparkles size={14} strokeWidth={3} /> SQUAD UP
          </div>
          <h1 className="fortnite-header" style={{ fontSize: 'clamp(44px, 7vw, 76px)', color: '#ffffff', lineHeight: 0.95, textShadow: '0 4px 24px rgba(0,0,0,0.5)' }}>
            COMMUNITY &amp; SOCIALS
          </h1>
        </div>

        {/* FEATURED X BANNER — Clean Fortnite Banner with 𝕏 Emblem */}
        <div style={{
          position: 'relative',
          width: '100%',
          minHeight: '300px',
          borderRadius: '22px',
          background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 50%, #1e1b4b 100%)',
          border: '2px solid rgba(255,255,255,0.24)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.55)',
          overflow: 'hidden',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          padding: '36px 36px 72px',
        }}>
          {/* Sunburst rays */}
          <div style={{
            position: 'absolute',
            inset: '-50%',
            background: 'repeating-conic-gradient(from 0deg, rgba(255,255,255,0.06) 0deg 10deg, transparent 10deg 20deg)',
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 10, maxWidth: '680px' }}>
            <span style={{
              display: 'inline-block',
              backgroundColor: '#fce000',
              color: '#000',
              fontWeight: 900,
              fontSize: '12px',
              padding: '4px 12px',
              borderRadius: '4px',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}>
              OFFICIAL HEADQUARTERS
            </span>

            <h2 className="fortnite-header" style={{ fontSize: 'clamp(36px, 5vw, 56px)', color: '#fff', lineHeight: 1, marginBottom: '12px' }}>
              FOLLOW @STONKVBUCKS ON X
            </h2>

            <p style={{ fontSize: '16.5px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, marginBottom: '22px', fontWeight: 500 }}>
              The Item Shop never sleeps. Follow our official X account for the contract drop, new character bundle reveals, and live USDC holder reward milestones.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href="https://x.com/STONKVBUCKS"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: '#fce000',
                  color: '#000',
                  fontWeight: 900,
                  fontSize: '15px',
                  padding: '13px 22px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.35)',
                }}
              >
                FOLLOW @STONKVBUCKS <ArrowUpRight size={18} strokeWidth={3} />
              </a>

              <button
                onClick={handleCopy}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: 'rgba(0,0,0,0.55)',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '13px',
                  padding: '13px 18px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.25)',
                  cursor: 'pointer',
                  fontFamily: 'monospace',
                }}
              >
                {copied ? 'COPIED CA!' : 'CA: COMING SOON'}
                {copied ? <Check size={16} color="#4eff8c" /> : <Copy size={16} color="#4eb0ff" />}
              </button>
            </div>
          </div>

          {/* Right X Emblem Badge */}
          <div className="mobile-hide" style={{
            position: 'absolute',
            right: '56px',
            top: '50%',
            transform: 'translateY(-58%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 6,
          }}>
            <div style={{
              width: '190px',
              height: '190px',
              borderRadius: '36px',
              background: 'linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(15,23,42,0.9) 100%)',
              border: '4px solid rgba(255,255,255,0.85)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.55), 0 0 50px rgba(78,176,255,0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'rotate(6deg)',
            }}>
              <span style={{ fontSize: '96px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>𝕏</span>
            </div>
          </div>

          {/* Bottom White Fortnite Strip */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40px',
            backgroundColor: 'rgba(255,255,255,0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 28px',
            zIndex: 12,
          }}>
            <span style={{ fontSize: '12px', fontWeight: 900, color: '#111', letterSpacing: '0.6px', textTransform: 'uppercase' }}>
              OFFICIAL HANDLE: @STONKVBUCKS &nbsp;•&nbsp; TURN ON NOTIFICATIONS FOR CA DROP
            </span>
            <span style={{ fontSize: '12px', fontWeight: 900, color: '#2563eb', textTransform: 'uppercase' }}>
              VERIFIED LINKS ONLY
            </span>
          </div>
        </div>

        {/* SOCIAL CARDS GRID — Clean Rarity Cards without Characters */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}>
          {socials.map((social, i) => (
            <a
              key={i}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: 'relative',
                minHeight: '260px',
                borderRadius: '20px',
                background: social.bg,
                border: '2px solid rgba(255,255,255,0.22)',
                padding: '24px 24px 58px',
                textDecoration: 'none',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 14px 36px rgba(0,0,0,0.4)',
                transition: 'transform 0.2s ease',
              }}
            >
              {/* Subtle radial highlight */}
              <div style={{
                position: 'absolute',
                top: '-30%',
                right: '-20%',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />

              {/* Top row badges + Icon Box */}
              <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    color: '#fff',
                    fontSize: '10px',
                    fontWeight: 900,
                    padding: '4px 9px',
                    borderRadius: '4px',
                    letterSpacing: '1px',
                  }}>
                    {social.rarity}
                  </span>
                  <span style={{
                    backgroundColor: social.tagColor,
                    color: '#000',
                    fontSize: '10px',
                    fontWeight: 900,
                    padding: '4px 9px',
                    borderRadius: '4px',
                    letterSpacing: '0.8px',
                  }}>
                    {social.tag}
                  </span>
                </div>

                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '14px',
                  backgroundColor: 'rgba(0,0,0,0.35)',
                  border: '1.5px solid rgba(255,255,255,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {renderBadgeIcon(social.badge)}
                </div>
              </div>

              {/* Text Content */}
              <div style={{ position: 'relative', zIndex: 10, marginTop: '18px' }}>
                <p style={{ fontSize: '12px', fontWeight: 900, color: 'rgba(255,255,255,0.85)', letterSpacing: '1px', marginBottom: '4px' }}>
                  {social.name}
                </p>
                <h3 className="fortnite-header" style={{ fontSize: '30px', color: '#fff', lineHeight: 1.05, marginBottom: '10px', textShadow: '0 2px 12px rgba(0,0,0,0.35)' }}>
                  {social.handle}
                </h3>
                <p style={{ fontSize: '14.5px', color: 'rgba(255,255,255,0.92)', lineHeight: 1.55, fontWeight: 500 }}>
                  {social.description}
                </p>
              </div>

              {/* Bottom White Rarity Strip */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '40px',
                backgroundColor: 'rgba(255,255,255,0.92)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 20px',
                zIndex: 12,
              }}>
                <span style={{ fontSize: '12px', fontWeight: 900, color: '#111', letterSpacing: '0.6px' }}>
                  {social.cta}
                </span>
                <ArrowUpRight size={16} color="#111" strokeWidth={3} />
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
