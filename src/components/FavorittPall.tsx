'use client';

import { useEffect, useState } from 'react';

interface Produkt {
  id: string;
  name: string;
  favorites: number;
  previousRank?: number;
}

export default function FavorittTabell() {
  const [produkter, setProdukter] = useState<Produkt[]>([]);

  useEffect(() => {
    const hentFavoritter = async () => {
      const res = await fetch('/api/top-favoritter');
      const data = await res.json();
      setProdukter(data);
    };

    hentFavoritter();
  }, []);

  return (
    <div className="mt-16">
      <h2 className="text-4xl font-bold text-center mb-6">
        Draktligaen
      </h2>
      <div className="max-w-2xl mx-auto border border-yellow-400  overflow-hidden">
        <div className="grid grid-cols-3 bg-green-900 text-white font-semibold text-sm text-left border-b border-gray-300">
          <div className="px-4 py-3 border-r border-yellow-400">#</div>
          <div className="px-4 py-3 border-r border-yellow-400">Drakt</div>
          <div className="px-4 py-3">❤️</div>
        </div>
        {produkter.map((produkt, index) => {
          const forrige = produkt.previousRank ?? index;
          const differanse = forrige - index;

          return (
            <div
              key={produkt.id}
              className="grid grid-cols-3 items-center text-sm border-b border-yellow-400"
            >
              <div className="px-4 py-2 border-r border-yellow-400 font-semibold flex items-center gap-1">
                {index + 1}.
                {index === 0 && (
                  <span className="text-yellow-500 text-lg animate-bounce ml-20">👑</span>
                )}
              </div>
              <div className="px-4 py-2 border-r border-yellow-400">{produkt.name}</div>
              <div className="px-4 py-2 flex items-center gap-1">
                {produkt.favorites} stemmer                {differanse > 0 && <span className="text-green-500">▲</span>}
                {differanse < 0 && <span className="text-blue-500">▼</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
