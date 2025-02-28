import express from "express"
import generateContent from "../services/gemini";


 const reviewCodeController = async (req: express.Request, res: express.Response) => {
  try {
    const prompt = req.body.prompt;
    if (!prompt) {
      res.status(400).json({ message: "prompt is required" });
      return;
    }

    const response = await generateContent(prompt as string);
    res.status(200).send({ message: response });
  } catch (error) {
    console.error("Error in reviewCodeController:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};


export default reviewCodeController