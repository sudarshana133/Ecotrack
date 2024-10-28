import express, { json, Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());

const SMARTTHINGS_API_URL = 'https://api.smartthings.com/v1';

app.listen(8000, () => {
    console.log(`App listening on http://localhost:${port}`);
})