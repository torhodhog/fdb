export const dynamic = "force-dynamic"; 

export const revalidate = 600; // Cache 10 min

export async function GET() {
  // Lazy-import først for sikkerhets skyld
  const { getPayloadClient } = await import("@/get-payload");

  const payload = await getPayloadClient();

  const { docs: favorites } = await payload.find({
    collection: "favorites",
    limit: 1000,
  });

  const counts: Record<string, number> = {};
  for (const fav of favorites) {
    const id = typeof fav.product === "string" ? fav.product : fav.product.id;
    counts[id] = (counts[id] || 0) + 1;
  }

  const topProductIds = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([id]) => id);

  const { docs: products } = await payload.find({
    collection: "products",
    where: {
      id: { in: topProductIds },
    },
    limit: 10,
    depth: 0,
  });

  const productsSorted = topProductIds.map((id) =>
    products.find((p: { id: string }) => p.id === id)
  ).filter(Boolean);

  const enriched = productsSorted.map((p: { id: string; name: string; slug?: string }) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    favorites: counts[p.id] || 0,
  }));

  return new Response(JSON.stringify(enriched), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
