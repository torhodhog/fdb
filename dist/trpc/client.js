"use strict";
// Knytter frontend til tRPC-rutene med typesikkerhet.
// Brukes for å hente og sende data mellom frontend og backend.
Object.defineProperty(exports, "__esModule", { value: true });
exports.trpc = void 0;
const react_query_1 = require("@trpc/react-query");
exports.trpc = (0, react_query_1.createTRPCReact)();
