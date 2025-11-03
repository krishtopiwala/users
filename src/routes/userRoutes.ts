import { Router, Request, Response } from "express";
import * as userController from "../controllers/userController";
import upload from "../middlewares/upload";

const userRouter : Router = Router();

/*
    @use: Register User
    @url: http://localhost:6600/api/users/register
    @params: username, imageUrl, email, password
    @method: POST
    @access: PUBLIC
*/
userRouter.post("/register", upload.single("img"), async (request : Request, response : Response) => {
    await userController.registerUser(request, response);
});

/*
    @use: Get all users
    @url: http://localhost:6600/api/users/
    @params: no-params
    @method: GET
    @access: PUBLIC
*/
userRouter.get("/", async (request : Request, response : Response) => {
    await userController.getAllUser(request, response);
});


export default userRouter;