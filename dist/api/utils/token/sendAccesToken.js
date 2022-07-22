"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAccessToken = void 0;
const sendAccessToken = (response, accesstoken, user) => {
    response.status(201).send({
        login: user.login,
        message: 'you have successfully logged in',
        accesstoken,
        auth: true
    });
};
exports.sendAccessToken = sendAccessToken;
