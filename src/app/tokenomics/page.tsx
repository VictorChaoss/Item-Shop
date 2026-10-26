'use client';

import React from 'react';

const cardStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '800px',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
  borderRadius: '16px',
  padding: '36px 36px',
  border: '1px solid rgba(255,255,255,0.08)',
  marginBottom: '24px',
};

const labelStyle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 700,
  letterSpacing: '2px',
  textTransform: 'uppercase',
  color: '#4eb0ff',
  marginBottom: '16px',
};

const bodyStyle: React.CSSProperties = {
  fontSize: '16px',
  color: 'rgba(255,255,255,0.6)',
  lineHeight: 1.8,
  marginBottom: '14px',
};

const stats = [
  { label: 'Ticker', value: '$VBUCKS' },
  { label: 'Network', value: 'Solana' },
  { label: 'Total Supply', value: '1 Billion' },
  { label: 'Transfer Tax', value: '1% → Holders' },
  { label: 'Trading Fee', value: '1.25%' },
  { label: 'Rewards Paid In', value: 'USDC' },
];

const spendFacts = [
  { value: '~$5–6B', text: 'estimated yearly Fortnite revenue, most of it from V-Bucks purchases' },
  { value: '$9B+', text: 'estimated revenue in its first two years alone (2018: ~$5.5B, 2019: ~$3.7B)' },
  { value: '~$40B', text: 'estimated lifetime player spending since the 2017 launch' },
  { value: '~110M', text: 'average monthly active players in 2025, from 650M+ registered accounts' },
];

const rewardSteps = [
  'You hold $VBUCKS in your own Solana wallet.',
  'Every transfer of the token pays a 1% tax, set permanently at launch.',
  'That tax is collected and shared with holders pro-rata, so a bigger bag earns a bigger share.',
  'Rewards are paid in the token the launch is paired against, USDC, straight to your wallet. No staking and no claim button.',
];

