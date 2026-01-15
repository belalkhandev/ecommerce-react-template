import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const QuotationBanner: FC = () => {
  return (
    <section className="py-6 md:py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
          style={{ maxHeight: '200px' }}
        >
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-400 rounded-full blur-3xl opacity-10 translate-y-1/2 -translate-x-1/3"></div>

          <div className="relative px-6 py-8 md:px-12 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="hidden sm:flex w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-amber-500/20 items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 md:mb-2">
                  Need a Custom Quote?
                </h2>
                <p className="text-gray-300 text-sm md:text-base max-w-lg">
                  Get personalized pricing for bulk orders, custom furniture, and B2B solutions. Our team responds within 24 hours.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
              <div className="hidden lg:flex items-center gap-6 text-sm text-gray-400 mr-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>24h Response</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Best Prices</span>
                </div>
              </div>
              <Link
                to="/quotations/create"
                className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-3.5 bg-amber-500 hover:bg-amber-400 text-gray-900 font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-amber-500/25"
              >
                <span>Request Quote</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuotationBanner;
