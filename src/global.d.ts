// src/global.d.ts
interface Weglot {
  initialize: (config: { api_key: string }) => void;
  switchTo: (lang: string) => void;
}

interface Window {
  Weglot: Weglot;
}