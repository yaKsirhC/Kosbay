import { reply } from "../../vite-env";
import toDate from "../../utils/toDate";

export default function Reply({ reply }: { reply: reply }) {
  const { day, hour, minutes, month, year } = toDate(reply.RepliedAt as number);

  return (
    <div className="reply">
      <div className="reply_top">
        <p className="from_comment" >{reply.From}</p>
        <p className="reply_date">{`${hour}:${minutes} ${day}/${month}/${year} `}</p>
      </div>
      <p>{reply.Content}</p>
    </div>
  );
}
