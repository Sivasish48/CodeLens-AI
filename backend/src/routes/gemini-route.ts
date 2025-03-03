import express from "express"
import reviewCodeController from "../controllers/review-code"
const router = express.Router()

router.post("/review-code", reviewCodeController);

export default router