import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import agoCalculator from "../../utils/agoCalculator";
import { message, user } from "../../vite-env";

export default function InlineChatBoxMessage({ message }: { message: message }) {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const whose = message.Transmitter === (userInfo as user)._id ? "other" : "self";
  const period = Date.now() - message.SentAt;
  const periodTime = agoCalculator(period);
  return (
    <div className={`${whose} message`}>
      <div className="message_content">
        <p>{message.Content}</p>
      </div>
      <p className="chat_period">{periodTime} ago</p>
    </div>
  );
}
