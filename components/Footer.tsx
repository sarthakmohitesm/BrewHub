'use client';

import React from 'react';
import Link from 'next/link';
import { Coffee, MapPin, Phone, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(200,169,126,0.06)', position: 'relative' }}>
      <div className="container-brew" style={{ paddingTop: 64, paddingBottom: 40 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 40 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'linear-gradient(135deg, #c8a97e, #d4a853)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Coffee style={{ width: 16, height: 16, color: '#080604' }} />
              </div>
              <span className="gradient-text" style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-serif)' }}>BrewHub</span>
            </div>
            <p style={{ color: 'rgba(245,230,208,0.35)', fontSize: '0.82rem', lineHeight: 1.7, maxWidth: 260 }}>
              Where every cup tells a story. Premium artisanal coffee crafted with passion and served with love.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ color: '#f5e6d0', fontWeight: 600, fontSize: '0.82rem', marginBottom: 16, letterSpacing: '0.03em' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Home', 'Menu', 'Register', 'Login'].map((item) => (
                <li key={item} style={{ marginBottom: 10 }}>
                  <Link
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    style={{ color: 'rgba(245,230,208,0.35)', textDecoration: 'none', fontSize: '0.82rem', transition: 'color 0.3s' }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 style={{ color: '#f5e6d0', fontWeight: 600, fontSize: '0.82rem', marginBottom: 16, letterSpacing: '0.03em' }}>Opening Hours</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { day: 'Mon – Fri', time: '7:00 AM – 10:00 PM' },
                { day: 'Saturday', time: '8:00 AM – 11:00 PM' },
                { day: 'Sunday', time: '9:00 AM – 9:00 PM' },
              ].map((h) => (
                <div key={h.day} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'rgba(245,230,208,0.35)', fontSize: '0.82rem' }}>{h.day}</span>
                  <span style={{ color: 'rgba(200,169,126,0.6)', fontSize: '0.82rem', fontWeight: 500 }}>{h.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#f5e6d0', fontWeight: 600, fontSize: '0.82rem', marginBottom: 16, letterSpacing: '0.03em' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { icon: MapPin, text: '123 Brew Street, Coffee Lane, Mumbai 400001' },
                { icon: Phone, text: '+91 98765 43210' },
                { icon: Mail, text: 'hello@brewhub.cafe' },
              ].map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: 8,
                    background: 'rgba(200,169,126,0.06)', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <c.icon style={{ width: 13, height: 13, color: 'rgba(200,169,126,0.5)' }} />
                  </div>
                  <span style={{ color: 'rgba(245,230,208,0.35)', fontSize: '0.82rem', lineHeight: 1.5 }}>{c.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          marginTop: 48, paddingTop: 24,
          borderTop: '1px solid rgba(200,169,126,0.05)',
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16,
        }}>
          <p style={{ color: 'rgba(245,230,208,0.2)', fontSize: '0.78rem' }}>
            © {new Date().getFullYear()} BrewHub. All rights reserved.
          </p>
          <p style={{ color: 'rgba(245,230,208,0.2)', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: 5 }}>
            Crafted with <Heart style={{ width: 11, height: 11, color: 'rgba(212,168,83,0.5)' }} /> and great coffee
          </p>
        </div>
      </div>
    </footer>
  );
}
