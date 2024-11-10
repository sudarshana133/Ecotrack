import axios from "axios";
import { Router } from "express";
import {
  getEnergy,
  getDevices,
  getLeaders,
} from "../controllers/deviceController";

const deviceRouter = Router();
deviceRouter.get("/getDevices", getDevices);
deviceRouter.post("/getEnergy", getEnergy);
deviceRouter.post("/getLeaders", getLeaders);

export { deviceRouter };
