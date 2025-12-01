import express from "express";
import { sendMessage, getMessages } from "../controllers/contactController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/messages", authMiddleware, getMessages);

export default router;
