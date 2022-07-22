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
exports.regist = void 0;
const connect_1 = require("../utils/dbConnect/connect");
const bcrypt_1 = require("bcrypt");
const regist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { login, password } = req.body;
        if (login === undefined || password === undefined || login.length > 54 || password.length > 255 || login.length === 0 || password.length === 0)
            res.status(403).end({ "message": "Invalid login or password" });
        const connect = yield (0, connect_1.connectDB)();
        const repeatLogin = yield connect.query("SELECT * FROM user WHERE login = ?", [login]);
        if (repeatLogin[0].length > 0) {
            connect.end();
            return res.status(403).json({ "error": "login is used" });
        }
        const hashedPassword = yield (0, bcrypt_1.hash)(password, 10);
        yield connect.query("INSERT INTO user (login, password) VALUES (?, ?)", [login, hashedPassword]);
        yield connect.end();
        res.status(201).json({ "message": "user created" });
    }
    catch (err) {
        console.log({ err });
        res.status(500).json({ "error": "unknown" });
    }
});
exports.regist = regist;
