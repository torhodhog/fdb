import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PlayVideo from "@/components/PlayVideo";
import { ArrowDownToLine, CheckCircleIcon, Leaf } from "lucide-react";
import React from "react";

import ProductReel from "../components/ProductReel";

const perks = [
  {
    name: "Gratis frakt",
    Icon: ArrowDownToLine,
    description: "På alle bestillinger over 1000 kr",
  },
  {
    name: "Garanter kvalitet",
    Icon: CheckCircleIcon,
    description:
      "Vi har fokus på kvalitet og originalitet og ønsker at alle produkter vi selger skal være av ypperste kvalitet. Ikke fornøyd? Vi har 30 dagers åpent kjøp.",
  },
  {
    name: "Bærekraft",
    Icon: Leaf,
    description:
      "Med brukte drakter tar vi vare på planeten, samtidig som vi tar vare på historien til fotballen.",
  },
];

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="h-[40rem] w-full  flex flex-col items-center justify-center overflow-hidden rounded-md">
        
      
          <img src="/herotest.png" alt="Hero Logo" className="absolute z-20 block lg:block hidden" />
          <img src="/logo.png" alt="Hero Logo Mobile" className="absolute pl-12 pr-12 z-20 block lg:hidden" />

          {/* Radial Gradient to prevent sharp edges */}
          <div className="absolute inset-0 w-full h-full  [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
        
        
        
        <ProductReel
          query={{ sort: "desc", limit: 4 }}
          href="/products"
          title="Nye produkter"
        />
     
      </MaxWidthWrapper>
     
        
      
      <section className='border-t border-gray-200 '>
        <MaxWidthWrapper className='py-20'>
          <div className='grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0 z-30'>
            {perks.map((perk) => (
              <div
                key={perk.name}
                className='text-center md:flex md:items-start md:text-left lg:block lg:text-center'>
                <div className='md:flex-shrink-0 flex justify-center'>
                  <div className='h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900'>
                    {<perk.Icon className='w-1/3 h-1/3' />}
                  </div>
                </div>

                <div className='mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6'>
                  <h3 className='text-base font-medium text-gray-900'>
                    {perk.name}
                  </h3>
                  <p className='mt-3 text-sm text-muted-foreground'>
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
