import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import DashboardLayout from '../../../../components/DashboardLayout';

type OrderStatus = 'all' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface OrderItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  statusColor: string;
  total: number;
  items: OrderItem[];
  trackingNumber?: string;
}

const OrderList = () => {
  const [activeFilter, setActiveFilter] = useState<OrderStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample orders data
  const orders: Order[] = [
    {
      id: 'ORD-2024-001',
      date: 'January 10, 2024',
      status: 'Delivered',
      statusColor: 'bg-green-100 text-green-700',
      total: 1299.00,
      items: [
        { id: '1', name: 'Modern Leather Sofa', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop', quantity: 1, price: 899.00 },
        { id: '2', name: 'Oak Coffee Table', image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=100&h=100&fit=crop', quantity: 1, price: 249.00 },
        { id: '3', name: 'Floor Lamp', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=100&h=100&fit=crop', quantity: 1, price: 151.00 },
      ],
      trackingNumber: 'TRK123456789',
    },
    {
      id: 'ORD-2024-002',
      date: 'January 8, 2024',
      status: 'Shipped',
      statusColor: 'bg-blue-100 text-blue-700',
      total: 899.00,
      items: [
        { id: '4', name: 'Velvet Armchair', image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=100&h=100&fit=crop', quantity: 2, price: 449.50 },
      ],
      trackingNumber: 'TRK987654321',
    },
    {
      id: 'ORD-2024-003',
      date: 'January 5, 2024',
      status: 'Processing',
      statusColor: 'bg-amber-100 text-amber-700',
      total: 549.00,
      items: [
        { id: '5', name: 'Wooden Dining Table', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=100&h=100&fit=crop', quantity: 1, price: 549.00 },
      ],
    },
    {
      id: 'ORD-2024-004',
      date: 'December 28, 2023',
      status: 'Delivered',
      statusColor: 'bg-green-100 text-green-700',
      total: 1750.00,
      items: [
        { id: '6', name: 'King Size Bed Frame', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=100&h=100&fit=crop', quantity: 1, price: 1299.00 },
        { id: '7', name: 'Bedside Table Set', image: 'https://images.unsplash.com/photo-1499933374294-4584851497cc?w=100&h=100&fit=crop', quantity: 2, price: 225.50 },
      ],
      trackingNumber: 'TRK456789123',
    },
    {
      id: 'ORD-2024-005',
      date: 'December 20, 2023',
      status: 'Cancelled',
      statusColor: 'bg-red-100 text-red-700',
      total: 399.00,
      items: [
        { id: '8', name: 'Office Chair', image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=100&h=100&fit=crop', quantity: 1, price: 399.00 },
      ],
    },
  ];

  const filters: { key: OrderStatus; label: string }[] = [
    { key: 'all', label: 'All Orders' },
    { key: 'processing', label: 'Processing' },
    { key: 'shipped', label: 'Shipped' },
    { key: 'delivered', label: 'Delivered' },
    { key: 'cancelled', label: 'Cancelled' },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesFilter = activeFilter === 'all' || order.status.toLowerCase() === activeFilter;
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <DashboardLayout title="My Orders" subtitle="Track and manage your orders">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Search and Filter */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search orders by ID or product name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
              />
            </div>

            {/* Filter Tabs - Desktop */}
            <div className="hidden md:flex items-center gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === filter.key
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Tabs - Mobile (Scrollable) */}
          <div className="md:hidden flex gap-2 mt-3 overflow-x-auto pb-2 -mx-4 px-4">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeFilter === filter.key
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Order Count */}
        <motion.p variants={itemVariants} className="text-gray-600 text-sm">
          Showing {filteredOrders.length} of {orders.length} orders
        </motion.p>

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <motion.div variants={itemVariants} className="space-y-4">
            {filteredOrders.map((order) => (
              <motion.div
                key={order.id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Order Header */}
                <div className="px-4 md:px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-semibold text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>
                      {order.status}
                    </span>
                    {order.trackingNumber && (
                      <span className="text-xs text-gray-500 hidden md:block">
                        Tracking: {order.trackingNumber}
                      </span>
                    )}
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4 md:p-6">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium text-gray-900 hidden md:block">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Footer */}
                <div className="px-4 md:px-6 py-4 bg-gray-50 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Order Total</p>
                      <p className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</p>
                    </div>
                    {order.items.length > 1 && (
                      <span className="text-sm text-gray-500">
                        ({order.items.length} items)
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {order.status === 'Delivered' && (
                      <button className="px-4 py-2 text-sm font-medium text-amber-600 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
                        Buy Again
                      </button>
                    )}
                    {order.status === 'Shipped' && order.trackingNumber && (
                      <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        Track Package
                      </button>
                    )}
                    <Link
                      to={`/orders/${order.id}`}
                      className="px-4 py-2 text-sm font-medium text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl shadow-sm p-8 md:p-12 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Orders Found</h3>
            <p className="text-gray-500 mb-6">
              {searchQuery
                ? `No orders matching "${searchQuery}"`
                : "You haven't placed any orders yet."}
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
            >
              Start Shopping
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
        )}

        {/* Pagination */}
        {filteredOrders.length > 0 && (
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-2">
            <button className="p-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="w-10 h-10 rounded-lg bg-amber-500 text-white font-medium">1</button>
            <button className="w-10 h-10 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium">2</button>
            <button className="p-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default OrderList;
