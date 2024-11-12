import { useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Settings = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const username = localStorage.getItem("username");
  // const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        await axios.delete(`http://139.84.210.156/auth/delete`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        localStorage.removeItem("token");
        navigate("/login");
      } catch (error) {
        console.error("Error deleting account:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800">Settings</h2>
      <div className="space-y-4">
        <div className="flex gap-2 text-sm">
          <span className="text-gray-500">Username:</span>
          <span className="text-gray-700">{username}</span>
        </div>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleDeleteAccount}
          disabled={isLoading}
        >
          {isLoading ? "Deleting..." : "Delete Account"}
        </button>
      </div>
    </div>
  );
};

export default Settings;
