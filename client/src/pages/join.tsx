import IsLogged from '@components/IsLogged'
import JoinAsRider from '@views/Join/JoinAsRider'
import React from 'react'

const JoinPage = () => {
  return (
    <IsLogged>
        <JoinAsRider />
    </IsLogged>
  )
}

export default JoinPage