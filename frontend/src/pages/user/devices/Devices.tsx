import { useEffect, useState } from "react";
import axios from "axios";
import { Device } from "@/types/DeviceType";
import DeviceCard from "@/components/DeviceCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
const Devices = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const getDevices = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/device/getDevices",
        {
          username,
        },
        {
          headers: {
            token,
          },
        }
      );
      setDevices(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getDevices();
  }, []);
  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Devices</h1>
        <Button>
          Add device <Plus />
        </Button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : devices.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 text-lg">No devices found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {devices.map((device) => (
            <DeviceCard key={device.deviceId} device={device} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Devices;
