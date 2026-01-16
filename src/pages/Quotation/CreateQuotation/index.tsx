import type { FC } from 'react';
import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuotation } from '../../../context/QuotationContext';
import { products, searchProducts } from '../../../data/products';
import type { Product } from '../../../data/products';
import type { QuotationItem, QuotationFormData, NewQuotationItem } from '../../../types';
import { UNIT_OPTIONS } from '../../../types';

const CreateQuotation: FC = () => {
  const navigate = useNavigate();
  const { draftItems, addDraftItem, removeDraftItem, updateDraftItem, clearDraftItems, createQuotation } = useQuotation();

  const [activeTab, setActiveTab] = useState<'existing' | 'custom'>('existing');
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);

  const [customItem, setCustomItem] = useState<NewQuotationItem>({
    name: '',
    description: '',
    quantity: 1,
    unit: 'pieces',
    specifications: '',
  });

  const [formData, setFormData] = useState<QuotationFormData>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    notes: '',
  });

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return products.slice(0, 8);
    return searchProducts(searchQuery);
  }, [searchQuery]);

  const handleAddExistingProduct = (product: Product, quantity: number = 1) => {
    const item: QuotationItem = {
      id: `existing-${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      description: product.description || '',
      quantity,
      unit: 'pieces',
      estimatedPrice: product.price,
      image: product.image,
      isCustom: false,
    };
    addDraftItem(item);
  };

  const handleAddCustomItem = () => {
    if (!customItem.name.trim()) return;

    const item: QuotationItem = {
      id: `custom-${Date.now()}`,
      name: customItem.name,
      description: customItem.description,
      quantity: customItem.quantity,
      unit: customItem.unit,
      specifications: customItem.specifications,
      isCustom: true,
    };
    addDraftItem(item);
    setCustomItem({ name: '', description: '', quantity: 1, unit: 'pieces', specifications: '' });
  };

  const handleSubmit = () => {
    if (draftItems.length === 0) return;
    const quotation = createQuotation(formData);
    navigate(`/quotations/${quotation.id}`);
  };

  const totalEstimated = draftItems.reduce((sum, item) => sum + (item.estimatedPrice || 0) * item.quantity, 0);

  if (showForm) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50 py-6 md:py-8"
      >
        <div className="max-w-4xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
            <span>/</span>
            <button onClick={() => setShowForm(false)} className="hover:text-amber-600 transition-colors">Create Quotation</button>
            <span>/</span>
            <span className="text-gray-900">Contact Details</span>
          </nav>

          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Contact Details</h1>
                <p className="text-gray-600">Please provide your contact information for the quotation</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company / Organization (Optional)</label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Company name if applicable"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="+1 234 567 8900"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Any specific requirements, delivery timeline, or special instructions..."
                />
              </div>
            </div>

            <div className="bg-amber-50 rounded-xl p-4 mb-8">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-amber-800">
                  <p className="font-medium mb-1">What happens next?</p>
                  <p>Our team will review your quotation request and respond within 24-48 business hours with detailed pricing and availability information.</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">Items in quotation:</span>
                <span className="font-semibold">{draftItems.length} items</span>
              </div>
              {totalEstimated > 0 && (
                <div className="flex items-center justify-between mb-6">
                  <span className="text-gray-600">Estimated Total:</span>
                  <span className="text-xl font-bold text-gray-900">${totalEstimated.toFixed(2)}</span>
                </div>
              )}
              <div className="flex gap-4">
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-3 px-6 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Back to Items
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!formData.fullName || !formData.email || !formData.phone}
                  className="flex-1 py-3 px-6 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
                >
                  Submit Quotation Request
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 py-6 md:py-8"
    >
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-900">Create Quotation</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Create Custom Quotation</h1>
                  <p className="text-gray-600">Add products and get a personalized quote for your business</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">CCraft Business Solutions</h3>
                    <p className="text-sm text-gray-600">We specialize in bulk orders, custom furniture solutions, and B2B partnerships. Our dedicated team ensures competitive pricing and timely delivery for all your furniture needs.</p>
                  </div>
                </div>
              </div>

              <div className="flex border-b border-gray-200 mb-6">
                <button
                  onClick={() => setActiveTab('existing')}
                  className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'existing'
                      ? 'border-amber-500 text-amber-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Search Products
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('custom')}
                  className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'custom'
                      ? 'border-amber-500 text-amber-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Custom Item
                  </span>
                </button>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'existing' ? (
                  <motion.div
                    key="existing"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="relative mb-4">
                      <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for furniture, decor..."
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {searchResults.map((product) => (
                        <div key={product.id} className="border border-gray-200 rounded-lg p-3 hover:border-amber-300 transition-colors">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-24 object-cover rounded-lg mb-2"
                          />
                          <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{product.name}</h4>
                          <p className="text-xs text-gray-500 mb-2">${product.price.toFixed(2)}</p>
                          <button
                            onClick={() => handleAddExistingProduct(product)}
                            className="w-full py-1.5 text-xs font-medium bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors"
                          >
                            Add to Quote
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="custom"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div className="bg-blue-50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-blue-800">
                        Can't find what you're looking for? Add a custom item with your specifications and we'll source it for you.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Item Name *</label>
                      <input
                        type="text"
                        value={customItem.name}
                        onChange={(e) => setCustomItem(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        placeholder="e.g., Custom Reception Desk"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={customItem.description}
                        onChange={(e) => setCustomItem(prev => ({ ...prev, description: e.target.value }))}
                        rows={2}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        placeholder="Brief description of the item"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                        <input
                          type="number"
                          min="1"
                          value={customItem.quantity}
                          onChange={(e) => setCustomItem(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                        <select
                          value={customItem.unit}
                          onChange={(e) => setCustomItem(prev => ({ ...prev, unit: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
                        >
                          {UNIT_OPTIONS.map(unit => (
                            <option key={unit} value={unit}>{unit}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Specifications</label>
                      <textarea
                        value={customItem.specifications}
                        onChange={(e) => setCustomItem(prev => ({ ...prev, specifications: e.target.value }))}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        placeholder="Dimensions, materials, colors, or any specific requirements..."
                      />
                    </div>

                    <button
                      onClick={handleAddCustomItem}
                      disabled={!customItem.name.trim()}
                      className="w-full py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white font-semibold rounded-lg transition-colors"
                    >
                      Add Custom Item
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:w-96">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quotation Items</h2>

              {draftItems.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-sm">No items added yet</p>
                  <p className="text-gray-400 text-xs mt-1">Search products or add custom items</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto mb-4">
                  {draftItems.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover" />
                      ) : (
                        <div className="w-14 h-14 rounded-lg bg-amber-100 flex items-center justify-center">
                          <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</h4>
                            {item.isCustom && (
                              <span className="text-xs text-amber-600 font-medium">Custom</span>
                            )}
                          </div>
                          <button
                            onClick={() => removeDraftItem(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateDraftItem(item.id, { quantity: Math.max(1, item.quantity - 1) })}
                            className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateDraftItem(item.id, { quantity: item.quantity + 1 })}
                            className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          >
                            +
                          </button>
                          <span className="text-xs text-gray-500">{item.unit}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {draftItems.length > 0 && (
                <>
                  <div className="border-t border-gray-200 pt-4 mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Total Items:</span>
                      <span className="font-medium">{draftItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                    </div>
                    {totalEstimated > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Estimated Total:</span>
                        <span className="text-lg font-bold text-gray-900">${totalEstimated.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => setShowForm(true)}
                      className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors"
                    >
                      Continue to Details
                    </button>
                    <button
                      onClick={clearDraftItems}
                      className="w-full py-2 text-sm text-gray-500 hover:text-red-600 transition-colors"
                    >
                      Clear All Items
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CreateQuotation;
