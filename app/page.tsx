'use client';

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  Coffee,
  ArrowRight,
  Star,
  Clock,
  Award,
  Users,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

const CoffeeScene = dynamic(() => import('@/components/CoffeeScene'), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 48, height: 48, borderRadius: '50%', border: '2px solid rgba(200,169,126,0.2)', borderTopColor: '#d4a853', animation: 'spin 1s linear infinite' }} />
    </div>
  ),
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6 },
  }),
};

/* ════════════════════════════════════════════
   HERO
   ════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Gradient overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(8,6,4,0.5), rgba(8,6,4,0.2), #080604)', zIndex: 2 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,6,4,0.95), rgba(8,6,4,0.3), transparent)', zIndex: 2 }} />

      {/* 3D coffee scene */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '55%', height: '100%', zIndex: 1 }}>
        <Suspense fallback={null}>
          <CoffeeScene />
        </Suspense>
      </div>

      {/* Text content */}
      <div className="container-brew" style={{ position: 'relative', zIndex: 10 }}>
        <motion.div
          initial="hidden"
          animate="visible"
          style={{ maxWidth: 560 }}
        >
          {/* Badge */}
          <motion.div variants={fadeUp} custom={0} style={{ marginBottom: 28 }}>
            <span
              className="glass"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 20px',
                borderRadius: 9999,
                fontSize: '0.8rem',
                fontWeight: 500,
                color: '#c8a97e',
              }}
            >
              <Sparkles style={{ width: 14, height: 14, color: '#d4a853' }} />
              Premium Artisan Coffee Experience
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            custom={1}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: 24,
              letterSpacing: '-0.02em',
            }}
          >
            Craft Your <span className="gradient-text">Perfect</span>
            <br />
            Coffee Moment
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            custom={2}
            style={{
              fontSize: '1rem',
              color: 'rgba(245,230,208,0.55)',
              lineHeight: 1.7,
              marginBottom: 36,
              maxWidth: 440,
            }}
          >
            Immerse yourself in the art of coffee. From bean to cup, every sip is a journey through flavor, aroma, and craftsmanship.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={fadeUp} custom={3} style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 56 }}>
            <Link href="/menu" className="btn-primary">
              Explore Menu
              <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
            <Link href="/register" className="btn-outline">
              Reserve a Table
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp} custom={4} style={{ display: 'flex', gap: 48 }}>
            {[
              { value: '50+', label: 'Drinks' },
              { value: '10K+', label: 'Customers' },
              { value: '4.9', label: 'Rating', icon: true },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#d4a853', display: 'flex', alignItems: 'center', gap: 4 }}>
                  {s.value}
                  {s.icon && <Star style={{ width: 16, height: 16, fill: '#d4a853', color: '#d4a853' }} />}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(245,230,208,0.35)', marginTop: 4, fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 10, textAlign: 'center' }}
      >
        <div style={{ fontSize: '0.55rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(245,230,208,0.2)', marginBottom: 6, fontWeight: 600 }}>Scroll</div>
        <ChevronDown style={{ width: 18, height: 18, color: 'rgba(200,169,126,0.3)', margin: '0 auto' }} />
      </motion.div>
    </section>
  );
}

/* ════════════════════════════════════════════
   ABOUT
   ════════════════════════════════════════════ */
