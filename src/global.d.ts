// src/global.d.ts

// Weglot på window
interface Weglot {
  initialize: (config: { api_key: string }) => void;
  switchTo: (lang: string) => void;
}

declare global {
  interface Window {
    Weglot: Weglot;
  }
}

// Utvid express Request-type
import type { Request } from "express";
import type { Payload } from "payload";

declare module "express-serve-static-core" {
  interface Request {
    payload: Payload;
    user?: any;
  }
}
