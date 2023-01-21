import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { RootState } from "../../../store";
import { follow, unfollow } from "../../features/userSlice";
import { user } from "../../vite-env";

export default function ShowFollow() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.user);
  const cookies = new Cookies();
  const isFollower = (userInfo as user).Followers.includes(cookies.get("_ver"));

  return (
    <>
      {isFollower ? (
        //   @ts-ignore
        <button className="unfollow action_btn" onClick={() => dispatch(unfollow((userInfo as user)._id))} variant="contained">
          <h3>Unfollow</h3>
        </button>
      ) : (
        // @ts-ignore
        <button className="follow action_btn" onClick={() => dispatch(follow((userInfo as user)._id))} variant="contained">
          <h3>Follow</h3>
        </button>
      )}
    </>
  );
}
