"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChechAuthorization = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const ChechAuthorization = (request, response) => {
    try {
        const authorization = request.headers['authorization'];
        if (!authorization)
            throw new Error('Authorization need');
        const token = authorization.split(' ')[1];
        const { userId } = (0, jsonwebtoken_1.verify)(token, process.env.ACCESS_TOKEN_SECRET);
        return userId;
    }
    catch (error) {
        if (error instanceof Error) {
            response.send({ message: `${error.message}` });
        }
        else {
            response.send({ message: "unknown error" });
        }
    }
};
exports.ChechAuthorization = ChechAuthorization;
