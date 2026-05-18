'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { User, Key, ArrowRight, Coffee, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCartStore } from '@/store/cartStore';

const BG_IMG = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1800&q=85&auto=format&fit=crop';

export default function LoginPage() {
  const [customerName, setCustomerName] = useState('');
  const [code, setCode] = useState('');
  const [tableName, setTableName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setCustomerInfo = useCartStore((s) => s.setCustomerInfo);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !code.trim()) {
      toast.error('Please enter your name and the café code');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/session-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, customerName, tableName: tableName || 'Walk-in' }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || 'Invalid code');
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

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '14px 16px', borderRadius: 14,
    background: 'rgba(20,16,12,0.5)',
    border: '1.5px solid rgba(200,169,126,0.1)',
    color: '#f5e6d0', fontSize: '0.88rem',
    outline: 'none', fontFamily: 'inherit',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = 'rgba(200,169,126,0.35)';
    e.target.style.boxShadow = '0 0 0 3px rgba(200,169,126,0.06)';
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = 'rgba(200,169,126,0.1)';
    e.target.style.boxShadow = 'none';
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Background */}
      <Image src={BG_IMG} alt="" fill priority style={{ objectFit: 'cover', objectPosition: 'center' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(8,6,4,0.92) 0%, rgba(8,6,4,0.78) 50%, rgba(8,6,4,0.65) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 40%, rgba(212,168,83,0.05), transparent 65%)' }} />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 420, padding: '0 20px' }}
      >
        <div style={{
          background: 'rgba(14, 12, 9, 0.55)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          border: '1px solid rgba(200,169,126,0.12)',
          borderRadius: 28,
          padding: '44px 36px',
          boxShadow: '0 24px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(200,169,126,0.06)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Inner glows */}
          <div style={{ position: 'absolute', top: -50, left: '50%', transform: 'translateX(-50%)', width: 200, height: 120, background: 'radial-gradient(ellipse, rgba(212,168,83,0.07), transparent 70%)', pointerEvents: 'none' }} />

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
                <Coffee style={{ width: 26, height: 26, color: '#080604' }} />
              </motion.div>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 700, color: '#f5e6d0', marginBottom: 8, letterSpacing: '-0.01em' }}>
                Welcome to BrewHub
              </h1>
              <p style={{ fontSize: '0.82rem', color: 'rgba(245,230,208,0.4)', lineHeight: 1.6 }}>
                Enter your name and the code displayed at the café
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Customer Name */}
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '0.78rem', fontWeight: 500, color: 'rgba(245,230,208,0.5)', marginBottom: 10 }}>
                  <User style={{ width: 14, height: 14, color: 'rgba(200,169,126,0.5)' }} /> Your Name
                </label>
                <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g., Rahul" id="login-name" style={inputStyle}
                  onFocus={handleFocus} onBlur={handleBlur} />
              </div>

              {/* Session Code */}
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '0.78rem', fontWeight: 500, color: 'rgba(245,230,208,0.5)', marginBottom: 10 }}>
                  <Key style={{ width: 14, height: 14, color: 'rgba(200,169,126,0.5)' }} /> Café Code
                </label>
                <input type="text" value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="6-digit code from café" id="login-code" maxLength={6}
                  style={{ ...inputStyle, fontFamily: 'monospace', letterSpacing: '0.25em', textAlign: 'center', fontSize: '1.1rem', fontWeight: 600 }}
                  onFocus={handleFocus} onBlur={handleBlur} />
                <p style={{ fontSize: '0.68rem', color: 'rgba(245,230,208,0.2)', marginTop: 6, textAlign: 'center' }}>
                  Ask the café staff for the current code
                </p>
              </div>

              {/* Table (optional) */}
              <div style={{ marginBottom: 28 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '0.78rem', fontWeight: 500, color: 'rgba(245,230,208,0.5)', marginBottom: 10 }}>
                  Table <span style={{ fontSize: '0.68rem', color: 'rgba(245,230,208,0.25)' }}>(optional)</span>
                </label>
                <input type="text" value={tableName} onChange={(e) => setTableName(e.target.value)}
                  placeholder="e.g., Table 5" id="login-table" style={inputStyle}
                  onFocus={handleFocus} onBlur={handleBlur} />
              </div>

              <motion.button type="submit" disabled={loading} whileTap={{ scale: 0.97 }}
                style={{
                  width: '100%', padding: '15px 0', borderRadius: 14, border: 'none', cursor: 'pointer',
                  background: 'linear-gradient(135deg, #c8a97e, #d4a853)',
                  color: '#080604', fontWeight: 600, fontSize: '0.9rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: '0 4px 20px rgba(212,168,83,0.25)',
                  transition: 'box-shadow 0.3s', opacity: loading ? 0.6 : 1, fontFamily: 'inherit',
                }}>
                {loading ? <><Loader2 style={{ width: 18, height: 18, animation: 'spin 1s linear infinite' }} /> Verifying...</> : <>Enter BrewHub <ArrowRight style={{ width: 16, height: 16 }} /></>}
              </motion.button>
            </form>

            {/* Footer */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(200,169,126,0.06)' }}>
              <Coffee style={{ width: 12, height: 12, color: 'rgba(200,169,126,0.2)' }} />
              <span style={{ fontSize: '0.65rem', color: 'rgba(245,230,208,0.18)' }}>BrewHub Café · Karjat</span>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
