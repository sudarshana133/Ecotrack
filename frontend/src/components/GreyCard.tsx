import React from "react";
import { Activity } from "lucide-react"; // Import specific icon directly

type GreyCardProps = {
  heading: string;
  percentage: number;
  subtext: string;
};

export default function GreyCard({
  heading,
  percentage,
  subtext,
}: GreyCardProps) {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-50 p-6 rounded-lg m-2 shadow-md w-[250px]">
      <div className="flex justify-between items-center mb-4">
        <div className="font-semibold text-lg text-gray-800">{heading}</div>
        <Activity className="text-gray-400 w-4 h-4" />
      </div>
      <div className="flex items-center mb-2">
        <span className="font-bold text-2xl text-gray-700">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-300 rounded-full h-2 mb-4">
        <div
          className="bg-blue-500 h-2 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-sm text-gray-600">{subtext}</div>
    </div>
  );
}
