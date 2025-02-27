import express from "express"
import generateContent from "../services/gemini";


export const reviewCodeController = async (req: express.Request, res: express.Response) => {
   const prompt = req.query.prompt;
   if(!prompt){
      res.status(400).json({message: "prompt is required"});
      return;
   }

   const response = await generateContent(prompt?.toString());
   res.status(200).send({message: response});
}

export default reviewCodeController