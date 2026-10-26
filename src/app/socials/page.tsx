'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, Sparkles, BarChart3, Users, MessageCircle } from 'lucide-react';
import BackgroundEffects from '@/components/effects/BackgroundEffects';

const CONTRACT_ADDRESS = 'COMING SOON — LAUNCHING ON STONKFUN.XYZ';

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
      handle: '@STONKVBUCKS',
      rarity: 'MYTHIC',
      tag: 'LIVE NOW',
      tagColor: '#4eff8c',
      description: 'Official announcements, new Item Shop character drops, contract launch alerts, and daily memes.',
      bg: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 50%, #4eb0ff 100%)',
      character: '/images/togi.png',
      url: 'https://x.com/STONKVBUCKS',
      cta: 'FOLLOW @STONKVBUCKS',
    },
    {
      name: 'X COMMUNITY',
      handle: 'THE ITEM SHOP LOBBY',
      rarity: 'LEGENDARY',
      tag: 'JOIN SQUAD',
      tagColor: '#fce000',
      description: 'Jump in the lobby with the rest of the holders — raids, memes, bundle ideas, and degen talk.',
      bg: 'linear-gradient(135deg, #6d28d9 0%, #8b5cf6 50%, #a855f7 100%)',
      character: '/images/thread_guy.png',
      url: 'https://x.com/STONKVBUCKS',
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
      character: '/images/jordan.png',
      url: 'https://stonkfun.xyz',
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
      character: '/images/banks.png',
      url: 'https://dexscreener.com',
      cta: 'VIEW CHARTS',
    },
  ];

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

        {/* FEATURED X BANNER — Looks like a Fortnite Featured Bundle */}
        <div style={{
          position: 'relative',
          width: '100%',
          minHeight: '320px',
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

          <div style={{ position: 'relative', zIndex: 10, maxWidth: '640px' }}>
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

          {/* Right Character Cutouts */}
          <div className="mobile-hide" style={{
            position: 'absolute',
            right: '28px',
            bottom: '38px',
            display: 'flex',
            alignItems: 'flex-end',
            pointerEvents: 'none',
            zIndex: 6,
          }}>
            <img
              src="/images/top_g.png"
              alt="Top G"
              style={{ height: '320px', objectFit: 'contain', marginRight: '-50px', filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.65))' }}
            />
            <img
              src="/images/p_diddy.png"
              alt="Diddy"
              style={{ height: '340px', objectFit: 'contain', filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.65))' }}
            />
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

        {/* SOCIAL CARDS GRID — Styled like Fortnite Item Shop Bundle Cards */}
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
                minHeight: '290px',
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
              {/* Top row badges */}
              <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', gap: '8px' }}>
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

              {/* Text Content */}
              <div style={{ position: 'relative', zIndex: 10, maxWidth: '72%', marginTop: '24px' }}>
                <p style={{ fontSize: '12px', fontWeight: 900, color: 'rgba(255,255,255,0.85)', letterSpacing: '1px', marginBottom: '4px' }}>
                  {social.name}
                </p>
                <h3 className="fortnite-header" style={{ fontSize: '30px', color: '#fff', lineHeight: 1.05, marginBottom: '10px', textShadow: '0 2px 12px rgba(0,0,0,0.35)' }}>
                  {social.handle}
                </h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.92)', lineHeight: 1.5, fontWeight: 500 }}>
                  {social.description}
                </p>
              </div>

              {/* Character Cutout on Right */}
              <img
                src={social.character}
                alt={social.name}
                style={{
                  position: 'absolute',
                  right: '-10px',
                  bottom: '34px',
                  height: '210px',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.55))',
                  pointerEvents: 'none',
                  zIndex: 5,
                }}
              />

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
