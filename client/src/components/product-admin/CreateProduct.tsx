import GeneralImageUploader from "../GeneralImageUploader";
import PriceInput from "../PriceInput";
import "../../styles/productAdmin.scss";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, setShowProductForm } from "../../features/buySellSlice";

export default function CreateProduct() {
  const [creds, setCreds] = useState({
    price: 1,
    title: "",
    description: "",
    img: undefined,
  });
  const dispatch = useDispatch();

  function handleElementaryChange(e: React.ChangeEvent) {
    const el = e.target as HTMLInputElement;
    const key = e.target.id;
    const val = el.type === "number" ? el.valueAsNumber : el.value;
    setCreds((pre) => ({
      ...pre,
      [key]: val,
    }));
  }
  function handleCompositeChange(e: React.ChangeEvent) {
    const el = e.target as HTMLInputElement;
    const file = (el.files as FileList)[0];
    // @ts-ignore
    setCreds((pre) => ({
      ...pre,
      img: file,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // @later
    //@ts-ignore
    dispatch(addProduct(creds));
  }

  const attributes: any = {
    required:true, 
    value: creds.price
  }

  return (
    <form onSubmit={e=> handleSubmit(e)} className="product_form">
      <section className="sect_1">
        <div className=" form_el name">
          <label htmlFor="title">
            <h4>&darr; Catchy Title goes below</h4>
          </label>
          <input required onChange={(e) => handleElementaryChange(e)} type="text" id="title" />
        </div>
        <div className=" form_el desc">
          <label htmlFor="description">
            <h4>&darr; Additional Info goes below</h4>
          </label>
          <textarea required onChange={(e) => handleElementaryChange(e)} id="description" />
        </div>
        <div className=" form_el price">
          <label htmlFor="price">
            <h4> &darr; Price</h4>
          </label>
          <PriceInput Attributes={attributes}  onChange={handleElementaryChange} />
        </div>
      </section>
      <div className="dtdv"></div>
      <section className="sect_2">
        <GeneralImageUploader required={true} onChange={handleCompositeChange} styles={{ width: "80%", aspectRatio: 1, alignSelf: "center" }} />
        <div className="sect_options">
          <button onClick={e => dispatch(setShowProductForm(false))} type="reset" className="canceller">
            Cancel
          </button>
          <button type="submit" className="submitter">
            Create
          </button>
        </div>
      </section>
    </form>
  );
}
