import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import DashboardLayout from '../../../../components/DashboardLayout';

const OrderDetails = () => {
  const { id } = useParams();

  // Sample order data - will be dynamic later
  const order = {
    id: id || 'ORD-2024-001',
    date: 'January 10, 2024',
    status: 'Shipped',
    statusColor: 'bg-blue-100 text-blue-700',
    paymentMethod: 'Credit Card ending in 4242',
    paymentStatus: 'Paid',
    subtotal: 1199.00,
    shipping: 50.00,
    tax: 50.00,
    discount: 0,
    total: 1299.00,
    trackingNumber: 'TRK123456789',
    carrier: 'FedEx',
    estimatedDelivery: 'January 15, 2024',
    items: [
      {
        id: '1',
        name: 'Modern Leather Sofa',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop',
        quantity: 1,
        price: 899.00,
        color: 'Brown',
        size: '3-Seater',
      },
      {
        id: '2',
        name: 'Oak Coffee Table',
        image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=200&h=200&fit=crop',
        quantity: 1,
        price: 249.00,
        color: 'Natural Oak',
        size: 'Medium',
      },
      {
        id: '3',
        name: 'Floor Lamp',
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200&h=200&fit=crop',
        quantity: 1,
        price: 151.00,
        color: 'Black',
        size: 'Standard',
      },
    ],
    shippingAddress: {
      name: 'John Doe',
      phone: '+1 234 567 8900',
      address: '123 Furniture Street, Apt 4B',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'United States',
    },
    billingAddress: {
      name: 'John Doe',
      address: '123 Furniture Street, Apt 4B',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'United States',
    },
    timeline: [
      { status: 'Order Placed', date: 'Jan 10, 2024 - 10:30 AM', completed: true },
      { status: 'Payment Confirmed', date: 'Jan 10, 2024 - 10:32 AM', completed: true },
      { status: 'Processing', date: 'Jan 10, 2024 - 11:00 AM', completed: true },
      { status: 'Shipped', date: 'Jan 11, 2024 - 09:00 AM', completed: true, current: true },
      { status: 'Out for Delivery', date: 'Pending', completed: false },
      { status: 'Delivered', date: 'Pending', completed: false },
    ],
  };

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
    <DashboardLayout title="Order Details" subtitle={`Order ${order.id}`}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Back Button & Actions */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link
            to="/orders"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Orders
          </Link>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Download Invoice
            </button>
            <button className="px-4 py-2 text-sm font-medium text-amber-600 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
              Need Help?
            </button>
          </div>
        </motion.div>

        {/* Order Status Banner */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  Estimated delivery: <span className="font-medium text-gray-900">{order.estimatedDelivery}</span>
                </p>
              </div>
            </div>
            {order.trackingNumber && (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-gray-500">Tracking Number</p>
                  <p className="font-medium text-gray-900">{order.trackingNumber}</p>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                  Track Package
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Order Timeline */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <h3 className="font-semibold text-gray-900 mb-6">Order Timeline</h3>
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
            <div
              className="absolute left-4 top-0 w-0.5 bg-green-500 transition-all"
              style={{ height: `${(order.timeline.filter(t => t.completed).length / order.timeline.length) * 100}%` }}
            />

            <div className="space-y-6">
              {order.timeline.map((step, index) => (
                <div key={index} className="relative flex items-start gap-4 pl-10">
                  <div className={`absolute left-2 w-5 h-5 rounded-full border-2 ${
                    step.completed
                      ? 'bg-green-500 border-green-500'
                      : 'bg-white border-gray-300'
                  } ${step.current ? 'ring-4 ring-green-100' : ''}`}>
                    {step.completed && (
                      <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                      {step.status}
                    </p>
                    <p className={`text-sm ${step.completed ? 'text-gray-500' : 'text-gray-400'}`}>
                      {step.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Order Items */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 md:p-6 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Order Items ({order.items.length})</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {order.items.map((item) => (
              <div key={item.id} className="p-4 md:p-6 flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/products/${item.id}`}
                    className="font-medium text-gray-900 hover:text-amber-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                  <div className="mt-1 space-y-1 text-sm text-gray-500">
                    <p>Color: {item.color}</p>
                    <p>Size: {item.size}</p>
                    <p>Qty: {item.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${item.price.toFixed(2)}</p>
                  <button className="mt-2 text-sm text-amber-600 hover:text-amber-700">
                    Buy Again
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Order Summary & Addresses */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Order Summary */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm p-4 md:p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">${order.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-900">${order.tax.toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${order.discount.toFixed(2)}</span>
                </div>
              )}
              <hr className="my-2" />
              <div className="flex justify-between text-base font-semibold">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">${order.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <h4 className="font-medium text-gray-900 mb-2">Payment Method</h4>
              <div className="flex items-center gap-3">
                <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                  <svg className="w-6 h-4" viewBox="0 0 24 16" fill="none">
                    <rect width="24" height="16" rx="2" fill="#1A1F71"/>
                    <text x="4" y="11" fill="white" fontSize="6" fontWeight="bold">VISA</text>
                  </svg>
                </div>
                <span className="text-gray-600">{order.paymentMethod}</span>
              </div>
              <span className="inline-block mt-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                {order.paymentStatus}
              </span>
            </div>
          </motion.div>

          {/* Addresses */}
          <motion.div variants={itemVariants} className="space-y-4">
            {/* Shipping Address */}
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Shipping Address</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p className="font-medium text-gray-900">{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.phone}</p>
                <p>{order.shippingAddress.address}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>

            {/* Billing Address */}
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Billing Address</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p className="font-medium text-gray-900">{order.billingAddress.name}</p>
                <p>{order.billingAddress.address}</p>
                <p>{order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zip}</p>
                <p>{order.billingAddress.country}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Return Items
          </button>
          <button className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Write a Review
          </button>
          <Link
            to="/products"
            className="px-6 py-3 text-sm font-medium text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors text-center"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default OrderDetails;
