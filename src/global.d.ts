// src/global.d.ts
interface Weglot {
  initialize: (config: { api_key: string }) => void;
  switchTo: (lang: string) => void;
}

interface Window {
  Weglot: Weglot;
}

// src/global.d.ts

import type { Request } from "express";
import type { Payload } from "payload";

declare module "express-serve-static-core" {
  interface Request {
    payload: Payload;
    user?: any;
  }
}
