'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Hash, Key, ArrowRight, Coffee, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCartStore } from '@/store/cartStore';

export default function LoginPage() {
  const [tableName, setTableName] = useState('');
  const [loginCode, setLoginCode] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setCustomerInfo = useCartStore((s) => s.setCustomerInfo);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tableName.trim() || !loginCode.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tableName, loginCode }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || 'Invalid credentials');
        return;
      }

      toast.success('Welcome to BrewHub!');
      setCustomerInfo(data.customerName, data.tableName);
      router.push('/menu');
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 pt-28 pb-16">
      {/* Ambient glow */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brew-gold/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative"
      >
        <div className="glass-card rounded-3xl p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brew-gold/[0.04] via-transparent to-brew-accent/[0.02] pointer-events-none" />
          <div className="absolute -top-16 -right-16 w-40 h-40 bg-brew-gold/[0.06] rounded-full blur-[60px] pointer-events-none" />

          <div className="relative">
            <div className="text-center mb-9">
              <motion.div
                animate={{ y: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-brew-accent to-brew-gold flex items-center justify-center shadow-lg shadow-brew-gold/20"
              >
                <Coffee className="w-7 h-7 text-brew-dark" />
              </motion.div>
              <h1 className="text-2xl font-bold font-[family-name:var(--font-serif)] text-brew-cream mb-2 tracking-tight">
                Welcome Back
              </h1>
              <p className="text-sm text-brew-cream/45">
                Enter your table details and login code to access the menu
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-brew-cream/60 mb-2.5">
                  <Hash className="w-4 h-4 text-brew-accent/60" />
                  Table Name / Number
                </label>
                <input
                  type="text"
                  value={tableName}
                  onChange={(e) => setTableName(e.target.value)}
                  placeholder="e.g., Table 5"
                  className="input-brew"
                  id="login-table-name"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-brew-cream/60 mb-2.5">
                  <Key className="w-4 h-4 text-brew-accent/60" />
                  Login Code
                </label>
                <input
                  type="text"
                  value={loginCode}
                  onChange={(e) => setLoginCode(e.target.value.toUpperCase())}
                  placeholder="Enter your login code"
                  className="input-brew font-mono tracking-[0.2em]"
                  id="login-code"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2.5 disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    Access Menu
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-xs text-brew-cream/25 mt-6">
              Don&apos;t have a code?{' '}
              <a href="/register" className="text-brew-accent/60 hover:text-brew-gold transition-colors">
                Register your table
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
