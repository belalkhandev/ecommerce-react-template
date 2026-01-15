import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import ProductCard from '../ProductCard';
import type { ProductCardProps } from '../ProductCard';

interface RelatedProductsProps {
  products: ProductCardProps[];
  category: string;
  title?: string;
}

const RelatedProducts = ({ products, category, title = 'Related Products' }: RelatedProductsProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (products.length === 0) return null;

  return (
    <section className="mt-12 border-t pt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h2>
        <div className="flex items-center gap-4">
          <Link
            to={`/products?category=${category}`}
            className="text-amber-600 hover:text-amber-700 font-medium text-sm hidden sm:block"
          >
            View All
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={scrollPrev}
              className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-amber-500 hover:border-amber-500 hover:text-white transition-colors cursor-pointer"
              aria-label="Previous"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={scrollNext}
              className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-amber-500 hover:border-amber-500 hover:text-white transition-colors cursor-pointer"
              aria-label="Next"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden -mx-2" ref={emblaRef}>
        <div className="flex">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-[0_0_50%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] min-w-0 px-2"
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>

      <Link
        to={`/products?category=${category}`}
        className="mt-6 text-amber-600 hover:text-amber-700 font-medium text-sm flex items-center justify-center gap-1 sm:hidden"
      >
        View All Products
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </section>
  );
};

export default RelatedProducts;
