'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Coffee, Globe, Globe2, MapPin, Phone, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-brew-darker border-t border-brew-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brew-accent to-brew-gold flex items-center justify-center">
                <Coffee className="w-6 h-6 text-brew-dark" />
              </div>
              <span className="text-2xl font-bold font-[family-name:var(--font-serif)] gradient-text">
                BrewHub
              </span>
            </div>
            <p className="text-brew-cream/50 text-sm leading-relaxed mb-6">
              Where every cup tells a story. Premium artisanal coffee crafted with passion and served with love.
            </p>
            <div className="flex gap-3">
              {[Globe, Globe2].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-brew-accent/60 hover:text-brew-gold hover:border-brew-gold/30 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-brew-cream font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Menu', 'Register', 'Login'].map((item) => (
                <li key={item}>
                  <Link
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-brew-cream/50 hover:text-brew-gold text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-brew-cream font-semibold mb-6">Opening Hours</h4>
            <ul className="space-y-3 text-sm text-brew-cream/50">
              <li className="flex justify-between">
                <span>Mon - Fri</span>
                <span className="text-brew-accent">7:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="text-brew-accent">8:00 AM - 11:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-brew-accent">9:00 AM - 9:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-brew-cream font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-brew-cream/50">
                <MapPin className="w-4 h-4 text-brew-accent mt-0.5 shrink-0" />
                <span>123 Brew Street, Coffee Lane, Mumbai 400001</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-brew-cream/50">
                <Phone className="w-4 h-4 text-brew-accent shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-brew-cream/50">
                <Mail className="w-4 h-4 text-brew-accent shrink-0" />
                <span>hello@brewhub.cafe</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-brew-accent/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-brew-cream/30 text-sm">
            © {new Date().getFullYear()} BrewHub. All rights reserved.
          </p>
          <p className="text-brew-cream/30 text-sm flex items-center gap-1">
            Crafted with <Heart className="w-3 h-3 text-brew-gold" /> and great coffee
          </p>
        </div>
      </div>
    </footer>
  );
}
