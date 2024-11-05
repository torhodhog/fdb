"use client";

import { FC } from "react";
import HeroImage from "./HeroImage";
import CellHeroImage from "./CellHeroImage";
import { TextHoverEffectDemo } from "./TextHoverEffectDemo";

const Hero: FC = () => {
  return (
    <div className="relative flex lg:flex-row flex-col-reverse lg:h-auto h-[auto]">
      {/* Desktop View with Image */}
      <div className="lg:block hidden">
        <TextHoverEffectDemo />
      </div>

      {/* Mobile View with Image */}
      <div className="relative w-full  flex-col items-center justify-center lg:hidden block">
        <HeroImage/>
      </div>
    </div>
  );
};

export default Hero;