import {useState, useEffect} from 'react';
import HeroSection from '../../components/HeroSection';
import Features from '../../components/Features';
import CategorySlider from '../../components/CategorySlider';
import ProductGrid from '../../components/ProductGrid';
import QuotationBanner from '../../components/QuotationBanner';
import {HeroSkeleton, CategorySliderSkeleton, ProductGridSkeleton} from '../../components/Skeleton';
import {categories, getTrendingProducts, getBestSellers} from '../../data/products';

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const sliderData = [
        {
            badge: '50% Discount',
            title: 'Luxury Living Room',
            description: 'Elevate Your Living Space with Elegant Designs',
            buttonText: 'Explore Now',
            buttonLink: '/products',
            backgroundColor: '#B8A389',
        },
        {
            badge: 'New Arrival',
            title: 'Modern Bedroom',
            description: 'Create Your Dream Sleeping Sanctuary',
            buttonText: 'Shop Now',
            buttonLink: '/products',
            backgroundColor: '#8B9DAF',
        },
        {
            badge: 'Limited Offer',
            title: 'Office Collection',
            description: 'Transform Your Workspace with Style',
            buttonText: 'Discover More',
            buttonLink: '/products',
            backgroundColor: '#A0937D',
        },
    ];

    const trendingProducts = getTrendingProducts().map(p => ({
        id: p.id,
        name: p.name,
        category: p.category,
        price: p.price,
        originalPrice: p.originalPrice,
        image: p.image,
        hoverImage: p.hoverImage,
        badge: p.badge,
        discount: p.discount,
        rating: p.rating,
        reviewCount: p.reviewCount,
        colors: p.colors,
        inStock: p.inStock,
    }));

    const bestSellers = getBestSellers().map(p => ({
        id: p.id,
        name: p.name,
        category: p.category,
        price: p.price,
        originalPrice: p.originalPrice,
        image: p.image,
        hoverImage: p.hoverImage,
        badge: p.badge,
        discount: p.discount,
        rating: p.rating,
        reviewCount: p.reviewCount,
        colors: p.colors,
        inStock: p.inStock,
    }));

    if (isLoading) {
        return (
            <div className="min-h-screen">
                <HeroSkeleton/>
                <div className="container mx-auto px-4 py-8">
                    <CategorySliderSkeleton/>
                </div>
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"/>
                        <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"/>
                    </div>
                    <ProductGridSkeleton count={8}/>
                </div>
                <div className="bg-gray-50">
                    <div className="container mx-auto px-4 py-8">
                        <div className="flex items-center justify-between mb-6">
                            <div className="h-8 w-56 bg-gray-200 rounded animate-pulse"/>
                            <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"/>
                        </div>
                        <ProductGridSkeleton count={4}/>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <HeroSection slides={sliderData}/>
            <Features/>
            <CategorySlider categories={categories}/>
            <ProductGrid
                title="Trending Products"
                products={trendingProducts}
                linkText="View All"
                linkHref="/products?sort=trending"
            />
            <div className="bg-gray-50">
                <ProductGrid
                    title="Best Sellers of the Week"
                    products={bestSellers}
                    linkText="View All"
                    linkHref="/products?sort=best-sellers"
                />
            </div>
            <QuotationBanner />
        </div>
    );
};

export default Home;
