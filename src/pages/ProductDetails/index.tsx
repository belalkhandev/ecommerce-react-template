import {useState, useEffect} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import {motion, AnimatePresence} from 'framer-motion';
import {useCart} from '../../context/CartContext';
import {useWishlist} from '../../context/WishlistContext';
import {useCompare} from '../../context/CompareContext';
import ImageMagnifier from '../../components/ImageMagnifier';
import RelatedProducts from '../../components/RelatedProducts';
import {getProductById, products} from '../../data/products';

const ProductDetailSkeleton = () => (
    <div className="min-h-screen bg-white animate-pulse">
        <div className="container mx-auto px-4 py-6">
            <div className="h-4 w-64 bg-gray-200 rounded mb-6"/>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <div className="flex gap-4">
                    <div className="hidden md:flex flex-col gap-3 w-20">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg"/>
                        ))}
                    </div>
                    <div className="flex-1">
                        <div className="aspect-square bg-gray-200 rounded-lg"/>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="h-8 w-3/4 bg-gray-200 rounded"/>
                    <div className="h-6 w-1/4 bg-gray-200 rounded"/>
                    <div className="h-4 w-full bg-gray-200 rounded"/>
                    <div className="h-4 w-2/3 bg-gray-200 rounded"/>
                    <div className="h-10 w-32 bg-gray-200 rounded mt-6"/>
                    <div className="h-12 w-48 bg-gray-200 rounded mt-4"/>
                </div>
            </div>
        </div>
    </div>
);

