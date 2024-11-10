import { Device } from "@/types/DeviceType";
import { ChevronDownIcon } from "lucide-react";
import { ChevronUpIcon } from "lucide-react";
import { useState } from "react";

interface DeviceComponentProps {
  device: Device;
}

const DeviceComponent: React.FC<DeviceComponentProps> = ({ device }) => {
  const [openComponent, setOpenComponent] = useState<string | null>(null);

  const toggleComponent = (componentId: string) => {
    setOpenComponent(openComponent === componentId ? null : componentId);
  };
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Components</h3>
      <div className="space-y-4">
        {device.components?.map((component) => (
          <div key={component.id} className="bg-white rounded-lg shadow-sm">
            {/* Component Header with Dropdown Toggle */}
            <div
              className="flex items-center justify-between p-3 cursor-pointer"
              onClick={() => toggleComponent(component.id)}
            >
              <h4 className="text-lg font-semibold text-gray-800">
                {component.label}
              </h4>
              {openComponent === component.id ? (
                <ChevronUpIcon className="h-5 w-5 text-gray-600" />
              ) : (
                <ChevronDownIcon className="h-5 w-5 text-gray-600" />
              )}
            </div>

            {/* Capabilities List (Visible only when expanded) */}
            {openComponent === component.id && (
              <div className="p-3 space-y-1 border-t">
                {component.capabilities.map((capability) => (
                  <div
                    key={capability.id}
                    className="flex justify-between text-sm text-gray-600 border-b pb-1 hover:bg-slate-300/10"
                  >
                    <span>{capability.id}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceComponent;
