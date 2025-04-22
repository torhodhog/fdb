import { NextResponse } from 'next/server';
import { getServerSideUser } from '@/lib/payload-utils';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();

  const { user } = await getServerSideUser(cookieStore);

  if (!user) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }

  return NextResponse.json({ userId: user.id, user });
}