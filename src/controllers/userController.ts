import { Request, Response } from "express";
import { IUser } from "../models/IUser";
import userCollection from "../schemas/userSchema";
import bcryptjs from "bcryptjs";
import cloudinary from "../config/cloudinary-config";
import fs from "fs";

export const registerUser = async (request : Request, response : Response) => {
    try {
        let { username, email, password } = request.body;

        let salt = await bcryptjs.genSalt(10);
        let hashPassword = await bcryptjs.hash(password, salt);

        let imageUrl = "";

        if (!request.file) {
            console.log("No file uploaded");
            return response.status(400).send("No file uploaded");
        }

        if (request.file) {
            const result = await cloudinary.uploader.upload(request.file.path);
            console.log("Cloudinary ", result);
            imageUrl = result.secure_url;
            console.log(imageUrl);
            fs.unlinkSync(request.file.path);
        }

        let userObj : IUser = {
            username: username,
            imageUrl: imageUrl,
            email: email,
            password: hashPassword
        };

        let newUser = new userCollection(userObj).save()
        .then((newUser) => {
            console.log(newUser);
            response.status(201).json({ message: "User registered successfully" });
        })
        .catch((error) => {
            console.error(error);
            response.status(200).json({ message: "Failed to register" });
        })
    } catch (error) {
        console.error(error);
        response.status(404).json({ message: "Not Found" });
    }
};

export const getAllUser = async (request : Request, response : Response) => {
    try {
        await userCollection.find()
        .then((users) => {
            console.log(users);
            response.status(200).json({ "User": users });
        })
        .catch((error) => {
            console.error(error);
            response.status(500).json({ message: "No users yet" });
        })
    } catch (error) {
        console.error(error);
        response.status(404).json({ message: "Not Found" });
    }
};