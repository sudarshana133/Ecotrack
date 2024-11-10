import axios from "axios";
import { Router } from "express";
import { signup, signin, deleteUser } from "../controllers/authController";

const authRouter = Router();
authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.delete("/delete",deleteUser)
export { authRouter };
