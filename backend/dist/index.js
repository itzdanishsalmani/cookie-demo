"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
const JWT_SECRET = "danish";
app.post("/signin", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const access_token = jsonwebtoken_1.default.sign({
        id: 1
    }, JWT_SECRET);
    res.cookie("access_token", access_token);
    res.json({
        message: "You Logged in"
    });
});
app.get("/user", (req, res) => {
    const access_token = req.cookies.access_token;
    const decoded = jsonwebtoken_1.default.verify(access_token, JWT_SECRET);
    res.send({
        userId: decoded.id
    });
});
app.post("/logout", (req, res) => {
    res.cookie("access_token", "", { expires: new Date(0),
        domain: 'localhost',
        path: '/'
    });
    res.json({
        message: "You logout"
    });
});
app.listen(3000, () => {
    console.log("Server is running at 3000");
});
