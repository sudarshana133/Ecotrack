"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
authRouter.post("/signup", authController_1.signup);
authRouter.post("/signin", authController_1.signin);