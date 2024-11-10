import express, { Request, Response, Router } from "express";
import dotenv from "dotenv";
import axios from "axios";
import { DeviceStatusResponse } from "./types/status";
import indexRouter from "./routes/index";
import cors from "cors";

const SMARTTHINGS_API_URL = "https://api.smartthings.com/v1";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use("/", indexRouter);

// app.get("/devices", async (req: Request, res: Response) => {
//     try {
//         const response = await axios.get(
//             `${SMARTTHINGS_API_URL}/devices`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${process.env.SMARTTHINGS_API_TOKEN}`
//                 }
//             }
//         );
//         res.status(200).json(response.data);
//     } catch (error) {
//         console.error('Error fetching devices:', error);
//         if (axios.isAxiosError(error)) {
//             res.status(error.response?.status || 500).json({
//                 message: error.message,
//                 error: error.response?.data
//             });
//         } else {
//             res.status(500).json({
//                 message: 'Internal server error'
//             });
//         }
//     }
// });
// app.get("/capabilities", async (req: Request, res: Response) => {
//     try {
//         const capabilities = await axios.get(`${SMARTTHINGS_API_URL}/capabilities`, {
//             headers: {
//                 Authorization: `Bearer ${process.env.SMARTTHINGS_API_TOKEN}`
//             }
//         });
//         res.status(200).json(capabilities.data);
//     } catch (error: any) {
//         res.status(500).json(error.message)
//     }
// });
// app.get("/capabilitiesWithId/:capabilityId/:version", async(req, res) => {
//     const capabilityId = req.params.capabilityId;
//     const version = req.params.version;
//     try {
//         const capabilities = await axios.get(`${SMARTTHINGS_API_URL}/capabilities/${capabilityId}/${version}`, {
//             headers: {
//                 Authorization: `Bearer ${process.env.SMARTTHINGS_API_TOKEN}`
//             }
//         });
//         res.status(200).json(capabilities.data);
//     } catch (error:any) {
//         res.status(500).json(error.message)
//     }
// });

// app.get("/devices/:deviceId/power", async (req: Request, res: Response) => {
//     try {
//         const { deviceId } = req.params;
//         const response = await axios.get(
//             `${SMARTTHINGS_API_URL}/devices/${deviceId}/status`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${process.env.SMARTTHINGS_API_TOKEN}`
//                 }
//             }
//         );

//         // Extract power consumption from the response
//         const status = response.data;
//         // const powerComponent = status.components.main['powerMeter'];
//         // const power = powerComponent?.power?.value || 0;
//         // const unit = powerComponent?.power?.unit || 'W';

//         res.status(200).json({
//             status,
//             // power,
//             // unit
//         });
//     } catch (error) {
//         console.error('Error fetching power consumption:', error);
//         if (axios.isAxiosError(error)) {
//             res.status(error.response?.status || 500).json({
//                 message: error.message,
//                 error: error.response?.data
//             });
//         } else {
//             res.status(500).json({
//                 message: 'Internal server error'
//             });
//         }
//     }
// });
// app.get("/device/:deviceId/parts-status", async (req: Request, res: Response) => {
//     try {
//         const { deviceId } = req.params;

//         // Fetch the device status from SmartThings API
//         const response = await axios.get(
//             `${SMARTTHINGS_API_URL}/devices/${deviceId}/health`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${process.env.SMARTTHINGS_API_TOKEN}`
//                 }
//             }
//         );

//         res.status(200).json(response.data);
//     } catch (error) {
//         console.error("Error fetching device parts status:", error);
//         res.status(500).json({ message: "Error fetching device parts status" });
//     }
// });
app.listen(8000, () => {
  console.log(`App listening on http://localhost:${port}`);
});
