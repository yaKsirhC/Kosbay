import { Button } from "@mui/material";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../store";
import { SocketContext } from "../../App";
import { setconversationContact } from "../../features/chatSlice";
import { user } from "../../vite-env";
import ServerImage from "../ServerImage";

export default function Contact({ contact }: { contact: user }) {
  const { conversationContact } = useSelector((state: RootState) => state.chat);
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  function handleClick() {
    dispatch(setconversationContact(contact));
    socket?.emit("join_chat", contact._id);
  }


  return (
    <button onClick={() => handleClick()} className="contact">
      <Link to={'/users/' + contact._id }>
          <div className="img">
            <ServerImage path={contact.ImgBanner} />
          </div>
        </Link>
      <p>{contact.Name}</p>
    </button>
  );
}
