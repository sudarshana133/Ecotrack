import { Router } from "express";
import { addLocation, deleteLocation, getLocation, getLocations } from "../controllers/locationController";
const locationRouter = Router();
locationRouter.get("/locations", getLocations);
locationRouter.post("/addLocation", addLocation);
locationRouter.delete("/deleteLocation/:locationId", deleteLocation);
locationRouter.get("/:locationId", getLocation);
export { locationRouter }