import React, { HtmlHTMLAttributes, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { hydrateProducts, updateFilters } from "../features/buySellSlice";
import "../styles/buySell.scss";
import PriceInput from "./PriceInput";

export default function Filter() {
  const dispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.buySell);

  function handleChangeDate(e: React.ChangeEvent) {
    const el = e.target as HTMLInputElement | HTMLSelectElement;
    const vl = parseInt(el.value);
    const key = el.dataset.key as string;
    const newFilters = { ...filters.date, [key]: vl };
    dispatch(
      updateFilters({
        ...filters,
        ...{ date: newFilters },
      })
      );
    }
    function handleChangePrice(e: React.ChangeEvent) {
      const el = e.target as HTMLInputElement | HTMLSelectElement;
    const vl = parseInt(el.value);
    const key = el.dataset.key as string;
    
    const newFilters = { ...filters.price, [key]: vl };
    console.log(newFilters);
    dispatch(
      updateFilters({
        ...filters,
        ...{ price: newFilters },
      })
      );
    }
    
    function handleSubmit(e: React.FormEvent){
      e.preventDefault()
      // @ts-ignore
      dispatch(hydrateProducts(filters));

  }

  const attributes: any = {
    value: filters.price.price_b , 
    required:true, 
    "data-key":"price_b",
    id:"from"
  } 

  return (
    <div className="filter">
      <form onSubmit={e => handleSubmit(e)}>
        <div className="price_filter">
          <div className="from">
            <label htmlFor="from">From:</label>
            <PriceInput Attributes={attributes} onChange={handleChangePrice} />
          </div>
          <div className="to">
            <label htmlFor="to">To:</label>
            <input value={filters.price.price_t} max={4_294_967_295} onChange={(e) => handleChangePrice(e)} data-key="price_t" id="to" type="number" />
          </div>
        </div>

        <div className="date_filter">
          <label htmlFor="dateFilter">Order:</label>
          <select onChange={(e) => handleChangeDate(e)} name="dateFilter" data-key="order" id="order">
            <option value="-1">Newest &rArr; Oldest</option>
            <option value="1">Oldest &rArr; Newest</option>
          </select>
        </div>
        <button>FIlter</button>
      </form>
    </div>
  );
}

// value={filters.price.price_b}, required={true}, data-key="price_b"
