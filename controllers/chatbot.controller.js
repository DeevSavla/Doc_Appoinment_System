import { chatModel } from "../models/chatbot.model.js";
import { config } from "dotenv";
import OpenAI from "openai";

config()

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const askChatbotController = async (req, res) => {
  const { userId, message } = req.body;
  if (!userId || !message) {
    return res.status(400).json({ error: "Missing data" });
  }

  try {
    const chatHistory = await chatModel.findOne({ userId });
    const previousMessages = chatHistory ? chatHistory.messages : [];

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        ...previousMessages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        { role: "user", content: message },
      ],
    });

    const botMessage = response.choices[0].message.content;

    const updatedChat = await chatModel.findOneAndUpdate(
      { userId },
      {
        $push: {
          messages: { role: "user", content: message },
          messages: { role: "bot", content: botMessage },
        },
      },
      { upsert: true, new: true }
    );

    res.json({ response: botMessage, history: updatedChat.messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch response" });
  }
};
