import type { FC } from 'react';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import CategoryCard from '../CategoryCard';
import type { CategoryCardProps } from '../CategoryCard';

interface CategorySliderProps {
  categories: CategoryCardProps[];
}

const CategorySlider: FC<CategorySliderProps> = ({ categories }) => {
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

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Browse by Category</h2>
          <div className="flex items-center gap-4">
            <Link
              to="/categories"
              className="text-sm md:text-base text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1 transition-colors"
            >
              Browse All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <div className="hidden md:flex items-center gap-2">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-amber-500 hover:border-amber-500 hover:text-white transition-colors cursor-pointer"
              aria-label="Previous"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={scrollNext}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-amber-500 hover:border-amber-500 hover:text-white transition-colors cursor-pointer"
              aria-label="Next"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            </div>
          </div>
        </div>

        <div className="overflow-hidden -mx-2" ref={emblaRef}>
          <div className="flex">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex-[0_0_50%] sm:flex-[0_0_33.333%] md:flex-[0_0_25%] lg:flex-[0_0_20%] min-w-0 px-2"
              >
                <CategoryCard {...category} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySlider;
