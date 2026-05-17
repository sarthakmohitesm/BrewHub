export interface ITable {
  _id?: string;
  customerName: string;
  tableName: string;
  loginCode?: string;
  approved: boolean;
  active: boolean;
  createdAt?: Date;
}

export interface IMenuItem {
  _id?: string;
  title: string;
  price: number;
  category: 'coffee' | 'tea' | 'snacks' | 'desserts' | 'combos';
  image: string;
  description: string;
  popular?: boolean;
  prepTime?: number;
}

export interface IOrderItem {
  menuItem: IMenuItem;
  quantity: number;
}

export interface IOrder {
  _id?: string;
  tableName: string;
  customerName: string;
  items: IOrderItem[];
  totalPrice: number;
  status: 'pending' | 'accepted' | 'preparing' | 'completed' | 'rejected';
  createdAt?: Date;
}

export interface CartItem {
  menuItem: IMenuItem;
  quantity: number;
}
