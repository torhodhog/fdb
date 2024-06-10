import { inferAsyncReturnType } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { PayloadRequest } from 'payload/types';

export const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({
  req: req as PayloadRequest,
  res,
});

export type ExpressContext = inferAsyncReturnType<typeof createContext>;