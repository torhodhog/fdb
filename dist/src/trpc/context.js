"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = void 0;
const createContext = ({ req, res }) => ({
    req: req,
    res,
});
exports.createContext = createContext;
