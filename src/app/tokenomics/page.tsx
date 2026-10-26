'use client';

import React, { useState } from 'react';
import { Copy, Check, ShieldCheck, Coins, Flame, Zap, DollarSign, ArrowUpRight } from 'lucide-react';
import BackgroundEffects from '@/components/effects/BackgroundEffects';

const CONTRACT_ADDRESS = 'COMING SOON — LAUNCHING ON STONKFUN.XYZ';

const rarityStats = [
  {
    label: 'TICKER',
    value: '$VBUCKS',
    sub: 'Official Shop Currency',
    bg: 'linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #fbbf24 100%)', // Legendary Gold
    rarity: 'LEGENDARY',
  },
  {
    label: 'TOTAL SUPPLY',
    value: '1,000,000,000',
    sub: '1 Billion Fixed Supply',
    bg: 'linear-gradient(135deg, #6d28d9 0%, #8b5cf6 50%, #a855f7 100%)', // Epic Purple
    rarity: 'EPIC',
  },
  {
    label: 'HOLDER REWARDS',
    value: '1% USDC',
    sub: 'Auto-AirDropped Every Transfer',
    bg: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)', // Uncommon Green
    rarity: 'UNCOMMON',
  },
  {
    label: 'TRADING FEE',
    value: '1.25%',
    sub: 'LaunchLab Bonding Curve',
    bg: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 50%, #4eb0ff 100%)', // Rare Blue
    rarity: 'RARE',
  },
  {
    label: 'GRADUATION',
    value: '85 SOL',
    sub: 'Auto-Migrates to Raydium',
    bg: 'linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #f87171 100%)', // Mythic Red
    rarity: 'MYTHIC',
  },
  {
    label: 'NETWORK',
    value: 'SOLANA',
    sub: 'Paired with USDC on StonkFun',
    bg: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 50%, #60a5fa 100%)', // Rare Blue
    rarity: 'ICON SERIES',
  },
];

const spendFacts = [
  {
    value: '$5B–$6B / YR',
    title: 'Annual V-Bucks Velocity',
    text: 'Estimated yearly Fortnite revenue — almost entirely driven by players buying V-Bucks for Item Shop skins and bundles.',
    accent: '#fce000',
  },
  {
    value: '$40B+ LIFETIME',
    title: 'Total Cultural Spend',
    text: 'Over forty billion dollars spent on digital cosmetics since 2017 with zero financial return to the players.',
    accent: '#4eb0ff',
  },
  {
    value: '650M+ PLAYERS',
    title: 'Global Brand Recognition',
    text: 'Over 110M monthly active users and 650M+ registered accounts instantly recognize the V-Bucks icon and midnight shop rotation.',
    accent: '#a855f7',
  },
  {
    value: '$9B FIRST 2 YRS',
    title: 'The Original Runner',
    text: '$5.5B in 2018 and $3.7B in 2019 alone. V-Bucks is the undisputed #1 digital currency in gaming history.',
    accent: '#34d399',
  },
];

