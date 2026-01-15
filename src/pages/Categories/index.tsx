import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Categories = () => {
  const categories = [
    {
      id: '1',
      name: 'Living Room',
      slug: 'living-room',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop',
      itemCount: 124,
      description: 'Sofas, coffee tables, TV stands and more',
    },
    {
      id: '2',
      name: 'Bedroom',
      slug: 'bedroom',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&h=400&fit=crop',
      itemCount: 89,
      description: 'Beds, nightstands, dressers and wardrobes',
    },
    {
      id: '3',
      name: 'Office',
      slug: 'office',
      image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&h=400&fit=crop',
      itemCount: 56,
      description: 'Desks, office chairs and storage solutions',
    },
    {
      id: '4',
      name: 'Dining',
      slug: 'dining',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&h=400&fit=crop',
      itemCount: 78,
      description: 'Dining tables, chairs and buffets',
    },
    {
      id: '5',
      name: 'Outdoor',
      slug: 'outdoor',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=400&fit=crop',
      itemCount: 45,
      description: 'Patio furniture, garden sets and loungers',
    },
    {
      id: '6',
      name: 'Storage',
      slug: 'storage',
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&h=400&fit=crop',
      itemCount: 67,
      description: 'Shelves, cabinets and organizers',
    },
    {
      id: '7',
      name: 'Kids Room',
      slug: 'kids-room',
      image: 'https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=600&h=400&fit=crop',
      itemCount: 42,
      description: 'Beds, desks and playroom furniture',
    },
    {
      id: '8',
      name: 'Lighting',
      slug: 'lighting',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=400&fit=crop',
      itemCount: 93,
      description: 'Lamps, chandeliers and ceiling lights',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="bg-amber-50">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">Browse Categories</h1>
          <p className="text-gray-600">Explore our wide range of furniture categories</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Link to={`/products?category=${category.slug}`}>
                <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white text-xl font-bold mb-1">{category.name}</h3>
                      <p className="text-white/80 text-sm">{category.itemCount} Products</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 text-sm">{category.description}</p>
                    <div className="mt-3 flex items-center text-amber-600 font-medium text-sm group-hover:text-amber-700 transition-colors">
                      Shop Now
                      <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-amber-500 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
            Browse our complete collection of furniture or contact us for custom orders and special requests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="px-8 py-3 bg-white text-amber-600 font-semibold rounded-lg hover:bg-amber-50 transition-colors"
            >
              View All Products
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Categories;
