'use client';

import React from 'react';

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
          Token Overview
        </h1>
        <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: '550px', margin: '0 auto' }}>
          Everything you need to know about the token — supply, distribution, and contract details.
        </p>
      </div>

      {/* Contract Address */}
      <div style={{
        width: '100%',
        maxWidth: '800px',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
        borderRadius: '16px',
        padding: '32px 36px',
        border: '1px solid rgba(255,255,255,0.08)',
        marginBottom: '24px',
      }}>
        <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#4eb0ff', marginBottom: '12px' }}>
          CONTRACT ADDRESS
        </p>
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

      {/* Description / Info Section */}
      <div style={{
        width: '100%',
        maxWidth: '800px',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
        borderRadius: '16px',
        padding: '36px 36px',
        border: '1px solid rgba(255,255,255,0.08)',
        marginBottom: '24px',
      }}>
        <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#4eb0ff', marginBottom: '16px' }}>
          ABOUT THE COIN
        </p>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
          Add your coin description here. Explain the mission, the community, what makes it unique, and why people should care.
        </p>
      </div>

      {/* Token Info Grid */}
      <div style={{
        width: '100%',
        maxWidth: '800px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
      }}>
        {[
          { label: 'Total Supply', value: 'TBD' },
          { label: 'Tax', value: 'TBD' },
          { label: 'Network', value: 'Solana' },
        ].map((item, i) => (
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
            <p style={{ fontSize: '28px', fontWeight: 800, color: '#fff' }}>
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
