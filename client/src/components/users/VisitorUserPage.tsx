import { Button } from "@mui/material";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { SocketContext } from "../../App";
import { setconversationContact } from "../../features/chatSlice";
import "../../styles/users.scss";
import { user } from "../../vite-env";
import Products from "../buy-sell/Products";
import InlineChatBox from "../chat/InlineChatBox";
import ProfileSection from "./ProfileSection";

export default function VisitorUserPage() {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  useEffect(() => {
    dispatch(setconversationContact(userInfo as user));
    // @ts-ignore
    // dispatch(hydrateOwnProducts({products:5, uid: (userInfo as user)._id}))
    socket?.emit("join_chat", (userInfo as user)._id);
  }, [socket]);

  return (
    <div className="user_grid">
      <div className="body">
        <ProfileSection />
        <div className="details">
          <InlineChatBox styles={{ position: "static" }} />
          <Products />
        </div>
      </div>
      <div className="user_ads"></div>
    </div>
  );
}
