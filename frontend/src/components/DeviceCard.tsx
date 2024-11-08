import { FC } from 'react';
import { Device } from '@/types/DeviceType';

interface DeviceCardProps {
  device: Device;
}

const DeviceCard: FC<DeviceCardProps> = ({ device }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{device.label || device.name}</h3>
        <p className="text-sm text-gray-500">{device.manufacturerName}</p>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Type</span>
          <span className="text-gray-700">{device.deviceTypeName || 'Unknown'}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Model</span>
          <span className="text-gray-700">{device.ocf?.modelNumber || 'N/A'}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Firmware</span>
          <span className="text-gray-700">{device.ocf?.firmwareVersion || 'N/A'}</span>
        </div>
      </div>
      
      <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
        Manage Device
      </button>
    </div>
  );
};

export default DeviceCard;
