import { Button } from '@mui/material'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { ModalContext } from '../../App'
import { setShowProductForm } from '../../features/buySellSlice'
import { setShowModal } from '../../features/modalSlice'
import ProductForm from './ProductForm'

export default function ProductAdminHead() {
  const setElements = useContext(ModalContext) as Function
  const dispatch = useDispatch()

  function handleClick(){
    setElements(<ProductForm />)
    dispatch(setShowProductForm(true))
  }
  return (
    <div className='admin_title_container'>
        <h1 className='admin_title'>
            Your Products
        </h1>
        <Button onClick={() => handleClick()}>Add Item</Button>
    </div>
  )
}
  