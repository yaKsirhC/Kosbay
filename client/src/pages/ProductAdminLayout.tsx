import ProductAdmin from "../components/product-admin/ProductAdmin"
import '../styles/productAdmin.scss'

export default function ProductAdminLayout() {
    return (
      <div className="admin_wrapper">
        <div className="left_admin_ad"></div>
        <ProductAdmin />
        <div className="right_admin_ad"></div>
      </div>
    )
  }
  