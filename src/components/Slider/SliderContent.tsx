import { Link } from 'react-router-dom';

export interface SliderContentProps {
  badge?: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundColor: string;
  imageUrl?: string;
}

const SliderContent = ({
  badge,
  title,
  description,
  buttonText,
  buttonLink,
  backgroundColor,
  imageUrl,
}: SliderContentProps) => {
  return (
    <div
      className="relative h-full rounded-2xl overflow-hidden"
      style={{ backgroundColor }}
    >
      <div className="container mx-auto px-4 md:px-8 py-8 md:py-12 h-full flex items-center">
        <div className="max-w-xl z-10">
          {badge && (
            <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-amber-400 text-gray-900 text-sm md:text-base font-semibold rounded-lg mb-4 md:mb-6">
              {badge}
            </span>
          )}
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4 leading-tight">
            {title}
          </h2>
          <p className="text-white/90 text-sm md:text-lg mb-4 md:mb-8 line-clamp-2 md:line-clamp-none">{description}</p>
          <Link
            to={buttonLink}
            className="inline-block px-5 py-2.5 md:px-8 md:py-4 bg-amber-500 hover:bg-amber-600 text-white text-sm md:text-base font-semibold rounded-full transition-colors"
          >
            {buttonText}
          </Link>
        </div>
        {imageUrl && (
          <div className="absolute right-0 top-0 bottom-0 w-1/3 md:w-1/2 flex items-center justify-center opacity-50 md:opacity-100">
            <img
              src={imageUrl}
              alt={title}
              className="max-h-full object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SliderContent;
