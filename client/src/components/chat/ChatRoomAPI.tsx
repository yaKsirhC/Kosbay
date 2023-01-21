import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setShowInlineBox } from "../../features/chatSlice";
import "../../styles/chatRoom.scss";
import Room from "./Room";

export default function ChatRoomAPI() {
  const { conversationContact, messages } = useSelector((state: RootState) => state.chat);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setShowInlineBox(false));
  }, []);

  return <>{conversationContact?._id && <Room />}</>;
}
