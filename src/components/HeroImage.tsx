"use client";

import HeroDraktDisplay from "./HeroDraktDisplay";
import Image from "next/image";
import Link from "next/link";
import HeroVideo from "./HeroVideo";

const HeroImage = () => {
  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-green-50 to-white overflow-hidden mt-24 md:mt-0">
      {/* Paraply - men mindre prominent */}
      <div className="absolute top-[10%] right-[10%] w-[200px] z-10 pointer-events-none block md:hidden opacity-30">
        <Image
          src="https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/paraply-Photoroom-bakgrunn+fjernet.png"
          alt="Hero paraply"
          width={200}
          height={120}
          style={{
            filter: "blur(1px)",
          }}
          priority
        />
      </div>

      {/* Mobil Hero Content */}
      <div className="md:hidden absolute inset-0 flex flex-col items-center justify-center px-6 z-20">
        {/* Hovedtittel */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Fotball<span className="text-green-900">draktbutikken</span>
          </h1>
          <p className="text-lg text-gray-600 italic">
            Norges største utvalg av fotballdrakter
          </p>
        </div>

        {/* CTA Knapper */}
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <Link
            href="/products"
            className="bg-green-900 hover:bg-green-800 text-white font-bold py-4 px-6 rounded-xl text-center text-lg shadow-lg transform hover:scale-105 transition-all"
          >
            🏟️ Se alle drakter
          </Link>
          <Link
            href="/Sale"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-6 rounded-xl text-center text-lg shadow-lg transform hover:scale-105 transition-all"
          >
            🔥 SALG - Opptil 50% rabatt
          </Link>
        </div>

        {/* Stats eller features */}
        <div className="grid grid-cols-3 gap-4 mt-8 w-full max-w-sm text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
            <div className="text-2xl font-bold text-green-900">300+</div>
            <div className="text-xs text-gray-600">Drakter</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
            <div className="text-2xl font-bold text-green-900">HURTIG</div>
            <div className="text-xs text-gray-600">Levering</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
            <div className="text-2xl font-bold text-green-900">30D</div>
            <div className="text-xs text-gray-600">Åpent kjøp</div>
          </div>
        </div>
      </div>

      {/* Background Video (mindre prominent på mobil) */}
      <div className="absolute inset-0 opacity-20 md:opacity-100">
        <HeroVideo />
      </div>
    </div>
  );
};

export default HeroImage;
