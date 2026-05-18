'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  Search, Coffee, Leaf, Cookie, Cake, Package,
  Plus, Minus, ShoppingCart, Trash2, X, Send,
  Loader2, Clock, Sparkles, Star, Pizza,
  GlassWater, Zap, UtensilsCrossed,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useCartStore } from '@/store/cartStore';
import { IMenuItem } from '@/types';
import { STATIC_MENU } from '@/lib/menuData';

const categories = [
  { id: 'all',        label: 'All',           icon: Sparkles },
  { id: 'coffee',     label: 'Coffee',        icon: Coffee },
  { id: 'tea',        label: 'Tea',           icon: Leaf },
  { id: 'refreshers', label: 'Refreshers',    icon: GlassWater },
  { id: 'snacks',     label: 'Snacks',        icon: Cookie },
  { id: 'pizza',      label: 'Pizza & Pasta', icon: Pizza },
  { id: 'desserts',   label: 'Desserts',      icon: Cake },
  { id: 'milkshakes', label: 'Shakes',        icon: UtensilsCrossed },
  { id: 'combos',     label: 'Combos',        icon: Package },
  { id: 'specials',   label: 'Specials',      icon: Zap },
];

const CAT_GRAD: Record<string, string> = {
  coffee:     'linear-gradient(135deg,#2c1f10,#3d2b14)',
  tea:        'linear-gradient(135deg,#0f2218,#1a3526)',
  refreshers: 'linear-gradient(135deg,#0e1f2f,#1a3a52)',
  snacks:     'linear-gradient(135deg,#2a1c10,#3d2914)',
  pizza:      'linear-gradient(135deg,#2a1008,#3d1a10)',
  desserts:   'linear-gradient(135deg,#271020,#3d1830)',
  milkshakes: 'linear-gradient(135deg,#1a1030,#2a1a48)',
  combos:     'linear-gradient(135deg,#17130e,#231c14)',
  specials:   'linear-gradient(135deg,#201808,#342c10)',
};

