import React from "react";
import { Input } from "../../../components/ui/input";
import { Bell } from "lucide-react";
import GreyCard from "@/components/GreyCard";
import BigGreyCard from "@/components/BigGreyCard";

export default function Dashboard() {
  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center border-b-[1.5px] pb-4 mb-4">
        <Input placeholder="Search..." className="w-[50%] px-3 py-2" />
        <div className="bg-[#E9EBEF] w-10 h-10 flex items-center justify-center text-center rounded-full font-bold">
          G
        </div>
      </div>

      <div className="text-2xl font-bold text-gray-800 mb-6">Dashboard</div>

      <div className="flex space-x-6">
        <div className="flex-1 space-y-6">
          <div className="flex space-x-4">
            <GreyCard
              heading="Energy consumption"
              percentage={9}
              subtext="Compared to last month"
            />
            <GreyCard
              heading="Carbon Emissions"
              percentage={4}
              subtext="Compared to last month"
            />
          </div>

          <div className="flex space-x-4">
            <GreyCard
              heading="Water Consumption"
              percentage={6}
              subtext="Compared to last month"
            />
            <GreyCard
              heading="Waste Reduction"
              percentage={3}
              subtext="Compared to last month"
            />
          </div>
        </div>

        <div className="w-[40%]">
          <BigGreyCard
            heading="Energy Announcements"
            sidetext="updates"
            details={details}
          ></BigGreyCard>
        </div>
      </div>
    </div>
  );
}

const details = [
  {
    heading: "Energy saving tips for every user",
    bottomtext: "5 minutes ago",
  },
  {
    heading: "New energy efficiency guidelines",
    bottomtext: "10 minutes ago",
  },
  {
    heading: "Scheduled maintenance notice",
    bottomtext: "1 hour ago",
  },
  {
    heading: "Update on renewable energy usage",
    bottomtext: "3 hours ago",
  },
];
