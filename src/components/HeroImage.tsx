"use client";

import { FC } from "react";

const HeroImage: FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-[600px] mt-8">
      <img
        src="https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/logo-5.png"
        style={{ width: '70%', height: '100%' }}
        alt="Hero"
      />
    </div>
  );
};

export default HeroImage;