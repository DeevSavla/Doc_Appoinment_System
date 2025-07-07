import { asyncHandler } from '../utility/AsyncHandler.js';
import { ApiError } from '../utility/ApiError.js';
import { ApiResponse } from '../utility/ApiResponse.js';
import { Conversation } from '../models/conversation.model.js';
import { Message } from '../models/message.model.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Get all conversations for a user
const getConversationsController = asyncHandler(async (req, res) => {
  const userId = req.body.userId;
  
  if (!userId) {
    throw new ApiError(401, 'Unauthorized');
  }
  
  const conversations = await Conversation.find({ userId }).sort({ updatedAt: -1 });
  
  res.status(200).send(
    new ApiResponse(200, conversations, 'Conversations fetched successfully')
  );
});

// Create a new conversation
const createConversationController = asyncHandler(async (req, res) => {
  const userId = req.body.userId;
  
  if (!userId) {
    throw new ApiError(401, 'Unauthorized');
  }
  
  const conversation = await Conversation.create({
    userId: userId.toString()
  });
  
  res.status(201).send(
    new ApiResponse(201, conversation, 'Conversation created successfully')
  );
});

// Get messages for a conversation
const getMessagesController = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;
  const userId = req.body.userId;
  
  if (!userId) {
    throw new ApiError(401, 'Unauthorized');
  }
  
  // Check if conversation belongs to user
  const conversation = await Conversation.findById(conversationId);
  
  if (!conversation) {
    throw new ApiError(404, 'Conversation not found');
  }
  
  if (conversation.userId !== userId.toString()) {
    throw new ApiError(403, 'Forbidden');
  }
  
  const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });
  
  res.status(200).send(
    new ApiResponse(200, messages, 'Messages fetched successfully')
  );
});

// Send a message to the chatbot
const sendMessageController = asyncHandler(async (req, res) => {
  const { conversationId, content } = req.body;
  const userId = req.body.userId;
  
  if (!userId) {
    throw new ApiError(401, 'Unauthorized');
  }
  
  if (!conversationId || !content) {
    throw new ApiError(400, 'Conversation ID and content are required');
  }
  
  // Check if conversation belongs to user
  const conversation = await Conversation.findById(conversationId);
  
  if (!conversation) {
    throw new ApiError(404, 'Conversation not found');
  }
  
  if (conversation.userId !== userId.toString()) {
    throw new ApiError(403, 'Forbidden');
  }
  
  // Save user message
  const userMessage = await Message.create({
    conversationId,
    role: 'user',
    content
  });
  
  // Get previous messages to build context
  const previousMessages = await Message.find({ conversationId }).sort({ createdAt: 1 }).limit(10);
  
  try {
    // Initialize the Gemini API
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Use the correct model name
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Create a proper prompt with system instructions
    let prompt = "You are MediBot, a helpful healthcare assistant designed to provide general medical information, assist with appointment scheduling, and answer health-related questions. You should be professional, compassionate, and accurate. Always remind users that you do not replace professional medical advice, diagnosis, or treatment.\n\n";
    
    // Add conversation history to the prompt
    for (const msg of previousMessages) {
      if (msg.role === 'user') {
        prompt += `User: ${msg.content}\n`;
      } else if (msg.role === 'assistant') {
        prompt += `MediBot: ${msg.content}\n`;
      }
    }
    
    // Add the current user query
    prompt += `User: ${content}\nMediBot: `;
    
    // Simple approach: use generateContent instead of chat
    const result = await model.generateContent(prompt);
    const response = result.response;
    const botResponse = response.text();
    
    // Save bot message
    const botMessage = await Message.create({
      conversationId,
      role: 'assistant',
      content: botResponse
    });
    
    // Update last message in conversation
    conversation.lastMessage = {
      role: 'assistant',
      content: botResponse
    };
    await conversation.save();
    
    res.status(200).send(
      new ApiResponse(200, botMessage, 'Message sent successfully')
    );
  } catch (error) {
    console.error("Error in chatbot response:", error);
    
    // Fallback response if Gemini fails
    const fallbackMessage = await Message.create({
      conversationId,
      role: 'assistant',
      content: "I'm sorry, I'm having trouble processing your request right now. Please try again later or contact support if the problem persists. Remember that I can only provide general information and not medical advice."
    });
    
    // Update last message in conversation
    conversation.lastMessage = {
      role: 'assistant',
      content: fallbackMessage.content
    };
    await conversation.save();
    
    res.status(200).send(
      new ApiResponse(200, fallbackMessage, 'Fallback message sent')
    );
  }
});

// Delete a conversation
const deleteConversationController = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;
  const userId = req.body.userId;
  
  if (!userId) {
    throw new ApiError(401, 'Unauthorized');
  }
  
  // Check if conversation belongs to user
  const conversation = await Conversation.findById(conversationId);
  
  if (!conversation) {
    throw new ApiError(404, 'Conversation not found');
  }
  
  if (conversation.userId !== userId.toString()) {
    throw new ApiError(403, 'Forbidden');
  }
  
  // Delete all messages in conversation
  await Message.deleteMany({ conversationId });
  
  // Delete conversation
  await Conversation.findByIdAndDelete(conversationId);
  
  res.status(200).send(
    new ApiResponse(200, null, 'Conversation deleted successfully')
  );
});

export {
  getConversationsController,
  createConversationController,
  getMessagesController,
  sendMessageController,
  deleteConversationController
};
