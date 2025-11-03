import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const tokenVerifier = async (request : Request, response : Response, next : NextFunction) => {
    try {
        let secretKey : string | undefined = process.env.JWT_SECRET_KEY;
        if (secretKey) {
            let token = request.headers["x-auth-token"]

            if (!token) {
                console.log("No token provided");
                return response.status(401).json({ message: "No token provided" });
            }

            if (typeof token === "string" && secretKey) {
                let decodeObj : any = await jwt.verify(token, secretKey);
                request.headers["user"] = decodeObj;
                next();
            } else {
                console.log("Invalid token");
                return response.status(401).json({ message: "Invalid token" });
            }
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Unauthorized! it is an invalid token" });
    }
};