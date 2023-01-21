import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { RootState } from '../../store'
import AdminUserPage from '../components/users/AdminUserPage'
import VisitorUserPage from '../components/users/VisitorUserPage'
import { hydrateOwnProducts } from '../features/buySellSlice'
import { hydrateUserInfo } from '../features/userSlice'
import { user } from '../vite-env'

export default function UserPageLayout() {
    const {id} = useParams()
    const {userInfo} = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        // @ts-ignore
        dispatch(hydrateUserInfo(id))
        // @ts-ignore
    dispatch(hydrateOwnProducts({products:5, uid: id}))

    },[id])

    const cookies = new Cookies()

  return (
    <>
    {
      (userInfo as user)._id && cookies.get('_ver') !== id ? <VisitorUserPage /> : <AdminUserPage />
    }
    </>
  )
}
