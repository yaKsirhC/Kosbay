import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { RootState } from "../../../store";
import { setAuthBox } from "../../features/auth";
import detectOutOfFocus from "../../utils/detectOutOfFocus";
import HamburgerElements from "./HamburgerElements";

export default function Hamburger({ start }: { start: number }) {
  const { auth } = useSelector((state: RootState) => state.auth);
  const [showElements, setShowElements] = useState(false);
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const hamRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  function listener(e: UIEvent) {
    const isIn = detectOutOfFocus(e.target as HTMLElement, hamRef.current);
    if (!isIn) {
      setShowElements(false);
    }
  }

  useEffect(() => {
    window.addEventListener("click", listener);

    return () => {
      window.removeEventListener("click", listener);
    };
  }, []);

  const authEl = auth ? (
    <Link onClick={() => setShowElements(false)} to={`/users/${cookies.get("_ver")}`} className="nav_item">
      <span>Account</span>
    </Link>
  ) : (
    <button onClick={() => dispatch(setAuthBox("log-in"))} className="auth nav_item">
      <span>Log in</span>
    </button>
  );
  const elements = [
    authEl,
    <Link onClick={() => setShowElements(false)} to={"/"} className="nav_item">
      <span>Buy & Sell</span>
    </Link>,
    <Link onClick={() => setShowElements(false)} to={"/rentals"} className="nav_item">
      <span>Rentals</span>
    </Link>,
    <Link onClick={() => setShowElements(false)} to={"/jobs"} className="nav_item">
      <span>Jobs</span>
    </Link>,
    <Link onClick={() => setShowElements(false)} to={"/chat-room"} className="nav_item">
      <span>Chats</span>
    </Link>,
    <Link onClick={() => setShowElements(false)} to={"/events"} className="nav_item">
      <span>Events</span>
    </Link>,
    <Link onClick={() => setShowElements(false)} to={"/announcements"} className="nav_item">
      <span>Announcement</span>
    </Link>,
    <Link onClick={() => setShowElements(false)} to={"/questions"} className="nav_item">
      <span>Questions</span>
    </Link>,
  ];

  const selectedElements = elements.slice(start - 1);

  return (
    <div ref={hamRef} className="ham_container">
      <button className="hamburger" onClick={() => setShowElements((pre) => !pre)}>
        <svg width="30" height="22" viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2.14286 0H27.8571C28.4255 0 28.9705 0.225765 29.3724 0.627628C29.7742 1.02949 30 1.57454 30 2.14286C30 2.71118 29.7742 3.25622 29.3724 3.65809C28.9705 4.05995 28.4255 4.28571 27.8571 4.28571H2.14286C1.57454 4.28571 1.02949 4.05995 0.627628 3.65809C0.225765 3.25622 0 2.71118 0 2.14286C0 1.57454 0.225765 1.02949 0.627628 0.627628C1.02949 0.225765 1.57454 0 2.14286 0ZM2.14286 8.57143H27.8571C28.4255 8.57143 28.9705 8.79719 29.3724 9.19906C29.7742 9.60092 30 10.146 30 10.7143C30 11.2826 29.7742 11.8277 29.3724 12.2295C28.9705 12.6314 28.4255 12.8571 27.8571 12.8571H2.14286C1.57454 12.8571 1.02949 12.6314 0.627628 12.2295C0.225765 11.8277 0 11.2826 0 10.7143C0 10.146 0.225765 9.60092 0.627628 9.19906C1.02949 8.79719 1.57454 8.57143 2.14286 8.57143ZM2.14286 17.1429H27.8571C28.4255 17.1429 28.9705 17.3686 29.3724 17.7705C29.7742 18.1723 30 18.7174 30 19.2857C30 19.854 29.7742 20.3991 29.3724 20.8009C28.9705 21.2028 28.4255 21.4286 27.8571 21.4286H2.14286C1.57454 21.4286 1.02949 21.2028 0.627628 20.8009C0.225765 20.3991 0 19.854 0 19.2857C0 18.7174 0.225765 18.1723 0.627628 17.7705C1.02949 17.3686 1.57454 17.1429 2.14286 17.1429Z"
            fill="white"
          />
        </svg>
      </button>
      {showElements && <HamburgerElements elements={selectedElements} />}
    </div>
  );
}
