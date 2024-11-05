"use client";

import { FC } from "react";
import Image from 'next/image';
import { TextHoverEffectDemo } from "./TextHoverEffectDemo";

const HeroImage: FC = () => {
  return (
    <div className="relative flex justify-center items-center w-full h-96 mt-6 bg-transparent z-1">
      {/* Bakgrunnsbilde */}
      <Image
        src="/heroimage.jpg" // Pass på at bildefilen er riktig plassert i public-mappen
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        // Juster opasiteten for ønsket effekt
        priority // Laster inn bildet tidlig for bedre ytelse
      />
      
      {/* Hover-effekt over bakgrunnen */}
      {/* <div className="absolute z-10">
        <TextHoverEffectDemo />
      </div> */}
    </div>
  );
};

export default HeroImage;
