import IsLogged from '@components/IsLogged'
import Login from '@views/Login/Login'
import React from 'react'

const LoginPage = () => {
  return (
    <IsLogged>
        <Login />
    </IsLogged>
  )
}

export default LoginPage