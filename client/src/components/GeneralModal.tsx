import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setShowModal } from "../features/modalSlice";
import detectOutOfFocus from "../utils/detectOutOfFocus";

export default function GeneralModal({ children }: { children: JSX.Element }) {
  const dispatch = useDispatch();
  const modalRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  function listener(e: UIEvent) {
    const isIn = detectOutOfFocus(e.target as HTMLElement, modalRef.current);
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
    <>
      <div ref={modalRef} className="modal">
        <div className="modal_layer">{children}</div>
      </div>
      <div className="modal_shadow"></div>
    </>
  );
}
