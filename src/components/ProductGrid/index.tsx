import ProductCard from '../ProductCard';
import SectionHeader from '../SectionHeader';
import type { ProductCardProps } from '../ProductCard';

interface ProductGridProps {
  title: string;
  products: ProductCardProps[];
  linkText?: string;
  linkHref?: string;
  columns?: 2 | 3 | 4;
}

const ProductGrid = ({
  title,
  products,
  linkText,
  linkHref,
  columns = 4,
}: ProductGridProps) => {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  };

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <SectionHeader title={title} linkText={linkText} linkHref={linkHref} />
        <div className={`grid ${gridCols[columns]} gap-4 md:gap-6`}>
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
