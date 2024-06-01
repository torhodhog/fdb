// ResponsiveImage.tsx
import Image from 'next/image';
import { FC } from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
}

const ResponsiveImage: FC<ResponsiveImageProps> = ({ src, alt }) => (
  <div className="relative w-full h-[32vh]">
    <Image
      src={src}
      alt={alt}
      layout="fill"
      objectFit="contain"
      className="absolute top-0 left-0 w-full h-full"
    />
  </div>
);

export default ResponsiveImage;