"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenVerifier = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenVerifier = async (request, response, next) => {
    try {
        let secretKey = process.env.JWT_SECRET_KEY;
        if (secretKey) {
            let token = request.headers["x-auth-token"];
            if (!token) {
                console.log("No token provided");
                return response.status(401).json({ message: "No token provided" });
            }
            if (typeof token === "string" && secretKey) {
                let decodeObj = await jsonwebtoken_1.default.verify(token, secretKey);
                request.headers["user"] = decodeObj;
                next();
            }
            else {
                console.log("Invalid token");
                return response.status(401).json({ message: "Invalid token" });
            }
        }
    }
    catch (error) {
        console.error(error);
        response.status(500).json({ message: "Unauthorized! it is an invalid token" });
    }
};
exports.tokenVerifier = tokenVerifier;
//# sourceMappingURL=tokenVerifier.js.map