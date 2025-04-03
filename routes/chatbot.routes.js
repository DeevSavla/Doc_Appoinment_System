import express from 'express';
import { authmiddleware } from '../middleware/authmiddleware.js';
import {
  getConversationsController,
  createConversationController,
  getMessagesController,
  sendMessageController,
  deleteConversationController
} from '../controllers/chatbot.controller.js';

const chatbotRouter = express.Router();

// Get all conversations for a user
chatbotRouter.post('/conversations', authmiddleware, getConversationsController);

// Create a new conversation
chatbotRouter.post('/conversations/create', authmiddleware, createConversationController);

// Get messages for a conversation
chatbotRouter.post('/messages/:conversationId', authmiddleware, getMessagesController);

// Send a message to the chatbot
chatbotRouter.post('/messages', authmiddleware, sendMessageController);

// Delete a conversation
chatbotRouter.post('/conversations/delete/:conversationId', authmiddleware, deleteConversationController);

export { chatbotRouter };