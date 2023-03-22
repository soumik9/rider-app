import RequiredAuth from '@components/RequiredAuth'
import Profile from '@views/Profile/Profile'
import React from 'react'

const ProfilePage = () => {
  return (
    <RequiredAuth>
        <Profile />
    </RequiredAuth>
  )
}

export default ProfilePage