import type { FC } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DashboardLayout from '../../../components/DashboardLayout';
import { useQuotation } from '../../../context/QuotationContext';
import { QUOTATION_STATUS_CONFIG } from '../../../types';

const QuotationDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getQuotationById, updateQuotationStatus } = useQuotation();

  const quotation = id ? getQuotationById(id) : undefined;

  if (!quotation) {
    return (
      <DashboardLayout title="Quotation Not Found">
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Quotation not found</h3>
          <p className="text-gray-500 mb-6">The quotation you're looking for doesn't exist</p>
          <Link
            to="/quotations"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
          >
            View All Quotations
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const statusConfig = QUOTATION_STATUS_CONFIG[quotation.status];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleAcceptQuote = () => {
    updateQuotationStatus(quotation.id, 'accepted');
  };

  const handleRejectQuote = () => {
    updateQuotationStatus(quotation.id, 'rejected');
  };

  return (
    <DashboardLayout title={`Quotation ${quotation.quotationNumber}`}>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <button
            onClick={() => navigate('/quotations')}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Quotations
          </button>
          <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${statusConfig.bgColor} ${statusConfig.color}`}>
            {statusConfig.label}
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quotation Items</h2>
              <div className="space-y-4">
                {quotation.items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                    ) : (
                      <div className="w-20 h-20 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          {item.isCustom && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-700 mt-1">
                              Custom Item
                            </span>
                          )}
                        </div>
                        <div className="text-right">
                          {item.finalPrice ? (
                            <>
                              <p className="font-semibold text-gray-900">${(item.finalPrice * item.quantity).toFixed(2)}</p>
                              {item.estimatedPrice && item.estimatedPrice !== item.finalPrice && (
                                <p className="text-sm text-gray-500 line-through">${(item.estimatedPrice * item.quantity).toFixed(2)}</p>
                              )}
                            </>
                          ) : item.estimatedPrice ? (
                            <p className="font-semibold text-gray-900">${(item.estimatedPrice * item.quantity).toFixed(2)}</p>
                          ) : (
                            <p className="text-sm text-gray-500">Price TBD</p>
                          )}
                        </div>
                      </div>
                      {item.description && (
                        <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                      )}
                      {item.specifications && (
                        <p className="text-sm text-gray-500 mt-2 italic">{item.specifications}</p>
                      )}
                      <p className="text-sm text-gray-500 mt-2">
                        Quantity: {item.quantity} {item.unit}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {quotation.messages.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Messages</h2>
                <div className="space-y-4">
                  {quotation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 rounded-lg ${
                        message.senderType === 'admin' ? 'bg-blue-50' : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.senderType === 'admin' ? 'bg-blue-100' : 'bg-gray-200'
                        }`}>
                          {message.senderType === 'admin' ? (
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">{message.senderName}</span>
                          <span className="text-xs text-gray-500 ml-2">{formatDate(message.timestamp)}</span>
                        </div>
                      </div>
                      <p className="text-gray-700">{message.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {quotation.notes && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Your Notes</h2>
                <p className="text-gray-600">{quotation.notes}</p>
              </div>
            )}

            {quotation.adminResponse && (
              <div className="bg-blue-50 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Admin Response</h2>
                <p className="text-gray-700">{quotation.adminResponse}</p>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Items</span>
                  <span className="font-medium">{quotation.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                {quotation.totalEstimated && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Total</span>
                    <span className="font-medium">${quotation.totalEstimated.toFixed(2)}</span>
                  </div>
                )}
                {quotation.totalQuoted && (
                  <div className="flex justify-between text-lg pt-3 border-t border-gray-200">
                    <span className="font-semibold text-gray-900">Quoted Total</span>
                    <span className="font-bold text-amber-600">${quotation.totalQuoted.toFixed(2)}</span>
                  </div>
                )}
                {quotation.validUntil && (
                  <div className="pt-3 border-t border-gray-200">
                    <span className="text-gray-600 block mb-1">Quote Valid Until</span>
                    <span className="font-medium text-gray-900">{new Date(quotation.validUntil).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              {quotation.status === 'quoted' && (
                <div className="mt-6 space-y-3">
                  <button
                    onClick={handleAcceptQuote}
                    className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Accept Quote
                  </button>
                  <button
                    onClick={handleRejectQuote}
                    className="w-full py-3 border border-red-300 text-red-600 hover:bg-red-50 font-semibold rounded-lg transition-colors"
                  >
                    Reject Quote
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Details</h2>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-500 block">Name</span>
                  <span className="font-medium text-gray-900">{quotation.fullName}</span>
                </div>
                {quotation.companyName && (
                  <div>
                    <span className="text-gray-500 block">Company</span>
                    <span className="font-medium text-gray-900">{quotation.companyName}</span>
                  </div>
                )}
                <div>
                  <span className="text-gray-500 block">Email</span>
                  <span className="font-medium text-gray-900">{quotation.email}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Phone</span>
                  <span className="font-medium text-gray-900">{quotation.phone}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h2>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div>
                    <span className="text-gray-500 block">Created</span>
                    <span className="font-medium text-gray-900">{formatDate(quotation.createdAt)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div>
                    <span className="text-gray-500 block">Last Updated</span>
                    <span className="font-medium text-gray-900">{formatDate(quotation.updatedAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default QuotationDetails;
