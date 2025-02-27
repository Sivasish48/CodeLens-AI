"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const gemini_route_1 = __importDefault(require("./routes/gemini-route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
if (!process.env.GOOGLE_AI_API_KEY) {
    console.log("GOOGLE_AI_API_KEY is missing in .env file");
    process.exit(1);
}
else if (process.env.GOOGLE_AI_API_KEY) {
    console.log("GOOGLE_AI_API_KEY is present in .env file", process.env.GOOGLE_AI_API_KEY);
}
const aiRouter = gemini_route_1.default;
app.use("/ai", aiRouter);
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
