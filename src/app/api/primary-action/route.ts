// File: app/api/primary-action/route.ts
import { NextRequest, NextResponse } from "next/server";
import { EmailTemplate } from "@/components/emails/PrimaryActionEmail";
import { render } from "@react-email/components";
import { Resend } from "resend";
import React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, actionLabel, buttonText, href } = body;

    if (!email || !actionLabel || !buttonText || !href) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const html = await render(
      React.createElement(EmailTemplate, {
        actionLabel: actionLabel,
        buttonText: buttonText,
        href: href,
      })
    );

    await resend.emails.send({
      from: "fdb@fotballdraktbutikken.com",
      to: email,
      subject: actionLabel,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