export default function TokenomicsPage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a12',
      color: '#fff',
      padding: '80px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {/* Hero Section */}
      <div style={{
        width: '100%',
        maxWidth: '800px',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
        borderRadius: '20px',
        padding: '60px 48px',
        textAlign: 'center',
        border: '1px solid rgba(255,255,255,0.08)',
        marginBottom: '40px',
      }}>
        <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#4eb0ff', marginBottom: '16px' }}>
          TOKENOMICS
        </p>
        <h1 className="fortnite-header" style={{ fontSize: '52px', color: '#ffffff', marginBottom: '20px', lineHeight: 1.1 }}>
          $VBUCKS
        </h1>
        <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: '550px', margin: '0 auto' }}>
          The currency of the Item Shop, on-chain. Hold it and get paid in USDC.
        </p>
      </div>

      {/* Contract Address */}
      <div style={{ ...cardStyle, padding: '32px 36px' }}>
        <p style={{ ...labelStyle, marginBottom: '12px' }}>CONTRACT ADDRESS</p>
        <div style={{
          background: 'rgba(0,0,0,0.4)',
          borderRadius: '10px',
          padding: '16px 20px',
          fontFamily: 'monospace',
          fontSize: '16px',
          color: 'rgba(255,255,255,0.8)',
          wordBreak: 'break-all',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          PASTE_CONTRACT_ADDRESS_HERE
        </div>
      </div>

      {/* Token Info Grid */}
      <div style={{
        width: '100%',
        maxWidth: '800px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        marginBottom: '24px',
      }}>
        {stats.map((item, i) => (
          <div key={i} style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
            borderRadius: '16px',
            padding: '28px 24px',
            border: '1px solid rgba(255,255,255,0.08)',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '10px' }}>
              {item.label}
            </p>
            <p style={{ fontSize: '22px', fontWeight: 800, color: '#fff' }}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Why Item Shop + VBUCKS */}
      <div style={cardStyle}>
        <p style={labelStyle}>THE ITEM SHOP &amp; THE COIN</p>
        <p style={bodyStyle}>
          In Fortnite, the Item Shop is where you spend your V-Bucks. This site works the same way. It is the
          Item Shop, the place where the characters and bundles live, and $VBUCKS is the currency behind it.
        </p>
        <p style={{ ...bodyStyle, marginBottom: 0 }}>
          The shop is the product and V-Bucks are the money. One without the other doesn&apos;t make sense, which
          is why the website is called the Item Shop and the coin is called VBUCKS.
        </p>
      </div>

      {/* What are V-Bucks */}
      <div style={cardStyle}>
        <p style={labelStyle}>WHAT ARE V-BUCKS?</p>
        <p style={bodyStyle}>
          V-Bucks are the in-game currency of Fortnite. They arrived with the game in 2017 and became the way
          players buy skins, emotes, gliders, pickaxes and the Battle Pass. Every item in the Item Shop is priced in V-Bucks.
        </p>
        <p style={{ ...bodyStyle, marginBottom: 0 }}>
          Almost every Fortnite player knows what V-Bucks are, and most have spent them.
        </p>
      </div>

      {/* Culture */}
      <div style={cardStyle}>
        <p style={labelStyle}>THE CULTURE</p>
        <p style={bodyStyle}>
          V-Bucks are one of the most recognised currencies in gaming culture. The gift cards, the memes about
          &quot;free V-Bucks&quot;, and the daily Item Shop refresh at midnight are shared experiences for a whole generation.
          People talk about skins the way they talk about sneakers and streetwear.
        </p>
        <p style={{ ...bodyStyle, marginBottom: 0 }}>
          This site is built on that culture: the characters, the items and the bundles. $VBUCKS puts the
          currency behind all of it on-chain.
        </p>
      </div>

      {/* Why it deserves to run */}
      <div style={cardStyle}>
        <p style={labelStyle}>WHY IT DESERVES TO RUN</p>
        <p style={bodyStyle}>
          Real money already flows through V-Bucks at massive scale. Players have spent billions on digital
          items, with no one expecting a return on them. Those figures are third-party estimates. Epic Games is private
          and does not publish exact numbers, so treat them as rough.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginTop: '20px' }}>
          {spendFacts.map((fact, i) => (
            <div key={i} style={{
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <p style={{ fontSize: '28px', fontWeight: 800, color: '#4eb0ff', marginBottom: '6px' }}>{fact.value}</p>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>{fact.text}</p>
            </div>
          ))}
        </div>
        <p style={{ ...bodyStyle, marginTop: '20px', marginBottom: 0 }}>
          The idea is simple. A currency that hundreds of millions of people already recognise, with a community
          that already spends in the Item Shop, has a head start that most new coins never get.
        </p>
      </div>

      {/* Why USDC */}
      <div style={cardStyle}>
        <p style={labelStyle}>WHY PAIR WITH USDC?</p>
        <ul style={{ ...bodyStyle, paddingLeft: '20px', marginBottom: 0 }}>
          <li style={{ marginBottom: '10px' }}>
            <strong style={{ color: '#fff' }}>Stable rewards.</strong> USDC is pegged to the US dollar, so holders
            get paid in a stable asset rather than a volatile coin.
          </li>
          <li style={{ marginBottom: '10px' }}>
            <strong style={{ color: '#fff' }}>Matches the theme.</strong> V-Bucks are a currency tied to real
            dollars (you buy them with cash), so a dollar pair fits the story.
          </li>
          <li style={{ marginBottom: '10px' }}>
            <strong style={{ color: '#fff' }}>Easy to understand.</strong> &quot;Hold the coin, earn USDC&quot; is a
            one-line pitch.
          </li>
          <li>
            <strong style={{ color: '#fff' }}>Automatic.</strong> The platform sends rewards straight to holders&apos;
            wallets in the paired token. There is nothing to stake and nothing to claim.
          </li>
        </ul>
      </div>

      {/* How rewards work */}
      <div style={cardStyle}>
        <p style={labelStyle}>HOW REWARDS WORK</p>
        <ol style={{ ...bodyStyle, paddingLeft: '20px', marginBottom: 0 }}>
          {rewardSteps.map((step, i) => (
            <li key={i} style={{ marginBottom: '10px' }}>{step}</li>
          ))}
        </ol>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginTop: '14px', marginBottom: 0 }}>
          The token launches on a bonding curve with no upfront liquidity, then graduates to a Raydium pool at
          85 SOL raised. Payout size depends on trading volume, so there is no guaranteed return.
        </p>
      </div>

      {/* Disclaimer */}
      <div style={{ width: '100%', maxWidth: '800px', padding: '0 8px' }}>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.7, textAlign: 'center' }}>
          $VBUCKS is a community meme coin and is not affiliated with, endorsed by, or connected to Epic Games or
          Fortnite. Nothing on this page is financial advice. Crypto is risky and you can lose everything you put in.
          Spending figures are third-party estimates.
        </p>
      </div>
    </div>
  );
}
