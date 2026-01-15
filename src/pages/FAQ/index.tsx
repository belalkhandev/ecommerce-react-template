import type { FC } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  name: string;
  icon: JSX.Element;
  faqs: FAQItem[];
}

const FAQ: FC = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const categories: FAQCategory[] = [
    {
      name: 'Orders & Payment',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      faqs: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and financing options through Affirm. For large orders, we also accept bank transfers.',
        },
        {
          question: 'Can I modify or cancel my order?',
          answer: 'You can modify or cancel your order within 24 hours of placing it. After that, the order may have already entered processing. Contact our customer service team as soon as possible for assistance.',
        },
        {
          question: 'How do I track my order?',
          answer: 'Once your order ships, you will receive an email with tracking information. You can also log into your account and view the order status in the "My Orders" section.',
        },
        {
          question: 'Do you offer financing options?',
          answer: 'Yes, we partner with Affirm to offer flexible financing options. You can choose to pay over 3, 6, or 12 months with competitive interest rates. Select Affirm at checkout to see your options.',
        },
        {
          question: 'Is my payment information secure?',
          answer: 'Absolutely. We use industry-standard SSL encryption to protect your payment information. We never store your full credit card details on our servers.',
        },
      ],
    },
    {
      name: 'Shipping & Delivery',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      faqs: [
        {
          question: 'How long does shipping take?',
          answer: 'Standard shipping takes 5-7 business days. Express shipping (2-3 business days) and White Glove delivery (7-10 business days) are also available. Delivery times may vary based on your location.',
        },
        {
          question: 'Do you ship internationally?',
          answer: 'We currently ship to all 50 US states and select Canadian provinces. For international shipping inquiries, please contact our customer service team for a custom quote.',
        },
        {
          question: 'Is assembly included with delivery?',
          answer: 'Standard delivery does not include assembly. For full assembly service, please select our White Glove delivery option at checkout, which includes in-home delivery, professional assembly, and packaging removal.',
        },
        {
          question: 'What if my item arrives damaged?',
          answer: 'Please inspect all items upon delivery. If you notice any damage, note it on the delivery receipt and contact us within 48 hours. We will arrange for a replacement or refund.',
        },
        {
          question: 'Can I schedule a specific delivery date?',
          answer: 'Yes, for White Glove deliveries, our team will contact you to schedule a convenient delivery window. For standard deliveries, you can provide delivery instructions at checkout.',
        },
      ],
    },
    {
      name: 'Returns & Refunds',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
        </svg>
      ),
      faqs: [
        {
          question: 'What is your return policy?',
          answer: 'We offer a 30-day return policy for most items. Items must be unused, in original condition, with all packaging and tags. Custom orders and clearance items have different return windows.',
        },
        {
          question: 'How do I initiate a return?',
          answer: 'Log into your account, go to "My Orders," select the item you wish to return, and fill out the return request form. You will receive a return authorization within 24-48 hours.',
        },
        {
          question: 'How long does it take to receive my refund?',
          answer: 'Once we receive and inspect your return, refunds are processed within 5-7 business days. The refund will be credited to your original payment method.',
        },
        {
          question: 'Can I exchange an item instead of returning it?',
          answer: 'Yes, we offer free exchanges for different sizes, colors, or styles. The exchange process is the same as returns, but you will not be charged for shipping.',
        },
        {
          question: 'Are shipping fees refundable?',
          answer: 'Original shipping fees are non-refundable unless the return is due to our error or a defective product. Return shipping costs may be deducted from your refund for non-defective returns.',
        },
      ],
    },
    {
      name: 'Products & Care',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      faqs: [
        {
          question: 'What materials are your furniture made from?',
          answer: 'We use a variety of high-quality materials including solid hardwoods, engineered wood, premium fabrics, genuine leather, and metal. Each product page lists specific materials used.',
        },
        {
          question: 'How do I care for my furniture?',
          answer: 'Care instructions vary by material. Generally, dust regularly with a soft cloth, avoid direct sunlight, use coasters and placemats, and clean spills immediately. Specific care guides are included with each product.',
        },
        {
          question: 'Do you offer customization options?',
          answer: 'Yes, many of our furniture pieces can be customized in different fabrics, finishes, and sizes. Look for the "Customize" option on product pages or contact us for custom orders.',
        },
        {
          question: 'What is the warranty on your products?',
          answer: 'Most of our furniture comes with a 1-year warranty against manufacturing defects. Some premium items include extended warranties up to 5 years. Check individual product pages for details.',
        },
        {
          question: 'Are your products eco-friendly?',
          answer: 'We are committed to sustainability. Many of our products use FSC-certified wood, recycled materials, and non-toxic finishes. Look for our "Eco-Friendly" badge on qualifying products.',
        },
      ],
    },
    {
      name: 'Account & Support',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
      faqs: [
        {
          question: 'How do I create an account?',
          answer: 'Click the "Sign Up" button in the top right corner and fill out the registration form. You can also create an account during checkout.',
        },
        {
          question: 'I forgot my password. How do I reset it?',
          answer: 'Click "Login," then "Forgot Password." Enter your email address and we will send you a link to reset your password.',
        },
        {
          question: 'How can I contact customer support?',
          answer: 'You can reach us via email at support@ccraft.com, phone at +1 (555) 123-4567, or through the contact form on our website. We respond within 24 hours.',
        },
        {
          question: 'Do you have a loyalty program?',
          answer: 'Yes! Our CCraft Rewards program lets you earn points on every purchase. Points can be redeemed for discounts on future orders. Sign up for free in your account settings.',
        },
        {
          question: 'Can I get design advice?',
          answer: 'Absolutely! Our design consultants offer free virtual consultations. Book a session through our website or visit one of our showrooms for personalized recommendations.',
        },
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
            <span className="text-gray-900">FAQ</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Frequently Asked Questions</h1>
          <p className="text-gray-600 mt-2">Find answers to common questions about our products and services.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm p-4 sticky top-24">
                <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                <nav className="space-y-1">
                  {categories.map((category, index) => (
                    <button
                      key={category.name}
                      onClick={() => {
                        setActiveCategory(index);
                        setOpenItems([0]);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                        activeCategory === index
                          ? 'bg-amber-50 text-amber-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {category.icon}
                      <span className="font-medium text-sm">{category.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            <div className="flex-1">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm"
              >
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                    {categories[activeCategory].icon}
                    {categories[activeCategory].name}
                  </h2>
                </div>
                <div className="divide-y">
                  {categories[activeCategory].faqs.map((faq, index) => (
                    <div key={index} className="p-6">
                      <button
                        onClick={() => toggleItem(index)}
                        className="w-full flex items-start justify-between text-left"
                      >
                        <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                        <svg
                          className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${
                            openItems.includes(index) ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <AnimatePresence>
                        {openItems.includes(index) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <p className="text-gray-600 mt-4 leading-relaxed">{faq.answer}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
            <p className="text-gray-600 mb-6">
              Cannot find the answer you are looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Support
              </Link>
              <Link
                to="/support"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default FAQ;
