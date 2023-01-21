import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { follow } from "../../features/userSlice";
import { user } from "../../vite-env";
import ServerImage from "../ServerImage";
import ShowFollow from "./ShowFollow";

export default function ProfileSection() {
  const {userInfo} = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  return (
    <div className="profile">
      <div className="user_img">
        <ServerImage path={(userInfo as user).ImgBanner} />
      </div>
      <div className="info">
        <h3>{(userInfo as user).Name}</h3>
        <p>{(userInfo as user).Email}</p>
      </div>
      <div className="follow_stats">
        <p className="followers">{(userInfo as user).Followers.length} followers</p>
        <p className="follewed">{(userInfo as user).Followed.length} Followed</p>
      </div>
       <ShowFollow />
    </div>
  );
}
