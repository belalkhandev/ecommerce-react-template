import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export interface CategoryCardProps {
  id: string;
  name: string;
  image: string;
  itemCount?: number;
  slug: string;
}

const CategoryCard = ({ name, image, itemCount, slug }: CategoryCardProps) => {
  return (
    <Link to={`/categories/${slug}`}>
      <motion.div
        className="group relative bg-gray-100 rounded-2xl overflow-hidden aspect-square cursor-pointer"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-semibold text-lg mb-1">{name}</h3>
          {itemCount !== undefined && (
            <p className="text-white/80 text-sm">{itemCount} Products</p>
          )}
        </div>
      </motion.div>
    </Link>
  );
};

export default CategoryCard;
