"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = void 0;
const createRefreshToken_1 = require("../utils/token/createRefreshToken");
const createAcessToken_1 = require("../utils/token/createAcessToken");
const sendRefreshToken_1 = require("../utils/token/sendRefreshToken");
const connect_1 = require("../utils/dbConnect/connect");
const jsonwebtoken_1 = require("jsonwebtoken");
const refresh = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = request === null || request === void 0 ? void 0 : request.cookies) === null || _a === void 0 ? void 0 : _a.refreshtoken;
        if (!token)
            return response.json({ accesstoken: null });
        let payload = null;
        try {
            payload = (0, jsonwebtoken_1.verify)(token, process.env.REFRESH_TOKEN_SECRET);
        }
        catch (err) {
            return response.send({ accesstoken: null });
        }
        const connection = yield (0, connect_1.connectDB)();
        const user = yield connection.query('SELECT * FROM user WHERE id = ?', [payload.userId]);
        if (!user[0][0])
            return response.send({ accesstoken: null });
        if (user[0][0].jwt !== token)
            return response.json({ accesstoken: null });
        const accesstoken = yield (0, createAcessToken_1.createAccessToken)(+user[0][0].id, "15m");
        const refreshtoken = yield (0, createRefreshToken_1.createRefreshToken)(+user[0][0].id, "7d");
        yield connection.query('UPDATE user SET jwt = ? WHERE id = ?', [refreshtoken, payload.userId]);
        const user_info = yield connection.query('SELECT * FROM user WHERE id = ?', [payload.userId]);
        (0, sendRefreshToken_1.sendRefreshToken)(response, refreshtoken);
        connection.end();
        response.status(201).json({
            login: user_info[0][0].login,
            message: 'token refresh',
            accesstoken,
            auth: true
        });
    }
    catch (error) {
        console.log(error);
        response.status(500).json({ error: 'unknown error' });
    }
});
exports.refresh = refresh;
