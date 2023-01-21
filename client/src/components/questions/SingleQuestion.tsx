import { Button } from "@mui/material";
import React, { useState } from "react";
import { question } from "../../vite-env";
import Replies from "../replies/Replies";

export default function SingleQuestion({ question }: { question: question }) {
  const [showReplies, setShowReplies] = useState(false);

  const date = new Date(question.QuestionedAt as number);
  return (
    <div>
      <h2>{question.Title}</h2>
      <div className="details">
        <span>{question.From}</span>
        <p>
          {date.getHours()}:{date.getMinutes()} {date.getDay()} / {date.getMonth()} / {date.getFullYear()}
        </p>
        <span>{question.Description}</span>
      </div>
      {showReplies && <Replies questionID={question._id} />}
      <button onClick={(e) => setShowReplies((pre) => !pre)}>
        {showReplies ? (
          <svg width="23" height="15" viewBox="0 0 23 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.59 11.7949L11.795 2.99992L3.00003 11.7949" stroke="black" strokeWidth="4.64" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="23" height="15" viewBox="0 0 23 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3L11.795 11.795L20.59 3" stroke="black" strokeWidth="4.64" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    </div>
  );
}
