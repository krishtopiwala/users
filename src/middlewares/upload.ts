import multer from "multer";
import { Request } from "express";

const storage = multer.diskStorage({
    destination: (request : Request, file, cb) => {
        console.log("Multer ", file);
        cb(null, "uploads/");
    },
    filename: (request : Request, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
});

const upload = multer({ storage: storage });
export default upload;