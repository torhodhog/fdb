// ResponsiveImage.tsx
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

const FinalSale = ({ src, alt }: { src: string, alt: string }) => (
   <div className="relative w-full h-[32vh]">
      <Link href="http://localhost:3000/finalesale">
        
            <Image
               src={src}
               alt={alt}
               layout="fill"
               objectFit="cover"
               className="absolute top-0 left-0 w-full h-full"
            />
       
      </Link>
   </div>
);

export default FinalSale;