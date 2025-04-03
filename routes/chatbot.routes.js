import { askChatbotController } from "../controllers/chatbot.controller.js";
import express from 'express'

const chatbotRouter = express.Router()

chatbotRouter.post('/chat',askChatbotController)

export {
    chatbotRouter
}