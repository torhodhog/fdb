import { appRouter } from "@/trpc";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = (req: Request) => {
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    // @ts-expect-error context already exists
    createContext: () => ({ req, res: {} }),
  });
};

export { handler as GET, handler as POST };

// import { appRouter } from '../../../../trpc/index';
// import * as trpcNext from '@trpc/server/adapters/next';
// import { inferAsyncReturnType } from '@trpc/server';
// import { NextApiRequest, NextApiResponse } from 'next';

// export const createContext = ({ req, res }: { req: NextApiRequest, res: NextApiResponse }) => {
//   return { req, res };
// };

// export default trpcNext.createNextApiHandler({
//   router: appRouter,
//   createContext,
// });
