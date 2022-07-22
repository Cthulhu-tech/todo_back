"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccessToken = void 0;
const { sign } = require('jsonwebtoken');
const createAccessToken = (userId, time) => {
    return sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: time,
    });
};
exports.createAccessToken = createAccessToken;
