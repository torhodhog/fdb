import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getPayloadClient } from "../../../../get-payload";

export async function DELETE(
  req: Request,
  { params }: { params: { favoriteId: string } }
) {
  const payload = await getPayloadClient();
  const { user } = await payload.getServerSideUser(cookies());

  if (!user) {
    return NextResponse.json({ error: "Ikke logget inn" }, { status: 401 });
  }

  const { favoriteId } = params;
  if (!favoriteId) {
    return NextResponse.json({ error: "ID kreves" }, { status: 400 });
  }

  const favorite = await payload.find({
    collection: "favorites",
    where: {
      product: {
        equals: favoriteId,
      },
    },
  });

  if (!favorite.docs.length) {
    return NextResponse.json({ error: "Favoritt ikke funnet" }, { status: 404 });
  }

  await payload.delete({
    collection: "favorites",
    id: favorite.docs[0].id,
  });

  return NextResponse.json({ success: true });
}