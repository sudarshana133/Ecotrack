import express, { Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());

const SMARTTHINGS_API_URL = 'https://api.smartthings.com/v1';
app.get("/devices", async (req: Request, res: Response) => {
    try {
        const response = await axios.get(`${SMARTTHINGS_API_URL}/devices`, {
            headers: {
                Authorization: `Bearer ${process.env.SMARTTHINGS_API_TOKEN}`
            }
        });
        res.json(response.data);
    } catch (error:any) {
        res.status(500).json({ message: 'Error fetching devices', error: error.message });
    }
})

app.post('/devices/:deviceId/commands', async (req, res) => {
    const { deviceId } = req.params;
    const { command } = req.body;

    try {
        const response = await axios.post(`${SMARTTHINGS_API_URL}/devices/${deviceId}/commands`, {
            commands: [
                {
                    component: "main",
                    capability: "switch",
                    command: command
                }
            ]
        }, {
            headers: {
                Authorization: `Bearer ${process.env.SMARTTHINGS_API_TOKEN}`
            }
        });

        res.json(response.data);
    } catch (error:any) {
        res.status(500).json({ message: 'Error controlling the device', error: error.message });
    }
});
app.listen(8000, () => {
    console.log(`App listening on http://localhost:${port}`);
})