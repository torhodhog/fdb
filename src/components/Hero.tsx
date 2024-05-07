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
    <div className="relative z-[-10] flex lg:flex-row flex-col-reverse lg:h-[80vh] h-[40vh]">
      <div
        className="relative w-full lg:block hidden mt-6 spin"
        style={{ height: "600px" }}
      >
        <div className="absolute inset-0">
          <Image
            src="/cellheroimage.jpg"
            alt="Hero Logo"
            layout="fill"
            objectFit="cover"
          />
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
          <div className="w-40 h-40 rounded-full overflow-hidden relative">
            <div className="absolute inset-0 spin">
              <Image
                src="/cellheroimage.jpg"
                alt="Hero Logo"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>

          <Link href="/products">
  <div
    className="absolute left-0 z-10 w-full"
    style={{ bottom: "-60%" }} // Adjust the position
  >
    <span className="text-base font-extrabold text-pink-700 hover:text-blue-500">
      Se hele kolleksjonen
    </span>{" "}
    <span aria-hidden="true">&rarr;</span>
  </div>
</Link>

<Link href="/sale">
  <div
    className="absolute left-0 z-10 "
    style={{ bottom: "-80%" }} // Adjust the position
  >
    <span className="text-base font-extrabold text-pink-700 hover:text-blue-500">
      Salg
    </span>{" "}
    <span aria-hidden="true">&rarr;</span>
  </div>
</Link>
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
    </div>
  );
};

export default Hero;
