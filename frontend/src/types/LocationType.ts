import { Device } from "./DeviceType";

export interface Location {
    locationId: string;
    name: string;
    countryCode: string;
    timeZoneId: string;
    devices: Device[]
}