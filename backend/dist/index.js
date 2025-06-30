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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const zod_1 = require("./zod");
const db_1 = require("./lib/db");
const jwtAuth_1 = require("./middleware/jwtAuth");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const result = zod_1.signUpSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({
            msg: "Invalid input"
        });
    }
    ;
    try {
        const existingUser = yield db_1.prisma.user.findUnique({
            where: {
                email: (_a = result.data) === null || _a === void 0 ? void 0 : _a.email
            }
        });
        if (existingUser) {
            res.status(400).json({
                msg: "User already exists with this email"
            });
        }
        ;
        const hashedpassword = yield bcryptjs_1.default.hash(((_b = result.data) === null || _b === void 0 ? void 0 : _b.password) || "", 12);
        const user = yield db_1.prisma.user.create({
            data: {
                email: ((_c = result.data) === null || _c === void 0 ? void 0 : _c.email) || "",
                password: hashedpassword,
                name: ((_d = result.data) === null || _d === void 0 ? void 0 : _d.name) || "",
                emailVerified: new Date()
            }
        });
        const userId = user.id;
        const token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET);
        res.json({
            token
        });
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            msg: "Internal server error"
        });
    }
    ;
}));
app.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const result = zod_1.signInschema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({
            msg: "Invalid input"
        });
    }
    ;
    try {
        const existingUser = yield db_1.prisma.user.findUnique({
            where: {
                email: (_a = result.data) === null || _a === void 0 ? void 0 : _a.email
            }
        });
        const userId = existingUser === null || existingUser === void 0 ? void 0 : existingUser.id;
        if (existingUser) {
            const isPasswordValid = yield bcryptjs_1.default.compare(((_b = result.data) === null || _b === void 0 ? void 0 : _b.password) || "", existingUser.password);
            if (!isPasswordValid) {
                res.status(400).json({
                    msg: "Invalid password"
                });
            }
            else {
                const token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET);
                res.json({
                    token
                });
            }
            ;
        }
        else {
            res.status(400).json({
                msg: "User does not exist with this email"
            });
        }
    }
    catch (error) {
        console.error("Error signing in user:", error);
        res.status(500).json({
            msg: "Internal server error"
        });
    }
    ;
}));
app.post("/content", jwtAuth_1.JwtAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const user = yield db_1.prisma.user.findUnique({
        where: { id: req.userId }
    });
    if (!user) {
        res.status(400).json({ msg: "User not found" });
        return;
    }
    ;
    const result = zod_1.contentSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({ msg: "Invalid input" });
        return;
    }
    ;
    try {
        const content = yield db_1.prisma.content.create({
            data: {
                title: (_a = result.data) === null || _a === void 0 ? void 0 : _a.title,
                link: (_b = result.data) === null || _b === void 0 ? void 0 : _b.link,
                tags: (_c = result.data) === null || _c === void 0 ? void 0 : _c.tags,
                userId: req.userId || ""
            }
        });
        res.status(200).json({ msg: "Post created successfully", content });
    }
    catch (error) {
        console.error("Error creating room:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
}));
app.get("/allContent", jwtAuth_1.JwtAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.prisma.user.findUnique({
        where: { id: req.userId }
    });
    if (!user) {
        res.status(400).json({ msg: "User not found" });
        return;
    }
    ;
    const allContents = yield db_1.prisma.content.findMany({
        where: {
            userId: req.userId
        },
        include: {
            user: {
                select: {
                    name: true
                }
            }
        }
    });
    res.status(200).json({ msg: "All contents", allContents });
    return;
}));
app.listen(3000, () => {
    console.log('Server is listening on the port 3000');
});
