'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Coffee,
  Leaf,
  Cookie,
  Cake,
  Package,
  Plus,
  Minus,
  ShoppingCart,
  Trash2,
  X,
  Send,
  Loader2,
  Clock,
  Sparkles,
  Star,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useCartStore } from '@/store/cartStore';
import { IMenuItem } from '@/types';

const categories = [
  { id: 'all', label: 'All', icon: Sparkles },
  { id: 'coffee', label: 'Coffee', icon: Coffee },
  { id: 'tea', label: 'Tea', icon: Leaf },
  { id: 'snacks', label: 'Snacks', icon: Cookie },
  { id: 'desserts', label: 'Desserts', icon: Cake },
  { id: 'combos', label: 'Combos', icon: Package },
];

function MenuCard({ item }: { item: IMenuItem }) {
  const addItem = useCartStore((s) => s.addItem);
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const cartItem = items.find((i) => i.menuItem._id === item._id);
  const quantity = cartItem?.quantity || 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-card rounded-2xl overflow-hidden group"
    >
      <div className="h-44 bg-gradient-to-br from-brew-medium to-brew-light flex items-center justify-center relative overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.15, rotate: 8 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="w-20 h-20 rounded-2xl bg-brew-gold/10 flex items-center justify-center"
        >
          <Coffee className="w-10 h-10 text-brew-gold/60" />
        </motion.div>
        {item.popular && (
          <span className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-brew-gold/20 text-brew-gold text-xs font-semibold">
            <Star className="w-3 h-3 fill-brew-gold" />
            Popular
          </span>
        )}
        {item.prepTime && (
          <span className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full glass text-brew-cream/60 text-xs">
            <Clock className="w-3 h-3" />
            {item.prepTime}m
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brew-dark/80 via-transparent to-transparent" />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-1.5">
          <h3 className="font-semibold text-brew-cream text-base">{item.title}</h3>
          <span className="text-brew-gold font-bold text-lg whitespace-nowrap ml-2">
            ₹{item.price}
          </span>
        </div>
        <p className="text-sm text-brew-cream/40 mb-4 line-clamp-2">{item.description}</p>

        {quantity === 0 ? (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => addItem(item)}
            className="btn-primary w-full flex items-center justify-center gap-2 py-3 text-sm"
          >
            <Plus className="w-4 h-4" />
            Add to Cart
          </motion.button>
        ) : (
          <div className="flex items-center justify-between">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                quantity > 1
                  ? updateQuantity(item._id!, quantity - 1)
                  : removeItem(item._id!)
              }
              className="w-10 h-10 rounded-xl glass flex items-center justify-center text-brew-accent hover:bg-brew-accent/10 transition-colors"
            >
              {quantity === 1 ? (
                <Trash2 className="w-4 h-4 text-brew-error" />
              ) : (
                <Minus className="w-4 h-4" />
              )}
            </motion.button>
            <motion.span
              key={quantity}
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
              className="text-brew-gold font-bold text-lg min-w-[2rem] text-center"
            >
              {quantity}
            </motion.span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => addItem(item)}
              className="w-10 h-10 rounded-xl glass flex items-center justify-center text-brew-accent hover:bg-brew-accent/10 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function CartSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, getTotal, clearCart, updateQuantity, removeItem, customerName, tableName } =
    useCartStore();
  const [ordering, setOrdering] = useState(false);

  const handlePlaceOrder = async () => {
    if (!customerName || !tableName) {
      toast.error('Please login with your table first');
      return;
    }
    if (items.length === 0) {
      toast.error('Cart is empty');
      return;
    }

    setOrdering(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tableName,
          customerName,
          items: items.map((i) => ({
            menuItem: i.menuItem,
            quantity: i.quantity,
          })),
          totalPrice: getTotal(),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      toast.success('Order placed successfully! 🎉');
      clearCart();
      onClose();
    } catch {
      toast.error('Failed to place order');
    } finally {
      setOrdering(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md glass-strong z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-brew-accent/10">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5 text-brew-gold" />
                <h2 className="text-lg font-bold text-brew-cream">Your Cart</h2>
                <span className="px-2 py-0.5 rounded-full bg-brew-gold/20 text-brew-gold text-xs font-semibold">
                  {items.length} items
                </span>
              </div>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5">
                <X className="w-5 h-5 text-brew-cream/50" />
              </button>
            </div>

            {/* Customer Info */}
            {customerName && (
              <div className="mx-6 mt-4 p-3 rounded-xl glass text-sm text-brew-cream/60">
                🪑 <span className="text-brew-accent">{tableName}</span> · {customerName}
              </div>
            )}

            {/* Items */}
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
                    <motion.div
                      key={item.menuItem._id}
                      layout
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30, height: 0 }}
                      className="flex items-center gap-4 p-3 rounded-xl glass"
                    >
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brew-medium to-brew-light flex items-center justify-center shrink-0">
                        <Coffee className="w-6 h-6 text-brew-gold/50" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-brew-cream truncate">
                          {item.menuItem.title}
                        </h4>
                        <p className="text-brew-gold text-sm font-semibold">
                          ₹{item.menuItem.price * item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            item.quantity > 1
                              ? updateQuantity(item.menuItem._id!, item.quantity - 1)
                              : removeItem(item.menuItem._id!)
                          }
                          className="w-7 h-7 rounded-lg glass flex items-center justify-center text-brew-cream/50 hover:text-brew-cream"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-semibold text-brew-cream w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.menuItem._id!, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg glass flex items-center justify-center text-brew-cream/50 hover:text-brew-cream"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-brew-accent/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-brew-cream/50">Total</span>
                  <span className="text-2xl font-bold text-brew-gold">₹{getTotal()}</span>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  disabled={ordering}
                  className="btn-primary w-full flex items-center justify-center gap-2 text-base py-3.5 disabled:opacity-50"
                >
                  {ordering ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Place Order
                    </>
                  )}
                </button>
                <button
                  onClick={clearCart}
                  className="w-full text-center text-sm text-brew-cream/30 hover:text-brew-error transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const totalItems = useCartStore((s) => s.getTotalItems());
  const total = useCartStore((s) => s.getTotal());

  useEffect(() => {
    fetchMenu();
  }, [activeCategory, searchQuery]);

  const fetchMenu = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeCategory !== 'all') params.set('category', activeCategory);
      if (searchQuery) params.set('search', searchQuery);

      const res = await fetch(`/api/menu?${params}`);
      const data = await res.json();
      setMenuItems(data.items || []);
    } catch {
      toast.error('Failed to load menu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="section-heading mb-3">
            Our <span className="gradient-text">Menu</span>
          </h1>
          <p className="text-brew-cream/50 max-w-md mx-auto">
            Discover our curated collection of beverages, snacks, and desserts
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-lg mx-auto mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brew-accent/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search menu..."
              className="input-brew pl-12"
              id="menu-search"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-brew-gold text-brew-dark shadow-lg shadow-brew-gold/20'
                  : 'glass text-brew-cream/60 hover:text-brew-cream hover:bg-brew-accent/10'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="glass-card rounded-2xl overflow-hidden">
                  <div className="h-44 skeleton" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 skeleton w-3/4" />
                    <div className="h-4 skeleton w-full" />
                    <div className="h-10 skeleton w-full mt-2" />
                  </div>
                </div>
              ))
            : menuItems.length > 0 ? (
                <AnimatePresence mode="popLayout">
                  {menuItems.map((item) => (
                    <MenuCard key={item._id} item={item} />
                  ))}
                </AnimatePresence>
              ) : (
                <div className="col-span-full text-center py-16">
                  <Coffee className="w-12 h-12 mx-auto text-brew-cream/20 mb-4" />
                  <p className="text-brew-cream/40">No items found</p>
                  <p className="text-sm text-brew-cream/25 mt-1">Try a different category or search</p>
                </div>
              )}
        </div>
      </div>

      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <motion.button
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-30 btn-primary flex items-center gap-3 py-4 px-6 rounded-2xl shadow-2xl shadow-brew-gold/20 animate-pulse-glow"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>{totalItems} items</span>
          <span className="text-xs opacity-80">·</span>
          <span className="font-bold">₹{total}</span>
        </motion.button>
      )}

      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </main>
  );
}
