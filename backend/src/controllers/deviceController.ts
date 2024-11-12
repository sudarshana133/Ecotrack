import axios from "axios";
import { Request, Response } from "express";
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
    // console.log(items)
    const user = await prisma.user.findFirst({
      where: {
        userName: username
      },
    });
    console.log(user)
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
            locationId: item.locationId
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
  const token = req.body.token;
  const deviceId = req.body.deviceId;
  const locationId = req.body.locationId;
  const deviceName = req.body.deviceName;
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
    console.log(devices.data.components.main.powerConsumptionReport);
    console.log(energy);
    const device = await prisma.device.findFirst({
      where: {
        deviceId: deviceId,
      },
    });
    console.log(device);
    const updatedPowerArray = device?.power
      ? [...device.power, energy]
      : [energy];
    console.log(updatedPowerArray);
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
        locationId
      },
    });
    console.log("3");
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

const getLeaders = async (req: Request, res: Response) => {
  try {
    // Fetch locations and include related user and devices
    const locations = await prisma.location.findMany({
      include: {
        user: true, // Include related user information
        devices: true, // Include related devices
      },
    });

    // Make the request to the Electricity Map API
    const response = await axios.get(
      'https://api.electricitymap.org/v3/carbon-intensity/latest?zone=IN-SO',
      {
        headers: {
          'auth-token': 'UF77C0UwKFdnN',
        },
      }
    );

    const carbonIntensity = response.data.carbonIntensity; // Corrected property access
    let result: any = [];

    // Iterate over locations and calculate energy used
    for (let i = 0; i < locations.length; i++) {
      let totalEnergyUsed = 0;
      for (let j = 0; j < locations[i].devices.length; j++) {
        let energyArr = locations[i].devices[j].energy;
        totalEnergyUsed += energyArr[energyArr.length - 1] || 0; // Safely access the last energy value
      }

      // Construct the result object
      result[i] = {
        name: locations[i].user?.userName || 'Unknown', // Safely access userName
        id: locations[i].user?.userId || 'Unknown', // Safely access userId
        energyUsed: totalEnergyUsed * carbonIntensity,
      };
    }

    // Sort results by energy used in descending order
    result.sort((a: any, b: any) => b.energyUsed - a.energyUsed);

    // Return the sorted results as JSON
    res.json(result);
  } catch (error) {
    console.error('Error fetching leaders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const PowerOnAndOff: any = async (req: Request, res: Response) => {
  const token = req.headers.token;
  const { deviceId, power } = req.body;
  try {
    const response = await axios.post(
      `${process.env.SMARTTHINGS_BASE_URL}/${deviceId}/commands`,
      {
        commands: [
          {
            component: "main",
            capability: "switch",
            command: power ? "on" : "off",
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.status(200).json({ msg: "Success" });
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ msg: error.message });
  }
};

const getDevice: any = async (req: Request, res: Response) => {
  const token = req.headers.token;
  const { deviceId } = req.params;
  try {
    const response = await axios.get(
      `${process.env.SMARTTHINGS_BASE_URL}/devices/${deviceId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ msg: error.message });
  }
};
const addDevice: any = async (req: Request, res: Response) => {
  const data = req.body;
  if (!data.locationId || !data.profileId || !data.installedAppId) {
    return res.status(404).json("Complete data must be provided");
  }
  try {
    const response = await axios.post(`${process.env.SMARTTHINGS_BASE_URL}/devices`, {
      locationId: data.locationId,
      profileId: data.profileId,
      installedAppId: data.installedAppId,
    });
    console.log(response.data);
    await prisma.device.create({
      data: {
        deviceId: response.data.deviceId,
        deviceName: response.data.label,
        locationId: data.locationId,
      },
    });
    res.status(200).json(response.data);
  } catch (error: any) {
    res.status(500).json(error.message)
  }
}
export { getDevices, getEnergy, getLeaders, PowerOnAndOff, getDevice, addDevice };
