"use client";

import { FC } from "react";
import Image from "next/image";

const HeroImage: FC = () => {
  return (
    <div className="relative w-full h-[600px] mt-8">
      <Image
        src="https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/EM-hero.jpeg"
        layout="fill"
        objectFit="cover"
        alt="Hero"
      />
    </div>
  );
};

export default HeroImage;