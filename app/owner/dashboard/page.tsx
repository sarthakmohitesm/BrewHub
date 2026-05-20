'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  BarChart3,
  Bell,
  LogOut,
  Check,
  X,
  Copy,
  Clock,
  ChefHat,
  CheckCircle,
  XCircle,
  RefreshCw,
  TrendingUp,
  Coffee,
  DollarSign,
  Loader2,
  Utensils,
  Key,
  Timer,
  Trash2,
  User,
  Leaf,
  Heart,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { ITable, IOrder } from '@/types';

type Tab = 'sessions' | 'tables' | 'orders' | 'analytics';

/* ──────────── Sessions Tab ──────────── */
function SessionsTab() {
  const [code, setCode] = useState('------');
  const [remaining, setRemaining] = useState(60);
  const [sessions, setSessions] = useState<any[]>([]);

  const fetchCode = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/session-code');
      const data = await res.json();
      setCode(data.code);
      setRemaining(data.remainingSeconds);
      if (data.sessions) setSessions(data.sessions);
    } catch {
      /* silent */
    }
  }, []);

  useEffect(() => {
    fetchCode();
    const interval = setInterval(fetchCode, 3000);
    return () => clearInterval(interval);
  }, [fetchCode]);

  useEffect(() => {
    if (remaining <= 0) return;
    const t = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => clearInterval(t);
  }, [remaining]);

  const handleRemoveSession = async (sessionId: string) => {
    try {
      await fetch('/api/auth/session-code', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      });
      toast.success('Session removed');
      fetchCode();
    } catch {
      toast.error('Failed to remove session');
    }
  };

  const pct = Math.max(0, (remaining / 60) * 100);
  const circleCircumference = 2 * Math.PI * 60;
  const strokeDashoffset = circleCircumference - (pct / 100) * circleCircumference;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40, padding: '20px 0' }}>

      {/* Top Logo Section */}
      <div style={{ textAlign: 'center' }}>
        <Coffee style={{ width: 32, height: 32, color: '#c8a97e', margin: '0 auto 8px' }} />
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', letterSpacing: '0.2em', color: '#f5e6d0', fontWeight: 400, margin: 0 }}>CAFÉ</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 4 }}>
          <div style={{ height: 1, width: 40, background: 'rgba(200,169,126,0.3)' }} />
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: 'rgba(200,169,126,0.6)', textTransform: 'uppercase' }}>Good Coffee, Good Day</span>
          <div style={{ height: 1, width: 40, background: 'rgba(200,169,126,0.3)' }} />
        </div>
      </div>

      {/* Center Display (Code + Timer) */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24, width: '100%', maxWidth: 800 }}>

        {/* Code Box */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ flex: '1 1 400px', background: 'rgba(28,21,15,0.7)', border: '1px solid rgba(200,169,126,0.05)', borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <Leaf style={{ width: 14, height: 14, color: '#c8a97e', transform: 'rotate(-45deg)' }} />
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: '#c8a97e', fontWeight: 600 }}>YOUR CODE</span>
            <Leaf style={{ width: 14, height: 14, color: '#c8a97e', transform: 'rotate(135deg)' }} />
          </div>

          <div style={{ display: 'flex', gap: 12, letterSpacing: '0.15em', fontFamily: 'monospace', fontSize: '3.8rem', fontWeight: 700, color: '#f5e6d0', lineHeight: 1 }}>
            {code}
          </div>

          <Heart style={{ width: 14, height: 14, color: 'rgba(200,169,126,0.3)', marginTop: 24 }} />
        </motion.div>

        {/* Timer Box */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} style={{ width: 300, background: 'rgba(28,21,15,0.7)', border: '1px solid rgba(200,169,126,0.05)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
          <div style={{ position: 'relative', width: 140, height: 140, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="140" height="140" viewBox="0 0 140 140" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
              <circle cx="70" cy="70" r="60" fill="none" stroke="rgba(200,169,126,0.1)" strokeWidth="6" />
              <circle cx="70" cy="70" r="60" fill="none" stroke={remaining <= 10 ? '#f87171' : '#c8a97e'} strokeWidth="6" strokeDasharray={circleCircumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }} />
            </svg>
            <span style={{ fontSize: '2.5rem', fontWeight: 500, color: '#f5e6d0', lineHeight: 1, marginBottom: 4 }}>
              {remaining}
            </span>
            <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: 'rgba(245,230,208,0.4)' }}>SEC</span>
          </div>
        </motion.div>
      </div>

      {/* Queue Section */}
      <div style={{ width: '100%', maxWidth: 1000, marginTop: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 24 }}>
          <div style={{ height: 1, width: 60, background: 'rgba(200,169,126,0.2)' }} />
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.15em', color: '#c8a97e', fontWeight: 500 }}>CURRENT QUEUE</span>
          <div style={{ height: 1, width: 60, background: 'rgba(200,169,126,0.2)' }} />
        </div>

        <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 16, justifyContent: sessions.length < 6 ? 'center' : 'flex-start' }}>
          {sessions.length === 0 ? (
            <div style={{ color: 'rgba(245,230,208,0.3)', fontSize: '0.9rem', fontStyle: 'italic', width: '100%', textAlign: 'center', padding: '20px 0' }}>No active customers</div>
          ) : (
            sessions.map((session, idx) => {
              const tableNum = session.tableName.replace(/\D/g, '') || 'W/I';
              return (
                <motion.div key={session._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} style={{ flex: '0 0 auto', width: 140, background: 'rgba(28,21,15,0.7)', border: '1px solid rgba(200,169,126,0.05)', borderRadius: 12, padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
                  <button onClick={() => handleRemoveSession(session._id)} title="Remove Session" style={{ position: 'absolute', top: 8, right: 8, background: 'transparent', border: 'none', color: 'rgba(248,113,113,0.3)', cursor: 'pointer', opacity: 0.5 }}>
                    <Trash2 style={{ width: 14, height: 14 }} />
                  </button>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', border: '1px solid rgba(200,169,126,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                    <User style={{ width: 20, height: 20, color: 'rgba(200,169,126,0.5)' }} />
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#f5e6d0', marginBottom: 16, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>{session.customerName}</p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 12, width: '100%' }}>
                    <div style={{ flex: 1, height: 1, background: 'rgba(200,169,126,0.1)' }} />
                    <span style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: 'rgba(245,230,208,0.3)' }}>TABLE</span>
                    <div style={{ flex: 1, height: 1, background: 'rgba(200,169,126,0.1)' }} />
                  </div>

                  <span style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', color: '#f5e6d0' }}>{tableNum.length === 1 ? `0${tableNum}` : tableNum}</span>
                </motion.div>
              );
            })
          )}
        </div>
      </div>

      {/* Footer Message */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 40, opacity: 0.6 }}>
        <Coffee style={{ width: 14, height: 14, color: '#c8a97e' }} />
        <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: '#c8a97e', fontSize: '1.1rem' }}>Thank you for your patience!</span>
        <Coffee style={{ width: 14, height: 14, color: '#c8a97e' }} />
      </div>
    </div>
  );
}

