import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import "../../styles/events.scss";
import { event } from "../../vite-env";
import DateBlock from "./DateBlock";
import SpecialDateBlock from "./SpecialDateBlock";

export default function Calendar() {
  const [dates, setDates] = useState<Date[]>([]);
  const { events } = useSelector((state: RootState) => state.secondary);
  const firstDay = new Date();
  firstDay.setDate(firstDay.getDate() - firstDay.getDay() + 1);

  useEffect(() => {
    setDates([]);

    for (let index = 0; index <= 34; index++) {
      const dateBlock = new Date();
      dateBlock.setDate(firstDay.getDate() + index);
      setDates((pre) => [...pre, dateBlock]);
    }
  }, []);

  return (
    <div className="calendar">
      <h2>{firstDay.toLocaleString("en-us", { month: "long" })}</h2>

      <div className="calendar_wrapper">
        <div className="calendar_head">
          <p>Monday</p>
          <p>Tuesday</p>
          <p>Wednesday</p>
          <p>Thursday</p>
          <p>Friday</p>
          <p>Saturday</p>
          <p>Sunday</p>
        </div>
        <div className="calendar_body">
          {dates.map((date, i) => {
            const posted = events.findIndex((event: event) => {
              const datePosted = new Date(event.DatePosted);
              return datePosted.getDate() === date.getDate() && datePosted.getMonth() === date.getMonth();
            });
            const anticipated = events.findIndex((event: event) => {
              const completionDate = new Date(event.CompletionDate);
              return completionDate.getDate() === date.getDate() && completionDate.getMonth() === date.getMonth();
            });
            if(anticipated > -1){
              return <SpecialDateBlock date={date} event={events[anticipated]} key={i} />;
            }
            if(posted > -1){
              return <SpecialDateBlock date={date} event={events[posted]} key={i} />;
            }
            return <DateBlock date={date} key={i} />
          })}
        </div>
      </div>
    </div>
  );
}


// className={`calendar_block ${posted ? "posted" : ""} ${anticipated ? "anticipated" : ""} `} 