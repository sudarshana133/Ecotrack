"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./routes/index"));
const cors_1 = __importDefault(require("cors"));
const SMARTTHINGS_API_URL = "https://api.smartthings.com/v1";
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
}));
app.use("/", index_1.default);
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
