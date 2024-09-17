// custom-types.ts

import { Config as GeneratedConfig } from '@/payload-types';

export interface CustomGeneratedTypes extends GeneratedConfig {
  // Dine tilpassede typer her
}

// Hvis du har en deklarasjon for Payload, oppdater den til å bruke CustomGeneratedTypes
declare module 'payload' {
  export interface GeneratedTypes extends CustomGeneratedTypes {}
}