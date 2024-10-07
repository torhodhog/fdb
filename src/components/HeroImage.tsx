"use client";

import { FC } from "react";
import Image from 'next/image';

const HeroImage: FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-auto  bg-transparent z-1"> 
      <Image
        src="https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/bilde1.webp"
        className="w-full h-auto"
        layout="responsive"
        alt="Hero"
        width={1920}
        height={1080}
      />
    </div>
  );
};

export default HeroImage;