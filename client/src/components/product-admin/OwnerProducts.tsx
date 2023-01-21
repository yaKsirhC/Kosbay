import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import OwnedProduct from "./OwnedProduct";

export default function OwnerProducts() {
  const { products } = useSelector((state: RootState) => state.buySell);
  
  return (
    <div className="products">
      {products.map((product,i) => {
        return <OwnedProduct product={product} key={i} />;
      })}
    </div>
  );
}
