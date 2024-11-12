import DeleteLocationModal from "@/components/DeleteLocationModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Location } from "@/types/LocationType";
import axios from "axios";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Locations = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  // Function to fetch locations from the backend
  const getLocations = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://139.84.210.156/location/locations`, {
        headers: { token },
      });
      setLocations(res.data.items);
    } catch (error) {
      console.error("Failed to fetch locations:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle delete logic
  const handleDelete = async (locationId: string) => {
    setIsDelete(false);
    try {
      await axios.delete(
        `http://139.84.210.156/location/deleteLocation/${locationId}`,
        {
          headers: { token },
        }
      );
      setLocations((prevLocations) =>
        prevLocations.filter((location) => location.locationId !== locationId)
      );
    } catch (error) {
      console.error("Failed to delete location:", error);
    }
  };

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-gray-800">Locations</h1>
        <Button onClick={() => navigate("/dashboard/addLocation")}>
          Add Location <Plus />
        </Button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-gray-900"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-4">
          {locations.length > 0 ? (
            locations.map((location) => (
              <Card
                key={location.locationId}
                className="rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  {location.name}
                </h2>
                <p className="text-sm text-gray-500 mb-1">
                  Country Code: IN
                </p>
                <p className="text-sm text-gray-500">
                  Time Zone: IST
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <Button
                    variant="secondary"
                    className="w-full text-sm"
                    onClick={() => {
                      navigate(`/dashboard/devices/${location.locationId}`);
                    }}
                  >
                    Show Devices
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full text-sm"
                    onClick={() => {
                      setIsDelete(true);
                      setSelectedLocationId(location.locationId);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <h1>No locations found</h1>
          )}
        </div>
      )}

      {isDelete && selectedLocationId && (
        <DeleteLocationModal
          open={isDelete}
          onOpenChange={(isOpen) => setIsDelete(isOpen)}
          handleDelete={() => handleDelete(selectedLocationId)}
        />
      )}
    </div>
  );
};

export default Locations;
