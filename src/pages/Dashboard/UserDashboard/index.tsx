import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import DashboardLayout from '../../../components/DashboardLayout';
import { useCompare } from '../../../context/CompareContext';

const UserDashboard = () => {
  const { items: compareItems } = useCompare();

  const stats = [
    {
      label: 'Total Orders',
      value: '12',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Wishlist Items',
      value: '8',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      color: 'bg-red-50 text-red-500',
    },
    {
      label: 'Compare Items',
      value: String(compareItems.length),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      color: 'bg-purple-50 text-purple-600',
      link: '/compare',
    },
    {
      label: 'Saved Addresses',
      value: '3',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: 'bg-green-50 text-green-600',
    },
    {
      label: 'Reward Points',
      value: '450',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-amber-50 text-amber-600',
    },
  ];

  const recentOrders = [
    {
      id: 'ORD-2024-001',
      date: 'Jan 10, 2024',
      status: 'Delivered',
      statusColor: 'bg-green-100 text-green-700',
      total: 1299.00,
      items: 3,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop',
    },
    {
      id: 'ORD-2024-002',
      date: 'Jan 8, 2024',
      status: 'In Transit',
      statusColor: 'bg-blue-100 text-blue-700',
      total: 899.00,
      items: 2,
      image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=100&h=100&fit=crop',
    },
    {
      id: 'ORD-2024-003',
      date: 'Jan 5, 2024',
      status: 'Processing',
      statusColor: 'bg-amber-100 text-amber-700',
      total: 549.00,
      items: 1,
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=100&h=100&fit=crop',
    },
  ];

  const quickActions = [
    { label: 'Track Order', path: '/orders', icon: '📦' },
    { label: 'Compare', path: '/compare', icon: '⚖️' },
    { label: 'Support', path: '/support', icon: '💬' },
    { label: 'Returns', path: '/returns', icon: '↩️' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <DashboardLayout title="My Dashboard" subtitle="Welcome back, John!">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map((stat) => {
            const content = (
              <>
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                  {stat.icon}
                </div>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </>
            );

            return stat.link ? (
              <Link
                key={stat.label}
                to={stat.link}
                className="bg-white rounded-xl p-4 md:p-5 shadow-sm hover:shadow-md transition-shadow block"
              >
                {content}
              </Link>
            ) : (
              <div
                key={stat.label}
                className="bg-white rounded-xl p-4 md:p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                {content}
              </div>
            );
          })}
        </motion.div>

        {/* Quick Actions - Mobile */}
        <motion.div variants={itemVariants} className="lg:hidden">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h2>
          <div className="grid grid-cols-4 gap-2">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                to={action.path}
                className="bg-white rounded-xl p-3 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-2xl block mb-1">{action.icon}</span>
                <span className="text-xs text-gray-600">{action.label}</span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
            <Link
              to="/orders"
              className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
            >
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={order.image}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{order.id}</p>
                            <p className="text-sm text-gray-500">{order.items} items</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{order.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">${order.total.toFixed(2)}</td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          to={`/orders/${order.id}`}
                          className="text-amber-600 hover:text-amber-700 font-medium text-sm"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-100">
              {recentOrders.map((order) => (
                <Link
                  key={order.id}
                  to={`/orders/${order.id}`}
                  className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={order.image}
                    alt=""
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${order.statusColor}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{order.date}</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">${order.total.toFixed(2)}</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Account Overview */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Profile Information</h3>
              <Link to="/profile" className="text-sm text-amber-600 hover:text-amber-700">
                Edit
              </Link>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium text-gray-900">John Doe</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900">+1 234 567 8900</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">john.doe@example.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Default Address Card */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Default Address</h3>
              <Link to="/addresses" className="text-sm text-amber-600 hover:text-amber-700">
                Manage
              </Link>
            </div>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">Home</p>
                <p className="text-gray-600 text-sm">
                  123 Furniture Street, Apt 4B<br />
                  New York, NY 10001<br />
                  United States
                </p>
                <span className="inline-block mt-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  Default
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Need Help Section */}
        <motion.div variants={itemVariants} className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-5 md:p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">Need Help with Your Order?</h3>
              <p className="text-amber-100 text-sm">Our support team is available 24/7 to assist you.</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white text-amber-600 font-medium rounded-lg hover:bg-amber-50 transition-colors text-sm">
                Live Chat
              </button>
              <button className="px-4 py-2 bg-amber-600 text-white font-medium rounded-lg border border-amber-400 hover:bg-amber-700 transition-colors text-sm">
                Call Us
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default UserDashboard;
