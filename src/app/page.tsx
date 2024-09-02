"use client"
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
import WeglotSwitcher from "@/components/WeglotSwitcher"; // Importer WeglotSwitcher

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
    // Legg til Google Tag Manager script
    const script1 = document.createElement('script');
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=AW-16606503757';
    script1.async = true;
    document.body.appendChild(script1);

    // Legg til Google Ads script
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-16606503757');
    `;
    document.body.appendChild(script2);

    // Legg til Elfsight script
    const script3 = document.createElement('script');
    script3.src = 'https://static.elfsight.com/platform/platform.js';
    script3.setAttribute('data-use-service-core', '');
    script3.defer = true;
    document.body.appendChild(script3);

    // Rydd opp ved avmontering
    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
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
      
      <MaxWidthWrapper className="overflow-visable">
        <div className="z-0">
          <HeroImage />
           {/* <TextEffect className="absolute top-50 left-50" per='word' as='h1' preset='blur'>
          Animate your ideas with motion-primitives
        </TextEffect> */}
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
    </>
  );
}