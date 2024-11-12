import axios from "axios";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getLocations:any = async (req: Request, res: Response) => {
    const token = req.headers.token;
    try {
        const response = await axios.get(`${process.env.SMARTTHINGS_BASE_URL}/locations`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const items = response.data.items;
        res.status(200).json(response.data);
    } catch (error: any) {
        console.log(error)
        res.status(500).json(error.message)
    }
}
export const getLocation:any = async(req: Request, res: Response) =>{
    const token = req.headers.token;
    const locationId = req.params.locationId
    try {
        const location = await axios.get(`${process.env.SMARTTHINGS_BASE_URL}/locations/${locationId}`,{
            headers:{
                Authorization: 'Bearer ' + token
            }
        });
        res.status(200).json(location.data);
    } catch (error:any)  {
        res.status(500).json(error.message);
    }
}
export const addLocation:any = async(req:Request, res:Response)=>{
    const token = req.headers.token;
    const body = req.body;
    try {
        const response = await axios.post(`${process.env.SMARTTHINGS_BASE_URL}/locations`, {
            "name": body.name,
            "countryCode": "IND",
            "latitude": body.latitude,
            "longitude": body.longitude,
            "regionRadius": 150,
            "temperatureScale": "C",
            "timeZoneId": "IST",
            "locale": "en",
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        await prisma.location.create({
            data: {
                locationId: response.data.locationId,
                name: body.name,
                timeZoneId: body.timeZoneId,
                countryCode: body.countryCode,
            }
        });
        res.status(200).json(response.data);
    } catch (error: any) {
        res.status(500).json(error.message);
    }
}
export const deleteLocation:any = async (req: Request, res: Response) => {
    const token = req.headers.token;
    const locationId = req.params.locationId;
    try {
        const response = await axios.delete(`${process.env.SMARTTHINGS_BASE_URL}/locations/${locationId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        await prisma.location.delete({
            where: {
                locationId: locationId
            }
        });
        res.status(200).json(response.data);
    } catch (error: any) {
        res.status(500).json(error.message);
    }
}