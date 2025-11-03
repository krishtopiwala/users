import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./config/db";
import userRouter from "./routes/userRoutes";
import cors from "cors";

const app : express.Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

dotenv.config({ path: "./.env" });

const PORT : Number = Number(process.env.PORT);
const DBURL : string = String(process.env.MONGO_URL);

connectDB(DBURL);

app.use("/api/users/", userRouter);

app.listen(PORT || 6601, () => {
    console.log("Server is started at PORT", PORT);
});