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
exports.login = void 0;
const createRefreshToken_1 = require("../utils/token/createRefreshToken");
const createAcessToken_1 = require("../utils/token/createAcessToken");
const sendRefreshToken_1 = require("../utils/token/sendRefreshToken");
const sendAccesToken_1 = require("../utils/token/sendAccesToken");
const connect_1 = require("../utils/dbConnect/connect");
const bcrypt_1 = require("bcrypt");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { login, password } = req.body;
        if (login === undefined || password === undefined || login.length > 54 || password.length > 255 || login.length === 0 || password.length === 0)
            res.status(403).end({ "message": "Invalid login or password" });
        const connection = yield (0, connect_1.connectDB)();
        const user = yield connection.query('SELECT * FROM user WHERE login = ?', [login]);
        if (user[0].length > 0) {
            const valid = yield (0, bcrypt_1.compare)(password, user[0][0].password);
            if (!valid) {
                connection.end();
                res.status(403).json({ error: 'Invalid login or password' });
                return;
            }
            const accesstoken = yield (0, createAcessToken_1.createAccessToken)(+user[0][0].id, '15m');
            const refreshtoken = yield (0, createRefreshToken_1.createRefreshToken)(+user[0][0].id, '7d');
            yield connection.query('UPDATE user SET jwt = ? WHERE login = ?', [refreshtoken, login]);
            yield connection.end();
            yield (0, sendRefreshToken_1.sendRefreshToken)(res, refreshtoken);
            yield (0, sendAccesToken_1.sendAccessToken)(res, accesstoken, user[0][0]);
        }
        else {
            connection.end();
            res.status(403).json({ error: "Invalid login or password" });
            return;
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "server error" });
        return;
    }
});
exports.login = login;
