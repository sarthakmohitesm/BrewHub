'use client';

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { ArrowRight, Star, ChevronDown, Sparkles, Award, Clock, Users } from 'lucide-react';

const CoffeeScene = dynamic(() => import('@/components/CoffeeScene'), { ssr: false, loading: () => null });

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] } }),
};

/* ─── Real coffee images from Unsplash ─── */
const HERO_BG = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1800&q=85&auto=format&fit=crop';
const ABOUT_IMG = 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=900&q=85&auto=format&fit=crop';

const MENU_ITEMS = [
  { title: 'Caramel Macchiato', price: '₹249', category: 'Coffee', desc: 'Espresso with vanilla, steamed milk & caramel drizzle', img: 'https://images.unsplash.com/photo-1485808191679-5f86510bd9d4?w=600&q=80&auto=format&fit=crop' },
  { title: 'Matcha Latte', price: '₹229', category: 'Tea', desc: 'Ceremonial matcha whisked with creamy milk', img: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=600&q=80&auto=format&fit=crop' },
  { title: 'Tiramisu', price: '₹249', category: 'Desserts', desc: 'Classic Italian coffee-flavoured dessert', img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80&auto=format&fit=crop' },
  { title: 'Breakfast Combo', price: '₹349', category: 'Combos', desc: 'Cappuccino + Croissant + Fresh fruit', img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80&auto=format&fit=crop' },
];

const TESTIMONIALS = [
  { name: 'Priya Sharma', role: 'Coffee Enthusiast', text: 'The best cappuccino I\'ve ever had! The ambiance is incredible and the staff is so welcoming.', rating: 5 },
  { name: 'Rahul Patel', role: 'Regular Visitor', text: 'BrewHub has become my second home. The matcha latte is absolutely divine every single visit.', rating: 5 },
  { name: 'Ananya Gupta', role: 'Food Blogger', text: 'From the décor to the desserts, everything screams premium quality. Highly recommend the tiramisu!', rating: 5 },
];

/* ════════════ HERO ════════════ */
function HeroSection() {
  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      {/* Real photo background */}
      <Image src={HERO_BG} alt="Coffee shop ambiance" fill priority style={{ objectFit: 'cover', objectPosition: 'center' }} />

      {/* Dark overlay layers */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(8,6,4,0.92) 0%, rgba(8,6,4,0.7) 50%, rgba(8,6,4,0.35) 100%)', zIndex: 2 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #080604 0%, transparent 60%)', zIndex: 3 }} />

      {/* 3D overlay (subtle) */}
      <div style={{ position: 'absolute', right: '5%', top: '10%', width: 420, height: 420, zIndex: 4, opacity: 0.4 }}>
        <Suspense fallback={null}><CoffeeScene /></Suspense>
      </div>

      {/* Content */}
      <div className="container-brew" style={{ position: 'relative', zIndex: 10 }}>
        <motion.div initial="hidden" animate="visible" style={{ maxWidth: 600 }}>
          <motion.div variants={fadeUp} custom={0} style={{ marginBottom: 28 }}>
            <span className="glass" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 22px', borderRadius: 999, fontSize: '0.78rem', fontWeight: 500, color: '#c8a97e', letterSpacing: '0.04em' }}>
              <Sparkles style={{ width: 13, height: 13, color: '#d4a853' }} />
              PREMIUM ARTISAN COFFEE EXPERIENCE
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp} custom={1} style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)', fontWeight: 700, lineHeight: 1.08, marginBottom: 24, letterSpacing: '-0.02em', color: '#f5e6d0' }}>
            Craft Your<br /><span className="gradient-text">Perfect Cup</span>
          </motion.h1>

          <motion.p variants={fadeUp} custom={2} style={{ fontSize: '1.05rem', color: 'rgba(245,230,208,0.6)', lineHeight: 1.75, marginBottom: 40, maxWidth: 460 }}>
            From single-origin espressos to hand-crafted seasonal specials — every sip at BrewHub is a journey through flavor, aroma, and craftsmanship.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 64 }}>
            <Link href="/menu" className="btn-primary" style={{ fontSize: '0.92rem' }}>
              Explore Menu <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
            <Link href="/register" className="btn-outline" style={{ fontSize: '0.92rem' }}>Reserve a Table</Link>
          </motion.div>

          <motion.div variants={fadeUp} custom={4} style={{ display: 'flex', gap: 40 }}>
            {[['50+', 'Drinks'], ['10K+', 'Guests Served'], ['4.9', 'Star Rating']].map(([val, label]) => (
              <div key={label}>
                <div style={{ fontSize: '1.65rem', fontWeight: 700, color: '#d4a853', lineHeight: 1 }}>{val}</div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(245,230,208,0.35)', marginTop: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 10, textAlign: 'center' }}>
        <p style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(245,230,208,0.2)', marginBottom: 8, textTransform: 'uppercase' }}>Scroll</p>
        <ChevronDown style={{ width: 18, height: 18, color: 'rgba(200,169,126,0.3)', display: 'block', margin: '0 auto' }} />
      </motion.div>
    </section>
  );
}

/* ════════════ ABOUT ════════════ */
function AboutSection() {
  return (
    <section id="about" className="section-block">
      <div className="container-brew">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 72, alignItems: 'center' }}>

          {/* Photo */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', aspectRatio: '4/5' }}>
            <Image src={ABOUT_IMG} alt="Barista crafting coffee" fill style={{ objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,6,4,0.7) 0%, transparent 60%)' }} />
            {/* Floating badge */}
            <div className="glass" style={{ position: 'absolute', bottom: 28, left: 28, right: 28, borderRadius: 16, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg,#c8a97e,#d4a853)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Award style={{ width: 22, height: 22, color: '#080604' }} />
              </div>
              <div>
                <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f5e6d0' }}>Best Café Award 2024</p>
                <p style={{ fontSize: '0.7rem', color: 'rgba(245,230,208,0.45)' }}>Mumbai Food & Drink Awards</p>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}>
            <span className="glass" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 18px', borderRadius: 999, fontSize: '0.72rem', fontWeight: 600, color: '#c8a97e', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 24 }}>
              Our Story
            </span>
            <h2 className="section-heading" style={{ marginBottom: 20 }}>
              Where Passion Meets <span className="gradient-text">Perfection</span>
            </h2>
            <p style={{ color: 'rgba(245,230,208,0.5)', lineHeight: 1.85, marginBottom: 16, fontSize: '0.92rem' }}>
              Founded with a simple vision — to create a space where coffee lovers experience the finest brews in an atmosphere of warmth and creativity. Every bean is ethically sourced, every cup hand-crafted.
            </p>
            <p style={{ color: 'rgba(245,230,208,0.5)', lineHeight: 1.85, marginBottom: 40, fontSize: '0.92rem' }}>
              Our baristas are trained artisans who pour their soul into every drink. From classic espressos to inventive seasonal specials, we&apos;re here to make your coffee experience unforgettable.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[{ icon: Award, t: 'Award Winning', d: 'Best Café 2024' }, { icon: Clock, t: 'Fresh Daily', d: 'Roasted in-house' }, { icon: Users, t: 'Community', d: '10K+ members' }, { icon: Star, t: 'Top Rated', d: '4.9/5 stars' }].map(({ icon: Icon, t, d }) => (
                <div key={t} className="glass-card" style={{ borderRadius: 14, padding: '18px 18px' }}>
                  <Icon style={{ width: 18, height: 18, color: '#d4a853', marginBottom: 10 }} />
                  <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f5e6d0', marginBottom: 3 }}>{t}</p>
                  <p style={{ fontSize: '0.72rem', color: 'rgba(245,230,208,0.35)' }}>{d}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ════════════ MENU PREVIEW ════════════ */
function MenuSection() {
  return (
    <section className="section-block">
      <div className="section-divider" style={{ marginBottom: 80 }} />
      <div className="container-brew">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="glass" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '7px 18px', borderRadius: 999, fontSize: '0.72rem', fontWeight: 600, color: '#c8a97e', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 18 }}>
            <Sparkles style={{ width: 12, height: 12, color: '#d4a853' }} /> Signature Collection
          </span>
          <h2 className="section-heading" style={{ marginBottom: 12 }}>Our <span className="gradient-text">Featured</span> Picks</h2>
          <p style={{ color: 'rgba(245,230,208,0.4)', maxWidth: 420, margin: '0 auto', fontSize: '0.88rem' }}>Hand-selected favourites our guests keep coming back for</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
          {MENU_ITEMS.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="glass-card" style={{ borderRadius: 20, overflow: 'hidden' }}>
              {/* Real photo */}
              <div style={{ height: 200, position: 'relative', overflow: 'hidden' }}>
                <Image src={item.img} alt={item.title} fill style={{ objectFit: 'cover', transition: 'transform 0.6s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.07)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,6,4,0.75), transparent 60%)' }} />
                <span style={{ position: 'absolute', top: 12, right: 12, padding: '4px 12px', borderRadius: 999, background: 'rgba(212,168,83,0.18)', color: '#d4a853', fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', border: '1px solid rgba(212,168,83,0.18)' }}>Popular</span>
              </div>
              <div style={{ padding: '18px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f5e6d0' }}>{item.title}</h3>
                  <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#d4a853', marginLeft: 10, flexShrink: 0 }}>{item.price}</span>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'rgba(245,230,208,0.4)', marginBottom: 14, lineHeight: 1.55 }}>{item.desc}</p>
                <span style={{ fontSize: '0.62rem', padding: '4px 12px', borderRadius: 999, background: 'rgba(200,169,126,0.06)', border: '1px solid rgba(200,169,126,0.08)', color: 'rgba(200,169,126,0.55)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>{item.category}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Link href="/menu" className="btn-primary">View Full Menu <ArrowRight style={{ width: 15, height: 15 }} /></Link>
        </div>
      </div>
    </section>
  );
}

/* ════════════ TESTIMONIALS ════════════ */
function TestimonialsSection() {
  return (
    <section className="section-block" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="section-divider" style={{ marginBottom: 80 }} />
      {/* subtle warm glow */}
      <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(212,168,83,0.04), transparent 70%)', pointerEvents: 'none' }} />

      <div className="container-brew" style={{ position: 'relative' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="glass" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '7px 18px', borderRadius: 999, fontSize: '0.72rem', fontWeight: 600, color: '#c8a97e', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 18 }}>
            <Star style={{ width: 12, height: 12, color: '#d4a853', fill: '#d4a853' }} /> Guest Reviews
          </span>
          <h2 className="section-heading" style={{ marginBottom: 12 }}>What Our <span className="gradient-text">Guests</span> Say</h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass-card" style={{ borderRadius: 20, padding: 28 }}>
              <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                {Array.from({ length: t.rating }).map((_, j) => <Star key={j} style={{ width: 13, height: 13, fill: '#d4a853', color: '#d4a853' }} />)}
              </div>
              <p style={{ color: 'rgba(245,230,208,0.5)', fontSize: '0.85rem', lineHeight: 1.75, marginBottom: 22, fontStyle: 'italic' }}>&ldquo;{t.text}&rdquo;</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 18, borderTop: '1px solid rgba(200,169,126,0.06)' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#c8a97e,#d4a853)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#080604', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>{t.name[0]}</div>
                <div>
                  <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f5e6d0' }}>{t.name}</p>
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

/* ════════════ CTA ════════════ */
function CTASection() {
  return (
    <section className="section-block">
      <div className="section-divider" style={{ marginBottom: 80 }} />
      <div className="container-brew" style={{ maxWidth: 860 }}>
        <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ position: 'relative', borderRadius: 28, overflow: 'hidden', minHeight: 340 }}>
          {/* Background photo */}
          <Image src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=85&auto=format&fit=crop" alt="Café interior" fill style={{ objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,6,4,0.78)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(212,168,83,0.06), transparent)' }} />

          <div style={{ position: 'relative', zIndex: 2, padding: '60px 48px', textAlign: 'center' }}>
            <h2 className="section-heading" style={{ marginBottom: 16 }}>
              Ready to <span className="gradient-text">Experience</span> BrewHub?
            </h2>
            <p style={{ color: 'rgba(245,230,208,0.45)', marginBottom: 36, maxWidth: 420, margin: '0 auto 36px', fontSize: '0.9rem', lineHeight: 1.7 }}>
              Reserve your table, explore our menu, and let us create your perfect coffee moment.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
              <Link href="/register" className="btn-primary">Reserve a Table <ArrowRight style={{ width: 15, height: 15 }} /></Link>
              <Link href="/menu" className="btn-outline">Browse Menu</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
