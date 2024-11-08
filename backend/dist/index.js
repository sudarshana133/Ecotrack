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
    var _a, _b;
    try {
        const response = yield axios_1.default.get(`${SMARTTHINGS_API_URL}/devices`, {
            headers: {
                Authorization: `Bearer ${process.env.SMARTTHINGS_API_TOKEN}`
            }
        });
        res.status(200).json(response.data);
    }
    catch (error) {
        console.error('Error fetching devices:', error);
        if (axios_1.default.isAxiosError(error)) {
            res.status(((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) || 500).json({
                message: error.message,
                error: (_b = error.response) === null || _b === void 0 ? void 0 : _b.data
            });
        }
        else {
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    }
}));
app.get("/capabilities", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const capabilities = yield axios_1.default.get(`${SMARTTHINGS_API_URL}/capabilities`, {
            headers: {
                Authorization: `Bearer ${process.env.SMARTTHINGS_API_TOKEN}`
            }
        });
        res.status(200).json(capabilities.data);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}));
app.get("/capabilitiesWithId/:capabilityId/:version", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const capabilityId = req.params.capabilityId;
    const version = req.params.version;
    try {
        const capabilities = yield axios_1.default.get(`${SMARTTHINGS_API_URL}/capabilities/${capabilityId}/${version}`, {
            headers: {
                Authorization: `Bearer ${process.env.SMARTTHINGS_API_TOKEN}`
            }
        });
        res.status(200).json(capabilities.data);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}));
app.get("/devices/:deviceId/power", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { deviceId } = req.params;
        const response = yield axios_1.default.get(`${SMARTTHINGS_API_URL}/devices/${deviceId}/status`, {
            headers: {
                Authorization: `Bearer ${process.env.SMARTTHINGS_API_TOKEN}`
            }
        });
        // Extract power consumption from the response
        const status = response.data;
        // const powerComponent = status.components.main['powerMeter'];
        // const power = powerComponent?.power?.value || 0;
        // const unit = powerComponent?.power?.unit || 'W';
        res.status(200).json({
            status,
            // power,
            // unit
        });
    }
    catch (error) {
        console.error('Error fetching power consumption:', error);
        if (axios_1.default.isAxiosError(error)) {
            res.status(((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) || 500).json({
                message: error.message,
                error: (_b = error.response) === null || _b === void 0 ? void 0 : _b.data
            });
        }
        else {
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    }
}));
app.get("/device/:deviceId/parts-status", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { deviceId } = req.params;
        // Fetch the device status from SmartThings API
        const response = yield axios_1.default.get(`${SMARTTHINGS_API_URL}/devices/${deviceId}/health`, {
            headers: {
                Authorization: `Bearer ${process.env.SMARTTHINGS_API_TOKEN}`
            }
        });
        res.status(200).json(response.data);
    }
    catch (error) {
        console.error("Error fetching device parts status:", error);
        res.status(500).json({ message: "Error fetching device parts status" });
    }
}));
app.listen(8000, () => {
    console.log(`App listening on http://localhost:${port}`);
});
