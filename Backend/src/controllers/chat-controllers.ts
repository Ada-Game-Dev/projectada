import { NextFunction, Request, Response } from "express";
import IUser from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { OpenAIApi, ChatCompletionRequestMessage } from "openai";

// function to generate chat completion
export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("generateChatCompletion");
  const { activeConversationId, message } = req.body;
  console.log("Conversation ID: ", activeConversationId, "New Message: ", message)
  try {
    const user = await IUser.findById(res.locals.jwtData.id);
    if (!user){
      return res
        .status(401)
        .json({ message: "User not registered OR Token malfunctioned" });
    }
    // Find the current conversation based on some criteria (for example, activeConversationId)
    // Check the user is part of the conversation
    const currentConversation = user.conversations.find(
      conversation => conversation.get("id") === activeConversationId
    );

    if (!currentConversation)
      return res.status(404).json({ message: "Conversation not found" });

    // Add the message to the current conversation
    if (message) {
      await user.collection.updateOne(
        { "conversations.id": activeConversationId },
        { $push: { "conversations.$.chats": { content: message, role: "user" } } }
      );
    }
    console.log("BEFORE CONFIG")

    // send all chats with new one to openAI API
    const config = configureOpenAI();
    const openai = new OpenAIApi(config);

    // Get chats of currentConversation
    const messages = (currentConversation as any).chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];

    console.log("Messages1: ", messages);
    // update the first message in messages to have content
    if(!messages[0].content){
      messages[0].content = "You are a helpful video game development assistant named Ada.";
    }
    console.log("Messages2: ", messages);

    if (message) {
      messages.push({ content: message, role: "user" });
    }
    console.log("Messages3: ", messages);
    // get latest response
    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    console.log("Chat Response: ", chatResponse.data.choices[0].message.content);
    // Add assistant response to the current conversation
    user.collection.updateOne(
      { "conversations.id": activeConversationId },
      {
        $push: {
          "conversations.$.chats": {
            content: chatResponse.data.choices[0].message.content,
            role: "assistant",
          },
        },
      }
    );
    await user.save();
    return res.status(200).json({ conversation: currentConversation });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "generateChatCompletion error", cause: error.response.data });
  }
};

// function to send chats to user
export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { activeConversationId } = req.body;
  try {
    //user token check
    const user = await IUser.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    // Find the current conversation based on some criteria (for example, activeConversationId)
    const currentConversation = user.conversations.find(
      conversation => conversation.get("id") === activeConversationId
    );
    return res.status(200).json({ message: "OK", chats: (currentConversation as any).chats });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

// function to delete chats
export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // grab conversation id
  const { activeConversationId } = req.body;
  console.log("Conversation ID: ", activeConversationId);
  try {
    //user token check
    const user = await IUser.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    await user.collection.findOneAndUpdate(
      { "conversations.id": activeConversationId }, 
      {
        $set: { "conversations.chats": [] }
      }
    );
    //user.chats = [];
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    console.log(error.message);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

// function to create a new conversation
export const createConversation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await IUser.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    // grab participants and id
    const { id, participants } = req.body;
    // get participant IDs
    const participantIDs = await IUser.find({ name: { $in: participants } }).distinct('_id');
    // create conversation
    const newConversation = {
      id,
      participants: [participantIDs],
      chats: [],
    };
    user.conversations.push(newConversation);
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

// function to send conversations to user
export const sendConversationsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await IUser.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res.status(200).json({ message: "OK", conversations: user.conversations });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};