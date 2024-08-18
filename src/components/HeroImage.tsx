"use client";

import { FC } from "react";

const HeroImage: FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-[600px] mt-8">
      <img
        src="https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/logo-5.png"
        className="w-full h-full max-w-lg md:max-w-2xl lg:max-w-4xl"
        style={{ objectFit: 'contain' }}
        alt="Hero"
      />
    </div>
  );
};

export default HeroImage;