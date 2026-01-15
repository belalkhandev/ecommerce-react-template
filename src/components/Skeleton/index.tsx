interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

const Skeleton = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
}: SkeletonProps) => {
  const baseClasses = 'bg-gray-200';

  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-lg',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: '',
  };

  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
    />
  );
};

export const ProductCardSkeleton = () => (
  <div className="bg-white rounded-lg overflow-hidden shadow-sm">
    <Skeleton variant="rectangular" className="aspect-square w-full" />
    <div className="p-4 space-y-3">
      <Skeleton variant="text" className="h-4 w-3/4" />
      <Skeleton variant="text" className="h-3 w-1/2" />
      <div className="flex items-center gap-2">
        <Skeleton variant="text" className="h-5 w-20" />
        <Skeleton variant="text" className="h-4 w-16" />
      </div>
      <Skeleton variant="rounded" className="h-10 w-full" />
    </div>
  </div>
);

export const ProductGridSkeleton = ({ count = 8 }: { count?: number }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

export const CategoryCardSkeleton = () => (
  <div className="bg-white rounded-lg overflow-hidden shadow-sm">
    <Skeleton variant="rectangular" className="aspect-[4/3] w-full" />
    <div className="p-4 space-y-2">
      <Skeleton variant="text" className="h-5 w-2/3" />
      <Skeleton variant="text" className="h-4 w-1/2" />
    </div>
  </div>
);

export const CategorySliderSkeleton = () => (
  <div className="flex gap-4 overflow-hidden">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="flex-shrink-0 w-32">
        <Skeleton variant="circular" className="w-20 h-20 mx-auto" />
        <Skeleton variant="text" className="h-4 w-16 mx-auto mt-3" />
      </div>
    ))}
  </div>
);

export const HeroSkeleton = () => (
  <div className="relative">
    <Skeleton variant="rectangular" className="h-[400px] md:h-[500px] w-full" />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center space-y-4">
        <Skeleton variant="text" className="h-10 w-64 mx-auto" />
        <Skeleton variant="text" className="h-6 w-48 mx-auto" />
        <Skeleton variant="rounded" className="h-12 w-36 mx-auto" />
      </div>
    </div>
  </div>
);

export const OrderCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <div className="p-4 md:p-6 border-b border-gray-100 flex justify-between items-center">
      <div className="space-y-2">
        <Skeleton variant="text" className="h-5 w-32" />
        <Skeleton variant="text" className="h-4 w-24" />
      </div>
      <Skeleton variant="rounded" className="h-6 w-20" />
    </div>
    <div className="p-4 md:p-6 space-y-4">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton variant="rounded" className="w-16 h-16" />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" className="h-4 w-3/4" />
            <Skeleton variant="text" className="h-3 w-1/4" />
          </div>
        </div>
      ))}
    </div>
    <div className="p-4 md:p-6 bg-gray-50 flex justify-between items-center">
      <Skeleton variant="text" className="h-6 w-24" />
      <Skeleton variant="rounded" className="h-10 w-28" />
    </div>
  </div>
);

export const DashboardStatsSkeleton = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="bg-white rounded-xl p-4 md:p-5 shadow-sm">
        <Skeleton variant="rounded" className="w-12 h-12 mb-3" />
        <Skeleton variant="text" className="h-8 w-16 mb-2" />
        <Skeleton variant="text" className="h-4 w-24" />
      </div>
    ))}
  </div>
);

export const CartItemSkeleton = () => (
  <div className="flex gap-4 p-4 bg-white rounded-xl">
    <Skeleton variant="rounded" className="w-24 h-24" />
    <div className="flex-1 space-y-2">
      <Skeleton variant="text" className="h-5 w-3/4" />
      <Skeleton variant="text" className="h-4 w-1/2" />
      <div className="flex items-center gap-4 mt-4">
        <Skeleton variant="rounded" className="h-10 w-28" />
        <Skeleton variant="text" className="h-6 w-20" />
      </div>
    </div>
  </div>
);

export const SearchResultSkeleton = () => (
  <div className="space-y-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="flex items-center gap-3 p-3">
        <Skeleton variant="rounded" className="w-12 h-12" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" className="h-4 w-3/4" />
          <Skeleton variant="text" className="h-3 w-1/4" />
        </div>
      </div>
    ))}
  </div>
);

export default Skeleton;
