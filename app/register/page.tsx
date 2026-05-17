'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Hash, ArrowRight, Coffee, CheckCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [customerName, setCustomerName] = useState('');
  const [tableName, setTableName] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !tableName.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/tables', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerName, tableName }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || 'Failed to register');
        return;
      }

      toast.success('Registration request sent!');
      setSubmitted(true);
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
          {/* Decorative gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-brew-gold/[0.04] via-transparent to-brew-accent/[0.02] pointer-events-none" />
          <div className="absolute -top-16 -right-16 w-40 h-40 bg-brew-gold/[0.06] rounded-full blur-[60px] pointer-events-none" />

          <div className="relative">
            {!submitted ? (
              <>
                <div className="text-center mb-9">
                  <motion.div
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                    className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-brew-accent to-brew-gold flex items-center justify-center shadow-lg shadow-brew-gold/20"
                  >
                    <Coffee className="w-7 h-7 text-brew-dark" />
                  </motion.div>
                  <h1 className="text-2xl font-bold font-[family-name:var(--font-serif)] text-brew-cream mb-2 tracking-tight">
                    Register Your Table
                  </h1>
                  <p className="text-sm text-brew-cream/45">
                    Enter your details to get started with your café experience
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-brew-cream/60 mb-2.5">
                      <Users className="w-4 h-4 text-brew-accent/60" />
                      Customer Name
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Enter your name"
                      className="input-brew"
                      id="customer-name"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-brew-cream/60 mb-2.5">
                      <Hash className="w-4 h-4 text-brew-accent/60" />
                      Table Name / Number
                    </label>
                    <input
                      type="text"
                      value={tableName}
                      onChange={(e) => setTableName(e.target.value)}
                      placeholder="e.g., Table 5 or Window Seat"
                      className="input-brew"
                      id="table-name"
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
                        Sending...
                      </>
                    ) : (
                      <>
                        Request Login Code
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                <p className="text-center text-xs text-brew-cream/25 mt-6">
                  Already have a code?{' '}
                  <a href="/login" className="text-brew-accent/60 hover:text-brew-gold transition-colors">
                    Login here
                  </a>
                </p>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-brew-success/10 flex items-center justify-center border border-brew-success/20"
                >
                  <CheckCircle className="w-10 h-10 text-brew-success" />
                </motion.div>
                <h2 className="text-xl font-bold text-brew-cream mb-3">
                  Request Sent!
                </h2>
                <p className="text-sm text-brew-cream/45 mb-8 leading-relaxed">
                  Your table registration for <strong className="text-brew-gold">{tableName}</strong> has been sent.
                  The owner will generate a login code for you shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setCustomerName('');
                    setTableName('');
                  }}
                  className="btn-outline text-sm"
                >
                  Register Another Table
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </main>
  );
}
