"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gemini_1 = __importDefault(require("../services/gemini"));
const reviewCodeController = async (req, res) => {
    try {
        const prompt = req.query.prompt;
        if (!prompt) {
            res.status(400).json({ message: "prompt is required" });
            return;
        }
        const response = await (0, gemini_1.default)(prompt);
        res.status(200).send({ message: response });
    }
    catch (error) {
        console.error("Error in reviewCodeController:", error);
        res.status(500).send({ message: "Internal server error" });
    }
};
exports.default = reviewCodeController;
