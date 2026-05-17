import { create } from 'zustand';
import { CartItem, IMenuItem } from '@/types';

interface CartStore {
  items: CartItem[];
  customerName: string;
  tableName: string;
  setCustomerInfo: (name: string, table: string) => void;
  addItem: (menuItem: IMenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  customerName: '',
  tableName: '',

  setCustomerInfo: (name, table) => set({ customerName: name, tableName: table }),

  addItem: (menuItem) =>
    set((state) => {
      const existing = state.items.find((i) => i.menuItem._id === menuItem._id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.menuItem._id === menuItem._id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { items: [...state.items, { menuItem, quantity: 1 }] };
    }),

  removeItem: (itemId) =>
    set((state) => ({
      items: state.items.filter((i) => i.menuItem._id !== itemId),
    })),

  updateQuantity: (itemId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return { items: state.items.filter((i) => i.menuItem._id !== itemId) };
      }
      return {
        items: state.items.map((i) =>
          i.menuItem._id === itemId ? { ...i, quantity } : i
        ),
      };
    }),

  clearCart: () => set({ items: [] }),

  getTotal: () => {
    const { items } = get();
    return items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  },

  getTotalItems: () => {
    const { items } = get();
    return items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));
