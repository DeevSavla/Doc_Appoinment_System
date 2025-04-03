import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    lastMessage: {
      type: Object,
      default: null
    },
  },
  {
    timestamps: true
  }
);

export const Conversation = mongoose.model('conversations', conversationSchema); 