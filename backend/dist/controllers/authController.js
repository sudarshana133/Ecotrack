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
exports.verifyToken = exports.deleteUser = exports.signin = exports.signup = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const axios_1 = __importDefault(require("axios"));
const prisma = new client_1.PrismaClient();
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(403).json({ msg: "Missing email or password" });
    try {
        const user = yield prisma.user.findFirst({
            where: {
                userName: username,
            },
        });
        if (!user) {
            return res.status(401).json({ msg: "Email or password is incorrect." });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ msg: "Email or password is incorrect." });
        }
        res.status(200).json({ username, token: user.oAuthToken });
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
                oAuthToken: ""
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
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    try {
        const user = yield prisma.user.findFirst({
            where: {
                userName: username,
            },
        });
        if (!user)
            return res.status(404).json({ msg: "User not found" });
        // Use userId for deletion since it's unique
        yield prisma.user.delete({
            where: {
                userId: user.userId,
            },
        });
        res.status(200).json("User deleted");
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
});
exports.deleteUser = deleteUser;
const verifyToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.body.token;
    const username = req.body.username;
    try {
        const response = yield axios_1.default.get(`${process.env.SMARTTHINGS_BASE_URL}/devices`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        if (response.status === 200) {
            const user = yield prisma.user.findFirst({
                where: {
                    userName: username
                }
            });
            yield prisma.user.update({
                where: {
                    userId: user === null || user === void 0 ? void 0 : user.userId,
                },
                data: {
                    oAuthToken: token,
                },
            });
            return res.status(200).json({ msg: "Token verified successfully." });
        }
        return res.status(400).json({ msg: "Token is not valid." });
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.verifyToken = verifyToken;
