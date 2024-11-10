import axios from "axios";
import { Router } from "express";
import { DeviceFromAPI } from "../types/Device";
import { signup } from "../controllers/UserController";


const router = Router();
router.post("/signup",signup)
export default router;