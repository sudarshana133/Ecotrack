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
exports.addDevice = exports.getDevice = exports.PowerOnAndOff = exports.getLeaders = exports.getEnergy = exports.getDevices = void 0;
const axios_1 = __importDefault(require("axios"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getDevices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.token;
    const { username } = req.body;
    try {
        const devices = yield axios_1.default.get(`${process.env.SMARTTHINGS_BASE_URL}/devices`, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        const items = devices.data.items;
        // console.log(items)
        const user = yield prisma.user.findFirst({
            where: {
                userName: username
            },
        });
        console.log(user);
        if (!user) {
            throw new Error("User not found");
        }
        yield Promise.all(items.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            yield prisma.device.upsert({
                where: {
                    deviceId: item.deviceId,
                },
                update: {
                    deviceName: item.label,
                },
                create: {
                    deviceId: item.deviceId,
                    deviceName: item.label,
                    locationId: item.locationId
                },
            });
        })));
        res.status(200).json(devices.data.items);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
});
exports.getDevices = getDevices;
const getEnergy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.body.token;
    const deviceId = req.body.deviceId;
    const locationId = req.body.locationId;
    const deviceName = req.body.deviceName;
    try {
        const devices = yield axios_1.default.get(`${process.env.SMARTTHINGS_BASE_URL}/devices/${deviceId}/status`, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        const energy = devices.data.components.main.powerConsumptionReport.powerConsumption.value
            .deltaEnergy;
        console.log(devices.data.components.main.powerConsumptionReport);
        console.log(energy);
        const device = yield prisma.device.findFirst({
            where: {
                deviceId: deviceId,
            },
        });
        console.log(device);
        const updatedPowerArray = (device === null || device === void 0 ? void 0 : device.power)
            ? [...device.power, energy]
            : [energy];
        console.log(updatedPowerArray);
        const response = yield prisma.device.upsert({
            where: {
                deviceId: deviceId,
            },
            update: {
                energy: updatedPowerArray,
            },
            create: {
                deviceId: deviceId,
                energy: [energy],
                deviceName,
                locationId
            },
        });
        console.log("3");
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
});
exports.getEnergy = getEnergy;
const getLeaders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // Fetch locations and include related user and devices
        const locations = yield prisma.location.findMany({
            include: {
                user: true, // Include related user information
                devices: true, // Include related devices
            },
        });
        // Make the request to the Electricity Map API
        const response = yield axios_1.default.get('https://api.electricitymap.org/v3/carbon-intensity/latest?zone=IN-SO', {
            headers: {
                'auth-token': 'UF77C0UwKFdnN',
            },
        });
        const carbonIntensity = response.data.carbonIntensity; // Corrected property access
        let result = [];
        // Iterate over locations and calculate energy used
        for (let i = 0; i < locations.length; i++) {
            let totalEnergyUsed = 0;
            for (let j = 0; j < locations[i].devices.length; j++) {
                let energyArr = locations[i].devices[j].energy;
                totalEnergyUsed += energyArr[energyArr.length - 1] || 0; // Safely access the last energy value
            }
            // Construct the result object
            result[i] = {
                name: ((_a = locations[i].user) === null || _a === void 0 ? void 0 : _a.userName) || 'Unknown', // Safely access userName
                id: ((_b = locations[i].user) === null || _b === void 0 ? void 0 : _b.userId) || 'Unknown', // Safely access userId
                energyUsed: totalEnergyUsed * carbonIntensity,
            };
        }
        // Sort results by energy used in descending order
        result.sort((a, b) => b.energyUsed - a.energyUsed);
        // Return the sorted results as JSON
        res.json(result);
    }
    catch (error) {
        console.error('Error fetching leaders:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getLeaders = getLeaders;
const PowerOnAndOff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.token;
    const { deviceId, power } = req.body;
    try {
        const response = yield axios_1.default.post(`${process.env.SMARTTHINGS_BASE_URL}/${deviceId}/commands`, {
            commands: [
                {
                    component: "main",
                    capability: "switch",
                    command: power ? "on" : "off",
                },
            ],
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        res.status(200).json({ msg: "Success" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: error.message });
    }
});
exports.PowerOnAndOff = PowerOnAndOff;
const getDevice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.token;
    const { deviceId } = req.params;
    try {
        const response = yield axios_1.default.get(`${process.env.SMARTTHINGS_BASE_URL}/devices/${deviceId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        res.status(200).json(response.data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: error.message });
    }
});
exports.getDevice = getDevice;
const addDevice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    if (!data.locationId || !data.profileId || !data.installedAppId) {
        return res.status(404).json("Complete data must be provided");
    }
    try {
        const response = yield axios_1.default.post(`${process.env.SMARTTHINGS_BASE_URL}/devices`, {
            locationId: data.locationId,
            profileId: data.profileId,
            installedAppId: data.installedAppId,
        });
        console.log(response.data);
        yield prisma.device.create({
            data: {
                deviceId: response.data.deviceId,
                deviceName: response.data.label,
                locationId: data.locationId,
            },
        });
        res.status(200).json(response.data);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
});
exports.addDevice = addDevice;
