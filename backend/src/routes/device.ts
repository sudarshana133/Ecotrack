import axios from "axios";
import { Router } from "express";
import {
  getEnergy,
  getDevices,
  getLeaders,
} from "../controllers/deviceController";

const deviceRouter = Router();
deviceRouter.get("/getDevices", getDevices);
deviceRouter.get("/getEnergy", getEnergy);
deviceRouter.get("/getLeaders", getLeaders);

export { deviceRouter };
