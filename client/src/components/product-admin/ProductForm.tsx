import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../features/buySellSlice";
import { setShowModal } from "../../features/modalSlice";
import "../../styles/productAdmin.scss";

export default function ProductForm() {
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    img: undefined,
    title: "",
    description: "",
    price: "",
    categories: "[1,2,2,2,2,2,8,3,3,4,44,443]",
  });
  const previewImg = useRef() as React.MutableRefObject<HTMLImageElement>;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // @ts-ignore
    dispatch(addProduct(payload));
    dispatch(setShowModal(false))
  }

  function updateFieldPayload(e: React.ChangeEvent) {
    const el = e.target as HTMLInputElement;
    setPayload((pre) => ({
      ...pre,
      [el.id]: el.value,
    }));
  }
  function updateFilePayload(e: React.ChangeEvent) {
    const el = e.target as HTMLInputElement;
    const imgSrc = URL.createObjectURL((el.files as FileList)[0]);
    previewImg.current.src = imgSrc;

    setPayload((pre) => ({
      ...pre,
      [el.id]: (el.files as FileList)[0],
    }));
  }

  return (
    <form className="add_form" onSubmit={(e) => handleSubmit(e)}>
      <input id="title" onChange={(e) => updateFieldPayload(e)} type="text" />
      <input id="description" onChange={(e) => updateFieldPayload(e)} type="text" />
      <input id="price" onChange={(e) => updateFieldPayload(e)} type="number" />
      <div className="img_preview">
        <label htmlFor="img">
          <img ref={previewImg} />
        </label>
        <input id="img" onChange={(e) => updateFilePayload(e)} type="file" />
      </div>
      <button type="submit">Add product</button>
    </form>
  );
}
