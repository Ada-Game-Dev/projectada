import mongoose, { Document } from "mongoose";
import { randomUUID } from "crypto";

// Define the chat schema
export interface IChat {
  id: string;
  role: string;
  content: string;
}
const chatSchema = new mongoose.Schema({
  id: {
    type: String,
    default: randomUUID(),
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

// Define the conversation schema
const conversationSchema = new mongoose.Schema({
  participants: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' }],
  chats: [chatSchema]
});

// Define the user schema
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  chats: IChat[];
  conversations: mongoose.Types.Array<typeof conversationSchema>;
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }];
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  chats: [chatSchema],
  conversations: [{ type: conversationSchema, default: [] }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

export default mongoose.model<IUser>("User", userSchema);
