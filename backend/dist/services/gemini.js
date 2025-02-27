"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generative_ai_1 = require("@google/generative-ai");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
const generateContent = async (prompt) => {
    try {
        const result = await model.generateContent(prompt);
        return result.response.text();
    }
    catch (error) {
        console.error("Error generating content:", error);
        throw new Error("Failed to generate content");
    }
};
exports.default = generateContent;
