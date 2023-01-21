import Cookies from "universal-cookie";
import { message } from "../../vite-env";
import "../../styles/chatRoom.scss";
import agoCalculator from "../../utils/agoCalculator";

export default function TextMessageContainer({ message, mode }: { message: message, mode: 'inline' | 'full'  }) {
  const period = Date.now() - message.SentAt;
  const periodTime = agoCalculator(period)
  const cookies = new Cookies();

  const isTransmitter = message.Transmitter === cookies.get("_ver") ? "self" : "other";
  if(mode === 'full') return (
    <div className={`message_container message_${isTransmitter}`}>
      <div className={`content content_${isTransmitter}`}>
      <p>{message.Content}</p>

      </div>
      <p className="chat_period">{periodTime} ago</p>
    </div>

  )
  return (
    <div className={`${isTransmitter} message`}>
      <div className="message_content">
        <p>{message.Content}</p>
      </div>
      <p className="chat_period">{periodTime} ago</p>
    </div>
  )
}
