import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import { useAuth } from "../Context/authcontext";
import ChatItem from "../Components/Chat/chatitem";
import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  createUserChats,
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../Helpers/api-communicator";
import toast from "react-hot-toast";

type Message = {
  role: "user" | "assistant";
  content: string;
};
const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    try {
      toast.loading("Generating Response", { id: "generatingres" });
      const chatData = await sendChatRequest(content);
      setChatMessages([...chatData.chats]);
      toast.success("Response Generated", { id: "generatingres" });
    } catch (error) {
      console.log(error);
      toast.error("Generating Response failed", { id: "generatingres" });
    }
    
    //setChatMessages([...chatData.chats]);
    //
  };
  const handleSwitchChat = async () => {
    try {
      toast.loading("Switching Chat", { id: "switchchats" });
      await createUserChats();
      setChatMessages([]);
      toast.success("Switching Chat Successfully", { id: "switchchats" });
    } catch (error) {
      console.log(error);
      toast.error("Switching chats failed", { id: "switchchats" });
    }
  };
  const handleCreateChat = async () => {
    try {
      toast.loading("Creating Chat", { id: "createchats" });
      await createUserChats();
      setChatMessages([]);
      toast.success("Created Chat Successfully", { id: "createchats" });
    } catch (error) {
      console.log(error);
      toast.error("Creating chats failed", { id: "createchats" });
    }
  };
  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted Chats Successfully", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting chats failed", { id: "deletechats" });
    }
  };
  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Successfully loaded chats", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadchats" });
        });
    }
  }, [auth]);
  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            bgcolor: "rgb(31, 31, 31)",
            borderRadius: 2,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
          {auth?.user?.name[0]}
          {auth?.user?.name.includes(" ") && auth?.user?.name.split(" ")[1][0]}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            Welcome to ADA
          </Typography>
          <Button
            onClick={handleCreateChat}
            sx={{
              width: "200px",
              color: "white",
              fontWeight: "700",
              borderRadius: 2,
              mx: "auto",
              marginTop: 5, 
              marginBottom:5,
              bgcolor: "rgb(219,19,19)"
            }}
          >
            New Chat
          </Button>
          <Button
            onClick={handleSwitchChat}
            sx={{
              width: "100%",
              color: "white",
              fontWeight: "700",
              borderRadius: 2,
              mx: "auto",
              marginTop: 5, 
              marginBottom:5,
              bgcolor: "rgb(51, 51, 51)"
            }}
          >
            {auth?.user?.name.concat(", ADA")}
          </Button>
          <Button
            onClick={handleDeleteChats}
            sx={{
              width: "200px",
              color: "white",
              fontWeight: "700",
              borderRadius: 2,
              mx: "auto",
              marginTop: 'auto', 
              marginBottom:5,
              bgcolor: "rgb(219,19,19)"
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
            my: "auto",
            fontWeight: "600",
          }}
        >
          Model - Ada 1.0
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "80vh",
            borderRadius: 2,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((chat, index) => (
            //@ts-ignore
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div
          style={{
            width: "85%",
            borderRadius: 2,
            backgroundColor: "rgb(31, 31, 31)",
            display: "flex",
            margin: "auto",
          }}
        >
          {" "}
          <input
            ref={inputRef}
            type="text"
            placeholder="Send a message..."
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "20px",
              border: "2px",
              outline: "none", 
              borderRadius:2,
              borderStyle:"solid",
              borderColor:"rgb(214,60,60)",
              color: "white",
              fontSize: "20px",
            }}
          />
          <IconButton onClick={handleSubmit} sx={{ color: "white", backgroundColor:"rgb(214,60,60)", 
              borderRadius:"2%",
              borderStyle:"solid" }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;