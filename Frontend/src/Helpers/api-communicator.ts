import axios from "axios";
export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  return data;
};

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post("/user/signup", { name, email, password });
  if (res.status !== 201) {
    throw new Error("Unable to Signup");
  }
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status");
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = await res.data;
  return data;
};

export const sendChatRequest = async (activeConversationId: number, message: string) => {
  const res = await axios.post("/chat/new", { activeConversationId, message });
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const getUserChats = async () => {
  const res = await axios.get("/chat/all-chats");
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const getUserConversations = async () => {
  const res = await axios.get("/chat/all-conversations");
  if (res.status !== 200) {
    throw new Error("Unable to send convo");
  }
  const data = await res.data;
  return data;
};

export const createUserConv = async (id: number, participants: String[]) => {
  const res = await axios.post("/chat/new-conversation", {id, participants});
  if (res.status !== 200) {
    throw new Error("Unable to create chats");
  }
  const data = await res.data;
  return data;
};

export const deleteUserChats = async (activeConversationId: number) => {
  console.log("activeConversationId", activeConversationId);
  const res = await axios.post(`/chat/delete`, { activeConversationId });
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};

export const logoutUser = async () => {
  const res = await axios.get("/user/logout");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};