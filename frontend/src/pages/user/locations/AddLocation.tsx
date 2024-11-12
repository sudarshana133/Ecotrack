import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useEffect, useState } from "react";

const AddLocation = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [name, setName] = useState("");
  const [locationError, setLocationError] = useState("");
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toString());
          setLongitude(position.coords.longitude.toString());
          setLocationError(""); // Clear any previous errors
        },
        (error) => {
          setLocationError(
            "Location access denied. Please enter coordinates manually."
          );
          console.error("Error getting location: ", error);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
    }
  }, []);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!latitude || !longitude) {
      alert("Please provide valid coordinates.");
      return;
    }
    try {
      await axios.post(
        `${BACKEND_URL}/location/addLocation`,
        {
          latitude,
          longitude,
          name,
        },
        {
          headers: {
            token,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
        Add Location
      </h1>
      <form className="mt-6" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <Input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Location Name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {locationError && (
          <p className="text-red-500 text-sm mb-4">{locationError}</p>
        )}
        <div className="mb-4">
          <Label
            htmlFor="latitude"
            className="block text-gray-700 font-bold mb-2"
          >
            Latitude
          </Label>
          <Input
            type="text"
            id="latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="Enter latitude"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="longitude"
            className="block text-gray-700 font-bold mb-2"
          >
            Longitude
          </label>
          <Input
            type="text"
            id="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="Enter longitude"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Location
        </Button>
      </form>
    </div>
  );
};

export default AddLocation;
