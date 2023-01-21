import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import ServerImage from "../ServerImage";
import "../../styles/productPage.scss";
import { setconversationContact, setShowInlineBox } from "../../features/chatSlice";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../App";
import { user } from "../../vite-env";
import Cookies from "universal-cookie";
import agoCalculator from "../../utils/agoCalculator";
import { Link } from "react-router-dom";

export default function ProductPage() {
  const { viewedProduct } = useSelector((state: RootState) => state.buySell);
  const [isOwner, setIsOwner] = useState(false);
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  const period = Date.now() - viewedProduct.CreatedAt;
  const periodTime = agoCalculator(period);
  const cookies = new Cookies();

  function handleClick() {
    socket?.emit("join_chat", (viewedProduct.Owner as any as user)._id);
    dispatch(setconversationContact(viewedProduct.Owner));
    dispatch(setShowInlineBox(true));
  }

  useEffect(() => {
    if (viewedProduct.Owner) {
      setIsOwner(cookies.get("_ver") === viewedProduct.Owner._id);
    }
  }, [viewedProduct.Owner]);

  return (
    <div className="product_page_grid">
      <ServerImage className="main_img" path={viewedProduct.Imgs[0]} />
      <div className="right">
        <div className="top_part">
          {viewedProduct.Owner && (
            <Link to={"/users/" + viewedProduct.Owner._id} className="user_img">
              <ServerImage className="user_img" path={viewedProduct.Owner.ImgBanner} />
            </Link>
          )}
          <h1>{viewedProduct.Title}</h1>
          <p className="period">{periodTime} ago</p>
        </div>
        <div className="bottom_part">
          <h2>{viewedProduct.Description}</h2>
          <p className="price">{viewedProduct.Price}&euro;</p>
          {!isOwner && (
            <button onClick={() => handleClick()}>
              <h2>Chat Now!</h2>
              <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.32279 0.0766103L29.488 11.3328C29.9424 11.5144 30.1292 11.9603 29.9053 12.3288C29.816 12.4759 29.6693 12.5948 29.488 12.6673L1.32337 23.9232C0.868995 24.1048 0.319155 23.9533 0.0952621 23.5848C-0.00263988 23.4236 -0.0253345 23.2392 0.0313703 23.0655L2.82185 14.519C2.91414 14.2363 3.20202 14.0237 3.55762 13.9756L16.1796 12.2688C16.3342 12.2479 16.4621 12.1651 16.5235 12.0525L16.5565 11.963C16.5922 11.7894 16.4733 11.6238 16.2813 11.5587L16.1796 11.535L3.48635 9.81921C3.13062 9.77112 2.84264 9.55841 2.75045 9.27563L0.0307344 0.934132C-0.0988257 0.536971 0.193115 0.129824 0.682804 0.0247447C0.896857 -0.0211878 1.12417 -0.0027657 1.32279 0.0766103Z"
                  fill="white"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
