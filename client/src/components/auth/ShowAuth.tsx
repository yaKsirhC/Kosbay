import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import LogIn from './LogIn'
import SignIn from './SignIn'

export default function ShowAuth() {
  const {AuthBox} = useSelector((state: RootState) => state.auth)
  return (
    <>
      {
        AuthBox === 'log-in' ? <LogIn /> : AuthBox === 'sign-in' ? <SignIn /> : undefined
      }
    </>
  )
}
