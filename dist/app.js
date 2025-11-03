"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = __importDefault(require("./config/db"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
dotenv_1.default.config({ path: "./.env" });
const PORT = Number(process.env.PORT);
const DBURL = String(process.env.MONGO_URL);
(0, db_1.default)(DBURL);
app.use("/api/users/", userRoutes_1.default);
app.listen(PORT || 6601, () => {
    console.log("Server is started at PORT", PORT);
});
//# sourceMappingURL=app.js.map