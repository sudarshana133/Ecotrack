import { Router } from "express";
import { signup, signin, deleteUser, verifyToken } from "../controllers/authController";

const authRouter = Router();
authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.post("/verifyToken",verifyToken);
authRouter.delete("/delete",deleteUser);
export { authRouter };
