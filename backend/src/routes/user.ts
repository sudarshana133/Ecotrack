import axios from "axios";
import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { DeviceFromAPI } from "../types/Device";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const router = express.Router();

const signin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(403).json({ msg: "Missing email or password" });
  try {
    const user = await prisma.user.findFirst({
      where: {
        userName: username,
      },
    });
    if (!user) {
      return res.status(401).json({ msg: "Email or password is incorrect." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Email or password is incorrect." });
    }
    const token = jwt.sign(
      { id: user.userId, name: user.userName },
      process.env.JWT_SECRET as string
    );
    res
      .cookie("token", token, {
        sameSite: "strict",
        maxAge: 3600 * 24 * 1000,
      })
      .status(200)
      .json({
        msg: "Success!",
      });
  } catch (error: any) {
    res.status(500).json({ msg: "Error: " + error.message });
  }
};

const signup = async (req: Request, res: Response) => {
  const body = req.body;
  const userDetails = {
    username: body.username,
    password: body.password,
    token: body.token,
  };
  try {
    const response = await prisma.user.findFirst({
      where: {
        userName: userDetails.username,
      },
    });
    if (response) {
      return res.status(400).json({
        msg: "user exists",
      });
    }
  } catch (err) {
    return res.status(400).json({
      msg: "couldnt search the database",
    });
  }
  const hash = await bcrypt.hash(userDetails.password, 10);
  try {
    const response = await prisma.user.create({
      data: {
        userName: userDetails.username,
        password: hash,
        oAuthToken: userDetails.token,
      },
    });
  } catch (err) {
    return res.status(400).json({
      msg: "error while updating in the database",
    });
  }

  return res.status(200).json({
    msg: "user added",
  });
};
