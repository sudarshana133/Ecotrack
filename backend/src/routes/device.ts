import axios from "axios";
import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router();

// get devices
router.get("/getDevices", async (req: Request, res: Response) => {
  // const token = req.headers.token;
  const token = req.body.token;
  console.log(token);
  try {
    const devices = await axios.get(
      `${process.env.SMARTTHINGS_BASE_URL}/devices`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    res.status(200).json(devices.data.items);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
});

router.post("/getEnergy", async (req: Request, res: Response) => {
  const token = req.headers.token;
  const deviceId = req.body.deviceId;
  const userId = req.body.userId;
  const deviceName = req.body.deviceName;
  console.log(deviceId);
  try {
    const devices = await axios.get(
      `${process.env.SMARTTHINGS_BASE_URL}/devices/${deviceId}/status`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const energy =
      devices.data.components.main.powerConsumptionReport.powerConsumption.value
        .deltaEnergy;
    const device = await prisma.device.findFirst({
      where: {
        deviceId: deviceId,
      },
    });
    const updatedPowerArray = device?.power
      ? [...device.power, energy]
      : [energy];
    const response = await prisma.device.upsert({
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
  } catch (error: any) {
    res.status(500).json(error.message);
  }
});

router.get("/getLeaders", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    include: {
      devices: true,
    },
  });

  const response: any = await axios.get(
    "https://api.electricitymap.org/v3/carbon-intensity/latest?zone=IN-SO' \
        -H 'auth-token:UF77C0UwKFdnN"
  );
  const carbonPerRegion = response.carbonIntensity;
  let result: any = [];

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

  result.sort((a: any, b: any) => b.energyUsed - a.energyUsed);

  res.json(result);
});
export default router;

//https://api.smartthings.com/v1/devices/{deviceId}/status
