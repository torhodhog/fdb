"use client"
import React, { useEffect, useState } from "react";
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

import Hero from "../components/Hero";
import ProductReel from "../components/ProductReel";

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
  const [weglotLoaded, setWeglotLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.weglot.com/weglot.min.js";
    script.async = true;
    script.onload = () => {
      if (window.Weglot) {
        window.Weglot.initialize({
          api_key: 'wg_637608e12b26daef9cf89edc1fc07fa27'
        });
        console.log("Weglot initialized");
        setWeglotLoaded(true);
      } else {
        console.error("Weglot is not available on window");
      }
    };
    document.head.appendChild(script);
  }, []);

  const switchLanguage = (lang: string) => {
    console.log(`Attempting to switch language to ${lang}`);
    if (weglotLoaded && window.Weglot) {
      window.Weglot.switchTo(lang);
      console.log(`Switched language to ${lang}`);
    } else {
      console.error("Weglot is not available on window");
    }
  };

  return (
    <>
      <Head>
        <title>Home - Fotballdraktbutikken</title>
        <meta name="description" content="Welcome to Fotballdraktbutikken" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="alternate" hrefLang="no" href="https://fotballdb.no" />
        <link rel="alternate" hrefLang="en" href="https://en.fotballdb.no" />
      </Head>
      
      <MaxWidthWrapper className="overflow-visable">
        <div className="z-0">
          <HeroImage />
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
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto">
            Se alle drakter
          </button>
        </Link>
      </div>

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
      
      <div className="language-switcher">
        <button
          className="mr-4 ml-4"
          onClick={() => switchLanguage('no')}
        >
          <img className="w-8" src="norway-flag.png" alt="Norwegian Flag" />
        </button>
        <button onClick={() => switchLanguage('en')}>
          <img className="w-8" src="uk-flag.png" alt="UK Flag" />
        </button>
      </div>

      <style jsx>{`
        .language-switcher {
          position: fixed;
          top: 16px;
          left: 16px;
          z-index: 50;
          display: flex;
          gap: 8px;
        }
        @media (max-width: 768px) {
          .language-switcher {
            top: 8px;
            left: 8px;
          }
        }
      `}</style>
    </>
  );
}