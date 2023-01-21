import { Button } from "@mui/material";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { RootState } from "../../../store";
import { SocketContext } from "../../App";
import { setconversationContact, setShowInlineBox } from "../../features/chatSlice";
import { user } from "../../vite-env";

export default function UserOptions() {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const socket = useContext(SocketContext)

  function handleClick() {
    dispatch(setShowInlineBox(true));
    dispatch(setconversationContact((userInfo as user)));
    socket?.emit('join_chat', (userInfo as user)._id)
  }
  const cookies = new Cookies()

  return (
    <div>
      {(userInfo as user).Email}
      {
        cookies.get('_ver') && cookies.get('_ver') !== (userInfo as user)._id && (
          <Button onClick={() => handleClick()}>Message</Button>
        )
      }
    </div>
  );
}
