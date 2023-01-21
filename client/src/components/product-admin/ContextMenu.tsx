import React, { useContext, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { ModalContext } from "../../App";
import { setShowModal } from "../../features/modalSlice";
import detectOutOfFocus from "../../utils/detectOutOfFocus";
import { product } from "../../vite-env";
import DeleteWarning from "./DeleteWarning";
import { ShowContext } from "./OwnedProduct";
import "../../styles/productAdmin.scss";


export default function ContextMenu({ product }: { product: product }) {
  const ref = useRef() as React.MutableRefObject<HTMLUListElement>;
  const setShow = useContext(ShowContext);
  const setElemenents = useContext(ModalContext) as Function;
  const dispatch = useDispatch();

  function handleDelete() {
    setElemenents(<DeleteWarning product={product} />);
    dispatch(setShowModal(true));
  }

  function listener(e: UIEvent) {
    const isIn = detectOutOfFocus(e.target as HTMLElement, ref.current);
    if (!isIn) {
      setShow(false);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("click", listener);
    },0)

    return () => {
      window.removeEventListener("click", listener);
    };
  }, []);

  return (
    <ul className="context_menu" ref={ref}>
      <li className="delete">
        <button onClick={() => handleDelete()}>Delete</button>
      </li>
    </ul>
  );
}
