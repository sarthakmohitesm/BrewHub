'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Menu, X, ShoppingCart, User, LayoutDashboard } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#menu-preview', label: 'Menu' },
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
          ? 'glass-strong py-3 shadow-lg shadow-black/30'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 15 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-brew-accent to-brew-gold flex items-center justify-center"
            >
              <Coffee className="w-6 h-6 text-brew-dark" />
            </motion.div>
            <span className="text-2xl font-bold font-[family-name:var(--font-serif)] gradient-text">
              BrewHub
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  pathname === link.href
                    ? 'text-brew-gold bg-brew-gold/10'
                    : 'text-brew-cream/70 hover:text-brew-cream hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/menu"
              className="relative p-2.5 rounded-xl glass hover:bg-brew-gold/10 transition-all group"
            >
              <ShoppingCart className="w-5 h-5 text-brew-accent group-hover:text-brew-gold transition-colors" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-brew-gold text-brew-dark text-xs font-bold rounded-full flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>
            <Link
              href="/owner/login"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass hover:bg-brew-gold/10 transition-all"
            >
              <LayoutDashboard className="w-4 h-4 text-brew-accent" />
              <span className="text-sm font-medium text-brew-cream/80">Owner</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg glass"
          >
            {mobileOpen ? (
              <X className="w-6 h-6 text-brew-accent" />
            ) : (
              <Menu className="w-6 h-6 text-brew-accent" />
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
            className="md:hidden glass-strong mt-2 mx-4 rounded-2xl overflow-hidden"
          >
            <div className="py-4 px-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    pathname === link.href
                      ? 'text-brew-gold bg-brew-gold/10'
                      : 'text-brew-cream/70 hover:text-brew-cream hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-brew-accent/10 flex gap-3">
                <Link
                  href="/menu"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl glass text-brew-accent"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span className="text-sm">Menu</span>
                </Link>
                <Link
                  href="/owner/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl glass text-brew-accent"
                >
                  <User className="w-4 h-4" />
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
