import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const signin: any = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(403).json({ msg: "Missing email or password" });
  try {
    console.log("1"+username+password);
    const user = await prisma.user.findFirst({
      where: {
        userName: username,
      },
    });
    if (!user) {
      return res.status(401).json({ msg: "Email or password is incorrect." });
    }

    console.log("2");
    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log("3");
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Email or password is incorrect." });
    }
    console.log("4");
    const token = jwt.sign(
      { id: user.userId, name: user.userName },
      process.env.JWT_SECRET as string
    );
    console.log("5");
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

const signup: any = async (req: Request, res: Response) => {
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
const deleteUser:any = async (req: Request, res: Response) => {
  const { username } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        userName: username,
      },
    });

    if (!user) return res.status(404).json({ msg: "User not found" });

    // Use userId for deletion since it's unique
    await prisma.user.delete({
      where: {
        userId: user.userId,
      },
    });

    res.status(200).json("User deleted");
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

export { signup, signin,deleteUser };
