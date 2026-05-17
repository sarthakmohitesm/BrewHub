'use client';

import React, { Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  Zap,
} from 'lucide-react';

const CoffeeScene = dynamic(() => import('@/components/CoffeeScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border-2 border-brew-accent/20 border-t-brew-gold animate-spin" />
    </div>
  ),
});

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ═══════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════ */
function HeroSection() {
  const { scrollYProgress } = useScroll();
  const yText = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" id="hero">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-brew-dark/60 via-brew-dark/20 to-brew-dark z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-r from-brew-dark/90 via-brew-dark/40 to-transparent z-[2]" />
      
      {/* Ambient glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-brew-gold/[0.04] rounded-full blur-[100px] z-[1]" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-brew-accent/[0.03] rounded-full blur-[80px] z-[1]" />

      {/* 3D Scene */}
      <div className="absolute right-0 top-0 w-full lg:w-[55%] h-full z-[1]">
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-2 border-brew-accent/20 border-t-brew-gold animate-spin" />
            </div>
          }
        >
          <CoffeeScene />
        </Suspense>
      </div>

      {/* Content */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-xl lg:max-w-2xl"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} custom={0} className="mb-8">
            <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass text-brew-accent text-sm font-medium shadow-lg shadow-black/20">
              <Sparkles className="w-4 h-4 text-brew-gold" />
              Premium Artisan Coffee Experience
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeInUp}
            custom={1}
            className="text-4xl sm:text-5xl lg:text-[4.2rem] font-bold font-[family-name:var(--font-serif)] leading-[1.1] mb-7 tracking-tight"
          >
            Craft Your{' '}
            <span className="gradient-text">Perfect</span>
            <br />
            Coffee Moment
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            custom={2}
            className="text-base sm:text-lg text-brew-cream/55 leading-relaxed mb-10 max-w-md"
          >
            Immerse yourself in the art of coffee. From bean to cup, every sip is a journey through flavor, aroma, and craftsmanship.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            custom={3}
            className="flex flex-wrap gap-4 mb-16"
          >
            <Link href="/menu" className="btn-primary flex items-center gap-2.5 group">
              Explore Menu
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/register" className="btn-outline">
              Reserve a Table
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeInUp}
            custom={4}
            className="flex gap-10 sm:gap-14"
          >
            {[
              { value: '50+', label: 'Drinks' },
              { value: '10K+', label: 'Happy Customers' },
              { value: '4.9', label: 'Rating', icon: Star },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl sm:text-3xl font-bold text-brew-gold flex items-center gap-1.5">
                  {stat.value}
                  {stat.icon && <stat.icon className="w-5 h-5 fill-brew-gold text-brew-gold" />}
                </div>
                <div className="text-xs sm:text-sm text-brew-cream/35 mt-1.5 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-brew-cream/25 font-medium">Scroll</span>
          <ChevronDown className="w-5 h-5 text-brew-accent/30" />
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   ABOUT SECTION
   ═══════════════════════════════════════════ */
function AboutSection() {
  return (
    <section id="about" className="relative py-28 sm:py-36">
      {/* Section divider */}
      <div className="section-divider mb-28" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass text-brew-accent text-sm font-medium mb-8">
              <Coffee className="w-4 h-4 text-brew-gold" />
              Our Story
            </span>
            <h2 className="section-heading mb-7">
              Where Passion Meets{' '}
              <span className="gradient-text">Perfection</span>
            </h2>
            <p className="text-brew-cream/50 leading-relaxed mb-5 text-[0.95rem]">
              Founded with a simple vision — to create a space where coffee lovers can experience the finest brews in an atmosphere of warmth and creativity. Every bean is ethically sourced, every cup is hand-crafted.
            </p>
            <p className="text-brew-cream/50 leading-relaxed mb-10 text-[0.95rem]">
              Our baristas are trained artisans who pour their heart into every drink. From classic espressos to inventive seasonal specials, we&apos;re here to make your coffee experience unforgettable.
            </p>

            {/* Feature grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Award, title: 'Award Winning', desc: 'Best Café 2024' },
                { icon: Clock, title: 'Fresh Daily', desc: 'Roasted in-house' },
                { icon: Users, title: 'Community', desc: '10K+ members' },
                { icon: Star, title: 'Top Rated', desc: '4.9/5 rating' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="glass-card rounded-2xl p-5 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brew-gold/10 flex items-center justify-center mb-3 group-hover:bg-brew-gold/20 transition-colors">
                    <item.icon className="w-5 h-5 text-brew-gold" />
                  </div>
                  <h4 className="text-sm font-semibold text-brew-cream mb-1">{item.title}</h4>
                  <p className="text-xs text-brew-cream/40">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right decorative panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative hidden lg:block"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden glass-card p-1.5">
              <div className="w-full h-full rounded-[22px] bg-gradient-to-br from-brew-medium via-brew-brown to-brew-dark flex items-center justify-center relative overflow-hidden">
                {/* Concentric rotating circles */}
                <div className="relative w-64 h-64">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border border-brew-accent/8"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
                    className="absolute inset-5 rounded-full border border-brew-accent/12"
                  />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
                    className="absolute inset-10 rounded-full border border-dashed border-brew-accent/15"
                  />
                  <div className="absolute inset-16 rounded-full bg-gradient-to-br from-brew-accent/15 to-brew-gold/8 flex items-center justify-center shadow-inner">
                    <Coffee className="w-14 h-14 text-brew-gold/50" />
                  </div>
                </div>

                {/* Floating elements */}
                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  className="absolute top-16 right-16 w-14 h-14 rounded-2xl glass flex items-center justify-center"
                >
                  <Star className="w-6 h-6 text-brew-gold/50" />
                </motion.div>
                <motion.div
                  animate={{ y: [6, -6, 6] }}
                  transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                  className="absolute bottom-20 left-16 w-12 h-12 rounded-xl glass flex items-center justify-center"
                >
                  <Zap className="w-5 h-5 text-brew-accent/50" />
                </motion.div>
                <motion.div
                  animate={{ x: [-5, 5, -5] }}
                  transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                  className="absolute top-24 left-10 w-10 h-10 rounded-lg glass flex items-center justify-center"
                >
                  <Sparkles className="w-4 h-4 text-brew-gold/40" />
                </motion.div>

                {/* Bottom gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brew-dark/60 to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FEATURED MENU
   ═══════════════════════════════════════════ */
const featuredItems = [
  { title: 'Caramel Macchiato', price: '₹249', category: 'Coffee', desc: 'Espresso with vanilla, steamed milk, and caramel drizzle', emoji: '☕' },
  { title: 'Matcha Latte', price: '₹229', category: 'Tea', desc: 'Ceremonial matcha whisked with creamy milk', emoji: '🍵' },
  { title: 'Tiramisu', price: '₹249', category: 'Desserts', desc: 'Classic Italian coffee-flavored dessert', emoji: '🍰' },
  { title: 'Breakfast Combo', price: '₹349', category: 'Combos', desc: 'Cappuccino + Croissant + Fresh fruit', emoji: '🥐' },
];

function FeaturedMenuSection() {
  return (
    <section id="menu-preview" className="relative py-28 sm:py-36">
      <div className="section-divider mb-28" />
      
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brew-gold/[0.03] rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass text-brew-accent text-sm font-medium mb-7">
            <Sparkles className="w-4 h-4 text-brew-gold" />
            Signature Collection
          </span>
          <h2 className="section-heading mb-4">
            Our <span className="gradient-text">Featured</span> Picks
          </h2>
          <p className="text-brew-cream/45 max-w-lg mx-auto text-[0.95rem]">
            Hand-selected favorites that keep our guests coming back for more
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="glass-card rounded-2xl overflow-hidden group"
            >
              {/* Card top — emoji visual */}
              <div className="h-44 bg-gradient-to-br from-brew-medium/80 to-brew-light/60 flex items-center justify-center relative">
                <motion.span
                  className="text-5xl drop-shadow-lg"
                  whileHover={{ scale: 1.2, rotate: 8 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {item.emoji}
                </motion.span>
                <span className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-brew-gold/15 text-brew-gold text-[10px] font-semibold uppercase tracking-wider border border-brew-gold/20">
                  Popular
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-brew-dark/70 via-transparent to-transparent" />
              </div>
              {/* Card body */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-brew-cream text-[0.95rem] leading-snug">{item.title}</h3>
                  <span className="text-brew-gold font-bold text-lg ml-3 shrink-0">{item.price}</span>
                </div>
                <p className="text-sm text-brew-cream/40 mb-4 leading-relaxed">{item.desc}</p>
                <span className="inline-block text-[10px] px-3 py-1.5 rounded-full glass text-brew-accent/70 font-medium uppercase tracking-wider">
                  {item.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <Link
            href="/menu"
            className="btn-primary inline-flex items-center gap-2.5 group"
          >
            View Full Menu
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   TESTIMONIALS
   ═══════════════════════════════════════════ */
const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Coffee Enthusiast',
    text: 'The best cappuccino I\'ve ever had! The ambiance is incredible and the staff is so welcoming. Absolutely love this place.',
    rating: 5,
  },
  {
    name: 'Rahul Patel',
    role: 'Regular Visitor',
    text: 'BrewHub has become my second home. The matcha latte is absolutely divine — it keeps me coming back every single day.',
    rating: 5,
  },
  {
    name: 'Ananya Gupta',
    role: 'Food Blogger',
    text: 'From the décor to the desserts, everything screams premium quality. Highly recommend the tiramisu and the cold brew!',
    rating: 5,
  },
];

function ExperienceSection() {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      <div className="section-divider mb-28" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brew-gold/[0.04] rounded-full blur-[130px]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass text-brew-accent text-sm font-medium mb-7">
            <Star className="w-4 h-4 text-brew-gold" />
            Testimonials
          </span>
          <h2 className="section-heading mb-4">
            What Our <span className="gradient-text">Guests</span> Say
          </h2>
          <p className="text-brew-cream/45 max-w-lg mx-auto text-[0.95rem]">
            Real experiences from the people who love BrewHub
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card rounded-2xl p-7 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-brew-gold text-brew-gold" />
                ))}
              </div>
              {/* Quote */}
              <p className="text-brew-cream/55 text-sm leading-relaxed mb-7 flex-1">
                &ldquo;{t.text}&rdquo;
              </p>
              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-white/[0.05]">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brew-accent to-brew-gold flex items-center justify-center text-brew-dark font-bold text-sm shadow-lg shadow-brew-gold/15">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-brew-cream">{t.name}</h4>
                  <p className="text-xs text-brew-cream/35">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   CTA SECTION
   ═══════════════════════════════════════════ */
function CTASection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="section-divider mb-24" />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden"
        >
          {/* Decorative gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-brew-gold/[0.04] via-transparent to-brew-accent/[0.03]" />
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-brew-gold/[0.06] rounded-full blur-[80px]" />

          <div className="relative">
            <motion.div
              animate={{ y: [-3, 3, -3] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-brew-accent to-brew-gold flex items-center justify-center shadow-lg shadow-brew-gold/20"
            >
              <Coffee className="w-8 h-8 text-brew-dark" />
            </motion.div>
            <h2 className="section-heading mb-5">
              Ready to <span className="gradient-text">Experience</span> BrewHub?
            </h2>
            <p className="text-brew-cream/45 mb-10 max-w-md mx-auto text-[0.95rem]">
              Reserve your table, explore our menu, and let us create your perfect coffee moment.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register" className="btn-primary flex items-center gap-2.5 group">
                Reserve a Table
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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

/* ═══════════════════════════════════════════
   MAIN PAGE EXPORT
   ═══════════════════════════════════════════ */
export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <FeaturedMenuSection />
      <ExperienceSection />
      <CTASection />
    </main>
  );
}
