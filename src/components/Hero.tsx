"use client";

import { FC } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamisk import av HeroVideo-komponenten
const HeroVideo = dynamic(() => import("./HeroVideo"), { ssr: false });

const Hero: FC = () => {
  return (
    <div className="relative flex lg:flex-row flex-col-reverse lg:h-auto h-[40vh]">
      {/* Desktop View with Video */}
      <HeroVideo />

      {/* Mobile View with Image */}
      <div className="relative w-full flex flex-col items-center justify-center lg:hidden" style={{ height: "100vh" }}>
        <div className="relative z-10 flex flex-col items-center w-full h-full">
          <Image
            src="https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/test+hero+telefon.png"
            alt="Hero Logo"
            layout="fill"
            objectFit="cover"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;