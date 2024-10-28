"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use(express_1.default.json());
const SMARTTHINGS_API_URL = 'https://api.smartthings.com/v1';
app.get("/devices", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${SMARTTHINGS_API_URL}/devices`, {
            headers: {
                Authorization: `Bearer ${process.env.SMARTTHINGS_API_TOKEN}`
            }
        });
        res.json(response.data);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching devices', error: error.message });
    }
}));
app.post('/devices/:deviceId/commands', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { deviceId } = req.params;
    const { command } = req.body;
    try {
        const response = yield axios_1.default.post(`${SMARTTHINGS_API_URL}/devices/${deviceId}/commands`, {
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
    }
    catch (error) {
        res.status(500).json({ message: 'Error controlling the device', error: error.message });
    }
}));
app.post("/devices/status", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deviceId = req.body.deviceId;
    try {
        const response = yield axios_1.default.get(`${SMARTTHINGS_API_URL}/devices/${deviceId}/status`, {
            headers: {
                Authorization: `Bearer ${process.env.SMARTTHINGS_API_TOKEN}`
            }
        });
        console.log(response);
        res.status(200).json(response.data);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}));
app.listen(8000, () => {
    console.log(`App listening on http://localhost:${port}`);
});
