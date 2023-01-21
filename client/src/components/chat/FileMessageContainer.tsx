import React from "react";
import { message } from "../../vite-env";
import fetchFile from "../../utils/installFile";
import axios from "axios";
import Cookies from "universal-cookie";
import agoCalculator from "../../utils/agoCalculator";
import "../../styles/chatRoom.scss";
import "../../styles/inlineChatBox.scss";

export default function FileMessageContainer({ message, mode }: { message: message, mode: "inline" | "full" }) {
  const period = Date.now() - message.SentAt;
  const periodTime = agoCalculator(period);
  const cookies = new Cookies();

  const isTransmitter = message.Transmitter === cookies.get("_ver") ? "self" : "other";

  function handleClick() {
    window.location.href = import.meta.env.VITE_SERVER_URL + "files/get/install" + "?fid=" + message.Content;
  } 
  console.log(mode);
  const className = (mode === "full") ? `message_${isTransmitter} message_container` : `message ${isTransmitter}`

  return (
    <div title={message.Content} className={className}>
      <button onClick={() => handleClick()} className="downloader">
        <div>
          {message.Type === "zip" ? (
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.5 25.9188C7.11941 25.699 6.80346 25.3828 6.58401 25.0021C6.36456 24.6213 6.24935 24.1895 6.25 23.75V6.25C6.25 5.58696 6.51339 4.95107 6.98223 4.48223C7.45107 4.01339 8.08695 3.75 8.75 3.75H17.5L23.75 10V23.75C23.75 24.413 23.4866 25.0489 23.0178 25.5178C22.5489 25.9866 21.913 26.25 21.25 26.25H20"
                stroke="black"
                strokeWidth="2.82"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.75 21.25C14.413 21.25 15.0489 21.5134 15.5178 21.9822C15.9866 22.4511 16.25 23.087 16.25 23.75V26.25C16.25 26.5815 16.1183 26.8995 15.8839 27.1339C15.6495 27.3683 15.3315 27.5 15 27.5H12.5C12.1685 27.5 11.8505 27.3683 11.6161 27.1339C11.3817 26.8995 11.25 26.5815 11.25 26.25V23.75C11.25 23.087 11.5134 22.4511 11.9822 21.9822C12.4511 21.5134 13.087 21.25 13.75 21.25Z"
                stroke="black"
                strokeWidth="2.82"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M13.75 6.25H12.5" stroke="black" strokeWidth="2.82" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16.25 8.75H15" stroke="black" strokeWidth="2.82" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13.75 11.25H12.5" stroke="black" strokeWidth="2.82" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16.25 13.75H15" stroke="black" strokeWidth="2.82" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13.75 16.25H12.5" stroke="black" strokeWidth="2.82" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16.25 18.75H15" stroke="black" strokeWidth="2.82" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.75 20H11.25C10.9185 20 10.6005 20.1317 10.3661 20.3661C10.1317 20.6005 10 20.9185 10 21.25C10 21.5815 10.1317 21.8995 10.3661 22.1339C10.6005 22.3683 10.9185 22.5 11.25 22.5H18.75C19.0815 22.5 19.3995 22.3683 19.6339 22.1339C19.8683 21.8995 20 21.5815 20 21.25C20 20.9185 19.8683 20.6005 19.6339 20.3661C19.3995 20.1317 19.0815 20 18.75 20Z"
                fill="#231F20"
              />
              <path
                d="M11.25 17.5H15C15.3315 17.5 15.6495 17.3683 15.8839 17.1339C16.1183 16.8995 16.25 16.5815 16.25 16.25C16.25 15.9185 16.1183 15.6005 15.8839 15.3661C15.6495 15.1317 15.3315 15 15 15H11.25C10.9185 15 10.6005 15.1317 10.3661 15.3661C10.1317 15.6005 10 15.9185 10 16.25C10 16.5815 10.1317 16.8995 10.3661 17.1339C10.6005 17.3683 10.9185 17.5 11.25 17.5Z"
                fill="#231F20"
              />
              <path
                d="M24.675 10.4125L17.875 2.91248C17.7581 2.78299 17.6155 2.67939 17.4562 2.60835C17.2968 2.53731 17.1244 2.50039 16.95 2.49998H8.2C7.78469 2.49503 7.37247 2.57193 6.98688 2.7263C6.60129 2.88067 6.24988 3.10948 5.95273 3.39967C5.65557 3.68986 5.41849 4.03574 5.25502 4.41756C5.09155 4.79939 5.0049 5.20967 5 5.62498V24.375C5.0049 24.7903 5.09155 25.2006 5.25502 25.5824C5.41849 25.9642 5.65557 26.3101 5.95273 26.6003C6.24988 26.8905 6.60129 27.1193 6.98688 27.2737C7.37247 27.428 7.78469 27.5049 8.2 27.5H21.8C22.2153 27.5049 22.6275 27.428 23.0131 27.2737C23.3987 27.1193 23.7501 26.8905 24.0473 26.6003C24.3444 26.3101 24.5815 25.9642 24.745 25.5824C24.9084 25.2006 24.9951 24.7903 25 24.375V11.25C24.9992 10.9402 24.8834 10.6417 24.675 10.4125ZM17.5 6.24998L20.925 9.99998H18.425C18.2941 9.99208 18.1661 9.95818 18.0484 9.90027C17.9308 9.84236 17.8258 9.76159 17.7397 9.66269C17.6536 9.56378 17.5881 9.44871 17.5469 9.3242C17.5057 9.19969 17.4898 9.06822 17.5 8.93748V6.24998ZM21.8 25H8.2C8.11297 25.005 8.02579 24.9929 7.94347 24.9642C7.86115 24.9355 7.7853 24.8908 7.72027 24.8328C7.65523 24.7747 7.6023 24.7044 7.56451 24.6258C7.52671 24.5473 7.50479 24.462 7.5 24.375V5.62498C7.50479 5.53793 7.52671 5.45269 7.56451 5.37413C7.6023 5.29557 7.65523 5.22524 7.72027 5.16718C7.7853 5.10912 7.86115 5.06446 7.94347 5.03577C8.02579 5.00708 8.11297 4.99491 8.2 4.99998H15V8.93748C14.9798 9.85826 15.3247 10.7496 15.9593 11.4171C16.594 12.0845 17.4669 12.4738 18.3875 12.5H22.5V24.375C22.4952 24.462 22.4733 24.5473 22.4355 24.6258C22.3977 24.7044 22.3448 24.7747 22.2797 24.8328C22.2147 24.8908 22.1389 24.9355 22.0565 24.9642C21.9742 24.9929 21.887 25.005 21.8 25Z"
                fill="#231F20"
              />
            </svg>
          )}
        </div>
        <p className="chat_period">{periodTime} ago</p>
      </button>
    </div>
  );
}
