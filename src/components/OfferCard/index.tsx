import { Link } from 'react-router-dom';

export interface OfferCardProps {
  badge: string;
  title: string;
  originalPrice?: number;
  discountedPrice: number;
  buttonText: string;
  buttonLink: string;
  backgroundColor: string;
  imageUrl?: string;
}

const OfferCard = ({
  badge,
  title,
  originalPrice,
  discountedPrice,
  buttonText,
  buttonLink,
  backgroundColor,
  imageUrl,
}: OfferCardProps) => {
  return (
    <div
      className="relative h-full rounded-2xl overflow-hidden p-8 flex flex-col justify-between"
      style={{ backgroundColor }}
    >
      <div>
        <span className="inline-block px-4 py-2 bg-amber-400 text-gray-900 font-semibold rounded-lg mb-4">
          {badge}
        </span>
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <div className="flex items-center gap-3 mb-4">
          {originalPrice && (
            <span className="text-white/60 line-through text-lg">
              ${originalPrice}
            </span>
          )}
          <span className="text-white text-2xl font-bold">
            ${discountedPrice}
          </span>
        </div>
        <Link
          to={buttonLink}
          className="inline-block text-white font-semibold underline hover:text-amber-400 transition-colors"
        >
          {buttonText}
        </Link>
      </div>
      {imageUrl && (
        <div className="absolute right-4 bottom-4 w-40 h-40">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default OfferCard;
