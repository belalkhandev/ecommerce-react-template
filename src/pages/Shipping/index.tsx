import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Shipping: FC = () => {
  const shippingOptions = [
    {
      name: 'Standard Shipping',
      time: '5-7 Business Days',
      price: 'Free on orders over $500',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      name: 'Express Shipping',
      time: '2-3 Business Days',
      price: '$49.99',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      name: 'White Glove Delivery',
      time: '7-10 Business Days',
      price: '$149.99',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
  ];

  const sections = [
    {
      title: 'Shipping Rates & Delivery Times',
      content: [
        'Standard shipping is free on all orders over $500. For orders under $500, a flat rate of $29.99 applies.',
        'Express shipping is available for $49.99 and delivers within 2-3 business days.',
        'White Glove Delivery includes in-home delivery, unpacking, assembly, and packaging removal for $149.99.',
        'Delivery times are estimates and may vary based on your location and product availability.',
      ],
    },
    {
      title: 'Shipping Locations',
      content: [
        'We currently ship to all 50 US states and select Canadian provinces.',
        'Some oversized items may have shipping restrictions to certain remote areas.',
        'International shipping is available to select countries. Contact us for a custom quote.',
        'PO Boxes and APO/FPO addresses are not eligible for furniture delivery.',
      ],
    },
    {
      title: 'Order Processing',
      content: [
        'Orders are typically processed within 1-2 business days after payment confirmation.',
        'You will receive a confirmation email with tracking information once your order ships.',
        'Custom and made-to-order items may require additional processing time of 2-4 weeks.',
        'Orders placed after 2 PM EST may be processed the following business day.',
      ],
    },
    {
      title: 'Delivery Information',
      content: [
        'Standard delivery is to your doorstep or curbside for large items.',
        'An adult (18+) must be present to sign for the delivery.',
        'Our delivery team will contact you to schedule a delivery window.',
        'Please inspect all items before signing the delivery receipt.',
      ],
    },
    {
      title: 'White Glove Service',
      content: [
        'Professional delivery team brings furniture to your room of choice.',
        'Complete assembly of all furniture items included.',
        'All packaging materials removed and disposed of properly.',
        'Available for most furniture items. Select this option at checkout.',
      ],
    },
    {
      title: 'Damaged or Missing Items',
      content: [
        'Inspect your delivery carefully before signing the receipt.',
        'Note any visible damage on the delivery receipt before signing.',
        'Report any concealed damage within 48 hours of delivery.',
        'Contact our support team immediately for assistance with damaged or missing items.',
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
            <span className="text-gray-900">Shipping Policy</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Shipping Policy</h1>
          <p className="text-gray-600 mt-2">Learn about our shipping options, rates, and delivery information.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {shippingOptions.map((option, index) => (
              <motion.div
                key={option.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm text-center"
              >
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mx-auto mb-4">
                  {option.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{option.name}</h3>
                <p className="text-amber-600 font-medium mb-1">{option.time}</p>
                <p className="text-gray-500 text-sm">{option.price}</p>
              </motion.div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm divide-y">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="p-6"
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">{section.title}</h2>
                  <ul className="space-y-3">
                    {section.content.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-600">
                        <svg className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-amber-50 rounded-xl p-6 md:p-8 max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Have Questions About Shipping?</h3>
                <p className="text-gray-600 mb-4">Our customer service team is here to help with any shipping inquiries.</p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
                >
                  Contact Support
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Shipping;
