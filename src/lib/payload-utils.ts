import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { NextRequest } from "next/server";

import { User } from "../payload-types";

export const getServerSideUser = async (
  cookies: NextRequest["cookies"] | ReadonlyRequestCookies
) => {
  const token = cookies.get("payload-token")?.value;

  // Logg token for feilsøking (fjern denne i produksjon!)
  console.log("Token:", token);

  const meRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
    {
      headers: {
        Authorization: `JWT ${token}`,
      },
    }
  );

  // Logg status og statusTekst for feilsøking
  console.log("API Response Status:", meRes.status);
  console.log("API Response StatusText:", meRes.statusText);

  // Sjekk om responsen er ok
  if (!meRes.ok) {
    throw new Error(`An error occurred: ${meRes.statusText}`);
  }

  // Sjekk om responsen er JSON
  const contentType = meRes.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error(`Expected JSON but received ${contentType}`);
  }

  // Hent og logg JSON-respons (bruk dette forsiktig for å unngå å logge sensitiv info)
  const jsonResponse = await meRes.json();
  console.log("API Response JSON:", jsonResponse);

  const { user } = jsonResponse as { user: User | null };

  return { user };
};

