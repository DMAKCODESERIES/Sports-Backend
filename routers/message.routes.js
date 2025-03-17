import express from 'express';
import { createMessage, getMessages } from '../controllers/message.controller.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';
const router = express.Router()

router.post("/create-message",authenticateUser,createMessage)
router.get("/get-all-messages/:chatId",authenticateUser,getMessages)

export default router