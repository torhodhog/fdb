"use client";
import React from "react";
import HeroImage from "@/components/HeroImage";
import Info from "@/components/Info";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ArrowDownToLine, CheckCircleIcon, Leaf } from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import ProductReel from "../components/ProductReel";
import WeglotSwitcher from "@/components/WeglotSwitcher";
import SalePage from "./Sale/page";
import FavorittPall from "@/components/FavorittPall";

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
        <link rel="alternate" hrefLang="no" href="https://fotballdb.no" />
        <link rel="alternate" hrefLang="en" href="https://en.fotballdb.no" />
      </Head>

      <MaxWidthWrapper className="overflow-visible">
        <div className="z-0">
          <div className="bg-transparent py-4">
            <div className="flex justify-center space-x-8">
              {/* Flag Links */}
              {/* Dine lenker her */}
            </div>
          </div>
          <div className="z-0">
            <div className="bg-transparent rounded-br-[10px] rounded-bl-[10px]">
              <div className="flex justify-center space-x-8">
                {/* <a className="text-black text-lg font-semibold hover:underline" href="/">
                  Hjem
                </a> */}
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
                  Salg <span className="text-red-700">%</span>
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

      {/* Removed duplicate buttons since they're now in hero */}

      <SalePage />
      {/* Sales button removed - now in hero section */}

      <section>
        <MaxWidthWrapper className="py-20">
          <FavorittPall />
        </MaxWidthWrapper>
      </section>

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
