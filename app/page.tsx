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
} from 'lucide-react';

const CoffeeScene = dynamic(() => import('@/components/CoffeeScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-20 h-20 rounded-full border-2 border-brew-accent/20 border-t-brew-gold animate-spin" />
    </div>
  ),
});

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ──────────── Hero Section ──────────── */
function HeroSection() {
  const { scrollYProgress } = useScroll();
  const yText = useTransform(scrollYProgress, [0, 0.3], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" id="hero">
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-brew-dark/50 via-transparent to-brew-dark z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-brew-dark via-transparent to-brew-dark/50 z-10" />

      {/* 3D Scene Background */}
      <div className="absolute right-0 top-0 w-full lg:w-1/2 h-full z-0 opacity-80">
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-20 h-20 rounded-full border-2 border-brew-accent/20 border-t-brew-gold animate-spin" />
            </div>
          }
        >
          <CoffeeScene />
        </Suspense>
      </div>

      {/* Content */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.div variants={fadeInUp} custom={0} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-brew-accent text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Premium Artisan Coffee Experience
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            custom={1}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-serif)] leading-tight mb-6"
          >
            Craft Your{' '}
            <span className="gradient-text">Perfect</span>
            <br />
            Coffee Moment
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            custom={2}
            className="text-lg text-brew-cream/60 leading-relaxed mb-10 max-w-lg"
          >
            Immerse yourself in the art of coffee. From bean to cup, every sip is a journey through flavor, aroma, and craftsmanship.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            custom={3}
            className="flex flex-wrap gap-4"
          >
            <Link href="/menu" className="btn-primary text-base flex items-center gap-2 group">
              Explore Menu
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/register" className="btn-outline text-base">
              Reserve a Table
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeInUp}
            custom={4}
            className="mt-16 flex gap-8 sm:gap-12"
          >
            {[
              { value: '50+', label: 'Drinks' },
              { value: '10K+', label: 'Happy Customers' },
              { value: '4.9', label: 'Rating', icon: Star },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-brew-gold flex items-center justify-center gap-1">
                  {stat.value}
                  {stat.icon && <stat.icon className="w-5 h-5 fill-brew-gold" />}
                </div>
                <div className="text-xs sm:text-sm text-brew-cream/40 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-brew-accent/40"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}

/* ──────────── About Section ──────────── */
function AboutSection() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-brew-accent text-sm font-medium mb-6">
              <Coffee className="w-4 h-4" />
              Our Story
            </span>
            <h2 className="section-heading mb-6">
              Where Passion Meets{' '}
              <span className="gradient-text">Perfection</span>
            </h2>
            <p className="text-brew-cream/55 leading-relaxed mb-6">
              Founded with a simple vision — to create a space where coffee lovers can experience the finest brews in an atmosphere of warmth and creativity. Every bean is ethically sourced, every cup is hand-crafted.
            </p>
            <p className="text-brew-cream/55 leading-relaxed mb-8">
              Our baristas are trained artisans who pour their heart into every drink. From classic espressos to inventive seasonal specials, we&apos;re here to make your coffee experience unforgettable.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Award, title: 'Award Winning', desc: 'Best Café 2024' },
                { icon: Clock, title: 'Fresh Daily', desc: 'Roasted in-house' },
                { icon: Users, title: 'Community', desc: '10K+ members' },
                { icon: Star, title: 'Top Rated', desc: '4.9/5 rating' },
              ].map((item) => (
                <div key={item.title} className="glass-card rounded-xl p-4">
                  <item.icon className="w-6 h-6 text-brew-gold mb-2" />
                  <h4 className="text-sm font-semibold text-brew-cream mb-1">{item.title}</h4>
                  <p className="text-xs text-brew-cream/40">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden glass-card p-2">
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-brew-medium to-brew-brown flex items-center justify-center relative overflow-hidden">
                {/* Decorative coffee cup illustration */}
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                    className="w-60 h-60 rounded-full border border-brew-accent/10"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
                    className="absolute inset-6 rounded-full border border-brew-accent/20"
                  />
                  <div className="absolute inset-12 rounded-full bg-gradient-to-br from-brew-accent/20 to-brew-gold/10 flex items-center justify-center">
                    <Coffee className="w-16 h-16 text-brew-gold/60" />
                  </div>
                </div>
                {/* Floating decorative elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="absolute top-12 right-12 w-12 h-12 rounded-xl bg-brew-gold/10 flex items-center justify-center"
                >
                  <Star className="w-6 h-6 text-brew-gold/40" />
                </motion.div>
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ repeat: Infinity, duration: 5 }}
                  className="absolute bottom-16 left-12 w-10 h-10 rounded-lg bg-brew-accent/10 flex items-center justify-center"
                >
                  <Sparkles className="w-5 h-5 text-brew-accent/40" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ──────────── Featured Menu ──────────── */
const featuredItems = [
  {
    title: 'Caramel Macchiato',
    price: '₹249',
    category: 'coffee',
    desc: 'Espresso with vanilla, steamed milk, and caramel drizzle',
    popular: true,
  },
  {
    title: 'Matcha Latte',
    price: '₹229',
    category: 'tea',
    desc: 'Ceremonial matcha whisked with creamy milk',
    popular: true,
  },
  {
    title: 'Tiramisu',
    price: '₹249',
    category: 'desserts',
    desc: 'Classic Italian coffee-flavored dessert',
    popular: true,
  },
  {
    title: 'Breakfast Combo',
    price: '₹349',
    category: 'combos',
    desc: 'Cappuccino + Croissant + Fresh fruit',
    popular: true,
  },
];

function FeaturedMenuSection() {
  return (
    <section id="menu-preview" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-brew-accent text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Signature Collection
          </span>
          <h2 className="section-heading mb-4">
            Our <span className="gradient-text">Featured</span> Picks
          </h2>
          <p className="text-brew-cream/50 max-w-md mx-auto">
            Hand-selected favorites that keep our guests coming back for more
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glass-card rounded-2xl overflow-hidden group"
            >
              <div className="h-48 bg-gradient-to-br from-brew-medium to-brew-light flex items-center justify-center relative overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-20 h-20 rounded-2xl bg-brew-gold/10 flex items-center justify-center"
                >
                  <Coffee className="w-10 h-10 text-brew-gold/60" />
                </motion.div>
                {item.popular && (
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-brew-gold/20 text-brew-gold text-xs font-semibold">
                    Popular
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-brew-dark/60 to-transparent" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-brew-cream">{item.title}</h3>
                  <span className="text-brew-gold font-bold">{item.price}</span>
                </div>
                <p className="text-sm text-brew-cream/40 mb-3">{item.desc}</p>
                <span className="text-xs px-3 py-1 rounded-full glass text-brew-accent/70">
                  {item.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/menu"
            className="btn-primary inline-flex items-center gap-2 group"
          >
            View Full Menu
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────── Customer Experience ──────────── */
const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Coffee Enthusiast',
    text: 'The best cappuccino I\'ve ever had! The ambiance is incredible and the staff is so welcoming.',
    rating: 5,
  },
  {
    name: 'Rahul Patel',
    role: 'Regular Visitor',
    text: 'BrewHub has become my second home. The matcha latte is absolutely divine.',
    rating: 5,
  },
  {
    name: 'Ananya Gupta',
    role: 'Food Blogger',
    text: 'From the décor to the desserts, everything screams premium quality. Highly recommend the tiramisu!',
    rating: 5,
  },
];

function ExperienceSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brew-gold/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-brew-accent text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            Testimonials
          </span>
          <h2 className="section-heading mb-4">
            What Our <span className="gradient-text">Guests</span> Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-brew-gold text-brew-gold" />
                ))}
              </div>
              <p className="text-brew-cream/60 text-sm leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brew-accent to-brew-gold flex items-center justify-center text-brew-dark font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-brew-cream">{t.name}</h4>
                  <p className="text-xs text-brew-cream/40">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────── CTA Section ──────────── */
function CTASection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brew-gold/5 via-transparent to-brew-accent/5" />
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
              className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-brew-accent to-brew-gold flex items-center justify-center"
            >
              <Coffee className="w-8 h-8 text-brew-dark" />
            </motion.div>
            <h2 className="section-heading mb-4">
              Ready to <span className="gradient-text">Experience</span> BrewHub?
            </h2>
            <p className="text-brew-cream/50 mb-10 max-w-md mx-auto">
              Reserve your table, explore our menu, and let us create your perfect coffee moment.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register" className="btn-primary text-base flex items-center gap-2 group">
                Reserve a Table
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/menu" className="btn-outline text-base">
                Browse Menu
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────── Main Page ──────────── */
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
