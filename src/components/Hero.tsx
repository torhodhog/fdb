"use client";

import { FC } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamisk import av HeroVideo-komponenten
const HeroVideo = dynamic(() => import("./HeroVideo"), { ssr: false });

const Hero: FC = () => {
  return (
    <div className="relative flex lg:flex-row flex-col-reverse lg:h-auto h-[auto]">
      {/* Desktop View with Video */}
      <HeroVideo />

      {/* Mobile View with Image */}
      <div className="relative w-full flex flex-col items-center justify-center lg:hidden" style={{ height: "20vh" }}>
        <div className="relative z-10 flex flex-col items-center w-full h-full mt-20">
          <h1 className="font-mono font-bold text-2xl">Velkommen til fotballdraktbutikken</h1>
          <p className="text-center font-mono">Vi leverer kvalitetsdrakter fra flere tiår.</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;