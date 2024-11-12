import axios from "axios";
import { Router } from "express";

import { authRouter } from "./auth";
import { deviceRouter } from "./device";
import { locationRouter } from "./location"
const indexRouter = Router();
indexRouter.use("/auth", authRouter);
indexRouter.use("/device", deviceRouter);
indexRouter.use("/location", locationRouter);
export default indexRouter;
