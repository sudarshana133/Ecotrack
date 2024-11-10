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
exports.getLeaders = exports.getEnergy = exports.getDevices = void 0;
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
        const user = yield prisma.user.findFirst({
            where: {
                oAuthToken: token,
            },
        });
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
                    userId: user.userId,
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
    const token = req.headers.token;
    const deviceId = req.body.deviceId;
    const userId = req.body.userId;
    const deviceName = req.body.deviceName;
    console.log(deviceId);
    try {
        const devices = yield axios_1.default.get(`${process.env.SMARTTHINGS_BASE_URL}/devices/${deviceId}/status`, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        const energy = devices.data.components.main.powerConsumptionReport.powerConsumption.value
            .deltaEnergy;
        const device = yield prisma.device.findFirst({
            where: {
                deviceId: deviceId,
            },
        });
        const updatedPowerArray = (device === null || device === void 0 ? void 0 : device.power)
            ? [...device.power, energy]
            : [energy];
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
                userId,
            },
        });
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
});
exports.getEnergy = getEnergy;
const getLeaders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany({
        include: {
            devices: true,
        },
    });
    const response = yield axios_1.default.get("https://api.electricitymap.org/v3/carbon-intensity/latest?zone=IN-SO' \
        -H 'auth-token:UF77C0UwKFdnN");
    const carbonPerRegion = response.carbonIntensity;
    let result = [];
    for (let i = 0; i < users.length; i++) {
        let temp = 0;
        for (let j = 0; j < users[i].devices.length; j++) {
            let energyArr = users[i].devices[j].energy;
            temp += energyArr[energyArr.length - 1];
        }
        result[i] = {
            name: users[i].userName,
            id: users[i].userId,
            energyUsed: temp * carbonPerRegion,
        };
    }
    result.sort((a, b) => b.energyUsed - a.energyUsed);
    res.json(result);
});
exports.getLeaders = getLeaders;
