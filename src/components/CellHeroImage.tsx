"use client";

import { FC } from "react";
import Image from "next/image";

const CellHeroImage: FC = () => {
  return (
    <div className="relative w-full h-[300px] ">
      <Image
        src="https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/EM-hero.jpeg"
        layout="fill"
        objectFit="contain"
        alt="Hero"
      />
    </div>
  );
};

export default CellHeroImage;