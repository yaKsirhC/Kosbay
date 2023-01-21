import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ProductPage from "../components/buy-sell/ProductPage";
import { hydrateSingleProduct } from "../features/buySellSlice";

export default function ProductPageLayout() {
  const dispatch = useDispatch();
  const { pid } = useParams();
  console.log('init  ', pid );

  useEffect(() => {
    console.log('init  ', pid );
    // @ts-ignore
    dispatch(hydrateSingleProduct(pid));
  },[]);

  return (
    <>
      <ProductPage />
    </>
  );
}
