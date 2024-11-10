import axios from "axios";
import { Router } from "express";

import { authRouter } from "./auth";
import { deviceRouter } from "./device";

const indexRouter = Router();
indexRouter.use("/auth", authRouter);
indexRouter.use("/device", deviceRouter);

export default indexRouter;
