import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { changeImgBanner } from "../../features/userSlice";
import detectOutOfFocus from "../../utils/detectOutOfFocus";
import "../../styles/users.scss";
import { setShowModal } from "../../features/modalSlice";
import GeneralImageUploader from "../GeneralImageUploader";

export default function ChangeImageBannerForm() {
  const [img, setImg] = useState<any>({ img: undefined });
  const dispatch = useDispatch();
  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // @ts-ignore
    dispatch(changeImgBanner(img));
    dispatch(setShowModal(false));
  }
  function handleChange(e: React.ChangeEvent) {
    const el = e.target as HTMLInputElement;
    setImg({ img: (el.files as FileList)[0] });
  }

  function listener(e: MouseEvent) {
    const isIn = detectOutOfFocus(e.target as HTMLElement, formRef.current);
    if (!isIn) {
      dispatch(setShowModal(false));
    }
  }

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("click", listener);
    }, 0);

    return () => {
      window.removeEventListener("click", listener);
    };
  }, []);

  return (
    <div>
      <form className="form_container" onSubmit={(e) => handleSubmit(e)} ref={formRef}>
        <h3>Change Image Banner</h3>
        <GeneralImageUploader styles={{ width: "200px", height: "200px", borderRadius: "50%" }} onChange={handleChange} />
        <div className="options">
          <button className="canceller" type="reset" onClick={() => dispatch(setShowModal(false))}>
            Cancel
          </button>
          <button className="changer" type="submit">
            Change
          </button>
        </div>
      </form>
    </div>
  );
}
