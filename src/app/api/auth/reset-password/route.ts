import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let body;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "Ugyldig forespørsel." }, { status: 400 });
  }

  const { token, password } = body;

  if (!token || !password) {
    return NextResponse.json({ error: "Token og passord er påkrevd." }, { status: 400 });
  }

  try {
    const payloadRes = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/reset-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      }
    );

    if (!payloadRes.ok) {
      const errorDetails = await payloadRes.json();
      return NextResponse.json(
        { error: errorDetails.message || "Feil ved oppdatering av passord." },
        { status: payloadRes.status }
      );
    }

    return NextResponse.json({ message: "Passord oppdatert." });
  } catch (error) {
    console.error("Serverfeil:", error);
    return NextResponse.json(
      { error: "Intern serverfeil." },
      { status: 500 }
    );
  }
}
