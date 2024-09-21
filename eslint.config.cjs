// eslint.config.cjs
const { FlatCompat } = require('@eslint/eslintrc');
const path = require('path');

// Konfigurer FlatCompat for å oversette tradisjonelle konfigurasjoner
const compat = new FlatCompat({
  baseDirectory: __dirname, // Sett basen til nåværende katalog
});

module.exports = [
  ...compat.extends('eslint-config-next/core-web-vitals'), // Bruk konfigurasjonen fra eslint-config-next
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['**/temp.js', 'config/*'], // Legg til ignoreringsmønstre her
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      // Legg til dine tilpassede regler her hvis nødvendig
    },
  },
];
