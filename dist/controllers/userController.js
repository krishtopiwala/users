"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUser = exports.registerUser = void 0;
const userSchema_1 = __importDefault(require("../schemas/userSchema"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const cloudinary_config_1 = __importDefault(require("../config/cloudinary-config"));
const fs_1 = __importDefault(require("fs"));
const registerUser = async (request, response) => {
    try {
        let { username, email, password } = request.body;
        let salt = await bcryptjs_1.default.genSalt(10);
        let hashPassword = await bcryptjs_1.default.hash(password, salt);
        let imageUrl = "";
        if (!request.file) {
            console.log("No file uploaded");
            return response.status(400).send("No file uploaded");
        }
        if (request.file) {
            const result = await cloudinary_config_1.default.uploader.upload(request.file.path);
            console.log("Cloudinary ", result);
            imageUrl = result.secure_url;
            console.log(imageUrl);
            fs_1.default.unlinkSync(request.file.path);
        }
        let userObj = {
            username: username,
            imageUrl: imageUrl,
            email: email,
            password: hashPassword
        };
        let newUser = new userSchema_1.default(userObj).save()
            .then((newUser) => {
            console.log(newUser);
            response.status(201).json({ message: "User registered successfully" });
        })
            .catch((error) => {
            console.error(error);
            response.status(200).json({ message: "Failed to register" });
        });
    }
    catch (error) {
        console.error(error);
        response.status(404).json({ message: "Not Found" });
    }
};
exports.registerUser = registerUser;
const getAllUser = async (request, response) => {
    try {
        await userSchema_1.default.find()
            .then((users) => {
            console.log(users);
            response.status(200).json({ "User": users });
        })
            .catch((error) => {
            console.error(error);
            response.status(500).json({ message: "No users yet" });
        });
    }
    catch (error) {
        console.error(error);
        response.status(404).json({ message: "Not Found" });
    }
};
exports.getAllUser = getAllUser;
//# sourceMappingURL=userController.js.map