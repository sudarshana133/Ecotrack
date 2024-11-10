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
exports.signin = exports.signup = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(403).json({ msg: "Missing email or password" });
    try {
        console.log("1" + username + password);
        const user = yield prisma.user.findFirst({
            where: {
                userName: username,
            },
        });
        if (!user) {
            return res.status(401).json({ msg: "Email or password is incorrect." });
        }
        console.log("2");
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        console.log("3");
        if (!isPasswordValid) {
            return res.status(401).json({ msg: "Email or password is incorrect." });
        }
        console.log("4");
        const token = jsonwebtoken_1.default.sign({ id: user.userId, name: user.userName }, process.env.JWT_SECRET);
        console.log("5");
        res
            .cookie("token", token, {
            sameSite: "strict",
            maxAge: 3600 * 24 * 1000,
        })
            .status(200)
            .json({
            msg: "Success!",
        });
    }
    catch (error) {
        res.status(500).json({ msg: "Error: " + error.message });
    }
});
exports.signin = signin;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const userDetails = {
        username: body.username,
        password: body.password,
        token: body.token,
    };
    try {
        const response = yield prisma.user.findFirst({
            where: {
                userName: userDetails.username,
            },
        });
        if (response) {
            return res.status(400).json({
                msg: "user exists",
            });
        }
    }
    catch (err) {
        return res.status(400).json({
            msg: "couldnt search the database",
        });
    }
    const hash = yield bcrypt_1.default.hash(userDetails.password, 10);
    try {
        const response = yield prisma.user.create({
            data: {
                userName: userDetails.username,
                password: hash,
                oAuthToken: userDetails.token,
            },
        });
    }
    catch (err) {
        return res.status(400).json({
            msg: "error while updating in the database",
        });
    }
    return res.status(200).json({
        msg: "user added",
    });
});
exports.signup = signup;
