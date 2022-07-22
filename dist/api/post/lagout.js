"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lagout = void 0;
const lagout = (req, res) => {
    res.clearCookie('refreshtoken', { path: '/refresh' });
    return res.status(200).json({ message: 'lagout' });
};
exports.lagout = lagout;
