import RequiredAuth from '@components/RequiredAuth'
import Dashboard from '@views/Dashboard/Dashboard'
import React from 'react'

const DashboardPage:React.FC = () => {
  return (
    <RequiredAuth>
        <Dashboard />
    </RequiredAuth>
  )
}

export default DashboardPage