import express from 'express';
import { createNewchat, getChats } from '../controllers/chat.controller.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';
const router= express.Router()

router.post("/create-new-chat",authenticateUser,createNewchat)
router.get("/get-chats",authenticateUser,getChats)

export default router