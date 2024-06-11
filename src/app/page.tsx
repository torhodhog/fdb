import FinalSale from "@/components/FinalSale";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PlayVideo from "@/components/PlayVideo";
import ResponsiveImage from "@/components/ResponsiveImage";
import { ArrowDownToLine, CheckCircleIcon, Leaf } from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import Hero from "../components/Hero";
import ProductReel from "../components/ProductReel";
import Info from "@/components/Info";
import ResponsiveVideo from "@/components/ResponsiveImage";

const perks = [
  {
    name: "Gratis frakt",
    Icon: ArrowDownToLine,
    description: "På alle bestillinger over 1500 kr",
  },
  {
    name: "Kvalitet",
    Icon: CheckCircleIcon,
    description:
      "Vi har fokus på kvalitet og originalitet og ønsker at alle produkter vi selger skal være av ypperste kvalitet. Ikke fornøyd? Vi har 30 dagers åpent kjøp.",
  },
  {
    name: "Bærekraft",
    Icon: Leaf,
    description:
      "Vi bryr oss om miljøet og sender våre varer på den mest miljøbesparende måten",
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Home - Fotballdraktbutikken</title>
        <meta name="description" content="Welcome to Fotballdraktbutikken" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MaxWidthWrapper className="overflow-visable">
        <div className="z-0">
          <Hero />
        </div>
        <ProductReel
          title="Nye produkter"
          href="/products"
          hideSoldItems
          query={{
            limit: 10,
            sortBy: "createdAt",
            sortOrder: "desc",
          }}
          // isHomePage={true} // Pass isHomePage as true
        />
      </MaxWidthWrapper>
      <div className="lg:hidden block text-center">
        <Link href="/products">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto">
            Se alle drakter
          </button>
        </Link>
      </div>
      <MaxWidthWrapper className="flex flex-wrap justify-between">
        {/* <div className="relative w-full md:w-1/2 h-full md:h-128 lg:h-192 mt-6 md:mt-24 mb-6 md:mb-40">
          <FinalSale
            src="https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/Em-teaser.jpeg"
            alt="Final Sale"
          />
        </div> */}
       <div className="relative w-full h-auto mt-10">
  <Link href="/Sale">
    <ResponsiveVideo
      src="https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/SALGSVIDEO.mp4"
      alt="Salg"
    />
  </Link>
</div>
      </MaxWidthWrapper>

      <section className="border-t border-gray-200  z-0">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0 z-30">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                    {<perk.Icon className="w-1/3 h-1/3" />}
                  </div>
                </div>

                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium">{perk.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
        
        <MaxWidthWrapper>
          <div className="lg:block hidden">
            <Info />
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
