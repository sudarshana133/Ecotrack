import DeviceComponent from "@/components/DeviceComponent";
import PowerStatus from "@/components/PowerStatus";
import { Device } from "@/types/DeviceType";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DeviceFromId = () => {
  const { deviceId } = useParams();
  const [device, setDevice] = useState<Device | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  const getDevice = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BACKEND_URL}/device/${deviceId}`, {
        headers: {
          token,
        },
      });
      setDevice(res.data);
      console.log(device);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getDevice();
  }, []);
  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  return (
    <div className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md min-h-screen">
      {device && (
        <>
          {/* Device Header */}
          <div className="border-b pb-4 mb-4">
            <h2 className="text-3xl font-bold text-gray-800">
              {device.label || device.name}
            </h2>
            <p className="text-gray-600 text-md">
              {device.manufacturerName} - {device.deviceTypeName}
            </p>
          </div>

          {/* Device Details Section */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Device Details
            </h3>
            <div className="space-y-2">
              <div className="flex gap-2 text-sm">
                <span className="text-gray-500">Model</span>
                <span className="text-gray-700">
                  {device.ocf?.modelNumber || "N/A"}
                </span>
              </div>
              <div className="flex gap-2 text-sm">
                <span className="text-gray-500">Firmware</span>
                <span className="text-gray-700">
                  {device.ocf?.firmwareVersion || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Components Section */}
          <DeviceComponent device={device} />
          <PowerStatus />
        </>
      )}
    </div>
  );
};

export default DeviceFromId;