export default function TokenomicsPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        {/* Top Page Title Row — exact same vibe as Item Shop Discover */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '12px', padding: '4px 10px', borderRadius: '4px', textTransform: 'uppercase', marginBottom: '10px' }}>
            <Coins size={14} strokeWidth={3} /> OFFICIAL SHOP CURRENCY
          </div>
          <h1 className="fortnite-header" style={{ fontSize: 'clamp(44px, 7vw, 76px)', color: '#ffffff', lineHeight: 0.95, textShadow: '0 4px 24px rgba(0,0,0,0.5)' }}>
            $VBUCKS TOKENOMICS
          </h1>
        </div>

        {/* HERO BANNER — Styled like a Fortnite Item Shop Featured Bundle */}
        <div style={{
          position: 'relative',
          width: '100%',
          minHeight: '360px',
          borderRadius: '22px',
          background: 'linear-gradient(135deg, #4eb0ff 0%, #1d4ed8 55%, #0f172a 100%)',
          border: '2px solid rgba(255,255,255,0.22)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.55)',
          overflow: 'hidden',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          padding: '40px 36px 76px',
        }}>
          {/* Sunburst rays overlay */}
          <div style={{
            position: 'absolute',
            inset: '-50%',
            background: ' repeating-conic-gradient(from 0deg, rgba(255,255,255,0.06) 0deg 10deg, transparent 10deg 20deg)',
            pointerEvents: 'none',
          }} />

          {/* Left Content */}
          <div style={{ position: 'relative', zIndex: 10, maxWidth: '680px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
              <span style={{
                backgroundColor: '#fce000',
                color: '#000',
                fontWeight: 900,
                fontSize: '13px',
                padding: '4px 12px',
                borderRadius: '4px',
                textTransform: 'uppercase',
              }}>
                MYTHIC CURRENCY BUNDLE
              </span>
              <span style={{
                backgroundColor: 'rgba(0,0,0,0.45)',
                color: '#fff',
                fontWeight: 800,
                fontSize: '12px',
                padding: '5px 12px',
                borderRadius: '4px',
                border: '1px solid rgba(255,255,255,0.2)',
                textTransform: 'uppercase',
              }}>
                STONKFUN.XYZ • USDC PAIR
              </span>
            </div>

            <h2 className="fortnite-header" style={{ fontSize: 'clamp(34px, 5vw, 54px)', color: '#fff', lineHeight: 1.05, marginBottom: '14px', textShadow: '0 4px 16px rgba(0,0,0,0.35)' }}>
              THE SITE IS THE ITEM SHOP.<br />$VBUCKS IS THE CURRENCY.
            </h2>

            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.92)', lineHeight: 1.6, fontWeight: 500, marginBottom: '22px' }}>
              In Fortnite, the Item Shop is where all the skins, emotes, and bundles drop — and V-Bucks are the money you spend inside it. We brought both on-chain. Hold <strong>$VBUCKS</strong> in your wallet and automatically earn <strong>real USDC rewards</strong> on every single transfer.
            </p>

            {/* Contract Address Box inside Hero */}
            <div
              onClick={handleCopy}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '14px',
                backgroundColor: 'rgba(6, 14, 28, 0.82)',
                backdropFilter: 'blur(12px)',
                border: '2px solid #fce000',
                borderRadius: '12px',
                padding: '12px 18px',
                cursor: 'pointer',
                maxWidth: '100%',
                boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
              }}
            >
              <span style={{
                backgroundColor: '#fce000',
                color: '#000',
                fontWeight: 900,
                fontSize: '12px',
                padding: '4px 8px',
                borderRadius: '5px',
                letterSpacing: '0.5px',
              }}>
                CONTRACT
              </span>
              <span style={{
                fontFamily: 'monospace',
                fontSize: '15px',
                fontWeight: 700,
                color: '#fff',
                wordBreak: 'break-all',
              }}>
                {copied ? 'COPIED TO CLIPBOARD!' : CONTRACT_ADDRESS}
              </span>
              {copied ? <Check size={18} color="#4eff8c" /> : <Copy size={18} color="#fce000" />}
            </div>
          </div>

          {/* Right side V-Bucks Coin Emblem */}
          <div className="mobile-hide" style={{
            position: 'absolute',
            right: '54px',
            top: '50%',
            transform: 'translateY(-58%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 6,
          }}>
            <div style={{
              width: '210px',
              height: '210px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, #ffffff 0%, #dbeafe 25%, #3b82f6 70%, #1e3a8a 100%)',
              border: '8px solid rgba(255,255,255,0.9)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.55), 0 0 60px rgba(78,176,255,0.6), inset 0 -8px 20px rgba(30,58,138,0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'rotate(-8deg)',
            }}>
              <div style={{
                width: '164px',
                height: '164px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1d4ed8 0%, #0f172a 100%)',
                border: '3px solid rgba(255,255,255,0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span className="fortnite-header" style={{
                  fontSize: '112px',
                  color: '#ffffff',
                  lineHeight: 1,
                  textShadow: '0 6px 18px rgba(78,176,255,0.6)',
                }}>
                  V
                </span>
              </div>
            </div>
          </div>

          {/* White Fortnite Bottom Strip */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40px',
            backgroundColor: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 28px',
            zIndex: 12,
          }}>
            <span style={{ fontSize: '12px', fontWeight: 900, color: '#111', letterSpacing: '0.6px', textTransform: 'uppercase' }}>
              INCLUDES: 1 BILLION SUPPLY &nbsp;•&nbsp; 1% AUTO USDC HOLDER REWARDS &nbsp;•&nbsp; 85 SOL RAYDIUM GRADUATION
            </span>
            <span style={{ fontSize: '12px', fontWeight: 900, color: '#1d4ed8', textTransform: 'uppercase' }}>
              NO STAKING REQUIRED
            </span>
          </div>
        </div>

        {/* 6 TOKEN STATS — Styled like Fortnite Rarity Item Tiles */}
        <div style={{ marginBottom: '44px' }}>
          <h2 className="fortnite-header" style={{ fontSize: '36px', color: '#fff', marginBottom: '16px' }}>
            ITEM SPECIFICATIONS
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
          }}>
            {rarityStats.map((item, i) => (
              <div key={i} style={{
                position: 'relative',
                borderRadius: '16px',
                background: item.bg,
                padding: '24px 22px 48px',
                border: '2px solid rgba(255,255,255,0.22)',
                boxShadow: '0 10px 28px rgba(0,0,0,0.35)',
                overflow: 'hidden',
              }}>
                {/* Subtle radial highlight */}
                <div style={{
                  position: 'absolute',
                  top: '-30%',
                  right: '-20%',
                  width: '180px',
                  height: '180px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.28) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }} />

                <span style={{
                  display: 'inline-block',
                  backgroundColor: 'rgba(0,0,0,0.45)',
                  color: '#fff',
                  fontSize: '10px',
                  fontWeight: 900,
                  letterSpacing: '1.2px',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  marginBottom: '12px',
                }}>
                  {item.rarity}
                </span>

                <p className="fortnite-header" style={{ fontSize: '34px', color: '#fff', lineHeight: 1.05, marginBottom: '6px', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                  {item.value}
                </p>
                <p style={{ fontSize: '14px', fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>
                  {item.sub}
                </p>

                {/* Bottom white rarity strip */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '32px',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 18px',
                }}>
                  <span style={{ fontSize: '11px', fontWeight: 900, color: '#111', letterSpacing: '0.8px' }}>
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LORE & CULTURE — 2 COLUMN GAME CARDS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '20px',
          marginBottom: '44px',
        }}>
          {/* Card 1: Why Item Shop + V-Bucks */}
          <div style={{
            borderRadius: '20px',
            background: 'linear-gradient(160deg, rgba(15, 33, 67, 0.92) 0%, rgba(7, 18, 38, 0.96) 100%)',
            border: '1px solid rgba(78, 176, 255, 0.3)',
            padding: '32px',
            boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
          }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#fce000', fontWeight: 900, fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '10px' }}>
              <Zap size={16} /> THE ECOSYSTEM
            </div>
            <h3 className="fortnite-header" style={{ fontSize: '32px', color: '#fff', marginBottom: '14px', lineHeight: 1.05 }}>
              WHY &quot;ITEM SHOP&quot; &amp; &quot;$VBUCKS&quot;?
            </h3>
            <p style={{ fontSize: '15.5px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: '14px' }}>
              Every single gamer knows how Fortnite works: the <strong>Item Shop</strong> is the storefront that rotates iconic characters and bundles at midnight, and <strong>V-Bucks</strong> are the currency required to unlock them.
            </p>
            <p style={{ fontSize: '15.5px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>
              One doesn&apos;t exist without the other. Our website is the satirical <strong>Item Shop</strong> featuring internet culture&apos;s wildest bundles, and <strong>$VBUCKS</strong> is the native currency powering the entire world.
            </p>
          </div>

          {/* Card 2: What are V-Bucks & The Culture */}
          <div style={{
            borderRadius: '20px',
            background: 'linear-gradient(160deg, rgba(46, 16, 101, 0.88) 0%, rgba(17, 10, 40, 0.96) 100%)',
            border: '1px solid rgba(168, 85, 247, 0.35)',
            padding: '32px',
            boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
          }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#c084fc', fontWeight: 900, fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '10px' }}>
              <Flame size={16} /> THE LORE &amp; CULTURE
            </div>
            <h3 className="fortnite-header" style={{ fontSize: '32px', color: '#fff', marginBottom: '14px', lineHeight: 1.05 }}>
              THE MOST ICONIC CURRENCY IN GAMING
            </h3>
            <p style={{ fontSize: '15.5px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: '14px' }}>
              Introduced in 2017, V-Bucks transcended gaming to become pure internet culture. From grocery store gift card racks to viral &quot;19 Dollar Fortnite Card&quot; memes, V-Bucks is a household name for an entire generation.
            </p>
            <p style={{ fontSize: '15.5px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>
              People flex skins the exact same way they flex Rolexes, sneakers, or blue-chip NFTs. $VBUCKS takes that instant cultural mindshare and turns it into a reward-bearing asset on Solana.
            </p>
          </div>
        </div>

        {/* WHY IT DESERVES TO BE A RUNNER — SPENDING FACTS */}
        <div style={{
          borderRadius: '22px',
          background: 'linear-gradient(180deg, rgba(10, 25, 48, 0.92) 0%, rgba(5, 13, 26, 0.96) 100%)',
          border: '2px solid rgba(252, 224, 0, 0.35)',
          padding: '36px 32px',
          marginBottom: '44px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.45)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
            <div>
              <span style={{ backgroundColor: '#fce000', color: '#000', fontWeight: 900, fontSize: '11px', padding: '4px 10px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                BILLION-DOLLAR ECONOMY
              </span>
              <h2 className="fortnite-header" style={{ fontSize: 'clamp(30px, 4.5vw, 44px)', color: '#fff', marginTop: '10px', lineHeight: 1 }}>
                WHY $VBUCKS DESERVES TO BE A RUNNER
              </h2>
            </div>
          </div>

          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, maxWidth: '820px', marginBottom: '28px' }}>
            Most meme coins try to manufacture attention from scratch. <strong>V-Bucks already commands billions of dollars in real-world annual spending.</strong> Gamers have poured over $40 billion into V-Bucks with zero return — now imagine a version on Solana that actually pays you back in USDC for holding.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px',
          }}>
            {spendFacts.map((fact, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.04)',
                borderRadius: '16px',
                padding: '24px 20px',
                border: '1px solid rgba(255,255,255,0.1)',
                borderTop: `4px solid ${fact.accent}`,
              }}>
                <p className="fortnite-header" style={{ fontSize: '32px', color: fact.accent, marginBottom: '6px', lineHeight: 1 }}>
                  {fact.value}
                </p>
                <p style={{ fontSize: '15px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
                  {fact.title}
                </p>
                <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.68)', lineHeight: 1.55 }}>
                  {fact.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* USDC REWARDS FLYWHEEL SECTION */}
        <div style={{
          borderRadius: '22px',
          background: 'linear-gradient(135deg, #064e3b 0%, #047857 50%, #065f46 100%)',
          border: '2px solid rgba(255,255,255,0.22)',
          padding: '36px 32px',
          marginBottom: '44px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.45)',
        }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#fff', color: '#065f46', fontWeight: 900, fontSize: '11px', padding: '4px 10px', borderRadius: '4px', textTransform: 'uppercase', marginBottom: '12px' }}>
            <DollarSign size={14} strokeWidth={3} /> STONKFUN.XYZ REWARD ENGINE
          </div>
          <h2 className="fortnite-header" style={{ fontSize: 'clamp(30px, 4.5vw, 44px)', color: '#fff', lineHeight: 1, marginBottom: '14px' }}>
            PAIRED WITH USDC — AUTOMATIC HOLDER PAYOUTS
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, maxWidth: '820px', marginBottom: '28px' }}>
            On StonkFun (powered by Raydium LaunchLab), reward tokens pay holders in the exact quote asset the coin is paired against. By pairing <strong>$VBUCKS</strong> directly with <strong>USDC</strong>, every holder earns real, stable US Dollars automatically.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '16px',
          }}>
            {[
              {
                step: '01',
                title: '1% Transfer Tax',
                desc: 'Locked at launch: every transfer contributes 1% into the holder reward pool alongside a 1.25% trading fee.',
              },
              {
                step: '02',
                title: 'Paid in Real USDC',
                desc: 'Instead of earning a volatile token that dumps, rewards are distributed in USDC — stable, liquid digital dollars.',
              },
              {
                step: '03',
                title: '100% Automatic',
                desc: 'No staking contracts, no lockups, and no sketchy claim websites. Rewards drop straight into your Solana wallet pro-rata.',
              },
              {
                step: '04',
                title: '85 SOL Raydium Pool',
                desc: 'Fair bonding-curve launch with zero upfront team allocation. At 85 SOL raised, liquidity automatically graduates to Raydium.',
              },
            ].map((item, idx) => (
              <div key={idx} style={{
                backgroundColor: 'rgba(0,0,0,0.32)',
                borderRadius: '14px',
                padding: '22px 20px',
                border: '1px solid rgba(255,255,255,0.14)',
              }}>
                <span className="fortnite-header" style={{ fontSize: '26px', color: '#6ee7b7', display: 'block', marginBottom: '6px' }}>
                  STEP {item.step}
                </span>
                <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.55 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div style={{
          textAlign: 'center',
          padding: '20px',
          borderRadius: '14px',
          backgroundColor: 'rgba(0,0,0,0.28)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
            <ShieldCheck size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px', color: '#4eb0ff' }} />
            <strong>DISCLAIMER:</strong> $VBUCKS is an independent community meme coin on Solana and is not affiliated with, endorsed by, or connected to Epic Games, Inc. or Fortnite. Revenue statistics are based on public industry estimates. Nothing on this site constitutes financial advice.
          </p>
        </div>
      </main>
    </div>
  );
}
