'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Mail, Lock, ArrowRight, Shield, Loader2, Coffee } from 'lucide-react';
import toast from 'react-hot-toast';

const BG_IMG = 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1800&q=85&auto=format&fit=crop';

export default function OwnerLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) { toast.error('Please fill in all fields'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/owner', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || 'Invalid credentials'); return; }
      localStorage.setItem('ownerToken', data.token);
      toast.success('Welcome, Owner!');
      router.push('/owner/dashboard');
    } catch { toast.error('Something went wrong'); }
    finally { setLoading(false); }
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Background */}
      <Image src={BG_IMG} alt="" fill priority style={{ objectFit: 'cover', objectPosition: 'center' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(8,6,4,0.92) 0%, rgba(8,6,4,0.8) 50%, rgba(8,6,4,0.7) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 30%, rgba(212,168,83,0.06), transparent 70%)' }} />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 420, padding: '0 20px' }}
      >
        {/* Glass card */}
        <div style={{
          background: 'rgba(14, 12, 9, 0.55)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          border: '1px solid rgba(200,169,126,0.12)',
          borderRadius: 28,
          padding: '44px 36px',
          boxShadow: '0 24px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(200,169,126,0.06)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Subtle inner glow */}
          <div style={{ position: 'absolute', top: -60, right: -60, width: 160, height: 160, background: 'radial-gradient(circle, rgba(212,168,83,0.08), transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -40, left: -40, width: 120, height: 120, background: 'radial-gradient(circle, rgba(200,169,126,0.05), transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <motion.div
                animate={{ y: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                style={{
                  width: 64, height: 64, margin: '0 auto 20px',
                  borderRadius: 18,
                  background: 'linear-gradient(135deg, #c8a97e, #d4a853)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(212,168,83,0.25)',
                }}
              >
                <Shield style={{ width: 28, height: 28, color: '#080604' }} />
              </motion.div>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 700, color: '#f5e6d0', marginBottom: 8, letterSpacing: '-0.01em' }}>
                Owner Dashboard
              </h1>
              <p style={{ fontSize: '0.82rem', color: 'rgba(245,230,208,0.4)', lineHeight: 1.6 }}>
                Secure access to manage your café
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '0.78rem', fontWeight: 500, color: 'rgba(245,230,208,0.5)', marginBottom: 10 }}>
                  <Mail style={{ width: 14, height: 14, color: 'rgba(200,169,126,0.5)' }} /> Email
                </label>
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="owner@brewhub.com" id="owner-email"
                  style={{
                    width: '100%', padding: '14px 16px', borderRadius: 14,
                    background: 'rgba(20,16,12,0.5)',
                    border: '1.5px solid rgba(200,169,126,0.1)',
                    color: '#f5e6d0', fontSize: '0.88rem',
                    outline: 'none', fontFamily: 'inherit',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'rgba(200,169,126,0.35)'; e.target.style.boxShadow = '0 0 0 3px rgba(200,169,126,0.06)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(200,169,126,0.1)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>

              <div style={{ marginBottom: 28 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '0.78rem', fontWeight: 500, color: 'rgba(245,230,208,0.5)', marginBottom: 10 }}>
                  <Lock style={{ width: 14, height: 14, color: 'rgba(200,169,126,0.5)' }} /> Password
                </label>
                <input
                  type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password" id="owner-password"
                  style={{
                    width: '100%', padding: '14px 16px', borderRadius: 14,
                    background: 'rgba(20,16,12,0.5)',
                    border: '1.5px solid rgba(200,169,126,0.1)',
                    color: '#f5e6d0', fontSize: '0.88rem',
                    outline: 'none', fontFamily: 'inherit',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'rgba(200,169,126,0.35)'; e.target.style.boxShadow = '0 0 0 3px rgba(200,169,126,0.06)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(200,169,126,0.1)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>

              <motion.button
                type="submit" disabled={loading}
                whileTap={{ scale: 0.97 }}
                style={{
                  width: '100%', padding: '15px 0', borderRadius: 14, border: 'none', cursor: 'pointer',
                  background: 'linear-gradient(135deg, #c8a97e, #d4a853)',
                  color: '#080604', fontWeight: 600, fontSize: '0.9rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: '0 4px 20px rgba(212,168,83,0.25)',
                  transition: 'box-shadow 0.3s, transform 0.3s',
                  opacity: loading ? 0.6 : 1,
                  fontFamily: 'inherit',
                }}
              >
                {loading ? <><Loader2 style={{ width: 18, height: 18, animation: 'spin 1s linear infinite' }} /> Authenticating...</> : <>Access Dashboard <ArrowRight style={{ width: 16, height: 16 }} /></>}
              </motion.button>
            </form>

            {/* Footer */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 28, paddingTop: 20, borderTop: '1px solid rgba(200,169,126,0.06)' }}>
              <Coffee style={{ width: 14, height: 14, color: 'rgba(200,169,126,0.25)' }} />
              <span style={{ fontSize: '0.7rem', color: 'rgba(245,230,208,0.2)' }}>BrewHub Café · Karjat</span>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
