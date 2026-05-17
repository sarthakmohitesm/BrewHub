import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import Table from '@/models/Table';
import MenuItem from '@/models/MenuItem';

export async function GET() {
  try {
    await connectDB();

    const totalOrders = await Order.countDocuments();
    const activeTables = await Table.countDocuments({ active: true, approved: true });
    const pendingRequests = await Table.countDocuments({ approved: false, active: true });

    const revenueResult = await Order.aggregate([
      { $match: { status: { $ne: 'rejected' } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;

    const popularDishes = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.menuItem.title',
          count: { $sum: '$items.quantity' },
          revenue: {
            $sum: { $multiply: ['$items.menuItem.price', '$items.quantity'] },
          },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(10);

    const totalMenuItems = await MenuItem.countDocuments();

    const ordersByStatus = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    return Response.json({
      totalOrders,
      activeTables,
      pendingRequests,
      totalRevenue,
      popularDishes,
      recentOrders,
      totalMenuItems,
      ordersByStatus,
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
