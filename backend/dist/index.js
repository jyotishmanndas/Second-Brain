"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const content_routes_1 = __importDefault(require("./routes/content.routes"));
const invite_routes_1 = __importDefault(require("./routes/invite.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/", user_routes_1.default);
app.use("/content", content_routes_1.default);
app.use("/invite", invite_routes_1.default);
app.listen(3000, () => {
    console.log('Server is listening on the port 3000');
});
