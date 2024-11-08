import axios from "axios";
import express, { Request, Response } from "express";

const router = express.Router();

// get devices
router.get("/getDevices", async (req: Request, res: Response) => {
    const token = req.headers.token;
    try {
        const devices = await axios.get(`${process.env.SMARTTHINGS_BASE_URL}/devices`, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        res.status(200).json(devices.data.items);
    } catch (error:any) {
        res.status(500).json(error.message);
    }
})
export default router;