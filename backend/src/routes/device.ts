import axios from "axios";
import { Router } from "express";
import {
  getEnergy,
  getDevices,
  getLeaders,
  PowerOnAndOff,
  getDevice
} from "../controllers/deviceController";

const deviceRouter = Router();
deviceRouter.post("/getDevices", getDevices);
deviceRouter.post("/getEnergy", getEnergy);
deviceRouter.post("/getLeaders", getLeaders);
deviceRouter.post("/power", PowerOnAndOff);
deviceRouter.get("/:deviceId",getDevice);
export { deviceRouter };
