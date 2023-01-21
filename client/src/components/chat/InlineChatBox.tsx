import { Button } from "@mui/material";
import React, { CSSProperties, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../store";
import { SocketContext } from "../../App";
import { getMessages, pushMessage, setShowInlineBox } from "../../features/chatSlice";
import "../../styles/inlineChatBox.scss";
import { message } from "../../vite-env";
import FileMessageContainer from "./FileMessageContainer";
import ImgMessageContainer from "./ImgMessageContainer";
import InlineChatBoxMessage from "./InlineChatBoxMessage";
import TextMessageContainer from "./TextMessageContainer";

export default function InlineChatBox({ styles }: { styles?: CSSProperties }) {
  const [message, setMessage] = useState("");
  const socket = useContext(SocketContext);
  const chatRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { conversationContact, messages } = useSelector((state: RootState) => state.chat);
  const dispatch = useDispatch();

  useEffect(() => {
    if (conversationContact?._id) {
      // @ts-ignore
      dispatch(getMessages(conversationContact?._id));
    }
  }, [conversationContact?._id]);

  useEffect(() => {
    if (conversationContact?._id) {
      socket?.on("receive_message", (msg) => {
        chatRef.current.scrollTop = 0;

        dispatch(pushMessage(msg));
      });
    }

    return () => {
      socket?.off("receive_message");
    };
  }, [conversationContact?._id]);

  function emitMessage(e: React.FormEvent) {
    e.preventDefault();
    socket?.emit("send_message", message);
  }

  return (
    <div style={styles} className="chat_container">
      <div ref={chatRef} className="chat_body">
        <div className="chat_box">
          <div className="messages">
            {messages.map((message: message) => {
              if (message.Type === "plain") return <TextMessageContainer message={message} mode="inline" key={message._id} />;
              if (message.Type === "img") return <ImgMessageContainer message={message} mode="inline" key={message._id} />;
              return <FileMessageContainer mode="inline" message={message} key={message._id} />;
            })}
          </div>
          <form onSubmit={(e) => emitMessage(e)} action="">
            <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder="message" />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
      <div className="chat_header">
        <p>{conversationContact?.Name}</p>
        <div className="box_opts">
          <Link to={"/chat-room"}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.8125 4.6875H6.5625V2.8125H0.9375V14.0625H12.1875V8.4375H10.3125V12.1875H2.8125V4.6875ZM15 7.5V0H7.5V1.875H11.8003L5.90063 7.77562L7.22531 9.10031L13.125 3.19969V7.5H15Z"
                fill="black"
              />
            </svg>
          </Link>
          <button onClick={() => dispatch(setShowInlineBox(false))}>
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 2L17 17M2 17L17 2" stroke="black" strokeWidth="3.69" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
