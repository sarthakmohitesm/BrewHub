'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Menu, X, ShoppingCart, LayoutDashboard } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/menu', label: 'Menu' },
  { href: '/register', label: 'Register' },
  { href: '/login', label: 'Login' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const totalItems = useCartStore((s) => s.getTotalItems());

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 0.4s, box-shadow 0.4s',
        background: scrolled ? 'rgba(10,8,5,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.5)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(200,169,126,0.08)' : '1px solid transparent',
      }}
    >
      <div className="container-brew">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: scrolled ? 60 : 72,
          transition: 'height 0.3s',
        }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: 'linear-gradient(135deg, #c8a97e, #d4a853)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Coffee style={{ width: 18, height: 18, color: '#080604' }} />
            </div>
            <span className="gradient-text" style={{ fontSize: '1.15rem', fontWeight: 700, fontFamily: 'var(--font-serif)', letterSpacing: '0.02em' }}>
              BrewHub
            </span>
          </Link>

          {/* Desktop nav links */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            background: 'rgba(255,255,255,0.03)',
            borderRadius: 16,
            padding: '5px 6px',
            border: '1px solid rgba(255,255,255,0.04)',
          }}
          className="desktop-nav"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 10,
                    fontSize: '0.82rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                    color: isActive ? '#080604' : 'rgba(245,230,208,0.55)',
                    background: isActive ? 'linear-gradient(135deg, #c8a97e, #d4a853)' : 'transparent',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }} className="desktop-nav">
            <Link href="/menu" style={{
              position: 'relative', padding: 10, borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.03)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              textDecoration: 'none',
            }}>
              <ShoppingCart style={{ width: 18, height: 18, color: 'rgba(245,230,208,0.5)' }} />
              {totalItems > 0 && (
                <span style={{
                  position: 'absolute', top: -4, right: -4,
                  width: 18, height: 18, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #c8a97e, #d4a853)',
                  color: '#080604', fontSize: '0.6rem', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {totalItems}
                </span>
              )}
            </Link>
            <Link href="/owner/login" style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 14px', borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.03)',
              textDecoration: 'none', color: 'rgba(245,230,208,0.5)', fontSize: '0.82rem', fontWeight: 500,
            }}>
              <LayoutDashboard style={{ width: 14, height: 14 }} />
              Owner
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-nav-btn"
            style={{
              display: 'none',
              padding: 10, borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.03)',
              cursor: 'pointer', color: '#c8a97e',
            }}
          >
            {mobileOpen ? <X style={{ width: 20, height: 20 }} /> : <Menu style={{ width: 20, height: 20 }} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-dropdown glass-strong"
            style={{ margin: '0 16px 8px', borderRadius: 16, overflow: 'hidden' }}
          >
            <div style={{ padding: '16px 20px' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'block',
                    padding: '12px 16px', borderRadius: 10, marginBottom: 4,
                    fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none',
                    color: pathname === link.href ? '#080604' : 'rgba(245,230,208,0.55)',
                    background: pathname === link.href ? 'linear-gradient(135deg, #c8a97e, #d4a853)' : 'transparent',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
