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
    <main className="min-h-screen flex items-center justify-center px-4 pt-24 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md"
      >
        <div className="glass-card rounded-3xl p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brew-gold/5 via-transparent to-brew-accent/3" />

          <div className="relative">
            <div className="text-center mb-8">
              <motion.div
                animate={{ y: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-brew-accent to-brew-gold flex items-center justify-center"
              >
                <Coffee className="w-8 h-8 text-brew-dark" />
              </motion.div>
              <h1 className="text-2xl font-bold font-[family-name:var(--font-serif)] text-brew-cream mb-2">
                Welcome Back
              </h1>
              <p className="text-sm text-brew-cream/50">
                Enter your table details and login code to access the menu
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-brew-cream/70 mb-2">
                  <Hash className="w-4 h-4 inline mr-2" />
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
                <label className="block text-sm font-medium text-brew-cream/70 mb-2">
                  <Key className="w-4 h-4 inline mr-2" />
                  Login Code
                </label>
                <input
                  type="text"
                  value={loginCode}
                  onChange={(e) => setLoginCode(e.target.value.toUpperCase())}
                  placeholder="Enter your login code"
                  className="input-brew font-mono tracking-widest"
                  id="login-code"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 text-base disabled:opacity-50"
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

            <p className="text-center text-xs text-brew-cream/30 mt-6">
              Don&apos;t have a code?{' '}
              <a href="/register" className="text-brew-accent hover:text-brew-gold transition-colors">
                Register your table
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
