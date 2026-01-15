import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';

interface ImageMagnifierProps {
  src: string;
  alt: string;
  zoomSrc?: string;
  className?: string;
}

const ImageMagnifier = ({
  src,
  alt,
  zoomSrc,
  className = '',
}: ImageMagnifierProps) => {
  return (
    <div className={`image-magnifier ${className}`}>
      <InnerImageZoom
        src={src}
        zoomSrc={zoomSrc || src}
        alt={alt}
        zoomType="hover"
        zoomPreload={true}
        fullscreenOnMobile={true}
        className="w-full h-full"
        imgAttributes={{
          style: {
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          },
        }}
      />
    </div>
  );
};

export default ImageMagnifier;
