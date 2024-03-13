import { User } from "../payload-types";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { NextRequest } from "next/server";

export const getServerSideUser = async (
  cookies: NextRequest["cookies"] | ReadonlyRequestCookies
) => {
  const token = cookies.get("payload-token")?.value;

  const meRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
    {
      headers: {
        Authorization: `JWT ${token}`,
      },
    }
  );

  // Sjekk om responsen er ok
  if (!meRes.ok) {
    throw new Error(`An error occurred: ${meRes.statusText}`);
  }

  // Sjekk om responsen er JSON
  const contentType = meRes.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error(`Expected JSON but received ${contentType}`);
  }

  const { user } = (await meRes.json()) as {
    user: User | null;
  };

  return { user };
};
