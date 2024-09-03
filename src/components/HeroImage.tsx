"use client";

import { FC } from "react";
import Image from 'next/image';

const HeroImage: FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-auto mt-8 bg-transparent"> 
      <Image
        src="https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/logo-5.png"
        className="max-w-lg md:max-w-2xl lg:max-w-xl"
        layout="responsive"
        alt="Hero"
        width={1920}
        height={1080}
      />
    </div>
  );
};

export default HeroImage;
