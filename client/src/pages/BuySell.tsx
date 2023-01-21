import { Button, IconButton, TextField } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Filter from "../components/Filter";
import Products from "../components/buy-sell/Products";
import { hydrateProducts } from "../features/buySellSlice";
import '../styles/buySell.scss'
import { RootState } from "../../store";

export default function BuySell() {
  const dispatch = useDispatch()
  const {filters} = useSelector((state: RootState) => state.buySell)
  useEffect(() => {
    // @ts-ignore
    dispatch(hydrateProducts(filters))
  },[])

  return (
    <div className="buy_sell_grid">
      <div className="titles">
      <h1>Buy & Sell</h1>
      <Link to='/my'>
        <h3>
          My products
        </h3>
      </Link>
      </div>
      <form>
        <input  style={{flexGrow: 1}} placeholder="Search Item" />
        <IconButton type="submit">
          <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M27.8362 24.4022L22.3406 18.9066C22.0926 18.6585 21.7563 18.5207 21.4036 18.5207H20.5051C22.0264 16.5749 22.9304 14.1276 22.9304 11.4652C22.9304 5.13178 17.7986 0 11.4652 0C5.13179 0 0 5.13178 0 11.4652C0 17.7986 5.13179 22.9304 11.4652 22.9304C14.1276 22.9304 16.5749 22.0264 18.5207 20.5051V21.4036C18.5207 21.7563 18.6585 22.0926 18.9066 22.3406L24.4022 27.8362C24.9203 28.3544 25.7581 28.3544 26.2708 27.8362L27.8307 26.2763C28.3488 25.7581 28.3488 24.9203 27.8362 24.4022ZM11.4652 18.5207C7.56814 18.5207 4.4097 15.3678 4.4097 11.4652C4.4097 7.56814 7.56263 4.4097 11.4652 4.4097C15.3623 4.4097 18.5207 7.56263 18.5207 11.4652C18.5207 15.3623 15.3678 18.5207 11.4652 18.5207Z"
              fill="black"
            />
          </svg>
        </IconButton>
      </form>
      <Filter />
      <Products />
      <div className="products_ads">
      </div>
    </div>
  );
}
