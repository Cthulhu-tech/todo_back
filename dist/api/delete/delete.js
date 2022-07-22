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
exports.deleteTodo = void 0;
const checkAuth_1 = require("../utils/token/checkAuth");
const connect_1 = require("../utils/dbConnect/connect");
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    if (!!id) {
        const userId = (0, checkAuth_1.ChechAuthorization)(req, res);
        try {
            if (userId) {
                const connection = yield (0, connect_1.connectDB)();
                yield connection.query("DELETE FROM `todo` WHERE `todo`.`id` = ?", [id]);
                connection.end();
                res.status(202).json({ message: "todo delete" });
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "unknown error" });
        }
    }
    else {
        res.status(403).json({ error: "delet error" });
    }
});
exports.deleteTodo = deleteTodo;
