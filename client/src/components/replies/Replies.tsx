import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hydrateReplies, postReply } from "../../features/secondarySlice";
import { RootState } from "../../../store";
import Reply from "./Reply";
import '../../styles/replies.scss'

export default function Replies({ questionID }: { questionID: string }) {
  const dispatch = useDispatch();
  const { replies } = useSelector((state: RootState) => state.secondary);
  const [newReplyContent, setNewReplyContent] = useState('')
  useEffect(() => {
      // @ts-ignore
    dispatch(hydrateReplies(questionID));
  }, []);

  function handleSubmit(e: React.FormEvent){
    e.preventDefault()
    // @ts-ignore 
    dispatch(postReply({content:newReplyContent, qid: questionID}))

  }

  return (
    <div>
      <form onSubmit={e => handleSubmit(e)}>
        <input value={newReplyContent} onChange={e => setNewReplyContent(e.target.value)} type="text"   />
        <IconButton type="submit">
          <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1.52326 0.223596L18.0371 8.36086C18.3035 8.49214 18.413 8.81452 18.2818 9.08093C18.2294 9.18722 18.1434 9.27323 18.0371 9.32561L1.5236 17.4627C1.25719 17.594 0.934807 17.4844 0.803535 17.218C0.746133 17.1015 0.732827 16.9682 0.766074 16.8427L2.40219 10.6642C2.4563 10.4599 2.62509 10.3062 2.83358 10.2714L10.2341 9.0375C10.3248 9.02239 10.3997 8.96254 10.4357 8.88118L10.4551 8.81649C10.476 8.69094 10.4063 8.57122 10.2937 8.52421L10.2341 8.50707L2.7918 7.26668C2.58322 7.23192 2.41438 7.07815 2.36032 6.87372L0.765701 0.843513C0.689737 0.556398 0.860908 0.262065 1.14802 0.186101C1.27353 0.152896 1.4068 0.166214 1.52326 0.223596V0.223596Z"
              fill="#212121"
            />
          </svg>
        </IconButton>
      </form>
      <div className="replies">
        {replies
          .find((obj: any) => obj.qid === questionID)
          ?.replies.map((reply: any, i: any) => {
            return <Reply reply={reply} key={i} />;
          })}
      </div>
    </div>
  );
}
