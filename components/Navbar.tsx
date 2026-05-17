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
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-strong shadow-xl shadow-black/40'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'}`}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-brew-accent to-brew-gold flex items-center justify-center shadow-lg shadow-brew-gold/20"
            >
              <Coffee className="w-5 h-5 text-brew-dark" />
            </motion.div>
            <span className="text-xl font-bold font-[family-name:var(--font-serif)] gradient-text tracking-wide">
              BrewHub
            </span>
          </Link>

          {/* Desktop Nav Links — centered */}
          <div className="hidden md:flex items-center gap-1 bg-white/[0.03] rounded-2xl px-2 py-1.5 border border-white/[0.04]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  pathname === link.href
                    ? 'text-brew-dark bg-gradient-to-r from-brew-accent to-brew-gold shadow-md shadow-brew-gold/15'
                    : 'text-brew-cream/60 hover:text-brew-cream hover:bg-white/[0.06]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <Link
              href="/menu"
              className="relative p-2.5 rounded-xl border border-white/[0.06] bg-white/[0.03] hover:bg-brew-gold/10 hover:border-brew-gold/20 transition-all group"
            >
              <ShoppingCart className="w-5 h-5 text-brew-cream/60 group-hover:text-brew-gold transition-colors" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gradient-to-br from-brew-accent to-brew-gold text-brew-dark text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-brew-gold/30"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>
            <Link
              href="/owner/login"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.06] bg-white/[0.03] hover:bg-brew-gold/10 hover:border-brew-gold/20 transition-all group"
            >
              <LayoutDashboard className="w-4 h-4 text-brew-cream/60 group-hover:text-brew-gold transition-colors" />
              <span className="text-sm font-medium text-brew-cream/60 group-hover:text-brew-cream transition-colors">Owner</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 rounded-xl border border-white/[0.06] bg-white/[0.03]"
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-brew-accent" />
            ) : (
              <Menu className="w-5 h-5 text-brew-accent" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong mx-4 mt-2 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="py-4 px-5 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    pathname === link.href
                      ? 'text-brew-dark bg-gradient-to-r from-brew-accent to-brew-gold'
                      : 'text-brew-cream/60 hover:text-brew-cream hover:bg-white/[0.06]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 mt-2 border-t border-white/[0.06] flex gap-2">
                <Link
                  href="/menu"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/[0.06] bg-white/[0.03] text-brew-cream/60"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span className="text-sm">Cart</span>
                </Link>
                <Link
                  href="/owner/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/[0.06] bg-white/[0.03] text-brew-cream/60"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="text-sm">Owner</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