const ProductDetails = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {addToCart, isInCart} = useCart();
    const {toggleWishlist, isInWishlist} = useWishlist();
    const {toggleCompare, isInCompare} = useCompare();

    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState<string | undefined>();
    const [activeTab, setActiveTab] = useState('description');
    const [isLoading, setIsLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    const product = id ? getProductById(id) : undefined;
    const inCart = id ? isInCart(id) : false;
    const inWishlist = id ? isInWishlist(id) : false;
    const inCompare = id ? isInCompare(id) : false;

    useEffect(() => {
        setIsLoading(true);
        setSelectedImage(0);
        setQuantity(1);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, [id]);

    useEffect(() => {
        if (product?.colors && product.colors.length > 0) {
            setSelectedColor(product.colors[0]);
        }
    }, [product]);

    const relatedProducts = products
        .filter(p => p.id !== id && p.category === product?.category)
        .slice(0, 4);

    const productImages = product ? [
        product.image,
        product.hoverImage || product.image,
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&h=600&fit=crop',
    ] : [];

    const handleQuantityChange = (delta: number) => {
        setQuantity((prev) => Math.max(1, prev + delta));
    };

    const handleAddToCart = () => {
        if (!product) return;
        setIsAdding(true);
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
            color: selectedColor,
        }, quantity);
        setTimeout(() => setIsAdding(false), 500);
    };

    const handleToggleWishlist = () => {
        if (!product) return;
        toggleWishlist({
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
            inStock: product.inStock ?? true,
            rating: product.rating,
            reviews: product.reviewCount,
        });
    };

    const handleToggleCompare = () => {
        if (!product) return;
        toggleCompare({
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
            category: product.category,
            rating: product.rating,
            reviewCount: product.reviewCount,
            inStock: product.inStock,
            colors: product.colors,
            description: product.description,
        });
    };

    const tabs = [
        {id: 'description', label: 'Description'},
        {id: 'additional', label: 'Additional Information'},
        {id: 'reviews', label: `Reviews (${product?.reviewCount || 0})`},
        {id: 'shipping', label: 'Shipping & Delivery'},
    ];

    if (isLoading) {
        return <ProductDetailSkeleton/>;
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Product not found</h2>
                    <p className="text-gray-500 mb-4">The product you're looking for doesn't exist.</p>
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
                    >
                        Browse Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="min-h-screen bg-white"
        >
            <div className="container mx-auto px-4 py-6">
                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
                    <span>/</span>
                    <Link to="/products" className="hover:text-amber-600 transition-colors">Products</Link>
                    <span>/</span>
                    <Link to={`/products?category=${product.category}`}
                          className="hover:text-amber-600 transition-colors">
                        {product.category}
                    </Link>
                    <span>/</span>
                    <span className="text-gray-900 line-clamp-1">{product.name}</span>
                </nav>

                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                            </svg>
                        </button>
                        <Link to="/products" className="text-gray-400 hover:text-gray-600 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    <div className="flex gap-4">
                        <div className="hidden md:flex flex-col gap-3 w-20">
                            {productImages.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors cursor-pointer ${
                                        selectedImage === index ? 'border-amber-500' : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover"/>
                                </button>
                            ))}
                        </div>

                        <div className="flex-1 relative">
                            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden relative">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={selectedImage}
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        exit={{opacity: 0}}
                                        className="w-full h-full"
                                    >
                                        <ImageMagnifier
                                            src={productImages[selectedImage]}
                                            alt={product.name}
                                            className="w-full h-full"
                                        />
                                    </motion.div>
                                </AnimatePresence>
                                {product.discount && (
                                    <span
                                        className="absolute top-4 right-4 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full z-20">
                    -{product.discount}%
                  </span>
                                )}
                                {product.badge && (
                                    <span
                                        className={`absolute ${product.discount ? 'top-14' : 'top-4'} right-4 text-white text-sm font-bold px-3 py-1 rounded-full uppercase z-20 ${
                                            product.badge === 'hot' ? 'bg-red-500' : product.badge === 'new' ? 'bg-blue-500' : 'bg-green-500'
                                        }`}>
                    {product.badge}
                  </span>
                                )}
                            </div>

                            <div className="flex md:hidden gap-2 mt-4 overflow-x-auto pb-2">
                                {productImages.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`w-16 h-16 shrink-0 rounded-lg overflow-hidden border-2 transition-colors cursor-pointer ${
                                            selectedImage === index ? 'border-amber-500' : 'border-gray-200'
                                        }`}
                                    >
                                        <img src={img} alt={`View ${index + 1}`}
                                             className="w-full h-full object-cover"/>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                        <p className="text-gray-500 mb-4">{product.category}</p>

                        {product.rating && (
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-5 h-5 ${i < Math.floor(product.rating!) ? 'text-amber-400' : 'text-gray-300'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-gray-600">({product.reviewCount} reviews)</span>
                            </div>
                        )}

                        <div className="flex items-center gap-3 mb-4">
                            {product.originalPrice && (
                                <span className="text-gray-400 text-xl line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
                            )}
                            <span
                                className={`text-2xl font-bold ${product.originalPrice ? 'text-green-600' : 'text-gray-900'}`}>
                ${product.price.toFixed(2)}
              </span>
                            {product.discount && (
                                <span className="bg-green-100 text-green-700 text-sm font-medium px-2 py-0.5 rounded">
                  Save ${(product.originalPrice! - product.price).toFixed(2)}
                </span>
                            )}
                        </div>

                        <p className="text-gray-600 mb-6 leading-relaxed">
                            {product.description || 'Experience premium quality and exceptional comfort with this carefully crafted piece. Perfect for modern living spaces, this furniture combines style with functionality to enhance your home decor.'}
                        </p>

                        {product.colors && product.colors.length > 0 && (
                            <div className="mb-6">
                                <span className="text-gray-700 font-medium mr-3">Color:</span>
                                <div className="inline-flex gap-2">
                                    {product.colors.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${
                                                selectedColor === color
                                                    ? 'border-gray-800 scale-110'
                                                    : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                            style={{backgroundColor: color}}
                                            aria-label={`Select color`}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                    onClick={() => handleQuantityChange(-1)}
                                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors rounded-l-lg cursor-pointer"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M20 12H4"/>
                                    </svg>
                                </button>
                                <span className="w-12 text-center font-medium">{quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange(1)}
                                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors rounded-r-lg cursor-pointer"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M12 4v16m8-8H4"/>
                                    </svg>
                                </button>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                disabled={isAdding}
                                className={`px-8 py-3 font-semibold rounded-lg transition-colors uppercase tracking-wide flex items-center gap-2 cursor-pointer ${
                                    inCart
                                        ? 'bg-amber-500 hover:bg-amber-600 text-white'
                                        : 'bg-green-500 hover:bg-green-600 text-white'
                                }`}
                            >
                                {isAdding ? (
                                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                strokeWidth="4"/>
                                        <path className="opacity-75" fill="currentColor"
                                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                                    </svg>
                                ) : inCart ? (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M5 13l4 4L19 7"/>
                                        </svg>
                                        Added to Cart
                                    </>
                                ) : (
                                    'Add to Cart'
                                )}
                            </button>
                        </div>

                        <div className="flex flex-wrap items-center gap-6 mb-6 text-sm">
                            <button
                                onClick={handleToggleWishlist}
                                className={`flex items-center gap-2 transition-colors cursor-pointer ${
                                    inWishlist ? 'text-red-500' : 'text-gray-600 hover:text-amber-600'
                                }`}
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill={inWishlist ? 'currentColor' : 'none'}
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                                </svg>
                                {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                            </button>
                            <button
                                onClick={handleToggleCompare}
                                className={`flex items-center gap-2 transition-colors cursor-pointer ${
                                    inCompare ? 'text-amber-600' : 'text-gray-600 hover:text-amber-600'
                                }`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
                                </svg>
                                {inCompare ? 'In Compare' : 'Compare'}
                            </button>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600 border-t pt-6">
                            <p><span
                                className="font-medium text-gray-800">SKU:</span> {product.sku || `FRN-${product.id}`}
                            </p>
                            <p><span className="font-medium text-gray-800">Category:</span> {product.category}</p>
                            <p><span className="font-medium text-gray-800">Availability:</span>
                                <span
                                    className={product.inStock !== false ? 'text-green-600 ml-1' : 'text-red-600 ml-1'}>
                  {product.inStock !== false ? 'In Stock' : 'Out of Stock'}
                </span>
                            </p>
                            <div className="flex items-center gap-2 pt-2">
                                <span className="font-medium text-gray-800">Share:</span>
                                <div className="flex gap-2">
                                    {['facebook', 'twitter', 'pinterest', 'linkedin'].map((social) => (
                                        <button
                                            key={social}
                                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-amber-600 transition-colors bg-gray-100 rounded-full cursor-pointer"
                                            aria-label={`Share on ${social}`}
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                                            </svg>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t">
                    <div className="flex flex-wrap gap-1 border-b overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 md:px-6 py-4 text-sm md:text-base font-medium whitespace-nowrap transition-colors relative cursor-pointer ${
                                    activeTab === tab.id
                                        ? 'text-amber-600'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="py-8">
                        <AnimatePresence mode="wait">
                            {activeTab === 'description' && (
                                <motion.div
                                    key="description"
                                    initial={{opacity: 0, y: 10}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -10}}
                                    className="prose max-w-none text-gray-600"
                                >
                                    <p className="mb-4">
                                        {product.description || `The ${product.name} is a stunning piece of furniture designed with both aesthetics and functionality in mind. Crafted with premium materials, this item will be a perfect addition to your ${product.category.toLowerCase()}.`}
                                    </p>
                                    <p className="mb-4">
                                        Featuring meticulous attention to detail and superior craftsmanship, this piece
                                        combines modern design with timeless elegance. Perfect for those who appreciate
                                        quality and style.
                                    </p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Premium quality materials</li>
                                        <li>Expert craftsmanship</li>
                                        <li>Modern and timeless design</li>
                                        <li>Easy assembly and maintenance</li>
                                        <li>1-year warranty included</li>
                                    </ul>
                                </motion.div>
                            )}

                            {activeTab === 'additional' && (
                                <motion.div
                                    key="additional"
                                    initial={{opacity: 0, y: 10}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -10}}
                                    className="space-y-4"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex border-b pb-2">
                                            <span className="font-medium text-gray-800 w-40">Weight</span>
                                            <span className="text-gray-600">15-45 kg</span>
                                        </div>
                                        <div className="flex border-b pb-2">
                                            <span className="font-medium text-gray-800 w-40">Dimensions</span>
                                            <span className="text-gray-600">Varies by model</span>
                                        </div>
                                        <div className="flex border-b pb-2">
                                            <span className="font-medium text-gray-800 w-40">Material</span>
                                            <span className="text-gray-600">Premium Wood & Fabric</span>
                                        </div>
                                        <div className="flex border-b pb-2">
                                            <span className="font-medium text-gray-800 w-40">Colors Available</span>
                                            <span className="text-gray-600">{product.colors?.length || 1} options</span>
                                        </div>
                                        <div className="flex border-b pb-2">
                                            <span className="font-medium text-gray-800 w-40">Warranty</span>
                                            <span className="text-gray-600">1 Year</span>
                                        </div>
                                        <div className="flex border-b pb-2">
                                            <span className="font-medium text-gray-800 w-40">Assembly</span>
                                            <span className="text-gray-600">Required (Tools included)</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'reviews' && (
                                <motion.div
                                    key="reviews"
                                    initial={{opacity: 0, y: 10}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -10}}
                                >
                                    {product.reviewCount && product.reviewCount > 0 ? (
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                                <div className="text-center">
                                                    <p className="text-4xl font-bold text-gray-900">{product.rating}</p>
                                                    <div className="flex items-center justify-center mt-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <svg
                                                                key={i}
                                                                className={`w-4 h-4 ${i < Math.floor(product.rating!) ? 'text-amber-400' : 'text-gray-300'}`}
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path
                                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                                            </svg>
                                                        ))}
                                                    </div>
                                                    <p className="text-sm text-gray-500 mt-1">{product.reviewCount} reviews</p>
                                                </div>
                                            </div>
                                            <button
                                                className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors cursor-pointer">
                                                Write a Review
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <p className="text-gray-600 mb-4">There are no reviews yet.</p>
                                            <button
                                                className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors cursor-pointer">
                                                Be the first to review
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {activeTab === 'shipping' && (
                                <motion.div
                                    key="shipping"
                                    initial={{opacity: 0, y: 10}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -10}}
                                    className="prose max-w-none text-gray-600"
                                >
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Shipping Information</h3>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Free shipping on orders over $500</li>
                                        <li>Standard delivery: 5-7 business days</li>
                                        <li>Express delivery: 2-3 business days (additional fee)</li>
                                        <li>White glove delivery available for furniture items</li>
                                        <li>International shipping available to select countries</li>
                                    </ul>
                                    <h3 className="text-xl font-bold text-gray-900 mt-6 mb-4">Return Policy</h3>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>30-day return policy for unused items</li>
                                        <li>Items must be in original packaging</li>
                                        <li>Return shipping costs may apply</li>
                                        <li>Refunds processed within 5-7 business days</li>
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <RelatedProducts
                    products={relatedProducts}
                    category={product.category}
                />
            </div>
        </motion.div>
    );
};

export default ProductDetails;
