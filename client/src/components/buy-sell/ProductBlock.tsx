import React from "react";
import { Link } from "react-router-dom";
import { product, user } from "../../vite-env";
import '../../styles/buySell.scss'
import ServerImage from "../ServerImage";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import agoCalculator from "../../utils/agoCalculator";

export default function ProductBlock({ product }: { product: product }) {

  const period = Date.now() - product.CreatedAt
  const periodTime = agoCalculator(period)


  return (
    <div className="product_block">
      <div className="head">
        <div className="top">
        <Link to={'/users/' + product.Owner._id }>
          <div className="img">
            <ServerImage path={product.Owner.ImgBanner} />
          </div>
        </Link>
        <h1 className="title">{product.Title}</h1>
        <p className="time">
          { periodTime + ' ago' } 
        </p>
        </div>
      <div className="bottom">
        <p className="description">{product.Description}</p>
      </div>
      </div>

      <Link to={'/products/' + product._id} className="product_img">
        <ServerImage path={product.Imgs[0]} />
      </Link>

      <div className="footer">
        <p className="price">{product.Price}&euro;</p>
      </div>
    </div>
  );
}
