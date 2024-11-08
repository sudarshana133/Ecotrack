import { useEffect, useState } from "react"
import axios from "axios";
import { Device } from "@/types/DeviceType";
import DeviceCard from "@/components/DeviceCard";
const Devices = () => {
  const [devices,setDevices] = useState<Device[]>([]);
  const token = localStorage.getItem("token");
  const getDevices = async()=>{
    try {
      const res = await axios.get("http://localhost:8000/devices/getDevices",{
        headers:{
          token
        }
      });
      console.log(res.data);
      setDevices(res.data);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getDevices();
  },[])
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Devices</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map((device: Device) => (
          <DeviceCard
            device={device}
            key={device.deviceId}
          />
        ))}
      </div>
      {devices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No devices found</p>
        </div>
      )}
    </div>
  )
}

export default Devices
