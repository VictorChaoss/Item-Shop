'use client';

import React from 'react';

export default function SocialsPage() {
  const socials = [
    {
      name: 'Dex Screener',
      description: 'Live charts, price action, and trading data.',
      icon: '📊',
      url: '#',
    },
    {
      name: 'X (Twitter)',
      description: 'Follow for official updates, announcements, and drops.',
      icon: '𝕏',
      url: '#',
    },
    {
      name: 'X Community',
      description: 'Join the community — memes, alpha, and degen talk.',
      icon: '👥',
      url: '#',
    },
  ];

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
          CONNECT WITH THE COMMUNITY
        </p>
        <h1 className="fortnite-header" style={{ fontSize: '52px', color: '#ffffff', marginBottom: '20px', lineHeight: 1.1 }}>
          Community & Socials
        </h1>
        <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: '550px', margin: '0 auto' }}>
          Stay connected across our official channels. Follow for updates, join the conversation, and track the charts.
        </p>
      </div>

      {/* Social Cards */}
      <div style={{
        width: '100%',
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        {socials.map((social, i) => (
          <a key={i} href={social.url} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
            borderRadius: '16px',
            padding: '28px 32px',
            border: '1px solid rgba(255,255,255,0.08)',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'border-color 0.2s',
          }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '12px',
              backgroundColor: 'rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              flexShrink: 0,
            }}>
              {social.icon}
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                {social.name}
              </h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                {social.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
