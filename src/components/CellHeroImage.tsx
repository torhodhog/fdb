"use client";

import { FC } from "react";
import Image from "next/image";

const CellHeroImage: FC = () => {
  return (
    <div className="relative w-full h-[300px] ">
      <Image
        src="https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/EM-hero-edit.jpeg"
        layout="fill"
        objectFit="contain"
        alt="Hero"
        width={1920}
        height={1080}
      />
    </div>
  );
};

export default CellHeroImage;