'use client'

import React, { useRef } from "react";
import {
   motion,
   useScroll,
   useTransform,
   useSpring,
} from "framer-motion";
import CustomProductCard from "../ProductCard";
import ProductReel from "../ProductReel";

interface Product {
   title: string;
   link: string;
   thumbnail: string;
}

export const HeroParallax = () => {
   const ref = useRef(null);
   const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start start", "end start"],
   });

   const springConfig = { stiffness: 300, damping: 30, bounce: 100 };
   const translateX = useSpring(
      useTransform(scrollYProgress, [0, 1], [0, 1000]),
      springConfig
   );
   const translateXReverse = useSpring(
      useTransform(scrollYProgress, [0, 1], [0, -1000]),
      springConfig
   );
   const rotateX = useSpring(
      useTransform(scrollYProgress, [0, 0.2], [15, 0]),
      springConfig
   );
   const opacity = useSpring(
      useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
      springConfig
   );
   const rotateZ = useSpring(
      useTransform(scrollYProgress, [0, 0.2], [20, 0]),
      springConfig
   );
   const translateY = useSpring(
      useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
      springConfig
   );

   const firstRow: Product[] = []; // Definer første rad med produkter
   const secondRow: Product[] = []; // Definer andre rad med produkter
   const thirdRow: Product[] = []; // Definer tredje rad med produkter

   return (
      <div
         ref={ref}
         className="h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto perspective:1000px transform-style:preserve-3d"
      >
         <Header />
         <motion.div
            style={{
               rotateX,
               rotateZ,
               translateY,
               opacity,
            }}
         >
            <ProductReel query={{ sort: "desc", limit: 8 }} href="/products" title="Nye produkter" />
            <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
               {firstRow.map((product: Product, index: number) => (
                  <CustomProductCard
                     product={product}
                     translate={translateX}
                     key={`product-${index}`}
                  />
               ))}
            </motion.div>
            <motion.div className="flex flex-row mb-20 space-x-20 ">
               {secondRow.map((product: Product, index: number) => (
                  <CustomProductCard
                     product={product}
                     translate={translateXReverse}
                     key={`product-${index}`}
                  />
               ))}
            </motion.div>
            <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
               {thirdRow.map((product: Product, index: number) => (
                  <CustomProductCard
                     product={product}
                     translate={translateX}
                     key={`product-${index}`}
                  />
               ))}
            </motion.div>
         </motion.div>
      </div>
   );
};

const Header = () => {
   return (
      <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
         <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
            Velkommen til <br /> FOTBALLDRAKTBUTIKKEN
         </h1>
         <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
            Vi har et stort utvalg av fotballdrakter fra hele verden, til konkurransedyktige priser.
            Produktlageret oppdateres jevnlig, så følg med for nye produkter.
         </p>
      </div>
   );
};

export default HeroParallax;
