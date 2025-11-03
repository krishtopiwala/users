import mongoose from "mongoose";
import { IUser } from "../models/IUser";
declare const userCollection: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
export default userCollection;
//# sourceMappingURL=userSchema.d.ts.map