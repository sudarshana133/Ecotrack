import { FC } from "react";
import { Device } from "@/types/DeviceType";
import { Power } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface DeviceCardProps {
  device: Device;
}

const DeviceCard: FC<DeviceCardProps> = ({ device }) => {
  // const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handlePower = async () => {
    try {
      const res = await axios.post(
        `http://139.84.210.156/device/power`,
        {
          deviceId: device.deviceId,
          power: false,
        },
        {
          headers: {
            token,
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {device.label || device.name}
          </h3>
          <p className="text-sm text-gray-500">{device.manufacturerName}</p>
        </div>
        <Button
          variant="ghost"
          className="rounded-full p-2"
          onClick={handlePower}
        >
          <Power />
        </Button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Type</span>
          <span className="text-gray-700">
            {device.deviceTypeName || "Unknown"}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Model</span>
          <span className="text-gray-700">
            {device.ocf?.modelNumber || "N/A"}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Firmware</span>
          <span className="text-gray-700">
            {device.ocf?.firmwareVersion || "N/A"}
          </span>
        </div>
      </div>

      <Button className="mt-4 w-full bg-blue-500 hover:bg-blue-600" onClick={()=>navigate(`/dashboard/devices/${device.deviceId}`)}>
        Manage Device
      </Button>
    </div>
  );
};

export default DeviceCard;
