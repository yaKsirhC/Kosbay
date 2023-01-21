import { Button } from "@mui/material";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { user } from "../../vite-env";
import "../../styles/users.scss";
import ProfileSection from "./ProfileSection";
import Products from "../buy-sell/Products";
import ServerImage from "../ServerImage";
import { setShowModal } from "../../features/modalSlice";
import { ModalContext } from "../../App";
import ChangeImageBannerForm from "./ChangeImageBannerForm";
import { Link } from "react-router-dom";

export default function AdminUserPage() {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const setElements = useContext(ModalContext) as Function;

  function handleClick() {
    setElements(<ChangeImageBannerForm />);
    dispatch(setShowModal(true));
  }

  return (
    <div className="user_grid">
      <div className="body">
        <div className="profile">
          <div className="user_img">
            <button onClick={() => handleClick()}>
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15.0001 19.0001C17.2093 19.0001 19.0001 17.2093 19.0001 15.0001C19.0001 12.791 17.2093 11.0001 15.0001 11.0001C12.791 11.0001 11.0001 12.791 11.0001 15.0001C11.0001 17.2093 12.791 19.0001 15.0001 19.0001Z"
                  fill="black"
                />
                <path
                  d="M11.25 2.5L8.9625 5H5C3.625 5 2.5 6.125 2.5 7.5V22.5C2.5 23.875 3.625 25 5 25H25C26.375 25 27.5 23.875 27.5 22.5V7.5C27.5 6.125 26.375 5 25 5H21.0375L18.75 2.5H11.25ZM15 21.25C11.55 21.25 8.75 18.45 8.75 15C8.75 11.55 11.55 8.75 15 8.75C18.45 8.75 21.25 11.55 21.25 15C21.25 18.45 18.45 21.25 15 21.25Z"
                  fill="black"
                />
              </svg>
            </button>
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
        </div>
        <div className="details">
        <Link to="/my">
          <h3>My products</h3>
        </Link>
          <Products />
        </div>
      </div>
      <div className="user_ads"></div>
    </div>
  );
}
