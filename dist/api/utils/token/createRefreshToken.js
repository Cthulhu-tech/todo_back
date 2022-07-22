"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRefreshToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const createRefreshToken = (userId, time) => {
    return (0, jsonwebtoken_1.sign)({ userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: time,
    });
};
exports.createRefreshToken = createRefreshToken;
