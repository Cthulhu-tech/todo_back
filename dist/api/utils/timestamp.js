"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timestamp = void 0;
const Timestamp = () => new Date().toISOString().slice(0, 19).replace('T', ' ');
exports.Timestamp = Timestamp;
