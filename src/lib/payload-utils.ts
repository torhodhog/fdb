import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { NextRequest } from 'next/server'

import { User } from '../payload-types'

export const getServerSideUser = async (
  cookies: NextRequest['cookies'] | ReadonlyRequestCookies
) => {
  const token = cookies.get('payload-token')?.value

  const meRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
    {
      headers: {
        Authorization: `JWT ${token}`,
      },
    }
  )

  if (!meRes.ok) {
    // Prøv å hente feilmelding fra responsen, hvis mulig
    let errorText = await meRes.text();
    throw new Error(`Failed to fetch user: ${meRes.status} - ${errorText}`);
  }

  const { user } = (await meRes.json()) as {
    user: User | null
  }

  return { user }
}