// Info.tsx
import Image from 'next/image';
import React, { FC } from 'react';

const Info: FC = () => {
  return (
    <div className="relative w-full h-[600px] mt-8">
      <Image
        src="https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/saftey.jpeg"
        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        alt="Info"
        width={1920}
        height={1080}
      />
    </div>
  );
};

export default Info;