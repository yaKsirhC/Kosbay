import { product } from "../../vite-env";
import "../../styles/productAdmin.scss";
import ServerImage from "../ServerImage";
import agoCalculator from "../../utils/agoCalculator";
import { useDispatch } from "react-redux";
import { createContext, useState } from "react";
import ContextMenu from "./ContextMenu";

export const ShowContext = createContext<any>(90);

export default function OwnedProduct({ product }: { product: product }) {
  const period = Date.now() - product.CreatedAt;
  const periodTime = agoCalculator(period);
  const dispatch = useDispatch();
  const [showContextMenu, setShowContextMenu] = useState(false);

  return (
    <div className="product_ad">
      <div className="img">
        <ServerImage path={product.Imgs[0]} />
      </div>
      <div className="right">
        <div className="top">
          <h2>{product.Title}</h2>
          <p>{periodTime} ago</p>
          <div>
            <button onClick={() => setShowContextMenu(true)}>
              <svg width="8" height="30" viewBox="0 0 8 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.5882 11.4118C3.11699 11.4118 2.65039 11.5046 2.21505 11.6849C1.77971 11.8653 1.38415 12.1296 1.05096 12.4628C0.717764 12.796 0.453459 13.1915 0.273135 13.6269C0.0928116 14.0622 3.71049e-07 14.5288 3.71049e-07 15C3.71049e-07 15.4712 0.0928116 15.9378 0.273135 16.3731C0.453459 16.8085 0.717764 17.204 1.05096 17.5372C1.38415 17.8704 1.77971 18.1347 2.21505 18.3151C2.65039 18.4954 3.11699 18.5882 3.5882 18.5882C4.53985 18.588 5.45243 18.2097 6.1252 17.5367C6.79796 16.8636 7.17579 15.9508 7.17558 14.9992C7.17536 14.0475 6.79711 13.1349 6.12404 12.4622C5.45097 11.7894 4.53822 11.4116 3.58657 11.4118H3.5882ZM3.5882 7.17313C4.05919 7.17292 4.52553 7.07994 4.96059 6.8995C5.39565 6.71906 5.79091 6.45469 6.1238 6.1215C6.4567 5.7883 6.7207 5.3928 6.90075 4.95758C7.08079 4.52236 7.17335 4.05593 7.17313 3.58494C7.17292 3.11394 7.07994 2.6476 6.8995 2.21254C6.71906 1.77748 6.45469 1.38222 6.1215 1.04933C5.7883 0.716437 5.3928 0.452432 4.95758 0.272388C4.52236 0.0923435 4.05593 -0.000213718 3.58494 3.70547e-07C2.63372 0.000432756 1.72163 0.378717 1.04933 1.05163C0.377022 1.72455 -0.000432 2.63698 3.71049e-07 3.5882C0.000432742 4.53941 0.378716 5.4515 1.05163 6.12381C1.72455 6.79611 2.63698 7.17357 3.5882 7.17313V7.17313ZM3.5882 22.8236C2.63655 22.8236 1.72388 23.2016 1.05096 23.8746C0.378042 24.5475 3.71049e-07 25.4602 3.71049e-07 26.4118C3.71049e-07 27.3635 0.378042 28.2761 1.05096 28.949C1.72388 29.622 2.63655 30 3.5882 30C4.53985 30 5.45252 29.622 6.12543 28.949C6.79835 28.2761 7.17639 27.3635 7.17639 26.4118C7.17639 25.4602 6.79835 24.5475 6.12543 23.8746C5.45252 23.2016 4.53985 22.8236 3.5882 22.8236V22.8236Z"
                  fill="black"
                />
              </svg>
            </button>
            <ShowContext.Provider value={setShowContextMenu}>{showContextMenu && <ContextMenu product={product} />}</ShowContext.Provider>
          </div>
        </div>
        <div className="bottom">
          <p>{product.Description}</p>
          <p className="price">{product.Price}&euro;</p>
        </div>
      </div>
    </div>
  );
}
