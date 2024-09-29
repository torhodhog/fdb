"use client";
import React, { useEffect } from "react";
import FinalSale from "@/components/FinalSale";
import HeroImage from "@/components/HeroImage";
import HeroVideo from "@/components/HeroVideo";
import Info from "@/components/Info";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PlayVideo from "@/components/PlayVideo";
import ResponsiveImage from "@/components/ResponsiveImage";
import ResponsiveVideo from "@/components/ResponsiveImage";
import { ArrowDownToLine, CheckCircleIcon, Leaf } from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { TextEffect } from "@/components/TextEffectProp";
import Hero from "../components/Hero";
import ProductReel from "../components/ProductReel";
import WeglotSwitcher from "@/components/WeglotSwitcher";
import SalePage from "./Sale/page";

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
  useEffect(() => {
    // Legg til Elfsight script
    const script3 = document.createElement("script");
    script3.src = "https://static.elfsight.com/platform/platform.js";
    script3.setAttribute("data-use-service-core", "");
    script3.defer = true;
    document.body.appendChild(script3);

    // Rydd opp ved avmontering
    return () => {
      document.body.removeChild(script3);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Home - Fotballdraktbutikken</title>
        <meta name="description" content="Welcome to Fotballdraktbutikken" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="alternate" hrefLang="no" href="https://fotballdb.no" />
        <link rel="alternate" hrefLang="en" href="https://en.fotballdb.no" />

      
      </Head>

      <MaxWidthWrapper className="overflow-visible">
        <div className="z-0">
          <div className="bg-transparent py-4">
            <div className="flex justify-center space-x-8">
              <Link
                href={{ pathname: "/products", query: { nation: "England" } }}
                className="text-black text-lg font-semibold hover:underline"
              >
                <span style={{ fontSize: "2rem" }}>🇬🇧</span>
              </Link>
              <Link
                href={{ pathname: "/products", query: { nation: "Spania" } }}
                className="text-black text-lg font-semibold hover:underline"
              >
                <span style={{ fontSize: "2rem" }}>🇪🇸</span>
              </Link>
              <Link
                href={{ pathname: "/products", query: { nation: "Norge" } }}
                className="text-black text-lg font-semibold hover:underline"
              >
                <span style={{ fontSize: "2rem" }}>🇳🇴</span>
              </Link>
              <Link
                href={{ pathname: "/products", query: { nation: "Italia" } }}
                className="text-black text-lg font-semibold hover:underline"
              >
                <span style={{ fontSize: "2rem" }}>🇮🇹</span>
              </Link>
              <Link
                href={{ pathname: "/products", query: { nation: "Frankrike" } }}
                className="text-black text-lg font-semibold hover:underline"
              >
                <span style={{ fontSize: "2rem" }}>🇫🇷</span>
              </Link>
              <Link
                href={{ pathname: "/products", query: { nation: "Tyskland" } }}
                className="text-black text-lg font-semibold hover:underline"
              >
                <span style={{ fontSize: "2rem" }}>🇩🇪</span>
              </Link>
            </div>
          </div>
          <div className="z-0">
            <div className="bg-transparent rounded-br-[10px] rounded-bl-[10px]">
              <div className="flex justify-center space-x-8">
                <a
                  className="text-black text-lg font-semibold hover:underline"
                  href="/"
                >
                  Hjem
                </a>
                <a
                  className="text-black text-lg font-semibold hover:underline"
                  href="/products"
                >
                  Produkter
                </a>
                <a
                  className="text-black text-lg font-semibold hover:underline"
                  href="/Sale"
                >
                  SALG
                </a>
              </div>
            </div>
          </div>
          <div>
            <HeroImage />
          </div>
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
        />
      </MaxWidthWrapper>
      <div className="lg:hidden block text-center">
        <Link href="/products">
          <button className="bg-green-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto">
            Se alle drakter
          </button>
        </Link>
      </div>

      <SalePage />
      <div className="lg:hidden block text-center">
        <Link href="/products">
          <button className="bg-yellow-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto">
            SALG
          </button>
        </Link>
      </div>
      
      <MaxWidthWrapper className="py-20">
      <div className="p-8 h-auto">
  <h1 className="text-center mb-12 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-900 leading-tight drop-shadow-md">
    Utvalgte drakter
  </h1>
</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link href="https://fotballdb.no/product/66e42e4ac99f67e1f2d8d7cf">
        <h3 className="text-center mb-6 font-extrabold">CHILE</h3>
          <Image
            src="https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/BILDE1.jpeg"
            alt="Product 1"
            width={300}
            height={300}
            className=""
          />
        </Link>
        <Link href="https://fotballdb.no/product/66f2aaadd74fe5cfdd22bbc3">
        <h3 className="text-center mb-6 font-extrabold">ARGENTINA</h3>
          <Image
            src="https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/BILDE3.jpeg"
            alt="Product 2"
            width={300}
            height={300}
            className=""
          />
        </Link>
        <Link href="https://fotballdb.no/product/66e45f1bc99f67e1f2d8f434">
        <h3 className="text-center mb-6 font-extrabold">TYSKLAND</h3>
          <Image
            src="https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/BILDE2.jpeg"
            alt="Product 3"
            width={300}
            height={300}
            className=""
          />
        </Link>
      </div>
    </MaxWidthWrapper>

      <section>
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
          <div className="lg:block hidden m-8">
            <Info />
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
