'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Produkt {
  id: string;
  name: string;
  favorites: number;
  previousRank?: number;
  slug?: string; // Added slug property
}

export default function FavorittTabell() {
  const [produkter, setProdukter] = useState<Produkt[]>([]);

  useEffect(() => {
    const hentFavoritter = async () => {
      const res = await fetch('/api/top-favoritter');
      const data = await res.json();
      setProdukter(data.slice(0, 10)); // Bare topp 10
    };

    hentFavoritter();
  }, []);

  return (
    <div className="mt-20">
      <h2 className="text-4xl font-extrabold text-center mb-8 tracking-tight text-green-900">
        Draktligaen
      </h2>

      <div className="max-w-3xl mx-auto border border-gray-300 rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-12 bg-green-900 text-white text-xs sm:text-sm font-semibold text-left">
          <div className="col-span-1 px-2 py-3 text-center">#</div>
          <div className="col-span-9 px-4 py-3">Drakt</div>
          <div className="col-span-2 px-2 py-3 text-center">❤️</div>
        </div>

        {produkter.map((produkt, index) => {
          const forrige = produkt.previousRank ?? index;
          const differanse = forrige - index;

          return (
            <div
              key={produkt.id}
              className={`grid grid-cols-12 items-center text-xs sm:text-sm border-t border-gray-200 hover:bg-gray-50 transition`}
            >
              <div className="col-span-1 px-2 py-3 text-center font-bold text-green-800">
                {index + 1}
                {index === 0 && (
                  <span className="ml-1">👑</span>
                )}
              </div>

              <div className="col-span-9 px-4 py-3 text-gray-800 truncate">
              <Link href={`/product/${produkt.slug ?? produkt.id}`} className="hover:underline text-blue-700">
    {produkt.name}
  </Link>
              </div>

              <div className="col-span-2 px-2 py-3 text-center flex items-center justify-center gap-1 font-semibold text-gray-700">
                {produkt.favorites}
                {differanse > 0 && (
                  <span className="text-green-500 text-lg">▲</span>
                )}
                {differanse < 0 && (
                  <span className="text-red-500 text-lg">▼</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
