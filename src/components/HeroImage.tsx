"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { trpc } from "@/trpc/client";
import { Product } from "@/payload-types";

const HeroImage = () => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const { data } = trpc.getInfiniteProducts.useQuery({
    limit: 50,
    cursor: 1,
    query: {
      sortBy: "random",
    },
  });

  useEffect(() => {
    if (!data?.items || data.items.length === 0) return;

    const allProducts = data.items as Product[];
    const shuffled = allProducts.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    setSelectedProducts(selected);
  }, [data]);
  return (
    <div className="relative bg-white py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Left Content */}
          <motion.div 
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full text-green-700 text-sm font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Norges beste fotballdraktbutikk
            </motion.div>

            <motion.h1 
              className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Dine{" "}
              <span className="bg-gradient-to-r from-green-600 to-yellow-500 bg-clip-text text-transparent">
                fotball
              </span>
              <br />drømmer
            </motion.h1>

            <motion.p 
              className="text-xl text-gray-600 mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Opplev følelsen av å være en del av laget. Originale drakter fra verdens beste klubber.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                href="/products"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-green-700 rounded-2xl hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105"
              >
                🏟️ Utforsk drakter
              </Link>
              
              <Link
                href="/Sale"
                className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-green-700 border-2 border-green-600 rounded-2xl hover:bg-green-50 transition-all duration-300 hover:scale-105"
              >
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                  SALG
                </span>
                🔥 Opptil 50% rabatt
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative h-[400px] lg:h-[450px]">
              {selectedProducts.map((product, index) => {
                const positions = [
                  { top: '0', left: '0' },
                  { top: '8px', right: '0' },
                  { bottom: '0', left: '50%', transform: 'translateX(-50%)' }
                ];
                const animations = [
                  { y: [0, -8, 0], rotate: [0, 1, 0] },
                  { y: [0, 8, 0], rotate: [0, -1, 0] },
                  { y: [0, -5, 0], scale: [1, 1.02, 1] }
                ];
                const delays = [0, 2, 1];
                
                const imageField = product.images?.[0]?.image;
                const imageUrl = typeof imageField === "string" 
                  ? imageField 
                  : (imageField?.url ?? "");

                return (
                  <motion.div 
                    key={product.id}
                    className="absolute w-40 lg:w-48 bg-white rounded-2xl shadow-xl border p-4"
                    style={positions[index]}
                    animate={animations[index]}
                    transition={{ 
                      duration: index === 2 ? 3 : 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: delays[index]
                    }}
                  >
                    <Link href={`/product/${product.id}`}>
                      <div className="w-full h-28 lg:h-32 rounded-xl mb-3 overflow-hidden bg-gray-100">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={product.name}
                            width={200}
                            height={128}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-green-500 to-green-600 rounded-xl"></div>
                        )}
                      </div>
                      <h3 className="text-gray-900 font-semibold text-sm mb-1 truncate">{product.name}</h3>
                      <p className="text-gray-500 text-xs">
                        {product.liga_system || 'Fotballdrakt'} • {product.size}
                      </p>
                      <div className="mt-2 text-green-600 text-lg font-bold">
                        {product.onSale && product.salePrice 
                          ? `${product.salePrice} kr` 
                          : `${product.price} kr`
                        }
                      </div>
                    </Link>
                  </motion.div>
                );
              })}

              {/* Fallback hvis ingen produkter er lastet ennå */}
              {selectedProducts.length === 0 && (
                <>
                  <motion.div 
                    className="absolute top-0 left-0 w-40 lg:w-48 bg-white rounded-2xl shadow-xl border p-4"
                    animate={{ 
                      y: [0, -8, 0],
                      rotate: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="w-full h-28 lg:h-32 bg-gradient-to-br from-green-500 to-green-600 rounded-xl mb-3"></div>
                    <h3 className="text-gray-900 font-semibold text-sm mb-1">Laster produkter...</h3>
                    <p className="text-gray-500 text-xs">Fotballdrakt</p>
                    <div className="mt-2 text-green-600 text-lg font-bold">-- kr</div>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-20 fill-white">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroImage;
