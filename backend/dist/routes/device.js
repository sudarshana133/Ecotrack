"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceRouter = void 0;
const express_1 = require("express");
const deviceController_1 = require("../controllers/deviceController");
const deviceRouter = (0, express_1.Router)();
exports.deviceRouter = deviceRouter;
deviceRouter.post("/getDevices", deviceController_1.getDevices);
deviceRouter.post("/getEnergy", deviceController_1.getEnergy);
deviceRouter.post("/getLeaders", deviceController_1.getLeaders);
deviceRouter.post("/addDevice", deviceController_1.addDevice);
deviceRouter.post("/power", deviceController_1.PowerOnAndOff);
deviceRouter.get("/:deviceId", deviceController_1.getDevice);