function AboutSection() {
  const features = [
    { icon: Award, title: 'Award Winning', desc: 'Best Café 2024' },
    { icon: Clock, title: 'Fresh Daily', desc: 'Roasted in-house' },
    { icon: Users, title: 'Community', desc: '10K+ members' },
    { icon: Star, title: 'Top Rated', desc: '4.9/5 stars' },
  ];

  return (
    <section id="about" className="section-block">
      <div className="section-divider" style={{ marginBottom: 80 }} />
      <div className="container-brew">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 64 }}>
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span
              className="glass"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 18px',
                borderRadius: 9999,
                fontSize: '0.78rem',
                fontWeight: 500,
                color: '#c8a97e',
                marginBottom: 24,
              }}
            >
              <Coffee style={{ width: 14, height: 14, color: '#d4a853' }} />
              Our Story
            </span>

            <h2 className="section-heading" style={{ marginBottom: 24 }}>
              Where Passion Meets <span className="gradient-text">Perfection</span>
            </h2>

            <p style={{ color: 'rgba(245,230,208,0.5)', lineHeight: 1.8, marginBottom: 16, maxWidth: 640, fontSize: '0.92rem' }}>
              Founded with a simple vision — to create a space where coffee lovers can experience the finest brews in an atmosphere of warmth and creativity. Every bean is ethically sourced, every cup is hand-crafted.
            </p>
            <p style={{ color: 'rgba(245,230,208,0.5)', lineHeight: 1.8, marginBottom: 40, maxWidth: 640, fontSize: '0.92rem' }}>
              Our baristas are trained artisans who pour their heart into every drink. From classic espressos to inventive seasonal specials, we&apos;re here to make your coffee experience unforgettable.
            </p>

            {/* Feature cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, maxWidth: 500 }}>
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass-card"
                  style={{ borderRadius: 16, padding: 20 }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(212,168,83,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                    <f.icon style={{ width: 18, height: 18, color: '#d4a853' }} />
                  </div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f5e6d0', marginBottom: 4 }}>{f.title}</h4>
                  <p style={{ fontSize: '0.75rem', color: 'rgba(245,230,208,0.35)' }}>{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   FEATURED MENU
   ════════════════════════════════════════════ */
const featuredItems = [
  { title: 'Caramel Macchiato', price: '₹249', category: 'Coffee', desc: 'Espresso with vanilla, steamed milk, and caramel drizzle', emoji: '☕' },
  { title: 'Matcha Latte', price: '₹229', category: 'Tea', desc: 'Ceremonial matcha whisked with creamy milk', emoji: '🍵' },
  { title: 'Tiramisu', price: '₹249', category: 'Desserts', desc: 'Classic Italian coffee-flavored dessert', emoji: '🍰' },
  { title: 'Breakfast Combo', price: '₹349', category: 'Combos', desc: 'Cappuccino + Croissant + Fresh fruit', emoji: '🥐' },
];

function FeaturedMenuSection() {
  return (
    <section className="section-block">
      <div className="section-divider" style={{ marginBottom: 80 }} />
      <div className="container-brew">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <span
            className="glass"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 18px', borderRadius: 9999, fontSize: '0.78rem', fontWeight: 500, color: '#c8a97e', marginBottom: 20 }}
          >
            <Sparkles style={{ width: 14, height: 14, color: '#d4a853' }} />
            Signature Collection
          </span>
          <h2 className="section-heading" style={{ marginBottom: 12 }}>
            Our <span className="gradient-text">Featured</span> Picks
          </h2>
          <p style={{ color: 'rgba(245,230,208,0.4)', maxWidth: 440, margin: '0 auto', fontSize: '0.9rem' }}>
            Hand-selected favorites that keep our guests coming back for more
          </p>
        </motion.div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
          {featuredItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card"
              style={{ borderRadius: 20, overflow: 'hidden' }}
            >
              {/* Card image area */}
              <div style={{
                height: 160,
                background: 'linear-gradient(135deg, #231c14 0%, #342818 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}>
                <span style={{ fontSize: 48 }}>{item.emoji}</span>
                <span style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  padding: '4px 12px',
                  borderRadius: 9999,
                  background: 'rgba(212,168,83,0.15)',
                  color: '#d4a853',
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  border: '1px solid rgba(212,168,83,0.15)',
                }}>
                  Popular
                </span>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,6,4,0.6), transparent)' }} />
              </div>

              {/* Card body */}
              <div style={{ padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f5e6d0' }}>{item.title}</h3>
                  <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#d4a853', whiteSpace: 'nowrap', marginLeft: 12 }}>{item.price}</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'rgba(245,230,208,0.4)', marginBottom: 14, lineHeight: 1.5 }}>{item.desc}</p>
                <span style={{
                  display: 'inline-block',
                  padding: '4px 14px',
                  borderRadius: 9999,
                  fontSize: '0.65rem',
                  fontWeight: 500,
                  color: 'rgba(200,169,126,0.6)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  background: 'rgba(200,169,126,0.06)',
                  border: '1px solid rgba(200,169,126,0.08)',
                }}>{item.category}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Link href="/menu" className="btn-primary">
            View Full Menu
            <ArrowRight style={{ width: 16, height: 16 }} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   TESTIMONIALS
   ════════════════════════════════════════════ */
const testimonials = [
  { name: 'Priya Sharma', role: 'Coffee Enthusiast', text: 'The best cappuccino I\'ve ever had! The ambiance is incredible and the staff is so welcoming.', rating: 5 },
  { name: 'Rahul Patel', role: 'Regular Visitor', text: 'BrewHub has become my second home. The matcha latte is absolutely divine.', rating: 5 },
  { name: 'Ananya Gupta', role: 'Food Blogger', text: 'From the décor to the desserts, everything screams premium quality. Highly recommend!', rating: 5 },
];

function TestimonialsSection() {
  return (
    <section className="section-block">
      <div className="section-divider" style={{ marginBottom: 80 }} />
      <div className="container-brew">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <span
            className="glass"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 18px', borderRadius: 9999, fontSize: '0.78rem', fontWeight: 500, color: '#c8a97e', marginBottom: 20 }}
          >
            <Star style={{ width: 14, height: 14, color: '#d4a853' }} />
            Testimonials
          </span>
          <h2 className="section-heading" style={{ marginBottom: 12 }}>
            What Our <span className="gradient-text">Guests</span> Say
          </h2>
          <p style={{ color: 'rgba(245,230,208,0.4)', maxWidth: 440, margin: '0 auto', fontSize: '0.9rem' }}>
            Real experiences from the people who love BrewHub
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card"
              style={{ borderRadius: 20, padding: 28, display: 'flex', flexDirection: 'column' }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: 3, marginBottom: 18 }}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} style={{ width: 14, height: 14, fill: '#d4a853', color: '#d4a853' }} />
                ))}
              </div>
              {/* Quote */}
              <p style={{ color: 'rgba(245,230,208,0.5)', fontSize: '0.85rem', lineHeight: 1.7, flex: 1, marginBottom: 24 }}>
                &ldquo;{t.text}&rdquo;
              </p>
              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 18, borderTop: '1px solid rgba(200,169,126,0.06)' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #c8a97e, #d4a853)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#080604', fontWeight: 700, fontSize: '0.8rem',
                }}>
                  {t.name[0]}
                </div>
                <div>
                  <h4 style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f5e6d0' }}>{t.name}</h4>
                  <p style={{ fontSize: '0.7rem', color: 'rgba(245,230,208,0.3)' }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   CTA
   ════════════════════════════════════════════ */
function CTASection() {
  return (
    <section className="section-block">
      <div className="section-divider" style={{ marginBottom: 80 }} />
      <div className="container-brew" style={{ maxWidth: 800 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card"
          style={{
            borderRadius: 28,
            padding: '56px 40px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative gradient */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(212,168,83,0.04), transparent, rgba(200,169,126,0.03))', pointerEvents: 'none' }} />

          <div style={{ position: 'relative' }}>
            <motion.div
              animate={{ y: [-3, 3, -3] }}
              transition={{ repeat: Infinity, duration: 4 }}
              style={{
                width: 56, height: 56, borderRadius: 16, margin: '0 auto 28px',
                background: 'linear-gradient(135deg, #c8a97e, #d4a853)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(212,168,83,0.2)',
              }}
            >
              <Coffee style={{ width: 28, height: 28, color: '#080604' }} />
            </motion.div>

            <h2 className="section-heading" style={{ marginBottom: 16 }}>
              Ready to <span className="gradient-text">Experience</span> BrewHub?
            </h2>
            <p style={{ color: 'rgba(245,230,208,0.45)', marginBottom: 36, maxWidth: 400, margin: '0 auto 36px', fontSize: '0.9rem' }}>
              Reserve your table, explore our menu, and let us create your perfect coffee moment.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
              <Link href="/register" className="btn-primary">
                Reserve a Table
                <ArrowRight style={{ width: 16, height: 16 }} />
              </Link>
              <Link href="/menu" className="btn-outline">
                Browse Menu
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   MAIN EXPORT
   ════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <FeaturedMenuSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
