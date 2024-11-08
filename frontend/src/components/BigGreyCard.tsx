import React from "react";

type GreyCardProps = {
  heading: string;
  sidetext: string;
  details: {
    heading: string;
    bottomtext: string;
  }[];
};

export default function BigGreyCard({
  heading,
  sidetext,
  details,
}: GreyCardProps) {
  return (
    <div className="bg-gray-100 p-6 rounded-lg m-2 shadow-sm">
      <div className="flex justify-between items-center mb-10">
        <div className="font-semibold text-lg text-gray-800">{heading}</div>
        <div className="text-gray-500 text-sm">{sidetext}</div>
      </div>

      <div className="space-y-4">
        {details.map((device, index) => (
          <div
            key={index}
            className="border-b border-gray-300 pb-2"
          >
            <div className="flex justify-between items-center mb-1">
              <div className="text-md font-medium text-gray-800">
                {device.heading}
              </div>
              <button className="text-gray-400 hover:text-gray-600 focus:outline-none">
                ⋮
              </button>
            </div>
            <div className="text-sm text-gray-600">{device.bottomtext}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
