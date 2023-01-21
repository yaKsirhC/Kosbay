import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import '../../styles/buySell.scss'
import ProductBlock from './ProductBlock'

export default function Products() {
  const {products} = useSelector((state: RootState) => state.buySell)

  return (
    <div className='product_list'>
      {
        products.map((product) => {
          return <ProductBlock key={product._id} product={product} />
        })
      }
    </div>
  )
}
