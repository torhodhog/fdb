import { getPayloadClient } from "@/get-payload";

export async function GET() {
  if (process.env.NEXT_BUILD === "true") {
    console.warn("⚠️ Skipping /api/top-favoritter during static export.");
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const payload = await getPayloadClient();

  const { docs: favorites } = await payload.find({
    collection: "favorites",
    limit: 1000,
  });

  const counts: Record<string, number> = {};
  for (const fav of favorites) {
    const id = typeof fav.product === "string" ? fav.product : fav.product.id;
    if (id) counts[id] = (counts[id] || 0) + 1;
  }

  const sorted = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10); // 👈 hent topp 10

  const topProductIds = sorted.map(([id]) => id);

  const { docs: products }: { docs: Array<{ id: string; [key: string]: any }> } = await payload.find({
    collection: "products",
    where: {
      id: { in: topProductIds },
    },
    limit: 10,
  });

  // Behold rekkefølge fra counts
  const enriched = topProductIds
    .map((id) => {
      const product = products.find((p) => p.id === id);
      if (!product) return null;
      return {
        ...product,
        favorites: counts[id] || 0,
      };
    })
    .filter(Boolean);

  return new Response(JSON.stringify(enriched), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
