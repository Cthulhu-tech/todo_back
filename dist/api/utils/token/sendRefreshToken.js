"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRefreshToken = void 0;
const sendRefreshToken = (response, token) => {
    response.cookie('refreshtoken', token, {
        httpOnly: true,
        path: '/refresh',
    });
};
exports.sendRefreshToken = sendRefreshToken;
