'use client';

import { useEffect, useState } from 'react';

interface Produkt {
  id: string;
  name: string;
  images: { image: { url: string } }[];
  favorites: number;
}

export default function FavorittPall() {
  const [produkter, setProdukter] = useState<Produkt[]>([]);

  useEffect(() => {
    const hentFavoritter = async () => {
      const res = await fetch('/api/top-favoritter');
      const data = await res.json();
      setProdukter(data);
    };

    hentFavoritter();
  }, []);

  if (produkter.length === 0) {
    return <p>Ingen favoritter enda...</p>;
  }

  const visningsRekkefølge = [1, 0, 2]; // sølv, gull, bronse

  const høyder = ['h-56', 'h-64', 'h-52']; // gull i midten
  const farger = ['bg-gray-300', 'bg-yellow-300', 'bg-amber-700'];
  const medaljer = ['🥈', '🥇', '🥉'];

  return (
    <div className="mt-14 text-center">
      <h2 className="text-xl font-bold mb-6">Folkets mest elskede drakter</h2>
      <div className="flex justify-center items-end gap-6">
        {visningsRekkefølge.map((pos, index) => {
          const produkt = produkter[pos];
          return (
            <div
              key={produkt.id}
              className={`flex flex-col items-center justify-between p-4 rounded-xl shadow-lg w-44 relative transition-transform hover:scale-105 ${høyder[index]} ${farger[index]}`}
            >
              <span className="text-2xl absolute top-2 left-2">{medaljer[index]}</span>

              {/* Krone for gullvinner */}
              {index === 1 && (
                <span className="absolute -top-5 text-3xl animate-bounce">👑</span>
              )}

              <img
                src={produkt.images?.[0]?.image?.url || '/placeholder.jpg'}
                alt={produkt.name}
                className="w-24 h-24 object-contain rounded-md border border-white shadow mb-2"
              />
              <p className="text-center text-sm font-semibold">{produkt.name}</p>
              <span className="text-xs text-gray-700">{produkt.favorites} ❤️</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
