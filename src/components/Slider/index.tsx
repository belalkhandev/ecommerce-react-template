import { useCallback, useEffect, useState, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import SliderContent from './SliderContent';
import type { SliderContentProps } from './SliderContent';

interface SliderProps {
  slides: SliderContentProps[];
  autoplay?: boolean;
  autoplayDelay?: number;
  height?: string;
}

const Slider = ({
  slides,
  autoplay = true,
  autoplayDelay = 5000,
  height = '500px',
}: SliderProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number>(0);

  const autoplayPlugin = Autoplay({
    delay: autoplayDelay,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
  });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    autoplay ? [autoplayPlugin] : []
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setProgress(0);
    startTimeRef.current = Date.now();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!autoplay || isPaused) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    startTimeRef.current = Date.now() - (progress / 100) * autoplayDelay;

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min((elapsed / autoplayDelay) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 100) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [autoplay, autoplayDelay, selectedIndex, isPaused]);

  useEffect(() => {
    const emblaRoot = emblaApi?.rootNode();
    if (!emblaRoot) return;

    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => {
      setIsPaused(false);
      startTimeRef.current = Date.now() - (progress / 100) * autoplayDelay;
    };

    emblaRoot.addEventListener('mouseenter', handleMouseEnter);
    emblaRoot.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      emblaRoot.removeEventListener('mouseenter', handleMouseEnter);
      emblaRoot.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [emblaApi, progress, autoplayDelay]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  return (
    <div style={{ height }} className="w-full relative">
      <div className="overflow-hidden h-full rounded-2xl" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 h-full">
              <SliderContent {...slide} />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-6 md:left-10 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className="relative w-10 md:w-12 h-1 bg-white/30 overflow-hidden rounded-full"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div
              className="absolute inset-0 bg-amber-400 origin-left transition-transform duration-75 ease-linear rounded-full"
              style={{
                transform: `scaleX(${index === selectedIndex ? progress / 100 : index < selectedIndex ? 1 : 0})`,
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Slider;
