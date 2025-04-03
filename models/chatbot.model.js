import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: true,
    },
    messages: [
    {
      role: { type: String, enum: ["user", "bot"], required: true },
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
},{timestamps:true})

export const chatModel = mongoose.model('chatbot',chatSchema)