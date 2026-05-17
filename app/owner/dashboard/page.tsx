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
} from 'lucide-react';
import toast from 'react-hot-toast';
import { ITable, IOrder } from '@/types';

type Tab = 'tables' | 'orders' | 'analytics';

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
          <div className="glass-card rounded-xl p-8 text-center">
            <CheckCircle className="w-10 h-10 mx-auto text-brew-success/40 mb-3" />
            <p className="text-brew-cream/40 text-sm">No pending requests</p>
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
                  className="glass-card rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
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
          <div className="glass-card rounded-xl p-8 text-center">
            <Users className="w-10 h-10 mx-auto text-brew-cream/20 mb-3" />
            <p className="text-brew-cream/40 text-sm">No active tables</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {active.map((table) => (
              <motion.div
                key={table._id}
                className="glass-card rounded-xl p-5"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-brew-cream">{table.tableName}</span>
                  <span className="badge badge-completed">Active</span>
                </div>
                <p className="text-sm text-brew-cream/50 mb-3">{table.customerName}</p>
                <div className="flex items-center gap-2">
                  <span className="flex-1 px-3 py-2 rounded-lg glass font-mono text-brew-gold text-sm tracking-wider">
                    {table.loginCode}
                  </span>
                  <button
                    onClick={() => copyCode(table.loginCode!)}
                    className="p-2 rounded-lg glass hover:bg-brew-accent/10 transition-colors"
                  >
                    <Copy className="w-4 h-4 text-brew-accent" />
                  </button>
                </div>
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
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              filter === f
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
        <div className="glass-card rounded-xl p-12 text-center">
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
                className="glass-card rounded-xl p-5"
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
                  <span className="text-xl font-bold text-brew-gold">₹{order.totalPrice}</span>
                </div>

                {/* Items */}
                <div className="mb-4 space-y-2">
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-sm px-3 py-2 rounded-lg glass"
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

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
              <TrendingUp className="w-4 h-4 text-brew-success/50" />
            </div>
            <p className="text-2xl font-bold text-brew-cream">{stat.value}</p>
            <p className="text-sm text-brew-cream/40 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Dishes */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-brew-cream mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-brew-gold" />
            Popular Dishes
          </h3>
          <div className="space-y-3">
            {data.popularDishes.map((dish, i) => (
              <div
                key={dish._id}
                className="flex items-center gap-3 p-3 rounded-lg glass"
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
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-brew-cream mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-brew-info" />
            Orders by Status
          </h3>
          <div className="space-y-3">
            {data.ordersByStatus.map((s) => (
              <div key={s._id} className="flex items-center gap-3">
                <span className={`badge badge-${s._id} capitalize flex-shrink-0`}>
                  {s._id}
                </span>
                <div className="flex-1 h-2 rounded-full bg-brew-medium overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.min(
                        (s.count / Math.max(data.totalOrders, 1)) * 100,
                        100
                      )}%`,
                    }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full rounded-full bg-gradient-to-r from-brew-accent to-brew-gold"
                  />
                </div>
                <span className="text-sm font-semibold text-brew-cream w-8 text-right">
                  {s.count}
                </span>
              </div>
            ))}
            {data.ordersByStatus.length === 0 && (
              <p className="text-brew-cream/40 text-sm text-center py-4">No data yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────── Dashboard Layout ──────────── */
export default function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('tables');
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
    { id: 'tables' as Tab, label: 'Tables', icon: Users },
    { id: 'orders' as Tab, label: 'Orders', icon: ShoppingBag },
    { id: 'analytics' as Tab, label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <main className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold font-[family-name:var(--font-serif)] text-brew-cream flex items-center gap-3">
              <LayoutDashboard className="w-8 h-8 text-brew-gold" />
              Dashboard
            </h1>
            <p className="text-brew-cream/50 text-sm mt-1">
              Manage your café operations
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="btn-outline text-sm flex items-center gap-2 py-2 px-4 disabled:opacity-50"
            >
              {seeding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Coffee className="w-4 h-4" />}
              Seed Menu
            </button>
            <button
              onClick={() => window.location.reload()}
              className="p-2 rounded-lg glass hover:bg-brew-accent/10 transition-colors"
            >
              <RefreshCw className="w-4 h-4 text-brew-accent" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brew-error/15 text-brew-error text-sm hover:bg-brew-error/25 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-brew-gold text-brew-dark shadow-lg shadow-brew-gold/20'
                  : 'glass text-brew-cream/60 hover:text-brew-cream'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'tables' && <TablesTab />}
            {activeTab === 'orders' && <OrdersTab />}
            {activeTab === 'analytics' && <AnalyticsTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
