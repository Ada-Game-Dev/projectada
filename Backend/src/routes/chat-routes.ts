import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import {
  deleteChats,
  generateChatCompletion,
  sendChatsToUser,
  sendConversationsToUser,
  createConversation,
} from "../controllers/chat-controllers.js";

//Protected API
const chatRoutes = Router();
chatRoutes.post(
  "/new",
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
);
chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);
chatRoutes.get("/all-conversations", verifyToken, sendConversationsToUser);
chatRoutes.post("/delete", verifyToken, deleteChats);
// chat route to start a new conversation
chatRoutes.post("/new-conversation", verifyToken, createConversation);

export default chatRoutes;
