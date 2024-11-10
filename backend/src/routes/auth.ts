import axios from "axios";
import { Router } from "express";
import { signup, signin } from "../controllers/authController";

const authRouter = Router();
authRouter.post("/signup", signup);
authRouter.post("/signin", signin);

export { authRouter };
