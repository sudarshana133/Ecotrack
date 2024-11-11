import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import axios from "axios";

const prisma = new PrismaClient();

const signin: any = async (req: Request, res: Response) => {
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
    res.status(200).json({username,token:user.oAuthToken});
  } catch (error: any) {
    res.status(500).json({ msg: "Error: " + error.message });
  }
};

const signup: any = async (req: Request, res: Response) => {
  const body = req.body;
  const userDetails = {
    username: body.username,
    password: body.password,
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
        oAuthToken: ""
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
const deleteUser: any = async (req: Request, res: Response) => {
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
const verifyToken: any = async (req: Request, res: Response) => {
  const token = req.body.token;
  const username = req.body.username;
  try {
    const response = await axios.get(`${process.env.SMARTTHINGS_BASE_URL}/devices`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
    if (response.status === 200) {
      const user = await prisma.user.findFirst({
        where: {
          userName: username
        }
      })
      await prisma.user.update({
        where: {
          userId: user?.userId,
        },
        data: {
          oAuthToken: token,
        },
      });
      return res.status(200).json({ msg: "Token verified successfully." });
    }
    return res.status(400).json({ msg: "Token is not valid." });
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
}
export { signup, signin, deleteUser, verifyToken };
