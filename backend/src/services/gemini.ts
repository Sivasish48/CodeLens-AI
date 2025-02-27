const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const generateContent = async (prompt: string) => {
  const result = await model.generateContent(prompt);
  return result.response.text();
};

export default generateContent;