import { useEffect, useState } from "react";
import "../../styles/events.scss";
import { event } from "../../vite-env";

export default function SpecialDateBlock({ event, date }: { event: event; date: Date }) {
  const [className, setClassName] = useState("calendar_block ");

  if (event.DatePosted === date.getTime()) className.concat("posted ");
  useEffect(() => {
    const completionDate = new Date(event.CompletionDate);
    const datePosted = new Date(event.DatePosted);
    

    if (completionDate.getDate() === date.getDate() && completionDate.getMonth() === date.getMonth()) setClassName((pre) => pre.concat("anticipated "));
    if (datePosted.getDate() === date.getDate() && datePosted.getMonth() === date.getMonth()) setClassName((pre) => pre.concat("posted "));
  }, []);

  return (
    <div style={{ position: "relative" }} className={className}>
      <div className="tooltip">
        <div className="tooltip_content">
          <h4>{event.Title}</h4>
          <p>{event.Description}</p>
        </div>
      </div>
      {date.getDate()}
    </div>
  );
}
