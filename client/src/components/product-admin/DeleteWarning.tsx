import { useDispatch } from "react-redux";
import { deleteProduct } from "../../features/buySellSlice";
import { setShowModal } from "../../features/modalSlice";
import { product } from "../../vite-env";
import "../../styles/productAdmin.scss";

export default function DeleteWarning({ product }: { product: product }) {
  const dispatch = useDispatch();

  function handleDelete() {
    // @ts-ignore
    dispatch(deleteProduct(product._id));
    dispatch(setShowModal(false));
  }

  return (
    <div className="warning_modal">
      <h1>{product.Title}</h1>
      <h3>Once removed it can NOT be recovered.</h3>
      <div className="options">
        <button onClick={() => handleDelete()} className="remover">
          <h4>Delete Permanetly</h4>
        </button>
        <button onClick={() => dispatch(setShowModal(false))} className="canceller">
          <h4>Go back</h4>
        </button>
      </div>
    </div>
  );
}
