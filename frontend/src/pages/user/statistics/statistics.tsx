import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Statistics() {
  const [leaders, setLeaders] = useState([
    { name: "Thakur", energyUsed: Math.floor(Math.random() * 1000) },
    { name: "Darshan", energyUsed: Math.floor(Math.random() * 1000) },
    { name: "Suadarshana", energyUsed: Math.floor(Math.random() * 1000) },
    { name: "Ankith", energyUsed: Math.floor(Math.random() * 1000) },
  ]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:8000/devices/getLeaders"
        );
        setLeaders(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const data = {
    labels: leaders.map((user) => user.name),
    datasets: [
      {
        label: "Energy Used",
        data: leaders.map((user) => user.energyUsed),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="flex justify-center items-center min-h-[400px] m-10">
      <div className="flex flex-col lg:flex-row w-[90%] max-w-4xl bg-[#e9eaeb] rounded-lg shadow-lg p-6 ">
        <div className="flex-1 flex items-center justify-center mb-6 lg:mb-0">
          <Bar data={data} options={{ responsive: true }} />
        </div>

        <div className="flex-1 bg-[#dcdddf] rounded-lg p-4 lg:ml-6">
          <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>
          <div className="space-y-4">
            {leaders.map((user, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4  bg-[#E9EBEF] rounded-lg shadow-sm hover:bg-gray-300 transition duration-300"
              >
                <div>
                  <div className="font-semibold text-lg">{user.name}</div>
                  <div className="text-sm ">Energy Used</div>
                </div>
                <div className="text-xl font-bold">{user.energyUsed}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
