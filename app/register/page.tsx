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
            {!submitted ? (
              <>
                <div className="text-center mb-8">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-brew-accent to-brew-gold flex items-center justify-center"
                  >
                    <Coffee className="w-8 h-8 text-brew-dark" />
                  </motion.div>
                  <h1 className="text-2xl font-bold font-[family-name:var(--font-serif)] text-brew-cream mb-2">
                    Register Your Table
                  </h1>
                  <p className="text-sm text-brew-cream/50">
                    Enter your details to get started with your café experience
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-brew-cream/70 mb-2">
                      <Users className="w-4 h-4 inline mr-2" />
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
                    <label className="block text-sm font-medium text-brew-cream/70 mb-2">
                      <Hash className="w-4 h-4 inline mr-2" />
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
                    className="btn-primary w-full flex items-center justify-center gap-2 text-base disabled:opacity-50"
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
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-brew-success/10 flex items-center justify-center"
                >
                  <CheckCircle className="w-10 h-10 text-brew-success" />
                </motion.div>
                <h2 className="text-xl font-bold text-brew-cream mb-2">
                  Request Sent!
                </h2>
                <p className="text-sm text-brew-cream/50 mb-6">
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