/* ═══════ MENU CARD ═══════ */
function MenuCard({ item }: { item: IMenuItem }) {
  const addItem = useCartStore((s) => s.addItem);
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const [imgErr, setImgErr] = useState(false);

  const cartItem = items.find((i) => i.menuItem._id === item._id);
  const qty = cartItem?.quantity || 0;
  const hasImg = item.image?.startsWith('http') && !imgErr;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      style={{
        background: 'rgba(20, 16, 12, 0.65)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(200,169,126,0.07)',
        borderRadius: 18,
        overflow: 'hidden',
        transition: 'border-color 0.4s, box-shadow 0.4s, transform 0.3s',
      }}
      whileHover={{ y: -4 }}
      className="group"
    >
      {/* Image */}
      <div style={{ height: 200, position: 'relative', overflow: 'hidden', background: CAT_GRAD[item.category] || CAT_GRAD.coffee }}>
        {hasImg ? (
          <Image src={item.image} alt={item.title} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw" style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }} className="group-hover:scale-110" onError={() => setImgErr(true)} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Coffee style={{ width: 48, height: 48, color: 'rgba(212,168,83,0.2)' }} /></div>
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,6,4,0.85) 0%, rgba(8,6,4,0.15) 50%, transparent 100%)' }} />
        {item.popular && (
          <span style={{ position: 'absolute', top: 12, left: 12, display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 999, background: 'rgba(212,168,83,0.15)', backdropFilter: 'blur(8px)', color: '#d4a853', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.04em', border: '1px solid rgba(212,168,83,0.15)' }}>
            <Star style={{ width: 10, height: 10, fill: '#d4a853', color: '#d4a853' }} /> Popular
          </span>
        )}
        {item.prepTime && (
          <span style={{ position: 'absolute', top: 12, right: 12, display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 999, background: 'rgba(23,19,14,0.6)', backdropFilter: 'blur(8px)', color: 'rgba(245,230,208,0.5)', fontSize: '0.65rem', border: '1px solid rgba(200,169,126,0.08)' }}>
            <Clock style={{ width: 10, height: 10 }} /> {item.prepTime}m
          </span>
        )}
        {/* Price overlay on image bottom */}
        <div style={{ position: 'absolute', bottom: 12, left: 16, right: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#f5e6d0', lineHeight: 1.3, textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>{item.title}</h3>
          <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#d4a853', whiteSpace: 'nowrap', marginLeft: 8, textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>₹{item.price}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '14px 16px 16px' }}>
        <p style={{ fontSize: '0.78rem', color: 'rgba(245,230,208,0.4)', lineHeight: 1.6, marginBottom: 14, minHeight: 38 }}>{item.description}</p>

        {qty === 0 ? (
          <motion.button whileTap={{ scale: 0.96 }} onClick={() => addItem(item)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '11px 0', borderRadius: 12, background: 'linear-gradient(135deg,#c8a97e,#d4a853)', color: '#080604', fontWeight: 600, fontSize: '0.82rem', border: 'none', cursor: 'pointer', transition: 'box-shadow 0.3s', letterSpacing: '0.01em' }}>
            <Plus style={{ width: 15, height: 15 }} /> Add to Cart
          </motion.button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => qty > 1 ? updateQuantity(item._id!, qty - 1) : removeItem(item._id!)} style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(23,19,14,0.6)', border: '1px solid rgba(200,169,126,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#c8a97e' }}>
              {qty === 1 ? <Trash2 style={{ width: 15, height: 15, color: '#f87171' }} /> : <Minus style={{ width: 15, height: 15 }} />}
            </motion.button>
            <motion.span key={qty} initial={{ scale: 1.3 }} animate={{ scale: 1 }} style={{ color: '#d4a853', fontWeight: 700, fontSize: '1.1rem', minWidth: 32, textAlign: 'center' }}>{qty}</motion.span>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => addItem(item)} style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(23,19,14,0.6)', border: '1px solid rgba(200,169,126,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#c8a97e' }}>
              <Plus style={{ width: 15, height: 15 }} />
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ═══════ CART SIDEBAR ═══════ */
function CartSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, getTotal, clearCart, updateQuantity, removeItem, customerName, tableName } = useCartStore();
  const [ordering, setOrdering] = useState(false);

  const handlePlaceOrder = async () => {
    if (!customerName || !tableName) { toast.error('Please login with your table first'); return; }
    if (items.length === 0) { toast.error('Cart is empty'); return; }
    setOrdering(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tableName, customerName, items: items.map((i) => ({ menuItem: i.menuItem, quantity: i.quantity })), totalPrice: getTotal() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success('Order placed successfully! 🎉'); clearCart(); onClose();
    } catch { toast.error('Failed to place order'); }
    finally { setOrdering(false); }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/50 z-40" />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed right-0 top-0 bottom-0 w-full max-w-md glass-strong z-50 flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-brew-accent/10">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5 text-brew-gold" />
                <h2 className="text-lg font-bold text-brew-cream">Your Cart</h2>
                <span className="px-2 py-0.5 rounded-full bg-brew-gold/20 text-brew-gold text-xs font-semibold">{items.length} items</span>
              </div>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5"><X className="w-5 h-5 text-brew-cream/50" /></button>
            </div>
            {customerName && <div className="mx-6 mt-4 p-3 rounded-xl glass text-sm text-brew-cream/60">🪑 <span className="text-brew-accent">{tableName}</span> · {customerName}</div>}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-12 h-12 mx-auto text-brew-cream/20 mb-4" />
                  <p className="text-brew-cream/40">Your cart is empty</p>
                  <p className="text-sm text-brew-cream/25 mt-1">Add items from the menu</p>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <motion.div key={item.menuItem._id} layout initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30, height: 0 }} className="flex items-center gap-4 p-3 rounded-xl glass">
                      <div className="w-14 h-14 rounded-xl overflow-hidden relative shrink-0" style={{ background: CAT_GRAD[item.menuItem.category] || CAT_GRAD.coffee }}>
                        {item.menuItem.image?.startsWith('http') ? <Image src={item.menuItem.image} alt={item.menuItem.title} fill style={{ objectFit: 'cover' }} /> : <div className="w-full h-full flex items-center justify-center"><Coffee className="w-6 h-6 text-brew-gold/50" /></div>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-brew-cream truncate">{item.menuItem.title}</h4>
                        <p className="text-brew-gold text-sm font-semibold">₹{item.menuItem.price * item.quantity}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => item.quantity > 1 ? updateQuantity(item.menuItem._id!, item.quantity - 1) : removeItem(item.menuItem._id!)} className="w-7 h-7 rounded-lg glass flex items-center justify-center text-brew-cream/50 hover:text-brew-cream"><Minus className="w-3 h-3" /></button>
                        <span className="text-sm font-semibold text-brew-cream w-5 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.menuItem._id!, item.quantity + 1)} className="w-7 h-7 rounded-lg glass flex items-center justify-center text-brew-cream/50 hover:text-brew-cream"><Plus className="w-3 h-3" /></button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
            {items.length > 0 && (
              <div className="p-6 border-t border-brew-accent/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-brew-cream/50">Total</span>
                  <span className="text-2xl font-bold text-brew-gold">₹{getTotal()}</span>
                </div>
                <p className="text-xs text-brew-cream/30 text-center">GST Included · Prep: 10–20 mins</p>
                <button onClick={handlePlaceOrder} disabled={ordering} className="btn-primary w-full flex items-center justify-center gap-2 text-base py-3.5 disabled:opacity-50">
                  {ordering ? <><Loader2 className="w-5 h-5 animate-spin" /> Placing Order...</> : <><Send className="w-5 h-5" /> Place Order</>}
                </button>
                <button onClick={clearCart} className="w-full text-center text-sm text-brew-cream/30 hover:text-brew-error transition-colors">Clear Cart</button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* Category display labels */
const CAT_LABELS: Record<string, { emoji: string; title: string }> = {
  coffee:     { emoji: '☕', title: 'Coffee' },
  tea:        { emoji: '🍵', title: 'Tea' },
  refreshers: { emoji: '🧊', title: 'Refreshers' },
  snacks:     { emoji: '🥪', title: 'Snacks & Quick Bites' },
  pizza:      { emoji: '🍕', title: 'Pizza & Pasta' },
  desserts:   { emoji: '🍰', title: 'Desserts' },
  milkshakes: { emoji: '🥤', title: 'Milkshakes & Smoothies' },
  combos:     { emoji: '⭐', title: 'BrewHub Special Combos' },
  specials:   { emoji: '🔥', title: 'Signature Specials' },
};

/* ═══════ SECTION RENDER ═══════ */
function CategorySection({ catId, items }: { catId: string; items: IMenuItem[] }) {
  const info = CAT_LABELS[catId];
  if (!info || items.length === 0) return null;
  return (
    <div style={{ marginBottom: 56 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
        <span style={{ fontSize: '1.3rem' }}>{info.emoji}</span>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: 700, color: '#f5e6d0' }}>{info.title}</h2>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(200,169,126,0.15), transparent)', marginLeft: 8 }} />
        <span style={{ fontSize: '0.7rem', color: 'rgba(200,169,126,0.3)', fontWeight: 500 }}>{items.length} items</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 20 }}>
        {items.map((item) => <MenuCard key={item._id} item={item} />)}
      </div>
    </div>
  );
}

/* ═══════ MAIN MENU PAGE ═══════ */
export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const totalItems = useCartStore((s) => s.getTotalItems());
  const total = useCartStore((s) => s.getTotal());

  const filtered = useMemo(() => {
    let list = STATIC_MENU;
    if (activeCategory !== 'all') list = list.filter((i) => i.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((i) => i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q));
    }
    return list;
  }, [activeCategory, searchQuery]);

  const grouped = useMemo(() => {
    const cats = ['coffee','tea','refreshers','snacks','pizza','desserts','milkshakes','combos','specials'];
    return cats.map((c) => ({ catId: c, items: filtered.filter((i) => i.category === c) })).filter((g) => g.items.length > 0);
  }, [filtered]);

  const showSections = activeCategory === 'all' && !searchQuery.trim();

  return (
    <main style={{ minHeight: '100vh', paddingTop: 120, paddingBottom: 80 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="glass" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 20px', borderRadius: 999, color: '#c8a97e', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>
            <Sparkles style={{ width: 12, height: 12, color: '#d4a853' }} /> Budget Friendly · Karjat · GST Included
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 700, color: '#f5e6d0', marginBottom: 12, lineHeight: 1.15 }}>Our <span className="gradient-text">Menu</span></h1>
          <p style={{ color: 'rgba(245,230,208,0.45)', maxWidth: 440, margin: '0 auto 20px', fontSize: '0.9rem', lineHeight: 1.7 }}>Handcrafted beverages, artisan bites, and signature specials — all at pocket-friendly prices</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
            {[{ icon: '📶', t: 'Free WiFi' }, { icon: '📱', t: 'Self Ordering' }, { icon: '🕘', t: '9 AM – 11 PM' }, { icon: '⏱️', t: '10–20 min prep' }].map(({ icon, t }) => (
              <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 14px', borderRadius: 999, background: 'rgba(23,19,14,0.5)', border: '1px solid rgba(200,169,126,0.06)', color: 'rgba(245,230,208,0.35)', fontSize: '0.7rem' }}>{icon} {t}</span>
            ))}
          </div>
        </motion.div>

        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ maxWidth: 480, margin: '0 auto 28px' }}>
          <div style={{ position: 'relative' }}>
            <Search style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: 'rgba(200,169,126,0.3)' }} />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search menu..." className="input-brew" style={{ paddingLeft: 46 }} id="menu-search" />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 44 }}>
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 18px', borderRadius: 12, fontSize: '0.8rem', fontWeight: 500, border: 'none', cursor: 'pointer', transition: 'all 0.3s', ...(activeCategory === cat.id ? { background: 'linear-gradient(135deg,#c8a97e,#d4a853)', color: '#080604', boxShadow: '0 4px 16px rgba(212,168,83,0.25)' } : { background: 'rgba(23,19,14,0.5)', color: 'rgba(245,230,208,0.5)', border: '1px solid rgba(200,169,126,0.06)' }) }}>
              <cat.icon style={{ width: 15, height: 15 }} /> {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Divider */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(200,169,126,0.1), transparent)', maxWidth: 500, margin: '0 auto 44px' }} />

        {/* Menu Content */}
        {filtered.length > 0 ? (
          showSections ? (
            grouped.map((g) => <CategorySection key={g.catId} catId={g.catId} items={g.items} />)
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 20 }}>
              <AnimatePresence mode="popLayout">
                {filtered.map((item) => <MenuCard key={item._id} item={item} />)}
              </AnimatePresence>
            </div>
          )
        ) : (
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <Coffee style={{ width: 48, height: 48, margin: '0 auto 16px', color: 'rgba(245,230,208,0.15)' }} />
            <p style={{ color: 'rgba(245,230,208,0.35)' }}>No items found</p>
            <p style={{ fontSize: '0.8rem', color: 'rgba(245,230,208,0.2)', marginTop: 6 }}>Try a different category or search</p>
          </div>
        )}
      </div>

      {totalItems > 0 && (
        <motion.button initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} onClick={() => setCartOpen(true)} className="animate-pulse-glow" style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 30, display: 'flex', alignItems: 'center', gap: 10, padding: '14px 24px', borderRadius: 16, background: 'linear-gradient(135deg,#c8a97e,#d4a853)', color: '#080604', fontWeight: 600, fontSize: '0.88rem', border: 'none', cursor: 'pointer', boxShadow: '0 8px 32px rgba(212,168,83,0.3)' }}>
          <ShoppingCart style={{ width: 18, height: 18 }} /> {totalItems} items <span style={{ opacity: 0.6 }}>·</span> <span style={{ fontWeight: 700 }}>₹{total}</span>
        </motion.button>
      )}

      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </main>
  );
}
