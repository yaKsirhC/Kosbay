import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie'
import { RootState } from '../../../store'
import { hydrateOwnProducts } from '../../features/buySellSlice'
import CreateProduct from './CreateProduct'
import OwnerProducts from './OwnerProducts'
import ProductAdminHead from './ProductAdminHead'
import '../../styles/productAdmin.scss'


export default function ProductAdmin() {
  const dispatch = useDispatch()
  const cookies = new Cookies()
  const {createProduct} = useSelector((state: RootState) => state.buySell)

  useEffect(() => {
    // @ts-ignore
    dispatch(hydrateOwnProducts({products:5, uid: cookies.get('_ver')}))
  },[])

  return (
    <div className='product_admin'>
        <ProductAdminHead />
        {
          createProduct && <CreateProduct />
        }
        <OwnerProducts />
    </div>
  )
}
