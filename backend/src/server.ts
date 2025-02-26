import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/gemini-route";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/", router);


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
