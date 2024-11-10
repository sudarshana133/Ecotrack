"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("./auth");
const device_1 = require("./device");
const indexRouter = (0, express_1.Router)();
indexRouter.use("/auth", auth_1.authRouter);
indexRouter.use("/device", device_1.deviceRouter);
exports.default = indexRouter;