/* ──────────── Tables Tab ──────────── */
function TablesTab() {
  const [tables, setTables] = useState<ITable[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTables = useCallback(async () => {
    try {
      const res = await fetch('/api/tables');
      const data = await res.json();
      setTables(data.tables || []);
    } catch {
      toast.error('Failed to fetch tables');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTables();
    const interval = setInterval(fetchTables, 5000);
    return () => clearInterval(interval);
  }, [fetchTables]);

  const handleAction = async (tableId: string, action: 'approve' | 'reject') => {
    try {
      const res = await fetch('/api/tables/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tableId, action }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      toast.success(
        action === 'approve'
          ? `Approved! Code: ${data.loginCode}`
          : 'Request rejected'
      );
      fetchTables();
    } catch {
      toast.error('Action failed');
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Code copied!');
  };

  const handleRemoveCustomer = async (tableId: string) => {
    if (!confirm('Remove this customer and free the table?')) return;
    try {
      const res = await fetch('/api/tables', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tableId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success(data.message || 'Customer removed!');
      fetchTables();
    } catch {
      toast.error('Failed to remove customer');
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 skeleton rounded-xl" />
        ))}
      </div>
    );
  }

  const pending = tables.filter((t) => !t.approved && t.active);
  const active = tables.filter((t) => t.approved && t.active);

  return (
    <div className="space-y-8">
      {/* Pending Requests */}
      <div>
        <h3 className="text-lg font-semibold text-brew-cream mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-brew-gold" />
          Pending Requests
          {pending.length > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-brew-gold/20 text-brew-gold text-xs font-bold">
              {pending.length}
            </span>
          )}
        </h3>
        {pending.length === 0 ? (
          <div style={{ background: 'rgba(28,21,15,0.7)', border: '1px solid rgba(200,169,126,0.05)', borderRadius: 16, padding: '80px 32px', textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', border: '1px solid rgba(200,169,126,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <CheckCircle style={{ width: 28, height: 28, color: 'rgba(200,169,126,0.3)' }} />
            </div>
            <p style={{ color: 'rgba(245,230,208,0.4)', fontSize: '0.9rem' }}>No pending requests</p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {pending.map((table) => (
                <motion.div
                  key={table._id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  style={{ background: 'rgba(28,21,15,0.7)', border: '1px solid rgba(200,169,126,0.05)', borderRadius: 16, padding: '20px', display: 'flex', flexDirection: 'column' }}
                  className="sm:flex-row items-start sm:items-center gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-brew-cream">{table.tableName}</span>
                      <span className="badge badge-pending">Pending</span>
                    </div>
                    <p className="text-sm text-brew-cream/50">
                      Customer: {table.customerName}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAction(table._id!, 'approve')}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brew-success/15 text-brew-success text-sm font-medium hover:bg-brew-success/25 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      Approve
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAction(table._id!, 'reject')}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brew-error/15 text-brew-error text-sm font-medium hover:bg-brew-error/25 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Reject
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Active Tables */}
      <div>
        <h3 className="text-lg font-semibold text-brew-cream mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-brew-info" />
          Active Tables
          <span className="px-2 py-0.5 rounded-full bg-brew-info/20 text-brew-info text-xs font-bold">
            {active.length}
          </span>
        </h3>
        {active.length === 0 ? (
          <div style={{ background: 'rgba(28,21,15,0.7)', border: '1px solid rgba(200,169,126,0.05)', borderRadius: 16, padding: '80px 32px', textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', border: '1px solid rgba(200,169,126,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Users style={{ width: 28, height: 28, color: 'rgba(200,169,126,0.3)' }} />
            </div>
            <p style={{ color: 'rgba(245,230,208,0.4)', fontSize: '0.9rem' }}>No active tables</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {active.map((table) => (
              <motion.div
                key={table._id}
                style={{ background: 'rgba(28,21,15,0.7)', border: '1px solid rgba(200,169,126,0.05)', borderRadius: 16, padding: '20px' }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-brew-cream">{table.tableName}</span>
                  <span className="badge badge-completed">Active</span>
                </div>
                <p className="text-sm text-brew-cream/50 mb-3">{table.customerName}</p>
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ flex: 1, padding: '8px 12px', borderRadius: 8, background: 'rgba(14,12,9,0.5)', border: '1px solid rgba(200,169,126,0.05)', fontFamily: 'monospace', color: '#c8a97e', fontSize: '0.875rem', letterSpacing: '0.05em' }}>
                    {table.loginCode}
                  </span>
                  <button
                    onClick={() => copyCode(table.loginCode!)}
                    style={{ padding: '8px', borderRadius: 8, background: 'rgba(14,12,9,0.5)', border: '1px solid rgba(200,169,126,0.05)', cursor: 'pointer' }}
                    className="hover:bg-brew-accent/10 transition-colors"
                  >
                    <Copy className="w-4 h-4 text-brew-accent" />
                  </button>
                </div>
                {/* Remove Customer Button */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleRemoveCustomer(table._id!)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    padding: '10px 16px',
                    borderRadius: 10,
                    background: 'rgba(248,113,113,0.08)',
                    border: '1px solid rgba(248,113,113,0.15)',
                    color: '#f87171',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    transition: 'all 0.2s',
                  }}
                  className="hover:bg-red-500/15"
                >
                  <Trash2 style={{ width: 14, height: 14 }} />
                  Remove Customer
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ──────────── Orders Tab ──────────── */
function OrdersTab() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchOrders = useCallback(async () => {
    try {
      const params = filter !== 'all' ? `?status=${filter}` : '';
      const res = await fetch(`/api/orders${params}`);
      const data = await res.json();
      setOrders(data.orders || []);
    } catch {
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  const updateStatus = async (orderId: string, status: string) => {
    try {
      const res = await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status }),
      });
      if (!res.ok) throw new Error();
      toast.success(`Order ${status}!`);
      fetchOrders();
    } catch {
      toast.error('Update failed');
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to delete this order?')) return;
    try {
      const res = await fetch('/api/orders', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success(data.message || 'Order deleted!');
      fetchOrders();
    } catch {
      toast.error('Failed to delete order');
    }
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'accepted': return <Check className="w-4 h-4" />;
      case 'preparing': return <ChefHat className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const filters = ['all', 'pending', 'accepted', 'preparing', 'completed'];

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${filter === f
                ? 'bg-brew-gold text-brew-dark'
                : 'glass text-brew-cream/60 hover:text-brew-cream'
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 skeleton rounded-xl" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div style={{ background: 'rgba(28,21,15,0.7)', border: '1px solid rgba(200,169,126,0.05)', borderRadius: 16, padding: '48px', textAlign: 'center' }}>
          <ShoppingBag className="w-12 h-12 mx-auto text-brew-cream/20 mb-4" />
          <p className="text-brew-cream/40">No orders found</p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {orders.map((order) => (
              <motion.div
                key={order._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ background: 'rgba(28,21,15,0.7)', border: '1px solid rgba(200,169,126,0.05)', borderRadius: 16, padding: '20px' }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-brew-cream">{order.tableName}</span>
                      <span className={`badge badge-${order.status} flex items-center gap-1`}>
                        {statusIcon(order.status)}
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-brew-cream/50">
                      {order.customerName} · {new Date(order.createdAt!).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-brew-gold">₹{order.totalPrice}</span>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteOrder(order._id!)}
                      title="Delete Order"
                      style={{
                        padding: '8px',
                        borderRadius: 8,
                        background: 'rgba(248,113,113,0.08)',
                        border: '1px solid rgba(248,113,113,0.15)',
                        cursor: 'pointer',
                        color: '#f87171',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s',
                      }}
                      className="hover:bg-red-500/20"
                    >
                      <Trash2 style={{ width: 16, height: 16 }} />
                    </motion.button>
                  </div>
                </div>

                {/* Items */}
                <div className="mb-4 space-y-2">
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      style={{ background: 'rgba(14,12,9,0.5)', border: '1px solid rgba(200,169,126,0.05)', borderRadius: 8, padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.875rem' }}
                    >
                      <span className="text-brew-cream/70">
                        {item.menuItem.title} × {item.quantity}
                      </span>
                      <span className="text-brew-accent">
                        ₹{item.menuItem.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                {order.status !== 'completed' && order.status !== 'rejected' && (
                  <div className="flex flex-wrap gap-2">
                    {order.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateStatus(order._id!, 'accepted')}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brew-info/15 text-brew-info text-sm hover:bg-brew-info/25 transition-colors"
                        >
                          <Check className="w-3 h-3" />
                          Accept
                        </button>
                        <button
                          onClick={() => updateStatus(order._id!, 'rejected')}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brew-error/15 text-brew-error text-sm hover:bg-brew-error/25 transition-colors"
                        >
                          <X className="w-3 h-3" />
                          Reject
                        </button>
                      </>
                    )}
                    {order.status === 'accepted' && (
                      <button
                        onClick={() => updateStatus(order._id!, 'preparing')}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/15 text-purple-400 text-sm hover:bg-purple-500/25 transition-colors"
                      >
                        <ChefHat className="w-3 h-3" />
                        Start Preparing
                      </button>
                    )}
                    {order.status === 'preparing' && (
                      <button
                        onClick={() => updateStatus(order._id!, 'completed')}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brew-success/15 text-brew-success text-sm hover:bg-brew-success/25 transition-colors"
                      >
                        <CheckCircle className="w-3 h-3" />
                        Mark Completed
                      </button>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

/* ──────────── Analytics Tab ──────────── */
interface AnalyticsData {
  totalOrders: number;
  activeTables: number;
  pendingRequests: number;
  totalRevenue: number;
  totalMenuItems: number;
  popularDishes: { _id: string; count: number; revenue: number }[];
  ordersByStatus: { _id: string; count: number }[];
}

function AnalyticsTab() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch('/api/analytics');
        const json = await res.json();
        setData(json);
      } catch {
        toast.error('Failed to load analytics');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading || !data) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 skeleton rounded-xl" />
        ))}
      </div>
    );
  }

  const stats = [
    { icon: ShoppingBag, label: 'Total Orders', value: data.totalOrders, color: 'text-brew-gold' },
    { icon: Users, label: 'Active Tables', value: data.activeTables, color: 'text-brew-info' },
    { icon: DollarSign, label: 'Revenue', value: `₹${data.totalRevenue.toLocaleString()}`, color: 'text-brew-success' },
    { icon: Utensils, label: 'Menu Items', value: data.totalMenuItems, color: 'text-purple-400' },
  ];

  const statColors: Record<string, string> = {
    'Total Orders': 'rgba(212,168,83,0.12)',
    'Active Tables': 'rgba(96,165,250,0.12)',
    'Revenue': 'rgba(74,222,128,0.12)',
    'Menu Items': 'rgba(167,139,250,0.12)',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            style={{ background: 'rgba(28,21,15,0.7)', border: '1px solid rgba(200,169,126,0.05)', borderRadius: 16, padding: '22px 24px', position: 'relative', overflow: 'hidden' }}
          >
            <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: statColors[stat.label] || 'rgba(212,168,83,0.08)', pointerEvents: 'none' }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, position: 'relative' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: statColors[stat.label] || 'rgba(212,168,83,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <stat.icon className={stat.color} style={{ width: 20, height: 20 }} />
              </div>
              <TrendingUp style={{ width: 14, height: 14, color: 'rgba(74,222,128,0.4)' }} />
            </div>
            <p style={{ fontSize: '1.6rem', fontWeight: 700, color: '#f5e6d0', lineHeight: 1, position: 'relative' }}>{stat.value}</p>
            <p style={{ fontSize: '0.75rem', color: 'rgba(245,230,208,0.35)', marginTop: 6, position: 'relative' }}>{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Dishes */}
        <div style={{ background: 'rgba(28,21,15,0.7)', border: '1px solid rgba(200,169,126,0.05)', borderRadius: 16, padding: '24px' }}>
          <h3 className="text-lg font-semibold text-brew-cream mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-brew-gold" />
            Popular Dishes
          </h3>
          <div className="space-y-3">
            {data.popularDishes.map((dish, i) => (
              <div
                key={dish._id}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px', borderRadius: 12, background: 'rgba(14,12,9,0.5)', border: '1px solid rgba(200,169,126,0.05)' }}
              >
                <span className="w-8 h-8 rounded-lg bg-brew-gold/10 flex items-center justify-center text-brew-gold font-bold text-sm">
                  #{i + 1}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-brew-cream">{dish._id}</p>
                  <p className="text-xs text-brew-cream/40">{dish.count} orders</p>
                </div>
                <span className="text-sm font-semibold text-brew-gold">₹{dish.revenue}</span>
              </div>
            ))}
            {data.popularDishes.length === 0 && (
              <p className="text-brew-cream/40 text-sm text-center py-4">No data yet</p>
            )}
          </div>
        </div>

        {/* Orders by Status */}
        <div style={{ background: 'rgba(28,21,15,0.7)', border: '1px solid rgba(200,169,126,0.05)', borderRadius: 16, padding: '24px' }}>
          <h3 className="text-lg font-semibold text-brew-cream mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-brew-info" />
            Orders by Status
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {/* Doughnut Chart Mock */}
            <div style={{ position: 'relative', width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="120" height="120" viewBox="0 0 120 120" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
                <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(200,169,126,0.1)" strokeWidth="12" />
                <circle cx="60" cy="60" r="50" fill="none" stroke="#d4a853" strokeWidth="12" strokeDasharray={2 * Math.PI * 50} strokeDashoffset={(2 * Math.PI * 50) * 0.25} strokeLinecap="round" />
              </svg>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f5e6d0', lineHeight: 1, display: 'block' }}>{data.totalOrders}</span>
                <span style={{ fontSize: '0.7rem', color: 'rgba(245,230,208,0.4)' }}>Total</span>
              </div>
            </div>

            {/* Legend */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {data.ordersByStatus.map((s, idx) => {
                const colors = ['#d4a853', '#4ade80', '#60a5fa', '#a78bfa', '#f87171'];
                const color = colors[idx % colors.length];
                const percentage = data.totalOrders > 0 ? Math.round((s.count / data.totalOrders) * 100) : 0;

                return (
                  <div key={s._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
                      <span style={{ fontSize: '0.85rem', color: '#f5e6d0', textTransform: 'capitalize' }}>{s._id}</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'rgba(245,230,208,0.6)' }}>
                      <span style={{ color: '#f5e6d0', fontWeight: 500 }}>{s.count}</span> ({percentage}%)
                    </div>
                  </div>
                );
              })}
              {data.ordersByStatus.length === 0 && (
                <p className="text-brew-cream/40 text-sm py-4">No data yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────── Dashboard Layout ──────────── */
export default function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('sessions');
  const [seeding, setSeeding] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('ownerToken');
    if (!token) {
      router.push('/owner/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('ownerToken');
    toast.success('Logged out');
    router.push('/owner/login');
  };

  const handleSeed = async () => {
    setSeeding(true);
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      const data = await res.json();
      toast.success(data.message);
    } catch {
      toast.error('Seed failed');
    } finally {
      setSeeding(false);
    }
  };

  const tabs = [
    { id: 'sessions' as Tab, label: 'Sessions', icon: Key },
    { id: 'tables' as Tab, label: 'Tables', icon: Users },
    { id: 'orders' as Tab, label: 'Orders', icon: ShoppingBag },
    { id: 'analytics' as Tab, label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <main style={{ minHeight: '100vh', display: 'flex', backgroundColor: '#120d0a', paddingTop: 80 }}>
      {/* Sidebar */}
      <div style={{ width: 260, borderRight: '1px solid rgba(200,169,126,0.1)', display: 'flex', flexDirection: 'column', padding: '32px 24px', background: 'rgba(18,13,10,0.8)', zIndex: 10 }}>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderRadius: 12, fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.3s', fontFamily: 'inherit',
                ...(activeTab === tab.id
                  ? { background: 'rgba(200,169,126,0.1)', color: '#c8a97e', border: '1px solid rgba(200,169,126,0.2)' }
                  : { background: 'transparent', color: 'rgba(245,230,208,0.5)', border: 'none' })
              }}
            >
              <tab.icon style={{ width: 18, height: 18, color: activeTab === tab.id ? '#c8a97e' : 'inherit' }} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Footer Actions in Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 'auto' }}>
          <button onClick={handleSeed} disabled={seeding} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 20px', borderRadius: 12, background: 'transparent', border: '1px solid rgba(200,169,126,0.15)', color: '#c8a97e', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', opacity: seeding ? 0.5 : 1, fontFamily: 'inherit' }}>
            {seeding ? <Loader2 style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }} /> : <Coffee style={{ width: 16, height: 16 }} />}
            Seed Menu
          </button>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 20px', borderRadius: 12, background: 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.15)', color: '#f87171', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
            <LogOut style={{ width: 16, height: 16 }} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '40px 60px', overflowY: 'auto', position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            style={{ maxWidth: 1200, margin: '0 auto' }}
          >
            {/* Header for the current tab (except sessions) */}
            {activeTab !== 'sessions' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
                {tabs.map((t) => t.id === activeTab && (
                  <React.Fragment key={t.id}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(200,169,126,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(200,169,126,0.2)' }}>
                      <t.icon style={{ width: 22, height: 22, color: '#c8a97e' }} />
                    </div>
                    <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#f5e6d0', margin: 0, fontWeight: 500 }}>{t.label}</h1>
                  </React.Fragment>
                ))}
              </div>
            )}

            {activeTab === 'sessions' && <SessionsTab />}
            {activeTab === 'tables' && <TablesTab />}
            {activeTab === 'orders' && <OrdersTab />}
            {activeTab === 'analytics' && <AnalyticsTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
