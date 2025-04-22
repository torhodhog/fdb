// app/api/send-receipt/route.ts

import { ReceiptEmail } from "@/components/emails/ReceiptEmail";
import { render } from "@react-email/render";
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();

  const { email, date, orderId, products, deliveryFee } = body;

  try {
    const emailHtml = await render(
      ReceiptEmail({ email, date: new Date(date), orderId, products, deliveryFee }),
      { pretty: true }
    );

    console.log("Sender kvittering til:", email);

    const data = await resend.emails.send({
      from: "Fotballdraktbutikken AS <fdb@fotballdraktbutikken.com>", // ← OBS! Må være verifisert i Resend
      to: email,
      subject: "Kvittering fra Fotballdraktbutikken",
      html: emailHtml,
    });

    return NextResponse.json({ status: "OK", data });
  } catch (error) {
    console.error("Feil ved sending av kvittering:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
