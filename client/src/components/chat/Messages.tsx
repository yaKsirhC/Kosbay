import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import "../../styles/chatRoom.scss";
import { message } from "../../vite-env";
import FileMessageContainer from "./FileMessageContainer";
import ImgMessageContainer from "./ImgMessageContainer";
import TextMessageContainer from "./TextMessageContainer";

export default function Messages() {
  const { messages } = useSelector((state: RootState) => state.chat);

  return (
    <div className="messages">
      {messages.map((message: message, i) => {
        if(message.Type === 'zip' || message.Type === 'file') return  <FileMessageContainer mode="full" message={message} key={i} />
        if(message.Type === 'img') return <ImgMessageContainer message={message} key={i} mode={"full"} />
        return <TextMessageContainer mode="full" key={i} message={message} />
      })}
    </div>
  );
}
