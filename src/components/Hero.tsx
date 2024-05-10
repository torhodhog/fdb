"use client";

import {
  PerspectiveCamera,
  Preload,
  Scroll,
  ScrollControls,
} from "@react-three/drei";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

const Hero: FC = () => {
  return (
    <div className="relative z-[-10] flex lg:flex-row flex-col-reverse lg:h-auto h-[40vh]">   
      <div className="relative w-full lg:block hidden mt-6" style={{ 
        height: "600px",
        backgroundImage: `url(/herotest.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-80 h-80 rounded-full overflow-hidden spin" style={{ margin: 0, padding: 0 }}>
            <Image
              src="/cellheroimage.png"
              alt="Hero Logo"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .spin {
          animation: spin 20s linear infinite;
        }
      `}</style>

      <div
        className="relative w-full pl-0 pr-0 block lg:hidden flex flex-col items-center"
        style={{ height: "90vh" }}
      >
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-auto h-auto  overflow-hidden relative">
            <img
  src="https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/Asset+4-100.jpg"
  alt="Hero Logo"
  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;