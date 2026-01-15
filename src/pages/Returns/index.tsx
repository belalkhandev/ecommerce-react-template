import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Returns: FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Initiate Return',
      description: 'Log into your account and go to order history. Select the item you wish to return and fill out the return request form.',
    },
    {
      step: '02',
      title: 'Get Approval',
      description: 'Our team will review your request within 24-48 hours and send you a return authorization with shipping instructions.',
    },
    {
      step: '03',
      title: 'Ship Item',
      description: 'Pack the item securely in its original packaging. Attach the provided shipping label and drop off at the carrier.',
    },
    {
      step: '04',
      title: 'Receive Refund',
      description: 'Once we receive and inspect the item, your refund will be processed within 5-7 business days to your original payment method.',
    },
  ];

  const policies = [
    {
      title: 'Return Window',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      items: [
        'Standard items: 30 days from delivery',
        'Mattresses: 100-night trial period',
        'Custom orders: Final sale, no returns',
        'Clearance items: 14 days from delivery',
      ],
    },
    {
      title: 'Condition Requirements',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      items: [
        'Items must be unused and in original condition',
        'All original packaging and tags required',
        'Assembly should not have been attempted',
        'No stains, odors, or pet hair',
      ],
    },
    {
      title: 'Non-Returnable Items',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      ),
      items: [
        'Custom-made or personalized furniture',
        'Items marked as final sale',
        'Assembled furniture (unless defective)',
        'Items damaged due to misuse',
      ],
    },
    {
      title: 'Refund Information',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      items: [
        'Refunds processed to original payment method',
        'Processing time: 5-7 business days',
        'Shipping fees are non-refundable',
        'Store credit available for faster processing',
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      <section className="bg-white py-12 border-b">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900">Returns & Exchanges</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Returns & Exchanges</h1>
          <p className="text-gray-600 mt-2">We want you to love your purchase. If not, we make returns easy.</p>
        </div>
      </section>

      <section className="py-12 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">How Returns Work</h2>
            <p className="text-gray-600">Simple 4-step process to return your item</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm relative"
              >
                <div className="text-4xl font-bold text-amber-200 absolute top-4 right-4">{item.step}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 relative z-10">{item.title}</h3>
                <p className="text-gray-600 text-sm relative z-10">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {policies.map((policy, index) => (
              <motion.div
                key={policy.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                    {policy.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{policy.title}</h3>
                </div>
                <ul className="space-y-2">
                  {policy.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900 text-white rounded-2xl p-8 md:p-10"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Exchange Instead?</h2>
                  <p className="text-gray-300 mb-6">
                    If your item is not quite right, we offer free exchanges for a different size, color, or style.
                    Same easy process, no additional shipping fees.
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Free shipping on exchanges
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Priority processing
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Price difference refunded
                    </li>
                  </ul>
                </div>
                <div className="text-center md:text-right">
                  <Link
                    to="/support"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-amber-500 hover:bg-amber-400 text-gray-900 font-semibold rounded-lg transition-colors"
                  >
                    Start Exchange
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h2>
          <p className="text-gray-600 mb-6">Our customer service team is available to assist you with any return or exchange questions.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Us
            </Link>
            <Link
              to="/faq"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              View FAQ
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Returns;
