import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register",async (req, res) => {
    const {username, password} = req.body;

    const user =  await UserModel.findOne({username});

    if(user) {
        return res.json({message: "User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({username, password: hashedPassword});
    await newUser.save();

    res.json({ message: "User registered successfully", userID: newUser._id });
});

router.post("/login", async (req, res) => {
    const {username, password} = req.body;

    const user = await UserModel.findOne({username});

    if(!user) {
        return res.json({message: "User not found"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        return res.json({message: "username or password is not valid"});
    }

    const token = jwt.sign({id: user._id}, "secret");
    res.json({token, userID: user._id});
})

export{router as userRouter};

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      jwt.verify(authHeader, "secret", (err) => {
        if (err) {
          return res.sendStatus(403);
        }
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };