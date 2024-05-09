import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PlayVideo from "@/components/PlayVideo";
import { ArrowDownToLine, CheckCircleIcon, Leaf } from "lucide-react";
import React from "react";

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
  return (
    <>
      <MaxWidthWrapper className="overflow-visable">
        <div className="z-0">
          <Hero />
        </div>
        <ProductReel
          title="Nye produkter"
          href="/products"
          hideSoldItems // Add this line
          query={{
            limit: 8,
            sortBy: "createdAt",
            sortOrder: "desc",
          }}
        />
        <ProductReel
          title="Salgsprodukter"
          href="/Sale" // Lenke til salgssiden
          showSaleItems // Vis bare produkter på salg
          query={{
            limit: 6,
            sortBy: "createdAt",
            sortOrder: "desc",
          }}
        />
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
            <PlayVideo />
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
