import { Button } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { SocketContext } from "../../App";
import { getMessages, pushMessage } from "../../features/chatSlice";
import Messages from "./Messages";

export default function Room() {
  const { conversationContact } = useSelector((state: RootState) => state.chat);
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const chatRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const [showUploadShadow, setShowUploadShadow] = useState(false);
  const [message, setMessage] = useState({
    file: undefined,
    message: "",
  });

  useEffect(() => {
    if (conversationContact?._id) {
      // @ts-ignore
      dispatch(getMessages((conversationContact as user)._id));
    }
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
    setMessage((pre) => ({ message: "", file: undefined }));
  }

  function handleElementaryChange(e: React.ChangeEvent) {
    const el = e.target as HTMLInputElement;
    setMessage((pre) => ({
      ...pre,
      message: el.value,
    }));
  }

  function handleCompositeChange(e: React.ChangeEvent) {
    const el = e.target as HTMLInputElement;
    // @ts-ignore
    setMessage((pre) => ({
      ...pre,
      file: {
        buffer: (el.files as FileList)[0],
        name: (el.files as FileList)[0].name
      },
    }));
  }

  const dragAttributes: React.DOMAttributes<HTMLDivElement> = {
    onDrop: (e) => {
      e.preventDefault()
      console.log(e.dataTransfer.files[0]);
      socket?.emit("send_message", {
        message: "",
        file: {
          buffer: e.dataTransfer.files[0],
          name: e.dataTransfer.files[0].name,
        },
      });
      console.log('sending');
      setShowUploadShadow(false)
    },
    onDragOver: (e) => {
      e.preventDefault()
    },
    onDragEnter: (e) => {
      e.preventDefault();
      console.log('enter');
      setShowUploadShadow(true);
    },
    onDragExit: (e) => setShowUploadShadow(false),
    onDragEnd: (e) => setShowUploadShadow(false),
    onDragLeave: (e) => {
      console.log('left');
      setShowUploadShadow(false)
    },
  };

  return (
    <div {...dragAttributes} ref={chatRef} className="chatAPI">
      {showUploadShadow && (
        <div className="upload_shadow">
          <svg width="34" height="36" viewBox="0 0 34 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2 20.3333V30.3333C2 32.1743 3.49238 33.6667 5.33333 33.6667H28.6667C30.5077 33.6667 32 32.1743 32 30.3333V20.3333"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M17 25.3333V2M17 2L8.66666 11.0741M17 2L25.3333 11.0741" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
      <form className="message_form" onSubmit={(e) => emitMessage(e)} action="">
        <input onChange={(e) => handleElementaryChange(e)} type="text" placeholder="message" />
        <Button type="submit">Send</Button>
      </form>
      <Messages/>
    </div>
  );
}
