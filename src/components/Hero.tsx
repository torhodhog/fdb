'use client'

import { PerspectiveCamera, Preload, Scroll, ScrollControls } from "@react-three/drei";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

const Hero: FC = () => {
  return (
    <div className="relative flex lg:flex-row flex-col-reverse">
      <div className="relative w-full lg:block hidden mt-6" style={{ height: "600px" }}>
        <Image
          src="https://forsoker-ny-botte.s3.amazonaws.com/hero.png"
          alt="Hero Logo"
          layout="fill"
          objectFit="cover"
        />
      </div>
      
      <div className="relative w-full pl-0 pr-0 block lg:hidden flex flex-col items-center" style={{ height: "90vh" }}>
        
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-40 h-40 rounded-full overflow-hidden">
            <Image
              src="/cellheroimage.jpg"
              alt="Hero Logo Mobile"
              layout="fill"
              objectFit="cover"
              objectPosition="top"
              className="mt-55"
            />
          </div>
          
          <div className="text-center mt-4"> 
            <h3>Ditt hjem for fotballhistorie</h3>
          </div>
          
         <Link href="/products">
  <div
    className="absolute left-1/2 transform -translate-x-1/2 z-10 w-full"
    style={{ bottom: "-70%" }} // Adjust the position
  >
    <span className="text-base font-extrabold text-pink-700 hover:text-blue-500">
      Se hele kolleksjonen
    </span>{" "}
    <span aria-hidden="true">&rarr;</span>
  </div>
</Link>

<Link href="/contact">
  <div
    className="absolute left-1/2 transform -translate-x-1/2 z-10 "
    style={{ bottom: "-90%" }} // Adjust the position
  >
    <span className="text-base font-extrabold text-pink-700 hover:text-blue-500">
      Kontakt
    </span>{" "}
    <span aria-hidden="true">&rarr;</span>
  </div>
</Link>
        </div>
      </div>
    </div>
    
  );
};

export default Hero;
