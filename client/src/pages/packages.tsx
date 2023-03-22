import RequiredAuth from '@components/RequiredAuth'
import Packages from '@views/Packages/Packages'
import React from 'react'

type Props = {}

const packages = (props: Props) => {
  return (
    <RequiredAuth>
      <Packages />
    </RequiredAuth>
  )
}

export default packages