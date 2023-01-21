import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { RootState } from "../../../store";
import { setAuthBox } from "../../features/auth";

export default function NavigationDisplay({ end }: { end: number }) {
  const { auth } = useSelector((state: RootState) => state.auth);
  const cookies = new Cookies();
  const dispatch = useDispatch();

  const authEl = auth ? (
    <Link to={`/users/${cookies.get("_ver")}`} className="nav_item">
      <span>Account</span>
    </Link>
  ) : (
    <button onClick={() => dispatch(setAuthBox("log-in"))} className="auth nav_item">
      <span>Log in</span>
    </button>
  );
  const elements = [
    authEl,
    <Link to={"/"} className="nav_item">
      <span>Buy & Sell</span>
    </Link>,
    <Link to={"/rentals"} className="nav_item">
      <span>Rentals</span>
    </Link>,
    <Link to={"/jobs"} className="nav_item">
      <span>Jobs</span>
    </Link>,
    <Link to={"/chat-room"} className="nav_item">
      <span>Chats</span>
    </Link>,
    <Link to={"/events"} className="nav_item">
      <span>Events</span>
    </Link>,
    <Link to={"/announcements"} className="nav_item">
      <span>Announcement</span>
    </Link>,
    <Link to={"/questions"} className="nav_item">
      <span>Questions</span>
    </Link>,
  ];

  const selectedElements = elements.slice(0,end);
  

  return (
    <div className="nav_display" style={{display: 'grid', gridTemplateColumns: `repeat(${end}, 1fr)`}}>
      {selectedElements.map((el, i) => {
        return <>{el}</>;
      })}
    </div>
  );
}
