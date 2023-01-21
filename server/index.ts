import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
mongoose.connect(process.env.DB_URI as string);
import fs from 'fs'
import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});
io.on("connection", (socket) => {
  socket.on("enable_chat", (id) => {
    
    socket.join(`initial_${id}`);
  });
  socket.on("join_chat", (recipientID) => {
    
    const recipientid = recipientID;
    socket.join(recipientid);

    socket.on("send_message", async (msg) => {

      const arrayRooms = Array.from(socket.rooms);
      const initialRoom = arrayRooms.find((room) => room.startsWith("initial_"));
      const transmitterID = initialRoom?.slice(8);
      
      if(msg.file.buffer && msg.file.name){
        const url = generatePath(msg.file.name)
        const ext = detectFileExt(msg.file.name)
        console.log(ext);
        if(ext === 'unkw') return
        const newMessage = new _Message({
          Content: url,
          Recipient: recipientID,
          SentAt: Date.now(),
          Transmitter: transmitterID,
          Type: ext === 'img'? 'img' : ext === 'file' ? 'file' : 'zip'
        });
        saveFile(url,msg.file.buffer)
        await newMessage.save();
        socket.to(recipientID).emit("receive_message", newMessage);
        socket.emit("receive_message", newMessage);

      }
      if(msg.message.length > 0){
        const newMessage = new _Message({
          Content: msg.message,
          Recipient: recipientID,
          SentAt: Date.now(),
          Transmitter: transmitterID,
          Type: 'plain'
        });
        await newMessage.save();
        socket.to(recipientID).emit("receive_message", newMessage);
        socket.emit("receive_message", newMessage);

      }
      
      const TransmitterUser = await _User.findById(transmitterID);
      const recipientUser = await _User.findById(recipientID);
      if (!TransmitterUser?.Conversations.includes(recipientID)) {
        TransmitterUser?.Conversations.unshift(recipientID);
        await TransmitterUser?.save();
      }
      if (!recipientUser?.Conversations.includes(transmitterID as string)) {
        recipientUser?.Conversations.unshift(transmitterID as string);
        await recipientUser?.save();
      }

    });
  });
});

io.listen(9000);

const app = express();

app.use(
  cors({
    origin: [process.env.CLIENT_URL as string],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(urlencoded({ extended: false }));
app.use(fileUpload());
app.use(express.json());

import authRouter from "./routes/auth";
import announcementsRouter from "./routes/announcements";
import eventsRouter from "./routes/events";
import productsRouter from "./routes/products";
import questionsRouter from "./routes/questions";
import usersRouter from "./routes/users";
import repliesRouter from "./routes/replies";
import chatRouter from "./routes/chat";
import imgRetriever from "./routes/fileRetriever";
import _Message from "./models/MessageSchema";
import _User from "./models/UserSchema";
import saveFile from "./utils/saveFile";
import { randomBytes } from "crypto";
import detectFileExt from "./utils/detectFileExt";
import generatePath from "./utils/generatePath";

app.use("/auth", authRouter);
app.use("/announcements", announcementsRouter);
app.use("/events", eventsRouter);
app.use("/products", productsRouter);
app.use("/questions", questionsRouter);
app.use("/users", usersRouter);
app.use("/replies", repliesRouter);
app.use("/chat", chatRouter);
app.use("/files", imgRetriever);

app.listen(process.env.APP_PORT as string);
