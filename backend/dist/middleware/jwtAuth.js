"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuth = JwtAuth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
;
function JwtAuth(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({
            msg: "Access denied. No valid token provided."
        });
        return;
    }
    ;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (decoded.userId) {
            req.userId = decoded.userId;
            next();
        }
    }
    catch (error) {
        res.status(401).json({ msg: "Permission denied" });
    }
}
;
