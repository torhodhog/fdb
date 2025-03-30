"use client";

import HeroDraktDisplay from "./HeroDraktDisplay";
import Image from "next/image";

const HeroImage = () => {
  return (
    <div className="relative w-full h-[600px] bg-white">
      {/* Paraply vises kun på mobil */}
      <div className="absolute top-[0%] left-1/2 transform -translate-x-1/2 w-[500px] z-30 pointer-events-none block md:hidden">

        <Image
          src="https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/paraply-Photoroom-bakgrunn+fjernet.png"
          alt="Hero paraply"
          width={500}
          height={300}
          style={{
            opacity: 0.85,
            filter: "blur(0px)",
          }}
          priority
        />
      </div>

      {/* Drakter + slagord */}
      <HeroDraktDisplay />
    </div>
  );
};

export default HeroImage;
