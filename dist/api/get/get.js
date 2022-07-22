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
exports.get = void 0;
const checkAuth_1 = require("../utils/token/checkAuth");
const connect_1 = require("../utils/dbConnect/connect");
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = (0, checkAuth_1.ChechAuthorization)(req, res);
    try {
        if (userId) {
            const connection = yield (0, connect_1.connectDB)();
            const todo_completed = yield connection.query("SELECT * FROM todo WHERE user_id = ? AND completed = 1", [userId]);
            const todo_pendings = yield connection.query("SELECT * FROM todo WHERE user_id = ? AND completed = 0", [userId]);
            connection.end();
            res.status(200).json({ userData: { todo_completed: todo_completed[0], todo_pendings: todo_pendings[0] } });
        }
    }
    catch (error) {
        res.status(500).json({ error: "unknown error" });
    }
});
exports.get = get;
