import axios from "axios";
import{ Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { DeviceFromAPI } from "../types/Device";

const prisma = new PrismaClient();

const getDevices = async (req: Request, res: Response) => {
  const token = req.headers.token;
  const { username } = req.body;
  try {
    const devices = await axios.get(
      `${process.env.SMARTTHINGS_BASE_URL}/devices`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const items: DeviceFromAPI[] = devices.data.items;
    const user = await prisma.user.findFirst({
      where: {
        oAuthToken: token as string,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    await Promise.all(
      items.map(async (item: DeviceFromAPI) => {
        await prisma.device.upsert({
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
      })
    );
    res.status(200).json(devices.data.items);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

const getEnergy = async (req: Request, res: Response) => {
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
};

const getLeaders = async (req: Request, res: Response) => {
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
};

export { getDevices, getEnergy, getLeaders };
