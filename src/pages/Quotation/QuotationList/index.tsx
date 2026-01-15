import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import DashboardLayout from '../../../components/DashboardLayout';
import { useQuotation } from '../../../context/QuotationContext';
import { QUOTATION_STATUS_CONFIG } from '../../../types';

const QuotationList: FC = () => {
  const { quotations } = useQuotation();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <DashboardLayout title="My Quotations" subtitle="View and manage your quotation requests">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{quotations.length} quotations</span>
          </div>
          <Link
            to="/quotations/create"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Quotation
          </Link>
        </div>

        {quotations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm p-8 text-center"
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No quotations yet</h3>
            <p className="text-gray-500 mb-6">Create your first quotation request to get started</p>
            <Link
              to="/quotations/create"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
            >
              Create Quotation
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {quotations.map((quotation, index) => {
              const statusConfig = QUOTATION_STATUS_CONFIG[quotation.status];
              return (
                <motion.div
                  key={quotation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={`/quotations/${quotation.id}`}
                    className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-4 md:p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{quotation.quotationNumber}</h3>
                            <p className="text-sm text-gray-500">{quotation.companyName}</p>
                          </div>
                        </div>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig.bgColor} ${statusConfig.color}`}>
                          {statusConfig.label}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500 block">Items</span>
                          <span className="font-medium text-gray-900">{quotation.items.length} items</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Created</span>
                          <span className="font-medium text-gray-900">{formatDate(quotation.createdAt)}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Estimated</span>
                          <span className="font-medium text-gray-900">
                            {quotation.totalEstimated ? `$${quotation.totalEstimated.toFixed(2)}` : 'TBD'}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Quoted</span>
                          <span className="font-medium text-gray-900">
                            {quotation.totalQuoted ? `$${quotation.totalQuoted.toFixed(2)}` : 'Pending'}
                          </span>
                        </div>
                      </div>

                      {quotation.status === 'quoted' && quotation.validUntil && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-2 text-sm">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-600">Quote valid until: <span className="font-medium text-gray-900">{formatDate(quotation.validUntil)}</span></span>
                          </div>
                        </div>
                      )}

                      {quotation.messages.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-2 text-sm text-amber-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                            <span>{quotation.messages.length} message(s) from admin</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default QuotationList;
