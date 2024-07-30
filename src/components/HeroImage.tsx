"use client";

import { FC } from "react";
import Image from "next/image";

const HeroImage: FC = () => {
  return (
    <div className="relative w-full h-[600px] mt-8">
  <img
    src="https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/stengt.png"
    style={{ width: '100%', height: '100%' }}
    alt="Hero"
  />
</div>
  );
};

export default HeroImage;