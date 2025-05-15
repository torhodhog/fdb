// Knytter frontend til tRPC-rutene med typesikkerhet.
// Brukes for å hente og sende data mellom frontend og backend.


import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "./";

export const trpc = createTRPCReact<AppRouter>();
